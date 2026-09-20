import type { CarersEvidenceData } from "./types";
import { loadPlannerBlob, savePlannerBlob, clearPlannerBlob } from "@/lib/planner-evidence/storage";

const SLUG = "carers-support";

function emptyData(): CarersEvidenceData {
  return { situation: {}, hoursLog: [], earningsLog: [], settings: {} };
}

export function loadCarersData(): CarersEvidenceData {
  return loadPlannerBlob(SLUG, emptyData());
}

export function saveCarersData(data: CarersEvidenceData): boolean {
  return savePlannerBlob(SLUG, data);
}

export function clearCarersData(): void {
  clearPlannerBlob(SLUG);
}
