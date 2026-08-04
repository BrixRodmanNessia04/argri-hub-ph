"use client";

import React, { createContext, useContext } from "react";
import { useApplicationContext, ApplicationMode } from "./ApplicationContext";
import { useAppRoute } from "./navigation";

export type ProducerRole = "farmer" | "fisher";

export interface ProducerWorkspaceContext {
  mode: ApplicationMode;
  role: ProducerRole;
  userId: string;
  tenantId: string;
  buildPath: (relativePath: string) => string;
}

const ProducerContext = createContext<ProducerWorkspaceContext | null>(null);

export function ProducerWorkspaceProvider({
  children,
  overrideRole,
  overrideMode,
  overrideUserId,
  overrideTenantId,
}: {
  children: React.ReactNode;
  overrideRole?: ProducerRole;
  overrideMode?: ApplicationMode;
  overrideUserId?: string;
  overrideTenantId?: string;
}) {
  const appCtx = useApplicationContext();
  const buildRoute = useAppRoute();

  const mode = overrideMode || appCtx.mode || "production";
  const role: ProducerRole = overrideRole || (appCtx.role === "fisher" ? "fisher" : "farmer");
  const userId = overrideUserId || appCtx.userId || (mode === "demo" ? `demo-user-${role}` : "prod-user-123");
  const tenantId = overrideTenantId || appCtx.tenantId || (mode === "demo" ? `demo-tenant-${role}` : "prod-tenant-789");

  const buildPath = (relativePath: string): string => {
    let cleanPath = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;
    if (mode === "demo" && !cleanPath.startsWith("/demo")) {
      cleanPath = `/demo${cleanPath}`;
    }
    return buildRoute(cleanPath);
  };

  const value: ProducerWorkspaceContext = {
    mode,
    role,
    userId,
    tenantId,
    buildPath,
  };

  return <ProducerContext.Provider value={value}>{children}</ProducerContext.Provider>;
}

export function useProducerWorkspace(): ProducerWorkspaceContext {
  const ctx = useContext(ProducerContext);
  const appCtx = useApplicationContext();
  const buildRoute = useAppRoute();

  if (ctx) {
    return ctx;
  }

  // Fallback if not wrapped in ProducerWorkspaceProvider
  const mode = appCtx.mode || "production";
  const role: ProducerRole = appCtx.role === "fisher" ? "fisher" : "farmer";
  const userId = appCtx.userId || (mode === "demo" ? `demo-user-${role}` : "prod-user-123");
  const tenantId = appCtx.tenantId || (mode === "demo" ? `demo-tenant-${role}` : "prod-tenant-789");

  return {
    mode,
    role,
    userId,
    tenantId,
    buildPath: (relativePath: string) => {
      let cleanPath = relativePath.startsWith("/") ? relativePath : `/${relativePath}`;
      if (mode === "demo" && !cleanPath.startsWith("/demo")) {
        cleanPath = `/demo${cleanPath}`;
      }
      return buildRoute(cleanPath);
    },
  };
}
