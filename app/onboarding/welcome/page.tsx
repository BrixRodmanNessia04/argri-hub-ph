"use client";

import React from "react";
import { ProducerWorkspaceProvider } from "@/lib/producerContext";
import ProducerOnboardingFlow from "@/components/onboarding/ProducerOnboardingFlow";

export default function OnboardingWelcomePage() {
  return (
    <ProducerWorkspaceProvider overrideMode="production">
      <ProducerOnboardingFlow initialStep={1} />
    </ProducerWorkspaceProvider>
  );
}
