import Image from "next/image";
import Link from "next/link";

const gameCards = [
  {
    name: "Rainbow Six Siege",
    subtitle: "Rank boost, duo queue, placement wins",
    href: "/boosting",
    status: "Open now",
    accent: "from-cyan-400/30 via-sky-500/10 to-transparent",
    icon: "/icons/r6-icon.webp",
  },
  {
    name: "Valorant",
    subtitle: "Episode climb and win streak support",
    href: "#",
    status: "Coming soon",
    accent: "from-orange-400/25 via-rose-500/10 to-transparent",
    icon: "",
  },
  {
    name: "Rocket League",
    subtitle: "Season ranks, coaching, and recovery",
    href: "#",
    status: "Coming soon",
    accent: "from-blue-400/25 via-cyan-500/10 to-transparent",
    icon: "",
  },
  {
    name: "League of Legends",
    subtitle: "Division pushes with verified high-ELO players",
    href: "#",
    status: "Coming soon",
    accent: "from-amber-400/25 via-yellow-500/10 to-transparent",
    icon: "",
  },
  {
    name: "Marvel Rivals",
    subtitle: "Fast role queue progression and placement help",
    href: "#",
    status: "Coming soon",
    accent: "from-fuchsia-400/25 via-pink-500/10 to-transparent",
    icon: "",
  },
  {
    name: "Counter-Strike 2",
    subtitle: "Premier rating climbs with vetted specialists",
    href: "#",
    status: "Coming soon",
    accent: "from-emerald-400/25 via-lime-500/10 to-transparent",
    icon: "",
  },
] as const;

const highlights = [
  {
    title: "Live specialists",
    value: "126",
    detail: "Active boosters currently handling orders across supported regions.",
  },
  {
    title: "Verified rating",
    value: "4.9/5",
    detail: "Built around transparent delivery, account-safe handling, and fast support.",
  },
  {
    title: "Average response",
    value: "8 min",
    detail: "Orders and questions are reviewed quickly so customers are not left waiting.",
  },
] as const;

const trustPoints = [
  "Real players only with manual gameplay",
  "VPN-matched sessions for region consistency",
  "Private order flow with direct support updates",
  "Flexible queue options for solo or duo boosting",
] as const;

const processSteps = [
  {
    step: "01",
    title: "Pick your game",
    description: "Start from the homepage and enter the service that matches the title you want to push.",
  },
  {
    step: "02",
    title: "Customize the order",
    description: "Set rank goals, platform, and add-ons from the calculator before checkout.",
  },
  {
    step: "03",
    title: "Track the progress",
    description: "Follow your order status and stay in control while the assigned booster completes the run.",
  },
] as const;

const perks = [
  {
    title: "Reward ladder",
    description: "Each completed order contributes toward higher account perks, faster support routing, and priority handling.",
    image: "/ranks/rank_5.webp",
  },
  {
    title: "Precision delivery",
    description: "Every order is configured around your current rank state so pricing and expected time remain clear.",
    image: "/ranks/rank_7.webp",
  },
  {
    title: "Premium handling",
    description: "Elite boosters, duo options, and custom requests are available when you need a tighter delivery window.",
    image: "/ranks/rank_8.webp",
  },
] as const;

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-semibold uppercase tracking-[0.28em] text-cyan-300/80">
      {children}
    </p>
  );
}

