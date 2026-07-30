import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import {
  computeOrderPrice,
  describeOrder,
  ELEARNING_SERVICES,
  VALORANT_DIVISIONS,
  VALORANT_RANKS,
  type Order,
} from "@/app/lib/pricing";
import {
  ORDER_PLATFORMS,
  ORDER_SERVERS,
} from "@/app/lib/order-options";
import {
  CS2_MAPS,
  CS2_RANKS,
  faceitLevelData,
} from "@/app/lib/cs2";
import { VALORANT_COACHING_FOCUS } from "@/app/lib/valorant";

const SERVICE_TYPES = [
  "rank-up",
  "champion",
  "competitive",
  "unrated",
  "elearning",
  "valorant-rank",
  "valorant-placements",
  "valorant-wins",
  "valorant-coaching",
  "cs2-rank",
  "cs2-premier",
  "cs2-wins",
  "cs2-faceit",
] as const;

// Accepts the raw request body and returns a typed order, or null if the
// payload is not a valid order. Prices are recomputed from this config on
// the server — a client-supplied total is never trusted.
function parseOrder(body: unknown): Order | null {
  if (typeof body !== "object" || body === null) return null;
  const b = body as Record<string, unknown>;

  const serviceType = b.serviceType;
  if (
    typeof serviceType !== "string" ||
    !SERVICE_TYPES.includes(serviceType as (typeof SERVICE_TYPES)[number])
  ) {
    return null;
  }

  const str = (v: unknown) => (typeof v === "string" ? v.slice(0, 64) : undefined);
  const num = (v: unknown) => (typeof v === "number" && Number.isFinite(v) ? v : undefined);
  const bool = (v: unknown) => v === true;
  const integerInRange = (
    value: number | undefined,
    min: number,
    max: number
  ): value is number =>
    value !== undefined &&
    Number.isInteger(value) &&
    value >= min &&
    value <= max;
  const isValorantRank = (
    value: string | undefined
  ): value is (typeof VALORANT_RANKS)[number] =>
    value !== undefined &&
    VALORANT_RANKS.includes(value as (typeof VALORANT_RANKS)[number]);
  const isValorantDivision = (
    value: string | undefined
  ): value is (typeof VALORANT_DIVISIONS)[number] =>
    value !== undefined &&
    VALORANT_DIVISIONS.includes(
      value as (typeof VALORANT_DIVISIONS)[number]
    );
  const isValorantPlatform = (
    value: string | undefined
  ): value is (typeof ORDER_PLATFORMS)[number] =>
    value !== undefined &&
    ORDER_PLATFORMS.includes(value as (typeof ORDER_PLATFORMS)[number]);
  const isValorantServer = (
    value: string | undefined
  ): value is (typeof ORDER_SERVERS)[number] =>
    value !== undefined &&
    ORDER_SERVERS.includes(value as (typeof ORDER_SERVERS)[number]);
  const isValorantPreviousRank = (
    value: string | undefined
  ): value is "Unranked" | (typeof VALORANT_RANKS)[number] =>
    value === "Unranked" || isValorantRank(value);
  const isValorantFocus = (
    value: string | undefined
  ): value is (typeof VALORANT_COACHING_FOCUS)[number] =>
    value !== undefined &&
    VALORANT_COACHING_FOCUS.includes(
      value as (typeof VALORANT_COACHING_FOCUS)[number]
    );
  const isCs2Rank = (
    value: string | undefined
  ): value is (typeof CS2_RANKS)[number] =>
    value !== undefined &&
    CS2_RANKS.includes(value as (typeof CS2_RANKS)[number]);
  const isCs2Map = (
    value: string | undefined
  ): value is (typeof CS2_MAPS)[number] =>
    value !== undefined &&
    CS2_MAPS.includes(value as (typeof CS2_MAPS)[number]);
  const isCs2Platform = (value: string | undefined) => value === "PC";

  const common = {
    queueType: b.queueType === "Duo" ? ("Duo" as const) : ("Solo" as const),
    duoBoosterCount: num(b.duoBoosterCount) ?? 1,
    platform: str(b.platform),
    server: str(b.server),
    promoCode: str(b.promoCode),
    specificBooster: bool(b.specificBooster),
    streaming: bool(b.streaming),
    express: bool(b.express),
    highKillCount: bool(b.highKillCount),
    oneTrickPony: bool(b.oneTrickPony),
    rankInsurance: bool(b.rankInsurance),
    vipPriority: bool(b.vipPriority),
    insaneClipDrop: bool(b.insaneClipDrop),
    eliteTier: bool(b.eliteTier),
    recordedSession: bool(b.recordedSession),
    customFocus: bool(b.customFocus),
  };

  switch (serviceType) {
    case "rank-up": {
      const currentRank = str(b.currentRank);
      const currentDivision = str(b.currentDivision);
      const desiredRank = str(b.desiredRank);
      const desiredDivision = str(b.desiredDivision);
      if (!currentRank || !currentDivision || !desiredRank || !desiredDivision)
        return null;
      return {
        ...common,
        serviceType,
        currentRank,
        currentDivision,
        desiredRank,
        desiredDivision,
        rpGain: str(b.rpGain),
      };
    }
    case "champion": {
      const currentPoints = num(b.currentPoints);
      const desiredPoints = num(b.desiredPoints);
      if (currentPoints === undefined || desiredPoints === undefined) return null;
      return {
        ...common,
        serviceType,
        currentPoints,
        desiredPoints,
        rpGain: str(b.rpGain),
      };
    }
    case "competitive": {
      const currentRank = str(b.currentRank);
      const numberOfWins = num(b.numberOfWins);
      if (!currentRank || numberOfWins === undefined) return null;
      return {
        ...common,
        serviceType,
        currentRank,
        currentDivision: str(b.currentDivision),
        numberOfWins,
      };
    }
    case "unrated": {
      const numberOfGames = num(b.numberOfGames);
      if (numberOfGames === undefined) return null;
      return { ...common, serviceType, numberOfGames };
    }
    case "elearning": {
      const service = str(b.service);
      const quantity = num(b.quantity);
      if (!service || !(service in ELEARNING_SERVICES) || quantity === undefined)
        return null;
      return { ...common, serviceType, service, quantity };
    }
    case "valorant-rank": {
      const currentRank = str(b.currentRank);
      const currentDivision = str(b.currentDivision);
      const desiredRank = str(b.desiredRank);
      const desiredDivision = str(b.desiredDivision);
      const currentRr = num(b.currentRr);
      const platform = str(b.platform);
      const server = str(b.server);
      if (
        !isValorantRank(currentRank) ||
        !isValorantDivision(currentDivision) ||
        !isValorantRank(desiredRank) ||
        !isValorantDivision(desiredDivision) ||
        !integerInRange(currentRr, 0, 99) ||
        !isValorantPlatform(platform) ||
        !isValorantServer(server)
      ) {
        return null;
      }
      return {
        ...common,
        serviceType,
        currentRank,
        currentDivision,
        desiredRank,
        desiredDivision,
        currentRr,
      };
    }
    case "valorant-placements": {
      const previousRank = str(b.previousRank);
      const numberOfMatches = num(b.numberOfMatches);
      const platform = str(b.platform);
      const server = str(b.server);
      if (
        !isValorantPreviousRank(previousRank) ||
        !integerInRange(numberOfMatches, 1, 5) ||
        !isValorantPlatform(platform) ||
        !isValorantServer(server)
      ) {
        return null;
      }
      return {
        ...common,
        serviceType,
        previousRank,
        numberOfMatches,
      };
    }
    case "valorant-wins": {
      const currentRank = str(b.currentRank);
      const currentDivision = str(b.currentDivision);
      const numberOfWins = num(b.numberOfWins);
      const platform = str(b.platform);
      const server = str(b.server);
      if (
        !isValorantRank(currentRank) ||
        !isValorantDivision(currentDivision) ||
        !integerInRange(numberOfWins, 1, 10) ||
        !isValorantPlatform(platform) ||
        !isValorantServer(server)
      ) {
        return null;
      }
      return {
        ...common,
        serviceType,
        currentRank,
        currentDivision,
        numberOfWins,
      };
    }
    case "valorant-coaching": {
      const currentRank = str(b.currentRank);
      const hours = num(b.hours);
      const focus = str(b.focus);
      const platform = str(b.platform);
      const server = str(b.server);
      if (
        !isValorantRank(currentRank) ||
        !integerInRange(hours, 1, 6) ||
        !isValorantFocus(focus) ||
        !isValorantPlatform(platform) ||
        !isValorantServer(server)
      ) {
        return null;
      }
      return {
        ...common,
        serviceType,
        currentRank,
        hours,
        focus,
      };
    }
    case "cs2-rank": {
      const currentRank = str(b.currentRank);
      const desiredRank = str(b.desiredRank);
      const map = str(b.map);
      const platform = str(b.platform);
      const server = str(b.server);
      if (
        !isCs2Rank(currentRank) ||
        !isCs2Rank(desiredRank) ||
        CS2_RANKS.indexOf(desiredRank) <= CS2_RANKS.indexOf(currentRank) ||
        !isCs2Map(map) ||
        !isCs2Platform(platform) ||
        !isValorantServer(server)
      ) {
        return null;
      }
      return {
        ...common,
        serviceType,
        currentRank,
        desiredRank,
        map,
      };
    }
    case "cs2-premier": {
      const currentRating = num(b.currentRating);
      const desiredRating = num(b.desiredRating);
      const platform = str(b.platform);
      const server = str(b.server);
      if (
        !integerInRange(currentRating, 0, 39500) ||
        !integerInRange(desiredRating, 500, 40000) ||
        currentRating % 500 !== 0 ||
        desiredRating % 500 !== 0 ||
        desiredRating <= currentRating ||
        !isCs2Platform(platform) ||
        !isValorantServer(server)
      ) {
        return null;
      }
      return {
        ...common,
        serviceType,
        currentRating,
        desiredRating,
      };
    }
    case "cs2-wins": {
      const currentRank = str(b.currentRank);
      const numberOfWins = num(b.numberOfWins);
      const map = str(b.map);
      const platform = str(b.platform);
      const server = str(b.server);
      if (
        !isCs2Rank(currentRank) ||
        !integerInRange(numberOfWins, 1, 10) ||
        !isCs2Map(map) ||
        !isCs2Platform(platform) ||
        !isValorantServer(server)
      ) {
        return null;
      }
      return {
        ...common,
        serviceType,
        currentRank,
        numberOfWins,
        map,
      };
    }
    case "cs2-faceit": {
      const currentLevel = num(b.currentLevel);
      const desiredLevel = num(b.desiredLevel);
      const currentElo = num(b.currentElo);
      const platform = str(b.platform);
      const server = str(b.server);
      if (
        !integerInRange(currentLevel, 1, 9) ||
        !integerInRange(desiredLevel, 2, 10) ||
        desiredLevel <= currentLevel ||
        !integerInRange(
          currentElo,
          faceitLevelData(currentLevel).minElo,
          faceitLevelData(currentLevel).maxElo
        ) ||
        !isCs2Platform(platform) ||
        !isValorantServer(server)
      ) {
        return null;
      }
      return {
        ...common,
        serviceType,
        currentLevel,
        desiredLevel,
        currentElo,
      };
    }
    default:
      return null;
  }
}

export async function POST(req: NextRequest) {
  try {
    const order = parseOrder(await req.json());
    if (!order) {
      return NextResponse.json({ error: "Invalid order" }, { status: 400 });
    }

    const { total } = computeOrderPrice(order);
    const amount = Math.round(total * 100);
    if (!Number.isFinite(amount) || amount < 50) {
      return NextResponse.json({ error: "Invalid amount" }, { status: 400 });
    }

    const { name, description } = describeOrder(order);

    const secretKey = process.env.STRIPE_SECRET_KEY;
    if (!secretKey || secretKey === "sk_test_XXXXXXXX") {
      return NextResponse.json(
        { error: "Stripe secret key not configured. Update STRIPE_SECRET_KEY in .env.local" },
        { status: 500 }
      );
    }

    const stripe = new Stripe(secretKey);
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: [
        {
          price_data: {
            currency: "gbp",
            product_data: {
              name,
              description: description || undefined,
            },
            unit_amount: amount,
          },
          quantity: 1,
        },
      ],
      success_url: `${req.nextUrl.origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${req.nextUrl.origin}/`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout error:", err);
    return NextResponse.json(
      { error: "Unable to create checkout session" },
      { status: 500 }
    );
  }
}
