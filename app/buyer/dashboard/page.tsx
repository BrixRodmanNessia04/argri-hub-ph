"use client";

import React from "react";
import Link from "next/link";
import BuyerSidebarNav from "@/components/BuyerSidebarNav";
import { LayoutDashboard, ShoppingCart, FileText, Store, ArrowRight, ShieldCheck } from "lucide-react";

export default function BuyerDashboardPage() {
  const activeOrders = [
    { id: "ORD-901", produce: "Benguet Cabbage (300 kg)", coop: "Benguet Farmers Coop #456", total: 12000, status: "CONFIRMED" },
    { id: "ORD-902", produce: "Atok Carrots (150 kg)", coop: "Benguet Farmers Coop #456", total: 8250, status: "IN_TRANSIT" },
  ];

  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex">
      <BuyerSidebarNav />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30">
              B2B BUYER PROCUREMENT DASHBOARD
            </span>
            <h1 className="text-2xl font-extrabold text-[#163025] tracking-tight mt-1">
              Procurement &amp; Order Status
            </h1>
          </div>

          <Link
            href="/market"
            className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md flex items-center gap-2"
          >
            <Store className="w-4 h-4" />
            <span>Browse Wholesale Produce Market</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="bg-white border border-[#dce9df] rounded-2xl p-5 shadow-xl">
            <span className="text-xs font-medium text-[#5f7469]">Active Wholesale Orders</span>
            <p className="text-2xl font-extrabold text-[#163025] mt-3">2 Orders</p>
            <p className="text-xs text-teal-700 mt-1">Cold-chain delivery in progress</p>
          </div>

          <div className="bg-white border border-[#dce9df] rounded-2xl p-5 shadow-xl">
            <span className="text-xs font-medium text-[#5f7469]">Total Sourced Volume</span>
            <p className="text-2xl font-extrabold text-[#163025] mt-3">450 kg</p>
            <p className="text-xs text-[#5f7469] mt-1">Direct from cooperatives</p>
          </div>

          <div className="bg-white border border-[#dce9df] rounded-2xl p-5 shadow-xl">
            <span className="text-xs font-medium text-[#5f7469]">PayMongo Escrow Balance</span>
            <p className="text-2xl font-extrabold text-emerald-700 mt-3">₱20,250.00</p>
            <p className="text-xs text-emerald-700 mt-1 font-medium">Protected until arrival</p>
          </div>
        </div>

        <div className="bg-white border border-[#dce9df] rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 border-b border-[#dce9df] flex items-center justify-between">
            <h2 className="text-base font-bold text-[#163025] flex items-center gap-2">
              <ShoppingCart className="w-5 h-5 text-teal-700" />
              Active Orders Overview
            </h2>
            <Link href="/buyer/orders" className="text-xs text-teal-700 font-bold hover:underline">
              View All Orders
            </Link>
          </div>

          <div className="divide-y divide-slate-800/60 text-sm">
            {activeOrders.map((ord) => (
              <div key={ord.id} className="p-4 px-6 flex items-center justify-between hover:bg-[#f6fbf7]/40">
                <div>
                  <span className="font-mono text-teal-400 text-xs font-bold">{ord.id}</span>
                  <h3 className="font-bold text-[#163025] mt-0.5">{ord.produce}</h3>
                  <p className="text-xs text-[#5f7469]">{ord.coop}</p>
                </div>
                <div className="text-right">
                  <span className="font-extrabold text-emerald-700 block">₱{ord.total.toLocaleString()}</span>
                  <span className="px-2.5 py-0.5 rounded-full bg-blue-500/15 text-blue-300 border border-blue-500/30 text-[11px] font-bold">
                    {ord.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
