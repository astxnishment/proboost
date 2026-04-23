"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

type GameMenuItem = {
  id: string;
  label: string;
  chipLabel?: string;
  iconSrc?: string;
  shortLabel: string;
  fallbackClass: string;
  comingSoon?: boolean;
  href: string;
};

const GAMES: GameMenuItem[] = [
  { id: "r6", label: "Rainbow Six Siege", chipLabel: "Rainbow Six Siege X", iconSrc: "/game-icons/r6-icon.webp", shortLabel: "R6", fallbackClass: "bg-cyan-400 text-black", href: "/en/rainbow-six-siege-boost" },
  { id: "valorant", label: "Valorant", iconSrc: "/game-icons/game_icon (2).webp", shortLabel: "V", fallbackClass: "bg-[#ff5468] text-black", href: "#", comingSoon: true },
  { id: "cs2", label: "Counter Strike 2", iconSrc: "/game-icons/game_icon (5).webp", shortLabel: "CS2", fallbackClass: "bg-[#f97316] text-black", href: "#", comingSoon: true },
  { id: "lol", label: "League of Legends", shortLabel: "L", fallbackClass: "bg-[#0e5a68] text-[#d4af37]", href: "#", comingSoon: true },
  { id: "rocket-league", label: "Rocket League", iconSrc: "/game-icons/game_icon (3).webp", shortLabel: "RL", fallbackClass: "bg-[#3d6ef7] text-white", href: "#", comingSoon: true },
  { id: "overwatch", label: "Overwatch", iconSrc: "/game-icons/game_icon (4).webp", shortLabel: "OW", fallbackClass: "bg-zinc-700 text-white", href: "#", comingSoon: true },
  { id: "apex", label: "Apex Legends", iconSrc: "/game-icons/game_icon (7).webp", shortLabel: "A", fallbackClass: "bg-[#93333b] text-white", href: "#", comingSoon: true },
  { id: "dota-2", label: "Dota 2", iconSrc: "/game-icons/game_icon (6).webp", shortLabel: "D2", fallbackClass: "bg-[#7f1d1d] text-white", href: "#", comingSoon: true },
  { id: "fortnite", label: "Fortnite", iconSrc: "/game-icons/game_icon (8).webp", shortLabel: "F", fallbackClass: "bg-[#7c3aed] text-white", href: "#", comingSoon: true },
  { id: "wow", label: "World of Warcraft", iconSrc: "/game-icons/game_icon (1).webp", shortLabel: "W", fallbackClass: "bg-[#23314f] text-[#f3c356]", href: "#", comingSoon: true },
];

function GameIcon({ item, size = "md" }: { item: GameMenuItem; size?: "sm" | "md" }) {
  const dim = size === "sm" ? "h-8 w-8" : "h-10 w-10";
  if (item.iconSrc) {
    return (
      <span className={`flex ${dim} shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/[0.04]`}>
        <Image src={item.iconSrc} alt="" width={44} height={44} unoptimized className="h-full w-full object-cover" />
      </span>
    );
  }
  return (
    <span className={`flex ${dim} shrink-0 items-center justify-center rounded-full text-[10px] font-black ${item.fallbackClass}`}>
      {item.shortLabel}
    </span>
  );
}

export default function GameSelectorChip({ activeGameId }: { activeGameId?: string } = {}) {
  const [open, setOpen] = React.useState(false);
  const [dropdownPos, setDropdownPos] = React.useState({ top: 0, left: 0 });
  const ref = React.useRef<HTMLDivElement>(null);
  const btnRef = React.useRef<HTMLButtonElement>(null);
  const activeGame = activeGameId ? GAMES.find((g) => g.id === activeGameId) : null;

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (btnRef.current) {
      const r = btnRef.current.getBoundingClientRect();
      setDropdownPos({ top: r.bottom + 10, left: r.left });
    }
    setOpen((o) => !o);
  };

  return (
    <div ref={ref} className="relative hidden sm:block">
      <button
        ref={btnRef}
        type="button"
        onClick={handleOpen}
        className={`flex cursor-pointer items-center gap-3 rounded-[30px] border px-4 pr-5 py-2 outline-none transition ${
          activeGame
            ? "h-[56px] border-cyan-400/30 bg-[linear-gradient(180deg,rgba(255,255,255,0.045),rgba(255,255,255,0.02))] text-[15px] font-semibold text-white shadow-[0_0_0_1px_rgba(8,145,178,0.06),0_12px_30px_rgba(0,0,0,0.28)] hover:border-cyan-400/60"
            : "border-white/10 bg-transparent text-sm font-semibold text-white hover:border-cyan-400/60 hover:bg-cyan-400/[0.07]"
        }`}
      >
        {activeGame ? (
          <span className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full border border-cyan-300/70 bg-cyan-400/10 shadow-[0_0_0_2px_rgba(8,145,178,0.18)_inset,0_0_20px_rgba(34,211,238,0.18)]">
            <Image src={activeGame.iconSrc!} alt="" width={44} height={44} unoptimized className="h-full w-full scale-[1.18] object-cover" />
          </span>
        ) : (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-full bg-white/[0.06]">
            <Image src="/no-game-selected.png" alt="" width={36} height={36} className="h-full w-full object-cover" />
          </span>
        )}
        <span className="whitespace-nowrap tracking-[-0.01em]">
          {activeGame ? (activeGame.chipLabel ?? activeGame.label) : "Select your game"}
        </span>
        <svg
          className={`h-4 w-4 text-white/70 transition-transform ${open ? "rotate-180" : ""}`}
          viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="M3.5 6.5 8 11l4.5-4.5" />
        </svg>
      </button>

      {open && (
        <div
          onMouseDown={(e) => e.stopPropagation()}
          style={{ position: "fixed", top: dropdownPos.top, left: dropdownPos.left }}
          className="z-[9999] w-[320px] overflow-hidden rounded-[20px] border border-white/10 bg-[#0a0c10] p-2 shadow-[0_24px_80px_rgba(0,0,0,0.7)] backdrop-blur-2xl"
        >
          {GAMES.map((item) => {
            const inner = (
              <div
                className={`flex items-center justify-between gap-3 rounded-2xl border px-3 py-2.5 transition ${
                  item.comingSoon
                    ? "border-transparent bg-transparent opacity-55 cursor-default"
                    : "border-transparent bg-white/[0.02] hover:border-white/8 hover:bg-white/[0.06]"
                }`}
              >
                <div className="flex items-center gap-3">
                  <GameIcon item={item} size="sm" />
                  <div>
                    <p className="text-sm font-semibold text-white">{item.label}</p>
                    <p className="text-[11px] text-[#7a818a]">{item.comingSoon ? "Coming soon" : "Live now"}</p>
                  </div>
                </div>
                {!item.comingSoon && (
                  <svg className="h-4 w-4 text-[#f0a429]" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                    <path d="m6 3.5 4.5 4.5L6 12.5" />
                  </svg>
                )}
              </div>
            );

            return item.comingSoon ? (
              <div key={item.id}>{inner}</div>
            ) : (
              <Link key={item.id} href={item.href} onClick={() => setOpen(false)}>
                {inner}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
