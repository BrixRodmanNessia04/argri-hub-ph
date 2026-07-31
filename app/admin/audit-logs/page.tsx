"use client";

import React from "react";
import AdminSidebarNav from "@/components/AdminSidebarNav";
import { FileCheck } from "lucide-react";

export default function AdminAuditLogsPage() {
  const auditLogs = [
    { id: "log-1", user: "Juan Leader", action: "AGGREGATE_HARVEST", entity: "marketplace_listings", time: "10 mins ago" },
    { id: "log-2", user: "Procurement Manager", action: "AUTHORIZE_ESCROW", entity: "orders", time: "25 mins ago" },
  ];

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex">
      <AdminSidebarNav />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <h1 className="text-2xl font-extrabold text-white">Security Audit Trail Log</h1>
        <div className="bg-white border border-[#dce9df] rounded-2xl shadow-xl overflow-hidden">
          <table className="w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#dce9df] text-xs text-slate-400 uppercase tracking-wider bg-white/60">
                <th className="py-3.5 px-6 font-semibold">User</th>
                <th className="py-3.5 px-6 font-semibold">Action</th>
                <th className="py-3.5 px-6 font-semibold">Entity</th>
                <th className="py-3.5 px-6 font-semibold">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {auditLogs.map((l) => (
                <tr key={l.id} className="hover:bg-[#f6fbf7]/40">
                  <td className="py-4 px-6 font-bold text-white">{l.user}</td>
                  <td className="py-4 px-6 font-mono text-purple-400">{l.action}</td>
                  <td className="py-4 px-6 text-slate-300 font-mono text-xs">{l.entity}</td>
                  <td className="py-4 px-6 text-slate-400 text-xs">{l.time}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
