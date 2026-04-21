"use client";

import React from "react";

type FaqCopy = {
  label: string;
  items: Array<{ q: string; a: string }>;
};

export default function FaqSection({ copy }: { copy: FaqCopy }) {
  const [open, setOpen] = React.useState<number | null>(null);

  return (
    <section className="mt-8">
      <p className="mb-4 text-center text-xs font-semibold uppercase tracking-[0.28em] text-cyan-400">
        {copy.label}
      </p>

      <div className="flex flex-col gap-3">
        {copy.items.map((faq, i) => {
          const isOpen = open === i;
          return (
            <div
              key={i}
              className={`rounded-2xl border transition-colors duration-300 ${
                isOpen
                  ? "border-cyan-500/30 bg-white/[0.04]"
                  : "border-white/10 bg-white/[0.02]"
              }`}
            >
              <button
                className="flex w-full items-center justify-between px-6 py-5 text-left"
                onClick={() => setOpen(isOpen ? null : i)}
              >
                <span className="text-base font-semibold text-white">{faq.q}</span>
                {/* chevron rotates smoothly */}
                <span
                  className={`ml-4 shrink-0 text-cyan-400 transition-transform duration-300 ${
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
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="px-6 pb-5 text-sm leading-7 text-zinc-400">
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
