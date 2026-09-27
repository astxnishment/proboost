import { localizeMetadata } from "../../../lib/localized-metadata";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Champion from "../../../boosting/champion/page";
import Competitive from "../../../boosting/competitive/page";
import Unrated from "../../../boosting/unrated/page";
import Coaching from "../../../boosting/elearning/page";
import { SUPPORTED_LANGS, isSupportedLanguage, langAlternates } from "../../../lib/site";
import { translate } from "../../../lib/localization";

const services = {
  champion: { component: Champion, title: "Champion Rank Boost", description: "Push your Rainbow Six Siege Champion MMR points to your target with verified top boosters. Guaranteed results on PC, Xbox, and PlayStation." },
  competitive: { component: Competitive, title: "Rainbow Six Siege Competitive Wins", description: "Choose your platform, set your goal, and customize your order." },
  unrated: { component: Unrated, title: "Rainbow Six Siege Unrated Matches", description: "Choose your platform, set your goal, and customize your order." },
  elearning: { component: Coaching, title: "Rainbow Six Siege Coaching", description: "Choose your platform, set your goal, and customize your order." },
} as const;
type Props = { params: Promise<{ lang: string; service: string }> };
export const dynamicParams = false;
export function generateStaticParams() {
  return SUPPORTED_LANGS.flatMap(lang => Object.keys(services).map(service => ({ lang, service })));
}
function getService(service: string) { return services[service as keyof typeof services]; }
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, service } = await params;
  const config = getService(service);
  if (!isSupportedLanguage(lang) || !config) notFound();
  const path = `rainbow-six-siege-boost/${service}`;
  return localizeMetadata({ title: translate(lang, config.title), description: translate(lang, config.description), alternates: { canonical: `/${lang}/${path}`, languages: langAlternates(path) } }, lang);
}
export default async function Page({ params }: Props) {
  const { lang, service } = await params;
  const config = getService(service);
  if (!isSupportedLanguage(lang) || !config) notFound();
  const Component = config.component;
  return <Component />;
}
