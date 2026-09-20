"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { ReadinessGauge } from "@/components/planner/ReadinessGauge";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { getBenefitBySlug } from "@/lib/benefits-data";
import { loadCheckerResult } from "@/lib/persistence";
import { loadPlannerProgress } from "@/lib/persistence";
import { listEvidenceFiles } from "@/lib/planner-evidence/storage";

import { PIP_ACTIVITIES } from "@/lib/pip-evidence/activities";
import { EVIDENCE_CHECKLIST_ITEMS as PIP_CHECKLIST } from "@/lib/pip-evidence/types";
import { loadPipData } from "@/lib/pip-evidence/storage";
import { computePipReadiness } from "@/lib/pip-evidence/readiness";

import { UC_CHECKLIST_ITEMS } from "@/lib/uc-evidence/types";
import { loadUcData } from "@/lib/uc-evidence/storage";
import { computeUcReadiness } from "@/lib/uc-evidence/readiness";

import { CARERS_CHECKLIST_ITEMS } from "@/lib/carers-evidence/types";
import { loadCarersData } from "@/lib/carers-evidence/storage";
import { computeCarersReadiness } from "@/lib/carers-evidence/readiness";

import { SEND_CHECKLIST_ITEMS } from "@/lib/send-evidence/types";
import { loadSendData } from "@/lib/send-evidence/storage";
import { computeSendReadiness } from "@/lib/send-evidence/readiness";

import { CTS_CHECKLIST_ITEMS } from "@/lib/cts-evidence/types";
import { computeCtsReadiness } from "@/lib/cts-evidence/readiness";

import { CHALLENGE_CHECKLIST_ITEMS } from "@/lib/challenge-evidence/types";
import { loadChallengeData } from "@/lib/challenge-evidence/storage";
import { computeChallengeReadiness } from "@/lib/challenge-evidence/readiness";

import { getAggregatedDeadlines } from "@/lib/deadlines/aggregate";
import { loadDeadlinesData } from "@/lib/deadlines/storage";
import { computeDeadlineStatus } from "@/lib/deadlines/status";

interface PlannerSummary {
  slug: string;
  title: string;
  readiness: number;
  evidenceCount: number;
}

