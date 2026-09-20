import type { Answers, EligibilityConfig, EligibilityRule } from "./types";

// Used only to decide which questions to *show* (e.g. hide "caring for"
// framing once we know someone isn't caring for anyone). Not a claim about
// anyone's actual State Pension date, which depends on date of birth.
const APPROX_STATE_PENSION_AGE = 66;

function num(answers: Answers, id: string): number | undefined {
  const v = answers[id];
  return typeof v === "number" ? v : undefined;
}

function str(answers: Answers, id: string): string | undefined {
  const v = answers[id];
  return typeof v === "string" ? v : undefined;
}

function bool(answers: Answers, id: string): boolean | undefined {
  const v = answers[id];
  return typeof v === "boolean" ? v : undefined;
}

export const checkerConfig: EligibilityConfig = {
  id: "benefits-eligibility-checker",
  title: "Benefits Eligibility Checker",
  steps: [
    {
      id: "who-for",
      title: "Who are you checking for?",
      questions: [
        {
          id: "checking-for",
          type: "single-select",
          prompt: "Who are you checking for?",
          options: [
            { value: "myself", label: "Myself" },
            { value: "partner", label: "My partner" },
            { value: "child", label: "My child" },
            { value: "household", label: "My household" },
            { value: "someone-i-care-for", label: "Someone I care for" },
          ],
        },
      ],
    },
    {
      id: "basics",
      title: "Basic circumstances",
      description: "Just enough to work out which pathways may be worth exploring.",
      questions: [
        {
          id: "age",
          type: "number",
          prompt: "What is your age?",
          helpText: "Used only to work out which benefits apply — nothing is stored beyond this session unless you save it.",
          validate: (v) => {
            if (typeof v !== "number" || v < 0 || v > 120) return "Enter a valid age.";
            return undefined;
          },
        },
        {
          id: "household-type",
          type: "single-select",
          prompt: "What's your household type?",
          options: [
            { value: "single", label: "Single" },
            { value: "couple", label: "Couple (living together or married/civil partnership)" },
          ],
        },
        {
          id: "has-children",
          type: "boolean",
          prompt: "Do you have any dependent children living with you?",
        },
        {
          id: "employment-status",
          type: "single-select",
          prompt: "What's your current employment situation?",
          options: [
            { value: "employed", label: "Employed" },
            { value: "self-employed", label: "Self-employed" },
            { value: "unemployed", label: "Not currently working" },
            { value: "unable-to-work", label: "Unable to work due to health or disability" },
            { value: "retired", label: "Retired" },
          ],
        },
        {
          id: "monthly-earnings",
          type: "currency",
          prompt: "Roughly what are your (and your partner's, if applicable) combined monthly earnings after tax?",
          unit: "per month",
          visibleIf: (a) => str(a, "employment-status") === "employed" || str(a, "employment-status") === "self-employed",
        },
        {
          id: "savings",
          type: "currency",
          prompt: "Roughly how much do you (and your partner, if applicable) have in savings and investments combined?",
          unit: "total",
        },
        {
          id: "housing-tenure",
          type: "single-select",
          prompt: "What's your housing situation?",
          options: [
            { value: "renting", label: "Renting" },
            { value: "mortgage", label: "Paying a mortgage" },
            { value: "owns-outright", label: "Own outright" },
            { value: "living-with-family", label: "Living with family or friends" },
            { value: "other", label: "Other" },
          ],
        },
        {
          id: "liable-for-council-tax",
          type: "boolean",
          prompt: "Are you responsible for paying Council Tax on your home?",
        },
      ],
    },
    {
      id: "health",
      title: "Health and disability",
      questions: [
        {
          id: "has-health-condition",
          type: "boolean",
          prompt: "Do you have a long-term physical or mental health condition or disability that affects your daily living or getting around?",
        },
        {
          id: "condition-duration",
          type: "single-select",
          prompt: "Have these difficulties lasted, or are they expected to last, at least 9 more months from now (on top of having already lasted 3 months)?",
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "not-sure", label: "Not sure" },
          ],
          visibleIf: (a) => bool(a, "has-health-condition") === true,
        },
      ],
    },
    {
      id: "caring",
      title: "Caring responsibilities",
      questions: [
        {
          id: "provides-care",
          type: "boolean",
          prompt: "Do you regularly look after someone who needs care because of an illness, disability, or old age?",
        },
        {
          id: "care-hours",
          type: "number",
          prompt: "Roughly how many hours a week do you spend caring for them?",
          unit: "hours/week",
          visibleIf: (a) => bool(a, "provides-care") === true,
        },
        {
          id: "cared-for-gets-disability-benefit",
          type: "single-select",
          prompt: "Does the person you care for receive a disability benefit such as PIP, Attendance Allowance, or DLA?",
          options: [
            { value: "yes", label: "Yes" },
            { value: "no", label: "No" },
            { value: "not-sure", label: "Not sure" },
          ],
          visibleIf: (a) => bool(a, "provides-care") === true,
        },
      ],
    },
    {
      id: "pension",
      title: "Pension status",
      questions: [
        {
          id: "reached-state-pension-age",
          type: "boolean",
          prompt: "Have you reached State Pension age?",
          helpText: "If you're not sure, check your State Pension age on GOV.UK — the answer here only affects which pathways we suggest exploring.",
        },
      ],
    },
    {
      id: "existing-benefits",
      title: "Existing benefits",
      questions: [
        {
          id: "current-benefits",
          type: "multi-select",
          prompt: "Are you already receiving any of these?",
          options: [
            { value: "universal-credit", label: "Universal Credit" },
            { value: "pip", label: "PIP" },
            { value: "carers-allowance", label: "Carer's Allowance" },
            { value: "council-tax-support", label: "Council Tax Reduction / Support" },
            { value: "child-benefit", label: "Child Benefit" },
            { value: "attendance-allowance", label: "Attendance Allowance" },
            { value: "pension-credit", label: "Pension Credit" },
            { value: "esa", label: "ESA" },
            { value: "dla", label: "DLA" },
            { value: "none", label: "None of these" },
          ],
        },
      ],
    },
  ],
  rules: buildRules(),
};

