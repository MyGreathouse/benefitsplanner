import type { Source } from "@/lib/sources";

export function SourceCard({ source }: { source: Source }) {
  return (
    <a
      href={source.url}
      target="_blank"
      rel="noopener noreferrer"
      className="focus-ring block rounded-xl border border-border bg-off-white p-4 transition-colors hover:border-navy-deep"
    >
      <p className="text-sm font-semibold text-navy-deep">{source.title}</p>
      <p className="mt-1 text-xs text-slate">
        {source.publisher} · {source.jurisdiction} · checked {source.dateChecked}
      </p>
      {source.note && <p className="mt-2 text-xs text-slate">{source.note}</p>}
    </a>
  );
}
