import Localized from "./Localization";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, ChevronRight, Headphones } from "lucide-react";

const LABELS = {
  en: ["All games", "Boosting services", "Choose a service", "Ask support", "Services", "How it works", "FAQs"],
  it: ["Tutti i giochi", "Servizi di boost", "Scegli un servizio", "Assistenza", "Servizi", "Come funziona", "FAQ"],
  fr: ["Tous les jeux", "Services de boost", "Choisir un service", "Assistance", "Services", "Comment ça marche", "FAQ"],
  es: ["Todos los juegos", "Servicios de boost", "Elegir un servicio", "Ayuda", "Servicios", "Cómo funciona", "Preguntas"],
  de: ["Alle Spiele", "Boosting-Services", "Service auswählen", "Support", "Services", "So funktioniert es", "FAQ"],
  nl: ["Alle games", "Boostingdiensten", "Kies een dienst", "Ondersteuning", "Diensten", "Hoe het werkt", "FAQ"],
  pt: ["Todos os jogos", "Serviços de boost", "Escolha um serviço", "Suporte", "Serviços", "Como funciona", "Perguntas"],
  uk: ["Усі ігри", "Послуги бустингу", "Обрати послугу", "Підтримка", "Послуги", "Як це працює", "Запитання"],
  ru: ["Все игры", "Услуги бустинга", "Выбрать услугу", "Поддержка", "Услуги", "Как это работает", "Вопросы"],
} as const;

export default function GameHero({
  name, description, artwork, icon,  servicesId = "services", imagePosition = "center", eyebrow,
}: {
  name: string;
  description: string;
  artwork: string;
  icon: string;
  language?: string;
  servicesId?: string;
  imagePosition?: string;
  eyebrow?: string;
}) {
  const t = LABELS.en;

  return (
    <Localized><>
      <section className="game-hero" aria-labelledby="game-title">
        <div className="page-container">
          <nav className="game-breadcrumb" aria-label="Breadcrumb">
            <Link href="/#games">{t[0]}</Link>
            <ChevronRight size={13} aria-hidden />
            <span aria-current="page">{name}</span>
          </nav>
          <div className="game-hero-layout">
            <div className="game-hero-copy">
              <div className="game-hero-eyebrow">
                <Image src={icon} width={32} height={32} alt="" />
                <span>{eyebrow ?? t[1]}</span>
              </div>
              <h1 id="game-title">{name}</h1>
              <p>{description}</p>
              <div className="game-hero-actions">
                <a className="button-large game-primary-button" href={`#${servicesId}`}>
                  {t[2]} <ArrowRight size={17} aria-hidden />
                </a>
                <Link className="button-large button-secondary" href="/contact">
                  <Headphones size={17} aria-hidden />{t[3]}
                </Link>
              </div>
            </div>
            <div className="game-hero-visual">
              <Image src={artwork} alt="" fill preload sizes="(max-width: 767px) 100vw, 50vw" style={{ objectPosition: imagePosition }} />
              <div className="game-hero-visual-shade" aria-hidden />
              <span className="game-hero-caption" aria-hidden>{name}</span>
            </div>
          </div>
        </div>
      </section>
      <nav className="game-section-nav" aria-label={`${name} sections`}>
        <div className="page-container">
          <a href={`#${servicesId}`}>{t[4]}<ArrowRight size={14} aria-hidden /></a>
          <a href="#how">{t[5]}</a>
          <a href="#faq">{t[6]}</a>
        </div>
      </nav>
    </></Localized>
  );
}
