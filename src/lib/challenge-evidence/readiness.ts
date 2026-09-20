import type { ChallengeEvidenceData } from "./types";

export function computeChallengeReadiness({
  data,
  checklistPercent,
  evidenceFileCount,
}: {
  data: ChallengeEvidenceData;
  checklistPercent: number;
  evidenceFileCount: number;
}): number {
  const decisionsScore = data.decisions.length > 0 ? 100 : 0;
  const evidenceScore = Math.min(100, (evidenceFileCount / 3) * 100);
  return Math.round(checklistPercent * 0.5 + decisionsScore * 0.2 + evidenceScore * 0.3);
}
