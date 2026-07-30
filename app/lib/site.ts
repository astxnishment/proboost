// Canonical site origin, overridable per environment (e.g. preview deploys).
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://proboost.gg";

export const SITE_NAME = "ProBoost";

// Languages with a routed /{lang}/rainbow-six-siege-boost tree.
// "en" is listed separately because it has its own static route tree.
export const SUPPORTED_LANGS = [
  "it",
  "fr",
  "es",
  "de",
  "nl",
  "pt",
  "uk",
  "ru",
] as const;

export const ALL_LANGS = ["en", ...SUPPORTED_LANGS] as const;
export type SupportedLanguage = (typeof ALL_LANGS)[number];

export function isSupportedLanguage(
  value: string
): value is SupportedLanguage {
  return (ALL_LANGS as readonly string[]).includes(value);
}

// hreflang map for a path that exists under every /{lang}/ prefix.
// Relative URLs are resolved against metadataBase from the root layout.
export function langAlternates(subPath: string): Record<string, string> {
  const languages: Record<string, string> = {};
  for (const lang of ALL_LANGS) {
    languages[lang] = `/${lang}/${subPath}`;
  }
  languages["x-default"] = `/en/${subPath}`;
  return languages;
}
