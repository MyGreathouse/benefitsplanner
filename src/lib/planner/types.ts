// Shared shape for every planner (PIP, Universal Credit, SEND/EHCP,
// Carer's Support, and future ones). Each planner supplies its own content
// through this config; the PlannerShell UI component renders any of them
// identically. This is what "reusable planner architecture" means in
// practice: no planner-specific layout code.

export interface PlannerTask {
  id: string;
  label: string;
  detail?: string;
}

export interface PlannerSection {
  id: string;
  title: string;
  /** e.g. "Overview" | "Eligibility" | "Preparation" | "Evidence" | "Documents" | "Timeline" | "Sources" */
  kind:
    | "overview"
    | "eligibility"
    | "preparation"
    | "evidence"
    | "documents"
    | "timeline"
    | "progress"
    | "next-steps"
    | "sources";
  summary?: string;
  tasks?: PlannerTask[];
  bullets?: string[];
}

export interface PlannerSource {
  title: string;
  url: string;
  publisher: string;
  jurisdiction: "UK" | "England" | "Scotland" | "Wales" | "Northern Ireland";
  dateChecked: string; // ISO date this source was last verified
}

export interface PlannerConfig {
  slug: string;
  title: string;
  standfirst: string;
  journeyStages: string[]; // e.g. ["Eligibility", "Daily living", "Mobility", ...]
  sections: PlannerSection[];
  sources: PlannerSource[];
  disclaimer: string;
}

/** Per-user, per-planner state persisted locally (no accounts in the MVP). */
export interface PlannerProgress {
  slug: string;
  completedTaskIds: string[];
  notes: Record<string, string>;
  updatedAt: string;
}
