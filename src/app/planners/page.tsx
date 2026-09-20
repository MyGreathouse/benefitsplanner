import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Card } from "@/components/ui/Card";
import { PLANNERS } from "@/lib/planner-data";

export const metadata: Metadata = {
  title: "Planners",
  description: "Open a planner to prepare an application, organise evidence, and track progress for PIP, Universal Credit, SEND/EHCP, Carer's Support, or Council Tax Support.",
};

export default function PlannersIndexPage() {
  return (
    <div>
      <PageHero
        eyebrow="Planners"
        title="Open your planner"
        standfirst="Each planner walks through the same shape — overview, eligibility, preparation, evidence, documents, timeline and next steps — tailored to that benefit or process, with a readiness score as you go."
      />
      <Container className="py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          {PLANNERS.map((planner) => (
            <Link key={planner.slug} href={`/planners/${planner.slug}`} className="focus-ring block">
              <Card className="h-full border-t-4 !border-t-gold transition-shadow hover:shadow-md">
                <h2 className="font-display text-xl font-semibold text-navy-deep">{planner.title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate">{planner.standfirst}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
