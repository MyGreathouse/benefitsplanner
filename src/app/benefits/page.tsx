import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Card } from "@/components/ui/Card";
import { BENEFITS } from "@/lib/benefits-data";

export const metadata: Metadata = {
  title: "Benefits directory",
  description: "Explore UK benefits and support, including eligibility criteria, current rates, and planning tools.",
};

export default function BenefitsDirectoryPage() {
  return (
    <Container className="py-16">
      <h1 className="font-display text-3xl font-semibold text-navy-deep sm:text-4xl">
        Explore benefits and support
      </h1>
      <p className="mt-4 max-w-2xl text-slate">
        Choose a benefit to see who it&rsquo;s for, current rates, and how to prepare — plus a
        planner where one exists.
      </p>
      <div className="mt-10 grid gap-6 sm:grid-cols-2">
        {BENEFITS.map((benefit) => (
          <Link key={benefit.slug} href={`/benefits/${benefit.slug}`} className="focus-ring block">
            <Card className="h-full transition-shadow hover:shadow-md">
              <h2 className="font-display text-xl font-semibold text-navy-deep">{benefit.name}</h2>
              <p className="mt-3 text-sm leading-relaxed text-slate">{benefit.standfirst}</p>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
}
