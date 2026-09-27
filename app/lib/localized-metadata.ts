import type { Metadata } from 'next';
import { translate } from './localization';

export function localizeMetadata(metadata: Metadata, language: string): Metadata {
  const title = typeof metadata.title === 'string' ? translate(language, metadata.title) : metadata.title;
  const description = metadata.description ? translate(language, metadata.description) : metadata.description;
  return {
    ...metadata, title, description,
    openGraph: {
      type: "website",
      siteName: "ProBoost",
      images: [{ url: "/brand/proboost-og.webp", width: 1200, height: 630, alt: "ProBoost" }],
      ...metadata.openGraph,
      ...(typeof title === 'string' ? { title } : {}),
      ...(description ? { description } : {}),
      locale: language,
    },
    twitter: {
      card: "summary_large_image",
      images: ["/brand/proboost-og.webp"],
      ...metadata.twitter,
      ...(typeof title === 'string' ? { title } : {}),
      ...(description ? { description } : {}),
    },
  };
}
