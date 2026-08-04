"use client";

import React, { useState } from "react";
import { ReferenceDataRepository } from "@/lib/reference-data/repository";
import { CommodityItemRef } from "@/lib/reference-data/types";
import { ApplicationMode } from "@/lib/ApplicationContext";
import { Search, Check, Sprout, Fish } from "lucide-react";

interface CommoditySelectorProps {
  selectedCommodity: string;
  onSelect: (commodityName: string) => void;
  sector?: "crop" | "fisheries" | "all";
  mode?: ApplicationMode;
}

export default function CommoditySelector({
  selectedCommodity,
  onSelect,
  sector = "all",
  mode = "production",
}: CommoditySelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const items = ReferenceDataRepository.getCommodities(searchQuery, sector, mode);
  const popularItems = items.filter((i) => i.isPopular);

  return (
    <div className="space-y-3 bg-white border border-[#dce9df] rounded-2xl p-4 shadow-xs">
      <div className="flex items-center gap-2 text-xs font-extrabold text-[#059669] uppercase tracking-wider">
        {sector === "fisheries" ? <Fish className="w-4 h-4" /> : <Sprout className="w-4 h-4" />}
        <span>{sector === "fisheries" ? "Main Fisheries Species" : "Main Agricultural Commodity"}</span>
      </div>

      {/* Popular Quick Picks */}
      {popularItems.length > 0 && !searchQuery && (
        <div className="space-y-1.5">
          <span className="text-[11px] font-bold text-[#52796f]">Popular Selections:</span>
          <div className="flex flex-wrap gap-2">
            {popularItems.slice(0, 8).map((item) => {
              const isSelected = selectedCommodity.toLowerCase() === item.name.toLowerCase() || selectedCommodity.toLowerCase() === item.localName?.toLowerCase();
              return (
                <button
                  key={item.code}
                  type="button"
                  onClick={() => onSelect(item.name)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all flex items-center gap-1.5 border ${
                    isSelected
                      ? "bg-[#059669] text-white border-[#059669] shadow-xs"
                      : "bg-[#f4f9f5] text-[#163025] border-[#dce9df] hover:bg-[#e6f4ea]"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3" />}
                  <span>{item.name}</span>
                  {item.localName && <span className="opacity-75 text-[10px]">({item.localName})</span>}
                </button>
              );
            })}
          </div>
        </div>
      )}

      {/* Search Input */}
      <div className="relative">
        <Search className="w-4 h-4 text-[#52796f] absolute left-3 top-3" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder={sector === "fisheries" ? "Search species (e.g. Tilapia, Bangus, Tuna)..." : "Search commodity (e.g. Cabbage, Rice, Corn, Tomato)..."}
          className="w-full bg-[#f9fbf9] border border-[#dce9df] rounded-xl pl-9 pr-3 py-2.5 text-xs sm:text-sm font-medium text-[#163025] focus:outline-none focus:ring-2 focus:ring-[#059669]"
        />
      </div>

      {/* Search Results List */}
      <div className="max-h-44 overflow-y-auto divide-y divide-[#edf4ee] rounded-xl border border-[#dce9df]">
        {items.length > 0 ? (
          items.map((item) => {
            const isSelected = selectedCommodity.toLowerCase() === item.name.toLowerCase();
            return (
              <button
                key={item.code}
                type="button"
                onClick={() => onSelect(item.name)}
                className={`w-full text-left px-3.5 py-2 text-xs sm:text-sm font-semibold flex items-center justify-between transition-colors ${
                  isSelected ? "bg-[#e6f4ea] text-[#059669]" : "hover:bg-[#f4f9f5] text-[#163025]"
                }`}
              >
                <div>
                  <span>{item.name}</span>
                  {item.localName && <span className="text-gray-500 font-normal ml-1.5">({item.localName})</span>}
                </div>
                {isSelected && <Check className="w-4 h-4 text-[#059669]" />}
              </button>
            );
          })
        ) : (
          <div className="p-4 text-center text-xs text-gray-500">
            No matching items found. You can type a custom commodity name above.
          </div>
        )}
      </div>
    </div>
  );
}
