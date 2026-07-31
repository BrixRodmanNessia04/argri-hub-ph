"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import PublicHeader from "@/components/public/PublicHeader";
import PublicFooter from "@/components/public/PublicFooter";
import { Sprout, LogIn, Play, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("farmer.juan@agrihub.ph");
  const [password, setPassword] = useState("password123");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    setTimeout(() => {
      setLoading(false);
      if (email.includes("admin")) {
        router.push("/admin");
      } else if (email.includes("coop")) {
        router.push("/coop/dashboard");
      } else if (email.includes("buyer")) {
        router.push("/buyer/dashboard");
      } else if (email.includes("multi")) {
        router.push("/select-workspace");
      } else {
        router.push("/farmer");
      }
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      <PublicHeader />
      <main className="flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="w-full max-w-md bg-white border border-[#dce9df] rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
          <div className="text-center space-y-2">
            <div className="w-12 h-12 rounded-2xl bg-[#ecfdf5] border border-[#a7f3d0] text-[#059669] mx-auto flex items-center justify-center font-bold">
              <Sprout className="w-6 h-6" />
            </div>
            <h1 className="text-2xl font-extrabold text-[#163025]">Sign In to AgriHub PH</h1>
            <p className="text-xs text-[#5f7469] font-normal">Access your production tools, workspace, and synced records</p>
          </div>

          {error && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs font-bold flex items-center gap-2">
              <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4 text-xs font-bold">
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

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-[#5f7469]">Password</label>
                <Link href="/forgot-password" className="text-[#059669] hover:underline text-[11px]">
                  Forgot password?
                </Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3.5 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025] font-bold"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-2 transition-all mt-2"
            >
              {loading ? (
                <span>Signing in...</span>
              ) : (
                <>
                  <LogIn className="w-4 h-4" />
                  <span>Sign In</span>
                </>
              )}
            </button>
          </form>

          <div className="text-center space-y-3 pt-4 border-t border-[#dce9df] text-xs">
            <p className="text-[#5f7469] font-normal">
              Don&apos;t have an account?{" "}
              <Link href="/register" className="text-[#059669] font-extrabold hover:underline">
                Create an Account
              </Link>
            </p>

            <Link
              href="/demo"
              className="inline-flex items-center gap-1.5 text-xs text-[#5f7469] hover:text-[#163025] font-bold pt-1"
            >
              <Play className="w-3.5 h-3.5 fill-[#059669] text-[#059669]" />
              <span>Or explore interactive Demo Mode</span>
            </Link>
          </div>
        </div>
      </main>
      <PublicFooter />
    </div>
  );
}
