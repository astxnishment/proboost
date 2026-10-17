import { gameMetadata } from "../../lib/game-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiegeBoostingPage from "../../boosting/page";
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

  return gameMetadata("rainbow-six-siege-boost", lang);
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
