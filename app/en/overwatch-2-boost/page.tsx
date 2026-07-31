import type { Metadata } from "next";
import OverwatchBoostingPage from "../../components/OverwatchBoostingPage";
import { langAlternates } from "../../lib/site";

export const metadata: Metadata = {
  title: "Overwatch 2 Boosting Services",
  description:
    "Configure Overwatch 2 rank boosting, placements, competitive wins, and private coaching by role, platform, and region.",
  alternates: {
    canonical: "/en/overwatch-2-boost",
    languages: langAlternates("overwatch-2-boost"),
  },
  openGraph: {
    title: "Overwatch 2 Boosting Services | ProBoost",
    description:
      "Choose an Overwatch 2 rank route, placement package, competitive wins, or private coaching.",
    images: [
      {
        url: "/homepage/overwatch-homepage.webp",
        width: 880,
        height: 880,
        alt: "Overwatch 2 boosting services at ProBoost",
      },
    ],
  },
};

export default function EnOverwatchBoostPage() {
  return <OverwatchBoostingPage basePath="/en/overwatch-2-boost" />;
}
