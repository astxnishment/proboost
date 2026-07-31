export const CS2_SERVICE_SLUGS = [
  "cs2-rank-boost",
  "premier-rating",
  "competitive-wins",
  "faceit-leveling",
] as const;

export type Cs2ServiceSlug = (typeof CS2_SERVICE_SLUGS)[number];

export const CS2_RANKS = [
  "Silver I",
  "Silver II",
  "Silver III",
  "Silver IV",
  "Silver Elite",
  "Silver Elite Master",
  "Gold Nova I",
  "Gold Nova II",
  "Gold Nova III",
  "Gold Nova Master",
  "Master Guardian I",
  "Master Guardian II",
  "Master Guardian Elite",
  "Distinguished Master Guardian",
  "Legendary Eagle",
  "Legendary Eagle Master",
  "Supreme Master First Class",
  "Global Elite",
] as const;

export type Cs2Rank = (typeof CS2_RANKS)[number];

export const CS2_RANK_SHORT_NAMES: Record<Cs2Rank, string> = {
  "Silver I": "S1",
  "Silver II": "S2",
  "Silver III": "S3",
  "Silver IV": "S4",
  "Silver Elite": "SE",
  "Silver Elite Master": "SEM",
  "Gold Nova I": "GN1",
  "Gold Nova II": "GN2",
  "Gold Nova III": "GN3",
  "Gold Nova Master": "GNM",
  "Master Guardian I": "MG1",
  "Master Guardian II": "MG2",
  "Master Guardian Elite": "MGE",
  "Distinguished Master Guardian": "DMG",
  "Legendary Eagle": "LE",
  "Legendary Eagle Master": "LEM",
  "Supreme Master First Class": "SMFC",
  "Global Elite": "GE",
};

export const CS2_MAPS = [
  "Any map",
  "Dust II",
  "Mirage",
  "Inferno",
  "Nuke",
  "Ancient",
  "Anubis",
  "Train",
  "Overpass",
] as const;

export type Cs2Map = (typeof CS2_MAPS)[number];

export const FACEIT_LEVELS = [
  { level: 1, minElo: 100, maxElo: 500, accent: "#b8b8b8" },
  { level: 2, minElo: 501, maxElo: 750, accent: "#44e46c" },
  { level: 3, minElo: 751, maxElo: 900, accent: "#44e46c" },
  { level: 4, minElo: 901, maxElo: 1050, accent: "#fccc24" },
  { level: 5, minElo: 1051, maxElo: 1200, accent: "#fccc24" },
  { level: 6, minElo: 1201, maxElo: 1350, accent: "#fccc24" },
  { level: 7, minElo: 1351, maxElo: 1530, accent: "#fccc24" },
  { level: 8, minElo: 1531, maxElo: 1750, accent: "#fc6c24" },
  { level: 9, minElo: 1751, maxElo: 2000, accent: "#fc6c24" },
  { level: 10, minElo: 2001, maxElo: 4000, accent: "#ec042c" },
] as const;

export function faceitLevelData(level: number) {
  return (
    FACEIT_LEVELS.find((item) => item.level === level) ?? FACEIT_LEVELS[0]
  );
}

export function premierRatingAccent(rating: number) {
  if (rating >= 30000) return "#d6aa3b";
  if (rating >= 25000) return "#e3483f";
  if (rating >= 20000) return "#dc5b9f";
  if (rating >= 15000) return "#8d63cc";
  if (rating >= 10000) return "#4c7bd9";
  if (rating >= 5000) return "#45a9b5";
  return "#858b93";
}

export const CS2_SERVICE_CONFIG: Record<
  Cs2ServiceSlug,
  {
    navLabel: string;
    eyebrow: string;
    title: string;
    description: string;
    metadataDescription: string;
  }
> = {
  "cs2-rank-boost": {
    navLabel: "Rank boost",
    eyebrow: "Competitive skill group",
    title: "CS2 Rank Boost",
    description:
      "Choose your current skill group, target rank, preferred map, region, and queue format. Pricing updates with every selection.",
    metadataDescription:
      "Configure a Counter-Strike 2 Competitive rank boost by current rank, desired rank, map, region, and queue format.",
  },
  "premier-rating": {
    navLabel: "Premier rating",
    eyebrow: "Premier progression",
    title: "CS2 Premier Rating Boost",
    description:
      "Set your current CS Rating and target rating. The order updates across every 500-point step and Premier rating band.",
    metadataDescription:
      "Configure a Counter-Strike 2 Premier rating boost by current rating, target rating, region, and queue format.",
  },
  "competitive-wins": {
    navLabel: "Competitive wins",
    eyebrow: "Fixed win package",
    title: "CS2 Competitive Wins",
    description:
      "Choose a starting skill group, map preference, and exact number of Competitive wins without committing to a full rank target.",
    metadataDescription:
      "Configure a Counter-Strike 2 Competitive wins package by skill group, win count, map, region, and queue format.",
  },
  "faceit-leveling": {
    navLabel: "FACEIT levelling",
    eyebrow: "FACEIT Elo progression",
    title: "CS2 FACEIT Levelling",
    description:
      "Choose your current FACEIT level and Elo, then set a target from level 2 through level 10. The route and estimate update immediately.",
    metadataDescription:
      "Configure Counter-Strike 2 FACEIT levelling by current level, Elo, target level, region, and queue format.",
  },
};

export function isCs2ServiceSlug(value: string): value is Cs2ServiceSlug {
  return CS2_SERVICE_SLUGS.includes(value as Cs2ServiceSlug);
}
