"use client";

import React from "react";
import FarmerSubNav from "@/components/FarmerSubNav";
import { Store, Phone, MapPin, CheckCircle2 } from "lucide-react";

export default function FarmerBuyersPage() {
  const buyers = [
    { id: "b1", name: "Benguet Wholesale Coop Marketplace", type: "Cooperative", phone: "0917-123-4567", loc: "La Trinidad Trading Post", verified: true },
    { id: "b2", name: "Robinsons Supermarket Direct Purchasing", type: "Supermarket Chain", phone: "0918-234-5678", loc: "Quezon City Hub", verified: true },
    { id: "b3", name: "Baguio Vegetables Viajero Group", type: "Trader Group", phone: "0919-345-6789", loc: "Baguio City", verified: false },
  ];

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-20">
      <FarmerSubNav />

      <main className="max-w-4xl mx-auto p-4 space-y-6 mt-2">
        <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center gap-2">
            <Store className="w-5 h-5 text-emerald-600" />
            <h1 className="text-xl font-extrabold text-slate-900">
              Verified B2B Buyers &amp; Traders (Mga Bumibili)
            </h1>
          </div>
          <p className="text-xs text-slate-600 mt-1">
            Local directory of verified cooperative, trader, and institutional produce buyers.
          </p>
        </div>

        <div className="space-y-3">
          {buyers.map((b) => (
            <div key={b.id} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm flex items-center justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                    {b.type}
                  </span>
                  {b.verified && (
                    <span className="px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 text-[10px] font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-blue-600" /> Verified Buyer
                    </span>
                  )}
                </div>
                <h2 className="font-extrabold text-base text-slate-900 mt-1">{b.name}</h2>
                <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500" /> {b.loc}
                </p>
              </div>

              <a
                href={`tel:${b.phone}`}
                className="px-3.5 py-2 rounded-xl bg-emerald-600 text-white font-bold text-xs flex items-center gap-1.5 shrink-0 hover:bg-emerald-700"
              >
                <Phone className="w-4 h-4" /> Call Buyer
              </a>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
