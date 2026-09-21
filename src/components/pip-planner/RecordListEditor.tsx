"use client";

import { useId, useState } from "react";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";

export type FieldType = "text" | "textarea" | "date" | "select" | "number" | "boolean";

export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldDef {
  key: string;
  label: string;
  type: FieldType;
  options?: FieldOption[];
  required?: boolean;
  placeholder?: string;
}

export type RecordValue = Record<string, string>;
export type StoredRecord = RecordValue & { id: string };

function emptyForm(fields: FieldDef[]): RecordValue {
  const form: RecordValue = {};
  fields.forEach((f) => {
    form[f.key] = "";
  });
  return form;
}

function newId(): string {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `id-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function RecordListEditor({
  title,
  description,
  fields,
  records,
  onChange,
  summaryFields,
  emptyMessage = "Nothing added yet.",
}: {
  title: string;
  description?: string;
  fields: FieldDef[];
  records: StoredRecord[];
  onChange: (records: StoredRecord[]) => void;
  /** Which field keys to show in the collapsed list row, in order. Defaults to all. */
  summaryFields?: string[];
  emptyMessage?: string;
}) {
  const [form, setForm] = useState<RecordValue>(emptyForm(fields));
  const [editingId, setEditingId] = useState<string | null>(null);
  const idPrefix = useId();

  function startEdit(record: StoredRecord) {
    const { id: _id, ...rest } = record;
    void _id;
    setForm(rest);
    setEditingId(record.id);
  }

  function cancelEdit() {
    setForm(emptyForm(fields));
    setEditingId(null);
  }

  function handleSubmit() {
    const requiredMissing = fields.some((f) => f.required && !form[f.key]?.trim());
    if (requiredMissing) return;

    if (editingId) {
      onChange(records.map((r) => (r.id === editingId ? { ...form, id: editingId } : r)));
    } else {
      onChange([...records, { ...form, id: newId() }]);
    }
    cancelEdit();
  }

  function handleDelete(id: string) {
    onChange(records.filter((r) => r.id !== id));
    if (editingId === id) cancelEdit();
  }

  const rowsToShow = summaryFields ?? fields.map((f) => f.key);

  return (
    <Card>
      <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">{title}</h2>
      {description && <p className="mt-2 text-sm leading-relaxed text-slate">{description}</p>}

      <div className="mt-4 space-y-3 rounded-xl border border-border bg-off-white p-4">
        {fields.map((f) => {
          const inputId = `${idPrefix}-${f.key}`;
          return (
            <div key={f.key}>
              {f.type !== "boolean" && (
                <label htmlFor={inputId} className="mb-1 block text-xs font-medium text-navy-deep">
                  {f.label}
                  {f.required && <span className="text-error"> *</span>}
                </label>
              )}
              {f.type === "textarea" ? (
                <textarea
                  id={inputId}
                  value={form[f.key] ?? ""}
                  onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  rows={3}
                  className="focus-ring w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy-deep"
                />
              ) : f.type === "select" ? (
                <select
                  id={inputId}
                  value={form[f.key] ?? ""}
                  onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                  className="focus-ring w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy-deep"
                >
                  <option value="">Select…</option>
                  {f.options?.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : f.type === "boolean" ? (
                <label htmlFor={inputId} className="flex items-center gap-2 text-sm text-navy-deep">
                  <input
                    id={inputId}
                    type="checkbox"
                    checked={form[f.key] === "true"}
                    onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.checked ? "true" : "false" }))}
                    className="h-4 w-4 accent-navy-deep"
                  />
                  {f.label}
                  {f.placeholder ? ` — ${f.placeholder}` : ""}
                </label>
              ) : (
                <input
                  id={inputId}
                  type={f.type}
                  value={form[f.key] ?? ""}
                  onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                  placeholder={f.placeholder}
                  className="focus-ring w-full rounded-lg border border-border bg-white px-3 py-2 text-sm text-navy-deep"
                />
              )}
            </div>
          );
        })}
        <div className="flex gap-2 pt-1">
          <Button size="md" onClick={handleSubmit}>
            {editingId ? "Save changes" : "Add"}
          </Button>
          {editingId && (
            <Button size="md" variant="ghost" onClick={cancelEdit}>
              Cancel
            </Button>
          )}
        </div>
      </div>

      <div className="mt-4 space-y-2">
        {records.length === 0 && <p className="text-sm text-slate">{emptyMessage}</p>}
        {records.map((record) => (
          <div
            key={record.id}
            className="flex items-start justify-between gap-3 rounded-lg border border-border p-3"
          >
            <div className="min-w-0 flex-1 text-sm text-navy-deep">
              {rowsToShow.map((key) => {
                const field = fields.find((f) => f.key === key);
                const value = record[key];
                if (!value) return null;
                if (field?.type === "boolean") {
                  return value === "true" ? (
                    <p key={key} className="text-success">
                      ✓ {field.placeholder ?? "Completed"}
                    </p>
                  ) : null;
                }
                const displayValue =
                  field?.type === "select" ? field.options?.find((o) => o.value === value)?.label ?? value : value;
                return (
                  <p key={key} className="truncate">
                    <span className="font-medium">{displayValue}</span>
                  </p>
                );
              })}
            </div>
            <div className="flex shrink-0 gap-2">
              <button
                type="button"
                onClick={() => startEdit(record)}
                className="focus-ring text-xs font-medium text-navy-deep underline"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(record.id)}
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
