"use client";

import React from "react";
import Link from "next/link";
import {
  CURRENCIES,
  CURRENCY_DEFINITIONS,
  isCurrencyCode,
} from "../lib/currency";
import { useCurrency } from "./CurrencyProvider";

export type DropdownItem = {
  id: string;
  label: string;
  description?: string;
  icon?: React.ReactNode;
  /** Small right-aligned grey text (hidden when the item is selected). */
  meta?: string;
  selected?: boolean;
  disabled?: boolean;
  href?: string;
  onSelect?: (id: string) => void;
  /** Draw a hairline separator below this item. */
  separatorAfter?: boolean;
};

type DropdownProps = {
  /** Content of the trigger button; a chevron is appended automatically. */
  trigger: React.ReactNode;
  items: DropdownItem[];
  align?: "start" | "end";
  ariaLabel: string;
  /** Marks the menu as a single-choice list (menuitemradio + aria-checked). */
  selectable?: boolean;
  triggerClassName?: string;
  menuClassName?: string;
  showChevron?: boolean;
  /** Extra classes for the root wrapper (defaults to inline-block). */
  className?: string;
  /** Optional compact heading rendered above the menu items. */
  menuHeader?: React.ReactNode;
};

function CheckIcon() {
  return (
    <svg
      className="dd-check"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M3 8.5 6.5 12 13 4.5" />
    </svg>
  );
}

