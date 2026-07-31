"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import TrustSection from "../../components/TrustSection";
import FaqSection from "../../components/FaqSection";
import PlatformLogo from "../../components/PlatformLogo";
import PlatformSelector from "../../components/PlatformSelector";
import RankDivisionSelector from "../../components/RankDivisionSelector";
import { useCurrency } from "../../components/CurrencyProvider";
import { computeOrderPrice, type RankUpOrder } from "@/app/lib/pricing";
import {
  createCheckoutSession,
  getCheckoutErrorMessage,
} from "@/app/lib/checkout";
import {
  ORDER_PAYMENT_METHODS,
  ORDER_PLATFORMS,
  ORDER_SERVERS,
  RP_OPTIONS,
} from "@/app/lib/order-options";
import {
  Check,
  ChevronDown,
  CircleDollarSign,
  CircleHelp,
  Clock3,
  Headphones,
  LockKeyhole,
  ShieldCheck,
  Sparkles,
  Star,
  User,
  Users,
  X,
} from "lucide-react";

type Rank = {
  name: string;
  color: string;
  icon: string;
};

function Toggle({
  enabled,
  setEnabled,
}: {
  enabled: boolean;
  setEnabled: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={enabled}
      aria-label={enabled ? "Disable option" : "Enable option"}
      onClick={() => setEnabled(!enabled)}
      className={`keep-pill flex h-6 w-11 items-center rounded-full border p-0.5 transition-colors duration-200 ${
        enabled ? "border-[var(--foreground)] bg-[var(--foreground)]" : "border-[var(--line-strong)] bg-[var(--surface-muted)]"
      }`}
    >
      <div
        className={`h-4.5 w-4.5 rounded-full transition-transform duration-200 ease-out ${
          enabled ? "translate-x-5 bg-[var(--background)]" : "bg-[var(--muted)]"
        }`}
      />
    </button>
  );
}

const faqAnswersByLang: Record<string, [string, string, string, string, string]> = {
  en: [
    "In Rainbow Six Siege, Boosting is the process by which a player can increase their Rank thanks to the help of professional players called Boosters. These Boosters can play with the player's account or team up with them via the DuoQ option.",
    "For Solo boosting, you will share your account credentials with your booster. For Duo boosting, you play alongside your booster so no account sharing is required.",
    "Our boosters are professional and discreet. They will not engage in voice chat or communicate with your friends list beyond what is necessary.",
    "Delivery time depends on your current and target rank. On average, each rank step takes approximately 2\u20133 hours.",
    "Yes. ProBoost uses only real, verified players \u2014 no bots, no scripts. All boosters connect via VPN to match your region and reduce detection risk.",
  ],
  it: [
    "In Rainbow Six Siege, il Boosting \u00e8 il processo grazie al quale un giocatore pu\u00f2 aumentare il proprio Rank con l\u2019aiuto di giocatori professionisti chiamati Booster. Questi Booster possono giocare con l\u2019account del giocatore o unirsi a loro tramite l\u2019opzione DuoQ.",
    "Per il boosting Solo, condividerai le credenziali del tuo account con il booster. Per il boosting Duo, giochi a fianco del booster senza condivisione di account.",
    "I nostri booster sono professionali e discreti. Non useranno la chat vocale n\u00e9 comunicheranno con la tua lista amici pi\u00f9 del necessario.",
    "Il tempo di consegna dipende dal tuo rank attuale e da quello desiderato. In media, ogni step di rank richiede circa 2\u20133 ore.",
    "S\u00ec. ProBoost utilizza solo giocatori reali e verificati: niente bot, niente script. Tutti i booster si connettono tramite VPN nella tua regione per ridurre i rischi.",
  ],
  fr: [
    "Dans Rainbow Six Siege, le Boosting est le processus par lequel un joueur peut augmenter son Rang gr\u00e2ce \u00e0 l\u2019aide de joueurs professionnels appel\u00e9s Boosters. Ces Boosters peuvent jouer avec le compte du joueur ou s\u2019associer \u00e0 eux via l\u2019option DuoQ.",
    "Pour le boosting Solo, vous partagerez vos identifiants de compte avec votre booster. Pour le boosting Duo, vous jouez aux c\u00f4t\u00e9s de votre booster sans partage de compte.",
    "Nos boosters sont professionnels et discrets. Ils ne participeront pas au chat vocal ni ne communiqueront avec votre liste d\u2019amis au-del\u00e0 du n\u00e9cessaire.",
    "Le d\u00e9lai de livraison d\u00e9pend de votre rang actuel et cible. En moyenne, chaque \u00e9tape de rang prend environ 2 \u00e0 3 heures.",
    "Oui. ProBoost utilise uniquement de vrais joueurs v\u00e9rifi\u00e9s \u2014 pas de bots, pas de scripts. Tous les boosters se connectent via VPN pour correspondre \u00e0 votre r\u00e9gion et r\u00e9duire les risques de d\u00e9tection.",
  ],
  es: [
    "En Rainbow Six Siege, el Boosting es el proceso mediante el cual un jugador puede aumentar su Rango gracias a la ayuda de jugadores profesionales llamados Boosters. Estos Boosters pueden jugar con la cuenta del jugador o unirse a ellos mediante la opci\u00f3n DuoQ.",
    "Para el boosting Solo, compartir\u00e1s las credenciales de tu cuenta con tu booster. Para el boosting Duo, juegas junto a tu booster sin necesidad de compartir la cuenta.",
    "Nuestros boosters son profesionales y discretos. No usar\u00e1n el chat de voz ni se comunicar\u00e1n con tu lista de amigos m\u00e1s all\u00e1 de lo necesario.",
    "El tiempo de entrega depende de tu rango actual y el deseado. En promedio, cada paso de rango toma aproximadamente 2\u20133 horas.",
    "S\u00ed. ProBoost usa solo jugadores reales y verificados \u2014 sin bots, sin scripts. Todos los boosters se conectan mediante VPN en tu regi\u00f3n para reducir el riesgo de detecci\u00f3n.",
  ],
  de: [
    "In Rainbow Six Siege ist Boosting der Prozess, durch den ein Spieler seinen Rang mithilfe professioneller Spieler, sogenannter Booster, steigern kann. Diese Booster k\u00f6nnen entweder mit dem Account des Spielers spielen oder via DuoQ mit ihm zusammenspielen.",
    "Beim Solo-Boosting teilst du deine Account-Daten mit deinem Booster. Beim Duo-Boosting spielst du zusammen mit deinem Booster, ohne Account-Sharing.",
    "Unsere Booster sind professionell und diskret. Sie werden den Sprachchat nicht nutzen und nicht \u00fcber das N\u00f6tige hinaus mit deiner Freundesliste kommunizieren.",
    "Die Lieferzeit h\u00e4ngt von deinem aktuellen und Zielrang ab. Im Durchschnitt dauert jeder Rangschritt etwa 2\u20133 Stunden.",
    "Ja. ProBoost nutzt ausschlie\u00dflich echte, verifizierte Spieler \u2014 keine Bots, keine Skripte. Alle Booster verbinden sich \u00fcber VPN in deiner Region, um das Erkennungsrisiko zu minimieren.",
  ],
  nl: [
    "In Rainbow Six Siege is Boosting het proces waarbij een speler zijn Rang kan verhogen dankzij de hulp van professionele spelers, Boosters genaamd. Deze Boosters kunnen met het account van de speler spelen of via de DuoQ-optie samenspelen.",
    "Voor Solo boosting deel je je accountgegevens met je booster. Voor Duo boosting speel je naast je booster, dus account-sharing is niet vereist.",
    "Onze boosters zijn professioneel en discreet. Ze zullen geen spraakchat gebruiken of meer communiceren met je vriendenlijst dan nodig is.",
    "De levertijd hangt af van je huidige en doelrank. Gemiddeld duurt elke rankstap ongeveer 2\u20133 uur.",
    "Ja. ProBoost gebruikt alleen echte, geverifieerde spelers \u2014 geen bots, geen scripts. Alle boosters verbinden via VPN in jouw regio om detectierisico te verminderen.",
  ],
  pt: [
    "Em Rainbow Six Siege, o Boosting \u00e9 o processo pelo qual um jogador pode aumentar seu Rank com a ajuda de jogadores profissionais chamados Boosters. Esses Boosters podem jogar com a conta do jogador ou se unir a ele via DuoQ.",
    "Para boosting Solo, voc\u00ea compartilhar\u00e1 suas credenciais de conta com seu booster. Para boosting Duo, voc\u00ea joga junto com seu booster, sem compartilhamento de conta.",
    "Nossos boosters s\u00e3o profissionais e discretos. Eles n\u00e3o usar\u00e3o chat de voz nem se comunicar\u00e3o com sua lista de amigos al\u00e9m do necess\u00e1rio.",
    "O tempo de entrega depende do seu rank atual e do rank desejado. Em m\u00e9dia, cada etapa de rank leva aproximadamente 2\u20133 horas.",
    "Sim. ProBoost usa apenas jogadores reais e verificados \u2014 sem bots, sem scripts. Todos os boosters se conectam via VPN na sua regi\u00e3o para reduzir o risco de detec\u00e7\u00e3o.",
  ],
  uk: [
    "\u0423 Rainbow Six Siege, \u0411\u0443\u0441\u0442 \u2014 \u0446\u0435 \u043f\u0440\u043e\u0446\u0435\u0441, \u0437\u0430 \u0434\u043e\u043f\u043e\u043c\u043e\u0433\u043e\u044e \u044f\u043a\u043e\u0433\u043e \u0433\u0440\u0430\u0432\u0435\u0446\u044c \u043c\u043e\u0436\u0435 \u043f\u0456\u0434\u0432\u0438\u0449\u0438\u0442\u0438 \u0441\u0432\u0456\u0439 \u0440\u0430\u043d\u0433 \u0437\u0430\u0432\u0434\u044f\u043a\u0438 \u0434\u043e\u043f\u043e\u043c\u043e\u0437\u0456 \u043f\u0440\u043e\u0444\u0435\u0441\u0456\u0439\u043d\u0438\u0445 \u0433\u0440\u0430\u0432\u0446\u0456\u0432, \u044f\u043a\u0438\u0445 \u043d\u0430\u0437\u0438\u0432\u0430\u044e\u0442\u044c \u0411\u0443\u0441\u0442\u0435\u0440\u0430\u043c\u0438. \u0426\u0456 \u0411\u0443\u0441\u0442\u0435\u0440\u0438 \u043c\u043e\u0436\u0443\u0442\u044c \u0433\u0440\u0430\u0442\u0438 \u0437 \u0430\u043a\u0430\u0443\u043d\u0442\u043e\u043c \u0433\u0440\u0430\u0432\u0446\u044f \u0430\u0431\u043e \u043e\u0431'\u0454\u0434\u043d\u0430\u0442\u0438\u0441\u044f \u0437 \u043d\u0438\u043c \u0447\u0435\u0440\u0435\u0437 \u043e\u043f\u0446\u0456\u044e DuoQ.",
    "\u0414\u043b\u044f Solo \u0431\u0443\u0441\u0442\u0443 \u0432\u0438 \u043f\u043e\u0434\u0456\u043b\u0438\u0442\u0435\u0441\u044c \u0441\u0432\u043e\u0457\u043c\u0438 \u043e\u0431\u043b\u0456\u043a\u043e\u0432\u0438\u043c\u0438 \u0434\u0430\u043d\u0438\u043c\u0438 \u0437 \u0431\u0443\u0441\u0442\u0435\u0440\u043e\u043c. \u0414\u043b\u044f Duo \u0431\u0443\u0441\u0442\u0443 \u0432\u0438 \u0433\u0440\u0430\u0454\u0442\u0435 \u0440\u0430\u0437\u043e\u043c \u0456\u0437 \u0431\u0443\u0441\u0442\u0435\u0440\u043e\u043c, \u0442\u043e\u043c\u0443 \u043e\u0431\u043c\u0456\u043d \u0430\u043a\u0430\u0443\u043d\u0442\u043e\u043c \u043d\u0435 \u043f\u043e\u0442\u0440\u0456\u0431\u0435\u043d.",
    "\u041d\u0430\u0448\u0456 \u0431\u0443\u0441\u0442\u0435\u0440\u0438 \u0454 \u043f\u0440\u043e\u0444\u0435\u0441\u0456\u0439\u043d\u0438\u043c\u0438 \u0442\u0430 \u0434\u0438\u0441\u043a\u0440\u0435\u0442\u043d\u0438\u043c\u0438. \u0412\u043e\u043d\u0438 \u043d\u0435 \u0432\u0438\u043a\u043e\u0440\u0438\u0441\u0442\u043e\u0432\u0443\u0432\u0430\u0442\u0438\u043c\u0443\u0442\u044c\u0441\u044f \u0433\u043e\u043b\u043e\u0441\u043e\u0432\u0438\u043c \u0447\u0430\u0442\u043e\u043c \u0456 \u043d\u0435 \u0441\u043f\u0456\u043b\u043a\u0443\u0432\u0430\u0442\u0438\u043c\u0443\u0442\u044c\u0441\u044f \u0437 \u0432\u0430\u0448\u0438\u043c \u0441\u043f\u0438\u0441\u043a\u043e\u043c \u0434\u0440\u0443\u0437\u0456\u0432 \u0431\u0456\u043b\u044c\u0448\u0435 \u043d\u0435\u043e\u0431\u0445\u0456\u0434\u043d\u043e\u0433\u043e.",
    "\u0427\u0430\u0441 \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0438 \u0437\u0430\u043b\u0435\u0436\u0438\u0442\u044c \u0432\u0456\u0434 \u0432\u0430\u0448\u043e\u0433\u043e \u043f\u043e\u0442\u043e\u0447\u043d\u043e\u0433\u043e \u0442\u0430 \u0446\u0456\u043b\u044c\u043e\u0432\u043e\u0433\u043e \u0440\u0430\u043d\u0433\u0443. \u0423 \u0441\u0435\u0440\u0435\u0434\u043d\u044c\u043e\u043c\u0443 \u043a\u043e\u0436\u0435\u043d \u043a\u0440\u043e\u043a \u0440\u0430\u043d\u0433\u0443 \u0437\u0430\u0439\u043c\u0430\u0454 \u043f\u0440\u0438\u0431\u043b\u0438\u0437\u043d\u043e 2\u20133 \u0433\u043e\u0434\u0438\u043d\u0438.",
    "\u0422\u0430\u043a. ProBoost \u0432\u0438\u043a\u043e\u0440\u0438\u0441\u0442\u043e\u0432\u0443\u0454 \u043b\u0438\u0448\u0435 \u0440\u0435\u0430\u043b\u044c\u043d\u0438\u0445, \u043f\u0435\u0440\u0435\u0432\u0456\u0440\u0435\u043d\u0438\u0445 \u0433\u0440\u0430\u0432\u0446\u0456\u0432 \u2014 \u0431\u0435\u0437 \u0431\u043e\u0442\u0456\u0432, \u0431\u0435\u0437 \u0441\u043a\u0440\u0438\u043f\u0442\u0456\u0432. \u0423\u0441\u0456 \u0431\u0443\u0441\u0442\u0435\u0440\u0438 \u043f\u0456\u0434\u043a\u043b\u044e\u0447\u0430\u044e\u0442\u044c\u0441\u044f \u0447\u0435\u0440\u0435\u0437 VPN \u0443 \u0432\u0430\u0448\u043e\u043c\u0443 \u0440\u0435\u0433\u0456\u043e\u043d\u0456 \u0434\u043b\u044f \u0437\u043d\u0438\u0436\u0435\u043d\u043d\u044f \u0440\u0438\u0437\u0438\u043a\u0443 \u0432\u0438\u044f\u0432\u043b\u0435\u043d\u043d\u044f.",
  ],
  ru: [
    "\u0412 Rainbow Six Siege, \u0411\u0443\u0441\u0442 \u2014 \u044d\u0442\u043e \u043f\u0440\u043e\u0446\u0435\u0441\u0441, \u0441 \u043f\u043e\u043c\u043e\u0449\u044c\u044e \u043a\u043e\u0442\u043e\u0440\u043e\u0433\u043e \u0438\u0433\u0440\u043e\u043a \u043c\u043e\u0436\u0435\u0442 \u043f\u043e\u0432\u044b\u0441\u0438\u0442\u044c \u0441\u0432\u043e\u0439 \u0440\u0430\u043d\u0433 \u0431\u043b\u0430\u0433\u043e\u0434\u0430\u0440\u044f \u043f\u043e\u043c\u043e\u0449\u0438 \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u044b\u0445 \u0438\u0433\u0440\u043e\u043a\u043e\u0432, \u043d\u0430\u0437\u044b\u0432\u0430\u0435\u043c\u044b\u0445 \u0411\u0443\u0441\u0442\u0435\u0440\u0430\u043c\u0438. \u042d\u0442\u0438 \u0411\u0443\u0441\u0442\u0435\u0440\u044b \u043c\u043e\u0433\u0443\u0442 \u0438\u0433\u0440\u0430\u0442\u044c \u0441 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u043e\u043c \u0438\u0433\u0440\u043e\u043a\u0430 \u0438\u043b\u0438 \u043e\u0431\u044a\u0435\u0434\u0438\u043d\u0438\u0442\u044c\u0441\u044f \u0441 \u043d\u0438\u043c \u0447\u0435\u0440\u0435\u0437 \u043e\u043f\u0446\u0438\u044e DuoQ.",
    "\u0414\u043b\u044f Solo \u0431\u0443\u0441\u0442\u0430 \u0432\u044b \u043f\u043e\u0434\u0435\u043b\u0438\u0442\u0435\u0441\u044c \u0443\u0447\u0451\u0442\u043d\u044b\u043c\u0438 \u0434\u0430\u043d\u043d\u044b\u043c\u0438 \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u0430 \u0441 \u0431\u0443\u0441\u0442\u0435\u0440\u043e\u043c. \u0414\u043b\u044f Duo \u0431\u0443\u0441\u0442\u0430 \u0432\u044b \u0438\u0433\u0440\u0430\u0435\u0442\u0435 \u0432\u043c\u0435\u0441\u0442\u0435 \u0441 \u0431\u0443\u0441\u0442\u0435\u0440\u043e\u043c \u0431\u0435\u0437 \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e\u0441\u0442\u0438 \u0434\u0435\u043b\u0438\u0442\u044c\u0441\u044f \u0430\u043a\u043a\u0430\u0443\u043d\u0442\u043e\u043c.",
    "\u041d\u0430\u0448\u0438 \u0431\u0443\u0441\u0442\u0435\u0440\u044b \u043f\u0440\u043e\u0444\u0435\u0441\u0441\u0438\u043e\u043d\u0430\u043b\u044c\u043d\u044b \u0438 \u043d\u0435\u043d\u0430\u0432\u044f\u0437\u0447\u0438\u0432\u044b. \u041e\u043d\u0438 \u043d\u0435 \u0431\u0443\u0434\u0443\u0442 \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u044c \u0433\u043e\u043b\u043e\u0441\u043e\u0432\u043e\u0439 \u0447\u0430\u0442 \u0438 \u043d\u0435 \u0431\u0443\u0434\u0443\u0442 \u043e\u0431\u0449\u0430\u0442\u044c\u0441\u044f \u0441 \u0432\u0430\u0448\u0438\u043c \u0441\u043f\u0438\u0441\u043a\u043e\u043c \u0434\u0440\u0443\u0437\u0435\u0439 \u0441\u0432\u0435\u0440\u0445 \u043d\u0435\u043e\u0431\u0445\u043e\u0434\u0438\u043c\u043e\u0433\u043e.",
    "\u0412\u0440\u0435\u043c\u044f \u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0438 \u0437\u0430\u0432\u0438\u0441\u0438\u0442 \u043e\u0442 \u0432\u0430\u0448\u0435\u0433\u043e \u0442\u0435\u043a\u0443\u0449\u0435\u0433\u043e \u0438 \u0446\u0435\u043b\u0435\u0432\u043e\u0433\u043e \u0440\u0430\u043d\u0433\u0430. \u0412 \u0441\u0440\u0435\u0434\u043d\u0435\u043c \u043a\u0430\u0436\u0434\u044b\u0439 \u0448\u0430\u0433 \u0440\u0430\u043d\u0433\u0430 \u0437\u0430\u043d\u0438\u043c\u0430\u0435\u0442 \u043e\u043a\u043e\u043b\u043e 2\u20133 \u0447\u0430\u0441\u043e\u0432.",
    "\u0414\u0430. ProBoost \u0438\u0441\u043f\u043e\u043b\u044c\u0437\u0443\u0435\u0442 \u0442\u043e\u043b\u044c\u043a\u043e \u043d\u0430\u0441\u0442\u043e\u044f\u0449\u0438\u0445, \u043f\u0440\u043e\u0432\u0435\u0440\u0435\u043d\u043d\u044b\u0445 \u0438\u0433\u0440\u043e\u043a\u043e\u0432 \u2014 \u043d\u0438\u043a\u0430\u043a\u0438\u0445 \u0431\u043e\u0442\u043e\u0432, \u043d\u0438\u043a\u0430\u043a\u0438\u0445 \u0441\u043a\u0440\u0438\u043f\u0442\u043e\u0432. \u0412\u0441\u0435 \u0431\u0443\u0441\u0442\u0435\u0440\u044b \u043f\u043e\u0434\u043a\u043b\u044e\u0447\u0430\u044e\u0442\u0441\u044f \u0447\u0435\u0440\u0435\u0437 VPN \u0432 \u0432\u0430\u0448\u0435\u043c \u0440\u0435\u0433\u0438\u043e\u043d\u0435 \u0434\u043b\u044f \u0441\u043d\u0438\u0436\u0435\u043d\u0438\u044f \u0440\u0438\u0441\u043a\u0430 \u043e\u0431\u043d\u0430\u0440\u0443\u0436\u0435\u043d\u0438\u044f.",
  ],
};

