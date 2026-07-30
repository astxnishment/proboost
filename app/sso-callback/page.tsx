"use client";

import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallbackPage() {
  return (
    <main className="auth-shell flex min-h-screen items-center justify-center px-6">
      <h1 className="sr-only">Completing sign in</h1>
      <div role="status" className="flex items-center gap-3 text-sm text-[var(--muted)]">
        <span aria-hidden="true" className="h-4 w-4 animate-spin rounded-full border-2 border-[var(--line-strong)] border-t-[var(--foreground)]" />
        Completing sign in
      </div>
      <AuthenticateWithRedirectCallback />
    </main>
  );
}
