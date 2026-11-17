/** Pure cart math (K-031, K-059, K-062). Client-safe; unit-tested in totals.test.ts. */
import type { CartCatalog, CartProduct } from "@/lib/catalog/types";

export interface CartLine {
  code: string;
  qty: number;
}

export interface ResolvedCartLine extends CartLine {
  product: CartProduct;
  /** qty × price */
  lineTotal: number;
  /** qty × memberPrice */
  lineMemberTotal: number;
  /** qty × pv, null when the product has no PV */
  linePv: number | null;
}

export interface CartTotals {
  lines: ResolvedCartLine[];
  /** Codes in storage that are no longer sellable (K-031: dropped with a notice). */
  missing: string[];
  /** Total item count (sum of quantities). */
  count: number;
  /** "Toplam" */
  total: number;
  /** "Üye fiyatıyla toplam" */
  memberTotal: number;
  /** "Toplam PV" */
  pv: number;
}

/** Sums in integer kuruş to avoid float drift, returns lira. */
const sumMoney = (values: number[]) => values.reduce((acc, v) => acc + Math.round(v * 100), 0) / 100;
const sumPv = (values: number[]) => Math.round(values.reduce((a, v) => a + v, 0) * 100) / 100;

export function computeCart(lines: readonly CartLine[], catalog: CartCatalog): CartTotals {
  const resolved: ResolvedCartLine[] = [];
  const missing: string[] = [];
  for (const line of lines) {
    const product = catalog[line.code];
    if (!product) {
      missing.push(line.code);
      continue;
    }
    resolved.push({
      ...line,
      product,
      lineTotal: sumMoney([product.price * line.qty]),
      lineMemberTotal: sumMoney([product.memberPrice * line.qty]),
      linePv: product.pv == null ? null : sumPv([product.pv * line.qty]),
    });
  }
  return {
    lines: resolved,
    missing,
    count: resolved.reduce((a, l) => a + l.qty, 0),
    total: sumMoney(resolved.map((l) => l.lineTotal)),
    memberTotal: sumMoney(resolved.map((l) => l.lineMemberTotal)),
    pv: sumPv(resolved.map((l) => l.linePv ?? 0)),
  };
}

export const clampQty = (qty: number, max: number) => Math.min(max, Math.max(1, Math.floor(Number.isFinite(qty) ? qty : 1)));
