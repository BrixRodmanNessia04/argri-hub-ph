"use client";

import { Suspense, use } from "react";
import BuyerSidebarNav from "@/components/BuyerSidebarNav";
import NegotiationWorkspace from "@/components/negotiations/NegotiationWorkspace";

export default function BuyerNegotiationsPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = use(params);
  return (
    <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex">
      <BuyerSidebarNav />
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 pb-24">
        <Suspense fallback={<div className="text-sm text-[#5f7469]">Loading negotiation workspace…</div>}>
          <NegotiationWorkspace actorRole="buyer" threadId={slug?.[0]} />
        </Suspense>
      </main>
    </div>
  );
}
