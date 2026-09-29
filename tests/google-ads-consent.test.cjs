/* eslint-disable @typescript-eslint/no-require-imports */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const ts = require('typescript');

require.extensions['.ts'] = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
    compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 },
  });
  module._compile(outputText, filename);
};
const ads = require('../app/lib/google-ads.ts');
const source = fs.readFileSync(path.join(__dirname, '../app/components/GoogleAdsProvider.tsx'), 'utf8');
const { outputText } = ts.transpileModule(source, {
  compilerOptions: {
    module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020,
    jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true,
  },
});

function savedConsent(choice) {
  return JSON.stringify({ version: 1, choice, expiresAt: Date.now() + ads.ADS_CONSENT_DURATION_MS - 1000 });
}

// Run the actual provider with a tiny deterministic hook/browser harness. The
// first render uses the server snapshot, then effects run before the client
// snapshot rerender, reproducing the consent hydration regression.
function mountProvider({ saved, initialCookies = {}, configured = true } = {}) {
  const storage = new Map(saved ? [[ads.ADS_CONSENT_KEY, saved]] : []);
  const cookieJar = new Map(Object.entries(initialCookies));
  const cookieWrites = [];
  const scripts = [];
  const listeners = new Map();
  const hooks = [];
  const stores = [];
  let index = 0;
  let hydrating = true;
  let dirty = false;
  let pendingEffects = [];
  let tree;
  let reloads = 0;
  let storageWritesFail = false;
  const changed = (before, after) => !before || before.length !== after.length || before.some((value, i) => !Object.is(value, after[i]));
  const react = {
    createContext: value => ({ value, Provider: 'AdsContext.Provider' }),
    useContext: context => context.value,
    useState(initial) {
      const i = index++;
      if (!hooks[i]) hooks[i] = { value: typeof initial === 'function' ? initial() : initial };
      return [hooks[i].value, value => {
        const next = typeof value === 'function' ? value(hooks[i].value) : value;
        if (!Object.is(next, hooks[i].value)) { hooks[i].value = next; dirty = true; }
      }];
    },
    useRef(initial) {
      const i = index++;
      return hooks[i] ??= { current: initial };
    },
    useCallback(callback, dependencies) {
      const i = index++;
      if (!hooks[i] || changed(hooks[i].dependencies, dependencies)) hooks[i] = { callback, dependencies };
      return hooks[i].callback;
    },
    useEffect(effect, dependencies) {
      const i = index++;
      if (!hooks[i] || changed(hooks[i].dependencies, dependencies)) {
        pendingEffects.push(() => {
          hooks[i]?.cleanup?.();
          hooks[i] = { dependencies, cleanup: effect() };
        });
      }
    },
    useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot) {
      const i = index++;
      if (!hooks[i]) {
        hooks[i] = { unsubscribe: subscribe(() => { dirty = true; }) };
        stores.push(hooks[i]);
      }
      hooks[i].getSnapshot = getSnapshot;
      hooks[i].value = hydrating ? getServerSnapshot() : getSnapshot();
      return hooks[i].value;
    },
  };
  const window = {
    localStorage: {
      getItem: key => storage.get(key) ?? null,
      setItem: (key, value) => {
        if (storageWritesFail) throw new Error('Storage quota exceeded');
        storage.set(key, value);
      },
      removeItem: key => storage.delete(key),
    },
    location: {
      href: 'https://proboost.gg/success?session_id=private', hostname: 'proboost.gg',
      reload: () => { reloads += 1; },
    },
    addEventListener(name, listener) {
      if (!listeners.has(name)) listeners.set(name, new Set());
      listeners.get(name).add(listener);
    },
    removeEventListener: (name, listener) => listeners.get(name)?.delete(listener),
    dispatchEvent: event => listeners.get(event.type)?.forEach(listener => listener(event)),
  };
  const document = {
    referrer: 'https://checkout.stripe.com/c/pay/private',
    createElement: tag => ({ tag }),
    head: { appendChild: script => scripts.push(script) },
    get cookie() { return [...cookieJar].map(([name, value]) => `${name}=${value}`).join('; '); },
    set cookie(value) {
      cookieWrites.push(value);
      const [name, content] = value.split(';')[0].split('=');
      if (/Max-Age=0/i.test(value)) cookieJar.delete(name);
      else cookieJar.set(name, content);
    },
  };
  const jsx = (type, props) => ({ type, props });
  const evaluatedModule = { exports: {} };
  vm.runInNewContext(outputText, {
    module: evaluatedModule, exports: evaluatedModule.exports, window, document, URL, Date,
    Event: class Event { constructor(type) { this.type = type; } },
    process: { env: configured ? { NEXT_PUBLIC_GOOGLE_ADS_ID: 'AW-123', NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL: 'unit_test' } : {} },
    require(name) {
      if (name === 'react') return react;
      if (name === 'react/jsx-runtime') return { jsx, jsxs: jsx, Fragment: 'Fragment' };
      if (name === 'next/link') return 'Link';
      if (name === './Localization') return 'Localized';
      if (name === '../lib/google-ads') return ads;
      throw new Error(`Unexpected dependency: ${name}`);
    },
  }, { filename: 'GoogleAdsProvider.tsx' });

  function render() {
    index = 0;
    dirty = false;
    tree = evaluatedModule.exports.default({ children: 'site content' });
    hydrating = false;
    const effects = pendingEffects;
    pendingEffects = [];
    effects.forEach(effect => effect());
    // React checks the current external-store snapshot after subscribing.
    if (stores.some(store => store.value !== store.getSnapshot())) dirty = true;
  }
  function settle() {
    for (let attempts = 0; attempts < 10; attempts += 1) {
      render();
      if (!dirty) return;
    }
    throw new Error('Provider did not settle');
  }
  function descendants(node) {
    if (!node || typeof node !== 'object') return [];
    return [node, ...[node.props?.children].flat(Infinity).flatMap(descendants)];
  }
  function text(node) {
    if (typeof node === 'string') return node;
    return [node?.props?.children].flat(Infinity).map(child => child === node ? '' : text(child)).join('');
  }
  const harness = {
    storage, cookieJar, cookieWrites, scripts, render, settle,
    failStorageWrites() { storageWritesFail = true; },
    get reloads() { return reloads; },
    get commands() { return (window.dataLayer ?? []).map(args => Array.from(args)); },
    get trackPurchase() { return tree.props.value; },
    click(label) {
      const button = descendants(tree).find(node => node.type === 'button' && text(node) === label);
      assert.ok(button, `Missing button: ${label}`);
      button.props.onClick();
      settle();
    },
    storageChanged() { window.dispatchEvent({ type: 'storage' }); settle(); },
    loadScript() { assert.equal(scripts.length, 1); scripts[0].onload(); settle(); },
  };
  return harness;
}

