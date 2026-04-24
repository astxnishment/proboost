"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth, UserButton } from "@clerk/nextjs";
import GameSelectorChip from "./GameSelectorChip";

function getBoosterCount() {
  const now = new Date();
  const seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
  const slot = Math.floor((now.getHours() * 60 + now.getMinutes()) / 144);
  const hash = ((seed * 9301 + slot * 49297) % 233280) / 233280;
  return Math.floor(hash * 41) + 80;
}

const NAV_LINKS = [
  { label: "Membership", icon: "/icons/membership-icon-filled2.svg" },
  { label: "Guides", icon: "/icons/book-icon.svg" },
  { label: "Work with us", icon: "/icons/hooded-icon.svg" },
  { label: "Contact", icon: "/icons/contact-icon.svg" },
];

export default function Navbar() {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  const [boosterCount, setBoosterCount] = React.useState(getBoosterCount);

  React.useEffect(() => {
    const id = setInterval(() => setBoosterCount(getBoosterCount()), 60000);
    return () => clearInterval(id);
  }, []);

  // Determine active game from route
  const activeGameId = /^\/(en|it|fr|es|de|nl|pt|uk|ru)\/rainbow-six-siege-boost/.test(pathname)
    ? "r6"
    : undefined;

  return (
    <div className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-[#050505]/58 backdrop-blur-xl">
      <div className="mx-auto max-w-[1550px] px-7">
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

            <GameSelectorChip activeGameId={activeGameId} />

            {/* Online boosters */}
            <div className="hidden md:flex items-center gap-3 rounded-full pl-1 pr-2 text-zinc-400">
              <span className="relative flex h-10 w-10 items-center justify-center rounded-full bg-cyan-400/[0.06]">
                <span className="absolute inline-flex h-8 w-8 rounded-full bg-cyan-400/[0.08] animate-ping" style={{ animationDuration: "2s" }} />
                <svg className="relative h-[18px] w-[18px] text-cyan-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                  <path d="M8.5 8.5a5 5 0 0 0 0 7" />
                  <path d="M5 5a9.5 9.5 0 0 0 0 14" />
                  <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                  <path d="M19 5a9.5 9.5 0 0 1 0 14" />
                  <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
                </svg>
              </span>
              <div className="leading-none">
                <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">Online</span>
                <span className="block text-[14px] font-bold text-white">{boosterCount} <span className="font-normal text-zinc-500">Boosters</span></span>
              </div>
            </div>
          </div>

          {/* Right: nav links + auth */}
          <div className="flex items-center gap-2">
            <div className="hidden lg:flex items-center gap-1 text-[13px] text-zinc-400 mr-2 xl:gap-2">
              {NAV_LINKS.map((item) => (
                <button
                  key={item.label}
                  className="flex items-center gap-2 rounded-lg px-3 py-2 hover:bg-white/[0.05] hover:text-white transition whitespace-nowrap cursor-pointer"
                >
                  <Image src={item.icon} alt="" width={14} height={14} className="h-3.5 w-3.5 object-contain" />
                  {item.label}
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
                  className="hidden sm:inline-flex rounded-full border border-white/10 px-4 py-2 text-sm font-medium text-zinc-300 transition hover:border-white/20 hover:bg-white/[0.05] hover:text-white"
                >
                  Sign up
                </Link>
                <Link
                  href="/login"
                  className="inline-flex h-10 items-center rounded-full bg-gradient-to-r from-cyan-500 to-cyan-400 px-5 text-sm font-bold text-black transition hover:from-cyan-400 hover:to-cyan-300 shadow-lg shadow-cyan-500/20"
                >
                  Log In
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
