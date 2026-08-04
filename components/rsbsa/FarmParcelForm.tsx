"use client";

import React, { useState } from "react";
import CommoditySelector from "@/components/onboarding/CommoditySelector";
import { ReferenceDataRepository } from "@/lib/reference-data/repository";
import { ApplicationMode } from "@/lib/ApplicationContext";
import { Sprout, Ruler, ShieldCheck, MapPin, ChevronDown, ChevronUp } from "lucide-react";

export interface FarmParcelData {
  parcelNumber?: number;
  farmName: string;
  farmAreaHa: number;
  tenureType: string;
  mainCommodity: string;
  croppingSchedule: string;
  withinAncestralDomain?: boolean;
  isArbBeneficiary?: boolean;
  isOrganic?: boolean;
  ownershipDocumentNumber?: string;
}

interface FarmParcelFormProps {
  data: FarmParcelData;
  onChange: (updated: Partial<FarmParcelData>) => void;
  mode?: ApplicationMode;
}

export default function FarmParcelForm({
  data,
  onChange,
  mode = "production",
}: FarmParcelFormProps) {
  const [showAdvanced, setShowAdvanced] = useState(false);
  const tenureOptions = ReferenceDataRepository.getTenureOptions(mode);
  const croppingSchedules = ReferenceDataRepository.getCroppingSchedules(mode);

  return (
    <div className="space-y-4">
      <div className="bg-white border border-[#dce9df] rounded-3xl p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-[#edf4ee] pb-2 text-[#163025] font-extrabold text-sm">
          <Sprout className="w-4 h-4 text-[#059669]" />
          <span>Farm Parcel #{data.parcelNumber || 1} Details</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Farm Name / Parcel Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.farmName}
              onChange={(e) => onChange({ farmName: e.target.value })}
              placeholder="e.g. Parcel 1 - Highland Terrace"
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Approximate Area (Hectares) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <input
                type="number"
                step="0.01"
                min="0.01"
                value={data.farmAreaHa || ""}
                onChange={(e) => onChange({ farmAreaHa: parseFloat(e.target.value) || 0 })}
                placeholder="1.0"
                className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669] pr-10"
              />
              <span className="absolute right-3 top-2.5 text-xs font-bold text-[#52796f]">ha</span>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Land Tenure Type <span className="text-red-500">*</span>
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
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Cropping Schedule
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

        {/* Toggle Advanced Attributes */}
        <button
          type="button"
          onClick={() => setShowAdvanced(!showAdvanced)}
          className="text-xs font-extrabold text-[#059669] hover:underline flex items-center gap-1 pt-1"
        >
          {showAdvanced ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          <span>{showAdvanced ? "Hide Advanced Parcel Attributes" : "Show Additional Parcel Attributes (Ancestral Domain, ARB, Organic)"}</span>
        </button>

        {showAdvanced && (
          <div className="bg-[#f4f9f5] border border-[#dce9df] rounded-2xl p-4 space-y-3 pt-3">
            <div className="grid grid-cols-1 min-[480px]:grid-cols-3 gap-3 text-xs font-bold text-[#163025] min-w-0">
              <label className="flex items-center gap-2 cursor-pointer bg-white p-3 rounded-xl border border-[#dce9df] min-w-0">
                <input
                  type="checkbox"
                  checked={!!data.withinAncestralDomain}
                  onChange={(e) => onChange({ withinAncestralDomain: e.target.checked })}
                  className="rounded text-[#059669] focus:ring-[#059669] shrink-0"
                />
                <span className="leading-snug">Within Ancestral Domain (CADT/CALT)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer bg-white p-3 rounded-xl border border-[#dce9df] min-w-0">
                <input
                  type="checkbox"
                  checked={!!data.isArbBeneficiary}
                  onChange={(e) => onChange({ isArbBeneficiary: e.target.checked })}
                  className="rounded text-[#059669] focus:ring-[#059669] shrink-0"
                />
                <span className="leading-snug">Agrarian Reform Beneficiary (ARB)</span>
              </label>

              <label className="flex items-center gap-2 cursor-pointer bg-white p-3 rounded-xl border border-[#dce9df] min-w-0">
                <input
                  type="checkbox"
                  checked={!!data.isOrganic}
                  onChange={(e) => onChange({ isOrganic: e.target.checked })}
                  className="rounded text-[#059669] focus:ring-[#059669] shrink-0"
                />
                <span className="leading-snug">Practices Organic Farming</span>
              </label>
            </div>

            <div>
              <label className="block text-xs font-bold text-[#163025] mb-1">
                Land Title / CLOA / Tax Declaration Number (Optional)
              </label>
              <input
                type="text"
                value={data.ownershipDocumentNumber || ""}
                onChange={(e) => onChange({ ownershipDocumentNumber: e.target.value })}
                placeholder="OCT/TCT No., CLOA No., or Tax Dec No."
                className="w-full bg-white border border-[#dce9df] rounded-xl px-3 py-2 text-xs font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            </div>
          </div>
        )}
      </div>

      <CommoditySelector
        selectedCommodity={data.mainCommodity}
        onSelect={(mainCommodity) => onChange({ mainCommodity })}
        sector="crop"
        mode={mode}
      />
    </div>
  );
}
