"use client";

import { AlertCircle, RotateCcw } from "lucide-react";

export default function ErrorPage({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-[calc(100svh-var(--header-height))] items-center justify-center px-4 py-12">
      <div className="surface w-full max-w-md p-6 text-center sm:p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--danger-line)] bg-[var(--danger-surface)] text-[var(--danger)]">
          <AlertCircle aria-hidden="true" className="h-6 w-6" />
        </div>
        <p className="eyebrow mt-5">Something went wrong</p>
        <h1 className="mt-2 text-3xl font-semibold">This page could not load.</h1>
        <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
          Your selections are still safe. Try loading this view again.
        </p>
        <button type="button" onClick={reset} className="button-base button-primary mt-6 w-full">
          <RotateCcw aria-hidden="true" className="h-4 w-4" />
          Try again
        </button>
      </div>
    </main>
  );
}
