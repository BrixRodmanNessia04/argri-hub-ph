"use client";

import React from "react";
import BuyerSidebarNav from "@/components/BuyerSidebarNav";
import { Building } from "lucide-react";

export default function BuyerSuppliersPage() {
  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex">
      <BuyerSidebarNav />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <h1 className="text-2xl font-extrabold text-[#163025]">Preferred Cooperative Suppliers</h1>
        <div className="bg-white border border-[#dce9df] rounded-2xl p-6 shadow-xl space-y-2">
          <h2 className="font-bold text-lg text-[#163025]">Benguet Farmers Cooperative #456</h2>
          <p className="text-xs text-[#5f7469]">Verified CDA Registered • 98.5% Fulfillment Score</p>
        </div>
      </main>
    </div>
  );
}
