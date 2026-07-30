import type { Metadata } from "next";
import { langAlternates } from "../../../lib/site";

export const metadata: Metadata = {
  title: "Rainbow Six Siege Rank Boost",
  description:
    "Climb from any rank to Champion with verified Rainbow Six Siege boosters. Transparent pricing, solo or duo queue, all platforms and regions.",
  alternates: {
    canonical: "/en/rainbow-six-siege-boost/rainbow-six-siege-rank-boost",
    languages: langAlternates(
      "rainbow-six-siege-boost/rainbow-six-siege-rank-boost"
    ),
  },
};

export { default } from "../../../boosting/rank-up/page";
