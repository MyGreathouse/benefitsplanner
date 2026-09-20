// Core types for the reusable Eligibility Engine.
//
// Design goal: a benefit's questions, branching logic and eligibility
// signals are all *data*, not code. Adding a new benefit or changing a
// threshold should mean editing a config file under lib/benefits-data,
// never touching this engine or the UI components that render it.

export type AnswerValue = string | number | boolean | string[] | undefined;

export type Answers = Record<string, AnswerValue>;

/** A single selectable option for choice-type questions. */
export interface QuestionOption {
  value: string;
  label: string;
  hint?: string;
}

export type QuestionType =
  | "single-select"
  | "multi-select"
  | "number"
  | "currency"
  | "boolean"
  | "text"
  | "date";

export interface Question {
  id: string;
  type: QuestionType;
  prompt: string;
  helpText?: string;
  options?: QuestionOption[];
  unit?: string; // e.g. "per week", "per month"
  /**
   * Whether this question should be shown at all, given the answers so
   * far. Omit for "always show". Kept as a small predicate rather than a
   * declarative condition object for now — still centrally defined here
   * in config, not scattered through UI code.
   */
  visibleIf?: (answers: Answers) => boolean;
  /** Basic client-side validation. Return an error string, or undefined if valid. */
  validate?: (value: AnswerValue, answers: Answers) => string | undefined;
}

/** A logical group of questions shown together as one step. */
export interface QuestionStep {
  id: string;
  title: string;
  description?: string;
  questions: Question[];
  visibleIf?: (answers: Answers) => boolean;
}

export type SignalStrength = "worth-exploring" | "possibly-relevant" | "unlikely";

/**
 * An eligibility signal is NOT a decision. It is a structured indication,
 * derived from the answers given, that a pathway may be worth the user's
 * attention. See product principle: never claim official entitlement.
 */
export interface EligibilitySignal {
  benefitSlug: string;
  strength: SignalStrength;
  reasons: string[]; // plain-English reasons this pathway appeared
  missingInfo: string[]; // information still needed for a fuller picture
  caveats: string[]; // important caveats / disclaimers specific to this signal
}

/**
 * A rule evaluates the answers collected so far and, if triggered,
 * contributes one eligibility signal for a benefit. Keeping rules as
 * small independent functions (rather than one giant branching
 * conditional) is what makes the engine modular: each benefit config
 * supplies its own list of rules.
 */
export interface EligibilityRule {
  id: string;
  benefitSlug: string;
  description: string; // internal note on what this rule checks
  evaluate: (answers: Answers) => EligibilitySignal | null;
}

export interface EligibilityConfig {
  id: string;
  title: string;
  steps: QuestionStep[];
  rules: EligibilityRule[];
}

export interface EligibilityResult {
  signals: EligibilitySignal[];
  answers: Answers;
  completedAt: string;
}
