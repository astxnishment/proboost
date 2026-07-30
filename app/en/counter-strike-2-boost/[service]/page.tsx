import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Cs2ServiceConfigurator from "@/app/components/cs2/Cs2ServiceConfigurator";
import {
  CS2_SERVICE_CONFIG,
  CS2_SERVICE_SLUGS,
  isCs2ServiceSlug,
} from "@/app/lib/cs2";
import { langAlternates } from "@/app/lib/site";

export function generateStaticParams() {
  return CS2_SERVICE_SLUGS.map((service) => ({ service }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ service: string }>;
}): Promise<Metadata> {
  const { service } = await params;
  if (!isCs2ServiceSlug(service)) notFound();

  const config = CS2_SERVICE_CONFIG[service];
  const path = `counter-strike-2-boost/${service}`;

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
          url: "/cs2/cs2-hero.webp",
          width: 1672,
          height: 941,
          alt: config.title,
        },
      ],
    },
  };
}

export default async function EnglishCs2ServicePage({
  params,
}: {
  params: Promise<{ service: string }>;
}) {
  const { service } = await params;
  if (!isCs2ServiceSlug(service)) notFound();

  return (
    <Cs2ServiceConfigurator
      service={service}
      basePath="/en/counter-strike-2-boost"
    />
  );
}
