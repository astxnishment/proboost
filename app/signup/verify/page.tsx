"use client";

import React from "react";
import Image from "next/image";
import { useClerk } from "@clerk/nextjs";
import { useRouter } from "next/navigation";

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

  // Handle each digit in the OTP input separately for a nice UX
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
    // Auto-submit as soon as all 6 digits are filled
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
    <div className="relative min-h-screen bg-black flex flex-col items-center justify-center px-4 py-12">
      <div id="clerk-captcha" />

      {/* Character image */}
      <div className="mb-2 flex justify-center">
        <Image
          src="/booster.png"
          alt="ProBoost Character"
          width={220}
          height={220}
          priority
          unoptimized
          className="h-44 w-auto object-contain drop-shadow-[0_0_40px_rgba(34,211,238,0.25)]"
        />
      </div>

      <div className="w-full max-w-sm">
        <h1 className="mb-2 text-center text-3xl font-black tracking-tight text-white">
          Check your email
        </h1>
        <p className="mb-8 text-center text-sm text-zinc-400">
          We sent a 6-digit code to your email. Enter it below to verify your account.
        </p>

        <form onSubmit={handleSubmit}>
          {/* OTP digit inputs */}
          <div className="flex justify-center gap-2 mb-5" onPaste={handlePaste}>
            {digits.map((d, i) => (
              <input
                key={i}
                ref={(el) => { inputRefs.current[i] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={d}
                onChange={(e) => handleDigit(i, e.target.value)}
                onKeyDown={(e) => handleKeyDown(i, e)}
                className="w-12 h-14 rounded-2xl border border-white/10 bg-[#111315] text-center text-xl font-bold text-white outline-none transition focus:border-cyan-400/60 focus:bg-[#13181f] caret-cyan-400"
              />
            ))}
          </div>

          {error && (
            <p className="mb-3 rounded-xl border border-red-500/30 bg-red-500/10 px-4 py-2.5 text-sm text-red-400 text-center">
              {error}
            </p>
          )}
          {resent && (
            <p className="mb-3 rounded-xl border border-cyan-500/30 bg-cyan-500/10 px-4 py-2.5 text-sm text-cyan-400 text-center">
              Code resent — check your inbox.
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-2xl bg-gradient-to-r from-cyan-400 to-cyan-600 py-3.5 font-bold text-black transition hover:from-cyan-300 hover:to-cyan-500 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Verifying…" : "Verify Email"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-zinc-500">
          Didn&apos;t receive it?{" "}
          <button
            type="button"
            onClick={handleResend}
            className="font-semibold text-cyan-400 hover:text-cyan-300 transition cursor-pointer"
          >
            Resend code
          </button>
        </p>
      </div>
    </div>
  );
}
