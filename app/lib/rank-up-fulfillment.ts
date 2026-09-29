import type { RankUpOrder } from "./pricing";

// Only call this with the server-normalized rank-up order used for pricing.
// Versioned, explicit fields keep the Stripe record readable and bounded:
// 21 keys, each under 40 characters, with enum/boolean/numeric values only.
// Missing legacy selections remain distinguishable from customer choices.
export function rankUpFulfillmentMetadata(
  order: RankUpOrder
): Record<string, string> {
  return {
    r6_version: "1",
    r6_current_rank: order.currentRank,
    r6_current_division: order.currentDivision,
    r6_desired_rank: order.desiredRank,
    r6_desired_division: order.desiredDivision,
    r6_platform: order.platform ?? "not_provided",
    r6_server: order.server ?? "not_provided",
    r6_rp_gain: order.rpGain ?? "not_provided",
    r6_queue_type: order.queueType ?? "Solo",
    r6_duo_booster_count: String(order.duoBoosterCount ?? 1),
    r6_play_offline: String(order.playOffline === true),
    r6_specific_operators: String(order.specificOperators === true),
    r6_specific_booster: String(order.specificBooster === true),
    r6_streaming: String(order.streaming === true),
    r6_express: String(order.express === true),
    r6_high_kill_count: String(order.highKillCount === true),
    r6_one_trick_pony: String(order.oneTrickPony === true),
    r6_rank_insurance: String(order.rankInsurance === true),
    r6_vip_priority: String(order.vipPriority === true),
    r6_insane_clip_drop: String(order.insaneClipDrop === true),
    r6_elite_tier: String(order.eliteTier === true),
  };
}
