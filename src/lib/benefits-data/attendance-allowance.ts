import type { BenefitInfo } from "./types";
import { SOURCES } from "@/lib/sources";

export const attendanceAllowance: BenefitInfo = {
  slug: "attendance-allowance",
  name: "Attendance Allowance",
  standfirst: "Support for people over State Pension age who need help with personal care or supervision because of a physical or mental disability.",
  jurisdictionNote: "If you live in Scotland, Pension Age Disability Payment now replaces Attendance Allowance for new claims.",
  sections: [
    {
      heading: "Who it's for",
      body: [
        "Attendance Allowance is not means-tested — it doesn't depend on income or savings, and you don't need to already have a carer in place to qualify. It's based on the level of care or supervision you need, not what you currently receive.",
      ],
      bullets: [
        "You're over State Pension age",
        "You have a physical or mental disability severe enough that you need help with personal care, or supervision to keep you safe",
        "You've needed that help for at least 6 months (unless you're terminally ill, when this waiting period doesn't apply)",
      ],
    },
    {
      heading: "What you may get (2026/27 rates)",
      body: ["Rates rose 3.8% from April 2026."],
      bullets: [
        "Lower rate (day OR night care needed): £76.70 a week",
        "Higher rate (day AND night care needed, or terminally ill): £114.60 a week",
      ],
    },
    {
      heading: "Why it's worth claiming",
      body: [
        "Getting Attendance Allowance can also unlock extra amounts in Pension Credit, Housing Benefit, and Council Tax Reduction, even though it isn't means-tested itself.",
      ],
    },
  ],
  sources: [SOURCES.attendanceAllowance2026],
};
