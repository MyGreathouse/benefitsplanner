import type { CtsEvidenceData } from "./types";
import type { EvidencePackSectionData } from "@/components/pip-planner/EvidencePackSection";

export function buildCtsEvidencePackSections(data: CtsEvidenceData): EvidencePackSectionData[] {
  return [
    {
      title: "Household & income",
      lines: data.entries.map((e) => `${e.item}: £${e.amount}${e.notes ? ` — ${e.notes}` : ""}`),
    },
  ];
}
