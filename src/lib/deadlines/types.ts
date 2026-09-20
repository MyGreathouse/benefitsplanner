export type DeadlineCategory =
  | "applied"
  | "assessment"
  | "decision"
  | "mr-deadline"
  | "appeal-deadline"
  | "review"
  | "other";

export interface ManualDeadline {
  id: string;
  date: string;
  label: string;
  category: DeadlineCategory;
  completed: boolean;
}

export interface DeadlineSettings {
  reminderDate?: string;
  reminderNote?: string;
}

export interface DeadlinesData {
  entries: ManualDeadline[];
  settings: DeadlineSettings;
}

/** A deadline pulled read-only from another planner's own data — edited there, not here. */
export interface AggregatedDeadline {
  date: string;
  label: string;
  source: string; // e.g. "PIP Planner", "SEND & EHCP Planner", "Challenge Planner"
  href: string; // link back to the planner that owns this date
}

export const DEADLINE_CATEGORY_LABELS: Record<DeadlineCategory, string> = {
  applied: "Applied",
  assessment: "Assessment",
  decision: "Decision",
  "mr-deadline": "Mandatory Reconsideration deadline",
  "appeal-deadline": "Appeal deadline",
  review: "Review",
  other: "Other",
};
