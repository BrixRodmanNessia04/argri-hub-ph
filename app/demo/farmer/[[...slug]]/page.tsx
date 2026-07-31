"use client";

import React, { use } from "react";
import DemoHeader from "@/components/demo/DemoHeader";
import { ApplicationContextProvider } from "@/lib/ApplicationContext";

import FarmerPwaMainPage from "@/app/farmer/page";
import FarmerFarmsPage from "@/app/farmer/farms/page";
import FarmerPlotsPage from "@/app/farmer/plots/page";
import FarmerCropsPage from "@/app/farmer/crops/page";
import FarmerActivitiesPage from "@/app/farmer/activities/page";
import FarmerHarvestsPage from "@/app/farmer/harvests/page";
import FarmerSalesPage from "@/app/farmer/sales/page";
import FarmerExpensesPage from "@/app/farmer/expenses/page";
import FarmerInventoryPage from "@/app/farmer/inventory/page";
import FarmerWarehousePage from "@/app/farmer/warehouse/page";
import FarmerLedgerPage from "@/app/farmer/ledger/page";
import FarmerLaborPage from "@/app/farmer/labor/page";
import FarmerEquipmentPage from "@/app/farmer/equipment/page";
import FarmerLogsPage from "@/app/farmer/logs/page";
import FarmerPestsDiseasesPage from "@/app/farmer/pests-diseases/page";
import FarmerTasksPage from "@/app/farmer/tasks/page";
import FarmerCalendarPage from "@/app/farmer/calendar/page";
import FarmerQuickCapturePage from "@/app/farmer/quick-capture/page";
import FarmerSyncPage from "@/app/farmer/sync/page";
import FarmerSettingsPage from "@/app/farmer/settings/page";
import FarmerHelpPage from "@/app/farmer/help/page";
import FarmerProfilePage from "@/app/farmer/profile/page";
import FarmerReportsPage from "@/app/farmer/reports/page";
import FarmerWeatherPage from "@/app/farmer/weather/page";

export default function DemoFarmerCatchAllPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug || [];
  const subRoute = slug[0] || "dashboard";

  const renderSubPage = () => {
    switch (subRoute) {
      case "farms":
        return <FarmerFarmsPage />;
      case "plots":
        return <FarmerPlotsPage />;
      case "crops":
        return <FarmerCropsPage />;
      case "activities":
        return <FarmerActivitiesPage />;
      case "harvests":
        return <FarmerHarvestsPage />;
      case "sales":
        return <FarmerSalesPage />;
      case "expenses":
        return <FarmerExpensesPage />;
      case "inventory":
        return <FarmerInventoryPage />;
      case "warehouse":
        return <FarmerWarehousePage />;
      case "ledger":
        return <FarmerLedgerPage />;
      case "labor":
        return <FarmerLaborPage />;
      case "equipment":
        return <FarmerEquipmentPage />;
      case "logs":
        return <FarmerLogsPage />;
      case "pests-diseases":
        return <FarmerPestsDiseasesPage />;
      case "tasks":
        return <FarmerTasksPage />;
      case "calendar":
        return <FarmerCalendarPage />;
      case "quick-capture":
        return <FarmerQuickCapturePage />;
      case "sync":
        return <FarmerSyncPage />;
      case "settings":
        return <FarmerSettingsPage />;
      case "help":
        return <FarmerHelpPage />;
      case "profile":
        return <FarmerProfilePage />;
      case "reports":
        return <FarmerReportsPage />;
      case "weather":
        return <FarmerWeatherPage />;
      case "dashboard":
      default:
        return <FarmerPwaMainPage />;
    }
  };

  return (
    <ApplicationContextProvider initialMode="demo" initialRole="farmer">
      <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
        <DemoHeader roleName="Farmer PWA (Full Production Workspace)" />
        <div className="flex-1">{renderSubPage()}</div>
      </div>
    </ApplicationContextProvider>
  );
}
