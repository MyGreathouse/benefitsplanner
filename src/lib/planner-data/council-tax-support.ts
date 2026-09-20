import type { PlannerConfig } from "@/lib/planner/types";
import { SOURCES } from "@/lib/sources";

export const councilTaxSupportPlanner: PlannerConfig = {
  slug: "council-tax-support",
  title: "Council Tax Support Planner",
  standfirst: "Gather what most councils ask for when you apply for Council Tax Reduction — the exact scheme depends on where you live.",
  journeyStages: ["Location", "Household", "Income", "Council Tax", "Potential Support", "Application"],
  sections: [
    {
      id: "overview",
      kind: "overview",
      title: "Overview",
      summary:
        "Council Tax Reduction schemes are set locally, so this planner focuses on what to gather rather than a fixed set of rules.",
    },
    {
      id: "location",
      kind: "eligibility",
      title: "Find your council's scheme",
      bullets: [
        "Identify your local authority — search '[your council] Council Tax Reduction' on GOV.UK",
        "Check whether you're assessed under working-age or pension-age rules",
      ],
    },
    {
      id: "household-income",
      kind: "preparation",
      title: "Household and income details to gather",
      tasks: [
        { id: "cts-household", label: "Who lives in your household and their ages" },
        { id: "cts-income", label: "Income for you and your partner, if applicable" },
        { id: "cts-benefits", label: "Any benefits you already receive" },
        { id: "cts-savings", label: "Savings and capital" },
        { id: "cts-bill", label: "Your current Council Tax bill" },
      ],
    },
    {
      id: "application",
      kind: "preparation",
      title: "Application preparation",
      bullets: ["Most councils let you apply online", "You'll usually need proof of income and identity"],
    },
    {
      id: "challenge",
      kind: "next-steps",
      title: "If you disagree with a decision",
      bullets: [
        "You can usually ask your council to review its decision",
        "If still unresolved, you may be able to appeal to the Valuation Tribunal (England and Wales) or an equivalent body",
      ],
    },
  ],
  sources: [
    { title: SOURCES.councilTaxSupport.title, url: SOURCES.councilTaxSupport.url, publisher: SOURCES.councilTaxSupport.publisher, jurisdiction: "UK", dateChecked: SOURCES.councilTaxSupport.dateChecked },
  ],
  disclaimer: "Council Tax Reduction rules vary by local authority. This planner gives general pointers only — your council's own scheme is authoritative.",
};
