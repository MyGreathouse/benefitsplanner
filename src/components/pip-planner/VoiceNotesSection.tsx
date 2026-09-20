"use client";

import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import type { VoiceNoteMeta } from "@/lib/pip-evidence/types";
import { addVoiceNote, deleteVoiceNote, getVoiceNoteBlob, listVoiceNotes } from "@/lib/pip-evidence/storage";

export function VoiceNotesSection({ onCountChange }: { onCountChange?: (count: number) => void }) {
  const [notes, setNotes] = useState<VoiceNoteMeta[]>([]);
  const [label, setLabel] = useState("");
  const [recording, setRecording] = useState(false);
  const [supported, setSupported] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const startTimeRef = useRef<number>(0);

  async function refresh() {
    const list = await listVoiceNotes();
    setNotes(list);
    onCountChange?.(list.length);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional post-mount browser capability check (unavailable during SSR)
    setSupported(typeof window !== "undefined" && !!navigator.mediaDevices && typeof MediaRecorder !== "undefined");
    refresh().finally(() => setLoading(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps -- refresh is stable for this component's lifetime
  }, []);

  async function startRecording() {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const recorder = new MediaRecorder(stream);
      chunksRef.current = [];
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = async () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
        const durationSeconds = Math.round((Date.now() - startTimeRef.current) / 1000);
        const meta: VoiceNoteMeta = {
          id: crypto.randomUUID(),
          label: label.trim() || `Voice note — ${new Date().toLocaleString()}`,
          mimeType: blob.type,
          durationSeconds,
          dateAdded: new Date().toISOString(),
        };
        await addVoiceNote(meta, blob);
        setLabel("");
        stream.getTracks().forEach((t) => t.stop());
        await refresh();
      };
      mediaRecorderRef.current = recorder;
      startTimeRef.current = Date.now();
      recorder.start();
      setRecording(true);
    } catch {
      setError("Couldn't access the microphone — check your browser's permission settings for this site.");
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }

  async function handlePlay(id: string) {
    const blob = await getVoiceNoteBlob(id);
    if (!blob) return;
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audio.play();
    audio.onended = () => URL.revokeObjectURL(url);
  }

  async function handleDelete(id: string) {
    await deleteVoiceNote(id);
    await refresh();
  }

  return (
    <Card>
      <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">Voice notes</h2>
      <p className="mt-2 text-sm leading-relaxed text-slate">
        Sometimes it&rsquo;s easier to talk through a bad day than write it down. Recordings stay on
        this device only.
      </p>

      {!supported && (
        <p className="mt-4 rounded-lg bg-warning-bg p-3 text-sm text-warning">
          Voice recording isn&rsquo;t supported in this browser.
        </p>
      )}
      {error && <p className="mt-4 rounded-lg bg-error-bg p-3 text-sm text-error">{error}</p>}

      {supported && (
        <div className="mt-4 space-y-3 rounded-xl border border-border bg-off-white p-4">
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="Label (optional) — e.g. 'Bad morning, 14 March'"
            className="focus-ring w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy-deep"
          />
          {!recording ? (
            <Button size="md" onClick={startRecording}>
              Start recording
            </Button>
          ) : (
            <Button size="md" variant="secondary" onClick={stopRecording}>
              Stop &amp; save
            </Button>
          )}
        </div>
      )}

      <div className="mt-4 space-y-2">
        {loading && <p className="text-sm text-slate">Loading…</p>}
        {!loading && notes.length === 0 && <p className="text-sm text-slate">No voice notes yet.</p>}
        {notes.map((n) => (
          <div key={n.id} className="flex items-center justify-between gap-3 rounded-lg border border-border p-3">
            <div className="min-w-0 flex-1 text-sm">
              <p className="truncate font-medium text-navy-deep">{n.label}</p>
              <p className="text-xs text-slate">
                {n.durationSeconds ? `${n.durationSeconds}s · ` : ""}
                {new Date(n.dateAdded).toLocaleDateString()}
              </p>
            </div>
            <div className="flex shrink-0 gap-2">
              <Button size="md" variant="ghost" onClick={() => handlePlay(n.id)}>
                Play
              </Button>
              <button
                type="button"
                onClick={() => handleDelete(n.id)}
                className="focus-ring text-xs font-medium text-error underline"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}
