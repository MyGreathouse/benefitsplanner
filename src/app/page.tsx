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
            <h1 className="font-display text-4xl font-semibold leading-tight text-white sm:text-5xl">
              Know what you may be entitled to.{" "}
              <span className="text-gold">Plan what to do next.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-white/75">
              Explore benefits and support, understand the eligibility criteria that may apply to
              your circumstances, prepare applications, organise evidence and keep track of what
              happens next.
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
