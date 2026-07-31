"use client";

import React, { useState } from "react";
import Link from "next/link";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";
import { Mail, CheckCircle2, ArrowLeft } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!isSupabaseConfigured()) {
      setError("Password recovery is not configured.");
      return;
    }
    const { error: resetError } = await createClient().auth.resetPasswordForEmail(
      email,
      { redirectTo: `${window.location.origin}/auth/callback?next=/reset-password` },
    );
    if (resetError) {
      setError(resetError.message);
      return;
    }
    setSent(true);
  };

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      <PublicHeader />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white border border-[#dce9df] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 text-xs font-bold">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-extrabold text-[#163025]">Reset Your Password</h1>
            <p className="text-[#5f7469] font-normal">Enter your email address and we will send password recovery instructions.</p>
          </div>

          {sent ? (
            <div className="p-6 text-center space-y-3 bg-[#f6fbf7] border border-[#dce9df] rounded-2xl">
              <CheckCircle2 className="w-8 h-8 text-[#059669] mx-auto" />
              <h3 className="text-[#163025] font-extrabold text-sm">Recovery Email Sent</h3>
              <p className="text-[#5f7469] font-normal">Please check your inbox for instructions to reset your password.</p>
              <Link href="/login" className="inline-block text-[#059669] font-extrabold hover:underline pt-2">
                Return to Sign In
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-rose-700">{error}</p>}
              <div>
                <label className="block text-[#5f7469] mb-1">Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025] font-bold"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-extrabold shadow-md flex items-center justify-center gap-2"
              >
                <Mail className="w-4 h-4" /> Send Recovery Email
              </button>
            </form>
          )}

          <div className="text-center border-t border-[#dce9df] pt-4">
            <Link href="/login" className="inline-flex items-center gap-1 text-[#5f7469] hover:text-[#163025] font-semibold">
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
            </Link>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
