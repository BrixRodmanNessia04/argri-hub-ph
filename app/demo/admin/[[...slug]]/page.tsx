"use client";

import React, { use } from "react";
import DemoHeader from "@/components/demo/DemoHeader";
import { ApplicationContextProvider } from "@/lib/ApplicationContext";

import AdminDashboardPage from "@/app/admin/page";
import AdminCooperativesPage from "@/app/admin/cooperatives/page";
import AdminBuyersPage from "@/app/admin/buyers/page";
import AdminUsersPage from "@/app/admin/users/page";
import AdminListingsPage from "@/app/admin/listings/page";
import AdminOrdersPage from "@/app/admin/orders/page";
import AdminPaymentsPage from "@/app/admin/payments/page";
import AdminSmsPage from "@/app/admin/sms/page";
import AdminSyncErrorsPage from "@/app/admin/sync-errors/page";
import AdminAuditLogsPage from "@/app/admin/audit-logs/page";
import AdminTaxonomyPage from "@/app/admin/taxonomy/page";
import AdminReportsPage from "@/app/admin/reports/page";
import AdminSettingsPage from "@/app/admin/settings/page";

export default function DemoAdminCatchAllPage({
  params,
}: {
  params: Promise<{ slug?: string[] }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug || [];
  const subRoute = slug[0] || "dashboard";

  const renderSubPage = () => {
    switch (subRoute) {
      case "cooperatives":
        return <AdminCooperativesPage />;
      case "buyers":
        return <AdminBuyersPage />;
      case "users":
        return <AdminUsersPage />;
      case "listings":
        return <AdminListingsPage />;
      case "orders":
        return <AdminOrdersPage />;
      case "payments":
        return <AdminPaymentsPage />;
      case "sms":
        return <AdminSmsPage />;
      case "sync-errors":
        return <AdminSyncErrorsPage />;
      case "audit-logs":
        return <AdminAuditLogsPage />;
      case "taxonomy":
        return <AdminTaxonomyPage />;
      case "reports":
        return <AdminReportsPage />;
      case "settings":
        return <AdminSettingsPage />;
      case "dashboard":
      default:
        return <AdminDashboardPage />;
    }
  };

  return (
    <ApplicationContextProvider initialMode="demo" initialRole="admin">
      <div className="min-h-screen bg-[#f6fbf7] text-[#163025] flex flex-col font-sans">
        <DemoHeader roleName="Platform Admin (Full Production Workspace)" />
        <div className="flex-1">{renderSubPage()}</div>
      </div>
    </ApplicationContextProvider>
  );
}
