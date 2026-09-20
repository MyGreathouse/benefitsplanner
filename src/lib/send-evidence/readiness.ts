import type { SendEvidenceData } from "./types";

export function computeSendReadiness({
  data,
  checklistPercent,
  evidenceFileCount,
}: {
  data: SendEvidenceData;
  checklistPercent: number;
  evidenceFileCount: number;
}): number {
  const meetingsScore = Math.min(100, (data.meetings.length / 2) * 100);
  const evidenceScore = Math.min(100, (evidenceFileCount / 4) * 100);
  const notesFilled = data.needsNotes.filter((n) => n.text.trim().length > 0).length;
  const notesScore = Math.min(100, (notesFilled / 3) * 100);
  return Math.round(checklistPercent * 0.35 + meetingsScore * 0.25 + evidenceScore * 0.25 + notesScore * 0.15);
}
