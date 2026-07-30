// Audit Logger for AI Queries & Insights

export interface AIAuditEntry {
  id: string;
  query: string;
  contextType: string;
  timestamp: string;
  status: "SUCCESS" | "FAILED";
}

const auditLogs: AIAuditEntry[] = [];

export function logAIQuery(query: string, contextType: string, status: "SUCCESS" | "FAILED") {
  const entry: AIAuditEntry = {
    id: `ai_audit_${Date.now()}_${Math.random().toString(36).substring(2, 6)}`,
    query,
    contextType,
    timestamp: new Date().toISOString(),
    status,
  };
  auditLogs.unshift(entry);
  if (auditLogs.length > 50) auditLogs.pop();
  return entry;
}

export function getAIAuditLogs() {
  return auditLogs;
}
