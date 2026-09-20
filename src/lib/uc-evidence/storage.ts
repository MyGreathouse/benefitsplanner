import type { UcEvidenceData } from "./types";
import { loadPlannerBlob, savePlannerBlob, clearPlannerBlob } from "@/lib/planner-evidence/storage";

const SLUG = "universal-credit";

function emptyData(): UcEvidenceData {
  return { household: {}, income: [], changes: [], settings: {} };
}

export function loadUcData(): UcEvidenceData {
  return loadPlannerBlob(SLUG, emptyData());
}

export function saveUcData(data: UcEvidenceData): boolean {
  return savePlannerBlob(SLUG, data);
}

export function clearUcData(): void {
  clearPlannerBlob(SLUG);
}
