import type { BenefitInfo } from "./types";
import { SOURCES } from "@/lib/sources";

export const housingSupport: BenefitInfo = {
  slug: "housing-support",
  name: "Housing Support",
  standfirst: "Help with rent or housing costs — for most working-age renters this now comes through Universal Credit rather than a standalone claim.",
  jurisdictionNote: "Local Housing Allowance rates are set per Broad Rental Market Area and vary by location — this page can't give a single UK-wide figure.",
  sections: [
    {
      heading: "Where housing support usually comes from",
      body: [
        "Most working-age renters get help with rent through the housing costs element of Universal Credit, calculated using Local Housing Allowance rates for their area and household size.",
        "Housing Benefit still exists as a standalone benefit mainly for people of State Pension age, or those in supported/temporary accommodation.",
      ],
      bullets: [
        "Renting privately or from a housing association or council",
        "On a low income, or already receiving Universal Credit or other benefits",
        "Local Housing Allowance caps what's covered based on your area and household size, even if your rent is higher",
      ],
    },
    {
      heading: "Other housing-related support",
      body: [
        "Councils can offer Discretionary Housing Payments if your normal housing support doesn't cover your rent and you're struggling — these are short-term and not guaranteed.",
        "Homelessness prevention duties mean councils must offer help and advice if you're at risk of losing your home, regardless of your benefit status.",
      ],
    },
  ],
  sources: [SOURCES.housingSupport],
  faqs: [
    { question: 'Do I need to claim Housing Benefit separately from Universal Credit?', answer: "Usually not — most working-age renters get help with rent through Universal Credit's housing element rather than a standalone Housing Benefit claim." },
    { question: 'What is Local Housing Allowance?', answer: "It's the maximum amount of housing support based on your area and household size — if your rent is higher than this, the difference isn't covered." },
    { question: "What if I can't cover my rent even with housing support?", answer: 'You can ask your council about a Discretionary Housing Payment, though these are short-term and not guaranteed.' },
  ],
};
