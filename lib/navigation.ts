"use client";

import { useApplicationContext, ApplicationMode, WorkspaceRole } from "./ApplicationContext";

/**
 * Builds a context-aware application route based on current mode ("production" | "demo").
 * When in Demo Mode, prefixes "/demo" to any internal production path if not already present.
 */
export function buildAppRoute(path: string, mode: ApplicationMode = "production"): string {
  if (!path) return "/";
  if (mode === "production") return path;

  // External links or anchor links
  if (path.startsWith("http://") || path.startsWith("https://") || path.startsWith("#") || path.startsWith("mailto:")) {
    return path;
  }

  // Already prefixed with /demo
  if (path === "/demo" || path.startsWith("/demo/")) {
    return path;
  }

  // Root landing page
  if (path === "/") {
    return "/demo";
  }

  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `/demo${cleanPath}`;
}

/**
 * React hook that returns a route builder function bound to the current ApplicationContext.
 */
export function useAppRoute() {
  const { mode } = useApplicationContext();
  return (path: string) => buildAppRoute(path, mode);
}
