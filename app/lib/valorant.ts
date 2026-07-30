export const VALORANT_SERVICE_SLUGS = [
  "valorant-rank-boost",
  "placements",
  "competitive-wins",
  "coaching",
] as const;

export type ValorantServiceSlug = (typeof VALORANT_SERVICE_SLUGS)[number];

export const VALORANT_COACHING_FOCUS = [
  "Mechanics",
  "Game sense",
  "Agent mastery",
  "VOD review",
] as const;

export const VALORANT_SERVICE_CONFIG: Record<
  ValorantServiceSlug,
  {
    navLabel: string;
    eyebrow: string;
    title: string;
    description: string;
    metadataDescription: string;
  }
> = {
  "valorant-rank-boost": {
    navLabel: "Rank boost",
    eyebrow: "Competitive progression",
    title: "Valorant Rank Boost",
    description:
      "Choose your current rank, target rank, RR, platform, and region. The order price and delivery estimate update as you configure it.",
    metadataDescription:
      "Configure a Valorant rank boost by current rank, desired rank, RR, platform, region, and queue format.",
  },
  placements: {
    navLabel: "Placements",
    eyebrow: "Competitive placements",
    title: "Valorant Placement Matches",
    description:
      "Select your previous rank and placement package. A region-matched specialist completes the agreed number of competitive matches.",
    metadataDescription:
      "Configure a Valorant placement match package by previous rank, match count, platform, region, and queue format.",
  },
  "competitive-wins": {
    navLabel: "Competitive wins",
    eyebrow: "Fixed win package",
    title: "Valorant Competitive Wins",
    description:
      "Order a defined number of ranked wins at your current tier without committing to a full rank target.",
    metadataDescription:
      "Configure a Valorant competitive wins package by rank, win count, platform, region, and queue format.",
  },
  coaching: {
    navLabel: "Coaching",
    eyebrow: "One-to-one improvement",
    title: "Valorant Coaching",
    description:
      "Build a focused session around mechanics, decision-making, agent mastery, or VOD review with a high-ranked specialist.",
    metadataDescription:
      "Configure private Valorant coaching by rank, session length, focus area, platform, and region.",
  },
};

export function isValorantServiceSlug(
  value: string
): value is ValorantServiceSlug {
  return VALORANT_SERVICE_SLUGS.includes(value as ValorantServiceSlug);
}
