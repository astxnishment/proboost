import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Content from "../../login/page";
import { ALL_LANGS, isSupportedLanguage, langAlternates } from "../../lib/site";
import { localizeMetadata } from "../../lib/localized-metadata";
type Props = { params: Promise<{ lang: string }> };
export const dynamicParams = false;
export function generateStaticParams() { return ALL_LANGS.map(lang => ({ lang })); }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang } = await params;
  if (!isSupportedLanguage(lang)) notFound();
  return localizeMetadata({ title: 'Log in to ProBoost', description: 'Access your ProBoost account.', alternates: { canonical: `/${lang}/login`, languages: langAlternates('login') } }, lang);
}
export default async function Page({ params }: Props) {
  const { lang } = await params;
  if (!isSupportedLanguage(lang)) notFound();
  return <Content />;
}
