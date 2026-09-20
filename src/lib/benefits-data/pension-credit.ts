import type { BenefitInfo } from "./types";
import { SOURCES } from "@/lib/sources";

export const pensionCredit: BenefitInfo = {
  slug: "pension-credit",
  name: "Pension Credit",
  standfirst: "A means-tested top-up for people over State Pension age on a low income — often worth checking even if you think savings or a partner's income might rule you out.",
  sections: [
    {
      heading: "Who it's for",
      body: [
        "Pension Credit has two parts: Guarantee Credit, which tops up weekly income to a minimum level, and Savings Credit, only available if you (or your partner) reached State Pension age before 6 April 2016.",
      ],
      bullets: [
        "You've reached State Pension age",
        "Your weekly income is below the standard minimum guarantee (or you qualify for extra amounts that raise your applicable threshold)",
        "You live in Great Britain",
      ],
    },
    {
      heading: "What you may get (2026/27 rates)",
      body: [
        "Guarantee Credit tops your income up to the standard minimum guarantee. Extra amounts can raise this further.",
      ],
      bullets: [
        "Standard minimum guarantee, single: £238.00 a week",
        "Standard minimum guarantee, couple: £363.25 a week",
        "Extra amount for severe disability: £86.05 a week (single or one partner qualifying)",
        "Extra amount for caring (Carer Addition): £48.15 a week",
      ],
    },
    {
      heading: "Why it's worth checking even if unsure",
      body: [
        "An estimated one million eligible pensioners don't claim Pension Credit, often assuming modest savings or a partner's income rules them out. It doesn't always. Claiming also acts as a gateway to other help, including Council Tax Reduction, a free TV licence for over-75s, and NHS costs support.",
      ],
    },
  ],
  sources: [SOURCES.pensionCredit2026],
};
