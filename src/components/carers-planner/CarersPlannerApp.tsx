"use client";

import { useEffect, useMemo, useState } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { SourceCard } from "@/components/ui/SourceCard";
import { ReadinessGauge } from "@/components/planner/ReadinessGauge";
import { carersSupportPlanner } from "@/lib/planner-data/carers-support";
import { loadPlannerProgress, savePlannerProgress } from "@/lib/persistence";
import type { PlannerProgress } from "@/lib/planner/types";
import { CARERS_CHECKLIST_ITEMS, CARERS_WEEKLY_EARNINGS_LIMIT } from "@/lib/carers-evidence/types";
import type { CarersEvidenceData } from "@/lib/carers-evidence/types";
import { loadCarersData, saveCarersData, clearCarersData } from "@/lib/carers-evidence/storage";
import { computeCarersReadiness } from "@/lib/carers-evidence/readiness";
import { buildCarersEvidencePackSections } from "@/lib/carers-evidence/evidence-pack";
import { listEvidenceFiles, clearPlannerEvidenceAndVoice } from "@/lib/planner-evidence/storage";
import type { EvidenceFileMeta } from "@/lib/planner-evidence/types";

import { RecordListEditor, type StoredRecord } from "@/components/pip-planner/RecordListEditor";
import { EvidenceVaultSection } from "@/components/pip-planner/EvidenceVaultSection";
import { SettingsSection } from "@/components/pip-planner/SettingsSection";
import { EvidencePackSection } from "@/components/pip-planner/EvidencePackSection";

const SLUG = "carers-support";
const TABS = ["Overview", "Caring situation", "Hours log", "Earnings log", "Evidence vault", "Checklist", "Evidence pack", "Settings"] as const;
type Tab = (typeof TABS)[number];

