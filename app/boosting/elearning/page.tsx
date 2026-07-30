"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TrustSection from "../../components/TrustSection";
import FaqSection from "../../components/FaqSection";
import InfoSection from "../../components/InfoSection";
import ServiceIntro from "../../components/ServiceIntro";
import PlatformLogo from "../../components/PlatformLogo";
import PlatformSelector from "../../components/PlatformSelector";
import { computeOrderPrice, type ElearningOrder } from "@/app/lib/pricing";
import {
  createCheckoutSession,
  getCheckoutErrorMessage,
} from "@/app/lib/checkout";
import {
  ORDER_PAYMENT_METHODS,
  ORDER_PLATFORMS,
  ORDER_SERVERS,
  R6_SERVICE_BUTTONS,
} from "@/app/lib/order-options";

function Toggle({
  enabled,
  setEnabled,
}: {
  enabled: boolean;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={enabled ? "Disable option" : "Enable option"}
      onClick={() => setEnabled(!enabled)}
      className={`keep-pill flex h-6 w-10 items-center rounded-full border p-0.5 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--focus)] focus-visible:ring-offset-2 focus-visible:ring-offset-[var(--background)] ${
        enabled
          ? "border-[var(--foreground)] bg-[var(--foreground)]"
          : "border-[var(--line-strong)] bg-[var(--surface-muted)]"
      }`}
    >
      <div
        className={`h-4 w-4 rounded-full transition-transform duration-200 ease-out ${
          enabled ? "translate-x-5 bg-[var(--background)]" : "bg-[var(--muted)]"
        }`}
      />
    </button>
  );
}

const SERVICE_TYPES = [
  {
    id: "coaching",
    title: "Coaching",
    desc: "Become a game master with the mentorship of the top-tier players",
    price: 24.99,
    unit: "hour",
    unitLabel: "Number of Hours",
    unitSub: "Select Number Of Hours",
    gradient: "from-black/60 via-black/40 to-black/70",
    accentColor: "text-violet-300",
    image: "/service-icons/elearning.png",
    tooltip: "A live 1-on-1 session with a top-ranked coach. They observe your play in real time, correct mistakes instantly, and walk you through pro-level tactics tailored to your rank and playstyle.",
    icon: (
      <svg className="h-6 w-6 text-violet-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/>
        <circle cx="9" cy="7" r="4"/>
        <path d="M23 21v-2a4 4 0 00-3-3.87"/>
        <path d="M16 3.13a4 4 0 010 7.75"/>
      </svg>
    ),
  },
  {
    id: "vod",
    title: "VoD Review",
    desc: "Get expert analysis of your gameplay recordings to pinpoint weaknesses",
    price: 17.99,
    unit: "vod",
    unitLabel: "Number of VoDs",
    unitSub: "Select Number Of VoDs",
    gradient: "from-black/60 via-black/40 to-black/70",
    accentColor: "text-amber-300",
    image: "/r6-background.png",
    tooltip: "Submit a recorded match and a pro analyst will break it down frame by frame — identifying every positioning error, missed rotation, and decision-making flaw so you know exactly what to fix.",
    icon: (
      <svg className="h-6 w-6 text-amber-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <polygon points="23 7 16 12 23 17 23 7"/>
        <rect x="1" y="5" width="15" height="14" rx="2" ry="2"/>
      </svg>
    ),
  },
  {
    id: "play-learn",
    title: "Play & Learn",
    desc: "Play alongside a pro and absorb real-time tips & strategies each match",
    price: 6.99,
    unit: "game",
    unitLabel: "Number of Games",
    unitSub: "Select Number Of Games",
    gradient: "from-black/60 via-black/40 to-black/70",
    accentColor: "text-cyan-300",
    image: "/homepage/r6-homepage.webp",
    tooltip: "A pro joins your actual match lobby and coaches you live round by round — calling out angles, telling you when to push or hold, and transferring game sense in real time during real games.",
    icon: (
      <svg className="h-6 w-6 text-cyan-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
        <path d="M21 16V8a2 2 0 00-1-1.73l-7-4a2 2 0 00-2 0l-7 4A2 2 0 003 8v8a2 2 0 001 1.73l7 4a2 2 0 002 0l7-4A2 2 0 0021 16z"/>
        <polyline points="3.27 6.96 12 12.01 20.73 6.96"/>
        <line x1="12" y1="22.08" x2="12" y2="12"/>
      </svg>
    ),
  },
] as const;

