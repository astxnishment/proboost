"use client";

import type { CSSProperties } from "react";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ArrowUpRight,
  BarChart3,
  ChevronDown,
  Clock3,
  Crosshair,
  Gauge,
  Headphones,
  LoaderCircle,
  LockKeyhole,
  Minus,
  Plus,
  Trophy,
  UserRoundCheck,
  Zap,
} from "lucide-react";
import {
  createCheckoutSession,
  getCheckoutErrorMessage,
} from "@/app/lib/checkout";
import {
  CS2_MAPS,
  CS2_RANK_SHORT_NAMES,
  CS2_RANKS,
  CS2_SERVICE_CONFIG,
  CS2_SERVICE_SLUGS,
  FACEIT_LEVELS,
  faceitLevelData,
  premierRatingAccent,
  type Cs2Rank,
  type Cs2ServiceSlug,
} from "@/app/lib/cs2";
import { ORDER_SERVERS } from "@/app/lib/order-options";
import {
  computeOrderPrice,
  type Order,
  type QueueType,
} from "@/app/lib/pricing";

const CS2_ACCENT = "#f47b20";

const RANK_ACCENTS = [
  "#a9b1ba",
  "#a9b1ba",
  "#a9b1ba",
  "#a9b1ba",
  "#bcc4ca",
  "#c5ccd1",
  "#d6a52e",
  "#d6a52e",
  "#d6a52e",
  "#d6a52e",
  "#4a9ec2",
  "#4a9ec2",
  "#4a9ec2",
  "#547fc8",
  "#5d72ca",
  "#6f68c3",
  "#bd5b78",
  "#d0aa32",
] as const;

const SERVICE_ICONS = {
  "cs2-rank-boost": Crosshair,
  "premier-rating": BarChart3,
  "competitive-wins": Trophy,
  "faceit-leveling": Gauge,
} satisfies Record<Cs2ServiceSlug, typeof Crosshair>;

const SERVICE_SUMMARY_LABELS: Record<Cs2ServiceSlug, string> = {
  "cs2-rank-boost": "Competitive progression",
  "premier-rating": "Premier progression",
  "competitive-wins": "Competitive package",
  "faceit-leveling": "FACEIT progression",
};

const SERVICE_MOBILE_LABELS: Record<Cs2ServiceSlug, string> = {
  "cs2-rank-boost": "Rank",
  "premier-rating": "Premier",
  "competitive-wins": "Wins",
  "faceit-leveling": "FACEIT",
};

const money = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

function rankIndex(rank: string) {
  return CS2_RANKS.indexOf(rank as Cs2Rank);
}

function rankIcon(rank: string) {
  const index = Math.max(0, rankIndex(rank));
  return `/cs2/ranks/skillgroup${index + 1}.svg`;
}

