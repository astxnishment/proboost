import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  Mail,
  ReceiptText,
  ShieldCheck,
  UserRound,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Contact ProBoost Support",
  description: "Contact ProBoost support for order, payment, account, and service help.",
  alternates: {
    canonical: "/contact",
  },
};

const supportTopics = [
  {
    title: "Orders and delivery",
    description: "Share your order number and the service you purchased so we can find it quickly.",
    icon: ReceiptText,
  },
  {
    title: "Account and security",
    description: "Tell us which sign-in email you use. Never include your password in a message.",
    icon: ShieldCheck,
  },
  {
    title: "Billing and membership",
    description: "Include the charge date and billing plan for payment, refund, or ProBoost+ questions.",
    icon: UserRound,
  },
] as const;

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] pt-16 text-[var(--foreground)]">
      <section className="border-b border-[var(--line)] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-[1120px] text-center">
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)]">
            <Mail aria-hidden className="h-5 w-5" strokeWidth={1.7} />
          </div>
          <p className="mt-6 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
            ProBoost Support
          </p>
          <h1 className="mx-auto mt-4 max-w-[12ch] text-4xl font-semibold leading-[1.02] sm:text-6xl">
            How can we help?
          </h1>
          <p className="mx-auto mt-5 max-w-[58ch] text-base leading-7 text-[var(--muted)] sm:text-lg">
            Get help with an order, payment, account, or ProBoost+ membership directly from our support team.
          </p>
        </div>
      </section>

      <section className="px-5 py-14 sm:px-8 lg:px-10 lg:py-20">
        <div className="mx-auto max-w-[1120px] overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--surface)] lg:grid lg:grid-cols-[0.78fr_1.22fr]">
          <div className="flex flex-col justify-between border-b border-[var(--line)] p-6 sm:p-8 lg:border-b-0 lg:border-r lg:p-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--muted)]">Email support</p>
              <a
                href="mailto:support@proboost.gg"
                className="mt-4 block break-all text-2xl font-semibold leading-tight text-[var(--foreground)] sm:text-3xl"
              >
                support@proboost.gg
              </a>
              <p className="mt-4 max-w-[36ch] text-sm leading-6 text-[var(--muted)]">
                One clear message with the relevant details helps us resolve your request faster.
              </p>
            </div>
            <a
              href="mailto:support@proboost.gg"
              className="theme-inverse mt-8 inline-flex h-11 w-fit items-center justify-center gap-2 rounded-lg border px-5 text-sm font-semibold transition hover:opacity-85"
            >
              Email support
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </a>
          </div>

          <div className="p-6 sm:p-8 lg:p-10">
            <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
              <Clock3 aria-hidden className="h-4 w-4" strokeWidth={1.7} />
              Replies are handled in the order received.
            </div>
            <div className="mt-6">
              {supportTopics.map((topic) => (
                <div
                  key={topic.title}
                  className="grid grid-cols-[40px_1fr] gap-4 border-t border-[var(--line)] py-6 first:border-t-0 first:pt-0 last:pb-0"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--surface-subtle)] text-[var(--foreground)]">
                    <topic.icon aria-hidden className="h-4.5 w-4.5" strokeWidth={1.7} />
                  </span>
                  <div>
                    <h2 className="text-base font-semibold">{topic.title}</h2>
                    <p className="mt-1 max-w-[52ch] text-sm leading-6 text-[var(--muted)]">{topic.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mx-auto mt-8 flex max-w-[1120px] flex-col gap-3 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>For privacy requests, email the same address with “Privacy” in the subject.</p>
          <div className="flex gap-5">
            <Link href="/terms" className="font-medium text-[var(--foreground)] hover:underline">Terms</Link>
            <Link href="/privacy" className="font-medium text-[var(--foreground)] hover:underline">Privacy</Link>
          </div>
        </div>
      </section>
    </main>
  );
}
