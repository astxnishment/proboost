import type { MetadataRoute } from "next";
import { ADDITIONAL_GAMES } from "./lib/additional-games";
import { ALL_LANGS, SITE_URL, langAlternates } from "./lib/site";
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
  const entries: MetadataRoute.Sitemap = [];

  function localizedEntry(
    lang: string,
    path: string,
    changeFrequency: "weekly" | "monthly",
    priority: number,
  ): MetadataRoute.Sitemap[number] {
    const languages = Object.fromEntries(
      Object.entries(langAlternates(path)).map(([language, href]) => [
        language,
        new URL(href, SITE_URL).toString(),
      ]),
    );

    return {
      url: languages[lang],
      alternates: { languages },
      changeFrequency,
      priority,
    };
  }

  for (const lang of ALL_LANGS) {
    for (const path of ["", "contact", "terms", "privacy"]) {
      entries.push(localizedEntry(lang, path, "monthly", path ? 0.4 : 0.9));
    }
    for (const game of ADDITIONAL_GAMES) {
      for (const path of [game.slug, ...game.services.map(service => `${game.slug}/${service.slug}`)]) {
        entries.push(localizedEntry(lang, path, "weekly", lang === "en" ? 0.8 : 0.6));
      }
    }
    entries.push(localizedEntry(lang, "valorant-boost", "weekly", lang === "en" ? 0.9 : 0.7));
    for (const service of VALORANT_SERVICE_SLUGS) {
      entries.push(localizedEntry(lang, `valorant-boost/${service}`, "weekly", lang === "en" ? 0.9 : 0.7));
    }
    entries.push(localizedEntry(lang, "counter-strike-2-boost", "weekly", lang === "en" ? 0.9 : 0.7));
    for (const service of CS2_SERVICE_SLUGS) {
      entries.push(localizedEntry(lang, `counter-strike-2-boost/${service}`, "weekly", lang === "en" ? 0.9 : 0.7));
    }
    entries.push(localizedEntry(lang, "overwatch-2-boost", "weekly", lang === "en" ? 0.9 : 0.7));
    for (const service of OVERWATCH_SERVICE_SLUGS) {
      entries.push(localizedEntry(lang, `overwatch-2-boost/${service}`, "weekly", lang === "en" ? 0.9 : 0.7));
    }
    entries.push(localizedEntry(lang, "rainbow-six-siege-boost", "weekly", lang === "en" ? 0.9 : 0.7));
    for (const service of SIEGE_SERVICE_PAGES) {
      entries.push(localizedEntry(lang, `rainbow-six-siege-boost/${service}`, "weekly", lang === "en" ? 0.9 : 0.7));
    }
  }

  return entries;
}
