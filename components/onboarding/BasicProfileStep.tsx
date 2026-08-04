"use client";

import React from "react";
import { User, Phone, Globe, Info } from "lucide-react";
import { ReferenceDataRepository } from "@/lib/reference-data/repository";
import { ApplicationMode } from "@/lib/ApplicationContext";

export interface BasicProfileData {
  firstName: string;
  middleName: string;
  surname: string;
  extensionName: string;
  hasNoMiddleName: boolean;
  hasNoExtensionName: boolean;
  sex: "male" | "female" | "other";
  dateOfBirth: string;
  civilStatus: "single" | "married" | "widow_widower" | "legally_separated";
  mobileNumber: string;
  isOwnedMobile: boolean;
  preferredLanguage: string;
}

interface BasicProfileStepProps {
  data: BasicProfileData;
  onChange: (updated: Partial<BasicProfileData>) => void;
  sourceLabel?: string | null;
  mode?: ApplicationMode;
}

export default function BasicProfileStep({
  data,
  onChange,
  sourceLabel,
  mode = "production",
}: BasicProfileStepProps) {
  const languages = ReferenceDataRepository.getSupportedLanguages(mode);

  return (
    <div className="space-y-5">
      {sourceLabel && (
        <div className="bg-[#e6f4ea] text-[#059669] px-3.5 py-2.5 rounded-2xl text-xs font-bold flex items-center gap-2 border border-[#bce3c6]">
          <Info className="w-4 h-4 shrink-0" />
          <span>Prefilled automatically: {sourceLabel}</span>
        </div>
      )}

      {/* Name Information */}
      <div className="bg-white border border-[#dce9df] rounded-3xl p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-[#edf4ee] pb-2 text-[#163025] font-extrabold text-sm">
          <User className="w-4 h-4 text-[#059669]" />
          <span>Personal & Legal Name Details</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              First Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.firstName}
              onChange={(e) => onChange({ firstName: e.target.value })}
              placeholder="Juan"
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-[#163025]">Middle Name</label>
              <label className="flex items-center gap-1 text-[11px] text-[#52796f] cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.hasNoMiddleName}
                  onChange={(e) =>
                    onChange({
                      hasNoMiddleName: e.target.checked,
                      middleName: e.target.checked ? "" : data.middleName,
                    })
                  }
                  className="rounded text-[#059669] focus:ring-[#059669]"
                />
                <span>No Middle Name</span>
              </label>
            </div>
            <input
              type="text"
              disabled={data.hasNoMiddleName}
              value={data.hasNoMiddleName ? "" : data.middleName}
              onChange={(e) => onChange({ middleName: e.target.value })}
              placeholder="Ramos"
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669] disabled:opacity-50 disabled:bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Last Name / Surname <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={data.surname}
              onChange={(e) => onChange({ surname: e.target.value })}
              placeholder="dela Cruz"
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-bold text-[#163025]">Suffix / Extension</label>
              <label className="flex items-center gap-1 text-[11px] text-[#52796f] cursor-pointer">
                <input
                  type="checkbox"
                  checked={data.hasNoExtensionName}
                  onChange={(e) =>
                    onChange({
                      hasNoExtensionName: e.target.checked,
                      extensionName: e.target.checked ? "" : data.extensionName,
                    })
                  }
                  className="rounded text-[#059669] focus:ring-[#059669]"
                />
                <span>None</span>
              </label>
            </div>
            <input
              type="text"
              disabled={data.hasNoExtensionName}
              value={data.hasNoExtensionName ? "" : data.extensionName}
              onChange={(e) => onChange({ extensionName: e.target.value })}
              placeholder="Jr., III"
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669] disabled:opacity-50 disabled:bg-gray-100"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">Sex</label>
            <select
              value={data.sex}
              onChange={(e) => onChange({ sex: e.target.value as any })}
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            >
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other / Prefer not to say</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">Date of Birth</label>
            <input
              type="date"
              value={data.dateOfBirth}
              onChange={(e) => onChange({ dateOfBirth: e.target.value })}
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">Civil Status</label>
            <select
              value={data.civilStatus}
              onChange={(e) => onChange({ civilStatus: e.target.value as any })}
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            >
              <option value="single">Single</option>
              <option value="married">Married</option>
              <option value="widow_widower">Widow / Widower</option>
              <option value="legally_separated">Legally Separated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contact & Language Preferences */}
      <div className="bg-white border border-[#dce9df] rounded-3xl p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-[#edf4ee] pb-2 text-[#163025] font-extrabold text-sm">
          <Phone className="w-4 h-4 text-[#059669]" />
          <span>Mobile Phone &amp; Preferences</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Mobile Number <span className="text-red-500">*</span>
            </label>
            <input
              type="tel"
              value={data.mobileNumber}
              onChange={(e) => onChange({ mobileNumber: e.target.value })}
              placeholder="09171234567"
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Preferred App Language
            </label>
            <select
              value={data.preferredLanguage}
              onChange={(e) => onChange({ preferredLanguage: e.target.value })}
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.label}>
                  {l.label} {l.isFullySupported ? " (Full Support)" : ""}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="bg-[#f4f9f5] border border-[#dce9df] rounded-2xl p-4 flex min-w-0 flex-col gap-2.5 text-xs text-[#163025]">
          <span className="w-full min-w-0 font-extrabold text-[#163025]">Is this your personal mobile phone?</span>
          <div className="w-full min-w-0 flex flex-col sm:flex-row items-stretch sm:items-center gap-2 pt-0.5">
            <label className="flex items-center gap-2 cursor-pointer font-bold bg-white px-3.5 py-2 rounded-xl border border-[#dce9df] flex-1">
              <input
                type="radio"
                name="isOwnedMobile"
                checked={data.isOwnedMobile}
                onChange={() => onChange({ isOwnedMobile: true })}
                className="text-[#059669] focus:ring-[#059669]"
              />
              <span>Yes</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer font-bold bg-white px-3.5 py-2 rounded-xl border border-[#dce9df] flex-1">
              <input
                type="radio"
                name="isOwnedMobile"
                checked={!data.isOwnedMobile}
                onChange={() => onChange({ isOwnedMobile: false })}
                className="text-[#059669] focus:ring-[#059669]"
              />
              <span>No (Family / Shared)</span>
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
