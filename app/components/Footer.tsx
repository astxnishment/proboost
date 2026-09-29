import Localized from "./Localization";
import { GAME_DIRECTORY } from "../lib/games";
import Image from "next/image";
import Link from "next/link";
import { Mail } from "lucide-react";
import { PageContainer } from "./ui";

const footerGroups = [
  {
    label: "Games",
    links: [
      { href: "/#games", label: `Browse all ${GAME_DIRECTORY.length} games` },
      { href: "/en/rainbow-six-siege-boost", label: "Rainbow Six Siege" },
      { href: "/en/valorant-boost", label: "Valorant" },
      { href: "/en/counter-strike-2-boost", label: "Counter-Strike 2" },
      { href: "/en/overwatch-2-boost", label: "Overwatch 2" },
    ],
  },
  {
    label: "Services",
    links: [
      { href: "/en/rainbow-six-siege-boost/rainbow-six-siege-rank-boost", label: "Rank boosting" },
      { href: "/en/counter-strike-2-boost/faceit-leveling", label: "FACEIT levelling" },
      { href: "/en/overwatch-2-boost/overwatch-rank-boost", label: "Overwatch rank boost" },
      { href: "/#rewards", label: "ProBoost+" },
    ],
  },
  {
    label: "Support",
    links: [
      { href: "/contact", label: "Contact" },
      { href: "/login", label: "Log in" },
      { href: "/signup", label: "Create account" },
    ],
  },
  {
    label: "Legal",
    links: [
      { href: "/terms", label: "Terms" },
      { href: "/privacy", label: "Privacy" },
    ],
  },
];

export default function Footer() {
  return (
    <Localized><footer className="site-footer relative z-10 mt-auto border-t">
      <PageContainer className="py-12 sm:py-14">
        <div className="grid gap-10 border-b border-[var(--line)] pb-10 lg:grid-cols-[minmax(260px,1.35fr)_2fr] lg:gap-16">
          <div className="max-w-sm">
            <Link href="/" aria-label="Go to homepage" className="inline-flex">
              <Image
                src="/brand/proboost-logo-white.png"
                alt="ProBoost"
                width={848}
                height={134}
                loading="eager"
                className="brand-wordmark h-7 w-auto object-contain"
                style={{ width: "auto" }}
              />
            </Link>
            <p className="mt-5 text-sm leading-6 text-[var(--muted)]">
              Verified specialists, clear order controls, and support throughout
              every rank climb.
            </p>
            <a
              href="mailto:support@proboost.gg"
              className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--foreground-soft)] transition-colors hover:text-[var(--accent)]"
            >
              <Mail aria-hidden className="h-4 w-4" />
              support@proboost.gg
            </a>
          </div>

          <nav
            aria-label="Footer navigation"
            className="grid grid-cols-2 gap-x-8 gap-y-9 sm:grid-cols-4"
          >
            {footerGroups.map((group) => (
              <Localized key={group.label}><div key={group.label}>
                <p className="text-sm font-semibold text-[var(--foreground)]">{group.label}</p>
                <div className="mt-4 grid gap-3">
                  {group.links.map((link) => (
                    <Localized key={link.label}><Link
                      key={link.label}
                      href={link.href}
                      className="w-fit text-sm text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
                    >
                      {link.label}
                    </Link></Localized>
                  ))}
                </div>
              </div></Localized>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-5 pt-6 md:flex-row md:items-center md:justify-between">
          <div className="text-xs leading-5 text-[var(--muted-soft)]">
            <p>© {new Date().getFullYear()} ProBoost. All rights reserved.</p>
            <p>Not affiliated with game publishers or developers.</p>
          </div>
          <p className="text-xs leading-5 text-[var(--muted-soft)]">
            Payment options are shown at Stripe checkout.
          </p>
        </div>
      </PageContainer>
    </footer></Localized>
  );
}
