import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BenefitSelector } from "@/components/BenefitSelector";
import { FaqSection } from "@/components/ui/FaqSection";
import { BENEFITS } from "@/lib/benefits-data";

const HOMEPAGE_FAQS = [
  {
    question: "What benefits can I claim in the UK?",
    answer:
      "It depends entirely on your circumstances — income, savings, health, housing, and who you care for all play a part. Our Benefits Eligibility Checker asks a few guided questions and shows you which pathways may be worth exploring.",
  },
  {
    question: "Is BenefitsPlanner part of GOV.UK or DWP?",
    answer:
      "No — BenefitsPlanner is an independent planning tool, not affiliated with GOV.UK, DWP, HMRC, any local authority, or the NHS.",
  },
  {
    question: "Does using the Eligibility Checker count as making a claim?",
    answer:
      "No — it's a personal indication based on what you tell us, not an official application or entitlement decision. You'd still need to apply through the relevant official channel.",
  },
  {
    question: "Is my information kept private?",
    answer:
      "Yes — everything you enter stays on your own device in your browser; nothing is sent to or stored on our servers.",
  },
  {
    question: "Can I use more than one planner at once?",
    answer:
      "Yes — your Dashboard brings together progress across all your planners, evidence gathered, and upcoming deadlines in one place.",
  },
];

const STARTING_POINTS = [
  {
    title: "I don't know what I may be entitled to",
    body: "Start the Benefits Eligibility Checker. A few guided questions will show you which pathways may be worth exploring.",
    cta: "Check My Benefits",
    href: "/tools/benefits-eligibility-checker",
  },
  {
    title: "I know which benefit I'm interested in",
    body: "Choose a specific benefit and explore its eligibility criteria, rates, and planning tools directly.",
    cta: "Explore Benefits",
    href: "/benefits",
  },
  {
    title: "I already have a claim or decision",
    body: "Open your dashboard to see planner progress, evidence gathered, and upcoming deadlines across everything at a glance — or go straight to your Deadline & Review Planner or Challenge Planner.",
    cta: "Open My Dashboard",
    href: "/dashboard",
  },
];

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-navy-deep">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            background:
              "radial-gradient(60% 50% at 15% 10%, rgba(225,193,109,0.18) 0%, rgba(225,193,109,0) 60%), radial-gradient(50% 60% at 100% 100%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 60%)",
          }}
        />
        <Container className="relative flex flex-col items-start gap-10 py-20 sm:py-28">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-gold">
              Know what you may be entitled to. Plan what to do next.
            </p>
            <h1 className="mt-3 font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Find Out What Benefits You Could Be Entitled To
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Benefits Planner helps you explore UK benefits, check potential eligibility and plan
              your next steps — all in one place. Use our free benefits calculator and eligibility
              checker to see what may be worth exploring, then prepare applications, organise
              evidence and keep track of what happens next.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LinkButton
                href="/tools/benefits-eligibility-checker"
                size="lg"
                className="!bg-gold !text-navy-deep hover:!bg-white"
              >
                Start My Eligibility Check
              </LinkButton>
              <LinkButton
                href="/benefits"
                variant="secondary"
                size="lg"
                className="!border-white/30 !bg-transparent !text-white hover:!border-white"
              >
                Explore a Benefit
              </LinkButton>
            </div>
          </div>
          <Card className="w-full max-w-md !bg-white shadow-xl">
            <BenefitSelector />
          </Card>
        </Container>
      </section>

      <section>
        <Container className="py-20">
          <h2 className="font-display text-2xl font-semibold text-navy-deep sm:text-3xl">
            Find the right starting point
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {STARTING_POINTS.map((point) => (
              <Card
                key={point.title}
                className="flex flex-col justify-between border-t-4 !border-t-gold"
              >
                <div>
                  <h3 className="font-display text-lg font-semibold text-navy-deep">{point.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-slate">{point.body}</p>
                </div>
                <LinkButton href={point.href} variant="secondary" className="mt-6 self-start">
                  {point.cta}
                </LinkButton>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-off-white">
        <Container className="py-16">
          <h2 className="font-display text-xl font-semibold text-navy-deep">Explore by benefit</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {BENEFITS.map((b) => (
              <Link
                key={b.slug}
                href={`/benefits/${b.slug}`}
                className="focus-ring rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-navy-deep hover:border-navy-deep"
              >
                {b.name}
              </Link>
            ))}
          </div>
          <h2 className="mt-10 font-display text-xl font-semibold text-navy-deep">Planning tools</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            <Link href="/planners" className="focus-ring rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-navy-deep hover:border-navy-deep">
              All Planners
            </Link>
            <Link href="/tools/deadline-planner" className="focus-ring rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-navy-deep hover:border-navy-deep">
              Deadline &amp; Review Planner
            </Link>
            <Link href="/planners/challenge" className="focus-ring rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-navy-deep hover:border-navy-deep">
              Challenge Planner
            </Link>
            <Link href="/dashboard" className="focus-ring rounded-full border border-border bg-white px-4 py-2 text-sm font-medium text-navy-deep hover:border-navy-deep">
              My Benefits Dashboard
            </Link>
          </div>
        </Container>
      </section>

      <section className="border-t border-border bg-white">
        <Container className="py-16">
          <FaqSection items={HOMEPAGE_FAQS} />
        </Container>
      </section>

      <section className="border-t border-border bg-off-white">
        <Container className="py-16 text-sm leading-relaxed text-slate">
          <p>
            BenefitsPlanner is an independent planning tool. It is not GOV.UK, DWP, HMRC, your
            local authority, or the NHS, and using it is not the same as making an official claim.
            Anything shown as &ldquo;worth exploring&rdquo; is a structured indication based on
            what you tell us — never an entitlement decision.
          </p>
        </Container>
      </section>
    </>
  );
}
