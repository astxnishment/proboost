/* eslint-disable @typescript-eslint/no-require-imports */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
const Module = require('node:module');

require.extensions['.ts'] = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2020,
      esModuleInterop: true,
    },
  });
  module._compile(outputText, filename);
};

const { computeOrderPrice } = require('../app/lib/pricing.ts');
const { getChargeAmount } = require('../app/lib/currency.ts');
const { confirmCheckoutSession } = require('../app/lib/purchase-confirmation.ts');
const { purchaseConversion } = require('../app/lib/google-ads.ts');
const root = path.resolve(__dirname, '..');
const binding = 'b'.repeat(43);
let capturedSessions = [];
class FakeStripe {
  checkout = {
    sessions: {
      create: async options => {
        capturedSessions.push(options);
        return { url: 'https://checkout.stripe.test/unit-test-session' };
      },
    },
  };
}

const originalLoad = Module._load;
let POST;
try {
  Module._load = function (request, parent, isMain) {
    if (request === 'stripe') return FakeStripe;
    if (request.startsWith('@/')) request = path.join(root, request.slice(2));
    return originalLoad.call(this, request, parent, isMain);
  };
  ({ POST } = require('../app/api/checkout/route.ts'));
} finally {
  Module._load = originalLoad;
}

async function checkout(body) {
  capturedSessions = [];
  const previousKey = process.env.STRIPE_SECRET_KEY;
  process.env.STRIPE_SECRET_KEY = 'sk_test_unit_test_only';
  try {
    const response = await POST({
      json: async () => body,
      cookies: { get: () => ({ value: binding }) },
      nextUrl: new URL('https://proboost.gg/api/checkout'),
    });
    return { response, sessions: capturedSessions };
  } finally {
    if (previousKey === undefined) delete process.env.STRIPE_SECRET_KEY;
    else process.env.STRIPE_SECRET_KEY = previousKey;
  }
}

const base = {
  serviceType: 'rank-up',
  currentRank: 'Silver',
  currentDivision: 'V',
  desiredRank: 'Gold',
  desiredDivision: 'V',
};
const addOnMetadata = {
  playOffline: 'r6_play_offline',
  specificOperators: 'r6_specific_operators',
  specificBooster: 'r6_specific_booster',
  streaming: 'r6_streaming',
  express: 'r6_express',
  highKillCount: 'r6_high_kill_count',
  oneTrickPony: 'r6_one_trick_pony',
  rankInsurance: 'r6_rank_insurance',
  vipPriority: 'r6_vip_priority',
  insaneClipDrop: 'r6_insane_clip_drop',
  eliteTier: 'r6_elite_tier',
};
function fulfillmentFields(metadata) {
  return Object.fromEntries(Object.entries(metadata).filter(([key]) => key.startsWith('r6_')));
}
function assertMetadataBounds(metadata) {
  assert.ok(Object.keys(metadata).length <= 50);
  for (const [key, value] of Object.entries(metadata)) {
    assert.ok(key.length <= 40, key);
    assert.equal(typeof value, 'string', key);
    assert.ok(value.length <= 500, key);
  }
}

test('POST preserves every selected R6 option on both Stripe records and still prices on the server', async () => {
  const order = {
    ...base,
    platform: 'Xbox',
    server: 'Europe',
    rpGain: '71/80 RP',
    queueType: 'Duo',
    duoBoosterCount: 3,
    ...Object.fromEntries(Object.keys(addOnMetadata).map(key => [key, true])),
    currency: 'EUR',
    language: 'fr',
    total: 0,
    password: 'private-password',
    email: 'private@example.com',
    operatorNames: 'private-free-text',
    metadata: { r6_version: 'spoofed', injected: 'private-value' },
  };
  const { response, sessions } = await checkout(order);
  assert.equal(response.status, 200);
  assert.equal(sessions.length, 1);
  const session = sessions[0];
  const expected = {
    r6_version: '1',
    r6_current_rank: 'Silver',
    r6_current_division: 'V',
    r6_desired_rank: 'Gold',
    r6_desired_division: 'V',
    r6_platform: 'Xbox',
    r6_server: 'Europe',
    r6_rp_gain: '71/80 RP',
    r6_queue_type: 'Duo',
    r6_duo_booster_count: '3',
    ...Object.fromEntries(Object.values(addOnMetadata).map(key => [key, 'true'])),
  };
  assert.deepEqual(fulfillmentFields(session.metadata), expected);
  assert.deepEqual(session.payment_intent_data.metadata, {
    source: 'proboost', service_type: 'rank-up', ...expected,
  });
  assert.equal(session.metadata.checkout_browser, binding);
  assert.ok(!('checkout_browser' in session.payment_intent_data.metadata));
  assert.equal(session.line_items[0].price_data.unit_amount, getChargeAmount(computeOrderPrice(order).total, 'EUR'));
  assert.equal(session.line_items[0].price_data.currency, 'eur');
  assert.equal(session.locale, 'fr');
  assert.ok(!JSON.stringify(session).includes('private-'));
  assert.ok(!JSON.stringify(session).includes('private@'));
  assertMetadataBounds(session.metadata);
  assertMetadataBounds(session.payment_intent_data.metadata);
});

