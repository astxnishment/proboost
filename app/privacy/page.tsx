import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy — ProBoost.gg",
  description: "Learn how ProBoost.gg collects, uses, and protects your personal data.",
  alternates: {
    canonical: "/privacy",
  },
};

const sections = [
  {
    id: "intro",
    number: "01",
    title: "Introduction",
    content: (
      <>
        <p>
          Welcome to <strong className="text-[var(--foreground)]">ProBoost.gg</strong> (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;). We are
          committed to protecting your personal information and your right to privacy.
        </p>
        <p>
          This Privacy Policy explains how we collect, use, disclose, and safeguard your information when
          you visit our website or purchase our services. Please read it carefully.
        </p>
        <p>
          If you disagree with the terms of this policy, please discontinue use of our site.
        </p>
      </>
    ),
  },
  {
    id: "collection",
    number: "02",
    title: "Information We Collect",
    content: (
      <>
        <p>We collect information you provide directly to us, including:</p>
        <ul>
          <li>
            <strong className="text-[var(--foreground-soft)]">Account data</strong> — name, email address, and password
            when you register
          </li>
          <li>
            <strong className="text-[var(--foreground-soft)]">Order data</strong> — game account details, rank, platform,
            and service preferences needed to fulfil your order
          </li>
          <li>
            <strong className="text-[var(--foreground-soft)]">Payment data</strong> — billing information processed
            securely via third-party providers (e.g. Stripe). We never store full card details.
          </li>
          <li>
            <strong className="text-[var(--foreground-soft)]">Communications</strong> — messages you send us via email or
            support chat
          </li>
        </ul>
        <p>We also collect certain data automatically:</p>
        <ul>
          <li>IP address and approximate location</li>
          <li>Browser type, device type, and operating system</li>
          <li>Pages visited, time spent, and referral URLs</li>
          <li>Cookies and similar tracking technologies</li>
        </ul>
      </>
    ),
  },
  {
    id: "use",
    number: "03",
    title: "How We Use Your Information",
    content: (
      <>
        <p>We use the information we collect to:</p>
        <ul>
          <li>Create and manage your account</li>
          <li>Process and fulfil your orders</li>
          <li>Send transactional emails (order confirmations, updates)</li>
          <li>Respond to support requests and enquiries</li>
          <li>Detect and prevent fraud or abuse</li>
          <li>Improve our website, services, and user experience</li>
          <li>
            Send promotional communications — only with your consent, and you may opt out at any time
          </li>
          <li>Comply with legal obligations</li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    number: "04",
    title: "Sharing Your Information",
    content: (
      <>
        <p>
          We do <strong className="text-[var(--foreground)]">not</strong> sell, rent, or trade your personal data.
        </p>
        <p>We may share data with trusted third parties only where necessary:</p>
        <ul>
          <li>
            <strong className="text-[var(--foreground-soft)]">Payment processors</strong> (e.g. Stripe) to handle
            transactions securely
          </li>
          <li>
            <strong className="text-[var(--foreground-soft)]">Analytics providers</strong> (e.g. Google Analytics,
            Mixpanel) to understand site usage — data is anonymised where possible
          </li>
          <li>
            <strong className="text-[var(--foreground-soft)]">Customer support tools</strong> to manage communications
          </li>
          <li>
            <strong className="text-[var(--foreground-soft)]">Law enforcement or regulators</strong> when required by law
            or to protect our legal rights
          </li>
        </ul>
        <p>All third-party providers are required to handle your data securely and in line with applicable law.</p>
      </>
    ),
  },
  {
    id: "cookies",
    number: "05",
    title: "Cookies",
    content: (
      <>
        <p>
          We use cookies and similar technologies to improve functionality and analyse traffic. Types of
          cookies we use:
        </p>
        <ul>
          <li>
            <strong className="text-[var(--foreground-soft)]">Essential cookies</strong> — required for the site to
            function (e.g. session authentication)
          </li>
          <li>
            <strong className="text-[var(--foreground-soft)]">Analytics cookies</strong> — help us understand how visitors
            interact with our site
          </li>
          <li>
            <strong className="text-[var(--foreground-soft)]">Marketing cookies</strong> — used to show relevant
            advertising (only with consent)
          </li>
        </ul>
        <p>
          You can control or disable cookies through your browser settings. Note that disabling certain
          cookies may affect site functionality.
        </p>
      </>
    ),
  },
  {
    id: "retention",
    number: "06",
    title: "Data Retention",
    content: (
      <>
        <p>
          We retain your personal data only for as long as necessary to fulfil the purposes outlined in
          this policy, or as required by law.
        </p>
        <ul>
          <li>Account data is kept while your account remains active</li>
          <li>Order records are retained for up to 7 years for legal and accounting purposes</li>
          <li>Marketing preferences and communications are deleted upon request</li>
        </ul>
        <p>
          You may request deletion of your account and associated data at any time by contacting us at{" "}
          <a href="mailto:support@proboost.gg" className="theme-link transition-colors">
            support@proboost.gg
          </a>
          .
        </p>
      </>
    ),
  },
  {
    id: "rights",
    number: "07",
    title: "Your Rights",
    content: (
      <>
        <p>
          Depending on your location, you may have the following rights regarding your personal data:
        </p>
        <ul>
          <li>
            <strong className="text-[var(--foreground-soft)]">Access</strong> — request a copy of the data we hold about
            you
          </li>
          <li>
            <strong className="text-[var(--foreground-soft)]">Rectification</strong> — ask us to correct inaccurate data
          </li>
          <li>
            <strong className="text-[var(--foreground-soft)]">Erasure</strong> — request deletion of your personal data
          </li>
          <li>
            <strong className="text-[var(--foreground-soft)]">Restriction</strong> — ask us to limit how we process your
            data
          </li>
          <li>
            <strong className="text-[var(--foreground-soft)]">Portability</strong> — receive your data in a structured,
            machine-readable format
          </li>
          <li>
            <strong className="text-[var(--foreground-soft)]">Objection</strong> — object to processing based on
            legitimate interests or for marketing purposes
          </li>
        </ul>
        <p>
          To exercise any of these rights, contact us at{" "}
          <a href="mailto:support@proboost.gg" className="theme-link transition-colors">
            support@proboost.gg
          </a>
          . We will respond within 30 days.
        </p>
      </>
    ),
  },
  {
    id: "security",
    number: "08",
    title: "Data Security",
    content: (
      <>
        <p>
          We implement appropriate technical and organisational measures to protect your personal data
          against unauthorised access, loss, or disclosure. These include:
        </p>
        <ul>
          <li>HTTPS encryption across the entire site</li>
          <li>Secure, tokenised payment processing via Stripe</li>
          <li>Access controls limiting who can view personal data internally</li>
          <li>Regular security reviews</li>
        </ul>
        <p>
          No method of transmission over the internet is 100% secure. While we strive to protect your
          data, we cannot guarantee absolute security.
        </p>
      </>
    ),
  },
  {
    id: "minors",
    number: "09",
    title: "Children's Privacy",
    content: (
      <>
        <p>
          Our services are not directed to individuals under the age of 18. We do not knowingly collect
          personal data from minors.
        </p>
        <p>
          If you believe a minor has provided us with personal data, please contact us immediately and we
          will take steps to delete it.
        </p>
      </>
    ),
  },
  {
    id: "third-party",
    number: "10",
    title: "Third-Party Links",
    content: (
      <>
        <p>
          Our website may contain links to third-party sites. We are not responsible for the privacy
          practices of those sites and encourage you to review their privacy policies independently.
        </p>
      </>
    ),
  },
  {
    id: "transfers",
    number: "11",
    title: "International Data Transfers",
    content: (
      <>
        <p>
          Your data may be processed in countries outside of your own. Where this occurs, we ensure
          appropriate safeguards are in place (e.g. Standard Contractual Clauses) to protect your data in
          accordance with applicable law.
        </p>
      </>
    ),
  },
  {
    id: "changes",
    number: "12",
    title: "Changes to This Policy",
    content: (
      <>
        <p>
          We may update this Privacy Policy from time to time. When we do, we will revise the &quot;Last
          updated&quot; date at the top of this page.
        </p>
        <p>
          We encourage you to review this policy periodically. Continued use of our service after changes
          constitutes acceptance of the updated policy.
        </p>
      </>
    ),
  },
  {
    id: "contact",
    number: "13",
    title: "Contact Us",
    content: (
      <>
        <p>
          If you have questions, concerns, or requests relating to this Privacy Policy, please contact us:
        </p>
        <p>
          <a href="mailto:support@proboost.gg" className="theme-link font-semibold transition-colors">
            support@proboost.gg
          </a>
        </p>
        <p className="text-[var(--muted)]">ProBoost.gg — United Kingdom</p>
      </>
    ),
  },
];

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--muted)]">
      {/* Hero */}
      <div className="relative overflow-hidden border-b border-[var(--line)]">
        <div className="relative mx-auto max-w-[var(--reading-max-width)] px-5 py-14 text-center sm:px-8 sm:py-16">
          <p className="status-badge mb-4">
            Legal
          </p>
          <h1 className="page-title mb-4 text-[var(--foreground)]">
            Privacy Policy
          </h1>
          <p className="text-sm text-[var(--muted)]">
            Last updated: <span className="text-[var(--foreground-soft)]">April 23, 2026</span>
          </p>
        </div>
      </div>

      {/* Body */}
      <div className="mx-auto max-w-[var(--reading-max-width)] px-5 py-14 sm:px-8 sm:py-16">
        {/* Quick-nav */}
        <nav aria-label="Privacy policy contents" className="theme-surface mb-14 rounded-lg border p-6">
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
            Questions about your data?{" "}
            <a
              href="mailto:support@proboost.gg"
              className="theme-link font-semibold transition-colors"
            >
              Contact us
            </a>
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link
              href="/terms"
              className="button-base button-secondary"
            >
              Terms &amp; Conditions
            </Link>
            <Link
              href="/"
              className="button-base button-secondary"
            >
              <ArrowLeft aria-hidden className="h-4 w-4" />
              Back to Home
            </Link>
          </div>
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
