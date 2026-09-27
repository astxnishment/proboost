"use client";

import React from 'react';
import { usePathname } from 'next/navigation';
import { isLocale, localeFromPath, localizedHref, translate, type Locale } from '../lib/localization';

const LocaleContext = React.createContext<Locale>('en');
const CHANGE_EVENT = 'proboost:language-change';
function savedLocale(): Locale {
  try { const value = window.localStorage.getItem('proboost_lang'); return isLocale(value) ? value : 'en'; } catch { return 'en'; }
}
function subscribe(onChange: () => void) {
  const storage = (event: StorageEvent) => { if (event.key === 'proboost_lang') onChange(); };
  window.addEventListener(CHANGE_EVENT, onChange);
  window.addEventListener('storage', storage);
  return () => { window.removeEventListener(CHANGE_EVENT, onChange); window.removeEventListener('storage', storage); };
}
export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const preferred = React.useSyncExternalStore(subscribe, savedLocale, () => 'en' as Locale);
  const locale = localeFromPath(pathname) ?? preferred;
  React.useEffect(() => {
    document.documentElement.lang = locale;
    try {
      if (window.localStorage.getItem('proboost_lang') !== locale) {
        window.localStorage.setItem('proboost_lang', locale);
        window.dispatchEvent(new CustomEvent(CHANGE_EVENT, { detail: locale }));
      }
    } catch { /* Keep the selected route language when storage is unavailable. */ }
  }, [locale]);
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}
export function useLanguage() { return React.useContext(LocaleContext); }

const visibleAttributes = ['aria-label', 'aria-description', 'aria-valuetext', 'title', 'alt', 'placeholder', 'ariaLabel'] as const;
const inlineTags = new Set(['strong', 'em', 'b', 'i', 'span', 'a', 'small']);
type ContentProps = Record<string, unknown> & { children?: React.ReactNode; value?: unknown; href?: string; lang?: string };

// Localize render output, never the DOM or canonical form values. Keeping this at
// component boundaries also covers conditional content and accessible labels.
export function localizeContent(node: React.ReactNode, locale: Locale): React.ReactNode {
  if (typeof node === 'string') return translate(locale, node);
  if (Array.isArray(node)) return node.map(child => localizeContent(child, locale));
  if (!React.isValidElement<ContentProps>(node)) return node;
  const props = node.props;
  if (props.translate === 'no' || ['style', 'script', 'code', 'pre'].includes(String(node.type))) return node;
  const updates: ContentProps = {};
  for (const name of visibleAttributes) if (typeof props[name] === 'string') updates[name] = translate(locale, props[name] as string);
  if (typeof props.href === 'string') updates.href = localizedHref(props.href, locale);
  if (props.lang === 'en') updates.lang = locale;
  if (node.type === 'option' && props.value === undefined && typeof props.children === 'string') updates.value = props.children;
  if (props.children !== undefined) {
    const children = React.Children.toArray(props.children);
    if (children.every(child => typeof child === 'string' || typeof child === 'number')) {
      const source = children.join('');
      const translated = translate(locale, source);
      updates.children = translated !== source ? translated : children.map(child => localizeContent(child, locale));
    } else if (children.some(child => typeof child === 'string' && /[a-z]/i.test(child)) && children.every(child => typeof child === 'string' || typeof child === 'number' || (React.isValidElement(child) && inlineTags.has(String(child.type))))) {
      const insertions: React.ReactNode[] = [];
      const source = children.map(child => {
        if (typeof child === 'string' || typeof child === 'number') return String(child);
        insertions.push(localizeContent(child, locale));
        return `{${insertions.length - 1}}`;
      }).join('');
      const translated = translate(locale, source);
      updates.children = translated !== source ? translated.split(/(\{\d+\})/).map(part => /^\{\d+\}$/.test(part) ? insertions[Number(part.slice(1, -1))] : part) : children.map(child => localizeContent(child, locale));
    } else updates.children = children.map(child => localizeContent(child, locale));
  }
  return React.cloneElement(node, updates);
}
export default function Localized({ children }: { children: React.ReactNode }) {
  return localizeContent(children, useLanguage());
}
