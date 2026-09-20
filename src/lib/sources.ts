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
  childBenefit2026: {
    title: "Child Benefit rates",
    url: "https://www.gov.uk/child-benefit/what-youll-get",
    publisher: "GOV.UK / HMRC annual uprating, tax year 2026-27",
    jurisdiction: "UK",
    dateChecked: "2026-09-20",
    note: "£27.05/week for the eldest or only child, £17.90/week for each additional child, from 6 April 2026. High Income Child Benefit Charge applies if you or your partner have adjusted net income over £60,000.",
  },
  attendanceAllowance2026: {
    title: "Attendance Allowance rates",
    url: "https://www.gov.uk/attendance-allowance/what-youll-get",
    publisher: "GOV.UK / DWP annual uprating, tax year 2026-27",
    jurisdiction: "UK",
    dateChecked: "2026-09-20",
    note: "Lower rate £76.70/week, higher rate £114.60/week from April 2026. Not means-tested. In Scotland, Pension Age Disability Payment replaces Attendance Allowance for new claims.",
  },
  pensionCredit2026: {
    title: "Pension Credit rates",
    url: "https://www.gov.uk/pension-credit/what-youll-get",
    publisher: "GOV.UK / DWP annual uprating, tax year 2026-27",
    jurisdiction: "UK",
    dateChecked: "2026-09-20",
    note: "Standard minimum guarantee: £238.00/week single, £363.25/week couple, from April 2026. Extra amounts may apply for severe disability, caring, or children.",
  },
  esa2026: {
    title: "New Style Employment and Support Allowance rates",
    url: "https://www.gov.uk/employment-support-allowance/what-youll-get",
    publisher: "GOV.UK / DWP annual uprating, tax year 2026-27",
    jurisdiction: "UK",
    dateChecked: "2026-09-20",
    note: "Main phase personal allowance £95.55/week (under-25 assessment-phase rate £75.65/week); Work-Related Activity Component £37.95/week; Support Component £50.35/week, from April 2026.",
  },
  dla2026: {
    title: "Disability Living Allowance rates",
    url: "https://www.gov.uk/disability-living-allowance-children/what-youll-get",
    publisher: "GOV.UK / DWP annual uprating, tax year 2026-27",
    jurisdiction: "UK",
    dateChecked: "2026-09-20",
    note: "Care component: highest £114.60, middle £76.70, lowest £30.30/week. Mobility component: higher £80.00, lower £30.30/week, from April 2026. New claims for adults are now PIP; DLA continues mainly for children under 16.",
  },
  housingSupport: {
    title: "Housing Benefit and help with housing costs",
    url: "https://www.gov.uk/housing-benefit",
    publisher: "GOV.UK",
    jurisdiction: "UK",
    dateChecked: "2026-09-20",
    note: "Most working-age renters now claim help with rent through Universal Credit's housing element rather than standalone Housing Benefit. Local Housing Allowance rates vary by area (Broad Rental Market Area) and are set locally.",
  },
  benefitsCalculators: {
    title: "Benefits calculators",
    url: "https://www.gov.uk/benefits-calculators",
    publisher: "GOV.UK",
    jurisdiction: "UK",
    dateChecked: "2026-09-20",
    note: "Independent benefits calculators can give a fuller estimate across local and national schemes than any single page.",
  },
  mandatoryReconsideration: {
    title: "Challenge a decision made by the Department for Work and Pensions (DWP)",
    url: "https://www.gov.uk/mandatory-reconsideration",
    publisher: "GOV.UK",
    jurisdiction: "UK",
    dateChecked: "2026-09-20",
    note: "You usually have 1 calendar month from the date on the decision letter to ask for a Mandatory Reconsideration; a late request can be considered up to 13 months on, if you can show good reason.",
  },
  appealTribunal: {
    title: "Appeal a benefit decision (SSCS1)",
    url: "https://www.gov.uk/appeal-benefit-decision",
    publisher: "GOV.UK / HM Courts & Tribunals Service",
    jurisdiction: "UK",
    dateChecked: "2026-09-20",
    note: "You must have a Mandatory Reconsideration notice before you can appeal. Appeals must normally reach HMCTS within 1 calendar month of the date on the Mandatory Reconsideration notice, with a 13-month absolute limit for late appeals with good reason.",
  },
} as const satisfies Record<string, Source>;
