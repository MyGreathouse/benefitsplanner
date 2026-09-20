import type { PlannerConfig } from "@/lib/planner/types";
import { SOURCES } from "@/lib/sources";

export const universalCreditPlanner: PlannerConfig = {
  slug: "universal-credit",
  title: "Universal Credit Planner",
  standfirst: "Prepare a Universal Credit claim and keep track of your award as your circumstances change.",
  journeyStages: [
    "Eligibility",
    "Household",
    "Income",
    "Housing",
    "Children",
    "Work",
    "Health",
    "Claim preparation",
    "Documents",
    "Payments",
    "Changes",
    "Decision",
    "Challenge",
  ],
  sections: [
    {
      id: "overview",
      kind: "overview",
      title: "Overview",
      summary:
        "Universal Credit combines a standard allowance with extra elements for housing, children, health, and caring. This planner helps you gather what you need before you apply, and track your award afterwards.",
    },
    {
      id: "eligibility",
      kind: "eligibility",
      title: "Eligibility",
      bullets: [
        "18 or over (some 16–17 exceptions), under State Pension age",
        "You and your partner have £16,000 or less in combined savings and investments",
        "You live in the UK",
      ],
    },
    {
      id: "preparation",
      kind: "preparation",
      title: "Claim preparation checklist",
      tasks: [
        { id: "uc-id", label: "Proof of identity (passport, driving licence, or similar)" },
        { id: "uc-bank", label: "Bank, building society or credit union account details" },
        { id: "uc-address", label: "Proof of address" },
        { id: "uc-housing", label: "Tenancy agreement or mortgage statement" },
        { id: "uc-income", label: "Details of income, including payslips if employed" },
        { id: "uc-childcare", label: "Childcare costs and provider details, if relevant" },
        { id: "uc-health", label: "Fit notes or health evidence, if relevant" },
        { id: "uc-nino", label: "National Insurance number" },
      ],
    },
    {
      id: "housing-children-work",
      kind: "preparation",
      title: "Housing, children and work",
      bullets: [
        "Housing costs element can help with rent — you'll usually need your tenancy details",
        "Child element applies if you're responsible for a child living with you",
        "Work-related requirements depend on your circumstances, health, and youngest child's age — these are agreed in your claimant commitment",
      ],
    },
    {
      id: "evidence",
      kind: "evidence",
      title: "Evidence",
      bullets: [
        "Keep payslips, tenancy documents and any health evidence together",
        "Report changes as soon as they happen — earnings, household, health, or housing changes can all affect your award",
      ],
    },
    {
      id: "documents",
      kind: "documents",
      title: "Documents",
      summary: "A personal record of what you've gathered and submitted — not a substitute for your UC online journal.",
    },
    {
      id: "payments",
      kind: "next-steps",
      title: "Payments",
      bullets: [
        "First payment is usually about 5 weeks after you apply — an advance can be requested if needed, though it's repaid from later awards",
        "After that, payments are usually monthly (or twice-monthly in Scotland, if chosen)",
      ],
    },
    {
      id: "changes",
      kind: "next-steps",
      title: "Changes of circumstances",
      bullets: [
        "Report changes to income, household, health or housing promptly via your UC account",
        "Delaying a change can lead to overpayments that need to be repaid",
      ],
    },
    {
      id: "timeline",
      kind: "timeline",
      title: "Timeline",
      summary: "Track your assessment period dates, claimant commitment reviews, and any appointments.",
    },
    {
      id: "challenge",
      kind: "next-steps",
      title: "Decision and challenge",
      bullets: [
        "If you disagree with a decision, you can usually ask for a Mandatory Reconsideration first",
        "If still unresolved, you may be able to appeal to an independent tribunal",
      ],
    },
  ],
  sources: [
    { title: SOURCES.ucRates2026.title, url: SOURCES.ucRates2026.url, publisher: SOURCES.ucRates2026.publisher, jurisdiction: "UK", dateChecked: SOURCES.ucRates2026.dateChecked },
    { title: SOURCES.ucCapital.title, url: SOURCES.ucCapital.url, publisher: SOURCES.ucCapital.publisher, jurisdiction: "UK", dateChecked: SOURCES.ucCapital.dateChecked },
  ],
  disclaimer:
    "This planner is for personal organisation only. It doesn't submit anything to DWP or replace your UC online journal.",
};
