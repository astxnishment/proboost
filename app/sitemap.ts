import type { MetadataRoute } from "next";
import { ALL_LANGS, SITE_URL } from "./lib/site";
import { CS2_SERVICE_SLUGS } from "./lib/cs2";
import { VALORANT_SERVICE_SLUGS } from "./lib/valorant";

const EN_SERVICE_PAGES = [
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
      url: `${SITE_URL}/${lang}/rainbow-six-siege-boost`,
      lastModified,
      changeFrequency: "weekly",
      priority: lang === "en" ? 0.9 : 0.7,
    });
    entries.push({
      url: `${SITE_URL}/${lang}/rainbow-six-siege-boost/rainbow-six-siege-rank-boost`,
      lastModified,
      changeFrequency: "weekly",
      priority: lang === "en" ? 0.9 : 0.7,
    });
  }

  for (const page of EN_SERVICE_PAGES.filter((p) => p !== "rainbow-six-siege-rank-boost")) {
    entries.push({
      url: `${SITE_URL}/en/rainbow-six-siege-boost/${page}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.8,
    });
  }

  return entries;
}
