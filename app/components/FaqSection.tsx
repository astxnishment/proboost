"use client";

import React from "react";
import { ChevronDown } from "lucide-react";

type FaqCopy = {
  label: string;
  items: Array<{ q: string; a: string }>;
};

export default function FaqSection({ copy }: { copy: FaqCopy }) {
  const [open, setOpen] = React.useState<number | null>(null);
  const idPrefix = React.useId();

  return (
    <section className="mt-10">
      <p className="eyebrow mb-4">
        {copy.label}
      </p>

      <div className="overflow-hidden rounded-lg border border-[var(--line)] bg-[var(--surface)]">
        {copy.items.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div
              key={faq.q}
              className={`border-b border-[var(--line)] transition-colors last:border-b-0 ${
                isOpen ? "bg-[var(--surface-muted)]" : "hover:bg-[var(--surface-raised)]"
              }`}
            >
              <button
                type="button"
                id={`${idPrefix}-question-${i}`}
                aria-expanded={isOpen}
                aria-controls={`${idPrefix}-answer-${i}`}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left sm:px-6 sm:py-5"
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="text-sm font-semibold text-[var(--foreground)] sm:text-base">{faq.q}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={`h-4 w-4 shrink-0 text-[var(--muted)] transition-transform duration-200 ${
                    isOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              <div
                id={`${idPrefix}-answer-${i}`}
                role="region"
                aria-labelledby={`${idPrefix}-question-${i}`}
                aria-hidden={!isOpen}
                inert={!isOpen}
                className={`grid transition-[grid-template-rows] duration-200 ease-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="max-w-3xl px-5 pb-5 text-sm leading-7 text-[var(--muted)] sm:px-6">
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
