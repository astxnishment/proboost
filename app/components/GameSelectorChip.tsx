"use client";

import React from "react";
import Image from "next/image";
import { Dropdown, type DropdownItem } from "./Dropdown";
import type { LanguageCode } from "./Dropdown";

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
  { id: "r6", label: "Rainbow Six Siege", iconSrc: "/game-icons/r6-icon.webp", shortLabel: "R6", fallbackClass: "bg-cyan-400 text-black", href: "/en/rainbow-six-siege-boost" },
  { id: "valorant", label: "Valorant", iconSrc: "/game-icons/game_icon (2).webp", shortLabel: "V", fallbackClass: "bg-[#ff5468] text-black", href: "/en/valorant-boost" },
  { id: "cs2", label: "Counter-Strike 2", iconSrc: "/game-icons/game_icon (5).webp", shortLabel: "CS2", fallbackClass: "bg-[#f97316] text-black", href: "/en/counter-strike-2-boost" },
  { id: "rocket-league", label: "Rocket League", iconSrc: "/game-icons/game_icon (3).webp", shortLabel: "RL", fallbackClass: "bg-[#3d6ef7] text-white", href: "#", comingSoon: true },
  { id: "lol", label: "League of Legends", shortLabel: "L", fallbackClass: "bg-[#0e5a68] text-[#d4af37]", href: "#", comingSoon: true },
  { id: "marvel-rivals", label: "Marvel Rivals", shortLabel: "MR", fallbackClass: "bg-zinc-700 text-white", href: "#", comingSoon: true },
  { id: "apex", label: "Apex Legends", iconSrc: "/game-icons/game_icon (7).webp", shortLabel: "A", fallbackClass: "bg-[#93333b] text-white", href: "#", comingSoon: true },
];

function GameIcon({ item }: { item: GameMenuItem }) {
  if (item.iconSrc) {
    return (
      <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--surface-subtle)]">
        <Image src={item.iconSrc} alt="" width={36} height={36} className="h-full w-full object-cover" />
      </span>
    );
  }
  return (
    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg text-[9px] font-bold ${item.fallbackClass}`}>
      {item.shortLabel}
    </span>
  );
}

export default function GameSelectorChip({
  activeGameId,
  language = "en",
}: {
  activeGameId?: string;
  language?: LanguageCode;
} = {}) {
  const activeGame = activeGameId ? GAMES.find((g) => g.id === activeGameId) : null;

  const items: DropdownItem[] = GAMES.map((game, i) => ({
    id: game.id,
    label: game.label,
    description: game.comingSoon
      ? "Service in preparation"
      : game.id === "valorant"
        ? "Competitive services available"
        : "Rank boosting available",
    icon: <GameIcon item={game} />,
    meta: game.comingSoon ? "Soon" : "Open",
    disabled: game.comingSoon,
    href:
      game.comingSoon
        ? undefined
        : game.id === "r6"
          ? `/${language}/rainbow-six-siege-boost`
          : game.id === "valorant"
            ? `/${language}/valorant-boost`
            : game.id === "cs2"
              ? `/${language}/counter-strike-2-boost`
            : game.href,
    selected: game.id === activeGameId,
    // Hairline between the live catalogue and upcoming titles
    separatorAfter: !game.comingSoon && GAMES[i + 1]?.comingSoon,
  }));

  return (
    <Dropdown
      ariaLabel="Select your game"
      align="start"
      className="block"
      items={items}
      menuClassName="w-[292px]"
      menuHeader={
        <div>
          <p className="text-xs font-semibold text-[var(--foreground)]">Choose a game</p>
          <p className="mt-0.5 text-[11px] text-[var(--muted-soft)]">Available and upcoming services</p>
        </div>
      }
      triggerClassName={`dd-trigger game-picker-trigger !h-10 w-full justify-between gap-3 sm:w-[220px] ${
        activeGame ? "!pl-1.5" : ""
      }`}
      trigger={
        <span className="flex min-w-0 items-center gap-2.5">
          {activeGame ? (
            <span className="flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--surface-subtle)]">
              <Image
                src={activeGame.iconSrc!}
                alt=""
                width={40}
                height={40}
                className="h-full w-full scale-[1.18] object-cover"
              />
            </span>
          ) : null}
          <span className="truncate text-[13px] font-medium">
            {activeGame ? (activeGame.chipLabel ?? activeGame.label) : "Select your game"}
          </span>
        </span>
      }
    />
  );
}
