import { localizeMetadata } from "../../../lib/localized-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProBoostCalculator from "../../../boosting/rank-up/page";
import {
  isSupportedLanguage,
  langAlternates,
  SUPPORTED_LANGS,
} from "../../../lib/site";

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

  return localizeMetadata({
    title: "Rainbow Six Siege Rank Boost",
    description:
      "Choose your current rank and target. Your price and delivery estimate update instantly.",
    alternates: {
      canonical: `/${lang}/rainbow-six-siege-boost/rainbow-six-siege-rank-boost`,
      languages: langAlternates(
        "rainbow-six-siege-boost/rainbow-six-siege-rank-boost"
      ),
    },
  }, lang);
}

export default async function LangRainbowSixSiegeRankBoostPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isSupportedLanguage(lang)) notFound();

  return <ProBoostCalculator />;
}
