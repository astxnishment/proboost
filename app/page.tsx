"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

const LANGUAGES = [
  { code: "en", name: "English",      flag: "us" },
  { code: "it", name: "Italiano",     flag: "it" },
  { code: "fr", name: "Fran\u00e7ais",flag: "fr" },
  { code: "es", name: "Espa\u00f1ol", flag: "es" },
  { code: "de", name: "Deutsch",      flag: "de" },
  { code: "nl", name: "Nederlands",   flag: "nl" },
  { code: "pt", name: "Portugu\u00eas",flag: "pt" },
  { code: "uk", name: "\u0423\u043a\u0440\u0430\u0457\u043d\u0441\u044c\u043a\u0430", flag: "ua" },
  { code: "ru", name: "\u0420\u0443\u0441\u0441\u043a\u0438\u0439", flag: "ru" },
] as const;

type LangCode = (typeof LANGUAGES)[number]["code"];

const i18n: Record<LangCode, {
  badge: string;
  hero: string;
  sub: string;
  ctaPrimary: string;
  ctaSecondary: string;
  ratedTitle: string;
  ratedSub: string;
  selectedGame: string;
  gameDesc: string;
  safeTitle: string;
  safeSub: string;
  liveSpecialists: string;
  verifiedRating: string;
  avgResponse: string;
  liveSpecialistsDetail: string;
  verifiedRatingDetail: string;
  avgResponseDetail: string;
  selectYourGame: string;
  pickGame: string;
  gameSectionSub: string;
  platformReady: string;
  enterService: string;
  openNow: string;
  comingSoon: string;
  soon: string;
  howItWorksLabel: string;
  howItWorksTitle: string;
  howItWorksSub: string;
  trustPoints: readonly [string, string, string, string];
  steps: readonly [
    { step: string; title: string; description: string },
    { step: string; title: string; description: string },
    { step: string; title: string; description: string }
  ];
  rewardsLabel: string;
  rewardsTitle: string;
  rewardsCta: string;
  perks: readonly [
    { title: string; description: string },
    { title: string; description: string },
    { title: string; description: string }
  ];
}> = {
  en: {
    badge: "Trusted by 10,000+ players across all platforms",
    hero: "Rank up faster with verified specialists.",
    sub: "ProBoost connects you with real, high-rated players who handle your rank climb safely and fast. Pick your game, set your goal, and let a verified booster do the rest.",
    ctaPrimary: "Open Rainbow Six Siege Boost",
    ctaSecondary: "Browse Supported Games",
    ratedTitle: "Rated highly by repeat customers",
    ratedSub: "Fast entry points, clear service navigation, and strong visual hierarchy.",
    selectedGame: "Selected Game",
    gameDesc: "The most popular boosting service on the platform, available now.",
    safeTitle: "Accounts stay safe, every time",
    safeSub: "Every order is handled by a real, verified player using region-matched VPN sessions. No bots, no automation \u2014 just clean, manual gameplay from start to finish.",
    liveSpecialists: "Live specialists",
    verifiedRating: "Verified rating",
    avgResponse: "Average response",
    liveSpecialistsDetail: "Active boosters currently handling orders across supported regions.",
    verifiedRatingDetail: "Built around transparent delivery, account-safe handling, and fast support.",
    avgResponseDetail: "Orders and questions are reviewed quickly so customers are not left waiting.",
    selectYourGame: "Select Your Game",
    pickGame: "Pick your game and get started.",
    gameSectionSub: "Select from our supported titles. Live services open immediately \u2014 new games are added each season as boosters are vetted and verified.",
    platformReady: "Platform-ready workflow",
    enterService: "Enter service",
    openNow: "Open now",
    comingSoon: "Coming soon",
    soon: "Soon",
    howItWorksLabel: "How It Works",
    howItWorksTitle: "Simple, transparent, and fast.",
    howItWorksSub: "Every order follows a clear three-step flow. Pick your service, configure your preferences, and track live progress \u2014 no waiting around, no ambiguity.",
    trustPoints: [
      "Real players only with manual gameplay",
      "VPN-matched sessions for region consistency",
      "Private order flow with direct support updates",
      "Flexible queue options for solo or duo boosting",
    ],
    steps: [
      { step: "01", title: "Pick your game", description: "Start from the homepage and enter the service that matches the title you want to push." },
      { step: "02", title: "Customize the order", description: "Set rank goals, platform, and add-ons from the calculator before checkout." },
      { step: "03", title: "Track the progress", description: "Follow your order status and stay in control while the assigned booster completes the run." },
    ],
    rewardsLabel: "Exclusive Rewards",
    rewardsTitle: "Exclusive perks for every order.",
    rewardsCta: "Enter the Rainbow Six order flow",
    perks: [
      { title: "Reward ladder", description: "Each completed order contributes toward higher account perks, faster support routing, and priority handling." },
      { title: "Precision delivery", description: "Every order is configured around your current rank state so pricing and expected time remain clear." },
      { title: "Premium handling", description: "Elite boosters, duo options, and custom requests are available when you need a tighter delivery window." },
    ],
  },
  it: {
    badge: "Scelto da oltre 10.000 giocatori su tutte le piattaforme",
    hero: "Sali di rank pi\u00f9 velocemente con specialisti verificati.",
    sub: "ProBoost ti mette in contatto con giocatori reali e di alto livello che gestiscono la tua scalata in modo sicuro e rapido. Scegli il gioco, imposta il tuo obiettivo e lascia fare a un booster verificato.",
    ctaPrimary: "Apri Rainbow Six Siege Boost",
    ctaSecondary: "Sfoglia i giochi supportati",
    ratedTitle: "Valutato positivamente dai clienti abituali",
    ratedSub: "Accesso rapido, navigazione chiara e gerarchia visiva efficace.",
    selectedGame: "Gioco selezionato",
    gameDesc: "Il servizio di boosting pi\u00f9 popolare sulla piattaforma, disponibile ora.",
    safeTitle: "Gli account sono sempre al sicuro",
    safeSub: "Ogni ordine \u00e8 gestito da un giocatore reale e verificato tramite sessioni VPN adattate alla tua regione. Niente bot, niente automazione \u2014 solo gameplay manuale e pulito dall'inizio alla fine.",
    liveSpecialists: "Specialisti attivi",
    verifiedRating: "Valutazione verificata",
    avgResponse: "Risposta media",
    liveSpecialistsDetail: "Booster attivi che gestiscono ordini in tutte le regioni supportate.",
    verifiedRatingDetail: "Costruito attorno a una consegna trasparente, gestione sicura e supporto rapido.",
    avgResponseDetail: "Ordini e domande vengono esaminati rapidamente cos\u00ec i clienti non aspettano.",
    selectYourGame: "Seleziona il tuo gioco",
    pickGame: "Scegli il tuo gioco e inizia.",
    gameSectionSub: "Seleziona tra i titoli supportati. I servizi live si aprono immediatamente \u2014 nuovi giochi vengono aggiunti ogni stagione.",
    platformReady: "Workflow pronto per la piattaforma",
    enterService: "Entra nel servizio",
    openNow: "Aperto ora",
    comingSoon: "Prossimamente",
    soon: "Presto",
    howItWorksLabel: "Come funziona",
    howItWorksTitle: "Semplice, trasparente e veloce.",
    howItWorksSub: "Ogni ordine segue un flusso chiaro in tre fasi. Scegli il servizio, configura le preferenze e monitora il progresso in tempo reale.",
    trustPoints: [
      "Solo giocatori reali con gameplay manuale",
      "Sessioni VPN adattate alla regione",
      "Flusso d'ordine privato con aggiornamenti diretti",
      "Opzioni di coda flessibili per solo o duo",
    ],
    steps: [
      { step: "01", title: "Scegli il tuo gioco", description: "Inizia dalla homepage ed entra nel servizio che corrisponde al titolo che vuoi potenziare." },
      { step: "02", title: "Personalizza l'ordine", description: "Imposta gli obiettivi di rank, piattaforma e add-on dal calcolatore prima del checkout." },
      { step: "03", title: "Monitora il progresso", description: "Segui lo stato del tuo ordine e resta in controllo mentre il booster assegnato completa il lavoro." },
    ],
    rewardsLabel: "Premi esclusivi",
    rewardsTitle: "Vantaggi esclusivi per ogni ordine.",
    rewardsCta: "Entra nel flusso ordini di Rainbow Six",
    perks: [
      { title: "Scala di premi", description: "Ogni ordine completato contribuisce a vantaggi account superiori e gestione prioritaria." },
      { title: "Consegna precisa", description: "Ogni ordine \u00e8 configurato attorno al tuo rank attuale cos\u00ec prezzi e tempi rimangono chiari." },
      { title: "Gestione premium", description: "Booster d'\u00e9lite, opzioni duo e richieste personalizzate disponibili quando hai bisogno." },
    ],
  },
  fr: {
    badge: "Fait confiance par plus de 10\u202f000 joueurs sur toutes les plateformes",
    hero: "Montez de rang plus vite avec des sp\u00e9cialistes v\u00e9rifi\u00e9s.",
    sub: "ProBoost vous met en relation avec de vrais joueurs haut niveau qui g\u00e8rent votre mont\u00e9e en rang en toute s\u00e9curit\u00e9. Choisissez votre jeu, fixez votre objectif et laissez un booster v\u00e9rifi\u00e9 s'occuper du reste.",
    ctaPrimary: "Ouvrir Rainbow Six Siege Boost",
    ctaSecondary: "Voir les jeux support\u00e9s",
    ratedTitle: "Tr\u00e8s bien not\u00e9 par les clients r\u00e9guliers",
    ratedSub: "Points d'entr\u00e9e rapides, navigation claire et hi\u00e9rarchie visuelle efficace.",
    selectedGame: "Jeu s\u00e9lectionn\u00e9",
    gameDesc: "Le service de boosting le plus populaire sur la plateforme, disponible maintenant.",
    safeTitle: "Les comptes restent s\u00e9curis\u00e9s, \u00e0 chaque fois",
    safeSub: "Chaque commande est g\u00e9r\u00e9e par un vrai joueur v\u00e9rifi\u00e9 via des sessions VPN adapt\u00e9es \u00e0 votre r\u00e9gion. Pas de bots, pas d'automatisation \u2014 uniquement du gameplay manuel et propre.",
    liveSpecialists: "Sp\u00e9cialistes actifs",
    verifiedRating: "Note v\u00e9rifi\u00e9e",
    avgResponse: "R\u00e9ponse moyenne",
    liveSpecialistsDetail: "Boosters actifs traitant des commandes dans toutes les r\u00e9gions support\u00e9es.",
    verifiedRatingDetail: "Construit autour d'une livraison transparente, d'une gestion s\u00e9curis\u00e9e et d'un support rapide.",
    avgResponseDetail: "Les commandes et questions sont examin\u00e9es rapidement afin que les clients n'attendent pas.",
    selectYourGame: "S\u00e9lectionnez votre jeu",
    pickGame: "Choisissez votre jeu et commencez.",
    gameSectionSub: "S\u00e9lectionnez parmi nos titres support\u00e9s. Les services en direct s'ouvrent imm\u00e9diatement \u2014 de nouveaux jeux sont ajout\u00e9s chaque saison.",
    platformReady: "Workflow pr\u00eat pour la plateforme",
    enterService: "Acc\u00e9der au service",
    openNow: "Ouvert",
    comingSoon: "Bient\u00f4t disponible",
    soon: "Bient\u00f4t",
    howItWorksLabel: "Comment \u00e7a marche",
    howItWorksTitle: "Simple, transparent et rapide.",
    howItWorksSub: "Chaque commande suit un flux clair en trois \u00e9tapes. Choisissez votre service, configurez vos pr\u00e9f\u00e9rences et suivez la progression en direct.",
    trustPoints: [
      "Uniquement de vrais joueurs avec du gameplay manuel",
      "Sessions VPN adapt\u00e9es \u00e0 la r\u00e9gion",
      "Flux de commande priv\u00e9 avec mises \u00e0 jour directes",
      "Options de file flexibles pour solo ou duo",
    ],
    steps: [
      { step: "01", title: "Choisissez votre jeu", description: "D\u00e9marrez depuis la page d'accueil et acc\u00e9dez au service correspondant au titre que vous souhaitez pousser." },
      { step: "02", title: "Personnalisez la commande", description: "D\u00e9finissez les objectifs de rang, la plateforme et les add-ons depuis le calculateur avant le paiement." },
      { step: "03", title: "Suivez la progression", description: "Suivez l'\u00e9tat de votre commande et restez en contr\u00f4le pendant que le booster assign\u00e9 termine la mission." },
    ],
    rewardsLabel: "R\u00e9compenses exclusives",
    rewardsTitle: "Avantages exclusifs pour chaque commande.",
    rewardsCta: "Acc\u00e9der au flux de commande Rainbow Six",
    perks: [
      { title: "\u00c9chelle de r\u00e9compenses", description: "Chaque commande compl\u00e9t\u00e9e contribue \u00e0 des avantages de compte plus \u00e9lev\u00e9s et \u00e0 une gestion prioritaire." },
      { title: "Livraison pr\u00e9cise", description: "Chaque commande est configur\u00e9e autour de votre rang actuel pour que les prix et d\u00e9lais restent clairs." },
      { title: "Gestion premium", description: "Boosters d'\u00e9lite, options duo et demandes personnalis\u00e9es disponibles quand vous en avez besoin." },
    ],
  },
  es: {
    badge: "Confiado por m\u00e1s de 10.000 jugadores en todas las plataformas",
    hero: "Sube de rango m\u00e1s r\u00e1pido con especialistas verificados.",
    sub: "ProBoost te conecta con jugadores reales de alto nivel que gestionan tu subida de rango de forma segura y r\u00e1pida. Elige tu juego, establece tu objetivo y deja que un booster verificado haga el resto.",
    ctaPrimary: "Abrir Rainbow Six Siege Boost",
    ctaSecondary: "Ver juegos compatibles",
    ratedTitle: "Muy bien valorado por clientes habituales",
    ratedSub: "Acceso r\u00e1pido, navegaci\u00f3n clara y jerarqu\u00eda visual s\u00f3lida.",
    selectedGame: "Juego seleccionado",
    gameDesc: "El servicio de boosting m\u00e1s popular de la plataforma, disponible ahora.",
    safeTitle: "Las cuentas siempre est\u00e1n seguras",
    safeSub: "Cada pedido es gestionado por un jugador real y verificado mediante sesiones VPN adaptadas a tu regi\u00f3n. Sin bots, sin automatizaci\u00f3n \u2014 solo gameplay manual y limpio de principio a fin.",
    liveSpecialists: "Especialistas activos",
    verifiedRating: "Valoraci\u00f3n verificada",
    avgResponse: "Respuesta media",
    liveSpecialistsDetail: "Boosters activos gestionando pedidos en todas las regiones compatibles.",
    verifiedRatingDetail: "Construido en torno a una entrega transparente, gesti\u00f3n segura y soporte r\u00e1pido.",
    avgResponseDetail: "Los pedidos y preguntas se revisan r\u00e1pidamente para que los clientes no esperen.",
    selectYourGame: "Selecciona tu juego",
    pickGame: "Elige tu juego y empieza.",
    gameSectionSub: "Selecciona entre nuestros t\u00edtulos compatibles. Los servicios en vivo se abren de inmediato \u2014 se a\u00f1aden nuevos juegos cada temporada.",
    platformReady: "Flujo listo para la plataforma",
    enterService: "Entrar al servicio",
    openNow: "Abierto",
    comingSoon: "Pr\u00f3ximamente",
    soon: "Pronto",
    howItWorksLabel: "C\u00f3mo funciona",
    howItWorksTitle: "Simple, transparente y r\u00e1pido.",
    howItWorksSub: "Cada pedido sigue un flujo claro en tres pasos. Elige tu servicio, configura tus preferencias y sigue el progreso en vivo.",
    trustPoints: [
      "Solo jugadores reales con gameplay manual",
      "Sesiones VPN adaptadas a la regi\u00f3n",
      "Flujo de pedido privado con actualizaciones directas",
      "Opciones de cola flexibles para solo o d\u00fao",
    ],
    steps: [
      { step: "01", title: "Elige tu juego", description: "Comienza desde la p\u00e1gina de inicio y entra al servicio que corresponde al t\u00edtulo que quieres impulsar." },
      { step: "02", title: "Personaliza el pedido", description: "Establece objetivos de rango, plataforma y add-ons desde la calculadora antes del pago." },
      { step: "03", title: "Sigue el progreso", description: "Monitoriza el estado de tu pedido y mant\u00e9n el control mientras el booster asignado completa la tarea." },
    ],
    rewardsLabel: "Recompensas exclusivas",
    rewardsTitle: "Ventajas exclusivas por cada pedido.",
    rewardsCta: "Entrar al flujo de pedidos de Rainbow Six",
    perks: [
      { title: "Escalera de recompensas", description: "Cada pedido completado contribuye a ventajas de cuenta superiores y gesti\u00f3n prioritaria." },
      { title: "Entrega de precisi\u00f3n", description: "Cada pedido se configura seg\u00fan tu rango actual para que los precios y tiempos sean claros." },
      { title: "Gesti\u00f3n premium", description: "Boosters de \u00e9lite, opciones d\u00fao y solicitudes personalizadas disponibles cuando las necesites." },
    ],
  },
  de: {
    badge: "Von \u00fcber 10.000 Spielern auf allen Plattformen vertraut",
    hero: "Steige schneller im Rang auf mit verifizierten Spezialisten.",
    sub: "ProBoost verbindet dich mit echten, hochrangigen Spielern, die deinen Rangaufstieg sicher und schnell abwickeln. W\u00e4hle dein Spiel, setze dein Ziel und lass einen verifizierten Booster den Rest erledigen.",
    ctaPrimary: "Rainbow Six Siege Boost \u00f6ffnen",
    ctaSecondary: "Unterst\u00fctzte Spiele ansehen",
    ratedTitle: "Von Stammkunden hoch bewertet",
    ratedSub: "Schnelle Einstiegspunkte, klare Navigation und starke visuelle Hierarchie.",
    selectedGame: "Ausgew\u00e4hltes Spiel",
    gameDesc: "Der beliebteste Boosting-Service auf der Plattform, jetzt verf\u00fcgbar.",
    safeTitle: "Konten bleiben immer sicher",
    safeSub: "Jede Bestellung wird von einem echten, verifizierten Spieler \u00fcber regionangepasste VPN-Sitzungen abgewickelt. Keine Bots, keine Automatisierung \u2014 nur sauberes, manuelles Gameplay von Anfang bis Ende.",
    liveSpecialists: "Aktive Spezialisten",
    verifiedRating: "Verifizierte Bewertung",
    avgResponse: "Durchschn. Antwortzeit",
    liveSpecialistsDetail: "Aktive Booster, die derzeit Bestellungen in allen unterst\u00fctzten Regionen bearbeiten.",
    verifiedRatingDetail: "Aufgebaut auf transparente Lieferung, kontosicherer Handhabung und schnellem Support.",
    avgResponseDetail: "Bestellungen und Fragen werden schnell bearbeitet, damit Kunden nicht warten m\u00fcssen.",
    selectYourGame: "W\u00e4hle dein Spiel",
    pickGame: "W\u00e4hle dein Spiel und lege los.",
    gameSectionSub: "W\u00e4hle aus unseren unterst\u00fctzten Titeln. Live-Services \u00f6ffnen sofort \u2014 neue Spiele werden jede Saison hinzugef\u00fcgt.",
    platformReady: "Plattformfertiger Workflow",
    enterService: "Service betreten",
    openNow: "Ge\u00f6ffnet",
    comingSoon: "Demnächst",
    soon: "Bald",
    howItWorksLabel: "So funktioniert es",
    howItWorksTitle: "Einfach, transparent und schnell.",
    howItWorksSub: "Jede Bestellung folgt einem klaren Drei-Schritte-Ablauf. W\u00e4hle deinen Service, konfiguriere deine Pr\u00e4ferenzen und verfolge den Fortschritt live.",
    trustPoints: [
      "Nur echte Spieler mit manuellem Gameplay",
      "VPN-Sitzungen passend zur Region",
      "Privater Bestellablauf mit direkten Updates",
      "Flexible Warteschlangenoptionen f\u00fcr Solo oder Duo",
    ],
    steps: [
      { step: "01", title: "W\u00e4hle dein Spiel", description: "Starte von der Startseite aus und gib den Service ein, der dem Titel entspricht, den du pushen m\u00f6chtest." },
      { step: "02", title: "Bestellung anpassen", description: "Lege Rangziele, Plattform und Add-ons im Rechner fest, bevor du zur Kasse gehst." },
      { step: "03", title: "Fortschritt verfolgen", description: "Verfolge deinen Bestellstatus und behalte die Kontrolle, w\u00e4hrend der zugewiesene Booster die Aufgabe abschlie\u00dft." },
    ],
    rewardsLabel: "Exklusive Belohnungen",
    rewardsTitle: "Exklusive Vorteile f\u00fcr jede Bestellung.",
    rewardsCta: "Zum Rainbow Six Bestellablauf",
    perks: [
      { title: "Belohnungsleiter", description: "Jede abgeschlossene Bestellung tr\u00e4gt zu h\u00f6heren Kontovorteilen und priorisierter Bearbeitung bei." },
      { title: "Pr\u00e4zisionslieferung", description: "Jede Bestellung wird um deinen aktuellen Rangstatus konfiguriert, damit Preise und Zeiten klar bleiben." },
      { title: "Premium-Handling", description: "Elite-Booster, Duo-Optionen und benutzerdefinierte Anfragen verf\u00fcgbar, wenn du ein engeres Lieferfenster ben\u00f6tigst." },
    ],
  },
  nl: {
    badge: "Vertrouwd door meer dan 10.000 spelers op alle platforms",
    hero: "Rank sneller omhoog met geverifieerde specialisten.",
    sub: "ProBoost verbindt je met echte, hooggerankte spelers die jouw rankklim veilig en snel afhandelen. Kies je spel, stel je doel in en laat een geverifieerde booster de rest doen.",
    ctaPrimary: "Open Rainbow Six Siege Boost",
    ctaSecondary: "Bekijk ondersteunde spellen",
    ratedTitle: "Hoog beoordeeld door vaste klanten",
    ratedSub: "Snelle toegangspunten, duidelijke navigatie en sterke visuele hi\u00ebrarchie.",
    selectedGame: "Geselecteerd spel",
    gameDesc: "De meest populaire boostingservice op het platform, nu beschikbaar.",
    safeTitle: "Accounts blijven altijd veilig",
    safeSub: "Elke bestelling wordt afgehandeld door een echte, geverifieerde speler via regio-afgestemde VPN-sessies. Geen bots, geen automatisering \u2014 alleen schoon, handmatig gameplay van begin tot einde.",
    liveSpecialists: "Actieve specialisten",
    verifiedRating: "Geverifieerde beoordeling",
    avgResponse: "Gemiddelde respons",
    liveSpecialistsDetail: "Actieve boosters die momenteel bestellingen verwerken in alle ondersteunde regio's.",
    verifiedRatingDetail: "Gebouwd rondom transparante levering, accountveilige afhandeling en snelle support.",
    avgResponseDetail: "Bestellingen en vragen worden snel beoordeeld zodat klanten niet hoeven te wachten.",
    selectYourGame: "Selecteer je spel",
    pickGame: "Kies je spel en begin.",
    gameSectionSub: "Selecteer uit onze ondersteunde titels. Live services openen direct \u2014 nieuwe spellen worden elke seizoen toegevoegd.",
    platformReady: "Platformklare workflow",
    enterService: "Service betreden",
    openNow: "Open nu",
    comingSoon: "Binnenkort beschikbaar",
    soon: "Binnenkort",
    howItWorksLabel: "Hoe het werkt",
    howItWorksTitle: "Eenvoudig, transparant en snel.",
    howItWorksSub: "Elke bestelling volgt een duidelijke driestappenstroom. Kies je service, configureer je voorkeuren en volg de voortgang live.",
    trustPoints: [
      "Alleen echte spelers met handmatig gameplay",
      "VPN-sessies afgestemd op de regio",
      "Priv\u00e9 bestelstroom met directe updates",
      "Flexibele wachtrijopties voor solo of duo",
    ],
    steps: [
      { step: "01", title: "Kies je spel", description: "Start vanaf de homepage en ga naar de service die overeenkomt met de titel die je wilt pushen." },
      { step: "02", title: "Bestelling aanpassen", description: "Stel rankdoelen, platform en add-ons in via de calculator voor het afrekenen." },
      { step: "03", title: "Voortgang volgen", description: "Volg de status van je bestelling en blijf in controle terwijl de toegewezen booster de taak voltooit." },
    ],
    rewardsLabel: "Exclusieve beloningen",
    rewardsTitle: "Exclusieve voordelen voor elke bestelling.",
    rewardsCta: "Naar de Rainbow Six bestelstroom",
    perks: [
      { title: "Beloningsladder", description: "Elke voltooide bestelling draagt bij aan hogere accountvoordelen en prioritaire afhandeling." },
      { title: "Nauwkeurige levering", description: "Elke bestelling is geconfigureerd op basis van je huidige rankstatus zodat prijzen en tijden duidelijk blijven." },
      { title: "Premium afhandeling", description: "Elite-boosters, duo-opties en aangepaste verzoeken beschikbaar wanneer je een strakker leveringsvenster nodig hebt." },
    ],
  },
  pt: {
    badge: "Confiado por mais de 10.000 jogadores em todas as plataformas",
    hero: "Suba de rank mais r\u00e1pido com especialistas verificados.",
    sub: "ProBoost conecta voc\u00ea com jogadores reais de alto n\u00edvel que gerenciam sua subida de rank com seguran\u00e7a e rapidez. Escolha seu jogo, defina seu objetivo e deixe um booster verificado fazer o resto.",
    ctaPrimary: "Abrir Rainbow Six Siege Boost",
    ctaSecondary: "Ver jogos suportados",
    ratedTitle: "Muito bem avaliado por clientes recorrentes",
    ratedSub: "Pontos de entrada r\u00e1pidos, navega\u00e7\u00e3o clara e hierarquia visual s\u00f3lida.",
    selectedGame: "Jogo selecionado",
    gameDesc: "O servi\u00e7o de boosting mais popular da plataforma, dispon\u00edvel agora.",
    safeTitle: "Contas sempre seguras",
    safeSub: "Cada pedido \u00e9 gerenciado por um jogador real e verificado usando sess\u00f5es VPN adaptadas \u00e0 sua regi\u00e3o. Sem bots, sem automa\u00e7\u00e3o \u2014 apenas gameplay manual e limpo do come\u00e7o ao fim.",
    liveSpecialists: "Especialistas ativos",
    verifiedRating: "Avalia\u00e7\u00e3o verificada",
    avgResponse: "Resposta m\u00e9dia",
    liveSpecialistsDetail: "Boosters ativos gerenciando pedidos em todas as regi\u00f5es suportadas.",
    verifiedRatingDetail: "Constru\u00eddo em torno de entrega transparente, manuseio seguro e suporte r\u00e1pido.",
    avgResponseDetail: "Pedidos e d\u00favidas s\u00e3o revisados rapidamente para que os clientes n\u00e3o fiquem esperando.",
    selectYourGame: "Selecione seu jogo",
    pickGame: "Escolha seu jogo e comece.",
    gameSectionSub: "Selecione entre nossos t\u00edtulos suportados. Os servi\u00e7os ao vivo abrem imediatamente \u2014 novos jogos s\u00e3o adicionados a cada temporada.",
    platformReady: "Fluxo pronto para a plataforma",
    enterService: "Entrar no servi\u00e7o",
    openNow: "Aberto agora",
    comingSoon: "Em breve",
    soon: "Em breve",
    howItWorksLabel: "Como funciona",
    howItWorksTitle: "Simples, transparente e r\u00e1pido.",
    howItWorksSub: "Cada pedido segue um fluxo claro de tr\u00eas etapas. Escolha seu servi\u00e7o, configure suas prefer\u00eancias e acompanhe o progresso ao vivo.",
    trustPoints: [
      "Apenas jogadores reais com gameplay manual",
      "Sess\u00f5es VPN adaptadas \u00e0 regi\u00e3o",
      "Fluxo de pedido privado com atualiza\u00e7\u00f5es diretas",
      "Op\u00e7\u00f5es de fila flex\u00edveis para solo ou dupla",
    ],
    steps: [
      { step: "01", title: "Escolha seu jogo", description: "Comece na p\u00e1gina inicial e entre no servi\u00e7o que corresponde ao t\u00edtulo que voc\u00ea quer impulsionar." },
      { step: "02", title: "Personalize o pedido", description: "Defina objetivos de rank, plataforma e add-ons na calculadora antes do pagamento." },
      { step: "03", title: "Acompanhe o progresso", description: "Siga o status do seu pedido e mant\u00e9m o controle enquanto o booster designado conclui a tarefa." },
    ],
    rewardsLabel: "Recompensas exclusivas",
    rewardsTitle: "Vantagens exclusivas para cada pedido.",
    rewardsCta: "Entrar no fluxo de pedidos Rainbow Six",
    perks: [
      { title: "Escada de recompensas", description: "Cada pedido conclu\u00eddo contribui para vantagens de conta superiores e tratamento priorit\u00e1rio." },
      { title: "Entrega de precis\u00e3o", description: "Cada pedido \u00e9 configurado com base no seu rank atual para que pre\u00e7os e tempos sejam claros." },
      { title: "Manuseio premium", description: "Boosters de elite, op\u00e7\u00f5es de dupla e solicita\u00e7\u00f5es personalizadas dispon\u00edveis quando precisar." },
    ],
  },
  uk: {
    badge: "\u0414\u043e\u0432\u0456\u0440\u044f\u044e\u0442\u044c \u043f\u043e\u043d\u0430\u0434 10\u202f000 \u0433\u0440\u0430\u0432\u0446\u0456\u0432 \u043d\u0430 \u0432\u0441\u0456\u0445 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0430\u0445",
    hero: "\u041f\u0456\u0434\u043d\u0456\u043c\u0430\u0439\u0442\u0435\u0441\u044c \u0432 \u0440\u0430\u043d\u0437\u0456 \u0448\u0432\u0438\u0434\u0448\u0435 \u0437 \u043f\u0435\u0440\u0435\u0432\u0456\u0440\u0435\u043d\u0438\u043c\u0438 \u0444\u0430\u0445\u0456\u0432\u0446\u044f\u043c\u0438.",
    sub: "ProBoost \u0437'\u0454\u0434\u043d\u0443\u0454 \u0432\u0430\u0441 \u0437 \u0441\u043f\u0440\u0430\u0432\u0436\u043d\u0456\u043c\u0438 \u0433\u0440\u0430\u0432\u0446\u044f\u043c\u0438 \u0432\u0438\u0441\u043e\u043a\u043e\u0433\u043e \u0440\u0456\u0432\u043d\u044f, \u044f\u043a\u0456 \u0431\u0435\u0437\u043f\u0435\u0447\u043d\u043e \u0456 \u0448\u0432\u0438\u0434\u043a\u043e \u043f\u0456\u0434\u0432\u0438\u0449\u0443\u044e\u0442\u044c \u0432\u0430\u0448 \u0440\u0430\u043d\u0433. \u041e\u0431\u0435\u0440\u0456\u0442\u044c \u0433\u0440\u0443, \u0432\u0441\u0442\u0430\u043d\u043e\u0432\u0456\u0442\u044c \u0446\u0456\u043b\u044c \u0456 \u0434\u043e\u0437\u0432\u043e\u043b\u044c\u0442\u0435 \u043f\u0435\u0440\u0435\u0432\u0456\u0440\u0435\u043d\u043e\u043c\u0443 \u0431\u0443\u0441\u0442\u0435\u0440\u0443 \u0437\u0440\u043e\u0431\u0438\u0442\u0438 \u0432\u0441\u0435 \u0456\u043d\u0448\u0435.",
    ctaPrimary: "\u0412\u0456\u0434\u043a\u0440\u0438\u0442\u0438 Rainbow Six Siege Boost",
    ctaSecondary: "\u041f\u0435\u0440\u0435\u0433\u043b\u044f\u043d\u0443\u0442\u0438 \u0456\u0433\u0440\u0438",
    ratedTitle: "\u0412\u0438\u0441\u043e\u043a\u043e \u043e\u0446\u0456\u043d\u0435\u043d\u0438\u0439 \u043f\u043e\u0441\u0442\u0456\u0439\u043d\u0438\u043c\u0438 \u043a\u043b\u0456\u0454\u043d\u0442\u0430\u043c\u0438",
    ratedSub: "\u0428\u0432\u0438\u0434\u043a\u0438\u0439 \u0434\u043e\u0441\u0442\u0443\u043f, \u0447\u0456\u0442\u043a\u0430 \u043d\u0430\u0432\u0456\u0433\u0430\u0446\u0456\u044f \u0456 \u0432\u0456\u0437\u0443\u0430\u043b\u044c\u043d\u0430 \u0456\u0454\u0440\u0430\u0440\u0445\u0456\u044f.",
    selectedGame: "\u041e\u0431\u0440\u0430\u043d\u0430 \u0433\u0440\u0430",
    gameDesc: "\u041d\u0430\u0439\u043f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u0456\u0448\u0438\u0439 \u0441\u0435\u0440\u0432\u0456\u0441 \u0431\u0443\u0441\u0442\u0438\u043d\u0433\u0443 \u043d\u0430 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0456, \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u0438\u0439 \u0437\u0430\u0440\u0430\u0437.",
    safeTitle: "\u0410\u043a\u0430\u0443\u043d\u0442\u0438 \u0437\u0430\u0432\u0436\u0434\u0438 \u0432 \u0431\u0435\u0437\u043f\u0435\u0446\u0456",
    safeSub: "\u041a\u043e\u0436\u043d\u0435 \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f \u0432\u0438\u043a\u043e\u043d\u0443\u0454\u0442\u044c\u0441\u044f \u0440\u0435\u0430\u043b\u044c\u043d\u0438\u043c \u043f\u0435\u0440\u0435\u0432\u0456\u0440\u0435\u043d\u0438\u043c \u0433\u0440\u0430\u0432\u0446\u0435\u043c \u0447\u0435\u0440\u0435\u0437 VPN-\u0441\u0435\u0441\u0456\u0457, \u0430\u0434\u0430\u043f\u0442\u043e\u0432\u0430\u043d\u0456 \u0434\u043e \u0432\u0430\u0448\u043e\u0433\u043e \u0440\u0435\u0433\u0456\u043e\u043d\u0443. \u0411\u0435\u0437 \u0431\u043e\u0442\u0456\u0432, \u0431\u0435\u0437 \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0456\u0457 \u2014 \u043b\u0438\u0448\u0435 \u0447\u0438\u0441\u0442\u0438\u0439 \u0440\u0443\u0447\u043d\u0438\u0439 \u0433\u0435\u0439\u043c\u043f\u043b\u0435\u0439.",
    liveSpecialists: "\u0410\u043a\u0442\u0438\u0432\u043d\u0456 \u0444\u0430\u0445\u0456\u0432\u0446\u0456",
    verifiedRating: "\u041f\u0456\u0434\u0442\u0432\u0435\u0440\u0434\u0436\u0435\u043d\u0438\u0439 \u0440\u0435\u0439\u0442\u0438\u043d\u0433",
    avgResponse: "\u0421\u0435\u0440. \u0447\u0430\u0441 \u0432\u0456\u0434\u043f\u043e\u0432\u0456\u0434\u0456",
    liveSpecialistsDetail: "\u0410\u043a\u0442\u0438\u0432\u043d\u0456 \u0431\u0443\u0441\u0442\u0435\u0440\u0438, \u0449\u043e \u0432\u0438\u043a\u043e\u043d\u0443\u044e\u0442\u044c \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f \u0432 \u0443\u0441\u0456\u0445 \u043f\u0456\u0434\u0442\u0440\u0438\u043c\u0443\u0432\u0430\u043d\u0438\u0445 \u0440\u0435\u0433\u0456\u043e\u043d\u0430\u0445.",
    verifiedRatingDetail: "\u041f\u043e\u0431\u0443\u0434\u043e\u0432\u0430\u043d\u043e \u043d\u0430 \u043e\u0441\u043d\u043e\u0432\u0456 \u043f\u0440\u043e\u0437\u043e\u0440\u043e\u0457 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0438, \u0431\u0435\u0437\u043f\u0435\u0447\u043d\u043e\u0433\u043e \u043e\u0431\u0440\u043e\u0431\u043a\u0438 \u0456 \u0448\u0432\u0438\u0434\u043a\u043e\u0457 \u043f\u0456\u0434\u0442\u0440\u0438\u043c\u043a\u0438.",
    avgResponseDetail: "\u0417\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f \u0456 \u0437\u0430\u043f\u0438\u0442\u0430\u043d\u043d\u044f \u0440\u043e\u0437\u0433\u043b\u044f\u0434\u0430\u044e\u0442\u044c\u0441\u044f \u0448\u0432\u0438\u0434\u043a\u043e, \u0449\u043e\u0431 \u043a\u043b\u0456\u0454\u043d\u0442\u0438 \u043d\u0435 \u0447\u0435\u043a\u0430\u043b\u0438.",
    selectYourGame: "\u041e\u0431\u0435\u0440\u0456\u0442\u044c \u0433\u0440\u0443",
    pickGame: "\u041e\u0431\u0435\u0440\u0456\u0442\u044c \u0433\u0440\u0443 \u0456 \u043f\u043e\u0447\u043d\u0456\u0442\u044c.",
    gameSectionSub: "\u041e\u0431\u0435\u0440\u0456\u0442\u044c \u0437 \u043d\u0430\u0448\u0438\u0445 \u043f\u0456\u0434\u0442\u0440\u0438\u043c\u0443\u0432\u0430\u043d\u0438\u0445 \u0442\u0438\u0442\u0443\u043b\u0456\u0432. \u0416\u0438\u0432\u0456 \u0441\u0435\u0440\u0432\u0456\u0441\u0438 \u0432\u0456\u0434\u043a\u0440\u0438\u0432\u0430\u044e\u0442\u044c\u0441\u044f \u0437\u0440\u0430\u0437\u0443 \u2014 \u043d\u043e\u0432\u0456 \u0456\u0433\u0440\u0438 \u0434\u043e\u0434\u0430\u044e\u0442\u044c\u0441\u044f \u043a\u043e\u0436\u043d\u043e\u0433\u043e \u0441\u0435\u0437\u043e\u043d\u0443.",
    platformReady: "\u0413\u043e\u0442\u043e\u0432\u0438\u0439 \u0434\u043e \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0438",
    enterService: "\u0423\u0432\u0456\u0439\u0442\u0438 \u0432 \u0441\u0435\u0440\u0432\u0456\u0441",
    openNow: "\u0412\u0456\u0434\u043a\u0440\u0438\u0442\u043e",
    comingSoon: "\u041d\u0435\u0437\u0430\u0431\u0430\u0440\u043e",
    soon: "\u0421\u043a\u043e\u0440\u043e",
    howItWorksLabel: "\u042f\u043a \u0446\u0435 \u043f\u0440\u0430\u0446\u044e\u0454",
    howItWorksTitle: "\u041f\u0440\u043e\u0441\u0442\u043e, \u043f\u0440\u043e\u0437\u043e\u0440\u043e \u0456 \u0448\u0432\u0438\u0434\u043a\u043e.",
    howItWorksSub: "\u041a\u043e\u0436\u043d\u0435 \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f \u0441\u043b\u0456\u0434\u0443\u0454 \u0447\u0456\u0442\u043a\u043e\u043c\u0443 \u0442\u0440\u0438\u0435\u0442\u0430\u043f\u043d\u043e\u043c\u0443 \u043f\u0440\u043e\u0446\u0435\u0441\u0443. \u041e\u0431\u0435\u0440\u0456\u0442\u044c \u0441\u0435\u0440\u0432\u0456\u0441, \u043d\u0430\u043b\u0430\u0448\u0442\u0443\u0439\u0442\u0435 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u0438 \u0456 \u0441\u043f\u043e\u0441\u0442\u0435\u0440\u0456\u0433\u0430\u0439\u0442\u0435 \u043f\u0440\u043e\u0433\u0440\u0435\u0441 \u0432 \u0440\u0435\u0436\u0438\u043c\u0456 \u0440\u0435\u0430\u043b\u044c\u043d\u043e\u0433\u043e \u0447\u0430\u0441\u0443.",
    trustPoints: [
      "\u0422\u0456\u043b\u044c\u043a\u0438 \u0440\u0435\u0430\u043b\u044c\u043d\u0456 \u0433\u0440\u0430\u0432\u0446\u0456 \u0437 \u0440\u0443\u0447\u043d\u0438\u043c \u0433\u0435\u0439\u043c\u043f\u043b\u0435\u0454\u043c",
      "VPN-\u0441\u0435\u0441\u0456\u0457, \u0430\u0434\u0430\u043f\u0442\u043e\u0432\u0430\u043d\u0456 \u0434\u043e \u0440\u0435\u0433\u0456\u043e\u043d\u0443",
      "\u041f\u0440\u0438\u0432\u0430\u0442\u043d\u0438\u0439 \u043f\u043e\u0442\u0456\u043a \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f \u0437 \u043f\u0440\u044f\u043c\u0438\u043c\u0438 \u043e\u043d\u043e\u0432\u043b\u0435\u043d\u043d\u044f\u043c\u0438",
      "\u0413\u043d\u0443\u0447\u043a\u0456 \u043e\u043f\u0446\u0456\u0457 \u0447\u0435\u0440\u0433\u0438 \u0434\u043b\u044f solo \u0430\u0431\u043e duo",
    ],
    steps: [
      { step: "01", title: "\u041e\u0431\u0435\u0440\u0456\u0442\u044c \u0433\u0440\u0443", description: "\u041f\u043e\u0447\u043d\u0456\u0442\u044c \u0437 \u0433\u043e\u043b\u043e\u0432\u043d\u043e\u0457 \u0441\u0442\u043e\u0440\u0456\u043d\u043a\u0438 \u0456 \u0443\u0432\u0456\u0439\u0434\u0456\u0442\u044c \u0432 \u0441\u0435\u0440\u0432\u0456\u0441, \u0449\u043e \u0432\u0456\u0434\u043f\u043e\u0432\u0456\u0434\u0430\u0454 \u0442\u0438\u0442\u0443\u043b\u0443, \u044f\u043a\u0438\u0439 \u0432\u0438 \u0445\u043e\u0447\u0435\u0442\u0435 \u043f\u043e\u043a\u0440\u0430\u0449\u0438\u0442\u0438." },
      { step: "02", title: "\u041d\u0430\u043b\u0430\u0448\u0442\u0443\u0439\u0442\u0435 \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f", description: "\u0412\u0441\u0442\u0430\u043d\u043e\u0432\u0456\u0442\u044c \u0446\u0456\u043b\u0456 \u0440\u0430\u043d\u0433\u0443, \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0443 \u0442\u0430 \u0434\u043e\u0434\u0430\u0442\u043a\u0438 \u0447\u0435\u0440\u0435\u0437 \u043a\u0430\u043b\u044c\u043a\u0443\u043b\u044f\u0442\u043e\u0440 \u043f\u0435\u0440\u0435\u0434 \u043e\u043f\u043b\u0430\u0442\u043e\u044e." },
      { step: "03", title: "\u0421\u0442\u0435\u0436\u0442\u0435 \u0437\u0430 \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u043e\u043c", description: "\u0421\u043b\u0456\u0434\u043a\u0443\u0439\u0442\u0435 \u0441\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f \u0456 \u0437\u0430\u043b\u0438\u0448\u0430\u0439\u0442\u0435\u0441\u044c \u043f\u0456\u0434 \u043a\u043e\u043d\u0442\u0440\u043e\u043b\u0435\u043c, \u043f\u043e\u043a\u0438 \u043f\u0440\u0438\u0437\u043d\u0430\u0447\u0435\u043d\u0438\u0439 \u0431\u0443\u0441\u0442\u0435\u0440 \u0432\u0438\u043a\u043e\u043d\u0443\u0454 \u0437\u0430\u0432\u0434\u0430\u043d\u043d\u044f." },
    ],
    rewardsLabel: "\u0415\u043a\u0441\u043a\u043b\u044e\u0437\u0438\u0432\u043d\u0456 \u043d\u0430\u0433\u043e\u0440\u043e\u0434\u0438",
    rewardsTitle: "\u0415\u043a\u0441\u043a\u043b\u044e\u0437\u0438\u0432\u043d\u0456 \u043f\u0435\u0440\u0435\u0432\u0430\u0433\u0438 \u0437\u0430 \u043a\u043e\u0436\u043d\u0435 \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f.",
    rewardsCta: "\u0423\u0432\u0456\u0439\u0442\u0438 \u0432 Rainbow Six Order Flow",
    perks: [
      { title: "\u0421\u0445\u043e\u0434\u0438\u043d\u043a\u0430 \u043d\u0430\u0433\u043e\u0440\u043e\u0434", description: "\u041a\u043e\u0436\u043d\u0435 \u0432\u0438\u043a\u043e\u043d\u0430\u043d\u0435 \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f \u0437\u0431\u0456\u043b\u044c\u0448\u0443\u0454 \u043f\u0440\u0456\u043e\u0440\u0438\u0442\u0435\u0442 \u0430\u043a\u0430\u0443\u043d\u0442\u0443 \u0442\u0430 \u043f\u0440\u0438\u0441\u043a\u043e\u0440\u044e\u0454 \u043e\u0431\u0440\u043e\u0431\u043a\u0443." },
      { title: "\u0422\u043e\u0447\u043d\u0430 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0430", description: "\u041a\u043e\u0436\u043d\u0435 \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f \u043d\u0430\u043b\u0430\u0448\u0442\u043e\u0432\u0430\u043d\u0435 \u0432\u0456\u0434\u043f\u043e\u0432\u0456\u0434\u043d\u043e \u0434\u043e \u0432\u0430\u0448\u043e\u0433\u043e \u0440\u0430\u043d\u0433\u0443, \u0449\u043e\u0431 \u0446\u0456\u043d\u0438 \u0442\u0430 \u0442\u0435\u0440\u043c\u0456\u043d\u0438 \u0437\u0430\u043b\u0438\u0448\u0430\u043b\u0438\u0441\u044c \u0447\u0456\u0442\u043a\u0438\u043c\u0438." },
      { title: "\u041f\u0440\u0435\u043c\u0456\u0443\u043c \u043e\u0431\u0440\u043e\u0431\u043a\u0430", description: "\u0415\u043b\u0456\u0442\u043d\u0456 \u0431\u0443\u0441\u0442\u0435\u0440\u0438, \u043e\u043f\u0446\u0456\u0457 duo \u0442\u0430 \u0456\u043d\u0434\u0438\u0432\u0456\u0434\u0443\u0430\u043b\u044c\u043d\u0456 \u0437\u0430\u043f\u0438\u0442\u0438 \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u0456 \u043a\u043e\u043b\u0438 \u043f\u043e\u0442\u0440\u0456\u0431\u043d\u043e." },
    ],
  },
  ru: {
    badge: "\u0414\u043e\u0432\u0435\u0440\u044f\u044e\u0442 \u0431\u043e\u043b\u0435\u0435 10\u202f000 \u0438\u0433\u0440\u043e\u043a\u043e\u0432 \u043d\u0430 \u0432\u0441\u0435\u0445 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0430\u0445",
    hero: "\u041f\u043e\u0432\u044b\u0448\u0430\u0439\u0442\u0435 \u0440\u0430\u043d\u0433 \u0431\u044b\u0441\u0442\u0440\u0435\u0435 \u0441 \u043f\u0440\u043e\u0432\u0435\u0440\u0435\u043d\u043d\u044b\u043c\u0438 \u0441\u043f\u0435\u0446\u0438\u0430\u043b\u0438\u0441\u0442\u0430\u043c\u0438.",
    sub: "ProBoost \u0441\u0432\u044f\u0437\u044b\u0432\u0430\u0435\u0442 \u0432\u0430\u0441 \u0441 \u043d\u0430\u0441\u0442\u043e\u044f\u0449\u0438\u043c\u0438 \u0432\u044b\u0441\u043e\u043a\u043e\u0440\u0430\u043d\u0433\u043e\u0432\u044b\u043c\u0438 \u0438\u0433\u0440\u043e\u043a\u0430\u043c\u0438, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e \u0438 \u0431\u044b\u0441\u0442\u0440\u043e \u043f\u043e\u0432\u044b\u0448\u0430\u044e\u0442 \u0432\u0430\u0448 \u0440\u0430\u043d\u0433. \u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0433\u0440\u0443, \u0443\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u0435 \u0446\u0435\u043b\u044c \u0438 \u043f\u043e\u0437\u0432\u043e\u043b\u044c\u0442\u0435 \u043f\u0440\u043e\u0432\u0435\u0440\u0435\u043d\u043d\u043e\u043c\u0443 \u0431\u0443\u0441\u0442\u0435\u0440\u0443 \u0441\u0434\u0435\u043b\u0430\u0442\u044c \u0432\u0441\u0451 \u043e\u0441\u0442\u0430\u043b\u044c\u043d\u043e\u0435.",
    ctaPrimary: "\u041e\u0442\u043a\u0440\u044b\u0442\u044c Rainbow Six Siege Boost",
    ctaSecondary: "\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u0438\u0433\u0440\u044b",
    ratedTitle: "\u0412\u044b\u0441\u043e\u043a\u043e \u043e\u0446\u0435\u043d\u0451\u043d \u043f\u043e\u0441\u0442\u043e\u044f\u043d\u043d\u044b\u043c\u0438 \u043a\u043b\u0438\u0435\u043d\u0442\u0430\u043c\u0438",
    ratedSub: "\u0411\u044b\u0441\u0442\u0440\u044b\u0439 \u0434\u043e\u0441\u0442\u0443\u043f, \u0447\u0451\u0442\u043a\u0430\u044f \u043d\u0430\u0432\u0438\u0433\u0430\u0446\u0438\u044f \u0438 \u0432\u0438\u0437\u0443\u0430\u043b\u044c\u043d\u0430\u044f \u0438\u0435\u0440\u0430\u0440\u0445\u0438\u044f.",
    selectedGame: "\u0412\u044b\u0431\u0440\u0430\u043d\u043d\u0430\u044f \u0438\u0433\u0440\u0430",
    gameDesc: "\u0421\u0430\u043c\u044b\u0439 \u043f\u043e\u043f\u0443\u043b\u044f\u0440\u043d\u044b\u0439 \u0441\u0435\u0440\u0432\u0438\u0441 \u0431\u0443\u0441\u0442\u0438\u043d\u0433\u0430 \u043d\u0430 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0435, \u0434\u043e\u0441\u0442\u0443\u043f\u0435\u043d \u0441\u0435\u0439\u0447\u0430\u0441.",
    safeTitle: "\u0410\u043a\u043a\u0430\u0443\u043d\u0442\u044b \u0432\u0441\u0435\u0433\u0434\u0430 \u0432 \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0441\u0442\u0438",
    safeSub: "\u041a\u0430\u0436\u0434\u044b\u0439 \u0437\u0430\u043a\u0430\u0437 \u0432\u044b\u043f\u043e\u043b\u043d\u044f\u0435\u0442\u0441\u044f \u043d\u0430\u0441\u0442\u043e\u044f\u0449\u0438\u043c \u043f\u0440\u043e\u0432\u0435\u0440\u0435\u043d\u043d\u044b\u043c \u0438\u0433\u0440\u043e\u043a\u043e\u043c \u0447\u0435\u0440\u0435\u0437 VPN-\u0441\u0435\u0441\u0441\u0438\u0438, \u0430\u0434\u0430\u043f\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0435 \u043f\u043e\u0434 \u0432\u0430\u0448 \u0440\u0435\u0433\u0438\u043e\u043d. \u0411\u0435\u0437 \u0431\u043e\u0442\u043e\u0432, \u0431\u0435\u0437 \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u0438\u0437\u0430\u0446\u0438\u0438 \u2014 \u0442\u043e\u043b\u044c\u043a\u043e \u0447\u0438\u0441\u0442\u044b\u0439 \u0440\u0443\u0447\u043d\u043e\u0439 \u0433\u0435\u0439\u043c\u043f\u043b\u0435\u0439.",
    liveSpecialists: "\u0410\u043a\u0442\u0438\u0432\u043d\u044b\u0435 \u0441\u043f\u0435\u0446\u0438\u0430\u043b\u0438\u0441\u0442\u044b",
    verifiedRating: "\u041f\u043e\u0434\u0442\u0432\u0435\u0440\u0436\u0434\u0451\u043d\u043d\u044b\u0439 \u0440\u0435\u0439\u0442\u0438\u043d\u0433",
    avgResponse: "\u0421\u0440. \u0432\u0440\u0435\u043c\u044f \u043e\u0442\u0432\u0435\u0442\u0430",
    liveSpecialistsDetail: "\u0410\u043a\u0442\u0438\u0432\u043d\u044b\u0435 \u0431\u0443\u0441\u0442\u0435\u0440\u044b, \u0432\u044b\u043f\u043e\u043b\u043d\u044f\u044e\u0449\u0438\u0435 \u0437\u0430\u043a\u0430\u0437\u044b \u0432\u043e \u0432\u0441\u0435\u0445 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u043c\u044b\u0445 \u0440\u0435\u0433\u0438\u043e\u043d\u0430\u0445.",
    verifiedRatingDetail: "\u041f\u043e\u0441\u0442\u0440\u043e\u0435\u043d\u043e \u043d\u0430 \u043e\u0441\u043d\u043e\u0432\u0435 \u043f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u043e\u0439 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0438, \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u043e\u0433\u043e \u043e\u0431\u0440\u0430\u0449\u0435\u043d\u0438\u044f \u0438 \u0431\u044b\u0441\u0442\u0440\u043e\u0439 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0438.",
    avgResponseDetail: "\u0417\u0430\u043a\u0430\u0437\u044b \u0438 \u0432\u043e\u043f\u0440\u043e\u0441\u044b \u043e\u0431\u0440\u0430\u0431\u0430\u0442\u044b\u0432\u0430\u044e\u0442\u0441\u044f \u0431\u044b\u0441\u0442\u0440\u043e, \u0447\u0442\u043e\u0431\u044b \u043a\u043b\u0438\u0435\u043d\u0442\u044b \u043d\u0435 \u0436\u0434\u0430\u043b\u0438.",
    selectYourGame: "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0433\u0440\u0443",
    pickGame: "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0433\u0440\u0443 \u0438 \u043d\u0430\u0447\u043d\u0438\u0442\u0435.",
    gameSectionSub: "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0437 \u043d\u0430\u0448\u0438\u0445 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0432\u0430\u0435\u043c\u044b\u0445 \u0442\u0438\u0442\u0443\u043b\u043e\u0432. \u0416\u0438\u0432\u044b\u0435 \u0441\u0435\u0440\u0432\u0438\u0441\u044b \u043e\u0442\u043a\u0440\u044b\u0432\u0430\u044e\u0442\u0441\u044f \u0441\u0440\u0430\u0437\u0443 \u2014 \u043d\u043e\u0432\u044b\u0435 \u0438\u0433\u0440\u044b \u0434\u043e\u0431\u0430\u0432\u043b\u044f\u044e\u0442\u0441\u044f \u043a\u0430\u0436\u0434\u044b\u0439 \u0441\u0435\u0437\u043e\u043d.",
    platformReady: "\u0413\u043e\u0442\u043e\u0432 \u043a \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0435",
    enterService: "\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 \u0441\u0435\u0440\u0432\u0438\u0441",
    openNow: "\u041e\u0442\u043a\u0440\u044b\u0442\u043e",
    comingSoon: "\u0421\u043a\u043e\u0440\u043e",
    soon: "\u0421\u043a\u043e\u0440\u043e",
    howItWorksLabel: "\u041a\u0430\u043a \u044d\u0442\u043e \u0440\u0430\u0431\u043e\u0442\u0430\u0435\u0442",
    howItWorksTitle: "\u041f\u0440\u043e\u0441\u0442\u043e, \u043f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u043e \u0438 \u0431\u044b\u0441\u0442\u0440\u043e.",
    howItWorksSub: "\u041a\u0430\u0436\u0434\u044b\u0439 \u0437\u0430\u043a\u0430\u0437 \u0441\u043b\u0435\u0434\u0443\u0435\u0442 \u0447\u0451\u0442\u043a\u043e\u043c\u0443 \u0442\u0440\u0451\u0445\u0448\u0430\u0433\u043e\u0432\u043e\u043c\u0443 \u043f\u0440\u043e\u0446\u0435\u0441\u0441\u0443. \u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0443\u0441\u043b\u0443\u0433\u0443, \u043d\u0430\u0441\u0442\u0440\u043e\u0439\u0442\u0435 \u043f\u0430\u0440\u0430\u043c\u0435\u0442\u0440\u044b \u0438 \u043e\u0442\u0441\u043b\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441 \u0432 \u0440\u0435\u0436\u0438\u043c\u0435 \u0440\u0435\u0430\u043b\u044c\u043d\u043e\u0433\u043e \u0432\u0440\u0435\u043c\u0435\u043d\u0438.",
    trustPoints: [
      "\u0422\u043e\u043b\u044c\u043a\u043e \u043d\u0430\u0441\u0442\u043e\u044f\u0449\u0438\u0435 \u0438\u0433\u0440\u043e\u043a\u0438 \u0441 \u0440\u0443\u0447\u043d\u044b\u043c \u0433\u0435\u0439\u043c\u043f\u043b\u0435\u0435\u043c",
      "VPN-\u0441\u0435\u0441\u0441\u0438\u0438, \u0430\u0434\u0430\u043f\u0442\u0438\u0440\u043e\u0432\u0430\u043d\u043d\u044b\u0435 \u043f\u043e\u0434 \u0440\u0435\u0433\u0438\u043e\u043d",
      "\u041f\u0440\u0438\u0432\u0430\u0442\u043d\u044b\u0439 \u043f\u043e\u0442\u043e\u043a \u0437\u0430\u043a\u0430\u0437\u0430 \u0441 \u043f\u0440\u044f\u043c\u044b\u043c\u0438 \u043e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u044f\u043c\u0438",
      "\u0413\u0438\u0431\u043a\u0438\u0435 \u043e\u043f\u0446\u0438\u0438 \u043e\u0447\u0435\u0440\u0435\u0434\u0438 \u0434\u043b\u044f solo \u0438\u043b\u0438 duo",
    ],
    steps: [
      { step: "01", title: "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u0438\u0433\u0440\u0443", description: "\u041d\u0430\u0447\u043d\u0438\u0442\u0435 \u0441 \u0433\u043b\u0430\u0432\u043d\u043e\u0439 \u0441\u0442\u0440\u0430\u043d\u0438\u0446\u044b \u0438 \u043f\u0435\u0440\u0435\u0439\u0434\u0438\u0442\u0435 \u0432 \u0441\u0435\u0440\u0432\u0438\u0441, \u0441\u043e\u043e\u0442\u0432\u0435\u0442\u0441\u0442\u0432\u0443\u044e\u0449\u0438\u0439 \u0442\u0438\u0442\u0443\u043b\u0443, \u043a\u043e\u0442\u043e\u0440\u044b\u0439 \u0432\u044b \u0445\u043e\u0442\u0438\u0442\u0435 \u043f\u0440\u043e\u043a\u0430\u0447\u0430\u0442\u044c." },
      { step: "02", title: "\u041d\u0430\u0441\u0442\u0440\u043e\u0439\u0442\u0435 \u0437\u0430\u043a\u0430\u0437", description: "\u0423\u0441\u0442\u0430\u043d\u043e\u0432\u0438\u0442\u0435 \u0446\u0435\u043b\u0435\u0432\u043e\u0439 \u0440\u0430\u043d\u0433, \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0443 \u0438 \u0434\u043e\u043f\u043e\u043b\u043d\u0435\u043d\u0438\u044f \u0447\u0435\u0440\u0435\u0437 \u043a\u0430\u043b\u044c\u043a\u0443\u043b\u044f\u0442\u043e\u0440 \u043f\u0435\u0440\u0435\u0434 \u043e\u043f\u043b\u0430\u0442\u043e\u0439." },
      { step: "03", title: "\u0421\u043b\u0435\u0434\u0438\u0442\u0435 \u0437\u0430 \u043f\u0440\u043e\u0433\u0440\u0435\u0441\u0441\u043e\u043c", description: "\u041e\u0442\u0441\u043b\u0435\u0436\u0438\u0432\u0430\u0439\u0442\u0435 \u0441\u0442\u0430\u0442\u0443\u0441 \u0437\u0430\u043a\u0430\u0437\u0430 \u0438 \u043e\u0441\u0442\u0430\u0432\u0430\u0439\u0442\u0435\u0441\u044c \u043f\u043e\u0434 \u043a\u043e\u043d\u0442\u0440\u043e\u043b\u0435\u043c, \u043f\u043e\u043a\u0430 \u043d\u0430\u0437\u043d\u0430\u0447\u0435\u043d\u043d\u044b\u0439 \u0431\u0443\u0441\u0442\u0435\u0440 \u0432\u044b\u043f\u043e\u043b\u043d\u044f\u0435\u0442 \u0437\u0430\u0434\u0430\u043d\u0438\u0435." },
    ],
    rewardsLabel: "\u042d\u043a\u0441\u043a\u043b\u044e\u0437\u0438\u0432\u043d\u044b\u0435 \u043d\u0430\u0433\u0440\u0430\u0434\u044b",
    rewardsTitle: "\u042d\u043a\u0441\u043a\u043b\u044e\u0437\u0438\u0432\u043d\u044b\u0435 \u043f\u0440\u0435\u0438\u043c\u0443\u0449\u0435\u0441\u0442\u0432\u0430 \u0437\u0430 \u043a\u0430\u0436\u0434\u044b\u0439 \u0437\u0430\u043a\u0430\u0437.",
    rewardsCta: "\u041f\u0435\u0440\u0435\u0439\u0442\u0438 \u0432 Rainbow Six Order Flow",
    perks: [
      { title: "\u041b\u0435\u0441\u0442\u043d\u0438\u0446\u0430 \u043d\u0430\u0433\u0440\u0430\u0434", description: "\u041a\u0430\u0436\u0434\u044b\u0439 \u0432\u044b\u043f\u043e\u043b\u043d\u0435\u043d\u043d\u044b\u0439 \u0437\u0430\u043a\u0430\u0437 \u043f\u043e\u0432\u044b\u0448\u0430\u0435\u0442 \u043f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430 \u0438 \u0443\u0441\u043a\u043e\u0440\u044f\u0435\u0442 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0443." },
      { title: "\u0422\u043e\u0447\u043d\u0430\u044f \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0430", description: "\u041a\u0430\u0436\u0434\u044b\u0439 \u0437\u0430\u043a\u0430\u0437 \u043d\u0430\u0441\u0442\u0440\u043e\u0435\u043d \u043f\u043e\u0434 \u0432\u0430\u0448 \u0442\u0435\u043a\u0443\u0449\u0438\u0439 \u0440\u0430\u043d\u0433, \u0447\u0442\u043e\u0431\u044b \u0446\u0435\u043d\u044b \u0438 \u0441\u0440\u043e\u043a\u0438 \u043e\u0441\u0442\u0430\u0432\u0430\u043b\u0438\u0441\u044c \u0447\u0451\u0442\u043a\u0438\u043c\u0438." },
      { title: "\u041f\u0440\u0435\u043c\u0438\u0443\u043c-\u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0430", description: "\u042d\u043b\u0438\u0442\u043d\u044b\u0435 \u0431\u0443\u0441\u0442\u0435\u0440\u044b, \u043e\u043f\u0446\u0438\u0438 duo \u0438 \u0438\u043d\u0434\u0438\u0432\u0438\u0434\u0443\u0430\u043b\u044c\u043d\u044b\u0435 \u0437\u0430\u043f\u0440\u043e\u0441\u044b \u0434\u043e\u0441\u0442\u0443\u043f\u043d\u044b, \u043a\u043e\u0433\u0434\u0430 \u043d\u0443\u0436\u043d\u043e." },
    ],
  },
};

