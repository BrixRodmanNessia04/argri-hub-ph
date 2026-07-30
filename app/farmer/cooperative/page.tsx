"use client";

import React from "react";
import FarmerSubNav from "@/components/FarmerSubNav";
import { Users, CheckCircle2, ShieldCheck } from "lucide-react";

export default function FarmerCooperativePage() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-3xl mx-auto p-4 space-y-6 mt-2">
        <div className="bg-white border border-gray-200 rounded-2xl p-6 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-gray-100 pb-3">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-emerald-100 text-emerald-800">
                <Users className="w-6 h-6" />
              </div>
              <div>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                  CDA REGISTRATION VERIFIED
                </span>
                <h1 className="text-xl font-extrabold text-slate-900 mt-1">
                  Benguet Farmers Cooperative #456
                </h1>
                <p className="text-xs text-slate-500">Member Status: Active Good Standing</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-200">
              <span className="text-slate-400 font-medium">Cooperative Leader:</span>
              <p className="font-bold text-slate-900 mt-0.5">Juan Leader</p>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-50 border border-gray-200">
              <span className="text-slate-400 font-medium">Regional Hub:</span>
              <p className="font-bold text-slate-900 mt-0.5">La Trinidad Central Warehouse</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
