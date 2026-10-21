/* eslint-disable @typescript-eslint/no-require-imports */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

// Run the actual pre-paint script, including its storage-error fallback.
const layout = fs.readFileSync(path.join(__dirname, '../app/layout.tsx'), 'utf8');
const script = layout.match(/const themeInitScript = `([\s\S]*?)`;/)[1];

function openPage(saved, { lightSystem = false, blockedStorage = false } = {}) {
  const root = { dataset: {}, style: {} };
  const meta = { content: '#060607', setAttribute(name, value) { this[name] = value; } };
  vm.runInNewContext(script, {
    window: {
      localStorage: { getItem() { if (blockedStorage) throw new Error('Storage blocked'); return saved; } },
      matchMedia: () => ({ matches: lightSystem }),
    },
    document: { documentElement: root, querySelector: () => meta },
  });
  return { theme: root.dataset.theme, colorScheme: root.style.colorScheme, browserColor: meta.content };
}

test('first visits start dark even when the device uses a light theme', () => {
  for (const lightSystem of [false, true]) {
    assert.deepEqual(openPage(null, { lightSystem }), { theme: 'black', colorScheme: 'dark', browserColor: '#060607' });
  }
});

test('an explicit saved light or dark choice is preserved', () => {
  assert.deepEqual(openPage('white'), { theme: 'white', colorScheme: 'light', browserColor: '#f6f6f8' });
  assert.deepEqual(openPage('black', { lightSystem: true }), { theme: 'black', colorScheme: 'dark', browserColor: '#060607' });
});

test('invalid preferences and blocked storage fall back to dark', () => {
  for (const saved of ['', 'system', 'invalid']) assert.equal(openPage(saved, { lightSystem: true }).theme, 'black');
  assert.deepEqual(openPage('white', { blockedStorage: true, lightSystem: true }), { theme: 'black', colorScheme: 'dark', browserColor: '#060607' });
});
