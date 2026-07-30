import { CS2_RANKS, faceitLevelData } from "./cs2";

// Single source of truth for order pricing. Used by the calculator pages for
// display and by /api/checkout to recompute the charge server-side, so a
// tampered request body can never change what Stripe charges.

export const RANKS = [
  "Copper",
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Emerald",
  "Diamond",
  "Champion",
] as const;

export const DIVISIONS = ["V", "IV", "III", "II", "I"] as const;

export const PLATFORMS = ["PC", "Xbox", "PlayStation"] as const;

export const VALORANT_RANKS = [
  "Iron",
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Ascendant",
  "Immortal",
  "Radiant",
] as const;

export const VALORANT_DIVISIONS = ["I", "II", "III"] as const;

export const RP_MULTIPLIERS: Record<string, number> = {
  "1/10 RP": 1.35,
  "11/20 RP": 1.25,
  "21/30 RP": 1.15,
  "31/40 RP": 1.1,
  "41/50 RP": 1.05,
  "51/60 RP": 1,
  "61/70 RP": 0.95,
  "71/80 RP": 0.9,
  "81/90 RP": 0.85,
  "90+ RP": 0.8,
};

export const PRICE_PER_WIN_BY_RANK: Record<string, number> = {
  Copper: 1.5,
  Bronze: 2.0,
  Silver: 2.6,
  Gold: 3.2,
  Platinum: 4.0,
  Emerald: 5.2,
  Diamond: 7.0,
  Champion: 9.5,
};

export const UNRATED_PRICE_PER_GAME = 2.5;

export const VALORANT_PRICE_PER_WIN_BY_RANK: Record<string, number> = {
  Iron: 3.25,
  Bronze: 3.75,
  Silver: 4.5,
  Gold: 5.5,
  Platinum: 7,
  Diamond: 9,
  Ascendant: 12,
  Immortal: 16,
  Radiant: 22,
};

export const ELEARNING_SERVICES: Record<
  string,
  { title: string; price: number }
> = {
  coaching: { title: "Coaching", price: 24.99 },
  vod: { title: "VoD Review", price: 17.99 },
  "play-learn": { title: "Play & Learn", price: 6.99 },
};

export const PROMO_CODES: Record<string, number> = {
  WELCOME6: 0.06,
};

const EXTRA_DISCOUNT_THRESHOLD = 50;
const EXTRA_DISCOUNT_RATE = 0.03;
const STREAMING_FEE = 9;
const SPECIFIC_BOOSTER_FEE = 7.5;
const PLATFORM_CONSOLE_MULTIPLIER = 1.2;

export type QueueType = "Solo" | "Duo";

export type OrderAddOns = {
  specificBooster?: boolean;
  streaming?: boolean;
  express?: boolean;
  highKillCount?: boolean;
  oneTrickPony?: boolean;
  rankInsurance?: boolean;
  vipPriority?: boolean;
  insaneClipDrop?: boolean;
  eliteTier?: boolean;
  // elearning-only
  recordedSession?: boolean;
  customFocus?: boolean;
};

export type OrderCommon = OrderAddOns & {
  queueType?: QueueType;
  duoBoosterCount?: number;
  platform?: string;
  server?: string;
  promoCode?: string;
};

export type RankUpOrder = OrderCommon & {
  serviceType: "rank-up";
  currentRank: string;
  currentDivision: string;
  desiredRank: string;
  desiredDivision: string;
  rpGain?: string;
};

export type ChampionOrder = OrderCommon & {
  serviceType: "champion";
  currentPoints: number;
  desiredPoints: number;
  rpGain?: string;
};

export type CompetitiveOrder = OrderCommon & {
  serviceType: "competitive";
  currentRank: string;
  currentDivision?: string;
  numberOfWins: number;
};

export type UnratedOrder = OrderCommon & {
  serviceType: "unrated";
  numberOfGames: number;
};

export type ElearningOrder = OrderCommon & {
  serviceType: "elearning";
  service: string; // key of ELEARNING_SERVICES
  quantity: number;
};

export type ValorantRankOrder = OrderCommon & {
  serviceType: "valorant-rank";
  currentRank: string;
  currentDivision: string;
  desiredRank: string;
  desiredDivision: string;
  currentRr: number;
};

