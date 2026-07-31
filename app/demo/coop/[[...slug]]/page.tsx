"use client";

import React, { use } from "react";
import DemoHeader from "@/components/demo/DemoHeader";
import { ApplicationContextProvider } from "@/lib/ApplicationContext";

import CoopDashboardPage from "@/app/coop/dashboard/page";
import CoopFarmersPage from "@/app/coop/farmers/page";
import CoopFarmsPage from "@/app/coop/farms/page";
import CoopCropCyclesPage from "@/app/coop/crop-cycles/page";
import CoopHarvestsPage from "@/app/coop/harvests/page";
import CoopAggregationPage from "@/app/coop/aggregation/page";
import CoopForecastsPage from "@/app/coop/forecasts/page";
import CoopInventoryPage from "@/app/coop/inventory/page";
import CoopListingsPage from "@/app/coop/listings/page";
import CoopOrdersPage from "@/app/coop/orders/page";
import CoopFulfillmentPage from "@/app/coop/fulfillment/page";
import CoopPaymentsPage from "@/app/coop/payments/page";
import CoopPayoutsPage from "@/app/coop/payouts/page";
import CoopPricingPage from "@/app/coop/pricing/page";
import CoopMessagesPage from "@/app/coop/messages/page";
import CoopReportsPage from "@/app/coop/reports/page";
import CoopUsersPage from "@/app/coop/users/page";
import CoopSettingsPage from "@/app/coop/settings/page";
import CoopProfilePage from "@/app/coop/profile/page";
import CoopAiPage from "@/app/coop/ai/page";

export default function DemoCoopCatchAllPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug || [];
  const subRoute = slug[0] || "dashboard";

  const renderSubPage = () => {
    switch (subRoute) {
      case "farmers":
        return <CoopFarmersPage />;
      case "farms":
        return <CoopFarmsPage />;
      case "crop-cycles":
        return <CoopCropCyclesPage />;
      case "harvests":
        return <CoopHarvestsPage />;
      case "aggregation":
        return <CoopAggregationPage />;
      case "forecasts":
        return <CoopForecastsPage />;
      case "inventory":
        return <CoopInventoryPage />;
      case "listings":
        return <CoopListingsPage />;
      case "orders":
        return <CoopOrdersPage />;
      case "fulfillment":
        return <CoopFulfillmentPage />;
      case "payments":
        return <CoopPaymentsPage />;
      case "payouts":
        return <CoopPayoutsPage />;
      case "pricing":
        return <CoopPricingPage />;
      case "messages":
        return <CoopMessagesPage />;
      case "reports":
        return <CoopReportsPage />;
      case "users":
        return <CoopUsersPage />;
      case "settings":
        return <CoopSettingsPage />;
      case "profile":
        return <CoopProfilePage />;
      case "ai":
        return <CoopAiPage />;
      case "dashboard":
      default:
        return <CoopDashboardPage />;
    }
  };

  return (
    <ApplicationContextProvider initialMode="demo" initialRole="coop">
      <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
        <DemoHeader roleName="Cooperative Manager (Full Production Workspace)" />
        <div className="flex-1">{renderSubPage()}</div>
      </div>
    </ApplicationContextProvider>
  );
}
