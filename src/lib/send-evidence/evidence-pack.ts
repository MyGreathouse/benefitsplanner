import type { SendEvidenceData } from "./types";
import { SEND_NEEDS_PROMPTS } from "./types";
import type { EvidencePackSectionData } from "@/components/pip-planner/EvidencePackSection";

export function buildSendEvidencePackSections(data: SendEvidenceData): EvidencePackSectionData[] {
  return [
    {
      title: "Child profile",
      lines: [
        data.child.childName ?? "",
        data.child.school ? `School: ${data.child.school}` : "",
        data.child.sencoName ? `SENCO: ${data.child.sencoName}` : "",
      ].filter(Boolean),
    },
    {
      title: "Needs and strengths",
      lines: data.needsNotes
        .filter((n) => n.text.trim())
        .map((n) => {
          const prompt = SEND_NEEDS_PROMPTS.find((p) => p.id === n.promptId);
          return `${prompt?.prompt ?? n.promptId} — ${n.text}`;
        }),
    },
    {
      title: "Meetings",
      lines: data.meetings.map((m) => `${m.date} — ${m.withWhom}: ${m.summary}`),
    },
    {
      title: "Timeline",
      lines: data.timeline.map((t) => `${t.date} — ${t.label}`),
    },
  ];
}
