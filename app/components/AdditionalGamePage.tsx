import Localized from "./Localization";
import type { CSSProperties } from "react";
import Link from "next/link";
import { ArrowRight, Settings2, UsersRound, ShieldCheck, Headphones, LockKeyhole, Target } from "lucide-react";
import GameHero from "./GameHero";
import GameServiceCatalog from "./GameServiceCatalog";
import { type AdditionalGame } from "../lib/additional-games";

const STEPS = [
  { icon: Settings2, title: "Build your order", description: "Choose your target, game settings, and extras. Your total updates with every selection." },
  { icon: UsersRound, title: "Meet your specialist", description: "Your game, region, and preferred format guide the specialist assignment and session setup." },
  { icon: ShieldCheck, title: "Follow your progress", description: "Start with an agreed goal and contact support whenever you need help along the way." },
];

export default function AdditionalGamePage({ game, language }: { game: AdditionalGame; language: string }) {
  const basePath = `/${language}/${game.slug}`;
  const wow = game.slug === "world-of-warcraft-boost";
  return (
    <Localized><main className="game-overview min-h-screen bg-[var(--background)] text-[var(--foreground)]" lang="en" style={{ "--game-accent": game.accent } as CSSProperties}>
      <GameHero name={game.name} description={game.description} artwork={game.artwork} icon={game.icon} language={language} imagePosition={game.imagePosition} eyebrow={game.coachingOnly ? "Private coaching" : undefined} />
      <div className="catalog-assurances"><div className="page-container">{[{ icon: Target, text: "Your goal, your setup" }, { icon: UsersRound, text: "Game-specific services" }, { icon: LockKeyhole, text: "Secure checkout" }, { icon: Headphones, text: "Support throughout" }].map(({icon: Icon, text}) => <Localized key={text}><span key={text}><Icon size={17} aria-hidden />{text}</span></Localized>)}</div></div>
      <section id="services" className="request-catalog-section page-container" aria-labelledby="services-title">
        <div className="request-section-heading"><div><span className="request-eyebrow">{game.name} services</span><h2 id="services-title">{game.headline}</h2></div><p>{game.serviceIntro ?? (wow ? "Build a dungeon bundle, choose your raid, or work on your class with a coach. Every service has its own configuration." : "Choose a clear target or focus on the skills behind your next rank. Customize your service and see the total before checkout.")}</p></div>
        <GameServiceCatalog language={language} services={game.services.map(service => ({ ...service, href: `${basePath}/${service.slug}` }))} />
      </section>
      <section id="how" className="request-process page-container" aria-labelledby="how-title">
        <div className="request-section-heading"><div><span className="request-eyebrow">From setup to progress</span><h2 id="how-title">Your next step, made simple.</h2></div></div>
        <div className="request-steps">{STEPS.map((step, index) => <Localized key={step.title}><article key={step.title}><div className="request-step-top"><step.icon size={24} aria-hidden /><span>0{index + 1}</span></div><h3>{step.title}</h3><p>{step.description}</p></article></Localized>)}</div>
      </section>
      <section id="faq" className="request-faq page-container" aria-labelledby="faq-title">
        <div><span className="request-eyebrow">Good to know</span><h2 id="faq-title">Before you get started.</h2><p>A few details about your {game.name} service.</p><Link href="/contact">Talk to support <ArrowRight size={16} aria-hidden /></Link></div>
        <div className="request-faq-list">
          <details><summary>Can I customize my order?</summary><p>Yes. Each service includes controls for your goal, {game.modeLabel.toLowerCase()}, region, and {game.roleLabel.toLowerCase()}. The order summary and price update as you choose.</p></details>
          <details><summary>How do I see the price?</summary><p>Open a service and build your configuration. The live summary shows the total, selected extras, and any applied discount before checkout.</p></details>
          <details><summary>{wow ? "Which edition are these services for?" : "Which platforms can I choose?"}</summary><p>{wow ? "The dungeon and raid configurators are for Retail. Choose your class, role, and region so the session fits your character." : `The configurators support ${game.platforms.join(", ")}. Select your platform and region before checkout.`}</p></details>
          <details><summary>{game.coachingOnly ? "What should I prepare for my session?" : "Can I book coaching instead?"}</summary><p>{game.coachingOnly ? "Each service explains what to bring, such as a match recording, your squad, or your character loadout. You stay on your own account. Session time covers coaching; ranks, wins, clears, and item drops are not guaranteed." : "Yes. Choose coaching to set the session length and a specific focus, then add a recording or personal practice plan if you want one."}</p></details>
        </div>
      </section>
    </main></Localized>
  );
}
