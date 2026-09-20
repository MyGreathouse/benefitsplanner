import type { BenefitInfo } from "./types";
import { SOURCES } from "@/lib/sources";

export const dla: BenefitInfo = {
  slug: "dla",
  name: "Disability Living Allowance (DLA)",
  standfirst: "Support for children under 16 with a disability or health condition — most adults now claim PIP instead, but existing adult DLA claimants can continue on it in some cases.",
  sections: [
    {
      heading: "Who it's for",
      body: [
        "DLA for children helps with the extra costs of looking after a child who needs much more looking after than a child of the same age without a disability. Adults can no longer make brand-new DLA claims — PIP replaced it for working-age adults, though some existing older claimants remain on DLA.",
      ],
      bullets: [
        "Child is under 16",
        "They need substantially more care, supervision or help getting around than a child of the same age generally would",
        "The extra needs have lasted, or are expected to last, at least 3 months, and are expected to continue for at least 6 more months (unless terminally ill)",
      ],
    },
    {
      heading: "What you may get (2026/27 rates)",
      body: ["DLA has a care component and a mobility component, each paid at different rates depending on need."],
      bullets: [
        "Care component — highest: £114.60 a week",
        "Care component — middle: £76.70 a week",
        "Care component — lowest: £30.30 a week",
        "Mobility component — higher: £80.00 a week",
        "Mobility component — lower: £30.30 a week",
      ],
    },
  ],
  sources: [SOURCES.dla2026],
};
