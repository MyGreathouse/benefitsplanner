import { Accordion } from "@/components/ui/Accordion";
import type { FaqItem } from "@/lib/faq/types";

export function FaqSection({ title = "Frequently asked questions", items }: { title?: string; items: FaqItem[] }) {
  if (items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <div>
      <h2 className="border-l-4 border-gold pl-3 font-display text-lg font-semibold text-navy-deep">{title}</h2>
      <div className="mt-4">
        <Accordion items={items.map((i) => ({ question: i.question, answer: i.answer }))} />
      </div>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
    </div>
  );
}
