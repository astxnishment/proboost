import { ArrowLeft, SearchX } from "lucide-react";
import { ButtonLink } from "./components/ui";

export default function NotFound() {
  return (
    <main className="flex min-h-[calc(100svh-var(--header-height))] items-center justify-center px-4 py-12">
      <div className="surface w-full max-w-md p-6 text-center sm:p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg bg-[var(--surface-subtle)] text-[var(--muted)]">
          <SearchX aria-hidden="true" className="h-6 w-6" />
        </div>
        <p className="eyebrow mt-5">404</p>
        <h1 className="mt-2 text-3xl font-semibold">Page not found.</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          The service or page you requested may have moved.
        </p>
        <ButtonLink href="/" className="mt-6 w-full">
          <ArrowLeft aria-hidden="true" className="h-4 w-4" />
          Back to ProBoost
        </ButtonLink>
      </div>
    </main>
  );
}
