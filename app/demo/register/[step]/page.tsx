"use client";

import React from "react";
import { useParams } from "next/navigation";
import RsbsaRegistrationWizard from "@/components/rsbsa/RsbsaRegistrationWizard";

const stepMap: Record<string, number> = {
  account: 1,
  livelihood: 2,
  "personal-information": 3,
  address: 4,
  identity: 5,
  memberships: 6,
  "production-profile": 7,
  documents: 8,
  consent: 9,
  review: 10,
  complete: 10,
};

export default function DemoRegisterStepPage() {
  const params = useParams();
  const stepSlug = (params?.step as string) || "account";
  const initialStep = stepMap[stepSlug] || 1;

  return <RsbsaRegistrationWizard initialStep={initialStep} />;
}
