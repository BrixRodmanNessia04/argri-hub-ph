"use client";

// Selection memory for farmer form pre-filling

export interface FarmerSelectionMemory {
  lastFarmId?: string;
  lastPlotId?: string;
  lastCropCycleId?: string;
  lastStorageLocation?: string;
  lastExpenseCategory?: string;
  lastUnit?: string;
  lastBuyerName?: string;
}

const STORAGE_KEY = "agrihub_farmer_selection_memory";

export function getSelectionMemory(): FarmerSelectionMemory {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch (e) {
    console.error("Failed to read selection memory:", e);
    return {};
  }
}

export function saveSelectionMemory(partial: Partial<FarmerSelectionMemory>): void {
  if (typeof window === "undefined") return;
  try {
    const current = getSelectionMemory();
    const updated = { ...current, ...partial };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.error("Failed to save selection memory:", e);
  }
}
