import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Content from "../HomePageClient";
import { ALL_LANGS, isSupportedLanguage, langAlternates } from "../lib/site";
import { localizeMetadata } from "../lib/localized-metadata";
type Props = { params: Promise<{ lang: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return ALL_LANGS.map(lang => ({ lang })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isSupportedLanguage(lang)) notFound();
  const metadata = localizeMetadata({ title: 'ProBoost — Rank Boosting by Verified Pros', description: 'Choose your game, set your goal, and customize your order.', alternates: { canonical: `/${lang}`, languages: langAlternates('') } }, lang);
  return { ...metadata, title: { absolute: metadata.title as string } };
}
export default async function Page({ params }: Props) {
  const { lang } = await params;
  if (!isSupportedLanguage(lang)) notFound();
  return <Content />;
}
