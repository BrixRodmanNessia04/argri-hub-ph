"use client";

import React from "react";
import DemoHeader from "@/components/demo/DemoHeader";
import FishingOperationsPage from "@/app/producer/fishing/page";
import { ApplicationContextProvider } from "@/lib/ApplicationContext";

export default function DemoFisherCatchAllPage() {
  return (
    <ApplicationContextProvider initialMode="demo" initialRole="fisher">
      <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
        <DemoHeader roleName="Capture Fisheries (Full Production Workspace)" />
        <div className="flex-1">
          <FishingOperationsPage />
        </div>
      </div>
    </ApplicationContextProvider>
  );
}