test('hydration preserves advertising attribution when saved consent is accepted', () => {
  const app = mountProvider({ saved: savedConsent('accepted'), initialCookies: { _gcl_aw: 'existing-click', essential: 'keep' } });
  app.render();
  assert.equal(app.cookieJar.get('_gcl_aw'), 'existing-click');
  assert.equal(app.cookieWrites.length, 0);
  app.settle();
  assert.equal(app.scripts.length, 1);
  assert.equal(app.cookieJar.get('_gcl_aw'), 'existing-click');
  assert.equal(app.cookieJar.get('essential'), 'keep');
});

test('absent or rejected consent never loads a Google script or queues a ping', () => {
  for (const saved of [undefined, savedConsent('rejected')]) {
    const app = mountProvider({ saved });
    app.settle();
    assert.equal(app.scripts.length, 0);
    assert.equal(app.commands.length, 0);
    assert.equal(app.reloads, 0);
  }
});

test('explicit acceptance loads Google once across rerenders and settings changes', () => {
  const app = mountProvider();
  app.settle();
  app.click('Allow ad measurement');
  assert.equal(app.scripts.length, 1);
  assert.equal(app.scripts[0].src, 'https://www.googletagmanager.com/gtag/js?id=AW-123');
  app.loadScript();
  app.click('Cookie settings');
  app.click('Allow ad measurement');
  app.settle();
  assert.equal(app.scripts.length, 1);
  assert.equal(app.commands.filter(command => command[0] === 'config').length, 1);
  assert.equal(ads.parseAdsConsent(app.storage.get(ads.ADS_CONSENT_KEY)), 'accepted');
});

