import type {
  Answers,
  EligibilityConfig,
  EligibilityResult,
  EligibilitySignal,
  QuestionStep,
} from "./types";

/** Returns only the steps that should currently be visible, given the answers so far. */
export function getVisibleSteps(config: EligibilityConfig, answers: Answers): QuestionStep[] {
  return config.steps
    .filter((step) => !step.visibleIf || step.visibleIf(answers))
    .map((step) => ({
      ...step,
      questions: step.questions.filter((q) => !q.visibleIf || q.visibleIf(answers)),
    }))
    .filter((step) => step.questions.length > 0);
}

/** Runs every rule in the config against the answers and collects triggered signals. */
export function evaluateEligibility(
  config: EligibilityConfig,
  answers: Answers,
): EligibilityResult {
  const signals: EligibilitySignal[] = [];

  for (const rule of config.rules) {
    const signal = rule.evaluate(answers);
    if (signal) signals.push(signal);
  }

  return {
    signals,
    answers,
    completedAt: new Date().toISOString(),
  };
}

/** Simple progress calculation: answered questions among currently-visible questions. */
export function calculateProgress(config: EligibilityConfig, answers: Answers): number {
  const visibleSteps = getVisibleSteps(config, answers);
  const allQuestions = visibleSteps.flatMap((s) => s.questions);
  if (allQuestions.length === 0) return 0;
  const answered = allQuestions.filter((q) => {
    const v = answers[q.id];
    return v !== undefined && v !== "" && !(Array.isArray(v) && v.length === 0);
  });
  return Math.round((answered.length / allQuestions.length) * 100);
}
