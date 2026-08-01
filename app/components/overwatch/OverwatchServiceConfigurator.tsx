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
  HeartHandshake,
  LoaderCircle,
  LockKeyhole,
  Minus,
  Plus,
  Shield,
  ShieldCheck,
  Sparkles,
  Target,
  Trophy,
  UserRoundCheck,
  UsersRound,
  Video,
  Zap,
} from "lucide-react";
import PlatformSelector from "@/app/components/PlatformSelector";
import { useCurrency } from "@/app/components/CurrencyProvider";
import {
  createCheckoutSession,
  getCheckoutErrorMessage,
} from "@/app/lib/checkout";
import { ORDER_SERVERS } from "@/app/lib/order-options";
import {
  computeOrderPrice,
  flattenOverwatchRank,
  type Order,
  type QueueType,
} from "@/app/lib/pricing";
import {
  OVERWATCH_COACHING_FOCUS,
  OVERWATCH_DIVISIONS,
  OVERWATCH_PLATFORMS,
  OVERWATCH_RANK_COLORS,
  OVERWATCH_RANKS,
  OVERWATCH_ROLES,
  OVERWATCH_SERVICE_CONFIG,
  OVERWATCH_SERVICE_SLUGS,
  type OverwatchServiceSlug,
} from "@/app/lib/overwatch";

const SERVICE_ICONS = {
  "overwatch-rank-boost": Crosshair,
  placements: Target,
  "competitive-wins": Trophy,
  coaching: GraduationCap,
} satisfies Record<OverwatchServiceSlug, typeof Crosshair>;

const SERVICE_SUMMARY_LABELS: Record<OverwatchServiceSlug, string> = {
  "overwatch-rank-boost": "Rank progression",
  placements: "Placement package",
  "competitive-wins": "Competitive package",
  coaching: "Private coaching",
};

const ROLE_ICONS = {
  Tank: Shield,
  Damage: Crosshair,
  Support: HeartHandshake,
  "Open Queue": UsersRound,
} satisfies Record<(typeof OVERWATCH_ROLES)[number], typeof Shield>;

function rankColor(rank: string) {
  return (
    OVERWATCH_RANK_COLORS[
      rank as keyof typeof OVERWATCH_RANK_COLORS
    ] ?? OVERWATCH_RANK_COLORS.Bronze
  );
}

function flatRankToSelection(value: number) {
  const max = OVERWATCH_RANKS.length * OVERWATCH_DIVISIONS.length - 1;
  const bounded = Math.min(max, Math.max(0, value));
  return {
    rank: OVERWATCH_RANKS[Math.floor(bounded / OVERWATCH_DIVISIONS.length)],
    division: OVERWATCH_DIVISIONS[bounded % OVERWATCH_DIVISIONS.length],
  };
}

function maxRankValue(rank: string) {
  return flattenOverwatchRank(rank, "1");
}

