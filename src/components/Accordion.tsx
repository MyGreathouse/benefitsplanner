"use client";

import { ReactNode, useState } from "react";

export function Accordion({ items }: { items: { question: string; answer: ReactNode }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="divide-y divide-border rounded-2xl border border-border bg-white">
      {items.map((item, i) => {
        const open = openIndex === i;
        return (
          <div key={i}>
            <button
              type="button"
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="focus-ring flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
            >
              <span className="font-medium text-navy-deep">{item.question}</span>
              <span className="shrink-0 text-slate" aria-hidden>
                {open ? "−" : "+"}
              </span>
            </button>
            {open && <div className="px-5 pb-4 text-sm leading-relaxed text-slate">{item.answer}</div>}
          </div>
        );
      })}
    </div>
  );
}
