"use client";

import React, { useState, useEffect } from "react";
import { ReferenceDataRepository } from "@/lib/reference-data/repository";
import { ApplicationMode } from "@/lib/ApplicationContext";
import { MapPin, Search, Edit3 } from "lucide-react";

interface AddressSelectorProps {
  region: string;
  province: string;
  cityMunicipality: string;
  barangay: string;
  houseLotBldgPurok?: string;
  streetSitioSubdivision?: string;
  onChange: (updates: {
    region?: string;
    province?: string;
    cityMunicipality?: string;
    barangay?: string;
    houseLotBldgPurok?: string;
    streetSitioSubdivision?: string;
  }) => void;
  mode?: ApplicationMode;
}

export default function AddressSelector({
  region,
  province,
  cityMunicipality,
  barangay,
  houseLotBldgPurok = "",
  streetSitioSubdivision = "",
  onChange,
  mode = "production",
}: AddressSelectorProps) {
  const [manualFallback, setManualFallback] = useState(false);

  const regions = ReferenceDataRepository.getRegions(mode);
  const provinces = ReferenceDataRepository.getProvinces(region, mode);
  const cities = ReferenceDataRepository.getCitiesMunicipalities(province, mode);
  const barangays = ReferenceDataRepository.getBarangays(cityMunicipality, mode);

  const handleRegionChange = (newRegion: string) => {
    const availableProvinces = ReferenceDataRepository.getProvinces(newRegion, mode);
    const defaultProv = availableProvinces[0]?.code || "";
    const availableCities = ReferenceDataRepository.getCitiesMunicipalities(defaultProv, mode);
    const defaultCity = availableCities[0]?.code || "";
    const availableBrgys = ReferenceDataRepository.getBarangays(defaultCity, mode);
    const defaultBrgy = availableBrgys[0]?.name || "";

    onChange({
      region: newRegion,
      province: defaultProv,
      cityMunicipality: defaultCity,
      barangay: defaultBrgy,
    });
  };

  const handleProvinceChange = (newProv: string) => {
    const availableCities = ReferenceDataRepository.getCitiesMunicipalities(newProv, mode);
    const defaultCity = availableCities[0]?.code || "";
    const availableBrgys = ReferenceDataRepository.getBarangays(defaultCity, mode);
    const defaultBrgy = availableBrgys[0]?.name || "";

    onChange({
      province: newProv,
      cityMunicipality: defaultCity,
      barangay: defaultBrgy,
    });
  };

  const handleCityChange = (newCity: string) => {
    const availableBrgys = ReferenceDataRepository.getBarangays(newCity, mode);
    const defaultBrgy = availableBrgys[0]?.name || "";

    onChange({
      cityMunicipality: newCity,
      barangay: defaultBrgy,
    });
  };

  return (
    <div className="space-y-4 bg-white border border-[#dce9df] rounded-2xl p-4 sm:p-5 shadow-xs">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-xs font-extrabold text-[#059669] uppercase tracking-wider">
          <MapPin className="w-4 h-4 text-[#059669]" />
          <span>Location & Address Details</span>
        </div>
        <button
          type="button"
          onClick={() => setManualFallback(!manualFallback)}
          className="text-[11px] font-bold text-[#059669] hover:underline flex items-center gap-1"
        >
          <Edit3 className="w-3 h-3" />
          <span>{manualFallback ? "Use Dropdown List" : "Manual Input Fallback"}</span>
        </button>
      </div>

      {!manualFallback ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          {/* Region */}
          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Region <span className="text-red-500">*</span>
            </label>
            <select
              value={region}
              onChange={(e) => handleRegionChange(e.target.value)}
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            >
              {regions.map((r) => (
                <option key={r.code} value={r.code}>
                  {r.name} ({r.designation})
                </option>
              ))}
            </select>
          </div>

          {/* Province */}
          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Province <span className="text-red-500">*</span>
            </label>
            <select
              value={province}
              onChange={(e) => handleProvinceChange(e.target.value)}
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            >
              {provinces.map((p) => (
                <option key={p.code} value={p.code}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>

          {/* City / Municipality */}
          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              City / Municipality <span className="text-red-500">*</span>
            </label>
            <select
              value={cityMunicipality}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            >
              {cities.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Barangay */}
          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Barangay <span className="text-red-500">*</span>
            </label>
            {barangays.length > 0 ? (
              <select
                value={barangay}
                onChange={(e) => onChange({ barangay: e.target.value })}
                className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              >
                {barangays.map((b) => (
                  <option key={b.code} value={b.name}>
                    {b.name}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type="text"
                value={barangay}
                onChange={(e) => onChange({ barangay: e.target.value })}
                placeholder="Enter Barangay Name"
                className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
              />
            )}
          </div>
        </div>
      ) : (
        /* Manual Fallback Mode */
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">Region Name</label>
            <input
              type="text"
              value={region}
              onChange={(e) => onChange({ region: e.target.value })}
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2 text-xs sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">Province Name</label>
            <input
              type="text"
              value={province}
              onChange={(e) => onChange({ province: e.target.value })}
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2 text-xs sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">City / Municipality</label>
            <input
              type="text"
              value={cityMunicipality}
              onChange={(e) => onChange({ cityMunicipality: e.target.value })}
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2 text-xs sm:text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">Barangay Name</label>
            <input
              type="text"
              value={barangay}
              onChange={(e) => onChange({ barangay: e.target.value })}
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2 text-xs sm:text-sm"
            />
          </div>
        </div>
      )}

      {/* Optional Street / House details */}
      <div className="border-t border-[#edf4ee] pt-3 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs font-bold text-[#52796f] mb-1">
            House / Lot / Bldg No. / Purok <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            value={houseLotBldgPurok}
            onChange={(e) => onChange({ houseLotBldgPurok: e.target.value })}
            placeholder="e.g. Purok 4, House #12"
            className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2 text-xs text-[#163025]"
          />
        </div>
        <div>
          <label className="block text-xs font-bold text-[#52796f] mb-1">
            Street / Sitio / Subdivision <span className="text-gray-400 font-normal">(Optional)</span>
          </label>
          <input
            type="text"
            value={streetSitioSubdivision}
            onChange={(e) => onChange({ streetSitioSubdivision: e.target.value })}
            placeholder="e.g. Sitio Sayangan"
            className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2 text-xs text-[#163025]"
          />
        </div>
      </div>
    </div>
  );
}
