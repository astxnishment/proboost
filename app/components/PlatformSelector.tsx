import type { CSSProperties } from "react";
import PlatformLogo from "./PlatformLogo";

const PLATFORM_ACCENTS: Record<string, string> = {
  PC: "#0078d4",
  Xbox: "#107c10",
  PlayStation: "#006fcd",
};

export default function PlatformSelector({
  platforms,
  value,
  onChange,
  ariaLabel = "Select platform",
}: {
  platforms: readonly string[];
  value: string;
  onChange: (platform: string) => void;
  ariaLabel?: string;
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className="grid gap-1.5 rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-1.5 sm:grid-cols-3"
    >
      {platforms.map((platform) => {
        const selected = value === platform;
        const accent = PLATFORM_ACCENTS[platform] ?? "var(--foreground)";
        const buttonStyle = {
          "--platform-accent": accent,
          outlineColor: accent,
          ...(selected
            ? {
                borderColor: `color-mix(in srgb, ${accent} 58%, var(--line))`,
                backgroundColor: `color-mix(in srgb, ${accent} 14%, var(--surface))`,
                boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${accent} 12%, transparent)`,
              }
            : {}),
        } as CSSProperties;

        return (
          <button
            key={platform}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(platform)}
            style={buttonStyle}
            className={`group relative flex min-h-14 items-center justify-center gap-2.5 overflow-hidden rounded-lg border px-4 text-sm font-semibold transition-[background-color,border-color,color,box-shadow,transform] duration-150 ${
              selected
                ? "text-[var(--foreground)]"
                : "border-transparent bg-transparent text-[var(--foreground-soft)] hover:border-[var(--line)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
            }`}
          >
            <PlatformLogo
              platform={platform}
              size={22}
              className="transition-transform duration-150 group-hover:scale-105"
            />
            <span>{platform}</span>
            <span
              aria-hidden="true"
              className={`absolute inset-x-5 bottom-0 h-0.5 rounded-full transition-opacity duration-150 ${
                selected ? "opacity-100" : "opacity-0"
              }`}
              style={{ backgroundColor: accent }}
            />
          </button>
        );
      })}
    </div>
  );
}
