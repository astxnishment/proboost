"use client";

import React from "react";
import {
  CURRENCY_DEFINITIONS,
  DEFAULT_CURRENCY,
  formatGbpNumber,
  formatGbpPrice,
  formatNativePrice as formatCurrencyAmount,
  isCurrencyCode,
  type CurrencyCode,
} from "../lib/currency";

const STORAGE_KEY = "proboost_currency";
const CHANGE_EVENT = "proboost:currency-change";

const EURO_REGIONS = new Set([
  "AT",
  "BE",
  "CY",
  "DE",
  "EE",
  "ES",
  "FI",
  "FR",
  "GR",
  "HR",
  "IE",
  "IT",
  "LT",
  "LU",
  "LV",
  "MT",
  "NL",
  "PT",
  "SI",
  "SK",
]);

function inferCurrency(): CurrencyCode {
  const region = navigator.language.split("-")[1]?.toUpperCase();
  if (region === "US") return "USD";
  if (region && EURO_REGIONS.has(region)) return "EUR";
  return DEFAULT_CURRENCY;
}

function getCurrencySnapshot(): CurrencyCode {
  const savedCurrency = window.localStorage.getItem(STORAGE_KEY);
  return isCurrencyCode(savedCurrency) ? savedCurrency : inferCurrency();
}

function subscribeToCurrency(onStoreChange: () => void) {
  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) onStoreChange();
  };

  window.addEventListener("storage", handleStorage);
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  return () => {
    window.removeEventListener("storage", handleStorage);
    window.removeEventListener(CHANGE_EVENT, onStoreChange);
  };
}

type CurrencyContextValue = {
  currency: CurrencyCode;
  currencyName: string;
  symbol: string;
  setCurrency: (currency: CurrencyCode) => void;
  formatPrice: (
    amountInGbp: number,
    options?: {
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
    }
  ) => string;
  formatNativePrice: (
    amount: number,
    options?: {
      minimumFractionDigits?: number;
      maximumFractionDigits?: number;
    }
  ) => string;
  formatPriceNumber: (amountInGbp: number) => string;
};

const CurrencyContext = React.createContext<CurrencyContextValue | null>(null);

export function CurrencyProvider({ children }: { children: React.ReactNode }) {
  const currency = React.useSyncExternalStore(
    subscribeToCurrency,
    getCurrencySnapshot,
    () => DEFAULT_CURRENCY
  );

  React.useLayoutEffect(() => {
    document.documentElement.dataset.currency = currency;
  }, [currency]);

  const setCurrency = React.useCallback((nextCurrency: CurrencyCode) => {
    window.localStorage.setItem(STORAGE_KEY, nextCurrency);
    window.dispatchEvent(new Event(CHANGE_EVENT));
  }, []);

  const value = React.useMemo<CurrencyContextValue>(
    () => ({
      currency,
      currencyName: CURRENCY_DEFINITIONS[currency].name,
      symbol: CURRENCY_DEFINITIONS[currency].symbol,
      setCurrency,
      formatPrice: (amountInGbp, options) =>
        formatGbpPrice(amountInGbp, currency, options),
      formatNativePrice: (amount, options) =>
        formatCurrencyAmount(amount, currency, options),
      formatPriceNumber: (amountInGbp) =>
        formatGbpNumber(amountInGbp, currency),
    }),
    [currency, setCurrency]
  );

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency(): CurrencyContextValue {
  const context = React.useContext(CurrencyContext);
  if (!context) {
    throw new Error("useCurrency must be used within CurrencyProvider");
  }
  return context;
}
