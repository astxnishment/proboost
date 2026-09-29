import type Stripe from "stripe";
import { isCurrencyCode, type CurrencyCode } from "./currency";

export const CHECKOUT_COOKIE = "proboost_checkout_browser";

export type ConfirmedPurchase = {
  transactionId: string;
  value: number;
  currency: CurrencyCode;
  live: boolean;
};

export type CheckoutConfirmation =
  | { status: "paid"; purchase: ConfirmedPurchase }
  | { status: "pending" | "invalid" | "unavailable" };

export function isCheckoutSessionId(value: unknown): value is string {
  return typeof value === "string" && /^cs_(live|test)_[A-Za-z0-9]{16,240}$/.test(value);
}

export function isCheckoutBinding(value: unknown): value is string {
  return typeof value === "string" && /^[A-Za-z0-9_-]{43}$/.test(value);
}

// Only call this with a Session retrieved by the server from Stripe, never
// with data supplied by the browser. Customer details stay on the server.
export function confirmCheckoutSession(
  session: Stripe.Checkout.Session,
  browserBinding: string,
): CheckoutConfirmation {
  if (
    session.mode !== "payment" || session.metadata?.source !== "proboost" ||
    !isCheckoutBinding(browserBinding) || session.metadata.checkout_browser !== browserBinding
  ) {
    return { status: "invalid" };
  }
  if (session.status === "expired") return { status: "invalid" };
  if (session.status !== "complete" || session.payment_status !== "paid") {
    return { status: "pending" };
  }

  const currency = session.currency?.toUpperCase();
  const paymentIntent = typeof session.payment_intent === "string"
    ? session.payment_intent
    : session.payment_intent?.id;

  if (
    !isCurrencyCode(currency) ||
    !Number.isSafeInteger(session.amount_total) ||
    session.amount_total === null ||
    session.amount_total <= 0 ||
    !paymentIntent ||
    !/^pi_[A-Za-z0-9]+$/.test(paymentIntent) ||
    paymentIntent.length > 64
  ) {
    return { status: "invalid" };
  }

  return {
    status: "paid",
    purchase: {
      transactionId: paymentIntent,
      value: session.amount_total / 100,
      currency,
      live: session.livemode === true,
    },
  };
}
