import type { Metadata } from "next";
import { langAlternates } from "../../../lib/site";

export const metadata: Metadata = {
  title: "Competitive Wins Boost",
  description:
    "Buy guaranteed Rainbow Six Siege competitive wins from verified boosters. Raise your rank and win rate on any platform and region.",
  alternates: {
    canonical: "/en/rainbow-six-siege-boost/competitive",
    languages: langAlternates("rainbow-six-siege-boost/competitive"),
  },
};

export { default } from "../../../boosting/competitive/page";
