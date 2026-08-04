"use client";

import React, { useState } from "react";
import CommoditySelector from "@/components/onboarding/CommoditySelector";
import { TENURE_OPTIONS, CROPPING_SCHEDULE_OPTIONS } from "@/lib/reference-data/constants";
import { Sprout, ChevronDown, ChevronUp } from "lucide-react";
import { ApplicationMode } from "@/lib/ApplicationContext";

interface Step7FarmerProductionProps {
  farmName?: string;
  farmAreaHa?: number;
  tenureType?: string;
  mainCommodity?: string;
  croppingSchedule?: string;
  onChange: (updates: Partial<{
    farmName: string;
    farmAreaHa: number;
    tenureType: string;
    mainCommodity: string;
    croppingSchedule: string;
  }>) => void;
  mode?: ApplicationMode;
}

export default function Step7FarmerProduction({
  farmName = "My Farm",
  farmAreaHa = 1.0,
  tenureType = "Registered Owner",
  mainCommodity = "Benguet Cabbage",
  croppingSchedule = "Whole year",
  onChange,
  mode = "production",
}: Step7FarmerProductionProps) {
  const [showMoreDetails, setShowMoreDetails] = useState(false);

  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-base sm:text-lg font-extrabold text-[#163025]">
          Part 3 — Farm Parcel & Crop Information
        </h2>
        <p className="text-xs text-[#52796f]">
          Provide details regarding your primary farm parcel, tenure, and main crop.
        </p>
      </div>

      <div className="bg-white border border-[#dce9df] rounded-2xl p-4 space-y-3.5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-extrabold text-[#059669] uppercase tracking-wider">
          <Sprout className="w-4 h-4 text-[#059669]" />
          <span>Primary Farm Parcel Details</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Farm Name / Local Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={farmName}
              onChange={(e) => onChange({ farmName: e.target.value })}
              placeholder="e.g. My Highland Farm"
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Approximate Area (in Hectares) <span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              step="0.01"
              min="0.01"
              value={farmAreaHa}
              onChange={(e) => onChange({ farmAreaHa: parseFloat(e.target.value) || 0 })}
              placeholder="1.0"
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Tenure Type (Uri ng Pagmamay-ari) <span className="text-red-500">*</span>
            </label>
            <select
              value={tenureType}
              onChange={(e) => onChange({ tenureType: e.target.value })}
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669] truncate"
            >
              {TENURE_OPTIONS.map((t) => (
                <option key={t.key} value={t.label}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Cropping Schedule
            </label>
            <select
              value={croppingSchedule}
              onChange={(e) => onChange({ croppingSchedule: e.target.value })}
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669] truncate"
            >
              {CROPPING_SCHEDULE_OPTIONS.map((c) => (
                <option key={c.key} value={c.label}>
                  {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Commodity Selector */}
      <CommoditySelector
        selectedCommodity={mainCommodity}
        onSelect={(name) => onChange({ mainCommodity: name })}
        sector="crop"
        mode={mode}
      />

      {/* Collapsible More Details */}
      <div className="bg-white border border-[#dce9df] rounded-2xl p-4 shadow-xs">
        <button
          type="button"
          onClick={() => setShowMoreDetails(!showMoreDetails)}
          className="w-full flex items-center justify-between text-xs font-extrabold text-[#059669]"
        >
          <span>More Details (Ancestral Domain, ARB, Farm Type)</span>
          {showMoreDetails ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showMoreDetails && (
          <div className="pt-3 space-y-3 border-t border-[#edf4ee] mt-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-[#059669]" />
                <span className="font-semibold text-[#163025]">Within Ancestral Domain (AD)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" className="accent-[#059669]" />
                <span className="font-semibold text-[#163025]">Agrarian Reform Beneficiary (ARB)</span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#163025] mb-1">Farm Type Classification</label>
              <select className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2 text-xs font-semibold">
                <option value="irrigated">1 - Irrigated</option>
                <option value="rainfed_upland">2 - Rainfed Upland</option>
                <option value="rainfed_lowland">3 - Rainfed Lowland</option>
                <option value="urban_peri_urban">4 - Urban / Peri-Urban</option>
              </select>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
