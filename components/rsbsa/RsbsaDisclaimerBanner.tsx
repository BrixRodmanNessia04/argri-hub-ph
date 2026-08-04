"use client";

import React from "react";
import { AlertTriangle, ShieldCheck } from "lucide-react";

export default function RsbsaDisclaimerBanner({ compact = false }: { compact?: boolean }) {
  if (compact) {
    return (
      <div className="bg-amber-50 border border-amber-200 text-amber-900 rounded-2xl p-3.5 text-xs flex items-start gap-2.5 shadow-sm">
        <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
        <div>
          <span className="font-extrabold text-amber-950 block">AgriHub Digital Registration Notice</span>
          Completing this form prepares your digital profile on AgriHub PH. It does <strong>NOT</strong> automatically register you with the Department of Agriculture or generate an official government RSBSA number unless verified by authorized DA or LGU officers.
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-emerald-900 to-teal-950 text-white rounded-3xl p-5 shadow-lg border border-emerald-800 space-y-3">
      <div className="flex items-center gap-2.5 text-emerald-400 font-extrabold text-xs tracking-wider uppercase">
        <ShieldCheck className="w-5 h-5 text-emerald-400" />
        <span>Official Government Disclaimer & Data Privacy</span>
      </div>
      <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed font-medium">
        Completing this AgriHub digital registration form organizes and secures your farmer or fisherfolk profile within your local cooperative and AgriHub network.
      </p>
      <div className="bg-emerald-950/80 border border-emerald-700/60 rounded-2xl p-3.5 text-xs text-emerald-200 flex items-start gap-2.5">
        <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <span>
          <strong>Note:</strong> Self-submitting this digital form does <em>not</em> grant an official Department of Agriculture RSBSA registration number until verified by your Municipal Agriculturist or authorized government enumerator.
        </span>
      </div>
    </div>
  );
}