type ServiceId = typeof SERVICE_TYPES[number]["id"];

const platforms = ORDER_PLATFORMS;
const servers = ORDER_SERVERS;
const paymentMethods = ORDER_PAYMENT_METHODS;


export default function ELearning() {
  // State
  const [selectedService, setSelectedService] = React.useState<ServiceId>("coaching");
  const [quantity, setQuantity] = React.useState(1);
  const [platform, setPlatform] = React.useState("PC");
  const [server, setServer] = React.useState("Europe");
  const [queueType, setQueueType] = React.useState<"Solo" | "Duo">("Solo");
  const [duoBoosterCount, setDuoBoosterCount] = React.useState(1);

  const [specificBooster, setSpecificBooster] = React.useState(false);
  const [streaming, setStreaming] = React.useState(false);
  const [express, setExpress] = React.useState(false);
  const [vipPriority, setVipPriority] = React.useState(false);
  const [eliteTier, setEliteTier] = React.useState(false);
  const [recordedSession, setRecordedSession] = React.useState(false);
  const [customFocus, setCustomFocus] = React.useState(false);

  const [promoCode, setPromoCode] = React.useState("");
  const [promoExpanded, setPromoExpanded] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const [toastType, setToastType] = React.useState<"error" | "success">("error");
  const [showDetails, setShowDetails] = React.useState(false);
  const [checkoutLoading, setCheckoutLoading] = React.useState(false);

  // Reset quantity when switching service
  const handleSelectService = (id: ServiceId) => {
    setSelectedService(id);
    setQuantity(1);
  };

  const activeService = SERVICE_TYPES.find((s) => s.id === selectedService)!;

  // Pricing
  const order: ElearningOrder = {
    serviceType: "elearning",
    service: selectedService,
    quantity,
    queueType,
    duoBoosterCount,
    platform,
    server,
    promoCode,
    specificBooster,
    streaming,
    express,
    vipPriority,
    eliteTier,
    recordedSession,
    customFocus,
  };

  const {
    subtotal,
    discount,
    extraDiscountPercent,
    hasExtraDiscount,
    amountToExtraDiscount,
    total,
  } = computeOrderPrice(order);

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "WELCOME6") {
      setToastType("success");
      setToastMessage("Coupon applied successfully! You got 6% off.");
    } else {
      setToastType("error");
      setToastMessage("Ops, coupon not found, please contact support.");
    }
    setTimeout(() => setToastMessage(null), 4000);
  };

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const checkoutUrl = await createCheckoutSession(order);
      window.location.assign(checkoutUrl);
    } catch (error) {
      setToastType("error");
      setToastMessage(getCheckoutErrorMessage(error));
      setCheckoutLoading(false);
      window.setTimeout(() => setToastMessage(null), 5000);
    }
  };

  const addOnCard = (
    title: string,
    tag: string,
    enabled: boolean,
    setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
    description?: string
  ) => (
    <div className={`relative rounded-2xl border p-4 transition-all duration-200 ease-out ${
      enabled
        ? "border-cyan-400/40 bg-cyan-400/10 shadow-lg shadow-cyan-500/20"
        : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-white">{title}</p>
            {description && (
              <span className="group/tip relative cursor-help">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500/20 text-[10px] font-bold text-cyan-400">?</span>
                <span className="pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 rounded-xl border border-white/10 bg-zinc-900 px-3 py-2 text-xs text-zinc-300 opacity-0 shadow-xl transition-opacity duration-200 group-hover/tip:pointer-events-auto group-hover/tip:opacity-100">
                  {description}
                </span>
              </span>
            )}
          </div>
          <span className={`mt-2 inline-block rounded-md border px-2.5 py-1 text-xs font-bold ${
            enabled
              ? "border-emerald-400 bg-emerald-400/20 text-emerald-300"
              : tag === "FREE"
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
              : "border-cyan-500/30 bg-cyan-500/10 text-cyan-400"
          }`}>
            {tag}
          </span>
        </div>
        <Toggle enabled={enabled} setEnabled={setEnabled} />
      </div>
    </div>
  );

  const trustCopy = {
    heading: "Why Players Trust ProBoost",
    features: [
      { title: "Money-Back Guarantee", desc: "Your satisfaction is our promise - if we don't deliver, you get a full refund. No questions asked." },
      { title: "Zero-Ban Protection", desc: "100% safe service with advanced VPN routes and real players only - zero bots, zero risks." },
      { title: "Fair & Transparent Pricing", desc: "Top-tier quality at honest prices - you pay for real performance, not empty promises." },
      { title: "The World's Strongest Players", desc: "Every coach is verified, ranked, and battle-tested - elite talent that guarantees results." },
      { title: "24/7 Live Support", desc: "We're always online to assist you - instant updates, real people, real help anytime." },
    ],
  };

  const faqCopy = {
    label: "FAQs",
    items: [
      { q: "What is Rainbow Six Siege E-Learning?", a: "Our E-Learning service connects you with top-ranked R6S players who coach you live, review your gameplay recordings, or play alongside you to transfer their skills and game sense in real time." },
      { q: "What's the difference between Coaching, VoD Review, and Play & Learn?", a: "Coaching is a live 1-on-1 session billed per hour. VoD Review is a recorded gameplay analysis. Play & Learn puts you in a match with a pro who coaches you in real time per game." },
      { q: "How do sessions start?", a: "Sessions start within 10 minutes of purchase. You'll receive a Discord invite or contact details to join your coach immediately." },
      { q: "What rank do the coaches have?", a: "All coaches are Diamond or Champion rank, verified by our team. Elite Tier coaches are in the top 0.01% of their server." },
      { q: "Can I choose what topics to focus on?", a: "Yes! Enable the 'Custom Focus Area' add-on and specify your weak points — droning, angles, operator picks, etc. Your coach will tailor the session accordingly." },
    ],
  };

  const infoCopy = {
    sections: [
      { heading: "Learn From the Best in Siege", paragraphs: ["Rainbow Six Siege has one of the steepest learning curves in competitive gaming. Our coaches have spent thousands of hours mastering the game and are ready to pass that knowledge directly to you."] },
      { heading: "Real-Time Skill Transfer", paragraphs: ["Unlike generic video guides, our coaching sessions are tailored to your specific playstyle, rank, and goals. Whether you need to fix your droning, improve your peeks, or master an operator, we cover it all."] },
      { heading: "VoD Reviews: Deep Gameplay Analysis", paragraphs: ["Upload your recorded match and one of our analysts will break it down frame by frame — identifying every mistake, missed opportunity, and rotation error that's costing you wins."] },
      { heading: "Play & Learn: In-Match Mentorship", paragraphs: ["Our most popular coaching format. A pro joins your lobby and coaches you live during the actual match, pointing out exactly what to do at every moment. Real feedback, real improvement."] },
    ],
  };

  return (
    <div className="service-configurator relative min-h-screen font-sans">
      {toastMessage && (
        <div
          role={toastType === "error" ? "alert" : "status"}
          aria-live="polite"
          className="fixed top-4 right-4 z-[100] flex items-start gap-3 rounded-xl bg-[#1a1a1a] border border-white/10 px-4 py-3 shadow-2xl max-w-sm"
        >
          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${toastType === "success" ? "bg-emerald-500/20" : "bg-pink-500/20"}`}>
            {toastType === "success"
              ? <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
              : <span className="text-pink-400 font-bold text-sm">!</span>}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-white text-sm">{toastType === "success" ? "Coupon Applied" : "Coupon Not Found"}</p>
            <p className="text-xs text-zinc-400">{toastMessage}</p>
          </div>
          <button type="button" aria-label="Dismiss notification" onClick={() => setToastMessage(null)} className="text-zinc-400 hover:text-white transition cursor-pointer">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      )}

      <div className="service-page-background pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="absolute inset-y-0 right-0 top-0 w-[70vw] min-w-[900px] opacity-25">
          <Image
            src="/r6-background.png"
            alt=""
            fill
            loading="eager"
            sizes="(max-width: 1280px) 900px, 70vw"
            className="object-contain object-right-top"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-[#050607] via-[#050607]/78 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050607]" />
      </div>

      {/* Sub-nav */}
      <div className="fixed left-0 right-0 top-16 z-40 overflow-hidden border-b border-white/[0.07] bg-[#050607]/90 backdrop-blur-xl">
        <div className="mx-auto flex w-full max-w-[1550px] items-center justify-between px-3 py-2 sm:px-7">
          <div className="service-subnav flex min-w-0 flex-1 items-center gap-2 overflow-x-auto">
            <Link href="/en/rainbow-six-siege-boost" className="rounded-full px-4 py-1 text-sm text-zinc-400 transition hover:text-white">Overview</Link>
            <Link href="/en/rainbow-six-siege-boost/rainbow-six-siege-rank-boost" className="rounded-full px-4 py-1 text-sm text-zinc-400 transition hover:text-white">Boosting</Link>
            <span aria-current="page" className="rounded-full bg-white/12 px-4 py-1.5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">E-learning</span>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1550px] px-4 py-8 pt-32 sm:px-6 sm:pt-36">
        <ServiceIntro
          title="Rainbow Six Siege E-Learning"
          description="Choose a coaching package and session length, then set your platform and preferences."
        />

        <div className="grid min-w-0 gap-6 2xl:grid-cols-[250px_minmax(0,1fr)_320px]">

          {/* Left sidebar */}
          <aside className="order-3 min-w-0 space-y-4 2xl:order-1">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              <p className="text-sm font-semibold text-white">Private coaching</p>
              <p className="mt-1 text-sm leading-6 text-zinc-400">
                Choose the format, focus, and session length that suit you.
              </p>
            </div>

            {/* Service nav */}
            <div className="space-y-2">
              {R6_SERVICE_BUTTONS.map((item) => {
                const isActive = item.id === "elearning";
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`block w-full rounded-2xl border px-4 py-3.5 text-sm font-medium transition ${
                      isActive
                        ? "border-cyan-500/40 bg-gradient-to-r from-cyan-500/10 to-cyan-600/10 text-cyan-300"
                        : "border-white/10 bg-[#0d0d0d] text-zinc-300 hover:bg-white/[0.04] hover:border-white/20"
                    }`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </div>

            {/* Trustpilot */}
            <div className="flex items-center justify-center gap-2 rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center text-sm font-bold text-white shadow-lg shadow-emerald-500/20">
              Rated 4.9+
              <span className="flex items-center gap-0.5">
                {[0, 1, 2, 3, 4].map((i) => (
                  <Image key={i} src="/trustpilot-custom-star.webp" alt="" width={20} height={20}  className="h-5 w-5" />
                ))}
              </span>
            </div>
          </aside>

          {/* Main content */}
          <main className="order-1 min-w-0 space-y-8 2xl:order-2">
            {/* Service type cards */}
            <section>
              <div className="grid gap-4 md:grid-cols-3">
                {SERVICE_TYPES.map((s) => {
                  const isSelected = selectedService === s.id;
                  return (
                    <button
                      key={s.id}
                      type="button"
                      aria-pressed={isSelected}
                      title={s.tooltip}
                      onClick={() => handleSelectService(s.id)}
                      className={`group overflow-hidden rounded-lg border bg-[var(--surface)] text-left transition-[background-color,border-color,transform] duration-150 ${
                        isSelected
                          ? "border-[var(--line-strong)]"
                          : "border-[var(--line)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-hover)]"
                      }`}
                    >
                      <div className="relative h-44 overflow-hidden border-b border-[var(--line)] bg-[#050505]">
                        <Image
                          src={s.image}
                          alt={s.title}
                          fill
                          loading="eager"
                          sizes="(max-width: 767px) 100vw, 33vw"
                          className={`transition-transform duration-300 group-hover:scale-[1.03] ${
                            s.id === "play-learn" ? "object-contain p-3" : "object-cover"
                          }`}
                        />
                        <span
                          className="absolute left-3 top-3 rounded-md border border-white/20 px-2.5 py-1 text-xs font-semibold"
                          style={{ background: "rgba(0, 0, 0, 0.72)", color: "#ffffff" }}
                        >
                          Available now
                        </span>
                        <span
                          aria-hidden="true"
                          className="absolute right-3 top-3 flex h-6 w-6 items-center justify-center rounded-full border"
                          style={{
                            borderColor: isSelected ? "#ffffff" : "rgba(255,255,255,0.5)",
                            background: isSelected ? "#ffffff" : "rgba(0,0,0,0.5)",
                          }}
                        >
                          {isSelected && <span className="h-2 w-2 rounded-full bg-black" />}
                        </span>
                      </div>
                      <div className="p-4">
                        <h3 className="text-lg font-semibold text-[var(--foreground)]">{s.title}</h3>
                        <p className="mt-1.5 min-h-10 text-sm leading-5 text-[var(--muted)]">{s.desc}</p>
                        <p className="mt-4 text-xl font-semibold text-[var(--foreground)]">
                          £{s.price.toFixed(2)}{" "}
                          <span className="text-sm font-normal text-[var(--muted)]">per {s.unit}</span>
                        </p>
                      </div>
                    </button>
                  );
                })}
              </div>
            </section>

            {/* Quantity */}
            <section>
              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-6">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/8 to-cyan-700/4" />
                <div className="relative z-10">
                  {/* Header row */}
                  <div className="mb-6 flex items-center gap-5">
                    <Image src="/hours-glass-coaching.png" alt="Hours" width={96} height={96}  className="h-24 w-24 shrink-0 object-contain drop-shadow-[0_0_16px_rgba(34,211,238,0.35)]" />
                    <div>
                      <h2 className="text-2xl font-extrabold tracking-tight text-white">{activeService.unitLabel}</h2>
                      <p className="mt-1 text-base font-medium text-cyan-400">{activeService.unitSub}</p>
                    </div>
                  </div>
                  {/* Slider row */}
                  <div className="flex items-center gap-4">
                    <span className="w-4 shrink-0 text-sm font-semibold text-zinc-400">1</span>
                    <input
                      aria-label={`${activeService.unitLabel} quantity`}
                      type="range"
                      min={1}
                      max={10}
                      value={quantity}
                      onChange={(e) => setQuantity(parseInt(e.target.value))}
                      className="h-2 flex-1 cursor-pointer appearance-none rounded-full [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-cyan-400 [&::-webkit-slider-thumb]:shadow-[0_0_8px_rgba(34,211,238,0.7)]"
                      style={{
                        background: `linear-gradient(to right, rgb(34,211,238) 0%, rgb(34,211,238) ${
                          ((quantity - 1) / 9) * 100
                        }%, rgba(255,255,255,0.12) ${
                          ((quantity - 1) / 9) * 100
                        }%, rgba(255,255,255,0.12) 100%)`,
                      }}
                    />
                    <span className="w-5 shrink-0 text-right text-sm font-semibold text-zinc-400">10</span>
                    <div className="ml-2 flex h-12 w-16 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-zinc-900">
                      <input
                        aria-label={`${activeService.unitLabel} quantity`}
                        type="number"
                        min={1}
                        max={10}
                        value={quantity}
                        onChange={(e) => {
                          const v = parseInt(e.target.value);
                          if (!isNaN(v)) setQuantity(Math.min(10, Math.max(1, v)));
                        }}
                        className="h-full w-full bg-transparent text-center text-lg font-bold text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Platform */}
            <section>
              <h3 className="mb-4 text-2xl font-semibold text-[var(--foreground)]">Select Platform</h3>
              <PlatformSelector platforms={platforms} value={platform} onChange={setPlatform} />
            </section>

            {/* Server */}
            <section>
              <label className="mb-2 block text-sm font-semibold text-white">Server</label>
              <div className="relative">
                <select value={server} onChange={(e) => setServer(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-3.5 pr-12 text-white outline-none transition hover:border-white/20 focus:border-white/20 cursor-pointer appearance-none">
                  {servers.map((o) => <option key={o} value={o} className="bg-[#0a0a0a] text-white">{o}</option>)}
                </select>
                <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-zinc-400">▾</span>
              </div>
            </section>

            {/* Add-ons */}
            <section className="pt-4">
              <div className="mb-6 flex items-center gap-4">
                <h3 className="text-2xl font-semibold text-[var(--foreground)]">Customize</h3>
                <div className="h-px flex-1 bg-[var(--line)]" />
              </div>
              <div className="grid gap-4 lg:grid-cols-3">
                <div className="space-y-4">
                  {addOnCard("Express Start", "+20%", express, setExpress, "Your session is prioritized and starts within 5 minutes.")}
                  {addOnCard("VIP Priority", "+50%", vipPriority, setVipPriority, "Your booking jumps to the front of the queue and gets assigned immediately.")}
                </div>
                <div className="space-y-4">
                  {addOnCard("Elite 0.01% Coach", "+50%", eliteTier, setEliteTier, "Your session will be handled by one of our top 0.01% highest-rated coaches.")}
                  {addOnCard("Custom Focus Area", "+10%", customFocus, setCustomFocus, "Specify your weak points and the coach will tailor the entire session around them.")}
                </div>
                <div className="space-y-4">
                  {addOnCard("Streaming", "+£9.00", streaming, setStreaming, "Watch or re-watch your session live via a private stream link.")}
                  {addOnCard("Recorded Session", "+15%", recordedSession, setRecordedSession, "Receive a full recording of your coaching session to review later.")}
                </div>
              </div>
            </section>
          </main>

          {/* Right sidebar — summary */}
          <aside className="order-2 h-fit min-w-0 rounded-3xl border border-white/10 bg-black/50 p-6 backdrop-blur-sm shadow-lg shadow-cyan-500/10 2xl:order-3 2xl:sticky 2xl:top-6">
            {/* Summary header */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="pr-1 text-2xl font-semibold text-[var(--foreground)]">Summary</h3>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <span>~ {Math.max(1, quantity)}h</span>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
              </div>
            </div>

            {/* Solo/Duo toggle */}
            <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.03] p-1">
              <div className="relative grid grid-cols-2 gap-1">
                <div className={`absolute inset-y-0 w-[calc(50%-2px)] rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-600 transition-transform duration-300 ease-out ${queueType === "Duo" ? "translate-x-[calc(100%+4px)]" : "translate-x-0"}`} />
                <button onClick={() => setQueueType("Solo")} className={`relative z-10 flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold transition-colors duration-300 ${queueType === "Solo" ? "text-black" : "text-zinc-400"}`}>
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                  Solo
                </button>
                <button onClick={() => setQueueType("Duo")} className={`relative z-10 flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold transition-colors duration-300 ${queueType === "Duo" ? "text-black" : "text-zinc-400"}`}>
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                  Duo
                </button>
              </div>
            </div>

            {queueType === "Duo" && (
              <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Image src="/booster.png" alt="Booster" width={80} height={80}  className="h-20 w-20 object-contain" />
                  <div className="flex-1">
                    <span className="font-semibold text-white text-sm">Extra Coach</span>
                    <p className="text-xs text-zinc-400">Increase to add more coaches</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" aria-label="Remove an extra coach" onClick={() => setDuoBoosterCount(Math.max(1, duoBoosterCount - 1))} className="flex h-10 w-16 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-xl hover:bg-cyan-500/30 active:scale-95 transition cursor-pointer">−</button>
                  <div className="flex-1 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 h-10">
                    <input aria-label="Number of extra coaches" type="number" min={1} max={4} value={duoBoosterCount}
                      onChange={(e) => { const v = parseInt(e.target.value); if (!isNaN(v)) setDuoBoosterCount(Math.min(4, Math.max(1, v))); }}
                      className="w-full h-full bg-transparent text-center text-white font-semibold text-lg outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <button type="button" aria-label="Add an extra coach" onClick={() => setDuoBoosterCount(Math.min(4, duoBoosterCount + 1))} className="flex h-10 w-16 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-xl hover:bg-cyan-500/30 active:scale-95 transition cursor-pointer">+</button>
                </div>
              </div>
            )}

            {/* Order details */}
            <div className="space-y-3 border-b border-white/10 pb-5 text-sm text-zinc-300">
              <div className="flex justify-between">
                <span>{quantity} {activeService.unitLabel}</span>
              </div>
              <div className="flex justify-between"><span>{server}</span><span className="font-semibold">FREE</span></div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <PlatformLogo platform={platform} size={18} />
                  {platform.toUpperCase()}
                </span>
                <span className="font-semibold">{platform === "PC" ? "FREE" : "20%"}</span>
              </div>
            </div>

            {/* Specific booster + promo */}
            <div className="space-y-3 border-b border-white/10 py-5">
              <button onClick={() => setSpecificBooster(!specificBooster)}
                className="flex w-full items-center justify-between rounded-xl bg-[#111] px-4 py-3 cursor-pointer hover:bg-[#161616] transition">
                <span className="flex items-center gap-3 font-semibold text-white">
                  <Image src="/booster.png" alt="Booster" width={36} height={36}  className="h-9 w-9 object-contain" />
                  Specific Coach
                </span>
                <svg className={`h-5 w-5 text-zinc-400 transition-transform duration-200 ${specificBooster ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              {specificBooster && (
                <div className="rounded-xl bg-[#111] px-4 py-3 text-sm text-zinc-400 leading-relaxed">
                  Your session will be assigned to a specific coach of your choice.
                </div>
              )}
              <div>
                <button onClick={() => setPromoExpanded(!promoExpanded)}
                  className="flex w-full items-center justify-between rounded-xl bg-[#111] px-4 py-3 cursor-pointer hover:bg-[#161616] transition">
                  <div className="flex items-center gap-3">
                    <Image src="/coupon.png" alt="" width={40} height={60}  className="h-10 w-auto object-contain opacity-90" />
                    <span className="font-semibold text-white">Apply Promo Code</span>
                  </div>
                  <span className="text-zinc-400 text-lg">{promoExpanded ? "−" : "+"}</span>
                </button>
                {promoExpanded && (
                  <div className="mt-2 rounded-xl bg-[#111] px-4 py-3">
                    <div className="flex gap-2">
                      <input aria-label="Promo code" value={promoCode} onChange={(e) => setPromoCode(e.target.value)} placeholder="Enter Coupon"
                        className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none placeholder:text-zinc-500 focus:border-cyan-400 transition" />
                      <button onClick={handleApplyPromo} className="shrink-0 rounded-lg bg-cyan-500/15 px-4 py-2.5 font-semibold text-cyan-400 hover:bg-cyan-500/25 transition cursor-pointer">Apply</button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Totals */}
            <div className="space-y-3 py-5 border-b border-white/10">
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 flex items-center gap-3 text-sm">
                <Image src="/coupon.png" alt="" width={40} height={60}  className="h-[60px] w-auto object-contain opacity-95" />
                <span className="text-cyan-300">
                  {hasExtraDiscount ? "Extra 3% discount unlocked on your order" : `Add £${amountToExtraDiscount.toFixed(2)} more to save an extra 3%`}
                </span>
              </div>
              <div className="flex justify-between text-sm text-zinc-400">
                <span>Extra Discount</span>
                <span className="font-semibold text-cyan-400">{extraDiscountPercent > 0 ? `-${extraDiscountPercent}%` : "0%"}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold text-white">Total Amount</span>
                <span className="flex items-center gap-2">
                  {discount > 0 && <span className="text-zinc-500 line-through text-xs">£{subtotal.toFixed(2)}</span>}
                  <span className="text-lg font-bold text-white">£{total.toFixed(2)}</span>
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-zinc-400">Cashback</span>
                <span className="flex items-center gap-1 text-zinc-300"><span className="text-yellow-400">💰</span> £ 0.00</span>
              </div>
            </div>

            <button onClick={handleCheckout} disabled={checkoutLoading}
              className="relative z-10 w-full rounded-2xl bg-cyan-500 px-5 py-4 text-lg font-bold text-black cursor-pointer hover:bg-cyan-400 transition-colors duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-wait">
              {checkoutLoading ? "Redirecting..." : `Checkout (£${total.toFixed(2)})`}
            </button>

            <p className="mt-3 text-center text-[10px] leading-4 text-zinc-500">
              By placing an order at <span className="text-zinc-300 font-medium">proboost.gg</span>{" "}
              you&apos;re agreeing to our{" "}
              <Link href="/terms" className="underline hover:text-zinc-300 transition">Terms of Use</Link>
              {" "}and{" "}
              <Link href="/privacy" className="underline hover:text-zinc-300 transition">Privacy Policy</Link>
            </p>

            <div className="mt-6">
              <div className="rounded-xl bg-[#111] p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Image src="/icons/ssl.png" alt="Secure" width={24} height={24}  className="h-6 w-6 object-contain" />
                  <div>
                    <p className="font-bold text-white text-xs">Safe & Secure Payments</p>
                    <p className="text-[10px] text-zinc-400">100% secure checkout powered by Stripe & PayPal</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {paymentMethods.map((m) => (
                    <Image key={m.name} src={m.icon} alt={m.name} width={28} height={28}  className="h-6 w-auto object-contain" />
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-8 2xl:ml-[274px] 2xl:pr-[344px]">
          <TrustSection copy={trustCopy} />
        </div>
        <div className="2xl:ml-[274px] 2xl:pr-[344px]">
          <FaqSection copy={faqCopy} />
          <InfoSection copy={infoCopy} />
        </div>
      </div>

      {/* Why we're cheaper modal */}
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 backdrop-blur-md" onClick={() => setShowDetails(false)}>
          <div role="dialog" aria-modal="true" aria-label="Pricing breakdown" className="relative mx-4 w-full max-w-2xl rounded-2xl border border-white/[0.08] bg-[#111315] p-8 shadow-[0_40px_100px_rgba(0,0,0,0.8)]" onClick={(e) => e.stopPropagation()}>
            <button type="button" aria-label="Close pricing breakdown" onClick={() => setShowDetails(false)} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/10 text-zinc-500 hover:text-white transition cursor-pointer">
              <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" className="h-3.5 w-3.5"><path d="M3 3l10 10M13 3L3 13"/></svg>
            </button>
            <p className="mb-1.5 text-center text-[10px] font-bold uppercase tracking-[0.25em] text-cyan-400/60">Pricing breakdown</p>
            <h2 className="mb-8 text-center text-xl font-black text-white">Why we&apos;re cheaper than the rest</h2>
            <div className="grid grid-cols-3 gap-3">
              <div className="flex flex-col rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10">
                  <svg className="h-5 w-5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="10"/><path d="M15 9a3 3 0 00-6 0c0 3 6 3 6 6a3 3 0 01-6 0"/><path d="M12 6v1M12 17v1"/></svg>
                </div>
                <div className="mb-1 text-3xl font-black text-cyan-400">10%</div>
                <div className="mb-1 text-sm font-bold text-white">Our platform fee</div>
                <p className="text-xs leading-relaxed text-zinc-500">Coaches keep 90% of earnings — they&apos;re motivated to deliver their best every session.</p>
              </div>
              <div className="flex flex-col rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                <div className="mb-4 flex gap-0.5">
                  {[0,1,2,3,4].map(i => (
                    <Image key={i} src="/trustpilot-custom-star.webp" alt="" width={20} height={20}  className="h-5 w-5" />
                  ))}
                </div>
                <div className="mb-1 text-3xl font-black text-emerald-400">4.9/5</div>
                <div className="mb-1 text-sm font-bold text-white">Average rating</div>
                <p className="text-xs leading-relaxed text-zinc-500">Verified reviews from real customers — quality you can see before you buy.</p>
              </div>
              <div className="flex flex-col rounded-xl border border-white/[0.06] bg-white/[0.02] p-5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10">
                  <svg className="h-5 w-5 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M12 2l3 7h7l-5.5 4 2 7L12 16l-6.5 4 2-7L2 9h7z"/></svg>
                </div>
                <div className="mb-1 text-3xl font-black text-emerald-400">~35%</div>
                <div className="mb-1 text-sm font-bold text-white">Cheaper on average</div>
                <p className="text-xs leading-relaxed text-zinc-500">Same top-tier coaches, no middlemen, no inflated prices.</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
