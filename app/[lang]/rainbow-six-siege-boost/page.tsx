import SiegeBoostingPage from "../../boosting/page";

const SUPPORTED_LANGS = ["it", "fr", "es", "de", "nl", "pt", "uk", "ru"] as const;

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export default async function LangRainbowSixSiegeBoostPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <SiegeBoostingPage basePath={`/${lang}/rainbow-six-siege-boost`} />;
}
