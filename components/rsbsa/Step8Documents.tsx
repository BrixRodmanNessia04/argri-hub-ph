"use client";

import React from "react";
import { Upload, FileText, CheckCircle2 } from "lucide-react";

interface Step8DocumentsProps {
  documentImageUrl?: string;
  onChange: (documentImageUrl: string) => void;
}

export default function Step8Documents({
  documentImageUrl = "",
  onChange,
}: Step8DocumentsProps) {
  const handleSimulatedUpload = () => {
    onChange("https://images.unsplash.com/photo-1544717305-2782549b5136?w=400&q=80");
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-base sm:text-lg font-extrabold text-[#163025]">
          Supporting Documents & Proof of Identity
        </h2>
        <p className="text-xs text-[#52796f]">
          Upload a clear photo or copy of your valid ID, Certificate of Land Ownership, or Barangay Certification.
        </p>
      </div>

      <div className="bg-white border border-[#dce9df] rounded-2xl p-5 text-center space-y-3.5 shadow-xs">
        <div className="w-12 h-12 rounded-full bg-[#e6f4ea] text-[#059669] mx-auto flex items-center justify-center">
          <Upload className="w-6 h-6" />
        </div>

        {documentImageUrl ? (
          <div className="bg-[#e6f4ea] border border-[#059669] rounded-2xl p-4 space-y-2 text-center">
            <CheckCircle2 className="w-6 h-6 text-[#059669] mx-auto" />
            <span className="text-xs font-extrabold text-[#163025] block">Document Attached Successfully</span>
            <button
              type="button"
              onClick={() => onChange("")}
              className="text-xs font-bold text-red-600 hover:underline"
            >
              Remove / Replace Photo
            </button>
          </div>
        ) : (
          <div className="space-y-2">
            <p className="text-xs text-[#52796f]">
              Supported formats: JPG, PNG, PDF (Max 5MB)
            </p>
            <button
              type="button"
              onClick={handleSimulatedUpload}
              className="px-4 py-2.5 rounded-xl bg-[#059669] text-white text-xs font-extrabold hover:bg-[#047857] transition-colors shadow-xs"
            >
              Attach Document Photo
            </button>
          </div>
        )}

        <div className="text-left bg-[#f9fbf9] p-3 rounded-xl border border-[#dce9df] text-[11px] text-[#52796f] space-y-1">
          <span className="font-bold text-[#163025] block">Accepted Identity & Land Ownership Proofs:</span>
          <ul className="list-disc pl-4 space-y-0.5">
            <li>PhilID / ePhilID, Voter&apos;s ID, Driver&apos;s License, Passport, UMID</li>
            <li>Barangay Certification with Photo</li>
            <li>Certificate of Land Transfer, CLOA, Title, or Tenancy Agreement</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
