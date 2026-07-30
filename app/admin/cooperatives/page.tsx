"use client";

import React, { useState } from "react";
import AdminSidebarNav from "@/components/AdminSidebarNav";
import { Building2, CheckCircle2, ShieldCheck } from "lucide-react";

export default function AdminCooperativesPage() {
  const [coops, setCoops] = useState([
    { id: "coop-456", name: "Benguet Farmers Cooperative", leader: "Juan Leader", region: "CAR - La Trinidad", status: "VERIFIED" },
    { id: "coop-789", name: "Atok Vegetable Producers Coop", leader: "Pedro Santos", region: "CAR - Atok", status: "VERIFIED" },
  ]);

  return (
    <div className="min-h-[calc(100vh-57px)] bg-slate-950 text-slate-100 flex">
      <AdminSidebarNav />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <h1 className="text-2xl font-extrabold text-white">Cooperative Verification &amp; Governance</h1>

        <div className="bg-slate-900 border border-slate-800 rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-slate-800 text-xs text-slate-400 uppercase tracking-wider bg-slate-950/60">
                <th className="py-3.5 px-6 font-semibold">Coop ID</th>
                <th className="py-3.5 px-6 font-semibold">Cooperative Name</th>
                <th className="py-3.5 px-6 font-semibold">Leader</th>
                <th className="py-3.5 px-6 font-semibold">Region</th>
                <th className="py-3.5 px-6 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {coops.map((c) => (
                <tr key={c.id} className="hover:bg-slate-800/40">
                  <td className="py-4 px-6 font-mono text-purple-400 font-bold">{c.id}</td>
                  <td className="py-4 px-6 font-bold text-white">{c.name}</td>
                  <td className="py-4 px-6 text-slate-300">{c.leader}</td>
                  <td className="py-4 px-6 text-slate-300">{c.region}</td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-bold flex items-center gap-1 w-max">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {c.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
