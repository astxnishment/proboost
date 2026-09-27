import Localized from "./Localization";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  Gamepad2,
  Headphones,
  LockKeyhole,
  MapPin,
  MessageCircle,
  Settings2,
  ShieldCheck,
  UsersRound,
} from "lucide-react";
import FaqSection from "./FaqSection";
import GameHero from "./GameHero";
import GameServiceCatalog, { type GameService } from "./GameServiceCatalog";

const SERVICES = [
  {
    slug: "overwatch-rank-boost",
    title: "Rank Boost",
    description:
      "Choose a role, current division, target rank, platform, and region.",
    details: ["Bronze to Champion", "Role or Open Queue"],
    icon: "rank",
    group: "rank",
  },
  {
    slug: "placements",
    title: "Placement Matches",
    description:
      "Complete up to ten calibration matches with a region-matched specialist.",
    details: ["Predicted-rank path", "Flexible match packages"],
    icon: "placements",
    group: "matches",
  },
  {
    slug: "competitive-wins",
    title: "Competitive Wins",
    description:
      "Choose a fixed win target at your current rank and preferred role.",
    details: ["Clear win target", "Live order updates"],
    icon: "wins",
    group: "matches",
  },
  {
    slug: "coaching",
    title: "Coaching",
    description:
      "Improve positioning, hero mastery, team play, or review a complete VOD.",
    details: ["Private sessions", "Role-specific feedback"],
    icon: "coaching",
    group: "coaching",
  },
] as const;

const HERO_POINTS = [
  { label: "PC and console", icon: Gamepad2 },
  { label: "Role matched", icon: UsersRound },
  { label: "Private handling", icon: LockKeyhole },
  { label: "Support throughout", icon: Headphones },
] as const;

const ORDER_CONTROLS = [
  {
    title: "Role",
    description: "Choose Tank, Damage, Support, or Open Queue.",
    icon: UsersRound,
  },
  {
    title: "Platform",
    description: "Configure PC, Xbox, PlayStation, or Nintendo Switch.",
    icon: Gamepad2,
  },
  {
    title: "Region",
    description: "Match delivery with specialists close to your servers.",
    icon: MapPin,
  },
  {
    title: "Schedule",
    description: "Add delivery preferences before the order is assigned.",
    icon: Clock3,
  },
] as const;

const PROCESS = [
  {
    label: "Configure",
    title: "Define the exact route.",
    description:
      "Choose a service, role, rank target, platform, and regional server.",
    icon: Settings2,
  },
  {
    label: "Match",
    title: "Get a suitable specialist.",
    description:
      "The request is matched around role experience, region, and availability.",
    icon: ShieldCheck,
  },
  {
    label: "Track",
    title: "Stay informed throughout.",
    description:
      "Follow progress and contact support whenever the order needs attention.",
    icon: MessageCircle,
  },
] as const;

const FAQ = [
  {
    q: "Which Overwatch 2 services are available?",
    a: "ProBoost accepts rank progression, placement matches, fixed competitive win packages, and private coaching requests. Every order is checked against current role and regional availability.",
  },
  {
    q: "Which competitive ranks can I select?",
    a: "The calculator supports Bronze through Champion, with divisions 5 through 1 for every tier. The target must always be above the selected current division.",
  },
  {
    q: "Can I choose my role?",
    a: "Yes. Tank, Damage, Support, and Open Queue are available throughout the calculator and included in the order summary.",
  },
  {
    q: "Which platforms are supported?",
    a: "The Overwatch 2 flow supports PC, Xbox, PlayStation, and Nintendo Switch requests. Availability is confirmed for your region before delivery starts.",
  },
] as const;

