"use client";

import React, { useState } from "react";
import Link from "next/link";
import { resetDemoDatabase } from "@/lib/demoDb";
import { AlertCircle, RefreshCw, UserPlus, LogOut, CheckCircle2 } from "lucide-react";

export default function DemoBanner({ roleName }: { roleName: string }) {
  const [resetting, setResetting] = useState(false);
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleReset = async () => {
    setResetting(true);
    await resetDemoDatabase();
    setResetting(false);
    setFeedback("Demo dataset reset to initial state!");
    setTimeout(() => {
      setFeedback(null);
      window.location.reload();
    }, 1200);
  };

  return (
    <div className="bg-amber-500/15 border-b border-amber-500/30 px-4 py-2.5 text-xs text-amber-200 sticky top-0 z-50 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center gap-2 font-bold">
          <span className="px-2 py-0.5 rounded-md bg-amber-500 text-slate-950 text-[10px] font-black uppercase tracking-wider">
            DEMO MODE
          </span>
          <span>
            Viewing sample data for <strong className="text-white">{roleName}</strong>. Actions do not affect real production records.
          </span>
        </div>

        {feedback ? (
          <span className="text-emerald-400 font-extrabold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" /> {feedback}
          </span>
        ) : (
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleReset}
              disabled={resetting}
              className="px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-300 border border-amber-500/40 text-[11px] font-bold flex items-center gap-1 transition-all"
            >
              <RefreshCw className={`w-3 h-3 ${resetting ? "animate-spin" : ""}`} />
              <span>Reset Demo</span>
            </button>

            <Link
              href="/register"
              className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold flex items-center gap-1 shadow-sm"
            >
              <UserPlus className="w-3 h-3" />
              <span>Create Account</span>
            </Link>

            <Link
              href="/demo"
              className="px-2 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-bold flex items-center gap-1"
            >
              <LogOut className="w-3 h-3" />
              <span>Exit Demo</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
