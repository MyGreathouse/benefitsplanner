import type { BenefitInfo } from "./types";
import { SOURCES } from "@/lib/sources";

export const pip: BenefitInfo = {
  slug: "pip",
  name: "Personal Independence Payment (PIP)",
  standfirst:
    "Support for people aged 16 to State Pension age with a long-term physical or mental health condition or disability, and difficulties with daily living and/or getting around.",
  sections: [
    {
      heading: "Who it's for",
      body: [
        "PIP is not means-tested — it doesn't depend on income, savings or whether you work. It's based on how your condition affects you, not the condition itself.",
      ],
      bullets: [
        "You're 16 or over and under State Pension age when you claim",
        "You've had difficulties with daily living and/or mobility for 3 months, and expect them to continue for at least 9 more months",
        "You've been in Great Britain for at least 2 of the last 3 years (residence rules differ for terminal illness claims, which skip the waiting periods)",
      ],
    },
    {
      heading: "How it's assessed: the points system",
      body: [
        "PIP has two components — daily living and mobility. Each is scored separately using a points system across a fixed set of activities (such as preparing food, washing, dressing, communicating, and moving around). You only score the highest-scoring descriptor that applies to you in each activity.",
      ],
      bullets: [
        "8–11 points in a component: standard rate",
        "12 or more points in a component: enhanced rate",
        "Under 8 points in a component: that component isn't awarded",
        "A separate reform proposing a minimum 4-point single-activity threshold for the daily living component has been announced for around November 2026 — check GOV.UK for whether it has come into force",
      ],
    },
    {
      heading: "What you may get (2026/27 rates)",
      body: ["Rates rose 3.8% from April 2026, in line with CPI inflation."],
      bullets: [
        "Daily living, standard rate: £76.70 a week",
        "Daily living, enhanced rate: £114.60 a week",
        "Mobility, standard rate: £30.30 a week",
        "Mobility, enhanced rate: £80.00 a week",
      ],
    },
    {
      heading: "How you're assessed",
      body: [
        "Most people fill in a form describing how their condition affects them day to day, then attend or take part in an assessment (in person, by phone or by video) with an independent health professional. The best evidence is specific: what you can and can't do, on a bad day as well as a good one, and whether you can do it safely, to an acceptable standard, repeatedly, and in a reasonable time.",
      ],
    },
  ],
  sources: [SOURCES.pipRates2026, SOURCES.pipPointsSystem],
  plannerSlug: "pip",
  plannerLabel: "PIP Planner",
  faqs: [
    { question: 'Does PIP stop if I go back to work?', answer: "No — PIP isn't affected by whether you work or how much you earn, since it's based on your care and mobility needs, not your income." },
    { question: 'What if I disagree with my PIP decision?', answer: 'You can usually ask for a Mandatory Reconsideration within one month of the decision, and appeal to an independent tribunal if you still disagree afterwards.' },
    { question: 'Do I need a diagnosis to claim PIP?', answer: 'PIP is assessed on how your condition affects you day to day, not on having a specific diagnosis — though medical evidence still helps support your claim.' },
    { question: 'How long does a PIP claim take?', answer: 'It varies, but it typically involves filling in a form, providing evidence, and attending or taking part in an assessment before a decision is made.' },
  ],
};
