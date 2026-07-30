"use client";

import React from "react";
import CoopSidebarNav from "@/components/CoopSidebarNav";
import { Tractor, MapPin } from "lucide-react";

export default function CoopFarmsPage() {
  const memberFarms = [
    { id: "mf-1", farmer: "Jose Reyes", farmName: "Upper Terrace Farm", location: "La Trinidad, Benguet", area: "1.5 ha", crop: "Cabbage" },
    { id: "mf-2", farmer: "Maria Santos", farmName: "Valley Ridge Plot", location: "Atok, Benguet", area: "2.0 ha", crop: "Carrots" },
    { id: "mf-3", farmer: "Ricardo Cruz", farmName: "Tublay Mountain Farm", location: "Tublay, Benguet", area: "1.2 ha", crop: "Eggplant" },
  ];

  return (
    <div className="min-h-[calc(100vh-57px)] bg-slate-950 text-slate-100 flex">
      <CoopSidebarNav />

      <main className="flex-1 p-6 md:p-8 overflow-y-auto space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-teal-500/15 text-teal-300 border border-teal-500/30">
            MEMBER FARM DIRECTORY
          </span>
          <h1 className="text-2xl font-extrabold text-white tracking-tight mt-1">
            Member Farms Directory ({memberFarms.length})
          </h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {memberFarms.map((mf) => (
            <div key={mf.id} className="bg-slate-900 border border-slate-800 rounded-2xl p-5 shadow-xl space-y-2">
              <h2 className="font-bold text-lg text-white">{mf.farmName}</h2>
              <p className="text-xs text-teal-400 font-semibold">Owner: {mf.farmer}</p>
              <p className="text-xs text-slate-400 flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-slate-500" /> {mf.location}
              </p>
              <div className="pt-2 border-t border-slate-800 flex justify-between text-xs font-semibold text-slate-300">
                <span>Area: {mf.area}</span>
                <span>Crop: {mf.crop}</span>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
