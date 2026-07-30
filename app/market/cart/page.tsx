"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingCart, ArrowRight, Trash2, CreditCard, ShieldCheck } from "lucide-react";

export default function BuyerCartPage() {
  const [items, setItems] = useState([
    { id: "prod-1", name: "Benguet Highland Cabbage", qtyKg: 100, pricePerKg: 40.0, coop: "Benguet Farmers Coop #456" },
    { id: "prod-2", name: "Atok Sweet Carrots", qtyKg: 50, pricePerKg: 55.0, coop: "Benguet Farmers Coop #456" },
  ]);

  const totalKg = items.reduce((sum, item) => sum + item.qtyKg, 0);
  const totalCost = items.reduce((sum, item) => sum + item.qtyKg * item.pricePerKg, 0);

  const removeItem = (id: string) => {
    setItems((prev) => prev.filter((i) => i.id !== id));
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-6 md:p-12">
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div>
            <h1 className="text-2xl font-extrabold text-white flex items-center gap-2">
              <ShoppingCart className="w-6 h-6 text-blue-400" />
              B2B Wholesale Procurement Cart
            </h1>
            <p className="text-xs text-slate-400 mt-1">Review produce quantities before server stock validation.</p>
          </div>
          <span className="px-3 py-1 rounded-full bg-blue-500/10 text-blue-300 text-xs font-bold border border-blue-500/20">
            {items.length} produce lots
          </span>
        </div>

        {items.length === 0 ? (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-500 text-sm">
            Your wholesale cart is empty. <Link href="/market" className="text-blue-400 font-bold underline">Return to catalog</Link>
          </div>
        ) : (
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-6">
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.id} className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
                  <div>
                    <h3 className="font-extrabold text-base text-white">{item.name}</h3>
                    <p className="text-xs text-slate-400 mt-0.5">{item.coop} • {item.qtyKg} kg × ₱{item.pricePerKg.toFixed(2)}/kg</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="font-extrabold text-emerald-400 text-base">
                      ₱{(item.qtyKg * item.pricePerKg).toLocaleString()}
                    </span>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="p-1.5 rounded-lg text-slate-500 hover:text-red-400 hover:bg-red-500/10"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-sm">
              <span className="text-slate-400">Total Volume: <strong className="text-white">{totalKg} kg</strong></span>
              <span className="text-xl font-extrabold text-emerald-400">₱{totalCost.toLocaleString()}</span>
            </div>

            <Link
              href="/market/checkout"
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-lg flex items-center justify-center gap-2"
            >
              <CreditCard className="w-4 h-4" />
              <span>Proceed to Checkout &amp; PayMongo Escrow</span>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
