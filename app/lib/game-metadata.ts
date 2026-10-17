import type { Metadata } from "next";
import { getGameSeo } from "./game-seo";
import { langAlternates } from "./site";

const SHARE_IMAGES: Record<string, { url: string; width: number; height: number }> = {
  "rainbow-six-siege-boost": { url: "/homepage/r6-homepage.webp", width: 880, height: 880 },
  "counter-strike-2-boost": { url: "/cs2/cs2-hero.webp", width: 1672, height: 941 },
  "valorant-boost": { url: "/valorant/valorant-hero-v2.webp", width: 1672, height: 941 },
  "overwatch-2-boost": { url: "/homepage/overwatch-homepage.webp", width: 880, height: 880 },
};

export function gameMetadata(slug: string, language = "en"): Metadata {
  const seo = getGameSeo(slug, language);
  if (!seo) throw new Error(`Unknown game catalog: ${slug}`);
  const canonical = `/${language}/${slug}`;
  const image = SHARE_IMAGES[slug] ?? { url: "/brand/proboost-og.webp", width: 1200, height: 630 };

  return {
    title: seo.title,
    description: seo.description,
    alternates: { canonical, languages: langAlternates(slug) },
    openGraph: {
      type: "website",
      siteName: "ProBoost",
      title: `${seo.title} | ProBoost`,
      description: seo.description,
      url: canonical,
      images: [{ ...image, alt: seo.heading }],
    },
    twitter: {
      card: "summary_large_image",
      title: `${seo.title} | ProBoost`,
      description: seo.description,
      images: [image.url],
    },
  };
}
