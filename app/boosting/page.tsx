"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TrustSection from "../components/TrustSection";
import FaqSection from "../components/FaqSection";
import InfoSection from "../components/InfoSection";

type Rank = {
  name: string;
  color: string;
  icon: string;
};

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
      onClick={() => setEnabled(!enabled)}
      className={`flex h-7 w-14 items-center rounded-full p-1 transition-colors duration-200 ${
        enabled ? "bg-gradient-to-r from-cyan-400 to-cyan-600" : "bg-zinc-700"
      }`}
    >
      <div
        className={`h-5 w-5 rounded-full bg-white shadow-md transition-transform duration-200 ease-out ${
          enabled ? "translate-x-7" : ""
        }`}
      />
    </button>
  );
}

function AffiliateIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="4" cy="4" r="1.4" />
      <circle cx="12" cy="4" r="1.4" />
      <circle cx="8" cy="12" r="1.4" />
      <path d="M5.2 5.1l1.8 5.4M10.8 5.1L9 10.5M5.4 4h5.2" />
    </svg>
  );
}

export default function ProBoostCalculator() {
  const seasonStart = Date.parse("2026-03-03T14:00:00Z");
  const seasonEnd = Date.parse("2026-06-03T14:00:00Z");

  const [discountEnd] = React.useState(() => {
    const end = new Date();
    end.setHours(end.getHours() + 10, end.getMinutes() + 5, end.getSeconds() + 40);
    return end.getTime();
  });

  const computeTimeLeft = (target: number) => {
    const diff = Math.max(0, target - Date.now());
    return {
      days: Math.floor(diff / 86400000),
      hours: Math.floor((diff % 86400000) / 3600000),
      minutes: Math.floor((diff % 3600000) / 60000),
      seconds: Math.floor((diff % 60000) / 1000),
    };
  };

  const [discountTime, setDiscountTime] = React.useState(() => computeTimeLeft(discountEnd));
  const [seasonTime, setSeasonTime] = React.useState(() => computeTimeLeft(seasonEnd));

  React.useEffect(() => {
    const interval = setInterval(() => {
      setDiscountTime(computeTimeLeft(discountEnd));
      setSeasonTime(computeTimeLeft(seasonEnd));
    }, 1000);
    return () => clearInterval(interval);
  }, [discountEnd, seasonEnd]);

  const seasonDaysLeft = seasonTime.days + (seasonTime.hours > 0 || seasonTime.minutes > 0 || seasonTime.seconds > 0 ? 1 : 0);
  const seasonDuration = Math.max(seasonEnd - seasonStart, 1);
  const seasonProgress = Math.min(
    Math.max((Date.now() - seasonStart) / seasonDuration, 0),
    1,
  );
  const circumference = 2 * Math.PI * 18;
  const seasonDashoffset = circumference * (1 - seasonProgress);

  const formatTime = (num: number) => String(num).padStart(2, "0");

  const getBoosterCount = () => {
    const now = new Date();
    const seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
    const slot = Math.floor((now.getHours() * 60 + now.getMinutes()) / 144);
    const hash = ((seed * 9301 + slot * 49297) % 233280) / 233280;
    return Math.floor(hash * 41) + 80;
  };

  const [boosterCount, setBoosterCount] = React.useState(getBoosterCount);

  React.useEffect(() => {
    const interval = setInterval(() => setBoosterCount(getBoosterCount()), 60000);
    return () => clearInterval(interval);
  }, []);

  const ranks: Rank[] = [
    {
      name: "Copper",
      color: "from-orange-500/15 to-orange-700/5",
      icon: "/ranks/rank_1.webp",
    },
    {
      name: "Bronze",
      color: "from-amber-500/15 to-amber-700/5",
      icon: "/ranks/rank_2.webp",
    },
    {
      name: "Silver",
      color: "from-zinc-300/15 to-zinc-500/5",
      icon: "/ranks/rank_3.webp",
    },
    {
      name: "Gold",
      color: "from-yellow-400/15 to-yellow-600/5",
      icon: "/ranks/rank_4.webp",
    },
    {
      name: "Platinum",
      color: "from-cyan-400/15 to-cyan-600/5",
      icon: "/ranks/rank_5.webp",
    },
    {
      name: "Emerald",
      color: "from-emerald-400/15 to-emerald-600/5",
      icon: "/ranks/rank_6.webp",
    },
    {
      name: "Diamond",
      color: "from-violet-400/15 to-violet-600/5",
      icon: "/ranks/rank_7.webp",
    },
    {
      name: "Champion",
      color: "from-pink-500/15 to-pink-700/5",
      icon: "/ranks/rank_8.webp",
    },
  ];

  const divisions = ["V", "IV", "III", "II", "I"] as const;
  const platforms = ["PC", "Xbox", "PlayStation"] as const;
  const servers = [
    "Europe",
    "North America",
    "Latin America",
    "Asia",
    "Oceania",
    "Brazil",
    "Middle East",
    "Japan",
    "South Korea",
  ] as const;
  const paymentMethods = [
    { name: "PayPal", icon: "/payments/paypal.webp" },
    { name: "Mastercard", icon: "/payments/mastercard.webp" },
    { name: "Visa", icon: "/payments/visa.webp" },
    { name: "Google Pay", icon: "/payments/gpay.webp" },
    { name: "Apple Pay", icon: "/payments/apay.webp" },
    { name: "American Express", icon: "/payments/americanexpress.webp" },
    { name: "UnionPay", icon: "/payments/unionpay.webp" },
    { name: "JCB", icon: "/payments/jcb.webp" },
  ];
  const rpOptions = [
    "1/10 RP",
    "11/20 RP",
    "21/30 RP",
    "31/40 RP",
    "41/50 RP",
    "51/60 RP",
    "61/70 RP",
    "71/80 RP",
    "81/90 RP",
    "90+ RP",
  ] as const;

  const flattenRank = (rankName: string, division: string) => {
    const rankIndex = ranks.findIndex((r) => r.name === rankName);
    const divisionIndex = divisions.findIndex((d) => d === division);
    return rankIndex * divisions.length + divisionIndex;
  };

  const [queueType, setQueueType] = React.useState<"Solo" | "Duo">("Solo");
  const [duoBoosterCount, setDuoBoosterCount] = React.useState(1);
  const [currentRank, setCurrentRank] = React.useState("Copper");
  const [currentDivision, setCurrentDivision] = React.useState<string>("V");
  const [desiredRank, setDesiredRank] = React.useState("Diamond");
  const [desiredDivision, setDesiredDivision] = React.useState<string>("V");
  const [platform, setPlatform] = React.useState<string>("PC");
  const [server, setServer] = React.useState<string>("Europe");
  const [rpGain, setRpGain] = React.useState<string>("71/80 RP");

  const [specificBooster, setSpecificBooster] = React.useState(false);
  const [playOffline, setPlayOffline] = React.useState(false);
  const [specificOperators, setSpecificOperators] = React.useState(false);
  const [streaming, setStreaming] = React.useState(false);
  const [express, setExpress] = React.useState(false);
  const [highKillCount, setHighKillCount] = React.useState(false);
  const [oneTrickPony, setOneTrickPony] = React.useState(false);
  const [rankInsurance, setRankInsurance] = React.useState(false);
  const [vipPriority, setVipPriority] = React.useState(false);
  const [insaneClipDrop, setInsaneClipDrop] = React.useState(false);
  const [eliteTier, setEliteTier] = React.useState(false);

  const [promoCode, setPromoCode] = React.useState("");
  const [promoExpanded, setPromoExpanded] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const [toastType, setToastType] = React.useState<"error" | "success">("error");

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "WELCOME6") {
      setToastType("success");
      setToastMessage(selectedLang === "it" ? "Coupon applicato con successo! Hai ottenuto il 6% di sconto." : selectedLang === "fr" ? "Coupon appliqué avec succès ! Vous avez obtenu 6% de réduction." : selectedLang === "es" ? "¡Cupón aplicado correctamente! Has obtenido un 6% de descuento." : selectedLang === "de" ? "Coupon erfolgreich angewendet! Du hast 6% Rabatt erhalten." : selectedLang === "nl" ? "Coupon succesvol toegepast! Je hebt 6% korting gekregen." : selectedLang === "pt" ? "Cupom aplicado com sucesso! Você recebeu 6% de desconto." : selectedLang === "uk" ? "Купон успішно застосовано! Ви отримали знижку 6%." : selectedLang === "ru" ? "Купон успешно применен! Вы получили скидку 6%." : "Coupon applied successfully! You got 6% off.");
      setTimeout(() => setToastMessage(null), 4000);
    } else {
      setToastType("error");
      setToastMessage(selectedLang === "it" ? "Coupon non trovato, contatta il supporto." : selectedLang === "fr" ? "Coupon introuvable, veuillez contacter le support." : selectedLang === "es" ? "Cupón no encontrado, contacta con soporte." : selectedLang === "de" ? "Coupon nicht gefunden, bitte kontaktiere den Support." : selectedLang === "nl" ? "Coupon niet gevonden, neem contact op met support." : selectedLang === "pt" ? "Cupom não encontrado, entre em contato com o suporte." : selectedLang === "uk" ? "Купон не знайдено, зверніться до підтримки." : selectedLang === "ru" ? "Купон не найден, обратитесь в поддержку." : "Ops, coupon not found, please contact support.");
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const currentValue = flattenRank(currentRank, currentDivision);
  const desiredValue = flattenRank(desiredRank, desiredDivision);
  const safeDesiredValue = Math.max(desiredValue, currentValue + 1);
  const steps = safeDesiredValue - currentValue;

  const rpMultiplierMap: Record<string, number> = {
    "1/10 RP": 1.35,
    "11/20 RP": 1.25,
    "21/30 RP": 1.15,
    "31/40 RP": 1.1,
    "41/50 RP": 1.05,
    "51/60 RP": 1,
    "61/70 RP": 0.95,
    "71/80 RP": 0.9,
    "81/90 RP": 0.85,
    "90+ RP": 0.8,
  };

  const basePerStep = queueType === "Solo" ? 4.35 : 5.65 * (1 + (duoBoosterCount - 1) * 0.25);
  const platformMultiplier = platform === "PC" ? 1 : 1.2;
  const rpMultiplier = rpMultiplierMap[rpGain] ?? 1;
  const boosterFee = specificBooster ? 7.5 : 0;

  let subtotal = steps * basePerStep * platformMultiplier * rpMultiplier + boosterFee;

  if (streaming) subtotal += 9;

  let multiplier = 1;
  if (express) multiplier += 0.2;
  if (highKillCount) multiplier += 0.4;
  if (oneTrickPony) multiplier += 0.3;
  if (rankInsurance) multiplier += 0.5;
  if (vipPriority) multiplier += 0.5;
  if (insaneClipDrop) multiplier += 0.15;
  if (eliteTier) multiplier += 0.5;

  subtotal *= multiplier;

  const promoDiscount =
    promoCode.trim().toUpperCase() === "WELCOME6" ? subtotal * 0.06 : 0;
  const extraDiscountThreshold = 50;
  const hasExtraDiscount = subtotal >= extraDiscountThreshold;
  const extraDiscount = hasExtraDiscount ? subtotal * 0.03 : 0;
  const discount = promoDiscount + extraDiscount;
  const extraDiscountPercent = (promoDiscount > 0 ? 6 : 0) + (hasExtraDiscount ? 3 : 0);
  const amountToExtraDiscount = Math.max(0, extraDiscountThreshold - subtotal);

  const total = Math.max(0, subtotal - discount);

  const isDesiredRankDisabled = (rankName: string) =>
    flattenRank(rankName, "I") <= currentValue;

  const isDesiredDivisionDisabled = (division: string) =>
    flattenRank(desiredRank, division) <= currentValue;

  const rankCard = (selected: boolean, disabled: boolean) =>
    `group rounded-2xl border p-3 transition-all duration-200 ease-out cursor-pointer ${
      disabled
        ? "border-white/10 bg-white/[0.02] text-zinc-500 opacity-60 cursor-not-allowed"
        : selected
        ? "border-cyan-400/60 bg-gradient-to-br from-cyan-400/20 to-cyan-600/10 shadow-lg shadow-cyan-500/30 scale-[1.02]"
        : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05] hover:shadow-md hover:shadow-white/5 hover:scale-[1.01]"
    }`;

  const pillButton = (selected: boolean, disabled = false) =>
    `rounded-xl border px-4 py-3 text-sm font-semibold transition-all duration-200 ease-out cursor-pointer ${
      disabled
        ? "border-white/10 bg-white/[0.02] text-zinc-500 opacity-60 cursor-not-allowed"
        : selected
        ? "border-cyan-400/60 bg-gradient-to-r from-cyan-400/20 to-cyan-600/20 text-white shadow-lg shadow-cyan-500/25"
        : "border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/[0.05] hover:border-white/20"
    }`;

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
              : tag === annotations.free || tag === localizedAnnotations.en.free
              ? "border-emerald-500/30 bg-emerald-500/10 text-emerald-400"
              : "border-orange-500/30 bg-orange-500/10 text-orange-400"
          }`}>
            {tag}
          </span>
        </div>
        <Toggle enabled={enabled} setEnabled={setEnabled} />
      </div>
    </div>
  );

  const currentRankData = ranks.find((r) => r.name === currentRank);
  const desiredRankData = ranks.find((r) => r.name === desiredRank);

  const rankTextColorMap: Record<string, string> = {
    "Copper": "text-orange-400",
    "Bronze": "text-amber-400",
    "Silver": "text-zinc-300",
    "Gold": "text-yellow-400",
    "Platinum": "text-cyan-400",
    "Emerald": "text-emerald-400",
    "Diamond": "text-violet-400",
    "Champion": "text-pink-400",
  };

  const [checkoutLoading, setCheckoutLoading] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);

  const languages = [
    { code: "en", name: "English", flag: "us" },
    { code: "it", name: "Italiano", flag: "it" },
    { code: "fr", name: "Français", flag: "fr" },
    { code: "es", name: "Español", flag: "es" },
    { code: "de", name: "Deutsch", flag: "de" },
    { code: "nl", name: "Nederlands", flag: "nl" },
    { code: "pt", name: "Português", flag: "pt" },
    { code: "uk", name: "Українська", flag: "ua" },
    { code: "ru", name: "Русский", flag: "ru" },
  ];
  const [selectedLang, setSelectedLang] = React.useState("en");
  const [langOpen, setLangOpen] = React.useState(false);
  const langRef = React.useRef<HTMLDivElement>(null);

  const englishAddOns = {
    playOffline: { title: "Play Offline", desc: "The Booster will appear offline during the progression of the order, to ensure maximum safety." },
    express: { title: "Express Delivery", desc: "Your order will be prioritized and completed faster than standard delivery." },
    rankInsurance: { title: "Rank Insurance", desc: "Stay secure at your new rank. Your boost ends with extra wins added as a buffer, so you don't risk dropping back down right away." },
    eliteTier: { title: "Elite 0.01% Tier", desc: "Your boost will be handled by one of our top 0.01% highest-rated boosters." },
    specificOperators: { title: "Specific Operators", desc: "Choose which operators the booster will play during your boost session." },
    highKillCount: { title: "High Kill Count", desc: "The booster will focus on achieving a high number of kills each game for better stats." },
    vipPriority: { title: "VIP Priority", desc: "Your order jumps to the front of the queue and gets assigned to a booster immediately." },
    streaming: { title: "Streaming", desc: "Watch your boost live via a private stream link so you can follow every game in real time." },
    oneTrickPony: { title: "One Trick Pony", desc: "The booster will play only one specific operator of your choice for the entire boost." },
    insaneClipDrop: { title: "Insane Clip Drop", desc: "Receive highlight clips of the best plays and kills from your boost sessions." },
  };
  const englishTrustFeatures = [
    { title: "Money-Back Guarantee", desc: "Your satisfaction is our promise - if we don't deliver, you get a full refund. No questions asked." },
    { title: "Zero-Ban Protection", desc: "100% safe boosting with advanced VPN routes and real players only - zero bots, zero risks." },
    { title: "Fair & Transparent Pricing", desc: "Top-tier quality at honest prices - you pay for real performance, not empty promises." },
    { title: "The World's Strongest Players", desc: "Every booster is verified, ranked, and battle-tested - elite talent that guarantees results." },
    { title: "24/7 Live Support", desc: "We're always online to assist you - instant updates, real people, real help anytime." },
  ];

  const localizedUi = {
    en: {
      onlineBoosters: "Online Boosters",
      login: "Log In",
      affiliateProgram: "Affiliate Program",
      membership: "Membership",
      answersHub: "Answers Hub",
      workWithUs: "Work with us",
      contact: "Contact",
      overview: "Overview",
      boosting: "Boosting",
      eLearning: "E-learning",
      boosters: "Boosters",
      heroTitle: "Rainbow Six Siege Rank Boost",
      heroDesc: "Take your gameplay to the next level! Dominate the battlegrounds of Rainbow 6 Siege with our expert boosters. Experience the thrill of victory as you climb the ranks and outplay your opponents. Unlock your true potential and become a true champion in Rainbow 6 Siege!",
      badges: ["SSL Secure", "VPN", "Safe Service", "24/7 Support", "Money Refunds", "Cashback"],
      seasonName: "Year 11 Season 1 — Operation Silent Hunt",
      daysLeft: "DAYS LEFT",
      serviceButtons: ["Rank Boost", "Champion Rank Boost", "Competitive Wins", "Unrated Matches"],
      rated: "Rated 4.9+",
      discountTitle: "Limited-Time Discount for the Same Elite Experience",
      discountSubtitle: "Trusted by top players and built for a premium, polished experience.",
      discountEnds: "Discount Ends In",
      currentRank: "Current Rank",
      desiredRank: "Desired Rank",
      selectPlatform: "Select Platform",
      summary: "Summary",
      policyTitle: "Estimated Starting Time Policy",
      policyLine1: "The delivery time displayed is an",
      policyHighlight1: "estimate based on average completion times",
      policyLine2: "Actual delivery or starting time may vary depending on factors such as",
      policyHighlight2: ["order volume", "customer response times", "booster availability"],
      policyLine3: "We appreciate your understanding and will do our best to meet your expectations promptly.",
      solo: "Solo",
      duo: "Duo",
      specificBooster: "Specific Booster",
      specificBoosterDesc: "Your boost will be assigned to a specific booster of your choice.",
      applyPromo: "Apply Promo Code",
      enterCoupon: "Enter Coupon",
      apply: "Apply",
      trustHeading: "Why Players Trust ProBoost",
      faqLabel: "FAQs",
      infoHeadings: [
        "Rank Higher & Win More Games!",
        "Pick Your Own Booster!",
        "The Easiest Way To Boost Your RP",
        "Cut Down the Loss Ratio with R6 Boosting",
        "Fast & Simple Rainbow Six Siege Boosting Services",
        "The Most Secure R6 Boosting",
        "Benefits of Rainbow Six Siege Boosting",
        "Your Satisfaction Is Important To Us",
      ],
    },
    it: { onlineBoosters: "Booster online", login: "Accedi", affiliateProgram: "Programma Affiliazione", membership: "Abbonamento", answersHub: "Centro Risposte", workWithUs: "Lavora con noi", contact: "Contatti", overview: "Panoramica", boosting: "Boosting", eLearning: "E-learning", boosters: "Booster", heroTitle: "Boost Rank Rainbow Six Siege", heroDesc: "Porta il tuo gameplay al livello successivo con i nostri booster esperti e scala i rank più velocemente.", badges: ["SSL Sicuro", "VPN", "Servizio Sicuro", "Supporto 24/7", "Rimborsi", "Cashback"], seasonName: "Anno 11 Stagione 1 — Operation Silent Hunt", daysLeft: "GIORNI RIMASTI", serviceButtons: ["Boost Rank", "Boost Champion", "Vittorie Competitive", "Partite Unrated"], rated: "Valutato 4.9+", discountTitle: "Sconto Limitato per la Stessa Esperienza Elite", discountSubtitle: "Scelto dai migliori giocatori per un servizio premium.", discountEnds: "Lo sconto termina tra", currentRank: "Rank Attuale", desiredRank: "Rank Desiderato", selectPlatform: "Seleziona Piattaforma", summary: "Riepilogo", policyTitle: "Politica Tempi Stimati", policyLine1: "Il tempo mostrato è una", policyHighlight1: "stima basata sui tempi medi di completamento", policyLine2: "I tempi effettivi possono variare in base a", policyHighlight2: ["volume ordini", "tempi di risposta del cliente", "disponibilità booster"], policyLine3: "Faremo del nostro meglio per soddisfare rapidamente il tuo ordine.", solo: "Solo", duo: "Duo", specificBooster: "Booster Specifico", specificBoosterDesc: "Il tuo ordine verrà assegnato a un booster specifico scelto da te.", applyPromo: "Applica Codice Promo", enterCoupon: "Inserisci Coupon", apply: "Applica", trustHeading: "Perché i giocatori scelgono ProBoost", faqLabel: "FAQ", infoHeadings: ["Sali di Rank e Vinci di Più!", "Scegli il Tuo Booster!", "Il modo più facile per aumentare i tuoi RP", "Riduci le sconfitte con il boosting R6", "Servizi di boosting semplici e veloci", "Il boosting R6 più sicuro", "Vantaggi del boosting Rainbow Six Siege", "La tua soddisfazione è importante"] },
    fr: { onlineBoosters: "Boosters en ligne", login: "Connexion", affiliateProgram: "Affiliation", membership: "Adhésion", answersHub: "Centre d'aide", workWithUs: "Travaillez avec nous", contact: "Contact", overview: "Aperçu", boosting: "Boosting", eLearning: "E-learning", boosters: "Boosters", heroTitle: "Boost de rang Rainbow Six Siege", heroDesc: "Passez au niveau supérieur avec nos boosters experts et grimpez plus vite dans les rangs.", badges: ["SSL sécurisé", "VPN", "Service sûr", "Support 24/7", "Remboursements", "Cashback"], seasonName: "Année 11 Saison 1 — Operation Silent Hunt", daysLeft: "JOURS RESTANTS", serviceButtons: ["Boost de rang", "Boost Champion", "Victoires classées", "Matchs non classés"], rated: "Noté 4.9+", discountTitle: "Réduction limitée pour la même expérience premium", discountSubtitle: "Choisi par les meilleurs joueurs pour une expérience soignée.", discountEnds: "La réduction se termine dans", currentRank: "Rang actuel", desiredRank: "Rang désiré", selectPlatform: "Choisir la plateforme", summary: "Résumé", policyTitle: "Politique de délai estimé", policyLine1: "Le délai affiché est une", policyHighlight1: "estimation basée sur les temps moyens", policyLine2: "Le délai réel peut varier selon", policyHighlight2: ["volume de commandes", "temps de réponse client", "disponibilité des boosters"], policyLine3: "Nous ferons le maximum pour répondre rapidement à votre commande.", solo: "Solo", duo: "Duo", specificBooster: "Booster spécifique", specificBoosterDesc: "Votre commande sera assignée au booster de votre choix.", applyPromo: "Appliquer un code promo", enterCoupon: "Entrer le coupon", apply: "Appliquer", trustHeading: "Pourquoi les joueurs font confiance à ProBoost", faqLabel: "FAQ", infoHeadings: ["Montez de rang et gagnez plus !", "Choisissez votre booster !", "Le moyen le plus simple d'augmenter vos RP", "Réduisez vos défaites avec le boosting R6", "Services de boosting rapides et simples", "Le boosting R6 le plus sûr", "Avantages du boosting Rainbow Six Siege", "Votre satisfaction est importante"] },
    es: { onlineBoosters: "Boosters en línea", login: "Iniciar sesión", affiliateProgram: "Programa de afiliados", membership: "Membresía", answersHub: "Centro de ayuda", workWithUs: "Trabaja con nosotros", contact: "Contacto", overview: "Resumen", boosting: "Boosting", eLearning: "E-learning", boosters: "Boosters", heroTitle: "Boost de rango Rainbow Six Siege", heroDesc: "Lleva tu nivel al siguiente escalón con nuestros boosters expertos y sube de rango más rápido.", badges: ["SSL Seguro", "VPN", "Servicio Seguro", "Soporte 24/7", "Reembolsos", "Cashback"], seasonName: "Año 11 Temporada 1 — Operation Silent Hunt", daysLeft: "DÍAS RESTANTES", serviceButtons: ["Boost de rango", "Boost Champion", "Victorias competitivas", "Partidas no clasificadas"], rated: "Valorado 4.9+", discountTitle: "Descuento limitado para la misma experiencia elite", discountSubtitle: "Elegido por los mejores jugadores para una experiencia premium.", discountEnds: "El descuento termina en", currentRank: "Rango actual", desiredRank: "Rango deseado", selectPlatform: "Seleccionar plataforma", summary: "Resumen", policyTitle: "Política de tiempo estimado", policyLine1: "El tiempo mostrado es una", policyHighlight1: "estimación basada en tiempos promedio", policyLine2: "El tiempo real puede variar según", policyHighlight2: ["volumen de pedidos", "tiempos de respuesta del cliente", "disponibilidad del booster"], policyLine3: "Haremos todo lo posible para cumplir tu pedido rápidamente.", solo: "Solo", duo: "Duo", specificBooster: "Booster específico", specificBoosterDesc: "Tu boost será asignado al booster específico que elijas.", applyPromo: "Aplicar código promo", enterCoupon: "Introducir cupón", apply: "Aplicar", trustHeading: "Por qué los jugadores confían en ProBoost", faqLabel: "FAQ", infoHeadings: ["¡Sube de rango y gana más!", "¡Elige tu booster!", "La forma más fácil de aumentar tus RP", "Reduce las derrotas con R6 Boosting", "Servicios de boosting rápidos y simples", "El boosting R6 más seguro", "Beneficios del boosting Rainbow Six Siege", "Tu satisfacción es importante"] },
    de: { onlineBoosters: "Booster online", login: "Anmelden", affiliateProgram: "Partnerprogramm", membership: "Mitgliedschaft", answersHub: "Hilfecenter", workWithUs: "Arbeite mit uns", contact: "Kontakt", overview: "Übersicht", boosting: "Boosting", eLearning: "E-Learning", boosters: "Booster", heroTitle: "Rainbow Six Siege Rank Boost", heroDesc: "Steige mit unseren Experten schneller im Rang auf und dominiere mehr Matches.", badges: ["SSL Sicher", "VPN", "Sicherer Service", "24/7 Support", "Rückerstattung", "Cashback"], seasonName: "Jahr 11 Saison 1 — Operation Silent Hunt", daysLeft: "TAGE ÜBRIG", serviceButtons: ["Rank Boost", "Champion Boost", "Gewertete Siege", "Unrated-Matches"], rated: "Bewertet mit 4.9+", discountTitle: "Zeitlich begrenzter Rabatt für dieselbe Elite-Erfahrung", discountSubtitle: "Von Top-Spielern gewählt für ein hochwertiges Erlebnis.", discountEnds: "Rabatt endet in", currentRank: "Aktueller Rang", desiredRank: "Gewünschter Rang", selectPlatform: "Plattform wählen", summary: "Zusammenfassung", policyTitle: "Richtlinie zur geschätzten Startzeit", policyLine1: "Die angezeigte Zeit ist eine", policyHighlight1: "Schätzung auf Basis durchschnittlicher Abschlusszeiten", policyLine2: "Die tatsächliche Zeit kann variieren durch", policyHighlight2: ["Bestellvolumen", "Antwortzeiten des Kunden", "Booster-Verfügbarkeit"], policyLine3: "Wir geben unser Bestes, deine Bestellung schnell zu erfüllen.", solo: "Solo", duo: "Duo", specificBooster: "Spezifischer Booster", specificBoosterDesc: "Dein Auftrag wird einem Booster deiner Wahl zugewiesen.", applyPromo: "Promo-Code anwenden", enterCoupon: "Coupon eingeben", apply: "Anwenden", trustHeading: "Warum Spieler ProBoost vertrauen", faqLabel: "FAQ", infoHeadings: ["Steige höher und gewinne mehr!", "Wähle deinen Booster!", "Der einfachste Weg, deine RP zu erhöhen", "Weniger Niederlagen mit R6 Boosting", "Schnelle und einfache Boosting-Services", "Das sicherste R6 Boosting", "Vorteile von Rainbow Six Siege Boosting", "Deine Zufriedenheit ist wichtig"] },
    nl: { onlineBoosters: "Boosters online", login: "Inloggen", affiliateProgram: "Affiliateprogramma", membership: "Lidmaatschap", answersHub: "Helpcentrum", workWithUs: "Werk met ons", contact: "Contact", overview: "Overzicht", boosting: "Boosting", eLearning: "E-learning", boosters: "Boosters", heroTitle: "Rainbow Six Siege Rank Boost", heroDesc: "Til je gameplay naar een hoger niveau met onze expert-boosters en klim sneller in rank.", badges: ["SSL Beveiligd", "VPN", "Veilige Service", "24/7 Support", "Terugbetalingen", "Cashback"], seasonName: "Jaar 11 Seizoen 1 — Operation Silent Hunt", daysLeft: "DAGEN OVER", serviceButtons: ["Rank Boost", "Champion Boost", "Competitieve Wins", "Unrated Wedstrijden"], rated: "Beoordeeld 4.9+", discountTitle: "Tijdelijke korting voor dezelfde elite-ervaring", discountSubtitle: "Vertrouwd door topspelers voor een premium ervaring.", discountEnds: "Korting eindigt over", currentRank: "Huidige rank", desiredRank: "Gewenste rank", selectPlatform: "Selecteer platform", summary: "Samenvatting", policyTitle: "Beleid geschatte starttijd", policyLine1: "De getoonde tijd is een", policyHighlight1: "schatting op basis van gemiddelde voltooiingstijden", policyLine2: "De werkelijke tijd kan variëren door", policyHighlight2: ["ordervolume", "reactietijden van klanten", "beschikbaarheid van boosters"], policyLine3: "We doen ons best om je bestelling snel af te ronden.", solo: "Solo", duo: "Duo", specificBooster: "Specifieke Booster", specificBoosterDesc: "Je boost wordt toegewezen aan een booster van jouw keuze.", applyPromo: "Promocode toepassen", enterCoupon: "Coupon invoeren", apply: "Toepassen", trustHeading: "Waarom spelers ProBoost vertrouwen", faqLabel: "FAQ", infoHeadings: ["Rank hoger en win meer!", "Kies je eigen booster!", "De makkelijkste manier om je RP te verhogen", "Verlaag je verliesratio met R6 Boosting", "Snelle en eenvoudige boostingservices", "De veiligste R6 boosting", "Voordelen van Rainbow Six Siege Boosting", "Jouw tevredenheid is belangrijk"] },
    pt: { onlineBoosters: "Boosters online", login: "Entrar", affiliateProgram: "Programa de Afiliados", membership: "Membro", answersHub: "Central de Ajuda", workWithUs: "Trabalhe conosco", contact: "Contato", overview: "Visão geral", boosting: "Boosting", eLearning: "E-learning", boosters: "Boosters", heroTitle: "Boost de rank Rainbow Six Siege", heroDesc: "Leve sua gameplay ao próximo nível com nossos boosters especialistas e suba de rank mais rápido.", badges: ["SSL Seguro", "VPN", "Serviço Seguro", "Suporte 24/7", "Reembolsos", "Cashback"], seasonName: "Ano 11 Temporada 1 — Operation Silent Hunt", daysLeft: "DIAS RESTANTES", serviceButtons: ["Boost de rank", "Boost Champion", "Vitórias competitivas", "Partidas sem rank"], rated: "Avaliado 4.9+", discountTitle: "Desconto por tempo limitado para a mesma experiência elite", discountSubtitle: "Confiado pelos melhores jogadores para uma experiência premium.", discountEnds: "Desconto termina em", currentRank: "Rank atual", desiredRank: "Rank desejado", selectPlatform: "Selecionar plataforma", summary: "Resumo", policyTitle: "Política de tempo estimado", policyLine1: "O tempo exibido é uma", policyHighlight1: "estimativa baseada no tempo médio de conclusão", policyLine2: "O tempo real pode variar por", policyHighlight2: ["volume de pedidos", "tempo de resposta do cliente", "disponibilidade do booster"], policyLine3: "Faremos o possível para concluir seu pedido rapidamente.", solo: "Solo", duo: "Duo", specificBooster: "Booster específico", specificBoosterDesc: "Seu boost será atribuído a um booster da sua escolha.", applyPromo: "Aplicar código promocional", enterCoupon: "Inserir cupom", apply: "Aplicar", trustHeading: "Por que os jogadores confiam na ProBoost", faqLabel: "FAQ", infoHeadings: ["Suba mais alto e ganhe mais!", "Escolha seu booster!", "A maneira mais fácil de aumentar seu RP", "Reduza as derrotas com R6 Boosting", "Serviços de boosting rápidos e simples", "O boosting R6 mais seguro", "Benefícios do Rainbow Six Siege Boosting", "Sua satisfação é importante"] },
    uk: { onlineBoosters: "Бустери онлайн", login: "Увійти", affiliateProgram: "Партнерська програма", membership: "Підписка", answersHub: "Центр відповідей", workWithUs: "Працюйте з нами", contact: "Контакт", overview: "Огляд", boosting: "Бустинг", eLearning: "E-learning", boosters: "Бустери", heroTitle: "Буст рангу Rainbow Six Siege", heroDesc: "Підійміть свій рівень гри з нашими досвідченими бустерами та швидше підіймайтеся в ранзі.", badges: ["SSL Захист", "VPN", "Безпечний сервіс", "Підтримка 24/7", "Повернення коштів", "Кешбек"], seasonName: "Рік 11 Сезон 1 — Operation Silent Hunt", daysLeft: "ДНІВ ЗАЛИШИЛОСЯ", serviceButtons: ["Буст рангу", "Буст Champion", "Рейтингові перемоги", "Нерейтингові матчі"], rated: "Рейтинг 4.9+", discountTitle: "Обмежена знижка на той самий преміальний сервіс", discountSubtitle: "Нас обирають топ-гравці за якісний сервіс.", discountEnds: "Знижка закінчується через", currentRank: "Поточний ранг", desiredRank: "Бажаний ранг", selectPlatform: "Виберіть платформу", summary: "Підсумок", policyTitle: "Політика орієнтовного часу старту", policyLine1: "Показаний час — це", policyHighlight1: "оцінка на основі середнього часу виконання", policyLine2: "Фактичний час може змінюватися залежно від", policyHighlight2: ["обсягу замовлень", "часу відповіді клієнта", "доступності бустерів"], policyLine3: "Ми зробимо все можливе, щоб виконати замовлення швидко.", solo: "Solo", duo: "Duo", specificBooster: "Конкретний бустер", specificBoosterDesc: "Ваше замовлення буде передано обраному вами бустеру.", applyPromo: "Застосувати промокод", enterCoupon: "Введіть купон", apply: "Застосувати", trustHeading: "Чому гравці довіряють ProBoost", faqLabel: "FAQ", infoHeadings: ["Підіймайтесь вище та вигравайте більше!", "Обирайте свого бустера!", "Найпростіший спосіб збільшити RP", "Менше поразок з R6 Boosting", "Швидкі та прості послуги бустингу", "Найбезпечніший R6 бустинг", "Переваги Rainbow Six Siege Boosting", "Ваше задоволення важливе"] },
    ru: { onlineBoosters: "Бустеры онлайн", login: "Войти", affiliateProgram: "Партнерская программа", membership: "Подписка", answersHub: "Центр ответов", workWithUs: "Работа с нами", contact: "Контакт", overview: "Обзор", boosting: "Бустинг", eLearning: "E-learning", boosters: "Бустеры", heroTitle: "Буст ранга Rainbow Six Siege", heroDesc: "Поднимите свой уровень игры с нашими опытными бустерами и быстрее повышайте ранг.", badges: ["SSL Защита", "VPN", "Безопасный сервис", "Поддержка 24/7", "Возвраты", "Кэшбэк"], seasonName: "Год 11 Сезон 1 — Operation Silent Hunt", daysLeft: "ДНЕЙ ОСТАЛОСЬ", serviceButtons: ["Буст ранга", "Буст Champion", "Рейтинговые победы", "Нерейтинговые матчи"], rated: "Рейтинг 4.9+", discountTitle: "Ограниченная скидка на тот же премиум-сервис", discountSubtitle: "Нас выбирают топ-игроки за качественный сервис.", discountEnds: "Скидка закончится через", currentRank: "Текущий ранг", desiredRank: "Желаемый ранг", selectPlatform: "Выберите платформу", summary: "Сводка", policyTitle: "Политика ориентировочного времени старта", policyLine1: "Показанное время — это", policyHighlight1: "оценка на основе среднего времени выполнения", policyLine2: "Фактическое время может зависеть от", policyHighlight2: ["объема заказов", "времени ответа клиента", "доступности бустеров"], policyLine3: "Мы сделаем все возможное, чтобы выполнить заказ как можно быстрее.", solo: "Solo", duo: "Duo", specificBooster: "Конкретный бустер", specificBoosterDesc: "Ваш заказ будет назначен выбранному вами бустеру.", applyPromo: "Применить промокод", enterCoupon: "Введите купон", apply: "Применить", trustHeading: "Почему игроки доверяют ProBoost", faqLabel: "FAQ", infoHeadings: ["Поднимайтесь выше и выигрывайте больше!", "Выберите своего бустера!", "Самый простой способ повысить RP", "Снизьте число поражений с R6 Boosting", "Быстрые и простые услуги бустинга", "Самый безопасный R6 бустинг", "Преимущества Rainbow Six Siege Boosting", "Ваше удовлетворение важно"] },
  } as const;
  const localizedAnnotations = {
    en: {
      languageMenuTitle: "Select Language",
      free: "FREE",
      details: "Details",
      day: "day",
      days: "days",
      customize: "Customize",
      competitorIntro: "This Boost would cost you around",
      couponAppliedTitle: "Coupon Applied",
      couponMissingTitle: "Coupon Not Found",
      seasonTooltip: "It is advisable not to wait until the very last moment of the season to order a Boosting service, as the last 2-5 days tend to be more crowded with orders.",
      extraBooster: "Extra Booster",
      increaseBoosters: "Increase the number to add more Boosters",
      extraBoosterTooltip: "With this option you can increase the amount of Boosters that will join your order in DUO. Each additional Booster costs 75% extra on top of the base price.",
      playWithBooster: "Play with Booster",
      oneBooster: "1 Booster",
      extraBoosterSuffix: "Extra Booster",
      extraBoosterPlural: "Extra Boosters",
      addOns: englishAddOns,
      trustFeatures: englishTrustFeatures,
    },
    it: { languageMenuTitle: "Seleziona lingua", free: "GRATIS", details: "Dettagli", day: "giorno", days: "giorni", customize: "Personalizza", competitorIntro: "Questo boost ti costerebbe circa", couponAppliedTitle: "Coupon applicato", couponMissingTitle: "Coupon non trovato", seasonTooltip: "Ti consigliamo di non aspettare l'ultimo momento della stagione per ordinare un boosting, perché gli ultimi 2-5 giorni sono più affollati.", extraBooster: "Booster Extra", increaseBoosters: "Aumenta il numero per aggiungere più Booster", extraBoosterTooltip: "Con questa opzione puoi aumentare il numero di Booster che entreranno nel tuo ordine in DUO. Ogni Booster aggiuntivo costa il 75% in più.", playWithBooster: "Gioca con il Booster", oneBooster: "1 Booster", extraBoosterSuffix: "Booster Extra", extraBoosterPlural: "Booster Extra", addOns: { playOffline: { title: "Gioca Offline", desc: englishAddOns.playOffline.desc }, express: { title: "Consegna Express", desc: englishAddOns.express.desc }, rankInsurance: { title: "Assicurazione Rank", desc: englishAddOns.rankInsurance.desc }, eliteTier: { title: "Tier Elite 0.01%", desc: englishAddOns.eliteTier.desc }, specificOperators: { title: "Operatori Specifici", desc: englishAddOns.specificOperators.desc }, highKillCount: { title: "Alto Numero di Kill", desc: englishAddOns.highKillCount.desc }, vipPriority: { title: "Priorità VIP", desc: englishAddOns.vipPriority.desc }, streaming: { title: "Streaming", desc: englishAddOns.streaming.desc }, oneTrickPony: { title: "One Trick Pony", desc: englishAddOns.oneTrickPony.desc }, insaneClipDrop: { title: "Clip Epiche", desc: englishAddOns.insaneClipDrop.desc } }, trustFeatures: [{ title: "Garanzia Rimborso", desc: englishTrustFeatures[0].desc }, { title: "Protezione Zero Ban", desc: englishTrustFeatures[1].desc }, { title: "Prezzi Trasparenti", desc: englishTrustFeatures[2].desc }, { title: "I Giocatori Più Forti", desc: englishTrustFeatures[3].desc }, { title: "Supporto Live 24/7", desc: englishTrustFeatures[4].desc }] },
    fr: { languageMenuTitle: "Choisir la langue", free: "GRATUIT", details: "Détails", day: "jour", days: "jours", customize: "Personnaliser", competitorIntro: "Ce boost vous coûterait environ", couponAppliedTitle: "Coupon appliqué", couponMissingTitle: "Coupon introuvable", seasonTooltip: "Il est conseillé de ne pas attendre la toute fin de saison pour commander, car les 2 à 5 derniers jours sont plus chargés.", extraBooster: "Booster supplémentaire", increaseBoosters: "Augmentez le nombre pour ajouter des boosters", extraBoosterTooltip: "Cette option augmente le nombre de boosters qui rejoindront votre commande en DUO. Chaque booster supplémentaire coûte 75% de plus.", playWithBooster: "Jouer avec le booster", oneBooster: "1 Booster", extraBoosterSuffix: "Booster supplémentaire", extraBoosterPlural: "Boosters supplémentaires", addOns: { playOffline: { title: "Jouer Hors Ligne", desc: englishAddOns.playOffline.desc }, express: { title: "Livraison Express", desc: englishAddOns.express.desc }, rankInsurance: { title: "Assurance Rang", desc: englishAddOns.rankInsurance.desc }, eliteTier: { title: "Tier Élite 0.01%", desc: englishAddOns.eliteTier.desc }, specificOperators: { title: "Opérateurs Spécifiques", desc: englishAddOns.specificOperators.desc }, highKillCount: { title: "Beaucoup de Kills", desc: englishAddOns.highKillCount.desc }, vipPriority: { title: "Priorité VIP", desc: englishAddOns.vipPriority.desc }, streaming: { title: "Streaming", desc: englishAddOns.streaming.desc }, oneTrickPony: { title: "One Trick Pony", desc: englishAddOns.oneTrickPony.desc }, insaneClipDrop: { title: "Clips Fous", desc: englishAddOns.insaneClipDrop.desc } }, trustFeatures: [{ title: "Garantie de remboursement", desc: englishTrustFeatures[0].desc }, { title: "Protection anti-ban", desc: englishTrustFeatures[1].desc }, { title: "Tarification transparente", desc: englishTrustFeatures[2].desc }, { title: "Les joueurs les plus forts", desc: englishTrustFeatures[3].desc }, { title: "Support live 24/7", desc: englishTrustFeatures[4].desc }] },
    es: { languageMenuTitle: "Seleccionar idioma", free: "GRATIS", details: "Detalles", day: "día", days: "días", customize: "Personalizar", competitorIntro: "Este boost te costaría alrededor de", couponAppliedTitle: "Cupón aplicado", couponMissingTitle: "Cupón no encontrado", seasonTooltip: "Se recomienda no esperar al último momento de la temporada para pedir boosting, ya que los últimos 2-5 días suelen estar más saturados.", extraBooster: "Booster extra", increaseBoosters: "Aumenta el número para añadir más boosters", extraBoosterTooltip: "Con esta opción puedes aumentar la cantidad de boosters que se unirán a tu pedido en DUO. Cada booster adicional cuesta un 75% más.", playWithBooster: "Jugar con booster", oneBooster: "1 Booster", extraBoosterSuffix: "Booster extra", extraBoosterPlural: "Boosters extra", addOns: { playOffline: { title: "Jugar Offline", desc: englishAddOns.playOffline.desc }, express: { title: "Entrega Express", desc: englishAddOns.express.desc }, rankInsurance: { title: "Seguro de Rango", desc: englishAddOns.rankInsurance.desc }, eliteTier: { title: "Tier Elite 0.01%", desc: englishAddOns.eliteTier.desc }, specificOperators: { title: "Operadores Específicos", desc: englishAddOns.specificOperators.desc }, highKillCount: { title: "Muchas Kills", desc: englishAddOns.highKillCount.desc }, vipPriority: { title: "Prioridad VIP", desc: englishAddOns.vipPriority.desc }, streaming: { title: "Streaming", desc: englishAddOns.streaming.desc }, oneTrickPony: { title: "One Trick Pony", desc: englishAddOns.oneTrickPony.desc }, insaneClipDrop: { title: "Clips Épicos", desc: englishAddOns.insaneClipDrop.desc } }, trustFeatures: [{ title: "Garantía de reembolso", desc: englishTrustFeatures[0].desc }, { title: "Protección anti-ban", desc: englishTrustFeatures[1].desc }, { title: "Precios transparentes", desc: englishTrustFeatures[2].desc }, { title: "Los mejores jugadores", desc: englishTrustFeatures[3].desc }, { title: "Soporte 24/7", desc: englishTrustFeatures[4].desc }] },
    de: { languageMenuTitle: "Sprache wählen", free: "KOSTENLOS", details: "Details", day: "Tag", days: "Tage", customize: "Anpassen", competitorIntro: "Dieser Boost würde dich etwa", couponAppliedTitle: "Coupon angewendet", couponMissingTitle: "Coupon nicht gefunden", seasonTooltip: "Es ist ratsam, nicht bis zum letzten Moment der Saison zu warten, da die letzten 2-5 Tage stärker ausgelastet sind.", extraBooster: "Extra-Booster", increaseBoosters: "Erhöhe die Zahl für mehr Booster", extraBoosterTooltip: "Mit dieser Option kannst du die Anzahl der Booster erhöhen, die deinem DUO-Auftrag beitreten. Jeder zusätzliche Booster kostet 75% extra.", playWithBooster: "Mit Booster spielen", oneBooster: "1 Booster", extraBoosterSuffix: "Extra-Booster", extraBoosterPlural: "Extra-Booster", addOns: { playOffline: { title: "Offline Spielen", desc: englishAddOns.playOffline.desc }, express: { title: "Express-Lieferung", desc: englishAddOns.express.desc }, rankInsurance: { title: "Rangversicherung", desc: englishAddOns.rankInsurance.desc }, eliteTier: { title: "Elite-Tier 0.01%", desc: englishAddOns.eliteTier.desc }, specificOperators: { title: "Spezifische Operatoren", desc: englishAddOns.specificOperators.desc }, highKillCount: { title: "Hohe Killzahl", desc: englishAddOns.highKillCount.desc }, vipPriority: { title: "VIP-Priorität", desc: englishAddOns.vipPriority.desc }, streaming: { title: "Streaming", desc: englishAddOns.streaming.desc }, oneTrickPony: { title: "One Trick Pony", desc: englishAddOns.oneTrickPony.desc }, insaneClipDrop: { title: "Clip-Highlights", desc: englishAddOns.insaneClipDrop.desc } }, trustFeatures: [{ title: "Geld-zurück-Garantie", desc: englishTrustFeatures[0].desc }, { title: "Zero-Ban-Schutz", desc: englishTrustFeatures[1].desc }, { title: "Faire Preise", desc: englishTrustFeatures[2].desc }, { title: "Die stärksten Spieler", desc: englishTrustFeatures[3].desc }, { title: "24/7 Live-Support", desc: englishTrustFeatures[4].desc }] },
    nl: { languageMenuTitle: "Taal kiezen", free: "GRATIS", details: "Details", day: "dag", days: "dagen", customize: "Aanpassen", competitorIntro: "Deze boost zou je ongeveer", couponAppliedTitle: "Coupon toegepast", couponMissingTitle: "Coupon niet gevonden", seasonTooltip: "Het is verstandig om niet tot het laatste moment van het seizoen te wachten, omdat de laatste 2-5 dagen drukker zijn.", extraBooster: "Extra Booster", increaseBoosters: "Verhoog het aantal om meer boosters toe te voegen", extraBoosterTooltip: "Met deze optie kun je het aantal boosters verhogen dat zich bij je DUO-bestelling aansluit. Elke extra booster kost 75% extra.", playWithBooster: "Speel met booster", oneBooster: "1 Booster", extraBoosterSuffix: "Extra Booster", extraBoosterPlural: "Extra Boosters", addOns: { playOffline: { title: "Offline Spelen", desc: englishAddOns.playOffline.desc }, express: { title: "Snelle Levering", desc: englishAddOns.express.desc }, rankInsurance: { title: "Rankverzekering", desc: englishAddOns.rankInsurance.desc }, eliteTier: { title: "Elite 0.01% Tier", desc: englishAddOns.eliteTier.desc }, specificOperators: { title: "Specifieke Operators", desc: englishAddOns.specificOperators.desc }, highKillCount: { title: "Hoge Kill Count", desc: englishAddOns.highKillCount.desc }, vipPriority: { title: "VIP Prioriteit", desc: englishAddOns.vipPriority.desc }, streaming: { title: "Streaming", desc: englishAddOns.streaming.desc }, oneTrickPony: { title: "One Trick Pony", desc: englishAddOns.oneTrickPony.desc }, insaneClipDrop: { title: "Clip Highlights", desc: englishAddOns.insaneClipDrop.desc } }, trustFeatures: [{ title: "Geld-terug-garantie", desc: englishTrustFeatures[0].desc }, { title: "Zero-ban-bescherming", desc: englishTrustFeatures[1].desc }, { title: "Eerlijke prijzen", desc: englishTrustFeatures[2].desc }, { title: "De sterkste spelers", desc: englishTrustFeatures[3].desc }, { title: "24/7 live support", desc: englishTrustFeatures[4].desc }] },
    pt: { languageMenuTitle: "Selecionar idioma", free: "GRÁTIS", details: "Detalhes", day: "dia", days: "dias", customize: "Personalizar", competitorIntro: "Este boost custaria cerca de", couponAppliedTitle: "Cupom aplicado", couponMissingTitle: "Cupom não encontrado", seasonTooltip: "É recomendável não esperar até o último momento da temporada para pedir boosting, porque os últimos 2-5 dias ficam mais cheios.", extraBooster: "Booster extra", increaseBoosters: "Aumente o número para adicionar mais boosters", extraBoosterTooltip: "Com esta opção você pode aumentar a quantidade de boosters que entrarão no seu pedido em DUO. Cada booster adicional custa 75% a mais.", playWithBooster: "Jogar com booster", oneBooster: "1 Booster", extraBoosterSuffix: "Booster extra", extraBoosterPlural: "Boosters extras", addOns: { playOffline: { title: "Jogar Offline", desc: englishAddOns.playOffline.desc }, express: { title: "Entrega Expressa", desc: englishAddOns.express.desc }, rankInsurance: { title: "Seguro de Rank", desc: englishAddOns.rankInsurance.desc }, eliteTier: { title: "Tier Elite 0.01%", desc: englishAddOns.eliteTier.desc }, specificOperators: { title: "Operadores Específicos", desc: englishAddOns.specificOperators.desc }, highKillCount: { title: "Muitas Kills", desc: englishAddOns.highKillCount.desc }, vipPriority: { title: "Prioridade VIP", desc: englishAddOns.vipPriority.desc }, streaming: { title: "Streaming", desc: englishAddOns.streaming.desc }, oneTrickPony: { title: "One Trick Pony", desc: englishAddOns.oneTrickPony.desc }, insaneClipDrop: { title: "Clipes Épicos", desc: englishAddOns.insaneClipDrop.desc } }, trustFeatures: [{ title: "Garantia de reembolso", desc: englishTrustFeatures[0].desc }, { title: "Proteção anti-ban", desc: englishTrustFeatures[1].desc }, { title: "Preços transparentes", desc: englishTrustFeatures[2].desc }, { title: "Os jogadores mais fortes", desc: englishTrustFeatures[3].desc }, { title: "Suporte 24/7", desc: englishTrustFeatures[4].desc }] },
    uk: { languageMenuTitle: "Оберіть мову", free: "БЕЗКОШТОВНО", details: "Деталі", day: "день", days: "дні", customize: "Налаштування", competitorIntro: "Цей буст коштував би приблизно", couponAppliedTitle: "Купон застосовано", couponMissingTitle: "Купон не знайдено", seasonTooltip: "Рекомендуємо не чекати до останнього моменту сезону, адже останні 2-5 днів зазвичай більш завантажені.", extraBooster: "Додатковий бустер", increaseBoosters: "Збільшіть число, щоб додати більше бустерів", extraBoosterTooltip: "Ця опція дозволяє збільшити кількість бустерів, які приєднаються до вашого замовлення в DUO. Кожен додатковий бустер коштує на 75% більше.", playWithBooster: "Грати з бустером", oneBooster: "1 Бустер", extraBoosterSuffix: "Додатковий бустер", extraBoosterPlural: "Додаткові бустери", addOns: { playOffline: { title: "Грати офлайн", desc: englishAddOns.playOffline.desc }, express: { title: "Експрес-доставка", desc: englishAddOns.express.desc }, rankInsurance: { title: "Страхування рангу", desc: englishAddOns.rankInsurance.desc }, eliteTier: { title: "Елітний Tier 0.01%", desc: englishAddOns.eliteTier.desc }, specificOperators: { title: "Конкретні оператори", desc: englishAddOns.specificOperators.desc }, highKillCount: { title: "Багато вбивств", desc: englishAddOns.highKillCount.desc }, vipPriority: { title: "VIP-пріоритет", desc: englishAddOns.vipPriority.desc }, streaming: { title: "Стрім", desc: englishAddOns.streaming.desc }, oneTrickPony: { title: "One Trick Pony", desc: englishAddOns.oneTrickPony.desc }, insaneClipDrop: { title: "Епічні кліпи", desc: englishAddOns.insaneClipDrop.desc } }, trustFeatures: [{ title: "Гарантія повернення", desc: englishTrustFeatures[0].desc }, { title: "Захист від бану", desc: englishTrustFeatures[1].desc }, { title: "Прозорі ціни", desc: englishTrustFeatures[2].desc }, { title: "Найсильніші гравці", desc: englishTrustFeatures[3].desc }, { title: "Підтримка 24/7", desc: englishTrustFeatures[4].desc }] },
    ru: { languageMenuTitle: "Выберите язык", free: "БЕСПЛАТНО", details: "Подробнее", day: "день", days: "дней", customize: "Настроить", competitorIntro: "Этот буст обошелся бы примерно на", couponAppliedTitle: "Купон применен", couponMissingTitle: "Купон не найден", seasonTooltip: "Рекомендуем не ждать до самого конца сезона, потому что последние 2-5 дней обычно более загружены.", extraBooster: "Доп. бустер", increaseBoosters: "Увеличьте число, чтобы добавить больше бустеров", extraBoosterTooltip: "С этой опцией вы можете увеличить количество бустеров, которые присоединятся к вашему заказу в DUO. Каждый дополнительный бустер стоит на 75% дороже.", playWithBooster: "Играть с бустером", oneBooster: "1 Бустер", extraBoosterSuffix: "Доп. бустер", extraBoosterPlural: "Доп. бустеры", addOns: { playOffline: { title: "Играть офлайн", desc: englishAddOns.playOffline.desc }, express: { title: "Экспресс-доставка", desc: englishAddOns.express.desc }, rankInsurance: { title: "Страховка ранга", desc: englishAddOns.rankInsurance.desc }, eliteTier: { title: "Элитный Tier 0.01%", desc: englishAddOns.eliteTier.desc }, specificOperators: { title: "Конкретные операторы", desc: englishAddOns.specificOperators.desc }, highKillCount: { title: "Высокий K/D", desc: englishAddOns.highKillCount.desc }, vipPriority: { title: "VIP-приоритет", desc: englishAddOns.vipPriority.desc }, streaming: { title: "Стрим", desc: englishAddOns.streaming.desc }, oneTrickPony: { title: "One Trick Pony", desc: englishAddOns.oneTrickPony.desc }, insaneClipDrop: { title: "Эпичные клипы", desc: englishAddOns.insaneClipDrop.desc } }, trustFeatures: [{ title: "Гарантия возврата", desc: englishTrustFeatures[0].desc }, { title: "Защита от бана", desc: englishTrustFeatures[1].desc }, { title: "Прозрачные цены", desc: englishTrustFeatures[2].desc }, { title: "Сильнейшие игроки", desc: englishTrustFeatures[3].desc }, { title: "Поддержка 24/7", desc: englishTrustFeatures[4].desc }] },
  } as const;
  const ui = { ...localizedUi.en, ...(localizedUi[selectedLang as keyof typeof localizedUi] ?? {}) };
  const annotations = { ...localizedAnnotations.en, ...(localizedAnnotations[selectedLang as keyof typeof localizedAnnotations] ?? {}) };
  const trustCopy = {
    heading: ui.trustHeading,
    features: [...(annotations.trustFeatures ?? localizedAnnotations.en.trustFeatures)],
  };
  const faqCopy = {
    label: ui.faqLabel,
    items: [
      {
        q: selectedLang === "en" ? "What is Rainbow Six Siege Boosting?" : ui.heroTitle,
        a: "In Rainbow Six Siege, Boosting is the process by which a player can increase their Rank thanks to the help of professional players called Boosters. These Boosters can play with the player's account or team up with them via the DuoQ option.",
      },
      {
        q: selectedLang === "en" ? "Do I need to share my account for a Rainbow Six Siege Rank Boost?" : ui.specificBooster,
        a: "For Solo boosting, you will share your account credentials with your booster. For Duo boosting, you play alongside your booster so no account sharing is required.",
      },
      {
        q: selectedLang === "en" ? "Will you speak to my friends/use voice chat?" : ui.contact,
        a: "Our boosters are professional and discreet. They will not engage in voice chat or communicate with your friends list beyond what is necessary.",
      },
      {
        q: selectedLang === "en" ? "How much time it takes to deliver my Rank Boost?" : ui.policyTitle,
        a: "Delivery time depends on your current and target rank. On average, each rank step takes approximately 2–3 hours.",
      },
      {
        q: selectedLang === "en" ? "Is Rainbow Six Siege Boosting safe?" : ui.badges[2],
        a: "Yes. ProBoost uses only real, verified players - no bots, no scripts. All boosters connect via VPN to match your region and reduce detection risk.",
      },
    ],
  };
  const infoCopy = {
    sections: [
      {
        heading: ui.infoHeadings[0],
        paragraphs: [
          "In Tom Clancy's Rainbow Six Siege, many factors come into play. Knowing the maps, operators, weapons, gadgets, and different play styles can be very complicated. The game puts heavy emphasis on environmental destruction and cooperation between players. But our boosters are professionals. Their game knowledge will lead to a high win rate on your account.",
        ],
      },
      {
        heading: ui.infoHeadings[1],
        paragraphs: [
          "Are you curious who is going to play with you? Our R6 boosters are professional players that have been playing since 2015 when the game was released. So things like new patches, updates, or map changes do not affect our boosting process; adapting is part of our job.",
          "We do not differentiate our customers based on their requirements. We do not have a problem with boosting a player's RP on a PC or a console. Our boosters are here to help you achieve your desired rank.",
        ],
      },
      {
        heading: ui.infoHeadings[2],
        paragraphs: [
          "Anyone can get hardstuck, and the best way to overcome this is to purchase our R6 Boosting. For our professional Rainbow Six Siege players, boosting is just a walk in the park.",
          "We boost from Copper V to Champion. If you are struggling to get to Diamond, we have you covered.",
        ],
      },
      {
        heading: ui.infoHeadings[3],
        paragraphs: [
          "Our Rainbow Six Siege Boosting is provided by top boosters with an average win rate above 90%. We guarantee strong results in the shortest time possible.",
        ],
      },
      {
        heading: ui.infoHeadings[4],
        paragraphs: [
          "Starting your Rainbow Six Siege boost is simple. Fill out the order details, choose a payment method, and provide the credentials inside our Members Area. Then one of our boosters will take control of the account until your request is complete.",
        ],
      },
      {
        heading: ui.infoHeadings[5],
        paragraphs: [
          "When it comes to safety, we take great care of your personal information. We do not use cheats or external programs to achieve results, and our boost remains completely safe.",
        ],
        bullets: [
          "We use VPN protection to keep you safe.",
          "Your account details are used only by our boosters.",
          "Your privacy is our number one priority.",
        ],
      },
      {
        heading: ui.infoHeadings[6],
        paragraphs: ["We have several options to customise your order and enjoy the Siege boosting service even more."],
        benefits: [
          { title: "Live Streaming", desc: "Watch your booster reach the desired rank live." },
          { title: "DuoQ", desc: "Play with your booster while they use an alternate account." },
          { title: "High Kill Count", desc: "Improve how your account looks in every lobby." },
          { title: "Specific Operators", desc: "Choose operators to improve KD on selected picks." },
          { title: "Booster VIP", desc: "VIP boosters deliver the fastest and most reliable service." },
        ],
      },
      {
        heading: ui.infoHeadings[7],
        paragraphs: [
          "After purchasing our service, you become part of the ProBoost community. Rank up quickly, save time, learn new tactics, and enjoy stronger teammates.",
        ],
      },
    ],
  };

  React.useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const competitorSavings = total * 0.35;
  const competitorPrice = total + competitorSavings;

  const handleCheckout = async () => {
    setCheckoutLoading(true);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
        total,
        currentRank,
        currentDivision,
        desiredRank,
        desiredDivision,
        server,
        platform,
        rpGain,
      }),
      });

      const data = await res.json();

      if (data.url) {
        window.location.href = data.url;
      } else {
        alert("Stripe session failed: " + (data.error || "Unknown error"));
        setCheckoutLoading(false);
      }
    } catch (err) {
      alert("Checkout error: " + (err instanceof Error ? err.message : "Unknown error"));
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="relative text-white font-sans">
      {/* Toast notification */}
      {toastMessage && (
        <div className="fixed top-4 right-4 z-[100] flex items-start gap-3 rounded-xl bg-[#1a1a1a] border border-white/10 px-4 py-3 shadow-2xl max-w-sm">
          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${toastType === "success" ? "bg-emerald-500/20" : "bg-pink-500/20"}`}>
            {toastType === "success" ? (
              <svg className="h-4 w-4 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
            ) : (
              <span className="text-pink-400 font-bold text-sm">$</span>
            )}
          </div>
          <div className="flex-1">
            <p className="font-semibold text-white text-sm">{toastType === "success" ? annotations.couponAppliedTitle : annotations.couponMissingTitle}</p>
            <p className="text-xs text-zinc-400">{toastMessage}</p>
          </div>
          <button onClick={() => setToastMessage(null)} className="text-zinc-400 hover:text-white transition cursor-pointer">
            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12"/></svg>
          </button>
        </div>
      )}
      {/* gradient overlays */}
      <div className="pointer-events-none fixed inset-0 z-0">
        <div className="absolute inset-y-0 right-[-10vw] top-0 w-[70vw] min-w-[900px] bg-[url('/r6-background.png')] bg-right-top bg-no-repeat opacity-25 [background-size:auto_100%]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-[#050505]/78 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#050505]" />
      </div>

      <div className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#050505]/58 backdrop-blur-xl">
        <div className="mx-auto max-w-[1550px] px-7">
          {/* Main nav row */}
          <div className="flex h-[72px] items-center justify-between gap-6">
            {/* Left: logo + game chip + boosters */}
            <div className="flex items-center gap-3 xl:gap-5">
              <Link href="/" aria-label="Go to homepage" className="shrink-0">
                <Image
                  src="/logo.png"
                  alt="ProBoost"
                  width={160}
                  height={48}
                  priority
                  unoptimized
                  className="h-[52px] w-auto object-contain xl:h-16"
                />
              </Link>

              {/* Game selector chip */}
              <button className="hidden sm:flex h-[56px] items-center gap-3 rounded-[30px] border border-cyan-400/30 bg-[radial-gradient(circle_at_84%_50%,rgba(249,115,22,0.22),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] px-4 pr-5 text-[15px] font-semibold text-white shadow-[0_0_0_1px_rgba(8,145,178,0.06),0_12px_30px_rgba(0,0,0,0.28)] transition hover:border-cyan-300/45 hover:bg-[radial-gradient(circle_at_84%_50%,rgba(249,115,22,0.28),transparent_18%),linear-gradient(180deg,rgba(255,255,255,0.055),rgba(255,255,255,0.025))]">
                <span className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-full border border-cyan-300/70 bg-cyan-400/10 shadow-[0_0_0_2px_rgba(8,145,178,0.18)_inset,0_0_20px_rgba(34,211,238,0.18)]">
                  <Image src="/icons/r6-icon.webp" alt="" width={44} height={44} unoptimized className="h-full w-full scale-[1.18] object-cover" />
                </span>
                <span className="whitespace-nowrap tracking-[-0.01em]">Rainbow Six Siege X</span>
                <svg className="h-4 w-4 text-zinc-400" viewBox="0 0 16 16" fill="none">
                  <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Online boosters */}
              <div className="hidden md:flex items-center gap-3 rounded-full pl-1 pr-2 text-zinc-400">
                <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/6">
                  <span className="absolute inline-flex h-8 w-8 rounded-full bg-cyan-400/8 animate-ping" style={{ animationDuration: '2s' }} />
                  <svg className="relative h-4.5 w-4.5 text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M8.5 8.5a5 5 0 0 0 0 7" />
                    <path d="M5 5a9.5 9.5 0 0 0 0 14" />
                    <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                    <path d="M19 5a9.5 9.5 0 0 1 0 14" />
                    <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
                  </svg>
                </span>
                <div className="leading-none">
                  <span className="block text-[14px] font-bold text-white">{boosterCount}</span>
                  <span className="mt-1 block text-[11px] text-zinc-500">{ui.onlineBoosters}</span>
                </div>
              </div>
            </div>

            {/* Right: nav links + flag + login */}
            <div className="flex items-center gap-2">
              <div className="hidden lg:flex items-center gap-1 text-[13px] text-zinc-400 mr-2 xl:gap-2">
                {[
                  { label: ui.affiliateProgram, icon: <AffiliateIcon /> },
                  {
                    label: ui.membership,
                    icon: (
                      <Image
                        src="/icons/membership-icon-filled2.svg"
                        alt=""
                        width={14}
                        height={14}
                        className="h-3.5 w-3.5 object-contain"
                      />
                    ),
                  },
                  {
                    label: ui.answersHub,
                    icon: (
                      <Image
                        src="/icons/book-icon.svg"
                        alt=""
                        width={14}
                        height={14}
                        className="h-3.5 w-3.5 object-contain"
                      />
                    ),
                  },
                  {
                    label: ui.workWithUs,
                    icon: (
                      <Image
                        src="/icons/hooded-icon.svg"
                        alt=""
                        width={14}
                        height={14}
                        className="h-3.5 w-3.5 object-contain"
                      />
                    ),
                  },
                  {
                    label: ui.contact,
                    icon: (
                      <Image
                        src="/icons/contact-icon.svg"
                        alt=""
                        width={14}
                        height={14}
                        className="h-3.5 w-3.5 object-contain"
                      />
                    ),
                  },
                ].map((item) => (
                  <button key={item.label} className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/[0.05] hover:text-white transition whitespace-nowrap">
                    <span className="text-cyan-300/90">{item.icon}</span>
                    {item.label}
                  </button>
                ))}
              </div>

              {/* Language flag */}
              <div ref={langRef} className="relative">
                <button
                  onClick={() => setLangOpen(!langOpen)}
                  className="flex h-11 min-w-[70px] items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/[0.04] px-2.5 hover:bg-white/8 transition overflow-hidden"
                >
                  <img
                    src={`https://flagcdn.com/w40/${languages.find(l => l.code === selectedLang)?.flag}.png`}
                    alt=""
                    className="h-5 w-7 rounded-[4px] object-cover"
                  />
                  <svg className="h-3.5 w-3.5 text-zinc-400" viewBox="0 0 16 16" fill="none"><path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" /></svg>
                </button>
                {langOpen && (
                  <div className="absolute right-0 top-11 z-50 w-56 rounded-xl border border-white/15 bg-zinc-900 p-2 shadow-2xl shadow-black/50">
                    <p className="px-3 py-2 text-sm font-bold text-white">{annotations.languageMenuTitle}</p>
                    {languages.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => { setSelectedLang(lang.code); setLangOpen(false); }}
                        className={`flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition ${
                          selectedLang === lang.code
                            ? "border border-cyan-500/40 bg-cyan-500/10 text-white"
                            : "text-zinc-300 hover:bg-white/5"
                        }`}
                      >
                        <img src={`https://flagcdn.com/w40/${lang.flag}.png`} alt={lang.name} className="h-5 w-7 rounded-sm object-cover" />
                        {lang.name}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <Link href="/login" className="ml-2 inline-flex h-11 items-center rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 px-7 text-[15px] font-bold text-black hover:from-cyan-400 hover:to-cyan-300 transition shadow-lg shadow-cyan-500/20">
                {ui.login}
              </Link>
            </div>
          </div>

          {/* Sub-nav row */}
          <div className="flex items-center justify-center gap-2 border-t border-white/[0.07] py-2">
            <button className="rounded-full px-4 py-1 text-sm text-zinc-400 hover:text-white transition">{ui.overview}</button>
            <button className="rounded-full bg-white/12 px-4 py-1.5 text-sm font-medium text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">{ui.boosting}</button>
            <button className="rounded-full px-4 py-1 text-sm text-zinc-400 hover:text-white transition">{ui.eLearning}</button>
            <button className="rounded-full px-4 py-1 text-sm text-zinc-400 hover:text-white transition">{ui.boosters}</button>
          </div>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1550px] px-6 py-8 pt-36">
        <header className="mb-6">

          {/* Title + description */}
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl">
            {ui.heroTitle}
          </h1>
          <p className="mt-3 text-sm leading-6 text-zinc-400 sm:text-base">
            {ui.heroDesc}
          </p>

          {/* Trust badges */}
          <div className="mt-5 mb-5 flex flex-wrap gap-2 text-xs sm:text-sm">
            {[
              { text: ui.badges[0], icon: "/icons/ssl.png", color: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10" },
              { text: ui.badges[1], icon: "/icons/vpn.png", color: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10" },
              { text: ui.badges[2], icon: "/icons/safe-service.png", color: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10" },
              { text: ui.badges[3], icon: "/icons/24-7-support.png", color: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10" },
              { text: ui.badges[4], icon: "/icons/money-refunds.png", color: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10" },
              { text: ui.badges[5], icon: "/icons/cashback.png", color: "text-cyan-300 border-cyan-500/30 bg-cyan-500/10" }
            ].map((item) => (
              <span
                key={item.text}
                className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 ${item.color}`}
              >
                <Image src={item.icon} alt={item.text} width={22} height={22} unoptimized className="h-5 w-5 object-contain" />
                {item.text}
              </span>
            ))}
          </div>
        </header>

        <div className="grid gap-6 xl:grid-cols-[280px_1fr_320px]">
          <aside className="space-y-4">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5">
              {/* Bottom: ring + name + days left */}
              <div className="group flex items-center gap-4">
                <svg width="48" height="48" viewBox="0 0 48 48" className="shrink-0 -rotate-90">
                  <circle cx="24" cy="24" r="20" fill="none" stroke="rgba(34,211,238,0.15)" strokeWidth="4" />
                  <circle
                    cx="24" cy="24" r="20" fill="none"
                    stroke="rgb(34,211,238)"
                    strokeWidth="4"
                    strokeDasharray={2 * Math.PI * 20}
                    strokeDashoffset={2 * Math.PI * 20 * (1 - seasonProgress)}
                    strokeLinecap="round"
                    className="transition-[stroke-dashoffset] duration-1000 ease-linear"
                  />
                </svg>
                <div>
                  <p className="text-sm font-semibold text-white leading-tight">
                    {ui.seasonName}
                  </p>
                  <p className="text-sm font-bold text-cyan-400 mt-0.5">
                    {seasonDaysLeft} {ui.daysLeft}
                  </p>
                </div>
                {/* Info button — hover reveals tooltip with progress card */}
                <div className="relative ml-auto">
                  <button className="text-zinc-500 hover:text-zinc-300 transition peer">
                    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z" clipRule="evenodd" />
                    </svg>
                  </button>
                  {/* Tooltip card — visible on peer hover */}
                  <div className="pointer-events-none absolute bottom-full right-0 mb-2 w-72 rounded-2xl border border-white/10 bg-zinc-900 p-4 shadow-xl opacity-0 transition-opacity duration-200 peer-hover:opacity-100">
                    <p className="font-bold text-white text-sm leading-tight mb-3">
                      {ui.seasonName}
                    </p>
                    <div className="flex gap-[3px] mb-2">
                      {Array.from({ length: 20 }).map((_, i) => (
                        <div
                          key={i}
                          className={`h-2 flex-1 rounded-sm ${i / 20 < seasonProgress ? "bg-cyan-400" : "bg-white/10"}`}
                        />
                      ))}
                    </div>
                    <div className="flex justify-between text-[11px] text-zinc-500 mb-3">
                      <span>March 3, 2026</span>
                      <span>June 1, 2026</span>
                    </div>
                    <p className="text-xs leading-6 text-zinc-400">
                      {annotations.seasonTooltip}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-2">
              {ui.serviceButtons.map(
                (item, index) => (
                  <button
                    key={item}
                    className={`w-full rounded-xl border px-4 py-3 text-sm font-medium transition ${
                      index === 0
                        ? "border-cyan-500/40 bg-gradient-to-r from-cyan-500/20 to-cyan-600/20 text-cyan-300 shadow-lg shadow-cyan-500/20"
                        : "border-white/10 bg-white/[0.03] text-zinc-300 hover:bg-white/[0.05] hover:border-white/20"
                    }`}
                  >
                    {item}
                  </button>
                )
              )}
            </div>

            <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-4 py-3 text-center text-sm font-bold text-emerald-300 shadow-lg shadow-emerald-500/20">
              ⭐ {ui.rated}
            </div>
          </aside>

          <main className="space-y-8">
            <div className="flex items-center justify-between rounded-2xl border border-cyan-500/30 bg-gradient-to-r from-cyan-500/12 to-cyan-600/8 px-5 py-4 shadow-lg shadow-cyan-500/10">
              <div className="flex items-center gap-4">
                <Image
                  src="/coin.png"
                  alt="Savings coin"
                  width={144}
                  height={144}
                  unoptimized
                  className="h-32 w-32 shrink-0 object-contain drop-shadow-[0_0_12px_rgba(34,211,238,0.3)]"
                />
                <div>
                  <p className="font-bold text-white">{ui.discountTitle}</p>
                  <p className="text-sm text-zinc-300 mt-1">
                    {ui.discountSubtitle}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-xs text-zinc-500">{ui.discountEnds}</p>
                <p className="text-2xl font-bold text-yellow-300 tabular-nums font-mono">
                  {formatTime(discountTime.hours)}:{formatTime(discountTime.minutes)}:{formatTime(discountTime.seconds)}
                </p>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-2">
              <section
                className="relative rounded-3xl border border-white/10 bg-black/40 p-6 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${currentRankData?.color} transition-all duration-500 ease-in-out`} />
                <div className="relative z-10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="w-full flex flex-col items-start">
                    {currentRankData && (
                      <Image
                        src={currentRankData.icon}
                        alt={currentRankData.name}
                        width={56}
                        height={56}
                        unoptimized
                        className="mb-2 mx-0 drop-shadow-[0_0_16px_rgba(109,40,217,0.25)]"
                      />
                    )}
                    <h2 className="text-2xl font-extrabold text-white tracking-tight">{ui.currentRank}</h2>
                    <p className={`${rankTextColorMap[currentRank]} text-base font-medium mt-1`}>
                      {currentRank} {currentDivision}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {ranks.filter((rank) => rank.name !== "Champion").map((rank) => (
                    <button
                      key={rank.name}
                      onClick={() => setCurrentRank(rank.name)}
                      className={`${rankCard(currentRank === rank.name, false)} bg-gradient-to-br ${rank.color} aspect-square flex items-center justify-center`}
                    >
                      <div className="flex flex-col items-center justify-center">
                        <Image
                          src={rank.icon}
                          alt={rank.name}
                          width={38}
                          height={38}
                          unoptimized
                          className="h-[38px] w-[38px] object-contain mx-auto drop-shadow-[0_0_8px_rgba(255,255,255,0.12)]"
                        />
                      </div>
                    </button>
                  ))}
                </div>

                <div className="mt-4 grid grid-cols-5 gap-3">
                  {divisions.map((division) => (
                    <button
                      key={division}
                      onClick={() => setCurrentDivision(division)}
                      className={pillButton(currentDivision === division)}
                    >
                      {division}
                    </button>
                  ))}
                </div>
                </div>
              </section>

              <section
                className="relative rounded-3xl border border-white/10 bg-black/40 p-6 overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${desiredRankData?.color} transition-all duration-500 ease-in-out`} />
                <div className="relative z-10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="w-full flex flex-col items-start">
                    {desiredRankData && (
                      <Image
                        src={desiredRankData.icon}
                        alt={desiredRankData.name}
                        width={56}
                        height={56}
                        unoptimized
                        className="mb-2 mx-0 drop-shadow-[0_0_16px_rgba(109,40,217,0.25)]"
                      />
                    )}
                    <h2 className="text-2xl font-extrabold text-white tracking-tight">{ui.desiredRank}</h2>
                    <p className={`${rankTextColorMap[desiredRank]} text-base font-medium mt-1`}>
                      {desiredRank === "Champion" ? desiredRank : `${desiredRank} ${desiredDivision}`}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {ranks.map((rank) => {
                    const disabled = isDesiredRankDisabled(rank.name);
                    return (
                      <button
                        key={rank.name}
                        onClick={() => !disabled && setDesiredRank(rank.name)}
                        disabled={disabled}
                        className={`${rankCard(desiredRank === rank.name, disabled)} ${disabled ? "" : `bg-gradient-to-br ${rank.color}`} aspect-square flex items-center justify-center`}
                      >
                        <div className="flex flex-col items-center justify-center">
                          <Image
                            src={rank.icon}
                            alt={rank.name}
                            width={38}
                            height={38}
                            unoptimized
                            className="h-[38px] w-[38px] object-contain mx-auto drop-shadow-[0_0_8px_rgba(255,255,255,0.12)]"
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>

                {desiredRank !== "Champion" && (
                  <div className="mt-4 grid grid-cols-5 gap-3">
                    {divisions.map((division) => {
                      const disabled = isDesiredDivisionDisabled(division);
                      return (
                        <button
                          key={division}
                          onClick={() => !disabled && setDesiredDivision(division)}
                          disabled={disabled}
                          className={pillButton(desiredDivision === division, disabled)}
                        >
                          {division}
                        </button>
                      );
                    })}
                  </div>
                )}
                </div>
              </section>
            </div>

            <section>
              <h3 className="mb-4 text-4xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">{ui.selectPlatform}</h3>
              <div className="grid gap-4 md:grid-cols-3">
                {platforms.map((item) => (
                  <button
                    key={item}
                    onClick={() => setPlatform(item)}
                    className={`${pillButton(platform === item)} flex items-center justify-center gap-2 py-4`}
                  >
                    <span className="text-xl">
                      <Image
                        src={item === "PC" ? "/windows.png" : item === "Xbox" ? "/xbox.png" : "/playstation.png"}
                        alt={item}
                        width={24}
                        height={24}
                        unoptimized
                        className="h-6 w-6 object-contain"
                      />
                    </span>
                    {item}
                  </button>
                ))}
              </div>
            </section>

            <section className="grid gap-4 lg:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold text-white">
                  RP Gain Per Win
                </label>
                <div className="relative">
                  <select
                    value={rpGain}
                    onChange={(e) => setRpGain(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-3.5 pr-12 text-white outline-none transition hover:border-white/20 focus:border-white/20 cursor-pointer appearance-none"
                  >
                    {rpOptions.map((option) => (
                      <option key={option} value={option} className="bg-[#0a0a0a] text-white py-2">
                        {option}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-zinc-400">
                    ›
                  </span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold text-white">
                  Server
                </label>
                <div className="relative">
                  <select
                    value={server}
                    onChange={(e) => setServer(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-[#0a0a0a] px-4 py-3.5 pr-12 text-white outline-none transition hover:border-white/20 focus:border-white/20 cursor-pointer appearance-none"
                  >
                    {servers.map((option) => (
                      <option key={option} value={option} className="bg-[#0a0a0a] text-white py-2">
                        {option}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-zinc-400">
                    ›
                  </span>
                </div>
              </div>
            </section>

            <section className="pt-4">
              <div className="mb-6 flex items-center gap-4">
                <h3 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">{annotations.customize}</h3>
                <div className="flex-1 h-px bg-gradient-to-r from-cyan-500/30 to-transparent"></div>
              </div>
              <div className="grid gap-4 lg:grid-cols-3">
                <div className="space-y-4">
                  {addOnCard(annotations.addOns?.playOffline?.title ?? localizedAnnotations.en.addOns.playOffline.title, annotations.free, playOffline, setPlayOffline, annotations.addOns?.playOffline?.desc ?? localizedAnnotations.en.addOns.playOffline.desc)}
                  {addOnCard(annotations.addOns?.express?.title ?? localizedAnnotations.en.addOns.express.title, "+20%", express, setExpress, annotations.addOns?.express?.desc ?? localizedAnnotations.en.addOns.express.desc)}
                  {addOnCard(annotations.addOns?.rankInsurance?.title ?? localizedAnnotations.en.addOns.rankInsurance.title, "+50%", rankInsurance, setRankInsurance, annotations.addOns?.rankInsurance?.desc ?? localizedAnnotations.en.addOns.rankInsurance.desc)}
                  {addOnCard(annotations.addOns?.eliteTier?.title ?? localizedAnnotations.en.addOns.eliteTier.title, "+50%", eliteTier, setEliteTier, annotations.addOns?.eliteTier?.desc ?? localizedAnnotations.en.addOns.eliteTier.desc)}
                </div>

                <div className="space-y-4">
                  {addOnCard(annotations.addOns?.specificOperators?.title ?? localizedAnnotations.en.addOns.specificOperators.title, annotations.free, specificOperators, setSpecificOperators, annotations.addOns?.specificOperators?.desc ?? localizedAnnotations.en.addOns.specificOperators.desc)}
                  {addOnCard(annotations.addOns?.highKillCount?.title ?? localizedAnnotations.en.addOns.highKillCount.title, "+40%", highKillCount, setHighKillCount, annotations.addOns?.highKillCount?.desc ?? localizedAnnotations.en.addOns.highKillCount.desc)}
                  {addOnCard(annotations.addOns?.vipPriority?.title ?? localizedAnnotations.en.addOns.vipPriority.title, "+50%", vipPriority, setVipPriority, annotations.addOns?.vipPriority?.desc ?? localizedAnnotations.en.addOns.vipPriority.desc)}
                </div>

                <div className="space-y-4">
                  {addOnCard(annotations.addOns?.streaming?.title ?? localizedAnnotations.en.addOns.streaming.title, "+£10.00", streaming, setStreaming, annotations.addOns?.streaming?.desc ?? localizedAnnotations.en.addOns.streaming.desc)}
                  {addOnCard(annotations.addOns?.oneTrickPony?.title ?? localizedAnnotations.en.addOns.oneTrickPony.title, "+30%", oneTrickPony, setOneTrickPony, annotations.addOns?.oneTrickPony?.desc ?? localizedAnnotations.en.addOns.oneTrickPony.desc)}
                  {addOnCard(annotations.addOns?.insaneClipDrop?.title ?? localizedAnnotations.en.addOns.insaneClipDrop.title, "+15%", insaneClipDrop, setInsaneClipDrop, annotations.addOns?.insaneClipDrop?.desc ?? localizedAnnotations.en.addOns.insaneClipDrop.desc)}
                </div>
              </div>
            </section>
          </main>

          <aside className="h-fit rounded-3xl border border-white/10 bg-black/50 p-6 backdrop-blur-sm xl:sticky xl:top-6 shadow-lg shadow-cyan-500/10">
            <div className="mb-4 rounded-2xl border border-cyan-500/20 bg-cyan-500/10 p-4 text-sm text-zinc-300">
              <div className="flex items-center gap-3">
                <div className="min-w-0 flex-1">
                  <p>{annotations.competitorIntro}</p>
                  <p className="font-bold text-cyan-300">£{competitorSavings.toFixed(2)} more on a competitor website.</p>
                  <button
                    onClick={() => setShowDetails(true)}
                    className="mt-2 text-xs text-cyan-400 underline underline-offset-2 hover:text-cyan-300 transition cursor-pointer"
                  >
                    {annotations.details}
                  </button>
                </div>
                <Image
                  src="/coin.png"
                  alt="Savings coin"
                  width={128}
                  height={128}
                  unoptimized
                  className="h-28 w-28 shrink-0 object-contain drop-shadow-[0_0_12px_rgba(34,211,238,0.3)]"
                />
              </div>
            </div>

            <div className="mb-4 flex items-center justify-between">
              <h3 className="pr-1 text-2xl font-bold italic bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">{ui.summary}</h3>
              <div className="flex items-center gap-2 text-sm text-zinc-400">
                <span>~ {(() => { const hrs = Math.max(1, Math.round(steps * 2.33)); const d = Math.floor(hrs / 24); const h = hrs % 24; return d > 0 ? `${d} ${d > 1 ? annotations.days : annotations.day}, ${h}h` : `${h}h`; })()}</span>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <div className="group/time relative">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-black text-xs font-bold cursor-help">?</div>
                  <div className="invisible group-hover/time:visible absolute right-0 top-8 z-50 w-72 rounded-xl border border-white/10 bg-[#111] p-4 shadow-2xl text-sm">
                    <p className="font-bold text-white mb-2">{ui.policyTitle}</p>
                    <p className="text-zinc-400 mb-2">{ui.policyLine1} <span className="text-cyan-400">{ui.policyHighlight1}</span>.</p>
                    <p className="text-zinc-400 mb-2">{ui.policyLine2} <span className="text-cyan-400">{ui.policyHighlight2[0]}</span>, <span className="text-cyan-400">{ui.policyHighlight2[1]}</span>, and <span className="text-cyan-400">{ui.policyHighlight2[2]}</span>.</p>
                    <p className="text-zinc-400">{ui.policyLine3}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.03] p-1">
              <div className="relative grid grid-cols-2 gap-1">
                <div
                  className={`absolute inset-y-0 w-[calc(50%-2px)] rounded-xl bg-gradient-to-r from-cyan-400 to-cyan-600 transition-transform duration-300 ease-out ${
                    queueType === "Duo" ? "translate-x-[calc(100%+4px)]" : "translate-x-0"
                  }`}
                />
                <button
                  onClick={() => setQueueType("Solo")}
                  className={`relative z-10 flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold transition-colors duration-300 ${
                    queueType === "Solo" ? "text-black" : "text-zinc-400"
                  }`}
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.7 0 4.8-2.1 4.8-4.8S14.7 2.4 12 2.4 7.2 4.5 7.2 7.2 9.3 12 12 12zm0 2.4c-3.2 0-9.6 1.6-9.6 4.8v2.4h19.2v-2.4c0-3.2-6.4-4.8-9.6-4.8z"/></svg>
                  {ui.solo}
                </button>
                <button
                  onClick={() => setQueueType("Duo")}
                  className={`relative z-10 flex items-center justify-center gap-2 rounded-xl px-4 py-3 font-semibold transition-colors duration-300 ${
                    queueType === "Duo" ? "text-black" : "text-zinc-400"
                  }`}
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>
                  {ui.duo}
                </button>
              </div>
            </div>

            {queueType === "Duo" && (
              <div className="mb-4 rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Image src="/booster.png" alt="Booster" width={80} height={80} unoptimized className="h-20 w-20 object-contain" />
                  <div className="flex-1">
                    <span className="font-semibold text-white text-sm">{annotations.extraBooster}</span>
                    <p className="text-xs text-zinc-400">{annotations.increaseBoosters}</p>
                  </div>
                  <div className="group/boost relative">
                    <div className="flex h-5 w-5 items-center justify-center rounded-full bg-cyan-400 text-black text-xs font-bold cursor-help">?</div>
                    <div className="invisible group-hover/boost:visible absolute right-0 top-8 z-50 w-64 rounded-xl border border-white/10 bg-[#111] p-4 shadow-2xl text-sm text-zinc-400">
                      {annotations.extraBoosterTooltip}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setDuoBoosterCount(Math.max(1, duoBoosterCount - 1))}
                    className="flex h-10 w-16 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-xl hover:bg-cyan-500/30 active:scale-95 transition cursor-pointer"
                  >
                    −
                  </button>
                  <div className="flex-1 flex items-center justify-center rounded-lg border border-white/10 bg-white/5 h-10">
                    <input
                      type="number"
                      min={1}
                      max={4}
                      value={duoBoosterCount}
                      onChange={(e) => {
                        const v = parseInt(e.target.value);
                        if (!isNaN(v)) setDuoBoosterCount(Math.min(4, Math.max(1, v)));
                      }}
                      className="w-full h-full bg-transparent text-center text-white font-semibold text-lg outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                  </div>
                  <button
                    onClick={() => setDuoBoosterCount(Math.min(4, duoBoosterCount + 1))}
                    className="flex h-10 w-16 items-center justify-center rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-xl hover:bg-cyan-500/30 active:scale-95 transition cursor-pointer"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3 border-b border-white/10 pb-5 text-sm text-zinc-300">
              <div className="flex justify-between">
                <span>{currentRank} {currentDivision} &gt; {desiredRank === "Champion" ? "Champion" : `${desiredRank} ${desiredDivision}`}</span>
              </div>
              {queueType === "Duo" && (
                <>
                  <div className="flex justify-between">
                    <span>{annotations.playWithBooster}</span>
                    <span className="font-semibold">+80%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{annotations.oneBooster}</span>
                    <span className="font-semibold">{annotations.free}</span>
                  </div>
                  {duoBoosterCount > 1 && (
                    <div className="flex justify-between">
                      <span>+{duoBoosterCount - 1} {duoBoosterCount > 2 ? annotations.extraBoosterPlural : annotations.extraBoosterSuffix}</span>
                      <span className="font-semibold text-cyan-400">+{(duoBoosterCount - 1) * 75}%</span>
                    </div>
                  )}
                </>
              )}
              <div className="flex justify-between">
                <span>{rpGain}</span>
                <span className="font-semibold">{annotations.free}</span>
              </div>
              <div className="flex justify-between">
                <span>{server}</span>
                <span className="font-semibold">{annotations.free}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <Image
                    src={platform === "PC" ? "/windows.png" : platform === "Xbox" ? "/xbox.png" : "/playstation.png"}
                    alt={platform}
                    width={18}
                    height={18}
                    unoptimized
                    className="h-4.5 w-4.5 object-contain"
                  />
                  {platform.toUpperCase()}
                </span>
                <span className="font-semibold">{platform === "PC" ? annotations.free : "20%"}</span>
              </div>
            </div>

            <div className="space-y-3 border-b border-white/10 py-5">
              <button
                onClick={() => setSpecificBooster(!specificBooster)}
                className="flex w-full items-center justify-between rounded-xl bg-[#111] px-4 py-3 cursor-pointer hover:bg-[#161616] transition"
              >
                <span className="flex items-center gap-3 font-semibold text-white">
                  <Image src="/booster.png" alt="Booster" width={36} height={36} unoptimized className="h-9 w-9 object-contain" />
                  {ui.specificBooster}
                </span>
                <svg className={`h-5 w-5 text-zinc-400 transition-transform duration-200 ${specificBooster ? "rotate-180" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9l6 6 6-6"/></svg>
              </button>
              {specificBooster && (
                <div className="rounded-xl bg-[#111] px-4 py-3 text-sm text-zinc-400 leading-relaxed">
                  {ui.specificBoosterDesc}
                </div>
              )}

              <div>
                <button
                  onClick={() => setPromoExpanded(!promoExpanded)}
                  className="flex w-full items-center justify-between rounded-xl bg-[#111] px-4 py-3 cursor-pointer hover:bg-[#161616] transition"
                >
                  <div className="flex items-center gap-3">
                    <img src="/coupon.png" alt="" className="h-10 w-10 object-contain opacity-90" />
                    <span className="font-semibold text-white">{ui.applyPromo}</span>
                  </div>
                  <span className="text-zinc-400 text-lg">{promoExpanded ? "−" : "+"}</span>
                </button>
                {promoExpanded && (
                  <div className="mt-2 rounded-xl bg-[#111] px-4 py-3">
                    <div className="flex gap-2 overflow-hidden">
                      <input
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder={ui.enterCoupon}
                        className="min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-4 py-2.5 text-white outline-none placeholder:text-zinc-500 focus:border-cyan-400 transition"
                      />
                      <button onClick={handleApplyPromo} className="shrink-0 rounded-lg bg-cyan-500/15 px-4 py-2.5 font-semibold text-cyan-400 hover:bg-cyan-500/25 transition cursor-pointer">
                        {ui.apply}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3 py-5 border-b border-white/10">
              <div className="rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-3 flex items-center gap-3 text-sm">
                <img src="/coupon.png" alt="" className="h-[60px] w-[60px] object-contain opacity-95" />
                <span className="text-cyan-300">
                  {hasExtraDiscount
                    ? "Extra 3% discount unlocked on your order"
                    : `Add £${amountToExtraDiscount.toFixed(2)} more to save an extra 3% on your order`}
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
                <span className="flex items-center gap-1 text-zinc-300">
                  <span className="text-yellow-400">🪙</span> £ 0.00
                </span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={checkoutLoading}
              className="relative z-10 w-full rounded-2xl bg-cyan-500 px-5 py-4 text-lg font-bold text-black cursor-pointer hover:bg-cyan-400 transition-colors duration-200 active:scale-[0.98] disabled:opacity-60 disabled:cursor-wait"
            >
              {checkoutLoading ? "Redirecting..." : `Checkout (£${total.toFixed(2)})`}
            </button>

            <div className="mt-6">
              <div className="rounded-xl bg-[#111] p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Image src="/icons/ssl.png" alt="Secure" width={24} height={24} unoptimized className="h-6 w-6 object-contain" />
                  <div>
                    <p className="font-bold text-white text-xs">Safe & Secure Payments</p>
                    <p className="text-[10px] text-zinc-400">100% secure checkout powered by Stripe & PayPal</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {paymentMethods.map((method) => (
                    <Image
                      key={method.name}
                      src={method.icon}
                      alt={method.name}
                      width={28}
                      height={28}
                      unoptimized
                      className="h-6 w-auto object-contain"
                    />
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>

        <div className="mt-8 xl:ml-[304px] xl:pr-[344px]">
          <TrustSection copy={trustCopy} />
        </div>
        <div className="xl:ml-[304px] xl:pr-[344px]">
          <FaqSection copy={faqCopy} />
          <InfoSection copy={infoCopy} />
        </div>
      </div>
      {showDetails && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm" onClick={() => setShowDetails(false)}>
          <div className="relative mx-4 w-full max-w-4xl rounded-3xl border border-white/10 bg-[#0a0a0a] p-8 shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setShowDetails(false)}
              className="absolute right-5 top-5 text-zinc-400 hover:text-white transition text-xl cursor-pointer"
            >
              ✕
            </button>

            <h2 className="mb-8 text-center text-3xl font-extrabold text-white">
              Why we are cheaper than others?
            </h2>

            <div className="grid gap-8 md:grid-cols-3">
              {/* 1 — Commission pie chart */}
              <div className="flex flex-col items-center">
                <div className="relative mb-6 h-48 w-48">
                  <svg viewBox="0 0 100 100" className="h-full w-full -rotate-90">
                    <circle cx="50" cy="50" r="40" fill="none" stroke="rgba(34,211,238,0.15)" strokeWidth="8" />
                    <circle
                      cx="50" cy="50" r="40"
                      fill="none"
                      stroke="rgb(34,211,238)"
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 40 * 0.9} ${2 * Math.PI * 40 * 0.1}`}
                      strokeLinecap="round"
                    />
                    <circle
                      cx="50" cy="50" r="40"
                      fill="none"
                      stroke="rgb(249,115,22)"
                      strokeWidth="8"
                      strokeDasharray={`${2 * Math.PI * 40 * 0.1} ${2 * Math.PI * 40 * 0.9}`}
                      strokeDashoffset={`-${2 * Math.PI * 40 * 0.9}`}
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-3xl font-bold text-cyan-400">90%</span>
                    <span className="text-xs text-zinc-400">Booster</span>
                  </div>
                  <div className="absolute left-2 top-4 rounded-lg bg-orange-500/20 px-2 py-1 text-xs font-bold text-orange-400">
                    10%
                  </div>
                </div>
                <div className="mb-4 flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full bg-orange-500" /> Website Cut</span>
                  <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full bg-cyan-400" /> Booster&apos;s Cut</span>
                </div>
                <p className="text-xs text-zinc-500">01</p>
                <p className="mt-1 text-center font-bold text-white">Lower commissions rate.</p>
                <p className="mt-2 text-center text-xs leading-relaxed text-zinc-400">
                  We take a significantly lower commission from boosters compared to other platforms, ensuring they retain a larger portion of their earnings and stay motivated to deliver excellent service.
                </p>
              </div>

              {/* 2 — Paying what is right */}
              <div className="flex flex-col items-center">
                <div className="relative mb-6 flex h-48 w-48 items-center justify-center">
                  <div className="absolute inset-0 rounded-full border border-cyan-500/20" />
                  <div className="absolute inset-4 rounded-full border border-cyan-500/10" />
                  <svg viewBox="0 0 80 80" className="h-24 w-24 text-cyan-400">
                    <path d="M40 10 C25 10 15 25 15 35 C15 55 40 70 40 70 C40 70 65 55 65 35 C65 25 55 10 40 10Z" fill="none" stroke="currentColor" strokeWidth="2" />
                    <circle cx="40" cy="35" r="10" fill="none" stroke="currentColor" strokeWidth="2" />
                    <path d="M30 60 Q40 65 50 60" fill="none" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                  {[45, 135, 225, 315].map((deg) => (
                    <div
                      key={deg}
                      className="absolute h-5 w-5 text-orange-400"
                      style={{
                        transform: `rotate(${deg}deg) translateY(-70px)`,
                      }}
                    >
                      <svg viewBox="0 0 20 20" className="h-full w-full">
                        <ellipse cx="10" cy="10" rx="8" ry="5" fill="currentColor" opacity="0.6" />
                      </svg>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-zinc-500">02</p>
                <p className="mt-1 text-center font-bold text-white">Paying what is right.</p>
                <p className="mt-2 text-center text-xs leading-relaxed text-zinc-400">
                  We care deeply about ensuring that our boosters are paid competitively, which encourages them to consistently deliver exceptional and high-quality service for our clients.
                </p>
              </div>

              {/* 3 — Price comparison */}
              <div className="flex flex-col items-center">
                <div className="mb-6 flex h-48 items-end justify-center gap-4">
                  <div className="flex flex-col items-center">
                    <div className="flex h-32 w-28 flex-col items-center justify-center rounded-2xl border border-orange-500/40 bg-orange-500/10">
                      <Image
                        src="/coin.png"
                        alt="ProBoost coin"
                        width={80}
                        height={80}
                        unoptimized
                        className="mb-1 h-20 w-20 object-contain drop-shadow-[0_0_8px_rgba(34,211,238,0.3)]"
                      />
                      <span className="text-lg font-bold text-orange-400">£{total.toFixed(2)}</span>
                    </div>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="flex h-40 w-28 flex-col items-center justify-center rounded-2xl border border-red-500/40 bg-red-500/10 bg-[repeating-linear-gradient(135deg,transparent,transparent_4px,rgba(239,68,68,0.08)_4px,rgba(239,68,68,0.08)_8px)]">
                      <span className="mb-1 text-2xl">💀</span>
                      <span className="text-lg font-bold text-red-400">£{competitorPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                <div className="mb-4 flex items-center gap-4 text-xs">
                  <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full bg-orange-500" /> ProBoost</span>
                  <span className="flex items-center gap-1.5"><span className="inline-block h-2.5 w-2.5 rounded-full bg-red-500" /> Other websites</span>
                </div>
                <p className="text-xs text-zinc-500">03</p>
                <p className="mt-1 text-center font-bold text-white">
                  You are saving about <span className="text-emerald-400">£{competitorSavings.toFixed(2)}</span> on this boost
                </p>
                <p className="mt-2 text-center text-xs leading-relaxed text-zinc-400">
                  This boost service would cost you considerably more on competing websites, making our platform the best choice for both quality and affordability, offering you unmatched value for money.
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowDetails(false)}
              className="mt-8 mx-auto block w-full max-w-xs rounded-2xl border border-white/10 bg-white/[0.05] px-6 py-3 font-semibold text-white hover:bg-white/[0.08] transition cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}