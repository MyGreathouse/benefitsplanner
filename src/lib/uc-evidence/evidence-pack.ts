import type { UcEvidenceData } from "./types";
import type { EvidencePackSectionData } from "@/components/pip-planner/EvidencePackSection";

export function buildUcEvidencePackSections(data: UcEvidenceData): EvidencePackSectionData[] {
  return [
    {
      title: "Household",
      lines: [
        data.household.adults ? `Adults: ${data.household.adults}` : "",
        data.household.children ? `Children: ${data.household.children}` : "",
        data.household.housingTenure ? `Housing: ${data.household.housingTenure}` : "",
        data.household.notes ?? "",
      ].filter(Boolean),
    },
    {
      title: "Income",
      lines: data.income.map((i) => `${i.date} — ${i.source} (${i.type}): £${i.amount}`),
    },
    {
      title: "Changes of circumstances",
      lines: data.changes.map((c) => `${c.date} — ${c.changeType}: ${c.description}`),
    },
  ];
}
