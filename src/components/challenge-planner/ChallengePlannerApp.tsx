"use client";

import { useEffect, useMemo, useState } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { SourceCard } from "@/components/ui/SourceCard";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { ReadinessGauge } from "@/components/planner/ReadinessGauge";
import { challengePlanner } from "@/lib/planner-data/challenge";
import { loadPlannerProgress, savePlannerProgress } from "@/lib/persistence";
import type { PlannerProgress } from "@/lib/planner/types";
import { CHALLENGE_CHECKLIST_ITEMS } from "@/lib/challenge-evidence/types";
import type { ChallengeEvidenceData } from "@/lib/challenge-evidence/types";
import { loadChallengeData, saveChallengeData, clearChallengeData } from "@/lib/challenge-evidence/storage";
import { computeChallengeReadiness } from "@/lib/challenge-evidence/readiness";
import { buildChallengeEvidencePackSections } from "@/lib/challenge-evidence/evidence-pack";
import { addMonths, computeDeadlineStatus } from "@/lib/deadlines/status";
import { listEvidenceFiles, clearPlannerEvidenceAndVoice } from "@/lib/planner-evidence/storage";
import type { EvidenceFileMeta } from "@/lib/planner-evidence/types";

import { RecordListEditor, type StoredRecord } from "@/components/pip-planner/RecordListEditor";
import { EvidenceVaultSection } from "@/components/pip-planner/EvidenceVaultSection";
import { SettingsSection } from "@/components/pip-planner/SettingsSection";
import { EvidencePackSection } from "@/components/pip-planner/EvidencePackSection";

const SLUG = "challenge";
const TABS = ["Overview", "Decisions & deadlines", "Evidence vault", "Checklist", "Evidence pack", "Settings"] as const;
type Tab = (typeof TABS)[number];

