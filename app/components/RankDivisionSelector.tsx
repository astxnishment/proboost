import type { CSSProperties } from "react";

export default function RankDivisionSelector({
  divisions,
  value,
  accent,
  onChange,
  isDisabled,
  ariaLabel,
  className = "",
}: {
  divisions: readonly string[];
  value: string;
  accent: string;
  onChange: (division: string) => void;
  isDisabled?: (division: string) => boolean;
  ariaLabel: string;
  className?: string;
}) {
  return (
    <div
      role="group"
      aria-label={ariaLabel}
      className={`grid grid-cols-5 gap-1.5 rounded-xl border border-[var(--line)] bg-[var(--surface-muted)] p-1.5 ${className}`}
    >
      {divisions.map((division) => {
        const disabled = isDisabled?.(division) ?? false;
        const selected = value === division && !disabled;
        const buttonStyle = {
          "--rank-accent": accent,
          outlineColor: accent,
          ...(selected
            ? {
                borderColor: `color-mix(in srgb, ${accent} 58%, var(--line))`,
                backgroundColor: `color-mix(in srgb, ${accent} 13%, var(--surface))`,
                color: accent,
                boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${accent} 10%, transparent)`,
              }
            : {}),
        } as CSSProperties;

        return (
          <button
            key={division}
            type="button"
            disabled={disabled}
            aria-pressed={selected}
            onClick={() => onChange(division)}
            style={buttonStyle}
            className={`relative min-h-12 rounded-lg border px-2 text-sm font-semibold transition-[background-color,border-color,color,box-shadow] duration-150 ${
              disabled
                ? "cursor-not-allowed border-transparent bg-transparent text-[var(--muted-soft)] opacity-30"
                : selected
                  ? "cursor-pointer"
                  : "cursor-pointer border-transparent bg-transparent text-[var(--foreground-soft)] hover:border-[var(--line)] hover:bg-[var(--surface)] hover:text-[var(--foreground)]"
            }`}
          >
            {division}
            <span
              aria-hidden="true"
              className={`absolute inset-x-3 bottom-0 h-0.5 rounded-full transition-opacity duration-150 ${
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
