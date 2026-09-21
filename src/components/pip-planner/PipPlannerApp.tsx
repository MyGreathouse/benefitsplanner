"use client";

import { useEffect, useMemo, useState } from "react";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { SourceCard } from "@/components/ui/SourceCard";
import { ReadinessGauge } from "@/components/planner/ReadinessGauge";
import { pipPlanner } from "@/lib/planner-data/pip";
import { loadPlannerProgress, savePlannerProgress } from "@/lib/persistence";
import type { PlannerProgress } from "@/lib/planner/types";
import { PIP_ACTIVITIES } from "@/lib/pip-evidence/activities";
import { ASSESSMENT_PREP_PROMPTS, EVIDENCE_CHECKLIST_ITEMS } from "@/lib/pip-evidence/types";
import type { PipEvidenceData } from "@/lib/pip-evidence/types";
import { loadPipData, savePipData, clearPipData } from "@/lib/pip-evidence/storage";
import { computePipReadiness } from "@/lib/pip-evidence/readiness";

import { RecordListEditor, type StoredRecord } from "./RecordListEditor";
import { PromptNotesEditor } from "./PromptNotesEditor";
import { ProfileSection } from "./ProfileSection";
import { EvidenceVaultSection } from "./EvidenceVaultSection";
import { VoiceNotesSection } from "./VoiceNotesSection";
import { SettingsSection } from "./SettingsSection";
import { EvidencePackSection } from "./EvidencePackSection";
import { listEvidenceFiles, listVoiceNotes, clearPlannerEvidenceAndVoice } from "@/lib/planner-evidence/storage";
import type { EvidenceFileMeta } from "@/lib/planner-evidence/types";
import { buildPipEvidencePackSections } from "@/lib/pip-evidence/evidence-pack";

const SLUG = "pip";

const TABS = [
  "Overview",
  "Profile",
  "Health conditions",
  "Daily living diary",
  "Symptom tracker",
  "Medication tracker",
  "Appointments",
  "Evidence vault",
  "Real-life examples",
  "Assessment prep",
  "Timeline",
  "Evidence checklist",
  "Voice notes",
  "Evidence pack",
  "Settings",
] as const;

type Tab = (typeof TABS)[number];

