"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";
import FarmerSubNav from "@/components/FarmerSubNav";
import { db } from "@/lib/db";
import {
  Settings,
  Globe,
  Sun,
  Wifi,
  Database,
  Trash2,
  CheckCircle2,
  AlertTriangle,
  LogOut,
  ShieldCheck,
  Smartphone,
} from "lucide-react";

export default function FarmerSettingsPage() {
  const router = useRouter();

  const [language, setLanguage] = useState("Tagalog");
  const [textSize, setTextSize] = useState("Normal");
  const [highContrast, setHighContrast] = useState(true);
  const [reduceAnimations, setReduceAnimations] = useState(false);
  const [autoSync, setAutoSync] = useState(true);
  const [wifiOnlyMedia, setWifiOnlyMedia] = useState(true);
  const [smsNotifs, setSmsNotifs] = useState(true);
  const [preferredUnit, setPreferredUnit] = useState("Kg");
  const [defaultLocation, setDefaultLocation] = useState("Main Storage Room - La Trinidad");

  const [feedback, setFeedback] = useState<string | null>(null);

  // Storage counts
  const farmsCount = useLiveQuery(() => db.farms.count(), []) || 0;
  const syncQueueCount = useLiveQuery(() => db.syncQueue.count(), []) || 0;
  const draftCount = useLiveQuery(() => db.formDrafts.count(), []) || 0;

  // Requirement 17: Safe Storage Cleanup (PROTECTS unsynced records, failed records, & drafts)
  const handleSafeCleanup = async () => {
    if (syncQueueCount > 0) {
      alert(`Safety protection active: You have ${syncQueueCount} pending items waiting for cloud sync. Complete cloud synchronization before cleaning storage.`);
      return;
    }

    if (confirm("Clear completed sync logs & cached reference data? Your unsynced records and active farm data will remain safe.")) {
      await db.cachedReferenceData.clear();
      await db.notifications.clear();
      setFeedback("Safely cleared synced cache & logs while keeping unsynced records protected!");
      setTimeout(() => setFeedback(null), 3500);
    }
  };

  const handleSignOut = async () => {
    if (confirm("Sign out of AgriHub PH local session? Unsynced records will remain safely stored on this device.")) {
      await db.localSession.clear();
      router.push("/");
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-28 font-sans">
      <FarmerSubNav />

      <main className="max-w-4xl mx-auto p-4 space-y-6 mt-2">
        <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm space-y-5">
          <div className="flex items-center gap-2 border-b border-gray-100 pb-3">
            <Settings className="w-6 h-6 text-emerald-600" />
            <div>
              <h1 className="text-xl font-extrabold text-slate-900">
                App Preferences &amp; Offline Storage Settings
              </h1>
              <p className="text-xs text-slate-500">
                Configure language, high-contrast display, sync rules, and local device storage.
              </p>
            </div>
          </div>

          {feedback && (
            <div className="p-3.5 rounded-xl bg-emerald-100 text-emerald-800 text-xs font-bold flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>{feedback}</span>
            </div>
          )}

          {/* 1. DISPLAY & LANGUAGE */}
          <div className="space-y-3">
            <h2 className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <Globe className="w-4 h-4" /> 1. Language &amp; Display (Wika at Appearance)
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-gray-200 space-y-2">
                <label className="block font-bold text-slate-800">Preferred Application Language</label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-gray-300 font-bold text-slate-900"
                >
                  <option value="Tagalog">Filipino / Tagalog</option>
                  <option value="English">English</option>
                  <option value="Ilocano">Ilocano</option>
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-gray-200 space-y-2">
                <label className="block font-bold text-slate-800">Text Size</label>
                <select
                  value={textSize}
                  onChange={(e) => setTextSize(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-white border border-gray-300 font-bold text-slate-900"
                >
                  <option value="Normal">Normal (Default)</option>
                  <option value="Large">Large (Pinadali Basahin)</option>
                  <option value="Extra Large">Extra Large</option>
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-gray-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">High-Contrast Outdoor Mode</span>
                  <span className="text-[11px] text-slate-500">Enhanced contrast for outdoor sunlight readability</span>
                </div>
                <input
                  type="checkbox"
                  checked={highContrast}
                  onChange={(e) => setHighContrast(e.target.checked)}
                  className="w-5 h-5 accent-emerald-600 rounded"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-gray-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Reduce Animations</span>
                  <span className="text-[11px] text-slate-500">Faster transitions on low-spec phones</span>
                </div>
                <input
                  type="checkbox"
                  checked={reduceAnimations}
                  onChange={(e) => setReduceAnimations(e.target.checked)}
                  className="w-5 h-5 accent-emerald-600 rounded"
                />
              </div>
            </div>
          </div>

          {/* 2. AUTOMATIC SYNC & NETWORK */}
          <div className="space-y-3 pt-3 border-t border-gray-100">
            <h2 className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <Wifi className="w-4 h-4" /> 2. Sync &amp; Data Connection
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-slate-50 border border-gray-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Auto-Sync When Online</span>
                  <span className="text-[11px] text-slate-500">Automatically push queued logs upon reconnection</span>
                </div>
                <input
                  type="checkbox"
                  checked={autoSync}
                  onChange={(e) => setAutoSync(e.target.checked)}
                  className="w-5 h-5 accent-emerald-600 rounded"
                />
              </div>

              <div className="p-4 rounded-2xl bg-slate-50 border border-gray-200 flex items-center justify-between">
                <div>
                  <span className="font-bold text-slate-900 block">Wi-Fi Only for Photos &amp; Media</span>
                  <span className="text-[11px] text-slate-500">Save mobile data when uploading harvest photos</span>
                </div>
                <input
                  type="checkbox"
                  checked={wifiOnlyMedia}
                  onChange={(e) => setWifiOnlyMedia(e.target.checked)}
                  className="w-5 h-5 accent-emerald-600 rounded"
                />
              </div>
            </div>
          </div>

          {/* 3. SAFE LOCAL STORAGE MANAGEMENT */}
          <div className="space-y-3 pt-3 border-t border-gray-100">
            <h2 className="text-xs font-extrabold text-emerald-800 uppercase tracking-wider flex items-center gap-1.5">
              <Database className="w-4 h-4" /> 3. Offline Local Storage Summary
            </h2>

            <div className="grid grid-cols-3 gap-3 text-xs text-center">
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200">
                <span className="text-slate-400 font-bold">Registered Farms</span>
                <p className="text-lg font-extrabold text-slate-900 mt-1">{farmsCount}</p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200">
                <span className="text-slate-400 font-bold">Pending Sync Items</span>
                <p className={`text-lg font-extrabold mt-1 ${syncQueueCount > 0 ? "text-amber-600" : "text-emerald-600"}`}>
                  {syncQueueCount}
                </p>
              </div>
              <div className="p-3.5 rounded-2xl bg-slate-50 border border-gray-200">
                <span className="text-slate-400 font-bold">Active Form Drafts</span>
                <p className="text-lg font-extrabold text-slate-900 mt-1">{draftCount}</p>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 space-y-2 text-xs">
              <div className="flex items-center gap-2 font-bold text-amber-900">
                <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                <span>Protected Storage Cleanup</span>
              </div>
              <p className="text-amber-800">
                Safe cleanup removes old synced cache files without deleting your active farms, un-synced offline logs, or draft records.
              </p>
              <button
                type="button"
                onClick={handleSafeCleanup}
                className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold inline-flex items-center gap-1.5 shadow-sm"
              >
                <Trash2 className="w-4 h-4" /> Clear Synced Cache Files
              </button>
            </div>
          </div>

          {/* SIGN OUT */}
          <div className="pt-3 border-t border-gray-100">
            <button
              onClick={handleSignOut}
              className="w-full py-3 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-700 font-bold text-xs flex items-center justify-center gap-2 border border-rose-200"
            >
              <LogOut className="w-4 h-4 text-rose-600" />
              <span>Sign Out of Local Session</span>
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
