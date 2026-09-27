# Language and theme verification

Completed 26 September 2026.

## Coverage

The site supports English, Italian, French, Spanish, German, Dutch, Portuguese, Ukrainian, and Russian. The shared inventory contains 1,842 messages, with matching entries in all eight translated dictionaries. Game and provider names, currency codes, and canonical order values are intentionally preserved.

Localized content includes the homepage, game catalogs and calculators, navigation, footer, contact and support panel, account forms, verification messages, terms, privacy policy, and page metadata. Public pages have locale URLs; missing localized Siege service routes have been restored. Checkout requests carry the chosen language to Stripe, including translated product descriptions where supported. Stripe uses automatic language selection for Ukrainian because the installed API does not expose a Ukrainian checkout locale.

Localization happens while rendering React content. It does not mutate the browser DOM or translate canonical select values, identifiers, order payloads, or event handlers. Quantity labels use locale-aware plural rules and currency displays use locale-aware number formatting. In-memory order drafts retain choices when navigating between languages.

## White theme and browser checks

- Checked all nine homepage languages.
- Checked representative pages for Siege, Valorant, CS2, Overwatch, Marvel Rivals, World of Warcraft, and Teamfight Tactics, including ranking, coaching, and PvE order controls.
- Checked desktop layouts at 1440 × 960 and mobile layouts at 390 × 844. No horizontal page overflow was found in the checked views.
- Corrected pale rank text, long labels, order summary wrapping, and chat launcher overlap with the order column.
- Verified white/dark theme switching and persistence across navigation.
- Verified locale links, page titles, currency display, rank routes, quantity changes, invalid promotion messages, local password-mismatch validation, and support dialog opening/closing and viewport fit.
- Verified that a selected order region survives a language change.
- Checked French terms, Dutch privacy, Portuguese signup, and translated support content. Visible images loaded in the checked views; hidden lazy-loaded account artwork was separately checked on desktop.

## Automated validation

- 68 tests pass: existing catalog/pricing and live-chat controller tests plus localization regressions.
- Translation tests check inventory coverage, interpolation parity, literal UI copy, visible data labels, preserved provider names, canonical form values and handlers, safe React content, locale links, quantities, delivery units, rank divisions, and unchanged payment amounts.
- ESLint passes.
- TypeScript passes as part of the production build and independently.
- Production build succeeds with 668 generated pages using `npm run build -- --webpack`.
- The default Turbopack build encountered a local sandbox restriction when its CSS worker tried to bind a port. Webpack is the documented alternate Next.js production bundler; the project's default build command remains unchanged.
- `npm audit` reports zero known vulnerabilities after updating Next.js to 16.3.6 and compatible dependencies.

## Maintaining translations

Add canonical English UI messages and their translations to `app/lib/locales/messages.json` and each locale dictionary. Use `Localized` at render boundaries and `useLanguage` for explicitly formatted dynamic values. Keep complete phrases together when their word order changes across languages. Never translate the values used to calculate prices or submit orders.

Run `npm run test:localization`, the existing catalog/chat tests, lint, and a production build after relevant changes. The source-copy regression check catches literal JSX text and common visible data properties; unusual dynamic phrases still need browser review.

## Remaining external checks

This pass used machine-assisted translation with manual corrections to key copy, game terminology, and observed errors. It is not a native-speaker review of every sentence. Native review of long-form and legal translations is still needed before publishing them as final commercial copy. Existing commercial promises and policy statements were not independently verified by this technical pass.

Live payment settlement, email delivery, production sign-in/OAuth, and a real support conversation were not performed. Production Clerk/Stripe configuration and the Tawk support inbox still require a separate end-to-end launch check. The support panel currently presents the email fallback when no Tawk widget is configured. Provider-hosted screens have their own localization settings; the site's dictionaries do not translate an external iframe.

Clerk UI localization follows the selected site language using its [official localization package](https://clerk.com/docs/guides/customizing-clerk/localization). Game terminology was checked against publisher pages where available, including Blizzard's [Spanish Demon Hunter](https://worldofwarcraft.blizzard.com/es-es/game/classes/demon-hunter), [French Rogue](https://worldofwarcraft.blizzard.com/fr-fr/game/classes/rogue), [German Evoker](https://worldofwarcraft.blizzard.com/de-de/game/classes/evoker), and [Russian Evoker](https://worldofwarcraft.blizzard.com/ru-ru/game/classes/evoker) pages.
