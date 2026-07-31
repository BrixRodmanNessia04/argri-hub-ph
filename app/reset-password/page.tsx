"use client";

import React, { useState } from "react";
import Link from "next/link";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";
import { CheckCircle2, Lock } from "lucide-react";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [updated, setUpdated] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setUpdated(true);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans">
      <PublicHeader />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-2xl space-y-6 text-xs font-bold">
          <div className="text-center space-y-2">
            <h1 className="text-2xl font-extrabold text-white">Set New Password</h1>
            <p className="text-slate-400 font-normal">Choose a secure new password for your account.</p>
          </div>

          {updated ? (
            <div className="p-6 text-center space-y-3 bg-slate-950 border border-slate-800 rounded-2xl">
              <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
              <h3 className="text-white font-extrabold text-sm">Password Updated!</h3>
              <p className="text-slate-400 font-normal">Your password has been successfully updated.</p>
              <Link href="/login" className="inline-block text-emerald-400 font-extrabold hover:underline pt-2">
                Sign In Now
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-slate-400 mb-1">New Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                  required
                />
              </div>

              <div>
                <label className="block text-slate-400 mb-1">Confirm New Password</label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="w-full p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-white font-bold"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold shadow-md flex items-center justify-center gap-2"
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
