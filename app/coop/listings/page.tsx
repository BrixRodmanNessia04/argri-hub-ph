"use client";

import React from "react";
import CoopSidebarNav from "@/components/CoopSidebarNav";
import { Store, Tag, Sprout } from "lucide-react";

export default function CoopListingsPage() {
  const listings = [
    { id: "list-1", crop: "Benguet Highland Cabbage", weightKg: 500, pricePerKg: 40.0, status: "ACTIVE_STOCK" },
    { id: "list-2", crop: "Atok Sweet Carrots", weightKg: 350, pricePerKg: 55.0, status: "ACTIVE_STOCK" },
    { id: "list-3", crop: "Baguio Vine Tomatoes", weightKg: 620, pricePerKg: 60.0, status: "FORWARD_PRE_SELL" },
  ];

  return (
    <div className="min-h-[calc(100vh-57px)] bg-slate-950 text-slate-100 flex">
      <CoopSidebarNav />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30">
            WHOLESALE MARKETPLACE LISTINGS
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
            Published B2B Listings ({listings.length})
          </h1>
          <p className="text-sm text-slate-400 mt-0.5">
            Bulk produce listings visible to Metro Manila buyers.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {listings.map((item) => (
            <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between text-xs font-bold">
                <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  {item.status}
                </span>
              </div>
              <h2 className="text-lg font-extrabold text-white">{item.crop}</h2>
              <div className="flex items-center justify-between text-sm pt-2 border-t border-slate-800">
                <span className="text-slate-400">Volume: {item.weightKg} kg</span>
                <span className="font-extrabold text-emerald-400">₱{item.pricePerKg.toFixed(2)}/kg</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
