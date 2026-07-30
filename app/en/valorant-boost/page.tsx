import type { Metadata } from "next";
import ValorantBoostingPage from "../../components/ValorantBoostingPage";
import { langAlternates } from "../../lib/site";

export const metadata: Metadata = {
  title: "Valorant Boosting Services",
  description:
    "Professional Valorant rank boosting, placement matches, competitive wins, and coaching from verified specialists.",
  alternates: {
    canonical: "/en/valorant-boost",
    languages: langAlternates("valorant-boost"),
  },
  openGraph: {
    title: "Valorant Boosting Services | ProBoost",
    description:
      "Configure a Valorant rank boost, placement package, competitive wins, or coaching request.",
    images: [
      {
        url: "/valorant/valorant-hero-v2.webp",
        width: 1672,
        height: 941,
        alt: "Valorant boosting services at ProBoost",
      },
    ],
  },
};

export default function EnValorantBoostPage() {
  return <ValorantBoostingPage basePath="/en/valorant-boost" />;
}
