"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import FaqSection from "../components/FaqSection";

type LangCode = "en" | "it" | "fr" | "es" | "de" | "nl" | "pt" | "uk" | "ru";

const LANGUAGES: { code: LangCode; name: string; flag: string }[] = [
  { code: "en", name: "English",    flag: "us" },
  { code: "it", name: "Italiano",   flag: "it" },
  { code: "fr", name: "Français",   flag: "fr" },
  { code: "es", name: "Español",    flag: "es" },
  { code: "de", name: "Deutsch",    flag: "de" },
  { code: "nl", name: "Nederlands", flag: "nl" },
  { code: "pt", name: "Português",  flag: "br" },
  { code: "uk", name: "Українська", flag: "ua" },
  { code: "ru", name: "Русский",    flag: "ru" },
];

const PAGE_I18N: Record<LangCode, {
  heroSub: string; boostersOnline: string;
  boostingLabel: string; viewAll: string;
  trust: { title: string; desc: string }[];
  howLabel: string; howTitle: string; howSub: string;
  steps: { step: string; title: string; description: string }[];
  faqLabel: string; faqTitle: string;
  faq: { q: string; a: string }[];
  services: { title: string; bullets: [string, string, string] }[];
}> = {
  en: {
    heroSub: "Top-tier boosters. Rank Boost, Placements and Win Boosting available on all regions, 24/7.",
    boostersOnline: "Boosters Online", boostingLabel: "Boosting", viewAll: "View All",
    trust: [
      { title: "Safe service", desc: "Region matching, session discipline, and account-safe handling are the default, not upsells." },
      { title: "24/7 support", desc: "You get order updates, ETA changes, and escalation paths without chasing for answers." },
      { title: "Refund clarity", desc: "If a session cannot be delivered in the agreed format, the fallback and refund path is explicit." },
      { title: "Encrypted workflow", desc: "VPN-aware handling and secure checkout are built into the order flow from the start." },
    ],
    howLabel: "How it works", howTitle: "Order in 3 steps.",
    howSub: "No hidden steps, no waiting in the dark. Your order moves from selection to delivery with full visibility.",
    steps: [
      { step: "01", title: "Choose your service", description: "Pick the boost type that fits your goal — ranked climb, Champion push, competitive wins, unrated sessions, or a coaching package." },
      { step: "02", title: "Set your preferences", description: "Lock in your region, platform, desired rank range, VPN on/off, duo play option, and any special account notes before we start." },
      { step: "03", title: "We deliver, you track", description: "A verified booster picks up your order and you get live progress updates. Reach out to support at any stage — response in under 5 minutes." },
    ],
    faqLabel: "Siege FAQ", faqTitle: "Common questions.",
    faq: [
      { q: "What Siege services are available on this page?", a: "This page currently focuses on ranked boosting, Champion pushes, competitive win packages, unrated sessions, and coaching-based E-learning for Rainbow Six Siege." },
      { q: "Is E-learning a separate service or part of boosting?", a: "E-learning is presented as its own Siege service so players can book coaching, gameplay review, and improvement sessions without starting a full rank boost order." },
      { q: "Is the season countdown real or static?", a: "The season timer on this page uses fixed start and end dates for the current Siege season and updates live instead of relying on a fake rolling counter." },
      { q: "Do you support all Siege platforms?", a: "The page is set up around PC, Xbox, and PlayStation support, with order routing adjusted around platform and region availability." },
    ],
    services: [
      { title: "Rank Up Boost", bullets: ["Rank up to Champion", "Free Operators of choice", "Available on all regions"] },
      { title: "Champion Rank Boost", bullets: ["Rank Above Champion", "Guaranteed Result", "Available on all platforms"] },
      { title: "Competitive Wins", bullets: ["Increase your Rank & Win Rate", "Free Operators of choice", "Available on all regions"] },
      { title: "Unrated Matches", bullets: ["Play with your favorite Booster", "No Win Rate impact", "Available on all regions and servers"] },
      { title: "E-Learning", bullets: ["Level up with expert coaching", "Tips to improve gameplay", "Real-time skill growth"] },
    ],
  },
  it: {
    heroSub: "Booster di alto livello. Rank Boost, Placements e Win Boosting disponibili in tutte le regioni, 24/7.",
    boostersOnline: "Booster Online", boostingLabel: "Boost", viewAll: "Vedi Tutti",
    trust: [
      { title: "Servizio sicuro", desc: "Corrispondenza regionale, disciplina delle sessioni e gestione dell'account sicura sono la norma, non extra." },
      { title: "Supporto 24/7", desc: "Ricevi aggiornamenti sugli ordini, modifiche agli ETA e percorsi di escalation senza dover cercare risposte." },
      { title: "Rimborsi chiari", desc: "Se una sessione non può essere consegnata nel formato concordato, il percorso di rimborso è esplicito." },
      { title: "Flusso crittografato", desc: "Gestione VPN e checkout sicuro sono integrati nel flusso degli ordini fin dall'inizio." },
    ],
    howLabel: "Come funziona", howTitle: "Ordina in 3 passi.",
    howSub: "Nessun passaggio nascosto, nessuna attesa al buio. Il tuo ordine passa dalla selezione alla consegna con piena visibilità.",
    steps: [
      { step: "01", title: "Scegli il tuo servizio", description: "Scegli il tipo di boost adatto al tuo obiettivo: salita in classifica, spinta Champion, vittorie competitive, sessioni non classificate o un pacchetto di coaching." },
      { step: "02", title: "Imposta le preferenze", description: "Definisci regione, piattaforma, range di rank desiderato, VPN on/off, opzione duo e note speciali prima di iniziare." },
      { step: "03", title: "Consegniamo, tu monitori", description: "Un booster verificato prende in carico il tuo ordine e ricevi aggiornamenti in tempo reale. Contatta il supporto in qualsiasi momento — risposta in meno di 5 minuti." },
    ],
    faqLabel: "Domande frequenti", faqTitle: "Domande comuni.",
    faq: [
      { q: "Quali servizi Siege sono disponibili?", a: "Questa pagina si concentra su boost ranked, spinte Champion, pacchetti di vittorie competitive, sessioni non classificate e E-learning per R6 Siege." },
      { q: "L'E-learning è separato dal boost?", a: "L'E-learning è presentato come servizio indipendente per prenotare coaching, revisioni di gameplay e sessioni di miglioramento senza avviare un ordine di boost." },
      { q: "Il conto alla rovescia della stagione è reale?", a: "Il timer della stagione utilizza date di inizio e fine fisse per la stagione Siege corrente e si aggiorna in tempo reale." },
      { q: "Supportate tutte le piattaforme Siege?", a: "La pagina è configurata per PC, Xbox e PlayStation con instradamento degli ordini adattato a piattaforma e regione." },
    ],
    services: [
      { title: "Rank Up Boost", bullets: ["Sali fino a Champion", "Operatori a scelta gratuiti", "Disponibile in tutte le regioni"] },
      { title: "Champion Rank Boost", bullets: ["Supera il rank Champion", "Risultato garantito", "Disponibile su tutte le piattaforme"] },
      { title: "Vittorie Competitive", bullets: ["Aumenta rank e win rate", "Operatori a scelta gratuiti", "Disponibile in tutte le regioni"] },
      { title: "Partite Non Classificate", bullets: ["Gioca col tuo booster preferito", "Nessun impatto sul win rate", "Disponibile in tutte le regioni"] },
      { title: "E-Learning", bullets: ["Coaching esperto", "Consigli per migliorare", "Crescita in tempo reale"] },
    ],
  },
  fr: {
    heroSub: "Boosters de haut niveau. Rank Boost, Placements et Win Boosting disponibles dans toutes les régions, 24h/24.",
    boostersOnline: "Boosters en ligne", boostingLabel: "Boost", viewAll: "Voir tout",
    trust: [
      { title: "Service sécurisé", desc: "Correspondance régionale, discipline de session et gestion sécurisée du compte sont la norme, pas des options." },
      { title: "Support 24/7", desc: "Mises à jour de commande, changements d'ETA et chemins d'escalade sans chercher de réponses." },
      { title: "Remboursements clairs", desc: "Si une session ne peut être livrée dans le format convenu, le chemin de remboursement est explicite." },
      { title: "Flux chiffré", desc: "Gestion VPN et paiement sécurisé intégrés dès le début du processus de commande." },
    ],
    howLabel: "Comment ça marche", howTitle: "Commandez en 3 étapes.",
    howSub: "Aucune étape cachée, aucune attente dans l'obscurité. Votre commande passe de la sélection à la livraison en toute transparence.",
    steps: [
      { step: "01", title: "Choisissez votre service", description: "Choisissez le type de boost adapté à votre objectif : montée en rang, push Champion, victoires compétitives, sessions non classées ou coaching." },
      { step: "02", title: "Définissez vos préférences", description: "Définissez votre région, plateforme, plage de rang, VPN activé/désactivé, option duo et notes spéciales." },
      { step: "03", title: "On livre, vous suivez", description: "Un booster vérifié prend en charge votre commande et vous recevez des mises à jour en direct. Support disponible à tout moment — réponse en moins de 5 minutes." },
    ],
    faqLabel: "FAQ Siege", faqTitle: "Questions fréquentes.",
    faq: [
      { q: "Quels services Siege sont disponibles ?", a: "Cette page se concentre sur le boost ranked, les pushes Champion, les victoires compétitives, les sessions non classées et l'E-learning pour R6 Siege." },
      { q: "L'E-learning est-il séparé du boost ?", a: "L'E-learning est un service indépendant pour réserver du coaching, des revues de gameplay et des sessions d'amélioration sans démarrer un order de boost." },
      { q: "Le compte à rebours de saison est-il réel ?", a: "Le minuteur utilise les dates de début et de fin de la saison Siege actuelle et se met à jour en temps réel." },
      { q: "Prenez-vous en charge toutes les plateformes Siege ?", a: "La page prend en charge PC, Xbox et PlayStation avec un routage adapté à la plateforme et à la région." },
    ],
    services: [
      { title: "Rank Up Boost", bullets: ["Montez jusqu'à Champion", "Opérateurs au choix gratuits", "Disponible dans toutes les régions"] },
      { title: "Champion Rank Boost", bullets: ["Au-delà du rang Champion", "Résultat garanti", "Disponible sur toutes les plateformes"] },
      { title: "Victoires Compétitives", bullets: ["Améliorez rang et win rate", "Opérateurs au choix gratuits", "Disponible dans toutes les régions"] },
      { title: "Matchs Non Classés", bullets: ["Jouez avec votre booster favori", "Aucun impact sur le win rate", "Disponible dans toutes les régions"] },
      { title: "E-Learning", bullets: ["Coaching expert", "Conseils pour progresser", "Croissance en temps réel"] },
    ],
  },
  es: {
    heroSub: "Boosters de primer nivel. Rank Boost, Placements y Win Boosting disponibles en todas las regiones, 24/7.",
    boostersOnline: "Boosters en línea", boostingLabel: "Boost", viewAll: "Ver todo",
    trust: [
      { title: "Servicio seguro", desc: "Coincidencia regional, disciplina de sesión y manejo seguro de cuenta son el estándar, no extras." },
      { title: "Soporte 24/7", desc: "Recibes actualizaciones de pedidos, cambios de ETA y rutas de escalación sin buscar respuestas." },
      { title: "Reembolsos claros", desc: "Si una sesión no puede entregarse en el formato acordado, el proceso de reembolso es explícito." },
      { title: "Flujo encriptado", desc: "Gestión VPN y pago seguro integrados en el flujo de pedidos desde el principio." },
    ],
    howLabel: "Cómo funciona", howTitle: "Pide en 3 pasos.",
    howSub: "Sin pasos ocultos, sin esperar en la oscuridad. Tu pedido va de la selección a la entrega con total visibilidad.",
    steps: [
      { step: "01", title: "Elige tu servicio", description: "Selecciona el tipo de boost que se adapta a tu objetivo: subida de rango, push a Champion, victorias competitivas, sesiones sin clasificar o coaching." },
      { step: "02", title: "Configura tus preferencias", description: "Define tu región, plataforma, rango deseado, VPN on/off, opción dúo y notas especiales antes de empezar." },
      { step: "03", title: "Entregamos, tú sigues", description: "Un booster verificado toma tu pedido y recibes actualizaciones en vivo. Contacta soporte en cualquier momento — respuesta en menos de 5 minutos." },
    ],
    faqLabel: "Preguntas Siege", faqTitle: "Preguntas frecuentes.",
    faq: [
      { q: "¿Qué servicios de Siege están disponibles?", a: "Esta página se centra en boost ranked, pushes a Champion, paquetes de victorias competitivas, sesiones sin clasificar y E-learning para R6 Siege." },
      { q: "¿El E-learning es independiente del boost?", a: "El E-learning es un servicio propio para reservar coaching, revisiones de gameplay y sesiones de mejora sin iniciar un pedido de boost." },
      { q: "¿La cuenta atrás de temporada es real?", a: "El temporizador usa fechas de inicio y fin fijas de la temporada actual de Siege y se actualiza en tiempo real." },
      { q: "¿Soportan todas las plataformas de Siege?", a: "La página está configurada para PC, Xbox y PlayStation con enrutamiento adaptado a plataforma y región." },
    ],
    services: [
      { title: "Rank Up Boost", bullets: ["Sube hasta Champion", "Operadores a elegir gratis", "Disponible en todas las regiones"] },
      { title: "Champion Rank Boost", bullets: ["Por encima del rango Champion", "Resultado garantizado", "Disponible en todas las plataformas"] },
      { title: "Victorias Competitivas", bullets: ["Mejora rango y win rate", "Operadores a elegir gratis", "Disponible en todas las regiones"] },
      { title: "Partidas No Clasificadas", bullets: ["Juega con tu booster favorito", "Sin impacto en win rate", "Disponible en todas las regiones"] },
      { title: "E-Learning", bullets: ["Coaching experto", "Consejos para mejorar", "Crecimiento en tiempo real"] },
    ],
  },
  de: {
    heroSub: "Top-Booster. Rank Boost, Placements und Win Boosting in allen Regionen, rund um die Uhr.",
    boostersOnline: "Booster Online", boostingLabel: "Boosting", viewAll: "Alle ansehen",
    trust: [
      { title: "Sicherer Service", desc: "Regionale Übereinstimmung, Session-Disziplin und sicherer Account-Umgang sind Standard, keine Extras." },
      { title: "24/7-Support", desc: "Bestellupdates, ETA-Änderungen und Eskalationspfade ohne langwierige Suche nach Antworten." },
      { title: "Klare Rückerstattungen", desc: "Wenn eine Session nicht im vereinbarten Format geliefert werden kann, ist der Rückerstattungspfad klar." },
      { title: "Verschlüsselter Workflow", desc: "VPN-bewusstes Handling und sicherer Checkout sind von Anfang an im Bestellablauf integriert." },
    ],
    howLabel: "So funktioniert es", howTitle: "In 3 Schritten bestellen.",
    howSub: "Keine versteckten Schritte, kein Warten im Dunkeln. Deine Bestellung geht von der Auswahl bis zur Lieferung mit voller Transparenz.",
    steps: [
      { step: "01", title: "Wähle deinen Service", description: "Wähle den Boost-Typ, der zu deinem Ziel passt: Rang-Aufstieg, Champion-Push, Wettkampfsiege, ungewertete Sessions oder Coaching." },
      { step: "02", title: "Präferenzen festlegen", description: "Region, Plattform, gewünschter Rangbereich, VPN an/aus, Duo-Option und besondere Kontonotizen festlegen, bevor wir starten." },
      { step: "03", title: "Wir liefern, du verfolgst", description: "Ein verifizierter Booster übernimmt deine Bestellung und du erhältst Live-Updates. Support jederzeit erreichbar — Antwort in unter 5 Minuten." },
    ],
    faqLabel: "Siege FAQ", faqTitle: "Häufige Fragen.",
    faq: [
      { q: "Welche Siege-Services sind verfügbar?", a: "Diese Seite umfasst Rang-Boost, Champion-Pushes, Wettkampfsiege, ungewertete Sessions und E-Learning-Coaching für R6 Siege." },
      { q: "Ist E-Learning von Boosting getrennt?", a: "E-Learning ist ein eigenständiger Siege-Service für Coaching, Gameplay-Reviews und Verbesserungssessions ohne einen vollen Boost-Auftrag." },
      { q: "Ist der Saisonzähler echt?", a: "Der Saisontimer verwendet feste Start- und Enddaten der aktuellen Siege-Saison und aktualisiert sich live." },
      { q: "Unterstützt ihr alle Siege-Plattformen?", a: "Die Seite ist für PC, Xbox und PlayStation ausgelegt, mit angepasstem Routing nach Plattform und Region." },
    ],
    services: [
      { title: "Rank Up Boost", bullets: ["Bis Champion aufsteigen", "Gratis Operatoren nach Wahl", "In allen Regionen verfügbar"] },
      { title: "Champion Rank Boost", bullets: ["Über Champion hinaus", "Garantiertes Ergebnis", "Auf allen Plattformen verfügbar"] },
      { title: "Wettkampfsiege", bullets: ["Rang und Win-Rate verbessern", "Gratis Operatoren nach Wahl", "In allen Regionen verfügbar"] },
      { title: "Ungewertete Matches", bullets: ["Mit deinem Lieblings-Booster spielen", "Kein Einfluss auf die Win-Rate", "In allen Regionen verfügbar"] },
      { title: "E-Learning", bullets: ["Experten-Coaching", "Tipps zur Verbesserung", "Echtzeit-Wachstum"] },
    ],
  },
  nl: {
    heroSub: "Topboosters. Rank Boost, Placements en Win Boosting beschikbaar in alle regio's, 24/7.",
    boostersOnline: "Boosters Online", boostingLabel: "Boosting", viewAll: "Alles bekijken",
    trust: [
      { title: "Veilige service", desc: "Regionale afstemming, sessiediscipline en veilig accountbeheer zijn standaard, geen extra's." },
      { title: "24/7 support", desc: "Je krijgt bestelupdates, ETA-wijzigingen en escalatiepaden zonder te hoeven zoeken naar antwoorden." },
      { title: "Duidelijke terugbetalingen", desc: "Als een sessie niet in het overeengekomen formaat kan worden geleverd, is het terugbetalingspad expliciet." },
      { title: "Versleuteld proces", desc: "VPN-bewuste verwerking en veilig afrekenen zijn vanaf het begin ingebouwd in de bestelstroom." },
    ],
    howLabel: "Hoe het werkt", howTitle: "Bestel in 3 stappen.",
    howSub: "Geen verborgen stappen, geen wachten in het donker. Je bestelling gaat van selectie naar levering met volledige zichtbaarheid.",
    steps: [
      { step: "01", title: "Kies je service", description: "Kies het boosttype dat past bij jouw doel: rangklimmen, Champion-push, competitieve overwinningen, unrated sessies of coaching." },
      { step: "02", title: "Stel je voorkeuren in", description: "Vergrendel regio, platform, gewenst rangbereik, VPN aan/uit, duo-optie en speciale accountnotities voordat we beginnen." },
      { step: "03", title: "Wij leveren, jij volgt", description: "Een geverifieerde booster pakt je bestelling op en je krijgt live voortgangsupdates. Neem op elk moment contact op met support — reactie binnen 5 minuten." },
    ],
    faqLabel: "Siege FAQ", faqTitle: "Veelgestelde vragen.",
    faq: [
      { q: "Welke Siege-services zijn beschikbaar?", a: "Deze pagina richt zich op ranked boosting, Champion-pushes, competitieve winstpakketten, unrated sessies en E-learning coaching voor R6 Siege." },
      { q: "Is E-learning apart van boosting?", a: "E-learning is een eigen Siege-service voor het boeken van coaching, gameplaybeoordeling en verbeteringssessies zonder een volledig boost-order." },
      { q: "Is de seizoenstimer echt?", a: "De seizoenstimer gebruikt vaste start- en einddatums voor het huidige Siege-seizoen en wordt live bijgewerkt." },
      { q: "Ondersteunen jullie alle Siege-platforms?", a: "De pagina is opgezet voor pc, Xbox en PlayStation met orderrouting aangepast aan platform en regio." },
    ],
    services: [
      { title: "Rank Up Boost", bullets: ["Klim tot Champion", "Gratis operators naar keuze", "Beschikbaar in alle regio's"] },
      { title: "Champion Rank Boost", bullets: ["Boven Champion-rang", "Gegarandeerd resultaat", "Beschikbaar op alle platforms"] },
      { title: "Competitieve Overwinningen", bullets: ["Verbeter rang en win-rate", "Gratis operators naar keuze", "Beschikbaar in alle regio's"] },
      { title: "Unrated Matches", bullets: ["Speel met je favoriete booster", "Geen impact op win-rate", "Beschikbaar in alle regio's"] },
      { title: "E-Learning", bullets: ["Expertcoaching", "Tips om te verbeteren", "Realtime groei"] },
    ],
  },
  pt: {
    heroSub: "Boosters de alto nível. Rank Boost, Placements e Win Boosting disponíveis em todas as regiões, 24/7.",
    boostersOnline: "Boosters Online", boostingLabel: "Boosting", viewAll: "Ver tudo",
    trust: [
      { title: "Serviço seguro", desc: "Correspondência regional, disciplina de sessão e manuseio seguro da conta são padrão, não extras." },
      { title: "Suporte 24/7", desc: "Você recebe atualizações de pedidos, mudanças de ETA e caminhos de escalonamento sem precisar procurar respostas." },
      { title: "Reembolsos claros", desc: "Se uma sessão não puder ser entregue no formato combinado, o caminho de reembolso é explícito." },
      { title: "Fluxo criptografado", desc: "Manuseio com VPN e checkout seguro estão integrados ao fluxo de pedidos desde o início." },
    ],
    howLabel: "Como funciona", howTitle: "Peça em 3 etapas.",
    howSub: "Nenhuma etapa oculta, nenhuma espera no escuro. Seu pedido vai da seleção à entrega com total visibilidade.",
    steps: [
      { step: "01", title: "Escolha seu serviço", description: "Escolha o tipo de boost que se encaixa no seu objetivo: subida de rank, push para Champion, vitórias competitivas, sessões não classificadas ou coaching." },
      { step: "02", title: "Configure suas preferências", description: "Defina sua região, plataforma, faixa de rank desejada, VPN ligado/desligado, opção duo e notas especiais antes de começar." },
      { step: "03", title: "Entregamos, você acompanha", description: "Um booster verificado pega seu pedido e você recebe atualizações ao vivo. Contate o suporte a qualquer momento — resposta em menos de 5 minutos." },
    ],
    faqLabel: "FAQ Siege", faqTitle: "Perguntas comuns.",
    faq: [
      { q: "Quais serviços do Siege estão disponíveis?", a: "Esta página foca em boost ranked, pushes para Champion, pacotes de vitórias competitivas, sessões não classificadas e E-learning para R6 Siege." },
      { q: "O E-learning é separado do boost?", a: "O E-learning é um serviço próprio do Siege para reservar coaching, revisões de gameplay e sessões de melhoria sem iniciar um pedido de boost." },
      { q: "A contagem regressiva da temporada é real?", a: "O timer da temporada usa datas fixas de início e fim da temporada atual do Siege e se atualiza ao vivo." },
      { q: "Vocês suportam todas as plataformas do Siege?", a: "A página é configurada para PC, Xbox e PlayStation com roteamento de pedidos ajustado por plataforma e região." },
    ],
    services: [
      { title: "Rank Up Boost", bullets: ["Suba até Champion", "Operators à escolha grátis", "Disponível em todas as regiões"] },
      { title: "Champion Rank Boost", bullets: ["Acima do rank Champion", "Resultado garantido", "Disponível em todas as plataformas"] },
      { title: "Vitórias Competitivas", bullets: ["Melhore rank e win rate", "Operators à escolha grátis", "Disponível em todas as regiões"] },
      { title: "Partidas Não Classificadas", bullets: ["Jogue com seu booster favorito", "Sem impacto no win rate", "Disponível em todas as regiões"] },
      { title: "E-Learning", bullets: ["Coaching especializado", "Dicas para melhorar", "Crescimento em tempo real"] },
    ],
  },
  uk: {
    heroSub: "Бустери найвищого рівня. Rank Boost, Placements та Win Boosting у всіх регіонах, 24/7.",
    boostersOnline: "Бустерів онлайн", boostingLabel: "Буст", viewAll: "Переглянути все",
    trust: [
      { title: "Безпечний сервіс", desc: "Регіональна відповідність, дисципліна сесій та безпечна робота з акаунтом — це стандарт, а не додаткові послуги." },
      { title: "Підтримка 24/7", desc: "Ви отримуєте оновлення замовлень, зміни ETA та шляхи ескалації без пошуку відповідей." },
      { title: "Чіткі відшкодування", desc: "Якщо сесію неможливо доставити в узгодженому форматі, шлях відшкодування чітко визначений." },
      { title: "Шифрований процес", desc: "Обробка з VPN та безпечна оплата вбудовані у процес замовлення з самого початку." },
    ],
    howLabel: "Як це працює", howTitle: "Замовте за 3 кроки.",
    howSub: "Жодних прихованих кроків, жодного очікування в темряві. Ваше замовлення переходить від вибору до доставки з повною прозорістю.",
    steps: [
      { step: "01", title: "Оберіть свій сервіс", description: "Виберіть тип буста для вашої цілі: підйом у рейтингу, штовхання до Champion, конкурентні перемоги, нерейтингові сесії або коучинг." },
      { step: "02", title: "Налаштуйте параметри", description: "Визначте регіон, платформу, бажаний діапазон рангу, VPN вкл/викл, опцію дуо та спеціальні нотатки перед початком." },
      { step: "03", title: "Ми доставляємо, ви стежите", description: "Перевірений бустер бере ваше замовлення, і ви отримуєте оновлення в реальному часі. Зверніться до підтримки будь-коли — відповідь менш ніж за 5 хвилин." },
    ],
    faqLabel: "Питання Siege", faqTitle: "Поширені запитання.",
    faq: [
      { q: "Які сервіси Siege доступні?", a: "Ця сторінка охоплює ranked буст, штовхання до Champion, пакети конкурентних перемог, нерейтингові сесії та E-learning для R6 Siege." },
      { q: "E-learning — окрема послуга?", a: "E-learning є самостійним сервісом Siege для бронювання коучингу, перегляду ігрового процесу та сесій покращення без повного замовлення буста." },
      { q: "Зворотний відлік сезону реальний?", a: "Таймер сезону використовує фіксовані дати початку та кінця поточного сезону Siege і оновлюється в реальному часі." },
      { q: "Чи підтримуєте всі платформи Siege?", a: "Сторінка налаштована для PC, Xbox та PlayStation із маршрутизацією замовлень адаптованою до платформи та регіону." },
    ],
    services: [
      { title: "Rank Up Boost", bullets: ["Піднятися до Champion", "Безкоштовні Operators на вибір", "Доступно у всіх регіонах"] },
      { title: "Champion Rank Boost", bullets: ["Вище Champion рангу", "Гарантований результат", "Доступно на всіх платформах"] },
      { title: "Конкурентні Перемоги", bullets: ["Покращіть ранг та win rate", "Безкоштовні Operators на вибір", "Доступно у всіх регіонах"] },
      { title: "Нерейтингові Матчі", bullets: ["Грайте з улюбленим бустером", "Без впливу на win rate", "Доступно у всіх регіонах"] },
      { title: "E-Learning", bullets: ["Експертний коучинг", "Поради для покращення", "Ріст у реальному часі"] },
    ],
  },
  ru: {
    heroSub: "Бустеры высшего уровня. Rank Boost, Placements и Win Boosting во всех регионах, 24/7.",
    boostersOnline: "Бустеров онлайн", boostingLabel: "Буст", viewAll: "Посмотреть все",
    trust: [
      { title: "Безопасный сервис", desc: "Региональное соответствие, дисциплина сессий и безопасная работа с аккаунтом — стандарт, не дополнение." },
      { title: "Поддержка 24/7", desc: "Вы получаете обновления заказов, изменения ETA и пути эскалации без поиска ответов." },
      { title: "Чёткие возвраты", desc: "Если сессию невозможно доставить в оговорённом формате, путь возврата явно определён." },
      { title: "Зашифрованный процесс", desc: "Обработка с VPN и безопасная оплата встроены в процесс заказа с самого начала." },
    ],
    howLabel: "Как это работает", howTitle: "Закажите за 3 шага.",
    howSub: "Никаких скрытых шагов, никакого ожидания в темноте. Ваш заказ переходит от выбора к доставке с полной прозрачностью.",
    steps: [
      { step: "01", title: "Выберите сервис", description: "Выберите тип буста для своей цели: подъём в рейтинге, пуш к Champion, конкурентные победы, нерейтинговые сессии или коучинг." },
      { step: "02", title: "Настройте параметры", description: "Укажите регион, платформу, желаемый диапазон ранга, VPN вкл/выкл, опцию дуо и особые заметки перед стартом." },
      { step: "03", title: "Мы доставляем, вы следите", description: "Проверенный бустер берёт ваш заказ, и вы получаете обновления в реальном времени. Обратитесь в поддержку в любой момент — ответ менее чем за 5 минут." },
    ],
    faqLabel: "Вопросы о Siege", faqTitle: "Частые вопросы.",
    faq: [
      { q: "Какие сервисы Siege доступны?", a: "Страница охватывает ranked буст, пуши к Champion, пакеты конкурентных побед, нерейтинговые сессии и E-learning для R6 Siege." },
      { q: "E-learning — отдельный сервис?", a: "E-learning является самостоятельным сервисом Siege для бронирования коучинга, просмотра геймплея и улучшающих сессий без полного заказа буста." },
      { q: "Обратный отсчёт сезона реальный?", a: "Таймер сезона использует фиксированные даты начала и окончания текущего сезона Siege и обновляется в реальном времени." },
      { q: "Поддерживаете ли все платформы Siege?", a: "Страница настроена для PC, Xbox и PlayStation с маршрутизацией заказов под платформу и регион." },
    ],
    services: [
      { title: "Rank Up Boost", bullets: ["Подняться до Champion", "Бесплатные Операторы на выбор", "Доступно во всех регионах"] },
      { title: "Champion Rank Boost", bullets: ["Выше ранга Champion", "Гарантированный результат", "Доступно на всех платформах"] },
      { title: "Конкурентные Победы", bullets: ["Улучшите ранг и win rate", "Бесплатные Операторы на выбор", "Доступно во всех регионах"] },
      { title: "Нерейтинговые Матчи", bullets: ["Играйте с любимым бустером", "Без влияния на win rate", "Доступно во всех регионах"] },
      { title: "E-Learning", bullets: ["Экспертный коучинг", "Советы по улучшению", "Рост в реальном времени"] },
    ],
  },
};

