"use client";

import { ClerkProvider } from '@clerk/nextjs';
import { useEffect, useState, type ComponentProps, type ReactNode } from 'react';
import { useLanguage } from './Localization';

const loaders = {
  en: () => import('@clerk/localizations/en-GB').then(module => module.enGB),
  it: () => import('@clerk/localizations/it-IT').then(module => module.itIT),
  fr: () => import('@clerk/localizations/fr-FR').then(module => module.frFR),
  es: () => import('@clerk/localizations/es-ES').then(module => module.esES),
  de: () => import('@clerk/localizations/de-DE').then(module => module.deDE),
  nl: () => import('@clerk/localizations/nl-NL').then(module => module.nlNL),
  pt: () => import('@clerk/localizations/pt-PT').then(module => module.ptPT),
  uk: () => import('@clerk/localizations/uk-UA').then(module => module.ukUA),
  ru: () => import('@clerk/localizations/ru-RU').then(module => module.ruRU),
};

export default function LocalizedAuthProvider({ children }: { children: ReactNode }) {
  const language = useLanguage();
  const [localization, setLocalization] = useState<ComponentProps<typeof ClerkProvider>['localization']>();
  useEffect(() => {
    let active = true;
    loaders[language]().then(value => { if (active) setLocalization(value); });
    return () => { active = false; };
  }, [language]);

  return <ClerkProvider localization={localization} signInUrl={`/${language}/login`} signUpUrl={`/${language}/signup`} appearance={{ variables: {
    colorPrimary: 'var(--accent)',
    colorBackground: 'var(--surface)',
    colorForeground: 'var(--foreground)',
    colorInputBackground: 'var(--background)',
    colorInputForeground: 'var(--foreground)',
  } }}>{children}</ClerkProvider>;
}
