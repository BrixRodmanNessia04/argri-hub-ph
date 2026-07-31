"use client";

import React, { useState } from "react";
import Link from "next/link";
import CoopLayout from "@/components/CoopLayout";
import { PauseCircle, PlayCircle, CheckCircle2, Handshake } from "lucide-react";
import { useAppRoute } from "@/lib/navigation";

export default function CoopListingsPage() {
  const buildRoute = useAppRoute();
  const [listings, setListings] = useState([
    { id: "list-1", crop: "Benguet Highland Cabbage", grade: "Class A", weightKg: 500, pricePerKg: 40.0, reservedKg: 100, inquiriesCount: 3, status: "ACTIVE_STOCK" },
    { id: "list-2", crop: "Atok Sweet Carrots", grade: "Class A", weightKg: 350, pricePerKg: 55.0, reservedKg: 50, inquiriesCount: 2, status: "ACTIVE_STOCK" },
    { id: "list-3", crop: "Baguio Vine Tomatoes", grade: "Class B", weightKg: 620, pricePerKg: 60.0, reservedKg: 0, inquiriesCount: 5, status: "PAUSED" },
  ]);

  const [feedback, setFeedback] = useState<string | null>(null);

  const togglePause = (id: string) => {
    setListings((prev) =>
      prev.map((l) => (l.id === id ? { ...l, status: l.status === "PAUSED" ? "ACTIVE_STOCK" : "PAUSED" } : l))
    );
    setFeedback("Listing status updated.");
    setTimeout(() => setFeedback(null), 3000);
  };

  return (
    <CoopLayout>
      <div className="space-y-6">
        <div>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-500/15 text-blue-300 border border-blue-500/30">
            WHOLESALE MARKETPLACE LISTINGS
          </span>
          <h1 className="text-xl sm:text-2xl font-extrabold text-[#163025] tracking-tight mt-1">
            Published B2B Produce Listings ({listings.length})
          </h1>
          <p className="text-xs sm:text-sm text-slate-400 mt-0.5">
            Bulk listings published for wholesale B2B buyers in Metro Manila.
          </p>
        </div>

        {feedback && (
          <div className="p-3.5 rounded-xl bg-emerald-500/15 border border-emerald-500/30 text-emerald-200 text-xs font-bold flex items-center gap-2 shadow-lg">
            <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>{feedback}</span>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {listings.map((item) => {
            const isPaused = item.status === "PAUSED";
            return (
              <div key={item.id} className="bg-slate-900 border border-slate-800 rounded-3xl p-5 shadow-xl space-y-3 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[10px] ${
                        isPaused
                          ? "bg-amber-950 text-amber-400 border border-amber-800"
                          : "bg-emerald-950 text-emerald-400 border border-emerald-800"
                      }`}
                    >
                      {item.status}
                    </span>
                    <span className="text-[11px] text-teal-400 font-bold">{item.grade}</span>
                  </div>

                  <h2 className="text-base font-extrabold text-white mt-2">{item.crop}</h2>

                  <div className="grid grid-cols-2 gap-2 mt-3 pt-3 border-t border-slate-800/60 text-xs">
                    <div>
                      <span className="text-slate-400 text-[11px]">Available Volume</span>
                      <p className="font-extrabold text-white text-sm">{item.weightKg} kg</p>
                    </div>
                    <div className="text-right">
                      <span className="text-slate-400 text-[11px]">Wholesale Price</span>
                      <p className="font-extrabold text-emerald-400 text-sm">₱{item.pricePerKg.toFixed(2)}/kg</p>
                    </div>
                  </div>

                  <div className="mt-2 text-xs text-slate-400 font-semibold flex items-center justify-between">
                    <span>Reserved: {item.reservedKg} kg</span>
                    <span className="text-teal-400">{item.inquiriesCount} Buyer Inquiries</span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-end gap-2 text-xs font-bold">
                  <Link
                    href={buildRoute(`/coop/negotiations?listingId=${item.id}`)}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center gap-1"
                  >
                    <Handshake className="w-3.5 h-3.5" />
                    Negotiations
                  </Link>
                  <button
                    onClick={() => togglePause(item.id)}
                    className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 flex items-center gap-1"
                  >
                    {isPaused ? <PlayCircle className="w-3.5 h-3.5 text-emerald-400" /> : <PauseCircle className="w-3.5 h-3.5 text-amber-400" />}
                    <span>{isPaused ? "Resume" : "Pause"}</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </CoopLayout>
  );
}
