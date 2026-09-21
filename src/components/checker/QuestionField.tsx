"use client";

import type { AnswerValue, Answers, Question } from "@/lib/eligibility/types";

export function QuestionField({
  question,
  answers,
  onChange,
  error,
}: {
  question: Question;
  answers: Answers;
  onChange: (id: string, value: AnswerValue) => void;
  error?: string;
}) {
  const value = answers[question.id];

  return (
    <div>
      <label htmlFor={question.id} className="block text-sm font-medium text-navy-deep">
        {question.prompt}
      </label>
      {question.helpText && <p className="mt-1 text-xs text-slate">{question.helpText}</p>}

      <div className="mt-3">
        {question.type === "single-select" && (
          <div className="flex flex-col gap-2">
            {question.options?.map((opt) => (
              <button
                key={opt.value}
                type="button"
                aria-pressed={value === opt.value}
                onClick={() => onChange(question.id, opt.value)}
                className={`focus-ring rounded-xl border px-4 py-3 text-left text-sm transition-colors ${
                  value === opt.value
                    ? "border-navy-deep bg-navy-deep text-white"
                    : "border-border bg-white text-navy-deep hover:border-navy-deep"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {question.type === "multi-select" && (
          <div className="flex flex-wrap gap-2">
            {question.options?.map((opt) => {
              const selected = Array.isArray(value) && value.includes(opt.value);
              return (
                <button
                  key={opt.value}
                  type="button"
                  aria-pressed={selected}
                  onClick={() => {
                    const current = Array.isArray(value) ? [...value] : [];
                    const next = selected ? current.filter((v) => v !== opt.value) : [...current, opt.value];
                    onChange(question.id, next);
                  }}
                  className={`focus-ring rounded-full border px-4 py-2 text-sm transition-colors ${
                    selected
                      ? "border-navy-deep bg-navy-deep text-white"
                      : "border-border bg-white text-navy-deep hover:border-navy-deep"
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        )}

        {question.type === "boolean" && (
          <div className="flex gap-3">
            {[
              { label: "Yes", val: true },
              { label: "No", val: false },
            ].map((opt) => (
              <button
                key={opt.label}
                type="button"
                aria-pressed={value === opt.val}
                onClick={() => onChange(question.id, opt.val)}
                className={`focus-ring flex-1 rounded-xl border px-4 py-3 text-sm font-medium transition-colors ${
                  value === opt.val
                    ? "border-navy-deep bg-navy-deep text-white"
                    : "border-border bg-white text-navy-deep hover:border-navy-deep"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        )}

        {(question.type === "number" || question.type === "currency") && (
          <div className="relative">
            {question.type === "currency" && (
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate">£</span>
            )}
            <input
              id={question.id}
              type="number"
              inputMode="decimal"
              value={typeof value === "number" ? value : ""}
              onChange={(e) => onChange(question.id, e.target.value === "" ? undefined : Number(e.target.value))}
              className={`focus-ring w-full rounded-xl border border-border bg-white py-3 text-sm text-navy-deep ${
                question.type === "currency" ? "pl-8 pr-4" : "px-4"
              }`}
            />
            {question.unit && <p className="mt-1 text-xs text-slate">{question.unit}</p>}
          </div>
        )}

        {question.type === "text" && (
          <input
            id={question.id}
            type="text"
            value={typeof value === "string" ? value : ""}
            onChange={(e) => onChange(question.id, e.target.value)}
            className="focus-ring w-full rounded-xl border border-border bg-white px-4 py-3 text-sm text-navy-deep"
          />
        )}
      </div>

      {error && <p className="mt-2 text-xs text-error">{error}</p>}
    </div>
  );
}
