"use client";

import React, { useState } from "react";
import Link from "next/link";
import AdminSidebarNav from "@/components/AdminSidebarNav";
import ProfileHeader from "@/components/profile/ProfileHeader";
import {
  ShieldAlert,
  UserCheck,
  Lock,
  Key,
  Activity,
  Save,
  CheckCircle2,
  Users,
  FileSpreadsheet,
  Settings,
  LogOut,
} from "lucide-react";

export default function AdminProfilePage() {
  const [name, setName] = useState("Alexander Vance");
  const [position, setPosition] = useState("Chief System Administrator");
  const [email, setEmail] = useState("admin.vance@agrihub.ph");
  const [phone, setPhone] = useState("0917-999-0000");

  const [feedback, setFeedback] = useState<string | null>(null);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setFeedback("Administrator profile details updated successfully!");
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <div className="min-h-screen bg-white text-slate-100 flex flex-col md:flex-row font-sans">
      <AdminSidebarNav />

      <main className="flex-1 p-4 md:p-8 overflow-y-auto space-y-6">
        {/* Profile Header */}
        <ProfileHeader
          name={name}
          roleTitle="PLATFORM SUPER ADMIN"
          idBadge="ADMIN-001"
          isVerified={true}
          isOnline={true}
        />

        {feedback && (
          <div className="p-3.5 rounded-xl bg-emerald-950 border border-emerald-800 text-emerald-300 text-xs font-bold flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-400" />
            <span>{feedback}</span>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          {/* LEFT: EDITABLE PROFILE */}
          <div className="md:col-span-7 bg-white border border-[#dce9df] rounded-2xl p-6 shadow-xl space-y-5">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2 border-b border-[#dce9df] pb-3">
              <UserCheck className="w-5 h-5 text-emerald-500" /> Personal Administrator Details
            </h2>

            <form onSubmit={handleSave} className="space-y-4 text-xs">
              <div>
                <label className="block font-bold text-slate-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-[#dce9df] text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              <div>
                <label className="block font-bold text-slate-300 mb-1">Position / Official Title</label>
                <input
                  type="text"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                  className="w-full p-3 rounded-xl bg-white border border-[#dce9df] text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                  required
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-bold text-slate-300 mb-1">System Email</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white border border-[#dce9df] text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    required
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-300 mb-1">Mobile Contact</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full p-3 rounded-xl bg-white border border-[#dce9df] text-white font-semibold focus:outline-none focus:ring-2 focus:ring-emerald-600"
                    required
                  />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md"
                >
                  <Save className="w-4 h-4" /> Save Profile Info
                </button>
              </div>
            </form>
          </div>

          {/* RIGHT: PERMISSION & SECURITY SUMMARY */}
          <div className="md:col-span-5 space-y-6">
            <div className="bg-white border border-[#dce9df] rounded-2xl p-6 shadow-xl space-y-4 text-xs">
              <h2 className="text-sm font-extrabold text-white flex items-center gap-2 border-b border-[#dce9df] pb-3">
                <Lock className="w-4 h-4 text-emerald-500" /> Permission Level &amp; Security
              </h2>

              <div className="p-3.5 rounded-2xl bg-white border border-[#dce9df] space-y-1">
                <span className="text-slate-400 font-bold">Assigned Role</span>
                <p className="font-extrabold text-emerald-400 text-sm">PLATFORM_ADMINISTRATOR</p>
              </div>

              <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-900/60 text-amber-300 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <ShieldAlert className="w-4 h-4 text-amber-500 shrink-0" />
                  <span>Self-Escalation Protected</span>
                </div>
                <p className="text-[11px] text-amber-400/80">
                  Role permissions cannot be self-modified from this page. Use standard RBAC user management workflows.
                </p>
              </div>

              <div className="space-y-2 pt-1">
                <span className="text-slate-400 font-bold block">Active Security Controls</span>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#dce9df]">
                  <span className="font-semibold text-slate-300">Multi-Factor Auth (MFA)</span>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-400 text-[10px] font-bold border border-emerald-800">
                    ENABLED
                  </span>
                </div>
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-white border border-[#dce9df]">
                  <span className="font-semibold text-slate-300">Session Timeout</span>
                  <span className="font-mono text-slate-400 text-[11px]">30 mins idle</span>
                </div>
              </div>
            </div>

            {/* Quick Admin Actions */}
            <div className="grid grid-cols-2 gap-3 text-xs font-bold">
              <Link
                href="/admin/users"
                className="p-3.5 rounded-2xl bg-white hover:bg-slate-850 border border-[#dce9df] text-slate-200 flex flex-col items-center gap-1.5 text-center"
              >
                <Users className="w-5 h-5 text-emerald-500" />
                <span>User Roles</span>
              </Link>

              <Link
                href="/admin/audit-logs"
                className="p-3.5 rounded-2xl bg-white hover:bg-slate-850 border border-[#dce9df] text-slate-200 flex flex-col items-center gap-1.5 text-center"
              >
                <Activity className="w-5 h-5 text-emerald-500" />
                <span>Audit Logs</span>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
