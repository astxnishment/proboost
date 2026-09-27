/* eslint-disable @typescript-eslint/no-require-imports */
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const ts = require('typescript');
// Run the shared TypeScript pricing modules without adding a second test runtime.
require.extensions['.ts'] = (module, filename) => {
  const output = ts.transpileModule(fs.readFileSync(filename, 'utf8'), { compilerOptions: { module: ts.ModuleKind.CommonJS, target: ts.ScriptTarget.ES2020 } });
  module._compile(output.outputText, filename);
};
const { ADDITIONAL_GAMES, findAdditionalGame, rankSteps } = require('../app/lib/additional-games.ts');
const { initialGameOrder, parseCatalogGameOrder, catalogGameSubtotal, gameOrderSummary } = require('../app/lib/additional-pricing.ts');
const { computeOrderPrice, describeOrder } = require('../app/lib/pricing.ts');

for (const game of ADDITIONAL_GAMES) {
  for (const service of game.services) {
    test(`${game.name}: ${service.slug} is a valid, priced order with fulfillment details`, () => {
      const order = initialGameOrder(game, service.slug);
      const parsed = parseCatalogGameOrder(order);
      assert.ok(parsed);
      assert.ok(computeOrderPrice(parsed).total >= .5);
      const description = describeOrder(parsed);
      assert.ok(description.name.includes(game.name));
      assert.ok(description.description.includes(order.server));
      assert.ok(description.description.includes(order.role));
      assert.ok(description.description.length <= 500);
    });
  }
}
const dota = findAdditionalGame('dota-2-boost');
const base = initialGameOrder(dota, 'rank-progression');
test('rating progression increases monotonically and supports exact current ratings', () => {
  assert.ok(computeOrderPrice({...base, target: 4000}).total > computeOrderPrice(base).total);
  assert.ok(computeOrderPrice({...base, current: 2051}).total < computeOrderPrice(base).total);
  assert.ok(Number.isFinite(computeOrderPrice({...base, current: 2051}).total));
});
test('target bounds, NaN, fractions, and reverse climbs are rejected', () => {
  for (const patch of [{target:base.current}, {target:0}, {target:10001}, {target:Infinity}, {current:NaN}, {current:-1}, {quantity:1.5}, {progress:100}]) {
    assert.equal(parseCatalogGameOrder({...base,...patch}),null,JSON.stringify(patch));
    assert.ok(Number.isNaN(catalogGameSubtotal({...base,...patch})));
  }
});
test('unknown games, services, regions, roles, platforms, and invalid option types are rejected', () => {
  for (const patch of [{game:'fake-game'}, {service:'raids'}, {server:'fake'}, {role:'fake'}, {platform:'Xbox'}, {mode:'fake'}, {queueType:'free'}, {express:'false'}, {specificBooster:42}, {recordedSession:true}, {progress:20}]) {
    assert.equal(parseCatalogGameOrder({...base,...patch}),null,JSON.stringify(patch));
  }
});
test('client-supplied totals and unsupported extras cannot override server pricing', () => {
  const parsed = parseCatalogGameOrder({...base,total:0,subtotal:-500,discount:100,duoBoosterCount:50,vipPriority:true});
  assert.ok(parsed);
  assert.equal('total' in parsed,false);
  assert.equal('vipPriority' in parsed,false);
  assert.equal(computeOrderPrice(parsed).total,computeOrderPrice(base).total);
});
test('duo and express modifiers are reflected in the calculated subtotal', () => {
  assert.ok(Math.abs(catalogGameSubtotal({...base,queueType:'Duo'}) / catalogGameSubtotal(base) - 1.3) < 1e-9);
  assert.ok(Math.abs(computeOrderPrice({...base,express:true}).subtotal / computeOrderPrice(base).subtotal - 1.2) < 1e-9);
});
test('promo and volume discounts are itemized consistently', () => {
  const price = computeOrderPrice({...base,promoCode:'WELCOME6'});
  assert.equal(price.promoDiscount,price.subtotal*.06);
  assert.ok(Math.abs(price.total-(price.subtotal-price.promoDiscount-price.extraDiscount))<1e-9);
});
test('every tier ladder excludes reverse progression and prices its top target', () => {
  for (const game of ADDITIONAL_GAMES.filter(game=>game.tiers.length)) {
    const order=initialGameOrder(game,'rank-progression');
    const maximum=rankSteps(game).length-1;
    assert.ok(parseCatalogGameOrder({...order,current:maximum-1,target:maximum}));
    assert.equal(parseCatalogGameOrder({...order,current:maximum,target:maximum}),null);
    assert.ok(computeOrderPrice({...order,target:maximum}).total>computeOrderPrice(order).total);
  }
});
test('existing rank progress reduces only the starting division price', () => {
  const game=findAdditionalGame('league-of-legends-boost');
  const order=initialGameOrder(game,'rank-progression');
  assert.ok(computeOrderPrice({...order,progress:80}).total<computeOrderPrice(order).total);
});
test('Rocket League Duel cannot be purchased as a duo service', () => {
  const order=initialGameOrder(findAdditionalGame('rocket-league-boost'),'rank-progression');
  assert.equal(parseCatalogGameOrder({...order,mode:'Duel (1v1)',queueType:'Duo'}),null);
  assert.ok(parseCatalogGameOrder({...order,mode:'Duel (1v1)',queueType:'Solo'}));
});
test('coaching extras are charged and included in fulfillment details', () => {
  const order={...initialGameOrder(dota,'coaching'),recordedSession:true,customFocus:true};
  const plain=computeOrderPrice({...order,recordedSession:false,customFocus:false});
  assert.ok(Math.abs(computeOrderPrice(order).subtotal/plain.subtotal-1.25)<1e-9);
  assert.ok(gameOrderSummary(order).some(([key])=>key==='Recording'));
  assert.equal(parseCatalogGameOrder({...order,express:true}),null);
});
test('WoW dungeon and raid configuration affects price and rejects invalid choices', () => {
  const wow=findAdditionalGame('world-of-warcraft-boost');
  const dungeon=initialGameOrder(wow,'dungeons');
  assert.ok(computeOrderPrice({...dungeon,current:10}).total>computeOrderPrice(dungeon).total);
  assert.ok(computeOrderPrice({...dungeon,quantity:4}).total>computeOrderPrice(dungeon).total);
  assert.equal(parseCatalogGameOrder({...dungeon,current:21}),null);
  assert.equal(parseCatalogGameOrder({...dungeon,quantity:9}),null);
  assert.equal(parseCatalogGameOrder({...dungeon,characterClass:'fake'}),null);
  const raid=initialGameOrder(wow,'raids');
  assert.ok(computeOrderPrice({...raid,difficulty:'Heroic'}).total>computeOrderPrice(raid).total);
  assert.ok(computeOrderPrice({...raid,raidScope:'Final boss'}).total<computeOrderPrice(raid).total);
  assert.equal(parseCatalogGameOrder({...raid,difficulty:'fake'}),null);
});
test('the original four game pricing paths still produce finite totals', () => {
  for (const order of [
    {serviceType:'rank-up',currentRank:'Silver',currentDivision:'V',desiredRank:'Gold',desiredDivision:'V'},
    {serviceType:'valorant-rank',currentRank:'Silver',currentDivision:'I',desiredRank:'Gold',desiredDivision:'I',currentRr:0},
    {serviceType:'overwatch-rank',currentRank:'Silver',currentDivision:'5',desiredRank:'Gold',desiredDivision:'5',currentProgress:0,role:'Damage'},
    {serviceType:'cs2-premier',currentRating:5000,desiredRating:10000},
  ]) assert.ok(Number.isFinite(computeOrderPrice(order).total));
});
test('WoW roles match class capabilities and Fortnite coaching matches the selected mode', () => {
  const wow=initialGameOrder(findAdditionalGame('world-of-warcraft-boost'),'coaching');
  assert.equal(parseCatalogGameOrder({...wow,characterClass:'Mage',role:'Tank'}),null);
  assert.ok(parseCatalogGameOrder({...wow,characterClass:'Mage',role:'Damage'}));
  const fortnite=initialGameOrder(findAdditionalGame('fortnite-boost'),'coaching');
  assert.equal(parseCatalogGameOrder({...fortnite,mode:'Zero Build',focus:'Building & edits'}),null);
  assert.ok(parseCatalogGameOrder({...fortnite,mode:'Battle Royale',focus:'Building & edits'}));
});

