import type { CarersEvidenceData } from "./types";

export function computeCarersReadiness({
  data,
  checklistPercent,
  evidenceFileCount,
}: {
  data: CarersEvidenceData;
  checklistPercent: number;
  evidenceFileCount: number;
}): number {
  const hoursScore = Math.min(100, (data.hoursLog.length / 2) * 100);
  const evidenceScore = Math.min(100, (evidenceFileCount / 3) * 100);
  return Math.round(checklistPercent * 0.4 + hoursScore * 0.3 + evidenceScore * 0.3);
}
