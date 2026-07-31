"use client";

import React from "react";
import DemoHeader from "@/components/demo/DemoHeader";
import FinanceDashboardPage from "@/app/finance/page";
import { ApplicationContextProvider } from "@/lib/ApplicationContext";

export default function DemoFinanceCatchAllPage() {
  return (
    <ApplicationContextProvider initialMode="demo" initialRole="finance">
      <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
        <DemoHeader roleName="Agri-Credit &amp; Finance (Full Production Workspace)" />
        <div className="flex-1">
          <FinanceDashboardPage />
        </div>
      </div>
    </ApplicationContextProvider>
  );
}
