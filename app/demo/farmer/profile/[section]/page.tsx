"use client";

import React from "react";
import { useParams } from "next/navigation";
import RsbsaRegistrationWizard from "@/components/rsbsa/RsbsaRegistrationWizard";
import { ProducerWorkspaceProvider } from "@/lib/producerContext";

const sectionMap: Record<string, number> = {
  personal: 3,
  address: 4,
  rsbsa: 5,
  "farm-parcels": 7,
  memberships: 6,
  documents: 8,
  consent: 9,
  review: 10,
};

export default function DemoFarmerProfileSectionPage() {
  const params = useParams();
  const sectionSlug = (params?.section as string) || "rsbsa";
  const step = sectionMap[sectionSlug] || 3;

  return (
    <ProducerWorkspaceProvider overrideMode="demo" overrideRole="farmer">
      <RsbsaRegistrationWizard initialStep={step} />
    </ProducerWorkspaceProvider>
  );
}
