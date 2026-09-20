export interface HouseholdIncomeEntry {
  id: string;
  item: string;
  amount: string;
  notes: string;
}

export interface CtsSettings {
  reminderDate?: string;
  reminderNote?: string;
}

export interface CtsEvidenceData {
  entries: HouseholdIncomeEntry[];
  settings: CtsSettings;
}

// Matches task ids in lib/planner-data/council-tax-support.ts so progress carries over either way.
export const CTS_CHECKLIST_ITEMS: { id: string; label: string }[] = [
  { id: "cts-household", label: "Who lives in your household and their ages" },
  { id: "cts-income", label: "Income for you and your partner, if applicable" },
  { id: "cts-benefits", label: "Any benefits you already receive" },
  { id: "cts-savings", label: "Savings and capital" },
  { id: "cts-bill", label: "Your current Council Tax bill" },
];