function OverwatchRankBadge({
  rank,
  size = "compact",
}: {
  rank: string;
  size?: "compact" | "large";
}) {
  const tier = Math.max(
    0,
    OVERWATCH_RANKS.indexOf(rank as (typeof OVERWATCH_RANKS)[number])
  );
  const color = rankColor(rank);
  const large = size === "large";
  const wingCount = Math.min(4, Math.max(1, tier + 1));

  return (
    <span
      aria-hidden
      className={`inline-flex shrink-0 items-center justify-center ${
        large ? "h-16 w-16" : "h-11 w-11"
      }`}
    >
      <svg
        viewBox="0 0 72 72"
        className={large ? "h-16 w-16" : "h-11 w-11"}
        fill="none"
      >
        <path
          d="M36 5 56 16l7 20-7 20-20 11-20-11L9 36l7-20L36 5Z"
          fill="#101216"
          stroke={color}
          strokeWidth="2.4"
        />
        <path
          d="m36 14 13 8 4 14-4 14-13 8-13-8-4-14 4-14 13-8Z"
          fill={color}
          opacity="0.16"
          stroke={color}
          strokeWidth="1.5"
        />
        <path d="m36 21 10 15-10 15-10-15 10-15Z" fill={color} />
        <path d="m36 27 5.5 9-5.5 9-5.5-9 5.5-9Z" fill="#101216" />
        {Array.from({ length: wingCount }, (_, index) => {
          const y = 23 + index * 7;
          const extension = 2 + index * 1.5;
          return (
            <React.Fragment key={y}>
              <path
                d={`M${18 - extension} ${y}h-7l-4 4h9`}
                stroke={color}
                strokeWidth="2"
                strokeLinecap="square"
              />
              <path
                d={`M${54 + extension} ${y}h7l4 4h-9`}
                stroke={color}
                strokeWidth="2"
                strokeLinecap="square"
              />
            </React.Fragment>
          );
        })}
        {tier >= 5 ? (
          <path
            d="m27 10 4-6 5 5 5-5 4 6"
            stroke={color}
            strokeWidth="2.4"
            strokeLinejoin="round"
          />
        ) : null}
      </svg>
    </span>
  );
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
          ? "border-[var(--overwatch-accent)] bg-[var(--overwatch-accent)]"
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
  const plural =
    value === 1
      ? suffix
      : suffix === "match"
        ? "matches"
        : `${suffix}s`;

  return (
    <section className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5">
      <h2 className="text-sm font-semibold">{label}</h2>
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
          <span className="ml-2 text-sm text-[var(--muted)]">{plural}</span>
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
    </section>
  );
}

