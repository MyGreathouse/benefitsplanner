"use client";

import { useEffect, useMemo, useState } from "react";
import type { PlannerConfig, PlannerProgress } from "@/lib/planner/types";
import { loadPlannerProgress, savePlannerProgress } from "@/lib/persistence";
import { Card } from "@/components/ui/Card";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { SourceCard } from "@/components/ui/SourceCard";

export function PlannerShell({ config }: { config: PlannerConfig }) {
  const [progress, setProgress] = useState<PlannerProgress | null>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional post-mount hydration from localStorage (unavailable during SSR), not derived from props/state
    setProgress(loadPlannerProgress(config.slug));
  }, [config.slug]);

  const allTaskIds = useMemo(
    () => config.sections.flatMap((s) => s.tasks?.map((t) => t.id) ?? []),
    [config.sections],
  );

  const percentComplete = useMemo(() => {
    if (!progress || allTaskIds.length === 0) return 0;
    const done = allTaskIds.filter((id) => progress.completedTaskIds.includes(id)).length;
    return Math.round((done / allTaskIds.length) * 100);
  }, [progress, allTaskIds]);

  function toggleTask(id: string) {
    if (!progress) return;
    const isDone = progress.completedTaskIds.includes(id);
    const next: PlannerProgress = {
      ...progress,
      completedTaskIds: isDone
        ? progress.completedTaskIds.filter((t) => t !== id)
        : [...progress.completedTaskIds, id],
    };
    setProgress(next);
    savePlannerProgress(next);
  }

  return (
    <div>
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl font-semibold text-navy-deep sm:text-4xl">{config.title}</h1>
        <p className="mt-4 text-lg text-slate">{config.standfirst}</p>
      </div>

      <div className="mt-8 max-w-3xl">
        <div className="flex flex-wrap gap-2">
          {config.journeyStages.map((stage) => (
            <span
              key={stage}
              className="rounded-full border border-border bg-off-white px-3 py-1 text-xs font-medium text-slate"
            >
              {stage}
            </span>
          ))}
        </div>
      </div>

      {allTaskIds.length > 0 && (
        <Card className="mt-8 max-w-3xl">
          <ProgressBar percent={percentComplete} label="Your progress" />
        </Card>
      )}

      <div className="mt-10 max-w-3xl space-y-8">
        {config.sections.map((section) => (
          <Card key={section.id}>
            <h2 className="font-display text-lg font-semibold text-navy-deep">{section.title}</h2>
            {section.summary && <p className="mt-2 text-sm leading-relaxed text-slate">{section.summary}</p>}

            {section.bullets && (
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate">
                {section.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}

            {section.tasks && (
              <ul className="mt-3 space-y-2">
                {section.tasks.map((task) => {
                  const checked = progress?.completedTaskIds.includes(task.id) ?? false;
                  return (
                    <li key={task.id}>
                      <label className="focus-ring flex cursor-pointer items-start gap-3 rounded-lg p-2 hover:bg-off-white">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleTask(task.id)}
                          className="mt-0.5 h-4 w-4 shrink-0 accent-navy-deep"
                        />
                        <span className={`text-sm ${checked ? "text-slate line-through" : "text-navy-deep"}`}>
                          {task.label}
                          {task.detail && <span className="block text-xs text-slate">{task.detail}</span>}
                        </span>
                      </label>
                    </li>
                  );
                })}
              </ul>
            )}
          </Card>
        ))}
      </div>

      <div className="mt-10 max-w-3xl">
        <Disclaimer text={config.disclaimer} />
      </div>

      <div className="mt-10 max-w-3xl">
        <h2 className="font-display text-lg font-semibold text-navy-deep">Official sources</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {config.sources.map((source) => (
            <SourceCard key={source.url} source={source} />
          ))}
        </div>
      </div>
    </div>
  );
}
