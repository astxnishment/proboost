import Image from "next/image";
import Link from "next/link";
const paymentPills = [
  { src: "/bottom/stripe-pill.svg", alt: "Stripe" },
  { src: "/bottom/coinbase-pill.svg", alt: "Coinbase" },
  { src: "/bottom/skrill-pill.svg", alt: "Skrill" },
  { src: "/bottom/paypal-pill.svg", alt: "PayPal" },
  { src: "/bottom/paysafe-pill.svg", alt: "Paysafe" },
  { src: "/bottom/gpay-pill.svg", alt: "Google Pay" },
];

const socials = [
  {
    label: "Instagram",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "TikTok",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.2 8.2 0 0 0 4.79 1.53V6.76a4.85 4.85 0 0 1-1.02-.07z" />
      </svg>
    ),
  },
  {
    label: "X",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    label: "Discord",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028 14.09 14.09 0 0 0 1.226-1.994.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="relative z-10 mt-12 border-t border-white/10 bg-[#0b0e12]/95 text-white backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-cyan-500/6 to-transparent" />
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.6fr_0.9fr_0.9fr_1.8fr]">

          {/* Brand column */}
          <div>
            <Link href="/" aria-label="Go to homepage" className="inline-block">
              <Image src="/logo.png" alt="ProBoost" width={320} height={100} className="mb-5 h-24 w-auto object-contain" unoptimized />
            </Link>
            <div className="mb-6 flex gap-2">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-white/15 text-white/60 transition hover:border-white/35 hover:text-white"
                >
                  {s.icon}
                </a>
              ))}
            </div>
            <p style={{ color: "#71717a" }} className="text-xs leading-6">
              This website is not endorsed or affiliated with RIOT GAMES INC. All trademarks are property of the respective owners in all the countries on which they operate.
            </p>
          </div>

          {/* Main links */}
          <div>
            <p className="mb-5 text-sm font-bold text-white">Main</p>
            <ul className="space-y-3 text-sm" style={{ color: "#a1a1aa" }}>
              <li><Link href="/" className="transition hover:text-white">Home</Link></li>
              <li><Link href="/boosting" className="transition hover:text-white">Boosting</Link></li>
              <li><a href="#" className="transition hover:text-white">Membership</a></li>
            </ul>
          </div>

          {/* Help links */}
          <div>
            <p className="mb-5 text-sm font-bold text-white">Help</p>
            <ul className="space-y-3 text-sm" style={{ color: "#a1a1aa" }}>
              <li><a href="#" className="transition hover:text-white">Contact Us</a></li>
              <li><a href="#" className="transition hover:text-white">Work with us</a></li>
            </ul>
          </div>

          {/* Payment pills */}
          <div>
            <p className="mb-5 text-sm font-bold text-white">Payment Methods</p>
            <div className="grid grid-cols-2 gap-3">
              {paymentPills.map((p) => (
                <div
                  key={p.alt}
                  className="flex h-16 items-center justify-center rounded-xl border border-white/[0.12] bg-white/[0.06] px-4"
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.src} alt={p.alt} className="h-9 w-auto max-w-[85%] object-contain" />
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="mt-10 border-t border-white/10 pt-6 text-center text-xs text-zinc-600">
          © {new Date().getFullYear()} ProBoost. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
