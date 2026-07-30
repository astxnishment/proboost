export const ORDER_PLATFORMS = ["PC", "Xbox", "PlayStation"] as const;

export const ORDER_SERVERS = [
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

export const R6_SERVICE_BUTTONS = [
  {
    label: "Rank Boost",
    href: "/en/rainbow-six-siege-boost/rainbow-six-siege-rank-boost",
    id: "rank",
  },
  {
    label: "Champion Rank Boost",
    href: "/en/rainbow-six-siege-boost/champion",
    id: "champion",
  },
  {
    label: "Competitive Wins",
    href: "/en/rainbow-six-siege-boost/competitive",
    id: "competitive",
  },
  {
    label: "Unrated Matches",
    href: "/en/rainbow-six-siege-boost/unrated",
    id: "unrated",
  },
  {
    label: "E-Learning",
    href: "/en/rainbow-six-siege-boost/elearning",
    id: "elearning",
  },
] as const;

export const RP_OPTIONS = [
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

export const ORDER_PAYMENT_METHODS = [
  { name: "PayPal", icon: "/payments/paypal.webp" },
  { name: "Mastercard", icon: "/payments/mastercard.webp" },
  { name: "Visa", icon: "/payments/visa.webp" },
  { name: "Google Pay", icon: "/payments/gpay.webp" },
  { name: "Apple Pay", icon: "/payments/apay.webp" },
  { name: "American Express", icon: "/payments/americanexpress.webp" },
  { name: "UnionPay", icon: "/payments/unionpay.webp" },
  { name: "JCB", icon: "/payments/jcb.webp" },
] as const;

const PLATFORM_ICONS: Record<(typeof ORDER_PLATFORMS)[number], string> = {
  PC: "/platforms/windows-11.svg",
  Xbox: "/xbox.png",
  PlayStation: "/playstation.png",
};

export function getPlatformIcon(platform: string): string {
  return (
    PLATFORM_ICONS[platform as keyof typeof PLATFORM_ICONS] ??
    PLATFORM_ICONS.PC
  );
}