function buildRules(): EligibilityRule[] {
  return [
    {
      id: "uc-worth-exploring",
      benefitSlug: "universal-credit",
      description: "Under State Pension age, on low income or out of work, savings under £16,000",
      evaluate: (a) => {
        const alreadyClaims = Array.isArray(a["current-benefits"]) && (a["current-benefits"] as string[]).includes("universal-credit");
        if (alreadyClaims) return null;

        const age = num(a, "age");
        const reachedPensionAge = bool(a, "reached-state-pension-age");
        const employment = str(a, "employment-status");
        const savings = num(a, "savings");

        if (age === undefined || employment === undefined) return null;
        if (reachedPensionAge === true || (age !== undefined && age >= APPROX_STATE_PENSION_AGE)) return null;
        if (savings !== undefined && savings > 16000) return null;

        const lowIncomeOrOut = ["unemployed", "unable-to-work", "employed", "self-employed"].includes(employment);
        if (!lowIncomeOrOut) return null;

        const reasons = ["You're under State Pension age", "Your circumstances suggest a low income or being out of work"];
        const missingInfo: string[] = [];
        const caveats = [
          "This is a general indication, not an entitlement decision — your actual award depends on full household income, housing costs and any other elements you may qualify for.",
        ];

        if (savings !== undefined && savings > 6000) {
          caveats.push("Savings between £6,000 and £16,000 usually reduce the amount you'd get, rather than ruling you out.");
        }
        if (savings === undefined) missingInfo.push("Your exact savings and capital");
        if (str(a, "monthly-earnings") === undefined && (employment === "employed" || employment === "self-employed")) {
          missingInfo.push("Your exact monthly earnings");
        }

        return {
          benefitSlug: "universal-credit",
          strength: "worth-exploring",
          reasons,
          missingInfo,
          caveats,
        };
      },
    },
    {
      id: "pip-worth-exploring",
      benefitSlug: "pip",
      description: "Has a long-term health condition/disability expected to last 9+ months, working age range",
      evaluate: (a) => {
        const alreadyClaims = Array.isArray(a["current-benefits"]) && (a["current-benefits"] as string[]).includes("pip");
        if (alreadyClaims) return null;

        const hasCondition = bool(a, "has-health-condition");
        if (hasCondition !== true) return null;

        const age = num(a, "age");
        if (age !== undefined && age < 16) return null;
        if (age !== undefined && age >= APPROX_STATE_PENSION_AGE) {
          // Over State Pension age: point towards Attendance Allowance instead, not PIP.
          return null;
        }

        const duration = str(a, "condition-duration");
        const reasons = ["You've told us you have a long-term health condition or disability affecting daily living or mobility"];
        const missingInfo: string[] = [];
        const caveats = [
          "PIP isn't means-tested, but it is assessed using a points system across specific daily living and mobility activities — having a condition doesn't automatically mean a particular rate, or any award.",
        ];

        let strength: "worth-exploring" | "possibly-relevant" = "worth-exploring";
        if (duration === "no") {
          strength = "possibly-relevant";
          caveats.push("PIP generally requires difficulties to have lasted 3 months and be expected to continue for at least 9 more — your answer suggests this may not yet be met.");
        } else if (duration === "not-sure" || duration === undefined) {
          missingInfo.push("Whether your difficulties are expected to last at least 9 more months");
        }

        return {
          benefitSlug: "pip",
          strength,
          reasons,
          missingInfo,
          caveats,
        };
      },
    },
    {
      id: "carers-worth-exploring",
      benefitSlug: "carers-allowance",
      description: "Provides 35+ hours/week care to someone on a qualifying disability benefit",
      evaluate: (a) => {
        const alreadyClaims = Array.isArray(a["current-benefits"]) && (a["current-benefits"] as string[]).includes("carers-allowance");
        if (alreadyClaims) return null;

        const providesCare = bool(a, "provides-care");
        if (providesCare !== true) return null;

        const hours = num(a, "care-hours");
        const caredForBenefit = str(a, "cared-for-gets-disability-benefit");

        const reasons = ["You've told us you provide regular care for someone"];
        const missingInfo: string[] = [];
        const caveats = [
          "Carer's Allowance has a weekly earnings limit — if you work, your net earnings need to stay under it.",
        ];

        let strength: "worth-exploring" | "possibly-relevant" = "possibly-relevant";

        if (hours !== undefined && hours >= 35 && caredForBenefit === "yes") {
          strength = "worth-exploring";
          reasons.push("You care for at least 35 hours a week for someone who receives a qualifying disability benefit");
        } else {
          if (hours === undefined) missingInfo.push("How many hours a week you provide care");
          else if (hours < 35) caveats.push("Carer's Allowance generally requires at least 35 hours of care a week — wider carer's support may still be relevant even if the Allowance itself isn't.");
          if (caredForBenefit !== "yes") missingInfo.push("Whether the person you care for receives a qualifying disability benefit");
        }

        return {
          benefitSlug: "carers-allowance",
          strength,
          reasons,
          missingInfo,
          caveats,
        };
      },
    },
    {
      id: "cts-worth-exploring",
      benefitSlug: "council-tax-support",
      description: "Liable for Council Tax and on a low income or already claiming another benefit",
      evaluate: (a) => {
        const alreadyClaims = Array.isArray(a["current-benefits"]) && (a["current-benefits"] as string[]).includes("council-tax-support");
        if (alreadyClaims) return null;

        const liable = bool(a, "liable-for-council-tax");
        if (liable !== true) return null;

        const employment = str(a, "employment-status");
        const lowIncomeSignal = ["unemployed", "unable-to-work", "retired"].includes(employment ?? "") ||
          (Array.isArray(a["current-benefits"]) && (a["current-benefits"] as string[]).some((b) => b !== "none"));

        if (!lowIncomeSignal && employment !== "employed" && employment !== "self-employed") return null;

        return {
          benefitSlug: "council-tax-support",
          strength: lowIncomeSignal ? "worth-exploring" : "possibly-relevant",
          reasons: ["You're responsible for Council Tax and your circumstances suggest a scheme in your area could apply"],
          missingInfo: ["Which local authority you live in", "Your council's specific Council Tax Reduction scheme rules"],
          caveats: [
            "Council Tax Reduction is run locally — the exact rules, and whether you qualify, depend entirely on your council's own scheme.",
          ],
        };
      },
    },
    {
      id: "child-benefit-worth-exploring",
      benefitSlug: "child-benefit",
      description: "Has dependent children living with them",
      evaluate: (a) => {
        const alreadyClaims = Array.isArray(a["current-benefits"]) && (a["current-benefits"] as string[]).includes("child-benefit");
        if (alreadyClaims) return null;

        if (bool(a, "has-children") !== true) return null;

        return {
          benefitSlug: "child-benefit",
          strength: "worth-exploring",
          reasons: ["You've told us you have dependent children living with you"],
          missingInfo: ["Your (and your partner's) individual adjusted net income, to check the High Income Child Benefit Charge"],
          caveats: [
            "Child Benefit itself isn't means-tested, but a tax charge can claw some or all of it back if you or your partner earn over £60,000 — many households still find it worth claiming regardless.",
          ],
        };
      },
    },
    {
      id: "attendance-allowance-worth-exploring",
      benefitSlug: "attendance-allowance",
      description: "Over State Pension age with a health condition or disability affecting daily living",
      evaluate: (a) => {
        const alreadyClaims = Array.isArray(a["current-benefits"]) && (a["current-benefits"] as string[]).includes("attendance-allowance");
        if (alreadyClaims) return null;

        const age = num(a, "age");
        const reachedPensionAge = bool(a, "reached-state-pension-age");
        const overPensionAge = reachedPensionAge === true || (age !== undefined && age >= APPROX_STATE_PENSION_AGE);
        if (!overPensionAge) return null;

        if (bool(a, "has-health-condition") !== true) return null;

        return {
          benefitSlug: "attendance-allowance",
          strength: "worth-exploring",
          reasons: ["You're over State Pension age and have told us you have a condition affecting daily living"],
          missingInfo: ["Whether you need help or supervision during the day, at night, or both"],
          caveats: [
            "Attendance Allowance isn't means-tested — it's based on the level of care or supervision you need, not your income or savings.",
          ],
        };
      },
    },
    {
      id: "pension-credit-worth-exploring",
      benefitSlug: "pension-credit",
      description: "Over State Pension age on a potentially low income",
      evaluate: (a) => {
        const alreadyClaims = Array.isArray(a["current-benefits"]) && (a["current-benefits"] as string[]).includes("pension-credit");
        if (alreadyClaims) return null;

        const age = num(a, "age");
        const reachedPensionAge = bool(a, "reached-state-pension-age");
        const overPensionAge = reachedPensionAge === true || (age !== undefined && age >= APPROX_STATE_PENSION_AGE);
        if (!overPensionAge) return null;

        const employment = str(a, "employment-status");
        const savings = num(a, "savings");

        // Only surface this where there's some signal of lower income — retired/unemployed, or savings not obviously high.
        const lowIncomeSignal = employment === "retired" || employment === "unemployed" || (savings !== undefined && savings < 16000);
        if (!lowIncomeSignal) return null;

        return {
          benefitSlug: "pension-credit",
          strength: "possibly-relevant",
          reasons: ["You're over State Pension age, and your circumstances don't rule out a low income"],
          missingInfo: ["Your exact weekly income from all sources, including any pensions"],
          caveats: [
            "Many eligible pensioners assume savings or a partner's income rules them out — it's usually worth checking properly rather than assuming.",
          ],
        };
      },
    },
    {
      id: "esa-worth-exploring",
      benefitSlug: "esa",
      description: "Unable to work due to health, under State Pension age",
      evaluate: (a) => {
        const alreadyClaims = Array.isArray(a["current-benefits"]) && (a["current-benefits"] as string[]).includes("esa");
        if (alreadyClaims) return null;

        const employment = str(a, "employment-status");
        if (employment !== "unable-to-work") return null;

        const age = num(a, "age");
        const reachedPensionAge = bool(a, "reached-state-pension-age");
        if (reachedPensionAge === true || (age !== undefined && age >= APPROX_STATE_PENSION_AGE)) return null;

        return {
          benefitSlug: "esa",
          strength: "possibly-relevant",
          reasons: ["You've told us you're unable to work due to health, and are under State Pension age"],
          missingInfo: ["Your National Insurance contribution record for the last 2–3 tax years, which New Style ESA depends on"],
          caveats: [
            "New Style ESA depends on your own National Insurance contributions rather than household income — this can't be checked from the answers here.",
          ],
        };
      },
    },
    {
      id: "dla-worth-exploring",
      benefitSlug: "dla",
      description: "Checking for a child under 16 with a health condition or disability",
      evaluate: (a) => {
        const alreadyClaims = Array.isArray(a["current-benefits"]) && (a["current-benefits"] as string[]).includes("dla");
        if (alreadyClaims) return null;

        if (str(a, "checking-for") !== "child") return null;
        if (bool(a, "has-health-condition") !== true) return null;

        const age = num(a, "age");
        if (age !== undefined && age >= 16) return null;

        return {
          benefitSlug: "dla",
          strength: "worth-exploring",
          reasons: ["You're checking for a child with a health condition or disability"],
          missingInfo: ["Whether the child needs substantially more care or supervision than other children their age"],
          caveats: [
            "DLA for children is separate from adult disability benefits — for a child turning 16, a PIP claim generally needs to start instead.",
          ],
        };
      },
    },
  ];
}
