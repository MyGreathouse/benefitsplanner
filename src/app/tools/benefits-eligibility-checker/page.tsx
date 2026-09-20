import type { Metadata } from "next";
import { Container } from "@/components/ui/Container";
import { EligibilityChecker } from "@/components/checker/EligibilityChecker";

export const metadata: Metadata = {
  title: "Benefits Eligibility Checker",
  description:
    "A guided, step-by-step check of which UK benefits may be worth exploring based on your circumstances.",
};

export default function EligibilityCheckerPage() {
  return (
    <Container className="py-16">
      <div className="mx-auto max-w-2xl">
        <h1 className="font-display text-3xl font-semibold text-navy-deep sm:text-4xl">
          Benefits Eligibility Checker
        </h1>
        <p className="mt-4 text-slate">
          Answer a few questions about your circumstances. We&rsquo;ll show you which pathways may
          be worth exploring — this isn&rsquo;t an official decision, and your answers stay on
          this device.
        </p>
        <div className="mt-10">
          <EligibilityChecker />
        </div>
      </div>
    </Container>
  );
}
