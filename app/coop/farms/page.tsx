"use client";

import React from "react";
import CoopLayout from "@/components/CoopLayout";
import { Tractor, MapPin } from "lucide-react";

export default function CoopFarmsPage() {
  const farms = [
    { name: "Valley Hill Organic Farm", owner: "Jose Reyes", location: "La Trinidad, Benguet", area: "1.8 Ha", crop: "Highland Cabbage" },
    { name: "Mountain Crest Produce", owner: "Maria Santos", location: "Atok, Benguet", area: "2.5 Ha", crop: "Sweet Carrots" },
  ];

  return (
    <CoopLayout>
      <div className="space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
            MEMBER FARMS DIRECTORY
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#163025] tracking-tight mt-1">
            Registered Member Land Holdings ({farms.length})
          </h1>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {farms.map((f, idx) => (
            <div key={idx} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3">
              <div className="flex items-center justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-teal-950 text-teal-300 text-[10px] font-extrabold border border-teal-800">
                  {f.area}
                </span>
                <span className="text-xs text-slate-400 font-semibold">{f.owner}</span>
              </div>
              <div>
                <h3 className="font-extrabold text-base text-white">{f.name}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-rose-500 shrink-0" />
                  <span>{f.location}</span>
                </p>
                <p className="text-xs text-teal-400 font-semibold mt-1">Primary Crop: {f.crop}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </CoopLayout>
  );
}
