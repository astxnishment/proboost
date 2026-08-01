import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Clock3,
  Crosshair,
  Gamepad2,
  GraduationCap,
  Headphones,
  LockKeyhole,
  MapPin,
  MessageCircle,
  Settings2,
  ShieldCheck,
  Target,
  Trophy,
  UsersRound,
} from "lucide-react";
import FaqSection from "./FaqSection";

const SERVICES = [
  {
    slug: "overwatch-rank-boost",
    title: "Rank Boost",
    description:
      "Choose a role, current division, target rank, platform, and region.",
    details: ["Bronze to Champion", "Role or Open Queue"],
    icon: Crosshair,
  },
  {
    slug: "placements",
    title: "Placement Matches",
    description:
      "Complete up to ten calibration matches with a region-matched specialist.",
    details: ["Predicted-rank path", "Flexible match packages"],
    icon: Target,
  },
  {
    slug: "competitive-wins",
    title: "Competitive Wins",
    description:
      "Choose a fixed win target at your current rank and preferred role.",
    details: ["Clear win target", "Live order updates"],
    icon: Trophy,
  },
  {
    slug: "coaching",
    title: "Coaching",
    description:
      "Improve positioning, hero mastery, team play, or review a complete VOD.",
    details: ["Private sessions", "Role-specific feedback"],
    icon: GraduationCap,
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
    <main
      className="min-h-screen bg-[var(--background)] text-[var(--foreground)]"
      style={{ "--overwatch-accent": "#f99e1a" } as CSSProperties}
    >
      <section className="theme-preserve-media relative min-h-[520px] overflow-hidden border-b border-[var(--line)] bg-[#090a0c] text-white sm:min-h-[560px]">
        <div
          className="absolute inset-y-0 -right-[36%] w-[136%] opacity-50 sm:-right-[10%] sm:w-[88%] sm:opacity-85 lg:right-0 lg:w-[64%] lg:opacity-100"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 30%, black 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 30%, black 100%)",
          }}
        >
          <Image
            src="/homepage/overwatch-homepage.webp"
            alt="Overwatch 2 heroes entering a competitive match"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 639px) 136vw, (max-width: 1023px) 88vw, 64vw"
            className="object-cover object-[48%_38%]"
          />
          <div aria-hidden className="absolute inset-0 bg-black/25 sm:bg-black/10" />
        </div>

        <div className="relative mx-auto flex min-h-[520px] max-w-[1280px] items-center px-5 py-12 sm:min-h-[560px] sm:px-8 sm:py-14 lg:px-10">
          <div className="max-w-[31rem] lg:max-w-[43%]">
            <div className="inline-flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white ring-1 ring-white/15">
                <Image
                  src="/game-icons/overwatch-2-logo.webp"
                  alt=""
                  width={56}
                  height={40}
                  className="h-7 w-9 object-contain"
                />
              </span>
              <div className="flex items-center gap-2.5">
                <span className="text-xs font-semibold uppercase text-white/88">
                  Overwatch 2
                </span>
                <span
                  aria-hidden
                  className="h-1.5 w-1.5 rounded-full bg-[var(--overwatch-accent)]"
                />
                <span className="text-xs font-medium text-white/62">
                  Live service
                </span>
              </div>
            </div>

            <h1 className="mt-7 max-w-[11ch] text-5xl font-semibold leading-[0.96] sm:text-6xl">
              <span className="block">Overwatch 2</span>
              <span className="block">Boosting</span>
            </h1>
            <p className="mt-5 max-w-[46ch] text-base leading-7 text-white/72 sm:text-lg">
              Rank progression, placements, wins, and coaching configured
              around your role, platform, and region.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#services"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white bg-white px-6 text-sm font-semibold text-black transition hover:opacity-85"
              >
                Choose a service
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </a>
              <Link
                href="/contact"
                className="theme-media-secondary inline-flex h-12 items-center justify-center rounded-lg border px-6 text-sm font-semibold transition"
              >
                Ask support
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-[var(--surface-muted)] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 lg:grid-cols-4">
          {HERO_POINTS.map((item, index) => (
            <div
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
            </div>
          ))}
        </div>
      </section>

      <section
        id="services"
        className="scroll-mt-20 px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
      >
        <div className="mx-auto max-w-[1280px]">
          <div className="grid gap-5 md:grid-cols-[minmax(0,0.78fr)_minmax(360px,1fr)] md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase text-[var(--muted)]">
                Overwatch 2 services
              </p>
              <h2 className="mt-3 max-w-[12ch] text-4xl font-semibold leading-[1.04] sm:text-5xl">
                Choose your competitive goal.
              </h2>
            </div>
            <p className="max-w-[58ch] text-base leading-7 text-[var(--muted)] md:justify-self-end">
              Each route has its own calculator and selection logic. Start with
              the outcome you need, then define the role, rank, and delivery
              preferences.
            </p>
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`${basePath}/${service.slug}`}
                className="group flex min-h-[320px] flex-col rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6 transition hover:border-[var(--line-strong)] hover:bg-[var(--surface-muted)]"
              >
                <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-[color-mix(in_srgb,var(--overwatch-accent)_13%,var(--surface))] text-[var(--overwatch-accent)]">
                  <service.icon aria-hidden className="h-5 w-5" strokeWidth={1.8} />
                </span>
                <h3 className="mt-7 text-xl font-semibold">{service.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
                  {service.description}
                </p>
                <div className="mt-5 space-y-2">
                  {service.details.map((detail) => (
                    <p
                      key={detail}
                      className="flex items-center gap-2 text-sm text-[var(--foreground-soft)]"
                    >
                      <Check aria-hidden className="h-3.5 w-3.5 shrink-0 text-[var(--muted)]" />
                      {detail}
                    </p>
                  ))}
                </div>
                <span className="mt-auto flex items-center justify-between pt-7 text-sm font-semibold">
                  Configure service
                  <ArrowUpRight aria-hidden className="h-4 w-4 text-[var(--muted)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--foreground)]" />
                </span>
              </Link>
            ))}
          </div>
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
              <div
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
              </div>
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
              <div
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
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-[var(--line)] bg-[var(--surface-muted)] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
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
    </main>
  );
}
