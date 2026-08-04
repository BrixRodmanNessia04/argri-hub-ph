"use client";

import React from "react";
import AddressSelector from "./AddressSelector";
import { ApplicationMode } from "@/lib/ApplicationContext";

export interface AddressData {
  region: string;
  province: string;
  cityMunicipality: string;
  barangay: string;
  houseLotBldgPurok?: string;
  streetSitioSubdivision?: string;
}

interface AddressStepProps {
  data: AddressData;
  onChange: (updated: Partial<AddressData>) => void;
  mode?: ApplicationMode;
}

export default function AddressStep({
  data,
  onChange,
  mode = "production",
}: AddressStepProps) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-base sm:text-lg font-extrabold text-[#163025]">
          Permanent Residence &amp; Location
        </h2>
        <p className="text-xs text-[#52796f]">
          Set your official municipality and barangay location for RSBSA registration and local services.
        </p>
      </div>

      <AddressSelector
        region={data.region}
        province={data.province}
        cityMunicipality={data.cityMunicipality}
        barangay={data.barangay}
        houseLotBldgPurok={data.houseLotBldgPurok}
        streetSitioSubdivision={data.streetSitioSubdivision}
        onChange={onChange}
        mode={mode}
      />
    </div>
  );
}
