import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PLANNERS, getPlannerBySlug } from "@/lib/planner-data";
import { PipPlannerApp } from "@/components/pip-planner/PipPlannerApp";
import { UcPlannerApp } from "@/components/uc-planner/UcPlannerApp";
import { CarersPlannerApp } from "@/components/carers-planner/CarersPlannerApp";
import { SendPlannerApp } from "@/components/send-planner/SendPlannerApp";
import { CtsPlannerApp } from "@/components/cts-planner/CtsPlannerApp";
import { ChallengePlannerApp } from "@/components/challenge-planner/ChallengePlannerApp";

export function generateStaticParams() {
  return PLANNERS.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const planner = getPlannerBySlug(slug);
  if (!planner) return {};
  return { title: planner.title, description: planner.standfirst };
}

export default async function PlannerPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const planner = getPlannerBySlug(slug);
  if (!planner) notFound();

  switch (slug) {
    case "pip":
      return <PipPlannerApp />;
    case "universal-credit":
      return <UcPlannerApp />;
    case "carers-support":
      return <CarersPlannerApp />;
    case "send-ehcp":
      return <SendPlannerApp />;
    case "council-tax-support":
      return <CtsPlannerApp />;
    case "challenge":
      return <ChallengePlannerApp />;
    default:
      notFound();
  }
}
