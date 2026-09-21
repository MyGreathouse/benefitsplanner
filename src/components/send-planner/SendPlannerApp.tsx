"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { SourceCard } from "@/components/ui/SourceCard";
import { ReadinessGauge } from "@/components/planner/ReadinessGauge";
import { sendEhcpPlanner } from "@/lib/planner-data/send-ehcp";
import { loadPlannerProgress, savePlannerProgress } from "@/lib/persistence";
import type { PlannerProgress } from "@/lib/planner/types";
import { SEND_CHECKLIST_ITEMS, SEND_NEEDS_PROMPTS } from "@/lib/send-evidence/types";
import type { SendEvidenceData } from "@/lib/send-evidence/types";
import { loadSendData, saveSendData, clearSendData } from "@/lib/send-evidence/storage";
import { computeSendReadiness } from "@/lib/send-evidence/readiness";
import { buildSendEvidencePackSections } from "@/lib/send-evidence/evidence-pack";
import { listEvidenceFiles, clearPlannerEvidenceAndVoice } from "@/lib/planner-evidence/storage";
import type { EvidenceFileMeta } from "@/lib/planner-evidence/types";

import { RecordListEditor, type StoredRecord } from "@/components/pip-planner/RecordListEditor";
import { PromptNotesEditor } from "@/components/pip-planner/PromptNotesEditor";
import { EvidenceVaultSection } from "@/components/pip-planner/EvidenceVaultSection";
import { SettingsSection } from "@/components/pip-planner/SettingsSection";
import { EvidencePackSection } from "@/components/pip-planner/EvidencePackSection";

const SLUG = "send-ehcp";
const TABS = ["Overview", "Child profile", "Needs & strengths", "Meetings", "Timeline", "Evidence vault", "Checklist", "Evidence pack", "Settings"] as const;
type Tab = (typeof TABS)[number];

