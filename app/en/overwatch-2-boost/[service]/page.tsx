import type { Metadata } from "next";
import { notFound } from "next/navigation";
import OverwatchServiceConfigurator from "@/app/components/overwatch/OverwatchServiceConfigurator";
import { langAlternates } from "@/app/lib/site";
import {
  isOverwatchServiceSlug,
  OVERWATCH_SERVICE_CONFIG,
  OVERWATCH_SERVICE_SLUGS,
} from "@/app/lib/overwatch";

export function generateStaticParams() {
  return OVERWATCH_SERVICE_SLUGS.map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  if (!isOverwatchServiceSlug(service)) notFound();

  const config = OVERWATCH_SERVICE_CONFIG[service];
  const path = `overwatch-2-boost/${service}`;

  return {
    title: config.title,
    description: config.metadataDescription,
    alternates: {
      canonical: `/en/${path}`,
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

export default async function EnglishOverwatchServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  if (!isOverwatchServiceSlug(service)) notFound();

  return (
    <OverwatchServiceConfigurator
      service={service}
      basePath="/en/overwatch-2-boost"
    />
  );
}
