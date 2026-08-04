"use client";

import React from "react";
import CommoditySelector from "@/components/onboarding/CommoditySelector";
import { FISHING_TYPES, FISHING_AREA_TYPES } from "@/lib/reference-data/constants";
import { Waves, Anchor, Ship } from "lucide-react";
import { ApplicationMode } from "@/lib/ApplicationContext";

interface Step7FisheriesProductionProps {
  fishingType?: string;
  primaryFishingArea?: string;
  fishingAreaType?: string;
  mainSpecies?: string;
  usesVessel?: boolean;
  vesselName?: string;
  vesselType?: string;
  vesselOwnership?: string;
  onChange: (updates: Partial<{
    fishingType: string;
    primaryFishingArea: string;
    fishingAreaType: string;
    mainSpecies: string;
    usesVessel: boolean;
    vesselName: string;
    vesselType: string;
    vesselOwnership: string;
  }>) => void;
  mode?: ApplicationMode;
}

export default function Step7FisheriesProduction({
  fishingType = "Municipal Capture Fishing",
  primaryFishingArea = "Coastal Waters",
  fishingAreaType = "municipal_waters",
  mainSpecies = "Yellowfin Tuna",
  usesVessel = false,
  vesselName = "",
  vesselType = "Motorized Bancas",
  vesselOwnership = "Owned",
  onChange,
  mode = "production",
}: Step7FisheriesProductionProps) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-base sm:text-lg font-extrabold text-[#163025]">
          Fisheries Profile & Species Details
        </h2>
        <p className="text-xs text-[#52796f]">
          Provide details regarding your fishing grounds, aquaculture sites, and main species.
        </p>
      </div>

      <div className="bg-white border border-[#dce9df] rounded-2xl p-4 space-y-3.5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-extrabold text-[#059669] uppercase tracking-wider">
          <Waves className="w-4 h-4 text-[#059669]" />
          <span>Fishing Activity & Location</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Primary Fishing Type <span className="text-red-500">*</span>
            </label>
            <select
              value={fishingType}
              onChange={(e) => onChange({ fishingType: e.target.value })}
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            >
              {FISHING_TYPES.map((f) => (
                <option key={f.key} value={f.label}>
                  {f.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Fishing Area / Site Type
            </label>
            <select
              value={fishingAreaType}
              onChange={(e) => onChange({ fishingAreaType: e.target.value })}
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            >
              {FISHING_AREA_TYPES.map((a) => (
                <option key={a.key} value={a.key}>
                  {a.label}
                </option>
              ))}
            </select>
          </div>

          <div className="sm:col-span-2">
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Primary Fishing Area Name / Site Location <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={primaryFishingArea}
              onChange={(e) => onChange({ primaryFishingArea: e.target.value })}
              placeholder="e.g. Lingayen Gulf / Bolinao Municipal Waters"
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            />
          </div>
        </div>
      </div>

      {/* Main Species Selector */}
      <CommoditySelector
        selectedCommodity={mainSpecies}
        onSelect={(speciesName) => onChange({ mainSpecies: speciesName })}
        sector="fisheries"
        mode={mode}
      />

      {/* Vessel Check */}
      <div className="bg-white border border-[#dce9df] rounded-2xl p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <label className="block text-xs font-bold text-[#163025]">
            Do you use a marine vessel for your fishing activity?
          </label>
          <div className="flex gap-3">
            <label className="flex items-center gap-1.5 cursor-pointer text-xs font-semibold text-[#163025]">
              <input
                type="radio"
                name="usesVessel"
                checked={usesVessel}
                onChange={() => onChange({ usesVessel: true })}
                className="accent-[#059669]"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#163025]">
              <input
                type="radio"
                name="usesVessel"
                checked={!usesVessel}
                onChange={() => onChange({ usesVessel: false })}
                className="accent-[#059669]"
              />
              <span>No</span>
            </label>
          </div>
        </div>

        {usesVessel && (
          <div className="bg-[#f4f9f5] border border-[#dce9df] rounded-xl p-3.5 grid grid-cols-1 sm:grid-cols-2 gap-3 pt-3">
            <div>
              <label className="block text-xs font-bold text-[#163025] mb-1">Vessel Name</label>
              <input
                type="text"
                value={vesselName}
                onChange={(e) => onChange({ vesselName: e.target.value })}
                placeholder="e.g. FB San Jose"
                className="w-full bg-white border border-[#dce9df] rounded-lg px-3 py-2 text-xs font-medium"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-[#163025] mb-1">Vessel Type</label>
              <select
                value={vesselType}
                onChange={(e) => onChange({ vesselType: e.target.value })}
                className="w-full bg-white border border-[#dce9df] rounded-lg px-3 py-2 text-xs font-medium"
              >
                <option value="Motorized Bancas">Motorized Banca</option>
                <option value="Non-motorized Banca">Non-motorized Banca</option>
                <option value="Commercial Vessel">Commercial Fishing Vessel</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
