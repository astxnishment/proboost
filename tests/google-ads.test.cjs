/* eslint-disable @typescript-eslint/no-require-imports */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
const Module = require('node:module');
for (const extension of ['.ts', '.tsx']) require.extensions[extension] = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true },
  });
  module._compile(outputText, filename);
};
const { confirmCheckoutSession, isCheckoutSessionId } = require('../app/lib/purchase-confirmation.ts');
const { ADS_CONSENT_DURATION_MS, parseAdsConsent, getGoogleAdsConfig, measurementPageContext, purchaseConversion } = require('../app/lib/google-ads.ts');
const binding = 'b'.repeat(43);
const sessionId = 'cs_live_0123456789abcdefghijklmnop';
const session = {
  id: sessionId, mode: 'payment', status: 'complete', payment_status: 'paid',
  livemode: true, currency: 'gbp', amount_total: 1250,
  payment_intent: 'pi_0123456789abc', metadata: { source: 'proboost', checkout_browser: binding },
  customer_details: { email: 'private@example.com', name: 'Private Customer' },
};

test('only a Stripe-paid, complete ProBoost payment becomes a sanitized confirmation', () => {
  const result = confirmCheckoutSession(session, binding);
  assert.deepEqual(result, { status: 'paid', purchase: { transactionId: session.payment_intent, value: 12.5, currency: 'GBP', live: true } });
  assert.ok(!JSON.stringify(result).includes('Private'));
  for (const patch of [{ status: 'open' }, { payment_status: 'unpaid' }, { payment_status: 'no_payment_required' }]) {
    assert.deepEqual(confirmCheckoutSession({ ...session, ...patch }, binding), { status: 'pending' });
  }
  for (const patch of [{ status: 'expired' }, { mode: 'subscription' }, { metadata: {} }, { metadata: { source: 'other' } }, { metadata: { source: 'proboost', checkout_browser: 'c'.repeat(43) } }]) {
    assert.deepEqual(confirmCheckoutSession({ ...session, ...patch }, binding), { status: 'invalid' });
  }
});

test('currency, amounts and transaction IDs cannot create invalid revenue events', () => {
  for (const patch of [{ currency: 'jpy' }, { amount_total: 0 }, { amount_total: -100 }, { amount_total: 12.5 }, { amount_total: null }, { amount_total: NaN }, { payment_intent: null }, { payment_intent: 'email@example.com' }, { payment_intent: 'pi_' + 'a'.repeat(64) }]) {
    assert.equal(confirmCheckoutSession({ ...session, ...patch }, binding).status, 'invalid', JSON.stringify(patch));
  }
  assert.equal(confirmCheckoutSession({ ...session, currency: 'eur', payment_intent: { id: session.payment_intent } }, binding).purchase.currency, 'EUR');
});

test('test purchases are visible as tests but never become Ads conversions', () => {
  const result = confirmCheckoutSession({ ...session, livemode: false }, binding);
  assert.equal(result.status, 'paid');
  assert.equal(purchaseConversion(result.purchase, 'AW-123/testlabel'), null);
  assert.deepEqual(purchaseConversion(confirmCheckoutSession(session, binding).purchase, 'AW-123/testlabel'), {
    send_to: 'AW-123/testlabel', transaction_id: session.payment_intent, value: 12.5, currency: 'GBP',
  });
});

test('missing or malformed Ads configuration remains disabled', () => {
  for (const [id, label] of [[undefined, undefined], ['G-123', 'abc'], ['AW-123', ''], ['AW-X', 'abc'], ['AW-123', '<script>']]) {
    assert.equal(getGoogleAdsConfig(id, label), null);
  }
  assert.deepEqual(getGoogleAdsConfig('AW-123', 'abc-DEF_12'), { id: 'AW-123', destination: 'AW-123/abc-DEF_12' });
});

