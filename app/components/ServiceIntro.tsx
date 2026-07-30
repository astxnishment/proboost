import {
  Headphones,
  LockKeyhole,
  RotateCcw,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

const assurances: { label: string; icon: LucideIcon }[] = [
  { label: "Safe service", icon: ShieldCheck },
  { label: "Encrypted checkout", icon: LockKeyhole },
  { label: "24/7 support", icon: Headphones },
  { label: "Clear refund policy", icon: RotateCcw },
];

export default function ServiceIntro({
  title,
  description,
}: {
  title: string;
  description: string;
}) {
  return (
    <header className="mb-7 max-w-4xl">
      <h1 className="max-w-3xl text-3xl font-semibold tracking-normal text-[var(--foreground)] sm:text-4xl">
        {title}
      </h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--muted)] sm:text-base">
        {description}
      </p>
      <ul
        className="mt-5 flex flex-wrap gap-x-5 gap-y-2 text-sm text-[var(--muted)]"
        aria-label="Service assurances"
      >
        {assurances.map(({ label, icon: Icon }) => (
          <li key={label} className="flex items-center gap-2">
            <Icon className="h-4 w-4 shrink-0" strokeWidth={1.8} />
            {label}
          </li>
        ))}
      </ul>
    </header>
  );
}