export type ValorantPlacementsOrder = OrderCommon & {
  serviceType: "valorant-placements";
  previousRank: string;
  numberOfMatches: number;
};

export type ValorantWinsOrder = OrderCommon & {
  serviceType: "valorant-wins";
  currentRank: string;
  currentDivision: string;
  numberOfWins: number;
};

export type ValorantCoachingOrder = OrderCommon & {
  serviceType: "valorant-coaching";
  currentRank: string;
  hours: number;
  focus: string;
};

export type Cs2RankOrder = OrderCommon & {
  serviceType: "cs2-rank";
  currentRank: string;
  desiredRank: string;
  map: string;
};

export type Cs2PremierOrder = OrderCommon & {
  serviceType: "cs2-premier";
  currentRating: number;
  desiredRating: number;
};

export type Cs2WinsOrder = OrderCommon & {
  serviceType: "cs2-wins";
  currentRank: string;
  numberOfWins: number;
  map: string;
};

export type Cs2FaceitOrder = OrderCommon & {
  serviceType: "cs2-faceit";
  currentLevel: number;
  desiredLevel: number;
  currentElo: number;
};

export type Order =
  | RankUpOrder
  | ChampionOrder
  | CompetitiveOrder
  | UnratedOrder
  | ElearningOrder
  | ValorantRankOrder
  | ValorantPlacementsOrder
  | ValorantWinsOrder
  | ValorantCoachingOrder
  | Cs2RankOrder
  | Cs2PremierOrder
  | Cs2WinsOrder
  | Cs2FaceitOrder;

export type PriceBreakdown = {
  subtotal: number;
  promoDiscount: number;
  extraDiscount: number;
  discount: number;
  extraDiscountPercent: number;
  hasExtraDiscount: boolean;
  amountToExtraDiscount: number;
  total: number;
};

export function flattenRank(rank: string, division: string): number {
  const rankIndex = RANKS.indexOf(rank as (typeof RANKS)[number]);
  const divisionIndex = DIVISIONS.indexOf(
    division as (typeof DIVISIONS)[number]
  );
  return rankIndex * DIVISIONS.length + divisionIndex;
}

export function flattenValorantRank(rank: string, division: string): number {
  const rankIndex = VALORANT_RANKS.indexOf(
    rank as (typeof VALORANT_RANKS)[number]
  );
  if (rankIndex < 0) return -1;
  if (rank === "Radiant") return (VALORANT_RANKS.length - 1) * 3;

  const divisionIndex = VALORANT_DIVISIONS.indexOf(
    division as (typeof VALORANT_DIVISIONS)[number]
  );
  return divisionIndex < 0 ? -1 : rankIndex * 3 + divisionIndex;
}

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, Math.floor(Number(value) || 0)));

// Extra boosters scale the duo base rate: +25% per booster beyond the first
function duoBoosterScale(order: OrderCommon): number {
  const boosters = clamp(order.duoBoosterCount ?? 1, 1, 4);
  return 1 + (boosters - 1) * 0.25;
}

function platformMultiplier(order: OrderCommon): number {
  return order.platform === "PC" || order.platform === undefined
    ? 1
    : PLATFORM_CONSOLE_MULTIPLIER;
}

function rpMultiplier(rpGain: string | undefined): number {
  return (rpGain && RP_MULTIPLIERS[rpGain]) || 1;
}

function addOnMultiplier(order: Order): number {
  let multiplier = 1;
  if (order.express) multiplier += 0.2;
  if (order.vipPriority) multiplier += 0.5;
  if (order.eliteTier) multiplier += 0.5;
  if (
    order.serviceType === "elearning" ||
    order.serviceType === "valorant-coaching"
  ) {
    if (order.recordedSession) multiplier += 0.15;
    if (order.customFocus) multiplier += 0.1;
  } else {
    if (order.highKillCount) multiplier += 0.4;
    if (order.oneTrickPony) multiplier += 0.3;
    if (order.insaneClipDrop) multiplier += 0.15;
    // Unrated games have no rank to insure
    if (order.serviceType !== "unrated" && order.rankInsurance)
      multiplier += 0.5;
  }
  return multiplier;
}

