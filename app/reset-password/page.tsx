"use client";

import React, { useState } from "react";
import Link from "next/link";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";
import { CheckCircle2, Lock } from "lucide-react";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updated, setUpdated] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (!isSupabaseConfigured()) {
      setError("Password recovery is not configured.");
      return;
    }
    const { error: updateError } = await createClient().auth.updateUser({ password });
    if (updateError) {
      setError(updateError.message);
      return;
    }
    setUpdated(true);
  };

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      <PublicHeader />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white border border-[#dce9df] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6 text-xs font-bold">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-extrabold text-[#163025]">Set New Password</h1>
            <p className="text-[#5f7469] font-normal">Choose a secure new password for your account.</p>
          </div>

          {updated ? (
            <div className="p-6 text-center space-y-3 bg-[#f6fbf7] border border-[#dce9df] rounded-2xl">
              <CheckCircle2 className="w-8 h-8 text-[#059669] mx-auto" />
              <h3 className="text-[#163025] font-extrabold text-sm">Password Updated!</h3>
              <p className="text-[#5f7469] font-normal">Your password has been successfully updated.</p>
              <Link href="/login" className="inline-block text-[#059669] font-extrabold hover:underline pt-2">
                Sign In Now
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && <p className="text-rose-700">{error}</p>}
              <div>
                <label className="block text-[#5f7469] mb-1">New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025] font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-[#5f7469] mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025] font-bold"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-extrabold shadow-md flex items-center justify-center gap-2"
              >
                <Lock className="w-4 h-4" /> Save New Password
              </button>
            </form>
          )}
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
