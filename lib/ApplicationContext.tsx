"use client";

import React, { createContext, useContext, useState } from "react";
import { UserRole } from "@/types/roles";

export type ApplicationMode = "production" | "demo";

export interface ApplicationContextState {
  mode: ApplicationMode;
  demoRole?: UserRole | string;
  userId: string;
  tenantId?: string;
  organizationId?: string;
  setMode: (mode: ApplicationMode) => void;
  setDemoRole: (role: UserRole | string) => void;
}

const defaultContextValue: ApplicationContextState = {
  mode: "production",
  demoRole: undefined,
  userId: "user-default-123",
  tenantId: "tenant-default-456",
  organizationId: "org-default-789",
  setMode: () => {},
  setDemoRole: () => {},
};

const ApplicationContext = createContext<ApplicationContextState>(defaultContextValue);

export function ApplicationContextProvider({
  children,
  initialMode = "production",
  initialDemoRole,
}: {
  children: React.ReactNode;
  initialMode?: ApplicationMode;
  initialDemoRole?: UserRole | string;
}) {
  const [mode, setMode] = useState<ApplicationMode>(initialMode);
  const [demoRole, setDemoRole] = useState<UserRole | string | undefined>(initialDemoRole);

  const userId = mode === "demo" ? `demo-user-${demoRole || "guest"}` : "prod-user-123";
  const tenantId = mode === "demo" ? `demo-tenant-${demoRole || "guest"}` : "prod-tenant-456";
  const organizationId = mode === "demo" ? `demo-org-${demoRole || "guest"}` : "prod-org-789";

  return (
    <ApplicationContext.Provider
      value={{
        mode,
        demoRole,
        userId,
        tenantId,
        organizationId,
        setMode,
        setDemoRole,
      }}
    >
      {children}
    </ApplicationContext.Provider>
  );
}

export function useApplicationContext() {
  return useContext(ApplicationContext);
}
