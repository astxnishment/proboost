import type { Metadata } from "next";
import Cs2BoostingPage from "../../components/Cs2BoostingPage";
import { langAlternates } from "../../lib/site";

export const metadata: Metadata = {
  title: "Counter-Strike 2 Boosting Services",
  description:
    "Configure CS2 Competitive rank boosts, Premier rating, Competitive wins, and FACEIT levelling with verified specialists.",
  alternates: {
    canonical: "/en/counter-strike-2-boost",
    languages: langAlternates("counter-strike-2-boost"),
  },
  openGraph: {
    title: "Counter-Strike 2 Boosting Services | ProBoost",
    description:
      "Choose a CS2 Competitive, Premier, wins, or FACEIT progression service.",
    images: [
      {
        url: "/cs2/cs2-hero.webp",
        width: 1672,
        height: 941,
        alt: "Counter-Strike 2 boosting services at ProBoost",
      },
    ],
  },
};

export default function EnglishCs2BoostPage() {
  return <Cs2BoostingPage basePath="/en/counter-strike-2-boost" />;
}
