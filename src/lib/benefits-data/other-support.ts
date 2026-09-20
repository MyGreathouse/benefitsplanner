import type { BenefitInfo } from "./types";
import { SOURCES } from "@/lib/sources";

export const otherSupport: BenefitInfo = {
  slug: "other-support",
  name: "Other Support",
  standfirst: "Support that doesn't fit neatly into one named benefit — local welfare assistance, cost-of-living help, and other schemes worth knowing about.",
  jurisdictionNote: "Most of what's listed here is set locally or changes over time — check with your council or GOV.UK for what currently applies in your area.",
  sections: [
    {
      heading: "What this covers",
      body: [
        "This section is deliberately broader than a single benefit page, because support here doesn't always come with a fixed national scheme. It's a starting point for areas worth exploring rather than a complete list.",
      ],
      bullets: [
        "Local welfare assistance schemes — many councils run a local crisis or welfare fund for emergencies",
        "Household Support Fund style cost-of-living schemes, where currently running",
        "Warm Home Discount and other energy support schemes",
        "Free school meals and related passported support",
        "Healthy Start vouchers for pregnant women and young children on a low income",
        "NHS low income scheme for help with prescription and dental costs",
      ],
    },
    {
      heading: "Where to check what applies to you",
      body: [
        "Because this category changes fastest and varies most by area, GOV.UK's 'benefits calculator' tools and your local council's website are the most reliable places to check what's currently available where you live.",
      ],
    },
  ],
  sources: [SOURCES.benefitsCalculators],
};
