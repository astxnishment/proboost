"use client";

import React from "react";

type FaqCopy = {
  label: string;
  items: Array<{ q: string; a: string }>;
};

export default function FaqSection({ copy }: { copy: FaqCopy }) {
  const [open, setOpen] = React.useState<number | null>(null);
  const idPrefix = React.useId();

  return (
    <section className="mt-8">
      <p className="mb-4 text-xs font-semibold uppercase text-[var(--muted)]">
        {copy.label}
      </p>

      <div className="flex flex-col gap-3">
        {copy.items.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div
              key={faq.q}
              className={`rounded-xl border transition-colors duration-300 ${
                isOpen
                  ? "border-[var(--line-strong)] bg-[var(--surface-muted)]"
                  : "border-[var(--line)] bg-[var(--surface)] hover:border-[var(--line-strong)]"
              }`}
            >
              <button
                type="button"
                id={`${idPrefix}-question-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${idPrefix}-answer-${i}`}
                className="flex w-full items-center justify-between px-5 py-4 text-left sm:px-6 sm:py-5"
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="text-base font-semibold text-[var(--foreground)]">{faq.q}</span>
                {/* chevron rotates smoothly */}
                <span
                  className={`ml-4 shrink-0 text-[var(--muted)] transition-transform duration-300 ${
                    isOpen ? "rotate-180" : "rotate-0"
                  }`}
                >
                  <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                    <path
                      d="M4 6.5L9 11.5L14 6.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </button>

              {/* smooth height animation via CSS grid trick */}
              <div
                id={`${idPrefix}-answer-${i}`}
                role="region"
                aria-labelledby={`${idPrefix}-question-${i}`}
                aria-hidden={!isOpen}
                inert={!isOpen}
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-5 text-sm leading-7 text-[var(--muted)]">
                    {faq.a}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
