import Image from "next/image";
import Link from "next/link";

type AuthScreenProps = {
  mode: "login" | "signup";
};

const copy = {
  login: {
    eyebrow: "Member Access",
    title: "Log in to ProBoost",
    subtitle: "Track orders, manage boosters, and return to checkout without rebuilding your setup.",
    primary: "Log In",
    altLabel: "Need an account?",
    altHref: "/signup",
    altText: "Sign up",
  },
  signup: {
    eyebrow: "Create Account",
    title: "Sign up for ProBoost",
    subtitle: "Create an account to save your orders, manage account details, and move through checkout faster.",
    primary: "Create Account",
    altLabel: "Already have an account?",
    altHref: "/login",
    altText: "Log in",
  },
} as const;

export default function AuthScreen({ mode }: AuthScreenProps) {
  const content = copy[mode];

  return (
    <div className="relative mx-auto max-w-6xl px-6 py-24">
      <div className="grid overflow-hidden rounded-[2rem] border border-white/10 bg-[#0a0d12]/90 shadow-[0_30px_120px_rgba(0,0,0,0.45)] backdrop-blur-md lg:grid-cols-[1.05fr_0.95fr]">
        <div className="relative overflow-hidden border-b border-white/10 p-8 sm:p-10 lg:border-b-0 lg:border-r">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,rgba(34,211,238,0.14),transparent_32%),radial-gradient(circle_at_80%_80%,rgba(37,99,235,0.12),transparent_30%)]" />
          <div className="relative z-10">
            <Link href="/" aria-label="Go to homepage" className="inline-flex items-center gap-3">
              <Image src="/logo.png" alt="ProBoost" width={220} height={72} priority unoptimized className="h-14 w-auto object-contain" />
            </Link>

            <div className="mt-14 max-w-lg">
              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">{content.eyebrow}</p>
              <h1 className="mt-4 text-4xl font-black tracking-tight text-white sm:text-5xl">{content.title}</h1>
              <p className="mt-4 text-base leading-7 text-zinc-400">{content.subtitle}</p>
            </div>

            <div className="mt-10 grid gap-4 sm:grid-cols-3">
              {[
                { title: "Fast Checkout", desc: "Keep your setup saved and jump back into your order instantly." },
                { title: "Secure History", desc: "View previous purchases and active boosts in one place." },
                { title: "Live Updates", desc: "Follow progress and account notices without chasing support." },
              ].map((item) => (
                <div key={item.title} className="rounded-2xl border border-white/10 bg-white/[0.03] p-4">
                  <p className="font-semibold text-white">{item.title}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-8 sm:p-10">
          <div className="mx-auto max-w-md">
            <div className="rounded-3xl border border-white/10 bg-black/30 p-6 sm:p-7">
              <div className="space-y-5">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-zinc-300">Email</span>
                  <input
                    type="email"
                    placeholder="you@example.com"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-400"
                  />
                </label>

                <label className="block">
                  <span className="mb-2 block text-sm font-medium text-zinc-300">Password</span>
                  <input
                    type="password"
                    placeholder="Enter your password"
                    className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-400"
                  />
                </label>

                {mode === "signup" && (
                  <label className="block">
                    <span className="mb-2 block text-sm font-medium text-zinc-300">Confirm Password</span>
                    <input
                      type="password"
                      placeholder="Confirm your password"
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none transition placeholder:text-zinc-500 focus:border-cyan-400"
                    />
                  </label>
                )}
              </div>

              <button className="mt-6 w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-cyan-600 px-5 py-3 font-bold text-black transition hover:from-cyan-300 hover:to-cyan-500">
                {content.primary}
              </button>

              <div className="mt-6 flex items-center gap-3 text-xs uppercase tracking-[0.24em] text-zinc-500">
                <div className="h-px flex-1 bg-white/10" />
                <span>or</span>
                <div className="h-px flex-1 bg-white/10" />
              </div>

              <div className="mt-6 grid gap-3 sm:grid-cols-2">
                <button className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.06]">Continue with Discord</button>
                <button className="rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm font-semibold text-white transition hover:bg-white/[0.06]">Continue with Google</button>
              </div>

              <p className="mt-6 text-center text-sm text-zinc-400">
                {content.altLabel} <Link href={content.altHref} className="font-semibold text-cyan-400 hover:text-cyan-300">{content.altText}</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}