test('legacy requests retain omitted-option defaults and the two free preferences do not change prices', async () => {
  const { response, sessions } = await checkout(base);
  assert.equal(response.status, 200);
  const plain = sessions[0];
  const metadata = plain.metadata;
  assert.equal(metadata.r6_queue_type, 'Solo');
  assert.equal(metadata.r6_duo_booster_count, '1');
  for (const key of ['r6_platform', 'r6_server', 'r6_rp_gain']) assert.equal(metadata[key], 'not_provided');
  for (const key of Object.values(addOnMetadata)) assert.equal(metadata[key], 'false');
  assert.equal(plain.line_items[0].price_data.unit_amount, getChargeAmount(computeOrderPrice(base).total, 'GBP'));

  const selected = await checkout({ ...base, playOffline: true, specificOperators: true });
  assert.equal(selected.response.status, 200);
  assert.equal(selected.sessions[0].metadata.r6_play_offline, 'true');
  assert.equal(selected.sessions[0].metadata.r6_specific_operators, 'true');
  assert.equal(selected.sessions[0].line_items[0].price_data.unit_amount, plain.line_items[0].price_data.unit_amount);
});

test('metadata records the same effective booster count and strict booleans used by pricing', async () => {
  for (const [requestedCount, expectedCount] of [[0, 1], [-100, 1], [3.9, 3], [1000000, 4], ['4', 1], [null, 1]]) {
    const order = { ...base, queueType: 'Duo', duoBoosterCount: requestedCount, playOffline: 'true', specificOperators: 1, express: 'true' };
    const { response, sessions } = await checkout(order);
    assert.equal(response.status, 200);
    assert.equal(sessions[0].metadata.r6_duo_booster_count, String(expectedCount));
    for (const key of ['r6_play_offline', 'r6_specific_operators', 'r6_express']) assert.equal(sessions[0].metadata[key], 'false');
    const normalized = { ...base, queueType: 'Duo', duoBoosterCount: expectedCount };
    assert.equal(sessions[0].line_items[0].price_data.unit_amount, getChargeAmount(computeOrderPrice(normalized).total, 'GBP'));
    assertMetadataBounds(sessions[0].metadata);
  }
});

test('invalid rank pairs and unrecognized option text cannot create a charge or enter Stripe metadata', async () => {
  for (const patch of [
    { currentRank: 'private@example.com' },
    { desiredRank: 'unknown' },
    { currentDivision: 'invalid' },
    { desiredDivision: 'invalid' },
    { currentDivision: 'VI' },
    { desiredRank: 'Silver' },
    { desiredRank: 'Copper' },
    { platform: 'private-password' },
    { server: 'private@example.com' },
    { rpGain: 'private-free-text'.repeat(100) },
  ]) {
    const { response, sessions } = await checkout({ ...base, ...patch });
    assert.equal(response.status, 400, JSON.stringify(patch));
    assert.equal(sessions.length, 0);
  }
  const lastStep = await checkout({ ...base, currentRank: 'Champion', currentDivision: 'II', desiredRank: 'Champion', desiredDivision: 'I' });
  assert.equal(lastStep.response.status, 200);
  assert.equal(lastStep.sessions[0].metadata.r6_desired_rank, 'Champion');
  assert.equal(lastStep.sessions[0].metadata.r6_desired_division, 'I');
});

test('other services do not gain R6 fields or change payment-intent configuration', async () => {
  const { response, sessions } = await checkout({ serviceType: 'champion', currentPoints: 10, desiredPoints: 20, playOffline: true, specificOperators: true });
  assert.equal(response.status, 200);
  assert.deepEqual(fulfillmentFields(sessions[0].metadata), {});
  assert.equal(sessions[0].payment_intent_data, undefined);
});

test('fulfillment metadata never becomes part of the Ads purchase payload', async () => {
  const { sessions } = await checkout({ ...base, specificOperators: true, streaming: true });
  const result = confirmCheckoutSession({
    id: 'cs_live_0123456789abcdefghijklmnop',
    mode: 'payment', status: 'complete', payment_status: 'paid', livemode: true,
    currency: 'gbp', amount_total: 1250,
    payment_intent: 'pi_0123456789abc', metadata: sessions[0].metadata,
  }, binding);
  assert.deepEqual(purchaseConversion(result.purchase, 'AW-123/testlabel'), {
    send_to: 'AW-123/testlabel', transaction_id: 'pi_0123456789abc', value: 12.5, currency: 'GBP',
  });
});
