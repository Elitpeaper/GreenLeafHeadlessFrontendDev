/**
 * Publication + cart gate (K-024, K-109, K-121, S-025, TASARIM-INCELEME-1 M-1). Pure and unit-tested (gate.test.ts).
 * Any adapter (JSON today, Medusa/Shopify later) must apply these rules before handing products to the UI.
 */
export interface GateInput {
  availability: "tr" | "yakinda";
  publishReady: boolean;
  price: number | null;
  memberPrice: number | null;
  code: string;
  needsReview: readonly string[];
}

/** Flagged price (e.g. LGD012 ₺89.910): never listed, never priced, never sellable — in any mode. */
export const isPriceImplausible = (p: Pick<GateInput, "needsReview">) => p.needsReview.includes("price-implausible");

/** Production lists publishReady only; preview builds also list not-yet-ready products (unsellable, see below). */
export const isListed = (p: GateInput, preview: boolean) => !isPriceImplausible(p) && (p.publishReady || preview);

/** Cart gate. Independent of preview mode on purpose. */
export const isSellable = (p: GateInput) =>
  p.availability === "tr" &&
  p.publishReady &&
  p.price != null &&
  p.memberPrice != null &&
  p.code !== "" &&
  !isPriceImplausible(p);
