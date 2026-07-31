export const CURRENCIES = ["GBP", "USD", "EUR"] as const;

export type CurrencyCode = (typeof CURRENCIES)[number];

type CurrencyDefinition = {
  name: string;
  symbol: string;
  locale: string;
  rateFromGbp: number;
};

export const CURRENCY_DEFINITIONS: Record<CurrencyCode, CurrencyDefinition> = {
  GBP: {
    name: "British Pound",
    symbol: "£",
    locale: "en-GB",
    rateFromGbp: 1,
  },
  USD: {
    name: "US Dollar",
    symbol: "$",
    locale: "en-US",
    rateFromGbp: 1.33,
  },
  EUR: {
    name: "Euro",
    symbol: "€",
    locale: "en-IE",
    rateFromGbp: 1.17,
  },
};

export const DEFAULT_CURRENCY: CurrencyCode = "GBP";

export function isCurrencyCode(value: unknown): value is CurrencyCode {
  return (
    typeof value === "string" &&
    CURRENCIES.includes(value as CurrencyCode)
  );
}

export function convertFromGbp(
  amountInGbp: number,
  currency: CurrencyCode
): number {
  return amountInGbp * CURRENCY_DEFINITIONS[currency].rateFromGbp;
}

type FormatOptions = {
  minimumFractionDigits?: number;
  maximumFractionDigits?: number;
};

export function formatGbpPrice(
  amountInGbp: number,
  currency: CurrencyCode,
  options: FormatOptions = {}
): string {
  const definition = CURRENCY_DEFINITIONS[currency];
  return new Intl.NumberFormat(definition.locale, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: options.minimumFractionDigits ?? 2,
    maximumFractionDigits: options.maximumFractionDigits ?? 2,
  }).format(convertFromGbp(amountInGbp, currency));
}

export function formatNativePrice(
  amount: number,
  currency: CurrencyCode,
  options: FormatOptions = {}
): string {
  const definition = CURRENCY_DEFINITIONS[currency];
  return new Intl.NumberFormat(definition.locale, {
    style: "currency",
    currency,
    currencyDisplay: "narrowSymbol",
    minimumFractionDigits: options.minimumFractionDigits ?? 2,
    maximumFractionDigits: options.maximumFractionDigits ?? 2,
  }).format(amount);
}

export function formatGbpNumber(
  amountInGbp: number,
  currency: CurrencyCode
): string {
  const definition = CURRENCY_DEFINITIONS[currency];
  return new Intl.NumberFormat(definition.locale, {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(convertFromGbp(amountInGbp, currency));
}

export function getChargeAmount(
  amountInGbp: number,
  currency: CurrencyCode
): number {
  return Math.round(convertFromGbp(amountInGbp, currency) * 100);
}
