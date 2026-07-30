"use client";

import React from "react";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { MailCheck } from "lucide-react";

export default function VerifyPage() {
  const router = useRouter();
  const clerk = useClerk();

  const [code, setCode] = React.useState("");
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState("");
  const [resent, setResent] = React.useState(false);

  const submitCode = React.useCallback(async (codeToSubmit: string) => {
    setError("");
    setLoading(true);
    try {
      const signUp = clerk.client!.signUp;
      const res = await signUp.attemptEmailAddressVerification({ code: codeToSubmit });
      if (res.status === "complete") {
        await clerk.setActive({ session: res.createdSessionId });
        router.push("/");
      } else if (res.createdSessionId) {
        await clerk.setActive({ session: res.createdSessionId });
        router.push("/");
      } else {
        const session = clerk.client!.signedInSessions?.[0];
        if (session) {
          await clerk.setActive({ session: session.id });
          router.push("/");
        } else {
          setError(`Unexpected status: ${res.status}. Please try again.`);
        }
      }
    } catch (err: unknown) {
      const clerkErr = err as { errors?: { message: string; code: string }[] };
      const errCode = clerkErr?.errors?.[0]?.code;
      setError(errCode === "form_code_incorrect" ? "Code is incorrect." : (clerkErr?.errors?.[0]?.message ?? "Something went wrong. Please try again."));
    } finally {
      setLoading(false);
    }
  }, [clerk, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await submitCode(code);
  };

  const handleResend = async () => {
    setError("");
    setResent(false);
    try {
      await clerk.client!.signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setResent(true);
    } catch (err: unknown) {
      const clerkErr = err as { errors?: { message: string }[] };
      setError(clerkErr?.errors?.[0]?.message ?? "Failed to resend code.");
    }
  };

  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);
  const [digits, setDigits] = React.useState(["", "", "", "", "", ""]);

  const handleDigit = (index: number, value: string) => {
    if (!/^\d?$/.test(value)) return;
    const next = [...digits];
    next[index] = value;
    setDigits(next);
    const newCode = next.join("");
    setCode(newCode);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
    if (newCode.length === 6) submitCode(newCode);
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !digits[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);
    if (!pasted) return;
    e.preventDefault();
    const next = ["", "", "", "", "", ""];
    pasted.split("").forEach((d, i) => { next[i] = d; });
    setDigits(next);
    const newCode = next.join("");
    setCode(newCode);
    inputRefs.current[Math.min(pasted.length, 5)]?.focus();
    if (pasted.length === 6) submitCode(pasted);
  };

  return (
    <main className="auth-shell flex min-h-[calc(100svh-var(--header-height))] items-center justify-center px-4 py-10 sm:px-6 sm:py-14">
      <div id="clerk-captcha" />

      <div className="surface w-full max-w-md p-6 sm:p-8">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-lg border border-[var(--accent-line)] bg-[var(--accent-soft)] text-[var(--accent-hover)]">
          <MailCheck aria-hidden="true" className="h-6 w-6" />
        </div>
        <div className="mx-auto mt-5 max-w-sm text-center">
          <p className="eyebrow">Email verification</p>
          <h1 className="mt-2 text-3xl font-semibold text-[var(--foreground)]">
            Check your inbox
          </h1>
          <p className="mt-3 text-sm leading-6 text-[var(--muted)]">
            Enter the six-digit code we sent to finish creating your account.
          </p>
        </div>

        <form className="mt-7" onSubmit={handleSubmit}>
          <div className="grid grid-cols-6 gap-2" onPaste={handlePaste}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                aria-label={`Verification code digit ${i + 1}`}
                aria-invalid={!!error}
                value={d}
                onChange={(e) => handleDigit(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="field-control h-13 min-w-0 px-0 text-center text-lg font-semibold tabular-nums sm:h-14 sm:text-xl"
              />
            ))}
          </div>

          {error && (
            <p role="alert" className="theme-error mt-4 rounded-lg px-4 py-3 text-center text-sm">
              {error}
            </p>
          )}
          {resent && (
            <p role="status" className="mt-4 rounded-lg border border-[var(--success-line)] bg-[var(--success-surface)] px-4 py-3 text-center text-sm text-[var(--success)]">
              A new code is on its way.
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="button-base button-primary mt-5 w-full"
          >
            {loading ? "Verifying..." : "Verify email"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-[var(--muted)]">
          Didn&apos;t receive it?{" "}
          <button
            type="button"
            onClick={handleResend}
            className="font-semibold text-[var(--foreground)] underline decoration-[var(--line-strong)] transition hover:decoration-[var(--foreground)]"
          >
            Resend code
          </button>
        </p>
      </div>
    </main>
  );
}
