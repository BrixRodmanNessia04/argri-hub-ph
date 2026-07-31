"use client";

import React from "react";
import DemoHeader from "@/components/demo/DemoHeader";
import GovDashboardPage from "@/app/gov/page";
import { ApplicationContextProvider } from "@/lib/ApplicationContext";

export default function DemoGovernmentCatchAllPage() {
  return (
    <ApplicationContextProvider initialMode="demo" initialRole="government">
      <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
        <DemoHeader roleName="Government LGU (Full Production Workspace)" />
        <div className="flex-1">
          <GovDashboardPage />
        </div>
      </div>
    </ApplicationContextProvider>
  );
}
