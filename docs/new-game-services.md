# TFT, Destiny 2, and EA SPORTS FC 27

Added September 26, 2026. These three games offer nine timed, one-to-one coaching services. All are included in the homepage, game selector, generated routes, metadata, sitemap, and shared server-side checkout validation.

## Services and prices

| Game | Services | Starter hourly rate (GBP) |
| --- | --- | --- |
| Teamfight Tactics | Ranked coaching, composition planning, match/replay review | £24 |
| Destiny 2 | Raid coaching, dungeon coaching, Guardian build review | £27 |
| EA SPORTS FC 27 | Ultimate Team coaching, tactics workshop, squad review | £24 |

Rates are editable draft business prices in `app/lib/additional-pricing.ts`, not researched market quotes. Review prices and specialist availability before accepting paid orders. Existing shared add-ons, promotions, and currency conversion apply. Stripe still requires the site's payment configuration; adding these routes does not activate payments or fulfilment.

The selected rank, activity, experience, or squad goal is required, validated against the service's options, and preserved in the checkout description. Topics are restricted to the selected service. FC gameplay coaching and squad reviews require Ultimate Team; the tactics workshop also supports friendlies. New services do not offer account piloting, coin purchases, guaranteed ranks, loot, or a complete Destiny fireteam.

TFT reviews require a customer-provided match recording. Destiny customers need access to their selected content; they book coaching time, not a promised clear. FC reviews use the customer's existing squad and in-game budget. These preparation details appear in each order form.

## Official references and artwork

- [TFT homepage](https://teamfighttactics.leagueoflegends.com/en-us/) — PC, Mac, mobile support; official Pengu artwork, TFT logo, and trophy icon. Source assets are served by Riot's `cmsassets.rgpub.io` and saved unchanged in `public/games/tft/`.
- [TFT ranked FAQ](https://support.riotgames.com/en-us/tft/account/teamfight-tactics-ranked-faq) — current rank labels. The configurator does not promise a particular set, composition, or patch outcome.
- [Destiny 2 Steam store](https://store.steampowered.com/app/1085660/Destiny_2/) — Bungie library hero and tricorn icon, saved unchanged in `public/games/destiny-2/`.
- [Bungie content guide](https://help.bungie.net/hc/en-us/articles/44243991218196--2-Available-Content-Expansions-Seasons-and-More) and [Renegades launch](https://www.bungie.net/7/en/News/Article/renegades_launch_blog) — raid/dungeon access and Equilibrium. This catalogue does not advertise upcoming seasons or updates.
- [EA SPORTS FC 27](https://www.ea.com/games/ea-sports-fc/fc-27) — official key art, gameplay screenshot, FC 27 logo, platform and mode information. Source assets are served by EA's `drop-assets.ea.com` and saved unchanged in `public/games/ea-fc-27/`.

Publisher artwork and trademarks belong to their respective owners. No game logo has been generated or substituted from another title.

## Validation

Run `npm run test:catalog`, `npm run test:chat`, `npx eslint app tests`, and `npm run build`. The catalogue tests cover all nine default orders, duration pricing, optional extras, invalid activities/ranks/topics, game-mode restrictions, and fulfilment summaries. Browser review should include game search aliases (`tft`, `destiny`, `fifa`), mobile layout, and updating selections in the order summary.
