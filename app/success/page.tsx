"use client";

import Link from "next/link";

export default function SuccessPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-[#050505] text-white px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-emerald-500/20 border border-emerald-500/40">
          <span className="text-4xl">✓</span>
        </div>

        <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-cyan-200 bg-clip-text text-transparent">
          Payment Successful
        </h1>

        <p className="text-zinc-400 leading-relaxed">
          Thank you for your order! Your boost has been confirmed and our team will begin shortly. You'll receive an email with your order details.
        </p>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 text-sm text-zinc-300 space-y-2">
          <p>What happens next:</p>
          <ul className="text-left space-y-1.5 text-zinc-400">
            <li>1. A booster will be assigned to your order</li>
            <li>2. You'll receive login instructions via email</li>
            <li>3. Your boost begins within 30 minutes</li>
          </ul>
        </div>

        <Link
          href="/"
          className="inline-block w-full rounded-2xl bg-cyan-500 px-5 py-4 text-lg font-bold text-black hover:bg-cyan-400 transition-colors duration-200"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
}
