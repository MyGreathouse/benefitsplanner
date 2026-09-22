import type { BenefitInfo } from "./types";
import { SOURCES } from "@/lib/sources";

export const universalCredit: BenefitInfo = {
  slug: "universal-credit",
  name: "Universal Credit",
  standfirst:
    "A monthly payment for people on a low income, out of work, or unable to work, that can include support for housing, children and health conditions.",
  jurisdictionNote:
    "Universal Credit rules are broadly UK-wide, but Scotland offers choices such as fortnightly payments and direct-to-landlord rent payments.",
  sections: [
    {
      heading: "Who it's for",
      body: [
        "Universal Credit is for people on a low income or who are out of work, whether employed, self-employed or unemployed. It replaces six older benefits, including Working Tax Credit, Child Tax Credit, and Housing Benefit, for most new claims.",
      ],
      bullets: [
        "You (and your partner, if you have one) are on a low income or out of work",
        "You're 18 or over (some exceptions from 16 apply)",
        "You're under State Pension age",
        "You and your partner have £16,000 or less in savings and investments combined",
        "You live in the UK",
      ],
    },
    {
      heading: "What you may get (2026/27 rates)",
      body: [
        "Universal Credit is built from a standard allowance plus any extra elements you qualify for, such as help with children, housing costs, disability or caring responsibilities.",
      ],
      bullets: [
        "Single, under 25: £338.58 a month",
        "Single, 25 or over: £424.90 a month",
        "Couple, both under 25: £528.34 a month (joint claim)",
        "Couple, one or both 25 or over: £666.97 a month (joint claim)",
        "These are standard allowance figures only — housing, child, disability and carer elements are added on top where they apply",
      ],
    },
    {
      heading: "Savings and capital",
      body: [
        "If you and your partner have over £16,000 in savings and investments combined, you generally cannot get Universal Credit. Between £6,000 and £16,000, your award is reduced — this is sometimes called the savings taper.",
      ],
    },
    {
      heading: "How it's paid",
      body: [
        "Universal Credit is usually paid monthly in arrears into a bank, building society or credit union account. In Scotland, claimants can choose to be paid twice a month instead.",
      ],
    },
  ],
  sources: [SOURCES.ucRates2026, SOURCES.ucCapital],
  plannerSlug: "universal-credit",
  plannerLabel: "Universal Credit Planner",
  faqs: [
    { question: 'How long does my first Universal Credit payment take?', answer: "Usually about 5 weeks after you apply, covering your first monthly assessment period. If you need money before then, you can ask for an advance, though it's later deducted from your award." },
    { question: "Can I get Universal Credit if I'm working?", answer: 'Yes — Universal Credit is designed to adjust as your earnings change, tapering down gradually rather than stopping the moment you start work.' },
    { question: "What happens to my savings if they're between £6,000 and £16,000?", answer: 'Your award is reduced rather than stopped — this is often called the savings taper.' },
    { question: 'Do I have to pay Universal Credit back?', answer: "No, it's not a loan — but any advance payment you take while waiting for your first payment is deducted from later awards." },
  ],
  seoTitle: 'Universal Credit Calculator & Eligibility Checker UK',
  seoDescription: 'Explore Universal Credit eligibility, payments, income, savings, housing costs and other factors with our UK Universal Credit planner and checker.',
};
