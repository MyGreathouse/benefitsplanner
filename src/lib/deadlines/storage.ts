import type { DeadlinesData } from "./types";
import { loadPlannerBlob, savePlannerBlob, clearPlannerBlob } from "@/lib/planner-evidence/storage";

const SLUG = "deadlines";

function emptyData(): DeadlinesData {
  return { entries: [], settings: {} };
}

export function loadDeadlinesData(): DeadlinesData {
  return loadPlannerBlob(SLUG, emptyData());
}

export function saveDeadlinesData(data: DeadlinesData): boolean {
  return savePlannerBlob(SLUG, data);
}

export function clearDeadlinesData(): void {
  clearPlannerBlob(SLUG);
}
