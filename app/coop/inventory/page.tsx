"use client";

import React from "react";
import CoopSidebarNav from "@/components/CoopSidebarNav";
import { Warehouse } from "lucide-react";

export default function CoopInventoryPage() {
  const stock = [
    { crop: "Benguet Highland Cabbage", qty: 650, grade: "Class A", warehouse: "La Trinidad Hub" },
    { crop: "Atok Sweet Carrots", qty: 400, grade: "Class A", warehouse: "La Trinidad Hub" },
  ];

  return (
    <div className="min-h-[calc(100vh-57px)] bg-slate-950 text-slate-100 flex">
      <CoopSidebarNav />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <h1 className="text-2xl font-extrabold text-white">Cooperative Warehouse Bulk Stock</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {stock.map((s, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
              <h2 className="text-lg font-bold text-white">{s.crop}</h2>
              <p className="text-xs text-slate-400">Available Bulk: <strong className="text-emerald-400 text-sm">{s.qty} kg</strong> ({s.grade})</p>
              <p className="text-xs text-slate-500">Location: {s.warehouse}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
