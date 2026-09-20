export interface CaringSituation {
  personCaredFor?: string;
  relationship?: string;
  condition?: string;
  notes?: string;
}

export interface CaringHoursEntry {
  id: string;
  weekStarting: string;
  hours: string;
  tasksHelped: string;
}

export interface EarningsEntry {
  id: string;
  date: string;
  amount: string;
  notes: string;
}

export interface CarersSettings {
  reminderDate?: string;
  reminderNote?: string;
}

export interface CarersEvidenceData {
  situation: CaringSituation;
  hoursLog: CaringHoursEntry[];
  earningsLog: EarningsEntry[];
  settings: CarersSettings;
}

// Matches task ids in lib/planner-data/carers-support.ts so progress carries over either way.
export const CARERS_CHECKLIST_ITEMS: { id: string; label: string }[] = [
  { id: "cs-hours", label: "Note your typical weekly caring hours" },
  { id: "cs-tasks", label: "List the day-to-day tasks you help with" },
  { id: "cs-benefit", label: "Confirm which disability benefit the person you care for receives" },
  { id: "cs-earnings", label: "Check your net weekly earnings against the earnings limit" },
];

export const CARERS_WEEKLY_EARNINGS_LIMIT = 204;
