import Image from "next/image";
import Link from "next/link";

const footerLinks = [
  { href: "/#games", label: "Services" },
  { href: "/#rewards", label: "Membership" },
  { href: "/contact", label: "Contact" },
  { href: "/terms", label: "Terms" },
  { href: "/privacy", label: "Privacy" },
];

const paymentMethods = [
  { name: "Visa", src: "/payments/visa.webp" },
  { name: "Mastercard", src: "/payments/mastercard.webp" },
  { name: "PayPal", src: "/payments/paypal.webp" },
  { name: "Apple Pay", src: "/payments/apay.webp" },
  { name: "Google Pay", src: "/payments/gpay.webp" },
] as const;

export default function Footer() {
  return (
    <footer className="site-footer relative z-10 mt-auto border-t">
      <div className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <Link href="/" aria-label="Go to homepage" className="w-fit">
            <Image
              src="/brand/proboost-logo-white.png"
              alt="ProBoost"
              width={848}
              height={134}
              loading="eager"
              className="brand-wordmark h-7 w-auto object-contain"
              style={{ width: "auto" }}
            />
          </Link>

          <nav aria-label="Footer navigation" className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[var(--muted)]">
            {footerLinks.map((link) => (
              <Link key={link.label} href={link.href} className="transition-colors hover:text-[var(--foreground)]">
                {link.label}
              </Link>
            ))}
          </nav>

          <div
            aria-label="Accepted payment methods"
            className="flex flex-wrap items-center gap-2"
          >
            {paymentMethods.map((method) => (
              <span
                key={method.name}
                title={method.name}
                className="flex h-8 w-12 items-center justify-center rounded-lg border border-[var(--line)]"
                style={{ backgroundColor: "#09090b" }}
              >
                <Image
                  src={method.src}
                  alt={method.name}
                  width={97}
                  height={96}
                  className="h-7 w-7 object-contain"
                />
              </span>
            ))}
          </div>
        </div>

        <div className="mt-7 flex flex-col gap-2 border-t border-[var(--line)] pt-5 text-xs text-[var(--muted-soft)] sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} ProBoost. All rights reserved.</p>
          <p>Not affiliated with game publishers or developers.</p>
        </div>
      </div>
    </footer>
  );
}
