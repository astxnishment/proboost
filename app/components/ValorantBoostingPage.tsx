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
  Monitor,
  Settings2,
  ShieldCheck,
  Target,
  Trophy,
  UsersRound,
} from "lucide-react";
import FaqSection from "./FaqSection";

const SERVICES = [
  {
    id: "rank-boost",
    slug: "valorant-rank-boost",
    title: "Rank Boost",
    description:
      "Set your current rank, target rank, region, and preferred delivery window.",
    details: ["RR-based order scope", "Solo or duo options"],
    icon: Crosshair,
  },
  {
    id: "placements",
    slug: "placements",
    title: "Placement Matches",
    description:
      "Complete your competitive placements with a verified specialist assigned to your region.",
    details: ["Match packages", "Progress updates"],
    icon: Target,
  },
  {
    id: "competitive-wins",
    slug: "competitive-wins",
    title: "Competitive Wins",
    description:
      "Choose a fixed number of ranked wins without committing to a full rank target.",
    details: ["Clear win target", "Flexible scheduling"],
    icon: Trophy,
  },
  {
    id: "coaching",
    slug: "coaching",
    title: "Coaching",
    description:
      "Work directly with a high-ranked player on mechanics, decision-making, and VOD review.",
    details: ["Live sessions", "Role-specific feedback"],
    icon: GraduationCap,
  },
] as const;

const ORDER_CONTROLS = [
  {
    title: "Platform",
    description: "Choose the platform used for your account.",
    icon: Monitor,
  },
  {
    title: "Region",
    description: "Match the order with available specialists in your region.",
    icon: MapPin,
  },
  {
    title: "Queue format",
    description: "Request solo handling or play alongside your specialist.",
    icon: UsersRound,
  },
  {
    title: "Schedule",
    description: "Add timing preferences before the order is accepted.",
    icon: Clock3,
  },
] as const;

const PROCESS = [
  {
    label: "Configure",
    title: "Choose the exact outcome.",
    description:
      "Select the service, rank goal, platform, region, and any delivery preferences.",
    icon: Settings2,
  },
  {
    label: "Match",
    title: "Get a verified specialist.",
    description:
      "Your request is reviewed and assigned around service fit and regional availability.",
    icon: ShieldCheck,
  },
  {
    label: "Track",
    title: "Stay informed throughout.",
    description:
      "Receive progress updates and contact support whenever the order needs attention.",
    icon: MessageCircle,
  },
] as const;

const FAQ = [
  {
    q: "Which Valorant services are available?",
    a: "ProBoost currently accepts requests for rank boosts, placement matches, competitive win packages, and one-to-one coaching. Each request is confirmed against current specialist availability before it starts.",
  },
  {
    q: "Can I request a specific rank or number of wins?",
    a: "Yes. Rank boost requests can include a current and target rank, while competitive win requests can use a fixed match target. Support confirms the final scope and delivery estimate before the order begins.",
  },
  {
    q: "Are PC and console requests supported?",
    a: "Platform availability is checked when your request is reviewed. Include your platform and region so support can match the order with the correct specialist pool.",
  },
  {
    q: "Can I play with the specialist?",
    a: "Duo and coaching formats can be requested when available. Mention your preferred queue format in the request so it can be confirmed before delivery.",
  },
] as const;

const HERO_POINTS = [
  { label: "Manual play", icon: Gamepad2 },
  { label: "Region matched", icon: MapPin },
  { label: "Private handling", icon: LockKeyhole },
  { label: "Support throughout", icon: Headphones },
] as const;

function requestHref(subject: string) {
  return `mailto:support@proboost.gg?subject=${encodeURIComponent(subject)}`;
}

