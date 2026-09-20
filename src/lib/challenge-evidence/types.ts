export interface DecisionEntry {
  id: string;
  benefit: string;
  decisionDate: string;
  disagreeWith: string;
  mrRequestedDate?: string;
  mrOutcomeDate?: string;
  appealSubmittedDate?: string;
  notes?: string;
}

export interface ChallengeSettings {
  reminderDate?: string;
  reminderNote?: string;
}

export interface ChallengeEvidenceData {
  decisions: DecisionEntry[];
  settings: ChallengeSettings;
}

export const CHALLENGE_CHECKLIST_ITEMS: { id: string; label: string }[] = [
  { id: "read-decision", label: "Read the decision letter and the reasons given" },
  { id: "request-mr", label: "Request Mandatory Reconsideration in writing, within 1 month of the decision" },
  { id: "gather-evidence", label: "Gather any new evidence to support your reconsideration" },
  { id: "keep-copies", label: "Keep copies of everything you send, with proof of postage" },
  { id: "review-mr-notice", label: "Read the Mandatory Reconsideration notice carefully once it arrives" },
  { id: "prepare-sscs1", label: "Fill in form SSCS1 if you want to appeal" },
  { id: "attach-mr-notice", label: "Attach a copy of your Mandatory Reconsideration notice to the appeal" },
  { id: "decide-hearing", label: "Decide whether you want an oral hearing or a paper decision" },
];
