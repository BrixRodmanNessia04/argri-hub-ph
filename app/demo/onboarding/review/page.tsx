"use client";

import React from "react";
import { ProducerWorkspaceProvider } from "@/lib/producerContext";
import ProducerOnboardingFlow from "@/components/onboarding/ProducerOnboardingFlow";

export default function DemoOnboardingReviewPage() {
  return (
    <ProducerWorkspaceProvider overrideMode="demo">
      <ProducerOnboardingFlow initialStep={6} />
    </ProducerWorkspaceProvider>
  );
}
