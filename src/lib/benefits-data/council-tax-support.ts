import type { BenefitInfo } from "./types";
import { SOURCES } from "@/lib/sources";

export const councilTaxSupport: BenefitInfo = {
  slug: "council-tax-support",
  name: "Council Tax Reduction & Support",
  standfirst:
    "Help towards your Council Tax bill if you're on a low income or claiming benefits — but the amount and the rules depend entirely on where you live.",
  jurisdictionNote:
    "Council Tax Reduction is set locally. Every council in England runs its own scheme with its own rules; Scotland and Wales each run a single national scheme (CTR) that all councils there follow.",
  sections: [
    {
      heading: "Who it's for",
      body: [
        "There's no single UK-wide answer to 'do I qualify' for Council Tax Reduction — it depends on your local authority's scheme, your income, savings, household, and who else lives with you. This page can only give general pointers; your council's own scheme is the authoritative source.",
      ],
      bullets: [
        "You're liable to pay Council Tax on your home",
        "You're on a low income, or receiving certain other benefits",
        "Your savings are under the limit your council's scheme sets (often £16,000, but this varies)",
        "Working-age and pension-age claimants are often assessed under different rules within the same council",
      ],
    },
    {
      heading: "What to do next",
      body: [
        "Search 'Council Tax Reduction' plus your council's name on GOV.UK, or contact your local authority directly, to find the specific scheme that applies to your address. This planner will help you gather what most councils ask for, regardless of the exact scheme.",
      ],
    },
  ],
  sources: [SOURCES.councilTaxSupport],
  plannerSlug: "council-tax-support",
  plannerLabel: "Council Tax Support Planner",
};