type GameMenuItem = {
  id: string;
  label: string;
  chipLabel?: string;
  iconSrc?: string;
  shortLabel: string;
  fallbackClass: string;
  comingSoon?: boolean;
};

type ServiceCard = {
  id: string;
  tag: string;
  title: string;
  description: string;
  image?: string;
  bullets: string[];
  href: string;
};

const GAME_MENU_ITEMS: GameMenuItem[] = [
  { id: "lol", label: "League of Legends", shortLabel: "L", fallbackClass: "bg-[#0e5a68] text-[#d4af37]" },
  { id: "wow", label: "World of Warcraft", iconSrc: "/game-icons/game_icon (1).webp", shortLabel: "W", fallbackClass: "bg-[#23314f] text-[#f3c356]" },
  { id: "valorant", label: "Valorant", iconSrc: "/game-icons/game_icon (2).webp", shortLabel: "V", fallbackClass: "bg-[#ff5468] text-black" },
  { id: "r6", label: "Rainbow Six Siege", chipLabel: "Rainbow Six Siege X", iconSrc: "/game-icons/r6-icon.webp", shortLabel: "R6", fallbackClass: "bg-cyan-400 text-black" },
  { id: "rocket-league", label: "Rocket League", iconSrc: "/game-icons/game_icon (3).webp", shortLabel: "RL", fallbackClass: "bg-[#3d6ef7] text-white" },
  { id: "overwatch", label: "Overwatch", iconSrc: "/game-icons/game_icon (4).webp", shortLabel: "OW", fallbackClass: "bg-zinc-700 text-white" },
  { id: "cs2", label: "Counter Strike 2", iconSrc: "/game-icons/game_icon (5).webp", shortLabel: "CS2", fallbackClass: "bg-[#f97316] text-black" },
  { id: "dota-2", label: "Dota 2", iconSrc: "/game-icons/game_icon (6).webp", shortLabel: "D2", fallbackClass: "bg-[#7f1d1d] text-white" },
  { id: "apex", label: "Apex Legends", iconSrc: "/game-icons/game_icon (7).webp", shortLabel: "A", fallbackClass: "bg-[#93333b] text-white" },
  { id: "fortnite", label: "Fortnite", iconSrc: "/game-icons/game_icon (8).webp", shortLabel: "F", fallbackClass: "bg-[#7c3aed] text-white" },
  { id: "tft", label: "Teamfight Tactics", shortLabel: "TFT", fallbackClass: "bg-[#4f46e5] text-white", comingSoon: true },
  { id: "finals", label: "The Finals", iconSrc: "/game-icons/game_icon (9).webp", shortLabel: "TF", fallbackClass: "bg-[#dc2626] text-white", comingSoon: true },
  { id: "cod", label: "Call of Duty", iconSrc: "/game-icons/game_icon (10).webp", shortLabel: "COD", fallbackClass: "bg-zinc-800 text-white", comingSoon: true },
  { id: "marvel-rivals", label: "Marvel Rivals", shortLabel: "MR", fallbackClass: "bg-[#111827] text-white", comingSoon: true },
  { id: "fc26", label: "FC26", shortLabel: "FC", fallbackClass: "bg-[#14532d] text-[#22c55e]", comingSoon: true },
  { id: "poe2", label: "Path of Exile 2", shortLabel: "POE2", fallbackClass: "bg-[#3f1d12] text-[#f59e0b]", comingSoon: true },
  { id: "rematch", label: "Rematch", iconSrc: "/game-icons/game_icon (11).webp", shortLabel: "RM", fallbackClass: "bg-[#0f172a] text-white", comingSoon: true },
  { id: "clash-royale", label: "Clash Royale", shortLabel: "CR", fallbackClass: "bg-[#1d4ed8] text-white", comingSoon: true },
  { id: "battlefield-6", label: "Battlefield 6", iconSrc: "/game-icons/game_icon (12).webp", shortLabel: "B6", fallbackClass: "bg-[#ea580c] text-white", comingSoon: true },
  { id: "arc-raiders", label: "Arc Raiders", iconSrc: "/game-icons/game_icon (13).webp", shortLabel: "AR", fallbackClass: "bg-[#f3f4f6] text-black", comingSoon: true },
  { id: "gta6", label: "Grand Theft Auto 6", iconSrc: "/game-icons/game_icon (14).webp", shortLabel: "VI", fallbackClass: "bg-[#7c3aed] text-white", comingSoon: true },
];

