"use client";

import type { CSSProperties } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  CircleDashed,
  Clock3,
  Crosshair,
  GraduationCap,
  Headphones,
  LoaderCircle,
  LockKeyhole,
  Minus,
  Plus,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  UserRoundCheck,
  Video,
  Zap,
} from "lucide-react";
import PlatformSelector from "@/app/components/PlatformSelector";
import {
  createCheckoutSession,
  getCheckoutErrorMessage,
} from "@/app/lib/checkout";
import { ORDER_PLATFORMS, ORDER_SERVERS } from "@/app/lib/order-options";
import {
  computeOrderPrice,
  flattenValorantRank,
  VALORANT_DIVISIONS,
  VALORANT_RANKS,
  type Order,
  type QueueType,
} from "@/app/lib/pricing";
import {
  VALORANT_COACHING_FOCUS,
  VALORANT_SERVICE_CONFIG,
  VALORANT_SERVICE_SLUGS,
  type ValorantServiceSlug,
} from "@/app/lib/valorant";

const RANKS = [
  {
    name: "Iron",
    icon: "/valorant/ranks/iron.png",
    accent: "#8b8d91",
  },
  {
    name: "Bronze",
    icon: "/valorant/ranks/bronze.png",
    accent: "#a9744f",
  },
  {
    name: "Silver",
    icon: "/valorant/ranks/silver.png",
    accent: "#aeb8bd",
  },
  {
    name: "Gold",
    icon: "/valorant/ranks/gold.png",
    accent: "#d89b2b",
  },
  {
    name: "Platinum",
    icon: "/valorant/ranks/platinum.png",
    accent: "#31adb5",
  },
  {
    name: "Diamond",
    icon: "/valorant/ranks/diamond.png",
    accent: "#b46ed2",
  },
  {
    name: "Ascendant",
    icon: "/valorant/ranks/ascendant.png",
    accent: "#39a773",
  },
  {
    name: "Immortal",
    icon: "/valorant/ranks/immortal.png",
    accent: "#d64665",
  },
  {
    name: "Radiant",
    icon: "/valorant/ranks/radiant.png",
    accent: "#c7a24f",
  },
] as const;

const SERVICE_ICONS = {
  "valorant-rank-boost": Crosshair,
  placements: Target,
  "competitive-wins": Trophy,
  coaching: GraduationCap,
} satisfies Record<ValorantServiceSlug, typeof Crosshair>;

const SERVICE_SUMMARY_LABELS: Record<ValorantServiceSlug, string> = {
  "valorant-rank-boost": "Rank progression",
  placements: "Placement package",
  "competitive-wins": "Competitive package",
  coaching: "Private coaching",
};

const money = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

function rankData(rank: string) {
  return RANKS.find((item) => item.name === rank) ?? RANKS[0];
}

function flatRankToSelection(value: number) {
  const bounded = Math.min(24, Math.max(0, value));
  if (bounded === 24) {
    return { rank: "Radiant", division: "I" };
  }
  return {
    rank: VALORANT_RANKS[Math.floor(bounded / 3)],
    division: VALORANT_DIVISIONS[bounded % 3],
  };
}

function maxRankValue(rank: string) {
  return rank === "Radiant"
    ? 24
    : flattenValorantRank(rank, "III");
}

function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`keep-pill relative h-6 w-11 shrink-0 rounded-full border transition-colors ${
        checked
          ? "border-[var(--valorant-accent)] bg-[var(--valorant-accent)]"
          : "border-[var(--line-strong)] bg-[var(--surface-muted)]"
      }`}
    >
      <span
        className={`absolute top-[3px] h-4 w-4 rounded-full bg-white transition-transform ${
          checked ? "translate-x-[22px]" : "translate-x-[3px]"
        }`}
      />
    </button>
  );
}

