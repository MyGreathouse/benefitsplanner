"use client";

import { useRef } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export function SettingsSection<T>({
  plannerLabel,
  data,
  reminderDate,
  reminderNote,
  onReminderChange,
  onImport,
  onClearAll,
  evidenceFileCount,
  voiceNoteCount,
}: {
  plannerLabel: string;
  data: T;
  reminderDate?: string;
  reminderNote?: string;
  onReminderChange: (reminderDate: string | undefined, reminderNote: string | undefined) => void;
  onImport: (data: T) => void;
  onClearAll: () => void;
  evidenceFileCount: number;
  voiceNoteCount: number;
}) {
  const importInputRef = useRef<HTMLInputElement>(null);

  function handleExport() {
    const exportPayload = {
      exportedAt: new Date().toISOString(),
      note: `This backup includes your written data. It does NOT include the ${evidenceFileCount} evidence file(s) or ${voiceNoteCount} voice note(s) themselves — those stay on this device only and aren't included in the download.`,
      data,
    };
    const blob = new Blob([JSON.stringify(exportPayload, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${plannerLabel.toLowerCase().replace(/\s+/g, "-")}-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    URL.revokeObjectURL(url);
  }

  function handleImportFile(fileList: FileList | null) {
    const file = fileList?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      try {
        const parsed = JSON.parse(String(reader.result));
        const imported: T = parsed.data ?? parsed;
        onImport(imported);
      } catch {
        window.alert("That file doesn't look like a valid backup.");
      }
    };
    reader.readAsText(file);
    if (importInputRef.current) importInputRef.current.value = "";
  }

  function handleClearAll() {
    const confirmed = window.confirm(
      `This permanently deletes all your ${plannerLabel} data on this device — profile, trackers, evidence files, and voice notes. This can't be undone. Continue?`,
    );
    if (!confirmed) return;
    onClearAll();
  }

  return (
    <Card>
      <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">Settings</h2>

      <div className="mt-4">
        <h3 className="text-sm font-semibold text-navy-deep">Backup</h3>
        <p className="mt-1 text-sm text-slate">
          Download a copy of your written data, or restore from a previous backup. Evidence files
          and voice notes are stored separately on this device and aren&rsquo;t included in the
          backup file — keep copies of the originals elsewhere too.
        </p>
        <div className="mt-3 flex flex-wrap gap-3">
          <Button size="md" variant="secondary" onClick={handleExport}>
            Download backup (JSON)
          </Button>
          <Button size="md" variant="secondary" onClick={() => importInputRef.current?.click()}>
            Restore from backup
          </Button>
          <input
            ref={importInputRef}
            type="file"
            accept="application/json"
            className="hidden"
            onChange={(e) => handleImportFile(e.target.files)}
          />
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-6">
        <h3 className="text-sm font-semibold text-navy-deep">Reminder note</h3>
        <p className="mt-1 text-sm text-slate">
          This is just a note to yourself, shown here in the app — it does not send you a
          notification or alarm.
        </p>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <input
            type="date"
            value={reminderDate ?? ""}
            onChange={(e) => onReminderChange(e.target.value || undefined, reminderNote)}
            className="focus-ring rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy-deep"
          />
          <input
            type="text"
            value={reminderNote ?? ""}
            onChange={(e) => onReminderChange(reminderDate, e.target.value || undefined)}
            placeholder="e.g. Assessment call at 10am"
            className="focus-ring rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy-deep sm:col-span-1"
          />
        </div>
      </div>

      <div className="mt-6 border-t border-border pt-6">
        <h3 className="text-sm font-semibold text-error">Delete all data</h3>
        <p className="mt-1 text-sm text-slate">
          Permanently erases everything in this planner from this device. This cannot be undone.
        </p>
        <Button size="md" variant="secondary" className="mt-3 !border-error !text-error" onClick={handleClearAll}>
          Delete all {plannerLabel} data
        </Button>
      </div>
    </Card>
  );
}
