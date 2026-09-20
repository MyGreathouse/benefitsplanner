import type { PlannerConfig } from "@/lib/planner/types";
import { SOURCES } from "@/lib/sources";

export const carersSupportPlanner: PlannerConfig = {
  slug: "carers-support",
  title: "Carer's Support Planner",
  standfirst: "Organise your caring situation, evidence, and application — for Carer's Allowance and wider carer's support.",
  journeyStages: ["Eligibility", "Caring Situation", "Evidence", "Application", "Changes", "Support"],
  sections: [
    {
      id: "overview",
      kind: "overview",
      title: "Overview",
      summary:
        "Whether or not you qualify for Carer's Allowance itself, this planner also covers wider carer's support such as carer's assessments and respite options.",
    },
    {
      id: "eligibility",
      kind: "eligibility",
      title: "Eligibility for Carer's Allowance",
      bullets: [
        "At least 35 hours a week caring for someone",
        "The person you care for receives a qualifying disability benefit",
        "You earn no more than the weekly earnings limit, after allowable deductions",
        "Not in full-time education",
      ],
    },
    {
      id: "caring-situation",
      kind: "preparation",
      title: "Your caring situation",
      tasks: [
        { id: "cs-hours", label: "Note your typical weekly caring hours" },
        { id: "cs-tasks", label: "List the day-to-day tasks you help with" },
        { id: "cs-benefit", label: "Confirm which disability benefit the person you care for receives" },
        { id: "cs-earnings", label: "Check your net weekly earnings against the earnings limit" },
      ],
    },
    {
      id: "evidence",
      kind: "evidence",
      title: "Evidence",
      bullets: [
        "The disability benefit award letter for the person you care for",
        "Payslips or self-employment records, if you work",
      ],
    },
    {
      id: "application",
      kind: "preparation",
      title: "Application preparation",
      bullets: [
        "You'll need your National Insurance number and bank details",
        "You'll need details of the person you care for, including their date of birth and NI number if known",
      ],
    },
    {
      id: "changes",
      kind: "next-steps",
      title: "Changes",
      bullets: [
        "Report changes in your earnings, caring hours, or the other person's circumstances promptly",
        "Going over the earnings limit, even briefly, can end your award for that period",
      ],
    },
    {
      id: "support",
      kind: "next-steps",
      title: "Other support for carers",
      bullets: [
        "Ask your local council for a carer's assessment — this can lead to respite care or other practical support",
        "Carer's Credit can protect your State Pension if you care for 20+ hours a week but don't qualify for Carer's Allowance",
      ],
    },
  ],
  sources: [
    { title: SOURCES.carersAllowance2026.title, url: SOURCES.carersAllowance2026.url, publisher: SOURCES.carersAllowance2026.publisher, jurisdiction: "UK", dateChecked: SOURCES.carersAllowance2026.dateChecked },
  ],
  disclaimer: "This planner is for personal organisation only and doesn't submit anything to DWP or your local authority.",
};