export function CarersPlannerApp() {
  const [data, setData] = useState<CarersEvidenceData | null>(null);
  const [checklistProgress, setChecklistProgress] = useState<PlannerProgress | null>(null);
  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFileMeta[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional post-mount hydration from localStorage/IndexedDB (unavailable during SSR)
    setData(loadCarersData());
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see above
    setChecklistProgress(loadPlannerProgress(SLUG));
    listEvidenceFiles(SLUG).then(setEvidenceFiles);
  }, []);

  function updateData(patch: Partial<CarersEvidenceData>) {
    setData((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      saveCarersData(next);
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
    const done = CARERS_CHECKLIST_ITEMS.filter((item) => checklistProgress.completedTaskIds.includes(item.id)).length;
    return Math.round((done / CARERS_CHECKLIST_ITEMS.length) * 100);
  }, [checklistProgress]);

  const readiness = useMemo(() => {
    if (!data) return 0;
    return computeCarersReadiness({ data, checklistPercent, evidenceFileCount: evidenceFiles.length });
  }, [data, checklistPercent, evidenceFiles.length]);

  async function refreshEvidenceFiles() {
    setEvidenceFiles(await listEvidenceFiles(SLUG));
  }

  if (!data || !checklistProgress) {
    return (
      <div>
        <PageHero eyebrow="Planner" title={carersSupportPlanner.title} standfirst={carersSupportPlanner.standfirst} />
        <Container className="py-12">
          <p className="text-sm text-slate">Loading…</p>
        </Container>
      </div>
    );
  }

  const latestEarnings = data.earningsLog[0]?.amount;

  return (
    <div>
      <PageHero eyebrow="Planner" title={carersSupportPlanner.title} standfirst={carersSupportPlanner.standfirst}>
        <div className="mt-6 flex flex-wrap gap-2">
          {carersSupportPlanner.journeyStages.map((stage) => (
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
              {carersSupportPlanner.sections
                .filter((s) => ["overview", "eligibility", "changes", "support"].includes(s.id))
                .map((section) => (
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
              <Disclaimer text={carersSupportPlanner.disclaimer} />
              <div>
                <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">Official sources</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {carersSupportPlanner.sources.map((source) => (
                    <SourceCard key={source.url} source={source} />
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "Caring situation" && (
            <Card>
              <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">Caring situation</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-navy-deep">Who you care for</label>
                  <input
                    type="text"
                    value={data.situation.personCaredFor ?? ""}
                    onChange={(e) => updateData({ situation: { ...data.situation, personCaredFor: e.target.value } })}
                    className="focus-ring w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy-deep"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-navy-deep">Relationship</label>
                  <input
                    type="text"
                    value={data.situation.relationship ?? ""}
                    onChange={(e) => updateData({ situation: { ...data.situation, relationship: e.target.value } })}
                    className="focus-ring w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy-deep"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-navy-deep">Their condition</label>
                  <input
                    type="text"
                    value={data.situation.condition ?? ""}
                    onChange={(e) => updateData({ situation: { ...data.situation, condition: e.target.value } })}
                    className="focus-ring w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy-deep"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label className="mb-1 block text-xs font-medium text-navy-deep">Notes</label>
                  <textarea
                    value={data.situation.notes ?? ""}
                    onChange={(e) => updateData({ situation: { ...data.situation, notes: e.target.value } })}
                    rows={3}
                    className="focus-ring w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy-deep"
                  />
                </div>
              </div>
            </Card>
          )}

          {activeTab === "Hours log" && (
            <RecordListEditor
              title="Caring hours log"
              description="Carer's Allowance generally needs at least 35 hours a week."
              fields={[
                { key: "weekStarting", label: "Week starting", type: "date", required: true },
                { key: "hours", label: "Hours that week", type: "number", required: true },
                { key: "tasksHelped", label: "What you helped with", type: "textarea" },
              ]}
              records={data.hoursLog as unknown as StoredRecord[]}
              onChange={(records) => updateData({ hoursLog: records as unknown as CarersEvidenceData["hoursLog"] })}
              summaryFields={["weekStarting", "hours"]}
              emptyMessage="No weeks logged yet."
            />
          )}

          {activeTab === "Earnings log" && (
            <>
              <Card className="border-l-4 !border-l-gold">
                <p className="text-sm text-navy-deep">
                  Weekly earnings limit: <strong>£{CARERS_WEEKLY_EARNINGS_LIMIT}</strong> (after allowable deductions).
                  {latestEarnings && (
                    <>
                      {" "}
                      Your latest logged earnings: <strong>£{latestEarnings}</strong>
                      {Number(latestEarnings) > CARERS_WEEKLY_EARNINGS_LIMIT
                        ? " — this is above the limit; check how this affects your award."
                        : " — currently under the limit."}
                    </>
                  )}
                </p>
              </Card>
              <RecordListEditor
                title="Earnings log"
                fields={[
                  { key: "date", label: "Week/date", type: "date", required: true },
                  { key: "amount", label: "Net earnings (£)", type: "number", required: true },
                  { key: "notes", label: "Notes", type: "text" },
                ]}
                records={data.earningsLog as unknown as StoredRecord[]}
                onChange={(records) => updateData({ earningsLog: records as unknown as CarersEvidenceData["earningsLog"] })}
                summaryFields={["date", "amount"]}
                emptyMessage="No earnings logged yet."
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
                {CARERS_CHECKLIST_ITEMS.map((item) => {
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
              plannerLabel="Carer's Support Planner"
              sections={buildCarersEvidencePackSections(data)}
              evidenceFiles={evidenceFiles}
              rawData={data}
            />
          )}

          {activeTab === "Settings" && (
            <SettingsSection
              plannerLabel="Carer's Support Planner"
              data={data}
              reminderDate={data.settings.reminderDate}
              reminderNote={data.settings.reminderNote}
              onReminderChange={(reminderDate, reminderNote) => updateData({ settings: { ...data.settings, reminderDate, reminderNote } })}
              onImport={(imported) => {
                setData(imported);
                saveCarersData(imported);
              }}
              onClearAll={async () => {
                clearCarersData();
                await clearPlannerEvidenceAndVoice(SLUG);
                setData(loadCarersData());
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
