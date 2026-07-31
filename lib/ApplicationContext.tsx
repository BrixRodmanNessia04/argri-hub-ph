"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { seedProductionDatabase } from "@/lib/db";
import { seedDemoDatabase } from "@/lib/demoDb";

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
}: {
  children: React.ReactNode;
  initialMode?: ApplicationMode;
  initialRole?: WorkspaceRole;
}) {
  const [mode, setMode] = useState<ApplicationMode>(initialMode);
  const [role, setRole] = useState<WorkspaceRole>(initialRole);

  useEffect(() => {
    seedProductionDatabase();
    seedDemoDatabase();
  }, []);

  const userId = mode === "demo" ? `demo-user-${role}` : "prod-user-123";
  const tenantId = mode === "demo" ? `demo-tenant-${role}` : "prod-tenant-789";
  const organizationId = mode === "demo" ? `demo-org-${role}` : "prod-org-456";

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
