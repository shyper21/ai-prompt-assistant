import type { PrdAnswer } from "@/lib/generate-prd";

export type PrdMemoryEntry = {
  idea: string;
  answers: PrdAnswer[];
  generatedPrd: string;
  createdAt: string;
  userFeedback: string;
};

const STORAGE_KEY = "promptforge.prdMemory";

function canUseStorage() {
  return typeof window !== "undefined" && Boolean(window.localStorage);
}

export function getPrdMemory(): PrdMemoryEntry[] {
  if (!canUseStorage()) return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function savePrdMemory(entry: PrdMemoryEntry) {
  if (!canUseStorage()) return;

  const current = getPrdMemory();
  const next = [entry, ...current].slice(0, 20);
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
}

export function clearPrdMemory() {
  if (!canUseStorage()) return;
  window.localStorage.removeItem(STORAGE_KEY);
}
