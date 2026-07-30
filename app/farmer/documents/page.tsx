"use client";

import React from "react";
import FarmerSubNav from "@/components/FarmerSubNav";
import { FileCheck } from "lucide-react";

export default function FarmerDocumentsPage() {
  const docs = [
    { title: "RSBSA Farmer Registration Certificate", issuer: "Department of Agriculture (DA)", date: "2024-01-15" },
    { title: "Cooperative Membership Passbook", issuer: "Benguet Farmers Coop", date: "2024-02-01" },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-4xl mx-auto p-4 space-y-6 mt-2">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-emerald-600" />
            <h1 className="text-xl font-extrabold text-slate-900">
              Farm Certificates &amp; Documents
            </h1>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Store digital copies of RSBSA registration, coop certificates, and permits offline.
          </p>
        </div>

        <div className="space-y-3">
          {docs.map((d) => (
            <div key={d.title} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
              <div>
                <h2 className="font-bold text-sm text-slate-900">{d.title}</h2>
                <p className="text-xs text-slate-500">Issuer: {d.issuer} • Date: {d.date}</p>
              </div>
              <span className="px-2.5 py-1 rounded-lg bg-emerald-100 text-emerald-800 font-bold text-xs">
                Verified Offline
              </span>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
