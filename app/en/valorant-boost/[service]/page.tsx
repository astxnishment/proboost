import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ValorantServiceConfigurator from "@/app/components/valorant/ValorantServiceConfigurator";
import { langAlternates } from "@/app/lib/site";
import {
  isValorantServiceSlug,
  VALORANT_SERVICE_CONFIG,
  VALORANT_SERVICE_SLUGS,
} from "@/app/lib/valorant";

export function generateStaticParams() {
  return VALORANT_SERVICE_SLUGS.map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  if (!isValorantServiceSlug(service)) notFound();

  const config = VALORANT_SERVICE_CONFIG[service];
  const path = `valorant-boost/${service}`;

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
          url: "/valorant/valorant-hero-v2.webp",
          width: 1672,
          height: 941,
          alt: config.title,
        },
      ],
    },
  };
}

export default async function EnglishValorantServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  if (!isValorantServiceSlug(service)) notFound();

  return (
    <ValorantServiceConfigurator
      service={service}
      basePath="/en/valorant-boost"
    />
  );
}
