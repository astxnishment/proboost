import { cookies } from "next/headers";
import Stripe from "stripe";
import { ArrowRight, CheckCircle2, CircleAlert, Clock3 } from "lucide-react";
import Localized from "../components/Localization";
import { ButtonLink, StatusBadge } from "../components/ui";
import { GoogleAdsPurchase } from "../components/GoogleAdsProvider";
import {
  CHECKOUT_COOKIE, confirmCheckoutSession, isCheckoutBinding, isCheckoutSessionId,
  type CheckoutConfirmation,
} from "../lib/purchase-confirmation";

async function verifyPayment(sessionId: unknown): Promise<CheckoutConfirmation> {
  if (!isCheckoutSessionId(sessionId)) return { status: "invalid" };
  const cookieStore = await cookies();
  const browserBinding = cookieStore.get(CHECKOUT_COOKIE)?.value;
  if (!isCheckoutBinding(browserBinding)) return { status: "invalid" };
  const secretKey = process.env.STRIPE_SECRET_KEY;
  if (!secretKey || secretKey === "sk_test_XXXXXXXX") return { status: "unavailable" };
  try {
    const stripe = new Stripe(secretKey, { timeout: 10000, maxNetworkRetries: 0 });
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    return confirmCheckoutSession(session, browserBinding);
  } catch (error) {
    if (error instanceof Stripe.errors.StripeInvalidRequestError && error.code === "resource_missing") {
      return { status: "invalid" };
    }
    return { status: "unavailable" };
  }
}

export default async function SuccessPage({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string | string[] }>;
}) {
  const confirmation = await verifyPayment((await searchParams).session_id);
  const paid = confirmation.status === "paid";
  const pending = confirmation.status === "pending";
  const live = paid && confirmation.purchase.live;
  const Icon = paid ? CheckCircle2 : pending ? Clock3 : CircleAlert;

  return (
    <>
      {paid && live && <GoogleAdsPurchase purchase={confirmation.purchase} />}
      <Localized><main className="auth-shell flex min-h-[calc(100svh-var(--header-height))] items-center justify-center px-4 py-10 sm:px-6 sm:py-14">
        <div className="surface w-full max-w-lg p-6 text-center sm:p-9">
          <div className={`mx-auto flex h-14 w-14 items-center justify-center rounded-lg border ${paid ? "border-[var(--success-line)] bg-[var(--success-surface)] text-[var(--success)]" : "border-[var(--line)] bg-[var(--surface-muted)] text-[var(--muted)]"}`}>
            <Icon aria-hidden="true" className="h-7 w-7" />
          </div>
          <StatusBadge tone={paid ? "success" : "muted"} className="mt-5">
            {live ? "Payment confirmed" : paid ? "Test payment" : "Payment confirmation"}
          </StatusBadge>
          <h1 className="mt-4 text-3xl font-semibold text-[var(--foreground)] sm:text-4xl">
            {live ? "Payment Successful" : paid ? "Test payment complete" : pending ? "Payment is still processing" : "We could not confirm this payment"}
          </h1>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-[var(--muted)] sm:text-base">
            {live
              ? "Stripe has confirmed your payment. Contact support with your payment reference for help with your order."
              : paid
                ? "This was a test transaction. No real payment or advertising conversion has been recorded."
                : pending
                  ? "Stripe has not confirmed payment yet. Refresh this page in a moment before trying another payment."
                  : "Open the confirmation link in the browser used for checkout, or contact support. Do not pay again until your payment status is clear."}
          </p>
          {paid && (
            <div className="mt-7 rounded-lg border border-[var(--line)] bg-[var(--surface-muted)] p-5 text-left text-sm">
              <p className="font-semibold text-[var(--foreground)]">Payment reference</p>
              <p translate="no" className="mt-2 break-all font-mono text-xs text-[var(--muted)]">{confirmation.purchase.transactionId}</p>
            </div>
          )}
          <a href="mailto:support@proboost.gg" className="mt-6 inline-block text-sm text-[var(--foreground)] underline">Contact support</a>
          <ButtonLink href="/" className="mt-6 w-full">
            Back to Home
            <ArrowRight aria-hidden="true" className="h-4 w-4" />
          </ButtonLink>
        </div>
      </main></Localized>
    </>
  );
}
