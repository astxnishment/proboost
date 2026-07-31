import { DEFAULT_CURRENCY, type CurrencyCode } from "./currency";
import type { Order } from "./pricing";

type CheckoutResponse = {
  url?: string;
  error?: string;
};

const CHECKOUT_TIMEOUT_MS = 20_000;

export async function createCheckoutSession(
  order: Order,
  currency: CurrencyCode = DEFAULT_CURRENCY
): Promise<string> {
  const controller = new AbortController();
  const timeoutId = window.setTimeout(
    () => controller.abort(),
    CHECKOUT_TIMEOUT_MS
  );

  try {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...order, currency }),
      signal: controller.signal,
    });

    const payload = (await response
      .json()
      .catch(() => ({}))) as CheckoutResponse;

    if (!response.ok || !payload.url) {
      throw new Error(
        payload.error ?? "Checkout is temporarily unavailable. Please try again."
      );
    }

    return payload.url;
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new Error(
        "Checkout took too long to respond. Please check your connection and try again."
      );
    }

    throw error;
  } finally {
    window.clearTimeout(timeoutId);
  }
}

export function getCheckoutErrorMessage(error: unknown): string {
  return error instanceof Error
    ? error.message
    : "Checkout could not be started. Please try again.";
}
