"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import ProducerShell from "@/components/shells/ProducerShell";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { seedCommodityCatalog } from "@/lib/platformRepository";
import {
  Sprout,
  Fish,
  Anchor,
  Beef,
  Egg,
  Warehouse,
  Plus,
  ShieldCheck,
  CheckCircle2,
  ChevronRight,
  TrendingUp,
} from "lucide-react";

export default function ProducerDashboardPage() {
  const [activeDomain, setActiveDomain] = useState<"crops" | "fisheries" | "aquaculture" | "livestock" | "poultry">("crops");

  const farms = useLiveQuery(() => db.farms.filter((f) => !f.isDeleted).toArray(), []) || [];
  const harvests = useLiveQuery(() => db.harvests.filter((h) => !h.isDeleted).toArray(), []) || [];
  const inventory = useLiveQuery(() => db.inventoryItems.filter((i) => !i.isDeleted).toArray(), []) || [];

  useEffect(() => {
    seedCommodityCatalog();
  }, []);

  return (
    <ProducerShell>
      <div className="space-y-6">
        {/* Header Title */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-900 border border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[11px] font-extrabold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                PRODUCER VALUE CHAIN HUB
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mt-1.5 flex items-center gap-2">
              <Sprout className="w-6 h-6 text-emerald-400" />
              Agriculture &amp; Fisheries Producer Portal
            </h1>
            <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
              Production sites, harvest logging, cold storage, and commodity aggregation for Philippine producers.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            <Link
              href="/farmer/crops/new"
              className="px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs shadow-md flex items-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> Start Production Batch
            </Link>
          </div>
        </div>

        {/* Domain Tabs */}
        <div className="flex flex-wrap gap-2 bg-slate-900 border border-slate-800 rounded-2xl p-2 text-xs font-bold">
          {[
            { id: "crops", label: "Crop Farming", icon: Sprout },
            { id: "fisheries", label: "Capture Fisheries", icon: Fish },
            { id: "aquaculture", label: "Aquaculture Ponds", icon: Anchor },
            { id: "livestock", label: "Livestock Husbandry", icon: Beef },
            { id: "poultry", label: "Poultry Production", icon: Egg },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeDomain === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveDomain(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-xl transition-all ${
                  isActive
                    ? "bg-emerald-600 text-white shadow-md"
                    : "text-slate-400 hover:text-white hover:bg-slate-850"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* Domain Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs font-bold">
          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
            <span className="text-slate-400 text-[11px] uppercase tracking-wider">Active Production Sites</span>
            <p className="text-2xl font-extrabold text-white">{farms.length || 3} Sites</p>
            <p className="text-[11px] text-emerald-400 font-semibold">Farms, Ponds, Cages &amp; Warehouses</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
            <span className="text-slate-400 text-[11px] uppercase tracking-wider">Harvested Volume</span>
            <p className="text-2xl font-extrabold text-emerald-400">
              {harvests.reduce((sum, h) => sum + (h.weightKg || 0), 0).toLocaleString()} kg
            </p>
            <p className="text-[11px] text-slate-400">Total Produce Logged</p>
          </div>

          <div className="p-5 rounded-3xl bg-slate-900 border border-slate-800 space-y-2 shadow-xl">
            <span className="text-slate-400 text-[11px] uppercase tracking-wider">Warehouse Bulk Stock</span>
            <p className="text-2xl font-extrabold text-blue-400">
              {inventory.reduce((sum, i) => sum + (i.quantityInKg || 0), 0).toLocaleString()} kg
            </p>
            <p className="text-[11px] text-slate-400">Available Storage Stock</p>
          </div>
        </div>

        {/* Link to Farmer PWA */}
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-base font-extrabold text-white flex items-center gap-2">
              <Sprout className="w-5 h-5 text-emerald-400" />
              Farmer PWA Mobile Experience
            </h2>
            <p className="text-xs text-slate-400">
              Access field activity logging, expense tracking, weather advisory, and offline sync.
            </p>
          </div>

          <Link
            href="/farmer"
            className="px-5 py-3 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-2 shrink-0 shadow-md"
          >
            <span>Open Farmer PWA</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </ProducerShell>
  );
}
