import type { PlannerConfig } from "@/lib/planner/types";
import { SOURCES } from "@/lib/sources";

export const challengePlanner: PlannerConfig = {
  slug: "challenge",
  title: "Benefits Challenge Planner",
  standfirst: "Prepare a Mandatory Reconsideration or appeal if you disagree with a benefits decision — for any benefit, not just one.",
  journeyStages: [
    "Decision received",
    "Disagree",
    "Evidence",
    "Deadline",
    "Prepare documents",
    "Track progress",
  ],
  sections: [
    {
      id: "overview",
      kind: "overview",
      title: "Overview",
      summary:
        "If you disagree with a decision about any benefit, you almost always need to ask for a Mandatory Reconsideration (MR) before you can appeal. This planner helps you track the process and its deadlines for as many decisions as you need.",
    },
    {
      id: "mr-process",
      kind: "next-steps",
      title: "Mandatory Reconsideration",
      bullets: [
        "You usually have 1 calendar month from the date on your decision letter to ask for a Mandatory Reconsideration",
        "Explain clearly why you think the decision is wrong, and send any new evidence as soon as you can",
        "A late request can still be considered up to 13 months after the decision, if you can show good reason for the delay",
        "You'll be sent an MR notice with the outcome — keep both copies, you'll need one if you go on to appeal",
      ],
    },
    {
      id: "appeal-process",
      kind: "next-steps",
      title: "Appeal to a tribunal",
      bullets: [
        "You must have your Mandatory Reconsideration notice before you can appeal — appeals go to HM Courts & Tribunals Service (HMCTS), independently of DWP or HMRC",
        "Appeals are made on form SSCS1 (SSCS5 for HMRC-administered benefits like Child Benefit), either online or by post",
        "You must attach a copy of your MR notice to the appeal form",
        "Your appeal must normally reach HMCTS within 1 calendar month of the date on the MR notice, with a 13-month absolute limit for late appeals with good reason",
        "You'll be asked whether you want an oral hearing or a decision made on the papers alone — attending in person is generally recommended, especially for disability benefits",
      ],
    },
    {
      id: "challenge",
      kind: "next-steps",
      title: "While you wait",
      bullets: [
        "For ESA specifically, if you were turned down after a medical assessment, you can request to be paid at the basic assessment rate again once your appeal is lodged",
        "Keep proof of postage for anything you send by post",
      ],
    },
  ],
  sources: [SOURCES.mandatoryReconsideration, SOURCES.appealTribunal],
  disclaimer:
    "This planner is for personal organisation only. It doesn't submit anything to DWP, HMRC or HMCTS, and it isn't legal advice — for complex cases, a welfare rights adviser or Citizens Advice can help.",
};
