"use client";

import React from "react";
import CommoditySelector from "./CommoditySelector";
import { ReferenceDataRepository } from "@/lib/reference-data/repository";
import { ApplicationMode } from "@/lib/ApplicationContext";
import { Sprout, Ruler, ShieldCheck, Calendar } from "lucide-react";

export interface FarmerQuickSetupData {
  farmName: string;
  mainCommodity: string;
  farmAreaHa: number;
  tenureType: string;
  croppingSchedule: string;
}

interface FarmerQuickSetupStepProps {
  data: FarmerQuickSetupData;
  onChange: (updated: Partial<FarmerQuickSetupData>) => void;
  mode?: ApplicationMode;
}

export default function FarmerQuickSetupStep({
  data,
  onChange,
  mode = "production",
}: FarmerQuickSetupStepProps) {
  const tenureOptions = ReferenceDataRepository.getTenureOptions(mode);
  const croppingSchedules = ReferenceDataRepository.getCroppingSchedules(mode);

  return (
    <div className="space-y-5">
      <div className="text-center space-y-1">
        <h2 className="text-base sm:text-lg font-extrabold text-[#163025]">
          Primary Farm &amp; Commodity Setup
        </h2>
        <p className="text-xs text-[#52796f]">
          Quick operational setup to get your farmer workspace ready right away.
        </p>
      </div>

      {/* Farm Basic Details */}
      <div className="bg-white border border-[#dce9df] rounded-3xl p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-[#edf4ee] pb-2 text-[#163025] font-extrabold text-sm">
          <Sprout className="w-4 h-4 text-[#059669]" />
          <span>Farm Details</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Farm / Landholding Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.farmName}
              onChange={(e) => onChange({ farmName: e.target.value })}
              placeholder="e.g. Atok Highland Terrace Farm"
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Total Farm Area (Hectares) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.1"
                min="0.01"
                value={data.farmAreaHa || ""}
                onChange={(e) => onChange({ farmAreaHa: parseFloat(e.target.value) || 0 })}
                placeholder="1.5"
                className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669] pr-12"
              />
              <span className="absolute right-3 top-2.5 text-xs font-bold text-[#52796f]">
                ha
              </span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#059669]" />
              Land Tenure Status
            </label>
            <select
              value={data.tenureType}
              onChange={(e) => onChange({ tenureType: e.target.value })}
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            >
              {tenureOptions.map((t) => (
                <option key={t.key} value={t.label}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1 flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-[#059669]" />
              Cropping Schedule / Pattern
            </label>
            <select
              value={data.croppingSchedule}
              onChange={(e) => onChange({ croppingSchedule: e.target.value })}
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            >
              {croppingSchedules.map((cs) => (
                <option key={cs.key} value={cs.label}>
                  {cs.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Main Commodity Selection */}
      <CommoditySelector
        selectedCommodity={data.mainCommodity}
        onSelect={(mainCommodity) => onChange({ mainCommodity })}
        sector="crop"
        mode={mode}
      />
    </div>
  );
}
