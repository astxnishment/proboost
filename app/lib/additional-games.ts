import { GAME_DIRECTORY } from "./games";

export type AdditionalGameSlug = Extract<(typeof GAME_DIRECTORY)[number], { extended: true }>["slug"];
export type CatalogServiceSlug = "rank-progression" | "match-sessions" | "coaching" | "dungeons" | "raids" | "composition-planning" | "replay-review" | "raid-coaching" | "dungeon-coaching" | "build-review" | "tactics-coaching" | "squad-review";
export type CatalogService = {
  slug: CatalogServiceSlug;
  title: string;
  navLabel: string;
  description: string;
  details: string[];
  group: "rank" | "matches" | "coaching" | "pve";
  icon: "rank" | "wins" | "coaching";
  focusOptions?: string[];
  setup?: { label: string; options: string[] };
  preparation?: string;
  modes?: string[];
};
export type RankTier = { name: string; color: string; divisions: string[] };
export type RatingScale = { unit: string; step: number; max: number; current: number; target: number };
type GameDetails = {
  artwork: string;
  serviceArtwork?: string;
  imagePosition?: string;
  coachingOnly?: boolean;
  serviceIntro?: string;
  accent: string;
  headline: string;
  description: string;
  modes: string[];
  modeLabel: string;
  platforms: string[];
  regions: string[];
  roleLabel: string;
  roles: string[];
  coachingFocus: string[];
  tiers: RankTier[];
  rating?: RatingScale;
  progressLabel?: string;
  services: CatalogService[];
};

const COLORS = ["#b88760", "#aab9ca", "#efc66a", "#65c6cd", "#81a6ff", "#bd8afa", "#ee879e", "#f2cf90", "#f2e9ff"];
const descending = ["IV", "III", "II", "I"];
const TFT_RANKS = ["Unranked", "Iron", "Bronze", "Silver", "Gold", "Platinum", "Emerald", "Diamond", "Master", "Grandmaster", "Challenger"];
const SESSION_EXPERIENCE = ["New player", "Returning player", "Regular player", "Experienced player"];
function tiers(names: string[], divisions: string[], topSingle = true): RankTier[] {
  return names.map((name, i) => ({ name, color: COLORS[i % COLORS.length], divisions: topSingle && i === names.length - 1 ? [""] : divisions }));
}
function services(rankTitle: string, rankDescription: string, rankDetails: string[], winsTitle: string, coachingDescription: string): CatalogService[] {
  return [
    { slug: "rank-progression", title: rankTitle, navLabel: "Rank boost", description: rankDescription, details: rankDetails, group: "rank", icon: "rank" },
    { slug: "match-sessions", title: winsTitle, navLabel: "Wins", description: "Choose your starting point and a fixed number of wins. Customize the mode, region, and queue format before checkout.", details: ["Choose 1–10 wins", "Solo or play with a pro"], group: "matches", icon: "wins" },
    { slug: "coaching", title: "Personal Coaching", navLabel: "Coaching", description: coachingDescription, details: ["Private sessions, 1–10 hours", "Choose your focus and role"], group: "coaching", icon: "coaching" },
  ];
}

