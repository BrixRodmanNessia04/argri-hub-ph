"use client";

import React from "react";
import AdminSidebarNav from "@/components/AdminSidebarNav";
import { Sprout } from "lucide-react";

export default function AdminTaxonomyPage() {
  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex">
      <AdminSidebarNav />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <h1 className="text-2xl font-extrabold text-white">Crop Catalog Taxonomy &amp; Standard Quality Grades</h1>
        <div className="bg-white border border-[#dce9df] rounded-2xl p-6 shadow-xl space-y-2">
          <p className="text-xs text-slate-400">Standard Philippine agricultural crop codes (Class A, Class B, Class C).</p>
        </div>
      </main>
    </div>
  );
}
