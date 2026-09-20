import Link from "next/link";
import { Container } from "@/components/ui/Container";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-navy-deep text-white">
      <Container className="py-12">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-display text-lg font-semibold">
              Benefits<span className="text-gold">Planner</span>
            </p>
            <p className="mt-3 max-w-xs text-sm text-white/70">
              Know what you may be entitled to. Plan what to do next.
            </p>
          </div>
          <div>
            <p className="text-sm font-semibold text-white/90">Explore</p>
            <ul className="mt-3 space-y-2 text-sm text-white/70">
              <li><Link href="/benefits" className="hover:text-white">All benefits</Link></li>
              <li><Link href="/tools/benefits-eligibility-checker" className="hover:text-white">Eligibility Checker</Link></li>
              <li><Link href="/planners" className="hover:text-white">Planners</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-sm font-semibold text-white/90">Important</p>
            <p className="mt-3 text-sm text-white/70">
              BenefitsPlanner is an independent planning tool, not affiliated with GOV.UK, DWP,
              HMRC, any local authority, or the NHS. It does not give legal or financial advice,
              and using it is not the same as making an official claim.
            </p>
          </div>
        </div>
        <p className="mt-10 border-t border-white/10 pt-6 text-xs text-white/50">
          © {new Date().getFullYear()} Risten Global Ltd. BenefitsPlanner is a trading name of Risten Global Ltd.
        </p>
      </Container>
    </footer>
  );
}