const perkImages = ["/ranks/rank_5.webp", "/ranks/rank_7.webp", "/ranks/rank_8.webp"] as const;

const gameCards = [
  { name: "Rainbow Six Siege", href: "/en/rainbow-six-siege-boost", bg: "/homepage/r6-homepage.webp",             logo: "/homepage/r6-text-homepage.png",            live: true,  glow: "#aea896" },
  { name: "Valorant",          href: "#",                          bg: "/homepage/valorant-homepage.webp",         logo: "/homepage/valorant-text-homepage.webp",     live: false, glow: "#ff5261" },
  { name: "Rocket League",     href: "#",                          bg: "/homepage/rocketleague-homepage.webp",     logo: "/homepage/rocketleague-text-homepage.webp", live: false, glow: "#e9852d" },
  { name: "League of Legends", href: "#",                          bg: "/homepage/lol-homepage.webp",              logo: "/homepage/lol-text-homepage.webp",          live: false, glow: "#0fa2b7" },
  { name: "Marvel Rivals",     href: "#",                          bg: "/homepage/marvelrivals-homepage.webp",     logo: "/homepage/marvelrivals-text-homepage.webp", live: false, glow: "#fcd92d" },
  { name: "Counter-Strike 2",  href: "#",                          bg: "/homepage/cs2-homepage.webp",              logo: "/homepage/cs2-text-homepage.webp",          live: false, glow: "#ff6b1b" },
  { name: "Apex Legends",      href: "#",                          bg: "/homepage/apex-homepage.webp",             logo: "/homepage/apex-text-homepage.webp",         live: false, glow: "#f75e34" },
];

