"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { PIP_ACTIVITIES } from "@/lib/pip-evidence/activities";
import type { EvidenceFileMeta } from "@/lib/pip-evidence/types";
import {
  addEvidenceFile,
  deleteEvidenceFile,
  getEvidenceFileBlob,
  listEvidenceFiles,
} from "@/lib/pip-evidence/storage";

export function EvidenceVaultSection({ onCountChange }: { onCountChange?: (count: number) => void }) {
  const [files, setFiles] = useState<EvidenceFileMeta[]>([]);
  const [note, setNote] = useState("");
  const [relatedActivityId, setRelatedActivityId] = useState("");
  const [loading, setLoading] = useState(true);
  const inputRef = useRef<HTMLInputElement>(null);

  async function refresh() {
    const list = await listEvidenceFiles();
    setFiles(list);
    onCountChange?.(list.length);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional post-mount load from IndexedDB (unavailable during SSR)
    refresh().finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- refresh is stable for this component's lifetime
  }, []);

  async function handleFileSelected(fileList: FileList | null) {
    if (!fileList || fileList.length === 0) return;
    const file = fileList[0];
    const id = crypto.randomUUID();
    const meta: EvidenceFileMeta = {
      id,
      fileName: file.name,
      mimeType: file.type || "application/octet-stream",
      sizeBytes: file.size,
      note: note.trim() || undefined,
      relatedActivityId: relatedActivityId || undefined,
      dateAdded: new Date().toISOString(),
    };
    await addEvidenceFile(meta, file);
    setNote("");
    setRelatedActivityId("");
    if (inputRef.current) inputRef.current.value = "";
    await refresh();
  }

  async function handleView(id: string) {
    const blob = await getEvidenceFileBlob(id);
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    window.open(url, "_blank", "noopener,noreferrer");
    setTimeout(() => URL.revokeObjectURL(url), 60_000);
  }

  async function handleDelete(id: string) {
    await deleteEvidenceFile(id);
    await refresh();
  }

  return (
    <Card>
      <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">
        Evidence vault
      </h2>
      <p className="mt-2 text-sm leading-relaxed text-slate">
        Letters, reports, photos — stored on this device only, never uploaded anywhere. On a
        phone, choosing a photo can use your camera directly.
      </p>

      <div className="mt-4 space-y-3 rounded-xl border border-border bg-off-white p-4">
        <div>
          <label className="mb-1 block text-xs font-medium text-navy-deep">File</label>
          <input
            ref={inputRef}
            type="file"
            accept="image/*,application/pdf"
            capture="environment"
            onChange={(e) => handleFileSelected(e.target.files)}
            className="block w-full text-sm text-navy-deep file:mr-3 file:rounded-lg file:border-0 file:bg-navy-deep file:px-3 file:py-2 file:text-white"
          />
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-navy-deep">Relates to which activity? (optional)</label>
          <select
            value={relatedActivityId}
            onChange={(e) => setRelatedActivityId(e.target.value)}
            className="focus-ring w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy-deep"
          >
            <option value="">Not linked to a specific activity</option>
            {PIP_ACTIVITIES.map((a) => (
              <option key={a.id} value={a.id}>
                {a.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="mb-1 block text-xs font-medium text-navy-deep">Note (optional)</label>
          <input
            type="text"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="e.g. GP letter about mobility, Jan 2026"
            className="focus-ring w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy-deep"
          />
        </div>
        <p className="text-xs text-slate">Select a file above to add it — it uploads to the vault immediately.</p>
      </div>

      <div className="mt-4 space-y-2">
        {loading && <p className="text-sm text-slate">Loading…</p>}
        {!loading && files.length === 0 && <p className="text-sm text-slate">No evidence added yet.</p>}
        {files.map((f) => {
          const activity = PIP_ACTIVITIES.find((a) => a.id === f.relatedActivityId);
          return (
            <div key={f.id} className="flex items-start justify-between gap-3 rounded-lg border border-border p-3">
              <div className="min-w-0 flex-1 text-sm">
                <p className="truncate font-medium text-navy-deep">{f.fileName}</p>
                <p className="text-xs text-slate">
                  {(f.sizeBytes / 1024).toFixed(0)} KB · added {new Date(f.dateAdded).toLocaleDateString()}
                  {activity && ` · ${activity.label}`}
                </p>
                {f.note && <p className="mt-1 text-xs text-slate">{f.note}</p>}
              </div>
              <div className="flex shrink-0 gap-2">
                <Button size="md" variant="ghost" onClick={() => handleView(f.id)}>
                  View
                </Button>
                <button
                  type="button"
                  onClick={() => handleDelete(f.id)}
                  className="focus-ring text-xs font-medium text-error underline"
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
}
