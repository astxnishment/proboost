# ProBoost Google Ads launch draft

Prepared 29 September 2026. This is a setup draft, not a campaign created in Google Ads.

## Current status

- The user approved £20 average/day, Rainbow Six Siege and United Kingdom targeting, and authorized a separate ProBoost Ads account.
- A new ProBoost Ads account, 281-690-8376, has been created. Business name and the R6 landing page are filled in. Setup is waiting for the user's confirmation of Google's website-image use declaration. No ProBoost campaign has been created and no advertising spend has been enabled. The unrelated Origin Repairs account, 624-336-6664, is unchanged.
- Real Google Ads tag and conversion IDs are not available. Website measurement remains disabled without both configuration values below.
- Search Console ownership of `proboost.gg` is already verified. The page-indexing report, last updated 21 September, showed 13 indexed pages; the overview also showed 10 search clicks. On 29 September, the sitemap was submitted successfully and reported 625 discovered URLs before the published SEO release consolidated the canonical sitemap to 621. Indexing requests for `/en` and the Spanish and Italian Overwatch pages were accepted. Sitemap submission does not guarantee indexing.
- Direct URL inspection on 29 September confirms the R6 rank-boost landing URL is already indexed: “URL is on Google” and “Page is indexed”.

## Budget and decision rule

£20/day is enough for a focused experiment; it cannot promise sales or profitability. For most campaigns, Google's average daily budget can spend up to twice that amount on an individual day and 30.4 times it in a month: £40/day and approximately £608/month if the budget stays unchanged. [Google budget documentation](https://support.google.com/google-ads/answer/6385083/about-average-daily-budgets?hl=en-GB)

Illustration only, not a forecast: £1 cost per click and a 2% purchase rate imply a £50 acquisition cost (`CPA = CPC ÷ purchase rate`). The contribution from an order after booster pay, payment fees and other variable costs must exceed that CPA to cover advertising. Confirm actual margins before selecting a target CPA. The site's claim that boosters retain 90% of earnings is not verified financial data.

Use one selected game and one selected market initially. Review search terms and verified purchases daily during the first test. Stop irrelevant terms promptly; choose a total test-spend limit and review date before launch. A Google average daily budget alone is not a hard £20 daily cap.

## Proposed campaign settings

| Setting | Draft value |
| --- | --- |
| Status | Not yet created; keep paused until account, billing and measurement are ready |
| Campaign | ProBoost — Search — R6 — UK |
| Budget | £20 average/day total, not £20 for each game |
| Network | Google Search only initially; Search Partners and Display off |
| Location | United Kingdom; presence targeting |
| Language | English for the English landing pages below |
| Keywords | Exact and phrase; review search terms because close variants still apply |
| Initial bidding | Decide after Keyword Planner estimates and real margin are available; use a CPC ceiling compatible with margin and conservative conversion assumptions |
| Primary conversion | Stripe-confirmed live purchase, dynamic value/currency, count every purchase, unique payment reference |
| Secondary actions | Checkout or contact can be diagnostic only; do not count them as purchases |
| Expansion | Keep automatic keyword/URL expansion off for the initial controlled test |

