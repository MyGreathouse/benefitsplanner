import type { PlannerConfig } from "@/lib/planner/types";
import { SOURCES } from "@/lib/sources";

export const pipPlanner: PlannerConfig = {
  slug: "pip",
  title: "PIP Planner",
  standfirst:
    "Prepare for a Personal Independence Payment claim, assessment, decision, and — if needed — a review or appeal.",
  journeyStages: [
    "Eligibility",
    "About your difficulties",
    "Daily living",
    "Mobility",
    "Evidence",
    "Assessment preparation",
    "Application progress",
    "Decision",
    "Review",
    "Challenge",
  ],
  sections: [
    {
      id: "overview",
      kind: "overview",
      title: "Overview",
      summary:
        "PIP looks at how your condition affects your daily living and mobility, not the condition itself. This planner helps you think through both areas activity by activity, gather evidence, and prepare for assessment.",
    },
    {
      id: "eligibility",
      kind: "eligibility",
      title: "Eligibility",
      summary: "Check the basics before you start a claim.",
      bullets: [
        "Aged 16 or over and under State Pension age",
        "Difficulties have lasted 3 months and are expected to continue for at least 9 more (unless terminally ill)",
        "Met UK residence and presence conditions",
      ],
    },
    {
      id: "daily-living",
      kind: "preparation",
      title: "Daily living — think through each activity",
      summary: "For each activity, note what you struggle with, on both good and bad days.",
      tasks: [
        { id: "dl-food", label: "Preparing food and drink" },
        { id: "dl-eating", label: "Taking nutrition (eating and drinking)" },
        { id: "dl-meds", label: "Managing treatments/medication" },
        { id: "dl-wash", label: "Washing and bathing" },
        { id: "dl-toilet", label: "Managing toilet needs or incontinence" },
        { id: "dl-dress", label: "Dressing and undressing" },
        { id: "dl-communicate", label: "Communicating verbally" },
        { id: "dl-read", label: "Reading and understanding signs, symbols and words" },
        { id: "dl-social", label: "Engaging with other people face to face" },
        { id: "dl-budget", label: "Making budgeting decisions" },
      ],
    },
    {
      id: "mobility",
      kind: "preparation",
      title: "Mobility — think through each activity",
      tasks: [
        { id: "mob-plan", label: "Planning and following journeys" },
        { id: "mob-move", label: "Moving around (how far, with or without aids)" },
      ],
    },
    {
      id: "evidence",
      kind: "evidence",
      title: "Evidence",
      summary: "Evidence that describes real, specific effects is stronger than a general statement.",
      bullets: [
        "Letters or reports from GPs, consultants, therapists or other professionals",
        "A short diary of a typical week, including bad days",
        "Medication lists and any side effects that affect you",
        "Statements from carers, family or friends who see your day-to-day difficulties",
      ],
    },
    {
      id: "assessment-prep",
      kind: "preparation",
      title: "Assessment preparation",
      bullets: [
        "Re-read your PIP2 form answers before the assessment",
        "Have your evidence to hand (paper or digital)",
        "If a companion is attending with you, agree beforehand what they may add",
        "Note down your worst days as well as your typical days — assessors are meant to consider both",
      ],
    },
    {
      id: "documents",
      kind: "documents",
      title: "Documents",
      summary: "Keep track of forms and letters as they arrive — this section is your personal record, not a submission to DWP.",
    },
    {
      id: "timeline",
      kind: "timeline",
      title: "Timeline",
      summary: "Track your own key dates: when you applied, assessment date, decision date, and any deadlines for review or appeal.",
    },
    {
      id: "decision",
      kind: "next-steps",
      title: "Decision",
      bullets: [
        "Read the decision letter carefully — it should explain which points were awarded for which activities",
        "If you disagree, you can usually ask for a Mandatory Reconsideration within one month of the decision",
      ],
    },
    {
      id: "challenge",
      kind: "next-steps",
      title: "Review and challenge",
      bullets: [
        "Mandatory Reconsideration: ask DWP to look again, ideally with any extra evidence",
        "Appeal: if you disagree with the Mandatory Reconsideration outcome, you can appeal to an independent tribunal",
        "Keep copies of everything you send and the dates you sent them",
      ],
    },
  ],
  sources: [
    { title: SOURCES.pipRates2026.title, url: SOURCES.pipRates2026.url, publisher: SOURCES.pipRates2026.publisher, jurisdiction: "UK", dateChecked: SOURCES.pipRates2026.dateChecked },
    { title: SOURCES.pipPointsSystem.title, url: SOURCES.pipPointsSystem.url, publisher: SOURCES.pipPointsSystem.publisher, jurisdiction: "UK", dateChecked: SOURCES.pipPointsSystem.dateChecked },
  ],
  disclaimer:
    "This planner is for personal organisation only. It doesn't submit anything to DWP, and it can't predict your assessment outcome. Never exaggerate symptoms or fabricate evidence — describe your difficulties accurately.",
};
