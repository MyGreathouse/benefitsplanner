"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { SourceCard } from "@/components/ui/SourceCard";
import { ReadinessGauge } from "@/components/planner/ReadinessGauge";
import { universalCreditPlanner } from "@/lib/planner-data/universal-credit";
import { loadPlannerProgress, savePlannerProgress } from "@/lib/persistence";
import type { PlannerProgress } from "@/lib/planner/types";
import { UC_CHECKLIST_ITEMS } from "@/lib/uc-evidence/types";
import type { UcEvidenceData } from "@/lib/uc-evidence/types";
import { loadUcData, saveUcData, clearUcData } from "@/lib/uc-evidence/storage";
import { computeUcReadiness } from "@/lib/uc-evidence/readiness";
import { buildUcEvidencePackSections } from "@/lib/uc-evidence/evidence-pack";
import { listEvidenceFiles, clearPlannerEvidenceAndVoice } from "@/lib/planner-evidence/storage";
import type { EvidenceFileMeta } from "@/lib/planner-evidence/types";

import { RecordListEditor, type StoredRecord } from "@/components/pip-planner/RecordListEditor";
import { EvidenceVaultSection } from "@/components/pip-planner/EvidenceVaultSection";
import { SettingsSection } from "@/components/pip-planner/SettingsSection";
import { EvidencePackSection } from "@/components/pip-planner/EvidencePackSection";

const SLUG = "universal-credit";
const TABS = ["Overview", "Household", "Income tracker", "Changes log", "Evidence vault", "Checklist", "Evidence pack", "Settings"] as const;
type Tab = (typeof TABS)[number];

