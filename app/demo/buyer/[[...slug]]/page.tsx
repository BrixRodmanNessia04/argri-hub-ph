"use client";

import React, { use } from "react";
import DemoHeader from "@/components/demo/DemoHeader";
import { ApplicationContextProvider } from "@/lib/ApplicationContext";

import BuyerMarketPage from "@/app/market/page";
import BuyerCartPage from "@/app/market/cart/page";
import BuyerCheckoutPage from "@/app/market/checkout/page";
import BuyerProductPage from "@/app/market/products/[id]/page";
import BuyerDashboardPage from "@/app/buyer/dashboard/page";
import BuyerOrdersPage from "@/app/buyer/orders/page";
import BuyerInvoicesPage from "@/app/buyer/invoices/page";
import BuyerSuppliersPage from "@/app/buyer/suppliers/page";
import BuyerSavedPage from "@/app/buyer/saved/page";
import BuyerProfilePage from "@/app/buyer/profile/page";
import BuyerSettingsPage from "@/app/buyer/settings/page";
import BuyerNegotiationsPage from "@/app/buyer/negotiations/[[...slug]]/page";

export default function DemoBuyerCatchAllPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug || [];
  const subRoute = slug[0] || "market";

  const renderSubPage = () => {
    switch (subRoute) {
      case "dashboard":
        return <BuyerDashboardPage />;
      case "orders":
        return <BuyerOrdersPage />;
      case "negotiations":
        return <BuyerNegotiationsPage params={Promise.resolve({ slug: slug.slice(1) })} />;
      case "invoices":
        return <BuyerInvoicesPage />;
      case "suppliers":
        return <BuyerSuppliersPage />;
      case "saved":
        return <BuyerSavedPage />;
      case "profile":
        return <BuyerProfilePage />;
      case "settings":
        return <BuyerSettingsPage />;
      case "market":
        if (slug[1] === "cart") return <BuyerCartPage />;
        if (slug[1] === "checkout") return <BuyerCheckoutPage />;
        if (slug[1] === "products" && slug[2]) {
          return <BuyerProductPage params={Promise.resolve({ id: slug[2] })} />;
        }
        return <BuyerMarketPage />;
      default:
        return <BuyerMarketPage />;
    }
  };

  return (
    <ApplicationContextProvider initialMode="demo" initialRole="buyer">
      <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
        <DemoHeader roleName="B2B Commercial Buyer (Full Production Workspace)" />
        <div className="flex-1">{renderSubPage()}</div>
      </div>
    </ApplicationContextProvider>
  );
}
