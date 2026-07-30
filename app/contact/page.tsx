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
import { PageContainer, Section, StatusBadge } from "../components/ui";

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
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Section className="border-b border-[var(--line)]">
        <PageContainer size="content">
          <div className="grid gap-10 lg:grid-cols-[minmax(0,1.1fr)_minmax(360px,0.9fr)] lg:items-end">
            <div>
              <StatusBadge tone="accent">
                <Mail aria-hidden className="h-3.5 w-3.5" />
                ProBoost Support
              </StatusBadge>
              <h1 className="page-title mt-5 max-w-[12ch]">How can we help?</h1>
              <p className="body-large mt-5 max-w-[56ch]">
                Get direct help with an order, payment, account, or ProBoost+
                membership from our support team.
              </p>
            </div>

            <div className="surface p-6 sm:p-7">
              <p className="eyebrow">Email support</p>
              <a
                href="mailto:support@proboost.gg"
                className="mt-3 block break-all text-xl font-semibold text-[var(--foreground)] sm:text-2xl"
              >
                support@proboost.gg
              </a>
              <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                Include the relevant order details so we can resolve your
                request faster.
              </p>
              <a
                href="mailto:support@proboost.gg"
                className="button-base button-primary mt-6 w-full sm:w-fit"
              >
                Email support
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </a>
              <p className="mt-4 flex items-center gap-2 text-xs text-[var(--muted)]">
                <Clock3 aria-hidden className="h-3.5 w-3.5" />
                Replies are handled in the order received.
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-3 md:grid-cols-3">
            {supportTopics.map((topic) => (
              <article key={topic.title} className="surface p-5 sm:p-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-[var(--radius-control)] bg-[var(--accent-soft)] text-[var(--accent)]">
                  <topic.icon aria-hidden className="h-4.5 w-4.5" strokeWidth={1.7} />
                </span>
                <h2 className="mt-5 text-base font-semibold">{topic.title}</h2>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  {topic.description}
                </p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 border-t border-[var(--line)] pt-6 text-sm text-[var(--muted)] sm:flex-row sm:items-center sm:justify-between">
          <p>For privacy requests, email the same address with “Privacy” in the subject.</p>
          <div className="flex gap-5">
            <Link href="/terms" className="font-medium text-[var(--foreground)] hover:underline">Terms</Link>
            <Link href="/privacy" className="font-medium text-[var(--foreground)] hover:underline">Privacy</Link>
          </div>
        </div>
        </PageContainer>
      </Section>
    </main>
  );
}
