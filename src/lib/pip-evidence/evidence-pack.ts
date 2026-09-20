import { PIP_ACTIVITIES } from "./activities";
import { ASSESSMENT_PREP_PROMPTS } from "./types";
import type { PipEvidenceData } from "./types";
import type { EvidencePackSectionData } from "@/components/pip-planner/EvidencePackSection";

export function buildPipEvidencePackSections(data: PipEvidenceData): EvidencePackSectionData[] {
  return [
    {
      title: "Profile",
      lines: data.profile.name
        ? [data.profile.name, ...(data.profile.dateOfBirth ? [`DOB: ${data.profile.dateOfBirth}`] : [])]
        : [],
    },
    {
      title: "Health conditions",
      lines: data.conditions.map(
        (c) => `${c.condition}${c.diagnosedDate ? ` (diagnosed ${c.diagnosedDate})` : ""}${c.notes ? ` — ${c.notes}` : ""}`,
      ),
    },
    {
      title: "Daily living & mobility diary",
      lines: data.diary.map((d) => {
        const activity = PIP_ACTIVITIES.find((a) => a.id === d.activityId);
        return `${d.date} — ${activity?.label ?? d.activityId} (${d.dayType} day, difficulty ${d.difficulty}/5): ${d.description}`;
      }),
    },
    {
      title: "Real-life examples",
      lines: data.examples.map((e) => `${e.date} — ${e.title}: ${e.description}`),
    },
    {
      title: "Assessment preparation notes",
      lines: data.prepNotes
        .filter((n) => n.text.trim())
        .map((n) => {
          const prompt = ASSESSMENT_PREP_PROMPTS.find((p) => p.id === n.promptId);
          return `${prompt?.prompt ?? n.promptId} — ${n.text}`;
        }),
    },
    {
      title: "Appointments",
      lines: data.appointments.map((a) => `${a.date} — ${a.professional}${a.purpose ? ` (${a.purpose})` : ""}`),
    },
    {
      title: "Medications",
      lines: data.medications.map((m) => `${m.name}${m.dose ? `, ${m.dose}` : ""}${m.frequency ? `, ${m.frequency}` : ""}`),
    },
    {
      title: "Timeline",
      lines: data.timeline.map((t) => `${t.date} — ${t.label}`),
    },
  ];
}