export function PipPlannerApp() {
  const [data, setData] = useState<PipEvidenceData | null>(null);
  const [checklistProgress, setChecklistProgress] = useState<PlannerProgress | null>(null);
  const [evidenceFiles, setEvidenceFiles] = useState<EvidenceFileMeta[]>([]);
  const [voiceNoteCount, setVoiceNoteCount] = useState(0);
  const [activeTab, setActiveTab] = useState<Tab>("Overview");

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional post-mount hydration from localStorage/IndexedDB (unavailable during SSR)
    setData(loadPipData());
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see above
    setChecklistProgress(loadPlannerProgress("pip"));
    listEvidenceFiles(SLUG).then(setEvidenceFiles);
    listVoiceNotes(SLUG).then((notes) => setVoiceNoteCount(notes.length));
  }, []);

  function refreshVoiceNoteCount() {
    listVoiceNotes(SLUG).then((notes) => setVoiceNoteCount(notes.length));
  }

  function updateData(patch: Partial<PipEvidenceData>) {
    setData((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      savePipData(next);
      return next;
    });
  }

  function toggleChecklistItem(id: string) {
    setChecklistProgress((prev) => {
      const base: PlannerProgress = prev ?? { slug: "pip", completedTaskIds: [], notes: {}, updatedAt: new Date().toISOString() };
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
    if (!checklistProgress || EVIDENCE_CHECKLIST_ITEMS.length === 0) return 0;
    const done = EVIDENCE_CHECKLIST_ITEMS.filter((item) => checklistProgress.completedTaskIds.includes(item.id)).length;
    return Math.round((done / EVIDENCE_CHECKLIST_ITEMS.length) * 100);
  }, [checklistProgress]);

  const readiness = useMemo(() => {
    if (!data) return 0;
    return computePipReadiness({ data, checklistPercent, evidenceFileCount: evidenceFiles.length });
  }, [data, checklistPercent, evidenceFiles.length]);

  async function refreshEvidenceFiles() {
    setEvidenceFiles(await listEvidenceFiles(SLUG));
  }

  if (!data || !checklistProgress) {
    return (
      <div>
        <PageHero eyebrow="Planner" title={pipPlanner.title} standfirst={pipPlanner.standfirst} />
        <Container className="py-12">
          <p className="text-sm text-slate">Loading…</p>
        </Container>
      </div>
    );
  }

  const activityOptions = PIP_ACTIVITIES.map((a) => ({ value: a.id, label: a.label }));

  return (
    <div>
      <PageHero eyebrow="Planner" title={pipPlanner.title} standfirst={pipPlanner.standfirst}>
        <div className="mt-6 flex flex-wrap gap-2">
          {pipPlanner.journeyStages.map((stage) => (
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
              {pipPlanner.sections
                .filter((s) => ["overview", "eligibility", "decision", "challenge"].includes(s.id))
                .map((section) => (
                  <Card key={section.id}>
                    <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">
                      {section.title}
                    </h2>
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
              <Disclaimer text={pipPlanner.disclaimer} />
              <div>
                <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">
                  Official sources
                </h2>
                <div className="mt-4 grid gap-3 sm:grid-cols-2">
                  {pipPlanner.sources.map((source) => (
                    <SourceCard key={source.url} source={source} />
                  ))}
                </div>
              </div>
            </>
          )}

          {activeTab === "Profile" && (
            <ProfileSection profile={data.profile} onChange={(profile) => updateData({ profile })} />
          )}

          {activeTab === "Health conditions" && (
            <RecordListEditor
              title="Health conditions"
              description="Every condition that affects your daily living or mobility, even minor ones — assessors consider the combined effect."
              fields={[
                { key: "condition", label: "Condition", type: "text", required: true },
                { key: "diagnosedDate", label: "Diagnosed date", type: "date" },
                { key: "notes", label: "Notes", type: "textarea" },
              ]}
              records={data.conditions as unknown as StoredRecord[]}
              onChange={(records) => updateData({ conditions: records as unknown as PipEvidenceData["conditions"] })}
              summaryFields={["condition", "diagnosedDate"]}
              emptyMessage="No conditions added yet."
            />
          )}

          {activeTab === "Daily living diary" && (
            <RecordListEditor
              title="Daily living & mobility diary"
              description="Log entries against each activity — cover a full week including a bad day for the strongest evidence."
              fields={[
                { key: "date", label: "Date", type: "date", required: true },
                { key: "activityId", label: "Activity", type: "select", options: activityOptions, required: true },
                {
                  key: "dayType",
                  label: "Day type",
                  type: "select",
                  options: [
                    { value: "typical", label: "Typical day" },
                    { value: "bad", label: "Bad day" },
                    { value: "good", label: "Good day" },
                  ],
                  required: true,
                },
                {
                  key: "difficulty",
                  label: "Difficulty (1 = manageable, 5 = can't do it)",
                  type: "select",
                  options: [1, 2, 3, 4, 5].map((n) => ({ value: String(n), label: String(n) })),
                  required: true,
                },
                { key: "description", label: "What happened", type: "textarea", required: true },
              ]}
              records={data.diary as unknown as StoredRecord[]}
              onChange={(records) => updateData({ diary: records as unknown as PipEvidenceData["diary"] })}
              summaryFields={["date", "activityId", "dayType"]}
              emptyMessage="No diary entries yet."
            />
          )}

          {activeTab === "Symptom tracker" && (
            <RecordListEditor
              title="Symptom tracker"
              fields={[
                { key: "date", label: "Date", type: "date", required: true },
                { key: "symptom", label: "Symptom", type: "text", required: true },
                {
                  key: "severity",
                  label: "Severity",
                  type: "select",
                  options: [
                    { value: "mild", label: "Mild" },
                    { value: "moderate", label: "Moderate" },
                    { value: "severe", label: "Severe" },
                  ],
                  required: true,
                },
                { key: "notes", label: "Notes", type: "textarea" },
              ]}
              records={data.symptoms as unknown as StoredRecord[]}
              onChange={(records) => updateData({ symptoms: records as unknown as PipEvidenceData["symptoms"] })}
              summaryFields={["date", "symptom", "severity"]}
              emptyMessage="No symptoms logged yet."
            />
          )}

          {activeTab === "Medication tracker" && (
            <RecordListEditor
              title="Medication tracker"
              fields={[
                { key: "name", label: "Medication", type: "text", required: true },
                { key: "dose", label: "Dose", type: "text" },
                { key: "frequency", label: "Frequency", type: "text" },
                { key: "sideEffects", label: "Side effects", type: "textarea" },
              ]}
              records={data.medications as unknown as StoredRecord[]}
              onChange={(records) => updateData({ medications: records as unknown as PipEvidenceData["medications"] })}
              summaryFields={["name", "dose"]}
              emptyMessage="No medications added yet."
            />
          )}

          {activeTab === "Appointments" && (
            <RecordListEditor
              title="Appointments"
              fields={[
                { key: "date", label: "Date", type: "date", required: true },
                { key: "professional", label: "Who with", type: "text", required: true },
                { key: "purpose", label: "Purpose", type: "text" },
                { key: "notes", label: "Notes", type: "textarea" },
              ]}
              records={data.appointments as unknown as StoredRecord[]}
              onChange={(records) => updateData({ appointments: records as unknown as PipEvidenceData["appointments"] })}
              summaryFields={["date", "professional"]}
              emptyMessage="No appointments added yet."
            />
          )}

          {activeTab === "Evidence vault" && (
            <EvidenceVaultSection
              plannerSlug={SLUG}
              tagOptions={activityOptions}
              tagLabel="Relates to which activity? (optional)"
              onCountChange={() => refreshEvidenceFiles()}
            />
          )}

          {activeTab === "Real-life examples" && (
            <RecordListEditor
              title="Real-life examples"
              description="Specific, concrete moments carry more weight than general statements."
              fields={[
                { key: "date", label: "Date", type: "date", required: true },
                { key: "title", label: "Short title", type: "text", required: true },
                { key: "description", label: "What happened", type: "textarea", required: true },
              ]}
              records={data.examples as unknown as StoredRecord[]}
              onChange={(records) => updateData({ examples: records as unknown as PipEvidenceData["examples"] })}
              summaryFields={["date", "title"]}
              emptyMessage="No examples added yet."
            />
          )}

          {activeTab === "Assessment prep" && (
            <PromptNotesEditor
              title="Assessment preparation"
              description="Working through these before your assessment helps you describe your difficulties clearly and specifically."
              prompts={ASSESSMENT_PREP_PROMPTS}
              notes={data.prepNotes}
              onChange={(prepNotes) => updateData({ prepNotes })}
            />
          )}

          {activeTab === "Timeline" && (
            <RecordListEditor
              title="Timeline"
              description="Track your own key dates so nothing gets missed."
              fields={[
                { key: "date", label: "Date", type: "date", required: true },
                { key: "label", label: "What", type: "text", required: true },
                {
                  key: "type",
                  label: "Type",
                  type: "select",
                  options: [
                    { value: "applied", label: "Applied" },
                    { value: "assessment", label: "Assessment" },
                    { value: "decision", label: "Decision" },
                    { value: "mr-deadline", label: "Mandatory Reconsideration deadline" },
                    { value: "appeal-deadline", label: "Appeal deadline" },
                    { value: "other", label: "Other" },
                  ],
                },
              ]}
              records={data.timeline as unknown as StoredRecord[]}
              onChange={(records) => updateData({ timeline: records as unknown as PipEvidenceData["timeline"] })}
              summaryFields={["date", "label"]}
              emptyMessage="No dates added yet."
            />
          )}

          {activeTab === "Evidence checklist" && (
            <Card>
              <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">
                Evidence checklist
              </h2>
              <ul className="mt-4 space-y-2">
                {EVIDENCE_CHECKLIST_ITEMS.map((item) => {
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
                        <span className={`text-sm ${checked ? "text-slate line-through" : "text-navy-deep"}`}>
                          {item.label}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            </Card>
          )}

          {activeTab === "Voice notes" && <VoiceNotesSection plannerSlug={SLUG} onCountChange={setVoiceNoteCount} />}

          {activeTab === "Evidence pack" && (
            <EvidencePackSection
              plannerLabel="PIP Planner"
              sections={buildPipEvidencePackSections(data)}
              evidenceFiles={evidenceFiles}
              rawData={data}
            />
          )}

          {activeTab === "Settings" && (
            <SettingsSection
              plannerLabel="PIP Planner"
              data={data}
              reminderDate={data.settings.reminderDate}
              reminderNote={data.settings.reminderNote}
              onReminderChange={(reminderDate, reminderNote) =>
                updateData({ settings: { ...data.settings, reminderDate, reminderNote } })
              }
              onImport={(imported) => {
                setData(imported);
                savePipData(imported);
              }}
              onClearAll={async () => {
                clearPipData();
                await clearPlannerEvidenceAndVoice(SLUG);
                setData(loadPipData());
                refreshEvidenceFiles();
                refreshVoiceNoteCount();
              }}
              evidenceFileCount={evidenceFiles.length}
              voiceNoteCount={voiceNoteCount}
            />
          )}
        </div>
      </Container>
    </div>
  );
}
