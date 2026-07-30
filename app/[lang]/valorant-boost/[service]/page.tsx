import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ValorantServiceConfigurator from "@/app/components/valorant/ValorantServiceConfigurator";
import {
  isSupportedLanguage,
  langAlternates,
  SUPPORTED_LANGS,
} from "@/app/lib/site";
import {
  isValorantServiceSlug,
  VALORANT_SERVICE_CONFIG,
  VALORANT_SERVICE_SLUGS,
} from "@/app/lib/valorant";

export function generateStaticParams() {
  return SUPPORTED_LANGS.flatMap((lang) =>
    VALORANT_SERVICE_SLUGS.map((service) => ({ lang, service }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; service: string }>;
}): Promise<Metadata> {
  const { lang, service } = await params;
  if (!isSupportedLanguage(lang) || !isValorantServiceSlug(service)) {
    notFound();
  }

  const config = VALORANT_SERVICE_CONFIG[service];
  const path = `valorant-boost/${service}`;

  return {
    title: config.title,
    description: config.metadataDescription,
    alternates: {
      canonical: `/${lang}/${path}`,
      languages: langAlternates(path),
    },
    openGraph: {
      title: `${config.title} | ProBoost`,
      description: config.metadataDescription,
      images: [
        {
          url: "/valorant/valorant-hero-v2.webp",
          width: 1672,
          height: 941,
          alt: config.title,
        },
      ],
    },
  };
}

export default async function LocalizedValorantServicePage({
  params,
}: {
  params: Promise<{ lang: string; service: string }>;
}) {
  const { lang, service } = await params;
  if (!isSupportedLanguage(lang) || !isValorantServiceSlug(service)) {
    notFound();
  }

  return (
    <ValorantServiceConfigurator
      service={service}
      basePath={`/${lang}/valorant-boost`}
    />
  );
}
