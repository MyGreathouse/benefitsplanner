"use client";

import { useId } from "react";
import { Card } from "@/components/ui/Card";
import type { PromptNote } from "@/lib/pip-evidence/types";

export function PromptNotesEditor({
  title,
  description,
  prompts,
  notes,
  onChange,
}: {
  title: string;
  description?: string;
  prompts: { id: string; prompt: string }[];
  notes: PromptNote[];
  onChange: (notes: PromptNote[]) => void;
}) {
  const idPrefix = useId();

  function getText(promptId: string): string {
    return notes.find((n) => n.promptId === promptId)?.text ?? "";
  }

  function setText(promptId: string, text: string) {
    const existing = notes.find((n) => n.promptId === promptId);
    if (existing) {
      onChange(notes.map((n) => (n.promptId === promptId ? { ...n, text } : n)));
    } else {
      onChange([...notes, { promptId, text }]);
    }
  }

  return (
    <Card>
      <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">{title}</h2>
      {description && <p className="mt-2 text-sm leading-relaxed text-slate">{description}</p>}

      <div className="mt-4 space-y-4">
        {prompts.map((p) => (
          <div key={p.id}>
            <label htmlFor={`${idPrefix}-${p.id}`} className="mb-1 block text-sm font-medium text-navy-deep">{p.prompt}</label>
            <textarea
              id={`${idPrefix}-${p.id}`}
              value={getText(p.id)}
              onChange={(e) => setText(p.id, e.target.value)}
              rows={3}
              className="focus-ring w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy-deep"
            />
          </div>
        ))}
      </div>
    </Card>
  );
}
