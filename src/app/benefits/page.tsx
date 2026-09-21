import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Card } from "@/components/ui/Card";
import { BENEFITS } from "@/lib/benefits-data";

export const metadata: Metadata = {
  alternates: { canonical: "/benefits" },
  title: "Benefits directory",
  description: "Explore UK benefits and support, including eligibility criteria, current rates, and planning tools.",
};

export default function BenefitsDirectoryPage() {
  return (
    <div>
      <PageHero
        eyebrow="Benefits directory"
        title="Explore benefits and support"
        standfirst="Choose a benefit to see who it's for, current rates, and how to prepare — plus a planner where one exists."
      />
      <Container className="py-12">
        <div className="grid gap-6 sm:grid-cols-2">
          {BENEFITS.map((benefit) => (
            <Link key={benefit.slug} href={`/benefits/${benefit.slug}`} className="focus-ring block">
              <Card className="h-full border-t-4 !border-t-gold transition-shadow hover:shadow-md">
                <h2 className="font-display text-xl font-semibold text-navy-deep">{benefit.name}</h2>
                <p className="mt-3 text-sm leading-relaxed text-slate">{benefit.standfirst}</p>
              </Card>
            </Link>
          ))}
        </div>
      </Container>
    </div>
  );
}
