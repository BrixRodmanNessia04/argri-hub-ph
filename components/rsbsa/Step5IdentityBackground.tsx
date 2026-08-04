"use client";

import React from "react";
import { CreditCard, Award, Users } from "lucide-react";
import { IDENTITY_DOC_TYPES } from "@/lib/reference-data/constants";

interface Step5IdentityBackgroundProps {
  idType?: string;
  idNumber?: string;
  philIdPcn?: string;
  transactionReferenceNumber?: string;
  highestFormalEducation?: string;
  religion?: string;
  isIccIp?: boolean;
  iccIpName?: string;
  isPwd?: boolean;
  is4psBeneficiary?: boolean;
  onChange: (updates: Partial<{
    idType: string;
    idNumber: string;
    philIdPcn: string;
    transactionReferenceNumber: string;
    highestFormalEducation: string;
    religion: string;
    isIccIp: boolean;
    iccIpName: string;
    isPwd: boolean;
    is4psBeneficiary: boolean;
  }>) => void;
}

export default function Step5IdentityBackground({
  idType = "PhilID / ePhilID",
  idNumber = "",
  philIdPcn = "",
  transactionReferenceNumber = "",
  highestFormalEducation = "High School (non K-12)",
  religion = "Christianity",
  isIccIp = false,
  iccIpName = "",
  isPwd = false,
  is4psBeneficiary = false,
  onChange,
}: Step5IdentityBackgroundProps) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-base sm:text-lg font-extrabold text-[#163025]">
          Identity & Socio-Demographic Profile
        </h2>
        <p className="text-xs text-[#52796f]">
          Identity documents, education, religion, and social program status.
        </p>
      </div>

      {/* Proof of Identity Card */}
      <div className="bg-white border border-[#dce9df] rounded-2xl p-4 space-y-3.5 shadow-xs">
        <div className="flex items-center gap-2 text-xs font-extrabold text-[#059669] uppercase tracking-wider">
          <CreditCard className="w-4 h-4 text-[#059669]" />
          <span>Proof of Identity & PhilID</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              PhilID or ePhilID PCN <span className="text-gray-400 font-normal">(If available)</span>
            </label>
            <input
              type="text"
              value={philIdPcn}
              onChange={(e) => onChange({ philIdPcn: e.target.value })}
              placeholder="e.g. 1234-5678-9012-3456"
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-[#163025]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Transaction Reference Number (TRN) <span className="text-gray-400 font-normal">(If no PhilID)</span>
            </label>
            <input
              type="text"
              value={transactionReferenceNumber}
              onChange={(e) => onChange({ transactionReferenceNumber: e.target.value })}
              placeholder="TRN Number"
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-[#163025]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Submitted ID / Document Type
            </label>
            <select
              value={idType}
              onChange={(e) => onChange({ idType: e.target.value })}
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-[#163025]"
            >
              {IDENTITY_DOC_TYPES.map((t) => (
                <option key={t.key} value={t.key}>
                  {t.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              ID / Document Number
            </label>
            <input
              type="text"
              value={idNumber}
              onChange={(e) => onChange({ idNumber: e.target.value })}
              placeholder="ID Number"
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-[#163025]"
            />
          </div>
        </div>
      </div>

      {/* Education & Demographics */}
      <div className="bg-white border border-[#dce9df] rounded-2xl p-4 space-y-3 shadow-xs">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Highest Formal Education
            </label>
            <select
              value={highestFormalEducation}
              onChange={(e) => onChange({ highestFormalEducation: e.target.value })}
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-[#163025]"
            >
              <option value="Pre-school">Pre-school</option>
              <option value="Elementary">Elementary</option>
              <option value="High School (non K-12)">High School (non K-12)</option>
              <option value="Junior High School (K-12)">Junior High School (K-12)</option>
              <option value="Senior High School (K-12)">Senior High School (K-12)</option>
              <option value="College">College</option>
              <option value="Post-graduate">Post-graduate</option>
              <option value="Vocational">Vocational</option>
              <option value="None">None</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">Religion</label>
            <select
              value={religion}
              onChange={(e) => onChange({ religion: e.target.value })}
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-[#163025]"
            >
              <option value="Christianity">Christianity</option>
              <option value="Islam">Islam</option>
              <option value="Others">Others</option>
              <option value="None">None</option>
            </select>
          </div>
        </div>

        {/* Special Status Toggles */}
        <div className="border-t border-[#edf4ee] pt-3 grid grid-cols-1 min-[480px]:grid-cols-3 gap-3 text-xs min-w-0">
          <label className="flex items-center gap-2 cursor-pointer bg-[#f9fbf9] p-3 rounded-xl border border-[#dce9df] min-w-0">
            <input
              type="checkbox"
              checked={isIccIp}
              onChange={(e) => onChange({ isIccIp: e.target.checked })}
              className="accent-[#059669] shrink-0"
            />
            <span className="font-semibold text-[#163025] leading-snug">ICC / Indigenous Peoples</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer bg-[#f9fbf9] p-3 rounded-xl border border-[#dce9df] min-w-0">
            <input
              type="checkbox"
              checked={isPwd}
              onChange={(e) => onChange({ isPwd: e.target.checked })}
              className="accent-[#059669] shrink-0"
            />
            <span className="font-semibold text-[#163025] leading-snug">Person with Disability (PWD)</span>
          </label>

          <label className="flex items-center gap-2 cursor-pointer bg-[#f9fbf9] p-3 rounded-xl border border-[#dce9df] min-w-0">
            <input
              type="checkbox"
              checked={is4psBeneficiary}
              onChange={(e) => onChange({ is4psBeneficiary: e.target.checked })}
              className="accent-[#059669] shrink-0"
            />
            <span className="font-semibold text-[#163025] leading-snug">4Ps Beneficiary</span>
          </label>
        </div>

        {isIccIp && (
          <div className="pt-2">
            <label className="block text-xs font-bold text-[#163025] mb-1">Name of ICC / IP Community</label>
            <input
              type="text"
              value={iccIpName}
              onChange={(e) => onChange({ iccIpName: e.target.value })}
              placeholder="e.g. Ibaloi, Kankanaey, Ifugao"
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2 text-xs"
            />
          </div>
        )}
      </div>
    </div>
  );
}
