import Localized from "./Localization";
import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Clock3,
  Headphones,
  LockKeyhole,
  Map,
  MapPin,
  Settings2,
  ShieldCheck,
  Target,
  UsersRound,
} from "lucide-react";
import FaqSection from "./FaqSection";
import GameHero from "./GameHero";
import GameServiceCatalog, { type GameService } from "./GameServiceCatalog";

const SERVICES = [
  {
    slug: "cs2-rank-boost",
    title: "Competitive Rank Boost",
    description:
      "Choose your current skill group, target rank, and preferred map.",
    details: ["Silver I to Global Elite", "Per-map progression"],
    icon: "rank",
    group: "rank",
    artwork: "/cs2/ranks/skillgroup18.svg",
  },
  {
    slug: "premier-rating",
    title: "Premier Rating",
    description:
      "Set an exact CS Rating target and configure the route in 500-point steps.",
    details: ["Live rating estimate", "Every Premier band"],
    icon: "rating",
    group: "rank",
  },
  {
    slug: "competitive-wins",
    title: "Competitive Wins",
    description:
      "Order a defined number of wins at your current skill group.",
    details: ["Fixed win packages", "Map preference"],
    icon: "wins",
    group: "matches",
  },
  {
    slug: "faceit-leveling",
    title: "FACEIT Levelling",
    description:
      "Move through FACEIT levels with a route calculated from your current Elo.",
    details: ["Levels 1 to 10", "Elo-based scope"],
    icon: "faceit",
    group: "rank",
  },
] as const;

const HERO_POINTS = [
  { label: "Competitive + Premier", icon: Target },
  { label: "Region matched", icon: MapPin },
  { label: "Private handling", icon: LockKeyhole },
  { label: "Support throughout", icon: Headphones },
] as const;

const ORDER_CONTROLS = [
  {
    title: "Mode",
    description: "Choose Competitive, Premier, fixed wins, or FACEIT.",
    icon: Target,
  },
  {
    title: "Map",
    description: "Set a map preference for Competitive services.",
    icon: Map,
  },
  {
    title: "Queue",
    description: "Configure solo handling or a duo service format.",
    icon: UsersRound,
  },
  {
    title: "Region",
    description: "Match the request with the correct specialist pool.",
    icon: MapPin,
  },
] as const;

const PROCESS = [
  {
    label: "Configure",
    title: "Set a measurable target.",
    description:
      "Choose the exact rank, rating, wins, or FACEIT level you want to reach.",
    icon: Settings2,
  },
  {
    label: "Match",
    title: "Get a suitable specialist.",
    description:
      "The order is reviewed around mode, map preference, region, and availability.",
    icon: ShieldCheck,
  },
  {
    label: "Track",
    title: "Follow the order clearly.",
    description:
      "See the agreed scope and contact support whenever the order needs attention.",
    icon: Clock3,
  },
] as const;

const FAQ = [
  {
    q: "What is the difference between Competitive and Premier?",
    a: "Competitive uses a separate skill group for each map. Premier uses one visible CS Rating and the Premier map pick-and-ban format. Choose the service that matches the mode you play.",
  },
  {
    q: "Which Competitive ranks can I select?",
    a: "The configurator includes every Competitive skill group from Silver I through Global Elite. Your desired skill group must be above the selected starting rank.",
  },
  {
    q: "How does FACEIT Levelling work?",
    a: "Select your current FACEIT level and exact Elo, then choose a higher target level. The order scope is calculated from the Elo needed to enter that level.",
  },
  {
    q: "Which platforms are supported for CS2?",
    a: "Counter-Strike 2 services on this page are configured for PC and Steam. Region and queue format can be selected before checkout.",
  },
] as const;

export default function Cs2BoostingPage({ basePath }: { basePath: string }) {
  return (
    <Localized><main
      className="game-overview min-h-screen bg-[var(--background)] text-[var(--foreground)]"
      style={{ "--game-accent": "#f47b20", "--cs2-accent": "#f47b20" } as CSSProperties}
    >
      <GameHero
        name="Counter-Strike 2"
        description="Competitive ranks, Premier rating, and FACEIT levels. Choose your mode and build a climb around your exact starting point."
        artwork="/cs2/cs2-hero.webp"
        icon="/game-icons/game_icon (5).webp"
        language={basePath.split("/")[1]}
        imagePosition="65% center"
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
              <p className="eyebrow">Counter-Strike 2 services</p>
              <h2 className="section-title">Find your next milestone.</h2>
            </div>
            <p>Choose a Competitive rank, a Premier rating, a FACEIT level, or a set number of wins. You can set your target and see your price before checkout.</p>
          </div>
          <GameServiceCatalog
            language={basePath.split("/")[1]}
            services={SERVICES.map(service => ({ ...service, href: `${basePath}/${service.slug}` })) satisfies GameService[]}
          />
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface-muted)] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-[1280px] gap-10 lg:grid-cols-[minmax(0,0.7fr)_minmax(540px,1fr)] lg:items-start">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)]">
              <Settings2
                aria-hidden
                className="h-5 w-5"
                strokeWidth={1.7}
              />
            </div>
            <h2 className="mt-6 max-w-[12ch] text-3xl font-semibold leading-tight sm:text-4xl">
              Built around the mode you play.
            </h2>
            <p className="mt-4 max-w-[50ch] text-base leading-7 text-[var(--muted)]">
              Competitive, Premier, and FACEIT measure progression differently.
              The configurator only shows controls relevant to the selected
              service.
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
                <item.icon
                  aria-hidden
                  className="h-5 w-5 text-[var(--muted)]"
                  strokeWidth={1.7}
                />
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
          <h2 className="mt-3 max-w-[16ch] text-4xl font-semibold leading-tight sm:text-5xl">
            Clear from target to delivery.
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
                  <item.icon
                    aria-hidden
                    className="h-5 w-5 text-[var(--muted)]"
                    strokeWidth={1.7}
                  />
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
              CS2 FAQ
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
          <div>
            <Image
              src="/homepage/cs2-text-homepage.webp"
              alt="Counter-Strike 2"
              width={536}
              height={160}
              className="brand-wordmark h-auto w-[250px]"
            />
            <h2 className="mt-5 max-w-[18ch] text-3xl font-semibold leading-tight sm:text-4xl">
              Ready to configure the route?
            </h2>
            <p className="mt-3 max-w-[54ch] text-base leading-7 text-[var(--muted)]">
              Start with Competitive rank, or choose Premier and FACEIT for
              rating-based progression.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`${basePath}/cs2-rank-boost`}
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
