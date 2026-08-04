"use client";

import React from "react";
import { Sprout, Fish, Users, GraduationCap, CheckCircle2 } from "lucide-react";
import { ReferenceDataRepository } from "@/lib/reference-data/repository";
import { ApplicationMode } from "@/lib/ApplicationContext";

export interface LivelihoodData {
  livelihoodFarmer: boolean;
  livelihoodFarmWorker: boolean;
  livelihoodFisher: boolean;
  livelihoodAgriYouth: boolean;
}

interface LivelihoodStepProps {
  data: LivelihoodData;
  onChange: (updated: Partial<LivelihoodData>) => void;
  mode?: ApplicationMode;
}

export default function LivelihoodStep({
  data,
  onChange,
  mode = "production",
}: LivelihoodStepProps) {
  const options = ReferenceDataRepository.getLivelihoods(mode);

  const getIcon = (key: string) => {
    switch (key) {
      case "farmer":
        return <Sprout className="w-6 h-6 text-[#059669]" />;
      case "fisher":
        return <Fish className="w-6 h-6 text-[#0284c7]" />;
      case "farm_worker":
        return <Users className="w-6 h-6 text-[#d97706]" />;
      case "agri_youth":
        return <GraduationCap className="w-6 h-6 text-[#8b5cf6]" />;
      default:
        return <Sprout className="w-6 h-6 text-[#059669]" />;
    }
  };

  const isChecked = (key: string) => {
    switch (key) {
      case "farmer":
        return data.livelihoodFarmer;
      case "farm_worker":
        return data.livelihoodFarmWorker;
      case "fisher":
        return data.livelihoodFisher;
      case "agri_youth":
        return data.livelihoodAgriYouth;
      default:
        return false;
    }
  };

  const toggleOption = (key: string) => {
    switch (key) {
      case "farmer":
        onChange({ livelihoodFarmer: !data.livelihoodFarmer });
        break;
      case "farm_worker":
        onChange({ livelihoodFarmWorker: !data.livelihoodFarmWorker });
        break;
      case "fisher":
        onChange({ livelihoodFisher: !data.livelihoodFisher });
        break;
      case "agri_youth":
        onChange({ livelihoodAgriYouth: !data.livelihoodAgriYouth });
        break;
    }
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-base sm:text-lg font-extrabold text-[#163025]">
          Select Primary Agricultural Livelihood
        </h2>
        <p className="text-xs text-[#52796f]">
          You can select more than one if you engage in multiple agricultural activities.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
        {options.map((opt) => {
          const checked = isChecked(opt.key);
          return (
            <button
              key={opt.key}
              type="button"
              onClick={() => toggleOption(opt.key)}
              className={`p-4 rounded-3xl text-left border transition-all flex items-start justify-between gap-3 relative ${
                checked
                  ? "bg-[#e6f4ea] border-[#059669] ring-2 ring-[#059669]/20 shadow-sm"
                  : "bg-white border-[#dce9df] hover:border-[#a3c9ad] hover:bg-[#f9fbf9]"
              }`}
            >
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-2xl bg-white border border-[#dce9df] shadow-xs shrink-0">
                  {getIcon(opt.key)}
                </div>
                <div className="space-y-1">
                  <span className="font-extrabold text-sm text-[#163025] block">{opt.label}</span>
                  <p className="text-xs text-[#52796f] leading-snug">{opt.description}</p>
                </div>
              </div>

              <div className="shrink-0 mt-1">
                {checked ? (
                  <CheckCircle2 className="w-5 h-5 text-[#059669]" />
                ) : (
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300" />
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
