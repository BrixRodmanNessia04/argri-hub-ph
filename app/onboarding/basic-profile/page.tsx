"use client";

import React from "react";
import { ProducerWorkspaceProvider } from "@/lib/producerContext";
import ProducerOnboardingFlow from "@/components/onboarding/ProducerOnboardingFlow";

export default function OnboardingBasicProfilePage() {
  return (
    <ProducerWorkspaceProvider overrideMode="production">
      <ProducerOnboardingFlow initialStep={3} />
    </ProducerWorkspaceProvider>
  );
}
