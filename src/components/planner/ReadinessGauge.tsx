const BUCKETS: { max: number; label: string }[] = [
  { max: 0, label: "Not started" },
  { max: 24, label: "Just starting" },
  { max: 49, label: "Building your case" },
  { max: 74, label: "Getting there" },
  { max: 99, label: "Well prepared" },
  { max: 100, label: "Ready to submit" },
];

function labelFor(percent: number): string {
  const bucket = BUCKETS.find((b) => percent <= b.max);
  return bucket ? bucket.label : BUCKETS[BUCKETS.length - 1].label;
}

export function ReadinessGauge({ percent }: { percent: number }) {
  const clamped = Math.max(0, Math.min(100, percent));
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - clamped / 100);
  const label = labelFor(clamped);

  return (
    <div className="flex items-center gap-5 rounded-2xl bg-navy-deep p-6 text-white">
      <svg width="104" height="104" viewBox="0 0 104 104" className="shrink-0" aria-hidden>
        <circle cx="52" cy="52" r={radius} fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="8" />
        <circle
          cx="52"
          cy="52"
          r={radius}
          fill="none"
          stroke="var(--bp-gold)"
          strokeWidth="8"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform="rotate(-90 52 52)"
          style={{ transition: "stroke-dashoffset 300ms ease" }}
        />
        <text
          x="52"
          y="58"
          textAnchor="middle"
          fontSize="24"
          fontWeight="600"
          fill="white"
          fontFamily="var(--font-inter), sans-serif"
        >
          {clamped}%
        </text>
      </svg>
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-gold">Readiness score</p>
        <p className="mt-1 font-display text-lg font-semibold text-white">{label}</p>
        <p className="mt-1 text-sm text-white/70">Based on the checklist items you&rsquo;ve ticked off so far.</p>
      </div>
    </div>
  );
}
