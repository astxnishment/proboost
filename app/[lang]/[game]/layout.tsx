import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import DocumentLanguage from "../../components/DocumentLanguage";
import { findAdditionalGame } from "../../lib/additional-games";
import { isSupportedLanguage } from "../../lib/site";

export default async function Layout({ children, params }: { children: ReactNode; params: Promise<{ lang: string; game: string }> }) {
  const { lang, game } = await params;
  if (!isSupportedLanguage(lang) || !findAdditionalGame(game)) notFound();
  return <><DocumentLanguage lang={lang} />{children}</>;
}
