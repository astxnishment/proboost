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
  const api = { showWidget: () => calls.push('show'), hideWidget: () => calls.push('hide'), maximize: () => calls.push('maximize') };
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
  assert.deepEqual(calls, ['hide', 'ready', 'show', 'maximize', 'unread:0', 'open']);
});
test('closing during load prevents a late popup but allows a later explicit open', () => {
  const {api, chat, calls} = fixture();
  chat.requestOpen();
  chat.cancelPending();
  api.onLoad();
  assert.deepEqual(calls, ['hide', 'ready']);
  chat.requestOpen();
  assert.equal(calls.filter(x => x === 'open').length, 1);
});
test('loading without an open request leaves the native widget hidden', () => {
  const {api, calls} = fixture();
  api.onLoad();
  assert.deepEqual(calls, ['hide', 'ready']);
});
test('minimizing hides the native launcher and restores support exactly once', () => {
  const {api, chat, calls} = fixture();
  api.onLoad(); chat.requestOpen();
  api.onChatMaximized();
  api.onChatMinimized();
  api.onChatHidden();
  assert.equal(calls.filter(x => x === 'open').length, 1);
  assert.equal(calls.filter(x => x === 'close').length, 1);
  assert.equal(calls.filter(x => x === 'hide').length, 2);
});
test('only incoming agent messages received while closed increase the unread count', () => {
  const {api, chat, calls} = fixture();
  api.onLoad(); chat.requestOpen(); api.onChatMessageAgent();
  assert.equal(calls.includes('unread:1'), false);
  api.onChatMinimized(); api.onChatMessageAgent(); api.onChatMessageAgent();
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
