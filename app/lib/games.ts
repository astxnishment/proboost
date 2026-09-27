export const GAME_DIRECTORY = [
  { id: "r6", name: "Rainbow Six Siege", slug: "rainbow-six-siege-boost", icon: "/game-icons/r6-icon.webp", extended: false },
  { id: "valorant", name: "Valorant", slug: "valorant-boost", icon: "/game-icons/game_icon (2).webp", extended: false },
  { id: "cs2", name: "Counter-Strike 2", slug: "counter-strike-2-boost", icon: "/game-icons/game_icon (5).webp", extended: false },
  { id: "overwatch-2", name: "Overwatch 2", slug: "overwatch-2-boost", icon: "/game-icons/overwatch-2-logo.webp", extended: false },
  { id: "rocket-league", name: "Rocket League", slug: "rocket-league-boost", icon: "/game-icons/game_icon (3).webp", extended: true },
  { id: "lol", name: "League of Legends", slug: "league-of-legends-boost", icon: "/homepage/lol-homepage.webp", extended: true },
  { id: "marvel-rivals", name: "Marvel Rivals", slug: "marvel-rivals-boost", icon: "/game-icons/marvel-rivals-icon.webp", extended: true },
  { id: "apex", name: "Apex Legends", slug: "apex-legends-boost", icon: "/game-icons/game_icon (7).webp", extended: true },
  { id: "wow", name: "World of Warcraft", slug: "world-of-warcraft-boost", icon: "/game-icons/game_icon (1).webp", extended: true },
  { id: "fortnite", name: "Fortnite", slug: "fortnite-boost", icon: "/game-icons/game_icon (8).webp", extended: true },
  { id: "call-of-duty", name: "Call of Duty", slug: "call-of-duty-boost", icon: "/game-icons/game_icon (10).webp", extended: true },
  { id: "dota-2", name: "Dota 2", slug: "dota-2-boost", icon: "/game-icons/game_icon (6).webp", extended: true },
  { id: "tft", name: "Teamfight Tactics", slug: "teamfight-tactics-coaching", icon: "/games/tft/icon.png", extended: true },
  { id: "destiny-2", name: "Destiny 2", slug: "destiny-2-coaching", icon: "/games/destiny-2/icon.jpg", extended: true },
  { id: "ea-fc-27", name: "EA SPORTS FC 27", slug: "ea-sports-fc-27-coaching", icon: "/games/ea-fc-27/logo.png", extended: true },
] as const;

export function isPveGame(game: { id: string }) {
  return game.id === "wow" || game.id === "destiny-2";
}

export function findGameByPath(path: string) {
  const slug = path.split("/")[2];
  return GAME_DIRECTORY.find(game => game.slug === slug);
}

export const GAME_CATEGORY_LABELS = {
  en: { competitive: "Competitive", pve: "Dungeons, raids & coaching" },
  it: { competitive: "Competitivi", pve: "Dungeon, raid e coaching" },
  fr: { competitive: "Compétitifs", pve: "Donjons, raids et coaching" },
  es: { competitive: "Competitivos", pve: "Mazmorras, bandas y coaching" },
  de: { competitive: "Kompetitiv", pve: "Dungeons, Raids & Coaching" },
  nl: { competitive: "Competitief", pve: "Dungeons, raids & coaching" },
  pt: { competitive: "Competitivos", pve: "Masmorras, raides e coaching" },
  uk: { competitive: "Змагальні", pve: "Підземелля, рейди й тренування" },
  ru: { competitive: "Соревновательные", pve: "Подземелья, рейды и тренировки" },
} as const;
