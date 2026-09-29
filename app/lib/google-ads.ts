import { isCurrencyCode } from "./currency";
import type { ConfirmedPurchase } from "./purchase-confirmation";

export type AdsConsent = "accepted" | "rejected" | "unknown";
export const ADS_CONSENT_KEY = "proboost_ads_consent_v1";
export const ADS_CONSENT_DURATION_MS = 180 * 24 * 60 * 60 * 1000;

export function parseAdsConsent(value: string | null, now = Date.now()): AdsConsent {
  try {
    const saved = value ? JSON.parse(value) : null;
    if (
      saved?.version === 1 &&
      (saved.choice === "accepted" || saved.choice === "rejected") &&
      Number.isFinite(saved.expiresAt) && saved.expiresAt > now &&
      saved.expiresAt <= now + ADS_CONSENT_DURATION_MS
    ) return saved.choice;
  } catch { /* Invalid preferences never enable tracking. */ }
  return "unknown";
}

export function getGoogleAdsConfig(id: string | undefined, label: string | undefined) {
  if (!id || !/^AW-\d+$/.test(id) || !label || !/^[A-Za-z0-9_-]+$/.test(label)) return null;
  return { id, destination: `${id}/${label}` };
}

export function measurementPageContext(location: string, referrer: string) {
  const clean = (value: string) => {
    try {
      const url = new URL(value);
      return url.protocol === "https:" || url.protocol === "http:" ? url : null;
    } catch { return null; }
  };
  const page = clean(location);
  const previous = clean(referrer);
  const attribution = new URLSearchParams();
  // Preserve only Google advertising click identifiers after opt-in so the
  // conversion linker can attribute the purchase. Other query data is private.
  for (const name of ["gclid", "dclid", "gbraid", "wbraid"]) {
    const value = page?.searchParams.get(name);
    if (value && /^[A-Za-z0-9._~-]{1,512}$/.test(value)) attribution.set(name, value);
  }
  const query = attribution.toString();
  return {
    page_location: page ? page.origin + page.pathname + (query ? `?${query}` : "") : "",
    // Payment-provider referrers and all query strings stay out of our events.
    page_referrer: previous && previous.origin === page?.origin
      ? previous.origin + previous.pathname : "",
  };
}

export function purchaseConversion(purchase: ConfirmedPurchase, destination: string) {
  if (
    purchase.live !== true ||
    !/^pi_[A-Za-z0-9]+$/.test(purchase.transactionId) ||
    purchase.transactionId.length > 64 ||
    !Number.isFinite(purchase.value) || purchase.value <= 0 ||
    !isCurrencyCode(purchase.currency) ||
    !/^AW-\d+\/[A-Za-z0-9_-]+$/.test(destination)
  ) return null;
  return {
    send_to: destination,
    transaction_id: purchase.transactionId,
    value: purchase.value,
    currency: purchase.currency,
  };
}