export function DashboardApp() {
  const [summaries, setSummaries] = useState<PlannerSummary[] | null>(null);
  const [totalEvidence, setTotalEvidence] = useState(0);
  const [checkerSignals, setCheckerSignals] = useState<ReturnType<typeof loadCheckerResult>>(null);
  const [deadlineCounts, setDeadlineCounts] = useState({ overdue: 0, dueSoon: 0, upcoming: 0 });

  useEffect(() => {
    async function load() {
      const pipData = loadPipData();
      const pipChecklist = loadPlannerProgress("pip");
      const pipEvidence = await listEvidenceFiles("pip");
      const pipChecklistPercent = Math.round(
        (PIP_CHECKLIST.filter((i) => pipChecklist.completedTaskIds.includes(i.id)).length / PIP_CHECKLIST.length) * 100,
      );
      const pipReadiness = computePipReadiness({ data: pipData, checklistPercent: pipChecklistPercent, evidenceFileCount: pipEvidence.length });

      const ucData = loadUcData();
      const ucChecklist = loadPlannerProgress("universal-credit");
      const ucEvidence = await listEvidenceFiles("universal-credit");
      const ucChecklistPercent = Math.round(
        (UC_CHECKLIST_ITEMS.filter((i) => ucChecklist.completedTaskIds.includes(i.id)).length / UC_CHECKLIST_ITEMS.length) * 100,
      );
      const ucReadiness = computeUcReadiness({ data: ucData, checklistPercent: ucChecklistPercent, evidenceFileCount: ucEvidence.length });

      const carersData = loadCarersData();
      const carersChecklist = loadPlannerProgress("carers-support");
      const carersEvidence = await listEvidenceFiles("carers-support");
      const carersChecklistPercent = Math.round(
        (CARERS_CHECKLIST_ITEMS.filter((i) => carersChecklist.completedTaskIds.includes(i.id)).length / CARERS_CHECKLIST_ITEMS.length) * 100,
      );
      const carersReadiness = computeCarersReadiness({ data: carersData, checklistPercent: carersChecklistPercent, evidenceFileCount: carersEvidence.length });

      const sendData = loadSendData();
      const sendChecklist = loadPlannerProgress("send-ehcp");
      const sendEvidence = await listEvidenceFiles("send-ehcp");
      const sendChecklistPercent = Math.round(
        (SEND_CHECKLIST_ITEMS.filter((i) => sendChecklist.completedTaskIds.includes(i.id)).length / SEND_CHECKLIST_ITEMS.length) * 100,
      );
      const sendReadiness = computeSendReadiness({ data: sendData, checklistPercent: sendChecklistPercent, evidenceFileCount: sendEvidence.length });

      const ctsChecklist = loadPlannerProgress("council-tax-support");
      const ctsEvidence = await listEvidenceFiles("council-tax-support");
      const ctsChecklistPercent = Math.round(
        (CTS_CHECKLIST_ITEMS.filter((i) => ctsChecklist.completedTaskIds.includes(i.id)).length / CTS_CHECKLIST_ITEMS.length) * 100,
      );
      const ctsReadiness = computeCtsReadiness({ checklistPercent: ctsChecklistPercent, evidenceFileCount: ctsEvidence.length });

      const challengeData = loadChallengeData();
      const challengeChecklist = loadPlannerProgress("challenge");
      const challengeEvidence = await listEvidenceFiles("challenge");
      const challengeChecklistPercent = Math.round(
        (CHALLENGE_CHECKLIST_ITEMS.filter((i) => challengeChecklist.completedTaskIds.includes(i.id)).length / CHALLENGE_CHECKLIST_ITEMS.length) * 100,
      );
      const challengeReadiness = computeChallengeReadiness({ data: challengeData, checklistPercent: challengeChecklistPercent, evidenceFileCount: challengeEvidence.length });

      const allSummaries: PlannerSummary[] = [
        { slug: "pip", title: "PIP Planner", readiness: pipReadiness, evidenceCount: pipEvidence.length },
        { slug: "universal-credit", title: "Universal Credit Planner", readiness: ucReadiness, evidenceCount: ucEvidence.length },
        { slug: "carers-support", title: "Carer's Support Planner", readiness: carersReadiness, evidenceCount: carersEvidence.length },
        { slug: "send-ehcp", title: "SEND & EHCP Planner", readiness: sendReadiness, evidenceCount: sendEvidence.length },
        { slug: "council-tax-support", title: "Council Tax Support Planner", readiness: ctsReadiness, evidenceCount: ctsEvidence.length },
        { slug: "challenge", title: "Challenge Planner", readiness: challengeReadiness, evidenceCount: challengeEvidence.length },
      ];

      const total = allSummaries.reduce((sum, s) => sum + s.evidenceCount, 0);

      const manualDeadlines = loadDeadlinesData().entries;
      const aggregated = getAggregatedDeadlines();
      let overdue = 0;
      let dueSoon = 0;
      let upcoming = 0;
      manualDeadlines.forEach((d) => {
        const status = computeDeadlineStatus(d.date, d.completed);
        if (status === "overdue") overdue++;
        else if (status === "due-soon") dueSoon++;
        else if (status === "upcoming") upcoming++;
      });
      aggregated.forEach((d) => {
        const status = computeDeadlineStatus(d.date, false);
        if (status === "overdue") overdue++;
        else if (status === "due-soon") dueSoon++;
        else if (status === "upcoming") upcoming++;
      });

      setSummaries(allSummaries);
      setTotalEvidence(total);
      setCheckerSignals(loadCheckerResult());
      setDeadlineCounts({ overdue, dueSoon, upcoming });
    }
    load();
  }, []);

  const topPlanners = useMemo(() => {
    if (!summaries) return [];
    return [...summaries].sort((a, b) => a.readiness - b.readiness);
  }, [summaries]);

  return (
    <div>
      <PageHero
        eyebrow="Your account"
        title="My Benefits Dashboard"
        standfirst="Pick up exactly where you left off — across your eligibility check, every planner, and your deadlines."
      />

      <Container className="py-12">
        <div className="grid gap-6 lg:grid-cols-3">
          <Card className="lg:col-span-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate">Evidence gathered</p>
            <p className="mt-2 font-display text-3xl font-semibold text-navy-deep">{totalEvidence}</p>
            <p className="mt-1 text-sm text-slate">files across all planners</p>
          </Card>
          <Card className="lg:col-span-2">
            <p className="text-xs font-semibold uppercase tracking-wide text-slate">Deadlines</p>
            <div className="mt-3 flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <StatusBadge status="overdue" />
                <span className="text-sm text-navy-deep">{deadlineCounts.overdue}</span>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status="due-soon" />
                <span className="text-sm text-navy-deep">{deadlineCounts.dueSoon}</span>
              </div>
              <div className="flex items-center gap-2">
                <StatusBadge status="upcoming" />
                <span className="text-sm text-navy-deep">{deadlineCounts.upcoming}</span>
              </div>
            </div>
            <LinkButton href="/tools/deadline-planner" variant="secondary" size="md" className="mt-4">
              Open Deadline &amp; Review Planner
            </LinkButton>
          </Card>
        </div>

        {checkerSignals && checkerSignals.signals.length > 0 && (
          <div className="mt-10">
            <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">
              From your eligibility check
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {checkerSignals.signals.map((signal) => {
                const benefit = getBenefitBySlug(signal.benefitSlug);
                if (!benefit) return null;
                return (
                  <Card key={signal.benefitSlug} className="flex items-center justify-between">
                    <span className="text-sm font-medium text-navy-deep">{benefit.name}</span>
                    <LinkButton href={`/benefits/${benefit.slug}`} variant="ghost" size="md">
                      View
                    </LinkButton>
                  </Card>
                );
              })}
            </div>
          </div>
        )}

        <div className="mt-10">
          <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">Your planners</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {topPlanners.map((p) => (
              <Card key={p.slug}>
                <div className="flex items-center justify-between gap-3">
                  <h3 className="font-display text-base font-semibold text-navy-deep">{p.title}</h3>
                  <span className="text-xs text-slate">{p.evidenceCount} evidence item{p.evidenceCount === 1 ? "" : "s"}</span>
                </div>
                <div className="mt-4">
                  <ReadinessGauge percent={p.readiness} />
                </div>
                <LinkButton href={`/planners/${p.slug}`} variant="secondary" size="md" className="mt-4">
                  Continue
                </LinkButton>
              </Card>
            ))}
          </div>
        </div>
      </Container>
    </div>
  );
}
