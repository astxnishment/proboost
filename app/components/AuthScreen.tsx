"use client";


import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import type { OAuthStrategy } from "@clerk/shared/types";
import type { LanguageCode } from "./Dropdown";

type ModeKey = "login" | "signup";

const i18n: Record<LanguageCode, {
  login:  { eyebrow: string; title: string; subtitle: string; primary: string; altLabel: string; altText: string };
  signup: { eyebrow: string; title: string; subtitle: string; primary: string; altLabel: string; altText: string };
  emailLabel: string; emailPlaceholder: string;
  passwordLabel: string; passwordPlaceholder: string;
  confirmLabel: string; confirmPlaceholder: string;
  orDivider: string;
  discordBtn: string; googleBtn: string;
  fastTitle: string; fastDesc: string;
  historyTitle: string; historyDesc: string;
  liveTitle: string; liveDesc: string;
}> = {
  en: { login: { eyebrow: "Member Access", title: "Log in to ProBoost", subtitle: "Track orders, manage boosters, and return to checkout without rebuilding your setup.", primary: "Log In", altLabel: "Need an account?", altText: "Sign up" }, signup: { eyebrow: "Create Account", title: "Sign up for ProBoost", subtitle: "Create an account to save your orders, manage account details, and move through checkout faster.", primary: "Create Account", altLabel: "Already have an account?", altText: "Log in" }, emailLabel: "Email", emailPlaceholder: "Email address", passwordLabel: "Password", passwordPlaceholder: "Enter your password", confirmLabel: "Confirm Password", confirmPlaceholder: "Confirm your password", orDivider: "or", discordBtn: "Continue with Discord", googleBtn: "Continue with Google", fastTitle: "Fast Checkout", fastDesc: "Keep your setup saved and jump back into your order instantly.", historyTitle: "Secure History", historyDesc: "View previous purchases and active boosts in one place.", liveTitle: "Live Updates", liveDesc: "Follow progress and account notices without chasing support." },
  it: { login: { eyebrow: "Accesso Membro", title: "Accedi a ProBoost", subtitle: "Tieni traccia degli ordini, gestisci i booster e torna al checkout senza riconfigurare.", primary: "Accedi", altLabel: "Non hai un account?", altText: "Registrati" }, signup: { eyebrow: "Crea Account", title: "Registrati su ProBoost", subtitle: "Crea un account per salvare gli ordini, gestire i tuoi dati e velocizzare il checkout.", primary: "Crea Account", altLabel: "Hai già un account?", altText: "Accedi" }, emailLabel: "Email", emailPlaceholder: "Email address", passwordLabel: "Password", passwordPlaceholder: "Inserisci la password", confirmLabel: "Conferma Password", confirmPlaceholder: "Conferma la password", orDivider: "o", discordBtn: "Continua con Discord", googleBtn: "Continua con Google", fastTitle: "Checkout Veloce", fastDesc: "Mantieni la configurazione salvata e torna al tuo ordine istantaneamente.", historyTitle: "Storico Sicuro", historyDesc: "Visualizza acquisti precedenti e boost attivi in un unico posto.", liveTitle: "Aggiornamenti Live", liveDesc: "Segui il progresso senza dover contattare il supporto." },
  fr: { login: { eyebrow: "Accès Membre", title: "Se connecter à ProBoost", subtitle: "Suivez vos commandes, gérez vos boosters et revenez au paiement sans reconfigurer.", primary: "Se connecter", altLabel: "Pas encore de compte ?", altText: "S'inscrire" }, signup: { eyebrow: "Créer un compte", title: "S'inscrire sur ProBoost", subtitle: "Créez un compte pour sauvegarder vos commandes, gérer vos infos et payer plus vite.", primary: "Créer un compte", altLabel: "Déjà un compte ?", altText: "Se connecter" }, emailLabel: "E-mail", emailPlaceholder: "Email address", passwordLabel: "Mot de passe", passwordPlaceholder: "Entrez votre mot de passe", confirmLabel: "Confirmer le mot de passe", confirmPlaceholder: "Confirmez le mot de passe", orDivider: "ou", discordBtn: "Continuer avec Discord", googleBtn: "Continuer avec Google", fastTitle: "Paiement Rapide", fastDesc: "Gardez votre configuration et revenez à votre commande instantanément.", historyTitle: "Historique Sécurisé", historyDesc: "Consultez vos achats et boosts actifs en un seul endroit.", liveTitle: "Mises à Jour en Direct", liveDesc: "Suivez l'avancement sans avoir à contacter le support." },
  es: { login: { eyebrow: "Acceso de Miembro", title: "Iniciar sesión en ProBoost", subtitle: "Rastrea pedidos, gestiona boosters y vuelve al pago sin reconfigurar.", primary: "Iniciar sesión", altLabel: "¿No tienes cuenta?", altText: "Regístrate" }, signup: { eyebrow: "Crear Cuenta", title: "Regístrate en ProBoost", subtitle: "Crea una cuenta para guardar pedidos, gestionar datos y agilizar el pago.", primary: "Crear Cuenta", altLabel: "¿Ya tienes cuenta?", altText: "Iniciar sesión" }, emailLabel: "Correo electrónico", emailPlaceholder: "Email address", passwordLabel: "Contraseña", passwordPlaceholder: "Ingresa tu contraseña", confirmLabel: "Confirmar contraseña", confirmPlaceholder: "Confirma tu contraseña", orDivider: "o", discordBtn: "Continuar con Discord", googleBtn: "Continuar con Google", fastTitle: "Pago Rápido", fastDesc: "Mantén tu configuración y vuelve a tu pedido al instante.", historyTitle: "Historial Seguro", historyDesc: "Ve compras anteriores y boosts activos en un solo lugar.", liveTitle: "Actualizaciones en Vivo", liveDesc: "Sigue el progreso sin tener que contactar soporte." },
  de: { login: { eyebrow: "Mitgliederzugang", title: "Bei ProBoost anmelden", subtitle: "Bestellungen verfolgen, Booster verwalten und ohne Neukonfiguration zur Kasse zurückkehren.", primary: "Anmelden", altLabel: "Noch kein Konto?", altText: "Registrieren" }, signup: { eyebrow: "Konto erstellen", title: "Bei ProBoost registrieren", subtitle: "Erstelle ein Konto, um Bestellungen zu speichern, Daten zu verwalten und schneller zu bezahlen.", primary: "Konto erstellen", altLabel: "Bereits ein Konto?", altText: "Anmelden" }, emailLabel: "E-Mail", emailPlaceholder: "Email address", passwordLabel: "Passwort", passwordPlaceholder: "Passwort eingeben", confirmLabel: "Passwort bestätigen", confirmPlaceholder: "Passwort bestätigen", orDivider: "oder", discordBtn: "Mit Discord fortfahren", googleBtn: "Mit Google fortfahren", fastTitle: "Schneller Checkout", fastDesc: "Einstellungen gespeichert – sofort zur Bestellung zurück.", historyTitle: "Sicherer Verlauf", historyDesc: "Frühere Käufe und aktive Boosts an einem Ort.", liveTitle: "Live-Updates", liveDesc: "Fortschritt verfolgen ohne den Support zu kontaktieren." },
  nl: { login: { eyebrow: "Ledentoegang", title: "Inloggen bij ProBoost", subtitle: "Volg bestellingen, beheer boosters en keer terug naar de checkout zonder opnieuw te configureren.", primary: "Inloggen", altLabel: "Nog geen account?", altText: "Aanmelden" }, signup: { eyebrow: "Account aanmaken", title: "Aanmelden bij ProBoost", subtitle: "Maak een account om bestellingen op te slaan, gegevens te beheren en sneller af te rekenen.", primary: "Account aanmaken", altLabel: "Al een account?", altText: "Inloggen" }, emailLabel: "E-mail", emailPlaceholder: "Email address", passwordLabel: "Wachtwoord", passwordPlaceholder: "Voer je wachtwoord in", confirmLabel: "Wachtwoord bevestigen", confirmPlaceholder: "Bevestig je wachtwoord", orDivider: "of", discordBtn: "Doorgaan met Discord", googleBtn: "Doorgaan met Google", fastTitle: "Snelle Checkout", fastDesc: "Instellingen opgeslagen – direct terug naar je bestelling.", historyTitle: "Veilige Geschiedenis", historyDesc: "Bekijk eerdere aankopen en actieve boosts op één plek.", liveTitle: "Live Updates", liveDesc: "Volg de voortgang zonder support te benaderen." },
  pt: { login: { eyebrow: "Acesso de Membro", title: "Entrar no ProBoost", subtitle: "Acompanhe pedidos, gerencie boosters e volte ao checkout sem reconfigurar.", primary: "Entrar", altLabel: "Não tem conta?", altText: "Cadastre-se" }, signup: { eyebrow: "Criar Conta", title: "Cadastrar no ProBoost", subtitle: "Crie uma conta para salvar pedidos, gerenciar dados e agilizar o pagamento.", primary: "Criar Conta", altLabel: "Já tem conta?", altText: "Entrar" }, emailLabel: "E-mail", emailPlaceholder: "Email address", passwordLabel: "Senha", passwordPlaceholder: "Digite sua senha", confirmLabel: "Confirmar Senha", confirmPlaceholder: "Confirme sua senha", orDivider: "ou", discordBtn: "Continuar com Discord", googleBtn: "Continuar com Google", fastTitle: "Checkout Rápido", fastDesc: "Configurações salvas – volte ao pedido instantaneamente.", historyTitle: "Histórico Seguro", historyDesc: "Veja compras anteriores e boosts ativos em um só lugar.", liveTitle: "Atualizações ao Vivo", liveDesc: "Acompanhe o progresso sem precisar contatar o suporte." },
  uk: { login: { eyebrow: "Доступ для учасників", title: "Увійти до ProBoost", subtitle: "Відстежуйте замовлення, керуйте бустерами та повертайтесь до оформлення без налаштувань.", primary: "Увійти", altLabel: "Немає облікового запису?", altText: "Зареєструватись" }, signup: { eyebrow: "Створити обліковий запис", title: "Зареєструватись у ProBoost", subtitle: "Створіть обліковий запис, щоб зберігати замовлення, керувати даними та швидше оформлювати покупки.", primary: "Створити обліковий запис", altLabel: "Вже є обліковий запис?", altText: "Увійти" }, emailLabel: "Електронна пошта", emailPlaceholder: "Email address", passwordLabel: "Пароль", passwordPlaceholder: "Введіть пароль", confirmLabel: "Підтвердіть пароль", confirmPlaceholder: "Підтвердіть пароль", orDivider: "або", discordBtn: "Продовжити з Discord", googleBtn: "Продовжити з Google", fastTitle: "Швидке оформлення", fastDesc: "Налаштування збережені — миттєво повертайтесь до замовлення.", historyTitle: "Захищена історія", historyDesc: "Переглядайте попередні покупки та активні бусти в одному місці.", liveTitle: "Оновлення в режимі реального часу", liveDesc: "Стежте за прогресом без звернення до підтримки." },
  ru: { login: { eyebrow: "Доступ для участников", title: "Войти в ProBoost", subtitle: "Отслеживайте заказы, управляйте бустерами и возвращайтесь к оформлению без перенастройки.", primary: "Войти", altLabel: "Нет аккаунта?", altText: "Зарегистрироваться" }, signup: { eyebrow: "Создать аккаунт", title: "Зарегистрироваться в ProBoost", subtitle: "Создайте аккаунт для сохранения заказов, управления данными и быстрого оформления.", primary: "Создать аккаунт", altLabel: "Уже есть аккаунт?", altText: "Войти" }, emailLabel: "Электронная почта", emailPlaceholder: "Email address", passwordLabel: "Пароль", passwordPlaceholder: "Введите пароль", confirmLabel: "Подтвердите пароль", confirmPlaceholder: "Подтвердите пароль", orDivider: "или", discordBtn: "Продолжить с Discord", googleBtn: "Продолжить с Google", fastTitle: "Быстрая оплата", fastDesc: "Настройки сохранены — вернитесь к заказу мгновенно.", historyTitle: "Защищённая история", historyDesc: "Просматривайте покупки и активные бусты в одном месте.", liveTitle: "Обновления в реальном времени", liveDesc: "Следите за прогрессом без обращений в поддержку." },
};

