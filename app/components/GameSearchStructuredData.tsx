import { ADDITIONAL_GAMES } from "../lib/additional-games";
import { CS2_SERVICE_CONFIG, CS2_SERVICE_SLUGS } from "../lib/cs2";
import { getGameSeo } from "../lib/game-seo";
import { GAME_DIRECTORY } from "../lib/games";
import { translate } from "../lib/localization";
import { OVERWATCH_SERVICE_CONFIG, OVERWATCH_SERVICE_SLUGS } from "../lib/overwatch";
import { isSupportedLanguage, SITE_URL } from "../lib/site";
import { VALORANT_SERVICE_CONFIG, VALORANT_SERVICE_SLUGS } from "../lib/valorant";

const DEDICATED_SERVICES: Record<string, readonly { slug: string; title: string }[]> = {
  "rainbow-six-siege-boost": [
    { slug: "rainbow-six-siege-rank-boost", title: "Rainbow Six Siege Rank Boost" },
    { slug: "champion", title: "Champion Rank Boost" },
    { slug: "competitive", title: "Competitive Wins" },
    { slug: "unrated", title: "Unrated Matches" },
    { slug: "elearning", title: "E-Learning" },
  ],
  "counter-strike-2-boost": CS2_SERVICE_SLUGS.map(slug => ({ slug, title: CS2_SERVICE_CONFIG[slug].title })),
  "valorant-boost": VALORANT_SERVICE_SLUGS.map(slug => ({ slug, title: VALORANT_SERVICE_CONFIG[slug].title })),
  "overwatch-2-boost": OVERWATCH_SERVICE_SLUGS.map(slug => ({ slug, title: OVERWATCH_SERVICE_CONFIG[slug].title })),
};

export default function GameSearchStructuredData({ slug, language }: { slug: string; language: string }) {
  const game = GAME_DIRECTORY.find(game => game.slug === slug);
  if (!game || !isSupportedLanguage(language)) return null;

  const seo = getGameSeo(slug, language);
  if (!seo) return null;
  const additionalGame = ADDITIONAL_GAMES.find(game => game.slug === slug);
  const services = additionalGame?.services ?? DEDICATED_SERVICES[slug] ?? [];
  const homeUrl = new URL(`/${language}`, SITE_URL).toString();
  const gameUrl = new URL(`/${language}/${slug}`, SITE_URL).toString();
  const provider = {
    "@type": "Organization",
    "@id": new URL("/#organization", SITE_URL).toString(),
    name: "ProBoost",
    url: SITE_URL,
  };

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BreadcrumbList",
        "@id": `${gameUrl}#breadcrumbs`,
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "ProBoost", item: homeUrl },
          { "@type": "ListItem", position: 2, name: game.name, item: gameUrl },
        ],
      },
      {
        "@type": "Service",
        "@id": `${gameUrl}#service`,
        name: seo.heading,
        serviceType: `${game.name} ${additionalGame?.coachingOnly ? "coaching" : "boosting"}`,
        description: seo.description,
        url: gameUrl,
        provider,
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: seo.heading,
          itemListElement: services.map(service => {
            const url = `${gameUrl}/${service.slug}`;
            return {
              "@type": "Offer",
              url,
              itemOffered: {
                "@type": "Service",
                name: translate(language, service.title),
                url,
              },
            };
          }),
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}
