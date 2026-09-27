"use client";

import Localized from "./Localization";
import Image from "next/image";
import { Dropdown, type DropdownItem, type LanguageCode } from "./Dropdown";
import { GAME_DIRECTORY, GAME_CATEGORY_LABELS, isPveGame } from "../lib/games";

export default function GameSelectorChip({ activeGameId, language = "en" }: { activeGameId?: string; language?: LanguageCode } = {}) {
  const activeGame = GAME_DIRECTORY.find(game => game.id === activeGameId);
  const booking = GAME_CATEGORY_LABELS[language] ?? GAME_CATEGORY_LABELS.en;
  const items: DropdownItem[] = GAME_DIRECTORY.map(game => ({
    id: game.id,
    label: game.name,
    description: isPveGame(game) ? booking.pve : booking.competitive,
    icon: <span className="game-brand-tile flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--line)]"><Image src={game.icon} alt="" width={36} height={36} className="h-full w-full object-contain" /></span>,
    href: `/${language}/${game.slug}`,
    selected: game.id === activeGameId,
  }));

  return (
    <Localized><Dropdown
      ariaLabel="Select your game"
      align="start"
      className="block"
      items={items}
      menuClassName="w-[292px]"
      menuHeader={<div><p className="text-xs font-semibold text-[var(--foreground)]">Choose a game</p><p className="mt-0.5 text-[11px] text-[var(--muted-soft)]">Explore all {GAME_DIRECTORY.length} games</p></div>}
      triggerClassName={`dd-trigger game-picker-trigger !h-10 w-full justify-between gap-3 sm:w-[220px] ${activeGame ? "!pl-1.5" : ""}`}
      trigger={
        <span className="flex min-w-0 items-center gap-2.5">
          {activeGame && <span className="game-brand-tile flex h-8 w-8 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-[var(--line)]"><Image src={activeGame.icon} alt="" width={40} height={40} className="h-full w-full object-contain" /></span>}
          <span className="truncate text-[13px] font-medium">{activeGame?.name ?? "Select your game"}</span>
        </span>
      }
    /></Localized>
  );
}
