import type { Metadata } from "next";
import { langAlternates } from "../../../lib/site";
import { localizeMetadata } from "../../../lib/localized-metadata";

export const metadata: Metadata = localizeMetadata({
  title: "Rainbow Six Siege Rank Boost",
  description:
    "Choose your current rank and target. Your price and delivery estimate update instantly.",
  alternates: {
    canonical: "/en/rainbow-six-siege-boost/rainbow-six-siege-rank-boost",
    languages: langAlternates(
      "rainbow-six-siege-boost/rainbow-six-siege-rank-boost"
    ),
  },
}, "en");

export { default } from "../../../boosting/rank-up/page";
