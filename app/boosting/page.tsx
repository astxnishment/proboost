import Image from "next/image";
import Link from "next/link";
import FaqSection from "../components/FaqSection";
import {
  ArrowUpRight,
  Check,
  Headphones,
  LockKeyhole,
  RotateCcw,
  ShieldCheck,
} from "lucide-react";

type LangCode = "en" | "it" | "fr" | "es" | "de" | "nl" | "pt" | "uk" | "ru";

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

type ServiceCard = {
  id: string;
  title: string;
  bullets: string[];
  href: string;
};

function buildServiceCards(basePath: string): ServiceCard[] {
  return [
    {
      id: "rank-up",
      title: "Rank Up Boost",
      href: `${basePath}/rainbow-six-siege-rank-boost`,
      bullets: ["Rank up to Champion", "Free Operators of choice", "Available on all regions"],
    },
    {
      id: "champion",
      title: "Champion Rank Boost",
      href: "/en/rainbow-six-siege-boost/champion",
      bullets: ["Rank Above Champion", "Guaranteed Result", "Available on all platforms"],
    },
    {
      id: "competitive",
      title: "Competitive Wins",
      href: "/en/rainbow-six-siege-boost/competitive",
      bullets: ["Increase your Rank & Win Rate", "Free Operators of choice", "Available on all regions"],
    },
    {
      id: "unrated",
      title: "Unrated Matches",
      href: "/en/rainbow-six-siege-boost/unrated",
      bullets: ["Play with your favorite Booster", "No Win Rate", "Available on all regions and servers"],
    },
    {
      id: "elearning",
      title: "E-Learning",
      href: "/en/rainbow-six-siege-boost/elearning",
      bullets: ["Level up expert gaming coaching", "Tips to improve gameplay", "Real-time skill growth"],
    },
  ];
}

const TRUST_ICONS = [ShieldCheck, Headphones, RotateCcw, LockKeyhole] as const;
const SERVICE_ARTWORK = [
  "/service-icons/rank-up.png",
  "/service-icons/champion.png",
  "/service-icons/competitive.png",
  "/service-icons/unrated.png",
  "/service-icons/elearning.png",
] as const;