const addOnDescsByLang: Record<string, { playOffline: string; express: string; rankInsurance: string; eliteTier: string; specificOperators: string; highKillCount: string; vipPriority: string; streaming: string; oneTrickPony: string; insaneClipDrop: string }> = {
  en: { playOffline: "The Booster will appear offline during the progression of the order, to ensure maximum safety.", express: "Your order will be prioritized and completed faster than standard delivery.", rankInsurance: "Stay secure at your new rank. Your boost ends with extra wins added as a buffer, so you don't risk dropping back down right away.", eliteTier: "Your boost will be handled by one of our top 0.01% highest-rated boosters.", specificOperators: "Choose which operators the booster will play during your boost session.", highKillCount: "The booster will focus on achieving a high number of kills each game for better stats.", vipPriority: "Your order jumps to the front of the queue and gets assigned to a booster immediately.", streaming: "Watch your boost live via a private stream link so you can follow every game in real time.", oneTrickPony: "The booster will play only one specific operator of your choice for the entire boost.", insaneClipDrop: "Receive highlight clips of the best plays and kills from your boost sessions." },
  it: { playOffline: "Il Booster apparirà offline durante il completamento dell'ordine, per garantire la massima sicurezza.", express: "Il tuo ordine sarà prioritario e completato più velocemente della consegna standard.", rankInsurance: "Rimani al sicuro nel tuo nuovo rank. Il boost termina con vittorie extra come margine, così non rischi di scendere subito.", eliteTier: "Il tuo boost sarà gestito da uno dei nostri booster con valutazione più alta, nel top 0,01%.", specificOperators: "Scegli quali operatori il booster userà durante la tua sessione di boost.", highKillCount: "Il booster si concentrerà su un alto numero di kill in ogni partita per migliorare le statistiche.", vipPriority: "Il tuo ordine passa in testa alla coda e viene assegnato a un booster immediatamente.", streaming: "Guarda il tuo boost in diretta tramite un link stream privato per seguire ogni partita in tempo reale.", oneTrickPony: "Il booster userà un solo operatore specifico da te scelto per tutta la durata del boost.", insaneClipDrop: "Ricevi clip dei migliori momenti e kill dalle tue sessioni di boost." },
  fr: { playOffline: "Le Booster apparaîtra hors ligne pendant l'exécution de la commande, pour une sécurité maximale.", express: "Votre commande sera prioritaire et complétée plus rapidement que la livraison standard.", rankInsurance: "Restez en sécurité à votre nouveau rang. Votre boost se termine avec des victoires supplémentaires en tampon, pour éviter de redescendre immédiatement.", eliteTier: "Votre boost sera géré par l'un de nos boosters les mieux notés, dans le top 0,01%.", specificOperators: "Choisissez quels opérateurs le booster jouera pendant votre session de boost.", highKillCount: "Le booster se concentrera sur un nombre élevé de kills par partie pour de meilleures statistiques.", vipPriority: "Votre commande passe en tête de file et est assignée à un booster immédiatement.", streaming: "Regardez votre boost en direct via un lien de stream privé pour suivre chaque partie en temps réel.", oneTrickPony: "Le booster jouera uniquement avec l'opérateur spécifique de votre choix pendant tout le boost.", insaneClipDrop: "Recevez des clips des meilleures actions et kills de vos sessions de boost." },
  es: { playOffline: "El Booster aparecerá offline durante la ejecución del pedido, para garantizar la máxima seguridad.", express: "Tu pedido tendrá prioridad y se completará más rápido que la entrega estándar.", rankInsurance: "Mantente seguro en tu nuevo rango. El boost termina con victorias extra como margen, para que no caigas de rango de inmediato.", eliteTier: "Tu boost será gestionado por uno de nuestros boosters mejor valorados, en el top 0,01%.", specificOperators: "Elige qué operadores usará el booster durante tu sesión de boost.", highKillCount: "El booster se centrará en conseguir un alto número de kills en cada partida para mejorar las estadísticas.", vipPriority: "Tu pedido pasa al frente de la cola y se asigna a un booster de inmediato.", streaming: "Mira tu boost en vivo mediante un enlace de stream privado para seguir cada partida en tiempo real.", oneTrickPony: "El booster jugará únicamente con el operador específico que elijas durante todo el boost.", insaneClipDrop: "Recibe clips de las mejores jugadas y kills de tus sesiones de boost." },
  de: { playOffline: "Der Booster erscheint während der Auftragsausführung offline, um maximale Sicherheit zu gewährleisten.", express: "Deine Bestellung wird priorisiert und schneller als die Standardlieferung abgeschlossen.", rankInsurance: "Bleib auf deinem neuen Rang sicher. Dein Boost endet mit extra Siegen als Puffer, damit du nicht sofort wieder absteigst.", eliteTier: "Dein Boost wird von einem unserer am besten bewerteten Booster aus den Top 0,01% bearbeitet.", specificOperators: "Wähle, welche Operatoren der Booster während deiner Boost-Session spielen soll.", highKillCount: "Der Booster konzentriert sich auf eine hohe Killanzahl pro Spiel für bessere Statistiken.", vipPriority: "Deine Bestellung springt an die Spitze der Warteschlange und wird sofort einem Booster zugewiesen.", streaming: "Verfolge deinen Boost live über einen privaten Stream-Link und folge jeder Partie in Echtzeit.", oneTrickPony: "Der Booster spielt für den gesamten Boost nur mit einem bestimmten Operator deiner Wahl.", insaneClipDrop: "Erhalte Highlight-Clips der besten Aktionen und Kills aus deinen Boost-Sessions." },
  nl: { playOffline: "De Booster verschijnt offline tijdens de uitvoering van de bestelling, voor maximale veiligheid.", express: "Je bestelling krijgt prioriteit en wordt sneller voltooid dan standaard levering.", rankInsurance: "Blijf veilig op je nieuwe rank. Je boost eindigt met extra overwinningen als buffer, zodat je niet meteen weer zakt.", eliteTier: "Je boost wordt afgehandeld door een van onze best beoordeelde boosters in de top 0,01%.", specificOperators: "Kies welke operators de booster speelt tijdens jouw boostsessie.", highKillCount: "De booster richt zich op een hoog aantal kills per game voor betere statistieken.", vipPriority: "Je bestelling springt naar voren in de wachtrij en wordt onmiddellijk aan een booster toegewezen.", streaming: "Bekijk je boost live via een privé stream-link zodat je elke game in realtime kunt volgen.", oneTrickPony: "De booster speelt uitsluitend met één specifieke operator van jouw keuze voor de gehele boost.", insaneClipDrop: "Ontvang highlight clips van de beste acties en kills uit je boostsessies." },
  pt: { playOffline: "O Booster aparecerá offline durante a execução do pedido, para garantir a máxima segurança.", express: "Seu pedido terá prioridade e será concluído mais rápido que a entrega padrão.", rankInsurance: "Fique seguro no seu novo rank. O boost termina com vitórias extras como margem, para não cair de rank imediatamente.", eliteTier: "Seu boost será gerenciado por um dos nossos boosters mais bem avaliados, no top 0,01%.", specificOperators: "Escolha quais operadores o booster jogará durante sua sessão de boost.", highKillCount: "O booster focará em obter um alto número de kills por jogo para melhores estatísticas.", vipPriority: "Seu pedido passa para a frente da fila e é atribuído a um booster imediatamente.", streaming: "Assista seu boost ao vivo por um link de stream privado para acompanhar cada jogo em tempo real.", oneTrickPony: "O booster jogará apenas com um operador específico de sua escolha durante todo o boost.", insaneClipDrop: "Receba clipes dos melhores momentos e kills das suas sessões de boost." },
  uk: { playOffline: "Бустер відображатиметься офлайн під час виконання замовлення для максимальної безпеки.", express: "Ваше замовлення отримає пріоритет і буде виконано швидше за стандартну доставку.", rankInsurance: "Залишайтесь у безпеці на своєму новому ранзі. Буст завершується з додатковими перемогами як запасом, щоб ви не зразу впали.", eliteTier: "Ваш буст виконає один з наших найкращих бустерів з топ 0,01%.", specificOperators: "Оберіть, яких операторів бустер гратиме під час вашої буст-сесії.", highKillCount: "Бустер зосередиться на великій кількості вбивств у кожній грі для кращої статистики.", vipPriority: "Ваше замовлення переходить на початок черги та одразу призначається бустеру.", streaming: "Дивіться свій буст наживо через приватне посилання на стрім, щоб стежити за кожною грою в реальному часі.", oneTrickPony: "Бустер гратиме лише одним обраним вами оператором протягом усього бусту.", insaneClipDrop: "Отримайте кліпи з найкращими моментами та вбивствами з ваших буст-сесій." },
  ru: { playOffline: "Бустер будет отображаться офлайн во время выполнения заказа для максимальной безопасности.", express: "Ваш заказ получит приоритет и будет выполнен быстрее стандартной доставки.", rankInsurance: "Оставайтесь в безопасности на новом ранге. Буст завершается с дополнительными победами в запасе, чтобы вы не упали сразу.", eliteTier: "Ваш буст будет обрабатывать один из наших лучших бустеров из топ 0,01%.", specificOperators: "Выберите, каких операторов бустер будет использовать во время вашей буст-сессии.", highKillCount: "Бустер сосредоточится на достижении высокого числа убийств в каждой игре для лучшей статистики.", vipPriority: "Ваш заказ переходит в начало очереди и сразу назначается бустеру.", streaming: "Смотрите ваш буст вживую через приватную ссылку на стрим, чтобы следить за каждой игрой в реальном времени.", oneTrickPony: "Бустер будет играть только одним выбранным вами оператором на протяжении всего буста.", insaneClipDrop: "Получите клипы с лучшими моментами и убийствами из ваших буст-сессий." },
};

