"use client";

import React from "react";
import { ArrowLeft, CheckCircle2 } from "lucide-react";

interface OnboardingHeaderProps {
  currentStep: number;
  totalSteps: number;
  title: string;
  subtitle?: string;
  onBack?: () => void;
}

export default function OnboardingHeader({
  currentStep,
  totalSteps,
  title,
  subtitle,
  onBack,
}: OnboardingHeaderProps) {
  const percentage = Math.min(100, Math.round((currentStep / totalSteps) * 100));

  return (
    <div className="w-full bg-white border-b border-[#dce9df] sticky top-0 z-30 px-4 py-3 shadow-xs">
      <div className="max-w-2xl mx-auto space-y-2">
        <div className="flex min-w-0 flex-col gap-2">
          <div className="flex items-center gap-3 min-w-0">
            {onBack && currentStep > 1 && (
              <button
                type="button"
                onClick={onBack}
                className="p-1.5 -ml-1 rounded-full text-[#163025] hover:bg-[#f0f7f2] transition-colors shrink-0"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <div className="min-w-0">
              <span className="text-[10px] font-black uppercase text-[#059669] tracking-wider block">
                STEP {currentStep} OF {totalSteps} ({percentage}%)
              </span>
              <h1 className="text-base sm:text-lg font-extrabold text-[#163025] leading-tight">
                {title}
              </h1>
            </div>
          </div>

          <div className="w-full min-w-0 flex items-center justify-between">
            {percentage === 100 ? (
              <span className="inline-flex items-center gap-1.5 text-xs font-bold text-[#059669]">
                <CheckCircle2 className="w-4 h-4 text-[#059669]" />
                <span>Complete</span>
              </span>
            ) : (
              <span className="w-full min-w-0 text-center text-xs font-bold text-[#059669] bg-[#e6f4ea] px-3 py-1 rounded-xl border border-[#bbf7d0] block">
                Quick Setup
              </span>
            )}
          </div>
        </div>

        {subtitle && (
          <p className="text-xs text-[#52796f] leading-snug">{subtitle}</p>
        )}

        {/* Progress Bar */}
        <div className="w-full h-2 bg-[#e6f4ea] rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#059669] to-[#10b981] transition-all duration-300 ease-out rounded-full"
            style={{ width: `${percentage}%` }}
          />
        </div>
      </div>
    </div>
  );
}