const highlightValues = ["126", "4.9/5", "8 min"] as const;

type MembershipPerk = { title: string; desc: string };
const membershipI18n: Record<LangCode, {
  eyebrow: string; heading: string; monthly: string; annually: string;
  billedAs: string; desc: string; cta: string; cancel: string;
  termsNote: string; termsLink: string;
  perks: [MembershipPerk, MembershipPerk, MembershipPerk, MembershipPerk, MembershipPerk, MembershipPerk];
}> = {
  en: {
    eyebrow: "Membership", heading: "Claim your membership",
    monthly: "Monthly", annually: "Annually",
    billedAs: "Billed as ${amount}/year \u2014 save 20%",
    desc: "We tried to make it worth for us, but it\u2019s only worth for you! We\u2019re not good at math.",
    cta: "Become a Member", cancel: "Cancel Anytime",
    termsNote: "Whichever occurs first.", termsLink: "See full Terms of Service",
    perks: [
      { title: "DuoQ at half of the price",      desc: "We will discount the Duo services by 50%" },
      { title: "Priority on all orders",          desc: "Get your order to start faster, always!" },
      { title: "Free Money",                      desc: "Get 5$ in Market Coins each month to buy anything!" },
      { title: "Double Cashback",                 desc: "1.5% for free is not enough? Get 3% back then!" },
      { title: "Premium Monthly Discounts",       desc: "We will send you Premium coupons each month." },
      { title: "Support your booster",            desc: "Your subscription goes directly to the booster of your choice" },
    ],
  },
  it: {
    eyebrow: "Abbonamento", heading: "Ottieni il tuo abbonamento",
    monthly: "Mensile", annually: "Annuale",
    billedAs: "Fatturato come \${amount}/anno \u2014 risparmia il 20%",
    desc: "Abbiamo cercato di renderlo vantaggioso per noi, ma \u00e8 vantaggioso solo per te! Non siamo bravi in matematica.",
    cta: "Diventa membro", cancel: "Annulla in qualsiasi momento",
    termsNote: "Primo evento valido.", termsLink: "Vedi i Termini di servizio completi",
    perks: [
      { title: "DuoQ a met\u00e0 prezzo",              desc: "Scontereremo i servizi Duo del 50%" },
      { title: "Priorit\u00e0 su tutti gli ordini",     desc: "Il tuo ordine inizia pi\u00f9 velocemente, sempre!" },
      { title: "Denaro gratis",                         desc: "Ricevi 5$ in Monete di mercato ogni mese!" },
      { title: "Doppio Cashback",                       desc: "1,5% gratis non basta? Ottieni il 3% di rimborso!" },
      { title: "Sconti mensili premium",                desc: "Ti invieremo coupon Premium ogni mese." },
      { title: "Supporta il tuo booster",               desc: "Il tuo abbonamento va direttamente al booster che scegli" },
    ],
  },
  fr: {
    eyebrow: "Abonnement", heading: "Obtenez votre abonnement",
    monthly: "Mensuel", annually: "Annuel",
    billedAs: "Factur\u00e9 \${amount}/an \u2014 \u00e9conomisez 20\u00a0%",
    desc: "On a essay\u00e9 de le rendre rentable pour nous, mais c\u2019est seulement rentable pour vous\u00a0! On n\u2019est pas bons en maths.",
    cta: "Devenir membre", cancel: "Annulez \u00e0 tout moment",
    termsNote: "Le premier \u00e9v\u00e9nement applicable.", termsLink: "Voir les CGU compl\u00e8tes",
    perks: [
      { title: "DuoQ \u00e0 moiti\u00e9 prix",            desc: "Nous remisons les services Duo de 50\u00a0%" },
      { title: "Priorit\u00e9 sur toutes les commandes", desc: "Votre commande d\u00e9marre plus vite, toujours\u00a0!" },
      { title: "Argent gratuit",                          desc: "Obtenez 5\u00a0$ en Market Coins chaque mois\u00a0!" },
      { title: "Double Cashback",                         desc: "1,5\u00a0% gratuit ne suffit pas\u00a0? R\u00e9cup\u00e9rez 3\u00a0%\u00a0!" },
      { title: "Remises mensuelles premium",              desc: "Nous vous enverrons des coupons Premium chaque mois." },
      { title: "Soutenez votre booster",                  desc: "Votre abonnement va directement au booster de votre choix" },
    ],
  },
  es: {
    eyebrow: "Membres\u00eda", heading: "Obt\u00e9n tu membres\u00eda",
    monthly: "Mensual", annually: "Anual",
    billedAs: "Facturado como \${amount}/a\u00f1o \u2014 ahorra 20\u00a0%",
    desc: "Intentamos que valiera la pena para nosotros, pero solo vale la pena para ti. \u00a1No somos buenos en matem\u00e1ticas!",
    cta: "H\u00e1zte miembro", cancel: "Cancela en cualquier momento",
    termsNote: "Lo que ocurra primero.", termsLink: "Ver los T\u00e9rminos de servicio completos",
    perks: [
      { title: "DuoQ a mitad de precio",          desc: "Aplicaremos un 50\u00a0% de descuento en los servicios Duo" },
      { title: "Prioridad en todos los pedidos",  desc: "\u00a1Tu pedido empieza m\u00e1s r\u00e1pido, siempre!" },
      { title: "Dinero gratis",                   desc: "\u00a1Recibe 5\u00a0$ en Monedas de mercado cada mes!" },
      { title: "Doble Cashback",                  desc: "\u00bfEl 1,5\u00a0% gratis no es suficiente? \u00a1Consigue el 3\u00a0%!" },
      { title: "Descuentos mensuales premium",    desc: "Te enviaremos cupones Premium cada mes." },
      { title: "Apoya a tu booster",              desc: "Tu suscripci\u00f3n va directamente al booster que elijas" },
    ],
  },
  de: {
    eyebrow: "Mitgliedschaft", heading: "Hol dir deine Mitgliedschaft",
    monthly: "Monatlich", annually: "J\u00e4hrlich",
    billedAs: "\${amount}/Jahr \u2014 spare 20\u00a0%",
    desc: "Wir haben versucht, es f\u00fcr uns lohnenswert zu machen, aber es lohnt sich nur f\u00fcr dich! Wir sind nicht gut in Mathe.",
    cta: "Mitglied werden", cancel: "Jederzeit k\u00fcndbar",
    termsNote: "Was auch immer zuerst eintritt.", termsLink: "Vollst\u00e4ndige AGB anzeigen",
    perks: [
      { title: "DuoQ zum halben Preis",            desc: "Wir gew\u00e4hren 50\u00a0% Rabatt auf Duo-Services" },
      { title: "Priorit\u00e4t bei allen Bestellungen", desc: "Deine Bestellung startet immer schneller!" },
      { title: "Gratis-Geld",                       desc: "Erhalte jeden Monat 5\u00a0$ in Markt-M\u00fcnzen!" },
      { title: "Doppelter Cashback",                desc: "1,5\u00a0% gratis reicht dir nicht? Hol dir 3\u00a0% zur\u00fcck!" },
      { title: "Premium-Monatsrabatte",             desc: "Wir senden dir jeden Monat Premium-Coupons." },
      { title: "Unterst\u00fctze deinen Booster",   desc: "Dein Abo geht direkt an den Booster deiner Wahl" },
    ],
  },
  nl: {
    eyebrow: "Lidmaatschap", heading: "Claim je lidmaatschap",
    monthly: "Maandelijks", annually: "Jaarlijks",
    billedAs: "Gefactureerd als \${amount}/jaar \u2014 bespaar 20\u00a0%",
    desc: "We probeerden het de moeite waard te maken voor ons, maar het is alleen de moeite waard voor jou! We zijn niet goed in wiskunde.",
    cta: "Word lid", cancel: "Op elk moment opzeggen",
    termsNote: "Wat het eerst van toepassing is.", termsLink: "Bekijk de volledige Servicevoorwaarden",
    perks: [
      { title: "DuoQ voor de halve prijs",        desc: "We geven 50\u00a0% korting op Duo-diensten" },
      { title: "Prioriteit op alle bestellingen", desc: "Jouw bestelling start altijd sneller!" },
      { title: "Gratis geld",                     desc: "Ontvang elke maand $5 in Marktmunten!" },
      { title: "Dubbele Cashback",                desc: "1,5\u00a0% gratis is niet genoeg? Pak dan 3\u00a0% terug!" },
      { title: "Premium maandelijkse kortingen",  desc: "We sturen je elke maand Premium-coupons." },
      { title: "Steun je booster",                desc: "Je abonnement gaat rechtstreeks naar de booster van jouw keuze" },
    ],
  },
  pt: {
    eyebrow: "Assinatura", heading: "Reivindique sua assinatura",
    monthly: "Mensal", annually: "Anual",
    billedAs: "Cobrado como \${amount}/ano \u2014 economize 20\u00a0%",
    desc: "Tentamos fazer valer a pena para n\u00f3s, mas s\u00f3 vale a pena para voc\u00ea! N\u00e3o somos bons em matem\u00e1tica.",
    cta: "Torne-se membro", cancel: "Cancele a qualquer momento",
    termsNote: "O que ocorrer primeiro.", termsLink: "Ver os Termos de Servi\u00e7o completos",
    perks: [
      { title: "DuoQ pela metade do pre\u00e7o",   desc: "Daremos 50\u00a0% de desconto nos servi\u00e7os Duo" },
      { title: "Prioridade em todos os pedidos",   desc: "Seu pedido come\u00e7a mais r\u00e1pido, sempre!" },
      { title: "Dinheiro gr\u00e1tis",             desc: "Receba $5 em Moedas de mercado por m\u00eas!" },
      { title: "Cashback duplo",                   desc: "1,5\u00a0% gr\u00e1tis n\u00e3o \u00e9 suficiente? Pegue 3\u00a0% de volta!" },
      { title: "Descontos mensais premium",        desc: "Enviaremos cup\u00f5es Premium todo m\u00eas." },
      { title: "Apoie seu booster",                desc: "Sua assinatura vai diretamente para o booster de sua escolha" },
    ],
  },
  uk: {
    eyebrow: "\u0427\u043b\u0435\u043d\u0441\u0442\u0432\u043e", heading: "\u041e\u0442\u0440\u0438\u043c\u0430\u0439\u0442\u0435 \u0441\u0432\u043e\u0454 \u0447\u043b\u0435\u043d\u0441\u0442\u0432\u043e",
    monthly: "\u0429\u043e\u043c\u0456\u0441\u044f\u0446\u044f", annually: "\u0429\u043e\u0440\u0456\u0447\u043d\u043e",
    billedAs: "\u0420\u0430\u0445\u0443\u043d\u043e\u043a \u0432\u0438\u0441\u0442\u0430\u0432\u043b\u044f\u0454\u0442\u044c\u0441\u044f \u044f\u043a \${amount}/\u0440\u0456\u043a \u2014 \u0437\u0430\u043e\u0449\u0430\u0434\u044c\u0442\u0435 20\u00a0%",
    desc: "\u041c\u0438 \u043d\u0430\u043c\u0430\u0433\u0430\u043b\u0438\u0441\u044f \u0437\u0440\u043e\u0431\u0438\u0442\u0438 \u0446\u0435 \u0432\u0438\u0433\u0456\u0434\u043d\u0438\u043c \u0434\u043b\u044f \u0441\u0435\u0431\u0435, \u0430\u043b\u0435 \u0446\u0435 \u0432\u0438\u0433\u0456\u0434\u043d\u043e \u043b\u0438\u0448\u0435 \u0434\u043b\u044f \u0432\u0430\u0441! \u041c\u0438 \u043f\u043e\u0433\u0430\u043d\u043e \u0440\u0430\u0445\u0443\u0454\u043c\u043e.",
    cta: "\u0421\u0442\u0430\u0442\u0438 \u0443\u0447\u0430\u0441\u043d\u0438\u043a\u043e\u043c", cancel: "\u0421\u043a\u0430\u0441\u0443\u0439\u0442\u0435 \u0431\u0443\u0434\u044c-\u043a\u043e\u043b\u0438",
    termsNote: "\u0429\u043e \u043d\u0430\u0441\u0442\u0430\u043d\u0435 \u043f\u0435\u0440\u0448\u0438\u043c.", termsLink: "\u041f\u0435\u0440\u0435\u0433\u043b\u044f\u043d\u0443\u0442\u0438 \u043f\u043e\u0432\u043d\u0456 \u0423\u043c\u043e\u0432\u0438 \u043d\u0430\u0434\u0430\u043d\u043d\u044f \u043f\u043e\u0441\u043b\u0443\u0433",
    perks: [
      { title: "DuoQ \u0437\u0430 \u043f\u0456\u0432\u0446\u0456\u043d\u0438",                     desc: "\u041c\u0438 \u0437\u043d\u0438\u0437\u0438\u043c\u043e \u0432\u0430\u0440\u0442\u0456\u0441\u0442\u044c \u043f\u043e\u0441\u043b\u0443\u0433 Duo \u043d\u0430 50\u00a0%" },
      { title: "\u041f\u0440\u0456\u043e\u0440\u0438\u0442\u0435\u0442 \u043d\u0430 \u0432\u0441\u0456 \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f",   desc: "\u0412\u0430\u0448\u0435 \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f \u0441\u0442\u0430\u0440\u0442\u0443\u0454 \u0448\u0432\u0438\u0434\u0448\u0435, \u0437\u0430\u0432\u0436\u0434\u0438!" },
      { title: "\u0411\u0435\u0437\u043a\u043e\u0448\u0442\u043e\u0432\u043d\u0456 \u0433\u0440\u043e\u0448\u0456",                         desc: "\u041e\u0442\u0440\u0438\u043c\u0443\u0439\u0442\u0435 $5 \u0443 \u041c\u0430\u0440\u043a\u0435\u0442-\u043c\u043e\u043d\u0435\u0442\u0430\u0445 \u0449\u043e\u043c\u0456\u0441\u044f\u0446\u044f!" },
      { title: "\u041f\u043e\u0434\u0432\u0456\u0439\u043d\u0438\u0439 \u043a\u0435\u0448\u0431\u0435\u043a",                             desc: "1,5\u00a0% \u0431\u0435\u0437\u043a\u043e\u0448\u0442\u043e\u0432\u043d\u043e \u043c\u0430\u043b\u043e? \u041e\u0442\u0440\u0438\u043c\u0430\u0439\u0442\u0435 3\u00a0% \u043d\u0430\u0437\u0430\u0434!" },
      { title: "\u041f\u0440\u0435\u043c\u0456\u0443\u043c \u0449\u043e\u043c\u0456\u0441\u044f\u0447\u043d\u0456 \u0437\u043d\u0438\u0436\u043a\u0438",             desc: "\u0429\u043e\u043c\u0456\u0441\u044f\u0446\u044f \u043d\u0430\u0434\u0441\u0438\u043b\u0430\u0442\u0438\u043c\u0435\u043c\u043e \u0432\u0430\u043c \u043f\u0440\u0435\u043c\u0456\u0443\u043c-\u043a\u0443\u043f\u043e\u043d\u0438." },
      { title: "\u041f\u0456\u0434\u0442\u0440\u0438\u043c\u0430\u0439\u0442\u0435 \u0441\u0432\u043e\u0433\u043e \u0431\u0443\u0441\u0442\u0435\u0440\u0430",        desc: "\u0412\u0430\u0448\u0430 \u043f\u0456\u0434\u043f\u0438\u0441\u043a\u0430 \u043d\u0430\u0434\u0445\u043e\u0434\u0438\u0442\u044c \u0431\u0435\u0437\u043f\u043e\u0441\u0435\u0440\u0435\u0434\u043d\u044c\u043e \u0434\u043e \u043e\u0431\u0440\u0430\u043d\u043e\u0433\u043e \u0431\u0443\u0441\u0442\u0435\u0440\u0430" },
    ],
  },
  ru: {
    eyebrow: "\u0427\u043b\u0435\u043d\u0441\u0442\u0432\u043e", heading: "\u041f\u043e\u043b\u0443\u0447\u0438\u0442\u0435 \u0447\u043b\u0435\u043d\u0441\u0442\u0432\u043e",
    monthly: "\u0415\u0436\u0435\u043c\u0435\u0441\u044f\u0447\u043d\u043e", annually: "\u0415\u0436\u0435\u0433\u043e\u0434\u043d\u043e",
    billedAs: "\u041e\u043f\u043b\u0430\u0442\u0430 \${amount}/\u0433\u043e\u0434 \u2014 \u044d\u043a\u043e\u043d\u043e\u043c\u0438\u044f 20\u00a0%",
    desc: "\u041c\u044b \u043f\u044b\u0442\u0430\u043b\u0438\u0441\u044c \u0441\u0434\u0435\u043b\u0430\u0442\u044c \u044d\u0442\u043e \u0432\u044b\u0433\u043e\u0434\u043d\u044b\u043c \u0434\u043b\u044f \u043d\u0430\u0441, \u043d\u043e \u044d\u0442\u043e \u0432\u044b\u0433\u043e\u0434\u043d\u043e \u0442\u043e\u043b\u044c\u043a\u043e \u0434\u043b\u044f \u0432\u0430\u0441! \u041c\u044b \u043f\u043b\u043e\u0445\u043e \u0441\u0447\u0438\u0442\u0430\u0435\u043c.",
    cta: "\u0421\u0442\u0430\u0442\u044c \u0443\u0447\u0430\u0441\u0442\u043d\u0438\u043a\u043e\u043c", cancel: "\u041e\u0442\u043c\u0435\u043d\u0438\u0442\u0435 \u0432 \u043b\u044e\u0431\u043e\u0435 \u0432\u0440\u0435\u043c\u044f",
    termsNote: "\u0427\u0442\u043e \u043d\u0430\u0441\u0442\u0443\u043f\u0438\u0442 \u043f\u0435\u0440\u0432\u044b\u043c.", termsLink: "\u0421\u043c\u043e\u0442\u0440\u0435\u0442\u044c \u043f\u043e\u043b\u043d\u044b\u0435 \u0423\u0441\u043b\u043e\u0432\u0438\u044f \u043e\u0431\u0441\u043b\u0443\u0436\u0438\u0432\u0430\u043d\u0438\u044f",
    perks: [
      { title: "DuoQ \u0437\u0430 \u043f\u043e\u043b\u0446\u0435\u043d\u044b",                          desc: "\u041c\u044b \u0441\u043d\u0438\u0437\u0438\u043c \u0441\u0442\u043e\u0438\u043c\u043e\u0441\u0442\u044c \u0443\u0441\u043b\u0443\u0433 Duo \u043d\u0430 50\u00a0%" },
      { title: "\u041f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442 \u043d\u0430 \u0432\u0441\u0435 \u0437\u0430\u043a\u0430\u0437\u044b",         desc: "\u0412\u0430\u0448 \u0437\u0430\u043a\u0430\u0437 \u043d\u0430\u0447\u043d\u0451\u0442\u0441\u044f \u0431\u044b\u0441\u0442\u0440\u0435\u0435, \u0432\u0441\u0435\u0433\u0434\u0430!" },
      { title: "\u0411\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u044b\u0435 \u0434\u0435\u043d\u044c\u0433\u0438",                          desc: "\u041f\u043e\u043b\u0443\u0447\u0430\u0439\u0442\u0435 $5 \u0432 \u0420\u044b\u043d\u043e\u0447\u043d\u044b\u0445 \u043c\u043e\u043d\u0435\u0442\u0430\u0445 \u043a\u0430\u0436\u0434\u044b\u0439 \u043c\u0435\u0441\u044f\u0446!" },
      { title: "\u0414\u0432\u043e\u0439\u043d\u043e\u0439 \u043a\u044d\u0448\u0431\u044d\u043a",                                 desc: "1,5\u00a0% \u0431\u0435\u0441\u043f\u043b\u0430\u0442\u043d\u043e \u043c\u0430\u043b\u043e? \u041f\u043e\u043b\u0443\u0447\u0438\u0442\u0435 3\u00a0% \u043e\u0431\u0440\u0430\u0442\u043d\u043e!" },
      { title: "\u041f\u0440\u0435\u043c\u0438\u0443\u043c \u0435\u0436\u0435\u043c\u0435\u0441\u044f\u0447\u043d\u044b\u0435 \u0441\u043a\u0438\u0434\u043a\u0438",   desc: "\u0411\u0443\u0434\u0435\u043c \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u044f\u0442\u044c \u0432\u0430\u043c \u043f\u0440\u0435\u043c\u0438\u0443\u043c-\u043a\u0443\u043f\u043e\u043d\u044b \u043a\u0430\u0436\u0434\u044b\u0439 \u043c\u0435\u0441\u044f\u0446." },
      { title: "\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u0438\u0442\u0435 \u0441\u0432\u043e\u0435\u0433\u043e \u0431\u0443\u0441\u0442\u0435\u0440\u0430",        desc: "\u0412\u0430\u0448\u0430 \u043f\u043e\u0434\u043f\u0438\u0441\u043a\u0430 \u0438\u0434\u0451\u0442 \u043d\u0430\u043f\u0440\u044f\u043c\u0443\u044e \u0432\u044b\u0431\u0440\u0430\u043d\u043d\u043e\u043c\u0443 \u0431\u0443\u0441\u0442\u0435\u0440\u0443" },
    ],
  },
};

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
      {children}
    </p>
  );
}

