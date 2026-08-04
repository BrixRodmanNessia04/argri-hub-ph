"use client";

import React from "react";
import Step9Consent from "./Step9Consent";

export interface ConsentData {
  printedName: string;
  privacyPolicyAcknowledged: boolean;
  daDisclaimerAcknowledged: boolean;
}

interface ConsentStepProps {
  data: ConsentData;
  onChange: (updated: Partial<ConsentData>) => void;
}

export default function ConsentStep({ data, onChange }: ConsentStepProps) {
  return (
    <Step9Consent
      printedName={data.printedName}
      privacyPolicyAcknowledged={data.privacyPolicyAcknowledged}
      daDisclaimerAcknowledged={data.daDisclaimerAcknowledged}
      onChange={onChange}
    />
  );
}