test('purchase dispatch waits for the tag and deduplicates the payment reference', () => {
  const app = mountProvider({ saved: savedConsent('accepted') });
  const purchase = { transactionId: 'pi_realpurchase123', value: 10, currency: 'GBP', live: true };
  app.settle();
  app.trackPurchase(purchase);
  assert.equal(app.commands.some(command => command[0] === 'event'), false);
  app.loadScript();
  app.trackPurchase(purchase);
  app.trackPurchase({ ...purchase });
  app.settle();
  app.trackPurchase(purchase);
  const conversions = app.commands.filter(command => command[0] === 'event');
  assert.equal(conversions.length, 1);
  assert.equal(conversions[0][1], 'conversion');
  assert.equal(conversions[0][2].transaction_id, purchase.transactionId);
  assert.equal(conversions[0][2].value, purchase.value);
  assert.equal(conversions[0][2].page_location, 'https://proboost.gg/success');
});

test('revocation denies tracking, clears advertising cookies, reloads and blocks later purchases', () => {
  const app = mountProvider({ saved: savedConsent('accepted') });
  app.settle();
  app.loadScript();
  const previousTrackPurchase = app.trackPurchase;
  app.cookieJar.set('_gcl_aw', 'click');
  app.cookieJar.set('_gcl_au', 'measurement');
  app.cookieJar.set('essential', 'keep');
  app.click('Cookie settings');
  app.click('Reject optional cookies');
  const update = app.commands.filter(command => command[0] === 'consent' && command[1] === 'update').at(-1);
  for (const key of ['ad_storage', 'ad_user_data', 'ad_personalization', 'analytics_storage']) assert.equal(update[2][key], 'denied');
  assert.equal(app.cookieJar.has('_gcl_aw'), false);
  assert.equal(app.cookieJar.has('_gcl_au'), false);
  assert.equal(app.cookieJar.get('essential'), 'keep');
  assert.equal(app.reloads, 1);
  previousTrackPurchase({ transactionId: 'pi_realpurchase123', value: 10, currency: 'GBP', live: true });
  assert.equal(app.commands.some(command => command[0] === 'event'), false);
  assert.equal(ads.parseAdsConsent(app.storage.get(ads.ADS_CONSENT_KEY)), 'rejected');
});

test('clearing a stored preference cannot revive prior in-memory acceptance', () => {
  const app = mountProvider();
  app.settle();
  app.click('Allow ad measurement');
  app.storage.delete(ads.ADS_CONSENT_KEY);
  app.storageChanged();
  assert.equal(app.reloads, 1);
  const update = app.commands.filter(command => command[0] === 'consent' && command[1] === 'update').at(-1);
  assert.equal(update[2].ad_storage, 'denied');
});

test('a storage write failure cannot override the user withdrawing consent', () => {
  const app = mountProvider({ saved: savedConsent('accepted') });
  app.settle();
  app.loadScript();
  app.cookieJar.set('_gcl_aw', 'click');
  app.failStorageWrites();
  app.click('Cookie settings');
  app.click('Reject optional cookies');
  assert.equal(app.cookieJar.has('_gcl_aw'), false);
  assert.equal(app.reloads, 1);
  assert.notEqual(ads.parseAdsConsent(app.storage.get(ads.ADS_CONSENT_KEY)), 'accepted');
  const update = app.commands.filter(command => command[0] === 'consent' && command[1] === 'update').at(-1);
  assert.equal(update[2].ad_storage, 'denied');
});

test('missing configuration cannot load Google even with saved consent', () => {
  const app = mountProvider({ saved: savedConsent('accepted'), configured: false });
  app.settle();
  assert.equal(app.scripts.length, 0);
  assert.equal(app.commands.length, 0);
});
