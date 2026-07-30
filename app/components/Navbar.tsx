"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Moon, Sun } from "lucide-react";
import GameSelectorChip from "./GameSelectorChip";
import { LanguageDropdown, type LanguageCode } from "./Dropdown";

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
      : undefined;
  const serviceRoot =
    activeGameId === "r6"
      ? `/${selectedLang}/rainbow-six-siege-boost`
      : activeGameId === "valorant"
        ? `/${selectedLang}/valorant-boost`
        : activeGameId === "cs2"
          ? `/${selectedLang}/counter-strike-2-boost`
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

  const selectLanguage = (nextLanguage: LanguageCode) => {
    setSelectedLang(nextLanguage);
    const localizedPath = pathname.match(
      /^\/(en|it|fr|es|de|nl|pt|uk|ru)(\/(?:rainbow-six-siege-boost|valorant-boost|counter-strike-2-boost)(?:\/.*)?)$/
    );
    if (localizedPath) {
      router.push(`/${nextLanguage}${localizedPath[2]}`);
    }
  };

  return (
    <header className="site-header fixed left-0 right-0 top-0 z-50 border-b backdrop-blur-2xl">
      <div className="mx-auto max-w-[1600px] px-4 sm:px-6 lg:px-8">
        <div className="grid h-16 grid-cols-[minmax(0,1fr)_auto] items-center gap-3 xl:grid-cols-[auto_minmax(280px,1fr)_auto] xl:gap-6">
          <div className="flex min-w-0 items-center gap-2 sm:gap-3">
            <Link href="/" aria-label="Go to homepage" className="shrink-0">
              <Image
                src="/brand/proboost-logo-white.png"
                alt="ProBoost"
                width={848}
                height={134}
                loading="eager"
                className="brand-wordmark h-6 w-auto object-contain sm:h-7"
              />
            </Link>

            <div className="hidden md:block">
              <GameSelectorChip activeGameId={activeGameId} language={selectedLang} />
            </div>

          </div>

          <nav className="hidden items-center justify-center gap-1 text-[13px] text-[var(--muted)] xl:flex">
              {navLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  aria-current={
                    item.label !== "Membership" &&
                    pathname === item.href.split("#")[0]
                      ? "page"
                      : undefined
                  }
                  className="rounded-xl px-3 py-2 transition hover:bg-[var(--surface-subtle)] hover:text-[var(--foreground)] aria-[current=page]:bg-[var(--surface-subtle)] aria-[current=page]:text-[var(--foreground)]"
                >
                  {item.label}
                </Link>
              ))}
          </nav>

          <div className="flex min-w-0 shrink-0 items-center justify-end gap-2">
            <div className="hidden lg:block">
              <LanguageDropdown value={selectedLang} onChange={selectLanguage} />
            </div>
            <div className="theme-segment hidden rounded-xl border p-1 sm:flex" aria-label="Color theme">
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
                <Link
                  href="/signup"
                  className="hidden h-9 items-center rounded-xl border border-[var(--line)] px-3.5 text-[13px] font-medium text-[var(--foreground-soft)] transition hover:border-[var(--line-strong)] hover:bg-[var(--surface-subtle)] hover:text-[var(--foreground)] sm:inline-flex"
                >
                  Sign up
                </Link>
                <Link
                  href="/login"
                  className="theme-inverse inline-flex h-9 items-center rounded-xl border px-4 text-[13px] font-semibold transition hover:opacity-85"
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
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--line)] text-[var(--foreground)] transition hover:bg-[var(--surface-subtle)] xl:hidden"
            >
              <span className="sr-only">Menu</span>
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round">
                {mobileOpen ? (
                  <>
                    <path d="M4 4l8 8" />
                    <path d="M12 4l-8 8" />
                  </>
                ) : (
                  <>
                    <path d="M3 5h10" />
                    <path d="M3 11h10" />
                  </>
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div
        id="mobile-navigation"
        className={`site-mobile-menu border-t px-4 transition-[max-height,opacity] duration-300 xl:hidden ${
          mobileOpen ? "max-h-[520px] opacity-100" : "max-h-0 overflow-hidden opacity-0"
        }`}
      >
        <div className="mx-auto flex max-w-[1400px] flex-col gap-2 py-4">
          <GameSelectorChip activeGameId={activeGameId} language={selectedLang} />
          <div className="grid grid-cols-[auto_1fr] items-center gap-2 rounded-2xl border border-[var(--line)] p-2">
            <LanguageDropdown value={selectedLang} onChange={selectLanguage} align="start" />
            <div className="grid grid-cols-2 gap-1 rounded-xl border border-[var(--line)] p-1">
            {THEME_OPTIONS.map((item) => (
              <button
                key={item.value}
                type="button"
                data-theme-option={item.value}
                onClick={() => selectTheme(item.value)}
                aria-pressed={theme === item.value}
                className="theme-segment-option flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium transition"
              >
                <item.icon aria-hidden className="h-4 w-4" strokeWidth={1.8} />
                {item.label}
              </button>
            ))}
            </div>
          </div>
          <div className="grid gap-1 pt-2">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setMobileOpen(false)}
                className="rounded-xl px-3 py-3 text-sm font-medium text-[var(--foreground-soft)] transition hover:bg-[var(--surface-subtle)] hover:text-[var(--foreground)]"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