Presence targeting reaches people Google believes are in or regularly in the selected location. Exact and phrase keywords can still match close variants. [Google location options](https://developers.google.com/google-ads/api/docs/targeting/location-targeting), [close variants](https://support.google.com/google-ads/answer/9342105?hl=en-AU)

## Approved first campaign: Rainbow Six Siege

Final URL: https://proboost.gg/en/rainbow-six-siege-boost/rainbow-six-siege-rank-boost

Display paths: `r6-boost` / `rank-options`

Headlines (all at most 30 characters):

1. Rainbow Six Siege Boosting
2. R6 Rank Boost | ProBoost
3. Choose Your Target Rank
4. See Your Price Before Checkout
5. Solo Or Duo Queue Options
6. Select Your Platform
7. Configure Your R6 Boost
8. Choose Your Server Region
9. Plan Your Next Rank
10. Customise Your Order

Descriptions (all at most 90 characters):

1. Choose your current rank and target. See the price as you configure your R6 order.
2. Explore solo and duo options. Select your platform and region before checkout.
3. Build your Rainbow Six Siege rank package with ProBoost. Review your options online.
4. Set your target, review your order and pay through Stripe checkout.

Starter keywords:

```text
[r6 boosting]
[r6 rank boost]
[rainbow six siege boosting]
[rainbow six siege rank boost]
"r6 rank boosting"
"rainbow six siege boosting service"
```

Possible sitelinks: [R6 services](https://proboost.gg/en/rainbow-six-siege-boost), [Competitive wins](https://proboost.gg/en/rainbow-six-siege-boost/competitive), [Coaching](https://proboost.gg/en/rainbow-six-siege-boost/elearning), [Contact](https://proboost.gg/en/contact).

The landing-page cleanup replaces absolute ban-protection, unconditional refund and unsupported performance claims with factual configuration, refund and account-responsibility information. Google eligibility and publisher approval have not been established.

## Future alternative: Valorant (not approved for launch)

Final URL: https://proboost.gg/en/valorant-boost/valorant-rank-boost

Display paths: `valorant` / `rank-options`

Headlines (all at most 30 characters):

1. Valorant Rank Boost
2. Valorant Boosting | ProBoost
3. Choose Your Target Rank
4. See Your Price Before Checkout
5. Solo Or Duo Queue Options
6. Set Your Current Rank And RR
7. Configure Your Valorant Boost
8. Choose Your Server Region
9. Select Your Platform
10. Customise Your Order

Descriptions (all at most 90 characters):

1. Choose your current rank, RR and target. See your Valorant order price before checkout.
2. Explore solo and duo options. Select your platform and region to configure your order.
3. Build a Valorant rank package around your current rank and target with ProBoost.
4. Review your rank selection and order total, then pay through Stripe checkout.

Starter keywords:

```text
[valorant boosting]
[valorant rank boost]
[valorant boosting service]
"valorant rank boosting"
"buy valorant rank boost"
```

Possible sitelinks: [Valorant services](https://proboost.gg/en/valorant-boost), [Placement matches](https://proboost.gg/en/valorant-boost/placements), [Coaching](https://proboost.gg/en/valorant-boost/coaching), [Contact](https://proboost.gg/en/contact).

Google responsive search ads allow headlines up to 30 characters and descriptions up to 90. Actual combinations and approval depend on Google. [Ad format documentation](https://support.google.com/google-ads/answer/7684791?hl=en-GB)

## Initial negative keywords

Use these as campaign negatives, then refine with actual search terms. Quoted multiword entries are negative phrase match; single words are negative broad match.

```text
free
hack
hacks
cheat
cheats
aimbot
crack
download
fps
performance
job
jobs
salary
"become a booster"
"buy account"
"buy accounts"
"accounts for sale"
"account for sale"
"rank tracker"
"rank distribution"
```

Negative keywords do not expand to all close variants, so include relevant singular/plural forms. [Google negative keyword documentation](https://support.google.com/google-ads/answer/2453972?hl=en-GB)

## Website configuration and verification

Set these build-time environment variables only after the separate ProBoost account and its website Purchase conversion exist. Leave blank to disable measurement. Use the exact ID and label supplied by Google; these values are public identifiers, not secrets.

```dotenv
NEXT_PUBLIC_GOOGLE_ADS_ID=
NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL=
```

Rebuild and deploy after adding or changing them. Keep `STRIPE_SECRET_KEY` server-only, using the existing production Stripe configuration. Never put it in a `NEXT_PUBLIC_` variable.

The implementation loads no Google tag before explicit opt-in, offers equally presented reject/allow choices, and provides Cookie settings for withdrawal. Personalised advertising and analytics consent remain denied. Only the cookie preference is saved in local storage; customer/order data is not. Withdrawal clears accessible Google Ads cookies and reloads the page without the tag. [Google consent documentation](https://developers.google.com/tag-platform/security/guides/consent)

The success page retrieves the Checkout Session from Stripe on the server and verifies its browser binding, ProBoost origin marker, complete/paid status, amount and currency. Only live payments can send a purchase conversion. The stable Stripe payment-intent ID is the transaction ID; Google deduplicates repeated IDs for the same conversion action. Customer details and Checkout Session IDs are not included in the conversion payload, and measurement URLs remove private query data and fragments while preserving only approved Google ad-click identifiers (gclid, dclid, gbraid, wbraid) for attribution. Referrer URLs omit all queries, and external referrers are blank. [Google transaction IDs](https://support.google.com/google-ads/answer/6386790/use-a-transaction-id-to-minimise-duplicate-conversions?hl=en-GB), [Stripe Session API](https://docs.stripe.com/api/checkout/sessions/retrieve)

Run `npm run test:ads` and the existing localization tests. Before launch, use Google Tag Assistant to verify reject, accept, withdrawal, an actual confirmed payment, accurate amount/currency, preservation of ad-click attribution and transaction-ID deduplication. Do not use test Stripe transactions to inflate the live conversion action. A live payment check must use a real order or an explicitly approved controlled purchase.

This is browser-return measurement: ad blockers, refusal of consent, or a customer not returning from Stripe can cause undercounting. It does not create a durable order database, webhook fulfillment workflow or customer emails. Historical sessions created before the browser-binding change cannot be confirmed by the new success page; support can inspect them directly in Stripe.

New R6 rank-boost checkouts preserve normalized rank, region, platform, queue and add-on choices as readable, versioned `r6_*` fields on both the Stripe Checkout Session and PaymentIntent. This includes the free Play Offline and Specific Operators options. These fulfillment fields are not sent to Google Ads. Specific operator names still need to be agreed with support; only the request toggle is collected by the current form. Historical payments cannot acquire missing selections retroactively.
