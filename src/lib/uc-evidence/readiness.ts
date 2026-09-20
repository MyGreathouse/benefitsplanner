import type { UcEvidenceData } from "./types";

export function computeUcReadiness({
  data,
  checklistPercent,
  evidenceFileCount,
}: {
  data: UcEvidenceData;
  checklistPercent: number;
  evidenceFileCount: number;
}): number {
  const incomeScore = Math.min(100, (data.income.length / 2) * 100);
  const evidenceScore = Math.min(100, (evidenceFileCount / 4) * 100);
  return Math.round(checklistPercent * 0.4 + incomeScore * 0.3 + evidenceScore * 0.3);
}
