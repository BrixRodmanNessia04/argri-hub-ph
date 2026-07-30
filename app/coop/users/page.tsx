"use client";

import React from "react";
import CoopLayout from "@/components/CoopLayout";
import { ShieldCheck } from "lucide-react";

export default function CoopUsersPage() {
  const staff = [
    { name: "Elena Santos", role: "General Manager", status: "ACTIVE" },
    { name: "Carlos Mendoza", role: "Warehouse Inspector", status: "ACTIVE" },
  ];

  return (
    <CoopLayout>
      <div className="space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
            STAFF &amp; ROLE PERMISSIONS
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1">
            Cooperative Staff Directory ({staff.length})
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold">
          {staff.map((s, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-white font-extrabold text-base">{s.name}</span>
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px]">
                  {s.status}
                </span>
              </div>
              <p className="text-teal-400">{s.role}</p>
            </div>
          ))}
        </div>
      </div>
    </CoopLayout>
  );
}