type AuthScreenProps = {
  mode: ModeKey;
};

export default function AuthScreen({ mode }: AuthScreenProps) {
  const router = useRouter();
  const clerk = useClerk();
  const [selectedLang, setSelectedLang] = React.useState<LanguageCode>("en");
  const [email, setEmail] = React.useState("");
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirm, setConfirm] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (mode === "signup" && password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    try {
      if (mode === "login") {
        // Step 1: identify the user
        await clerk.client.signIn.create({ identifier: email });
        // Step 2: attempt password
        const res = await clerk.client.signIn.attemptFirstFactor({
          strategy: "password",
          password,
        });
        if (res.status === "complete") {
          await clerk.setActive({ session: res.createdSessionId });
          router.push("/");
        }
      } else {
        const res = await clerk.client.signUp.create({ emailAddress: email, password, username });
        if (res.status === "complete") {
          await clerk.setActive({ session: res.createdSessionId });
          router.push("/");
        } else if (res.status === "missing_requirements") {
          await res.prepareEmailAddressVerification({ strategy: "email_code" });
          router.push("/signup/verify");
        }
      }
    } catch (err: unknown) {
      const clerkErr = err as { errors?: { message: string }[] };
      setError(clerkErr?.errors?.[0]?.message ?? "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleOAuth = (strategy: OAuthStrategy) => {
    const origin = window.location.origin;
    const params = {
      strategy,
      redirectUrl: `${origin}/sso-callback`,
      redirectUrlComplete: `${origin}/`,
    };
    if (mode === "login") {
      clerk.client.signIn.authenticateWithRedirect(params);
    } else {
      clerk.client.signUp.authenticateWithRedirect(params);
    }
  };

  React.useEffect(() => {
    const saved = localStorage.getItem("proboost_lang");
    const id = window.setTimeout(() => {
      if (saved && saved in i18n) {
        setSelectedLang(saved as LanguageCode);
      }
    }, 0);
    const handleLanguageChange = (event: Event) => {
      const language = (event as CustomEvent<LanguageCode>).detail;
      if (language && language in i18n) setSelectedLang(language);
    };
    window.addEventListener("proboost:language-change", handleLanguageChange);
    return () => {
      window.clearTimeout(id);
      window.removeEventListener("proboost:language-change", handleLanguageChange);
    };
  }, []);
  const t = i18n[selectedLang];
  const content = t[mode];
  const altHref = mode === "login" ? "/signup" : "/login";
  return (
    <main className="auth-shell relative flex min-h-screen flex-col items-center justify-center px-4 pb-12 pt-28">
      {/* Required by Clerk for Smart CAPTCHA on custom sign-up flows */}
      <div id="clerk-captcha" />

      {/* Character image */}
      <div className="mb-2 flex justify-center">
        <Image
          src="/booster.png"
          alt="ProBoost Character"
          width={220}
          height={220}
          loading="eager"
          className="h-44 w-auto object-contain"
        />
      </div>

      {/* Form card */}
      <div className="w-full max-w-sm">
        <h1 className="mb-2 text-center text-3xl font-semibold tracking-tight text-[var(--foreground)]">{content.title}</h1>
        <p className="mb-7 text-center text-sm text-[var(--muted)]">{content.subtitle}</p>

        <form onSubmit={handleSubmit}>
                    {/* Username — signup only */}
          {mode === "signup" && (
            <div className="relative mb-3">
              <label htmlFor="auth-username" className="sr-only">
                Username
              </label>
              <input
                id="auth-username"
                type="text"
                required
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                autoComplete="username"
                aria-invalid={!!error}
                aria-describedby={error ? "auth-error" : undefined}
                className="w-full rounded-lg border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-3.5 pr-11 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted-soft)] hover:border-[var(--line-strong)] focus:border-[var(--foreground)]"
              />
              <svg className="pointer-events-none absolute right-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-[var(--muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>
          )}

          {/* Email */}
          <div className="relative mb-3">
            <label htmlFor="auth-email" className="sr-only">
              {t.emailLabel}
            </label>
            <input
              id="auth-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t.emailPlaceholder}
              autoComplete="email"
              aria-invalid={!!error}
              aria-describedby={error ? "auth-error" : undefined}
              className="w-full rounded-lg border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-3.5 pr-11 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted-soft)] hover:border-[var(--line-strong)] focus:border-[var(--foreground)]"
            />
            <svg className="pointer-events-none absolute right-4 top-1/2 h-4.5 w-4.5 -translate-y-1/2 text-[var(--muted)]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="4" width="20" height="16" rx="3" /><path d="m2 7 10 7 10-7" />
            </svg>
          </div>

          {/* Password */}
          <div className="relative mb-3">
            <label htmlFor="auth-password" className="sr-only">
              {t.passwordLabel}
            </label>
            <input
              id="auth-password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder={t.passwordPlaceholder}
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              minLength={mode === "signup" ? 8 : undefined}
              aria-invalid={!!error}
              aria-describedby={error ? "auth-error" : undefined}
              className="w-full rounded-lg border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-3.5 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted-soft)] hover:border-[var(--line-strong)] focus:border-[var(--foreground)]"
            />
          </div>

          {mode === "signup" && (
            <div className="relative mb-3">
              <label htmlFor="auth-password-confirm" className="sr-only">
                {t.confirmLabel}
              </label>
              <input
                id="auth-password-confirm"
                type="password"
                required
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder={t.confirmPlaceholder}
                autoComplete="new-password"
                minLength={8}
                aria-invalid={!!error}
                aria-describedby={error ? "auth-error" : undefined}
                className="w-full rounded-lg border border-[var(--line)] bg-[var(--surface-raised)] px-4 py-3.5 text-[var(--foreground)] outline-none transition placeholder:text-[var(--muted-soft)] hover:border-[var(--line-strong)] focus:border-[var(--foreground)]"
              />
            </div>
          )}

                    {/* Error message */}
          {error && (
            <p id="auth-error" role="alert" className="theme-error mb-3 rounded-xl px-4 py-2.5 text-sm">
              {error}
            </p>
          )}

          {/* Primary CTA */}
          <button
            type="submit"
            disabled={loading}
            className="theme-button-primary mt-1 w-full rounded-xl py-3.5 font-semibold transition active:scale-[0.99] disabled:opacity-50"
          >
            {loading ? "Please wait…" : content.primary}
          </button>

          {/* Trouble logging in */}
          {mode === "login" && (
            <p className="mt-3 text-center text-xs text-[var(--muted)]">
              Trouble logging in?{" "}
              <a href="mailto:support@proboost.gg" className="theme-link font-semibold transition">
                Get help
              </a>
            </p>
          )}
        </form>

        {/* OR divider */}
        <div className="my-5 flex items-center gap-3 text-xs uppercase tracking-[0.2em] text-[var(--muted-soft)]">
          <div className="h-px flex-1 bg-[var(--line)]" />
          <span>{t.orDivider}</span>
          <div className="h-px flex-1 bg-[var(--line)]" />
        </div>

        {/* Social buttons */}
        <div className="grid grid-cols-2 gap-3">
          {/* Google */}
          <button
            type="button"
            onClick={() => handleOAuth("oauth_google")}
            className="theme-button-secondary flex items-center justify-center gap-2 rounded-lg border py-3 text-sm font-semibold transition active:scale-[0.99]"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>
          {/* Discord */}
          <button
            type="button"
            onClick={() => handleOAuth("oauth_discord")}
            className="theme-button-secondary flex items-center justify-center gap-2 rounded-lg border py-3 text-sm font-semibold transition active:scale-[0.99]"
          >
            <svg className="h-5 w-5" viewBox="0 0 127.14 96.36" fill="currentColor">
              <path d="M107.7 8.07A105.15 105.15 0 0 0 81.47 0a72.06 72.06 0 0 0-3.36 6.83 97.68 97.68 0 0 0-29.11 0A72.37 72.37 0 0 0 45.64 0a105.89 105.89 0 0 0-26.25 8.09C2.79 32.65-1.71 56.6.54 80.21a105.73 105.73 0 0 0 32.17 16.15 77.7 77.7 0 0 0 6.89-11.11 68.42 68.42 0 0 1-10.85-5.18c.91-.66 1.8-1.34 2.66-2a75.57 75.57 0 0 0 64.32 0c.87.71 1.76 1.39 2.66 2a68.68 68.68 0 0 1-10.87 5.19 77 77 0 0 0 6.89 11.1 105.25 105.25 0 0 0 32.19-16.14c2.64-27.38-4.51-51.11-18.9-72.15ZM42.45 65.69C36.18 65.69 31 60 31 53s5-12.74 11.43-12.74S54 46 53.89 53s-5.05 12.69-11.44 12.69Zm42.24 0C78.41 65.69 73.25 60 73.25 53s5-12.74 11.44-12.74S96.23 46 96.12 53s-5.04 12.69-11.43 12.69Z"/>
            </svg>
            Discord
          </button>
        </div>

        <p className="mt-6 text-center text-sm text-[var(--muted)]">
          {content.altLabel}{" "}
          <Link href={altHref} className="theme-link font-semibold transition">
            {content.altText}
          </Link>
        </p>
      </div>
    </main>
  );
}
