export interface UcHousehold {
  adults?: string;
  children?: string;
  housingTenure?: string;
  notes?: string;
}

export interface IncomeEntry {
  id: string;
  date: string;
  source: string;
  amount: string;
  type: "employed" | "self-employed" | "benefit" | "other";
}

export interface ChangeLogEntry {
  id: string;
  date: string;
  changeType: string;
  description: string;
}

export interface UcSettings {
  reminderDate?: string;
  reminderNote?: string;
}

export interface UcEvidenceData {
  household: UcHousehold;
  income: IncomeEntry[];
  changes: ChangeLogEntry[];
  settings: UcSettings;
}

// Matches the task ids already used by the generic Universal Credit PlannerConfig
// (lib/planner-data/universal-credit.ts) so progress carries over either way.
export const UC_CHECKLIST_ITEMS: { id: string; label: string }[] = [
  { id: "uc-id", label: "Proof of identity (passport, driving licence, or similar)" },
  { id: "uc-bank", label: "Bank, building society or credit union account details" },
  { id: "uc-address", label: "Proof of address" },
  { id: "uc-housing", label: "Tenancy agreement or mortgage statement" },
  { id: "uc-income", label: "Details of income, including payslips if employed" },
  { id: "uc-childcare", label: "Childcare costs and provider details, if relevant" },
  { id: "uc-health", label: "Fit notes or health evidence, if relevant" },
  { id: "uc-nino", label: "National Insurance number" },
];
