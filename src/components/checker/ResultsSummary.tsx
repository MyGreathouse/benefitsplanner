import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { StatusBadge } from "@/components/ui/StatusBadge";
import { LinkButton } from "@/components/ui/Button";
import type { EligibilitySignal } from "@/lib/eligibility/types";
import { getBenefitBySlug } from "@/lib/benefits-data";

export function ResultsSummary({ signals }: { signals: EligibilitySignal[] }) {
  if (signals.length === 0) {
    return (
      <Card>
        <h2 className="font-display text-xl font-semibold text-navy-deep">
          Nothing stood out from your answers
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-slate">
          Based on what you&rsquo;ve told us, none of the pathways we currently cover appear to
          apply — that doesn&rsquo;t rule out other support. You can browse the full{" "}
          <Link href="/benefits" className="underline">
            benefits directory
          </Link>{" "}
          or review your answers and try again.
        </p>
      </Card>
    );
  }

  return (
    <div>
      <h2 className="font-display text-2xl font-semibold text-navy-deep">Your Benefits Snapshot</h2>
      <p className="mt-2 text-sm text-slate">
        These are structured indications based on your answers, not entitlement decisions.
      </p>
      <div className="mt-6 space-y-6">
        {signals.map((signal) => {
          const benefit = getBenefitBySlug(signal.benefitSlug);
          if (!benefit) return null;
          return (
            <Card key={signal.benefitSlug}>
              <div className="flex flex-wrap items-center justify-between gap-3">
                <h3 className="font-display text-lg font-semibold text-navy-deep">{benefit.name}</h3>
                <StatusBadge status={signal.strength} />
              </div>

              {signal.reasons.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate">
                    Why it appeared
                  </p>
                  <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-slate">
                    {signal.reasons.map((r, i) => (
                      <li key={i}>{r}</li>
                    ))}
                  </ul>
                </div>
              )}

              {signal.missingInfo.length > 0 && (
                <div className="mt-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-slate">
                    Still needed
                  </p>
                  <ul className="mt-1.5 list-disc space-y-1 pl-5 text-sm text-slate">
                    {signal.missingInfo.map((m, i) => (
                      <li key={i}>{m}</li>
                    ))}
                  </ul>
                </div>
              )}

              {signal.caveats.length > 0 && (
                <div className="mt-4 rounded-lg bg-off-white p-3">
                  <ul className="list-disc space-y-1 pl-5 text-xs text-slate">
                    {signal.caveats.map((c, i) => (
                      <li key={i}>{c}</li>
                    ))}
                  </ul>
                </div>
              )}

              <div className="mt-5 flex flex-wrap gap-3">
                <LinkButton href={`/benefits/${benefit.slug}`} variant="secondary" size="md">
                  Explore {benefit.name}
                </LinkButton>
                {benefit.plannerSlug && (
                  <LinkButton href={`/planners/${benefit.plannerSlug}`} size="md">
                    Start {benefit.plannerLabel}
                  </LinkButton>
                )}
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
