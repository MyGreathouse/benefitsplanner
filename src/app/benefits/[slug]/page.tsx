import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
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
    <div>
      <PageHero eyebrow="Benefit" title={benefit.name} standfirst={benefit.standfirst}>
        <div className="mt-6 flex flex-wrap gap-3">
          <LinkButton
            href="/tools/benefits-eligibility-checker"
            variant="secondary"
            className="!border-white/30 !bg-transparent !text-white hover:!border-white"
          >
            Check My Eligibility
          </LinkButton>
          {benefit.plannerSlug && (
            <LinkButton href={`/planners/${benefit.plannerSlug}`} className="!bg-gold !text-navy-deep hover:!bg-white">
              Start {benefit.plannerLabel}
            </LinkButton>
          )}
        </div>
      </PageHero>

      <Container className="py-12">
        <div className="max-w-3xl">
          {benefit.jurisdictionNote && (
            <p className="rounded-xl border border-border bg-off-white p-4 text-sm text-slate">
              <strong className="text-navy-deep">Note: </strong>
              {benefit.jurisdictionNote}
            </p>
          )}

          <div className="mt-10 space-y-10">
            {benefit.sections.map((section) => (
              <div key={section.heading}>
                <h2 className="border-l-4 border-gold pl-3 font-display text-xl font-semibold text-navy-deep">
                  {section.heading}
                </h2>
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

          <div className="mt-12">
            <Disclaimer />
          </div>

          <div className="mt-10">
            <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">
              Official sources
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {benefit.sources.map((source) => (
                <SourceCard key={source.url} source={source} />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
