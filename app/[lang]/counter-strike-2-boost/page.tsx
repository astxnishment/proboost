import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Cs2BoostingPage from "../../components/Cs2BoostingPage";
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
    title: "Counter-Strike 2 Boosting Services",
    description:
      "Configure CS2 Competitive rank boosts, Premier rating, Competitive wins, and FACEIT levelling.",
    alternates: {
      canonical: `/${lang}/counter-strike-2-boost`,
      languages: langAlternates("counter-strike-2-boost"),
    },
  };
}

export default async function LocalizedCs2BoostPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isSupportedLanguage(lang)) notFound();

  return (
    <Cs2BoostingPage basePath={`/${lang}/counter-strike-2-boost`} />
  );
}
