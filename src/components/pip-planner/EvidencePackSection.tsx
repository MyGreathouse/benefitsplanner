"use client";

import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { EvidenceFileMeta } from "@/lib/planner-evidence/types";

export interface EvidencePackSectionData {
  title: string;
  lines: string[];
}

export function EvidencePackSection({
  plannerLabel,
  sections,
  evidenceFiles,
  rawData,
}: {
  plannerLabel: string;
  sections: EvidencePackSectionData[];
  evidenceFiles: EvidenceFileMeta[];
  rawData: unknown;
}) {
  function handlePrint() {
    window.print();
  }

  function handleDownloadJson() {
    const payload = { generatedAt: new Date().toISOString(), data: rawData, evidenceFileIndex: evidenceFiles };
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${plannerLabel.toLowerCase().replace(/\s+/g, "-")}-evidence-pack-${new Date().toISOString().slice(0, 10)}.json`;
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
        BenefitsPlanner — Personal Planning Summary. This isn&rsquo;t an official document —
        it&rsquo;s your own organised record to take into an assessment or attach to a claim.
      </p>

      <div id="evidence-pack-print" className="mt-6 space-y-6 text-sm text-navy-deep">
        <div>
          <p className="font-display text-xl font-semibold">BenefitsPlanner — {plannerLabel} Summary</p>
          <p className="text-xs text-slate">Generated {new Date().toLocaleDateString()}</p>
        </div>

        {sections
          .filter((s) => s.lines.length > 0)
          .map((section) => (
            <section key={section.title}>
              <h3 className="font-semibold text-navy-deep">{section.title}</h3>
              <ul className="list-disc pl-5">
                {section.lines.map((line, i) => (
                  <li key={i}>{line}</li>
                ))}
              </ul>
            </section>
          ))}

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
