import type { SendEvidenceData } from "./types";
import { loadPlannerBlob, savePlannerBlob, clearPlannerBlob } from "@/lib/planner-evidence/storage";

const SLUG = "send-ehcp";

function emptyData(): SendEvidenceData {
  return { child: {}, meetings: [], timeline: [], needsNotes: [], settings: {} };
}

export function loadSendData(): SendEvidenceData {
  return loadPlannerBlob(SLUG, emptyData());
}

export function saveSendData(data: SendEvidenceData): boolean {
  return savePlannerBlob(SLUG, data);
}

export function clearSendData(): void {
  clearPlannerBlob(SLUG);
}
