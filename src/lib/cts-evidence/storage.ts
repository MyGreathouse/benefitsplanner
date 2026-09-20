import type { CtsEvidenceData } from "./types";
import { loadPlannerBlob, savePlannerBlob, clearPlannerBlob } from "@/lib/planner-evidence/storage";

const SLUG = "council-tax-support";

function emptyData(): CtsEvidenceData {
  return { entries: [], settings: {} };
}

export function loadCtsData(): CtsEvidenceData {
  return loadPlannerBlob(SLUG, emptyData());
}

export function saveCtsData(data: CtsEvidenceData): boolean {
  return savePlannerBlob(SLUG, data);
}

export function clearCtsData(): void {
  clearPlannerBlob(SLUG);
}
