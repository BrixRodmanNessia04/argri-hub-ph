"use client";

import React, { useState } from "react";
import { ReferenceDataRepository } from "@/lib/reference-data/repository";
import { ApplicationMode } from "@/lib/ApplicationContext";
import { Search, Check, Fish } from "lucide-react";

interface SpeciesSelectorProps {
  selectedSpecies: string;
  onSelect: (speciesName: string) => void;
  mode?: ApplicationMode;
}

export default function SpeciesSelector({
  selectedSpecies,
  onSelect,
  mode = "production",
}: SpeciesSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const items = ReferenceDataRepository.getCommodities(searchQuery, "fisheries", mode);
  const popularItems = items.filter((i) => i.isPopular);

  return (
    <div className="space-y-3 bg-white border border-[#dce9df] rounded-2xl p-4 shadow-xs">
      <div className="flex items-center gap-2 text-xs font-extrabold text-[#0284c7] uppercase tracking-wider">
        <Fish className="w-4 h-4" />
        <span>Main Fisheries Species / Aquatic Product</span>
      </div>

      {popularItems.length > 0 && !searchQuery && (
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-[#0369a1]">Popular Fisheries Species:</span>
          <div className="flex flex-wrap gap-2">
            {popularItems.slice(0, 8).map((item) => {
              const isSelected = selectedSpecies.toLowerCase() === item.name.toLowerCase() || selectedSpecies.toLowerCase() === item.localName?.toLowerCase();
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => onSelect(item.name)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? "bg-[#0284c7] text-white border-[#0284c7] shadow-xs"
                      : "bg-sky-50 text-[#0369a1] border-sky-200 hover:bg-sky-100"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3" />}
                  <span>{item.name}</span>
                  {item.localName && <span className="opacity-80 text-[10px]">({item.localName})</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      <div className="relative">
        <Search className="w-4 h-4 text-[#0369a1] absolute left-3 top-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search species (e.g. Tilapia, Milkfish/Bangus, Yellowfin Tuna, Mudcrab)..."
          className="w-full bg-[#f8fafc] border border-sky-200 rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm font-medium text-slate-800 focus:outline-none focus:ring-2 focus:ring-[#0284c7]"
        />
      </div>

      <div className="max-h-44 overflow-y-auto divide-y divide-sky-100 rounded-xl border border-sky-200">
        {items.length > 0 ? (
          items.map((item) => {
            const isSelected = selectedSpecies.toLowerCase() === item.name.toLowerCase();
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => onSelect(item.name)}
                className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors ${
                  isSelected ? "bg-sky-100 text-[#0284c7]" : "hover:bg-sky-50 text-slate-800"
                }`}
              >
                <div>
                  <span>{item.name}</span>
                  {item.localName && <span className="text-slate-500 font-normal ml-1.5">({item.localName})</span>}
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#0284c7]" />}
              </button>
            );
          })
        ) : (
          <div className="p-4 text-center text-xs text-slate-500">
            No matching species found. You can type a custom species name above.
          </div>
        )}
      </div>
    </div>
  );
}