function baseSubtotal(order: Order): number {
  const boosterFee = order.specificBooster ? SPECIFIC_BOOSTER_FEE : 0;

  switch (order.serviceType) {
    case "rank-up": {
      const currentValue = flattenRank(order.currentRank, order.currentDivision);
      const desiredValue = flattenRank(order.desiredRank, order.desiredDivision);
      if (currentValue < 0 || desiredValue < 0) return NaN;
      const steps = Math.max(desiredValue, currentValue + 1) - currentValue;
      const basePerStep =
        order.queueType === "Duo" ? 5.65 * duoBoosterScale(order) : 4.35;
      return (
        steps *
          basePerStep *
          platformMultiplier(order) *
          rpMultiplier(order.rpGain) +
        boosterFee
      );
    }
    case "champion": {
      const currentPoints = clamp(order.currentPoints, 1, 99);
      const desiredPoints = Math.max(
        clamp(order.desiredPoints, 1, 1000),
        currentPoints + 1,
        15
      );
      const pointSpread = desiredPoints - currentPoints;
      const basePerPoint =
        order.queueType === "Duo" ? 1.43 * duoBoosterScale(order) : 1.1;
      return (
        pointSpread *
          basePerPoint *
          platformMultiplier(order) *
          rpMultiplier(order.rpGain) +
        boosterFee
      );
    }
    case "competitive": {
      const wins = clamp(order.numberOfWins, 1, 100);
      const perWin = PRICE_PER_WIN_BY_RANK[order.currentRank] ?? 2;
      const basePerWin =
        order.queueType === "Duo"
          ? perWin * 1.3 * duoBoosterScale(order)
          : perWin;
      return wins * basePerWin * platformMultiplier(order) + boosterFee;
    }
    case "unrated": {
      const games = clamp(order.numberOfGames, 1, 100);
      const basePerGame =
        order.queueType === "Duo"
          ? UNRATED_PRICE_PER_GAME * 1.3 * duoBoosterScale(order)
          : UNRATED_PRICE_PER_GAME;
      return games * basePerGame * platformMultiplier(order) + boosterFee;
    }
    case "elearning": {
      const service = ELEARNING_SERVICES[order.service];
      if (!service) return NaN;
      const quantity = clamp(order.quantity, 1, 100);
      const duoMultiplier =
        order.queueType === "Duo" ? 1.3 * duoBoosterScale(order) : 1;
      return (
        quantity * service.price * duoMultiplier * platformMultiplier(order) +
        boosterFee
      );
    }
    case "valorant-rank": {
      const currentValue = flattenValorantRank(
        order.currentRank,
        order.currentDivision
      );
      const desiredValue = flattenValorantRank(
        order.desiredRank,
        order.desiredDivision
      );
      if (
        currentValue < 0 ||
        desiredValue < 0 ||
        desiredValue <= currentValue
      ) {
        return NaN;
      }

      let progressionPrice = 0;
      const earnedRr = clamp(order.currentRr, 0, 99);
      for (let step = currentValue; step < desiredValue; step += 1) {
        const rankBand = Math.min(
          VALORANT_RANKS.length - 1,
          Math.floor(step / 3)
        );
        const stepPrice = 3.9 + rankBand * 0.78;
        progressionPrice +=
          step === currentValue ? stepPrice * (1 - earnedRr / 100) : stepPrice;
      }

      const queueMultiplier =
        order.queueType === "Duo" ? 1.32 * duoBoosterScale(order) : 1;
      return (
        progressionPrice *
          queueMultiplier *
          platformMultiplier(order) +
        boosterFee
      );
    }
    case "valorant-placements": {
      const matches = clamp(order.numberOfMatches, 1, 10);
      const previousRankIndex = Math.max(
        0,
        VALORANT_RANKS.indexOf(
          order.previousRank as (typeof VALORANT_RANKS)[number]
        )
      );
      const rankMultiplier = 1 + previousRankIndex * 0.09;
      const queueMultiplier =
        order.queueType === "Duo" ? 1.25 * duoBoosterScale(order) : 1;
      return (
        matches *
          6.4 *
          rankMultiplier *
          queueMultiplier *
          platformMultiplier(order) +
        boosterFee
      );
    }
    case "valorant-wins": {
      const wins = clamp(order.numberOfWins, 1, 100);
      const perWin =
        VALORANT_PRICE_PER_WIN_BY_RANK[order.currentRank] ?? 4.5;
      const queueMultiplier =
        order.queueType === "Duo" ? 1.3 * duoBoosterScale(order) : 1;
      return (
        wins * perWin * queueMultiplier * platformMultiplier(order) +
        boosterFee
      );
    }
    case "valorant-coaching": {
      const hours = clamp(order.hours, 1, 12);
      return (
        hours * 29.5 * platformMultiplier(order) +
        boosterFee
      );
    }
    case "cs2-rank": {
      const currentValue = CS2_RANKS.indexOf(
        order.currentRank as (typeof CS2_RANKS)[number]
      );
      const desiredValue = CS2_RANKS.indexOf(
        order.desiredRank as (typeof CS2_RANKS)[number]
      );
      if (
        currentValue < 0 ||
        desiredValue < 0 ||
        desiredValue <= currentValue
      ) {
        return NaN;
      }

      let progressionPrice = 0;
      for (let step = currentValue; step < desiredValue; step += 1) {
        progressionPrice += 3.4 + Math.floor(step / 3) * 0.85;
      }
      const queueMultiplier =
        order.queueType === "Duo" ? 1.28 * duoBoosterScale(order) : 1;
      return progressionPrice * queueMultiplier + boosterFee;
    }
    case "cs2-premier": {
      const currentRating = clamp(order.currentRating, 0, 39500);
      const desiredRating = clamp(order.desiredRating, 500, 40000);
      if (desiredRating <= currentRating) return NaN;

      let progressionPrice = 0;
      for (
        let rating = currentRating;
        rating < desiredRating;
        rating += 500
      ) {
        progressionPrice += 1.65 + Math.floor(rating / 5000) * 0.24;
      }
      const queueMultiplier =
        order.queueType === "Duo" ? 1.28 * duoBoosterScale(order) : 1;
      return progressionPrice * queueMultiplier + boosterFee;
    }
    case "cs2-wins": {
      const rankIndex = CS2_RANKS.indexOf(
        order.currentRank as (typeof CS2_RANKS)[number]
      );
      if (rankIndex < 0) return NaN;
      const wins = clamp(order.numberOfWins, 1, 10);
      const perWin = 4 + rankIndex * 0.45;
      const queueMultiplier =
        order.queueType === "Duo" ? 1.3 * duoBoosterScale(order) : 1;
      return wins * perWin * queueMultiplier + boosterFee;
    }
    case "cs2-faceit": {
      const currentLevel = clamp(order.currentLevel, 1, 9);
      const desiredLevel = clamp(order.desiredLevel, 2, 10);
      if (desiredLevel <= currentLevel) return NaN;

      const currentBand = faceitLevelData(currentLevel);
      const currentElo = Math.min(
        currentBand.maxElo,
        Math.max(currentBand.minElo, Math.floor(order.currentElo))
      );
      const targetElo = faceitLevelData(desiredLevel).minElo;
      const eloDifference = Math.max(1, targetElo - currentElo);
      const pricePerTwentyFiveElo = 1.12 + currentLevel * 0.15;
      const queueMultiplier =
        order.queueType === "Duo" ? 1.3 * duoBoosterScale(order) : 1;
      return (
        Math.ceil(eloDifference / 25) *
          pricePerTwentyFiveElo *
          queueMultiplier +
        boosterFee
      );
    }
  }
}

