"use client";

import Localized, { useLanguage } from "./Localization";
import { translate } from "../lib/localization";
import { useId, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, BarChart3, Check, Crosshair, Gauge, GraduationCap, Headphones, Target, Trophy } from "lucide-react";

type ServiceGroup = "rank" | "matches" | "coaching" | "pve";
const ICONS = { rank: Crosshair, rating: BarChart3, wins: Trophy, placements: Target, faceit: Gauge, coaching: GraduationCap };

export type GameService = {
  title: string;
  description: string;
  details: readonly string[];
  href: string;
  group: ServiceGroup;
  icon: keyof typeof ICONS;
  artwork?: string;
};

const LABELS = {
  en: { all: "All services", rank: "Rank progression", matches: "Matches & wins", coaching: "Coaching", action: "Customize order", help: "Not sure where to start?", support: "Talk to support", filter: "Find your goal", results: "services shown" },
  it: { all: "Tutti i servizi", rank: "Progressione rank", matches: "Partite e vittorie", coaching: "Coaching", action: "Personalizza ordine", help: "Non sai da dove iniziare?", support: "Contatta l’assistenza", filter: "Scegli il tuo obiettivo", results: "servizi mostrati" },
  fr: { all: "Tous les services", rank: "Progression de rang", matches: "Matchs et victoires", coaching: "Coaching", action: "Personnaliser", help: "Besoin d’aide pour choisir ?", support: "Contacter l’assistance", filter: "Choisissez votre objectif", results: "services affichés" },
  es: { all: "Todos los servicios", rank: "Subir de rango", matches: "Partidas y victorias", coaching: "Coaching", action: "Personalizar pedido", help: "¿No sabes por dónde empezar?", support: "Contactar con soporte", filter: "Elige tu objetivo", results: "servicios mostrados" },
  de: { all: "Alle Services", rank: "Rangaufstieg", matches: "Matches & Siege", coaching: "Coaching", action: "Auftrag anpassen", help: "Unsicher, wo du anfangen sollst?", support: "Support kontaktieren", filter: "Wähle dein Ziel", results: "Services angezeigt" },
  nl: { all: "Alle diensten", rank: "Rang verhogen", matches: "Matches & overwinningen", coaching: "Coaching", action: "Bestelling aanpassen", help: "Hulp nodig bij het kiezen?", support: "Neem contact op", filter: "Kies je doel", results: "diensten getoond" },
  pt: { all: "Todos os serviços", rank: "Subir de rank", matches: "Partidas e vitórias", coaching: "Coaching", action: "Personalizar pedido", help: "Não sabe por onde começar?", support: "Fale com o suporte", filter: "Escolha seu objetivo", results: "serviços exibidos" },
  uk: { all: "Усі послуги", rank: "Підвищення рангу", matches: "Матчі та перемоги", coaching: "Тренування", action: "Налаштувати замовлення", help: "Не знаєте, з чого почати?", support: "Написати в підтримку", filter: "Оберіть свою мету", results: "послуг показано" },
  ru: { all: "Все услуги", rank: "Повышение ранга", matches: "Матчи и победы", coaching: "Тренировки", action: "Настроить заказ", help: "Не знаете, с чего начать?", support: "Написать в поддержку", filter: "Выберите свою цель", results: "услуг показано" },
} as const;

const PVE_LABELS: Record<string, string> = { en: "Dungeons & raids", it: "Dungeon e raid", fr: "Donjons et raids", es: "Mazmorras y bandas", de: "Dungeons & Raids", nl: "Dungeons & raids", pt: "Masmorras e raides", uk: "Підземелля та рейди", ru: "Подземелья и рейды" };

export default function GameServiceCatalog({ services, actionLabel }: { services: readonly GameService[]; language?: string; actionLabel?: string }) {
  const [filter, setFilter] = useState<ServiceGroup | "all">("all");
  const resultsId = useId();
  const languageCode = useLanguage();
  const t = { ...LABELS.en, pve: PVE_LABELS.en };
  const action = actionLabel ?? t.action;
  const groups = (["all", "rank", "matches", "pve", "coaching"] as const).filter(group => group === "all" || services.some(service => service.group === group));
  const visible = services.filter(service => filter === "all" || service.group === filter);

  return (
    <Localized><div className="game-catalog">
      {groups.length > 2 && <div className="game-catalog-filters" role="group" aria-label={t.filter}>
        {groups.map(group => (
          <Localized key={group}><button key={group} type="button" aria-pressed={filter === group} aria-controls={resultsId} onClick={() => setFilter(group)}>
            {t[group]}<span>{group === "all" ? services.length : services.filter(service => service.group === group).length}</span>
          </button></Localized>
        ))}
      </div>}
      <p className="sr-only" role="status">{visible.length} {t.results}</p>
      <div id={resultsId} className="game-service-grid" data-count={visible.length}>
        {visible.map(service => {
          const Icon = ICONS[service.icon];
          return (
            <Localized key={service.href}><Link key={service.href} href={service.href} className="game-service-card" aria-label={`${translate(languageCode, service.title)} — ${translate(languageCode, action)}`}>
              <div className="game-service-art" aria-hidden>
                <span className="game-service-category">{t[service.group]}</span>
                {service.artwork ? <Image src={service.artwork} alt="" width={160} height={120} className="game-service-emblem" /> : <Icon className="game-service-emblem" strokeWidth={1.2} />}
                <span className="game-service-art-grid" />
              </div>
              <div className="game-service-body">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>{service.details.map(detail => <Localized key={detail}><li key={detail}><Check size={15} aria-hidden />{detail}</li></Localized>)}</ul>
                <span className="game-service-action">{action}<ArrowRight size={18} aria-hidden /></span>
              </div>
            </Link></Localized>
          );
        })}
      </div>
      <div className="game-catalog-help">
        <span><Headphones size={18} aria-hidden />{t.help}</span>
        <Link href="/contact">{t.support}<ArrowRight size={15} aria-hidden /></Link>
      </div>
    </div></Localized>
  );
}
