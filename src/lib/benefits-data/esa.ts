import type { BenefitInfo } from "./types";
import { SOURCES } from "@/lib/sources";

export const esa: BenefitInfo = {
  slug: "esa",
  name: "Employment and Support Allowance (ESA)",
  standfirst: "Support if a health condition or disability limits your ability to work — most new claims are for 'New Style' ESA, based on National Insurance contributions rather than income.",
  sections: [
    {
      heading: "Who it's for",
      body: [
        "New Style ESA isn't means-tested and doesn't depend on a partner's income or most household savings — but it does depend on your own National Insurance contribution record over the last 2-3 tax years.",
      ],
      bullets: [
        "A health condition or disability affects how much you can work",
        "You're under State Pension age",
        "You've paid enough Class 1 or Class 2 National Insurance contributions in the relevant tax years",
      ],
    },
    {
      heading: "What you may get (2026/27 rates)",
      body: [
        "The first 13 weeks are an 'assessment phase' at a lower rate, while your capability for work is assessed. After that, the 'main phase' rate applies, with an extra component depending on which group you're placed in.",
      ],
      bullets: [
        "Assessment phase, under 25: £75.65 a week",
        "Assessment phase, 25 or over: £95.55 a week",
        "Main phase personal allowance (any age once in main phase): £95.55 a week",
        "Plus Work-Related Activity Component: £37.95 a week, or Support Component: £50.35 a week",
      ],
    },
    {
      heading: "How it interacts with Universal Credit",
      body: [
        "You can claim New Style ESA on its own, or alongside Universal Credit — in that case, your ESA is deducted in full from your Universal Credit payment, but claiming both can still help protect your National Insurance record.",
      ],
    },
  ],
  sources: [SOURCES.esa2026],
};
