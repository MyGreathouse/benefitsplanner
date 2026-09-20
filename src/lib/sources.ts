// Central source/configuration model. Every benefit rate, threshold or
// eligibility criterion shown on the site must be traceable to one of
// these. Never invent a figure — if it isn't sourced, mark it TBD in the
// relevant benefits-data file rather than guessing.

export type Jurisdiction = "UK" | "England" | "Scotland" | "Wales" | "Northern Ireland";

export interface Source {
  title: string;
  url: string;
  publisher: string;
  jurisdiction: Jurisdiction;
  dateChecked: string; // ISO date (YYYY-MM-DD) this figure/rule was last verified against the source
  note?: string; // e.g. "rate confirmed for tax year 2026/27"
}

export const SOURCES = {
  ucRates2026: {
    title: "Universal Credit standard allowance rates",
    url: "https://www.gov.uk/universal-credit/what-youll-get",
    publisher: "GOV.UK / DWP annual uprating, tax year 2026-27",
    jurisdiction: "UK",
    dateChecked: "2026-09-19",
    note: "Standard allowance rises 6.2% (3.8% CPI + 2.3% legislated uplift) from 7 April 2026 under the Universal Credit Act 2025.",
  },
  ucCapital: {
    title: "Universal Credit and savings",
    url: "https://www.gov.uk/guidance/universal-credit-and-your-payments",
    publisher: "GOV.UK",
    jurisdiction: "UK",
    dateChecked: "2026-09-19",
  },
  pipRates2026: {
    title: "Personal Independence Payment rates",
    url: "https://www.gov.uk/pip/what-youll-get",
    publisher: "GOV.UK / DWP annual uprating, tax year 2026-27",
    jurisdiction: "UK",
    dateChecked: "2026-09-19",
    note: "Daily living and mobility component rates rise 3.8% from April 2026.",
  },
  pipPointsSystem: {
    title: "PIP assessment: how your daily living and mobility needs are scored",
    url: "https://www.gov.uk/pip/how-youre-assessed",
    publisher: "GOV.UK",
    jurisdiction: "UK",
    dateChecked: "2026-09-19",
    note: "8 points = standard rate, 12+ points = enhanced rate, per component. A separate reform proposing a minimum 4-point single-activity threshold for daily living has been announced for around November 2026 — check GOV.UK for whether it is in force.",
  },
  carersAllowance2026: {
    title: "Carer's Allowance rates and earnings limit",
    url: "https://www.gov.uk/carers-allowance",
    publisher: "GOV.UK / DWP annual uprating, tax year 2026-27",
    jurisdiction: "UK",
    dateChecked: "2026-09-19",
    note: "Weekly rate £86.45; earnings limit £204/week (after allowable deductions) from 6 April 2026. Different rules apply in Scotland (Carer Support Payment).",
  },
  councilTaxSupport: {
    title: "Apply for Council Tax Reduction",
    url: "https://www.gov.uk/council-tax-reduction",
    publisher: "GOV.UK",
    jurisdiction: "UK",
    dateChecked: "2026-09-19",
    note: "Schemes are set locally by each council in England; Scotland and Wales run their own national schemes (CTR). Figures shown are general guidance, not a specific council's scheme.",
  },
  sendCode: {
    title: "Special educational needs and disability (SEND) code of practice: 0 to 25 years",
    url: "https://www.gov.uk/government/publications/send-code-of-practice-0-to-25",
    publisher: "GOV.UK / Department for Education",
    jurisdiction: "England",
    dateChecked: "2026-09-19",
  },
} as const satisfies Record<string, Source>;