function buildSectionTabs(basePath: string) {
  return [
    { id: "overview", label: "Overview", href: null },
    { id: "boosting", label: "Boosting", href: `${basePath}/rainbow-six-siege-rank-boost` },
    { id: "e-learning", label: "E-learning", href: "/en/rainbow-six-siege-boost/elearning" },
    { id: "boosters", label: "Boosters", href: null },
  ];
}

function buildServiceCards(basePath: string): ServiceCard[] {
  return [
    {
      id: "rank-up",
      tag: "-15%",
      title: "Rank Up Boost",
      image: "/r6-rank-boost.png",
      description: "",
      href: `${basePath}/rainbow-six-siege-rank-boost`,
      bullets: ["Rank up to Champion", "Free Operators of choice", "Available on all regions"],
    },
    {
      id: "champion",
      tag: "-15%",
      title: "Champion Rank Boost",
      image: "/ranks/rank_8.webp",
      description: "",
      href: "/en/rainbow-six-siege-boost/champion",
      bullets: ["Rank Above Champion", "Guaranteed Result", "Available on all platforms"],
    },
    {
      id: "competitive",
      tag: "-15%",
      title: "Competitive Wins",
      image: "/rainbow-competitive-wins.png",
      description: "",
      href: "/en/rainbow-six-siege-boost/competitive",
      bullets: ["Increase your Rank & Win Rate", "Free Operators of choice", "Available on all regions"],
    },
    {
      id: "unrated",
      tag: "-15%",
      title: "Unrated Matches",
      image: "/rainbow-six-siege-unrated-matches-boost.webp",
      description: "",
      href: "/en/rainbow-six-siege-boost/unrated",
      bullets: ["Play with your favorite Booster", "No Win Rate", "Available on all regions and servers"],
    },
    {
      id: "elearning",
      tag: "-15%",
      title: "E-Learning",
      image: "/e-learning_boost.webp",
      description: "",
      href: "/en/rainbow-six-siege-boost/elearning",
      bullets: ["Level up expert gaming coaching", "Tips to improve gameplay", "Real-time skill growth"],
    },
  ];
}

