/* eslint-disable @typescript-eslint/no-require-imports */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Run the actual pre-paint script against new and returning visitor browsers.
const layout = fs.readFileSync(path.join(__dirname, '../app/layout.tsx'), 'utf8');
const script = layout.match(/const themeInitScript = `([\s\S]*?)`;/)[1];

function openPage(saved, { lightSystem = false, blockedStorage = false, previousTheme, hasThemeMeta = true } = {}) {
  const root = { dataset: {}, style: {} };
  if (previousTheme) root.dataset.theme = previousTheme;
  const meta = { content: '#060607', setAttribute(name, value) { this[name] = value; } };
  vm.runInNewContext(script, {
    window: {
      localStorage: { getItem() { if (blockedStorage) throw new Error('Storage blocked'); return saved; } },
      matchMedia: () => ({ matches: lightSystem }),
    },
    document: { documentElement: root, querySelector: () => hasThemeMeta ? meta : null },
  });
  return { theme: root.dataset.theme, colorScheme: root.style.colorScheme, browserColor: meta.content };
}

test('first visits start dark even when the device uses a light theme', () => {
  for (const lightSystem of [false, true]) {
    assert.deepEqual(openPage(null, { lightSystem }), { theme: 'black', colorScheme: 'dark', browserColor: '#060607' });
  }
});

test('returning visits ignore an old saved light preference', () => {
  for (const saved of ['white', 'black']) {
    assert.deepEqual(openPage(saved, { lightSystem: true }), { theme: 'black', colorScheme: 'dark', browserColor: '#060607' });
  }
});

test('a fresh page load resets a manually selected light theme', () => {
  assert.deepEqual(openPage('white', { previousTheme: 'white' }), { theme: 'black', colorScheme: 'dark', browserColor: '#060607' });
});

test('dark startup works before the browser theme metadata is available', () => {
  assert.equal(openPage('white', { hasThemeMeta: false }).theme, 'black');
});

test('invalid preferences and blocked storage fall back to dark', () => {
  for (const saved of ['', 'system', 'invalid']) assert.equal(openPage(saved, { lightSystem: true }).theme, 'black');
  assert.deepEqual(openPage('white', { blockedStorage: true, lightSystem: true }), { theme: 'black', colorScheme: 'dark', browserColor: '#060607' });
});
