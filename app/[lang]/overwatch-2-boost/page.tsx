import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OverwatchBoostingPage from "../../components/OverwatchBoostingPage";
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
    title: "Overwatch 2 Boosting Services",
    description:
      "Configure Overwatch 2 rank boosting, placements, competitive wins, and private coaching by role, platform, and region.",
    alternates: {
      canonical: `/${lang}/overwatch-2-boost`,
      languages: langAlternates("overwatch-2-boost"),
    },
  };
}

export default async function LangOverwatchBoostPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isSupportedLanguage(lang)) notFound();

  return <OverwatchBoostingPage basePath={`/${lang}/overwatch-2-boost`} />;
}