function rankAccent(rank: string) {
  return RANK_ACCENTS[Math.max(0, rankIndex(rank))] ?? RANK_ACCENTS[0];
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
          ? "border-[var(--cs2-accent)] bg-[var(--cs2-accent)]"
          : "border-[var(--line-strong)] bg-[var(--surface-muted)]"
      }`}
    >
      <span
        className={`absolute left-0 top-[3px] h-4 w-4 rounded-full bg-[var(--inverse)] transition-transform ${
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
    <section className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5">
      <h2 className="text-sm font-semibold">{label}</h2>
      <div className="mt-4 grid grid-cols-[44px_1fr_44px] items-center gap-3">
        <button
          type="button"
          aria-label={`Decrease ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => onChange(Math.max(min, value - 1))}
          className="theme-button-secondary flex h-11 w-11 items-center justify-center rounded-lg border transition disabled:opacity-35"
        >
          <Minus aria-hidden className="h-4 w-4" />
        </button>
        <div className="text-center">
          <span className="text-3xl font-semibold">{value}</span>
          <span className="ml-2 text-sm text-[var(--muted)]">
            {value === 1 ? suffix : `${suffix}s`}
          </span>
        </div>
        <button
          type="button"
          aria-label={`Increase ${label.toLowerCase()}`}
          disabled={value >= max}
          onClick={() => onChange(Math.min(max, value + 1))}
          className="theme-button-secondary flex h-11 w-11 items-center justify-center rounded-lg border transition disabled:opacity-35"
        >
          <Plus aria-hidden className="h-4 w-4" />
        </button>
      </div>
    </section>
  );
}

function RangeControl({
  id,
  label,
  min,
  max,
  step = 1,
  value,
  accent,
  onChange,
}: {
  id: string;
  label: string;
  min: number;
  max: number;
  step?: number;
  value: number;
  accent: string;
  onChange: (next: number) => void;
}) {
  const progress =
    max === min
      ? 100
      : Math.min(100, Math.max(0, ((value - min) / (max - min)) * 100));

  return (
    <div className="relative mt-6 h-5">
      <span
        aria-hidden
        className="absolute inset-x-0 top-1/2 h-1 -translate-y-1/2 rounded-full bg-[var(--surface-strong)]"
      />
      <span
        aria-hidden
        className="absolute left-0 top-1/2 h-1 -translate-y-1/2 rounded-full"
        style={{ width: `${progress}%`, backgroundColor: accent }}
      />
      <input
        id={id}
        aria-label={label}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(event) => onChange(Number(event.target.value))}
        className="cs2-range absolute inset-0 h-5 w-full"
        style={{ "--range-accent": accent } as CSSProperties}
      />
    </div>
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
                    borderColor: "var(--cs2-accent)",
                    backgroundColor:
                      "color-mix(in srgb, var(--cs2-accent) 14%, var(--surface))",
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

function SelectField({
  id,
  label,
  value,
  options,
  onChange,
}: {
  id: string;
  label: string;
  value: string;
  options: readonly string[];
  onChange: (next: string) => void;
}) {
  return (
    <div className="min-w-0">
      <label htmlFor={id} className="mb-2 block text-sm font-semibold">
        {label}
      </label>
      <div className="relative">
        <select
          id={id}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          className="h-12 w-full appearance-none rounded-lg border px-4 pr-10 outline-none transition hover:border-[var(--line-strong)]"
        >
          {options.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>
        <ChevronDown
          aria-hidden
          className="pointer-events-none absolute right-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--muted)]"
        />
      </div>
    </div>
  );
}

function RankPicker({
  label,
  value,
  onChange,
  isDisabled,
  compactOnDesktop = false,
}: {
  label: string;
  value: string;
  onChange: (rank: string) => void;
  isDisabled?: (rank: string) => boolean;
  compactOnDesktop?: boolean;
}) {
  const accent = rankAccent(value);

  return (
    <section className="min-w-0 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5">
      <div className="flex min-h-14 items-center gap-4">
        <span className="flex h-12 w-24 shrink-0 items-center justify-center rounded-lg border border-[var(--line)] bg-[#101216] px-2">
          <Image
            src={rankIcon(value)}
            alt=""
            width={96}
            height={39}
            className="h-auto max-h-9 w-full object-contain"
          />
        </span>
        <div className="min-w-0">
          <h2 className="text-sm font-semibold">{label}</h2>
          <p
            className="mt-1 truncate text-base font-semibold"
            style={{
              color: `color-mix(in srgb, ${accent} 78%, var(--foreground))`,
            }}
          >
            {value}
          </p>
        </div>
      </div>

      <div
        role="radiogroup"
        aria-label={label}
        className={`mt-5 grid grid-cols-3 gap-2 sm:grid-cols-6 ${
          compactOnDesktop ? "xl:grid-cols-3" : ""
        }`}
      >
        {CS2_RANKS.map((rank) => {
          const selected = value === rank;
          const disabled = isDisabled?.(rank) ?? false;
          const itemAccent = rankAccent(rank);
          return (
            <button
              key={rank}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={rank}
              disabled={disabled}
              onClick={() => onChange(rank)}
              className={`group flex min-h-[86px] min-w-0 flex-col items-center justify-center rounded-lg border px-1.5 py-2 text-center transition ${
                disabled
                  ? "border-[var(--line)] bg-[var(--surface-muted)] opacity-25"
                  : selected
                    ? "bg-[var(--surface-muted)]"
                    : "border-[var(--line)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-muted)]"
              } ${compactOnDesktop ? "xl:min-h-[76px]" : ""}`}
              style={
                selected
                  ? {
                      borderColor: `color-mix(in srgb, ${itemAccent} 72%, var(--foreground))`,
                      boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${itemAccent} 22%, transparent)`,
                    }
                  : undefined
              }
            >
              <span className="flex h-8 w-full items-center justify-center">
                <Image
                  src={rankIcon(rank)}
                  alt=""
                  width={72}
                  height={29}
                  className="h-auto max-h-7 w-full object-contain transition-transform group-hover:scale-105"
                />
              </span>
              <span className="mt-2 text-[10px] font-semibold text-[var(--foreground-soft)]">
                {CS2_RANK_SHORT_NAMES[rank]}
              </span>
            </button>
          );
        })}
      </div>
    </section>
  );
}