export function SendPlannerApp() {
  const [data, setData] = useState<SendEvidenceData | null>(null);
  const [checklistProgress, setChecklistProgress] = useState<PlannerProgress | null>(null);
  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFileMeta[]>([]);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");
  const formId = useId();

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional post-mount hydration from localStorage/IndexedDB (unavailable during SSR)
    setData(loadSendData());
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see above
    setChecklistProgress(loadPlannerProgress(SLUG));
    listEvidenceFiles(SLUG).then(setEvidenceFiles);
  }, []);

  function updateData(patch: Partial<SendEvidenceData>) {
    setData((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      saveSendData(next);
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
    const done = SEND_CHECKLIST_ITEMS.filter((item) => checklistProgress.completedTaskIds.includes(item.id)).length;
    return Math.round((done / SEND_CHECKLIST_ITEMS.length) * 100);
  }, [checklistProgress]);

  const readiness = useMemo(() => {
    if (!data) return 0;
    return computeSendReadiness({ data, checklistPercent, evidenceFileCount: evidenceFiles.length });
  }, [data, checklistPercent, evidenceFiles.length]);

  async function refreshEvidenceFiles() {
    setEvidenceFiles(await listEvidenceFiles(SLUG));
  }

  if (!data || !checklistProgress) {
    return (
      <div>
        <PageHero eyebrow="Planner" title={sendEhcpPlanner.title} standfirst={sendEhcpPlanner.standfirst} />
        <Container className="py-12">
          <p className="text-sm text-slate">Loading…</p>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <PageHero eyebrow="Planner" title={sendEhcpPlanner.title} standfirst={sendEhcpPlanner.standfirst}>
        <div className="mt-6 flex flex-wrap gap-2">
          {sendEhcpPlanner.journeyStages.map((stage) => (
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
              {sendEhcpPlanner.sections
                .filter((s) => ["overview", "concern", "assessment", "challenge"].includes(s.id))
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
              <Disclaimer text={sendEhcpPlanner.disclaimer} />
              <div>
                <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">Official sources</h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {sendEhcpPlanner.sources.map((source) => (
                    <SourceCard key={source.url} source={source} />
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "Child profile" && (
            <Card>
              <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">Child profile</h2>
              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${formId}-childName`} className="mb-1 block text-xs font-medium text-navy-deep">Child&rsquo;s name</label>
                  <input
                    id={`${formId}-childName`}
                    type="text"
                    value={data.child.childName ?? ""}
                    onChange={(e) => updateData({ child: { ...data.child, childName: e.target.value } })}
                    className="focus-ring w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy-deep"
                  />
                </div>
                <div>
                  <label htmlFor={`${formId}-dateOfBirth`} className="mb-1 block text-xs font-medium text-navy-deep">Date of birth</label>
                  <input
                    id={`${formId}-dateOfBirth`}
                    type="date"
                    value={data.child.dateOfBirth ?? ""}
                    onChange={(e) => updateData({ child: { ...data.child, dateOfBirth: e.target.value } })}
                    className="focus-ring w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy-deep"
                  />
                </div>
                <div>
                  <label htmlFor={`${formId}-school`} className="mb-1 block text-xs font-medium text-navy-deep">School</label>
                  <input
                    id={`${formId}-school`}
                    type="text"
                    value={data.child.school ?? ""}
                    onChange={(e) => updateData({ child: { ...data.child, school: e.target.value } })}
                    className="focus-ring w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy-deep"
                  />
                </div>
                <div>
                  <label htmlFor={`${formId}-sencoName`} className="mb-1 block text-xs font-medium text-navy-deep">SENCO name</label>
                  <input
                    id={`${formId}-sencoName`}
                    type="text"
                    value={data.child.sencoName ?? ""}
                    onChange={(e) => updateData({ child: { ...data.child, sencoName: e.target.value } })}
                    className="focus-ring w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy-deep"
                  />
                </div>
              </div>
            </Card>
          )}

          {activeTab === "Needs & strengths" && (
            <PromptNotesEditor
              title="Needs and strengths"
              description="This becomes the backbone of your evidence for a needs assessment request."
              prompts={SEND_NEEDS_PROMPTS}
              notes={data.needsNotes}
              onChange={(needsNotes) => updateData({ needsNotes })}
            />
          )}

          {activeTab === "Meetings" && (
            <RecordListEditor
              title="Meetings & correspondence"
              fields={[
                { key: "date", label: "Date", type: "date", required: true },
                { key: "withWhom", label: "With whom", type: "text", required: true },
                { key: "summary", label: "Summary", type: "textarea", required: true },
              ]}
              records={data.meetings as unknown as StoredRecord[]}
              onChange={(records) => updateData({ meetings: records as unknown as SendEvidenceData["meetings"] })}
              summaryFields={["date", "withWhom"]}
              emptyMessage="No meetings logged yet."
            />
          )}

          {activeTab === "Timeline" && (
            <RecordListEditor
              title="Timeline"
              description="Track dates against the request → assessment → draft plan → final plan → annual review journey."
              fields={[
                { key: "date", label: "Date", type: "date", required: true },
                { key: "label", label: "What", type: "text", required: true },
                { key: "type", label: "Stage", type: "text" },
              ]}
              records={data.timeline as unknown as StoredRecord[]}
              onChange={(records) => updateData({ timeline: records as unknown as SendEvidenceData["timeline"] })}
              summaryFields={["date", "label"]}
              emptyMessage="No dates added yet."
            />
          )}

          {activeTab === "Evidence vault" && (
            <EvidenceVaultSection plannerSlug={SLUG} onCountChange={() => refreshEvidenceFiles()} />
          )}

          {activeTab === "Checklist" && (
            <Card>
              <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">Checklist</h2>
              <ul className="mt-4 space-y-2">
                {SEND_CHECKLIST_ITEMS.map((item) => {
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
              plannerLabel="SEND & EHCP Planner"
              sections={buildSendEvidencePackSections(data)}
              evidenceFiles={evidenceFiles}
              rawData={data}
            />
          )}

          {activeTab === "Settings" && (
            <SettingsSection
              plannerLabel="SEND & EHCP Planner"
              data={data}
              reminderDate={data.settings.reminderDate}
              reminderNote={data.settings.reminderNote}
              onReminderChange={(reminderDate, reminderNote) => updateData({ settings: { ...data.settings, reminderDate, reminderNote } })}
              onImport={(imported) => {
                setData(imported);
                saveSendData(imported);
              }}
              onClearAll={async () => {
                clearSendData();
                await clearPlannerEvidenceAndVoice(SLUG);
                setData(loadSendData());
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
