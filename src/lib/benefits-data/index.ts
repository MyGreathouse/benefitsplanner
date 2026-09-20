import type { BenefitInfo } from "./types";
import { universalCredit } from "./universal-credit";
import { pip } from "./pip";
import { carersAllowance } from "./carers-allowance";
import { councilTaxSupport } from "./council-tax-support";

export const BENEFITS: BenefitInfo[] = [universalCredit, pip, carersAllowance, councilTaxSupport];

export function getBenefitBySlug(slug: string): BenefitInfo | undefined {
  return BENEFITS.find((b) => b.slug === slug);
}

export { universalCredit, pip, carersAllowance, councilTaxSupport };