export default function HomePage() {
  const [selectedLang, setSelectedLang] = React.useState<LangCode>("en");
  const [langOpen, setLangOpen] = React.useState(false);
  const [billingYearly, setBillingYearly] = React.useState(false);

  React.useEffect(() => {
    const saved = localStorage.getItem("proboost_lang") as LangCode | null;
    if (saved && i18n[saved]) setSelectedLang(saved);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const monthlyPrice = 9.99;
  const displayPrice = billingYearly ? (monthlyPrice * 0.8).toFixed(2) : monthlyPrice.toFixed(2);
  const t = i18n[selectedLang];
  const m = membershipI18n[selectedLang];
  const currentFlag = LANGUAGES.find((l) => l.code === selectedLang)!.flag;

  const highlightKeys = [
    { titleKey: "liveSpecialists" as const,  detailKey: "liveSpecialistsDetail" as const },
    { titleKey: "verifiedRating" as const,   detailKey: "verifiedRatingDetail" as const },
    { titleKey: "avgResponse" as const,      detailKey: "avgResponseDetail" as const },
  ];

  return (
    <main className="relative overflow-hidden">
      {/* Language picker */}
      <div className="fixed right-4 top-20 z-50 sm:right-6">
        <div className="relative">
          <button
            onClick={() => setLangOpen((o) => !o)}
            className="flex items-center gap-2 rounded-full border border-white/15 bg-[#0a0b0f]/90 px-3 py-2 text-sm font-semibold text-white shadow-lg backdrop-blur-md transition hover:border-white/25"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={`https://flagcdn.com/20x15/${currentFlag}.png`} alt="" width={20} height={15} className="rounded-sm" />
            <span className="uppercase tracking-wide">{selectedLang}</span>
            <svg className={`h-3 w-3 text-zinc-400 transition-transform ${langOpen ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" /></svg>
          </button>
          {langOpen && (
            <div className="absolute right-0 top-full mt-2 w-44 overflow-hidden rounded-2xl border border-white/12 bg-[#0d0e13] shadow-2xl">
              {LANGUAGES.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => { setSelectedLang(lang.code); localStorage.setItem("proboost_lang", lang.code); setLangOpen(false); }}
                  className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm transition hover:bg-white/[0.06] ${selectedLang === lang.code ? "text-cyan-300" : "text-zinc-300"}`}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={`https://flagcdn.com/20x15/${lang.flag}.png`} alt="" width={20} height={15} className="rounded-sm" />
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_0%_0%,rgba(251,191,36,0.08),transparent),radial-gradient(ellipse_40%_40%_at_90%_10%,rgba(249,115,22,0.06),transparent)]" />

      {/* Hero + Games — single continuous section with shared background */}
      <section className="relative z-10 overflow-hidden bg-black">
        {/* Full-width background — fades out at the bottom */}
        <div className="pointer-events-none absolute inset-0">
          <Image src="/homepage/homepage-background.png" alt="" fill unoptimized className="object-cover object-top" />
          <div className="absolute inset-0 bg-black/50" />
          {/* bottom fade to page bg */}
          <div className="absolute inset-x-0 bottom-0 h-[40%] bg-gradient-to-b from-transparent to-[#050607]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1480px] px-6 pb-0 pt-28 sm:px-8 lg:pt-32">
          {/* Platform icons */}
          <div className="flex items-center gap-5">
            {[
              { src: "/homepage/icons/playstation-homepage.webp", alt: "PlayStation" },
              { src: "/homepage/icons/windows-homepage.webp",     alt: "Windows"     },
              { src: "/homepage/icons/mobile-homepage.webp",      alt: "Mobile"      },
              { src: "/homepage/icons/xbox-homepage.webp",        alt: "Xbox"        },
              { src: "/homepage/icons/steamdeck-homepage.webp",   alt: "Steam Deck"  },
              { src: "/homepage/icons/switch-homepage.svg",       alt: "Switch"      },
            ].map(({ src, alt }) => (
              <Image key={alt} src={src} alt={alt} width={40} height={40} unoptimized className="h-9 w-auto opacity-60 brightness-200" />
            ))}
          </div>

          {/* Brand name */}
          <p className="mt-7 text-3xl font-black text-cyan-400 lg:text-4xl">ProBoost</p>

          {/* Headline */}
          <h1 className="mt-1 max-w-[680px] text-5xl font-black leading-[0.95] text-white lg:text-6xl xl:text-[5rem]">
            {t.hero}
          </h1>

          {/* Rating row */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <p className="text-sm text-zinc-400">
              Rated <span className="font-bold text-cyan-400">4.9 ★</span> by over{" "}
              <span className="font-semibold text-white">10,000+</span> customers
            </p>
            <div className="flex -space-x-2.5">
              {[0, 1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-8 w-8 overflow-hidden rounded-full border-2 border-black"
                  style={{
                    backgroundImage: "url('/homepage/avatars.png')",
                    backgroundSize: "128px auto",
                    backgroundPosition: `-${i * 32}px top`,
                    backgroundRepeat: "no-repeat",
                  }}
                />
              ))}
            </div>
            <div className="rounded-full bg-cyan-400 px-2.5 py-0.5 text-xs font-black text-black">4.5K</div>
          </div>

          {/* spacer between hero text and game cards */}
          <div className="mt-16 lg:mt-20" />
        </div>

        {/* Games grid — inside the same section so bg continues behind it */}
        <div id="games" className="relative z-10 mx-auto max-w-[1480px] px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
          <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {gameCards.map((game) => {
            const card = (
              <div
                className="group relative overflow-hidden rounded-xl bg-[#0e0f0f] transition-all duration-[250ms]"
                style={{ aspectRatio: "16/9" }}
              >
                {/* Per-game colored glow — right side, blurred */}
                <div
                  className="pointer-events-none absolute inset-y-0 right-0 w-[60%] opacity-25 transition-opacity duration-[250ms] group-hover:opacity-100"
                  style={{ background: game.glow, filter: "blur(80px)", transform: "translate3d(90%, 0, 0)" }}
                />
                {/* Character art — right 60% */}
                <div className="pointer-events-none absolute inset-y-0 right-0 w-[60%]">
                  <Image src={game.bg} alt="" fill unoptimized className="object-contain object-right-bottom" />
                </div>
                {/* Logo — top-left */}
                <div className="absolute left-5 top-5 z-10">
                  <Image
                    src={game.logo}
                    alt={game.name}
                    width={200}
                    height={52}
                    unoptimized
                    className={`w-auto object-contain object-left ${game.name === "Rainbow Six Siege" ? "h-12" : "h-9"}`}
                  />
                </div>
                {/* Stroked game name — lower half, clipped at card right edge */}
                <div className="absolute inset-x-0 bottom-12 z-10 overflow-hidden px-5">
                  <p
                    className="whitespace-nowrap font-black leading-none tracking-tight"
                    style={{ WebkitTextStroke: "1px white", color: "transparent", opacity: 0.24, fontSize: "clamp(2rem, 5vw, 4rem)" }}
                  >
                    {game.name}
                  </p>
                </div>
                {/* Arrow button — expands to "Buy Now" on hover */}
                <div className="absolute bottom-5 left-5 z-10">
                  <div className={`flex h-9 w-9 items-center overflow-hidden rounded-full bg-[#171b1c] transition-[width,background-color] duration-200 group-hover:bg-white/15 ${game.live ? "group-hover:w-[108px]" : "group-hover:w-[130px]"}`}>
                    <span className="ml-3 flex-1 whitespace-nowrap text-xs font-semibold text-white/80 opacity-0 transition-opacity duration-150 group-hover:opacity-100">{game.live ? "Buy Now" : "Coming Soon"}</span>
                    <svg className="mx-2 h-3.5 w-3.5 flex-shrink-0 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                  </div>
                </div>
              </div>
            );

            return game.live ? (
              <Link key={game.name} href={game.href}>
                {card}
              </Link>
            ) : (
              <div key={game.name} className="cursor-default" style={{ filter: "saturate(0.4)" }}>
                {card}
              </div>
            );
          })}
        </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:px-8 lg:py-18">
        <div>
          <SectionEyebrow>{t.howItWorksLabel}</SectionEyebrow>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">{t.howItWorksTitle}</h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-zinc-300">{t.howItWorksSub}</p>
          <ul className="mt-8 space-y-3 text-sm text-zinc-300">
            {t.trustPoints.map((point, i) => (
              <li key={i} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-cyan-300" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 grid gap-4 lg:mt-0">
          {t.steps.map((item) => (
            <div key={item.step} className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-400/10 text-sm font-black text-cyan-200">
                  {item.step}
                </span>
                <h3 className="text-xl font-black text-white">{item.title}</h3>
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Rewards */}
      <section id="rewards" className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18">
        <div className="overflow-hidden rounded-2xl" style={{ background: "linear-gradient(135deg, #0d2218 0%, #0b1e28 50%, #08181f 100%)" }}>
          <div className="flex flex-col lg:flex-row">

            {/* Left — shield + pricing */}
            <div className="relative flex flex-col gap-5 border-b border-white/[0.06] px-8 py-10 lg:w-[40%] lg:border-b-0 lg:border-r lg:px-10 lg:py-12">
              <div className="pointer-events-none absolute inset-0" style={{ background: "radial-gradient(ellipse 90% 70% at 50% 30%, rgba(16,185,129,0.15), transparent)" }} />
              {/* Shield */}
              <div className="relative z-10 flex justify-center">
                <Image src="/homepage/memebership_icon_2.webp" alt="Membership" width={180} height={200} unoptimized className="h-[180px] w-auto" style={{ filter: "drop-shadow(0 0 32px rgba(16,185,129,0.45))" }} />
              </div>
              {/* Price */}
              <div className="relative z-10">
                <p className="font-black leading-none text-white" style={{ fontSize: "3.25rem" }}>
                  <span className="text-2xl align-top mt-2 inline-block">$</span>{displayPrice}<span className="text-xl font-semibold text-zinc-400">/month</span>
                </p>
                {billingYearly && <p className="mt-1 text-xs text-emerald-400">{m.billedAs.replace("${amount}", (monthlyPrice * 0.8 * 12).toFixed(2))}</p>}
              </div>
              {/* Billing toggle */}
              <div className="relative z-10 flex items-center gap-1 rounded-full border border-white/10 bg-black/20 p-1 w-fit">
                <button
                  onClick={() => setBillingYearly(false)}
                  className={`rounded-full px-4 py-1.5 text-sm font-bold transition ${!billingYearly ? "bg-white text-black" : "text-zinc-400 hover:text-white"}`}
                >
                  {m.monthly}
                </button>
                <button
                  onClick={() => setBillingYearly(true)}
                  className={`flex items-center gap-1.5 rounded-full px-4 py-1.5 text-sm font-bold transition ${billingYearly ? "bg-white text-black" : "text-zinc-400 hover:text-white"}`}
                >
                  {m.annually}
                  <span className="rounded-full bg-cyan-400 px-1.5 py-0.5 text-[10px] font-black text-black">-20%</span>
                </button>
              </div>
              {/* Description */}
              <p className="relative z-10 max-w-xs text-sm leading-6 text-zinc-400">{m.desc}</p>
              {/* CTA */}
              <Link href="/signup" className="relative z-10 inline-flex w-fit items-center gap-2 rounded-xl bg-cyan-400 px-6 py-3 text-sm font-extrabold text-black transition hover:bg-cyan-300">
                {m.cta}
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
              </Link>
              <p className="relative z-10 text-xs font-bold uppercase tracking-widest text-zinc-500">{m.cancel}</p>
              <p className="relative z-10 text-xs text-zinc-600">{m.termsNote}{" "}
                <span className="cursor-pointer underline hover:text-zinc-400">{m.termsLink}</span>
              </p>
            </div>

            {/* Right — perks */}
            <div className="flex flex-col justify-center gap-7 px-8 py-10 lg:w-[60%] lg:px-10 lg:py-12">
              <div>
                <div className="flex items-center gap-2">
                  <Image src="/icons/membership-icon-filled2.svg" alt="" width={14} height={14} unoptimized className="h-3.5 w-3.5 opacity-60" />
                  <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400">{m.eyebrow}</p>
                </div>
                <h2 className="mt-2 text-3xl font-black text-white lg:text-4xl">{m.heading}</h2>
              </div>

              <div className="grid grid-cols-1 gap-x-8 gap-y-5 sm:grid-cols-2">
                {([
                  "/homepage/icons/membership1large.svg",
                  "/homepage/icons/membership2large.svg",
                  "/homepage/icons/membership3large.svg",
                  "/homepage/icons/membership4large.svg",
                  "/homepage/icons/membership5large.svg",
                  "/homepage/icons/membership6large.svg",
                ] as const).map((icon, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center overflow-hidden rounded-xl" style={{ background: "rgba(13,40,50,0.8)", border: "1px solid rgba(255,255,255,0.07)" }}>
                      <Image src={icon} alt="" width={40} height={40} unoptimized className="h-full w-full object-cover" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-white">{m.perks[idx].title}</p>
                      <p className="mt-0.5 text-xs leading-5 text-zinc-400">{m.perks[idx].desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </main>
  );
}
