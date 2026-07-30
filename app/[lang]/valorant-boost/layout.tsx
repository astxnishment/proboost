import type { ReactNode } from "react";
import { notFound } from "next/navigation";
import DocumentLanguage from "../../components/DocumentLanguage";
import { isSupportedLanguage } from "../../lib/site";

export default async function LocalizedValorantLayout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!isSupportedLanguage(lang)) notFound();

  return (
    <>
      <DocumentLanguage lang={lang} />
      {children}
    </>
  );
}
