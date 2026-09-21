import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { EligibilityChecker } from "@/components/checker/EligibilityChecker";
import { FaqSection } from "@/components/ui/FaqSection";

const CHECKER_FAQS = [
  {
    question: "What does \"worth exploring\" mean?",
    answer: "It means your answers suggest a pathway may apply to you — it's a structured indication, not an official entitlement decision.",
  },
  {
    question: "Can I go back and change my answers?",
    answer: "Yes — you can review and edit your answers before seeing your results, and revisit the checker any time afterwards.",
  },
  {
    question: "Does the checker send my answers anywhere?",
    answer: "No — your answers are saved only in your own browser on this device, so you can leave and come back without losing progress.",
  },
  {
    question: "Why didn't a benefit I expected show up?",
    answer: "The checker currently covers a specific set of benefits and rules — if nothing appeared, it doesn't rule out other support, and you can browse the full benefits directory separately.",
  },
];

export const metadata: Metadata = {
  alternates: { canonical: "/tools/benefits-eligibility-checker" },
  title: "Benefits Eligibility Checker",
  description:
    "A guided, step-by-step check of which UK benefits may be worth exploring based on your circumstances.",
};

export default function EligibilityCheckerPage() {
  return (
    <div>
      <PageHero
        eyebrow="Tool"
        title="Benefits Eligibility Checker"
        standfirst="Answer a few questions about your circumstances. We'll show you which pathways may be worth exploring — this isn't an official decision, and your answers stay on this device."
      />
      <Container className="py-12">
        <div className="mx-auto max-w-2xl">
          <EligibilityChecker />
        </div>
        <div className="mx-auto mt-16 max-w-2xl">
          <FaqSection items={CHECKER_FAQS} />
        </div>
      </Container>
    </div>
  );
}
