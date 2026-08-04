"use client";

import React from "react";
import { User, Calendar, Heart } from "lucide-react";

interface Step3PersonalInfoProps {
  surname: string;
  firstName: string;
  middleName?: string;
  hasNoMiddleName: boolean;
  extensionName?: string;
  hasNoExtensionName: boolean;
  sex?: "male" | "female" | "other";
  dateOfBirth?: string;
  placeOfBirthMunicipality?: string;
  placeOfBirthProvinceStateCountry?: string;
  mothersMaidenFirstName?: string;
  mothersMaidenMiddleName?: string;
  mothersMaidenSurname?: string;
  civilStatus?: "single" | "married" | "widow_widower" | "legally_separated";
  spouseFirstName?: string;
  spouseMiddleName?: string;
  spouseSurname?: string;
  onChange: (updates: Partial<{
    surname: string;
    firstName: string;
    middleName: string;
    hasNoMiddleName: boolean;
    extensionName: string;
    hasNoExtensionName: boolean;
    sex: "male" | "female" | "other";
    dateOfBirth: string;
    placeOfBirthMunicipality: string;
    placeOfBirthProvinceStateCountry: string;
    mothersMaidenFirstName: string;
    mothersMaidenMiddleName: string;
    mothersMaidenSurname: string;
    civilStatus: "single" | "married" | "widow_widower" | "legally_separated";
    spouseFirstName: string;
    spouseMiddleName: string;
    spouseSurname: string;
  }>) => void;
}

export default function Step3PersonalInfo({
  surname,
  firstName,
  middleName = "",
  hasNoMiddleName,
  extensionName = "",
  hasNoExtensionName,
  sex = "male",
  dateOfBirth = "",
  placeOfBirthMunicipality = "",
  placeOfBirthProvinceStateCountry = "",
  mothersMaidenFirstName = "",
  mothersMaidenMiddleName = "",
  mothersMaidenSurname = "",
  civilStatus = "single",
  spouseFirstName = "",
  spouseMiddleName = "",
  spouseSurname = "",
  onChange,
}: Step3PersonalInfoProps) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-base sm:text-lg font-extrabold text-[#163025]">
          Part 1 — Personal Information
        </h2>
        <p className="text-xs text-[#52796f]">
          Enter legal name details exactly as written on official government documents.
        </p>
      </div>

      <div className="bg-white border border-[#dce9df] rounded-2xl p-4 space-y-3.5 shadow-xs">
        {/* Name Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Surname (Apelyido) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={surname}
              onChange={(e) => onChange({ surname: e.target.value })}
              placeholder="dela Cruz"
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              First Name (Pangalan) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={firstName}
              onChange={(e) => onChange({ firstName: e.target.value })}
              placeholder="Juan"
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-[#163025]">
                Middle Name (Gitnang Pangalan)
              </label>
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-[#52796f] cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasNoMiddleName}
                  onChange={(e) => onChange({ hasNoMiddleName: e.target.checked, middleName: e.target.checked ? "" : middleName })}
                  className="accent-[#059669] rounded"
                />
                <span>No Middle Name</span>
              </label>
            </div>
            <input
              type="text"
              value={hasNoMiddleName ? "" : middleName}
              disabled={hasNoMiddleName}
              onChange={(e) => onChange({ middleName: e.target.value })}
              placeholder="Ramos"
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] disabled:bg-gray-100"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-[#163025]">
                Extension Name (Jr., Sr., III)
              </label>
              <label className="flex items-center gap-1.5 text-[11px] font-semibold text-[#52796f] cursor-pointer">
                <input
                  type="checkbox"
                  checked={hasNoExtensionName}
                  onChange={(e) => onChange({ hasNoExtensionName: e.target.checked, extensionName: e.target.checked ? "" : extensionName })}
                  className="accent-[#059669] rounded"
                />
                <span>No Extension</span>
              </label>
            </div>
            <input
              type="text"
              value={hasNoExtensionName ? "" : extensionName}
              disabled={hasNoExtensionName}
              onChange={(e) => onChange({ extensionName: e.target.value })}
              placeholder="Jr."
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] disabled:bg-gray-100"
            />
          </div>
        </div>

        {/* Sex & Date of Birth */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 border-t border-[#edf4ee] pt-3">
          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Sex (Kasarian) <span className="text-red-500">*</span>
            </label>
            <div className="flex gap-4 pt-1">
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-xs text-[#163025]">
                <input
                  type="radio"
                  name="sex"
                  value="male"
                  checked={sex === "male"}
                  onChange={() => onChange({ sex: "male" })}
                  className="accent-[#059669]"
                />
                <span>Male (Lalaki)</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-semibold text-xs text-[#163025]">
                <input
                  type="radio"
                  name="sex"
                  value="female"
                  checked={sex === "female"}
                  onChange={() => onChange({ sex: "female" })}
                  className="accent-[#059669]"
                />
                <span>Female (Babae)</span>
              </label>
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Date of Birth (Petsa ng Kapanganakan)
            </label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => onChange({ dateOfBirth: e.target.value })}
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-[#163025]"
            />
          </div>
        </div>

        {/* Civil Status & Spouse */}
        <div className="border-t border-[#edf4ee] pt-3 space-y-3">
          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Civil Status (Katayuang Sibil)
            </label>
            <select
              value={civilStatus}
              onChange={(e) => onChange({ civilStatus: e.target.value as any })}
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-[#163025]"
            >
              <option value="single">Single (Walang asawa)</option>
              <option value="married">Married (Kasal)</option>
              <option value="widow_widower">Widow / Widower (Balo)</option>
              <option value="legally_separated">Legally Separated (Hiwalay)</option>
            </select>
          </div>

          {civilStatus === "married" && (
            <div className="bg-[#f4f9f5] border border-[#dce9df] rounded-xl p-3 space-y-2">
              <span className="text-xs font-bold text-[#059669]">Name of Spouse if Married:</span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  value={spouseFirstName}
                  onChange={(e) => onChange({ spouseFirstName: e.target.value })}
                  placeholder="Spouse First Name"
                  className="bg-white border border-[#dce9df] rounded-lg px-2.5 py-1.5 text-xs"
                />
                <input
                  type="text"
                  value={spouseMiddleName}
                  onChange={(e) => onChange({ spouseMiddleName: e.target.value })}
                  placeholder="Spouse Middle Name"
                  className="bg-white border border-[#dce9df] rounded-lg px-2.5 py-1.5 text-xs"
                />
                <input
                  type="text"
                  value={spouseSurname}
                  onChange={(e) => onChange({ spouseSurname: e.target.value })}
                  placeholder="Spouse Surname"
                  className="bg-white border border-[#dce9df] rounded-lg px-2.5 py-1.5 text-xs"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
