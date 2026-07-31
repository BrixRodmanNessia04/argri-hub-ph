"use client";

import React from "react";
import ProducerShell from "@/components/shells/ProducerShell";
import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { Calendar, Sprout, Fish, Anchor, Beef, Clock, CheckCircle2 } from "lucide-react";

export default function ProductionCalendarPage() {
  const cropCycles = useLiveQuery(() => db.cropCycles.filter((c) => !c.isDeleted).toArray(), []) || [];
  const fishingTrips = useLiveQuery(() => db.fishingTrips.filter((t) => !t.isDeleted).toArray(), []) || [];
  const aquaculture = useLiveQuery(() => db.aquacultureCycles.filter((a) => !a.isDeleted).toArray(), []) || [];
  const livestock = useLiveQuery(() => db.livestockPoultryBatches.filter((l) => !l.isDeleted).toArray(), []) || [];

  return (
    <ProducerShell>
      <div className="space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
            CROSS-SECTOR PRODUCTION CALENDAR
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#163025] tracking-tight mt-1 flex items-center gap-2">
            <Calendar className="w-6 h-6 text-emerald-400" />
            Production Schedule &amp; Timelines
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Unified operational timeline for crop harvest dates, fishing trips, pond harvests, and animal market dates.
          </p>
        </div>

        <div className="bg-white border border-[#dce9df] rounded-2xl p-5 sm:p-6 shadow-xl space-y-4 text-xs">
          <h2 className="text-sm font-extrabold text-[#163025] flex items-center gap-2 border-b border-[#dce9df] pb-3">
            <Clock className="w-4 h-4 text-emerald-400" /> Upcoming Production Events
          </h2>

          <div className="space-y-3">
            {/* CROP HARVEST EVENTS */}
            {cropCycles.map((c) => (
              <div key={c.localId} className="p-4 rounded-2xl bg-[#f6fbf7] border border-[#dce9df] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <Sprout className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-extrabold text-[#163025] text-sm block">{c.crop}</span>
                    <span className="text-[11px] text-slate-400">Target Harvest: {c.estimatedHarvestAt}</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-emerald-950 text-emerald-400 border border-emerald-800 text-[10px] font-extrabold">
                  CROP HARVEST
                </span>
              </div>
            ))}

            {/* FISHING TRIPS */}
            {fishingTrips.map((t) => (
              <div key={t.localId} className="p-4 rounded-2xl bg-[#f6fbf7] border border-[#dce9df] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                    <Fish className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-extrabold text-[#163025] text-sm block">{t.vesselName}</span>
                    <span className="text-[11px] text-slate-400">Departure: {t.departedAt} ({t.fishingGround})</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-blue-950 text-blue-400 border border-blue-800 text-[10px] font-extrabold">
                  FISHING TRIP
                </span>
              </div>
            ))}

            {/* AQUACULTURE HARVESTS */}
            {aquaculture.map((a) => (
              <div key={a.localId} className="p-4 rounded-2xl bg-[#f6fbf7] border border-[#dce9df] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                    <Anchor className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-extrabold text-[#163025] text-sm block">{a.speciesName}</span>
                    <span className="text-[11px] text-slate-400">Expected Harvest: {a.expectedHarvestDate}</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-teal-950 text-teal-400 border border-teal-800 text-[10px] font-extrabold">
                  POND HARVEST
                </span>
              </div>
            ))}

            {/* LIVESTOCK MARKET DATES */}
            {livestock.map((l) => (
              <div key={l.localId} className="p-4 rounded-2xl bg-[#f6fbf7] border border-[#dce9df] flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                    <Beef className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-extrabold text-[#163025] text-sm block">{l.batchName}</span>
                    <span className="text-[11px] text-slate-400">Market Ready: {l.expectedMarketDate}</span>
                  </div>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-amber-950 text-amber-400 border border-amber-800 text-[10px] font-extrabold">
                  ANIMAL MARKET
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </ProducerShell>
  );
}
