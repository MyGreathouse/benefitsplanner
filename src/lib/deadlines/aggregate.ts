import type { AggregatedDeadline } from "./types";
import { addMonths } from "./status";
import { loadPipData } from "@/lib/pip-evidence/storage";
import { loadSendData } from "@/lib/send-evidence/storage";
import { loadChallengeData } from "@/lib/challenge-evidence/storage";

export function getAggregatedDeadlines(): AggregatedDeadline[] {
  const result: AggregatedDeadline[] = [];

  const pip = loadPipData();
  for (const t of pip.timeline) {
    result.push({ date: t.date, label: t.label, source: "PIP Planner", href: "/planners/pip" });
  }
  for (const a of pip.appointments) {
    result.push({
      date: a.date,
      label: `Appointment — ${a.professional}`,
      source: "PIP Planner",
      href: "/planners/pip",
    });
  }

  const send = loadSendData();
  for (const t of send.timeline) {
    result.push({ date: t.date, label: t.label, source: "SEND & EHCP Planner", href: "/planners/send-ehcp" });
  }
  for (const m of send.meetings) {
    result.push({
      date: m.date,
      label: `Meeting — ${m.withWhom}`,
      source: "SEND & EHCP Planner",
      href: "/planners/send-ehcp",
    });
  }

  const challenge = loadChallengeData();
  for (const d of challenge.decisions) {
    if (!d.mrOutcomeDate) {
      result.push({
        date: addMonths(d.decisionDate, 1),
        label: `Mandatory Reconsideration deadline — ${d.benefit}`,
        source: "Challenge Planner",
        href: "/planners/challenge",
      });
    }
    if (d.mrOutcomeDate && !d.appealSubmittedDate) {
      result.push({
        date: addMonths(d.mrOutcomeDate, 1),
        label: `Appeal deadline — ${d.benefit}`,
        source: "Challenge Planner",
        href: "/planners/challenge",
      });
    }
  }

  return result.sort((a, b) => a.date.localeCompare(b.date));
}