const coachingGames = ADDITIONAL_GAMES.filter(game => game.coachingOnly);
test('every specialist coaching service bills hours and its optional coaching extras', () => {
  for (const game of coachingGames) for (const service of game.services) {
    const oneHour = {...initialGameOrder(game, service.slug), quantity: 1};
    const threeHours = {...oneHour, quantity: 3};
    assert.equal(catalogGameSubtotal(threeHours), catalogGameSubtotal(oneHour) * 3);
    const extra = {...oneHour, recordedSession: true, customFocus: true};
    assert.ok(parseCatalogGameOrder(extra));
    assert.ok(Math.abs(computeOrderPrice(extra).subtotal / computeOrderPrice(oneHour).subtotal - 1.25) < 1e-9);
    for (const patch of [{quantity: 0}, {quantity: 11}, {quantity: 1.5}, {queueType: 'Duo'}, {express: true}, {current: 10}, {target: 2}]) {
      assert.equal(parseCatalogGameOrder({...oneHour, ...patch}), null);
    }
  }
});
test('specialist coaching requires a supported rank, activity, or session goal', () => {
  for (const game of coachingGames) for (const service of game.services) {
    const order = initialGameOrder(game, service.slug);
    assert.equal(parseCatalogGameOrder({...order, sessionOption: undefined}), null);
    assert.equal(parseCatalogGameOrder({...order, sessionOption: 'Not an available option'}), null);
    const selected = service.setup.options.at(-1);
    const parsed = parseCatalogGameOrder({...order, sessionOption: selected, total: 0});
    assert.ok(parsed);
    assert.ok(gameOrderSummary(parsed).some(([label, value]) => label === service.setup.label && value === selected));
    assert.equal(parsed.total, undefined);
  }
});
test('Destiny activities and coaching topics cannot leak between services', () => {
  const game = findAdditionalGame('destiny-2-coaching');
  const raid = initialGameOrder(game, 'raid-coaching');
  const dungeon = initialGameOrder(game, 'dungeon-coaching');
  assert.equal(parseCatalogGameOrder({...raid, sessionOption: 'Prophecy'}), null);
  assert.equal(parseCatalogGameOrder({...dungeon, sessionOption: 'Vault of Glass'}), null);
  assert.equal(parseCatalogGameOrder({...raid, focus: 'Solo preparation'}), null);
  assert.ok(parseCatalogGameOrder({...dungeon, sessionOption: 'Prophecy', focus: 'Solo preparation', role: 'Warlock'}));
});
test('FC Ultimate Team services reject other modes while tactics supports friendlies', () => {
  const game = findAdditionalGame('ea-sports-fc-27-coaching');
  for (const service of ['coaching', 'squad-review']) {
    const order = initialGameOrder(game, service);
    assert.equal(parseCatalogGameOrder({...order, mode: 'Kick Off / Online Friendlies'}), null);
  }
  const tactics = initialGameOrder(game, 'tactics-coaching');
  assert.ok(parseCatalogGameOrder({...tactics, mode: 'Kick Off / Online Friendlies'}));
});
test('TFT sessions retain the selected queue, rank, and mobile platform', () => {
  const order = {...initialGameOrder(findAdditionalGame('teamfight-tactics-coaching'), 'composition-planning'), mode: 'Double Up', sessionOption: 'Emerald', platform: 'Mobile', focus: 'Pivot decisions'};
  assert.ok(parseCatalogGameOrder(order));
  const summary = Object.fromEntries(gameOrderSummary(order));
  assert.equal(summary.Queue, 'Double Up');
  assert.equal(summary['Current rank'], 'Emerald');
  assert.equal(summary.Platform, 'Mobile');
  assert.equal(summary.Focus, 'Pivot decisions');
});
