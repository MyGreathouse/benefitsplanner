import type { Source } from "@/lib/sources";

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
}
