import { db } from "./db";

export async function saveFormDraft(formId: string, payload: Record<string, unknown>): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const key = `draft_${formId}`;
    await db.formDrafts.put({
      key,
      formId,
      payload,
      updatedAt: new Date().toISOString(),
    });
  } catch (e) {
    console.warn("Failed to save form draft locally:", e);
  }
}

export async function loadFormDraft<T extends Record<string, unknown>>(formId: string): Promise<T | null> {
  if (typeof window === "undefined") return null;
  try {
    const key = `draft_${formId}`;
    const draft = await db.formDrafts.get(key);
    if (!draft) return null;
    return draft.payload as T;
  } catch (e) {
    console.warn("Failed to load form draft:", e);
    return null;
  }
}

export async function clearFormDraft(formId: string): Promise<void> {
  if (typeof window === "undefined") return;
  try {
    const key = `draft_${formId}`;
    await db.formDrafts.delete(key);
  } catch (e) {
    console.warn("Failed to clear form draft:", e);
  }
}
