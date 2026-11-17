/**
 * URL <-> ProductQuery mapping for listings (K-029: filters live in the query string).
 * Param names (Turkish, seo-uzmani may rename here only):
 *   q · kok=cilt-bakimi (K-268 search scope) · marka=a,b · fiyat=min-max · siralama=onerilen|fiyat-artan|fiyat-azalan|yeni · sayfa=2 · stok=tr
 *   tip=kuru,yagli · ihtiyac=a,b (cilt tipine göre çipleri)
 * Client-safe (no data import).
 */
import type { ProductQuery, SortKey } from "./types";

export type RawSearchParams = Record<string, string | string[] | undefined>;

const SORTS: SortKey[] = ["onerilen", "fiyat-artan", "fiyat-azalan", "yeni"];

const first = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v) ?? undefined;
const list = (v: string | string[] | undefined) =>
  (Array.isArray(v) ? v.join(",") : (v ?? ""))
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

export function parseListingParams(sp: RawSearchParams): ProductQuery {
  const q: ProductQuery = {};
  const text = first(sp.q)?.trim();
  if (text) q.q = text.slice(0, 80);
  const scope = first(sp.kok)?.trim();
  if (scope && /^[a-z0-9-]{1,60}$/.test(scope)) q.scope = scope;
  const brands = list(sp.marka);
  if (brands.length) q.brands = brands;
  const price = first(sp.fiyat)?.match(/^(\d+(?:\.\d+)?)?-(\d+(?:\.\d+)?)?$/);
  if (price) {
    if (price[1]) q.priceMin = Number(price[1]);
    if (price[2]) q.priceMax = Number(price[2]);
  }
  const sort = first(sp.siralama) as SortKey | undefined;
  if (sort && SORTS.includes(sort)) q.sort = sort;
  const page = Number(first(sp.sayfa));
  if (Number.isInteger(page) && page > 1) q.page = page;
  if (first(sp.stok) === "tr") q.availability = "tr";
  const tip = list(sp.tip);
  if (tip.length) q.skinType = tip;
  const need = list(sp.ihtiyac);
  if (need.length) q.concerns = need;
  return q;
}

/** Inverse of parseListingParams; omits defaults so URLs stay clean. */
export function toListingSearch(q: ProductQuery): string {
  const p = new URLSearchParams();
  if (q.q) p.set("q", q.q);
  if (q.scope) p.set("kok", q.scope);
  if (q.brands?.length) p.set("marka", q.brands.join(","));
  if (q.priceMin != null || q.priceMax != null) p.set("fiyat", `${q.priceMin ?? ""}-${q.priceMax ?? ""}`);
  if (q.sort && q.sort !== "onerilen") p.set("siralama", q.sort);
  if (q.page && q.page > 1) p.set("sayfa", String(q.page));
  if (q.availability === "tr") p.set("stok", "tr");
  if (q.skinType?.length) p.set("tip", q.skinType.join(","));
  if (q.concerns?.length) p.set("ihtiyac", q.concerns.join(","));
  const s = p.toString();
  return s ? `?${s}` : "";
}
