import ProBoostCalculator from "../../../boosting/rank-up/page";

const SUPPORTED_LANGS = ["it", "fr", "es", "de", "nl", "pt", "uk", "ru"] as const;

export function generateStaticParams() {
  return SUPPORTED_LANGS.map((lang) => ({ lang }));
}

export default async function LangRainbowSixSiegeRankBoostPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  return <ProBoostCalculator defaultLang={lang} />;
}
