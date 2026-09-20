import type { PlannerConfig } from "@/lib/planner/types";
import { SOURCES } from "@/lib/sources";

export const sendEhcpPlanner: PlannerConfig = {
  slug: "send-ehcp",
  title: "SEND & EHCP Planner",
  standfirst:
    "Organise a journey from initial concern through to an Education, Health and Care Plan (EHCP) and its annual review — for parents and carers in England.",
  journeyStages: [
    "Concern",
    "Evidence",
    "Request",
    "Assessment",
    "Draft Plan",
    "Final Plan",
    "Annual Review",
    "Challenge",
  ],
  sections: [
    {
      id: "overview",
      kind: "overview",
      title: "Overview",
      summary:
        "An EHCP is a legal document for children and young people (0–25) in England with special educational needs that require more support than schools can normally provide. This planner is general information, not legal advice.",
    },
    {
      id: "concern",
      kind: "eligibility",
      title: "Concern and early support",
      bullets: [
        "Note down specific concerns: what your child finds hard, where, and how often",
        "Ask the school about their SEN support and whether an EHC needs assessment request may be appropriate",
      ],
    },
    {
      id: "evidence",
      kind: "evidence",
      title: "Evidence to gather",
      tasks: [
        { id: "send-school-reports", label: "School reports and SEN support records" },
        { id: "send-professional-reports", label: "Reports from any professionals involved (educational psychologist, SALT, OT, paediatrician)" },
        { id: "send-parent-notes", label: "Your own notes on your child's needs, strengths and daily life" },
        { id: "send-meeting-notes", label: "Notes from meetings with the school or local authority" },
      ],
    },
    {
      id: "request",
      kind: "preparation",
      title: "Requesting an assessment",
      bullets: [
        "Parents, young people (16+) or schools can ask the local authority for an EHC needs assessment",
        "Put the request in writing and keep a copy",
      ],
    },
    {
      id: "assessment",
      kind: "timeline",
      title: "Assessment and decision timescales",
      bullets: [
        "The local authority must decide within 6 weeks whether to carry out an assessment",
        "The overall process, from request to a final plan, is intended to take no more than 20 weeks",
      ],
    },
    {
      id: "draft-plan",
      kind: "preparation",
      title: "Draft plan",
      bullets: [
        "Check the draft plan's description of needs, provision and outcomes matches what you know about your child",
        "You have a right to comment on the draft and request a particular school",
      ],
    },
    {
      id: "final-plan",
      kind: "documents",
      title: "Final plan and provision",
      summary: "Keep the final plan, all correspondence, and any amendments in one place.",
    },
    {
      id: "annual-review",
      kind: "timeline",
      title: "Annual review",
      bullets: [
        "EHCPs must be reviewed at least once a year",
        "Bring updated evidence of progress, and note any changes in needs",
      ],
    },
    {
      id: "challenge",
      kind: "next-steps",
      title: "Disagreement and challenge",
      bullets: [
        "You can ask the local authority to reconsider a decision",
        "You may be able to appeal to the SEND Tribunal if you disagree with the needs, provision, or placement named in a final plan",
        "Mediation is available and, for most types of disagreement, must be considered before an appeal",
      ],
    },
  ],
  sources: [
    { title: SOURCES.sendCode.title, url: SOURCES.sendCode.url, publisher: SOURCES.sendCode.publisher, jurisdiction: "England", dateChecked: SOURCES.sendCode.dateChecked },
  ],
  disclaimer:
    "This planner gives general information about the SEND process in England, not legal advice. Processes and timescales can vary; check with your local authority and, if needed, a SEND specialist.",
};
