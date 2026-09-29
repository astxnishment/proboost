/* eslint-disable @typescript-eslint/no-require-imports */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
require.extensions['.ts'] = (module, filename) => {
  module._compile(ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } }).outputText, filename);
};
const { liveChatConfig, createChatController } = require('../app/lib/live-chat.ts');

function fixture() {
  const calls = [];
  let hidden = true;
  let maximized = false;
  const api = {
    showWidget: () => { hidden = false; calls.push('show'); },
    hideWidget: () => { hidden = true; calls.push('hide'); },
    maximize: () => { maximized = true; calls.push('maximize'); },
    minimize: () => { maximized = false; api.onChatMinimized(); },
    isChatHidden: () => hidden,
    isChatMaximized: () => maximized,
    isChatMinimized: () => !maximized,
  };
  const chat = createChatController(api, {
    onReady: () => calls.push('ready'), onOpen: () => calls.push('open'),
    onClose: () => calls.push('close'), onUnread: n => calls.push(`unread:${n}`), onError: () => calls.push('error'),
  });
  return { api, chat, calls };
}

test('missing or unsafe widget configuration cannot create an external script URL', () => {
  for (const pair of [[undefined, undefined], ['', 'default'], ['your_property_id', 'default'], ['a'.repeat(24), '../wrong'], ['https://evil.test', 'widget'], ['a'.repeat(24), 'widget?x=1']]) {
    assert.equal(liveChatConfig(...pair), null);
  }
  assert.deepEqual(liveChatConfig('a'.repeat(24), 'default'), {
    scriptUrl: `https://embed.tawk.to/${'a'.repeat(24)}/default`, directUrl: `https://tawk.to/chat/${'a'.repeat(24)}/default`,
  });
});
test('a requested conversation opens only when the provider API is ready', () => {
  const {api, chat, calls} = fixture();
  chat.requestOpen();
  assert.deepEqual(calls, []);
  api.onLoad();
  assert.equal(chat.isReady(), true);
  assert.deepEqual(calls, ['ready', 'show', 'maximize', 'unread:0', 'open']);
});
test('closing during load prevents a late popup but allows a later explicit open', () => {
  const {api, chat, calls} = fixture();
  chat.requestOpen();
  chat.cancelPending();
  api.onLoad();
  assert.deepEqual(calls, ['ready', 'hide']);
  chat.requestOpen();
  assert.equal(calls.filter(x => x === 'open').length, 1);
});
test('loading without an open request leaves the native widget hidden', () => {
  const {api, calls} = fixture();
  api.onLoad();
  assert.deepEqual(calls, ['ready', 'hide']);
});
test('minimizing hides the native launcher and restores support exactly once', () => {
  const {api, chat, calls} = fixture();
  api.onLoad(); chat.requestOpen();
  api.onChatMaximized();
  api.minimize();
  api.onChatHidden();
  assert.equal(calls.filter(x => x === 'open').length, 1);
  assert.equal(calls.filter(x => x === 'close').length, 1);
  assert.equal(calls.filter(x => x === 'hide').length, 2);
});
test('only incoming agent messages received while closed increase the unread count', () => {
  const {api, chat, calls} = fixture();
  api.onLoad(); chat.requestOpen(); api.onChatMessageAgent();
  assert.equal(calls.includes('unread:1'), false);
  api.minimize(); api.onChatMessageAgent(); api.onChatMessageAgent();
  assert.ok(calls.includes('unread:2'));
  chat.requestOpen();
  assert.equal(calls.filter(x => x === 'unread:0').length, 2);
});
test('an incomplete provider API reports a failure instead of a successful connection', () => {
  const {api, chat, calls} = fixture();
  delete api.maximize;
  chat.requestOpen(); api.onLoad();
  assert.equal(chat.isReady(), false);
  assert.deepEqual(calls, ['error']);
});
test('a provider open error returns control to the fallback', () => {
  const {api, chat, calls} = fixture();
  api.maximize = () => { throw new Error('blocked'); };
  api.onLoad(); chat.requestOpen();
  assert.equal(chat.isReady(), false);
  assert.equal(calls.includes('open'), false);
  assert.equal(calls.at(-1), 'error');
});
test('disposed controllers ignore delayed events and cannot reopen chat', () => {
  const {api, chat, calls} = fixture();
  chat.requestOpen(); chat.dispose();
  const snapshot = [...calls];
  api.onLoad(); api.onChatMaximized(); api.onChatMessageAgent(); chat.requestOpen();
  assert.deepEqual(calls, snapshot);
  assert.equal(chat.isReady(), false);
});
test('initial hide and stale minimize callbacks cannot restore a duplicate launcher over an open chat', () => {
  const {api, chat, calls} = fixture();
  api.onBeforeLoad();
  chat.requestOpen(); api.onLoad();
  api.onChatHidden(); api.onChatMinimized();
  assert.equal(chat.isOpen(), true);
  assert.equal(calls.includes('close'), false);
  assert.equal(calls.filter(x => x === 'hide').length, 1);
});
test('hiding the widget before its first render preserves the visitor opening request', () => {
  const {api, chat} = fixture();
  const hide = api.hideWidget;
  api.hideWidget = () => { hide(); api.onChatHidden(); api.onChatMinimized(); };
  chat.requestOpen(); api.onBeforeLoad();
  assert.equal(chat.isPending(), true);
  api.onLoad();
  assert.equal(chat.isOpen(), true);
  assert.equal(api.isChatHidden(), false);
});
test('rapid repeated opening does not restart the provider animation', () => {
  const {api, chat, calls} = fixture();
  api.onLoad();
  chat.requestOpen(); chat.requestOpen(); chat.requestOpen();
  assert.equal(calls.filter(x => x === 'maximize').length, 1);
  assert.equal(calls.filter(x => x === 'open').length, 1);
});
test('an asynchronous provider must acknowledge opening before the support panel is dismissed', () => {
  const {api, chat, calls} = fixture();
  delete api.isChatMaximized;
  api.onLoad(); chat.requestOpen(); chat.requestOpen();
  assert.equal(chat.isPending(), true);
  assert.equal(chat.isOpen(), false);
  assert.equal(calls.includes('open'), false);
  assert.equal(calls.filter(x => x === 'maximize').length, 1);
  api.onChatMaximized();
  assert.equal(chat.isOpen(), true);
  assert.equal(chat.isPending(), false);
});
test('cancelling an asynchronous open suppresses its late maximize callback', () => {
  const {api, chat, calls} = fixture();
  delete api.isChatMaximized;
  api.onLoad(); chat.requestOpen(); chat.cancelPending(); api.onChatMaximized();
  assert.equal(chat.isPending(), false);
  assert.equal(chat.isOpen(), false);
  assert.equal(api.isChatHidden(), true);
  assert.equal(calls.includes('open'), false);
});
test('minimizing closes once even when hiding emits a synchronous hidden callback', () => {
  const {api, chat, calls} = fixture();
  const hide = api.hideWidget;
  api.hideWidget = () => { hide(); api.onChatHidden(); };
  api.onLoad(); chat.requestOpen(); api.minimize();
  assert.equal(calls.filter(x => x === 'close').length, 1);
  api.onChatMaximized();
  assert.equal(chat.isOpen(), false);
  assert.equal(api.isChatHidden(), true);
});
test('a stale hidden event cannot close a conversation that was reopened', () => {
  const {api, chat, calls} = fixture();
  api.onLoad(); chat.requestOpen(); api.minimize(); chat.requestOpen();
  api.onChatHidden();
  assert.equal(chat.isOpen(), true);
  assert.equal(calls.filter(x => x === 'open').length, 2);
  assert.equal(calls.filter(x => x === 'close').length, 1);
});
test('provider auto-open events do not reopen chat without a visitor request', () => {
  const {api, chat, calls} = fixture();
  api.onLoad(); api.showWidget(); api.maximize(); api.onChatMaximized();
  assert.equal(chat.isOpen(), false);
  assert.equal(api.isChatHidden(), true);
  assert.equal(calls.includes('open'), false);
});
