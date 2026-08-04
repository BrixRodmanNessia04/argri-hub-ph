"use client";

import React from "react";
import AddressSelector from "@/components/onboarding/AddressSelector";
import { Phone, Globe } from "lucide-react";
import { ApplicationMode } from "@/lib/ApplicationContext";

interface Step4AddressContactProps {
  region: string;
  province: string;
  cityMunicipality: string;
  barangay: string;
  houseLotBldgPurok?: string;
  streetSitioSubdivision?: string;
  mobileNumber: string;
  isOwnedMobile?: boolean;
  mobileOwnerFullName?: string;
  mobileOwnerRelationship?: string;
  preferredLanguage?: string;
  onChange: (updates: Partial<{
    region: string;
    province: string;
    cityMunicipality: string;
    barangay: string;
    houseLotBldgPurok: string;
    streetSitioSubdivision: string;
    mobileNumber: string;
    isOwnedMobile: boolean;
    mobileOwnerFullName: string;
    mobileOwnerRelationship: string;
    preferredLanguage: string;
  }>) => void;
  mode?: ApplicationMode;
}

export default function Step4AddressContact({
  region,
  province,
  cityMunicipality,
  barangay,
  houseLotBldgPurok = "",
  streetSitioSubdivision = "",
  mobileNumber,
  isOwnedMobile = true,
  mobileOwnerFullName = "",
  mobileOwnerRelationship = "",
  preferredLanguage = "Filipino",
  onChange,
  mode = "production",
}: Step4AddressContactProps) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-base sm:text-lg font-extrabold text-[#163025]">
          Address & Mobile Contact Details
        </h2>
        <p className="text-xs text-[#52796f]">
          Provide your permanent residential address and active contact number.
        </p>
      </div>

      <AddressSelector
        region={region}
        province={province}
        cityMunicipality={cityMunicipality}
        barangay={barangay}
        houseLotBldgPurok={houseLotBldgPurok}
        streetSitioSubdivision={streetSitioSubdivision}
        onChange={(updates) => onChange(updates)}
        mode={mode}
      />

      {/* Mobile Contact & Language Box */}
      <div className="bg-white border border-[#dce9df] rounded-2xl p-4 space-y-3.5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-extrabold text-[#059669] uppercase tracking-wider">
          <Phone className="w-4 h-4 text-[#059669]" />
          <span>Mobile Phone & Preferred Language</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Mobile Phone Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={mobileNumber}
              onChange={(e) => onChange({ mobileNumber: e.target.value })}
              placeholder="0917-123-4567"
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Preferred Language (Wika)
            </label>
            <select
              value={preferredLanguage}
              onChange={(e) => onChange({ preferredLanguage: e.target.value })}
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            >
              <option value="Filipino">Filipino / Tagalog</option>
              <option value="English">English</option>
              <option value="Cebuano">Cebuano (Bisaya)</option>
              <option value="Ilocano">Ilocano</option>
              <option value="Hiligaynon">Hiligaynon (Ilonggo)</option>
            </select>
          </div>
        </div>

        {/* Ownership Check */}
        <div className="border-t border-[#edf4ee] pt-3 space-y-2">
          <label className="block text-xs font-bold text-[#163025]">
            Do you own the mobile number written above?
          </label>
          <div className="flex gap-4">
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#163025]">
              <input
                type="radio"
                name="isOwnedMobile"
                checked={isOwnedMobile}
                onChange={() => onChange({ isOwnedMobile: true })}
                className="accent-[#059669]"
              />
              <span>Yes, I own this mobile number</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer text-xs font-semibold text-[#163025]">
              <input
                type="radio"
                name="isOwnedMobile"
                checked={!isOwnedMobile}
                onChange={() => onChange({ isOwnedMobile: false })}
                className="accent-[#059669]"
              />
              <span>No, belongs to someone else</span>
            </label>
          </div>

          {!isOwnedMobile && (
            <div className="bg-[#f4f9f5] border border-[#dce9df] rounded-xl p-3 grid grid-cols-1 sm:grid-cols-2 gap-2 mt-2">
              <input
                type="text"
                value={mobileOwnerFullName}
                onChange={(e) => onChange({ mobileOwnerFullName: e.target.value })}
                placeholder="Owner's Full Name"
                className="bg-white border border-[#dce9df] rounded-lg px-2.5 py-1.5 text-xs font-medium"
              />
              <input
                type="text"
                value={mobileOwnerRelationship}
                onChange={(e) => onChange({ mobileOwnerRelationship: e.target.value })}
                placeholder="Relationship (e.g. Spouse, Child, Neighbor)"
                className="bg-white border border-[#dce9df] rounded-lg px-2.5 py-1.5 text-xs font-medium"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
