// Large artwork is deliberately separate from small game icons. Never enlarge
// the old 440px card cutouts into desktop banners. Sources live alongside assets.
export const GAME_ARTWORK: Record<string, { src: string; position?: string }> = {
  "/homepage/rocketleague-homepage.webp": { src: "/games/artwork/rocket-league-hd.jpg", position: "40% 50%" },
  "/homepage/r6-homepage.webp": { src: "/games/artwork/rainbow-six-hd.jpg", position: "35% 45%" },
  "/homepage/apex-homepage.webp": { src: "/games/artwork/apex-legends-hd.jpg", position: "55% 45%" },
  "/homepage/lol-homepage.webp": { src: "/games/league-of-legends/ahri-splash.jpg", position: "66% 45%" },
  "/homepage/overwatch-homepage.webp": { src: "/games/artwork/overwatch-hd.jpg", position: "58% 48%" },
  "/homepage/overwatch-homepage-v2.webp": { src: "/games/artwork/overwatch-hd.jpg", position: "58% 48%" },
  "/homepage/marvelrivals-homepage.webp": { src: "/games/artwork/marvel-rivals-hd.jpg", position: "35% 45%" },
  "/homepage/fortnite-homepage-v3.webp": { src: "/games/artwork/fortnite-hd.jpg", position: "50% 58%" },
  "/homepage/cod-homepage-v3.webp": { src: "/games/artwork/call-of-duty-hd.jpg", position: "45% 45%" },
  "/homepage/dota2-homepage-v3.webp": { src: "/games/artwork/dota-2-hd.jpg", position: "50% 38%" },
  "/homepage/wow-homepage-v2.webp": { src: "/games/artwork/world-of-warcraft-hd.jpg", position: "30% 40%" },
  "/homepage/valorant-homepage.webp": { src: "/valorant/omen-full-portrait.png", position: "55% 35%" },
  "/homepage/cs2-homepage.webp": { src: "/cs2/cs2-hero.png", position: "65% 45%" },
  "/cs2/cs2-hero.webp": { src: "/cs2/cs2-hero.png" },
  "/valorant/valorant-hero-v2.webp": { src: "/valorant/valorant-hero-v2.png" },
  "/games/tft/character.png": { src: "/games/artwork/tft-hd.png", position: "50% 35%" },
  "/games/ea-fc-27/hero.jpg": { src: "/games/artwork/ea-fc-27-hd.jpg", position: "50% 45%" },
};