const DETAILS: Record<AdditionalGameSlug, GameDetails> = {
  "teamfight-tactics-coaching": {
    artwork: "/games/tft/character.png", imagePosition: "50% 35%", accent: "#efbd65", coachingOnly: true,
    headline: "Read the lobby. Find your winning line.",
    description: "Make stronger decisions at every stage. Work on ranked fundamentals, build a flexible composition plan, or review the moments that changed your match.",
    serviceIntro: "Three ways to improve your TFT decisions. Choose a session, tell us your rank and queue, and build a plan with your coach.",
    modes: ["Ranked", "Double Up", "Normal"], modeLabel: "Queue", platforms: ["PC", "Mac", "Mobile"], regions: ["EU West", "EU Nordic & East", "North America", "Brazil", "Latin America North", "Latin America South", "Oceania", "Türkiye", "Korea", "Japan", "Southeast Asia"],
    roleLabel: "Play style", roles: ["Flexible", "Reroll", "Fast level 8", "Learning the basics"], coachingFocus: ["Economy & levelling", "Scouting & positioning", "Item decisions", "Board transitions"], tiers: [],
    services: [
      { slug: "coaching", title: "Ranked Coaching", navLabel: "Ranked coaching", description: "Work through your decisions with a coach, from your opening board to late-game positioning. Choose your queue, rank, and session length.", details: ["Economy, items, and positioning", "Private sessions, 1–10 hours"], group: "coaching", icon: "coaching", setup: { label: "Current rank", options: TFT_RANKS }, preparation: "Have your current set and a recent match in mind. You play on your own account while your coach guides the session." },
      { slug: "composition-planning", title: "Composition Planning", navLabel: "Compositions", description: "Learn when to commit, pivot, or play flex. Build a composition plan around your preferred play style and the current set.", details: ["Item holders and transition boards", "Adapt to contested compositions"], group: "coaching", icon: "rank", focusOptions: ["Flexible compositions", "Reroll timing", "Item holders", "Pivot decisions"], setup: { label: "Current rank", options: TFT_RANKS }, preparation: "Bring the compositions you enjoy. Your coach will tailor the plan to the set and patch you are playing." },
      { slug: "replay-review", title: "Match & Replay Review", navLabel: "Match review", description: "Review a recorded match together and identify the decisions worth changing. Turn the review into clear priorities for your next games.", details: ["Stage-by-stage decision review", "Economy and positioning feedback"], group: "coaching", icon: "wins", focusOptions: ["Economy mistakes", "Augment decisions", "Board transitions", "Late-game positioning"], setup: { label: "Current rank", options: TFT_RANKS }, preparation: "Bring a screen recording of a recent TFT match. A recording is needed for a full decision review; match history alone does not show every decision." },
    ],
  },
  "destiny-2-coaching": {
    artwork: "/games/destiny-2/hero.jpg", imagePosition: "48% 50%", accent: "#8ccee0", coachingOnly: true,
    headline: "Know the encounter. Own your role.",
    description: "Learn raid and dungeon mechanics, practise your role, or refine your Guardian’s build. Choose a focused session for your class and experience.",
    serviceIntro: "Build confidence in Destiny’s endgame. Pick an encounter or a build review, choose your class, and set aside time to learn with your coach.",
    modes: ["Live gameplay", "Screen-share walkthrough"], modeLabel: "Session format", platforms: ["PC", "PlayStation", "Xbox"], regions: ["Europe", "North America", "South America", "Asia", "Oceania"],
    roleLabel: "Guardian class", roles: ["Hunter", "Titan", "Warlock"], coachingFocus: ["Encounter mechanics", "Team roles", "Damage phases", "Survivability"], tiers: [],
    services: [
      { slug: "raid-coaching", title: "Raid Coaching", navLabel: "Raids", description: "Break down encounter mechanics, learn your role, and practise damage phases with a dedicated coach. Choose the raid you want to understand.", details: ["Encounter and role instruction", "Timed coaching on your own character"], group: "coaching", icon: "wins", setup: { label: "Raid", options: ["Choose with my coach", "Vault of Glass", "King’s Fall", "Crota’s End", "Salvation’s Edge", "The Desert Perpetual"] }, preparation: "Choose content you can access. This books time with a coach, not a full raid team or a guaranteed clear. Confirm your fireteam and encounter before the session." },
      { slug: "dungeon-coaching", title: "Dungeon Coaching", navLabel: "Dungeons", description: "Work on dungeon routes, mechanics, and survival. Choose an activity and focus on the encounters that give you trouble.", details: ["Mechanics and damage rotations", "A session tailored to your class"], group: "coaching", icon: "rank", focusOptions: ["Encounter mechanics", "Survival & recovery", "Damage rotations", "Solo preparation"], setup: { label: "Dungeon", options: ["Choose with my coach", "Prophecy", "Pit of Heresy", "Grasp of Avarice", "Duality", "Spire of the Watcher", "Ghosts of the Deep", "Warlord’s Ruin", "Vesper’s Host", "Sundered Doctrine", "Equilibrium"] }, preparation: "You need access to your selected dungeon. Your session covers coaching time; a full clear, flawless run, or particular loot drop is not included." },
      { slug: "build-review", title: "Guardian Build Review", navLabel: "Build review", description: "Review your gear, abilities, and damage loop with a coach. Build around the equipment you own and the activities you want to play.", details: ["Class and loadout-specific advice", "Gear, abilities, and survivability"], group: "coaching", icon: "coaching", focusOptions: ["Ability synergy", "Weapons & damage", "Survivability", "Endgame loadouts"], setup: { label: "Experience", options: SESSION_EXPERIENCE }, preparation: "Have your Guardian and current loadout ready to show. Your coach works with your available gear; items and unlocks are not part of this service." },
    ],
  },
  "ea-sports-fc-27-coaching": {
    artwork: "/games/ea-fc-27/hero.jpg", serviceArtwork: "/games/ea-fc-27/gameplay.jpg", imagePosition: "50% 42%", accent: "#a6e76b", coachingOnly: true,
    headline: "Build your squad. Play with a plan.",
    description: "Get more from your Ultimate Team, sharpen your tactics, and make better decisions on the pitch. Private coaching built around how you play FC 27.",
    serviceIntro: "Choose gameplay coaching, a tactical session, or a squad review. Every session uses your current team and goals as the starting point.",
    modes: ["Ultimate Team", "Kick Off / Online Friendlies"], modeLabel: "Game mode", platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch 2"], regions: ["Europe", "North America", "South America", "Asia", "Oceania", "Middle East"],
    roleLabel: "Playing style", roles: ["Balanced", "Possession", "Counter-attack", "High press"], coachingFocus: ["Defending", "Chance creation", "Finishing", "Match management"], tiers: [],
    services: [
      { slug: "coaching", title: "Ultimate Team Coaching", modes: ["Ultimate Team"], navLabel: "Gameplay", description: "Improve defending, chance creation, and finishing through a private gameplay session. Set a clear focus and choose the time you need.", details: ["Live gameplay or recorded match feedback", "Personalised to your playing style"], group: "coaching", icon: "coaching", setup: { label: "Experience", options: SESSION_EXPERIENCE }, preparation: "Bring a recent match recording or be ready to share your screen. You keep control of your own account throughout the session." },
      { slug: "tactics-coaching", title: "Tactics Workshop", navLabel: "Tactics", description: "Find a tactical approach that suits your team. Work on shape, player roles, defensive structure, and adjustments during a match.", details: ["Formation and player-role planning", "Build-up and defensive structure"], group: "coaching", icon: "rank", focusOptions: ["Formation & roles", "Build-up play", "Defensive shape", "In-game adjustments"], setup: { label: "Experience", options: SESSION_EXPERIENCE }, preparation: "Have your current tactics and starting lineup ready. The coach will explain the choices so you can adjust them yourself after the session." },
      { slug: "squad-review", title: "Ultimate Team Squad Review", modes: ["Ultimate Team"], navLabel: "Squad review", description: "Review your starting eleven, chemistry, bench, and upgrade priorities. Make a plan around the players and budget you already have.", details: ["Chemistry and role suitability", "Clear upgrade priorities"], group: "coaching", icon: "wins", focusOptions: ["Chemistry & roles", "Upgrade priorities", "Bench options", "Budget planning"], setup: { label: "Squad goal", options: ["Build my first squad", "Improve chemistry", "Upgrade key positions", "Adapt to a new formation"] }, preparation: "Bring a screenshot of your squad and your in-game budget. This is advice only; coins, player items, and purchases are not included." },
    ],
  },
  "rocket-league-boost": {
    artwork: "/homepage/rocketleague-homepage.webp", accent: "#6ba6ff", headline: "Your next rank. A cleaner game.",
    description: "Build your climb around the playlist you play. Choose a competitive target, a win package, or a private coaching session.",
    modes: ["Doubles (2v2)", "Standard (3v3)", "Duel (1v1)"], modeLabel: "Playlist", platforms: ["PC", "PlayStation", "Xbox"], regions: ["Europe", "North America East", "North America West", "South America", "Oceania", "Asia", "Middle East"],
    roleLabel: "Play style", roles: ["Balanced", "Offensive", "Defensive"], coachingFocus: ["Rotations", "Aerial control", "Recoveries", "Replay review", "Kickoffs"],
    tiers: tiers(["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Champion", "Grand Champion", "Supersonic Legend"], ["I", "II", "III"].flatMap(rank => ["I", "II", "III", "IV"].map(division => `${rank} · Division ${division}`))),
    services: services("Rocket League Rank Boost", "Choose your current rank and division, set your target, and select your competitive playlist. Your price updates with every selection.", ["Bronze to Supersonic Legend", "Playlist and division controls"], "Competitive Wins", "Improve rotations, mechanics, aerial control, or recoveries with a session built around your playlist."),
  },
  "league-of-legends-boost": {
    artwork: "/homepage/lol-homepage.webp", accent: "#65c8bd", headline: "Own your lane. Climb your way.",
    description: "A clear path from your current division to your next milestone. Configure ranked progression, wins, or coaching for your main role.",
    modes: ["Ranked Solo/Duo", "Ranked Flex"], modeLabel: "Queue", platforms: ["PC"], regions: ["EU West", "EU Nordic & East", "North America", "Brazil", "Latin America North", "Latin America South", "Oceania", "Türkiye", "Korea", "Japan", "Southeast Asia"],
    roleLabel: "Preferred role", roles: ["Top", "Jungle", "Mid", "Bot / ADC", "Support"], coachingFocus: ["Laning", "Macro decisions", "Vision control", "Champion mechanics", "Replay review"],
    tiers: tiers(["Iron", "Bronze", "Silver", "Gold", "Platinum", "Emerald", "Diamond", "Master"], descending), progressLabel: "Current LP",
    services: services("League of Legends Rank Boost", "Set your current rank, division, and LP, then choose your target. Tailor the order to your queue, role, and server.", ["Iron IV through Master", "Current LP taken into account"], "Ranked Wins", "Work on laning, vision, champion mechanics, or macro decisions with a coach focused on your main role."),
  },
  "marvel-rivals-boost": {
    artwork: "/homepage/marvelrivals-homepage.webp", accent: "#f2d54a", headline: "Your heroes. Your next milestone.",
    description: "Pick your role and build a competitive goal. Explore rank progression, fixed wins, and one-to-one hero coaching.",
    modes: ["Competitive"], modeLabel: "Mode", platforms: ["PC", "PlayStation", "Xbox"], regions: ["Europe", "North America", "South America", "Asia", "Oceania", "Middle East"],
    roleLabel: "Hero role", roles: ["Duelist", "Vanguard", "Strategist"], coachingFocus: ["Hero mechanics", "Positioning", "Team coordination", "Ultimate usage", "Replay review"],
    tiers: tiers(["Bronze", "Silver", "Gold", "Platinum", "Diamond", "Grandmaster", "Celestial", "Eternity"], ["III", "II", "I"]),
    services: services("Marvel Rivals Rank Boost", "Select your current and desired competitive tiers, then choose the platform, region, and role for your climb.", ["Bronze III through Eternity", "Duelist, Vanguard, or Strategist"], "Competitive Wins", "Refine hero mechanics, positioning, team coordination, and ultimate timing through private coaching."),
  },
  "apex-legends-boost": {
    artwork: "/homepage/apex-homepage.webp", accent: "#f8806d", headline: "A better plan for your next drop.",
    description: "Choose a ranked destination, build a win package, or sharpen your decision-making with a private coach.",
    modes: ["Ranked Battle Royale"], modeLabel: "Mode", platforms: ["PC", "PlayStation", "Xbox"], regions: ["Europe", "North America", "South America", "Asia", "Oceania", "Middle East"],
    roleLabel: "Legend class", roles: ["Assault", "Skirmisher", "Recon", "Support", "Controller"], coachingFocus: ["Rotations", "Fight selection", "Aim & tracking", "Positioning", "Replay review"],
    tiers: tiers(["Rookie", "Bronze", "Silver", "Gold", "Platinum", "Diamond", "Master"], descending),
    services: services("Apex Legends Rank Boost", "Configure your climb from your current division to your target rank, with platform, region, and legend-class preferences.", ["Rookie IV through Master", "Ranked Battle Royale"], "Battle Royale Wins", "Make better rotations, choose stronger fights, and improve positioning with a coach focused on your play style."),
  },
  "fortnite-boost": {
    artwork: "/homepage/fortnite-homepage-v3.webp", accent: "#ba94ff", headline: "Better endgames start here.",
    description: "Build your climb in Battle Royale, Zero Build, or Reload. Configure a rank target, fixed wins, or focused coaching.",
    modes: ["Battle Royale", "Zero Build", "Reload", "Reload Zero Build"], modeLabel: "Mode", platforms: ["PC", "PlayStation", "Xbox", "Nintendo Switch"], regions: ["Europe", "North America East", "North America Central", "North America West", "Brazil", "Asia", "Oceania", "Middle East"],
    roleLabel: "Input", roles: ["Keyboard & mouse", "Controller"], coachingFocus: ["Endgame decisions", "Aim", "Positioning", "Building & edits", "Replay review"],
    tiers: [ ...tiers(["Bronze", "Silver", "Gold", "Platinum", "Diamond"], ["I", "II", "III"], false), ...tiers(["Elite", "Champion", "Unreal"], [""]).map((tier, i) => ({ ...tier, color: COLORS[i + 5] })) ], progressLabel: "Current rank progress",
    services: services("Fortnite Rank Boost", "Set your current rank and progress, choose a target, and pick the Fortnite mode you want to climb in.", ["Bronze I through Unreal", "Separate targets for each mode"], "Victory Royale Wins", "Focus on aim, positioning, endgames, or building and edits with a private session tailored to your mode."),
  },
  "call-of-duty-boost": {
    artwork: "/homepage/cod-homepage-v3.webp", accent: "#b8ca98", headline: "Make every ranked session count.",
    description: "Set your Skill Rating target or book a focused session. Configure the title, platform, and format you play.",
    modes: ["Black Ops 7 Multiplayer", "Warzone"], modeLabel: "Title & mode", platforms: ["PC", "PlayStation", "Xbox"], regions: ["Europe", "North America", "South America", "Asia", "Oceania", "Middle East"],
    roleLabel: "Input", roles: ["Controller", "Keyboard & mouse"], coachingFocus: ["Aim & movement", "Map control", "Team play", "Rotations", "Replay review"], tiers: [], rating: { unit: "SR", step: 100, max: 10000, current: 2000, target: 3000 },
    services: services("Call of Duty SR Boost", "Enter your current Skill Rating and a higher target. Select your Call of Duty title, platform, region, and queue format.", ["Exact SR targets", "Multiplayer or Warzone"], "Ranked Wins", "Improve aim, movement, rotations, and map awareness with coaching for your Call of Duty title."),
  },
  "dota-2-boost": {
    artwork: "/homepage/dota2-homepage-v3.webp", accent: "#ee796b", headline: "Your MMR. Your next chapter.",
    description: "A precise target for your next climb. Configure MMR progression, ranked wins, or coaching around your main position.",
    modes: ["Ranked All Pick"], modeLabel: "Game mode", platforms: ["PC"], regions: ["Europe West", "Europe East", "Russia", "US East", "US West", "South America", "Southeast Asia", "China", "Australia"],
    roleLabel: "Preferred position", roles: ["Carry · Position 1", "Mid · Position 2", "Offlane · Position 3", "Soft support · Position 4", "Hard support · Position 5"], coachingFocus: ["Laning", "Item builds", "Map movement", "Team fights", "Replay review"], tiers: [], rating: { unit: "MMR", step: 100, max: 10000, current: 2000, target: 3000 },
    services: services("Dota 2 MMR Boost", "Choose your exact starting MMR and target rating. Customize your position, server, and queue format with a live price breakdown.", ["Exact MMR targets", "All five positions supported"], "Ranked Wins", "Strengthen your laning, item decisions, map movement, and team-fight impact with coaching for your position."),
  },
  "world-of-warcraft-boost": {
    artwork: "/homepage/wow-homepage-v2.webp", accent: "#e4b74c", headline: "Your next adventure, together.",
    description: "Choose your keystone level, raid, or coaching focus. Build a PvE session around your character and role.",
    modes: ["Retail"], modeLabel: "Game edition", platforms: ["PC"], regions: ["Europe", "North America"], roleLabel: "Character role", roles: ["Damage", "Tank", "Healer"], coachingFocus: ["Class rotation", "Dungeon mechanics", "Raid mechanics", "Healing", "Tanking"], tiers: [],
    services: [
      { slug: "dungeons", title: "Mythic+ Dungeons", navLabel: "Mythic+", description: "Choose your keystone level and number of runs. Configure your character role, region, and dungeon preference.", details: ["Keystone levels +2 to +20", "Single runs or a dungeon bundle"], group: "pve", icon: "rank" },
      { slug: "raids", title: "Raid Boost", navLabel: "Raids", description: "Choose your raid, difficulty, and clear format. Your session is scheduled around the selected region and roster.", details: ["Normal and Heroic difficulty", "Full clear or final boss"], group: "pve", icon: "wins" },
      { slug: "coaching", title: "Class Coaching", navLabel: "Coaching", description: "Refine your class rotation, encounter knowledge, or role in a private coaching session.", details: ["Choose your class and role", "Live coaching or replay review"], group: "coaching", icon: "coaching" },
    ],
  },
};

