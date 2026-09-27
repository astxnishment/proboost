import { findAdditionalGame, rankSteps, coachingFocusOptions, isCoachingService, WOW_CLASSES, WOW_CLASS_ROLES, WOW_RAIDS, WOW_DIFFICULTIES, WOW_RAID_SCOPES, WOW_DUNGEON_PREFERENCES, type AdditionalGame, type AdditionalGameSlug, type CatalogServiceSlug } from "./additional-games";
import type { OrderCommon } from "./pricing";

export type CatalogGameOrder = OrderCommon & {
  serviceType: "catalog-game";
  game: AdditionalGameSlug;
  service: CatalogServiceSlug;
  platform: string;
  server: string;
  mode: string;
  role: string;
  current: number;
  target: number;
  progress: number;
  quantity: number;
  focus: string;
  characterClass?: string;
  dungeonPreference?: string;
  raid?: string;
  difficulty?: string;
  raidScope?: string;
  sessionOption?: string;
};

// Editable starter rates in GBP. Review these business prices before launch.
// Both the storefront and checkout use this table; client totals are never trusted.
export const ADDITIONAL_GAME_RATES: Record<AdditionalGameSlug, { progression: number; win: number; coaching: number }> = {
  "rocket-league-boost": { progression: 1.45, win: 2.5, coaching: 19 },
  "league-of-legends-boost": { progression: 6.5, win: 4.95, coaching: 24 },
  "marvel-rivals-boost": { progression: 4.4, win: 3.5, coaching: 22 },
  "apex-legends-boost": { progression: 5.25, win: 8.5, coaching: 24 },
  "fortnite-boost": { progression: 4, win: 7.5, coaching: 22 },
  "call-of-duty-boost": { progression: 2.25, win: 4.25, coaching: 22 },
  "dota-2-boost": { progression: 3.9, win: 4.95, coaching: 24 },
  "world-of-warcraft-boost": { progression: 10, win: 0, coaching: 27 },
  "teamfight-tactics-coaching": { progression: 0, win: 0, coaching: 24 },
  "destiny-2-coaching": { progression: 0, win: 0, coaching: 27 },
  "ea-sports-fc-27-coaching": { progression: 0, win: 0, coaching: 24 },
};
export const WOW_RAID_RATES: Record<string, number> = { "The Voidspire": 49, "The Dreamrift": 19, "March on Quel’Danas": 29, Sporefall: 19 };

export function initialGameOrder(game: AdditionalGame, service: CatalogServiceSlug): CatalogGameOrder {
  const serviceDetails = game.services.find(item => item.slug === service);
  const mode = serviceDetails?.modes?.[0] ?? game.modes[0];
  const steps = rankSteps(game);
  const current = game.rating?.current ?? (game.tiers[1]?.divisions.length ?? 0);
  const target = game.rating?.target ?? Math.min(steps.length - 1, current + (game.tiers[1]?.divisions.length ?? 1) * 2);
  return {
    serviceType: "catalog-game", game: game.slug, service,
    platform: game.platforms[0], server: game.regions[0], mode, role: game.roles[0],
    current: game.slug === "world-of-warcraft-boost" ? 5 : current, target: Math.max(1, target), progress: 0,
    quantity: isCoachingService(game, service) ? 2 : service === "match-sessions" ? 3 : 1,
    focus: coachingFocusOptions(game, mode, game.roles[0], service)[0], queueType: game.slug === "world-of-warcraft-boost" ? "Duo" : "Solo",
    ...(serviceDetails?.setup ? { sessionOption: serviceDetails.setup.options[0] } : {}),
    ...(game.slug === "world-of-warcraft-boost" ? { characterClass: "Paladin", dungeonPreference: WOW_DUNGEON_PREFERENCES[0], raid: WOW_RAIDS[0], difficulty: "Normal", raidScope: "Full clear" } : {}),
  };
}

const integer = (value: unknown, min: number, max: number): value is number => typeof value === "number" && Number.isInteger(value) && value >= min && value <= max;
const choice = (value: unknown, choices: readonly string[]): value is string => typeof value === "string" && choices.includes(value);

