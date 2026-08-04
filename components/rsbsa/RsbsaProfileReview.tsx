"use client";

import React from "react";
import Link from "next/link";
import { User, MapPin, Sprout, Fish, Building2, CreditCard, ShieldCheck, Edit, CheckCircle2 } from "lucide-react";
import { RsbsaFullProfileData } from "@/lib/rsbsaRepository";
import { useProducerWorkspace } from "@/lib/producerContext";

interface RsbsaProfileReviewProps {
  data: Partial<RsbsaFullProfileData>;
  onEditSection?: (sectionKey: string) => void;
  isWizardMode?: boolean;
}

export default function RsbsaProfileReview({
  data,
  onEditSection,
  isWizardMode = false,
}: RsbsaProfileReviewProps) {
  const { role, buildPath } = useProducerWorkspace();

  const getEditLink = (section: string) => {
    return buildPath(`/${role}/profile/${section}`);
  };

  return (
    <div className="space-y-4 text-xs font-medium text-[#163025]">
      <div className="text-center space-y-1">
        <h2 className="text-base sm:text-lg font-extrabold text-[#163025]">
          RSBSA Enrollment Summary Review
        </h2>
        <p className="text-xs text-[#52796f]">
          Verify all information before submitting or saving changes.
        </p>
      </div>

      {/* 1. Personal & Contact Info */}
      <div className="bg-white border border-[#dce9df] rounded-2xl p-4 space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#edf4ee] pb-2">
          <div className="flex items-center gap-2 font-extrabold text-sm text-[#163025]">
            <User className="w-4 h-4 text-[#059669]" />
            <span>1. Personal &amp; Contact Details</span>
          </div>
          {onEditSection ? (
            <button
              type="button"
              onClick={() => onEditSection("personal")}
              className="text-[#059669] font-bold hover:underline flex items-center gap-1"
            >
              <Edit className="w-3.5 h-3.5" /> Edit
            </button>
          ) : (
            <Link href={getEditLink("personal")} className="text-[#059669] font-bold hover:underline flex items-center gap-1">
              <Edit className="w-3.5 h-3.5" /> Edit
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          <div>
            <span className="text-gray-500 font-bold block">Full Name:</span>
            <span className="font-extrabold text-sm">{data.firstName} {data.middleName} {data.surname} {data.extensionName}</span>
          </div>
          <div>
            <span className="text-gray-500 font-bold block">Mobile Phone:</span>
            <span className="font-semibold">{data.mobileNumber || "N/A"}</span>
          </div>
          <div>
            <span className="text-gray-500 font-bold block">Preferred Language:</span>
            <span className="font-semibold">{data.preferredLanguage || "Filipino"}</span>
          </div>
          <div>
            <span className="text-gray-500 font-bold block">Sex:</span>
            <span className="font-semibold capitalize">{data.sex || "N/A"}</span>
          </div>
          <div>
            <span className="text-gray-500 font-bold block">Date of Birth:</span>
            <span className="font-semibold">{data.dateOfBirth || "N/A"}</span>
          </div>
          <div>
            <span className="text-gray-500 font-bold block">Civil Status:</span>
            <span className="font-semibold capitalize">{data.civilStatus?.replace("_", " ") || "N/A"}</span>
          </div>
        </div>
      </div>

      {/* 2. Permanent Address */}
      <div className="bg-white border border-[#dce9df] rounded-2xl p-4 space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#edf4ee] pb-2">
          <div className="flex items-center gap-2 font-extrabold text-sm text-[#163025]">
            <MapPin className="w-4 h-4 text-rose-500" />
            <span>2. Permanent Address &amp; Location</span>
          </div>
          {onEditSection ? (
            <button
              type="button"
              onClick={() => onEditSection("address")}
              className="text-[#059669] font-bold hover:underline flex items-center gap-1"
            >
              <Edit className="w-3.5 h-3.5" /> Edit
            </button>
          ) : (
            <Link href={getEditLink("personal")} className="text-[#059669] font-bold hover:underline flex items-center gap-1">
              <Edit className="w-3.5 h-3.5" /> Edit
            </Link>
          )}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          <div>
            <span className="text-gray-500 font-bold block">Region:</span>
            <span>{data.region}</span>
          </div>
          <div>
            <span className="text-gray-500 font-bold block">Province:</span>
            <span>{data.province}</span>
          </div>
          <div>
            <span className="text-gray-500 font-bold block">City/Municipality:</span>
            <span>{data.cityMunicipality}</span>
          </div>
          <div>
            <span className="text-gray-500 font-bold block">Barangay:</span>
            <span>{data.barangay}</span>
          </div>
        </div>
      </div>

      {/* 3. Livelihood & Production */}
      <div className="bg-white border border-[#dce9df] rounded-2xl p-4 space-y-2.5 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#edf4ee] pb-2">
          <div className="flex items-center gap-2 font-extrabold text-sm text-[#163025]">
            {role === "fisher" ? <Fish className="w-4 h-4 text-[#0284c7]" /> : <Sprout className="w-4 h-4 text-[#059669]" />}
            <span>3. Primary Livelihood &amp; Production Details</span>
          </div>
          {onEditSection ? (
            <button
              type="button"
              onClick={() => onEditSection("farm-parcels")}
              className="text-[#059669] font-bold hover:underline flex items-center gap-1"
            >
              <Edit className="w-3.5 h-3.5" /> Edit
            </button>
          ) : (
            <Link href={getEditLink("farm-parcels")} className="text-[#059669] font-bold hover:underline flex items-center gap-1">
              <Edit className="w-3.5 h-3.5" /> Edit
            </Link>
          )}
        </div>

        {data.livelihoodFarmer && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-[#f4f9f5] p-3 rounded-xl border border-[#dce9df]">
            <div>
              <span className="text-gray-500 font-bold block">Farm Name:</span>
              <span className="font-extrabold">{data.farmName || "My Farm"}</span>
            </div>
            <div>
              <span className="text-gray-500 font-bold block">Farm Area:</span>
              <span>{data.farmAreaHa || 1} ha</span>
            </div>
            <div>
              <span className="text-gray-500 font-bold block">Land Tenure:</span>
              <span>{data.tenureType || "Registered Owner"}</span>
            </div>
            <div>
              <span className="text-gray-500 font-bold block">Main Crop:</span>
              <span className="font-bold text-[#059669]">{data.mainCommodity || "Benguet Cabbage"}</span>
            </div>
          </div>
        )}

        {data.livelihoodFisher && (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-sky-50 p-3 rounded-xl border border-sky-200">
            <div>
              <span className="text-gray-500 font-bold block">Fishing Type:</span>
              <span className="font-extrabold">{data.fishingType || "Municipal Capture"}</span>
            </div>
            <div>
              <span className="text-gray-500 font-bold block">Fishing Ground:</span>
              <span>{data.primaryFishingArea || "Coastal Waters"}</span>
            </div>
            <div>
              <span className="text-gray-500 font-bold block">Main Species:</span>
              <span className="font-bold text-[#0284c7]">{data.mainSpecies || "Yellowfin Tuna"}</span>
            </div>
            <div>
              <span className="text-gray-500 font-bold block">Vessel Used:</span>
              <span>{data.usesVessel ? data.vesselName || "Motorized Banka" : "No Vessel"}</span>
            </div>
          </div>
        )}
      </div>

      {/* 4. Memberships */}
      <div className="bg-white border border-[#dce9df] rounded-2xl p-4 space-y-2 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#edf4ee] pb-2">
          <div className="flex items-center gap-2 font-extrabold text-sm text-[#163025]">
            <Building2 className="w-4 h-4 text-blue-600" />
            <span>4. Organization &amp; Cooperative Memberships</span>
          </div>
          {onEditSection ? (
            <button
              type="button"
              onClick={() => onEditSection("memberships")}
              className="text-[#059669] font-bold hover:underline flex items-center gap-1"
            >
              <Edit className="w-3.5 h-3.5" /> Edit
            </button>
          ) : (
            <Link href={getEditLink("memberships")} className="text-[#059669] font-bold hover:underline flex items-center gap-1">
              <Edit className="w-3.5 h-3.5" /> Edit
            </Link>
          )}
        </div>

        {data.memberships && data.memberships.length > 0 ? (
          <ul className="list-disc pl-5 space-y-1 text-xs">
            {data.memberships.map((m, idx) => (
              <li key={idx} className="font-semibold text-[#163025]">{m}</li>
            ))}
          </ul>
        ) : (
          <span className="text-gray-500 text-xs italic">No association memberships listed</span>
        )}
      </div>

      {/* 5. Documents & Consent */}
      <div className="bg-white border border-[#dce9df] rounded-2xl p-4 space-y-2 shadow-xs">
        <div className="flex items-center justify-between border-b border-[#edf4ee] pb-2">
          <div className="flex items-center gap-2 font-extrabold text-sm text-[#163025]">
            <ShieldCheck className="w-4 h-4 text-purple-600" />
            <span>5. Documents &amp; Declaration Consent</span>
          </div>
          {onEditSection ? (
            <button
              type="button"
              onClick={() => onEditSection("consent")}
              className="text-[#059669] font-bold hover:underline flex items-center gap-1"
            >
              <Edit className="w-3.5 h-3.5" /> Edit
            </button>
          ) : (
            <Link href={getEditLink("consent")} className="text-[#059669] font-bold hover:underline flex items-center gap-1">
              <Edit className="w-3.5 h-3.5" /> Edit
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          <div>
            <span className="text-gray-500 font-bold block">ID Type &amp; Photo:</span>
            <span>{data.idType || "PhilID"} {data.documentImageUrl ? "(Photo Attached)" : "(No Photo Attached)"}</span>
          </div>
          <div>
            <span className="text-gray-500 font-bold block">Registrant Signature / Printed Name:</span>
            <span className="font-extrabold uppercase">{data.printedName || `${data.firstName} ${data.surname}`}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
