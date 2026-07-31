"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { seedProductionDatabase } from "@/lib/db";
import { seedDemoDatabase } from "@/lib/demoDb";
import { createClient as createSupabaseClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export type ApplicationMode = "production" | "demo";

export type WorkspaceRole =
  | "farmer"
  | "fisher"
  | "coop"
  | "buyer"
  | "processor"
  | "transport"
  | "government"
  | "finance"
  | "admin";

export interface WorkspaceContext {
  mode: ApplicationMode;
  role: WorkspaceRole;
  userId: string;
  organizationId?: string | null;
  tenantId: string;
  setMode: (mode: ApplicationMode) => void;
  setRole: (role: WorkspaceRole) => void;
}

const defaultContextValue: WorkspaceContext = {
  mode: "production",
  role: "farmer",
  userId: "prod-user-123",
  organizationId: "prod-org-456",
  tenantId: "prod-tenant-789",
  setMode: () => {},
  setRole: () => {},
};

const ApplicationContext = createContext<WorkspaceContext>(defaultContextValue);

export function ApplicationContextProvider({
  children,
  initialMode = "production",
  initialRole = "farmer",
  initialUserId,
  initialOrganizationId,
  seedLocalData = true,
}: {
  children: React.ReactNode;
  initialMode?: ApplicationMode;
  initialRole?: WorkspaceRole;
  initialUserId?: string;
  initialOrganizationId?: string | null;
  seedLocalData?: boolean;
}) {
  const [mode, setMode] = useState<ApplicationMode>(initialMode);
  const [role, setRole] = useState<WorkspaceRole>(initialRole);
  const [authenticatedUserId, setAuthenticatedUserId] = useState(
    initialUserId ?? "local-pending-user",
  );
  const [authenticatedOrganizationId, setAuthenticatedOrganizationId] =
    useState<string | null>(initialOrganizationId ?? null);

  useEffect(() => {
    if (mode === "demo") {
      void seedDemoDatabase();
      return;
    }

    if (seedLocalData) void seedProductionDatabase();
    if (!isSupabaseConfigured()) return;

    const supabase = createSupabaseClient();
    void supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) return;
      setAuthenticatedUserId(data.user.id);

      const { data: membership } = await supabase
        .from("organization_memberships")
        .select("organization_id")
        .eq("user_id", data.user.id)
        .eq("status", "ACTIVE")
        .limit(1)
        .maybeSingle();
      setAuthenticatedOrganizationId(membership?.organization_id ?? null);
    });
  }, [mode, seedLocalData]);

  const userId = mode === "demo" ? `demo-user-${role}` : authenticatedUserId;
  const tenantId = mode === "demo" ? `demo-tenant-${role}` : "prod-tenant-789";
  const organizationId =
    mode === "demo" ? `demo-org-${role}` : authenticatedOrganizationId;

  return (
    <ApplicationContext.Provider
      value={{
        mode,
        role,
        userId,
        organizationId,
        tenantId,
        setMode,
        setRole,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplicationContext() {
  return useContext(ApplicationContext);
}
