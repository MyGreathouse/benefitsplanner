import type { BenefitInfo } from "./types";
import { SOURCES } from "@/lib/sources";

export const carersAllowance: BenefitInfo = {
  slug: "carers-allowance",
  name: "Carer's Allowance & Support",
  standfirst:
    "Support for people who spend at least 35 hours a week caring for someone with substantial care needs, plus wider carer's support beyond the Allowance itself.",
  jurisdictionNote:
    "If you live in Scotland, you'll usually get Carer Support Payment instead of Carer's Allowance — it has similar aims but is run separately by Social Security Scotland.",
  sections: [
    {
      heading: "Who it's for",
      body: [
        "Carer's Allowance isn't just for people who receive it directly — carers who don't qualify (for example because they're above the earnings limit, or the person they care for doesn't get a qualifying disability benefit) can still find value in wider carer's support: local carer's assessments, respite support, and Carer's Credit for National Insurance protection.",
      ],
      bullets: [
        "You spend at least 35 hours a week caring for someone",
        "The person you care for gets a qualifying disability benefit (such as PIP daily living component, Attendance Allowance, or the middle/highest rate of DLA care)",
        "You're 16 or over and not in full-time education",
        "You earn no more than the weekly earnings limit, after allowable deductions",
      ],
    },
    {
      heading: "What you may get (2026/27 rates)",
      body: [
        "Carer's Allowance is not means-tested against savings, but it is affected by your earnings and by overlapping benefits rules — you may not be paid it in full alongside certain other benefits such as the State Pension.",
      ],
      bullets: [
        "Weekly rate: £86.45",
        "Earnings limit: £204 a week, after allowable deductions such as tax, National Insurance and half of pension contributions",
      ],
    },
    {
      heading: "Beyond the Allowance",
      body: [
        "Local councils in England, Scotland and Wales have a duty to offer carers a carer's assessment, which can lead to practical and respite support regardless of whether you qualify for the Allowance itself.",
      ],
    },
  ],
  sources: [SOURCES.carersAllowance2026],
  plannerSlug: "carers-support",
  plannerLabel: "Carer's Support Planner",
};
