"use client";

import { Shield, DollarSign, BadgeCheck, Star, Headphones } from "lucide-react";

type TrustCopy = {
  heading: string;
  features: Array<{ title: string; desc: string }>;
};

const featureIcons = [DollarSign, Shield, BadgeCheck, Star, Headphones] as const;

export default function TrustSection({ copy }: { copy: TrustCopy }) {
  return (
    <section className="rounded-lg border border-[var(--line)] bg-[var(--surface)] p-5 sm:p-7">
          <h2 className="mb-6 text-2xl font-semibold">
            {copy.heading}
          </h2>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
            {copy.features.map((item, index) => {
              const Icon = featureIcons[index];
              return (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-md border border-[var(--line)] text-[var(--muted)]">
                    <Icon className="h-5 w-5" />
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
