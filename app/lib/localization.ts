import it from './locales/it.json';
import fr from './locales/fr.json';
import es from './locales/es.json';
import de from './locales/de.json';
import nl from './locales/nl.json';
import pt from './locales/pt.json';
import uk from './locales/uk.json';
import ru from './locales/ru.json';

export const LOCALES = ['en', 'it', 'fr', 'es', 'de', 'nl', 'pt', 'uk', 'ru'] as const;
export type Locale = typeof LOCALES[number];
export const LANGUAGE_LOCALES: Record<Locale, string> = { en: 'en-GB', it: 'it-IT', fr: 'fr-FR', es: 'es-ES', de: 'de-DE', nl: 'nl-NL', pt: 'pt-PT', uk: 'uk-UA', ru: 'ru-RU' };
const dictionaries: Record<string, Record<string, string>> = { it, fr, es, de, nl, pt, uk, ru };
// Counted order units need grammatical plural forms, especially in Ukrainian
// and Russian. The keys and numeric values sent to checkout stay in English.
const countedUnits: Record<string, Record<string, string[]>> = {
  it: { win: ['vittoria', 'vittorie'], match: ['partita', 'partite'], placement: ['partita di piazzamento', 'partite di piazzamento'] },
  fr: { win: ['victoire', 'victoires'], match: ['match', 'matchs'], placement: ['match de placement', 'matchs de placement'] },
  es: { win: ['victoria', 'victorias'], match: ['partida', 'partidas'], placement: ['partida de posicionamiento', 'partidas de posicionamiento'] },
  de: { win: ['Sieg', 'Siege'], match: ['Match', 'Matches'], placement: ['Platzierungsmatch', 'Platzierungsmatches'] },
  nl: { win: ['overwinning', 'overwinningen'], match: ['wedstrijd', 'wedstrijden'], placement: ['plaatsingswedstrijd', 'plaatsingswedstrijden'] },
  pt: { win: ['vitória', 'vitórias'], match: ['partida', 'partidas'], placement: ['partida de colocação', 'partidas de colocação'] },
  uk: { win: ['перемога', 'перемог', 'перемоги'], match: ['матч', 'матчів', 'матчі'], placement: ['калібрувальний матч', 'калібрувальних матчів', 'калібрувальні матчі'] },
  ru: { win: ['победа', 'побед', 'победы'], match: ['матч', 'матчей', 'матча'], placement: ['калибровочный матч', 'калибровочных матчей', 'калибровочных матча'] },
};
const runUnits: Record<string, string[]> = {
  it: ['spedizione', 'spedizioni'], fr: ['passage', 'passages'], es: ['recorrido', 'recorridos'], de: ['Durchlauf', 'Durchläufe'],
  nl: ['run', 'runs'], pt: ['visita', 'visitas'], uk: ['проходження', 'проходжень', 'проходження'], ru: ['прохождение', 'прохождений', 'прохождения'],
};
export function isLocale(value: unknown): value is Locale { return typeof value === 'string' && (LOCALES as readonly string[]).includes(value); }
export function localeFromPath(path: string): Locale | undefined { const value = path.split('/')[1]; return isLocale(value) ? value : undefined; }
export function localizedHref(href: string, locale: Locale): string {
  if (/^\/(en|it|fr|es|de|nl|pt|uk|ru)(?=\/|[?#]|$)/.test(href)) return href.replace(/^\/[^/?#]+/, `/${locale}`);
  if (/^\/(?:[?#].*)?$/.test(href)) return `/${locale}${href.slice(1)}`;
  if (/^\/(?:contact|terms|privacy|login|signup(?:\/verify)?)(?=[?#]|$)/.test(href)) return `/${locale}${href}`;
  return href;
}
export function normalizeMessage(value: string): string { return value.replace(/\s+/g, ' ').trim(); }
const patterns = new Map<string, { regex: RegExp; source: string; target: string; keys: string[] }[]>();
function messagePatterns(locale: Locale) {
  if (!patterns.has(locale)) {
    patterns.set(locale, Object.entries(dictionaries[locale] ?? {}).filter(([source]) => /\{\d+\}/.test(source) && /[a-z]{3}/i.test(source.replace(/\{\d+\}/g, ''))).map(([source, target]) => {
      const keys: string[] = [];
      const parts = source.split(/(\{\d+\})/).map(part => {
        if (/^\{\d+\}$/.test(part)) { keys.push(part); return '(.+?)'; }
        return part.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      });
      return { source, target, keys, regex: new RegExp(`^${parts.join('')}$`, 'u') };
    }).sort((a, b) => b.source.replace(/\{\d+\}/g, '').length - a.source.replace(/\{\d+\}/g, '').length));
  }
  return patterns.get(locale)!;
}
export function translate(locale: Locale | string, input: string, depth = 0): string {
  if (locale === 'en' || !isLocale(locale) || !input.trim()) return input;
  const key = normalizeMessage(input);
  const dictionary = dictionaries[locale];
  let result = dictionary?.[key];
  const quantity = key.match(/^(\d+) (hours?|wins?|runs?|(?:placement )?match(?:es)?)$/);
  if (quantity) {
    const count = Number(quantity[1]);
    const localeTag = LANGUAGE_LOCALES[locale];
    if (quantity[2].startsWith('hour')) {
      result = new Intl.NumberFormat(localeTag, { style: 'unit', unit: 'hour', unitDisplay: 'long' }).format(count);
    } else {
      const unit = quantity[2].startsWith('win') ? 'win' : quantity[2].startsWith('placement') ? 'placement' : 'match';
      const forms = quantity[2].startsWith('run') ? runUnits[locale] : countedUnits[locale][unit];
      const plural = new Intl.PluralRules(localeTag).select(count);
      const label = plural === 'one' ? forms[0] : plural === 'few' ? forms[2] ?? forms[1] : forms[1];
      result = `${new Intl.NumberFormat(localeTag).format(count)} ${label}`;
    }
  }
  // Compact delivery estimates use localized day/hour units and punctuation.
  if (result === undefined && /^~?\s*\d+(?:\s+days?,\s*\d+h|h)$/.test(key)) {
    result = key.replace(/(\d+)\s*(days?|h)/g, (_match, count: string, unit: string) => new Intl.NumberFormat(LANGUAGE_LOCALES[locale], {
      style: 'unit', unit: unit === 'h' ? 'hour' : 'day', unitDisplay: 'short',
    }).format(Number(count)));
  }
  // Rank names are followed by canonical divisions. Translate the name while
  // preserving the division used by the game and the order calculator.
  if (result === undefined) {
    const rank = key.match(/^(.+) (I{1,3}|IV|V|VI{0,3}|IX|X|\d+)$/);
    if (rank && dictionary[rank[1]]) result = `${dictionary[rank[1]]} ${rank[2]}`;
  }
  if (result === undefined && depth < 2) {
    for (const pattern of messagePatterns(locale)) {
      const match = pattern.regex.exec(key);
      if (!match) continue;
      result = pattern.target.replace(/\{\d+\}/g, token => {
        const index = pattern.keys.indexOf(token);
        return index < 0 ? token : translate(locale, match[index + 1], depth + 1);
      });
      break;
    }
  }
  if (result === undefined) return input;
  return `${input.match(/^\s*/)?.[0] ?? ''}${result}${input.match(/\s*$/)?.[0] ?? ''}`;
}
export function dictionaryFor(locale: Locale): Readonly<Record<string, string>> { return dictionaries[locale] ?? {}; }
