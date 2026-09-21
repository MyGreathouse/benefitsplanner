import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { EligibilityChecker } from "@/components/checker/EligibilityChecker";

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
      </Container>
    </div>
  );
}
