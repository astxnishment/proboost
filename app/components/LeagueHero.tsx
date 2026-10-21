import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, ChevronRight, Headphones, Monitor } from "lucide-react";
import Localized from "./Localization";
import { LiveChatButton } from "./LiveChat";
import GameSearchStructuredData from "./GameSearchStructuredData";
import { getGameSeo } from "../lib/game-seo";
import styles from "./LeagueOverview.module.css";

export default function LeagueHero({ language }: { language: string }) {
  const seo = getGameSeo("league-of-legends-boost", language)!;

  return <>
    <GameSearchStructuredData slug="league-of-legends-boost" language={language} />
    <Localized>
      <div className="page-container">
        <nav className={`game-breadcrumb ${styles.breadcrumb}`} aria-label="Breadcrumb">
          <Link href="/#games">All games</Link>
          <ChevronRight size={13} aria-hidden />
          <span aria-current="page">League of Legends</span>
        </nav>
        <section className={styles.hero} aria-labelledby="game-title">
          {/* Official splash artwork: https://ddragon.leagueoflegends.com/cdn/img/champion/splash/Ahri_0.jpg */}
          <div className={styles.artwork} aria-hidden>
            <Image src="/games/league-of-legends/ahri-splash.jpg" alt="" fill preload sizes="(max-width: 767px) 100vw, (max-width: 1400px) 70vw, 900px" />
          </div>
          <div className={styles.copy}>
            <div className={styles.eyebrow}>
              <span aria-hidden className={styles.eyebrowMark} />
              <span>League of Legends</span>
              <span className={styles.platform}><Monitor size={13} aria-hidden />PC</span>
            </div>
            <h1 id="game-title">{seo.heading}</h1>
            <p>A clear path from your current division to your next milestone. Configure ranked progression, wins, or coaching for your main role.</p>
            <div className={styles.actions}>
              <a className={styles.primary} href="#services">Choose a service<ArrowRight size={18} aria-hidden /></a>
              <LiveChatButton className={styles.support}><Headphones size={17} aria-hidden />Ask support</LiveChatButton>
            </div>
            <ul className={styles.queues} aria-label="Queue">
              <li><Check size={14} aria-hidden />Ranked Solo/Duo</li>
              <li><Check size={14} aria-hidden />Ranked Flex</li>
            </ul>
          </div>
          <Image className={styles.logo} src="/homepage/lol-text-homepage.webp" width={144} height={56} alt="" aria-hidden />
        </section>
        <div className={styles.heroFooter}>
          <nav className={styles.sectionNav} aria-label="League of Legends sections">
            <a href="#services">Services<ArrowRight size={14} aria-hidden /></a>
            <a href="#how">How it works</a>
            <a href="#faq">FAQs</a>
          </nav>
          <span className={styles.checkout}><Check size={15} aria-hidden />Secure checkout</span>
        </div>
      </div>
    </Localized>
  </>;
}
