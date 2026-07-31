import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OverwatchServiceConfigurator from "@/app/components/overwatch/OverwatchServiceConfigurator";
import {
  isSupportedLanguage,
  langAlternates,
  SUPPORTED_LANGS,
} from "@/app/lib/site";
import {
  isOverwatchServiceSlug,
  OVERWATCH_SERVICE_CONFIG,
  OVERWATCH_SERVICE_SLUGS,
} from "@/app/lib/overwatch";

export function generateStaticParams() {
  return SUPPORTED_LANGS.flatMap((lang) =>
    OVERWATCH_SERVICE_SLUGS.map((service) => ({ lang, service }))
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; service: string }>;
}): Promise<Metadata> {
  const { lang, service } = await params;
  if (!isSupportedLanguage(lang) || !isOverwatchServiceSlug(service)) {
    notFound();
  }

  const config = OVERWATCH_SERVICE_CONFIG[service];
  const path = `overwatch-2-boost/${service}`;

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
          url: "/homepage/overwatch-homepage.webp",
          width: 880,
          height: 880,
          alt: config.title,
        },
      ],
    },
  };
}

export default async function LocalizedOverwatchServicePage({
  params,
}: {
  params: Promise<{ lang: string; service: string }>;
}) {
  const { lang, service } = await params;
  if (!isSupportedLanguage(lang) || !isOverwatchServiceSlug(service)) {
    notFound();
  }

  return (
    <OverwatchServiceConfigurator
      service={service}
      basePath={`/${lang}/overwatch-2-boost`}
    />
  );
}
