import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Unrated Matches Boost",
  description:
    "Play Rainbow Six Siege unrated matches with your favorite verified booster. Flexible sessions on all regions and servers.",
  alternates: { canonical: "/en/rainbow-six-siege-boost/unrated" },
};

export { default } from "../../../boosting/unrated/page";