export function UcPlannerApp() {
  const [data, setData] = useState<UcEvidenceData | null>(null);
  const [checklistProgress, setChecklistProgress] = useState<PlannerProgress | null>(null);
  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFileMeta[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const formId = useId();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional post-mount hydration from localStorage/IndexedDB (unavailable during SSR)
    setData(loadUcData());
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see above
    setChecklistProgress(loadPlannerProgress(SLUG));
    listEvidenceFiles(SLUG).then(setEvidenceFiles);
  }, []);

  function updateData(patch: Partial<UcEvidenceData>) {
    setData((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      saveUcData(next);
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
    const done = UC_CHECKLIST_ITEMS.filter((item) => checklistProgress.completedTaskIds.includes(item.id)).length;
    return Math.round((done / UC_CHECKLIST_ITEMS.length) * 100);
  }, [checklistProgress]);

  const readiness = useMemo(() => {
    if (!data) return 0;
    return computeUcReadiness({ data, checklistPercent, evidenceFileCount: evidenceFiles.length });
  }, [data, checklistPercent, evidenceFiles.length]);

  async function refreshEvidenceFiles() {
    setEvidenceFiles(await listEvidenceFiles(SLUG));
  }

  if (!data || !checklistProgress) {
    return (
      <div>
        <PageHero eyebrow="Planner" title={universalCreditPlanner.title} standfirst={universalCreditPlanner.standfirst} />
        <Container className="py-12">
          <p className="text-sm text-slate">Loading…</p>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <PageHero eyebrow="Planner" title={universalCreditPlanner.title} standfirst={universalCreditPlanner.standfirst}>
        <div className="mt-6 flex flex-wrap gap-2">
          {universalCreditPlanner.journeyStages.map((stage) => (
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
              aria-pressed={activeTab === tab}
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
              {universalCreditPlanner.sections
                .filter((s) => ["overview", "eligibility", "payments", "changes", "challenge"].includes(s.id))
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
              <Disclaimer text={universalCreditPlanner.disclaimer} />
              <div>
                <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">Official sources</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {universalCreditPlanner.sources.map((source) => (
                    <SourceCard key={source.url} source={source} />
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "Household" && (
            <Card>
              <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">Household</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${formId}-adults`} className="mb-1 block text-xs font-medium text-navy-deep">Adults in household</label>
                  <input
                    id={`${formId}-adults`}
                    type="text"
                    value={data.household.adults ?? ""}
                    onChange={(e) => updateData({ household: { ...data.household, adults: e.target.value } })}
                    className="focus-ring w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy-deep"
                  />
                </div>
                <div>
                  <label htmlFor={`${formId}-children`} className="mb-1 block text-xs font-medium text-navy-deep">Children</label>
                  <input
                    id={`${formId}-children`}
                    type="text"
                    value={data.household.children ?? ""}
                    onChange={(e) => updateData({ household: { ...data.household, children: e.target.value } })}
                    className="focus-ring w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy-deep"
                  />
                </div>
                <div>
                  <label htmlFor={`${formId}-housingTenure`} className="mb-1 block text-xs font-medium text-navy-deep">Housing tenure</label>
                  <input
                    id={`${formId}-housingTenure`}
                    type="text"
                    value={data.household.housingTenure ?? ""}
                    onChange={(e) => updateData({ household: { ...data.household, housingTenure: e.target.value } })}
                    placeholder="Renting / mortgage / living with family"
                    className="focus-ring w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy-deep"
                  />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={`${formId}-notes`} className="mb-1 block text-xs font-medium text-navy-deep">Notes</label>
                  <textarea
                    id={`${formId}-notes`}
                    value={data.household.notes ?? ""}
                    onChange={(e) => updateData({ household: { ...data.household, notes: e.target.value } })}
                    rows={3}
                    className="focus-ring w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy-deep"
                  />
                </div>
              </div>
            </Card>
          )}

          {activeTab === "Income tracker" && (
            <RecordListEditor
              title="Income tracker"
              description="Log each source of income — this feeds your claim and any changes you need to report."
              fields={[
                { key: "date", label: "Date", type: "date", required: true },
                { key: "source", label: "Source", type: "text", required: true },
                { key: "amount", label: "Amount (£)", type: "number", required: true },
                {
                  key: "type",
                  label: "Type",
                  type: "select",
                  options: [
                    { value: "employed", label: "Employed" },
                    { value: "self-employed", label: "Self-employed" },
                    { value: "benefit", label: "Another benefit" },
                    { value: "other", label: "Other" },
                  ],
                  required: true,
                },
              ]}
              records={data.income as unknown as StoredRecord[]}
              onChange={(records) => updateData({ income: records as unknown as UcEvidenceData["income"] })}
              summaryFields={["date", "source", "amount"]}
              emptyMessage="No income entries yet."
            />
          )}

          {activeTab === "Changes log" && (
            <RecordListEditor
              title="Changes of circumstances"
              description="Report changes as soon as they happen — delays can lead to overpayments."
              fields={[
                { key: "date", label: "Date", type: "date", required: true },
                { key: "changeType", label: "Type of change", type: "text", required: true },
                { key: "description", label: "Description", type: "textarea", required: true },
              ]}
              records={data.changes as unknown as StoredRecord[]}
              onChange={(records) => updateData({ changes: records as unknown as UcEvidenceData["changes"] })}
              summaryFields={["date", "changeType"]}
              emptyMessage="No changes logged yet."
            />
          )}

          {activeTab === "Evidence vault" && (
            <EvidenceVaultSection plannerSlug={SLUG} onCountChange={() => refreshEvidenceFiles()} />
          )}

          {activeTab === "Checklist" && (
            <Card>
              <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">Claim checklist</h2>
              <ul className="mt-4 space-y-2">
                {UC_CHECKLIST_ITEMS.map((item) => {
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
              plannerLabel="Universal Credit Planner"
              sections={buildUcEvidencePackSections(data)}
              evidenceFiles={evidenceFiles}
              rawData={data}
            />
          )}

          {activeTab === "Settings" && (
            <SettingsSection
              plannerLabel="Universal Credit Planner"
              data={data}
              reminderDate={data.settings.reminderDate}
              reminderNote={data.settings.reminderNote}
              onReminderChange={(reminderDate, reminderNote) => updateData({ settings: { ...data.settings, reminderDate, reminderNote } })}
              onImport={(imported) => {
                setData(imported);
                saveUcData(imported);
              }}
              onClearAll={async () => {
                clearUcData();
                await clearPlannerEvidenceAndVoice(SLUG);
                setData(loadUcData());
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