function FaceitPicker({
  label,
  value,
  onChange,
  isDisabled,
}: {
  label: string;
  value: number;
  onChange: (level: number) => void;
  isDisabled?: (level: number) => boolean;
}) {
  const selected = faceitLevelData(value);

  return (
    <section className="min-w-0 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5">
      <div className="flex min-h-14 items-center gap-3">
        <Image
          src={`/cs2/faceit/level-${value}.png`}
          alt=""
          width={44}
          height={44}
          className="h-11 w-11 object-contain"
        />
        <div>
          <h2 className="text-sm font-semibold">{label}</h2>
          <p
            className="mt-1 text-base font-semibold"
            style={{
              color: `color-mix(in srgb, ${selected.accent} 76%, var(--foreground))`,
            }}
          >
            FACEIT Level {value}
          </p>
        </div>
      </div>

      <div
        role="radiogroup"
        aria-label={label}
        className="mt-5 grid grid-cols-5 gap-2"
      >
        {FACEIT_LEVELS.map((item) => {
          const active = value === item.level;
          const disabled = isDisabled?.(item.level) ?? false;
          return (
            <button
              key={item.level}
              type="button"
              role="radio"
              aria-checked={active}
              aria-label={`FACEIT level ${item.level}`}
              disabled={disabled}
              onClick={() => onChange(item.level)}
              className={`flex min-h-[78px] flex-col items-center justify-center rounded-lg border p-1.5 transition ${
                disabled
                  ? "border-[var(--line)] bg-[var(--surface-muted)] opacity-25"
                  : active
                    ? "bg-[var(--surface-muted)]"
                    : "border-[var(--line)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-muted)]"
              }`}
              style={
                active
                  ? {
                      borderColor: `color-mix(in srgb, ${item.accent} 72%, var(--foreground))`,
                    }
                  : undefined
              }
            >
              <Image
                src={`/cs2/faceit/level-${item.level}.png`}
                alt=""
                width={36}
                height={36}
                className="h-8 w-8 object-contain"
              />
              <span className="mt-1 text-[10px] font-semibold">
                LVL {item.level}
              </span>
            </button>
          );
        })}
      </div>
    </section>
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

export default function Cs2ServiceConfigurator({
  service,
  basePath,
}: {
  service: Cs2ServiceSlug;
  basePath: string;
}) {
  const config = CS2_SERVICE_CONFIG[service];
  const ServiceIcon = SERVICE_ICONS[service];
  const serviceNavRef = React.useRef<HTMLElement>(null);
  const activeServiceLinkRef = React.useRef<HTMLAnchorElement>(null);

  const [currentRank, setCurrentRank] = React.useState("Silver II");
  const [desiredRank, setDesiredRank] = React.useState("Gold Nova II");
  const [currentRating, setCurrentRating] = React.useState(8000);
  const [desiredRating, setDesiredRating] = React.useState(15000);
  const [wins, setWins] = React.useState(3);
  const [map, setMap] = React.useState("Any map");
  const [currentLevel, setCurrentLevel] = React.useState(3);
  const [desiredLevel, setDesiredLevel] = React.useState(7);
  const [currentElo, setCurrentElo] = React.useState(825);
  const [server, setServer] = React.useState("Europe");
  const [queueType, setQueueType] = React.useState<QueueType>("Solo");
  const [express, setExpress] = React.useState(false);
  const [specificBooster, setSpecificBooster] = React.useState(false);
  const [promoCode, setPromoCode] = React.useState("");
  const [appliedPromo, setAppliedPromo] = React.useState("");
  const [message, setMessage] = React.useState<string | null>(null);
  const [checkoutLoading, setCheckoutLoading] = React.useState(false);

  React.useEffect(() => {
    const nav = serviceNavRef.current;
    const activeLink = activeServiceLinkRef.current;
    if (!nav || !activeLink || nav.scrollWidth <= nav.clientWidth) return;

    const centered =
      activeLink.offsetLeft - (nav.clientWidth - activeLink.clientWidth) / 2;
    const maxScroll = nav.scrollWidth - nav.clientWidth;
    nav.scrollTo({
      left: Math.min(maxScroll, Math.max(0, centered)),
      behavior: "auto",
    });
  }, [service]);

  const currentRankIndex = rankIndex(currentRank);
  const desiredRankIndex = rankIndex(desiredRank);

  const changeCurrentRank = (rank: string) => {
    const nextIndex = rankIndex(rank);
    setCurrentRank(rank);
    if (
      service === "cs2-rank-boost" &&
      desiredRankIndex <= nextIndex &&
      nextIndex < CS2_RANKS.length - 1
    ) {
      setDesiredRank(CS2_RANKS[nextIndex + 1]);
    }
  };

  const changeCurrentRating = (value: number) => {
    const next = Math.min(39500, Math.max(0, value));
    setCurrentRating(next);
    if (desiredRating <= next) setDesiredRating(next + 500);
  };

  const changeCurrentLevel = (level: number) => {
    const band = faceitLevelData(level);
    setCurrentLevel(level);
    setCurrentElo(Math.round((band.minElo + band.maxElo) / 2));
    if (desiredLevel <= level) setDesiredLevel(Math.min(10, level + 1));
  };

  let order: Order;
  switch (service) {
    case "cs2-rank-boost":
      order = {
        serviceType: "cs2-rank",
        currentRank,
        desiredRank,
        map,
        platform: "PC",
        server,
        queueType,
        express,
        specificBooster,
        promoCode: appliedPromo,
      };
      break;
    case "premier-rating":
      order = {
        serviceType: "cs2-premier",
        currentRating,
        desiredRating,
        platform: "PC",
        server,
        queueType,
        express,
        specificBooster,
        promoCode: appliedPromo,
      };
      break;
    case "competitive-wins":
      order = {
        serviceType: "cs2-wins",
        currentRank,
        numberOfWins: wins,
        map,
        platform: "PC",
        server,
        queueType,
        express,
        specificBooster,
        promoCode: appliedPromo,
      };
      break;
    case "faceit-leveling":
      order = {
        serviceType: "cs2-faceit",
        currentLevel,
        desiredLevel,
        currentElo,
        platform: "PC",
        server,
        queueType,
        express,
        specificBooster,
        promoCode: appliedPromo,
      };
      break;
  }

  const validConfiguration =
    service === "cs2-rank-boost"
      ? desiredRankIndex > currentRankIndex
      : service === "premier-rating"
        ? desiredRating > currentRating
        : service === "faceit-leveling"
          ? desiredLevel > currentLevel
          : true;
  const price = computeOrderPrice(order);

  const eta =
    service === "cs2-rank-boost"
      ? `${Math.max(3, (desiredRankIndex - currentRankIndex) * 3)}-${Math.max(
          6,
          (desiredRankIndex - currentRankIndex) * 5
        )} hours`
      : service === "premier-rating"
        ? `${Math.max(4, Math.ceil((desiredRating - currentRating) / 500))}-${Math.max(
            8,
            Math.ceil((desiredRating - currentRating) / 250)
          )} hours`
        : service === "competitive-wins"
          ? `${wins * 2}-${wins * 4} hours`
          : `${Math.max(
              4,
              Math.ceil(
                (faceitLevelData(desiredLevel).minElo - currentElo) / 50
              ) * 2
            )}-${Math.max(
              8,
              Math.ceil(
                (faceitLevelData(desiredLevel).minElo - currentElo) / 50
              ) * 4
            )} hours`;

  const summaryRows =
    service === "cs2-rank-boost"
      ? [
          ["Route", `${currentRank} to ${desiredRank}`],
          ["Map", map],
        ]
      : service === "premier-rating"
        ? [
            ["Current", currentRating.toLocaleString("en-GB")],
            ["Target", desiredRating.toLocaleString("en-GB")],
          ]
        : service === "competitive-wins"
          ? [
              ["Starting rank", currentRank],
              ["Package", `${wins} ${wins === 1 ? "win" : "wins"}`],
              ["Map", map],
            ]
          : [
              ["Route", `Level ${currentLevel} to Level ${desiredLevel}`],
              ["Current Elo", currentElo.toLocaleString("en-GB")],
              [
                "Target Elo",
                `${faceitLevelData(desiredLevel).minElo.toLocaleString("en-GB")}+`,
              ],
            ];

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
      setMessage("Choose a target above your current selection.");
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

  return (
    <main
      className="min-h-screen bg-[var(--background)] text-[var(--foreground)]"
      style={{ "--cs2-accent": CS2_ACCENT } as CSSProperties}
    >
      <section className="theme-preserve-media relative min-h-[420px] overflow-hidden border-b border-[var(--line)] bg-[#08090b] text-white">
        <div className="absolute inset-0">
          <Image
            src="/cs2/cs2-hero.webp"
            alt="Counter-Strike 2 tactical specialist at an industrial bombsite"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-[66%_center]"
          />
        </div>
        <div className="absolute inset-0 bg-black/25" aria-hidden />
        <div className="relative mx-auto flex min-h-[420px] max-w-[1280px] items-center px-5 py-11 sm:px-8 lg:px-10">
          <div className="max-w-[620px]">
            <Link
              href={basePath}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition hover:text-white"
            >
              <ArrowLeft aria-hidden className="h-4 w-4" />
              All CS2 services
            </Link>
            <div className="mt-7 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-white/20 bg-black/35">
                <ServiceIcon aria-hidden className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold uppercase text-white/70">
                {config.eyebrow}
              </span>
            </div>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-[3.25rem]">
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
            { label: "Verified specialists", Icon: UserRoundCheck },
            { label: "Private handling", Icon: LockKeyhole },
            { label: "Region matched", Icon: Crosshair },
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

      <div className="mx-auto max-w-[1280px] px-5 py-10 sm:px-8 sm:py-12 lg:px-10">
        <nav
          ref={serviceNavRef}
          aria-label="Counter-Strike 2 services"
          className="service-subnav mb-6 flex max-w-full snap-x gap-2 overflow-x-auto border-b border-[var(--line)] pb-3"
        >
          {CS2_SERVICE_SLUGS.map((slug) => {
            const active = slug === service;
            return (
              <Link
                key={slug}
                ref={active ? activeServiceLinkRef : undefined}
                href={`${basePath}/${slug}`}
                aria-current={active ? "page" : undefined}
                className={`relative shrink-0 snap-center rounded-lg px-4 py-2.5 text-sm font-semibold transition ${
                  active
                    ? "bg-[var(--surface-muted)] text-[var(--foreground)]"
                    : "text-[var(--muted)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
                }`}
              >
                <span className="sm:hidden">{SERVICE_MOBILE_LABELS[slug]}</span>
                <span className="hidden sm:inline">
                  {CS2_SERVICE_CONFIG[slug].navLabel}
                </span>
                {active && (
                  <span
                    aria-hidden
                    className="absolute inset-x-4 -bottom-[13px] h-0.5"
                    style={{ backgroundColor: "var(--cs2-accent)" }}
                  />
                )}
              </Link>
            );
          })}
        </nav>

        <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <div className="min-w-0 space-y-5">
            {service === "cs2-rank-boost" && (
              <div className="grid gap-5 xl:grid-cols-2">
                <RankPicker
                  label="Current skill group"
                  value={currentRank}
                  onChange={changeCurrentRank}
                  isDisabled={(rank) => rank === "Global Elite"}
                  compactOnDesktop
                />
                <RankPicker
                  label="Desired skill group"
                  value={desiredRank}
                  onChange={setDesiredRank}
                  isDisabled={(rank) => rankIndex(rank) <= currentRankIndex}
                  compactOnDesktop
                />
              </div>
            )}

            {service === "premier-rating" && (
              <section className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5">
                <div className="grid gap-8 md:grid-cols-2">
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h2 className="text-sm font-semibold">Current CS Rating</h2>
                        <p className="mt-1 text-xs text-[var(--muted)]">
                          Your visible Premier rating.
                        </p>
                      </div>
                      <output
                        htmlFor="cs2-current-rating"
                        className="rounded-lg border border-[var(--line)] bg-[var(--surface-muted)] px-3 py-2 text-sm font-semibold"
                        style={{
                          color: `color-mix(in srgb, ${premierRatingAccent(
                            currentRating
                          )} 78%, var(--foreground))`,
                        }}
                      >
                        {currentRating.toLocaleString("en-GB")}
                      </output>
                    </div>
                    <RangeControl
                      id="cs2-current-rating"
                      label="Current CS Rating"
                      min={0}
                      max={39500}
                      step={500}
                      value={currentRating}
                      onChange={changeCurrentRating}
                      accent={premierRatingAccent(currentRating)}
                    />
                    <div className="mt-2 flex justify-between text-xs text-[var(--muted)]">
                      <span>0</span>
                      <span>39,500</span>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <h2 className="text-sm font-semibold">Target CS Rating</h2>
                        <p className="mt-1 text-xs text-[var(--muted)]">
                          Adjusted in 500-point steps.
                        </p>
                      </div>
                      <output
                        htmlFor="cs2-target-rating"
                        className="rounded-lg border border-[var(--line)] bg-[var(--surface-muted)] px-3 py-2 text-sm font-semibold"
                        style={{
                          color: `color-mix(in srgb, ${premierRatingAccent(
                            desiredRating
                          )} 78%, var(--foreground))`,
                        }}
                      >
                        {desiredRating.toLocaleString("en-GB")}
                      </output>
                    </div>
                    <RangeControl
                      id="cs2-target-rating"
                      label="Target CS Rating"
                      min={currentRating + 500}
                      max={40000}
                      step={500}
                      value={desiredRating}
                      onChange={setDesiredRating}
                      accent={premierRatingAccent(desiredRating)}
                    />
                    <div className="mt-2 flex justify-between text-xs text-[var(--muted)]">
                      <span>{(currentRating + 500).toLocaleString("en-GB")}</span>
                      <span>40,000</span>
                    </div>
                  </div>
                </div>
              </section>
            )}

            {service === "competitive-wins" && (
              <>
                <RankPicker
                  label="Starting skill group"
                  value={currentRank}
                  onChange={changeCurrentRank}
                />
                <QuantityStepper
                  label="Competitive win package"
                  value={wins}
                  min={1}
                  max={10}
                  suffix="win"
                  onChange={setWins}
                />
              </>
            )}

            {service === "faceit-leveling" && (
              <>
                <div className="grid gap-5 lg:grid-cols-2">
                  <FaceitPicker
                    label="Current FACEIT level"
                    value={currentLevel}
                    onChange={changeCurrentLevel}
                    isDisabled={(level) => level === 10}
                  />
                  <FaceitPicker
                    label="Target FACEIT level"
                    value={desiredLevel}
                    onChange={setDesiredLevel}
                    isDisabled={(level) => level <= currentLevel}
                  />
                </div>
                <section className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-base font-semibold">Current FACEIT Elo</h2>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        Set your exact Elo within level {currentLevel}.
                      </p>
                    </div>
                    <output
                      htmlFor="faceit-current-elo"
                      className="rounded-lg border border-[var(--line)] bg-[var(--surface-muted)] px-3 py-2 text-sm font-semibold"
                      style={{
                        color: `color-mix(in srgb, ${
                          faceitLevelData(currentLevel).accent
                        } 76%, var(--foreground))`,
                      }}
                    >
                      {currentElo.toLocaleString("en-GB")} Elo
                    </output>
                  </div>
                  <RangeControl
                    id="faceit-current-elo"
                    label="Current FACEIT Elo"
                    min={faceitLevelData(currentLevel).minElo}
                    max={faceitLevelData(currentLevel).maxElo}
                    value={currentElo}
                    onChange={setCurrentElo}
                    accent={faceitLevelData(currentLevel).accent}
                  />
                  <div className="mt-2 flex justify-between text-xs text-[var(--muted)]">
                    <span>{faceitLevelData(currentLevel).minElo}</span>
                    <span>{faceitLevelData(currentLevel).maxElo}</span>
                  </div>
                </section>
              </>
            )}

            <section className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5">
              <h2 className="text-lg font-semibold">Service details</h2>
              <div
                className={`mt-5 grid gap-5 md:grid-cols-2 ${
                  service === "cs2-rank-boost" ||
                  service === "competitive-wins"
                    ? "xl:grid-cols-3"
                    : ""
                }`}
              >
                <SelectField
                  id="cs2-region"
                  label="Region"
                  value={server}
                  options={ORDER_SERVERS}
                  onChange={setServer}
                />
                {(service === "cs2-rank-boost" ||
                  service === "competitive-wins") && (
                  <SelectField
                    id="cs2-map"
                    label="Map preference"
                    value={map}
                    options={CS2_MAPS}
                    onChange={setMap}
                  />
                )}
                <div>
                  <p className="mb-2 text-sm font-semibold">Queue format</p>
                  <QueueSelector value={queueType} onChange={setQueueType} />
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5">
              <h2 className="text-lg font-semibold">Order preferences</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Optional controls update the total immediately.
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
                <OptionRow
                  icon={Zap}
                  title="Express delivery"
                  description="Prioritise assignment ahead of standard orders."
                  price="+20%"
                  checked={express}
                  onChange={setExpress}
                />
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
              <span
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border"
                style={{
                  borderColor:
                    "color-mix(in srgb, var(--cs2-accent) 45%, var(--line))",
                  backgroundColor:
                    "color-mix(in srgb, var(--cs2-accent) 14%, var(--surface))",
                  color:
                    "color-mix(in srgb, var(--cs2-accent) 82%, var(--foreground))",
                }}
              >
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
                <span className="text-[var(--muted)]">Region</span>
                <span className="text-right font-medium">{server}</span>
              </div>
              <div className="grid grid-cols-[96px_1fr] gap-3 text-sm">
                <span className="text-[var(--muted)]">Format</span>
                <span className="text-right font-medium">{queueType}</span>
              </div>
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
              <label htmlFor="cs2-promo" className="text-sm font-semibold">
                Promo code
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="cs2-promo"
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
              <div
                aria-live="polite"
                className="flex items-end justify-between gap-4"
              >
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
              Support can confirm mode, region, map, and specialist fit before
              you order.
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
