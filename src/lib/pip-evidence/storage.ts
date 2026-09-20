import type { PipEvidenceData } from "./types";
import { loadPlannerBlob, savePlannerBlob, clearPlannerBlob } from "@/lib/planner-evidence/storage";

const SLUG = "pip";

function emptyData(): PipEvidenceData {
  return {
    profile: {},
    conditions: [],
    symptoms: [],
    medications: [],
    diary: [],
    appointments: [],
    examples: [],
    prepNotes: [],
    timeline: [],
    settings: {},
  };
}

export function loadPipData(): PipEvidenceData {
  return loadPlannerBlob(SLUG, emptyData());
}

export function savePipData(data: PipEvidenceData): boolean {
  return savePlannerBlob(SLUG, data);
}

export function clearPipData(): void {
  clearPlannerBlob(SLUG);
}