export default function OverwatchBoostingPage({
  basePath,
}: {
  basePath: string;
}) {
  return (
    <Localized><main
      className="game-overview min-h-screen bg-[var(--background)] text-[var(--foreground)]"
      style={{ "--game-accent": "#f99e1a", "--overwatch-accent": "#f99e1a" } as CSSProperties}
    >
      <GameHero
        name="Overwatch 2"
        description="Make your next role your best role. Explore rank boosts, placements, wins, and coaching built around the way you play."
        artwork="/homepage/overwatch-homepage-v2.webp"
        icon="/game-icons/overwatch-2-logo.webp"
        language={basePath.split("/")[1]}
        imagePosition="center 35%"
      />

      <section className="border-b border-[var(--line)] bg-[var(--surface-muted)] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 lg:grid-cols-4">
          {HERO_POINTS.map((item, index) => (
            <Localized key={item.label}><div
              key={item.label}
              className={`flex min-h-[72px] items-center gap-3 px-3 py-3 sm:px-5 ${
                index % 2 === 1 ? "border-l border-[var(--line)]" : ""
              } ${index > 1 ? "border-t border-[var(--line)] lg:border-t-0" : ""} ${
                index > 1 ? "lg:border-l" : ""
              }`}
            >
              <item.icon
                aria-hidden
                className="h-4 w-4 shrink-0 text-[var(--muted)]"
                strokeWidth={1.7}
              />
              <span className="text-xs font-semibold text-[var(--foreground-soft)] sm:text-sm">
                {item.label}
              </span>
            </div></Localized>
          ))}
        </div>
      </section>

      <section id="services" className="game-services-section">
        <div className="page-container">
          <div className="game-services-heading">
            <div>
              <p className="eyebrow">Overwatch 2 services</p>
              <h2 className="section-title">One goal. Your way to get there.</h2>
            </div>
            <p>Climb in your main role, complete your placements, or work on your play with a coach. Every service starts with your platform and preferences.</p>
          </div>
          <GameServiceCatalog
            language={basePath.split("/")[1]}
            services={SERVICES.map(service => ({ ...service, href: `${basePath}/${service.slug}` })) satisfies GameService[]}
          />
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface-muted)] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-[1280px] gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(540px,1fr)] lg:items-start">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)]">
              <Settings2 aria-hidden className="h-5 w-5" strokeWidth={1.7} />
            </div>
            <h2 className="mt-6 max-w-[12ch] text-3xl font-semibold leading-tight sm:text-4xl">
              Built around the role you play.
            </h2>
            <p className="mt-4 max-w-[50ch] text-base leading-7 text-[var(--muted)]">
              Every selection that affects delivery is visible before checkout,
              including role, platform, region, queue format, and timing.
            </p>
          </div>

          <div className="grid sm:grid-cols-2">
            {ORDER_CONTROLS.map((item, index) => (
              <Localized key={item.title}><div
                key={item.title}
                className={`border-t border-[var(--line)] py-6 sm:px-6 ${
                  index % 2 === 1 ? "sm:border-l" : ""
                } ${index < 2 ? "sm:border-t-0 sm:pt-0" : ""} ${
                  index >= 2 ? "sm:pb-0" : ""
                }`}
              >
                <item.icon aria-hidden className="h-5 w-5 text-[var(--muted)]" strokeWidth={1.7} />
                <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">
                  {item.description}
                </p>
              </div></Localized>
            ))}
          </div>
        </div>
      </section>

      <section id="how" className="px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <p className="text-xs font-semibold uppercase text-[var(--muted)]">
            How it works
          </p>
          <h2 className="mt-3 max-w-[18ch] text-4xl font-semibold leading-tight sm:text-5xl">
            Clear from selection to delivery.
          </h2>

          <div className="mt-10 grid border-y border-[var(--line)] lg:grid-cols-3">
            {PROCESS.map((item, index) => (
              <Localized key={item.label}><div
                key={item.label}
                className={`px-1 py-8 sm:px-6 ${
                  index > 0
                    ? "border-t border-[var(--line)] lg:border-l lg:border-t-0"
                    : ""
                }`}
              >
                <div className="flex items-center gap-3">
                  <item.icon aria-hidden className="h-5 w-5 text-[var(--muted)]" strokeWidth={1.7} />
                  <span className="text-xs font-semibold uppercase text-[var(--muted)]">
                    {item.label}
                  </span>
                </div>
                <h3 className="mt-7 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 max-w-[42ch] text-sm leading-6 text-[var(--muted)]">
                  {item.description}
                </p>
              </div></Localized>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="border-t border-[var(--line)] bg-[var(--surface-muted)] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase text-[var(--muted)]">
              Overwatch 2 FAQ
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Common questions.
            </h2>
          </div>
          <FaqSection copy={{ label: "Service details", items: [...FAQ] }} />
        </div>
      </section>

      <section className="border-t border-[var(--line)] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-start gap-5">
            <Image
              src="/game-icons/overwatch-2-logo.webp"
              alt="Overwatch 2"
              width={110}
              height={80}
              className="h-14 w-20 shrink-0 object-contain"
            />
            <div>
              <h2 className="max-w-[18ch] text-3xl font-semibold leading-tight sm:text-4xl">
                Ready to choose your route?
              </h2>
              <p className="mt-3 max-w-[54ch] text-base leading-7 text-[var(--muted)]">
                Configure the goal directly or ask support to confirm the best
                fit for your role and account.
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`${basePath}/overwatch-rank-boost`}
              className="theme-inverse inline-flex h-12 items-center justify-center gap-2 rounded-lg border px-6 text-sm font-semibold transition hover:opacity-85"
            >
              Configure rank boost
              <ArrowUpRight aria-hidden className="h-4 w-4" />
            </Link>
            <Link
              href="/contact"
              className="inline-flex h-12 items-center justify-center rounded-lg border border-[var(--line-strong)] px-6 text-sm font-semibold transition hover:bg-[var(--surface-muted)]"
            >
              Contact support
            </Link>
          </div>
        </div>
      </section>
    </main></Localized>
  );
}
