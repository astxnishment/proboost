/* eslint-disable @typescript-eslint/no-require-imports */
const test = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const ts = require('typescript');
for (const extension of ['.ts', '.tsx']) require.extensions[extension] = (module, filename) => {
  const { outputText } = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX, esModuleInterop: true } });
  module._compile(outputText, filename);
};
const React = require('react');
const { renderToStaticMarkup } = require('react-dom/server');
const { translate, localizedHref, localeFromPath, LOCALES, dictionaryFor } = require('../app/lib/localization.ts');
const { localizeContent } = require('../app/components/Localization.tsx');
const { formatGbpPrice, getChargeAmount } = require('../app/lib/currency.ts');

test('locale routes preserve fragments, queries and external destinations', () => {
  assert.equal(localizedHref('/en/valorant-boost/rank-boost?x=1#configure', 'de'), '/de/valorant-boost/rank-boost?x=1#configure');
  assert.equal(localizedHref('/#games', 'fr'), '/fr#games');
  assert.equal(localizedHref('/contact', 'uk'), '/uk/contact');
  assert.equal(localizedHref('/fr?x=1', 'ru'), '/ru?x=1');
  for (const href of ['https://example.com/en/a', 'mailto:support@proboost.gg', '#configure', '/api/checkout', '/sso-callback']) assert.equal(localizedHref(href, 'it'), href);
  assert.equal(localeFromPath('/de/valorant-boost'), 'de');
  assert.equal(localeFromPath('/invalid/valorant-boost'), undefined);
});

test('translations preserve whitespace and unknown content without partial substitutions', () => {
  assert.equal(translate('en', ' Checkout '), ' Checkout ');
  assert.equal(translate('it', '  Checkout\n'), `  ${dictionaryFor('it').Checkout}\n`);
  assert.equal(translate('it', 'Unknown content to translate'), 'Unknown content to translate');
  assert.equal(translate('unknown', 'Checkout'), 'Checkout');
  assert.ok(!translate('it', 'Browse all 15 games').includes('{'));
  assert.ok(translate('it', 'Browse all 15 games').includes('15'));
});

test('localizing a controlled form preserves canonical values, handlers, refs and keys', () => {
  const change = () => {};
  const ref = React.createRef();
  const source = React.createElement('select', { value: 'Europe', onChange: change, ref, id: 'region', 'aria-label': 'Region', key: 'selector' }, React.createElement('option', null, 'Europe'));
  const output = localizeContent(source, 'it');
  assert.equal(output.props.value, 'Europe');
  assert.equal(output.props.onChange, change);
  assert.equal(output.props.ref, ref);
  assert.equal(output.props.id, 'region');
  assert.equal(output.key, 'selector');
  const option = React.Children.toArray(output.props.children)[0];
  assert.equal(option.props.value, 'Europe');
  assert.equal(option.props.children, translate('it', 'Europe'));
  assert.equal(output.props['aria-label'], translate('it', 'Region'));
});

test('rich content remains React elements with safe text and working links', () => {
  const source = React.createElement('p', null, 'Trouble logging in? ', React.createElement('a', { href: '/contact' }, 'Get help'));
  const output = renderToStaticMarkup(localizeContent(source, 'fr'));
  assert.ok(output.includes('href="/fr/contact"'));
  assert.ok(!output.includes('{0}'));
  const untouched = React.createElement('span', { translate: 'no' }, 'Google');
  assert.equal(localizeContent(untouched, 'uk'), untouched);
});

test('localized currency formatting does not change the charge amount', () => {
  assert.equal(formatGbpPrice(10, 'EUR', { locale: 'de-DE' }), '11,70\u00a0€');
  assert.equal(formatGbpPrice(10, 'GBP', { locale: 'en-GB' }), '£10.00');
  assert.equal(getChargeAmount(10, 'EUR'), 1170);
});

test('dynamic order quantities, delivery units and rank divisions stay localized', () => {
  assert.equal(translate('uk', '2 wins'), '2 перемоги');
  assert.equal(translate('uk', '5 wins'), '5 перемог');
  assert.equal(translate('ru', '21 wins'), '21 победа');
  assert.equal(translate('ru', '3 placement matches'), '3 калибровочных матча');
  assert.equal(translate('fr', '1 placement match'), '1 match de placement');
  assert.equal(translate('de', '2 hours'), '2 Stunden');
  assert.equal(translate('fr', 'Silver II'), 'Argent II');
  assert.equal(translate('fr', 'Level 3'), 'Niveau 3');
  for (const locale of LOCALES.filter(locale => locale !== 'en')) {
    assert.ok(!/days|\d+h\b/.test(translate(locale, '~ 2 days, 22h')), locale);
    assert.ok(!translate(locale, 'Increase Session length').includes('Session length'), locale);
  }
});

test('every supported language covers the published message inventory and placeholders', () => {
  const messages = require('../app/lib/locales/messages.json');
  const placeholders = text => (text.match(/\$?\{[^{}]+\}/g) ?? []).sort();
  for (const locale of LOCALES.filter(locale => locale !== 'en')) {
    const dictionary = dictionaryFor(locale);
    for (const message of messages) {
      assert.ok(typeof dictionary[message] === 'string' && dictionary[message].trim(), `${locale}: missing ${message}`);
      assert.deepEqual(placeholders(dictionary[message]), placeholders(message), `${locale}: changed placeholders in ${message}`);
    }
  }
});

test('literal interface copy has translations and provider brand names are preserved', () => {
  const messages = new Set();
  function scan(directory) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
      const file = path.join(directory, entry.name);
      if (entry.isDirectory() && entry.name !== 'locales') scan(file);
      else if (entry.name.endsWith('.tsx')) {
        const source = ts.createSourceFile(file, fs.readFileSync(file, 'utf8'), ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
        function visit(node) {
          if (ts.isPropertyAssignment(node) && LOCALES.filter(locale => locale !== 'en').includes(node.name.getText().replace(/['"]/g, ''))) return;
          if (ts.isPropertyAssignment(node) && /^(title|description|label|navLabel|headline|preparation|serviceIntro|metadataDescription|modeLabel|roleLabel|progressLabel|q|a|text|heading|cta|name|note|tooltip|message|placeholder|error|caption|badge|helper|desc|detail|unitLabel|unitSub|eyebrow|subtitle)$/.test(node.name.getText()) && ts.isStringLiteral(node.initializer)) {
            const message = node.initializer.text.replace(/\s+/g, ' ').trim();
            if (/[a-z]{3}/i.test(message) && !/\.(png|webp|svg)|[\[\]]/.test(message)) messages.add(message);
          }
          if (ts.isJsxText(node)) {
            const message = node.text.replace(/&(?:amp|quot|apos|lt|gt|nbsp);/g, token => ({ '&amp;': '&', '&quot;': '"', '&apos;': "'", '&lt;': '<', '&gt;': '>', '&nbsp;': ' ' })[token]).replace(/\s+/g, ' ').trim();
            if (/[a-z]{3}/i.test(message) && !message.startsWith('support@')) messages.add(message);
          }
          ts.forEachChild(node, visit);
        }
        visit(source);
      }
    }
  }
  scan(path.resolve(__dirname, '../app'));
  for (const locale of LOCALES.filter(locale => locale !== 'en')) {
    for (const message of messages) assert.ok(dictionaryFor(locale)[message], `${locale}: missing literal copy ${message}`);
    for (const brand of ['Discord', 'Google', 'ProBoost', 'Stripe', 'PayPal']) assert.equal(translate(locale, brand), brand);
  }
});
