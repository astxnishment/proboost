"use client";

import Image from "next/image";
import { Shield, DollarSign, BadgeCheck, Star, Headphones } from "lucide-react";

type TrustCopy = {
  heading: string;
  features: Array<{ title: string; desc: string }>;
};

const featureIcons = [DollarSign, Shield, BadgeCheck, Star, Headphones] as const;

export default function TrustSection({ copy }: { copy: TrustCopy }) {
  return (
    <section className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a] text-white shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
      {/* bg image fills right side */}
      <div className="pointer-events-none absolute inset-y-0 right-0 hidden w-[50%] lg:block xl:w-[52%]">
        <div className="absolute inset-y-0 right-[4%] w-[90%]">
          <Image
            src="/bg.png"
            alt=""
            fill
            priority
            unoptimized
            className="object-contain object-center scale-[1.38]"
          />
        </div>
        {/* blue glow behind the shield */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_52%,rgba(56,189,248,0.16),transparent_16%),radial-gradient(ellipse_at_54%_52%,rgba(37,99,235,0.34),transparent_24%),radial-gradient(ellipse_at_72%_52%,rgba(30,64,175,0.18),transparent_42%)]" />
        {/* fade left edge into section bg */}
        <div className="absolute inset-y-0 left-0 w-44 bg-gradient-to-r from-[#0a0a0a] via-[#0a0a0a]/96 to-transparent" />
      </div>

      <div className="relative z-10 px-6 py-10 sm:px-8 sm:py-12 lg:px-10 lg:py-14">
        <div className="max-w-[52%] xl:max-w-[48%]">
          <h2 className="mb-8 text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {copy.heading}
          </h2>

          <div className="flex flex-col gap-6">
            {copy.features.map((item, index) => {
              const Icon = featureIcons[index];
              return (
                <div key={item.title} className="flex items-start gap-4">
                  <div className="mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-cyan-500/30 bg-cyan-500/10 text-cyan-300">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">{item.title}</h3>
                    <p className="mt-0.5 text-sm leading-6 text-zinc-400">{item.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}