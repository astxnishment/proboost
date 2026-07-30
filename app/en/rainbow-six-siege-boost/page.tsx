import type { Metadata } from "next";
import SiegeBoostingPage from "../../boosting/page";
import { langAlternates } from "../../lib/site";

export const metadata: Metadata = {
  title: "Rainbow Six Siege Boosting",
  description:
    "Professional Rainbow Six Siege boosting: rank boosts, Champion pushes, competitive wins, unrated matches, and coaching from verified top-tier players.",
  alternates: {
    canonical: "/en/rainbow-six-siege-boost",
    languages: langAlternates("rainbow-six-siege-boost"),
  },
};

export default function EnRainbowSixSiegeBoostPage() {
  return (
    <SiegeBoostingPage
      basePath="/en/rainbow-six-siege-boost"
      defaultLang="en"
    />
  );
}
