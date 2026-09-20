import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { LinkButton } from "@/components/ui/Button";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { SourceCard } from "@/components/ui/SourceCard";
import { BENEFITS, getBenefitBySlug } from "@/lib/benefits-data";

export function generateStaticParams() {
  return BENEFITS.map((b) => ({ slug: b.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const benefit = getBenefitBySlug(slug);
  if (!benefit) return {};
  return {
    title: benefit.name,
    description: benefit.standfirst,
  };
}

export default async function BenefitPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const benefit = getBenefitBySlug(slug);
  if (!benefit) notFound();

  return (
    <Container className="py-16">
      <div className="max-w-3xl">
        <h1 className="font-display text-3xl font-semibold text-navy-deep sm:text-4xl">
          {benefit.name}
        </h1>
        <p className="mt-4 text-lg text-slate">{benefit.standfirst}</p>
        {benefit.jurisdictionNote && (
          <p className="mt-3 text-sm text-slate">
            <strong className="text-navy-deep">Note: </strong>
            {benefit.jurisdictionNote}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <LinkButton href="/tools/benefits-eligibility-checker" variant="secondary">
            Check My Eligibility
          </LinkButton>
          {benefit.plannerSlug && (
            <LinkButton href={`/planners/${benefit.plannerSlug}`}>
              Start {benefit.plannerLabel}
            </LinkButton>
          )}
        </div>
      </div>

      <div className="mt-12 max-w-3xl space-y-10">
        {benefit.sections.map((section) => (
          <div key={section.heading}>
            <h2 className="font-display text-xl font-semibold text-navy-deep">{section.heading}</h2>
            {section.body.map((p, i) => (
              <p key={i} className="mt-3 text-sm leading-relaxed text-slate">
                {p}
              </p>
            ))}
            {section.bullets && (
              <ul className="mt-3 list-disc space-y-1.5 pl-5 text-sm leading-relaxed text-slate">
                {section.bullets.map((b, i) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>

      <div className="mt-12 max-w-3xl">
        <Disclaimer />
      </div>

      <div className="mt-10 max-w-3xl">
        <h2 className="font-display text-lg font-semibold text-navy-deep">Official sources</h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          {benefit.sources.map((source) => (
            <SourceCard key={source.url} source={source} />
          ))}
        </div>
      </div>
    </Container>
  );
}
