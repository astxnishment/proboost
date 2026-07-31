"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Menu, Moon, Sun, X } from "lucide-react";
import GameSelectorChip from "./GameSelectorChip";
import {
  CurrencyDropdown,
  LanguageDropdown,
  type LanguageCode,
} from "./Dropdown";
import { PageContainer } from "./ui";

const THEME_OPTIONS = [
  { value: "black", label: "Dark", icon: Moon },
  { value: "white", label: "Light", icon: Sun },
] as const;

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [theme, setTheme] = React.useState<"black" | "white">("black");
  const [selectedLang, setSelectedLang] = React.useState<LanguageCode>("en");

  React.useEffect(() => {
    const activeTheme = document.documentElement.dataset.theme === "white" ? "white" : "black";
    const savedLang = window.localStorage.getItem("proboost_lang") as LanguageCode | null;
    const routeLang = pathname.match(
      /^\/(en|it|fr|es|de|nl|pt|uk|ru)(?:\/|$)/
    )?.[1] as LanguageCode | undefined;
    const readyId = window.setTimeout(() => {
      setTheme(activeTheme);
      if (routeLang) setSelectedLang(routeLang);
      else if (savedLang) setSelectedLang(savedLang);
    }, 0);

    const media = window.matchMedia("(prefers-color-scheme: light)");
    const syncSystemTheme = (event: MediaQueryListEvent) => {
      if (window.localStorage.getItem("proboost_theme")) return;
      const nextTheme = event.matches ? "white" : "black";
      document.documentElement.dataset.theme = nextTheme;
      document.documentElement.style.colorScheme = nextTheme === "white" ? "light" : "dark";
      setTheme(nextTheme);
    };
    media.addEventListener("change", syncSystemTheme);
    return () => {
      window.clearTimeout(readyId);
      media.removeEventListener("change", syncSystemTheme);
    };
  }, [pathname]);

  React.useEffect(() => {
    if (!mobileOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMobileOpen(false);
    };

    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [mobileOpen]);

  React.useEffect(() => {
    const closeId = window.setTimeout(() => setMobileOpen(false), 0);
    return () => window.clearTimeout(closeId);
  }, [pathname]);

  const selectTheme = (nextTheme: "black" | "white") => {
    // Theme is intentionally applied to the root so native controls and every route update together.
    // eslint-disable-next-line react-hooks/immutability
    document.documentElement.dataset.theme = nextTheme;
    // eslint-disable-next-line react-hooks/immutability
    document.documentElement.style.colorScheme = nextTheme === "white" ? "light" : "dark";
    window.localStorage.setItem("proboost_theme", nextTheme);
    setTheme(nextTheme);
  };

  const activeGameId = /^\/(en|it|fr|es|de|nl|pt|uk|ru)\/rainbow-six-siege-boost/.test(pathname)
    ? "r6"
    : /^\/(en|it|fr|es|de|nl|pt|uk|ru)\/valorant-boost/.test(pathname)
      ? "valorant"
      : /^\/(en|it|fr|es|de|nl|pt|uk|ru)\/counter-strike-2-boost/.test(pathname)
        ? "cs2"
      : /^\/(en|it|fr|es|de|nl|pt|uk|ru)\/overwatch-2-boost/.test(pathname)
        ? "overwatch-2"
      : undefined;
  const serviceRoot =
    activeGameId === "r6"
      ? `/${selectedLang}/rainbow-six-siege-boost`
      : activeGameId === "valorant"
        ? `/${selectedLang}/valorant-boost`
        : activeGameId === "cs2"
          ? `/${selectedLang}/counter-strike-2-boost`
        : activeGameId === "overwatch-2"
          ? `/${selectedLang}/overwatch-2-boost`
        : "/#games";
  const navLinks = [
    { label: "Services", href: serviceRoot },
    { label: "Membership", href: "/#rewards" },
    {
      label: "Guides",
      href: activeGameId ? `${serviceRoot}#how` : "/#how-it-works",
    },
    { label: "Contact", href: "/contact" },
  ];
  const isNavLinkActive = (label: string) =>
    label === "Services"
      ? Boolean(activeGameId || pathname.startsWith("/boosting"))
      : label === "Contact"
        ? pathname === "/contact"
        : false;

  const selectLanguage = (nextLanguage: LanguageCode) => {
    setSelectedLang(nextLanguage);
    const localizedPath = pathname.match(
      /^\/(en|it|fr|es|de|nl|pt|uk|ru)(\/(?:rainbow-six-siege-boost|valorant-boost|counter-strike-2-boost|overwatch-2-boost)(?:\/.*)?)$/
    );
    if (localizedPath) {
      router.push(`/${nextLanguage}${localizedPath[2]}`);
    }
  };

  return (
    <header className="site-header fixed left-0 right-0 top-0 z-50 border-b">
      <PageContainer>
        <div className="header-layout grid h-[var(--header-height)] grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Link href="/" aria-label="Go to homepage" className="shrink-0">
              <Image
                src="/brand/proboost-logo-white.png"
                alt="ProBoost"
                width={848}
                height={134}
                loading="eager"
                className="brand-wordmark h-5 w-auto object-contain sm:h-[26px]"
              />
            </Link>

            <div className="hidden md:block">
              <GameSelectorChip activeGameId={activeGameId} language={selectedLang} />
            </div>

          </div>

          <nav className="desktop-main-nav items-center justify-center gap-1 text-sm text-[var(--muted)]">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={isNavLinkActive(item.label) ? "page" : undefined}
                  className="rounded-[var(--radius-control)] px-3 py-2 font-medium transition hover:bg-[var(--surface-subtle)] hover:text-[var(--foreground)] aria-[current=page]:bg-[var(--accent-soft)] aria-[current=page]:text-[var(--foreground)]"
                >
                  {item.label}
                </Link>
              ))}
          </nav>

          <div className="flex min-w-0 shrink-0 items-center justify-end gap-2">
            <div className="hidden lg:block">
              <LanguageDropdown value={selectedLang} onChange={selectLanguage} />
            </div>
            <div className="desktop-currency-picker">
              <CurrencyDropdown />
            </div>
            <div className="theme-segment hidden rounded-[var(--radius-control)] border p-1 sm:flex" aria-label="Color theme">
              {THEME_OPTIONS.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  data-theme-option={item.value}
                  onClick={() => selectTheme(item.value)}
                  aria-pressed={theme === item.value}
                  aria-label={`${item.label} theme`}
                  title={`${item.label} theme`}
                  className="theme-segment-option flex h-8 w-8 items-center justify-center rounded-lg transition"
                >
                  <item.icon aria-hidden className="h-3.5 w-3.5" strokeWidth={1.8} />
                </button>
              ))}
            </div>
            {isSignedIn ? (
              <UserButton
                appearance={{
                  elements: {
                    avatarBox: "h-9 w-9",
                  },
                }}
              />
            ) : (
              <>
                <span className="hidden sm:block">
                  <Link
                    href="/signup"
                    className="button-small button-ghost"
                  >
                    Sign up
                  </Link>
                </span>
                <Link
                  href="/login"
                  className="button-small button-primary"
                >
                  Log In
                </Link>
              </>
            )}
            <button
              type="button"
              aria-label="Toggle navigation menu"
              aria-expanded={mobileOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileOpen((open) => !open)}
              className="nav-menu-toggle icon-button button-secondary"
            >
              <span className="sr-only">Menu</span>
              {mobileOpen ? <X aria-hidden className="h-4 w-4" /> : <Menu aria-hidden className="h-4 w-4" />}
            </button>
          </div>
        </div>
      </PageContainer>

      {mobileOpen ? (
        <>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMobileOpen(false)}
            className="nav-mobile-layer theme-overlay fixed inset-x-0 bottom-0 top-[var(--header-height)] z-[55]"
          />
          <div
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            className="nav-mobile-layer site-mobile-menu fixed bottom-0 right-0 top-[var(--header-height)] z-[60] w-full max-w-[420px] overflow-y-auto border-l p-5"
          >
            <div className="flex min-h-full flex-col">
              <div>
                <p className="mb-3 text-sm font-semibold text-[var(--foreground)]">Choose your game</p>
                <GameSelectorChip activeGameId={activeGameId} language={selectedLang} />
              </div>

              <nav aria-label="Mobile navigation" className="mt-7 grid gap-1 border-y border-[var(--line)] py-4">
                {navLinks.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className="rounded-[var(--radius-control)] px-3 py-3 text-base font-medium text-[var(--foreground-soft)] transition hover:bg-[var(--surface-subtle)] hover:text-[var(--foreground)]"
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>

              <div className="mt-auto grid gap-4 pt-7">
                <div>
                  <p className="mb-2 text-sm font-semibold text-[var(--foreground)]">Language</p>
                  <LanguageDropdown value={selectedLang} onChange={selectLanguage} align="start" />
                </div>
                <div className="mobile-preference-picker">
                  <p className="mb-2 text-sm font-semibold text-[var(--foreground)]">Currency</p>
                  <CurrencyDropdown align="start" />
                </div>
                <div>
                  <p className="mb-2 text-sm font-semibold text-[var(--foreground)]">Appearance</p>
                  <div className="theme-segment grid grid-cols-2 gap-1 rounded-[var(--radius-control)] border p-1">
                    {THEME_OPTIONS.map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        data-theme-option={item.value}
                        onClick={() => selectTheme(item.value)}
                        aria-pressed={theme === item.value}
                        className="theme-segment-option flex min-h-10 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium transition"
                      >
                        <item.icon aria-hidden className="h-4 w-4" strokeWidth={1.8} />
                        {item.label}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </header>
  );
}
