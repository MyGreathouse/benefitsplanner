import type { ChallengeEvidenceData } from "./types";
import { addMonths } from "@/lib/deadlines/status";
import type { EvidencePackSectionData } from "@/components/pip-planner/EvidencePackSection";

export function buildChallengeEvidencePackSections(data: ChallengeEvidenceData): EvidencePackSectionData[] {
  return [
    {
      title: "Decisions being challenged",
      lines: data.decisions.map((d) => {
        const mrDeadline = addMonths(d.decisionDate, 1);
        const appealDeadline = d.mrOutcomeDate ? addMonths(d.mrOutcomeDate, 1) : undefined;
        return `${d.benefit} — decision ${d.decisionDate}: ${d.disagreeWith}. MR deadline: ${mrDeadline}.${
          appealDeadline ? ` Appeal deadline: ${appealDeadline}.` : ""
        }`;
      }),
    },
  ];
}
