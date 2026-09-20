import type { ChallengeEvidenceData } from "./types";
import { loadPlannerBlob, savePlannerBlob, clearPlannerBlob } from "@/lib/planner-evidence/storage";

const SLUG = "challenge";

function emptyData(): ChallengeEvidenceData {
  return { decisions: [], settings: {} };
}

export function loadChallengeData(): ChallengeEvidenceData {
  return loadPlannerBlob(SLUG, emptyData());
}

export function saveChallengeData(data: ChallengeEvidenceData): boolean {
  return savePlannerBlob(SLUG, data);
}

export function clearChallengeData(): void {
  clearPlannerBlob(SLUG);
}
