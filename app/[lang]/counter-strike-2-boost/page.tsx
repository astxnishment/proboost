import { gameMetadata } from "../../lib/game-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Cs2BoostingPage from "../../components/Cs2BoostingPage";
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

  return gameMetadata("counter-strike-2-boost", lang);
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