function QuantityStepper({
  label,
  value,
  min,
  max,
  suffix,
  onChange,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  suffix: string;
  onChange: (next: number) => void;
}) {
  return (
    <div className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5">
      <p className="text-sm font-semibold">{label}</p>
      <div className="mt-4 grid grid-cols-[44px_1fr_44px] items-center gap-3">
        <button
          type="button"
          aria-label={`Decrease ${label.toLowerCase()}`}
          title={`Decrease ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="theme-button-secondary flex h-11 w-11 items-center justify-center rounded-lg border transition disabled:opacity-35"
        >
          <Minus aria-hidden className="h-4 w-4" />
        </button>
        <div className="text-center">
          <span className="text-3xl font-semibold">{value}</span>
          {" "}
          <span className="ml-2 text-sm text-[var(--muted)]">
            {value === 1
              ? suffix
              : suffix === "match"
                ? "matches"
                : `${suffix}s`}
          </span>
        </div>
        <button
          type="button"
          aria-label={`Increase ${label.toLowerCase()}`}
          title={`Increase ${label.toLowerCase()}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="theme-button-secondary flex h-11 w-11 items-center justify-center rounded-lg border transition disabled:opacity-35"
        >
          <Plus aria-hidden className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function RankPicker({
  label,
  value,
  division,
  onRankChange,
  onDivisionChange,
  isRankDisabled,
  isDivisionDisabled,
  showDivision = true,
}: {
  label: string;
  value: string;
  division: string;
  onRankChange: (rank: string) => void;
  onDivisionChange: (division: string) => void;
  isRankDisabled?: (rank: string) => boolean;
  isDivisionDisabled?: (division: string) => boolean;
  showDivision?: boolean;
}) {
  const selectedRank = rankData(value);
  const hasDivisions = showDivision && value !== "Radiant";

  return (
    <section className="min-w-0 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5">
      <div className="flex min-h-16 items-center gap-3">
        <Image
          src={selectedRank.icon}
          alt=""
          width={60}
          height={60}
          className="h-14 w-14 shrink-0 object-contain"
        />
        <div className="min-w-0">
          <h2 className="text-base font-semibold">{label}</h2>
          <p className="mt-0.5 truncate text-sm font-semibold">
            <span style={{ color: selectedRank.accent }}>{value}</span>
            {hasDivisions ? ` ${division}` : ""}
          </p>
        </div>
      </div>

      <div
        role="radiogroup"
        aria-label={label}
        className="mt-5 grid grid-cols-3 gap-2"
      >
        {RANKS.map((rank) => {
          const selected = value === rank.name;
          const disabled = isRankDisabled?.(rank.name) ?? false;
          return (
            <button
              key={rank.name}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={rank.name}
              disabled={disabled}
              onClick={() => onRankChange(rank.name)}
              className={`group flex min-h-24 min-w-0 flex-col items-center justify-center rounded-lg border p-2 text-center transition ${
                disabled
                  ? "border-[var(--line)] bg-[var(--surface-muted)] opacity-30"
                  : selected
                    ? "bg-[var(--surface-muted)]"
                    : "border-[var(--line)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-muted)]"
              }`}
              style={
                selected
                  ? {
                      borderColor: rank.accent,
                      boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${rank.accent} 20%, transparent)`,
                    }
                  : undefined
              }
            >
              <Image
                src={rank.icon}
                alt=""
                width={44}
                height={44}
                className="h-10 w-10 object-contain transition-transform group-hover:scale-105"
              />
              <span className="mt-1 w-full truncate text-[11px] font-semibold text-[var(--foreground-soft)]">
                {rank.name}
              </span>
            </button>
          );
        })}
      </div>

      {hasDivisions && (
        <div
          role="radiogroup"
          aria-label={`${label} division`}
          className="mt-3 grid grid-cols-3 gap-2"
        >
          {VALORANT_DIVISIONS.map((item) => {
            const selected = division === item;
            const disabled = isDivisionDisabled?.(item) ?? false;
            return (
              <button
                key={item}
                type="button"
                role="radio"
                aria-checked={selected}
                disabled={disabled}
                onClick={() => onDivisionChange(item)}
                className={`h-11 rounded-lg border text-sm font-semibold transition ${
                  disabled
                    ? "border-[var(--line)] bg-[var(--surface-muted)] text-[var(--muted-soft)] opacity-35"
                    : selected
                      ? "text-[var(--foreground)]"
                      : "border-[var(--line)] bg-transparent text-[var(--muted)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
                }`}
                style={
                  selected
                    ? {
                        borderColor: selectedRank.accent,
                        backgroundColor: `color-mix(in srgb, ${selectedRank.accent} 16%, var(--surface))`,
                      }
                    : undefined
                }
              >
                {item}
              </button>
            );
          })}
        </div>
      )}
    </section>
  );
}

function QueueSelector({
  value,
  onChange,
}: {
  value: QueueType;
  onChange: (next: QueueType) => void;
}) {
  return (
    <div
      role="group"
      aria-label="Queue format"
      className="grid grid-cols-2 gap-1.5 rounded-lg border border-[var(--line)] bg-[var(--surface-muted)] p-1.5"
    >
      {(["Solo", "Duo"] as const).map((item) => {
        const selected = value === item;
        return (
          <button
            key={item}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(item)}
            className={`min-h-11 rounded-lg border px-4 text-sm font-semibold transition ${
              selected
                ? "text-[var(--foreground)]"
                : "border-transparent text-[var(--muted)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
            }`}
            style={
              selected
                ? {
                    borderColor: "var(--valorant-accent)",
                    backgroundColor:
                      "color-mix(in srgb, var(--valorant-accent) 15%, var(--surface))",
                  }
                : undefined
            }
          >
            {item}
          </button>
        );
      })}
    </div>
  );
}

function OptionRow({
  icon: Icon,
  title,
  description,
  price,
  checked,
  onChange,
}: {
  icon: typeof Zap;
  title: string;
  description: string;
  price: string;
  checked: boolean;
  onChange: (next: boolean) => void;
}) {
  return (
    <div className="flex items-center gap-4 border-t border-[var(--line)] py-4 first:border-t-0 first:pt-0 last:pb-0">
      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface-muted)]">
        <Icon aria-hidden className="h-4 w-4" />
      </span>
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-baseline gap-x-2">
          <p className="text-sm font-semibold">{title}</p>
          <span className="text-xs font-medium text-[var(--muted)]">{price}</span>
        </div>
        <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
          {description}
        </p>
      </div>
      <Toggle checked={checked} onChange={onChange} label={title} />
    </div>
  );
}

export default function ValorantServiceConfigurator({
  service,
  basePath,
}: {
  service: ValorantServiceSlug;
  basePath: string;
}) {
  const config = VALORANT_SERVICE_CONFIG[service];
  const ServiceIcon = SERVICE_ICONS[service];

  const [currentRank, setCurrentRank] = React.useState("Silver");
  const [currentDivision, setCurrentDivision] = React.useState("II");
  const [desiredRank, setDesiredRank] = React.useState("Ascendant");
  const [desiredDivision, setDesiredDivision] = React.useState("I");
  const [currentRr, setCurrentRr] = React.useState(48);
  const [previousRank, setPreviousRank] = React.useState("Gold");
  const [matches, setMatches] = React.useState(5);
  const [wins, setWins] = React.useState(3);
  const [hours, setHours] = React.useState(2);
  const [focus, setFocus] =
    React.useState<(typeof VALORANT_COACHING_FOCUS)[number]>("Mechanics");
  const [platform, setPlatform] = React.useState("PC");
  const [server, setServer] = React.useState("Europe");
  const [queueType, setQueueType] = React.useState<QueueType>("Solo");
  const [express, setExpress] = React.useState(false);
  const [specificBooster, setSpecificBooster] = React.useState(false);
  const [recordedSession, setRecordedSession] = React.useState(false);
  const [customFocus, setCustomFocus] = React.useState(false);
  const [promoCode, setPromoCode] = React.useState("");
  const [appliedPromo, setAppliedPromo] = React.useState("");
  const [message, setMessage] = React.useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = React.useState(false);

  const currentValue = flattenValorantRank(currentRank, currentDivision);
  const desiredValue = flattenValorantRank(desiredRank, desiredDivision);
  const validRankPath = desiredValue > currentValue;

  const setDesiredFromFlatValue = (value: number) => {
    const selection = flatRankToSelection(value);
    setDesiredRank(selection.rank);
    setDesiredDivision(selection.division);
  };

  const changeCurrentRank = (rank: string) => {
    const nextDivision = rank === "Radiant" ? "I" : currentDivision;
    const nextValue = flattenValorantRank(rank, nextDivision);
    setCurrentRank(rank);
    if (rank === "Radiant") setCurrentDivision("I");
    if (desiredValue <= nextValue && nextValue < 24) {
      setDesiredFromFlatValue(nextValue + 1);
    }
  };

  const changeCurrentDivision = (division: string) => {
    const nextValue = flattenValorantRank(currentRank, division);
    setCurrentDivision(division);
    if (desiredValue <= nextValue && nextValue < 24) {
      setDesiredFromFlatValue(nextValue + 1);
    }
  };

  const changeDesiredRank = (rank: string) => {
    const firstValidDivision =
      rank === "Radiant"
        ? "I"
        : VALORANT_DIVISIONS.find(
            (division) =>
              flattenValorantRank(rank, division) > currentValue
          );
    if (!firstValidDivision) return;
    setDesiredRank(rank);
    if (
      rank === "Radiant" ||
      flattenValorantRank(rank, desiredDivision) <= currentValue
    ) {
      setDesiredDivision(firstValidDivision);
    }
  };

  let order: Order;
  switch (service) {
    case "valorant-rank-boost":
      order = {
        serviceType: "valorant-rank",
        currentRank,
        currentDivision,
        desiredRank,
        desiredDivision,
        currentRr,
        platform,
        server,
        queueType,
        express,
        specificBooster,
        promoCode: appliedPromo,
      };
      break;
    case "placements":
      order = {
        serviceType: "valorant-placements",
        previousRank,
        numberOfMatches: matches,
        platform,
        server,
        queueType,
        express,
        specificBooster,
        promoCode: appliedPromo,
      };
      break;
    case "competitive-wins":
      order = {
        serviceType: "valorant-wins",
        currentRank,
        currentDivision,
        numberOfWins: wins,
        platform,
        server,
        queueType,
        express,
        specificBooster,
        promoCode: appliedPromo,
      };
      break;
    case "coaching":
      order = {
        serviceType: "valorant-coaching",
        currentRank,
        hours,
        focus,
        platform,
        server,
        specificBooster,
        recordedSession,
        customFocus,
        promoCode: appliedPromo,
      };
      break;
  }

  const price = computeOrderPrice(order);
  const validConfiguration =
    service !== "valorant-rank-boost" || validRankPath;

  const eta =
    service === "valorant-rank-boost"
      ? `${Math.max(2, Math.ceil((desiredValue - currentValue) * 1.7))}-${Math.max(
          4,
          Math.ceil((desiredValue - currentValue) * 2.3)
        )} hours`
      : service === "placements"
        ? `${matches}-${matches * 2} hours`
        : service === "competitive-wins"
          ? `${wins * 2}-${wins * 4} hours`
          : "Scheduled with your coach";

  const applyPromo = () => {
    if (promoCode.trim().toUpperCase() === "WELCOME6") {
      setAppliedPromo("WELCOME6");
      setMessage("WELCOME6 applied. Your 6% discount is included.");
      return;
    }
    setAppliedPromo("");
    setMessage("That code is not available. Check it and try again.");
  };

  const handleCheckout = async () => {
    if (!validConfiguration) {
      setMessage("Choose a target rank above your current rank.");
      return;
    }

    setCheckoutLoading(true);
    setMessage(null);
    try {
      const checkoutUrl = await createCheckoutSession(order);
      window.location.assign(checkoutUrl);
    } catch (error) {
      setMessage(getCheckoutErrorMessage(error));
      setCheckoutLoading(false);
    }
  };

  const summaryRows =
    service === "valorant-rank-boost"
      ? [
          [
            "Route",
            `${currentRank} ${currentDivision} to ${desiredRank} ${
              desiredRank === "Radiant" ? "" : desiredDivision
            }`.trim(),
          ],
          ["Current RR", `${currentRr} RR`],
        ]
      : service === "placements"
        ? [
            ["Package", `${matches} placement ${matches === 1 ? "match" : "matches"}`],
            ["Previous rank", previousRank],
          ]
        : service === "competitive-wins"
          ? [
              [
                "Starting rank",
                `${currentRank}${currentRank === "Radiant" ? "" : ` ${currentDivision}`}`,
              ],
              ["Win target", `${wins} ${wins === 1 ? "win" : "wins"}`],
            ]
          : [
              ["Session", `${hours} ${hours === 1 ? "hour" : "hours"}`],
              ["Focus", focus],
            ];

  return (
    <main
      className="min-h-screen bg-[var(--background)] text-[var(--foreground)]"
      style={{ "--valorant-accent": "#ff4655" } as CSSProperties}
    >
      <section className="theme-preserve-media relative min-h-[450px] overflow-hidden border-b border-[var(--line)] bg-[#101116] text-white">
        <div className="absolute inset-0">
          <Image
            src="/valorant/valorant-hero-v2.webp"
            alt="Tactical Valorant specialist in a competitive arena"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-[68%_top]"
          />
        </div>
        <div
          aria-hidden
          className="absolute inset-0"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        />
        <div className="relative mx-auto flex min-h-[450px] max-w-[1280px] items-center px-5 py-14 sm:px-8 lg:px-10">
          <div className="max-w-[650px]">
            <Link
              href={basePath}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition hover:text-white"
            >
              <ArrowLeft aria-hidden className="h-4 w-4" />
              All Valorant services
            </Link>
            <div className="mt-7 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-black/35">
                <ServiceIcon aria-hidden className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold uppercase text-white/70">
                {config.eyebrow}
              </span>
            </div>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              {config.title}
            </h1>
            <p className="mt-5 max-w-[58ch] text-base leading-7 text-white/72 sm:text-lg">
              {config.description}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-[var(--surface-muted)]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 px-5 sm:px-8 lg:grid-cols-4 lg:px-10">
          {[
            { label: "Manual service", Icon: ShieldCheck },
            { label: "Private handling", Icon: LockKeyhole },
            { label: "Region matched", Icon: Target },
            { label: "Support throughout", Icon: Headphones },
          ].map(({ label, Icon }, index) => (
            <div
              key={label}
              className={`flex min-h-18 items-center gap-3 px-2 py-4 sm:px-4 ${
                index % 2 === 1 ? "border-l border-[var(--line)]" : ""
              } ${index > 1 ? "border-t border-[var(--line)] lg:border-t-0" : ""} ${
                index > 1 ? "lg:border-l" : ""
              }`}
            >
              <Icon
                aria-hidden
                className="h-4 w-4 shrink-0 text-[var(--muted)]"
              />
              <span className="text-xs font-semibold text-[var(--foreground-soft)] sm:text-sm">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <nav
          aria-label="Valorant services"
          className="service-subnav mb-8 flex max-w-full gap-2 overflow-x-auto border-b border-[var(--line)] pb-3"
        >
          {VALORANT_SERVICE_SLUGS.map((slug) => {
            const active = slug === service;
            return (
              <Link
                key={slug}
                href={`${basePath}/${slug}`}
                aria-current={active ? "page" : undefined}
                className={`relative shrink-0 rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "bg-[var(--surface-muted)] text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
                }`}
              >
                {VALORANT_SERVICE_CONFIG[slug].navLabel}
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-x-4 -bottom-[13px] h-0.5"
                    style={{ backgroundColor: "var(--valorant-accent)" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_370px]">
          <div className="min-w-0 space-y-6">
            {service === "valorant-rank-boost" && (
              <>
                <div className="grid gap-5 lg:grid-cols-2">
                  <RankPicker
                    label="Current rank"
                    value={currentRank}
                    division={currentDivision}
                    onRankChange={changeCurrentRank}
                    onDivisionChange={changeCurrentDivision}
                    isRankDisabled={(rank) => rank === "Radiant"}
                  />
                  <RankPicker
                    label="Desired rank"
                    value={desiredRank}
                    division={desiredDivision}
                    onRankChange={changeDesiredRank}
                    onDivisionChange={setDesiredDivision}
                    isRankDisabled={(rank) =>
                      maxRankValue(rank) <= currentValue
                    }
                    isDivisionDisabled={(division) =>
                      flattenValorantRank(desiredRank, division) <= currentValue
                    }
                  />
                </div>

                <section className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-base font-semibold">
                        Current Rank Rating
                      </h2>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        Set the RR already earned in your current division.
                      </p>
                    </div>
                    <output
                      htmlFor="valorant-current-rr"
                      className="min-w-20 rounded-lg border border-[var(--line)] bg-[var(--surface-muted)] px-3 py-2 text-center text-sm font-semibold"
                    >
                      {currentRr} RR
                    </output>
                  </div>
                  <input
                    id="valorant-current-rr"
                    type="range"
                    min="0"
                    max="99"
                    value={currentRr}
                    onChange={(event) => setCurrentRr(Number(event.target.value))}
                    className="mt-5 w-full"
                    style={{ accentColor: "var(--valorant-accent)" }}
                  />
                  {!validRankPath && (
                    <p className="theme-error mt-4 rounded-lg px-3 py-2 text-sm">
                      Select a desired rank above your current rank.
                    </p>
                  )}
                </section>
              </>
            )}

            {service === "placements" && (
              <>
                <section className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5">
                  <div className="flex items-center gap-3">
                    {previousRank === "Unranked" ? (
                      <span className="flex h-14 w-14 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface-muted)]">
                        <CircleDashed
                          aria-hidden
                          className="h-6 w-6 text-[var(--muted)]"
                        />
                      </span>
                    ) : (
                      <Image
                        src={rankData(previousRank).icon}
                        alt=""
                        width={60}
                        height={60}
                        className="h-14 w-14 object-contain"
                      />
                    )}
                    <div>
                      <h2 className="text-base font-semibold">Previous rank</h2>
                      <p className="mt-0.5 text-sm font-semibold">
                        {previousRank}
                      </p>
                    </div>
                  </div>
                  <div
                    role="radiogroup"
                    aria-label="Previous rank"
                    className="mt-5 grid grid-cols-3 gap-2 sm:grid-cols-5"
                  >
                    <button
                      type="button"
                      role="radio"
                      aria-checked={previousRank === "Unranked"}
                      onClick={() => setPreviousRank("Unranked")}
                      className={`flex min-h-24 flex-col items-center justify-center rounded-lg border p-2 text-xs font-semibold transition ${
                        previousRank === "Unranked"
                          ? "border-[var(--valorant-accent)] bg-[var(--surface-muted)]"
                          : "border-[var(--line)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-muted)]"
                      }`}
                    >
                      <CircleDashed
                        aria-hidden
                        className="h-9 w-9 text-[var(--muted)]"
                      />
                      <span className="mt-2">Unranked</span>
                    </button>
                    {RANKS.map((rank) => (
                      <button
                        key={rank.name}
                        type="button"
                        role="radio"
                        aria-checked={previousRank === rank.name}
                        onClick={() => setPreviousRank(rank.name)}
                        className="flex min-h-24 flex-col items-center justify-center rounded-lg border border-[var(--line)] p-2 text-xs font-semibold transition hover:border-[var(--line-strong)] hover:bg-[var(--surface-muted)]"
                        style={
                          previousRank === rank.name
                            ? {
                                borderColor: rank.accent,
                                backgroundColor:
                                  "var(--surface-muted)",
                              }
                            : undefined
                        }
                      >
                        <Image
                          src={rank.icon}
                          alt=""
                          width={42}
                          height={42}
                          className="h-10 w-10 object-contain"
                        />
                        <span className="mt-1 w-full truncate">
                          {rank.name}
                        </span>
                      </button>
                    ))}
                  </div>
                </section>
                <QuantityStepper
                  label="Placement package"
                  value={matches}
                  min={1}
                  max={5}
                  suffix="match"
                  onChange={setMatches}
                />
              </>
            )}

            {service === "competitive-wins" && (
              <>
                <RankPicker
                  label="Starting rank"
                  value={currentRank}
                  division={currentDivision}
                  onRankChange={changeCurrentRank}
                  onDivisionChange={changeCurrentDivision}
                />
                <QuantityStepper
                  label="Competitive wins"
                  value={wins}
                  min={1}
                  max={10}
                  suffix="win"
                  onChange={setWins}
                />
              </>
            )}

            {service === "coaching" && (
              <>
                <RankPicker
                  label="Current rank"
                  value={currentRank}
                  division={currentDivision}
                  onRankChange={changeCurrentRank}
                  onDivisionChange={changeCurrentDivision}
                  showDivision={false}
                />
                <div className="grid gap-5 md:grid-cols-2">
                  <QuantityStepper
                    label="Session length"
                    value={hours}
                    min={1}
                    max={6}
                    suffix="hour"
                    onChange={setHours}
                  />
                  <section className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5">
                    <h2 className="text-sm font-semibold">Session focus</h2>
                    <div
                      role="radiogroup"
                      aria-label="Coaching focus"
                      className="mt-4 grid grid-cols-2 gap-2"
                    >
                      {VALORANT_COACHING_FOCUS.map((item) => {
                        const selected = focus === item;
                        return (
                          <button
                            key={item}
                            type="button"
                            role="radio"
                            aria-checked={selected}
                            onClick={() => setFocus(item)}
                            className={`min-h-12 rounded-lg border px-3 text-sm font-semibold transition ${
                              selected
                                ? "text-[var(--foreground)]"
                                : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
                            }`}
                            style={
                              selected
                                ? {
                                    borderColor:
                                      "var(--valorant-accent)",
                                    backgroundColor:
                                      "color-mix(in srgb, var(--valorant-accent) 14%, var(--surface))",
                                  }
                                : undefined
                            }
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </section>
                </div>
              </>
            )}

            <section className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5">
              <h2 className="text-lg font-semibold">Platform and region</h2>
              <div className="mt-5">
                <PlatformSelector
                  platforms={ORDER_PLATFORMS}
                  value={platform}
                  onChange={setPlatform}
                  ariaLabel="Select platform"
                />
              </div>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div>
                  <label
                    htmlFor="valorant-region"
                    className="mb-2 block text-sm font-semibold"
                  >
                    Region
                  </label>
                  <select
                    id="valorant-region"
                    value={server}
                    onChange={(event) => setServer(event.target.value)}
                    className="h-12 w-full appearance-none rounded-lg border px-4 outline-none transition hover:border-[var(--line-strong)]"
                  >
                    {ORDER_SERVERS.map((region) => (
                      <option key={region} value={region}>
                        {region}
                      </option>
                    ))}
                  </select>
                </div>
                {service !== "coaching" ? (
                  <div>
                    <p className="mb-2 text-sm font-semibold">Queue format</p>
                    <QueueSelector
                      value={queueType}
                      onChange={setQueueType}
                    />
                  </div>
                ) : (
                  <div className="rounded-lg border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3">
                    <p className="text-sm font-semibold">Private session</p>
                    <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                      Your coach confirms the voice and screen-sharing setup
                      before the session.
                    </p>
                  </div>
                )}
              </div>
            </section>

            <section className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5">
              <h2 className="text-lg font-semibold">Order preferences</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Optional controls are reflected in the total immediately.
              </p>
              <div className="mt-5">
                <OptionRow
                  icon={UserRoundCheck}
                  title="Specific specialist"
                  description="Choose an available specialist before delivery starts."
                  price="+£7.50"
                  checked={specificBooster}
                  onChange={setSpecificBooster}
                />
                {service === "coaching" ? (
                  <>
                    <OptionRow
                      icon={Video}
                      title="Recorded session"
                      description="Receive a private recording for review after the call."
                      price="+15%"
                      checked={recordedSession}
                      onChange={setRecordedSession}
                    />
                    <OptionRow
                      icon={Sparkles}
                      title="Custom focus plan"
                      description="Get a short written plan tailored to the session."
                      price="+10%"
                      checked={customFocus}
                      onChange={setCustomFocus}
                    />
                  </>
                ) : (
                  <OptionRow
                    icon={Zap}
                    title="Express delivery"
                    description="Prioritise assignment and start ahead of standard orders."
                    price="+20%"
                    checked={express}
                    onChange={setExpress}
                  />
                )}
              </div>
            </section>
          </div>

          <aside className="h-fit min-w-0 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 xl:sticky xl:top-24">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase text-[var(--muted)]">
                  Order summary
                </p>
                <h2 className="mt-2 text-xl font-semibold">
                  {SERVICE_SUMMARY_LABELS[service]}
                </h2>
              </div>
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface-muted)]">
                <ServiceIcon aria-hidden className="h-4 w-4" />
              </span>
            </div>

            <div className="mt-6 space-y-3 border-y border-[var(--line)] py-5">
              {summaryRows.map(([label, value]) => (
                <div
                  key={label}
                  className="grid grid-cols-[96px_1fr] gap-3 text-sm"
                >
                  <span className="text-[var(--muted)]">{label}</span>
                  <span className="min-w-0 text-right font-medium">{value}</span>
                </div>
              ))}
              <div className="grid grid-cols-[96px_1fr] gap-3 text-sm">
                <span className="text-[var(--muted)]">Platform</span>
                <span className="text-right font-medium">{platform}</span>
              </div>
              <div className="grid grid-cols-[96px_1fr] gap-3 text-sm">
                <span className="text-[var(--muted)]">Region</span>
                <span className="text-right font-medium">{server}</span>
              </div>
              {service !== "coaching" && (
                <div className="grid grid-cols-[96px_1fr] gap-3 text-sm">
                  <span className="text-[var(--muted)]">Format</span>
                  <span className="text-right font-medium">{queueType}</span>
                </div>
              )}
              <div className="grid grid-cols-[96px_1fr] gap-3 text-sm">
                <span className="text-[var(--muted)]">Estimate</span>
                <span className="flex items-center justify-end gap-1.5 text-right font-medium">
                  <Clock3
                    aria-hidden
                    className="h-3.5 w-3.5 text-[var(--muted)]"
                  />
                  {eta}
                </span>
              </div>
            </div>

            <div className="mt-5">
              <label
                htmlFor="valorant-promo"
                className="text-sm font-semibold"
              >
                Promo code
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="valorant-promo"
                  value={promoCode}
                  onChange={(event) => setPromoCode(event.target.value)}
                  placeholder="Enter code"
                  className="h-11 min-w-0 flex-1 rounded-lg border px-3 text-sm outline-none"
                />
                <button
                  type="button"
                  onClick={applyPromo}
                  className="theme-button-secondary rounded-lg border px-4 text-sm font-semibold transition"
                >
                  Apply
                </button>
              </div>
            </div>

            <div className="mt-6">
              {price.discount > 0 && (
                <div className="mb-2 flex items-center justify-between text-sm text-[var(--muted)]">
                  <span>Subtotal</span>
                  <span>{money.format(price.subtotal)}</span>
                </div>
              )}
              {price.discount > 0 && (
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span>Discount</span>
                  <span>-{money.format(price.discount)}</span>
                </div>
              )}
              <div className="flex items-end justify-between gap-4">
                <span className="text-sm font-semibold">Total</span>
                <span className="text-3xl font-semibold">
                  {Number.isFinite(price.total)
                    ? money.format(price.total)
                    : "--"}
                </span>
              </div>
            </div>

            {message && (
              <p
                role="status"
                className={`mt-4 rounded-lg border px-3 py-2 text-sm ${
                  appliedPromo && message.startsWith("WELCOME6")
                    ? "border-[var(--line)] bg-[var(--surface-muted)] text-[var(--foreground-soft)]"
                    : "theme-error"
                }`}
              >
                {message}
              </p>
            )}

            <button
              type="button"
              disabled={
                checkoutLoading ||
                !validConfiguration ||
                !Number.isFinite(price.total)
              }
              onClick={handleCheckout}
              className="theme-button-primary mt-5 flex min-h-12 w-full items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold transition disabled:opacity-45"
            >
              {checkoutLoading ? (
                <>
                  <LoaderCircle
                    aria-hidden
                    className="h-4 w-4 animate-spin"
                  />
                  Starting checkout
                </>
              ) : (
                <>
                  Continue to checkout
                  <ArrowUpRight aria-hidden className="h-4 w-4" />
                </>
              )}
            </button>
            <p className="mt-3 flex items-center justify-center gap-2 text-center text-xs text-[var(--muted)]">
              <LockKeyhole aria-hidden className="h-3.5 w-3.5" />
              Secure checkout. Configuration stays editable until payment.
            </p>
          </aside>
        </div>
      </div>

      <section className="border-t border-[var(--line)] bg-[var(--surface-muted)] px-5 py-12 sm:px-8 lg:px-10">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold">Need help configuring it?</h2>
            <p className="mt-2 text-sm text-[var(--muted)]">
              Support can confirm specialist fit, region, and session details
              before you order.
            </p>
          </div>
          <Link
            href="/contact"
            className="theme-button-secondary inline-flex h-12 items-center justify-center rounded-lg border px-5 text-sm font-semibold transition"
          >
            Contact support
          </Link>
        </div>
      </section>
    </main>
  );
}
