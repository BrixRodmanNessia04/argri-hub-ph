"use client";

import React from "react";
import AdminSidebarNav from "@/components/AdminSidebarNav";

export default function AdminBuyersPage() {
  const buyers = [
    { id: "b-1", name: "Robinsons Supermarket Corp", permit: "SEC-2024-9082", status: "VERIFIED" },
    { id: "b-2", name: "Metro Manila Restaurant Group", permit: "DTI-90812-MNL", status: "VERIFIED" },
  ];

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex">
      <AdminSidebarNav />
      <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6">
        <h1 className="text-2xl font-extrabold text-[#163025]">B2B Buyer Business Permit Verification</h1>
        <div className="bg-white border border-[#dce9df] rounded-2xl shadow-xl overflow-hidden">
          <table className="responsive-table w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#dce9df] text-xs text-slate-400 uppercase tracking-wider bg-white/60">
                <th className="py-3.5 px-6 font-semibold">Buyer Name</th>
                <th className="py-3.5 px-6 font-semibold">Business Permit</th>
                <th className="py-3.5 px-6 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {buyers.map((b) => (
                <tr key={b.id} className="hover:bg-[#f6fbf7]/40">
                  <td data-label="Buyer name" className="py-4 px-6 font-bold text-[#163025]">{b.name}</td>
                  <td data-label="Business permit" className="py-4 px-6 font-mono text-[#385747]">{b.permit}</td>
                  <td data-label="Status" className="py-4 px-6">
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 text-xs font-bold">
                      {b.status}
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
