"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, User, MapPin, Sprout, Fish, Building2, CreditCard } from "lucide-react";
import { useProducerWorkspace } from "@/lib/producerContext";

export interface ProfileSectionStatus {
  key: "personal" | "address" | "livelihood" | "production" | "memberships" | "documents" | "consent";
  title: string;
  description: string;
  isComplete: boolean;
  href: string;
  icon: string;
}

interface ProfileCompletionChecklistProps {
  percentage: number;
  sections?: ProfileSectionStatus[];
  role?: "farmer" | "fisher";
}

export default function ProfileCompletionChecklist({
  percentage,
  sections,
  role = "farmer",
}: ProfileCompletionChecklistProps) {
  const { buildPath } = useProducerWorkspace();

  const defaultSections: ProfileSectionStatus[] = [
    {
      key: "personal",
      title: "Personal & Contact Info",
      description: "Full name, birthdate, mobile number",
      isComplete: percentage >= 20,
      href: buildPath(`/${role}/profile/personal`),
      icon: "user",
    },
    {
      key: "address",
      title: "Address & Location",
      description: "Region, province, municipality, barangay",
      isComplete: percentage >= 40,
      href: buildPath(`/${role}/profile/personal`),
      icon: "mappin",
    },
    {
      key: "production",
      title: role === "fisher" ? "Fisheries Production Setup" : "Farm Parcels & Crops",
      description: role === "fisher" ? "Fishing grounds, species, vessel" : "Farm area, tenure, main commodity",
      isComplete: percentage >= 60,
      href: buildPath(`/${role}/profile/farm-parcels`),
      icon: role === "fisher" ? "fish" : "sprout",
    },
    {
      key: "memberships",
      title: "Coop & Association Memberships",
      description: "FCA, IA, or Cooperative names",
      isComplete: percentage >= 80,
      href: buildPath(`/${role}/profile/memberships`),
      icon: "building",
    },
    {
      key: "documents",
      title: "ID & Consent Verification",
      description: "Valid government ID and signed declaration",
      isComplete: percentage >= 100,
      href: buildPath(`/${role}/profile/documents`),
      icon: "creditcard",
    },
  ];

  const items = sections || defaultSections;
  const completedCount = items.filter((i) => i.isComplete).length;

  const renderIcon = (type: string) => {
    switch (type) {
      case "user":
        return <User className="w-4 h-4 text-emerald-600" />;
      case "mappin":
        return <MapPin className="w-4 h-4 text-[#059669]" />;
      case "sprout":
        return <Sprout className="w-4 h-4 text-[#059669]" />;
      case "fish":
        return <Fish className="w-4 h-4 text-[#0284c7]" />;
      case "building":
        return <Building2 className="w-4 h-4 text-blue-600" />;
      case "creditcard":
        return <CreditCard className="w-4 h-4 text-purple-600" />;
      default:
        return <ShieldCheck className="w-4 h-4 text-[#059669]" />;
    }
  };

  return (
    <div className="bg-white border border-[#dce9df] rounded-3xl p-5 shadow-xs space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <span className="text-[11px] font-extrabold text-[#059669] uppercase tracking-wider block">
            RSBSA Profile Alignment Status
          </span>
          <h2 className="text-base font-extrabold text-[#163025]">
            {completedCount} of {items.length} Sections Completed ({percentage}%)
          </h2>
        </div>

        <div className="w-12 h-12 rounded-2xl bg-[#e6f4ea] border border-[#bce3c6] flex items-center justify-center font-black text-sm text-[#059669]">
          {percentage}%
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-[#f4f9f5] border border-[#dce9df] rounded-full h-3 overflow-hidden p-0.5">
        <div
          className="bg-gradient-to-r from-[#059669] to-[#10b981] h-full rounded-full transition-all duration-500"
          style={{ width: `${Math.max(percentage, 5)}%` }}
        />
      </div>

      {/* Checklist Grid */}
      <div className="space-y-2 pt-1">
        {items.map((item) => (
          <Link
            key={item.key}
            href={item.href}
            className={`p-3 rounded-2xl border transition-all flex items-center justify-between text-xs ${
              item.isComplete
                ? "bg-[#f9fbf9] border-[#dce9df] text-[#163025] hover:border-[#059669]"
                : "bg-amber-50/60 border-amber-200 text-amber-900 hover:bg-amber-50"
            }`}
          >
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-xl bg-white border border-gray-200 shrink-0">
                {renderIcon(item.icon)}
              </div>
              <div>
                <span className="font-extrabold block text-xs">{item.title}</span>
                <p className="text-[11px] text-gray-500 font-normal">{item.description}</p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              {item.isComplete ? (
                <span className="bg-[#e6f4ea] text-[#059669] px-2.5 py-1 rounded-full font-extrabold text-[11px] flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Complete
                </span>
              ) : (
                <span className="bg-amber-100 text-amber-800 px-2.5 py-1 rounded-full font-extrabold text-[11px] flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5" /> Action Needed
                </span>
              )}
              <ArrowRight className="w-4 h-4 text-gray-400" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
