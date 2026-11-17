/**
 * Display formatters (client-safe).
 * K-059: "₺1.299,90"; whole amounts without kuruş: "₺1.300". No rounding of the source value (K-013).
 */
const tryWhole = new Intl.NumberFormat("tr-TR", { style: "currency", currency: "TRY", maximumFractionDigits: 0 });
const tryCents = new Intl.NumberFormat("tr-TR", {
  style: "currency",
  currency: "TRY",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});
const pvFormatter = new Intl.NumberFormat("tr-TR", { maximumFractionDigits: 2 });

/** Rounds away binary float noise (e.g. 0.1 + 0.2) before deciding whole vs. kuruş. */
const cents = (value: number) => Math.round(value * 100);

export function formatPrice(value: number): string {
  const c = cents(value);
  return c % 100 === 0 ? tryWhole.format(c / 100) : tryCents.format(c / 100);
}

/** "0,5" */
export const formatPv = (value: number) => pvFormatter.format(value);

/** "PV 0,5" (K-098). Callers must not render anything when pv is null. */
export const formatPvLabel = (value: number) => `PV ${formatPv(value)}`;
