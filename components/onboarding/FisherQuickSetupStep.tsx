"use client";

import React from "react";
import SpeciesSelector from "./SpeciesSelector";
import { ReferenceDataRepository } from "@/lib/reference-data/repository";
import { ApplicationMode } from "@/lib/ApplicationContext";
import { Fish, Anchor, Navigation, ShieldCheck } from "lucide-react";

export interface FisherQuickSetupData {
  fishingType: string;
  primaryFishingArea: string;
  fishingAreaType: string;
  mainSpecies: string;
  usesVessel: boolean;
  vesselName: string;
  vesselType: string;
}

interface FisherQuickSetupStepProps {
  data: FisherQuickSetupData;
  onChange: (updated: Partial<FisherQuickSetupData>) => void;
  mode?: ApplicationMode;
}

export default function FisherQuickSetupStep({
  data,
  onChange,
  mode = "production",
}: FisherQuickSetupStepProps) {
  const fishingTypes = ReferenceDataRepository.getFishingTypes(mode);
  const fishingAreaTypes = ReferenceDataRepository.getFishingAreaTypes(mode);

  return (
    <div className="space-y-5">
      <div className="text-center space-y-1">
        <h2 className="text-base sm:text-lg font-extrabold text-[#163025]">
          Fisheries &amp; Aquatic Production Setup
        </h2>
        <p className="text-xs text-[#52796f]">
          Quick operational setup to get your fisherfolk workspace ready right away.
        </p>
      </div>

      {/* Fisheries Operational Details */}
      <div className="bg-white border border-[#dce9df] rounded-3xl p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-[#edf4ee] pb-2 text-[#163025] font-extrabold text-sm">
          <Anchor className="w-4 h-4 text-[#0284c7]" />
          <span>Fishing Activity &amp; Fishing Ground</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Primary Fishing Type <span className="text-red-500">*</span>
            </label>
            <select
              value={data.fishingType}
              onChange={(e) => onChange({ fishingType: e.target.value })}
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
            >
              {fishingTypes.map((ft) => (
                <option key={ft.key} value={ft.label}>
                  {ft.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Fishing Ground Water Type
            </label>
            <select
              value={data.fishingAreaType}
              onChange={(e) => onChange({ fishingAreaType: e.target.value })}
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
            >
              {fishingAreaTypes.map((fa) => (
                <option key={fa.key} value={fa.key}>
                  {fa.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-[#163025] mb-1 flex items-center gap-1">
              <Navigation className="w-3.5 h-3.5 text-[#0284c7]" />
              Primary Fishing Ground / Location Description
            </label>
            <input
              type="text"
              value={data.primaryFishingArea}
              onChange={(e) => onChange({ primaryFishingArea: e.target.value })}
              placeholder="e.g. Bolinao Coastal Waters, Lingayen Gulf, Fishpond Site 3"
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
            />
          </div>
        </div>

        {/* Vessel Toggle & Input */}
        <div className="bg-sky-50 border border-sky-200 rounded-2xl p-4 space-y-3">
          <div className="flex min-w-0 flex-col gap-2.5">
            <span className="w-full min-w-0 text-xs font-extrabold text-[#0369a1] flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#0284c7] shrink-0" />
              <span>Do you use a motorized / non-motorized fishing boat?</span>
            </span>
            <div className="w-full min-w-0 flex items-center gap-3 text-xs font-bold text-slate-800 pt-0.5">
              <label className="flex items-center gap-2 cursor-pointer bg-white px-3.5 py-2 rounded-xl border border-sky-200 flex-1">
                <input
                  type="radio"
                  name="usesVessel"
                  checked={data.usesVessel}
                  onChange={() => onChange({ usesVessel: true })}
                  className="text-[#0284c7] focus:ring-[#0284c7]"
                />
                <span>Yes</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer bg-white px-3.5 py-2 rounded-xl border border-sky-200 flex-1">
                <input
                  type="radio"
                  name="usesVessel"
                  checked={!data.usesVessel}
                  onChange={() => onChange({ usesVessel: false, vesselName: "", vesselType: "" })}
                  className="text-[#0284c7] focus:ring-[#0284c7]"
                />
                <span>No</span>
              </label>
            </div>
          </div>

          {data.usesVessel && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Vessel / Boat Name
                </label>
                <input
                  type="text"
                  value={data.vesselName}
                  onChange={(e) => onChange({ vesselName: e.target.value })}
                  placeholder="e.g. M/B St. Peter"
                  className="w-full bg-white border border-sky-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-800 mb-1">
                  Vessel Type
                </label>
                <select
                  value={data.vesselType}
                  onChange={(e) => onChange({ vesselType: e.target.value })}
                  className="w-full bg-white border border-sky-300 rounded-xl px-3 py-2 text-xs font-semibold text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
                >
                  <option value="Motorized Banka">Motorized Banka</option>
                  <option value="Non-Motorized Banka">Non-Motorized Banka</option>
                  <option value="Commercial Fishing Vessel">Commercial Fishing Vessel</option>
                  <option value="Raft / Payao Maintenance Boat">Raft / Payao Maintenance Boat</option>
                </select>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Main Species Selection */}
      <SpeciesSelector
        selectedSpecies={data.mainSpecies}
        onSelect={(mainSpecies) => onChange({ mainSpecies })}
        mode={mode}
      />
    </div>
  );
}
