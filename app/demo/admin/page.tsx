"use client";

import React, { useState } from "react";
import DemoHeader from "@/components/demo/DemoHeader";
import { ShieldCheck, Plus, CheckCircle2, Save, X, RefreshCw } from "lucide-react";

export default function CompleteAdminDemoPage() {
  const [users, setUsers] = useState([
    { id: "usr-1", name: "Juan Dela Cruz", email: "juan@agrihub.ph", role: "Farmer", status: "Active", verifiedAt: "2026-07-28" },
    { id: "usr-2", name: "Maria Santos", email: "maria@benguetcoop.ph", role: "Cooperative Manager", status: "Active", verifiedAt: "2026-07-29" },
    { id: "usr-3", name: "Manila Fresh Buyer", email: "procurement@manilafresh.ph", role: "Buyer", status: "Active", verifiedAt: "2026-07-30" },
  ]);

  const [showAddUser, setShowAddUser] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("Farmer");

  const handleAddUser = (e: React.FormEvent) => {
    e.preventDefault();
    setUsers((prev) => [
      ...prev,
      { id: `usr_${Date.now()}`, name, email, role, status: "Active", verifiedAt: new Date().toISOString().split("T")[0] },
    ]);
    setName("");
    setEmail("");
    setShowAddUser(false);
  };

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
      <DemoHeader roleName="Platform Admin (Interactive Workspace)" />

      <main className="flex-1 max-w-5xl w-full mx-auto p-4 sm:p-6 space-y-6 text-xs font-bold">
        <div className="flex items-center justify-between bg-white p-5 rounded-3xl border border-[#dce9df] shadow-xs">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]">
              DEMO MODE (ISOLATED)
            </span>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#163025] flex items-center gap-2 mt-1">
              <ShieldCheck className="w-6 h-6 text-[#059669]" />
              Platform Administrator Workspace
            </h1>
            <p className="text-[#5f7469] font-normal">Multi-tenant RBAC permissions, user profile management, and sync error audit logs.</p>
          </div>
          <button
            onClick={() => setShowAddUser(true)}
            className="px-4 py-2 rounded-xl bg-[#059669] text-white font-extrabold flex items-center gap-1.5 shadow-xs"
          >
            <Plus className="w-4 h-4" /> Provision Demo User
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-1 shadow-xs">
            <span className="text-[#5f7469] uppercase tracking-wider text-[10px]">Registered Users</span>
            <p className="text-2xl font-extrabold text-[#059669]">{users.length} Active Accounts</p>
          </div>
          <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-1 shadow-xs">
            <span className="text-[#5f7469] uppercase tracking-wider text-[10px]">Multi-Tenant Workspaces</span>
            <p className="text-2xl font-extrabold text-[#163025]">14 Organizations</p>
          </div>
          <div className="p-5 rounded-3xl bg-white border border-[#dce9df] space-y-1 shadow-xs">
            <span className="text-[#5f7469] uppercase tracking-wider text-[10px]">Offline Sync Engine</span>
            <p className="text-2xl font-extrabold text-[#0ea5a4]">0 Sync Conflicts</p>
          </div>
        </div>

        <div className="bg-white border border-[#dce9df] rounded-3xl p-5 shadow-xs space-y-4">
          <h2 className="text-sm font-extrabold text-[#163025] flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-[#059669]" /> User &amp; RBAC Directory ({users.length})
          </h2>

          <div className="space-y-3">
            {users.map((u) => (
              <div key={u.id} className="p-4 rounded-2xl bg-[#f6fbf7] border border-[#dce9df] flex items-center justify-between">
                <div>
                  <span className="font-extrabold text-[#163025] text-sm block">{u.name} ({u.email})</span>
                  <span className="text-[11px] text-[#5f7469] font-normal">Role: {u.role} • Verified: {u.verifiedAt}</span>
                </div>
                <span className="px-2 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] text-[10px] font-black">{u.status}</span>
              </div>
            ))}
          </div>
        </div>
      </main>

      {showAddUser && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#163025]/60 backdrop-blur-xs">
          <div className="bg-white border border-[#dce9df] rounded-3xl p-6 w-full max-w-md space-y-4 shadow-xl text-xs font-bold">
            <div className="flex items-center justify-between border-b border-[#dce9df] pb-3">
              <h3 className="text-base font-extrabold text-[#163025]">Provision User Account</h3>
              <button onClick={() => setShowAddUser(false)}><X className="w-5 h-5 text-[#5f7469]" /></button>
            </div>
            <form onSubmit={handleAddUser} className="space-y-3">
              <div>
                <label className="block text-[#5f7469] mb-1">Full Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]" required />
              </div>
              <div>
                <label className="block text-[#5f7469] mb-1">Email Address</label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]" required />
              </div>
              <div>
                <label className="block text-[#5f7469] mb-1">Platform Role</label>
                <select value={role} onChange={(e) => setRole(e.target.value)} className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-[#163025]">
                  <option value="Farmer">Farmer</option>
                  <option value="Fisher">Fisher</option>
                  <option value="Cooperative Manager">Cooperative Manager</option>
                  <option value="Buyer">Buyer</option>
                  <option value="Processor">Processor</option>
                  <option value="Logistics">Logistics</option>
                  <option value="Government">Government</option>
                </select>
              </div>
              <button type="submit" className="w-full py-3 rounded-xl bg-[#059669] text-white font-extrabold shadow-md flex items-center justify-center gap-1">
                <Save className="w-4 h-4" /> Save User Account
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
