"use client";

import React from "react";
import { Building2, Plus, Trash2 } from "lucide-react";

interface Step6MembershipsProps {
  memberships: string[];
  onChange: (memberships: string[]) => void;
}

export default function Step6Memberships({
  memberships = [],
  onChange,
}: Step6MembershipsProps) {
  const handleAdd = () => {
    if (memberships.length < 3) {
      onChange([...memberships, ""]);
    }
  };

  const handleUpdate = (index: number, val: string) => {
    const updated = [...memberships];
    updated[index] = val;
    onChange(updated);
  };

  const handleRemove = (index: number) => {
    const updated = memberships.filter((_, i) => i !== index);
    onChange(updated);
  };

  return (
    <div className="space-y-4">
      <div className="text-center space-y-1">
        <h2 className="text-base sm:text-lg font-extrabold text-[#163025]">
          Farmers / Fisherfolk Organization & Cooperative Memberships
        </h2>
        <p className="text-xs text-[#52796f]">
          List up to 3 Farmers/Fisherfolk Associations (FCA), Irrigators Associations (IA), or Cooperatives.
        </p>
      </div>

      <div className="bg-white border border-[#dce9df] rounded-2xl p-4 space-y-3 shadow-xs">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-xs font-extrabold text-[#059669] uppercase tracking-wider">
            <Building2 className="w-4 h-4 text-[#059669]" />
            <span>FCA / IA / Cooperative Names</span>
          </div>
          {memberships.length < 3 && (
            <button
              type="button"
              onClick={handleAdd}
              className="px-3 py-1 rounded-xl bg-[#e6f4ea] text-[#059669] text-xs font-extrabold hover:bg-[#bce3c6] transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Organization</span>
            </button>
          )}
        </div>

        {memberships.length === 0 && (
          <div className="p-4 text-center text-xs text-gray-500 bg-[#f9fbf9] border border-dashed border-[#dce9df] rounded-xl">
            No organization memberships added yet. Click &quot;Add Organization&quot; above to add your coop or association name.
          </div>
        )}

        {memberships.map((name, idx) => (
          <div key={idx} className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#e6f4ea] text-[#059669] font-extrabold text-xs flex items-center justify-center shrink-0">
              {idx + 1}
            </span>
            <input
              type="text"
              value={name}
              onChange={(e) => handleUpdate(idx, e.target.value)}
              placeholder="e.g. Benguet Farmers Agriculture Cooperative"
              className="flex-1 bg-[#f9fbf9] border border-[#dce9df] rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            />
            <button
              type="button"
              onClick={() => handleRemove(idx)}
              className="p-2 text-red-500 hover:bg-red-50 rounded-xl transition-colors"
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
