/**
 * Structured copy (FAQ arrays, business plan) + business-plan gate (K-085/K-099), read through `tRaw()`
 * (frontend-mimar review 1 #1: no @data import outside src/lib).
 *
 * Two switches must agree before the business section renders:
 *  - src/config/storefront.ts `businessPlan` (null today)
 *  - ui.tr.json `pv.business.plan.enabled` (false today: S-046)
 */
import { tRaw } from "@/lib/ui-text";
import { businessPlan } from "@/config/storefront";
import type { FaqEntry } from "@/components/membership/Faq";

export { t } from "@/components/sections/copy";

export function tFaq(key: "pv.faq" | "membership.faq"): FaqEntry[] {
  const v = tRaw<FaqEntry[]>(key);
  return Array.isArray(v) ? v : [];
}

interface PlanItem {
  title: string;
  text?: string;
}
interface Plan {
  enabled: boolean;
  rewards: PlanItem[];
  levels: PlanItem[];
  marginNote: string | null;
  profitShareNote: string | null;
}

export function tRawPlan(): Plan | null {
  const plan = tRaw<Plan>("pv.business.plan");
  if (!businessPlan || !plan?.enabled) return null;
  return plan;
}
