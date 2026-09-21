"use client";

import { useEffect, useMemo, useState } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { SourceCard } from "@/components/ui/SourceCard";
import { ReadinessGauge } from "@/components/planner/ReadinessGauge";
import { councilTaxSupportPlanner } from "@/lib/planner-data/council-tax-support";
import { loadPlannerProgress, savePlannerProgress } from "@/lib/persistence";
import type { PlannerProgress } from "@/lib/planner/types";
import { CTS_CHECKLIST_ITEMS } from "@/lib/cts-evidence/types";
import type { CtsEvidenceData } from "@/lib/cts-evidence/types";
import { loadCtsData, saveCtsData, clearCtsData } from "@/lib/cts-evidence/storage";
import { computeCtsReadiness } from "@/lib/cts-evidence/readiness";
import { buildCtsEvidencePackSections } from "@/lib/cts-evidence/evidence-pack";
import { listEvidenceFiles, clearPlannerEvidenceAndVoice } from "@/lib/planner-evidence/storage";
import type { EvidenceFileMeta } from "@/lib/planner-evidence/types";

import { RecordListEditor, type StoredRecord } from "@/components/pip-planner/RecordListEditor";
import { EvidenceVaultSection } from "@/components/pip-planner/EvidenceVaultSection";
import { SettingsSection } from "@/components/pip-planner/SettingsSection";
import { EvidencePackSection } from "@/components/pip-planner/EvidencePackSection";

const SLUG = "council-tax-support";
const TABS = ["Overview", "Household & income", "Evidence vault", "Checklist", "Evidence pack", "Settings"] as const;
type Tab = (typeof TABS)[number];

export function CtsPlannerApp() {
  const [data, setData] = useState<CtsEvidenceData | null>(null);
  const [checklistProgress, setChecklistProgress] = useState<PlannerProgress | null>(null);
  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFileMeta[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional post-mount hydration from localStorage/IndexedDB (unavailable during SSR)
    setData(loadCtsData());
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see above
    setChecklistProgress(loadPlannerProgress(SLUG));
    listEvidenceFiles(SLUG).then(setEvidenceFiles);
  }, []);

  function updateData(patch: Partial<CtsEvidenceData>) {
    setData((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      saveCtsData(next);
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
    const done = CTS_CHECKLIST_ITEMS.filter((item) => checklistProgress.completedTaskIds.includes(item.id)).length;
    return Math.round((done / CTS_CHECKLIST_ITEMS.length) * 100);
  }, [checklistProgress]);

  const readiness = useMemo(() => {
    if (!data) return 0;
    return computeCtsReadiness({ checklistPercent, evidenceFileCount: evidenceFiles.length });
  }, [data, checklistPercent, evidenceFiles.length]);

  async function refreshEvidenceFiles() {
    setEvidenceFiles(await listEvidenceFiles(SLUG));
  }

  if (!data || !checklistProgress) {
    return (
      <div>
        <PageHero eyebrow="Planner" title={councilTaxSupportPlanner.title} standfirst={councilTaxSupportPlanner.standfirst} />
        <Container className="py-12">
          <p className="text-sm text-slate">Loading…</p>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <PageHero eyebrow="Planner" title={councilTaxSupportPlanner.title} standfirst={councilTaxSupportPlanner.standfirst}>
        <div className="mt-6 flex flex-wrap gap-2">
          {councilTaxSupportPlanner.journeyStages.map((stage) => (
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
              {councilTaxSupportPlanner.sections
                .filter((s) => ["overview", "location", "challenge"].includes(s.id))
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
              <Disclaimer text={councilTaxSupportPlanner.disclaimer} />
              <div>
                <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">Official sources</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {councilTaxSupportPlanner.sources.map((source) => (
                    <SourceCard key={source.url} source={source} />
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "Household & income" && (
            <RecordListEditor
              title="Household & income"
              description="Gather the figures most councils ask for — your own council's scheme decides what actually counts."
              fields={[
                { key: "item", label: "Item", type: "text", required: true, placeholder: "e.g. My earnings, Partner's earnings, Savings" },
                { key: "amount", label: "Amount (£)", type: "number" },
                { key: "notes", label: "Notes", type: "text" },
              ]}
              records={data.entries as unknown as StoredRecord[]}
              onChange={(records) => updateData({ entries: records as unknown as CtsEvidenceData["entries"] })}
              summaryFields={["item", "amount"]}
              emptyMessage="Nothing added yet."
            />
          )}

          {activeTab === "Evidence vault" && (
            <EvidenceVaultSection plannerSlug={SLUG} onCountChange={() => refreshEvidenceFiles()} />
          )}

          {activeTab === "Checklist" && (
            <Card>
              <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">Checklist</h2>
              <ul className="mt-4 space-y-2">
                {CTS_CHECKLIST_ITEMS.map((item) => {
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
              plannerLabel="Council Tax Support Planner"
              sections={buildCtsEvidencePackSections(data)}
              evidenceFiles={evidenceFiles}
              rawData={data}
            />
          )}

          {activeTab === "Settings" && (
            <SettingsSection
              plannerLabel="Council Tax Support Planner"
              data={data}
              reminderDate={data.settings.reminderDate}
              reminderNote={data.settings.reminderNote}
              onReminderChange={(reminderDate, reminderNote) => updateData({ settings: { ...data.settings, reminderDate, reminderNote } })}
              onImport={(imported) => {
                setData(imported);
                saveCtsData(imported);
              }}
              onClearAll={async () => {
                clearCtsData();
                await clearPlannerEvidenceAndVoice(SLUG);
                setData(loadCtsData());
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
