"use client";

import { Shield, DollarSign, BadgeCheck, Star, Headphones } from "lucide-react";

type TrustCopy = {
  heading: string;
  features: Array<{ title: string; desc: string }>;
};

const featureIcons = [DollarSign, Shield, BadgeCheck, Star, Headphones] as const;

export default function TrustSection({ copy }: { copy: TrustCopy }) {
  return (
    <section className="border-y border-[var(--line)] py-7 sm:py-9">
      <h2 className="mb-6 text-xl font-semibold sm:text-2xl">
        {copy.heading}
      </h2>

      <div className="grid gap-x-6 gap-y-5 sm:grid-cols-2 xl:grid-cols-5">
        {copy.features.map((item, index) => {
          const Icon = featureIcons[index];
          return (
            <div key={item.title} className="flex items-start gap-3">
              <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[var(--surface-subtle)] text-[var(--muted)]">
                <Icon aria-hidden="true" className="h-4 w-4" />
              </div>
              <div>
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="mt-1 text-xs leading-5 text-[var(--muted)]">{item.desc}</p>
              </div>
            </div>
          );
        })}
          </div>
    </section>
  );
}
