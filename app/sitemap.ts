import type { MetadataRoute } from "next";
import { ADDITIONAL_GAMES } from "./lib/additional-games";
import { ALL_LANGS, SITE_URL } from "./lib/site";
import { CS2_SERVICE_SLUGS } from "./lib/cs2";
import { VALORANT_SERVICE_SLUGS } from "./lib/valorant";
import { OVERWATCH_SERVICE_SLUGS } from "./lib/overwatch";

const SIEGE_SERVICE_PAGES = [
  "rainbow-six-siege-rank-boost",
  "champion",
  "competitive",
  "unrated",
  "elearning",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const entries: MetadataRoute.Sitemap = [
    { url: SITE_URL, lastModified, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/contact`, lastModified, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/terms`, lastModified, changeFrequency: "monthly", priority: 0.2 },
    { url: `${SITE_URL}/privacy`, lastModified, changeFrequency: "monthly", priority: 0.2 },
  ];

  for (const lang of ALL_LANGS) {
    for (const path of ["", "/contact", "/terms", "/privacy"]) {
      entries.push({ url: `${SITE_URL}/${lang}${path}`, lastModified, changeFrequency: "monthly", priority: path ? 0.4 : 0.9 });
    }
    for (const game of ADDITIONAL_GAMES) {
      for (const path of [game.slug, ...game.services.map(service => `${game.slug}/${service.slug}`)]) {
        entries.push({ url: `${SITE_URL}/${lang}/${path}`, lastModified, changeFrequency: "weekly", priority: lang === "en" ? 0.8 : 0.6 });
      }
    }
    entries.push({
      url: `${SITE_URL}/${lang}/valorant-boost`,
      lastModified,
      changeFrequency: "weekly",
      priority: lang === "en" ? 0.9 : 0.7,
    });
    for (const service of VALORANT_SERVICE_SLUGS) {
      entries.push({
        url: `${SITE_URL}/${lang}/valorant-boost/${service}`,
        lastModified,
        changeFrequency: "weekly",
        priority: lang === "en" ? 0.9 : 0.7,
      });
    }
    entries.push({
      url: `${SITE_URL}/${lang}/counter-strike-2-boost`,
      lastModified,
      changeFrequency: "weekly",
      priority: lang === "en" ? 0.9 : 0.7,
    });
    for (const service of CS2_SERVICE_SLUGS) {
      entries.push({
        url: `${SITE_URL}/${lang}/counter-strike-2-boost/${service}`,
        lastModified,
        changeFrequency: "weekly",
        priority: lang === "en" ? 0.9 : 0.7,
      });
    }
    entries.push({
      url: `${SITE_URL}/${lang}/overwatch-2-boost`,
      lastModified,
      changeFrequency: "weekly",
      priority: lang === "en" ? 0.9 : 0.7,
    });
    for (const service of OVERWATCH_SERVICE_SLUGS) {
      entries.push({
        url: `${SITE_URL}/${lang}/overwatch-2-boost/${service}`,
        lastModified,
        changeFrequency: "weekly",
        priority: lang === "en" ? 0.9 : 0.7,
      });
    }
    entries.push({
      url: `${SITE_URL}/${lang}/rainbow-six-siege-boost`,
      lastModified,
      changeFrequency: "weekly",
      priority: lang === "en" ? 0.9 : 0.7,
    });
    for (const service of SIEGE_SERVICE_PAGES) {
      entries.push({ url: `${SITE_URL}/${lang}/rainbow-six-siege-boost/${service}`, lastModified, changeFrequency: "weekly", priority: lang === "en" ? 0.9 : 0.7 });
    }
  }

  return entries;
}
