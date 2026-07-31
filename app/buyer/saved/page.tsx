"use client";

import React from "react";
import BuyerSidebarNav from "@/components/BuyerSidebarNav";
import { Heart } from "lucide-react";

export default function BuyerSavedPage() {
  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex">
      <BuyerSidebarNav />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <h1 className="text-2xl font-extrabold text-[#163025]">Saved Produce Listings</h1>
        <div className="bg-white border border-[#dce9df] rounded-2xl p-8 text-center text-slate-500 text-xs">
          No saved listings. Bookmark produce items from the wholesale catalog.
        </div>
      </main>
    </div>
  );
}
