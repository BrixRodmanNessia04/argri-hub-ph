"use client";

import React from "react";
import { CheckCircle2, Circle, Sparkles } from "lucide-react";

export interface CompletionItem {
  key: string;
  label: string;
  isComplete: boolean;
}

interface ProfileCompletionCardProps {
  items: CompletionItem[];
}

export default function ProfileCompletionCard({ items }: ProfileCompletionCardProps) {
  const completedCount = items.filter((i) => i.isComplete).length;
  const percent = Math.round((completedCount / items.length) * 100);

  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-600" />
          <h2 className="text-sm font-extrabold text-slate-900">
            Profile Completion Status
          </h2>
        </div>
        <span className="text-xs font-extrabold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
          {percent}% Complete
        </span>
      </div>

      <div className="w-full bg-gray-200 h-2 rounded-full overflow-hidden">
        <div
          className="bg-emerald-600 h-full rounded-full transition-all duration-500"
          style={{ width: `${percent}%` }}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs pt-1">
        {items.map((item) => (
          <div key={item.key} className="flex items-center gap-2 text-slate-700">
            {item.isComplete ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            ) : (
              <Circle className="w-4 h-4 text-slate-300 shrink-0" />
            )}
            <span className={item.isComplete ? "font-semibold text-slate-900" : "text-slate-500"}>
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