export function Dropdown({
  trigger,
  items,
  align = "end",
  ariaLabel,
  selectable = false,
  triggerClassName,
  menuClassName,
  showChevron = true,
  className,
  menuHeader,
}: DropdownProps) {
  const [open, setOpen] = React.useState(false);
  const rootRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);
  const panelRef = React.useRef<HTMLDivElement>(null);
  const itemRefs = React.useRef<(HTMLElement | null)[]>([]);

  React.useEffect(() => {
    if (!open) return;
    const onPointerDown = (e: MouseEvent | TouchEvent) => {
      if (!rootRef.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onPointerDown);
    document.addEventListener("touchstart", onPointerDown);
    return () => {
      document.removeEventListener("mousedown", onPointerDown);
      document.removeEventListener("touchstart", onPointerDown);
    };
  }, [open]);

  // Keep the panel inside the viewport (12px safe margin on both edges).
  React.useLayoutEffect(() => {
    if (!open || !panelRef.current) return;
    const panel = panelRef.current;
    panel.style.marginLeft = "";
    const rect = panel.getBoundingClientRect();
    const overflowRight = rect.right - (window.innerWidth - 12);
    if (overflowRight > 0) panel.style.marginLeft = `${-overflowRight}px`;
    const rectAfter = panel.getBoundingClientRect();
    const overflowLeft = 12 - rectAfter.left;
    if (overflowLeft > 0)
      panel.style.marginLeft = `${parseFloat(panel.style.marginLeft || "0") + overflowLeft}px`;
  }, [open]);

  const focusItem = (index: number) => {
    itemRefs.current[index]?.focus();
  };

  const enabledIndexes = React.useMemo(
    () => items.map((item, i) => (item.disabled ? -1 : i)).filter((i) => i >= 0),
    [items]
  );

  // Enter/Space toggle via the button's native click; ArrowDown opens the
  // menu (if needed) and moves focus into the list.
  const pendingFocusRef = React.useRef(false);

  React.useEffect(() => {
    if (open && pendingFocusRef.current) {
      pendingFocusRef.current = false;
      if (enabledIndexes.length > 0) focusItem(enabledIndexes[0]);
    }
  }, [open, enabledIndexes]);

  const onTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (open) {
        if (enabledIndexes.length > 0) focusItem(enabledIndexes[0]);
      } else {
        pendingFocusRef.current = true;
        setOpen(true);
      }
    } else if (e.key === "Escape" && open) {
      setOpen(false);
    }
  };

  const onMenuKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Escape") {
      e.preventDefault();
      setOpen(false);
      triggerRef.current?.focus();
      return;
    }
    if (e.key === "Tab") {
      setOpen(false);
      return;
    }
    if (!["ArrowDown", "ArrowUp", "Home", "End"].includes(e.key)) return;
    e.preventDefault();
    if (enabledIndexes.length === 0) return;
    const activePos = enabledIndexes.findIndex(
      (i) => itemRefs.current[i] === document.activeElement
    );
    let nextPos = activePos;
    if (e.key === "Home" || (e.key === "ArrowDown" && activePos === -1)) nextPos = 0;
    else if (e.key === "End" || (e.key === "ArrowUp" && activePos === -1))
      nextPos = enabledIndexes.length - 1;
    else if (e.key === "ArrowDown") nextPos = (activePos + 1) % enabledIndexes.length;
    else if (e.key === "ArrowUp")
      nextPos = (activePos - 1 + enabledIndexes.length) % enabledIndexes.length;
    focusItem(enabledIndexes[nextPos]);
  };

  const itemRole = selectable ? "menuitemradio" : "menuitem";

  return (
    <div ref={rootRef} className={`relative ${className ?? "inline-block"}`}>
      <button
        ref={triggerRef}
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label={ariaLabel}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onTriggerKeyDown}
        className={triggerClassName ?? "dd-trigger"}
      >
        {trigger}
        {showChevron && (
          <svg
            className="dd-chevron"
            viewBox="0 0 16 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <path d="M4 6.25 8 10.25 12 6.25" />
          </svg>
        )}
      </button>

      {open && (
        <div
          ref={panelRef}
          role="menu"
          aria-label={ariaLabel}
          onKeyDown={onMenuKeyDown}
          className={`dd-panel ${align === "end" ? "right-0" : "left-0"} ${menuClassName ?? ""}`}
        >
          {menuHeader ? <div className="dd-panel-header">{menuHeader}</div> : null}
          {items.map((item, i) => {
            const content = (
              <>
                {item.icon && <span className="dd-item-icon">{item.icon}</span>}
                <span className="dd-item-body">
                  <span className="dd-item-label">{item.label}</span>
                  {item.description && (
                    <span className="dd-item-desc">{item.description}</span>
                  )}
                </span>
                {item.selected ? (
                  <CheckIcon />
                ) : item.meta ? (
                  <span className="dd-item-meta">{item.meta}</span>
                ) : null}
              </>
            );

            const shared = {
              role: itemRole,
              tabIndex: -1,
              className: "dd-item",
              "aria-disabled": item.disabled || undefined,
              ...(selectable ? { "aria-checked": !!item.selected } : {}),
            } as const;

            const activate = () => {
              item.onSelect?.(item.id);
              setOpen(false);
            };

            const node =
              item.href && !item.disabled ? (
                <Link
                  key={item.id}
                  href={item.href}
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  onClick={activate}
                  {...shared}
                >
                  {content}
                </Link>
              ) : (
                <button
                  key={item.id}
                  type="button"
                  ref={(el) => {
                    itemRefs.current[i] = el;
                  }}
                  onClick={item.disabled ? undefined : activate}
                  disabled={item.disabled}
                  {...shared}
                >
                  {content}
                </button>
              );

            return (
              <React.Fragment key={item.id}>
                {node}
                {item.separatorAfter && i < items.length - 1 && (
                  <div className="dd-separator" role="separator" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      )}
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Language picker — shared across the homepage and all service pages */
/* ------------------------------------------------------------------ */

export const LANGUAGES = [
  { code: "en", name: "English" },
  { code: "it", name: "Italiano" },
  { code: "fr", name: "Français" },
  { code: "es", name: "Español" },
  { code: "de", name: "Deutsch" },
  { code: "nl", name: "Nederlands" },
  { code: "pt", name: "Português" },
  { code: "uk", name: "Українська" },
  { code: "ru", name: "Русский" },
] as const;

export type LanguageCode = (typeof LANGUAGES)[number]["code"];

function GlobeIcon() {
  return (
    <svg
      className="dd-globe"
      viewBox="0 0 16 16"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.2"
      strokeLinecap="round"
      aria-hidden
    >
      <circle cx="8" cy="8" r="6.25" />
      <path d="M1.75 8h12.5M8 1.75c-1.8 1.7-2.7 3.9-2.7 6.25S6.2 12.55 8 14.25c1.8-1.7 2.7-3.9 2.7-6.25S9.8 3.45 8 1.75Z" />
    </svg>
  );
}

export function LanguageDropdown({
  value,
  onChange,
  align = "end",
}: {
  value: string;
  onChange: (code: LanguageCode) => void;
  align?: "start" | "end";
}) {
  return (
    <Dropdown
      ariaLabel="Select language"
      align={align}
      selectable
      trigger={
        <>
          <GlobeIcon />
          <span className="dd-trigger-code">{value}</span>
        </>
      }
      items={LANGUAGES.map((lang) => ({
        id: lang.code,
        label: lang.name,
        meta: lang.code.toUpperCase(),
        selected: lang.code === value,
        onSelect: () => {
          try {
            window.localStorage.setItem("proboost_lang", lang.code);
            window.dispatchEvent(new CustomEvent("proboost:language-change", { detail: lang.code }));
          } catch {}
          onChange(lang.code);
        },
      }))}
    />
  );
}

export function CurrencyDropdown({
  align = "end",
}: {
  align?: "start" | "end";
}) {
  const { currency, setCurrency, symbol } = useCurrency();

  return (
    <Dropdown
      ariaLabel="Select currency"
      align={align}
      className="currency-picker inline-block"
      selectable
      trigger={
        <>
          <span className="dd-currency-symbol" aria-hidden>
            {symbol}
          </span>
          <span className="dd-trigger-code">{currency}</span>
        </>
      }
      menuHeader={
        <>
          <p className="text-xs font-semibold text-[var(--foreground)]">
            Display currency
          </p>
          <p className="mt-1 text-[11px] leading-4 text-[var(--muted)]">
            Checkout uses the same currency.
          </p>
        </>
      }
      items={CURRENCIES.map((code) => ({
        id: code,
        label: CURRENCY_DEFINITIONS[code].name,
        meta: CURRENCY_DEFINITIONS[code].symbol,
        selected: code === currency,
        onSelect: (id) => {
          if (isCurrencyCode(id)) setCurrency(id);
        },
      }))}
    />
  );
}