export function computeOrderPrice(order: Order): PriceBreakdown {
  let subtotal = baseSubtotal(order);
  if (order.streaming) subtotal += STREAMING_FEE;
  subtotal *= addOnMultiplier(order);

  const promoRate =
    PROMO_CODES[(order.promoCode ?? "").trim().toUpperCase()] ?? 0;
  const promoDiscount = subtotal * promoRate;
  const hasExtraDiscount = subtotal >= EXTRA_DISCOUNT_THRESHOLD;
  const extraDiscount = hasExtraDiscount ? subtotal * EXTRA_DISCOUNT_RATE : 0;
  const discount = promoDiscount + extraDiscount;
  const extraDiscountPercent =
    (promoRate > 0 ? promoRate * 100 : 0) + (hasExtraDiscount ? 3 : 0);
  const amountToExtraDiscount = Math.max(
    0,
    EXTRA_DISCOUNT_THRESHOLD - subtotal
  );
  const total = Math.max(0, subtotal - discount);

  return {
    subtotal,
    promoDiscount,
    extraDiscount,
    discount,
    extraDiscountPercent,
    hasExtraDiscount,
    amountToExtraDiscount,
    total,
  };
}

export function describeOrder(order: Order): {
  name: string;
  description: string;
} {
  const parts = [order.platform, order.server].filter(Boolean) as string[];
  if (order.queueType === "Duo") parts.push("Duo");

  switch (order.serviceType) {
    case "rank-up":
      if ("rpGain" in order && order.rpGain) parts.push(`RP: ${order.rpGain}`);
      return {
        name: `Rank Boost: ${order.currentRank} ${order.currentDivision} → ${order.desiredRank} ${order.desiredDivision}`,
        description: parts.join(" | "),
      };
    case "champion":
      if (order.rpGain) parts.push(`RP: ${order.rpGain}`);
      return {
        name: `Champion Boost: ${order.currentPoints} → ${order.desiredPoints} points`,
        description: parts.join(" | "),
      };
    case "competitive":
      return {
        name: `Competitive Boost: ${order.currentRank}${
          order.currentDivision ? ` ${order.currentDivision}` : ""
        } – ${order.numberOfWins} wins`,
        description: parts.join(" | "),
      };
    case "unrated":
      return {
        name: `Unrated Boost: ${order.numberOfGames} games`,
        description: parts.join(" | "),
      };
    case "elearning": {
      const service = ELEARNING_SERVICES[order.service];
      const quantity = Math.max(1, Math.floor(order.quantity || 1));
      return {
        name: `${service?.title ?? order.service}${
          quantity > 1 ? ` x${quantity}` : ""
        }`,
        description: parts.join(" | "),
      };
    }
    case "valorant-rank":
      return {
        name: `Valorant Rank Boost: ${order.currentRank} ${order.currentDivision} → ${order.desiredRank} ${order.desiredDivision}`,
        description: [
          ...parts,
          `Current RR: ${clamp(order.currentRr, 0, 99)}`,
        ].join(" | "),
      };
    case "valorant-placements":
      return {
        name: `Valorant Placements: ${order.numberOfMatches} matches`,
        description: [...parts, `Previous rank: ${order.previousRank}`].join(
          " | "
        ),
      };
    case "valorant-wins":
      return {
        name: `Valorant Competitive Wins: ${order.numberOfWins}`,
        description: [
          ...parts,
          `${order.currentRank} ${order.currentDivision}`,
        ].join(" | "),
      };
    case "valorant-coaching":
      return {
        name: `Valorant Coaching: ${order.hours} ${
          order.hours === 1 ? "hour" : "hours"
        }`,
        description: [...parts, order.currentRank, order.focus].join(" | "),
      };
    case "cs2-rank":
      return {
        name: `CS2 Rank Boost: ${order.currentRank} → ${order.desiredRank}`,
        description: [...parts, `Map: ${order.map}`].join(" | "),
      };
    case "cs2-premier":
      return {
        name: `CS2 Premier Rating: ${order.currentRating.toLocaleString(
          "en-GB"
        )} → ${order.desiredRating.toLocaleString("en-GB")}`,
        description: parts.join(" | "),
      };
    case "cs2-wins":
      return {
        name: `CS2 Competitive Wins: ${order.numberOfWins}`,
        description: [
          ...parts,
          order.currentRank,
          `Map: ${order.map}`,
        ].join(" | "),
      };
    case "cs2-faceit":
      return {
        name: `CS2 FACEIT Leveling: Level ${order.currentLevel} → Level ${order.desiredLevel}`,
        description: [
          ...parts,
          `Starting Elo: ${order.currentElo}`,
        ].join(" | "),
      };
  }
}
