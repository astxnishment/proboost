"use client";

import {
  createContext, useCallback, useContext, useEffect, useRef, useState,
  useSyncExternalStore, type ReactNode,
} from "react";
import Link from "next/link";
import Localized from "./Localization";
import {
  ADS_CONSENT_DURATION_MS, ADS_CONSENT_KEY, getGoogleAdsConfig,
  measurementPageContext, parseAdsConsent, purchaseConversion, type AdsConsent,
} from "../lib/google-ads";
import type { ConfirmedPurchase } from "../lib/purchase-confirmation";

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

const config = getGoogleAdsConfig(
  process.env.NEXT_PUBLIC_GOOGLE_ADS_ID,
  process.env.NEXT_PUBLIC_GOOGLE_ADS_CONVERSION_LABEL,
);
const consentEvent = "proboost:ads-consent";
let memoryConsent: string | null = null;
let storageWriteFailed = false;
const sentPurchases = new Set<string>();
const deniedConsent = {
  ad_storage: "denied", ad_user_data: "denied",
  ad_personalization: "denied", analytics_storage: "denied",
};
const AdsContext = createContext<(purchase: ConfirmedPurchase) => void>(() => {});

function getConsent(): AdsConsent {
  if (storageWriteFailed) return parseAdsConsent(memoryConsent);
  try { return parseAdsConsent(window.localStorage.getItem(ADS_CONSENT_KEY)); }
  catch { return parseAdsConsent(memoryConsent); }
}

function subscribeConsent(listener: () => void) {
  window.addEventListener("storage", listener);
  window.addEventListener(consentEvent, listener);
  return () => {
    window.removeEventListener("storage", listener);
    window.removeEventListener(consentEvent, listener);
  };
}

function saveConsent(choice: "accepted" | "rejected") {
  memoryConsent = JSON.stringify({ version: 1, choice, expiresAt: Date.now() + ADS_CONSENT_DURATION_MS });
  try {
    window.localStorage.setItem(ADS_CONSENT_KEY, memoryConsent);
    storageWriteFailed = false;
  } catch {
    storageWriteFailed = true;
    // A full storage quota must not prevent withdrawal. If saving the new
    // choice fails, remove any older opt-in before the clean page reload.
    if (choice === "rejected") {
      try { window.localStorage.removeItem(ADS_CONSENT_KEY); } catch { /* Storage is blocked. */ }
    }
  }
  window.dispatchEvent(new Event(consentEvent));
}

function clearAdsCookies() {
  const domains = ["", window.location.hostname, `.${window.location.hostname}`];
  const parts = window.location.hostname.split(".");
  if (parts.length > 2) domains.push(`.${parts.slice(1).join(".")}`);
  for (const cookie of document.cookie.split(";")) {
    const name = cookie.trim().split("=")[0];
    if (!name.startsWith("_gcl_") && name !== "_gcl_au") continue;
    for (const domain of domains) {
      document.cookie = `${name}=; Max-Age=0; Path=/; SameSite=Lax${domain ? `; Domain=${domain}` : ""}`;
    }
  }
}

export default function GoogleAdsProvider({ children }: { children: ReactNode }) {
  const consent = useSyncExternalStore(subscribeConsent, getConsent, () => "unknown" as const);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [ready, setReady] = useState(false);
  const initialized = useRef(false);

  useEffect(() => {
    if (!config) return;
    if (consent !== "accepted" || getConsent() !== "accepted") {
      // Hydration first uses the server's unknown snapshot. Preserve existing
      // click attribution when the browser already holds valid consent.
      if (getConsent() === "accepted") return;
      clearAdsCookies();
      if (initialized.current) {
        window.gtag?.("consent", "update", deniedConsent);
        // A fresh page removes the already-running Google library as well as
        // blocking future loads. Merely removing its script tag cannot do that.
        window.location.reload();
      }
      return;
    }
    if (initialized.current) return;
    initialized.current = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function () {
      // Google specifies an arguments-object queue for the gtag API.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer?.push(arguments);
    };
    window.gtag("consent", "default", deniedConsent);
    window.gtag("consent", "update", {
      ...deniedConsent, ad_storage: "granted", ad_user_data: "granted",
    });
    window.gtag("set", "ads_data_redaction", true);
    window.gtag("set", "url_passthrough", false);
    window.gtag("js", new Date());
    window.gtag("config", config.id, {
      ...measurementPageContext(window.location.href, document.referrer),
      send_page_view: false,
      allow_ad_personalization_signals: false,
      allow_google_signals: false,
    });
    // Basic consent mode: no Google script, request, or ping exists until opt-in.
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${config.id}`;
    script.id = "proboost-google-ads";
    script.onload = () => { if (getConsent() === "accepted") setReady(true); };
    document.head.appendChild(script);
  }, [consent]);

  const trackPurchase = useCallback((purchase: ConfirmedPurchase) => {
    if (!config || !ready || consent !== "accepted" || getConsent() !== "accepted" || !window.gtag) return;
    const event = purchaseConversion(purchase, config.destination);
    if (!event || sentPurchases.has(event.transaction_id)) return;
    sentPurchases.add(event.transaction_id);
    window.gtag("event", "conversion", {
      ...event,
      ...measurementPageContext(window.location.href, document.referrer),
    });
  }, [consent, ready]);

  const choose = (choice: "accepted" | "rejected") => {
    saveConsent(choice);
    setSettingsOpen(false);
  };

  return (
    <AdsContext.Provider value={trackPurchase}>
      {children}
      {config && <>
        <button
          type="button"
          onClick={() => setSettingsOpen(true)}
          className="fixed bottom-3 left-3 z-[70] rounded-lg border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-xs text-[var(--muted)] shadow-sm hover:text-[var(--foreground)]"
        ><Localized>Cookie settings</Localized></button>
        {(consent === "unknown" || settingsOpen) && (
          <section
            aria-labelledby="ads-consent-title"
            className="fixed bottom-16 left-3 right-3 z-[80] mx-auto max-w-xl rounded-xl border border-[var(--line)] bg-[var(--background)] p-5 shadow-2xl sm:left-5 sm:right-auto"
          >
            <Localized>
              <h2 id="ads-consent-title" className="text-base font-semibold text-[var(--foreground)]">Help us measure our ads</h2>
              <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                With your permission, Google Ads uses cookies and receives ad-click and purchase information to measure which ads lead to orders. We keep personalised advertising off. Essential site features work with either choice.
              </p>
              <p className="mt-2 text-xs leading-5 text-[var(--muted)]">Change or withdraw your choice at any time in Cookie settings.</p>
            </Localized>
            <Link href="/privacy#cookies" className="mt-2 inline-block text-sm text-[var(--foreground)] underline"><Localized>Read our privacy policy</Localized></Link>
            <div className="mt-4 grid grid-cols-2 gap-3">
              <button type="button" className="button-base button-secondary w-full" onClick={() => choose("rejected")}><Localized>Reject optional cookies</Localized></button>
              <button type="button" className="button-base button-secondary w-full" onClick={() => choose("accepted")}><Localized>Allow ad measurement</Localized></button>
            </div>
          </section>
        )}
      </>}
    </AdsContext.Provider>
  );
}

export function GoogleAdsPurchase({ purchase }: { purchase: ConfirmedPurchase }) {
  const trackPurchase = useContext(AdsContext);
  useEffect(() => { trackPurchase(purchase); }, [purchase, trackPurchase]);
  return null;
}
