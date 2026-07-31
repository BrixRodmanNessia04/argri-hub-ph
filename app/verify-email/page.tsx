"use client";

import React from "react";
import Link from "next/link";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";
import { Mail, CheckCircle2, ArrowRight } from "lucide-react";

export default function VerifyEmailPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <PublicHeader />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-xs text-center">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 mx-auto flex items-center justify-center">
            <Mail className="w-6 h-6" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-extrabold text-white">Check Your Inbox</h1>
            <p className="text-slate-400 leading-relaxed font-normal">
              We sent a verification link to your email address. Please click the link to verify your email and activate your account.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 text-left space-y-2 font-bold">
            <span className="text-[11px] text-slate-500 uppercase tracking-wider block">Account Verification Status</span>
            <div className="flex items-center gap-2 text-amber-400">
              <span className="w-2 h-2 rounded-full bg-amber-400 animate-ping" />
              <span>Email Verification Pending</span>
            </div>
          </div>

          <div className="space-y-3 pt-2">
            <Link
              href="/login"
              className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2"
            >
              <span>Continue to Sign In</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <Link href="/demo" className="inline-block text-slate-400 hover:text-white font-semibold">
              Explore Demo Mode while waiting
            </Link>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
