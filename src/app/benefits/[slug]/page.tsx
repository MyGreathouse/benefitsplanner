import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Disclaimer } from "@/components/ui/Disclaimer";
import { SourceCard } from "@/components/ui/SourceCard";
import { FaqSection } from "@/components/ui/FaqSection";
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
  const title = benefit.seoTitle ?? benefit.name;
  const description = benefit.seoDescription ?? benefit.standfirst;
  return {
    title,
    description,
    alternates: { canonical: `/benefits/${benefit.slug}` },
    openGraph: {
      title,
      description,
      url: `https://benefitsplanner.co.uk/benefits/${benefit.slug}`,
      siteName: "BenefitsPlanner",
      locale: "en_GB",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function BenefitPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const benefit = getBenefitBySlug(slug);
  if (!benefit) notFound();

  const lastReviewed = benefit.sources.reduce<string | undefined>((latest, s) => {
    if (!latest || s.dateChecked > latest) return s.dateChecked;
    return latest;
  }, undefined);

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://benefitsplanner.co.uk/" },
      { "@type": "ListItem", position: 2, name: "Benefits", item: "https://benefitsplanner.co.uk/benefits" },
      { "@type": "ListItem", position: 3, name: benefit.name, item: `https://benefitsplanner.co.uk/benefits/${benefit.slug}` },
    ],
  };

  const otherBenefits = BENEFITS.filter((b) => b.slug !== benefit.slug).slice(0, 4);

  return (
    <div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }} />
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
        <nav aria-label="Breadcrumb" className="mb-6 text-xs text-slate">
          <Link href="/" className="hover:text-navy-deep hover:underline">Home</Link>
          {" / "}
          <Link href="/benefits" className="hover:text-navy-deep hover:underline">Benefits</Link>
          {" / "}
          <span className="text-navy-deep">{benefit.name}</span>
        </nav>

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

          {benefit.faqs && benefit.faqs.length > 0 && (
            <div className="mt-12">
              <FaqSection items={benefit.faqs} />
            </div>
          )}

          <div className="mt-12">
            <Disclaimer />
          </div>

          <div className="mt-10">
            <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">
              Official sources
            </h2>
            {lastReviewed && <p className="mt-2 text-xs text-slate">Page last reviewed against official sources: {lastReviewed}</p>}
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {benefit.sources.map((source) => (
                <SourceCard key={source.url} source={source} />
              ))}
            </div>
          </div>

          <div className="mt-12">
            <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">
              Related tools and benefits
            </h2>
            <div className="mt-4 flex flex-wrap gap-3">
              <Card padded={false} className="px-4 py-2">
                <Link href="/tools/benefits-eligibility-checker" className="text-sm font-medium text-navy-deep hover:underline">
                  Benefits Eligibility Checker
                </Link>
              </Card>
              <Card padded={false} className="px-4 py-2">
                <Link href="/planners/challenge" className="text-sm font-medium text-navy-deep hover:underline">
                  Challenge Planner
                </Link>
              </Card>
              <Card padded={false} className="px-4 py-2">
                <Link href="/tools/deadline-planner" className="text-sm font-medium text-navy-deep hover:underline">
                  Deadline &amp; Review Planner
                </Link>
              </Card>
              {otherBenefits.map((b) => (
                <Card key={b.slug} padded={false} className="px-4 py-2">
                  <Link href={`/benefits/${b.slug}`} className="text-sm font-medium text-navy-deep hover:underline">
                    {b.name}
                  </Link>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
