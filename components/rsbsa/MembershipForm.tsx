"use client";

import React from "react";
import Step6Memberships from "./Step6Memberships";

interface MembershipFormProps {
  memberships: string[];
  onChange: (memberships: string[]) => void;
}

export default function MembershipForm({
  memberships,
  onChange,
}: MembershipFormProps) {
  return <Step6Memberships memberships={memberships} onChange={onChange} />;
}