export default function ProBoostCalculator({ defaultLang = "en" }: { defaultLang?: string }) {
  const { currency, formatPrice } = useCurrency();
  const ranks: Rank[] = [
    {
      name: "Copper",
      color: "from-orange-500/15 to-orange-700/5",
      icon: "/ranks/rank_1.webp",
    },
    {
      name: "Bronze",
      color: "from-amber-500/15 to-amber-700/5",
      icon: "/ranks/rank_2.webp",
    },
    {
      name: "Silver",
      color: "from-zinc-300/15 to-zinc-500/5",
      icon: "/ranks/rank_3.webp",
    },
    {
      name: "Gold",
      color: "from-yellow-400/15 to-yellow-600/5",
      icon: "/ranks/rank_4.webp",
    },
    {
      name: "Platinum",
      color: "from-cyan-400/15 to-cyan-600/5",
      icon: "/ranks/rank_5.webp",
    },
    {
      name: "Emerald",
      color: "from-emerald-400/15 to-emerald-600/5",
      icon: "/ranks/rank_6.webp",
    },
    {
      name: "Diamond",
      color: "from-violet-400/15 to-violet-600/5",
      icon: "/ranks/rank_7.webp",
    },
    {
      name: "Champion",
      color: "from-pink-500/15 to-pink-700/5",
      icon: "/ranks/rank_8.webp",
    },
  ];

  const divisions = ["V", "IV", "III", "II", "I"] as const;
  const rankTextColors: Record<string, string> = {
    Copper: "var(--rank-copper)",
    Bronze: "var(--rank-bronze)",
    Silver: "var(--rank-silver)",
    Gold: "var(--rank-gold)",
    Platinum: "var(--rank-platinum)",
    Emerald: "var(--rank-emerald)",
    Diamond: "var(--rank-diamond)",
    Champion: "var(--rank-champion)",
  };
  const platforms = ORDER_PLATFORMS;
  const servers = ORDER_SERVERS;
  const paymentMethods = ORDER_PAYMENT_METHODS;
  const rpOptions = RP_OPTIONS;

  const flattenRank = (rankName: string, division: string) => {
    const rankIndex = ranks.findIndex((r) => r.name === rankName);
    const divisionIndex = divisions.findIndex((d) => d === division);
    return rankIndex * divisions.length + divisionIndex;
  };

  const [queueType, setQueueType] = React.useState<"Solo" | "Duo">("Solo");
  const [duoBoosterCount, setDuoBoosterCount] = React.useState(1);
  const [currentRank, setCurrentRank] = React.useState("Copper");
  const [currentDivision, setCurrentDivision] = React.useState<string>("V");
  const [desiredRank, setDesiredRank] = React.useState("Diamond");
  const [desiredDivision, setDesiredDivision] = React.useState<string>("V");
  const [platform, setPlatform] = React.useState<string>("PC");
  const [server, setServer] = React.useState<string>("Europe");
  const [rpGain, setRpGain] = React.useState<string>("71/80 RP");

  const [specificBooster, setSpecificBooster] = React.useState(false);
  const [playOffline, setPlayOffline] = React.useState(false);
  const [specificOperators, setSpecificOperators] = React.useState(false);
  const [streaming, setStreaming] = React.useState(false);
  const [express, setExpress] = React.useState(false);
  const [highKillCount, setHighKillCount] = React.useState(false);
  const [oneTrickPony, setOneTrickPony] = React.useState(false);
  const [rankInsurance, setRankInsurance] = React.useState(false);
  const [vipPriority, setVipPriority] = React.useState(false);
  const [insaneClipDrop, setInsaneClipDrop] = React.useState(false);
  const [eliteTier, setEliteTier] = React.useState(false);

  const [promoCode, setPromoCode] = React.useState("");
  const [promoExpanded, setPromoExpanded] = React.useState(false);
  const [toastMessage, setToastMessage] = React.useState<string | null>(null);
  const [toastType, setToastType] = React.useState<"error" | "success">("error");

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === "WELCOME6") {
      setToastType("success");
      setToastMessage(annotations.couponAppliedDesc ?? localizedAnnotations.en.couponAppliedDesc);
      setTimeout(() => setToastMessage(null), 4000);
    } else {
      setToastType("error");
      setToastMessage(annotations.couponMissingDesc ?? localizedAnnotations.en.couponMissingDesc);
      setTimeout(() => setToastMessage(null), 4000);
    }
  };

  const currentValue = flattenRank(currentRank, currentDivision);
  const desiredValue = flattenRank(desiredRank, desiredDivision);
  const maxRankValue = ranks.length * divisions.length - 1;
  const hasValidRankPath = desiredValue > currentValue;
  const steps = Math.max(0, desiredValue - currentValue);

  const setDesiredFromValue = (value: number) => {
    const boundedValue = Math.min(Math.max(value, 0), maxRankValue);
    const rank = ranks[Math.floor(boundedValue / divisions.length)];
    const division = divisions[boundedValue % divisions.length];
    setDesiredRank(rank.name);
    setDesiredDivision(division);
  };

  const keepDesiredAbove = (nextCurrentValue: number) => {
    if (desiredValue <= nextCurrentValue) {
      setDesiredFromValue(Math.min(nextCurrentValue + 1, maxRankValue));
    }
  };

  const handleCurrentRankChange = (rankName: string) => {
    const nextCurrentValue = flattenRank(rankName, currentDivision);
    setCurrentRank(rankName);
    keepDesiredAbove(nextCurrentValue);
  };

  const handleCurrentDivisionChange = (division: string) => {
    const nextCurrentValue = flattenRank(currentRank, division);
    setCurrentDivision(division);
    keepDesiredAbove(nextCurrentValue);
  };

  const handleDesiredRankChange = (rankName: string) => {
    const firstValidDivision = divisions.find(
      (division) => flattenRank(rankName, division) > currentValue,
    );
    if (!firstValidDivision) return;

    setDesiredRank(rankName);
    if (flattenRank(rankName, desiredDivision) <= currentValue) {
      setDesiredDivision(firstValidDivision);
    }
  };

  const order: RankUpOrder = {
    serviceType: "rank-up",
    currentRank,
    currentDivision,
    desiredRank,
    desiredDivision,
    rpGain,
    queueType,
    duoBoosterCount,
    platform,
    server,
    promoCode,
    specificBooster,
    streaming,
    express,
    highKillCount,
    oneTrickPony,
    rankInsurance,
    vipPriority,
    insaneClipDrop,
    eliteTier,
  };

  const {
    subtotal,
    discount,
    extraDiscountPercent,
    hasExtraDiscount,
    amountToExtraDiscount,
    total,
  } = computeOrderPrice(order);

  const isDesiredRankDisabled = (rankName: string) =>
    flattenRank(rankName, "I") <= currentValue;

  const isDesiredDivisionDisabled = (division: string) =>
    flattenRank(desiredRank, division) <= currentValue;

  const rankCard = (selected: boolean, disabled: boolean) =>
    `group rounded-lg border p-2.5 transition-colors duration-150 cursor-pointer ${
      disabled
        ? "border-[var(--line)] bg-[var(--surface-muted)] opacity-35 cursor-not-allowed"
        : selected
        ? "border-[var(--foreground)] bg-[var(--surface-strong)]"
        : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-muted)]"
    }`;

  const addOnCard = (
    title: string,
    tag: string,
    enabled: boolean,
    setEnabled: React.Dispatch<React.SetStateAction<boolean>>,
    description?: string
  ) => (
    <div className={`relative rounded-lg border p-4 transition-colors duration-150 ${
      enabled
        ? "border-[var(--foreground)] bg-[var(--surface-strong)]"
        : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--line-strong)]"
    }`}>
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <p className="font-semibold text-[var(--foreground)]">{title}</p>
            {description && (
              <span className="group/tip relative cursor-help">
                <span className="flex h-4 w-4 items-center justify-center rounded-full border border-[var(--line)] text-[10px] font-bold text-[var(--muted)]">?</span>
                <span className="theme-popover pointer-events-none absolute bottom-full left-1/2 z-50 mb-2 w-56 -translate-x-1/2 rounded-lg border px-3 py-2 text-xs opacity-0 shadow-lg transition-opacity duration-200 group-hover/tip:pointer-events-auto group-hover/tip:opacity-100">
                  {description}
                </span>
              </span>
            )}
          </div>
          <span className="mt-2 inline-block text-xs font-medium text-[var(--muted)]">
            {tag}
          </span>
        </div>
        <Toggle enabled={enabled} setEnabled={setEnabled} />
      </div>
    </div>
  );

  const currentRankData = ranks.find((r) => r.name === currentRank);
  const desiredRankData = ranks.find((r) => r.name === desiredRank);

  const [checkoutLoading, setCheckoutLoading] = React.useState(false);
  const [showDetails, setShowDetails] = React.useState(false);

  const [selectedLang, setSelectedLang] = React.useState(defaultLang);

  React.useEffect(() => {
    const saved = localStorage.getItem("proboost_lang");
    const id = window.setTimeout(() => {
      if (saved && saved !== defaultLang) setSelectedLang(saved);
    }, 0);
    return () => window.clearTimeout(id);
  }, [defaultLang]);

  const englishAddOns = {
    playOffline: { title: "Play Offline", desc: addOnDescsByLang.en.playOffline },
    express: { title: "Express Delivery", desc: addOnDescsByLang.en.express },
    rankInsurance: { title: "Rank Insurance", desc: addOnDescsByLang.en.rankInsurance },
    eliteTier: { title: "Elite 0.01% Tier", desc: addOnDescsByLang.en.eliteTier },
    specificOperators: { title: "Specific Operators", desc: addOnDescsByLang.en.specificOperators },
    highKillCount: { title: "High Kill Count", desc: addOnDescsByLang.en.highKillCount },
    vipPriority: { title: "VIP Priority", desc: addOnDescsByLang.en.vipPriority },
    streaming: { title: "Streaming", desc: addOnDescsByLang.en.streaming },
    oneTrickPony: { title: "One Trick Pony", desc: addOnDescsByLang.en.oneTrickPony },
    insaneClipDrop: { title: "Insane Clip Drop", desc: addOnDescsByLang.en.insaneClipDrop },
  };
  const englishTrustFeatures = [
    { title: "Money-Back Guarantee", desc: "Your satisfaction is our promise - if we don't deliver, you get a full refund. No questions asked." },
    { title: "Zero-Ban Protection", desc: "100% safe boosting with advanced VPN routes and real players only - zero bots, zero risks." },
    { title: "Fair & Transparent Pricing", desc: "Top-tier quality at honest prices - you pay for real performance, not empty promises." },
    { title: "The World's Strongest Players", desc: "Every booster is verified, ranked, and battle-tested - elite talent that guarantees results." },
    { title: "24/7 Live Support", desc: "We're always online to assist you - instant updates, real people, real help anytime." },
  ];

  const localizedUi = {
    en: {
      onlineBoosters: "Online Boosters",
      login: "Log In",
      affiliateProgram: "Affiliate Program",
      membership: "Membership",
      answersHub: "Answers Hub",
      workWithUs: "Work with us",
      contact: "Contact",
      overview: "Overview",
      boosting: "Boosting",
      eLearning: "E-learning",
      boosters: "Boosters",
      heroTitle: "Rainbow Six Siege Rank Boost",
      heroDesc: "Take your gameplay to the next level! Dominate the battlegrounds of Rainbow 6 Siege with our expert boosters. Experience the thrill of victory as you climb the ranks and outplay your opponents. Unlock your true potential and become a true champion in Rainbow 6 Siege!",
      badges: ["SSL Secure", "VPN", "Safe Service", "24/7 Support", "Money Refunds", "Cashback"],
      seasonName: "Year 11 Season 1 — Operation Silent Hunt",
      daysLeft: "DAYS LEFT",
      serviceButtons: ["Rank Boost", "Champion Rank Boost", "Competitive Wins", "Unrated Matches"],
      rated: "Rated 4.9+",
      discountTitle: "Limited-Time Discount for the Same Elite Experience",
      discountSubtitle: "Trusted by top players and built for a premium, polished experience.",
      discountEnds: "Discount Ends In",
      currentRank: "Current Rank",
      desiredRank: "Desired Rank",
      selectPlatform: "Select Platform",
      summary: "Summary",
      policyTitle: "Estimated Starting Time Policy",
      policyLine1: "The delivery time displayed is an",
      policyHighlight1: "estimate based on average completion times",
      policyLine2: "Actual delivery or starting time may vary depending on factors such as",
      policyHighlight2: ["order volume", "customer response times", "booster availability"],
      policyLine3: "We appreciate your understanding and will do our best to meet your expectations promptly.",
      solo: "Solo",
      duo: "Duo",
      specificBooster: "Specific Booster",
      specificBoosterDesc: "Your boost will be assigned to a specific booster of your choice.",
      applyPromo: "Apply Promo Code",
      enterCoupon: "Enter Coupon",
      apply: "Apply",
      trustHeading: "Why Players Trust ProBoost",
      faqLabel: "FAQs",
      infoHeadings: [
        "Rank Higher & Win More Games!",
        "Pick Your Own Booster!",
        "The Easiest Way To Boost Your RP",
        "Cut Down the Loss Ratio with R6 Boosting",
        "Fast & Simple Rainbow Six Siege Boosting Services",
        "The Most Secure R6 Boosting",
        "Benefits of Rainbow Six Siege Boosting",
        "Your Satisfaction Is Important To Us",
      ],
    },
    it: { onlineBoosters: "Booster online", login: "Accedi", affiliateProgram: "Programma Affiliazione", membership: "Abbonamento", answersHub: "Centro Risposte", workWithUs: "Lavora con noi", contact: "Contatti", overview: "Panoramica", boosting: "Boosting", eLearning: "E-learning", boosters: "Booster", heroTitle: "Boost Rank Rainbow Six Siege", heroDesc: "Porta il tuo gameplay al livello successivo con i nostri booster esperti e scala i rank pi\u00f9 velocemente.", badges: ["SSL Sicuro", "VPN", "Servizio Sicuro", "Supporto 24/7", "Rimborsi", "Cashback"], seasonName: "Anno 11 Stagione 1 \u2014 Operation Silent Hunt", daysLeft: "GIORNI RIMASTI", serviceButtons: ["Boost Rank", "Boost Champion", "Vittorie Competitive", "Partite Unrated"], rated: "Valutato 4.9+", discountTitle: "Sconto Limitato per la Stessa Esperienza Elite", discountSubtitle: "Scelto dai migliori giocatori per un servizio premium.", discountEnds: "Lo sconto termina tra", currentRank: "Rank Attuale", desiredRank: "Rank Desiderato", selectPlatform: "Seleziona Piattaforma", summary: "Riepilogo", policyTitle: "Politica Tempi Stimati", policyLine1: "Il tempo mostrato \u00e8 una", policyHighlight1: "stima basata sui tempi medi di completamento", policyLine2: "I tempi effettivi possono variare in base a", policyHighlight2: ["volume ordini", "tempi di risposta del cliente", "disponibilit\u00e0 booster"], policyLine3: "Faremo del nostro meglio per soddisfare rapidamente il tuo ordine.", solo: "Solo", duo: "Duo", specificBooster: "Booster Specifico", specificBoosterDesc: "Il tuo ordine verr\u00e0 assegnato a un booster specifico scelto da te.", applyPromo: "Applica Codice Promo", enterCoupon: "Inserisci Coupon", apply: "Applica", trustHeading: "Perch\u00e9 i giocatori scelgono ProBoost", faqLabel: "FAQ", infoHeadings: ["Sali di Rank e Vinci di Pi\u00f9!", "Scegli il Tuo Booster!", "Il modo pi\u00f9 facile per aumentare i tuoi RP", "Riduci le sconfitte con il boosting R6", "Servizi di boosting semplici e veloci", "Il boosting R6 pi\u00f9 sicuro", "Vantaggi del boosting Rainbow Six Siege", "La tua soddisfazione \u00e8 importante"] },
    fr: { onlineBoosters: "Boosters en ligne", login: "Connexion", affiliateProgram: "Affiliation", membership: "Adh\u00e9sion", answersHub: "Centre d'aide", workWithUs: "Travaillez avec nous", contact: "Contact", overview: "Aper\u00e7u", boosting: "Boosting", eLearning: "E-learning", boosters: "Boosters", heroTitle: "Boost de rang Rainbow Six Siege", heroDesc: "Passez au niveau sup\u00e9rieur avec nos boosters experts et grimpez plus vite dans les rangs.", badges: ["SSL s\u00e9curis\u00e9", "VPN", "Service s\u00fbr", "Support 24/7", "Remboursements", "Cashback"], seasonName: "Ann\u00e9e 11 Saison 1 \u2014 Operation Silent Hunt", daysLeft: "JOURS RESTANTS", serviceButtons: ["Boost de rang", "Boost Champion", "Victoires class\u00e9es", "Matchs non class\u00e9s"], rated: "Not\u00e9 4.9+", discountTitle: "R\u00e9duction limit\u00e9e pour la m\u00eame exp\u00e9rience premium", discountSubtitle: "Choisi par les meilleurs joueurs pour une exp\u00e9rience soign\u00e9e.", discountEnds: "La r\u00e9duction se termine dans", currentRank: "Rang actuel", desiredRank: "Rang d\u00e9sir\u00e9", selectPlatform: "Choisir la plateforme", summary: "R\u00e9sum\u00e9", policyTitle: "Politique de d\u00e9lai estim\u00e9", policyLine1: "Le d\u00e9lai affich\u00e9 est une", policyHighlight1: "estimation bas\u00e9e sur les temps moyens", policyLine2: "Le d\u00e9lai r\u00e9el peut varier selon", policyHighlight2: ["volume de commandes", "temps de r\u00e9ponse client", "disponibilit\u00e9 des boosters"], policyLine3: "Nous ferons le maximum pour r\u00e9pondre rapidement \u00e0 votre commande.", solo: "Solo", duo: "Duo", specificBooster: "Booster sp\u00e9cifique", specificBoosterDesc: "Votre commande sera assign\u00e9e au booster de votre choix.", applyPromo: "Appliquer un code promo", enterCoupon: "Entrer le coupon", apply: "Appliquer", trustHeading: "Pourquoi les joueurs font confiance \u00e0 ProBoost", faqLabel: "FAQ", infoHeadings: ["Montez de rang et gagnez plus !", "Choisissez votre booster !", "Le moyen le plus simple d'augmenter vos RP", "R\u00e9duisez vos d\u00e9faites avec le boosting R6", "Services de boosting rapides et simples", "Le boosting R6 le plus s\u00fbr", "Avantages du boosting Rainbow Six Siege", "Votre satisfaction est importante"] },
    es: { onlineBoosters: "Boosters en l\u00ednea", login: "Iniciar sesi\u00f3n", affiliateProgram: "Programa de afiliados", membership: "Membres\u00eda", answersHub: "Centro de ayuda", workWithUs: "Trabaja con nosotros", contact: "Contacto", overview: "Resumen", boosting: "Boosting", eLearning: "E-learning", boosters: "Boosters", heroTitle: "Boost de rango Rainbow Six Siege", heroDesc: "Lleva tu nivel al siguiente escal\u00f3n con nuestros boosters expertos y sube de rango m\u00e1s r\u00e1pido.", badges: ["SSL Seguro", "VPN", "Servicio Seguro", "Soporte 24/7", "Reembolsos", "Cashback"], seasonName: "A\u00f1o 11 Temporada 1 \u2014 Operation Silent Hunt", daysLeft: "D\u00cdAS RESTANTES", serviceButtons: ["Boost de rango", "Boost Champion", "Victorias competitivas", "Partidas no clasificadas"], rated: "Valorado 4.9+", discountTitle: "Descuento limitado para la misma experiencia elite", discountSubtitle: "Elegido por los mejores jugadores para una experiencia premium.", discountEnds: "El descuento termina en", currentRank: "Rango actual", desiredRank: "Rango deseado", selectPlatform: "Seleccionar plataforma", summary: "Resumen", policyTitle: "Pol\u00edtica de tiempo estimado", policyLine1: "El tiempo mostrado es una", policyHighlight1: "estimaci\u00f3n basada en tiempos promedio", policyLine2: "El tiempo real puede variar seg\u00fan", policyHighlight2: ["volumen de pedidos", "tiempos de respuesta del cliente", "disponibilidad del booster"], policyLine3: "Haremos todo lo posible para cumplir tu pedido r\u00e1pidamente.", solo: "Solo", duo: "Duo", specificBooster: "Booster espec\u00edfico", specificBoosterDesc: "Tu boost ser\u00e1 asignado al booster espec\u00edfico que elijas.", applyPromo: "Aplicar c\u00f3digo promo", enterCoupon: "Introducir cup\u00f3n", apply: "Aplicar", trustHeading: "Por qu\u00e9 los jugadores conf\u00edan en ProBoost", faqLabel: "FAQ", infoHeadings: ["\u00a1Sube de rango y gana m\u00e1s!", "\u00a1Elige tu booster!", "La forma m\u00e1s f\u00e1cil de aumentar tus RP", "Reduce las derrotas con R6 Boosting", "Servicios de boosting r\u00e1pidos y simples", "El boosting R6 m\u00e1s seguro", "Beneficios del boosting Rainbow Six Siege", "Tu satisfacci\u00f3n es importante"] },
    de: { onlineBoosters: "Booster online", login: "Anmelden", affiliateProgram: "Partnerprogramm", membership: "Mitgliedschaft", answersHub: "Hilfecenter", workWithUs: "Arbeite mit uns", contact: "Kontakt", overview: "\u00dcbersicht", boosting: "Boosting", eLearning: "E-Learning", boosters: "Booster", heroTitle: "Rainbow Six Siege Rank Boost", heroDesc: "Steige mit unseren Experten schneller im Rang auf und dominiere mehr Matches.", badges: ["SSL Sicher", "VPN", "Sicherer Service", "24/7 Support", "R\u00fcckerstattung", "Cashback"], seasonName: "Jahr 11 Saison 1 \u2014 Operation Silent Hunt", daysLeft: "TAGE \u00dcBRIG", serviceButtons: ["Rank Boost", "Champion Boost", "Gewertete Siege", "Unrated-Matches"], rated: "Bewertet mit 4.9+", discountTitle: "Zeitlich begrenzter Rabatt f\u00fcr dieselbe Elite-Erfahrung", discountSubtitle: "Von Top-Spielern gew\u00e4hlt f\u00fcr ein hochwertiges Erlebnis.", discountEnds: "Rabatt endet in", currentRank: "Aktueller Rang", desiredRank: "Gew\u00fcnschter Rang", selectPlatform: "Plattform w\u00e4hlen", summary: "Zusammenfassung", policyTitle: "Richtlinie zur gesch\u00e4tzten Startzeit", policyLine1: "Die angezeigte Zeit ist eine", policyHighlight1: "Sch\u00e4tzung auf Basis durchschnittlicher Abschlusszeiten", policyLine2: "Die tats\u00e4chliche Zeit kann variieren durch", policyHighlight2: ["Bestellvolumen", "Antwortzeiten des Kunden", "Booster-Verf\u00fcgbarkeit"], policyLine3: "Wir geben unser Bestes, deine Bestellung schnell zu erf\u00fcllen.", solo: "Solo", duo: "Duo", specificBooster: "Spezifischer Booster", specificBoosterDesc: "Dein Auftrag wird einem Booster deiner Wahl zugewiesen.", applyPromo: "Promo-Code anwenden", enterCoupon: "Coupon eingeben", apply: "Anwenden", trustHeading: "Warum Spieler ProBoost vertrauen", faqLabel: "FAQ", infoHeadings: ["Steige h\u00f6her und gewinne mehr!", "W\u00e4hle deinen Booster!", "Der einfachste Weg, deine RP zu erh\u00f6hen", "Weniger Niederlagen mit R6 Boosting", "Schnelle und einfache Boosting-Services", "Das sicherste R6 Boosting", "Vorteile von Rainbow Six Siege Boosting", "Deine Zufriedenheit ist wichtig"] },
    nl: { onlineBoosters: "Boosters online", login: "Inloggen", affiliateProgram: "Affiliateprogramma", membership: "Lidmaatschap", answersHub: "Helpcentrum", workWithUs: "Werk met ons", contact: "Contact", overview: "Overzicht", boosting: "Boosting", eLearning: "E-learning", boosters: "Boosters", heroTitle: "Rainbow Six Siege Rank Boost", heroDesc: "Til je gameplay naar een hoger niveau met onze expert-boosters en klim sneller in rank.", badges: ["SSL Beveiligd", "VPN", "Veilige Service", "24/7 Support", "Terugbetalingen", "Cashback"], seasonName: "Jaar 11 Seizoen 1 \u2014 Operation Silent Hunt", daysLeft: "DAGEN OVER", serviceButtons: ["Rank Boost", "Champion Boost", "Competitieve Wins", "Unrated Wedstrijden"], rated: "Beoordeeld 4.9+", discountTitle: "Tijdelijke korting voor dezelfde elite-ervaring", discountSubtitle: "Vertrouwd door topspelers voor een premium ervaring.", discountEnds: "Korting eindigt over", currentRank: "Huidige rank", desiredRank: "Gewenste rank", selectPlatform: "Selecteer platform", summary: "Samenvatting", policyTitle: "Beleid geschatte starttijd", policyLine1: "De getoonde tijd is een", policyHighlight1: "schatting op basis van gemiddelde voltooiingstijden", policyLine2: "De werkelijke tijd kan vari\u00ebren door", policyHighlight2: ["ordervolume", "reactietijden van klanten", "beschikbaarheid van boosters"], policyLine3: "We doen ons best om je bestelling snel af te ronden.", solo: "Solo", duo: "Duo", specificBooster: "Specifieke Booster", specificBoosterDesc: "Je boost wordt toegewezen aan een booster van jouw keuze.", applyPromo: "Promocode toepassen", enterCoupon: "Coupon invoeren", apply: "Toepassen", trustHeading: "Waarom spelers ProBoost vertrouwen", faqLabel: "FAQ", infoHeadings: ["Rank hoger en win meer!", "Kies je eigen booster!", "De makkelijkste manier om je RP te verhogen", "Verlaag je verliesratio met R6 Boosting", "Snelle en eenvoudige boostingservices", "De veiligste R6 boosting", "Voordelen van Rainbow Six Siege Boosting", "Jouw tevredenheid is belangrijk"] },
    pt: { onlineBoosters: "Boosters online", login: "Entrar", affiliateProgram: "Programa de Afiliados", membership: "Membro", answersHub: "Central de Ajuda", workWithUs: "Trabalhe conosco", contact: "Contato", overview: "Vis\u00e3o geral", boosting: "Boosting", eLearning: "E-learning", boosters: "Boosters", heroTitle: "Boost de rank Rainbow Six Siege", heroDesc: "Leve sua gameplay ao pr\u00f3ximo n\u00edvel com nossos boosters especialistas e suba de rank mais r\u00e1pido.", badges: ["SSL Seguro", "VPN", "Servi\u00e7o Seguro", "Suporte 24/7", "Reembolsos", "Cashback"], seasonName: "Ano 11 Temporada 1 \u2014 Operation Silent Hunt", daysLeft: "DIAS RESTANTES", serviceButtons: ["Boost de rank", "Boost Champion", "Vit\u00f3rias competitivas", "Partidas sem rank"], rated: "Avaliado 4.9+", discountTitle: "Desconto por tempo limitado para a mesma experi\u00eancia elite", discountSubtitle: "Confiado pelos melhores jogadores para uma experi\u00eancia premium.", discountEnds: "Desconto termina em", currentRank: "Rank atual", desiredRank: "Rank desejado", selectPlatform: "Selecionar plataforma", summary: "Resumo", policyTitle: "Pol\u00edtica de tempo estimado", policyLine1: "O tempo exibido \u00e9 uma", policyHighlight1: "estimativa baseada no tempo m\u00e9dio de conclus\u00e3o", policyLine2: "O tempo real pode variar por", policyHighlight2: ["volume de pedidos", "tempo de resposta do cliente", "disponibilidade do booster"], policyLine3: "Faremos o poss\u00edvel para concluir seu pedido rapidamente.", solo: "Solo", duo: "Duo", specificBooster: "Booster espec\u00edfico", specificBoosterDesc: "Seu boost ser\u00e1 atribu\u00eddo a um booster da sua escolha.", applyPromo: "Aplicar c\u00f3digo promocional", enterCoupon: "Inserir cupom", apply: "Aplicar", trustHeading: "Por que os jogadores confiam na ProBoost", faqLabel: "FAQ", infoHeadings: ["Suba mais alto e ganhe mais!", "Escolha seu booster!", "A maneira mais f\u00e1cil de aumentar seu RP", "Reduza as derrotas com R6 Boosting", "Servi\u00e7os de boosting r\u00e1pidos e simples", "O boosting R6 mais seguro", "Benef\u00edcios do Rainbow Six Siege Boosting", "Sua satisfa\u00e7\u00e3o \u00e9 importante"] },
    uk: { onlineBoosters: "Бустери онлайн", login: "Увійти", affiliateProgram: "Партнерська програма", membership: "Підписка", answersHub: "Центр відповідей", workWithUs: "Працюйте з нами", contact: "Контакт", overview: "Огляд", boosting: "Бустинг", eLearning: "E-learning", boosters: "Бустери", heroTitle: "Буст рангу Rainbow Six Siege", heroDesc: "Підніміть свій рівень гри з нашими досвідченими бустерами та швидше піднімайтесь в ранзі.", badges: ["SSL Захист", "VPN", "Безпечний сервіс", "Підтримка 24/7", "Повернення коштів", "Кешбек"], seasonName: "Рік 11 Сезон 1 — Operation Silent Hunt", daysLeft: "ДНІВ ЗАЛИШИЛОСЬ", serviceButtons: ["Буст рангу", "Буст Champion", "Рейтингові перемоги", "Нерейтингові матчі"], rated: "Рейтинг 4.9+", discountTitle: "Обмежена знижка на той самий преміальний сервіс", discountSubtitle: "Нас обирають топ-гравці за якісний сервіс.", discountEnds: "Знижка закінчується через", currentRank: "Поточний ранг", desiredRank: "Бажаний ранг", selectPlatform: "Виберіть платформу", summary: "Підсумок", policyTitle: "Політика орієнтовного часу старту", policyLine1: "Показаний час — це", policyHighlight1: "оцінка на основі середнього часу виконання", policyLine2: "Фактичний час може змінюватися залежно від", policyHighlight2: ["обсягу замовлень", "часу відповіді клієнта", "доступності бустерів"], policyLine3: "Ми зробимо все можливе, щоб виконати замовлення швидко.", solo: "Solo", duo: "Duo", specificBooster: "Конкретний бустер", specificBoosterDesc: "Ваше замовлення буде передано обраному вами бустеру.", applyPromo: "Застосувати промокод", enterCoupon: "Ввести купон", apply: "Застосувати", trustHeading: "Чому гравці довіряють ProBoost", faqLabel: "FAQ", infoHeadings: ["Піднімайтесь вище та вигравайте більше!", "Обирайте свого бустера!", "Найпростіший спосіб збільшити RP", "Менше поразок з R6 Boosting", "Швидкі та прості послуги бустингу", "Найбезпечніший R6 бустинг", "Переваги Rainbow Six Siege Boosting", "Ваше задоволення важливе"] },
    ru: { onlineBoosters: "Бустеры онлайн", login: "Войти", affiliateProgram: "Партнёрская программа", membership: "Подписка", answersHub: "Центр ответов", workWithUs: "Работа с нами", contact: "Контакт", overview: "Обзор", boosting: "Бустинг", eLearning: "E-learning", boosters: "Бустеры", heroTitle: "Буст ранга Rainbow Six Siege", heroDesc: "Поднимите свой уровень игры с нашими опытными бустерами и быстрее повышайте ранг.", badges: ["SSL Защита", "VPN", "Безопасный сервис", "Поддержка 24/7", "Возвраты", "Кэшбэк"], seasonName: "Год 11 Сезон 1 — Operation Silent Hunt", daysLeft: "ДНЕЙ ОСТАЛОСЬ", serviceButtons: ["Буст ранга", "Буст Champion", "Рейтинговые победы", "Нерейтинговые матчи"], rated: "Рейтинг 4.9+", discountTitle: "Ограниченная скидка на тот же премиум-сервис", discountSubtitle: "Нас выбирают топ-игроки за качественный сервис.", discountEnds: "Скидка закончится через", currentRank: "Текущий ранг", desiredRank: "Желаемый ранг", selectPlatform: "Выберите платформу", summary: "Сводка", policyTitle: "Политика ориентировочного времени старта", policyLine1: "Показанное время — это", policyHighlight1: "оценка на основе среднего времени выполнения", policyLine2: "Фактическое время может зависеть от", policyHighlight2: ["объёма заказов", "времени ответа клиента", "доступности бустеров"], policyLine3: "Мы сделаем всё возможное, чтобы выполнить заказ как можно быстрее.", solo: "Solo", duo: "Duo", specificBooster: "Конкретный бустер", specificBoosterDesc: "Ваш заказ будет назначен выбранному вами бустеру.", applyPromo: "Применить промокод", enterCoupon: "Введите купон", apply: "Применить", trustHeading: "Почему игроки доверяют ProBoost", faqLabel: "FAQ", infoHeadings: ["Поднимайтесь выше и выигрывайте больше!", "Выберите своего бустера!", "Самый простой способ повысить RP", "Снизьте число поражений с R6 Boosting", "Быстрые и простые услуги бустинга", "Самый безопасный R6 бустинг", "Преимущества Rainbow Six Siege Boosting", "Ваше удовлетворение важно"] },
  } as const;
  const localizedAnnotations = {
    en: {
      languageMenuTitle: "Select Language",
      free: "FREE",
      details: "Details",
      day: "day",
      days: "days",
      customize: "Customize",
      competitorIntro: "This Boost would cost you around",
      competitorSuffix: "more on a competitor website.",
      couponAppliedTitle: "Coupon Applied",
      couponAppliedDesc: "Coupon applied successfully! You got 6% off.",
      couponMissingTitle: "Coupon Not Found",
      couponMissingDesc: "Ops, coupon not found, please contact support.",
      seasonTooltip: "It is advisable not to wait until the very last moment of the season to order a Boosting service, as the last 2-5 days tend to be more crowded with orders.",
      extraBooster: "Extra Booster",
      increaseBoosters: "Increase the number to add more Boosters",
      extraBoosterTooltip: "With this option you can increase the amount of Boosters that will join your order in DUO. Each additional Booster costs 75% extra on top of the base price.",
      playWithBooster: "Play with Booster",
      oneBooster: "1 Booster",
      extraBoosterSuffix: "Extra Booster",
      extraBoosterPlural: "Extra Boosters",
      rpGainLabel: "RP Gain Per Win",
      serverLabel: "Server",
      extraDiscountUnlocked: "Extra 3% discount unlocked on your order",
      extraDiscountAdd: "Add £{amount} more to save an extra 3% on your order",
      extraDiscountLabel: "Extra Discount",
      totalAmountLabel: "Total Amount",
      cashbackLabel: "Cashback",
      checkoutButton: "Checkout",
      redirectingLabel: "Redirecting...",
      safePaymentsTitle: "Safe & Secure Payments",
      safePaymentsDesc: "100% secure checkout powered by Stripe & PayPal",
      policyAnd: "and",
      modalTitle: "Why we\u2019re cheaper than the rest",
      modalSubtitle: "Pricing breakdown",
      modalFeeTitle: "Our platform fee",
      modalFeeDesc: "Boosters keep 90% of earnings \u2014 they\u2019re motivated to deliver their best every single order.",
      modalQualityTitle: "Elite boosters only",
      modalQualityDesc: "94% win rate \u00b7 99% on-time \u00b7 every booster rated and verified by real clients.",
      modalSavingsTitle: "Cheaper than the rest",
      modalSavingsDesc: "You save £{amount} on this order vs. other platforms \u2014 same quality, lower price.",
      modalClose: "Close",
      addOns: englishAddOns,
      trustFeatures: englishTrustFeatures,
    },
    it: { languageMenuTitle: "Seleziona lingua", free: "GRATIS", details: "Dettagli", day: "giorno", days: "giorni", customize: "Personalizza", competitorIntro: "Questo boost ti costerebbe circa", competitorSuffix: "in pi\u00f9 su un sito concorrente.", couponAppliedTitle: "Coupon applicato", couponAppliedDesc: "Coupon applicato con successo! Hai ottenuto il 6% di sconto.", couponMissingTitle: "Coupon non trovato", couponMissingDesc: "Coupon non trovato, contatta il supporto.", seasonTooltip: "Ti consigliamo di non aspettare l'ultimo momento della stagione per ordinare un boosting, perch\u00e9 gli ultimi 2-5 giorni sono pi\u00f9 affollati.", extraBooster: "Booster Extra", increaseBoosters: "Aumenta il numero per aggiungere pi\u00f9 Booster", extraBoosterTooltip: "Con questa opzione puoi aumentare il numero di Booster che entreranno nel tuo ordine in DUO. Ogni Booster aggiuntivo costa il 75% in pi\u00f9.", playWithBooster: "Gioca con il Booster", oneBooster: "1 Booster", extraBoosterSuffix: "Booster Extra", extraBoosterPlural: "Booster Extra", rpGainLabel: "RP per vittoria", serverLabel: "Server", extraDiscountUnlocked: "Sconto extra del 3% sbloccato sul tuo ordine", extraDiscountAdd: "Aggiungi \u00a3{amount} per risparmiare un ulteriore 3%", extraDiscountLabel: "Sconto Extra", totalAmountLabel: "Totale", cashbackLabel: "Cashback", checkoutButton: "Checkout", redirectingLabel: "Reindirizzamento...", safePaymentsTitle: "Pagamenti Sicuri", safePaymentsDesc: "Checkout 100% sicuro tramite Stripe e PayPal", policyAnd: "e", modalTitle: "Perch\u00e9 siamo pi\u00f9 economici degli altri", modalSubtitle: "Analisi del prezzo", modalFeeTitle: "La nostra commissione", modalFeeDesc: "I Booster tengono il 90% dei guadagni \u2014 sono motivati a dare il massimo ad ogni ordine.", modalQualityTitle: "Solo Booster d\u2019\u00e9lite", modalQualityDesc: "94% win rate \u00b7 99% puntuale \u00b7 ogni booster valutato e verificato da clienti reali.", modalSavingsTitle: "Pi\u00f9 economico degli altri", modalSavingsDesc: "Risparmi \u00a3{amount} su questo ordine rispetto ad altre piattaforme \u2014 stessa qualit\u00e0, prezzo inferiore.", modalClose: "Chiudi", addOns: { playOffline: { title: "Gioca Offline", desc: addOnDescsByLang.it.playOffline }, express: { title: "Consegna Express", desc: addOnDescsByLang.it.express }, rankInsurance: { title: "Assicurazione Rank", desc: addOnDescsByLang.it.rankInsurance }, eliteTier: { title: "Tier Elite 0.01%", desc: addOnDescsByLang.it.eliteTier }, specificOperators: { title: "Operatori Specifici", desc: addOnDescsByLang.it.specificOperators }, highKillCount: { title: "Alto Numero di Kill", desc: addOnDescsByLang.it.highKillCount }, vipPriority: { title: "Priorit\u00e0 VIP", desc: addOnDescsByLang.it.vipPriority }, streaming: { title: "Streaming", desc: addOnDescsByLang.it.streaming }, oneTrickPony: { title: "One Trick Pony", desc: addOnDescsByLang.it.oneTrickPony }, insaneClipDrop: { title: "Clip Epiche", desc: addOnDescsByLang.it.insaneClipDrop } }, trustFeatures: [{ title: "Garanzia Rimborso", desc: englishTrustFeatures[0].desc }, { title: "Protezione Zero Ban", desc: englishTrustFeatures[1].desc }, { title: "Prezzi Trasparenti", desc: englishTrustFeatures[2].desc }, { title: "I Giocatori Pi\u00f9 Forti", desc: englishTrustFeatures[3].desc }, { title: "Supporto Live 24/7", desc: englishTrustFeatures[4].desc }] },
    fr: { languageMenuTitle: "Choisir la langue", free: "GRATUIT", details: "D\u00e9tails", day: "jour", days: "jours", customize: "Personnaliser", competitorIntro: "Ce boost vous co\u00fbterait environ", competitorSuffix: "de plus sur un site concurrent.", couponAppliedTitle: "Coupon appliqu\u00e9", couponAppliedDesc: "Coupon appliqu\u00e9 avec succ\u00e8s\u00a0! Vous avez obtenu 6% de r\u00e9duction.", couponMissingTitle: "Coupon introuvable", couponMissingDesc: "Coupon introuvable, veuillez contacter le support.", seasonTooltip: "Il est conseill\u00e9 de ne pas attendre la toute fin de saison pour commander, car les 2 \u00e0 5 derniers jours sont plus charg\u00e9s.", extraBooster: "Booster suppl\u00e9mentaire", increaseBoosters: "Augmentez le nombre pour ajouter des boosters", extraBoosterTooltip: "Cette option augmente le nombre de boosters qui rejoindront votre commande en DUO. Chaque booster suppl\u00e9mentaire co\u00fbte 75% de plus.", playWithBooster: "Jouer avec le booster", oneBooster: "1 Booster", extraBoosterSuffix: "Booster suppl\u00e9mentaire", extraBoosterPlural: "Boosters suppl\u00e9mentaires", rpGainLabel: "RP gagn\u00e9s par victoire", serverLabel: "Serveur", extraDiscountUnlocked: "R\u00e9duction suppl\u00e9mentaire de 3% d\u00e9bloqu\u00e9e", extraDiscountAdd: "Ajoutez \u00a3{amount} pour \u00e9conomiser 3% de plus", extraDiscountLabel: "R\u00e9duction suppl\u00e9mentaire", totalAmountLabel: "Montant total", cashbackLabel: "Cashback", checkoutButton: "Commander", redirectingLabel: "Redirection...", safePaymentsTitle: "Paiements s\u00e9curis\u00e9s", safePaymentsDesc: "Checkout 100% s\u00e9curis\u00e9 via Stripe et PayPal", policyAnd: "et", modalTitle: "Pourquoi nous sommes moins chers", modalSubtitle: "D\u00e9tail des prix", modalFeeTitle: "Notre commission", modalFeeDesc: "Les boosters gardent 90% de leurs gains \u2014 ils sont motiv\u00e9s \u00e0 donner le meilleur \u00e0 chaque commande.", modalQualityTitle: "Boosters d\u2019\u00e9lite uniquement", modalQualityDesc: "94% de victoires \u00b7 99% \u00e0 temps \u00b7 chaque booster \u00e9valu\u00e9 et v\u00e9rifi\u00e9 par de vrais clients.", modalSavingsTitle: "Moins cher que les autres", modalSavingsDesc: "Vous \u00e9conomisez \u00a3{amount} sur cette commande vs. d\u2019autres plateformes \u2014 m\u00eame qualit\u00e9, prix inf\u00e9rieur.", modalClose: "Fermer", addOns: { playOffline: { title: "Jouer Hors Ligne", desc: addOnDescsByLang.fr.playOffline }, express: { title: "Livraison Express", desc: addOnDescsByLang.fr.express }, rankInsurance: { title: "Assurance Rang", desc: addOnDescsByLang.fr.rankInsurance }, eliteTier: { title: "Tier \u00c9lite 0.01%", desc: addOnDescsByLang.fr.eliteTier }, specificOperators: { title: "Op\u00e9rateurs Sp\u00e9cifiques", desc: addOnDescsByLang.fr.specificOperators }, highKillCount: { title: "Beaucoup de Kills", desc: addOnDescsByLang.fr.highKillCount }, vipPriority: { title: "Priorit\u00e9 VIP", desc: addOnDescsByLang.fr.vipPriority }, streaming: { title: "Streaming", desc: addOnDescsByLang.fr.streaming }, oneTrickPony: { title: "One Trick Pony", desc: addOnDescsByLang.fr.oneTrickPony }, insaneClipDrop: { title: "Clips Fous", desc: addOnDescsByLang.fr.insaneClipDrop } }, trustFeatures: [{ title: "Garantie de remboursement", desc: englishTrustFeatures[0].desc }, { title: "Protection anti-ban", desc: englishTrustFeatures[1].desc }, { title: "Tarification transparente", desc: englishTrustFeatures[2].desc }, { title: "Les joueurs les plus forts", desc: englishTrustFeatures[3].desc }, { title: "Support live 24/7", desc: englishTrustFeatures[4].desc }] },
    es: { languageMenuTitle: "Seleccionar idioma", free: "GRATIS", details: "Detalles", day: "d\u00eda", days: "d\u00edas", customize: "Personalizar", competitorIntro: "Este boost te costar\u00eda alrededor de", competitorSuffix: "m\u00e1s en una web de la competencia.", couponAppliedTitle: "Cup\u00f3n aplicado", couponAppliedDesc: "\u00a1Cup\u00f3n aplicado correctamente! Has obtenido un 6% de descuento.", couponMissingTitle: "Cup\u00f3n no encontrado", couponMissingDesc: "Cup\u00f3n no encontrado, contacta con soporte.", seasonTooltip: "Se recomienda no esperar al \u00faltimo momento de la temporada para pedir boosting, ya que los \u00faltimos 2-5 d\u00edas suelen estar m\u00e1s saturados.", extraBooster: "Booster extra", increaseBoosters: "Aumenta el n\u00famero para a\u00f1adir m\u00e1s boosters", extraBoosterTooltip: "Con esta opci\u00f3n puedes aumentar la cantidad de boosters que se unir\u00e1n a tu pedido en DUO. Cada booster adicional cuesta un 75% m\u00e1s.", playWithBooster: "Jugar con booster", oneBooster: "1 Booster", extraBoosterSuffix: "Booster extra", extraBoosterPlural: "Boosters extra", rpGainLabel: "RP ganados por victoria", serverLabel: "Servidor", extraDiscountUnlocked: "Descuento extra del 3% desbloqueado en tu pedido", extraDiscountAdd: "A\u00f1ade \u00a3{amount} m\u00e1s para ahorrar un 3% extra", extraDiscountLabel: "Descuento extra", totalAmountLabel: "Total", cashbackLabel: "Cashback", checkoutButton: "Pagar", redirectingLabel: "Redirigiendo...", safePaymentsTitle: "Pagos seguros", safePaymentsDesc: "Checkout 100% seguro con Stripe y PayPal", policyAnd: "y", modalTitle: "Por qu\u00e9 somos m\u00e1s baratos", modalSubtitle: "Desglose de precios", modalFeeTitle: "Nuestra comisi\u00f3n", modalFeeDesc: "Los boosters se quedan el 90% de sus ganancias \u2014 est\u00e1n motivados para dar lo mejor en cada pedido.", modalQualityTitle: "Solo boosters de \u00e9lite", modalQualityDesc: "94% de victorias \u00b7 99% a tiempo \u00b7 cada booster valorado y verificado por clientes reales.", modalSavingsTitle: "M\u00e1s baratos que el resto", modalSavingsDesc: "Ahorras \u00a3{amount} en este pedido respecto a otras plataformas \u2014 misma calidad, precio menor.", modalClose: "Cerrar", addOns: { playOffline: { title: "Jugar Offline", desc: addOnDescsByLang.es.playOffline }, express: { title: "Entrega Express", desc: addOnDescsByLang.es.express }, rankInsurance: { title: "Seguro de Rango", desc: addOnDescsByLang.es.rankInsurance }, eliteTier: { title: "Tier Elite 0.01%", desc: addOnDescsByLang.es.eliteTier }, specificOperators: { title: "Operadores Espec\u00edficos", desc: addOnDescsByLang.es.specificOperators }, highKillCount: { title: "Muchas Kills", desc: addOnDescsByLang.es.highKillCount }, vipPriority: { title: "Prioridad VIP", desc: addOnDescsByLang.es.vipPriority }, streaming: { title: "Streaming", desc: addOnDescsByLang.es.streaming }, oneTrickPony: { title: "One Trick Pony", desc: addOnDescsByLang.es.oneTrickPony }, insaneClipDrop: { title: "Clips \u00c9picos", desc: addOnDescsByLang.es.insaneClipDrop } }, trustFeatures: [{ title: "Garant\u00eda de reembolso", desc: englishTrustFeatures[0].desc }, { title: "Protecci\u00f3n anti-ban", desc: englishTrustFeatures[1].desc }, { title: "Precios transparentes", desc: englishTrustFeatures[2].desc }, { title: "Los mejores jugadores", desc: englishTrustFeatures[3].desc }, { title: "Soporte 24/7", desc: englishTrustFeatures[4].desc }] },
    de: { languageMenuTitle: "Sprache w\u00e4hlen", free: "KOSTENLOS", details: "Details", day: "Tag", days: "Tage", customize: "Anpassen", competitorIntro: "Dieser Boost w\u00fcrde dich etwa", competitorSuffix: "mehr auf einer Konkurrenzwebsite kosten.", couponAppliedTitle: "Coupon angewendet", couponAppliedDesc: "Coupon erfolgreich angewendet! Du hast 6% Rabatt erhalten.", couponMissingTitle: "Coupon nicht gefunden", couponMissingDesc: "Coupon nicht gefunden, bitte kontaktiere den Support.", seasonTooltip: "Es ist ratsam, nicht bis zum letzten Moment der Saison zu warten, da die letzten 2-5 Tage st\u00e4rker ausgelastet sind.", extraBooster: "Extra-Booster", increaseBoosters: "Erh\u00f6he die Zahl f\u00fcr mehr Booster", extraBoosterTooltip: "Mit dieser Option kannst du die Anzahl der Booster erh\u00f6hen, die deinem DUO-Auftrag beitreten. Jeder zus\u00e4tzliche Booster kostet 75% extra.", playWithBooster: "Mit Booster spielen", oneBooster: "1 Booster", extraBoosterSuffix: "Extra-Booster", extraBoosterPlural: "Extra-Booster", rpGainLabel: "RP pro Sieg", serverLabel: "Server", extraDiscountUnlocked: "Extra 3% Rabatt f\u00fcr deine Bestellung freigeschaltet", extraDiscountAdd: "F\u00fcge \u00a3{amount} mehr hinzu, um 3% extra zu sparen", extraDiscountLabel: "Extra Rabatt", totalAmountLabel: "Gesamtbetrag", cashbackLabel: "Cashback", checkoutButton: "Zur Kasse", redirectingLabel: "Weiterleiten...", safePaymentsTitle: "Sichere Zahlungen", safePaymentsDesc: "100% sicherer Checkout via Stripe & PayPal", policyAnd: "und", modalTitle: "Warum wir g\u00fcnstiger sind", modalSubtitle: "Preisaufschl\u00fcsselung", modalFeeTitle: "Unsere Plattformgeb\u00fchr", modalFeeDesc: "Booster behalten 90% ihrer Einnahmen \u2014 sie sind motiviert, bei jeder Bestellung ihr Bestes zu geben.", modalQualityTitle: "Nur Elite-Booster", modalQualityDesc: "94% Gewinnrate \u00b7 99% p\u00fcnktlich \u00b7 jeder Booster bewertet und von echten Kunden verifiziert.", modalSavingsTitle: "G\u00fcnstiger als der Rest", modalSavingsDesc: "Du sparst \u00a3{amount} auf diese Bestellung im Vergleich zu anderen Plattformen \u2014 gleiche Qualit\u00e4t, niedrigerer Preis.", modalClose: "Schlie\u00dfen", addOns: { playOffline: { title: "Offline Spielen", desc: addOnDescsByLang.de.playOffline }, express: { title: "Express-Lieferung", desc: addOnDescsByLang.de.express }, rankInsurance: { title: "Rangversicherung", desc: addOnDescsByLang.de.rankInsurance }, eliteTier: { title: "Elite-Tier 0.01%", desc: addOnDescsByLang.de.eliteTier }, specificOperators: { title: "Spezifische Operatoren", desc: addOnDescsByLang.de.specificOperators }, highKillCount: { title: "Hohe Killzahl", desc: addOnDescsByLang.de.highKillCount }, vipPriority: { title: "VIP-Priorit\u00e4t", desc: addOnDescsByLang.de.vipPriority }, streaming: { title: "Streaming", desc: addOnDescsByLang.de.streaming }, oneTrickPony: { title: "One Trick Pony", desc: addOnDescsByLang.de.oneTrickPony }, insaneClipDrop: { title: "Clip-Highlights", desc: addOnDescsByLang.de.insaneClipDrop } }, trustFeatures: [{ title: "Geld-zur\u00fcck-Garantie", desc: englishTrustFeatures[0].desc }, { title: "Zero-Ban-Schutz", desc: englishTrustFeatures[1].desc }, { title: "Faire Preise", desc: englishTrustFeatures[2].desc }, { title: "Die st\u00e4rksten Spieler", desc: englishTrustFeatures[3].desc }, { title: "24/7 Live-Support", desc: englishTrustFeatures[4].desc }] },
    nl: { languageMenuTitle: "Taal kiezen", free: "GRATIS", details: "Details", day: "dag", days: "dagen", customize: "Aanpassen", competitorIntro: "Deze boost zou je ongeveer", competitorSuffix: "meer kosten op een concurrerende website.", couponAppliedTitle: "Coupon toegepast", couponAppliedDesc: "Coupon succesvol toegepast! Je hebt 6% korting gekregen.", couponMissingTitle: "Coupon niet gevonden", couponMissingDesc: "Coupon niet gevonden, neem contact op met support.", seasonTooltip: "Het is verstandig om niet tot het laatste moment van het seizoen te wachten, omdat de laatste 2-5 dagen drukker zijn.", extraBooster: "Extra Booster", increaseBoosters: "Verhoog het aantal om meer boosters toe te voegen", extraBoosterTooltip: "Met deze optie kun je het aantal boosters verhogen dat zich bij je DUO-bestelling aansluit. Elke extra booster kost 75% extra.", playWithBooster: "Speel met booster", oneBooster: "1 Booster", extraBoosterSuffix: "Extra Booster", extraBoosterPlural: "Extra Boosters", rpGainLabel: "RP per overwinning", serverLabel: "Server", extraDiscountUnlocked: "Extra 3% korting ontgrendeld op je bestelling", extraDiscountAdd: "Voeg \u00a3{amount} meer toe om 3% extra te besparen", extraDiscountLabel: "Extra Korting", totalAmountLabel: "Totaalbedrag", cashbackLabel: "Cashback", checkoutButton: "Afrekenen", redirectingLabel: "Doorsturen...", safePaymentsTitle: "Veilige Betalingen", safePaymentsDesc: "100% veilig afrekenen via Stripe & PayPal", policyAnd: "en", modalTitle: "Waarom wij goedkoper zijn", modalSubtitle: "Prijsoverzicht", modalFeeTitle: "Onze platformkosten", modalFeeDesc: "Boosters houden 90% van hun verdiensten \u2014 ze zijn gemotiveerd om bij elke bestelling het beste te leveren.", modalQualityTitle: "Alleen elite-boosters", modalQualityDesc: "94% winratio \u00b7 99% op tijd \u00b7 elke booster beoordeeld en geverifieerd door echte klanten.", modalSavingsTitle: "Goedkoper dan de rest", modalSavingsDesc: "Je bespaart \u00a3{amount} op deze bestelling vs. andere platforms \u2014 zelfde kwaliteit, lagere prijs.", modalClose: "Sluiten", addOns: { playOffline: { title: "Offline Spelen", desc: addOnDescsByLang.nl.playOffline }, express: { title: "Snelle Levering", desc: addOnDescsByLang.nl.express }, rankInsurance: { title: "Rankverzekering", desc: addOnDescsByLang.nl.rankInsurance }, eliteTier: { title: "Elite 0.01% Tier", desc: addOnDescsByLang.nl.eliteTier }, specificOperators: { title: "Specifieke Operators", desc: addOnDescsByLang.nl.specificOperators }, highKillCount: { title: "Hoge Kill Count", desc: addOnDescsByLang.nl.highKillCount }, vipPriority: { title: "VIP Prioriteit", desc: addOnDescsByLang.nl.vipPriority }, streaming: { title: "Streaming", desc: addOnDescsByLang.nl.streaming }, oneTrickPony: { title: "One Trick Pony", desc: addOnDescsByLang.nl.oneTrickPony }, insaneClipDrop: { title: "Clip Highlights", desc: addOnDescsByLang.nl.insaneClipDrop } }, trustFeatures: [{ title: "Geld-terug-garantie", desc: englishTrustFeatures[0].desc }, { title: "Zero-ban-bescherming", desc: englishTrustFeatures[1].desc }, { title: "Eerlijke prijzen", desc: englishTrustFeatures[2].desc }, { title: "De sterkste spelers", desc: englishTrustFeatures[3].desc }, { title: "24/7 live support", desc: englishTrustFeatures[4].desc }] },
    pt: { languageMenuTitle: "Selecionar idioma", free: "GR\u00c1TIS", details: "Detalhes", day: "dia", days: "dias", customize: "Personalizar", competitorIntro: "Este boost custaria cerca de", competitorSuffix: "a mais num site concorrente.", couponAppliedTitle: "Cupom aplicado", couponAppliedDesc: "Cupom aplicado com sucesso! Voc\u00ea recebeu 6% de desconto.", couponMissingTitle: "Cupom n\u00e3o encontrado", couponMissingDesc: "Cupom n\u00e3o encontrado, entre em contato com o suporte.", seasonTooltip: "\u00c9 recomend\u00e1vel n\u00e3o esperar at\u00e9 o \u00faltimo momento da temporada para pedir boosting, porque os \u00faltimos 2-5 dias ficam mais cheios.", extraBooster: "Booster extra", increaseBoosters: "Aumente o n\u00famero para adicionar mais boosters", extraBoosterTooltip: "Com esta op\u00e7\u00e3o voc\u00ea pode aumentar a quantidade de boosters que entrar\u00e3o no seu pedido em DUO. Cada booster adicional custa 75% a mais.", playWithBooster: "Jogar com booster", oneBooster: "1 Booster", extraBoosterSuffix: "Booster extra", extraBoosterPlural: "Boosters extras", rpGainLabel: "RP ganhos por vit\u00f3ria", serverLabel: "Servidor", extraDiscountUnlocked: "Desconto extra de 3% desbloqueado no seu pedido", extraDiscountAdd: "Adicione \u00a3{amount} para economizar mais 3%", extraDiscountLabel: "Desconto Extra", totalAmountLabel: "Valor Total", cashbackLabel: "Cashback", checkoutButton: "Finalizar compra", redirectingLabel: "Redirecionando...", safePaymentsTitle: "Pagamentos Seguros", safePaymentsDesc: "Checkout 100% seguro via Stripe e PayPal", policyAnd: "e", modalTitle: "Por que somos mais baratos", modalSubtitle: "Detalhes do pre\u00e7o", modalFeeTitle: "Nossa taxa de plataforma", modalFeeDesc: "Os boosters ficam com 90% dos ganhos \u2014 eles s\u00e3o motivados a dar o melhor em cada pedido.", modalQualityTitle: "Apenas boosters de elite", modalQualityDesc: "94% de vit\u00f3rias \u00b7 99% no prazo \u00b7 cada booster avaliado e verificado por clientes reais.", modalSavingsTitle: "Mais barato que os demais", modalSavingsDesc: "Voc\u00ea economiza \u00a3{amount} neste pedido vs. outras plataformas \u2014 mesma qualidade, pre\u00e7o menor.", modalClose: "Fechar", addOns: { playOffline: { title: "Jogar Offline", desc: addOnDescsByLang.pt.playOffline }, express: { title: "Entrega Expressa", desc: addOnDescsByLang.pt.express }, rankInsurance: { title: "Seguro de Rank", desc: addOnDescsByLang.pt.rankInsurance }, eliteTier: { title: "Tier Elite 0.01%", desc: addOnDescsByLang.pt.eliteTier }, specificOperators: { title: "Operadores Espec\u00edficos", desc: addOnDescsByLang.pt.specificOperators }, highKillCount: { title: "Muitas Kills", desc: addOnDescsByLang.pt.highKillCount }, vipPriority: { title: "Prioridade VIP", desc: addOnDescsByLang.pt.vipPriority }, streaming: { title: "Streaming", desc: addOnDescsByLang.pt.streaming }, oneTrickPony: { title: "One Trick Pony", desc: addOnDescsByLang.pt.oneTrickPony }, insaneClipDrop: { title: "Clipes \u00c9picos", desc: addOnDescsByLang.pt.insaneClipDrop } }, trustFeatures: [{ title: "Garantia de reembolso", desc: englishTrustFeatures[0].desc }, { title: "Prote\u00e7\u00e3o anti-ban", desc: englishTrustFeatures[1].desc }, { title: "Pre\u00e7os transparentes", desc: englishTrustFeatures[2].desc }, { title: "Os jogadores mais fortes", desc: englishTrustFeatures[3].desc }, { title: "Suporte 24/7", desc: englishTrustFeatures[4].desc }] },
    uk: { languageMenuTitle: "\u041e\u0431\u0435\u0440\u0456\u0442\u044c \u043c\u043e\u0432\u0443", free: "\u0411\u0415\u0417\u041a\u041e\u0428\u0422\u041e\u0412\u041d\u041e", details: "\u0414\u0435\u0442\u0430\u043b\u0456", day: "\u0434\u0435\u043d\u044c", days: "\u0434\u043d\u0456", customize: "\u041d\u0430\u043b\u0430\u0448\u0442\u0443\u0432\u0430\u043d\u043d\u044f", competitorIntro: "\u0426\u0435\u0439 \u0431\u0443\u0441\u0442 \u043a\u043e\u0448\u0442\u0443\u0432\u0430\u0432 \u0431\u0438 \u043f\u0440\u0438\u0431\u043b\u0438\u0437\u043d\u043e", competitorSuffix: "\u0431\u0456\u043b\u044c\u0448\u0435 \u043d\u0430 \u0441\u0430\u0439\u0442\u0456 \u043a\u043e\u043d\u043a\u0443\u0440\u0435\u043d\u0442\u0430.", couponAppliedTitle: "\u041a\u0443\u043f\u043e\u043d \u0437\u0430\u0441\u0442\u043e\u0441\u043e\u0432\u0430\u043d\u043e", couponAppliedDesc: "\u041a\u0443\u043f\u043e\u043d \u0443\u0441\u043f\u0456\u0448\u043d\u043e \u0437\u0430\u0441\u0442\u043e\u0441\u043e\u0432\u0430\u043d\u043e! \u0412\u0438 \u043e\u0442\u0440\u0438\u043c\u0430\u043b\u0438 \u0437\u043d\u0438\u0436\u043a\u0443 6%.", couponMissingTitle: "\u041a\u0443\u043f\u043e\u043d \u043d\u0435 \u0437\u043d\u0430\u0439\u0434\u0435\u043d\u043e", couponMissingDesc: "\u041a\u0443\u043f\u043e\u043d \u043d\u0435 \u0437\u043d\u0430\u0439\u0434\u0435\u043d\u043e, \u0437\u0432\u0435\u0440\u043d\u0456\u0442\u044c\u0441\u044f \u0434\u043e \u043f\u0456\u0434\u0442\u0440\u0438\u043c\u043a\u0438.", seasonTooltip: "\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0443\u0454\u043c\u043e \u043d\u0435 \u0447\u0435\u043a\u0430\u0442\u0438 \u0434\u043e \u043e\u0441\u0442\u0430\u043d\u043d\u044c\u043e\u0433\u043e \u043c\u043e\u043c\u0435\u043d\u0442\u0443 \u0441\u0435\u0437\u043e\u043d\u0443, \u0430\u0434\u0436\u0435 \u043e\u0441\u0442\u0430\u043d\u043d\u0456 2-5 \u0434\u043d\u0456\u0432 \u0437\u0430\u0437\u0432\u0438\u0447\u0430\u0439 \u0431\u0456\u043b\u044c\u0448 \u0437\u0430\u0432\u0430\u043d\u0442\u0430\u0436\u0435\u043d\u0456.", extraBooster: "\u0414\u043e\u0434\u0430\u0442\u043a\u043e\u0432\u0438\u0439 \u0431\u0443\u0441\u0442\u0435\u0440", increaseBoosters: "\u0417\u0431\u0456\u043b\u044c\u0448\u0442\u0435 \u0447\u0438\u0441\u043b\u043e, \u0449\u043e\u0431 \u0434\u043e\u0434\u0430\u0442\u0438 \u0431\u0456\u043b\u044c\u0448\u0435 \u0431\u0443\u0441\u0442\u0435\u0440\u0456\u0432", extraBoosterTooltip: "\u0426\u044f \u043e\u043f\u0446\u0456\u044f \u0434\u043e\u0437\u0432\u043e\u043b\u044f\u0454 \u0437\u0431\u0456\u043b\u044c\u0448\u0438\u0442\u0438 \u043a\u0456\u043b\u044c\u043a\u0456\u0441\u0442\u044c \u0431\u0443\u0441\u0442\u0435\u0440\u0456\u0432, \u044f\u043a\u0456 \u043f\u0440\u0438\u0454\u0434\u043d\u0430\u044e\u0442\u044c\u0441\u044f \u0434\u043e \u0432\u0430\u0448\u043e\u0433\u043e \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f \u0432 DUO. \u041a\u043e\u0436\u0435\u043d \u0434\u043e\u0434\u0430\u0442\u043a\u043e\u0432\u0438\u0439 \u0431\u0443\u0441\u0442\u0435\u0440 \u043a\u043e\u0448\u0442\u0443\u0454 \u043d\u0430 75% \u0431\u0456\u043b\u044c\u0448\u0435.", playWithBooster: "\u0413\u0440\u0430\u0442\u0438 \u0437 \u0431\u0443\u0441\u0442\u0435\u0440\u043e\u043c", oneBooster: "1 \u0411\u0443\u0441\u0442\u0435\u0440", extraBoosterSuffix: "\u0414\u043e\u0434\u0430\u0442\u043a\u043e\u0432\u0438\u0439 \u0431\u0443\u0441\u0442\u0435\u0440", extraBoosterPlural: "\u0414\u043e\u0434\u0430\u0442\u043a\u043e\u0432\u0456 \u0431\u0443\u0441\u0442\u0435\u0440\u0438", rpGainLabel: "RP \u0437\u0430 \u043f\u0435\u0440\u0435\u043c\u043e\u0433\u0443", serverLabel: "\u0421\u0435\u0440\u0432\u0435\u0440", extraDiscountUnlocked: "\u0414\u043e\u0434\u0430\u0442\u043a\u043e\u0432\u0430 \u0437\u043d\u0438\u0436\u043a\u0430 3% \u0440\u043e\u0437\u0431\u043b\u043e\u043a\u043e\u0432\u0430\u043d\u0430", extraDiscountAdd: "\u0414\u043e\u0434\u0430\u0439\u0442\u0435 \u00a3{amount} \u0431\u0456\u043b\u044c\u0448\u0435, \u0449\u043e\u0431 \u0437\u0430\u043e\u0449\u0430\u0434\u0438\u0442\u0438 \u0434\u043e\u0434\u0430\u0442\u043a\u043e\u0432\u0456 3%", extraDiscountLabel: "\u0414\u043e\u0434\u0430\u0442\u043a\u043e\u0432\u0430 \u0437\u043d\u0438\u0436\u043a\u0430", totalAmountLabel: "\u0417\u0430\u0433\u0430\u043b\u044c\u043d\u0430 \u0441\u0443\u043c\u0430", cashbackLabel: "\u041a\u0435\u0448\u0431\u0435\u043a", checkoutButton: "\u041e\u0444\u043e\u0440\u043c\u0438\u0442\u0438 \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f", redirectingLabel: "\u041f\u0435\u0440\u0435\u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043d\u044f...", safePaymentsTitle: "\u0411\u0435\u0437\u043f\u0435\u0447\u043d\u0456 \u043f\u043b\u0430\u0442\u0435\u0436\u0456", safePaymentsDesc: "100% \u0431\u0435\u0437\u043f\u0435\u0447\u043d\u0430 \u043e\u043f\u043b\u0430\u0442\u0430 \u0447\u0435\u0440\u0435\u0437 Stripe \u0456 PayPal", policyAnd: "\u0442\u0430", modalTitle: "\u0427\u043e\u043c\u0443 \u043c\u0438 \u0434\u0435\u0448\u0435\u0432\u0448\u0456", modalSubtitle: "\u0414\u0435\u0442\u0430\u043b\u0456 \u0446\u0456\u043d\u0438", modalFeeTitle: "\u041d\u0430\u0448\u0430 \u043a\u043e\u043c\u0456\u0441\u0456\u044f", modalFeeDesc: "\u0411\u0443\u0441\u0442\u0435\u0440\u0438 \u043e\u0442\u0440\u0438\u043c\u0443\u044e\u0442\u044c 90% \u0437\u0430\u0440\u043e\u0431\u0456\u0442\u043a\u0443 \u2014 \u0432\u043e\u043d\u0438 \u043c\u043e\u0442\u0438\u0432\u043e\u0432\u0430\u043d\u0456 \u0432\u0456\u0434\u0434\u0430\u0432\u0430\u0442\u0438 \u043d\u0430\u0439\u043a\u0440\u0430\u0449\u0435 \u0437 \u043a\u043e\u0436\u043d\u0438\u043c \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u044f\u043c.", modalQualityTitle: "\u0422\u0456\u043b\u044c\u043a\u0438 \u0435\u043b\u0456\u0442\u043d\u0456 \u0431\u0443\u0441\u0442\u0435\u0440\u0438", modalQualityDesc: "94% \u043f\u0435\u0440\u0435\u043c\u043e\u0433 \u00b7 99% \u0432\u0447\u0430\u0441\u043d\u043e \u00b7 \u043a\u043e\u0436\u0435\u043d \u0431\u0443\u0441\u0442\u0435\u0440 \u043e\u0446\u0456\u043d\u0435\u043d\u0438\u0439 \u0456 \u043f\u0435\u0440\u0435\u0432\u0456\u0440\u0435\u043d\u0438\u0439 \u0440\u0435\u0430\u043b\u044c\u043d\u0438\u043c\u0438 \u043a\u043b\u0456\u0454\u043d\u0442\u0430\u043c\u0438.", modalSavingsTitle: "\u0414\u0435\u0448\u0435\u0432\u0448\u0435 \u0437\u0430 \u0456\u043d\u0448\u0438\u0445", modalSavingsDesc: "\u0412\u0438 \u0435\u043a\u043e\u043d\u043e\u043c\u0438\u0442\u0435 \u00a3{amount} \u043d\u0430 \u0446\u044c\u043e\u043c\u0443 \u0437\u0430\u043c\u043e\u0432\u043b\u0435\u043d\u043d\u0456 \u043f\u043e\u0440\u0456\u0432\u043d\u044f\u043d\u043e \u0437 \u0456\u043d\u0448\u0438\u043c\u0438 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0430\u043c\u0438 \u2014 \u0442\u0430 \u0441\u0430\u043c\u0430 \u044f\u043a\u0456\u0441\u0442\u044c, \u043d\u0438\u0436\u0447\u0430 \u0446\u0456\u043d\u0430.", modalClose: "\u0417\u0430\u043a\u0440\u0438\u0442\u0438", addOns: { playOffline: { title: "\u0413\u0440\u0430\u0442\u0438 \u043e\u0444\u043b\u0430\u0439\u043d", desc: addOnDescsByLang.uk.playOffline }, express: { title: "\u0415\u043a\u0441\u043f\u0440\u0435\u0441-\u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0430", desc: addOnDescsByLang.uk.express }, rankInsurance: { title: "\u0421\u0442\u0440\u0430\u0445\u0443\u0432\u0430\u043d\u043d\u044f \u0440\u0430\u043d\u0433\u0443", desc: addOnDescsByLang.uk.rankInsurance }, eliteTier: { title: "\u0415\u043b\u0456\u0442\u043d\u0438\u0439 Tier 0.01%", desc: addOnDescsByLang.uk.eliteTier }, specificOperators: { title: "\u041a\u043e\u043d\u043a\u0440\u0435\u0442\u043d\u0456 \u043e\u043f\u0435\u0440\u0430\u0442\u043e\u0440\u0438", desc: addOnDescsByLang.uk.specificOperators }, highKillCount: { title: "\u0411\u0430\u0433\u0430\u0442\u043e \u0432\u0431\u0438\u0432\u0441\u0442\u0432", desc: addOnDescsByLang.uk.highKillCount }, vipPriority: { title: "VIP-\u043f\u0440\u0456\u043e\u0440\u0438\u0442\u0435\u0442", desc: addOnDescsByLang.uk.vipPriority }, streaming: { title: "\u0421\u0442\u0440\u0456\u043c", desc: addOnDescsByLang.uk.streaming }, oneTrickPony: { title: "One Trick Pony", desc: addOnDescsByLang.uk.oneTrickPony }, insaneClipDrop: { title: "\u0415\u043f\u0456\u0447\u043d\u0456 \u043a\u043b\u0456\u043f\u0438", desc: addOnDescsByLang.uk.insaneClipDrop } }, trustFeatures: [{ title: "\u0413\u0430\u0440\u0430\u043d\u0442\u0456\u044f \u043f\u043e\u0432\u0435\u0440\u043d\u0435\u043d\u043d\u044f", desc: englishTrustFeatures[0].desc }, { title: "\u0417\u0430\u0445\u0438\u0441\u0442 \u0432\u0456\u0434 \u0431\u0430\u043d\u0443", desc: englishTrustFeatures[1].desc }, { title: "\u041f\u0440\u043e\u0437\u043e\u0440\u0456 \u0446\u0456\u043d\u0438", desc: englishTrustFeatures[2].desc }, { title: "\u041d\u0430\u0439\u0441\u0438\u043b\u044c\u043d\u0456\u0448\u0456 \u0433\u0440\u0430\u0432\u0446\u0456", desc: englishTrustFeatures[3].desc }, { title: "\u041f\u0456\u0434\u0442\u0440\u0438\u043c\u043a\u0430 24/7", desc: englishTrustFeatures[4].desc }] },
    ru: { languageMenuTitle: "\u0412\u044b\u0431\u0435\u0440\u0438\u0442\u0435 \u044f\u0437\u044b\u043a", free: "\u0411\u0415\u0421\u041f\u041b\u0410\u0422\u041d\u041e", details: "\u041f\u043e\u0434\u0440\u043e\u0431\u043d\u0435\u0435", day: "\u0434\u0435\u043d\u044c", days: "\u0434\u043d\u0435\u0439", customize: "\u041d\u0430\u0441\u0442\u0440\u043e\u0438\u0442\u044c", competitorIntro: "\u042d\u0442\u043e\u0442 \u0431\u0443\u0441\u0442 \u043e\u0431\u043e\u0448\u0451\u043b\u0441\u044f \u0431\u044b \u043f\u0440\u0438\u043c\u0435\u0440\u043d\u043e \u043d\u0430", competitorSuffix: "\u0434\u043e\u0440\u043e\u0436\u0435 \u043d\u0430 \u0441\u0430\u0439\u0442\u0435 \u043a\u043e\u043d\u043a\u0443\u0440\u0435\u043d\u0442\u0430.", couponAppliedTitle: "\u041a\u0443\u043f\u043e\u043d \u043f\u0440\u0438\u043c\u0435\u043d\u0435\u043d", couponAppliedDesc: "\u041a\u0443\u043f\u043e\u043d \u0443\u0441\u043f\u0435\u0448\u043d\u043e \u043f\u0440\u0438\u043c\u0435\u043d\u0435\u043d! \u0412\u044b \u043f\u043e\u043b\u0443\u0447\u0438\u043b\u0438 \u0441\u043a\u0438\u0434\u043a\u0443 6%.", couponMissingTitle: "\u041a\u0443\u043f\u043e\u043d \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d", couponMissingDesc: "\u041a\u0443\u043f\u043e\u043d \u043d\u0435 \u043d\u0430\u0439\u0434\u0435\u043d, \u043e\u0431\u0440\u0430\u0442\u0438\u0442\u0435\u0441\u044c \u0432 \u043f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0443.", seasonTooltip: "\u0420\u0435\u043a\u043e\u043c\u0435\u043d\u0434\u0443\u0435\u043c \u043d\u0435 \u0436\u0434\u0430\u0442\u044c \u0434\u043e \u0441\u0430\u043c\u043e\u0433\u043e \u043a\u043e\u043d\u0446\u0430 \u0441\u0435\u0437\u043e\u043d\u0430, \u043f\u043e\u0442\u043e\u043c\u0443 \u0447\u0442\u043e \u043f\u043e\u0441\u043b\u0435\u0434\u043d\u0438\u0435 2-5 \u0434\u043d\u0435\u0439 \u043e\u0431\u044b\u0447\u043d\u043e \u0431\u043e\u043b\u0435\u0435 \u0437\u0430\u0433\u0440\u0443\u0436\u0435\u043d\u044b.", extraBooster: "\u0414\u043e\u043f. \u0431\u0443\u0441\u0442\u0435\u0440", increaseBoosters: "\u0423\u0432\u0435\u043b\u0438\u0447\u044c\u0442\u0435 \u0447\u0438\u0441\u043b\u043e, \u0447\u0442\u043e\u0431\u044b \u0434\u043e\u0431\u0430\u0432\u0438\u0442\u044c \u0431\u043e\u043b\u044c\u0448\u0435 \u0431\u0443\u0441\u0442\u0435\u0440\u043e\u0432", extraBoosterTooltip: "\u0421 \u044d\u0442\u043e\u0439 \u043e\u043f\u0446\u0438\u0435\u0439 \u0432\u044b \u043c\u043e\u0436\u0435\u0442\u0435 \u0443\u0432\u0435\u043b\u0438\u0447\u0438\u0442\u044c \u043a\u043e\u043b\u0438\u0447\u0435\u0441\u0442\u0432\u043e \u0431\u0443\u0441\u0442\u0435\u0440\u043e\u0432, \u043a\u043e\u0442\u043e\u0440\u044b\u0435 \u043f\u0440\u0438\u0441\u043e\u0435\u0434\u0438\u043d\u044f\u0442\u0441\u044f \u043a \u0432\u0430\u0448\u0435\u043c\u0443 \u0437\u0430\u043a\u0430\u0437\u0443 \u0432 DUO. \u041a\u0430\u0436\u0434\u044b\u0439 \u0434\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u044b\u0439 \u0431\u0443\u0441\u0442\u0435\u0440 \u0441\u0442\u043e\u0438\u0442 \u043d\u0430 75% \u0434\u043e\u0440\u043e\u0436\u0435.", playWithBooster: "\u0418\u0433\u0440\u0430\u0442\u044c \u0441 \u0431\u0443\u0441\u0442\u0435\u0440\u043e\u043c", oneBooster: "1 \u0411\u0443\u0441\u0442\u0435\u0440", extraBoosterSuffix: "\u0414\u043e\u043f. \u0431\u0443\u0441\u0442\u0435\u0440", extraBoosterPlural: "\u0414\u043e\u043f. \u0431\u0443\u0441\u0442\u0435\u0440\u044b", rpGainLabel: "RP \u0437\u0430 \u043f\u043e\u0431\u0435\u0434\u0443", serverLabel: "\u0421\u0435\u0440\u0432\u0435\u0440", extraDiscountUnlocked: "\u0414\u043e\u043f\u043e\u043b\u043d\u0438\u0442\u0435\u043b\u044c\u043d\u0430\u044f \u0441\u043a\u0438\u0434\u043a\u0430 3% \u0440\u0430\u0437\u0431\u043b\u043e\u043a\u0438\u0440\u043e\u0432\u0430\u043d\u0430", extraDiscountAdd: "\u0414\u043e\u0431\u0430\u0432\u044c\u0442\u0435 \u00a3{amount} \u0447\u0442\u043e\u0431\u044b \u0441\u044d\u043a\u043e\u043d\u043e\u043c\u0438\u0442\u044c \u0434\u043e\u043f. 3%", extraDiscountLabel: "\u0414\u043e\u043f. \u0441\u043a\u0438\u0434\u043a\u0430", totalAmountLabel: "\u0418\u0442\u043e\u0433\u043e", cashbackLabel: "\u041a\u044d\u0448\u0431\u044d\u043a", checkoutButton: "\u041e\u0444\u043e\u0440\u043c\u0438\u0442\u044c \u0437\u0430\u043a\u0430\u0437", redirectingLabel: "\u041f\u0435\u0440\u0435\u043d\u0430\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u0438\u0435...", safePaymentsTitle: "\u0411\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u044b\u0435 \u043f\u043b\u0430\u0442\u0435\u0436\u0438", safePaymentsDesc: "100% \u0431\u0435\u0437\u043e\u043f\u0430\u0441\u043d\u0430\u044f \u043e\u043f\u043b\u0430\u0442\u0430 \u0447\u0435\u0440\u0435\u0437 Stripe \u0438 PayPal", policyAnd: "\u0438", modalTitle: "\u041f\u043e\u0447\u0435\u043c\u0443 \u043c\u044b \u0434\u0435\u0448\u0435\u0432\u043b\u0435", modalSubtitle: "\u0414\u0435\u0442\u0430\u043b\u0438 \u0446\u0435\u043d\u044b", modalFeeTitle: "\u041d\u0430\u0448\u0430 \u043a\u043e\u043c\u0438\u0441\u0441\u0438\u044f", modalFeeDesc: "\u0411\u0443\u0441\u0442\u0435\u0440\u044b \u043f\u043e\u043b\u0443\u0447\u0430\u044e\u0442 90% \u0437\u0430\u0440\u0430\u0431\u043e\u0442\u043a\u0430 \u2014 \u043e\u043d\u0438 \u043c\u043e\u0442\u0438\u0432\u0438\u0440\u043e\u0432\u0430\u043d\u044b \u0434\u0430\u0432\u0430\u0442\u044c \u043b\u0443\u0447\u0448\u0435\u0435 \u0441 \u043a\u0430\u0436\u0434\u044b\u043c \u0437\u0430\u043a\u0430\u0437\u043e\u043c.", modalQualityTitle: "\u0422\u043e\u043b\u044c\u043a\u043e \u044d\u043b\u0438\u0442\u043d\u044b\u0435 \u0431\u0443\u0441\u0442\u0435\u0440\u044b", modalQualityDesc: "94% \u043f\u043e\u0431\u0435\u0434 \u00b7 99% \u0432\u043e\u0432\u0440\u0435\u043c\u044f \u00b7 \u043a\u0430\u0436\u0434\u044b\u0439 \u0431\u0443\u0441\u0442\u0435\u0440 \u043e\u0446\u0435\u043d\u0451\u043d \u0438 \u043f\u0440\u043e\u0432\u0435\u0440\u0435\u043d \u0440\u0435\u0430\u043b\u044c\u043d\u044b\u043c\u0438 \u043a\u043b\u0438\u0435\u043d\u0442\u0430\u043c\u0438.", modalSavingsTitle: "\u0414\u0435\u0448\u0435\u0432\u043b\u0435 \u043e\u0441\u0442\u0430\u043b\u044c\u043d\u044b\u0445", modalSavingsDesc: "\u0412\u044b \u044d\u043a\u043e\u043d\u043e\u043c\u0438\u0442\u0435 \u00a3{amount} \u043d\u0430 \u044d\u0442\u043e\u043c \u0437\u0430\u043a\u0430\u0437\u0435 \u043f\u043e \u0441\u0440\u0430\u0432\u043d\u0435\u043d\u0438\u044e \u0441 \u0434\u0440\u0443\u0433\u0438\u043c\u0438 \u043f\u043b\u0430\u0442\u0444\u043e\u0440\u043c\u0430\u043c\u0438 \u2014 \u0442\u043e \u0436\u0435 \u043a\u0430\u0447\u0435\u0441\u0442\u0432\u043e, \u043d\u0438\u0436\u0435 \u0446\u0435\u043d\u0430.", modalClose: "\u0417\u0430\u043a\u0440\u044b\u0442\u044c", addOns: { playOffline: { title: "\u0418\u0433\u0440\u0430\u0442\u044c \u043e\u0444\u043b\u0430\u0439\u043d", desc: addOnDescsByLang.ru.playOffline }, express: { title: "\u042d\u043a\u0441\u043f\u0440\u0435\u0441\u0441-\u0434\u043e\u0441\u0442\u0430\u0432\u043a\u0430", desc: addOnDescsByLang.ru.express }, rankInsurance: { title: "\u0421\u0442\u0440\u0430\u0445\u043e\u0432\u043a\u0430 \u0440\u0430\u043d\u0433\u0430", desc: addOnDescsByLang.ru.rankInsurance }, eliteTier: { title: "\u042d\u043b\u0438\u0442\u043d\u044b\u0439 Tier 0.01%", desc: addOnDescsByLang.ru.eliteTier }, specificOperators: { title: "\u041a\u043e\u043d\u043a\u0440\u0435\u0442\u043d\u044b\u0435 \u043e\u043f\u0435\u0440\u0430\u0442\u043e\u0440\u044b", desc: addOnDescsByLang.ru.specificOperators }, highKillCount: { title: "\u0412\u044b\u0441\u043e\u043a\u0438\u0439 K/D", desc: addOnDescsByLang.ru.highKillCount }, vipPriority: { title: "VIP-\u043f\u0440\u0438\u043e\u0440\u0438\u0442\u0435\u0442", desc: addOnDescsByLang.ru.vipPriority }, streaming: { title: "\u0421\u0442\u0440\u0438\u043c", desc: addOnDescsByLang.ru.streaming }, oneTrickPony: { title: "One Trick Pony", desc: addOnDescsByLang.ru.oneTrickPony }, insaneClipDrop: { title: "\u042d\u043f\u0438\u0447\u043d\u044b\u0435 \u043a\u043b\u0438\u043f\u044b", desc: addOnDescsByLang.ru.insaneClipDrop } }, trustFeatures: [{ title: "\u0413\u0430\u0440\u0430\u043d\u0442\u0438\u044f \u0432\u043e\u0437\u0432\u0440\u0430\u0442\u0430", desc: englishTrustFeatures[0].desc }, { title: "\u0417\u0430\u0449\u0438\u0442\u0430 \u043e\u0442 \u0431\u0430\u043d\u0430", desc: englishTrustFeatures[1].desc }, { title: "\u041f\u0440\u043e\u0437\u0440\u0430\u0447\u043d\u044b\u0435 \u0446\u0435\u043d\u044b", desc: englishTrustFeatures[2].desc }, { title: "\u0421\u0438\u043b\u044c\u043d\u0435\u0439\u0448\u0438\u0435 \u0438\u0433\u0440\u043e\u043a\u0438", desc: englishTrustFeatures[3].desc }, { title: "\u041f\u043e\u0434\u0434\u0435\u0440\u0436\u043a\u0430 24/7", desc: englishTrustFeatures[4].desc }] },
  } as const;
  const ui = { ...localizedUi.en, ...(localizedUi[selectedLang as keyof typeof localizedUi] ?? {}) };
  const annotations = { ...localizedAnnotations.en, ...(localizedAnnotations[selectedLang as keyof typeof localizedAnnotations] ?? {}) };
  const trustCopy = {
    heading: ui.trustHeading,
    features: [...(annotations.trustFeatures ?? localizedAnnotations.en.trustFeatures)],
  };
  const faqAnswers = faqAnswersByLang[selectedLang] ?? faqAnswersByLang.en;
  const faqCopy = {
    label: ui.faqLabel,
    items: [
      {
        q: selectedLang === "en" ? "What is Rainbow Six Siege Boosting?" : ui.heroTitle,
        a: faqAnswers[0],
      },
      {
        q: selectedLang === "en" ? "Do I need to share my account for a Rainbow Six Siege Rank Boost?" : ui.specificBooster,
        a: faqAnswers[1],
      },
      {
        q: selectedLang === "en" ? "Will you speak to my friends/use voice chat?" : ui.contact,
        a: faqAnswers[2],
      },
      {
        q: selectedLang === "en" ? "How much time it takes to deliver my Rank Boost?" : ui.policyTitle,
        a: faqAnswers[3],
      },
      {
        q: selectedLang === "en" ? "Is Rainbow Six Siege Boosting safe?" : ui.badges[2],
        a: faqAnswers[4],
      },
    ],
  };
  const competitorSavings = total * 0.35;

  const handleCheckout = async () => {
    if (!hasValidRankPath) {
      setToastType("error");
      setToastMessage("Select a desired rank above your current rank.");
      return;
    }

    setCheckoutLoading(true);
    try {
      const checkoutUrl = await createCheckoutSession(order, currency);
      window.location.assign(checkoutUrl);
    } catch (error) {
      setToastType("error");
      setToastMessage(getCheckoutErrorMessage(error));
      setCheckoutLoading(false);
      window.setTimeout(() => setToastMessage(null), 5000);
    }
  };

  return (
    <div className="service-configurator relative min-h-screen bg-[var(--background)] font-sans text-[var(--foreground)]">
      {toastMessage && (
        <div
          role={toastType === "error" ? "alert" : "status"}
          aria-live="polite"
          className="theme-popover fixed right-4 top-[calc(var(--header-height)+16px)] z-[var(--z-toast)] flex max-w-sm items-start gap-3 rounded-lg border px-4 py-3"
        >
          <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md ${
            toastType === "success"
              ? "bg-[var(--success-surface)] text-[var(--success)]"
              : "bg-[var(--danger-surface)] text-[var(--danger)]"
          }`}>
            {toastType === "success" ? (
              <Check aria-hidden="true" className="h-4 w-4" strokeWidth={2.5} />
            ) : (
              <span className="text-sm font-bold">!</span>
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-semibold">{toastType === "success" ? annotations.couponAppliedTitle : annotations.couponMissingTitle}</p>
            <p className="text-xs text-[var(--muted)]">{toastMessage}</p>
          </div>
          <button type="button" aria-label="Dismiss notification" onClick={() => setToastMessage(null)} className="text-[var(--muted)] transition hover:text-[var(--foreground)]">
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      )}
      <div className="relative mx-auto max-w-[1280px] px-5 py-10 sm:px-7 lg:px-10">
        <header className="mb-8 max-w-4xl">
          <p className="mb-3 text-xs font-semibold uppercase text-[var(--muted)]">Rainbow Six Siege</p>
          <h1 className="text-3xl font-semibold sm:text-4xl">
            {ui.heroTitle}
          </h1>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">
            Choose your current rank and target. Your price and delivery estimate update instantly.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3 text-sm text-[var(--muted)]">
            {[
              { text: ui.badges[2], Icon: ShieldCheck },
              { text: ui.badges[1], Icon: LockKeyhole },
              { text: ui.badges[3], Icon: Headphones },
              { text: "Fast delivery", Icon: Clock3 },
            ].map(({ text, Icon }) => (
              <span key={text} className="flex items-center gap-2">
                <Icon aria-hidden="true" className="h-4 w-4" />
                {text}
              </span>
            ))}
          </div>
        </header>

        <div className="grid min-w-0 gap-6 xl:grid-cols-[minmax(0,1fr)_380px]">
          <main className="min-w-0 space-y-7">

            <div className="grid gap-6 xl:grid-cols-2">
              <section
                className="relative overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5"
              >
                <div className="relative z-10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="w-full flex flex-col items-start">
                    {currentRankData && (
                      <Image
                        src={currentRankData.icon}
                        alt={currentRankData.name}
                        width={56}
                        height={56}
                        className="mb-2 h-auto w-14"
                      />
                    )}
                    <h2 className="text-lg font-semibold text-[var(--foreground)]">{ui.currentRank}</h2>
                    <p className="mt-1 text-sm font-semibold" style={{ color: rankTextColors[currentRank] }}>
                      {currentRank} {currentDivision}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {ranks.map((rank) => (
                    <button
                      key={rank.name}
                      type="button"
                      aria-label={`Set current rank to ${rank.name}`}
                      aria-pressed={currentRank === rank.name}
                      onClick={() => handleCurrentRankChange(rank.name)}
                      className={`${rankCard(currentRank === rank.name, false)} aspect-square flex items-center justify-center`}
                    >
                      <div className="flex flex-col items-center justify-center">
                        <Image
                          src={rank.icon}
                          alt={rank.name}
                          width={38}
                          height={38}
                          className="mx-auto h-auto w-[38px] object-contain"
                        />
                      </div>
                    </button>
                  ))}
                </div>

                <RankDivisionSelector
                  divisions={divisions}
                  value={currentDivision}
                  accent={rankTextColors[currentRank]}
                  onChange={handleCurrentDivisionChange}
                  ariaLabel={`${ui.currentRank} division`}
                  className="mt-4"
                />
                </div>
              </section>

              <section
                className="relative overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5"
              >
                <div className="relative z-10">
                <div className="mb-4 flex items-center gap-3">
                  <div className="w-full flex flex-col items-start">
                    {desiredRankData && (
                      <Image
                        src={desiredRankData.icon}
                        alt={desiredRankData.name}
                        width={56}
                        height={56}
                        className="mb-2 h-auto w-14"
                      />
                    )}
                    <h2 className="text-lg font-semibold text-[var(--foreground)]">{ui.desiredRank}</h2>
                    <p className="mt-1 text-sm font-semibold" style={{ color: rankTextColors[desiredRank] }}>
                      {desiredRank} {desiredDivision}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-3">
                  {ranks.map((rank) => {
                    const disabled = isDesiredRankDisabled(rank.name);
                    return (
                      <button
                        key={rank.name}
                        type="button"
                        aria-label={`Set desired rank to ${rank.name}`}
                        aria-pressed={desiredRank === rank.name && !disabled}
                        onClick={() => !disabled && handleDesiredRankChange(rank.name)}
                        disabled={disabled}
                        className={`${rankCard(desiredRank === rank.name, disabled)} aspect-square flex items-center justify-center`}
                      >
                        <div className="flex flex-col items-center justify-center">
                          <Image
                            src={rank.icon}
                            alt={rank.name}
                            width={38}
                            height={38}
                            className="mx-auto h-auto w-[38px] object-contain"
                          />
                        </div>
                      </button>
                    );
                  })}
                </div>

                <RankDivisionSelector
                  divisions={divisions}
                  value={desiredDivision}
                  accent={rankTextColors[desiredRank]}
                  onChange={setDesiredDivision}
                  isDisabled={isDesiredDivisionDisabled}
                  ariaLabel={`${ui.desiredRank} division`}
                  className="mt-4"
                />
                {!hasValidRankPath && (
                  <p role="status" className="mt-3 text-sm font-medium text-[var(--muted)]">
                    You are already at the highest available rank.
                  </p>
                )}
                </div>
              </section>
            </div>

            <section className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5">
              <h3 className="mb-4 text-lg font-semibold">{ui.selectPlatform}</h3>
              <PlatformSelector
                platforms={platforms}
                value={platform}
                onChange={setPlatform}
                ariaLabel={ui.selectPlatform}
              />
            </section>

            <section className="grid gap-4 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 lg:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm font-semibold">
                  {annotations.rpGainLabel}
                </label>
                <div className="relative">
                  <select
                    value={rpGain}
                    onChange={(e) => setRpGain(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 pr-12 text-[var(--foreground)] outline-none transition hover:border-[var(--line-strong)] focus:border-[var(--foreground)] cursor-pointer"
                  >
                    {rpOptions.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[var(--muted)]">
                    ▾
                  </span>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-semibold">
                  {annotations.serverLabel}
                </label>
                <div className="relative">
                  <select
                    value={server}
                    onChange={(e) => setServer(e.target.value)}
                    className="w-full appearance-none rounded-lg border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 pr-12 text-[var(--foreground)] outline-none transition hover:border-[var(--line-strong)] focus:border-[var(--foreground)] cursor-pointer"
                  >
                    {servers.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </select>
                  <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-[var(--muted)]">
                    ▾
                  </span>
                </div>
              </div>
            </section>

            <section className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5">
              <h3 className="mb-4 text-lg font-semibold">{annotations.customize}</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-4">
                  {addOnCard(annotations.addOns?.playOffline?.title ?? localizedAnnotations.en.addOns.playOffline.title, annotations.free, playOffline, setPlayOffline, annotations.addOns?.playOffline?.desc ?? localizedAnnotations.en.addOns.playOffline.desc)}
                  {addOnCard(annotations.addOns?.express?.title ?? localizedAnnotations.en.addOns.express.title, "+20%", express, setExpress, annotations.addOns?.express?.desc ?? localizedAnnotations.en.addOns.express.desc)}
                  {addOnCard(annotations.addOns?.rankInsurance?.title ?? localizedAnnotations.en.addOns.rankInsurance.title, "+50%", rankInsurance, setRankInsurance, annotations.addOns?.rankInsurance?.desc ?? localizedAnnotations.en.addOns.rankInsurance.desc)}
                  {addOnCard(annotations.addOns?.eliteTier?.title ?? localizedAnnotations.en.addOns.eliteTier.title, "+50%", eliteTier, setEliteTier, annotations.addOns?.eliteTier?.desc ?? localizedAnnotations.en.addOns.eliteTier.desc)}
                </div>

                <div className="space-y-4">
                  {addOnCard(annotations.addOns?.specificOperators?.title ?? localizedAnnotations.en.addOns.specificOperators.title, annotations.free, specificOperators, setSpecificOperators, annotations.addOns?.specificOperators?.desc ?? localizedAnnotations.en.addOns.specificOperators.desc)}
                  {addOnCard(annotations.addOns?.highKillCount?.title ?? localizedAnnotations.en.addOns.highKillCount.title, "+40%", highKillCount, setHighKillCount, annotations.addOns?.highKillCount?.desc ?? localizedAnnotations.en.addOns.highKillCount.desc)}
                  {addOnCard(annotations.addOns?.vipPriority?.title ?? localizedAnnotations.en.addOns.vipPriority.title, "+50%", vipPriority, setVipPriority, annotations.addOns?.vipPriority?.desc ?? localizedAnnotations.en.addOns.vipPriority.desc)}
                </div>

                <div className="space-y-4">
                  {addOnCard(annotations.addOns?.streaming?.title ?? localizedAnnotations.en.addOns.streaming.title, `+${formatPrice(10)}`, streaming, setStreaming, annotations.addOns?.streaming?.desc ?? localizedAnnotations.en.addOns.streaming.desc)}
                  {addOnCard(annotations.addOns?.oneTrickPony?.title ?? localizedAnnotations.en.addOns.oneTrickPony.title, "+30%", oneTrickPony, setOneTrickPony, annotations.addOns?.oneTrickPony?.desc ?? localizedAnnotations.en.addOns.oneTrickPony.desc)}
                  {addOnCard(annotations.addOns?.insaneClipDrop?.title ?? localizedAnnotations.en.addOns.insaneClipDrop.title, "+15%", insaneClipDrop, setInsaneClipDrop, annotations.addOns?.insaneClipDrop?.desc ?? localizedAnnotations.en.addOns.insaneClipDrop.desc)}
                </div>
              </div>
            </section>
          </main>

          <aside className="h-fit min-w-0 rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 xl:sticky xl:top-24">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="pr-1 text-xl font-semibold">{ui.summary}</h3>
              <div className="flex items-center gap-2 text-sm text-[var(--muted)]">
                <span>~ {(() => { const hrs = Math.max(1, Math.round(steps * 2.33)); const d = Math.floor(hrs / 24); const h = hrs % 24; return d > 0 ? `${d} ${d > 1 ? annotations.days : annotations.day}, ${h}h` : `${h}h`; })()}</span>
                <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>
                <div className="group/time relative">
                  <div className="flex h-5 w-5 items-center justify-center rounded-full border border-[var(--line)] text-xs font-bold cursor-help">?</div>
                  <div className="theme-popover invisible group-hover/time:visible absolute right-0 top-8 z-50 w-72 rounded-lg border p-4 shadow-lg text-sm">
                    <p className="font-bold mb-2">{ui.policyTitle}</p>
                    <p className="text-[var(--muted)] mb-2">{ui.policyLine1} {ui.policyHighlight1}.</p>
                    <p className="text-[var(--muted)] mb-2">{ui.policyLine2} {ui.policyHighlight2.join(", ")}.</p>
                    <p className="text-[var(--muted)]">{ui.policyLine3}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4 rounded-lg border border-[var(--line)] bg-[var(--surface-muted)] p-1">
              <div className="relative grid grid-cols-2 gap-1">
                <div
                  className={`absolute inset-y-0 w-[calc(50%-2px)] rounded-md border border-[var(--line-strong)] bg-[var(--surface-strong)] transition-transform duration-300 ease-out ${
                    queueType === "Duo" ? "translate-x-[calc(100%+4px)]" : "translate-x-0"
                  }`}
                />
                <button
                  type="button"
                  aria-pressed={queueType === "Solo"}
                  onClick={() => setQueueType("Solo")}
                  className={`relative z-10 flex items-center justify-center gap-2 rounded-md px-4 py-2.5 font-semibold transition-colors duration-300 ${
                    queueType === "Solo" ? "text-[var(--foreground)]" : "text-[var(--muted)]"
                  }`}
                >
                  <User aria-hidden="true" className="h-4 w-4" />
                  {ui.solo}
                </button>
                <button
                  type="button"
                  aria-pressed={queueType === "Duo"}
                  onClick={() => setQueueType("Duo")}
                  className={`relative z-10 flex items-center justify-center gap-2 rounded-md px-4 py-2.5 font-semibold transition-colors duration-300 ${
                    queueType === "Duo" ? "text-[var(--foreground)]" : "text-[var(--muted)]"
                  }`}
                >
                  <Users aria-hidden="true" className="h-5 w-5" />
                  {ui.duo}
                </button>
              </div>
            </div>

            {queueType === "Duo" && (
              <div className="mb-4 rounded-lg border border-[var(--line)] bg-[var(--surface-muted)] p-4">
                <div className="flex items-center gap-3 mb-3">
                  <Image src="/booster.png" alt="Booster" width={80} height={80}  className="h-20 w-20 object-contain" />
                  <div className="flex-1">
                    <span className="text-sm font-semibold text-[var(--foreground)]">{annotations.extraBooster}</span>
                    <p className="text-xs text-[var(--muted)]">{annotations.increaseBoosters}</p>
                  </div>
                  <div className="group/boost relative">
                    <CircleHelp aria-hidden="true" className="h-5 w-5 cursor-help text-[var(--muted)]" />
                    <div className="theme-popover invisible absolute right-0 top-8 z-[var(--z-popover)] w-64 rounded-lg border p-4 text-sm text-[var(--muted)] group-hover/boost:visible">
                      {annotations.extraBoosterTooltip}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    aria-label="Remove an extra booster"
                    onClick={() => setDuoBoosterCount(Math.max(1, duoBoosterCount - 1))}
                    className="flex h-10 w-16 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface-muted)] text-xl font-semibold text-[var(--foreground)] transition hover:border-[var(--line-strong)] hover:bg-[var(--surface-hover)] active:scale-95"
                  >
                    −
                  </button>
                  <div className="flex h-10 flex-1 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface)]">
                    <input
                      aria-label="Number of extra boosters"
                      type="number"
                      min={1}
                      max={4}
                      value={duoBoosterCount}
                      onChange={(e) => {
                        const v = parseInt(e.target.value);
                        if (!isNaN(v)) setDuoBoosterCount(Math.min(4, Math.max(1, v)));
                      }}
                      className="h-full w-full bg-transparent text-center text-lg font-semibold text-[var(--foreground)] outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                    />
                  </div>
                  <button
                    type="button"
                    aria-label="Add an extra booster"
                    onClick={() => setDuoBoosterCount(Math.min(4, duoBoosterCount + 1))}
                    className="flex h-10 w-16 items-center justify-center rounded-lg border border-[var(--line)] bg-[var(--surface-muted)] text-xl font-semibold text-[var(--foreground)] transition hover:border-[var(--line-strong)] hover:bg-[var(--surface-hover)] active:scale-95"
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className="space-y-3 border-b border-[var(--line)] pb-5 text-sm text-[var(--muted)]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-semibold" style={{ color: rankTextColors[currentRank] }}>
                  {currentRank} {currentDivision}
                </span>
                <span className="text-[var(--muted-soft)]">to</span>
                <span className="font-semibold" style={{ color: rankTextColors[desiredRank] }}>
                  {desiredRank} {desiredDivision}
                </span>
              </div>
              {queueType === "Duo" && (
                <>
                  <div className="flex justify-between">
                    <span>{annotations.playWithBooster}</span>
                    <span className="font-semibold">+80%</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{annotations.oneBooster}</span>
                    <span className="font-semibold">{annotations.free}</span>
                  </div>
                  {duoBoosterCount > 1 && (
                    <div className="flex justify-between">
                      <span>+{duoBoosterCount - 1} {duoBoosterCount > 2 ? annotations.extraBoosterPlural : annotations.extraBoosterSuffix}</span>
                      <span className="font-semibold text-[var(--foreground)]">+{(duoBoosterCount - 1) * 75}%</span>
                    </div>
                  )}
                </>
              )}
              <div className="flex justify-between">
                <span>{rpGain}</span>
                <span className="font-semibold">{annotations.free}</span>
              </div>
              <div className="flex justify-between">
                <span>{server}</span>
                <span className="font-semibold">{annotations.free}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="flex items-center gap-2">
                  <PlatformLogo platform={platform} size={18} />
                  {platform.toUpperCase()}
                </span>
                <span className="font-semibold">{platform === "PC" ? annotations.free : "20%"}</span>
              </div>
            </div>

            <div className="space-y-3 border-b border-[var(--line)] py-5">
              <button
                onClick={() => setSpecificBooster(!specificBooster)}
                className="flex w-full items-center justify-between rounded-lg border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 cursor-pointer hover:border-[var(--line-strong)] transition"
              >
                <span className="flex items-center gap-3 font-semibold text-[var(--foreground)]">
                  <Image src="/booster.png" alt="Booster" width={36} height={36}  className="h-9 w-9 object-contain" />
                  {ui.specificBooster}
                </span>
                <ChevronDown aria-hidden="true" className={`h-5 w-5 text-[var(--muted)] transition-transform duration-200 ${specificBooster ? "rotate-180" : ""}`} />
              </button>
              {specificBooster && (
                <div className="rounded-lg bg-[var(--surface-muted)] px-4 py-3 text-sm text-[var(--muted)] leading-relaxed">
                  {ui.specificBoosterDesc}
                </div>
              )}

              <div>
                <button
                  onClick={() => setPromoExpanded(!promoExpanded)}
                  className="flex w-full items-center justify-between rounded-lg border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 cursor-pointer hover:border-[var(--line-strong)] transition"
                >
                  <div className="flex items-center gap-3">
                    <Image src="/coupon.png" alt="" width={40} height={60}  className="h-10 w-auto object-contain opacity-90" />
                    <span className="font-semibold text-[var(--foreground)]">{ui.applyPromo}</span>
                  </div>
                  <span className="text-[var(--muted)] text-lg">{promoExpanded ? "−" : "+"}</span>
                </button>
                {promoExpanded && (
                  <div className="mt-2 rounded-lg bg-[var(--surface-muted)] px-4 py-3">
                    <div className="flex gap-2 overflow-hidden">
                      <input
                        aria-label="Promo code"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder={ui.enterCoupon}
                        className="min-w-0 flex-1 rounded-lg border border-[var(--line)] bg-[var(--surface)] px-4 py-2.5 text-[var(--foreground)] outline-none placeholder:text-[var(--muted-soft)] focus:border-[var(--foreground)] transition"
                      />
                      <button onClick={handleApplyPromo} className="shrink-0 rounded-lg bg-[var(--foreground)] px-4 py-2.5 font-semibold text-[var(--background)] transition cursor-pointer">
                        {ui.apply}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            <div className="space-y-3 py-5 border-b border-[var(--line)]">
              <div className="rounded-lg border border-[var(--line)] bg-[var(--surface-muted)] px-4 py-3 text-sm">
                <span className="text-[var(--muted)]">
                  {hasExtraDiscount
                    ? annotations.extraDiscountUnlocked
                    : annotations.extraDiscountAdd
                        .replace("£{amount}", formatPrice(amountToExtraDiscount))
                        .replace("{amount}", formatPrice(amountToExtraDiscount))}
                </span>
              </div>
              <div className="flex justify-between text-sm text-[var(--muted)]">
                <span>{annotations.extraDiscountLabel}</span>
                <span className="font-semibold text-[var(--foreground)]">{extraDiscountPercent > 0 ? `-${extraDiscountPercent}%` : "0%"}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="font-semibold">{annotations.totalAmountLabel}</span>
                <span className="flex items-center gap-2">
                  {discount > 0 && <span className="text-[var(--muted-soft)] line-through text-xs">{formatPrice(subtotal)}</span>}
                  <span className="text-lg font-bold">{formatPrice(total)}</span>
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-[var(--muted)]">{annotations.cashbackLabel}</span>
                <span className="text-[var(--muted)]">{formatPrice(0)}</span>
              </div>
            </div>

            <button
              onClick={handleCheckout}
              disabled={checkoutLoading || !hasValidRankPath}
              className="relative z-10 w-full rounded-lg bg-[var(--foreground)] px-5 py-3.5 text-base font-semibold text-[var(--background)] cursor-pointer transition-opacity hover:opacity-85 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-45"
            >
              {!hasValidRankPath
                ? "No higher rank available"
                : checkoutLoading
                  ? annotations.redirectingLabel
                  : `${annotations.checkoutButton} (${formatPrice(total)})`}
            </button>

            <div className="mt-6">
              <div className="rounded-lg bg-[var(--surface-muted)] p-3">
                <div className="flex items-center gap-2 mb-2">
                  <Image src="/icons/ssl.png" alt="Secure" width={24} height={24}  className="h-6 w-6 object-contain" />
                  <div>
                    <p className="font-bold text-xs">{annotations.safePaymentsTitle}</p>
                    <p className="text-[10px] text-[var(--muted)]">{annotations.safePaymentsDesc}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {paymentMethods.map((method) => (
                    <Image
                      key={method.name}
                      src={method.icon}
                      alt={method.name}
                      width={28}
                      height={28}
                      className="h-6 w-auto object-contain"
                    />
                  ))}
                </div>
              </div>
              <p className="mt-3 text-center text-[10px] leading-4 text-[var(--muted-soft)]">
                By placing an order at <span className="text-[var(--muted)] font-medium">proboost.gg</span>{" "}
                you&apos;re agreeing to our{" "}
                <Link href="/terms" className="text-[var(--muted)] underline underline-offset-2 hover:text-[var(--foreground)] transition-colors">Terms of Use</Link>
                {" "}{annotations.policyAnd}{" "}
                <Link href="/privacy" className="text-[var(--muted)] underline underline-offset-2 hover:text-[var(--foreground)] transition-colors">Privacy Policy</Link>
              </p>
            </div>
          </aside>
        </div>

        <div className="mt-12">
          <TrustSection copy={trustCopy} />
        </div>
        <div>
          <FaqSection copy={faqCopy} />
        </div>
      </div>
      {showDetails && (
        <div className="theme-overlay fixed inset-0 z-50 flex items-center justify-center backdrop-blur-md" onClick={() => setShowDetails(false)}>
          <div role="dialog" aria-modal="true" aria-labelledby="pricing-dialog-title" className="theme-popover relative mx-4 max-h-[calc(100svh-32px)] w-full max-w-3xl overflow-y-auto rounded-lg border p-6 sm:p-8" onClick={(e) => e.stopPropagation()}>
            <button type="button" aria-label={annotations.modalClose} onClick={() => setShowDetails(false)} className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg border border-[var(--line)] text-[var(--muted)] transition hover:border-[var(--line-strong)] hover:text-[var(--foreground)]">
              <X aria-hidden="true" className="h-4 w-4" />
            </button>

            <p className="eyebrow mb-1.5 text-center">{annotations.modalSubtitle}</p>
            <h2 id="pricing-dialog-title" className="mb-7 text-center text-xl font-semibold text-[var(--foreground)] sm:text-2xl">{annotations.modalTitle}</h2>

            <div className="grid gap-3 md:grid-cols-3">
              <div className="flex flex-col rounded-lg border border-[var(--line)] bg-[var(--surface-muted)] p-5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--surface-strong)] text-[var(--foreground)]">
                  <CircleDollarSign aria-hidden="true" className="h-5 w-5" />
                </div>
                <div className="mb-1 text-3xl font-semibold">10%</div>
                <div className="mb-1 text-sm font-semibold">{annotations.modalFeeTitle}</div>
                <p className="text-xs leading-relaxed text-[var(--muted)]">{annotations.modalFeeDesc}</p>
              </div>

              <div className="flex flex-col rounded-lg border border-[var(--line)] bg-[var(--surface-muted)] p-5">
                <div className="mb-4 flex gap-0.5">
                  {[0,1,2,3,4].map(i => (
                    <Star key={i} aria-hidden="true" className="h-4 w-4 fill-[var(--foreground)] text-[var(--foreground)]" />
                  ))}
                </div>
                <div className="mb-1 text-3xl font-semibold">4.9<span className="text-lg text-[var(--muted)]">/5</span></div>
                <div className="mb-1 text-sm font-semibold">{annotations.modalQualityTitle}</div>
                <p className="text-xs leading-relaxed text-[var(--muted)]">{annotations.modalQualityDesc}</p>
              </div>

              <div className="flex flex-col rounded-lg border border-[var(--accent-line)] bg-[var(--accent-soft)] p-5">
                <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-lg bg-[var(--surface)] text-[var(--accent-hover)]">
                  <Sparkles aria-hidden="true" className="h-5 w-5" />
                </div>
                <div className="mb-1 text-3xl font-semibold text-[var(--accent-hover)]">~35%</div>
                <div className="mb-1 text-sm font-semibold">{annotations.modalSavingsTitle}</div>
                <p className="text-xs leading-relaxed text-[var(--muted)]">
                  {annotations.modalSavingsDesc
                    .replace("£{amount}", formatPrice(competitorSavings))
                    .replace("{amount}", formatPrice(competitorSavings))}
                </p>
              </div>
            </div>

            <button
              onClick={() => setShowDetails(false)}
              className="button-base button-secondary mx-auto mt-6"
            >
              {annotations.modalClose}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
