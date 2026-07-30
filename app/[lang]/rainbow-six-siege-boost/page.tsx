import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiegeBoostingPage from "../../boosting/page";
import {
  isSupportedLanguage,
  langAlternates,
  SUPPORTED_LANGS,
} from "../../lib/site";

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!isSupportedLanguage(lang)) notFound();

  return {
    title: "Rainbow Six Siege Boosting",
    description:
      "Professional Rainbow Six Siege boosting: rank boosts, Champion pushes, competitive wins, unrated matches, and coaching from verified top-tier players.",
    alternates: {
      canonical: `/${lang}/rainbow-six-siege-boost`,
      languages: langAlternates("rainbow-six-siege-boost"),
    },
  };
}

export default async function LangRainbowSixSiegeBoostPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isSupportedLanguage(lang)) notFound();

  return (
    <SiegeBoostingPage
      basePath={`/${lang}/rainbow-six-siege-boost`}
      defaultLang={lang}
    />
  );
}
