"use client";

import { useEffect, useMemo, useState } from "react";
import { checkerConfig } from "@/lib/eligibility/checker-config";
import { calculateProgress, evaluateEligibility, getVisibleSteps } from "@/lib/eligibility/engine";
import type { AnswerValue, Answers } from "@/lib/eligibility/types";
import { loadCheckerAnswers, loadCheckerResult, saveCheckerAnswers, saveCheckerResult, clearCheckerState } from "@/lib/persistence";
import { QuestionField } from "./QuestionField";
import { ResultsSummary } from "./ResultsSummary";
import { Card } from "@/components/ui/Card";
import { Button } from "@/components/ui/Button";
import { ProgressBar } from "@/components/ui/ProgressBar";
import { StepIndicator } from "@/components/ui/StepIndicator";

type Mode = "in-progress" | "review" | "results";

export function EligibilityChecker() {
  const [answers, setAnswers] = useState<Answers>({});
  const [stepIndex, setStepIndex] = useState(0);
  const [mode, setMode] = useState<Mode>("in-progress");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [hydrated, setHydrated] = useState(false);

  // Load any saved progress on mount. This must run in an effect, not a lazy
  // useState initializer, because localStorage isn't available during SSR —
  // reading it here (post-mount, client-only) avoids a hydration mismatch.
  useEffect(() => {
    const savedAnswers = loadCheckerAnswers();
    const savedResult = loadCheckerResult();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional post-mount hydration from localStorage (unavailable during SSR), not derived from props/state
    if (Object.keys(savedAnswers).length > 0) setAnswers(savedAnswers);
    if (savedResult) setMode("results");
    setHydrated(true);
  }, []);

  const visibleSteps = useMemo(() => getVisibleSteps(checkerConfig, answers), [answers]);
  const progress = useMemo(() => calculateProgress(checkerConfig, answers), [answers]);
  const currentStep = visibleSteps[stepIndex];
  const result = useMemo(() => (mode === "results" ? loadCheckerResult() ?? evaluateEligibility(checkerConfig, answers) : null), [mode, answers]);

  function handleAnswerChange(id: string, value: AnswerValue) {
    const next = { ...answers, [id]: value };
    setAnswers(next);
    saveCheckerAnswers(next);
    if (errors[id]) setErrors((e) => ({ ...e, [id]: "" }));
  }

  function validateCurrentStep(): boolean {
    if (!currentStep) return true;
    const newErrors: Record<string, string> = {};
    for (const q of currentStep.questions) {
      if (q.validate) {
        const err = q.validate(answers[q.id], answers);
        if (err) newErrors[q.id] = err;
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function goNext() {
    if (!validateCurrentStep()) return;
    if (stepIndex < visibleSteps.length - 1) {
      setStepIndex((i) => i + 1);
    } else {
      setMode("review");
    }
  }

  function goBack() {
    if (mode === "review") {
      setMode("in-progress");
      setStepIndex(visibleSteps.length - 1);
      return;
    }
    setStepIndex((i) => Math.max(0, i - 1));
  }

  function submitForResults() {
    const evaluated = evaluateEligibility(checkerConfig, answers);
    saveCheckerResult(evaluated);
    setMode("results");
  }

  function startOver() {
    clearCheckerState();
    setAnswers({});
    setStepIndex(0);
    setErrors({});
    setMode("in-progress");
  }

  function editAnswers() {
    clearCheckerStateResultOnly();
    setStepIndex(0);
    setMode("in-progress");
  }

  function clearCheckerStateResultOnly() {
    // Keep answers, just leave results mode so the user can revise and resubmit.
    saveCheckerAnswers(answers);
  }

  if (!hydrated) {
    return (
      <Card>
        <p className="text-sm text-slate">Loading…</p>
      </Card>
    );
  }

  if (mode === "results" && result) {
    return (
      <div>
        <ResultsSummary signals={result.signals} />
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="secondary" onClick={editAnswers}>
            Review / edit answers
          </Button>
          <Button variant="ghost" onClick={startOver}>
            Start over
          </Button>
        </div>
      </div>
    );
  }

  if (mode === "review") {
    return (
      <div>
        <h2 className="font-display text-2xl font-semibold text-navy-deep">Review your answers</h2>
        <p className="mt-2 text-sm text-slate">
          Check everything looks right, then see your Benefits Snapshot.
        </p>
        <div className="mt-6 space-y-6">
          {visibleSteps.map((step) => (
            <Card key={step.id}>
              <h3 className="font-display text-base font-semibold text-navy-deep">{step.title}</h3>
              <dl className="mt-3 space-y-2">
                {step.questions.map((q) => {
                  const v = answers[q.id];
                  const display = Array.isArray(v) ? v.join(", ") : v === undefined || v === "" ? "—" : String(v);
                  return (
                    <div key={q.id} className="flex flex-col gap-0.5 border-t border-border pt-2 text-sm first:border-t-0 first:pt-0 sm:flex-row sm:justify-between">
                      <dt className="text-slate">{q.prompt}</dt>
                      <dd className="font-medium text-navy-deep">{display}</dd>
                    </div>
                  );
                })}
              </dl>
            </Card>
          ))}
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button variant="secondary" onClick={goBack}>
            Back to editing
          </Button>
          <Button onClick={submitForResults}>See my Benefits Snapshot</Button>
        </div>
      </div>
    );
  }

  if (!currentStep) {
    return (
      <Card>
        <p className="text-sm text-slate">Nothing to show yet.</p>
      </Card>
    );
  }

  return (
    <div>
      <StepIndicator current={stepIndex + 1} total={visibleSteps.length} />
      <div className="mt-3">
        <ProgressBar percent={progress} />
      </div>

      <Card className="mt-8">
        <h2 className="font-display text-xl font-semibold text-navy-deep">{currentStep.title}</h2>
        {currentStep.description && <p className="mt-2 text-sm text-slate">{currentStep.description}</p>}

        <div className="mt-6 space-y-8">
          {currentStep.questions.map((q) => (
            <QuestionField
              key={q.id}
              question={q}
              answers={answers}
              onChange={handleAnswerChange}
              error={errors[q.id]}
            />
          ))}
        </div>
      </Card>

      <div className="mt-6 flex flex-wrap justify-between gap-3">
        <div className="flex gap-3">
          <Button variant="ghost" onClick={goBack} disabled={stepIndex === 0}>
            Back
          </Button>
        </div>
        <div className="flex gap-3">
          <Button variant="secondary" onClick={startOver}>
            Exit &amp; clear
          </Button>
          <Button onClick={goNext}>{stepIndex === visibleSteps.length - 1 ? "Review answers" : "Next"}</Button>
        </div>
      </div>
    </div>
  );
}
