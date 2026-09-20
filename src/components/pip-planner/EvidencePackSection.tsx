"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PIP_ACTIVITIES } from "@/lib/pip-evidence/activities";
import type { EvidenceFileMeta, PipEvidenceData } from "@/lib/pip-evidence/types";
import { ASSESSMENT_PREP_PROMPTS } from "@/lib/pip-evidence/types";

export function EvidencePackSection({
  data,
  evidenceFiles,
}: {
  data: PipEvidenceData;
  evidenceFiles: EvidenceFileMeta[];
}) {
  function handlePrint() {
    window.print();
  }

  function handleDownloadJson() {
    const payload = { generatedAt: new Date().toISOString(), data, evidenceFileIndex: evidenceFiles };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `pip-evidence-pack-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  return (
    <Card>
      <div className="flex flex-wrap items-center justify-between gap-3 print:hidden">
        <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">
          Evidence pack
        </h2>
        <div className="flex gap-3">
          <Button size="md" variant="secondary" onClick={handleDownloadJson}>
            Download JSON
          </Button>
          <Button size="md" onClick={handlePrint}>
            Print / Save as PDF
          </Button>
        </div>
      </div>
      <p className="mt-2 text-sm leading-relaxed text-slate print:hidden">
        BenefitsPlanner — Personal Planning Summary. This isn&rsquo;t an official DWP document —
        it&rsquo;s your own organised record to take into an assessment or attach to a claim.
      </p>

      <div id="evidence-pack-print" className="mt-6 space-y-6 text-sm text-navy-deep">
        <div>
          <p className="font-display text-xl font-semibold">BenefitsPlanner — Personal Planning Summary</p>
          <p className="text-xs text-slate">Generated {new Date().toLocaleDateString()}</p>
        </div>

        {data.profile.name && (
          <section>
            <h3 className="font-semibold text-navy-deep">Profile</h3>
            <p>{data.profile.name}</p>
            {data.profile.dateOfBirth && <p>DOB: {data.profile.dateOfBirth}</p>}
          </section>
        )}

        {data.conditions.length > 0 && (
          <section>
            <h3 className="font-semibold text-navy-deep">Health conditions</h3>
            <ul className="list-disc pl-5">
              {data.conditions.map((c) => (
                <li key={c.id}>
                  {c.condition}
                  {c.diagnosedDate ? ` (diagnosed ${c.diagnosedDate})` : ""}
                  {c.notes ? ` — ${c.notes}` : ""}
                </li>
              ))}
            </ul>
          </section>
        )}

        {data.diary.length > 0 && (
          <section>
            <h3 className="font-semibold text-navy-deep">Daily living &amp; mobility diary</h3>
            <ul className="list-disc pl-5">
              {data.diary.map((d) => {
                const activity = PIP_ACTIVITIES.find((a) => a.id === d.activityId);
                return (
                  <li key={d.id}>
                    {d.date} — {activity?.label ?? d.activityId} ({d.dayType} day, difficulty {d.difficulty}/5):{" "}
                    {d.description}
                  </li>
                );
              })}
            </ul>
          </section>
        )}

        {data.examples.length > 0 && (
          <section>
            <h3 className="font-semibold text-navy-deep">Real-life examples</h3>
            <ul className="list-disc pl-5">
              {data.examples.map((e) => (
                <li key={e.id}>
                  {e.date} — {e.title}: {e.description}
                </li>
              ))}
            </ul>
          </section>
        )}

        {data.prepNotes.some((n) => n.text.trim()) && (
          <section>
            <h3 className="font-semibold text-navy-deep">Assessment preparation notes</h3>
            <ul className="list-disc pl-5">
              {data.prepNotes
                .filter((n) => n.text.trim())
                .map((n) => {
                  const prompt = ASSESSMENT_PREP_PROMPTS.find((p) => p.id === n.promptId);
                  return (
                    <li key={n.promptId}>
                      <strong>{prompt?.prompt ?? n.promptId}</strong> — {n.text}
                    </li>
                  );
                })}
            </ul>
          </section>
        )}

        {data.appointments.length > 0 && (
          <section>
            <h3 className="font-semibold text-navy-deep">Appointments</h3>
            <ul className="list-disc pl-5">
              {data.appointments.map((a) => (
                <li key={a.id}>
                  {a.date} — {a.professional}
                  {a.purpose ? ` (${a.purpose})` : ""}
                </li>
              ))}
            </ul>
          </section>
        )}

        {data.medications.length > 0 && (
          <section>
            <h3 className="font-semibold text-navy-deep">Medications</h3>
            <ul className="list-disc pl-5">
              {data.medications.map((m) => (
                <li key={m.id}>
                  {m.name}
                  {m.dose ? `, ${m.dose}` : ""}
                  {m.frequency ? `, ${m.frequency}` : ""}
                </li>
              ))}
            </ul>
          </section>
        )}

        {data.timeline.length > 0 && (
          <section>
            <h3 className="font-semibold text-navy-deep">Timeline</h3>
            <ul className="list-disc pl-5">
              {data.timeline.map((t) => (
                <li key={t.id}>
                  {t.date} — {t.label}
                </li>
              ))}
            </ul>
          </section>
        )}

        {evidenceFiles.length > 0 && (
          <section>
            <h3 className="font-semibold text-navy-deep">Evidence index</h3>
            <ul className="list-disc pl-5">
              {evidenceFiles.map((f) => (
                <li key={f.id}>
                  {f.fileName}
                  {f.note ? ` — ${f.note}` : ""}
                </li>
              ))}
            </ul>
          </section>
        )}

        <p className="text-xs text-slate">
          BenefitsPlanner is an independent planning tool, not DWP or GOV.UK. This summary is for
          your own organisation and preparation only.
        </p>
      </div>
    </Card>
  );
}
