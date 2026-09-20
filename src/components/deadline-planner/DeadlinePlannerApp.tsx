"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import type { DeadlinesData, ManualDeadline } from "@/lib/deadlines/types";
import { DEADLINE_CATEGORY_LABELS } from "@/lib/deadlines/types";
import { loadDeadlinesData, saveDeadlinesData } from "@/lib/deadlines/storage";
import { computeDeadlineStatus } from "@/lib/deadlines/status";
import { getAggregatedDeadlines } from "@/lib/deadlines/aggregate";
import type { AggregatedDeadline } from "@/lib/deadlines/types";

import { RecordListEditor, type StoredRecord } from "@/components/pip-planner/RecordListEditor";

export function DeadlinePlannerApp() {
  const [data, setData] = useState<DeadlinesData | null>(null);
  const [aggregated, setAggregated] = useState<AggregatedDeadline[]>([]);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional post-mount hydration from localStorage (unavailable during SSR)
    setData(loadDeadlinesData());
    // eslint-disable-next-line react-hooks/set-state-in-effect -- see above
    setAggregated(getAggregatedDeadlines());
  }, []);

  function updateData(patch: Partial<DeadlinesData>) {
    setData((prev) => {
      if (!prev) return prev;
      const next = { ...prev, ...patch };
      saveDeadlinesData(next);
      return next;
    });
  }

  const combined = useMemo(() => {
    if (!data) return [];
    const manual = data.entries.map((e) => ({
      date: e.date,
      label: e.label,
      category: e.category,
      status: computeDeadlineStatus(e.date, e.completed),
      source: "You added this",
      href: undefined as string | undefined,
    }));
    const fromPlanners = aggregated.map((a) => ({
      date: a.date,
      label: a.label,
      category: "other" as const,
      status: computeDeadlineStatus(a.date, false),
      source: a.source,
      href: a.href,
    }));
    return [...manual, ...fromPlanners].sort((a, b) => a.date.localeCompare(b.date));
  }, [data, aggregated]);

  if (!data) {
    return (
      <div>
        <PageHero eyebrow="Tool" title="Deadline & Review Planner" standfirst="Track every important date across your benefits in one place." />
        <Container className="py-12">
          <p className="text-sm text-slate">Loading…</p>
        </Container>
      </div>
    );
  }

  return (
    <div>
      <PageHero
        eyebrow="Tool"
        title="Deadline & Review Planner"
        standfirst="Track every important date across your benefits in one place — dates you've logged in PIP, SEND/EHCP and the Challenge Planner appear here automatically, alongside anything you add yourself."
      />

      <Container className="py-12">
        <div className="max-w-3xl space-y-8">
          <Card>
            <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">
              All dates
            </h2>
            {combined.length === 0 ? (
              <p className="mt-4 text-sm text-slate">No dates yet — add one below, or log dates in a planner.</p>
            ) : (
              <ul className="mt-4 space-y-2">
                {combined.map((item, i) => (
                  <li
                    key={i}
                    className="flex flex-wrap items-center justify-between gap-3 rounded-lg border border-border p-3"
                  >
                    <div>
                      <p className="text-sm font-medium text-navy-deep">{item.label}</p>
                      <p className="text-xs text-slate">
                        {item.date} · {DEADLINE_CATEGORY_LABELS[item.category]} ·{" "}
                        {item.href ? (
                          <Link href={item.href} className="underline">
                            {item.source}
                          </Link>
                        ) : (
                          item.source
                        )}
                      </p>
                    </div>
                    <StatusBadge status={item.status} />
                  </li>
                ))}
              </ul>
            )}
          </Card>

          <RecordListEditor
            title="Add your own date"
            description="For anything not already tracked in a planner — a benefit renewal, a call you've scheduled, anything else."
            fields={[
              { key: "date", label: "Date", type: "date", required: true },
              { key: "label", label: "What", type: "text", required: true },
              {
                key: "category",
                label: "Type",
                type: "select",
                options: Object.entries(DEADLINE_CATEGORY_LABELS).map(([value, label]) => ({ value, label })),
              },
              { key: "completed", label: "Completed", type: "boolean", placeholder: "Mark as done" },
            ]}
            records={data.entries.map((e) => ({ ...e, completed: e.completed ? "true" : "false" })) as unknown as StoredRecord[]}
            onChange={(records) => {
              const normalised = records.map((r) => ({ ...r, completed: r.completed === "true" }));
              updateData({ entries: normalised as unknown as ManualDeadline[] });
            }}
            summaryFields={["date", "label", "completed"]}
            emptyMessage="Nothing added yet."
          />
        </div>
      </Container>
    </div>
  );
}
