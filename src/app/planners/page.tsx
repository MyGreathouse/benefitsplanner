import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { PLANNERS } from "@/lib/planner-data";

export const metadata: Metadata = {
  title: "Planners",
  description: "Open a planner to prepare an application, organise evidence, and track progress for PIP, Universal Credit, SEND/EHCP, Carer's Support, or Council Tax Support.",
};

export default function PlannersIndexPage() {
  return (
    <Container className="py-16">
      <h1 className="font-display text-3xl font-semibold text-navy-deep sm:text-4xl">Planners</h1>
      <p className="mt-4 max-w-2xl text-slate">
        Each planner walks through the same shape — overview, eligibility, preparation, evidence,
        documents, timeline and next steps — tailored to that benefit or process.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {PLANNERS.map((planner) => (
          <Link key={planner.slug} href={`/planners/${planner.slug}`} className="focus-ring block">
            <Card className="h-full transition-shadow hover:shadow-md">
              <h2 className="font-display text-xl font-semibold text-navy-deep">{planner.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate">{planner.standfirst}</p>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}
