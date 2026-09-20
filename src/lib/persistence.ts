// Local-first persistence for the MVP: no accounts, no server-side storage.
// Everything lives in the browser's localStorage, scoped to this device.
// Every read/write is wrapped defensively since localStorage can throw
// (private browsing, storage disabled, quota exceeded) or simply be empty.

import type { Answers, EligibilityResult } from "./eligibility/types";
import type { PlannerProgress } from "./planner/types";

const NAMESPACE = "benefitsplanner";

function key(name: string): string {
  return `${NAMESPACE}:${name}`;
}

function safeGet<T>(k: string): T | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(k);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function safeSet(k: string, value: unknown): boolean {
  if (typeof window === "undefined") return false;
  try {
    window.localStorage.setItem(k, JSON.stringify(value));
    return true;
  } catch {
    return false;
  }
}

function safeRemove(k: string): void {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.removeItem(k);
  } catch {
    // ignore
  }
}

// ---- Eligibility checker state ----

const CHECKER_ANSWERS_KEY = key("checker:answers");
const CHECKER_RESULT_KEY = key("checker:result");

export function loadCheckerAnswers(): Answers {
  return safeGet<Answers>(CHECKER_ANSWERS_KEY) ?? {};
}

export function saveCheckerAnswers(answers: Answers): boolean {
  return safeSet(CHECKER_ANSWERS_KEY, answers);
}

export function loadCheckerResult(): EligibilityResult | null {
  return safeGet<EligibilityResult>(CHECKER_RESULT_KEY);
}

export function saveCheckerResult(result: EligibilityResult): boolean {
  return safeSet(CHECKER_RESULT_KEY, result);
}

export function clearCheckerState(): void {
  safeRemove(CHECKER_ANSWERS_KEY);
  safeRemove(CHECKER_RESULT_KEY);
}

// ---- Planner progress ----

function plannerKey(slug: string): string {
  return key(`planner:${slug}`);
}

export function loadPlannerProgress(slug: string): PlannerProgress {
  return (
    safeGet<PlannerProgress>(plannerKey(slug)) ?? {
      slug,
      completedTaskIds: [],
      notes: {},
      updatedAt: new Date().toISOString(),
    }
  );
}

export function savePlannerProgress(progress: PlannerProgress): boolean {
  return safeSet(plannerKey(slug(progress)), { ...progress, updatedAt: new Date().toISOString() });
}

function slug(p: PlannerProgress): string {
  return p.slug;
}

export function clearPlannerProgress(slugValue: string): void {
  safeRemove(plannerKey(slugValue));
}

// ---- Full data export (Phase 1: JSON summary; branded document export is Phase 4) ----

export function exportAllData(): Record<string, unknown> {
  if (typeof window === "undefined") return {};
  const data: Record<string, unknown> = {};
  try {
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(`${NAMESPACE}:`)) {
        const raw = window.localStorage.getItem(k);
        if (raw) {
          try {
            data[k] = JSON.parse(raw);
          } catch {
            data[k] = raw;
          }
        }
      }
    }
  } catch {
    // ignore
  }
  return data;
}

export function deleteAllData(): void {
  if (typeof window === "undefined") return;
  try {
    const keysToRemove: string[] = [];
    for (let i = 0; i < window.localStorage.length; i++) {
      const k = window.localStorage.key(i);
      if (k && k.startsWith(`${NAMESPACE}:`)) keysToRemove.push(k);
    }
    keysToRemove.forEach((k) => window.localStorage.removeItem(k));
  } catch {
    // ignore
  }
}
