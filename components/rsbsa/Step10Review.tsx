"use client";

import React from "react";
import RsbsaDisclaimerBanner from "./RsbsaDisclaimerBanner";
import { CheckCircle2, Edit3, User, Sprout, Waves, MapPin, Phone } from "lucide-react";
import { RsbsaFullProfileData } from "@/lib/rsbsaRepository";

interface Step10ReviewProps {
  data: Partial<RsbsaFullProfileData>;
  onEditStep: (stepNumber: number) => void;
  onSubmit: () => void;
  loading?: boolean;
}

export default function Step10Review({
  data,
  onEditStep,
  onSubmit,
  loading = false,
}: Step10ReviewProps) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-base sm:text-lg font-extrabold text-[#163025]">
          Step 10 — Review Your Registration Summary
        </h2>
        <p className="text-xs text-[#52796f]">
          Review all information before submitting your digital profile registration.
        </p>
      </div>

      <RsbsaDisclaimerBanner compact />

      {/* Personal Info Card */}
      <div className="bg-white border border-[#dce9df] rounded-2xl p-4 space-y-2 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#edf4ee] pb-2">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#059669]">
            <User className="w-4 h-4" />
            <span>Personal Information</span>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(3)}
            className="text-xs font-bold text-[#059669] flex items-center gap-1 hover:underline"
          >
            <Edit3 className="w-3 h-3" />
            <span>Edit</span>
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 text-xs text-[#163025]">
          <div><span className="text-[#52796f]">Name:</span> <span className="font-bold">{data.firstName} {data.surname}</span></div>
          <div><span className="text-[#52796f]">Sex:</span> <span className="font-bold uppercase">{data.sex || "Male"}</span></div>
          <div><span className="text-[#52796f]">Mobile:</span> <span className="font-bold">{data.mobileNumber || "N/A"}</span></div>
          <div><span className="text-[#52796f]">Civil Status:</span> <span className="font-bold capitalize">{data.civilStatus || "Single"}</span></div>
        </div>
      </div>

      {/* Address Card */}
      <div className="bg-white border border-[#dce9df] rounded-2xl p-4 space-y-2 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#edf4ee] pb-2">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#059669]">
            <MapPin className="w-4 h-4" />
            <span>Location & Address</span>
          </div>
          <button
            type="button"
            onClick={() => onEditStep(4)}
            className="text-xs font-bold text-[#059669] flex items-center gap-1 hover:underline"
          >
            <Edit3 className="w-3 h-3" />
            <span>Edit</span>
          </button>
        </div>
        <p className="text-xs font-bold text-[#163025]">
          Barangay {data.barangay}, {data.cityMunicipality}, {data.province}, {data.region}
        </p>
      </div>

      {/* Farmer Production Card */}
      {data.livelihoodFarmer && (
        <div className="bg-white border border-[#dce9df] rounded-2xl p-4 space-y-2 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#edf4ee] pb-2">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#059669]">
              <Sprout className="w-4 h-4" />
              <span>Farmer Production Profile</span>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(7)}
              className="text-xs font-bold text-[#059669] flex items-center gap-1 hover:underline"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-[#163025]">
            <div><span className="text-[#52796f]">Farm Name:</span> <span className="font-bold">{data.farmName || "My Farm"}</span></div>
            <div><span className="text-[#52796f]">Area:</span> <span className="font-bold">{data.farmAreaHa || 1} Ha</span></div>
            <div><span className="text-[#52796f]">Main Commodity:</span> <span className="font-bold">{data.mainCommodity || "Cabbage"}</span></div>
            <div><span className="text-[#52796f]">Tenure:</span> <span className="font-bold">{data.tenureType || "Registered Owner"}</span></div>
          </div>
        </div>
      )}

      {/* Fisheries Production Card */}
      {data.livelihoodFisher && (
        <div className="bg-white border border-[#dce9df] rounded-2xl p-4 space-y-2 shadow-xs">
          <div className="flex items-center justify-between border-b border-[#edf4ee] pb-2">
            <div className="flex items-center gap-2 text-xs font-extrabold text-[#059669]">
              <Waves className="w-4 h-4" />
              <span>Fisheries Profile</span>
            </div>
            <button
              type="button"
              onClick={() => onEditStep(7)}
              className="text-xs font-bold text-[#059669] flex items-center gap-1 hover:underline"
            >
              <Edit3 className="w-3 h-3" />
              <span>Edit</span>
            </button>
          </div>
          <div className="grid grid-cols-2 gap-2 text-xs text-[#163025]">
            <div><span className="text-[#52796f]">Fishing Type:</span> <span className="font-bold">{data.fishingType || "Municipal Capture"}</span></div>
            <div><span className="text-[#52796f]">Fishing Area:</span> <span className="font-bold">{data.primaryFishingArea || "Coastal Waters"}</span></div>
            <div><span className="text-[#52796f]">Main Species:</span> <span className="font-bold">{data.mainSpecies || "Yellowfin Tuna"}</span></div>
            <div><span className="text-[#52796f]">Vessel Used:</span> <span className="font-bold">{data.usesVessel ? (data.vesselName || "Yes") : "No"}</span></div>
          </div>
        </div>
      )}

      {/* Submit Button */}
      <button
        type="button"
        disabled={loading}
        onClick={onSubmit}
        className="w-full py-3.5 rounded-2xl bg-[#059669] text-white font-extrabold text-sm hover:bg-[#047857] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
      >
        <CheckCircle2 className="w-5 h-5" />
        <span>{loading ? "Submitting Profile..." : "Submit Digital Profile Registration"}</span>
      </button>
    </div>
  );
}
