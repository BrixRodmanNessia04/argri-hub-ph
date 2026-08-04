"use client";

import React from "react";
import { ReferenceDataRepository } from "@/lib/reference-data/repository";
import { ApplicationMode } from "@/lib/ApplicationContext";
import Step8Documents from "./Step8Documents";
import { CreditCard, FileCheck } from "lucide-react";

export interface IdentityDocumentData {
  idType?: string;
  idNumber?: string;
  philIdPcn?: string;
  transactionReferenceNumber?: string;
  documentImageUrl?: string;
}

interface IdentityDocumentFormProps {
  data: IdentityDocumentData;
  onChange: (updated: Partial<IdentityDocumentData>) => void;
  mode?: ApplicationMode;
}

export default function IdentityDocumentForm({
  data,
  onChange,
  mode = "production",
}: IdentityDocumentFormProps) {
  const docTypes = ReferenceDataRepository.getIdentityDocTypes(mode);

  return (
    <div className="space-y-4">
      <div className="bg-white border border-[#dce9df] rounded-3xl p-5 shadow-xs space-y-4">
        <div className="flex items-center gap-2 border-b border-[#edf4ee] pb-2 text-[#163025] font-extrabold text-sm">
          <CreditCard className="w-4 h-4 text-[#059669]" />
          <span>Government ID &amp; Registration References</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Primary Government ID Type
            </label>
            <select
              value={data.idType || "PhilID / ePhilID"}
              onChange={(e) => onChange({ idType: e.target.value })}
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            >
              {docTypes.map((dt) => (
                <option key={dt.key} value={dt.label}>
                  {dt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              ID Number
            </label>
            <input
              type="text"
              value={data.idNumber || ""}
              onChange={(e) => onChange({ idNumber: e.target.value })}
              placeholder="e.g. 1234-5678-9012-3456"
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              PhilID PCN (PhilSys Card Number)
            </label>
            <input
              type="text"
              value={data.philIdPcn || ""}
              onChange={(e) => onChange({ philIdPcn: e.target.value })}
              placeholder="Optional PhilSys Card Number"
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-[#163025] mb-1">
              Local Transaction Ref Number
            </label>
            <input
              type="text"
              value={data.transactionReferenceNumber || ""}
              onChange={(e) => onChange({ transactionReferenceNumber: e.target.value })}
              placeholder="e.g. TRN-2026-0099"
              className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            />
          </div>
        </div>
      </div>

      <Step8Documents
        documentImageUrl={data.documentImageUrl || ""}
        onChange={(documentImageUrl) => onChange({ documentImageUrl })}
      />
    </div>
  );
}