test('consent fails closed for missing, corrupt, expired and unsupported stored choices', () => {
  const now = 100000;
  const saved = choice => JSON.stringify({ version: 1, choice, expiresAt: now + ADS_CONSENT_DURATION_MS });
  assert.equal(parseAdsConsent(saved('accepted'), now), 'accepted');
  assert.equal(parseAdsConsent(saved('rejected'), now), 'rejected');
  for (const value of [null, '', 'accepted', '{bad', saved('yes'), JSON.stringify({ version: 2, choice: 'accepted', expiresAt: now + 100 }), JSON.stringify({ version: 1, choice: 'accepted', expiresAt: now }), JSON.stringify({ version: 1, choice: 'accepted', expiresAt: now + ADS_CONSENT_DURATION_MS + 1 })]) {
    assert.equal(parseAdsConsent(value, now), 'unknown');
  }
});

test('measurement URLs strip checkout sessions and private data while preserving ad click attribution', () => {
  assert.deepEqual(measurementPageContext('https://proboost.gg/success?session_id=private#gclid', 'https://checkout.stripe.com/c/pay/private'), {
    page_location: 'https://proboost.gg/success', page_referrer: '',
  });
  assert.deepEqual(measurementPageContext('https://proboost.gg/en?gclid=test-click-123&session_id=private&email=private#secret', 'https://proboost.gg/en/valorant-boost?email=private#test'), {
    page_location: 'https://proboost.gg/en?gclid=test-click-123', page_referrer: 'https://proboost.gg/en/valorant-boost',
  });
  assert.equal(measurementPageContext('https://proboost.gg/en?gclid=bad%40email.com&wbraid=valid-123', '').page_location, 'https://proboost.gg/en?wbraid=valid-123');
  assert.deepEqual(measurementPageContext('javascript:private', 'not a url'), { page_location: '', page_referrer: '' });
});

test('session identifiers reject missing, repeated and malformed query values', () => {
  assert.equal(isCheckoutSessionId(sessionId), true);
  for (const value of [undefined, null, [sessionId], '', 'cs_live_bad', 'pi_1234567890123456', sessionId + '<script>']) assert.equal(isCheckoutSessionId(value), false);
});

let cookieValue;
let retrievedSession;
let retrieveCount = 0;
class FakeStripe {
  static errors = { StripeInvalidRequestError: class extends Error {} };
  checkout = { sessions: { retrieve: async () => { retrieveCount += 1; return retrievedSession; } } };
}
const originalLoad = Module._load;
let SuccessPage;
try {
  Module._load = function (request, parent, isMain) {
    if (request === 'stripe') return FakeStripe;
    if (request === 'next/headers') return { cookies: async () => ({ get: () => cookieValue ? { value: cookieValue } : undefined }) };
    return originalLoad.call(this, request, parent, isMain);
  };
  SuccessPage = require('../app/success/page.tsx').default;
} finally { Module._load = originalLoad; }
function hasConversion(node) {
  if (!node || typeof node !== 'object') return false;
  if (node.type?.name === 'GoogleAdsPurchase') return true;
  return [node.props?.children].flat(Infinity).some(hasConversion);
}

test('server page never checks or records a purchase from a URL alone', async () => {
  const oldKey = process.env.STRIPE_SECRET_KEY;
  process.env.STRIPE_SECRET_KEY = 'sk_test_unit_test_only';
  try {
    retrievedSession = session;
    retrieveCount = 0;
    for (const cookie of [undefined, 'cs_live_otherbrowser0123456789']) {
      cookieValue = cookie;
      assert.equal(hasConversion(await SuccessPage({ searchParams: Promise.resolve({ session_id: sessionId }) })), false);
    }
    assert.equal(retrieveCount, 0);
    cookieValue = binding;
    assert.equal(hasConversion(await SuccessPage({ searchParams: Promise.resolve({}) })), false);
    assert.equal(retrieveCount, 0);
    assert.equal(hasConversion(await SuccessPage({ searchParams: Promise.resolve({ session_id: sessionId }) })), true);
    assert.equal(retrieveCount, 1);
    for (const patch of [{ payment_status: 'unpaid' }, { livemode: false }, { metadata: {} }]) {
      retrievedSession = { ...session, ...patch };
      assert.equal(hasConversion(await SuccessPage({ searchParams: Promise.resolve({ session_id: sessionId }) })), false);
    }
  } finally {
    if (oldKey === undefined) delete process.env.STRIPE_SECRET_KEY;
    else process.env.STRIPE_SECRET_KEY = oldKey;
  }
});
