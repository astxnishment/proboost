import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms and Conditions — ProBoost.gg",
  description: "Read the Terms and Conditions governing your use of ProBoost.gg.",
  alternates: {
    canonical: "/terms",
  },
};

const sections = [
  {
    id: "overview",
    number: "01",
    title: "Overview",
    content: (
      <>
        <p>
          These Terms and Conditions govern your use of the website{" "}
          <strong className="text-[var(--foreground)]">ProBoost.gg</strong> (&quot;Website&quot;, &quot;Service&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;).
        </p>
        <p>
          By accessing or using our Website, you agree to be bound by these Terms. If you do not agree,
          you must not use our Service.
        </p>
      </>
    ),
  },
  {
    id: "nature",
    number: "02",
    title: "Nature of the Service",
    content: (
      <>
        <p>
          ProBoost.gg provides{" "}
          <strong className="text-[var(--foreground)]">in-game boosting, coaching, and related gaming services</strong>.
        </p>
        <p>By using our Service, you acknowledge that:</p>
        <ul>
          <li>We provide services performed by real players or contractors.</li>
          <li>
            We are not affiliated with, endorsed by, or associated with any game developers or publishers.
          </li>
          <li>You use our services at your own discretion and risk.</li>
        </ul>
      </>
    ),
  },
  {
    id: "accounts",
    number: "03",
    title: "Accounts",
    content: (
      <>
        <p>To use certain features, you may be required to create an account.</p>
        <p>You agree to:</p>
        <ul>
          <li>Provide accurate and complete information</li>
          <li>Keep your login credentials secure</li>
          <li>Be responsible for all activity under your account</li>
        </ul>
        <p>We reserve the right to suspend or terminate accounts that violate these Terms.</p>
      </>
    ),
  },
  {
    id: "orders",
    number: "04",
    title: "Orders and Payments",
    content: (
      <>
        <p>By placing an order, you agree to:</p>
        <ul>
          <li>Pay the full price displayed at checkout</li>
          <li>Provide accurate service details (rank, platform, etc.)</li>
        </ul>
        <p>
          Payments are processed via third-party providers (e.g., Stripe). We do not store your payment
          details.
        </p>
        <p>We reserve the right to:</p>
        <ul>
          <li>Refuse or cancel orders at our discretion</li>
          <li>Adjust pricing at any time</li>
        </ul>
      </>
    ),
  },
  {
    id: "delivery",
    number: "05",
    title: "Service Delivery",
    content: (
      <>
        <ul>
          <li>
            Services are delivered within estimated timeframes but are{" "}
            <strong className="text-[var(--foreground)]">not guaranteed</strong>
          </li>
          <li>Delays may occur due to external factors (game servers, availability, etc.)</li>
          <li>You agree to cooperate if required (e.g., account access, communication)</li>
        </ul>
      </>
    ),
  },
  {
    id: "refunds",
    number: "06",
    title: "Refund Policy",
    content: (
      <>
        <p>Refunds may be granted if:</p>
        <ul>
          <li>The service has not started</li>
          <li>The service cannot be completed</li>
        </ul>
        <p>
          Refunds are <strong className="text-[var(--foreground)]">not guaranteed</strong> if:
        </p>
        <ul>
          <li>The service has already begun or been completed</li>
          <li>Incorrect information was provided by the user</li>
        </ul>
        <p>
          All refund requests must be submitted to:{" "}
          <a href="mailto:support@proboost.gg" className="theme-link transition-colors">
            support@proboost.gg
          </a>
        </p>
      </>
    ),
  },
  {
    id: "responsibilities",
    number: "07",
    title: "User Responsibilities",
    content: (
      <>
        <p>You agree NOT to:</p>
        <ul>
          <li>Use the service for illegal purposes</li>
          <li>Abuse, harass, or threaten staff or boosters</li>
          <li>Attempt to exploit or manipulate the service</li>
        </ul>
        <p>We reserve the right to deny service or terminate accounts for violations.</p>
      </>
    ),
  },
  {
    id: "game-account",
    number: "08",
    title: "Game Account Responsibility",
    content: (
      <>
        <p>You acknowledge that:</p>
        <ul>
          <li>Boosting may violate certain game terms of service</li>
          <li>You are fully responsible for your account</li>
        </ul>
        <p>We are not liable for:</p>
        <ul>
          <li>Account bans</li>
          <li>Suspensions</li>
          <li>In-game penalties</li>
        </ul>
      </>
    ),
  },
  {
    id: "ip",
    number: "09",
    title: "Intellectual Property",
    content: (
      <>
        <p>
          All content on this Website (branding, design, text, graphics) is owned by ProBoost.gg.
        </p>
        <p>You may not:</p>
        <ul>
          <li>Copy, reproduce, or distribute content without permission</li>
        </ul>
      </>
    ),
  },
  {
    id: "liability",
    number: "10",
    title: "Limitation of Liability",
    content: (
      <>
        <p>To the maximum extent permitted by law, ProBoost.gg is not liable for:</p>
        <ul>
          <li>Indirect or consequential damages</li>
          <li>Loss of data, profits, or accounts</li>
          <li>Service interruptions or delays</li>
        </ul>
        <p>Our total liability shall not exceed the amount paid by the user.</p>
      </>
    ),
  },
  {
    id: "availability",
    number: "11",
    title: "Service Availability",
    content: (
      <>
        <p>We may:</p>
        <ul>
          <li>Modify or discontinue services at any time</li>
          <li>Perform maintenance that may temporarily interrupt access</li>
        </ul>
      </>
    ),
  },
  {
    id: "changes",
    number: "12",
    title: "Changes to Terms",
    content: (
      <>
        <p>We reserve the right to update these Terms at any time.</p>
        <p>Continued use of the Website means you accept the updated Terms.</p>
      </>
    ),
  },
  {
    id: "law",
    number: "13",
    title: "Governing Law",
    content: (
      <>
        <p>These Terms are governed by the laws of the United Kingdom.</p>
      </>
    ),
  },
  {
    id: "contact",
    number: "14",
    title: "Contact Information",
    content: (
      <>
        <p>For any questions or support requests:</p>
        <p>
          <a href="mailto:support@proboost.gg" className="theme-link font-semibold transition-colors">
            support@proboost.gg
          </a>
        </p>
      </>
    ),
  },
  {
    id: "acceptance",
    number: "15",
    title: "Acceptance",
    content: (
      <>
        <p>
          By using ProBoost.gg, you confirm that you have read, understood, and agreed to these Terms.
        </p>
      </>
    ),
  },
];