export function parseCatalogGameOrder(body: unknown): CatalogGameOrder | null {
  if (!body || typeof body !== "object") return null;
  const b = body as Record<string, unknown>;
  const game = typeof b.game === "string" ? findAdditionalGame(b.game) : undefined;
  const service = game?.services.find(item => item.slug === b.service);
  if (b.serviceType !== "catalog-game" || !game || !service) return null;
  const coaching = service.group === "coaching";
  if (!choice(b.platform, game.platforms) || !choice(b.server, game.regions) || !choice(b.mode, service.modes ?? game.modes) || !choice(b.role, game.roles)) return null;
  if (!choice(b.focus, coachingFocusOptions(game, b.mode, b.role, service.slug))) return null;
  if (service.setup && !choice(b.sessionOption, service.setup.options)) return null;
  if (!choice(b.queueType, ["Solo", "Duo"]) || !integer(b.quantity, 1, service.slug === "dungeons" ? 8 : (service.slug === "raids" || service.slug === "rank-progression") ? 1 : 10)) return null;
  if (!integer(b.progress, 0, 99) || (!game.progressLabel && b.progress !== 0)) return null;
  if (coaching && b.queueType !== (game.slug === "world-of-warcraft-boost" ? "Duo" : "Solo")) return null;
  if (game.slug === "rocket-league-boost" && b.mode === "Duel (1v1)" && b.queueType === "Duo") return null;
  const max = game.rating?.max ?? rankSteps(game).length - 1;
  if (game.coachingOnly) {
    if (!coaching || b.current !== 0 || b.target !== 1) return null;
  } else if (game.slug !== "world-of-warcraft-boost") {
    if (!integer(b.current, 0, max) || !integer(b.target, 1, max)) return null;
    if (service.slug === "rank-progression" && b.target <= b.current) return null;
  } else {
    if (!integer(b.current, 2, 20) || !integer(b.target, 1, 20)) return null;
    if (b.queueType !== "Duo" || !choice(b.characterClass, WOW_CLASSES) || !choice(b.dungeonPreference, WOW_DUNGEON_PREFERENCES) || !choice(b.raid, WOW_RAIDS) || !choice(b.difficulty, WOW_DIFFICULTIES) || !choice(b.raidScope, WOW_RAID_SCOPES)) return null;
    if (!choice(b.role, WOW_CLASS_ROLES[b.characterClass])) return null;
  }
  for (const flag of ["specificBooster", "express", "recordedSession", "customFocus"] as const) {
    if (b[flag] !== undefined && typeof b[flag] !== "boolean") return null;
  }
  if (coaching ? b.express === true : b.recordedSession === true || b.customFocus === true) return null;
  if (b.promoCode !== undefined && (typeof b.promoCode !== "string" || b.promoCode.length > 32)) return null;
  // Construct a clean payload so arbitrary totals, fees, and unsupported add-ons are ignored.
  return {
    serviceType: "catalog-game", game: game.slug, service: service.slug,
    platform: b.platform, server: b.server, mode: b.mode, role: b.role,
    current: b.current as number, target: b.target as number, progress: b.progress, quantity: b.quantity, focus: b.focus, queueType: b.queueType as "Solo" | "Duo",
    specificBooster: b.specificBooster === true, express: b.express === true, recordedSession: b.recordedSession === true, customFocus: b.customFocus === true,
    promoCode: typeof b.promoCode === "string" ? b.promoCode.trim().toUpperCase() : "",
    ...(service.setup ? { sessionOption: b.sessionOption as string } : {}),
    ...(game.slug === "world-of-warcraft-boost" ? { characterClass: b.characterClass as string, dungeonPreference: b.dungeonPreference as string, raid: b.raid as string, difficulty: b.difficulty as string, raidScope: b.raidScope as string } : {}),
  };
}

