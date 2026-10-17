import { GAME_DIRECTORY } from "./games";
import { translate } from "./localization";

export type GameSeo = {
  title: string;
  heading: string;
  description: string;
  linkLabel: string;
};

type GameSlug = (typeof GAME_DIRECTORY)[number]["slug"];

// Search copy describes the services in each game's existing catalog.
// Coaching-only games deliberately use coaching terms throughout.
const GAME_SEO: Record<GameSlug, GameSeo> = {
  "rainbow-six-siege-boost": {
    title: "R6 Boosting — Rainbow Six Siege Rank Boost",
    heading: "R6 Boosting",
    description: "Explore R6 boosting, Champion pushes, competitive wins, unrated matches and coaching. Configure your Rainbow Six Siege rank, platform and region.",
    linkLabel: "R6 boosting",
  },
  "counter-strike-2-boost": {
    title: "CS2 Boosting — Counter-Strike 2 Rank & Rating",
    heading: "CS2 Boosting",
    description: "Configure CS2 boosting for Competitive ranks, Premier rating, FACEIT levels or fixed wins. Set your Counter-Strike 2 target and review your price.",
    linkLabel: "CS2 boosting",
  },
  "valorant-boost": {
    title: "Valorant Boosting & Coaching",
    heading: "Valorant Boosting & Coaching",
    description: "Compare Valorant rank boosting, placement matches, competitive wins and coaching. Choose your platform, region and queue format before checkout.",
    linkLabel: "Valorant boosting",
  },
  "overwatch-2-boost": {
    title: "Overwatch 2 Boosting & Coaching",
    heading: "Overwatch 2 Boosting & Coaching",
    description: "Choose Overwatch 2 rank boosting, placements, competitive wins or coaching. Configure your role, platform, region and rank target before checkout.",
    linkLabel: "Overwatch 2 boosting",
  },
  "rocket-league-boost": {
    title: "Rocket League Boosting & Coaching",
    heading: "Rocket League Boosting & Coaching",
    description: "Explore Rocket League boosting, competitive wins and private coaching. Choose your playlist, current division, target rank, platform and region.",
    linkLabel: "Rocket League boosting",
  },
  "league-of-legends-boost": {
    title: "LoL Boosting — League of Legends Rank Boost",
    heading: "LoL Boosting & Coaching",
    description: "Explore LoL boosting, ranked wins and League of Legends coaching. Configure your rank, LP, target, queue, role and server with a live price.",
    linkLabel: "LoL boosting",
  },
  "marvel-rivals-boost": {
    title: "Marvel Rivals Boosting & Coaching",
    heading: "Marvel Rivals Boosting & Coaching",
    description: "Compare Marvel Rivals rank boosting, competitive wins and hero coaching. Choose your current rank, target, platform, region and hero role.",
    linkLabel: "Marvel Rivals boosting",
  },
  "apex-legends-boost": {
    title: "Apex Legends Boosting & Coaching",
    heading: "Apex Legends Boosting & Coaching",
    description: "Configure Apex Legends boosting, Battle Royale wins or private coaching. Set your ranked target, platform, region and preferred legend class.",
    linkLabel: "Apex Legends boosting",
  },
  "world-of-warcraft-boost": {
    title: "WoW Boosting — Mythic+ Dungeons & Raids",
    heading: "WoW Boosting: Mythic+ & Raids",
    description: "Explore World of Warcraft boosting for Retail Mythic+ dungeons and raids, plus class coaching. Choose your runs, difficulty, role and region.",
    linkLabel: "WoW boosting",
  },
  "fortnite-boost": {
    title: "Fortnite Boosting & Coaching",
    heading: "Fortnite Boosting & Coaching",
    description: "Compare Fortnite rank boosting, Victory Royale wins and coaching. Choose Battle Royale, Zero Build or Reload, then set your target and platform.",
    linkLabel: "Fortnite boosting",
  },
  "call-of-duty-boost": {
    title: "Call of Duty Boosting & Coaching",
    heading: "Call of Duty Boosting & Coaching",
    description: "Configure Call of Duty boosting for Skill Rating or ranked wins, or book coaching. Choose your title, mode, platform, region and queue format.",
    linkLabel: "Call of Duty boosting",
  },
  "dota-2-boost": {
    title: "Dota 2 MMR Boosting & Coaching",
    heading: "Dota 2 MMR Boosting & Coaching",
    description: "Explore Dota 2 MMR boosting, ranked wins and coaching. Set your current MMR, target, position, server and queue format with a live price.",
    linkLabel: "Dota 2 boosting",
  },
  "teamfight-tactics-coaching": {
    title: "TFT Coaching — Teamfight Tactics Sessions",
    heading: "TFT Coaching",
    description: "Book Teamfight Tactics coaching for ranked decisions, composition planning or replay review. Choose your TFT queue, rank and session length.",
    linkLabel: "TFT coaching",
  },
  "destiny-2-coaching": {
    title: "Destiny 2 Coaching — Raids, Dungeons & Builds",
    heading: "Destiny 2 Coaching",
    description: "Book Destiny 2 raid coaching, dungeon coaching or a Guardian build review. Learn mechanics and your role on your own character with a private coach.",
    linkLabel: "Destiny 2 coaching",
  },
  "ea-sports-fc-27-coaching": {
    title: "FC 27 Coaching — EA SPORTS FC 27 Sessions",
    heading: "FC 27 Coaching",
    description: "Book EA SPORTS FC 27 coaching for Ultimate Team gameplay, tactics or squad review. Improve your approach while staying on your own account.",
    linkLabel: "FC 27 coaching",
  },
};

export function getGameSeo(slug: string, language: string = "en"): GameSeo | undefined {
  if (!Object.prototype.hasOwnProperty.call(GAME_SEO, slug)) return undefined;
  const copy = GAME_SEO[slug as GameSlug];
  return {
    title: translate(language, copy.title),
    heading: translate(language, copy.heading),
    description: translate(language, copy.description),
    linkLabel: translate(language, copy.linkLabel),
  };
}
