"use client";

import React from "react";
import { Sprout, UserCheck, Waves, GraduationCap, Check } from "lucide-react";

interface Step2LivelihoodProps {
  farmer: boolean;
  farmWorker: boolean;
  fisher: boolean;
  agriYouth: boolean;
  onChange: (updates: { farmer?: boolean; farmWorker?: boolean; fisher?: boolean; agriYouth?: boolean }) => void;
}

export default function Step2Livelihood({
  farmer,
  farmWorker,
  fisher,
  agriYouth,
  onChange,
}: Step2LivelihoodProps) {
  const isBoth = farmer && fisher;

  const handleSelectSingle = (role: "farmer" | "fisher" | "both") => {
    if (role === "farmer") {
      onChange({ farmer: true, fisher: false });
    } else if (role === "fisher") {
      onChange({ farmer: false, fisher: true });
    } else {
      onChange({ farmer: true, fisher: true });
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-base sm:text-lg font-extrabold text-[#163025]">
          Select Primary Livelihood Classification
        </h2>
        <p className="text-xs text-[#52796f]">
          Choose the options that describe your agricultural or fisheries operations.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-1">
        {/* Farmer Card */}
        <button
          type="button"
          onClick={() => handleSelectSingle("farmer")}
          className={`p-4 rounded-2xl border text-left transition-all relative flex items-start gap-3.5 ${
            farmer && !fisher
              ? "bg-[#e6f4ea] border-[#059669] ring-2 ring-[#059669] shadow-sm"
              : "bg-white border-[#dce9df] hover:border-[#059669]/50"
          }`}
        >
          <div className={`p-3 rounded-xl ${farmer && !fisher ? "bg-[#059669] text-white" : "bg-[#f4f9f5] text-[#059669]"}`}>
            <Sprout className="w-6 h-6" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-[#163025]">Farmer (Magsasaka)</span>
              {farmer && !fisher && <Check className="w-5 h-5 text-[#059669]" />}
            </div>
            <p className="text-xs text-[#52796f] leading-snug">
              I manage or cultivate a farm or crop parcel.
            </p>
          </div>
        </button>

        {/* Fisherfolk Card */}
        <button
          type="button"
          onClick={() => handleSelectSingle("fisher")}
          className={`p-4 rounded-2xl border text-left transition-all relative flex items-start gap-3.5 ${
            fisher && !farmer
              ? "bg-[#e6f4ea] border-[#059669] ring-2 ring-[#059669] shadow-sm"
              : "bg-white border-[#dce9df] hover:border-[#059669]/50"
          }`}
        >
          <div className={`p-3 rounded-xl ${fisher && !farmer ? "bg-[#059669] text-white" : "bg-[#f4f9f5] text-[#059669]"}`}>
            <Waves className="w-6 h-6" />
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-[#163025]">Fisherfolk (Mangingisda)</span>
              {fisher && !farmer && <Check className="w-5 h-5 text-[#059669]" />}
            </div>
            <p className="text-xs text-[#52796f] leading-snug">
              I work in capture fishing, aquaculture, fishpond, seaweed, or shellfish farming.
            </p>
          </div>
        </button>

        {/* Farmer & Fisherfolk Card */}
        <button
          type="button"
          onClick={() => handleSelectSingle("both")}
          className={`p-4 rounded-2xl border text-left transition-all relative flex items-start gap-3.5 sm:col-span-2 ${
            isBoth
              ? "bg-[#e6f4ea] border-[#059669] ring-2 ring-[#059669] shadow-sm"
              : "bg-white border-[#dce9df] hover:border-[#059669]/50"
          }`}
        >
          <div className={`p-3 rounded-xl ${isBoth ? "bg-[#059669] text-white" : "bg-[#f4f9f5] text-[#059669]"}`}>
            <div className="flex gap-1">
              <Sprout className="w-5 h-5" />
              <Waves className="w-5 h-5" />
            </div>
          </div>
          <div className="space-y-1 flex-1">
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-[#163025]">Both Farmer & Fisherfolk</span>
              {isBoth && <Check className="w-5 h-5 text-[#059669]" />}
            </div>
            <p className="text-xs text-[#52796f] leading-snug">
              I manage crop parcels AND engage in capture fishing, aquaculture, or fisheries activities. Shares one unified personal profile.
            </p>
          </div>
        </button>
      </div>

      {/* Additional Livelihood Sub-classifications */}
      <div className="border-t border-[#edf4ee] pt-3 space-y-2">
        <span className="text-xs font-bold text-[#52796f] block">Additional Classifications (Optional):</span>
        <div className="flex flex-wrap gap-3 text-xs">
          <label className="flex items-center gap-2 cursor-pointer bg-white border border-[#dce9df] px-3 py-2 rounded-xl">
            <input
              type="checkbox"
              checked={farmWorker}
              onChange={(e) => onChange({ farmWorker: e.target.checked })}
              className="accent-[#059669] rounded"
            />
            <span className="font-semibold text-[#163025]">Farm Worker (Manggagawa)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer bg-white border border-[#dce9df] px-3 py-2 rounded-xl">
            <input
              type="checkbox"
              checked={agriYouth}
              onChange={(e) => onChange({ agriYouth: e.target.checked })}
              className="accent-[#059669] rounded"
            />
            <span className="font-semibold text-[#163025]">Agri-Youth (Age 18–30)</span>
          </label>
        </div>
      </div>
    </div>
  );
}
