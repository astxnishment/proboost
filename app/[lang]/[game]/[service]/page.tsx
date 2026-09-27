import { localizeMetadata } from "../../../lib/localized-metadata";
import { translate } from "../../../lib/localization";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import GameServiceConfigurator from "../../../components/games/GameServiceConfigurator";
import { ADDITIONAL_GAMES, findAdditionalGame } from "../../../lib/additional-games";
import { ALL_LANGS, isSupportedLanguage, langAlternates } from "../../../lib/site";

type Props = { params: Promise<{ lang: string; game: string; service: string }> };
export const dynamicParams = false;

export function generateStaticParams() {
  return ALL_LANGS.flatMap(lang => ADDITIONAL_GAMES.flatMap(game => game.services.map(service => ({ lang, game: game.slug, service: service.slug }))));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, game: slug, service: serviceSlug } = await params;
  const game = findAdditionalGame(slug);
  const service = game?.services.find(item => item.slug === serviceSlug);
  if (!isSupportedLanguage(lang) || !game || !service) notFound();
  const path = `${game.slug}/${service.slug}`;
  const translatedTitle = translate(lang, service.title);
  return localizeMetadata({ title: service.title.startsWith(game.name) ? translatedTitle : `${game.name} — ${translatedTitle}`, description: service.description, alternates: { canonical: `/${lang}/${path}`, languages: langAlternates(path) } }, lang);
}

export default async function Page({ params }: Props) {
  const { lang, game: slug, service: serviceSlug } = await params;
  const game = findAdditionalGame(slug);
  const service = game?.services.find(item => item.slug === serviceSlug);
  if (!isSupportedLanguage(lang) || !game || !service) notFound();
  return <GameServiceConfigurator key={`${game.slug}/${service.slug}`} game={game} service={service} language={lang} />;
}
