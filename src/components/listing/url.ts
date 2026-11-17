/** Listing URL helpers (K-029, K-173): every filter lives in the query string. Client-safe. */
import { toListingSearch, type RawSearchParams } from "@/lib/catalog/query-params";
import type { ProductQuery } from "@/lib/catalog/types";

/** Page sizes offered by the numbered pagination (K-173). The first one is the default (omitted from the URL). */
export const PAGE_SIZES = [24, 48] as const;
export type PageSize = (typeof PAGE_SIZES)[number];
export const PAGE_SIZE_PARAM = "adet";

/**
 * URL-facing subset of ProductQuery. `page` = numbered page (?sayfa=N, 1-based); `pageSize` = ?adet=48
 * (owned here because src/lib/catalog/query-params.ts does not know it yet).
 */
export type ListingState = Pick<ProductQuery, "q" | "scope" | "brands" | "priceMin" | "priceMax" | "sort" | "page" | "availability" | "skinType" | "concerns"> & {
  pageSize?: PageSize;
};

export function pickState(q: ProductQuery): ListingState {
  const { q: text, scope, brands, priceMin, priceMax, sort, page, availability, skinType, concerns } = q;
  return { q: text, scope, brands, priceMin, priceMax, sort, page, availability, skinType, concerns };
}

/** Reads ?adet= (24 | 48); anything else = default. */
export function parsePageSize(sp: RawSearchParams): PageSize | undefined {
  const raw = Array.isArray(sp[PAGE_SIZE_PARAM]) ? sp[PAGE_SIZE_PARAM]?.[0] : sp[PAGE_SIZE_PARAM];
  const n = Number(raw);
  return (PAGE_SIZES as readonly number[]).includes(n) && n !== PAGE_SIZES[0] ? (n as PageSize) : undefined;
}

/**
 * href for `state` with `patch` applied. Any filter/sort change resets to page 1 unless `page` is patched;
 * the chosen page size survives filter changes.
 */
export function listingHref(basePath: string, state: ListingState, patch: Partial<ListingState> = {}): string {
  const { pageSize, ...next } = { ...state, page: undefined, ...patch };
  let search = toListingSearch(next);
  if (pageSize && pageSize !== PAGE_SIZES[0]) search += `${search ? "&" : "?"}${PAGE_SIZE_PARAM}=${pageSize}`;
  return `${basePath}${search}`;
}

export function toggle<T>(list: readonly T[] | undefined, value: T): T[] | undefined {
  const cur = list ?? [];
  const out = cur.includes(value) ? cur.filter((v) => v !== value) : [...cur, value];
  return out.length ? out : undefined;
}

export function activeFilterCount(s: ListingState): number {
  return (s.brands?.length ?? 0) + (s.priceMin != null || s.priceMax != null ? 1 : 0) + (s.availability === "tr" ? 1 : 0) + (s.skinType?.length ?? 0) + (s.concerns?.length ?? 0);
}