const TRUST_ITEMS = [
  {
    title: "Safe service",
    description: "Region matching, session discipline, and account-safe handling are the default, not upsells.",
    iconSrc: "/icons/safe-service.png",
  },
  {
    title: "24/7 support",
    description: "You get order updates, ETA changes, and escalation paths without chasing for answers.",
    iconSrc: "/icons/24-7-support.png",
  },
  {
    title: "Refund clarity",
    description: "If a session cannot be delivered in the agreed format, the fallback and refund path is explicit.",
    iconSrc: "/icons/money-refunds.png",
  },
  {
    title: "Encrypted workflow",
    description: "VPN-aware handling and secure checkout are built into the order flow from the start.",
    iconSrc: "/icons/ssl.png",
  },
];

const FAQ_COPY = {
  label: "Siege FAQ",
  items: [
    {
      q: "What Siege services are available on this page?",
      a: "This page currently focuses on ranked boosting, Champion pushes, competitive win packages, unrated sessions, and coaching-based E-learning for Rainbow Six Siege.",
    },
    {
      q: "Is E-learning a separate service or part of boosting?",
      a: "E-learning is presented as its own Siege service so players can book coaching, gameplay review, and improvement sessions without starting a full rank boost order.",
    },
    {
      q: "Is the season countdown real or static?",
      a: "The season timer on this page uses fixed start and end dates for the current Siege season and updates live instead of relying on a fake rolling counter.",
    },
    {
      q: "Do you support all Siege platforms?",
      a: "The page is set up around PC, Xbox, and PlayStation support, with order routing adjusted around platform and region availability.",
    },
  ],
};