export default function ValorantBoostingPage({
  basePath,
}: {
  basePath: string;
}) {
  return (
    <main
      className="min-h-screen bg-[var(--background)] text-[var(--foreground)]"
      style={{ "--valorant-accent": "#ff4655" } as CSSProperties}
    >
      <section className="theme-preserve-media relative min-h-[610px] overflow-hidden border-b border-[var(--line)] bg-[#0b0c10] text-white">
        <div className="absolute bottom-0 right-[-22%] top-16 w-[92%] opacity-20 sm:right-[-8%] sm:w-[76%] sm:opacity-45 md:right-[1%] md:w-[58%] md:opacity-100">
          <Image
            src="/valorant/omen-full-portrait.webp"
            alt="Omen from Valorant"
            fill
            priority
            sizes="(max-width: 767px) 92vw, 58vw"
            className="object-contain object-right-bottom"
          />
        </div>

        <div className="relative mx-auto flex min-h-[610px] max-w-[1440px] items-center px-5 pb-14 pt-28 sm:px-8 lg:px-10">
          <div className="max-w-[650px] md:max-w-[52%]">
            <div className="inline-flex items-center gap-2.5 rounded-lg border border-white/20 bg-black/35 px-2.5 py-2">
              <Image
                src="/game-icons/game_icon (2).webp"
                alt=""
                width={32}
                height={32}
                className="h-7 w-7 rounded-md"
              />
              <span className="text-xs font-semibold uppercase text-white/85">
                Valorant
              </span>
              <span
                aria-hidden="true"
                className="h-1.5 w-1.5 rounded-full"
                style={{ backgroundColor: "var(--valorant-accent)" }}
              />
              <span className="text-xs font-medium text-white/60">
                Live service
              </span>
            </div>

            <h1 className="sr-only">Valorant boosting services</h1>
            <div aria-hidden="true" className="mt-7">
              <Image
                src="/homepage/valorant-text-homepage.webp"
                alt=""
                width={281}
                height={84}
                className="h-auto w-[min(330px,72vw)]"
                style={{ height: "auto" }}
              />
              <span className="mt-3 block text-3xl font-semibold text-white sm:text-4xl">
                Boosting services
              </span>
            </div>

            <p className="mt-5 max-w-[54ch] text-base leading-7 text-white/70 sm:text-lg">
              Competitive services built around your exact rank, RR, platform,
              and schedule. Configure the goal first, then get matched with a
              verified specialist.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a
                href="#services"
                className="inline-flex h-12 items-center justify-center gap-2 rounded-lg border border-white bg-white px-6 text-sm font-semibold text-black transition hover:opacity-85"
              >
                Choose a service
                <ArrowUpRight aria-hidden className="h-4 w-4" />
              </a>
              <a
                href={requestHref("Valorant Service Request")}
                className="theme-media-secondary inline-flex h-12 items-center justify-center rounded-lg border px-6 text-sm font-semibold transition"
              >
                Ask support
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-[var(--surface-muted)] px-5 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 lg:grid-cols-4">
          {HERO_POINTS.map((item, index) => (
            <div
              key={item.label}
              className={`flex min-h-20 items-center gap-3 px-3 py-4 sm:px-5 ${
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
        <div className="mx-auto max-w-[1440px]">
          <div className="grid gap-5 md:grid-cols-[minmax(0,0.78fr)_minmax(360px,1fr)] md:items-end">
            <div>
              <p className="text-xs font-semibold uppercase text-[var(--muted)]">
                Valorant services
              </p>
              <h2 className="mt-3 max-w-[13ch] text-4xl font-semibold leading-[1.04] sm:text-5xl">
                Choose the result you need.
              </h2>
            </div>
            <p className="max-w-[58ch] text-base leading-7 text-[var(--muted)] md:justify-self-end">
              Every request starts with a defined outcome. No generic package
              language and no hidden service tier: choose the format, then
              confirm the exact scope with support.
            </p>
          </div>

          <div className="mt-10 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {SERVICES.map((service) => (
              <Link
                key={service.id}
                href={`${basePath}/${service.slug}`}
                className="group flex min-h-[320px] flex-col rounded-lg border border-[var(--line)] bg-[var(--surface)] p-6 transition hover:border-[var(--line-strong)] hover:bg-[var(--surface-muted)]"
              >
                <span
                  className="flex h-11 w-11 items-center justify-center rounded-lg"
                  style={{
                    backgroundColor:
                      "color-mix(in srgb, var(--valorant-accent) 13%, var(--surface))",
                    color: "var(--valorant-accent)",
                  }}
                >
                  <service.icon
                    aria-hidden
                    className="h-5 w-5"
                    strokeWidth={1.8}
                  />
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
                      <Check
                        aria-hidden
                        className="h-3.5 w-3.5 shrink-0 text-[var(--muted)]"
                      />
                      {detail}
                    </p>
                  ))}
                </div>
                <span className="mt-auto flex items-center justify-between pt-7 text-sm font-semibold">
                  Configure service
                  <ArrowUpRight
                    aria-hidden
                    className="h-4 w-4 text-[var(--muted)] transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[var(--foreground)]"
                  />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface-muted)] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto grid max-w-[1440px] gap-12 lg:grid-cols-[minmax(0,0.7fr)_minmax(540px,1fr)] lg:items-start">
          <div>
            <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)]">
              <Settings2
                aria-hidden
                className="h-5 w-5"
                strokeWidth={1.7}
              />
            </div>
            <h2 className="mt-6 max-w-[12ch] text-3xl font-semibold leading-tight sm:text-4xl">
              An order that fits your account.
            </h2>
            <p className="mt-4 max-w-[50ch] text-base leading-7 text-[var(--muted)]">
              The service is scoped around the details that actually affect
              delivery. Support confirms availability before anything starts.
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
                <item.icon
                  aria-hidden
                  className="h-5 w-5 text-[var(--muted)]"
                  strokeWidth={1.7}
                />
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
        <div className="mx-auto max-w-[1440px]">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase text-[var(--muted)]">
              How it works
            </p>
            <h2 className="mt-3 text-4xl font-semibold leading-tight sm:text-5xl">
              Clear from request to delivery.
            </h2>
          </div>

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
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="border-t border-[var(--line)] bg-[var(--surface-muted)] px-5 py-16 sm:px-8 sm:py-20 lg:px-10"
      >
        <div className="mx-auto max-w-[1440px]">
          <div className="mb-8">
            <p className="text-xs font-semibold uppercase text-[var(--muted)]">
              Valorant FAQ
            </p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">
              Common questions.
            </h2>
          </div>
          <FaqSection copy={{ label: "Service details", items: [...FAQ] }} />
        </div>
      </section>

      <section className="border-t border-[var(--line)] px-5 py-16 sm:px-8 sm:py-20 lg:px-10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <Image
              src="/homepage/valorant-text-homepage.webp"
              alt="Valorant"
              width={281}
              height={84}
              className="valorant-wordmark h-auto w-[210px]"
              style={{ height: "auto" }}
            />
            <h2 className="mt-5 max-w-[18ch] text-3xl font-semibold leading-tight sm:text-4xl">
              Ready to scope your service?
            </h2>
            <p className="mt-3 max-w-[54ch] text-base leading-7 text-[var(--muted)]">
              Send your target, platform, and region. Support will confirm the
              right service and current availability.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Link
              href={`${basePath}/valorant-rank-boost`}
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
