"use client";

import React, { useState } from "react";
import AdminSidebarNav from "@/components/AdminSidebarNav";
import { CheckCircle2 } from "lucide-react";

export default function AdminCooperativesPage() {
  const [coops] = useState([
    { id: "coop-456", name: "Benguet Farmers Cooperative", leader: "Juan Leader", region: "CAR - La Trinidad", status: "VERIFIED" },
    { id: "coop-789", name: "Atok Vegetable Producers Coop", leader: "Pedro Santos", region: "CAR - Atok", status: "VERIFIED" },
  ]);

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex">
      <AdminSidebarNav />

      <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6">
        <h1 className="text-2xl font-extrabold text-[#163025]">Cooperative Verification &amp; Governance</h1>

        <div className="bg-white border border-[#dce9df] rounded-2xl shadow-xl overflow-hidden">
          <table className="responsive-table w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#dce9df] text-xs text-slate-400 uppercase tracking-wider bg-white/60">
                <th className="py-3.5 px-6 font-semibold">Coop ID</th>
                <th className="py-3.5 px-6 font-semibold">Cooperative Name</th>
                <th className="py-3.5 px-6 font-semibold">Leader</th>
                <th className="py-3.5 px-6 font-semibold">Region</th>
                <th className="py-3.5 px-6 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {coops.map((c) => (
                <tr key={c.id} className="hover:bg-[#f6fbf7]/40">
                  <td data-label="Coop ID" className="py-4 px-6 font-mono text-purple-700 font-bold">{c.id}</td>
                  <td data-label="Cooperative" className="py-4 px-6 font-bold text-[#163025]">{c.name}</td>
                  <td data-label="Leader" className="py-4 px-6 text-[#385747]">{c.leader}</td>
                  <td data-label="Region" className="py-4 px-6 text-[#385747]">{c.region}</td>
                  <td data-label="Status" className="py-4 px-6">
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