function RankPicker({
  label,
  rank,
  division,
  onRankChange,
  onDivisionChange,
  isRankDisabled,
  isDivisionDisabled,
  showDivision = true,
}: {
  label: string;
  rank: string;
  division: string;
  onRankChange: (rank: string) => void;
  onDivisionChange: (division: string) => void;
  isRankDisabled?: (rank: string) => boolean;
  isDivisionDisabled?: (division: string) => boolean;
  showDivision?: boolean;
}) {
  const color = rankColor(rank);

  return (
    <section className="min-w-0 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5">
      <div className="flex min-h-16 items-center gap-3">
        <OverwatchRankBadge rank={rank} size="large" />
        <div className="min-w-0">
          <h2 className="text-base font-semibold">{label}</h2>
          <p className="mt-0.5 truncate text-sm font-semibold" style={{ color }}>
            {rank}{showDivision ? ` ${division}` : ""}
          </p>
        </div>
      </div>

      <div
        role="radiogroup"
        aria-label={`${label} tier`}
        className="mt-5 grid grid-cols-4 gap-2"
      >
        {OVERWATCH_RANKS.map((item) => {
          const selected = item === rank;
          const disabled = isRankDisabled?.(item) ?? false;
          const itemColor = rankColor(item);
          return (
            <button
              key={item}
              type="button"
              role="radio"
              aria-checked={selected}
              aria-label={item}
              title={item}
              disabled={disabled}
              onClick={() => onRankChange(item)}
              className={`group flex min-h-24 min-w-0 flex-col items-center justify-center rounded-lg border p-2 text-center transition ${
                disabled
                  ? "border-[var(--line)] bg-[var(--surface-muted)] opacity-28"
                  : selected
                    ? "bg-[var(--surface-muted)]"
                    : "border-[var(--line)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-muted)]"
              }`}
              style={
                selected
                  ? {
                      borderColor: itemColor,
                      boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${itemColor} 18%, transparent)`,
                    }
                  : undefined
              }
            >
              <OverwatchRankBadge rank={item} />
              <span className="mt-1 w-full text-[10px] font-semibold leading-[1.15] text-[var(--foreground-soft)]">
                {item}
              </span>
            </button>
          );
        })}
      </div>

      {showDivision ? (
        <div
          role="radiogroup"
          aria-label={`${label} division`}
          className="mt-3 grid grid-cols-5 gap-2"
        >
          {OVERWATCH_DIVISIONS.map((item) => {
            const selected = item === division;
            const disabled = isDivisionDisabled?.(item) ?? false;
            return (
              <button
                key={item}
                type="button"
                role="radio"
                aria-checked={selected}
                aria-label={`${rank} division ${item}`}
                disabled={disabled}
                onClick={() => onDivisionChange(item)}
                className={`h-11 rounded-lg border text-sm font-semibold transition ${
                  disabled
                    ? "border-[var(--line)] bg-[var(--surface-muted)] text-[var(--muted-soft)] opacity-30"
                    : selected
                      ? "text-[var(--foreground)]"
                      : "border-[var(--line)] bg-transparent text-[var(--muted)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
                }`}
                style={
                  selected
                    ? {
                        borderColor: color,
                        backgroundColor: `color-mix(in srgb, ${color} 14%, var(--surface))`,
                      }
                    : undefined
                }
              >
                {item}
              </button>
            );
          })}
        </div>
      ) : null}
    </section>
  );
}

function RoleSelector({
  value,
  onChange,
}: {
  value: string;
  onChange: (next: (typeof OVERWATCH_ROLES)[number]) => void;
}) {
  return (
    <div
      role="radiogroup"
      aria-label="Competitive role"
      className="grid grid-cols-2 gap-2 sm:grid-cols-4"
    >
      {OVERWATCH_ROLES.map((role) => {
        const selected = role === value;
        const Icon = ROLE_ICONS[role];
        return (
          <button
            key={role}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(role)}
            className={`flex min-h-14 items-center justify-center gap-2 rounded-lg border px-3 text-sm font-semibold transition ${
              selected
                ? "text-[var(--foreground)]"
                : "border-[var(--line)] text-[var(--muted)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-muted)] hover:text-[var(--foreground)]"
            }`}
            style={
              selected
                ? {
                    borderColor: "var(--overwatch-accent)",
                    backgroundColor:
                      "color-mix(in srgb, var(--overwatch-accent) 13%, var(--surface))",
                  }
                : undefined
            }
          >
            <Icon aria-hidden className="h-4 w-4" />
            <span>{role}</span>
          </button>
        );
      })}
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
        const selected = item === value;
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
                    borderColor: "var(--overwatch-accent)",
                    backgroundColor:
                      "color-mix(in srgb, var(--overwatch-accent) 13%, var(--surface))",
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

export default function OverwatchServiceConfigurator({
  service,
  basePath,
}: {
  service: OverwatchServiceSlug;
  basePath: string;
}) {
  const config = OVERWATCH_SERVICE_CONFIG[service];
  const ServiceIcon = SERVICE_ICONS[service];
  const { currency, formatPrice } = useCurrency();

  const [currentRank, setCurrentRank] = React.useState("Silver");
  const [currentDivision, setCurrentDivision] = React.useState("3");
  const [desiredRank, setDesiredRank] = React.useState("Diamond");
  const [desiredDivision, setDesiredDivision] = React.useState("5");
  const [currentProgress, setCurrentProgress] = React.useState(42);
  const [previousRank, setPreviousRank] = React.useState("Gold");
  const [matches, setMatches] = React.useState(10);
  const [wins, setWins] = React.useState(3);
  const [hours, setHours] = React.useState(2);
  const [focus, setFocus] =
    React.useState<(typeof OVERWATCH_COACHING_FOCUS)[number]>("Positioning");
  const [role, setRole] =
    React.useState<(typeof OVERWATCH_ROLES)[number]>("Damage");
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

  const currentValue = flattenOverwatchRank(currentRank, currentDivision);
  const desiredValue = flattenOverwatchRank(desiredRank, desiredDivision);
  const maxRank = OVERWATCH_RANKS.length * OVERWATCH_DIVISIONS.length - 1;
  const validRankPath = desiredValue > currentValue;

  const setDesiredFromFlatValue = (value: number) => {
    const selection = flatRankToSelection(value);
    setDesiredRank(selection.rank);
    setDesiredDivision(selection.division);
  };

  const changeCurrentRank = (nextRank: string) => {
    const nextValue = flattenOverwatchRank(nextRank, currentDivision);
    if (nextValue >= maxRank) return;
    setCurrentRank(nextRank);
    if (desiredValue <= nextValue) setDesiredFromFlatValue(nextValue + 1);
  };

  const changeCurrentDivision = (nextDivision: string) => {
    const nextValue = flattenOverwatchRank(currentRank, nextDivision);
    if (nextValue >= maxRank) return;
    setCurrentDivision(nextDivision);
    if (desiredValue <= nextValue) setDesiredFromFlatValue(nextValue + 1);
  };

  const changeDesiredRank = (nextRank: string) => {
    const firstValidDivision = OVERWATCH_DIVISIONS.find(
      (division) =>
        flattenOverwatchRank(nextRank, division) > currentValue
    );
    if (!firstValidDivision) return;
    setDesiredRank(nextRank);
    if (flattenOverwatchRank(nextRank, desiredDivision) <= currentValue) {
      setDesiredDivision(firstValidDivision);
    }
  };

  let order: Order;
  switch (service) {
    case "overwatch-rank-boost":
      order = {
        serviceType: "overwatch-rank",
        currentRank,
        currentDivision,
        desiredRank,
        desiredDivision,
        currentProgress,
        role,
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
        serviceType: "overwatch-placements",
        previousRank,
        numberOfMatches: matches,
        role,
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
        serviceType: "overwatch-wins",
        currentRank,
        currentDivision,
        numberOfWins: wins,
        role,
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
        serviceType: "overwatch-coaching",
        currentRank,
        hours,
        focus,
        role,
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
    service !== "overwatch-rank-boost" || validRankPath;
  const eta =
    service === "overwatch-rank-boost"
      ? `${Math.max(3, Math.ceil((desiredValue - currentValue) * 1.5))}-${Math.max(
          6,
          Math.ceil((desiredValue - currentValue) * 2.3)
        )} hours`
      : service === "placements"
        ? `${matches * 2}-${matches * 4} hours`
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
      setMessage("Choose a target rank above your current division.");
      return;
    }
    setCheckoutLoading(true);
    setMessage(null);
    try {
      const checkoutUrl = await createCheckoutSession(order, currency);
      window.location.assign(checkoutUrl);
    } catch (error) {
      setMessage(getCheckoutErrorMessage(error));
      setCheckoutLoading(false);
    }
  };

  const summaryRows =
    service === "overwatch-rank-boost"
      ? [
          [
            "Route",
            `${currentRank} ${currentDivision} to ${desiredRank} ${desiredDivision}`,
          ],
          ["Progress", `${currentProgress}%`],
        ]
      : service === "placements"
        ? [
            ["Package", `${matches} placement ${matches === 1 ? "match" : "matches"}`],
            ["Previous rank", previousRank],
          ]
        : service === "competitive-wins"
          ? [
              ["Starting rank", `${currentRank} ${currentDivision}`],
              ["Win target", `${wins} ${wins === 1 ? "win" : "wins"}`],
            ]
          : [
              ["Session", `${hours} ${hours === 1 ? "hour" : "hours"}`],
              ["Focus", focus],
            ];

  return (
    <main
      className="min-h-screen bg-[var(--background)] text-[var(--foreground)]"
      style={{ "--overwatch-accent": "#f99e1a" } as CSSProperties}
    >
      <section className="theme-preserve-media relative min-h-[430px] overflow-hidden border-b border-[var(--line)] bg-[#090a0c] text-white">
        <div
          className="absolute inset-y-0 -right-[36%] w-[136%] opacity-45 sm:-right-[10%] sm:w-[88%] sm:opacity-80 lg:right-0 lg:w-[64%] lg:opacity-100"
          style={{
            WebkitMaskImage:
              "linear-gradient(to right, transparent 0%, black 30%, black 100%)",
            maskImage:
              "linear-gradient(to right, transparent 0%, black 30%, black 100%)",
          }}
        >
          <Image
            src="/homepage/overwatch-homepage.webp"
            alt="Overwatch 2 heroes in a competitive city arena"
            fill
            loading="eager"
            fetchPriority="high"
            sizes="(max-width: 639px) 136vw, (max-width: 1023px) 88vw, 64vw"
            className="object-cover object-[48%_38%]"
          />
          <div aria-hidden className="absolute inset-0 bg-black/25 sm:bg-black/10" />
        </div>
        <div className="relative mx-auto flex min-h-[430px] max-w-[1280px] items-center px-5 py-12 sm:px-8 lg:px-10">
          <div className="max-w-[32rem] lg:max-w-[44%]">
            <Link
              href={basePath}
              className="inline-flex items-center gap-2 text-sm font-semibold text-white/75 transition hover:text-white"
            >
              <ArrowLeft aria-hidden className="h-4 w-4" />
              All Overwatch 2 services
            </Link>
            <div className="mt-7 flex items-center gap-3">
              <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-[#f99e1a]/45 bg-[#f99e1a]/12 text-[#ffad32]">
                <ServiceIcon aria-hidden className="h-5 w-5" />
              </span>
              <span className="text-xs font-semibold uppercase text-[#ffb64d]">
                {config.eyebrow}
              </span>
            </div>
            <h1 className="mt-5 text-4xl font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
              {config.title}
            </h1>
            <p className="mt-5 max-w-[46ch] text-base leading-7 text-white/72 sm:text-lg">
              {config.description}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-[var(--surface-muted)]">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 px-5 sm:px-8 lg:grid-cols-4 lg:px-10">
          {[
            { label: "Manual service", Icon: ShieldCheck },
            { label: "Role matched", Icon: UsersRound },
            { label: "Private handling", Icon: LockKeyhole },
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
              <Icon aria-hidden className="h-4 w-4 shrink-0 text-[var(--muted)]" />
              <span className="text-xs font-semibold text-[var(--foreground-soft)] sm:text-sm">
                {label}
              </span>
            </div>
          ))}
        </div>
      </section>

      <div className="mx-auto max-w-[1280px] px-5 py-10 sm:px-8 sm:py-14 lg:px-10">
        <nav
          aria-label="Overwatch 2 services"
          className="service-subnav mb-8 flex max-w-full gap-2 overflow-x-auto border-b border-[var(--line)] pb-3"
        >
          {OVERWATCH_SERVICE_SLUGS.map((slug) => {
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
                {OVERWATCH_SERVICE_CONFIG[slug].navLabel}
                {active ? (
                  <span
                    aria-hidden
                    className="absolute inset-x-4 -bottom-[13px] h-0.5 bg-[var(--overwatch-accent)]"
                  />
                ) : null}
              </Link>
            );
          })}
        </nav>

        <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_370px]">
          <div className="min-w-0 space-y-6">
            {service === "overwatch-rank-boost" ? (
              <>
                <div className="grid gap-5 lg:grid-cols-2">
                  <RankPicker
                    label="Current rank"
                    rank={currentRank}
                    division={currentDivision}
                    onRankChange={changeCurrentRank}
                    onDivisionChange={changeCurrentDivision}
                    isDivisionDisabled={(division) =>
                      currentRank === "Champion" && division === "1"
                    }
                  />
                  <RankPicker
                    label="Desired rank"
                    rank={desiredRank}
                    division={desiredDivision}
                    onRankChange={changeDesiredRank}
                    onDivisionChange={setDesiredDivision}
                    isRankDisabled={(rank) => maxRankValue(rank) <= currentValue}
                    isDivisionDisabled={(division) =>
                      flattenOverwatchRank(desiredRank, division) <= currentValue
                    }
                  />
                </div>

                <section className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <h2 className="text-base font-semibold">Current division progress</h2>
                      <p className="mt-1 text-sm text-[var(--muted)]">
                        Set the progress already earned in your current division.
                      </p>
                    </div>
                    <output
                      htmlFor="overwatch-current-progress"
                      className="min-w-20 rounded-lg border border-[var(--line)] bg-[var(--surface-muted)] px-3 py-2 text-center text-sm font-semibold"
                    >
                      {currentProgress}%
                    </output>
                  </div>
                  <input
                    id="overwatch-current-progress"
                    type="range"
                    min="0"
                    max="99"
                    value={currentProgress}
                    onChange={(event) => setCurrentProgress(Number(event.target.value))}
                    className="mt-5 w-full"
                    style={{ accentColor: "var(--overwatch-accent)" }}
                  />
                  {!validRankPath ? (
                    <p className="theme-error mt-4 rounded-lg px-3 py-2 text-sm">
                      Select a target division above your current rank.
                    </p>
                  ) : null}
                </section>
              </>
            ) : null}

            {service === "placements" ? (
              <>
                <section className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5">
                  <div className="flex items-center gap-3">
                    {previousRank === "Unranked" ? (
                      <span className="flex h-16 w-16 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface-muted)]">
                        <CircleDashed aria-hidden className="h-6 w-6 text-[var(--muted)]" />
                      </span>
                    ) : (
                      <OverwatchRankBadge rank={previousRank} size="large" />
                    )}
                    <div>
                      <h2 className="text-base font-semibold">Previous rank</h2>
                      <p className="mt-0.5 text-sm font-semibold">{previousRank}</p>
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
                          ? "border-[var(--overwatch-accent)] bg-[var(--surface-muted)]"
                          : "border-[var(--line)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-muted)]"
                      }`}
                    >
                      <CircleDashed aria-hidden className="h-9 w-9 text-[var(--muted)]" />
                      <span className="mt-2">Unranked</span>
                    </button>
                    {OVERWATCH_RANKS.map((rank) => (
                      <button
                        key={rank}
                        type="button"
                        role="radio"
                        aria-checked={previousRank === rank}
                        onClick={() => setPreviousRank(rank)}
                        className="flex min-h-24 flex-col items-center justify-center rounded-lg border border-[var(--line)] p-2 text-xs font-semibold transition hover:border-[var(--line-strong)] hover:bg-[var(--surface-muted)]"
                        style={
                          previousRank === rank
                            ? {
                                borderColor: rankColor(rank),
                                backgroundColor: "var(--surface-muted)",
                              }
                            : undefined
                        }
                      >
                        <OverwatchRankBadge rank={rank} />
                        <span className="mt-1 w-full text-[10px] leading-tight">{rank}</span>
                      </button>
                    ))}
                  </div>
                </section>
                <QuantityStepper
                  label="Placement package"
                  value={matches}
                  min={1}
                  max={10}
                  suffix="match"
                  onChange={setMatches}
                />
              </>
            ) : null}

            {service === "competitive-wins" ? (
              <>
                <RankPicker
                  label="Starting rank"
                  rank={currentRank}
                  division={currentDivision}
                  onRankChange={setCurrentRank}
                  onDivisionChange={setCurrentDivision}
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
            ) : null}

            {service === "coaching" ? (
              <>
                <RankPicker
                  label="Current rank"
                  rank={currentRank}
                  division={currentDivision}
                  onRankChange={setCurrentRank}
                  onDivisionChange={setCurrentDivision}
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
                      {OVERWATCH_COACHING_FOCUS.map((item) => {
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
                                    borderColor: "var(--overwatch-accent)",
                                    backgroundColor:
                                      "color-mix(in srgb, var(--overwatch-accent) 13%, var(--surface))",
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
            ) : null}

            <section className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5">
              <h2 className="text-lg font-semibold">Role and platform</h2>
              <p className="mt-1 text-sm text-[var(--muted)]">
                Select the queue and device used for this request.
              </p>
              <div className="mt-5">
                <RoleSelector value={role} onChange={setRole} />
              </div>
              <div className="mt-5">
                <PlatformSelector
                  platforms={OVERWATCH_PLATFORMS}
                  value={platform}
                  onChange={setPlatform}
                  ariaLabel="Select Overwatch 2 platform"
                />
              </div>
              <div className="mt-5 grid gap-5 md:grid-cols-2">
                <div>
                  <label htmlFor="overwatch-region" className="mb-2 block text-sm font-semibold">
                    Region
                  </label>
                  <select
                    id="overwatch-region"
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
                    <QueueSelector value={queueType} onChange={setQueueType} />
                  </div>
                ) : (
                  <div className="rounded-lg border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3">
                    <p className="text-sm font-semibold">Private session</p>
                    <p className="mt-1 text-xs leading-5 text-[var(--muted)]">
                      Your coach confirms voice and screen-sharing details before the session.
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
                  price={`+${formatPrice(7.5)}`}
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
                      description="Get a concise practice plan tailored to the session."
                      price="+10%"
                      checked={customFocus}
                      onChange={setCustomFocus}
                    />
                  </>
                ) : (
                  <OptionRow
                    icon={Zap}
                    title="Express delivery"
                    description="Prioritise assignment ahead of standard orders."
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
              <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-[#f99e1a]/45 bg-[#f99e1a]/10 text-[#f99e1a]">
                <ServiceIcon aria-hidden className="h-4 w-4" />
              </span>
            </div>

            <div className="mt-6 space-y-3 border-y border-[var(--line)] py-5">
              {summaryRows.map(([label, value]) => (
                <div key={label} className="grid grid-cols-[96px_1fr] gap-3 text-sm">
                  <span className="text-[var(--muted)]">{label}</span>
                  <span className="min-w-0 text-right font-medium">{value}</span>
                </div>
              ))}
              <div className="grid grid-cols-[96px_1fr] gap-3 text-sm">
                <span className="text-[var(--muted)]">Role</span>
                <span className="text-right font-medium">{role}</span>
              </div>
              <div className="grid grid-cols-[96px_1fr] gap-3 text-sm">
                <span className="text-[var(--muted)]">Platform</span>
                <span className="text-right font-medium">{platform}</span>
              </div>
              <div className="grid grid-cols-[96px_1fr] gap-3 text-sm">
                <span className="text-[var(--muted)]">Region</span>
                <span className="text-right font-medium">{server}</span>
              </div>
              {service !== "coaching" ? (
                <div className="grid grid-cols-[96px_1fr] gap-3 text-sm">
                  <span className="text-[var(--muted)]">Format</span>
                  <span className="text-right font-medium">{queueType}</span>
                </div>
              ) : null}
              <div className="grid grid-cols-[96px_1fr] gap-3 text-sm">
                <span className="text-[var(--muted)]">Estimate</span>
                <span className="flex items-center justify-end gap-1.5 text-right font-medium">
                  <Clock3 aria-hidden className="h-3.5 w-3.5 text-[var(--muted)]" />
                  {eta}
                </span>
              </div>
            </div>

            <div className="mt-5">
              <label htmlFor="overwatch-promo" className="text-sm font-semibold">
                Promo code
              </label>
              <div className="mt-2 flex gap-2">
                <input
                  id="overwatch-promo"
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
              {price.discount > 0 ? (
                <div className="mb-2 flex items-center justify-between text-sm text-[var(--muted)]">
                  <span>Subtotal</span>
                  <span>{formatPrice(price.subtotal)}</span>
                </div>
              ) : null}
              {price.discount > 0 ? (
                <div className="mb-3 flex items-center justify-between text-sm">
                  <span>Discount</span>
                  <span>-{formatPrice(price.discount)}</span>
                </div>
              ) : null}
              <div className="flex items-end justify-between gap-4">
                <span className="text-sm font-semibold">Total</span>
                <span className="text-3xl font-semibold">
                  {Number.isFinite(price.total) ? formatPrice(price.total) : "--"}
                </span>
              </div>
            </div>

            {message ? (
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
            ) : null}

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
                  <LoaderCircle aria-hidden className="h-4 w-4 animate-spin" />
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
              Support can confirm role, platform, region, and specialist fit before you order.
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
