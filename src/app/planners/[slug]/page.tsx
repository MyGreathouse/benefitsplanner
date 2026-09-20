import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PLANNERS, getPlannerBySlug } from "@/lib/planner-data";
import { PlannerShell } from "@/components/planner/PlannerShell";
import { PipPlannerApp } from "@/components/pip-planner/PipPlannerApp";

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

  if (slug === "pip") return <PipPlannerApp />;

  return <PlannerShell config={planner} />;
}
