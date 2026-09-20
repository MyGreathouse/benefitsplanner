import type { PlannerConfig } from "@/lib/planner/types";
import { pipPlanner } from "./pip";
import { universalCreditPlanner } from "./universal-credit";
import { sendEhcpPlanner } from "./send-ehcp";
import { carersSupportPlanner } from "./carers-support";
import { councilTaxSupportPlanner } from "./council-tax-support";
import { challengePlanner } from "./challenge";

export const PLANNERS: PlannerConfig[] = [
  pipPlanner,
  universalCreditPlanner,
  sendEhcpPlanner,
  carersSupportPlanner,
  councilTaxSupportPlanner,
  challengePlanner,
];

export function getPlannerBySlug(slug: string): PlannerConfig | undefined {
  return PLANNERS.find((p) => p.slug === slug);
}
