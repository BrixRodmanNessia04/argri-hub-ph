// Permission Guard for AI Operations

export function verifyAIPermission(role: string = "COOP_LEADER"): boolean {
  return role === "COOP_LEADER" || role === "ADMIN";
}
