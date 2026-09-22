import type { Metadata } from "next";
import Link from "next/link";
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
  title: "Benefits Eligibility Checker UK | What Benefits Can I Claim?",
  description:
    "Use our free UK benefits eligibility checker to explore benefits you may be entitled to, including Universal Credit, PIP, Carer's Allowance and more.",
  openGraph: {
    title: "Benefits Eligibility Checker UK | What Benefits Can I Claim?",
    description:
      "Use our free UK benefits eligibility checker to explore benefits you may be entitled to, including Universal Credit, PIP, Carer's Allowance and more.",
    url: "https://benefitsplanner.co.uk/tools/benefits-eligibility-checker",
    siteName: "BenefitsPlanner",
    locale: "en_GB",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Benefits Eligibility Checker UK | What Benefits Can I Claim?",
    description:
      "Use our free UK benefits eligibility checker to explore benefits you may be entitled to, including Universal Credit, PIP, Carer's Allowance and more.",
  },
};

export default function EligibilityCheckerPage() {
  return (
    <div>
      <PageHero
        eyebrow="Tool"
        title="What Benefits Could You Be Entitled To?"
        standfirst="Answer a few questions about your circumstances to identify benefits and support that may be worth exploring. This checker provides an indication only — it is not an official benefits decision or guarantee of entitlement, and your answers stay on this device."
      />
      <Container className="py-12">
        <div className="mx-auto max-w-2xl">
          <EligibilityChecker />
        </div>
        <div className="mx-auto mt-16 max-w-2xl">
          <FaqSection items={CHECKER_FAQS} />
        </div>
        <div className="mx-auto mt-16 max-w-2xl">
          <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">
            Or explore a specific benefit
          </h2>
          <div className="mt-4 flex flex-wrap gap-3">
            <Link href="/benefits/pip" className="focus-ring rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-navy-deep hover:border-navy-deep">
              PIP
            </Link>
            <Link href="/benefits/universal-credit" className="focus-ring rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-navy-deep hover:border-navy-deep">
              Universal Credit
            </Link>
            <Link href="/benefits/carers-allowance" className="focus-ring rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-navy-deep hover:border-navy-deep">
              Carer&rsquo;s Allowance
            </Link>
            <Link href="/benefits" className="focus-ring rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-navy-deep hover:border-navy-deep">
              View all benefits
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
