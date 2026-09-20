import type { BenefitInfo } from "./types";
import { universalCredit } from "./universal-credit";
import { pip } from "./pip";
import { carersAllowance } from "./carers-allowance";
import { councilTaxSupport } from "./council-tax-support";
import { childBenefit } from "./child-benefit";
import { attendanceAllowance } from "./attendance-allowance";
import { pensionCredit } from "./pension-credit";
import { esa } from "./esa";
import { dla } from "./dla";
import { housingSupport } from "./housing-support";
import { otherSupport } from "./other-support";

export const BENEFITS: BenefitInfo[] = [
  universalCredit,
  pip,
  carersAllowance,
  councilTaxSupport,
  childBenefit,
  attendanceAllowance,
  pensionCredit,
  esa,
  dla,
  housingSupport,
  otherSupport,
];

export function getBenefitBySlug(slug: string): BenefitInfo | undefined {
  return BENEFITS.find((b) => b.slug === slug);
}

export {
  universalCredit,
  pip,
  carersAllowance,
  councilTaxSupport,
  childBenefit,
  attendanceAllowance,
  pensionCredit,
  esa,
  dla,
  housingSupport,
  otherSupport,
};
