/* eslint-disable @typescript-eslint/no-require-imports */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');

for (const extension of ['.ts', '.tsx']) {
  require.extensions[extension] = (module, filename) => {
    const output = ts.transpileModule(fs.readFileSync(filename, 'utf8'), {
      compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020, jsx: ts.JsxEmit.ReactJSX },
      fileName: filename,
    });
    module._compile(output.outputText, filename);
  };
}

const GameSearchStructuredData = require('../app/components/GameSearchStructuredData.tsx').default;
const { GAME_DIRECTORY } = require('../app/lib/games.ts');
const { ADDITIONAL_GAMES } = require('../app/lib/additional-games.ts');
const { ALL_LANGS, SITE_URL } = require('../app/lib/site.ts');
const seo = require('../app/lib/game-seo.ts');

test('every catalog game and language exposes its canonical hub and only real service links', () => {
  assert.equal(GAME_DIRECTORY.length, 15);
  for (const game of GAME_DIRECTORY) for (const language of ALL_LANGS) {
    const script = GameSearchStructuredData({ slug: game.slug, language });
    assert.equal(script.type, 'script');
    assert.equal(script.props.type, 'application/ld+json');
    const data = JSON.parse(script.props.dangerouslySetInnerHTML.__html);
    const service = data['@graph'].find(item => item['@type'] === 'Service');
    const breadcrumbs = data['@graph'].find(item => item['@type'] === 'BreadcrumbList');
    const hub = new URL(`/${language}/${game.slug}`, SITE_URL).href;
    assert.equal(service.url, hub);
    assert.equal(breadcrumbs.itemListElement.at(-1).item, hub);
    assert.equal(breadcrumbs.itemListElement[0].item, new URL(`/${language}`, SITE_URL).href);
    assert.equal(service.provider.name, 'ProBoost');
    assert.equal(service.provider.url, SITE_URL);
    assert.ok(service.hasOfferCatalog.itemListElement.length >= 3);

    for (const offer of service.hasOfferCatalog.itemListElement) {
      const path = new URL(offer.url);
      assert.equal(path.origin, new URL(SITE_URL).origin);
      assert.equal(path.pathname.split('/').length, 4);
      assert.ok(path.pathname.startsWith(`/${language}/${game.slug}/`));
      assert.equal(path.search, '');
      assert.equal(offer.itemOffered.url, offer.url);
      const route = path.pathname.split('/').at(-1);
      const file = game.extended ? 'app/[lang]/[game]' : `app/${language === 'en' ? 'en' : '[lang]'}/${game.slug}`;
      assert.ok(fs.existsSync(`${file}/${route}/page.tsx`) || fs.existsSync(`${file}/[service]/page.tsx`), offer.url);
      assert.ok(!('price' in offer));
      assert.ok(!('availability' in offer));
    }
    const additional = ADDITIONAL_GAMES.find(item => item.slug === game.slug);
    if (additional) {
      assert.deepEqual(service.hasOfferCatalog.itemListElement.map(item => new URL(item.url).pathname.split('/').at(-1)), additional.services.map(item => item.slug));
    }
    assert.ok(!('aggregateRating' in service));
    assert.ok(!('review' in service));
    assert.ok(!('inLanguage' in service));
  }
});

test('coaching-only games cannot be described as boosting services', () => {
  const coaching = ADDITIONAL_GAMES.filter(game => game.coachingOnly);
  assert.equal(coaching.length, 3);
  for (const game of coaching) {
    const script = GameSearchStructuredData({ slug: game.slug, language: 'en' });
    const service = JSON.parse(script.props.dangerouslySetInnerHTML.__html)['@graph'].find(item => item['@type'] === 'Service');
    assert.match(service.serviceType, /coaching/i);
    assert.doesNotMatch(service.serviceType, /boost/i);
    assert.doesNotMatch(service.name, /boost/i);
  }
});

test('unknown games and invalid languages render no structured claims or URLs', () => {
  for (const slug of ['unknown-game', '__proto__', '../counter-strike-2-boost', 'counter-strike-2-boost?email=private@example.com']) {
    assert.equal(GameSearchStructuredData({ slug, language: 'en' }), null);
  }
  for (const language of ['xx', '../en', 'en?email=private@example.com']) {
    assert.equal(GameSearchStructuredData({ slug: 'counter-strike-2-boost', language }), null);
  }
});

test('metadata containing HTML or a script terminator remains inert JSON text', () => {
  const original = seo.getGameSeo;
  const hostile = '</script><script>alert("test")</script>';
  seo.getGameSeo = (...args) => ({ ...original(...args), heading: hostile, description: hostile });
  try {
    const script = GameSearchStructuredData({ slug: 'counter-strike-2-boost', language: 'en' });
    const payload = script.props.dangerouslySetInnerHTML.__html;
    assert.ok(!payload.includes('<'));
    const service = JSON.parse(payload)['@graph'].find(item => item['@type'] === 'Service');
    assert.equal(service.name, hostile);
    assert.equal(service.description, hostile);
  } finally {
    seo.getGameSeo = original;
  }
});