export const WOW_CLASSES = ["Death Knight", "Demon Hunter", "Druid", "Evoker", "Hunter", "Mage", "Monk", "Paladin", "Priest", "Rogue", "Shaman", "Warlock", "Warrior"];
export const WOW_CLASS_ROLES: Record<string, string[]> = {
  "Death Knight": ["Damage", "Tank"], "Demon Hunter": ["Damage", "Tank"], Druid: ["Damage", "Tank", "Healer"], Evoker: ["Damage", "Healer"], Hunter: ["Damage"], Mage: ["Damage"], Monk: ["Damage", "Tank", "Healer"], Paladin: ["Damage", "Tank", "Healer"], Priest: ["Damage", "Healer"], Rogue: ["Damage"], Shaman: ["Damage", "Healer"], Warlock: ["Damage"], Warrior: ["Damage", "Tank"],
};
export const WOW_RAIDS = ["The Voidspire", "The Dreamrift", "March on Quel’Danas", "Sporefall"];
export const WOW_DIFFICULTIES = ["Normal", "Heroic"];
export const WOW_RAID_SCOPES = ["Full clear", "Final boss"];
export const WOW_DUNGEON_PREFERENCES = ["Any available dungeon", "Different dungeons", "Repeat the same dungeon"];

export const ADDITIONAL_GAMES = GAME_DIRECTORY.filter(game => game.extended).map(game => ({ ...game, ...DETAILS[game.slug] }));
export type AdditionalGame = (typeof ADDITIONAL_GAMES)[number];
export function findAdditionalGame(slug: string) { return ADDITIONAL_GAMES.find(game => game.slug === slug); }
export function isCoachingService(game: AdditionalGame, slug: CatalogServiceSlug) {
  return game.services.find(service => service.slug === slug)?.group === "coaching";
}
export function coachingFocusOptions(game: AdditionalGame, mode: string, role: string, serviceSlug?: CatalogServiceSlug) {
  const service = game.services.find(item => item.slug === serviceSlug);
  return (service?.focusOptions ?? game.coachingFocus).filter(focus => {
    if (game.slug === "fortnite-boost" && mode.includes("Zero Build") && focus === "Building & edits") return false;
    if (game.slug === "world-of-warcraft-boost" && ((focus === "Healing" && role !== "Healer") || (focus === "Tanking" && role !== "Tank"))) return false;
    return true;
  });
}
export function rankSteps(game: AdditionalGame) {
  return game.tiers.flatMap((tier, tierIndex) => tier.divisions.map((division, divisionIndex) => ({ tier: tier.name, tierIndex, divisionIndex, division, color: tier.color, label: [tier.name, division].filter(Boolean).join(" ") })));
}
