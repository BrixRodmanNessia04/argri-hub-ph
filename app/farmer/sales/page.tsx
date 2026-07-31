"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { createSale, deleteSale } from "@/lib/farmerRepository";
import FarmerSubNav from "@/components/FarmerSubNav";
import { DollarSign, Plus, CheckCircle2, Trash2, Eye } from "lucide-react";

export default function FarmerSalesPage() {
  const sales = useLiveQuery(() => db.sales.filter((s) => !s.isDeleted).toArray(), []) || [];

  const [buyerName, setBuyerName] = useState("Wholesale Market");
  const [crop, setCrop] = useState("Benguet Cabbage");
  const [weightKg, setWeightKg] = useState("100");
  const [pricePerKg, setPricePerKg] = useState("45");
  const [feedback, setFeedback] = useState<string | null>(null);

  const handleAddSale = async (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseFloat(weightKg) || 0;
    const price = parseFloat(pricePerKg) || 0;
    if (!buyerName.trim() || !crop.trim() || qty <= 0 || price <= 0) return;

    const gross = qty * price;
    await createSale({
      buyerName: buyerName.trim(),
      buyerType: "WHOLESALER",
      crop: crop.trim(),
      weightKg: qty,
      pricePerKg: price,
      grossAmount: gross,
      totalAmount: gross,
      soldAt: new Date().toISOString().split("T")[0],
    });

    setWeightKg("");
    setFeedback(`Recorded sale of ${qty} kg ${crop} for +₱${gross.toLocaleString()}!`);
    setTimeout(() => setFeedback(null), 3000);
  };

  const handleDelete = async (localId: string) => {
    await deleteSale(localId);
  };

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] pb-24">
      <FarmerSubNav />

      <main className="max-w-4xl mx-auto px-3 sm:px-4 py-4 space-y-5 mt-2">
        <div className="bg-white border border-[#dce9df] rounded-2xl p-4 sm:p-5 shadow-xs">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-[#059669]" />
              <h1 className="text-lg sm:text-xl font-extrabold text-[#163025]">
                Direct Sales Log (Benta ng Ani)
              </h1>
            </div>

            <Link
              href="/farmer/sales/new"
              className="px-3.5 py-1.5 rounded-xl bg-[#059669] hover:bg-[#047857] text-white font-bold text-xs shadow-md flex items-center gap-1 shrink-0 transition-colors"
            >
              <Plus className="w-4 h-4" /> Full Sale Log
            </Link>
          </div>

          <p className="text-xs text-[#5f7469]">
            Log crop revenue sold to local traders, markets, or direct consumers offline.
          </p>

          {feedback && (
            <div className="mt-4 p-3 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] text-[#047857] text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4" />
              <span>{feedback}</span>
            </div>
          )}

          <form onSubmit={handleAddSale} className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Buyer Name (Bumili)
              </label>
              <input
                type="text"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                placeholder="e.g. Trader La Trinidad"
                className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-sm font-semibold text-[#163025] placeholder:text-[#9db5a5] focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Crop Sold (Tanim na Benta)
              </label>
              <input
                type="text"
                value={crop}
                onChange={(e) => setCrop(e.target.value)}
                placeholder="e.g. Benguet Cabbage"
                className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-sm font-semibold text-[#163025] placeholder:text-[#9db5a5] focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Weight in Kg (Timbang)
              </label>
              <input
                type="number"
                value={weightKg}
                onChange={(e) => setWeightKg(e.target.value)}
                placeholder="e.g. 100"
                className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-sm font-semibold text-[#163025] placeholder:text-[#9db5a5] focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669]"
                required
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Price per Kg in ₱ (Presyo bawat kilo)
              </label>
              <input
                type="number"
                value={pricePerKg}
                onChange={(e) => setPricePerKg(e.target.value)}
                placeholder="e.g. 45"
                className="w-full p-3 rounded-xl bg-[#f6fbf7] border border-[#dce9df] text-sm font-semibold text-[#163025] placeholder:text-[#9db5a5] focus:outline-none focus:ring-2 focus:ring-[#059669]/30 focus:border-[#059669]"
                required
              />
            </div>

            <div className="sm:col-span-2 pt-2">
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-[#059669] hover:bg-[#047857] active:bg-[#065f46] text-white font-bold text-sm shadow-md flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>
                  Log Sale Entry (+₱
                  {((parseFloat(weightKg) || 0) * (parseFloat(pricePerKg) || 0)).toLocaleString()})
                </span>
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-3">
          <h2 className="text-sm font-extrabold text-[#163025]">
            Recorded Sales Revenue ({sales.length})
          </h2>

          {sales.length === 0 ? (
            <div className="bg-white border border-dashed border-[#dce9df] rounded-2xl p-8 text-center text-xs text-[#5f7469]">
              No sales logged yet. Use the form above to record a sale.
            </div>
          ) : (
            <div className="space-y-3">
              {sales.map((s) => (
                <div
                  key={s.localId}
                  className="bg-white border border-[#dce9df] rounded-2xl p-4 shadow-xs flex items-center justify-between hover:border-[#059669]/60 transition-all"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded-full bg-[#ecfdf5] text-[#047857] text-[11px] font-bold">
                        {s.buyerName}
                      </span>
                      <span className="text-xs text-[#9db5a5]">{s.soldAt}</span>
                    </div>
                    <h3 className="font-bold text-sm text-[#163025] mt-1">
                      {s.weightKg} kg {s.crop} @ ₱{s.pricePerKg}/kg
                    </h3>
                  </div>

                  <div className="text-right flex items-center gap-3">
                    <span className="font-extrabold text-base text-[#059669] tabular-nums">
                      +₱{(s.totalAmount ?? 0).toLocaleString()}
                    </span>
                    <Link
                      href={`/farmer/sales/${s.localId}`}
                      className="text-[#9db5a5] hover:text-[#163025] p-1 transition-colors"
                    >
                      <Eye className="w-4 h-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(s.localId)}
                      className="text-[#9db5a5] hover:text-red-600 p-1 transition-colors"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
