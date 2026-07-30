import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ValorantBoostingPage from "../../components/ValorantBoostingPage";
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
    title: "Valorant Boosting Services",
    description:
      "Professional Valorant rank boosting, placement matches, competitive wins, and coaching from verified specialists.",
    alternates: {
      canonical: `/${lang}/valorant-boost`,
      languages: langAlternates("valorant-boost"),
    },
  };
}

export default async function LangValorantBoostPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isSupportedLanguage(lang)) notFound();

  return (
    <ValorantBoostingPage basePath={`/${lang}/valorant-boost`} />
  );
}
