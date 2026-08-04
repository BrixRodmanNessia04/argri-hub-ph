"use client";

import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useLiveQuery } from "dexie-react-hooks";
import { demoDb } from "@/lib/demoDb";
import ProfileHeader from "@/components/profile/ProfileHeader";
import ProfileCompletionChecklist from "@/components/profile/ProfileCompletionChecklist";
import { ProducerWorkspaceProvider, useProducerWorkspace } from "@/lib/producerContext";
import DemoBanner from "@/components/demo/DemoBanner";
import {
  Waves,
  Edit,
  ShieldCheck,
  Building2,
  ChevronRight,
  Fish,
  Anchor,
} from "lucide-react";

function DemoFisherProfileContent() {
  const router = useRouter();
  const { buildPath, userId } = useProducerWorkspace();

  const profile = useLiveQuery(() => demoDb.demoRsbsaProfiles.filter((p) => p.userId === userId).first(), [userId]) || null;
  const trips = useLiveQuery(() => demoDb.demoFishingTrips.toArray(), []) || [];

  const fisherName = profile ? `${profile.firstName} ${profile.surname}` : "Pedro Penduko";
  const fisherPhone = profile?.mobileNumber || "0918-987-6543";
  const location = profile
    ? `${profile.barangay}, ${profile.cityMunicipality}, ${profile.province}`
    : "Luciente 1st, Bolinao, Pangasinan";

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 pb-28 font-sans">
      <DemoBanner roleName="Fisherfolk" />

      <main className="max-w-4xl mx-auto p-4 space-y-6 mt-2">
        <ProfileHeader
          name={fisherName}
          roleTitle="FISHERFOLK DEMO PROFILE (ISOLATED FICTIONAL DATA)"
          idBadge="DEMO-FISH-002"
          isVerified={true}
          isOnline={true}
          pendingSyncCount={0}
        />

        <ProfileCompletionChecklist percentage={profile?.profileCompletionPercentage || 100} role="fisher" />

        <div className="bg-white border border-gray-200 rounded-3xl p-5 shadow-xs space-y-3">
          <h2 className="text-sm font-extrabold text-slate-900">
            Demo Fisherfolk Profile &amp; Actions
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
            <Link
              href={buildPath("/demo/fisher/profile/personal")}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-gray-200 text-slate-800 font-bold flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Edit className="w-4 h-4 text-[#0284c7]" />
                <span>Edit Personal Info</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>

            <Link
              href={buildPath("/demo/fisher/profile/farm-parcels")}
              className="p-3.5 rounded-2xl bg-slate-50 hover:bg-sky-50 border border-gray-200 text-slate-800 font-bold flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Fish className="w-4 h-4 text-[#0284c7]" />
                <span>Edit Fisheries &amp; Species</span>
              </div>
              <ChevronRight className="w-4 h-4 text-gray-400" />
            </Link>

            <Link
              href={buildPath("/demo/fisher/trips")}
              className="p-3.5 rounded-2xl bg-sky-50 hover:bg-sky-100 border border-sky-200 text-sky-900 font-bold flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5">
                <Anchor className="w-4 h-4 text-[#0284c7]" />
                <span>Demo Fishing Trips ({trips.length})</span>
              </div>
              <ChevronRight className="w-4 h-4 text-sky-400" />
            </Link>

            <Link
              href={buildPath("/demo/onboarding/welcome")}
              className="p-3.5 rounded-2xl bg-amber-50 hover:bg-amber-100 border border-amber-200 text-amber-900 font-bold flex items-center justify-between transition-all"
            >
              <div className="flex items-center gap-2.5">
                <ShieldCheck className="w-4 h-4 text-amber-600" />
                <span>Restart Fisher Demo Onboarding</span>
              </div>
              <ChevronRight className="w-4 h-4 text-amber-400" />
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}

export default function DemoFisherProfilePage() {
  return (
    <ProducerWorkspaceProvider overrideMode="demo" overrideRole="fisher">
      <DemoFisherProfileContent />
    </ProducerWorkspaceProvider>
  );
}
