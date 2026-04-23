"use client";

import React from "react";
import Link from "next/link";

type LangCode = "en" | "it" | "fr" | "es" | "de" | "nl" | "pt" | "uk" | "ru";

const LANGUAGES: { code: LangCode; name: string; flag: string }[] = [
  { code: "en", name: "English",    flag: "us" },
  { code: "it", name: "Italiano",   flag: "it" },
  { code: "fr", name: "Français",   flag: "fr" },
  { code: "es", name: "Español",    flag: "es" },
  { code: "de", name: "Deutsch",    flag: "de" },
  { code: "nl", name: "Nederlands", flag: "nl" },
  { code: "pt", name: "Português",  flag: "pt" },
  { code: "uk", name: "Українська", flag: "ua" },
  { code: "ru", name: "Русский",    flag: "ru" },
];

const i18n: Record<LangCode, {
  title: string; sub: string; nextLabel: string;
  steps: [string, string, string]; cta: string;
}> = {
  en: { title: "Payment Successful", sub: "Thank you for your order! Your boost has been confirmed and our team will begin shortly. You'll receive an email with your order details.", nextLabel: "What happens next:", steps: ["A booster will be assigned to your order", "You'll receive login instructions via email", "Your boost begins within 30 minutes"], cta: "Back to Home" },
  it: { title: "Pagamento Riuscito", sub: "Grazie per il tuo ordine! Il tuo boost è stato confermato e il nostro team inizierà a breve. Riceverai un'e-mail con i dettagli.", nextLabel: "Cosa succede dopo:", steps: ["Un booster verrà assegnato al tuo ordine", "Riceverai le istruzioni di accesso via e-mail", "Il tuo boost inizia entro 30 minuti"], cta: "Torna alla Home" },
  fr: { title: "Paiement Réussi", sub: "Merci pour votre commande ! Votre boost est confirmé et notre équipe commencera très bientôt. Vous recevrez un e-mail avec les détails.", nextLabel: "Que se passe-t-il ensuite :", steps: ["Un booster sera assigné à votre commande", "Vous recevrez les instructions de connexion par e-mail", "Votre boost commence dans les 30 minutes"], cta: "Retour à l'accueil" },
  es: { title: "Pago Exitoso", sub: "¡Gracias por tu pedido! Tu boost ha sido confirmado y nuestro equipo comenzará en breve. Recibirás un correo con los detalles.", nextLabel: "¿Qué pasa a continuación?", steps: ["Se asignará un booster a tu pedido", "Recibirás las instrucciones de acceso por correo", "Tu boost comienza en 30 minutos"], cta: "Volver al inicio" },
  de: { title: "Zahlung Erfolgreich", sub: "Danke für deine Bestellung! Dein Boost wurde bestätigt und unser Team beginnt in Kürze. Du erhältst eine E-Mail mit den Details.", nextLabel: "Was passiert als Nächstes:", steps: ["Einem Booster wird deine Bestellung zugewiesen", "Du erhältst Anmeldedaten per E-Mail", "Dein Boost beginnt innerhalb von 30 Minuten"], cta: "Zurück zur Startseite" },
  nl: { title: "Betaling Geslaagd", sub: "Bedankt voor je bestelling! Je boost is bevestigd en ons team begint spoedig. Je ontvangt een e-mail met de bestelgegevens.", nextLabel: "Wat gebeurt er daarna:", steps: ["Er wordt een booster aan je bestelling gekoppeld", "Je ontvangt inloggegevens per e-mail", "Je boost begint binnen 30 minuten"], cta: "Terug naar Home" },
  pt: { title: "Pagamento Realizado", sub: "Obrigado pelo seu pedido! Seu boost foi confirmado e nossa equipe começará em breve. Você receberá um e-mail com os detalhes.", nextLabel: "O que acontece a seguir:", steps: ["Um booster será atribuído ao seu pedido", "Você receberá as instruções de login por e-mail", "Seu boost começa em 30 minutos"], cta: "Voltar ao Início" },
  uk: { title: "Платіж Успішний", sub: "Дякуємо за замовлення! Ваш буст підтверджено, і наша команда незабаром розпочне. Ви отримаєте електронний лист з деталями.", nextLabel: "Що відбувається далі:", steps: ["Бустер буде призначений до вашого замовлення", "Ви отримаєте інструкції для входу на e-mail", "Ваш буст починається протягом 30 хвилин"], cta: "Повернутися на Головну" },
  ru: { title: "Оплата Успешна", sub: "Спасибо за заказ! Ваш буст подтверждён, и наша команда скоро приступит к работе. Вы получите письмо с деталями заказа.", nextLabel: "Что будет дальше:", steps: ["Бустер будет назначен на ваш заказ", "Вы получите инструкции для входа на e-mail", "Ваш буст начнётся в течение 30 минут"], cta: "На главную" },
};

export default function SuccessPage() {
  const [selectedLang, setSelectedLang] = React.useState<LangCode>("en");
  const [langOpen, setLangOpen] = React.useState(false);
  const langRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const saved = localStorage.getItem("proboost_lang");
    if (saved) setSelectedLang(saved as never);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const t = i18n[selectedLang];
  const currentFlag = LANGUAGES.find((l) => l.code === selectedLang)!.flag;

  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) setLangOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050607] text-white px-6">
      {/* Language picker */}
      <div className="fixed top-[82px] right-5 z-50" ref={langRef}>
        <button
          onClick={() => setLangOpen((o) => !o)}
          className="flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.04] px-3 py-1.5 text-sm text-zinc-300 hover:bg-white/[0.08] hover:text-white transition"
        >
          <img src={`https://flagcdn.com/20x15/${currentFlag}.png`} width={20} height={15} alt="" className="rounded-[2px]" />
          <span className="uppercase font-medium">{selectedLang}</span>
          <svg className="h-3.5 w-3.5 text-zinc-500" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round"><path d="M3.5 6.5 8 11l4.5-4.5" /></svg>
        </button>
        {langOpen && (
          <div className="absolute right-0 mt-2 w-44 rounded-2xl border border-white/10 bg-[#111315] py-1.5 shadow-2xl">
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

      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/40">
          <svg className="h-9 w-9 text-emerald-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
        </div>

        <h1 className="text-4xl font-black tracking-tight bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">
          {t.title}
        </h1>

        <p className="text-zinc-400 leading-relaxed">
          {t.sub}
        </p>

        <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-5 text-sm text-zinc-300 space-y-2">
          <p className="font-semibold text-white">{t.nextLabel}</p>
          <ul className="text-left space-y-2 text-zinc-400 mt-3">
            {t.steps.map((step, i) => (
              <li key={i} className="flex items-start gap-2.5">
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-[10px] font-bold text-cyan-400">{i + 1}</span>
                {step}
              </li>
            ))}
          </ul>
        </div>

        <Link
          href="/"
          className="inline-flex w-full items-center justify-center gap-2 rounded-2xl bg-cyan-500 px-5 py-4 text-lg font-bold text-black hover:bg-cyan-400 transition-colors duration-200"
        >
          {t.cta}
        </Link>
      </div>
    </div>
  );
}
