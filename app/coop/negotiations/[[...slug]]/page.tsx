"use client";

import { Suspense, use } from "react";
import CoopLayout from "@/components/CoopLayout";
import NegotiationWorkspace from "@/components/negotiations/NegotiationWorkspace";

export default function CoopNegotiationsPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const { slug } = use(params);
  return (
    <CoopLayout>
      <Suspense fallback={<div className="text-sm text-[#5f7469]">Loading negotiation workspace…</div>}>
        <NegotiationWorkspace actorRole="coop" threadId={slug?.[0]} />
      </Suspense>
    </CoopLayout>
  );
}
