import type { Metadata, Viewport } from "next";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import { SITE_NAME, SITE_URL } from "./lib/site";

const themeInitScript = `
  (function () {
    try {
      var saved = window.localStorage.getItem("proboost_theme");
      var theme = saved === "white" || saved === "black"
        ? saved
        : (window.matchMedia("(prefers-color-scheme: light)").matches ? "white" : "black");
      document.documentElement.dataset.theme = theme;
      document.documentElement.style.colorScheme = theme === "white" ? "light" : "dark";
    } catch (_) {
      document.documentElement.dataset.theme = "black";
      document.documentElement.style.colorScheme = "dark";
    }
  })();
`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: SITE_NAME,
  title: {
    default: "ProBoost — Rank Boosting by Verified Pros",
    template: "%s | ProBoost",
  },
  description:
    "ProBoost connects you with verified, high-rated players who handle your rank climb safely and fast. Rainbow Six Siege and Valorant boosting, competitive wins, coaching, and more.",
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: "ProBoost — Rank Boosting by Verified Pros",
    description:
      "Rank up faster with verified specialists. Safe, manual gameplay — no bots, no automation.",
    images: [
      {
        url: "/brand/proboost-og.webp",
        width: 1200,
        height: 630,
        alt: "ProBoost — rank boosting by verified specialists",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "ProBoost — Rank Boosting by Verified Pros",
    description:
      "Rank up faster with verified specialists. Safe, manual gameplay — no bots, no automation.",
    images: ["/brand/proboost-og.webp"],
  },
  icons: {
    icon: [
      { url: "/favicon-16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-64.png", sizes: "64x64", type: "image/png" },
      { url: "/favicon-256.png", sizes: "256x256", type: "image/png" },
    ],
    apple: "/favicon-180.png",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark light",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#050505" },
    { media: "(prefers-color-scheme: light)", color: "#f5f5f7" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html
        lang="en"
        data-scroll-behavior="smooth"
        data-theme="black"
        suppressHydrationWarning
        className="h-full antialiased"
      >
        <head>
          <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        </head>
        <body className="flex min-h-full flex-col">
          <a href="#main-content" className="skip-link">
            Skip to content
          </a>
          <Navbar />
          <div id="main-content" className="flex min-h-0 flex-1 flex-col" tabIndex={-1}>
            {children}
          </div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
