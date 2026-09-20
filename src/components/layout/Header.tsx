import Link from "next/link";
import { Container } from "@/components/ui/Container";

const NAV_LINKS = [
  { href: "/benefits", label: "Benefits" },
  { href: "/tools/benefits-eligibility-checker", label: "Eligibility Checker" },
  { href: "/planners", label: "Planners" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-border bg-white/95 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="focus-ring flex items-center gap-2">
          <span className="font-display text-lg font-semibold text-navy-deep">
            Benefits<span className="text-gold">Planner</span>
          </span>
        </Link>
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="focus-ring text-sm font-medium text-slate hover:text-navy-deep"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <Link
          href="/tools/benefits-eligibility-checker"
          className="focus-ring hidden rounded-lg bg-navy-deep px-4 py-2 text-sm font-medium text-white hover:bg-navy-dark sm:inline-flex"
        >
          Start My Eligibility Check
        </Link>
      </Container>
    </header>
  );
}
