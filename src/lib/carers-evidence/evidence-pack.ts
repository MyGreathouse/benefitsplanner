import type { CarersEvidenceData } from "./types";
import type { EvidencePackSectionData } from "@/components/pip-planner/EvidencePackSection";

export function buildCarersEvidencePackSections(data: CarersEvidenceData): EvidencePackSectionData[] {
  return [
    {
      title: "Caring situation",
      lines: [
        data.situation.personCaredFor ? `Caring for: ${data.situation.personCaredFor}` : "",
        data.situation.relationship ? `Relationship: ${data.situation.relationship}` : "",
        data.situation.condition ? `Condition: ${data.situation.condition}` : "",
        data.situation.notes ?? "",
      ].filter(Boolean),
    },
    {
      title: "Caring hours log",
      lines: data.hoursLog.map((h) => `Week of ${h.weekStarting} — ${h.hours} hours: ${h.tasksHelped}`),
    },
    {
      title: "Earnings log",
      lines: data.earningsLog.map((e) => `${e.date} — £${e.amount}${e.notes ? `: ${e.notes}` : ""}`),
    },
  ];
}
