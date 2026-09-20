export interface ChildProfile {
  childName?: string;
  dateOfBirth?: string;
  school?: string;
  sencoName?: string;
}

export interface MeetingEntry {
  id: string;
  date: string;
  withWhom: string;
  summary: string;
}

export interface SendTimelineEntry {
  id: string;
  date: string;
  label: string;
  type: string;
}

export interface PromptNote {
  promptId: string;
  text: string;
}

export interface SendSettings {
  reminderDate?: string;
  reminderNote?: string;
}

export interface SendEvidenceData {
  child: ChildProfile;
  meetings: MeetingEntry[];
  timeline: SendTimelineEntry[];
  needsNotes: PromptNote[];
  settings: SendSettings;
}

export const SEND_NEEDS_PROMPTS: { id: string; prompt: string }[] = [
  { id: "strengths", prompt: "What are your child's strengths and what do they enjoy?" },
  { id: "learning-needs", prompt: "What learning difficulties or needs have you noticed?" },
  { id: "social-needs", prompt: "How does your child get on socially and emotionally?" },
  { id: "school-support", prompt: "What support has the school already tried, and how has it gone?" },
  { id: "home-life", prompt: "How do their needs show up at home, outside of school?" },
];

// Matches task ids in lib/planner-data/send-ehcp.ts so progress carries over either way.
export const SEND_CHECKLIST_ITEMS: { id: string; label: string }[] = [
  { id: "send-school-reports", label: "School reports and SEN support records" },
  { id: "send-professional-reports", label: "Reports from any professionals involved" },
  { id: "send-parent-notes", label: "Your own notes on your child's needs, strengths and daily life" },
  { id: "send-meeting-notes", label: "Notes from meetings with the school or local authority" },
];
