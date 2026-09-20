// Everything here is local-first: no accounts, nothing leaves the browser.
// Structured records live in localStorage; binary files (evidence uploads,
// voice notes) live in IndexedDB because they're too large/binary for
// localStorage's practical size limits.

export interface PipProfile {
  name?: string;
  dateOfBirth?: string;
  niNumber?: string;
  primaryContactNote?: string;
}

export interface HealthCondition {
  id: string;
  condition: string;
  diagnosedDate?: string;
  notes?: string;
}

export interface SymptomLogEntry {
  id: string;
  date: string;
  symptom: string;
  severity: "mild" | "moderate" | "severe";
  notes?: string;
}

export interface Medication {
  id: string;
  name: string;
  dose?: string;
  frequency?: string;
  sideEffects?: string;
}

export type DiaryDayType = "typical" | "bad" | "good";

export interface DiaryEntry {
  id: string;
  date: string;
  activityId: string; // matches PipActivity.id
  dayType: DiaryDayType;
  difficulty: 1 | 2 | 3 | 4 | 5;
  description: string;
}

export interface Appointment {
  id: string;
  date: string;
  professional: string;
  purpose?: string;
  notes?: string;
}

export interface RealLifeExample {
  id: string;
  date: string;
  title: string;
  description: string;
}

export interface PromptNote {
  promptId: string;
  text: string;
}

export interface TimelineEvent {
  id: string;
  date: string;
  label: string;
  type: "applied" | "assessment" | "decision" | "mr-deadline" | "appeal-deadline" | "other";
}

export interface PipSettings {
  reminderDate?: string;
  reminderNote?: string;
}

export interface PipEvidenceData {
  profile: PipProfile;
  conditions: HealthCondition[];
  symptoms: SymptomLogEntry[];
  medications: Medication[];
  diary: DiaryEntry[];
  appointments: Appointment[];
  examples: RealLifeExample[];
  prepNotes: PromptNote[];
  timeline: TimelineEvent[];
  settings: PipSettings;
}

export const ASSESSMENT_PREP_PROMPTS: { id: string; prompt: string }[] = [
  { id: "worst-day", prompt: "What does one of your worst days look like, hour by hour?" },
  { id: "morning-routine", prompt: "What's hardest about your morning routine?" },
  { id: "safety", prompt: "Are there things you can only do if someone is nearby, in case something goes wrong?" },
  { id: "repeatedly", prompt: "What tasks can you do once, but not repeat several times a day?" },
  { id: "time-taken", prompt: "What takes you much longer than it used to, or than it would take someone without your condition?" },
  { id: "aids-used", prompt: "What aids, equipment or adaptations do you rely on, and what happens without them?" },
  { id: "help-from-others", prompt: "What do family, friends or carers currently help you with?" },
];

export const EVIDENCE_CHECKLIST_ITEMS: { id: string; label: string }[] = [
  { id: "gp-letters", label: "Gather GP or consultant letters" },
  { id: "med-list", label: "Note down your medication list and any side effects" },
  { id: "diary-week", label: "Log daily living diary entries covering a full week, including a bad day" },
  { id: "examples-each", label: "Write a real-life example for each activity you find difficult" },
  { id: "aids-list", label: "List any aids, equipment or adaptations you use" },
  { id: "carer-statement", label: "Ask a carer, family member or friend for a supporting statement" },
  { id: "review-form", label: "Re-read your PIP2 form answers before the assessment" },
  { id: "prep-questions", label: "Work through the assessment preparation prompts" },
];
