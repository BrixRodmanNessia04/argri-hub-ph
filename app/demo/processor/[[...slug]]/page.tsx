"use client";

import React from "react";
import DemoHeader from "@/components/demo/DemoHeader";
import ProcessorDashboardPage from "@/app/processor/page";
import { ApplicationContextProvider } from "@/lib/ApplicationContext";

export default function DemoProcessorCatchAllPage() {
  return (
    <ApplicationContextProvider initialMode="demo" initialRole="processor">
      <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
        <DemoHeader roleName="Food Processor (Full Production Workspace)" />
        <div className="flex-1">
          <ProcessorDashboardPage />
        </div>
      </div>
    </ApplicationContextProvider>
  );
}
