"use client";

import React from "react";
import BuyerSidebarNav from "@/components/BuyerSidebarNav";
import { Building, Users, Bell, User, Settings } from "lucide-react";

export default function BuyerOrganizationPage() {
  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex">
      <BuyerSidebarNav />
      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <h1 className="text-2xl font-extrabold text-[#163025]">Company &amp; Delivery Hub Profile</h1>
        <div className="bg-white border border-[#dce9df] rounded-2xl p-6 shadow-xl space-y-2">
          <h2 className="font-bold text-base text-[#163025]">Robinsons Supermarket Corporate</h2>
          <p className="text-xs text-[#5f7469]">Cold-Storage Hub: Quezon City Distribution Center</p>
        </div>
      </main>
    </div>
  );
}
