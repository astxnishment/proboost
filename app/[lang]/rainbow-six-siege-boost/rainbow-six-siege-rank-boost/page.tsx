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
      "Climb from any rank to Champion with verified Rainbow Six Siege boosters. Transparent pricing, solo or duo queue, all platforms and regions.",
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
