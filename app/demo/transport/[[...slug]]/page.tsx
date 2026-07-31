"use client";

import React from "react";
import DemoHeader from "@/components/demo/DemoHeader";
import LogisticsDashboardPage from "@/app/logistics/page";
import { ApplicationContextProvider } from "@/lib/ApplicationContext";

export default function DemoTransportCatchAllPage() {
  return (
    <ApplicationContextProvider initialMode="demo" initialRole="transport">
      <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
        <DemoHeader roleName="Fleet Logistics (Full Production Workspace)" />
        <div className="flex-1">
          <LogisticsDashboardPage />
        </div>
      </div>
    </ApplicationContextProvider>
  );
}
