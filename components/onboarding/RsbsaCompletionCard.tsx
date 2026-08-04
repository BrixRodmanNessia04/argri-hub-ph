"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck, ChevronRight, CheckCircle2, Circle } from "lucide-react";
import { useAppRoute } from "@/lib/navigation";

interface RsbsaCompletionCardProps {
  role?: "farmer" | "fisher" | "farmer_and_fisher";
  completedItemsCount?: number;
  totalItemsCount?: number;
}

export default function RsbsaCompletionCard({
  role = "farmer",
  completedItemsCount = 4,
  totalItemsCount = 9,
}: RsbsaCompletionCardProps) {
  const buildRoute = useAppRoute();
  const percentage = Math.round((completedItemsCount / totalItemsCount) * 100);

  const targetProfileRoute = role === "fisher" ? "/fisher/profile/rsbsa" : "/farmer/profile/rsbsa";

  return (
    <div className="bg-gradient-to-br from-[#059669]/10 via-[#059669]/5 to-white border border-[#059669]/20 rounded-3xl p-4 sm:p-5 shadow-sm space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2.5">
          <div className="p-2.5 rounded-2xl bg-[#059669] text-white shadow-xs">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-extrabold text-[#163025]">
              Complete your RSBSA-aligned profile
            </h2>
            <p className="text-xs text-[#52796f]">
              {completedItemsCount} of {totalItemsCount} sections complete ({percentage}%)
            </p>
          </div>
        </div>
        <Link
          href={buildRoute(targetProfileRoute)}
          className="px-3.5 py-2 rounded-2xl bg-[#059669] text-white text-xs font-bold hover:bg-[#047857] transition-all flex items-center gap-1 shrink-0 shadow-xs"
        >
          <span>Complete Now</span>
          <ChevronRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-[#e6f4ea] rounded-full overflow-hidden">
        <div
          className="h-full bg-[#059669] transition-all duration-500 rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Lightweight Checklist Items */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-[11px] font-semibold text-[#163025] pt-1">
        <div className="flex items-center gap-1.5 text-[#059669]">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>Basic Profile</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#059669]">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>Location</span>
        </div>
        <div className="flex items-center gap-1.5 text-[#059669]">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" />
          <span>First Production Site</span>
        </div>
        <div className="flex items-center gap-1.5 text-gray-400">
          <Circle className="w-3.5 h-3.5 shrink-0 text-gray-300" />
          <span>ID Upload (Optional)</span>
        </div>
      </div>
    </div>
  );
}