function GameMenuIcon({ item, className = "h-10 w-10", priority = false }: { item: GameMenuItem; className?: string; priority?: boolean }) {
  if (item.iconSrc) {
    return (
      <span className={`flex ${className} items-center justify-center overflow-hidden rounded-full bg-white/[0.04]`}>
        <Image
          src={item.iconSrc}
          alt=""
          width={48}
          height={48}
          priority={priority}
          unoptimized
          className="h-full w-full object-cover"
        />
      </span>
    );
  }

  return (
    <span className={`flex ${className} items-center justify-center rounded-full text-[11px] font-black tracking-[0.08em] ${item.fallbackClass}`}>
      {item.shortLabel}
    </span>
  );
}

function ChevronDownIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3.5 6.5 8 11l4.5-4.5" />
    </svg>
  );
}

function ArrowUpRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 11 11 5" />
      <path d="M6 5h5v5" />
    </svg>
  );
}

function ArrowLeftIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 3.5 5.5 8 10 12.5" />
    </svg>
  );
}

function ArrowRightIcon({ className = "h-4 w-4" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="m6 3.5 4.5 4.5L6 12.5" />
    </svg>
  );
}

function LightningIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
      <path d="M8.8 1.5 3.7 8h3l-.7 6.5L12.2 8H9.1l-.3-6.5Z" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M8 1.5 13 3.5v3.8c0 3-2 5.7-5 7.2-3-1.5-5-4.2-5-7.2V3.5L8 1.5Z" />
      <path d="m6.3 8 1.2 1.2L10 6.7" />
    </svg>
  );
}