export function ChallengePlannerApp() {
  const [data, setData] = useState<ChallengeEvidenceData | null>(null);
  const [checklistProgress, setChecklistProgress] = useState<PlannerProgress | null>(null);
  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFileMeta[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional post-mount hydration from localStorage/IndexedDB (unavailable during SSR)
    setData(loadChallengeData());
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see above
    setChecklistProgress(loadPlannerProgress(SLUG));
    listEvidenceFiles(SLUG).then(setEvidenceFiles);
  }, []);

  function updateData(patch: Partial<ChallengeEvidenceData>) {
    setData((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      saveChallengeData(next);
      return next;
    });
  }

  function toggleChecklistItem(id: string) {
    setChecklistProgress((prev) => {
      const base: PlannerProgress = prev ?? { slug: SLUG, completedTaskIds: [], notes: {}, updatedAt: new Date().toISOString() };
      const isDone = base.completedTaskIds.includes(id);
      const next: PlannerProgress = {
        ...base,
        completedTaskIds: isDone ? base.completedTaskIds.filter((t) => t !== id) : [...base.completedTaskIds, id],
      };
      savePlannerProgress(next);
      return next;
    });
  }

  const checklistPercent = useMemo(() => {
    if (!checklistProgress) return 0;
    const done = CHALLENGE_CHECKLIST_ITEMS.filter((item) => checklistProgress.completedTaskIds.includes(item.id)).length;
    return Math.round((done / CHALLENGE_CHECKLIST_ITEMS.length) * 100);
  }, [checklistProgress]);

  const readiness = useMemo(() => {
    if (!data) return 0;
    return computeChallengeReadiness({ data, checklistPercent, evidenceFileCount: evidenceFiles.length });
  }, [data, checklistPercent, evidenceFiles.length]);

  async function refreshEvidenceFiles() {
    setEvidenceFiles(await listEvidenceFiles(SLUG));
  }

  if (!data || !checklistProgress) {
    return (
      <div>
        <PageHero eyebrow="Planner" title={challengePlanner.title} standfirst={challengePlanner.standfirst} />
        <Container className="py-12">
          <p className="text-sm text-slate">Loading…</p>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <PageHero eyebrow="Planner" title={challengePlanner.title} standfirst={challengePlanner.standfirst}>
        <div className="mt-6 flex flex-wrap gap-2">
          {challengePlanner.journeyStages.map((stage) => (
            <span key={stage} className="rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium text-white/85">
              {stage}
            </span>
          ))}
        </div>
      </PageHero>

      <Container className="py-12">
        <div className="max-w-3xl">
          <ReadinessGauge percent={readiness} />
        </div>

        <div className="mt-8 -mx-1 flex flex-wrap gap-2 print:hidden">
          {TABS.map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setActiveTab(tab)}
              className={`focus-ring rounded-full px-4 py-2 text-sm font-medium transition-colors ${
                activeTab === tab ? "bg-navy-deep text-white" : "border border-border bg-white text-navy-deep hover:border-navy-deep"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <div className="mt-8 max-w-3xl space-y-8">
          {activeTab === "Overview" && (
            <>
              {challengePlanner.sections.map((section) => (
                <Card key={section.id}>
                  <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">{section.title}</h2>
                  {section.summary && <p className="mt-2 text-sm leading-relaxed text-slate">{section.summary}</p>}
                  {section.bullets && (
                    <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate">
                      {section.bullets.map((b, i) => (
                        <li key={i}>{b}</li>
                      ))}
                    </ul>
                  )}
                </Card>
              ))}
              <Disclaimer text={challengePlanner.disclaimer} />
              <div>
                <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">Official sources</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {challengePlanner.sources.map((source) => (
                    <SourceCard key={source.url} source={source} />
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "Decisions & deadlines" && (
            <>
              {data.decisions.length > 0 && (
                <Card>
                  <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">
                    Deadlines (calculated automatically)
                  </h2>
                  <ul className="mt-4 space-y-2">
                    {data.decisions.map((d) => {
                      const mrDeadline = addMonths(d.decisionDate, 1);
                      const mrStatus = computeDeadlineStatus(mrDeadline, !!d.mrOutcomeDate);
                      const appealDeadline = d.mrOutcomeDate ? addMonths(d.mrOutcomeDate, 1) : undefined;
                      const appealStatus = appealDeadline ? computeDeadlineStatus(appealDeadline, !!d.appealSubmittedDate) : undefined;
                      return (
                        <li key={d.id} className="rounded-lg border border-border p-3 text-sm">
                          <p className="font-medium text-navy-deep">{d.benefit}</p>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className="text-xs text-slate">MR deadline: {mrDeadline}</span>
                            <StatusBadge status={mrStatus} />
                          </div>
                          {appealDeadline && (
                            <div className="mt-2 flex flex-wrap items-center gap-2">
                              <span className="text-xs text-slate">Appeal deadline: {appealDeadline}</span>
                              <StatusBadge status={appealStatus!} />
                            </div>
                          )}
                        </li>
                      );
                    })}
                  </ul>
                </Card>
              )}
              <RecordListEditor
                title="Decisions you're challenging"
                description="Add each decision separately — the Mandatory Reconsideration deadline (1 month from decision) and appeal deadline (1 month from MR outcome) are calculated for you above."
                fields={[
                  { key: "benefit", label: "Which benefit", type: "text", required: true },
                  { key: "decisionDate", label: "Date of decision letter", type: "date", required: true },
                  { key: "disagreeWith", label: "What you disagree with", type: "textarea", required: true },
                  { key: "mrRequestedDate", label: "Date you requested MR (optional)", type: "date" },
                  { key: "mrOutcomeDate", label: "Date MR outcome received (optional)", type: "date" },
                  { key: "appealSubmittedDate", label: "Date appeal submitted (optional)", type: "date" },
                  { key: "notes", label: "Notes", type: "textarea" },
                ]}
                records={data.decisions as unknown as StoredRecord[]}
                onChange={(records) => updateData({ decisions: records as unknown as ChallengeEvidenceData["decisions"] })}
                summaryFields={["benefit", "decisionDate"]}
                emptyMessage="No decisions added yet."
              />
            </>
          )}

          {activeTab === "Evidence vault" && (
            <EvidenceVaultSection plannerSlug={SLUG} onCountChange={() => refreshEvidenceFiles()} />
          )}

          {activeTab === "Checklist" && (
            <Card>
              <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">Checklist</h2>
              <ul className="mt-4 space-y-2">
                {CHALLENGE_CHECKLIST_ITEMS.map((item) => {
                  const checked = checklistProgress.completedTaskIds.includes(item.id);
                  return (
                    <li key={item.id}>
                      <label className="focus-ring flex cursor-pointer items-start gap-3 rounded-lg p-2 hover:bg-off-white">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleChecklistItem(item.id)}
                          className="mt-0.5 h-4 w-4 shrink-0 accent-navy-deep"
                        />
                        <span className={`text-sm ${checked ? "text-slate line-through" : "text-navy-deep"}`}>{item.label}</span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </Card>
          )}

          {activeTab === "Evidence pack" && (
            <EvidencePackSection
              plannerLabel="Challenge Planner"
              sections={buildChallengeEvidencePackSections(data)}
              evidenceFiles={evidenceFiles}
              rawData={data}
            />
          )}

          {activeTab === "Settings" && (
            <SettingsSection
              plannerLabel="Challenge Planner"
              data={data}
              reminderDate={data.settings.reminderDate}
              reminderNote={data.settings.reminderNote}
              onReminderChange={(reminderDate, reminderNote) => updateData({ settings: { ...data.settings, reminderDate, reminderNote } })}
              onImport={(imported) => {
                setData(imported);
                saveChallengeData(imported);
              }}
              onClearAll={async () => {
                clearChallengeData();
                await clearPlannerEvidenceAndVoice(SLUG);
                setData(loadChallengeData());
                refreshEvidenceFiles();
              }}
              evidenceFileCount={evidenceFiles.length}
              voiceNoteCount={0}
            />
          )}
        </div>
      </Container>
    </div>
  );
}
