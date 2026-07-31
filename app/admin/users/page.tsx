"use client";

import React from "react";
import AdminSidebarNav from "@/components/AdminSidebarNav";

export default function AdminUsersPage() {
  const users = [
    { id: "usr-1", name: "Juan Dela Cruz", role: "FARMER", phone: "09171234567" },
    { id: "usr-2", name: "Juan Leader", role: "COOP_LEADER", phone: "09182345678" },
    { id: "usr-3", name: "Procurement Manager", role: "BUYER", phone: "09193456789" },
    { id: "usr-4", name: "Super Admin", role: "ADMIN", phone: "09204567890" },
  ];

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex">
      <AdminSidebarNav />
      <main className="flex-1 min-w-0 p-4 sm:p-6 md:p-8 overflow-y-auto space-y-6">
        <h1 className="text-2xl font-extrabold text-[#163025]">System Users &amp; Role Access (RBAC)</h1>
        <div className="bg-white border border-[#dce9df] rounded-2xl shadow-xl overflow-hidden">
          <table className="responsive-table w-full text-left border-collapse text-sm">
            <thead>
              <tr className="border-b border-[#dce9df] text-xs text-slate-400 uppercase tracking-wider bg-white/60">
                <th className="py-3.5 px-6 font-semibold">User ID</th>
                <th className="py-3.5 px-6 font-semibold">Full Name</th>
                <th className="py-3.5 px-6 font-semibold">Assigned Role</th>
                <th className="py-3.5 px-6 font-semibold">Phone</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#f6fbf7]/40">
                  <td data-label="User ID" className="py-4 px-6 font-mono text-purple-700 font-bold">{u.id}</td>
                  <td data-label="Full name" className="py-4 px-6 font-bold text-[#163025]">{u.name}</td>
                  <td data-label="Assigned role" className="py-4 px-6">
                    <span className="px-2.5 py-0.5 rounded-full bg-purple-500/15 text-purple-300 border border-purple-500/30 text-xs font-bold">
                      {u.role}
                    </span>
                  </td>
                  <td data-label="Phone" className="py-4 px-6 text-[#385747] font-mono">{u.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
