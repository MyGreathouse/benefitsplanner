import type { Source } from "@/lib/sources";
import type { FaqItem } from "@/lib/faq/types";

export interface BenefitInfoSection {
  heading: string;
  body: string[]; // paragraphs
  bullets?: string[];
}

export interface BenefitInfo {
  slug: string;
  name: string;
  standfirst: string;
  jurisdictionNote?: string;
  sections: BenefitInfoSection[];
  sources: Source[];
  plannerSlug?: string; // links to a matching planner, if one exists
  plannerLabel?: string;
  faqs?: FaqItem[];
  /** Overrides the default "<name> | BenefitsPlanner" title when a specific search-intent title is worth targeting. */
  seoTitle?: string;
  seoDescription?: string;
}
