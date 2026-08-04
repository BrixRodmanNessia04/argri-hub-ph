"use client";

import React from "react";
import RsbsaDisclaimerBanner from "./RsbsaDisclaimerBanner";
import { ShieldCheck, FileCheck } from "lucide-react";

interface Step9ConsentProps {
  printedName: string;
  privacyPolicyAcknowledged: boolean;
  daDisclaimerAcknowledged: boolean;
  onChange: (updates: Partial<{
    printedName: string;
    privacyPolicyAcknowledged: boolean;
    daDisclaimerAcknowledged: boolean;
  }>) => void;
}

export default function Step9Consent({
  printedName,
  privacyPolicyAcknowledged,
  daDisclaimerAcknowledged,
  onChange,
}: Step9ConsentProps) {
  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-base sm:text-lg font-extrabold text-[#163025]">
          Part 4 — Consent Declaration & Data Privacy
        </h2>
        <p className="text-xs text-[#52796f]">
          Review and confirm your registration consent and data privacy declaration.
        </p>
      </div>

      <RsbsaDisclaimerBanner />

      <div className="bg-white border border-[#dce9df] rounded-2xl p-4 space-y-4 shadow-xs">
        <div className="bg-[#f4f9f5] border border-[#dce9df] rounded-xl p-3.5 text-xs text-[#163025] leading-relaxed font-medium space-y-2">
          <div className="flex items-center gap-2 font-extrabold text-[#059669]">
            <FileCheck className="w-4 h-4" />
            <span>Registrant Declaration</span>
          </div>
          <p>
            I hereby declare that all information indicated in this form are true, correct, and complete to the best of my knowledge, and that they may be used by the Department of Agriculture for the purposes of registration to the RSBSA and other legitimate interests of the Department pursuant to its mandates.
          </p>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#163025] mb-1">
            Printed Name of Registrant <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={printedName}
            onChange={(e) => onChange({ printedName: e.target.value })}
            placeholder="FULL PRINTED NAME"
            className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] uppercase focus:outline-none focus:ring-2 focus:ring-[#059669]"
          />
        </div>

        <div className="space-y-2.5 border-t border-[#edf4ee] pt-3 text-xs font-semibold text-[#163025]">
          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={privacyPolicyAcknowledged}
              onChange={(e) => onChange({ privacyPolicyAcknowledged: e.target.checked })}
              className="accent-[#059669] rounded mt-0.5"
            />
            <span>
              I acknowledge the <strong>Data Privacy Notice (RA 10173)</strong> and consent to the collection and processing of my profile for agricultural programs.
            </span>
          </label>

          <label className="flex items-start gap-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={daDisclaimerAcknowledged}
              onChange={(e) => onChange({ daDisclaimerAcknowledged: e.target.checked })}
              className="accent-[#059669] rounded mt-0.5"
            />
            <span>
              I understand that completing this digital registration form organizes my profile on AgriHub PH and does not automatically issue an official Department of Agriculture RSBSA registration number until verified by authorized local officers.
            </span>
          </label>
        </div>
      </div>
    </div>
  );
}