export default function TermsPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--muted)]">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-[var(--line)]">
        <div className="relative mx-auto max-w-[var(--reading-max-width)] px-5 py-14 text-center sm:px-8 sm:py-16">
          <p className="status-badge mb-4">
            Legal
          </p>
          <h1 className="page-title mb-4 text-[var(--foreground)]">
            Terms &amp; Conditions
          </h1>
          <p className="text-sm text-[var(--muted)]">
            Last updated: <span className="text-[var(--foreground-soft)]">April 23, 2026</span>
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-[var(--reading-max-width)] px-5 py-14 sm:px-8 sm:py-16">
        {/* Quick-nav */}
        <nav aria-label="Terms and conditions contents" className="theme-surface mb-14 rounded-lg border p-6">
          <p className="eyebrow mb-4">Contents</p>
          <ol className="grid gap-1 sm:grid-cols-2">
            {sections.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="flex items-center gap-2 rounded-lg px-2 py-1.5 text-sm text-[var(--muted)] transition hover:bg-[var(--surface-hover)] hover:text-[var(--foreground)]"
                >
                  <span className="font-mono text-xs text-[var(--muted-soft)]">{s.number}</span>
                  {s.title}
                </a>
              </li>
            ))}
          </ol>
        </nav>

        {/* Sections */}
        <div className="flex flex-col gap-10">
          {sections.map((s) => (
            <section
              key={s.id}
              id={s.id}
              className="theme-surface scroll-mt-24 rounded-lg border p-7"
            >
              <div className="mb-4 flex items-center gap-3">
                <span className="font-mono text-xs font-bold text-[var(--muted-soft)]">{s.number}</span>
                <h2 className="text-lg font-extrabold text-[var(--foreground)]">{s.title}</h2>
              </div>
              <div className="prose-terms">{s.content}</div>
            </section>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 flex flex-col items-center gap-4 text-center">
          <p className="text-sm text-[var(--muted)]">
            Questions about these Terms?{" "}
            <a
              href="mailto:support@proboost.gg"
              className="theme-link font-semibold transition-colors"
            >
              Contact us
            </a>
          </p>
          <Link
            href="/"
            className="button-base button-secondary"
          >
            <ArrowLeft aria-hidden className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>

      <style>{`
        .prose-terms p {
          margin-bottom: 0.75rem;
          line-height: 1.75;
          font-size: 0.9375rem;
        }
        .prose-terms p:last-child {
          margin-bottom: 0;
        }
        .prose-terms ul {
          margin: 0.5rem 0 0.75rem 0;
          padding-left: 1.25rem;
          list-style: disc;
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }
        .prose-terms li {
          font-size: 0.9375rem;
          line-height: 1.75;
        }
      `}</style>
    </main>
  );
}