export default function HomePage() {
  return (
    <main className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.16),transparent_26%),radial-gradient(circle_at_85%_12%,rgba(249,115,22,0.12),transparent_18%),radial-gradient(circle_at_50%_65%,rgba(14,165,233,0.08),transparent_26%)]" />

      <header className="sticky top-0 z-40 border-b border-white/10 bg-[#050505]/82 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-5 px-4 py-4 sm:px-6 lg:px-8">
          <Link href="/" aria-label="Go to homepage" className="shrink-0">
            <Image
              src="/logo.png"
              alt="ProBoost"
              width={170}
              height={52}
              priority
              unoptimized
              className="h-12 w-auto object-contain sm:h-14"
            />
          </Link>

          <nav className="hidden items-center gap-8 text-sm font-medium text-zinc-300 lg:flex">
            <a href="#games" className="transition hover:text-white">Games</a>
            <a href="#how-it-works" className="transition hover:text-white">How It Works</a>
            <a href="#rewards" className="transition hover:text-white">Rewards</a>
            <Link href="/boosting" className="transition hover:text-white">Rainbow Six Siege</Link>
          </nav>

          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden rounded-full border border-white/12 px-5 py-2.5 text-sm font-semibold text-white transition hover:border-white/25 hover:bg-white/[0.04] sm:inline-flex">
              Log In
            </Link>
            <Link href="/boosting" className="inline-flex rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600 px-5 py-2.5 text-sm font-bold text-black transition hover:from-cyan-300 hover:to-cyan-500">
              Start Boosting
            </Link>
          </div>
        </div>
      </header>

      <section className="relative z-10 mx-auto grid max-w-7xl gap-14 px-4 pb-18 pt-14 sm:px-6 lg:grid-cols-[1.15fr_0.85fr] lg:px-8 lg:pb-24 lg:pt-20">
        <div>
          <div className="inline-flex items-center gap-3 rounded-full border border-cyan-400/20 bg-cyan-400/8 px-4 py-2 text-sm text-cyan-200 shadow-[0_12px_32px_rgba(8,145,178,0.14)]">
            <span className="inline-flex h-2.5 w-2.5 rounded-full bg-cyan-300" />
            Built for fast game selection and direct service entry
          </div>

          <h1 className="mt-6 max-w-3xl text-5xl font-black leading-[0.95] text-white sm:text-6xl lg:text-7xl">
            Your local boosting hub, with a proper homepage first.
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-zinc-300 sm:text-xl">
            This is now the front door of your website: a game-selection landing page inspired by the reference market layout, but routed entirely inside your own app. From here, users can enter the Rainbow Six Siege service page directly.
          </p>

          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href="/boosting" className="inline-flex items-center justify-center rounded-full bg-gradient-to-r from-cyan-400 to-cyan-600 px-7 py-4 text-base font-extrabold text-black transition hover:from-cyan-300 hover:to-cyan-500">
              Open Rainbow Six Siege Boost
            </Link>
            <a href="#games" className="inline-flex items-center justify-center rounded-full border border-white/12 px-7 py-4 text-base font-semibold text-white transition hover:border-white/25 hover:bg-white/[0.04]">
              Browse Supported Games
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <div className="flex -space-x-3">
              {['AL', 'KM', 'VX', 'RA'].map((initials) => (
                <div key={initials} className="flex h-11 w-11 items-center justify-center rounded-full border border-[#050505] bg-gradient-to-br from-zinc-200 to-zinc-500 text-xs font-black text-black">
                  {initials}
                </div>
              ))}
            </div>
            <div>
              <p className="text-sm font-semibold text-white">Rated highly by repeat customers</p>
              <p className="text-sm text-zinc-400">Fast entry points, clear service navigation, and strong visual hierarchy.</p>
            </div>
          </div>
        </div>

        <div className="relative">
          <div className="absolute inset-0 rounded-[2rem] bg-gradient-to-br from-cyan-400/15 via-transparent to-orange-500/10 blur-2xl" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.45)] backdrop-blur-xl sm:p-7">
            <div className="flex items-center justify-between gap-4 rounded-[1.5rem] border border-white/10 bg-black/25 p-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-cyan-300/80">Selected Game</p>
                <p className="mt-2 text-2xl font-black text-white">Rainbow Six Siege</p>
                <p className="mt-1 text-sm text-zinc-400">The only live service currently enabled in this build.</p>
              </div>
              <div className="flex h-[4.5rem] w-[4.5rem] items-center justify-center overflow-hidden rounded-2xl border border-cyan-300/40 bg-cyan-400/10 p-3">
                <Image src="/icons/r6-icon.webp" alt="Rainbow Six Siege" width={64} height={64} unoptimized className="h-full w-full object-cover" />
              </div>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/[0.03] p-4">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-500">{item.title}</p>
                  <p className="mt-3 text-3xl font-black text-white">{item.value}</p>
                  <p className="mt-2 text-sm leading-6 text-zinc-400">{item.detail}</p>
                </div>
              ))}
            </div>

            <div className="mt-5 rounded-[1.5rem] border border-white/10 bg-black/25 p-5">
              <p className="text-sm font-semibold text-white">Why this homepage exists now</p>
              <p className="mt-2 text-sm leading-6 text-zinc-400">
                Before this change, the logo linked to the same calculator route, so it felt broken. Now the root route acts as a true landing page and the service page lives on its own internal path.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section id="games" className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <SectionEyebrow>Select Your Game</SectionEyebrow>
            <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Choose the service entry point.</h2>
          </div>
          <p className="max-w-2xl text-sm leading-7 text-zinc-400 sm:text-right">
            The layout mirrors the marketplace idea: users arrive on a central hub, scan available titles quickly, and jump straight into a dedicated order flow.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {gameCards.map((game) => {
            const card = (
              <div className="group relative h-full overflow-hidden rounded-[1.75rem] border border-white/10 bg-[#08090d] p-6 transition duration-300 hover:-translate-y-1 hover:border-white/18 hover:bg-[#0c0e13]">
                <div className={`absolute inset-0 bg-gradient-to-br ${game.accent} opacity-90`} />
                <div className="relative z-10 flex h-full flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.24em] text-zinc-400">{game.status}</p>
                      <h3 className="mt-3 text-2xl font-black text-white">{game.name}</h3>
                    </div>
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/12 bg-white/[0.04]">
                      {game.icon ? (
                        <Image src={game.icon} alt="" width={40} height={40} unoptimized className="h-10 w-10 object-cover" />
                      ) : (
                        <span className="text-lg font-black text-white">{game.name.slice(0, 2).toUpperCase()}</span>
                      )}
                    </div>
                  </div>
                  <p className="mt-5 max-w-sm text-sm leading-7 text-zinc-300">{game.subtitle}</p>
                  <div className="mt-8 flex items-center justify-between text-sm">
                    <span className="text-zinc-500">Platform-ready workflow</span>
                    <span className="font-semibold text-cyan-300">{game.href === "/boosting" ? "Enter service" : "Soon"}</span>
                  </div>
                </div>
              </div>
            );

            return game.href === "/boosting" ? (
              <Link key={game.name} href={game.href} className="block h-full">
                {card}
              </Link>
            ) : (
              <div key={game.name} className="cursor-default opacity-85">
                {card}
              </div>
            );
          })}
        </div>
      </section>

      <section id="how-it-works" className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:grid lg:grid-cols-[0.9fr_1.1fr] lg:gap-10 lg:px-8 lg:py-18">
        <div>
          <SectionEyebrow>How It Works</SectionEyebrow>
          <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">A front page that actually routes somewhere useful.</h2>
          <p className="mt-5 max-w-xl text-base leading-8 text-zinc-300">
            The new structure separates discovery from checkout. Visitors first land on the homepage, then move into the specific boosting calculator only when they choose a service.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-zinc-300">
            {trustPoints.map((point) => (
              <li key={point} className="flex items-start gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-4 py-3">
                <span className="mt-1 inline-flex h-2.5 w-2.5 rounded-full bg-cyan-300" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 grid gap-4 lg:mt-0">
          {processSteps.map((item) => (
            <div key={item.step} className="rounded-[1.75rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6">
              <div className="flex items-center gap-4">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-cyan-300/30 bg-cyan-400/10 text-sm font-black text-cyan-200">
                  {item.step}
                </span>
                <h3 className="text-xl font-black text-white">{item.title}</h3>
              </div>
              <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section id="rewards" className="relative z-10 mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 lg:py-18">
        <div className="rounded-[2rem] border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.06),rgba(255,255,255,0.02))] p-6 shadow-[0_30px_90px_rgba(0,0,0,0.32)] sm:p-8 lg:p-10">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <SectionEyebrow>Exclusive Rewards</SectionEyebrow>
              <h2 className="mt-3 text-3xl font-black text-white sm:text-4xl">Keep the marketplace-style depth, inside your own brand.</h2>
            </div>
            <Link href="/boosting" className="inline-flex rounded-full border border-cyan-300/25 bg-cyan-400/10 px-5 py-3 text-sm font-semibold text-cyan-100 transition hover:border-cyan-300/45 hover:bg-cyan-400/15">
              Enter the Rainbow Six order flow
            </Link>
          </div>

          <div className="mt-8 grid gap-5 lg:grid-cols-3">
            {perks.map((perk) => (
              <div key={perk.title} className="rounded-[1.75rem] border border-white/10 bg-black/20 p-5">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04]">
                  <Image src={perk.image} alt="" width={56} height={56} unoptimized className="h-14 w-14 object-contain" />
                </div>
                <h3 className="mt-5 text-xl font-black text-white">{perk.title}</h3>
                <p className="mt-3 text-sm leading-7 text-zinc-400">{perk.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
