import type { BenefitInfo } from "./types";
import { SOURCES } from "@/lib/sources";

export const childBenefit: BenefitInfo = {
  slug: "child-benefit",
  name: "Child Benefit",
  standfirst: "Money for anyone responsible for bringing up a child under 16 (or under 20 if they stay in approved education or training).",
  sections: [
    {
      heading: "Who it's for",
      body: [
        "You don't need to be the child's parent to claim — anyone responsible for bringing up a child can. Only one person can claim Child Benefit for a child.",
      ],
      bullets: [
        "You're responsible for a child under 16, or under 20 if they're in approved education or training",
        "You live in the UK",
        "There's no limit on how many children you can claim for",
      ],
    },
    {
      heading: "What you may get (2026/27 rates)",
      body: ["Rates rose from 6 April 2026."],
      bullets: [
        "Eldest or only child: £27.05 a week (£1,406.60 a year)",
        "Each additional child: £17.90 a week",
      ],
    },
    {
      heading: "The High Income Child Benefit Charge",
      body: [
        "Child Benefit itself isn't means-tested, but if you or your partner have an adjusted net income over £60,000, a tax charge claws some or all of it back. Between £60,000 and £80,000, the charge is 1% of your Child Benefit for every £200 of income over £60,000. Above £80,000, the charge equals the full amount you received.",
        "Some households still choose to claim even if the charge applies, since claiming also protects National Insurance credits that count towards State Pension for the claimant.",
      ],
    },
  ],
  sources: [SOURCES.childBenefit2026],
  faqs: [
    { question: "Should I still claim if I'll have to pay the High Income Child Benefit Charge?", answer: "Many people still do, since claiming protects National Insurance credits that count towards the claimant's State Pension, even if some or all of the payment is later clawed back through tax." },
    { question: 'Can both parents claim Child Benefit for the same child?', answer: 'No — only one person can claim for a child, even in shared care arrangements, so parents usually need to agree who claims.' },
    { question: 'What happens when my child turns 16?', answer: 'Child Benefit can continue if they stay in approved full-time education or training, but stops otherwise.' },
  ],
};
