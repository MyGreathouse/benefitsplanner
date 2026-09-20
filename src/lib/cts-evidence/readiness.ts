export function computeCtsReadiness({
  checklistPercent,
  evidenceFileCount,
}: {
  checklistPercent: number;
  evidenceFileCount: number;
}): number {
  const evidenceScore = Math.min(100, (evidenceFileCount / 3) * 100);
  return Math.round(checklistPercent * 0.5 + evidenceScore * 0.5);
}
