export const OVERWATCH_SERVICE_SLUGS = [
  "overwatch-rank-boost",
  "placements",
  "competitive-wins",
  "coaching",
] as const;

export type OverwatchServiceSlug =
  (typeof OVERWATCH_SERVICE_SLUGS)[number];

export const OVERWATCH_RANKS = [
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Master",
  "Grandmaster",
  "Champion",
] as const;

export const OVERWATCH_DIVISIONS = ["5", "4", "3", "2", "1"] as const;

export const OVERWATCH_ROLES = [
  "Tank",
  "Damage",
  "Support",
  "Open Queue",
] as const;

export const OVERWATCH_PLATFORMS = [
  "PC",
  "Xbox",
  "PlayStation",
  "Nintendo Switch",
] as const;

export const OVERWATCH_COACHING_FOCUS = [
  "Positioning",
  "Hero mastery",
  "Team play",
  "VOD review",
] as const;

export const OVERWATCH_RANK_COLORS: Record<
  (typeof OVERWATCH_RANKS)[number],
  string
> = {
  Bronze: "#b87953",
  Silver: "#aeb7c1",
  Gold: "#e7b94f",
  Platinum: "#a9c3c1",
  Diamond: "#58c7e8",
  Master: "#69dba4",
  Grandmaster: "#9d8bff",
  Champion: "#e279ff",
};

export const OVERWATCH_SERVICE_CONFIG: Record<
  OverwatchServiceSlug,
  {
    navLabel: string;
    eyebrow: string;
    title: string;
    description: string;
    metadataDescription: string;
  }
> = {
  "overwatch-rank-boost": {
    navLabel: "Rank boost",
    eyebrow: "Competitive progression",
    title: "Overwatch 2 Rank Boost",
    description:
      "Choose your role, current division, and target rank. Pricing and delivery estimates update with every selection.",
    metadataDescription:
      "Configure an Overwatch 2 rank boost by current rank, target rank, division, role, platform, and region.",
  },
  placements: {
    navLabel: "Placements",
    eyebrow: "Competitive calibration",
    title: "Overwatch 2 Placements",
    description:
      "Build a placement package around your previous rank, preferred role, platform, and region.",
    metadataDescription:
      "Configure Overwatch 2 placement matches by previous rank, role, platform, region, and match count.",
  },
  "competitive-wins": {
    navLabel: "Competitive wins",
    eyebrow: "Fixed win package",
    title: "Overwatch 2 Competitive Wins",
    description:
      "Order a defined number of competitive wins at your current tier without committing to a full rank route.",
    metadataDescription:
      "Configure an Overwatch 2 competitive win package by rank, role, platform, region, and win count.",
  },
  coaching: {
    navLabel: "Coaching",
    eyebrow: "One-to-one improvement",
    title: "Overwatch 2 Coaching",
    description:
      "Work with a high-ranked specialist on positioning, hero mastery, team play, or a focused VOD review.",
    metadataDescription:
      "Configure private Overwatch 2 coaching by rank, role, session length, focus area, platform, and region.",
  },
};

export function isOverwatchServiceSlug(
  value: string
): value is OverwatchServiceSlug {
  return OVERWATCH_SERVICE_SLUGS.includes(value as OverwatchServiceSlug);
}
