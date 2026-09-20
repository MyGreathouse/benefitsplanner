import type { PipEvidenceData } from "./types";
import { PIP_ACTIVITIES } from "./activities";

export interface PipReadinessInput {
  data: PipEvidenceData;
  checklistPercent: number; // from the shared PlannerShell-style checklist, 0-100
  evidenceFileCount: number;
}

/**
 * Weighted so no single area can carry the whole score — a strong PIP case
 * usually has evidence, real diary entries covering more than one or two
 * activities, and prep notes, not just a ticked checklist.
 */
export function computePipReadiness({ data, checklistPercent, evidenceFileCount }: PipReadinessInput): number {
  const checklistScore = checklistPercent; // 0-100

  const activitiesCovered = new Set(data.diary.map((d) => d.activityId)).size;
  const diaryScore = Math.min(100, (activitiesCovered / PIP_ACTIVITIES.length) * 100);

  const evidenceScore = Math.min(100, (evidenceFileCount / 6) * 100); // 6+ pieces of evidence ≈ full score

  const notesFilled = data.prepNotes.filter((n) => n.text.trim().length > 0).length;
  const prepScore = Math.min(100, (notesFilled / 5) * 100); // 5+ answered prompts ≈ full score

  const weighted = checklistScore * 0.3 + diaryScore * 0.3 + evidenceScore * 0.25 + prepScore * 0.15;
  return Math.round(weighted);
}
