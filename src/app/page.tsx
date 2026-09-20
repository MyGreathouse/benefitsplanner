import { Container } from "@/components/ui/Container";
import { LinkButton } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { BenefitSelector } from "@/components/BenefitSelector";

const STARTING_POINTS = [
  {
    title: "I don't know what I may be entitled to",
    body: "Start the Benefits Eligibility Checker. A few guided questions will show you which pathways may be worth exploring.",
    cta: "Check My Eligibility",
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
    body: "Open the relevant planner to prepare your application, organise evidence, or plan a challenge.",
    cta: "Open My Planner",
    href: "/planners",
  },
];

export default function Home() {
  return (
    <>
      <section className="border-b border-border bg-gradient-to-b from-off-white to-white">
        <Container className="flex flex-col items-start gap-8 py-20 sm:py-28">
          <div className="max-w-2xl">
            <h1 className="font-display text-4xl font-semibold leading-tight text-navy-deep sm:text-5xl">
              Know what you may be entitled to. Plan what to do next.
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-slate">
              Explore benefits and support, understand the eligibility criteria that may apply to
              your circumstances, prepare applications, organise evidence and keep track of what
              happens next.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <LinkButton href="/tools/benefits-eligibility-checker" size="lg">
                Start My Eligibility Check
              </LinkButton>
              <LinkButton href="/benefits" variant="secondary" size="lg">
                Explore a Benefit
              </LinkButton>
            </div>
          </div>
          <Card className="w-full max-w-md">
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
              <Card key={point.title} className="flex flex-col justify-between">
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