function ServiceArtwork({ image }: { serviceId: string; image?: string }) {
  if (!image) return null;

  return (
    <div className="relative flex h-[132px] w-full items-end justify-end overflow-hidden">
      <Image
        src={image}
        alt=""
        width={160}
        height={160}
        className="h-auto max-h-[132px] w-auto max-w-full object-contain drop-shadow-[0_8px_24px_rgba(0,0,0,0.55)]"
      />
    </div>
  );
}

export default function SiegeBoostingPage({ basePath = "/boosting" }: { basePath?: string }) {
  const SECTION_TABS = buildSectionTabs(basePath);
  const SERVICE_CARDS_BASE = buildServiceCards(basePath);

  const [selectedLang, setSelectedLang] = React.useState<LangCode>("en");
  const [langOpen, setLangOpen] = React.useState(false);
  const langRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const saved = localStorage.getItem("proboost_lang");
    if (saved) setSelectedLang(saved as never);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const t = PAGE_I18N[selectedLang];
  const currentFlag = LANGUAGES.find((l) => l.code === selectedLang)!.flag;

  const SERVICE_CARDS = SERVICE_CARDS_BASE.map((card, i) => ({
    ...card,
    title: t.services[i]?.title ?? card.title,
    bullets: t.services[i]?.bullets ?? card.bullets,
  }));

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const [selectedServiceId, setSelectedServiceId] = React.useState<string | null>(null);

  const getBoosterCount = React.useCallback(() => {
    const now = new Date();
    const seed = now.getFullYear() * 10000 + (now.getMonth() + 1) * 100 + now.getDate();
    const slot = Math.floor((now.getHours() * 60 + now.getMinutes()) / 144);
    const hash = ((seed * 9301 + slot * 49297) % 233280) / 233280;
    return Math.floor(hash * 41) + 80;
  }, []);

  const [boosterCount, setBoosterCount] = React.useState(() => getBoosterCount());

  React.useEffect(() => {
    const interval = window.setInterval(() => {
      setBoosterCount(getBoosterCount());
    }, 60000);

    return () => window.clearInterval(interval);
  }, [getBoosterCount]);

  return (
    <main className="min-h-screen bg-[#050607] text-white">

      {/* Tab strip — slim row directly below the fixed header */}
      <div className="fixed inset-x-0 top-[72px] z-40 flex items-center justify-center border-b border-white/6 bg-[#050607]/90 backdrop-blur-md">
        <div className="inline-flex items-center gap-1 px-2 py-2.5">
          {SECTION_TABS.map((tab) => {
            const cls = `rounded-full px-5 py-1.5 text-sm font-medium transition ${
              tab.id === "overview"
                ? "bg-white/[0.1] text-white"
                : "text-[#a8afb8] hover:bg-white/[0.06] hover:text-white"
            }`;
            return tab.href ? (
              <Link key={tab.id} href={tab.href} className={cls}>
                {tab.label}
              </Link>
            ) : (
              <a key={tab.id} href={`#${tab.id}`} className={cls}>
                {tab.label}
              </a>
            );
          })}
        </div>

        {/* Language picker */}
        <div className="absolute right-4" ref={langRef}>
          <button
            onClick={() => setLangOpen((o) => !o)}
            className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-zinc-300 hover:bg-white/[0.08] hover:text-white transition"
          >
            <img src={`https://flagcdn.com/20x15/${currentFlag}.png`} width={20} height={15} alt="" className="rounded-[2px]" />
            <span className="uppercase font-medium">{selectedLang}</span>
            <svg className="h-3.5 w-3.5 text-zinc-500" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3.5 6.5 8 11l4.5-4.5" /></svg>
          </button>
          {langOpen && (
            <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-white/10 bg-[#111315] py-1.5 shadow-2xl z-50">
              {LANGUAGES.map((l) => (
                <button
                  key={l.code}
                  onClick={() => { setSelectedLang(l.code); localStorage.setItem("proboost_lang", l.code); setLangOpen(false); }}
                  className={`flex w-full items-center gap-2.5 px-3.5 py-2 text-sm transition ${selectedLang === l.code ? "text-cyan-300 bg-cyan-500/10" : "text-zinc-300 hover:bg-white/[0.05] hover:text-white"}`}
                >
                  <img src={`https://flagcdn.com/20x15/${l.flag}.png`} width={20} height={15} alt="" className="rounded-[2px]" />
                  {l.name}
                  {selectedLang === l.code && (
                    <svg className="ml-auto h-3.5 w-3.5 text-cyan-400" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"><path d="M3 8l3.5 3.5L13 5" /></svg>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <section id="overview" className="relative overflow-hidden pt-[115px] sm:pt-[124px]">
        {/* Page background */}
        <div className="absolute inset-0 bg-[#050607]" />

        {/* R6 art — full right-half bleed, no container */}
        <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[54%] lg:block">
          <Image
            src="/r6-background.png"
            alt=""
            fill
            priority
            className="object-cover object-center opacity-70"
          />
          <div className="absolute inset-0 bg-[linear-gradient(90deg,#050607_0%,rgba(5,6,7,0.78)_22%,rgba(5,6,7,0.18)_58%,#050607_100%)]" />
        </div>

        <div className="relative z-10 mx-auto max-w-[1420px] px-4 pb-16 sm:px-6 lg:px-8 lg:pb-24">
          {/* Boosters online pill */}
          <div className="mt-10 inline-flex items-center gap-2 rounded-full border border-white/8 bg-white/[0.04] px-3.5 py-1.5 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-cyan-400 opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-cyan-400" />
            </span>
            <span className="font-semibold text-cyan-400">{boosterCount}</span>
            <span className="text-[#9ba3ac]">{t.boostersOnline}</span>
          </div>

          {/* Hero heading */}
          <h1 className="mt-4 max-w-[14ch] text-[2.8rem] font-black leading-[0.95] tracking-[-0.045em] text-white sm:text-[3.8rem] xl:text-[4.8rem]">
            Rainbow Six Siege Boost
          </h1>

          <p className="mt-5 max-w-[58ch] text-sm leading-6 text-[#8d949d] sm:text-base sm:leading-7">
            {t.heroSub}
          </p>

          {/* Boosting heading + nav arrows */}
          <div id="boosting" className="mt-12 flex items-center justify-between gap-4">
            <h2 className="text-[1.85rem] font-bold tracking-[-0.03em] text-white sm:text-[2.2rem]">{t.boostingLabel}</h2>
            <div className="flex items-center gap-2.5">
              <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0e1013] text-white transition hover:border-white/20 hover:bg-[#171a1d]">
                <ArrowLeftIcon />
              </button>
              <button type="button" className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-[#0e1013] text-white transition hover:border-white/20 hover:bg-[#171a1d]">
                <ArrowRightIcon />
              </button>
              <button type="button" className="ml-1 rounded-xl bg-[#f0a629] px-5 py-2.5 text-sm font-semibold text-[#0b0d0f] transition hover:bg-[#ffb649]">
                {t.viewAll}
              </button>
            </div>
          </div>

          {/* Service cards */}
          <div className="mt-5 grid gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
            {SERVICE_CARDS.map((service, index) => (
              <Link
                key={service.id}
                href={service.href}
                className="group relative flex min-h-[340px] flex-col overflow-hidden rounded-[18px] border border-white/[0.06] bg-[#0c0e10] p-5 text-left transition hover:border-white/[0.18] hover:bg-[#0f1113]"
              >
                {/* Tag + number */}
                <div className="flex items-start justify-between gap-3">
                  <span className="inline-flex items-center gap-1 rounded-md bg-[#ffcf1d] px-2.5 py-1 text-[0.78rem] font-bold leading-none text-[#0a0a0a]">
                    <svg className="h-2.5 w-2.5" viewBox="0 0 10 10" fill="currentColor"><path d="M5 0 6.2 3.8H10L7 6.2 8.1 10 5 7.6 1.9 10 3 6.2 0 3.8h3.8Z"/></svg>
                    {service.tag}
                  </span>
                  <span className="rounded border border-white/[0.06] bg-[#13161a] px-2 py-1 text-xs font-medium text-white/60">
                    {String(index + 1).padStart(2, "0")}.
                  </span>
                </div>

                {/* Title */}
                <h3 className="mt-4 max-w-[12ch] text-[1.55rem] font-black leading-[1.05] tracking-[-0.035em] text-white">
                  {service.title}
                </h3>

                {/* Bullets */}
                <div className="mt-3.5 flex flex-col gap-2">
                  {service.bullets.map((bullet) => (
                    <div key={bullet} className="flex items-start gap-2">
                      <span className="mt-[3px] shrink-0 font-bold text-[#d4a020] text-[0.7rem]">✦</span>
                      <span className="text-[0.8rem] leading-[1.4] text-[#9da4ad]">{bullet}</span>
                    </div>
                  ))}
                </div>

                {/* Arrow — absolute bottom-left */}
                <span className="absolute bottom-5 left-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/8 bg-[#16191d] text-white transition group-hover:border-white/20 group-hover:bg-[#1c2024]">
                  <ArrowRightIcon className="h-4 w-4" />
                </span>

                {/* Artwork — absolute bottom-right */}
                {service.image && (
                  <div className="pointer-events-none absolute bottom-0 right-0 h-[148px] w-[148px]">
                    <Image
                      src={service.image}
                      alt=""
                      fill
                      className="object-contain object-bottom drop-shadow-[0_8px_28px_rgba(0,0,0,0.7)]"
                    />
                  </div>
                )}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1420px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {t.trust.map((item, i) => (
            <div key={i} className="flex items-start gap-4 rounded-[22px] border border-white/[0.07] bg-[#0a0c0f] p-5">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/8 bg-[#111418]">
                <Image src={TRUST_ITEMS[i].iconSrc} alt="" width={28} height={28} className="h-7 w-7 object-contain" />
              </div>
              <div>
                <h3 className="text-[0.95rem] font-bold text-white">{item.title}</h3>
                <p className="mt-1.5 text-[0.8rem] leading-[1.5] text-[#7e8693]">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-[1420px] px-4 py-10 sm:px-6 lg:px-8 lg:py-14">
        <div className="relative overflow-hidden rounded-[32px] border border-white/8 bg-[#0a0c0f] p-7 sm:p-9 lg:p-12">
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(240,166,79,0.08),transparent_40%)]" />
          <div className="relative z-10 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f0a629]/70">{t.howLabel}</p>
              <h2 className="mt-2.5 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">{t.howTitle}</h2>
            </div>
            <p className="max-w-[44ch] text-sm leading-6 text-[#7e8693]">
              {t.howSub}
            </p>
          </div>

          <div className="relative z-10 mt-8 grid gap-4 lg:grid-cols-3">
            {t.steps.map((item) => (
              <div key={item.step} className="rounded-[24px] border border-white/8 bg-[#0d1014] p-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-[#d8b554]/25 bg-[#18130a] text-sm font-black text-[#f0c84a]">
                  {item.step}
                </div>
                <h3 className="mt-5 text-xl font-bold text-white">{item.title}</h3>
                <p className="mt-2.5 text-sm leading-6 text-[#7e8693]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-[1420px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
        <div className="mb-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-[#f0a629]/70">{t.faqLabel}</p>
          <h2 className="mt-2.5 text-3xl font-black tracking-[-0.04em] text-white sm:text-4xl">{t.faqTitle}</h2>
        </div>
        <FaqSection copy={{ label: t.faqLabel, items: t.faq }} />
      </section>

    </main>
  );
}
