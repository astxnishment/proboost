import { gameMetadata } from "../../lib/game-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ValorantBoostingPage from "../../components/ValorantBoostingPage";
import {
  isSupportedLanguage,
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

  return gameMetadata("valorant-boost", lang);
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
