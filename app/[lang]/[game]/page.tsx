import { localizeMetadata } from "../../lib/localized-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import AdditionalGamePage from "../../components/AdditionalGamePage";
import { ADDITIONAL_GAMES, findAdditionalGame } from "../../lib/additional-games";
import { ALL_LANGS, isSupportedLanguage, langAlternates } from "../../lib/site";

type Props = { params: Promise<{ lang: string; game: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_LANGS.flatMap(lang => ADDITIONAL_GAMES.map(game => ({ lang, game: game.slug })));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, game: slug } = await params;
  const game = findAdditionalGame(slug);
  if (!isSupportedLanguage(lang) || !game) notFound();
  return localizeMetadata({ title: `${game.name} Services & Coaching`, description: game.description, alternates: { canonical: `/${lang}/${game.slug}`, languages: langAlternates(game.slug) } }, lang);
}

export default async function Page({ params }: Props) {
  const { lang, game: slug } = await params;
  const game = findAdditionalGame(slug);
  if (!isSupportedLanguage(lang) || !game) notFound();
  return <AdditionalGamePage game={game} language={lang} />;
}