export default function SiegeBoostingPage({
  basePath = "/boosting",
  defaultLang = "en",
}: {
  basePath?: string;
  defaultLang?: LangCode;
}) {
  const SERVICE_CARDS_BASE = buildServiceCards(basePath);
  const t = PAGE_I18N[defaultLang];

  const SERVICE_CARDS = SERVICE_CARDS_BASE.map((card, i) => ({
    ...card,
    title: t.services[i]?.title ?? card.title,
    bullets: t.services[i]?.bullets ?? card.bullets,
  }));

  return (
    <main className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <section id="overview" className="relative min-h-[470px] overflow-hidden border-b border-[var(--line)] bg-[var(--background)] text-[var(--foreground)]">
        <Image
          src="/homepage/r6-homepage.webp"
          alt="Rainbow Six Siege operator"
          width={440}
          height={440}
          loading="eager"
          className="pointer-events-none absolute bottom-0 right-[-90px] h-[360px] w-auto object-contain opacity-25 sm:right-[-20px] md:right-[6%] md:h-[440px] md:opacity-100"
        />
        <div className="relative mx-auto flex min-h-[470px] max-w-[1280px] items-center px-5 pb-12 pt-24 sm:px-8 lg:px-10">
          <div className="w-full max-w-2xl md:max-w-[48%] xl:max-w-2xl">
            <h1 className="sr-only">Tom Clancy&apos;s Rainbow Six Siege boosting services</h1>
            <div aria-hidden="true">
              <Image
                src="/homepage/r6-text-homepage.png"
                alt=""
                width={281}
                height={84}
                className="r6-hero-wordmark h-auto w-[min(360px,80vw)] max-w-full"
                style={{ height: "auto" }}
              />
              <span className="mt-4 block text-2xl font-semibold text-[var(--muted)] sm:text-3xl">Boosting services</span>
            </div>
            <p className="mt-5 max-w-lg text-base leading-7 text-[var(--muted)]">
              Reach your target rank with verified players across every platform and region.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={`${basePath}/rainbow-six-siege-rank-boost`} className="inline-flex h-12 items-center gap-2 rounded-xl bg-[var(--foreground)] px-6 text-sm font-semibold text-[var(--background)] transition hover:opacity-85">
                Configure rank boost
                <ArrowUpRight className="h-4 w-4" />
              </Link>
              <a href="#boosting" className="inline-flex h-12 items-center rounded-xl border border-[var(--line-strong)] px-6 text-sm font-semibold text-[var(--foreground)] transition hover:bg-[var(--surface-muted)]">
                View all services
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-[var(--line)] bg-[var(--surface-muted)] px-5 py-4 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1280px] grid-cols-2 gap-3 sm:grid-cols-4">
          {["PC, Xbox & PlayStation", "All regions", "Verified boosters", "24/7 support"].map((item) => (
            <div key={item} className="flex min-h-14 items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-4 text-xs font-medium text-[var(--muted)] sm:text-sm">
              <Check className="h-4 w-4 shrink-0" />
              {item}
            </div>
          ))}
        </div>
      </section>

      <section id="boosting" className="px-5 py-12 sm:px-8 sm:py-14 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="max-w-2xl">
            <p className="text-xs font-semibold uppercase text-[var(--muted)]">{t.boostingLabel}</p>
            <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">Choose your service</h2>
            <p className="mt-3 text-[var(--muted)]">Select a goal and configure the order around your rank, platform, and region.</p>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-6">
            {SERVICE_CARDS.map((service, index) => (
              <Link
                key={service.id}
                href={service.href}
                className={`group flex min-h-[260px] flex-col rounded-[20px] border border-[var(--line)] bg-[var(--surface)] p-6 transition hover:border-[var(--line-strong)] hover:bg-[var(--surface-muted)] ${index < 3 ? "xl:col-span-2" : "xl:col-span-3"}`}
              >
                <div className="relative h-[72px] w-[72px] overflow-hidden rounded-xl border border-[var(--line)] bg-black">
                  <Image
                    src={SERVICE_ARTWORK[index]}
                    alt=""
                    fill
                    sizes="72px"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-6 text-xl font-semibold">{service.title}</h3>
                <div className="mt-4 space-y-2">
                  {service.bullets.slice(0, 2).map((bullet) => (
                    <p key={bullet} className="flex items-center gap-2 text-sm text-[var(--muted)]"><Check className="h-4 w-4 shrink-0" />{bullet}</p>
                  ))}
                </div>
                <span className="mt-auto flex items-center justify-between pt-6 text-sm font-semibold">
                  Configure service
                  <ArrowUpRight className="h-4 w-4 text-[var(--muted)] transition group-hover:text-[var(--foreground)]" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-y border-[var(--line)] bg-[var(--surface-muted)] px-5 py-14 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-[1280px] gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {t.trust.map((item, i) => {
            const TrustIcon = TRUST_ICONS[i];
            return (
              <div key={item.title} className="rounded-xl border border-[var(--line)] bg-[var(--surface)] p-6">
                <TrustIcon aria-hidden className="mb-5 h-6 w-6 text-[var(--muted)]" />
                <h3 className="text-base font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[var(--muted)]">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section id="how" className="px-5 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-[1280px]">
          <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase text-[var(--muted)]">{t.howLabel}</p>
              <h2 className="mt-3 text-3xl font-semibold sm:text-4xl">{t.howTitle}</h2>
            </div>
            <p className="max-w-[44ch] text-base leading-7 text-[var(--muted)]">
              {t.howSub}
            </p>
          </div>

          <div className="mt-10 grid gap-3 lg:grid-cols-3">
            {t.steps.map((item) => (
              <div key={item.step} className="rounded-[20px] border border-[var(--line)] bg-[var(--surface)] p-6">
                <p className="text-sm font-medium text-[var(--muted-soft)]">{item.step}</p>
                <h3 className="mt-8 text-xl font-semibold">{item.title}</h3>
                <p className="mt-3 text-sm leading-6 text-[var(--muted)]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="faq" className="mx-auto max-w-[1280px] px-5 py-20 sm:px-8 lg:px-10">
        <h2 className="mb-8 text-3xl font-semibold sm:text-4xl">{t.faqTitle}</h2>
        <FaqSection copy={{ label: t.faqLabel, items: t.faq }} />
      </section>

    </main>
  );
}