export function catalogGameSubtotal(order: CatalogGameOrder): number {
  if (!parseCatalogGameOrder(order)) return NaN;
  const game = findAdditionalGame(order.game)!;
  const rates = ADDITIONAL_GAME_RATES[game.slug];
  let base = 0;
  const coaching = isCoachingService(game, order.service);
  if (coaching) base = order.quantity * rates.coaching;
  else if (order.service === "dungeons") base = order.quantity * (10 + Math.pow(order.current - 1, 1.5) * 1.9);
  else if (order.service === "raids") base = WOW_RAID_RATES[order.raid!] * (order.difficulty === "Heroic" ? 1.75 : 1) * (order.raidScope === "Final boss" && order.raid !== "The Dreamrift" && order.raid !== "Sporefall" ? 0.6 : 1);
  else if (order.service === "match-sessions") {
    const tier = game.rating ? Math.floor(order.current / 2000) : rankSteps(game)[order.current].tierIndex;
    base = order.quantity * rates.win * (1 + tier * 0.14);
  } else if (game.rating) {
    // Charge partial 100-point intervals proportionally, even when the current rating is not a multiple of 100.
    for (let value = order.current; value < order.target;) {
      const end = Math.min(order.target, (Math.floor(value / 100) + 1) * 100);
      base += (end - value) / 100 * rates.progression * (1 + Math.floor(value / 2000) * 0.25);
      value = end;
    }
  } else {
    const steps = rankSteps(game);
    for (let index = order.current; index < order.target; index++) {
      const fraction = index === order.current ? 1 - order.progress / 100 : 1;
      base += rates.progression * (1 + steps[index].tierIndex * 0.28) * fraction;
    }
  }
  if (order.queueType === "Duo" && game.slug !== "world-of-warcraft-boost" && !coaching) base *= 1.3;
  return Math.max(3.5, base) + (order.specificBooster ? 7.5 : 0);
}

export function gameOrderSummary(order: CatalogGameOrder): [string, string][] {
  const game = findAdditionalGame(order.game)!;
  const service = game.services.find(item => item.slug === order.service)!;
  const coaching = service.group === "coaching";
  const steps = rankSteps(game);
  const rankName = (value: number) => game.rating ? `${value.toLocaleString("en-GB")} ${game.rating.unit}` : steps[value]?.label ?? "—";
  const rows: [string, string][] = order.service === "rank-progression" ? [["From", rankName(order.current)], ["To", rankName(order.target)]]
    : order.service === "match-sessions" ? [["Starting point", rankName(order.current)], ["Win target", `${order.quantity} wins`]]
    : coaching ? [["Session", `${order.quantity} ${order.quantity === 1 ? "hour" : "hours"}`], ["Focus", order.focus]]
    : order.service === "dungeons" ? [["Keystone", `+${order.current}`], ["Runs", String(order.quantity)], ["Dungeons", order.dungeonPreference ?? "Any"]]
    : [["Raid", order.raid ?? ""], ["Difficulty", order.difficulty ?? ""], ["Clear", order.raidScope ?? ""]];
  if (game.progressLabel && order.service === "rank-progression") rows.push([game.progressLabel, `${order.progress}${game.progressLabel === "Current LP" ? " LP" : "%"}`]);
  rows.push([game.modeLabel, order.mode], [game.roleLabel, order.role], ["Platform", order.platform], ["Region", order.server]);
  if (service.setup && order.sessionOption) rows.push([service.setup.label, order.sessionOption]);
  if (order.characterClass) rows.push(["Class", order.characterClass]);
  if (!coaching) rows.push(["Format", game.slug === "world-of-warcraft-boost" ? "Self-play" : order.queueType === "Duo" ? "Play with a pro" : "Solo"]);
  if (order.specificBooster) rows.push(["Specialist", "Specific specialist"]);
  if (order.express) rows.push(["Priority", "Express"]);
  if (order.recordedSession) rows.push(["Recording", "Included"]);
  if (order.customFocus) rows.push(["Practice plan", "Included"]);
  return rows;
}

export function isCatalogCoachingOrder(order: CatalogGameOrder) {
  const game = findAdditionalGame(order.game);
  return Boolean(game && isCoachingService(game, order.service));
}

export function describeCatalogGameOrder(order: CatalogGameOrder) {
  const game = findAdditionalGame(order.game)!;
  const service = game.services.find(item => item.slug === order.service)!;
  return { name: `${game.name} — ${service.navLabel}`, description: gameOrderSummary(order).map(([label, value]) => `${label}: ${value}`).join(" | ") };
}
