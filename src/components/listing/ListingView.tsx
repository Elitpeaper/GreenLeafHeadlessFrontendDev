/**
 * Listing template body (kategori.md §4–8; reused by /arama and /koleksiyon). Server component; render it inside
 * <Suspense> because it reads searchParams (Cache Components).
 *
 *   <ListingView basePath="/kategori/cilt-bakimi" baseQuery={{ category: "cilt-bakimi" }} searchParams={sp}
 *                categoryLinks={…} showSkin />
 *
 * K-173: numbered pagination (?sayfa=N, 1-based) with a page-size switch (?adet=24|48). Plain links: crawlable,
 * works without JS, back-navigation from a PDP returns to the same page.
 */
import Link from "next/link";
import type { ReactNode } from "react";
import { LeafCluster } from "@/components/brand/LeafCluster";
import { SceneFinderLeaves } from "@/components/illustrations/scenes";
import { parseListingParams, type RawSearchParams } from "@/lib/catalog/query-params";
import { getProducts, type ProductQuery, type SortKey } from "@/lib/products";
import { t, tc } from "@/lib/ui-text";
import { ActiveChips } from "./ActiveChips";
import { FilterPanel, type CategoryLink } from "./FilterPanel";
import { MobileFilterSheet } from "./MobileFilterSheet";
import { Pagination } from "./Pagination";
import { ProductGrid } from "./ProductGrid";
import { SkinTypeChips } from "./SkinTypeChips";
import { SortSelect } from "./SortSelect";
import { activeFilterCount, listingHref, PAGE_SIZES, parsePageSize, pickState } from "./url";

const SORTS: SortKey[] = ["onerilen", "fiyat-artan", "fiyat-azalan", "yeni"];

export interface ListingViewProps {
  basePath: string;
  /** Fixed scope of the page (category / collection / q). */
  baseQuery: Pick<ProductQuery, "category" | "collection">;
  searchParams: Promise<RawSearchParams>;
  categoryLinks?: CategoryLink[];
  /** Hide availability chip + group (e.g. the turkiyede-satista collection). */
  hideAvailability?: boolean;
  /** "Cilt tipine göre" chip strip + skin filter group (Cilt Bakımı, Makyaj, Setler). */
  showSkin?: boolean;
  /** Filters only when the scope has ≥ this many products (premium collection: 12). */
  minForFilters?: number;
  /** Slot rendered when the result is empty AND no filter is active. */
  emptyScope?: ReactNode;
  /** Extra header content (search title etc.) receiving the total. */
  heading?: (total: number) => ReactNode;
}

export async function ListingView({
  basePath,
  baseQuery,
  searchParams,
  categoryLinks,
  hideAvailability = false,
  showSkin = false,
  minForFilters = 0,
  emptyScope,
  heading,
}: ListingViewProps) {
  const raw = await searchParams;
  const query = parseListingParams(raw);
  const pageSize = parsePageSize(raw);
  const state = { ...pickState(query), pageSize };
  const size = pageSize ?? PAGE_SIZES[0];
  const scoped = { ...baseQuery, ...query, availability: hideAvailability ? undefined : query.availability, pageSize: size };
  let page = await getProducts({ ...scoped, page: Math.max(1, query.page ?? 1) });
  // Out-of-range ?sayfa= (e.g. after a filter shrank the result): show the last real page instead of an empty grid.
  if (page.items.length === 0 && page.total > 0) page = await getProducts({ ...scoped, page: page.pageCount });
  const current = page.page;
  const from = page.total === 0 ? 0 : (current - 1) * size + 1;
  const to = from + page.items.length - 1;
  const pageHref = (n: number) => `${listingHref(basePath, state, { page: n > 1 ? n : undefined })}#sonuclar`;
  const sort: SortKey = query.sort ?? "onerilen";
  const filtersActive = activeFilterCount(state);
  const scopeTotal = page.facets.availability.tr + page.facets.availability.yakinda;
  const withFilters = scopeTotal >= minForFilters;
  const clearHref = listingHref(basePath, { q: state.q, scope: state.scope, sort: state.sort });
  const sortHrefs = Object.fromEntries(SORTS.map((s) => [s, listingHref(basePath, state, { sort: s === "onerilen" ? undefined : s })])) as Record<SortKey, string>;

  if (page.total === 0 && filtersActive === 0 && emptyScope) return <>{emptyScope}</>;

  const panel = withFilters ? (
    <FilterPanel basePath={basePath} state={state} facets={page.facets} categoryLinks={categoryLinks} showAvailability={!hideAvailability} showSkin={showSkin} />
  ) : null;
  const trOn = state.availability === "tr";

  return (
    <div>
      {heading?.(page.total)}
      {showSkin && <SkinTypeChips basePath={basePath} state={state} />}

      {/* Toolbar */}
      <div className="mt-4 flex flex-wrap items-center gap-3 border-b border-line pb-4">
        {!hideAvailability && page.facets.availability.tr > 0 && page.facets.availability.yakinda > 0 && (
          <Link
            href={listingHref(basePath, state, { availability: trOn ? undefined : "tr" })}
            scroll={false}
            aria-current={trOn ? "true" : undefined}
            className={`inline-flex min-h-control items-center gap-2 rounded-pill px-5 text-base font-medium ring-1 ${
              trOn ? "bg-green-700 text-white ring-green-700" : "bg-surface text-ink ring-line-strong transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:ring-green-700"
            }`}
          >
            <span aria-hidden="true" className={`size-2.5 rounded-full ${trOn ? "bg-surface" : "bg-brand-green"}`} />
            {t("listing.filter.inStockOnly")}
            <span className={`tabular-nums ${trOn ? "text-white" : "text-ink-muted"}`}>({page.facets.availability.tr})</span>
          </Link>
        )}
        {panel && (
          <MobileFilterSheet activeCount={filtersActive} total={page.total} clearHref={clearHref}>
            {panel}
          </MobileFilterSheet>
        )}
        {/* D-5: the unfiltered total already sits in the page header band; the visible toolbar count shows the FILTERED result only. */}
        <p className={heading || filtersActive === 0 ? "sr-only" : "order-first w-full text-base text-ink-muted lg:mr-auto lg:w-auto"} aria-live="polite">
          <span className="font-semibold text-ink">{tc("listing.count", page.total)}</span>
        </p>
        <SortSelect value={sort} hrefs={sortHrefs} className="min-w-0 flex-1 lg:ml-auto lg:flex-none" />
      </div>
      {filtersActive > 0 && (
        <div className="mt-4">
          <ActiveChips basePath={basePath} state={state} brands={page.facets.brands} clearHref={clearHref} />
        </div>
      )}

      <div className={`mt-6 ${panel ? "lg:grid lg:grid-cols-[16.5rem_1fr] lg:gap-10" : ""}`}>
        {panel && (
          <aside aria-label={t("listing.filter.title")} className="hidden lg:block">
            <div className="sticky top-[calc(var(--spacing-header)+1.5rem)] max-h-[calc(100dvh-var(--spacing-header)-3rem)] overflow-y-auto pr-2">{panel}</div>
          </aside>
        )}
        <section id="sonuclar" aria-label={t("listing.results")} className="min-w-0 scroll-mt-[calc(var(--spacing-header)+1rem)]">
          {page.total === 0 ? (
            <div className="flex flex-col items-center rounded-xl bg-surface-muted px-6 py-12 text-center">
              <SceneFinderLeaves className="h-auto w-40 text-ink" />
              <p className="mt-4 font-display text-2xl">{t("listing.empty.title")}</p>
              <p className="mt-2 text-ink-muted">{t("listing.empty.body")}</p>
              <Link href={clearHref} className="mt-6 inline-flex min-h-control items-center rounded-pill bg-green-700 px-6 font-medium text-white shadow-button transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-green-800">
                {t("listing.empty.cta")}
              </Link>
            </div>
          ) : (
            <>
              <ProductGrid items={page.items} withSidebar={!!panel} divider={sort === "onerilen" && !trOn} />
              <div className="mt-section-tight flex flex-col items-center gap-5 border-t border-line pt-8">
                <Pagination page={current} pageCount={page.pageCount} hrefFor={pageHref} />
                <div className="flex flex-col items-center gap-3 sm:flex-row sm:gap-6">
                  <p className="text-sm text-ink-muted" aria-live="polite">
                    {t("listing.pagination.range", { from, to, total: page.total })}
                  </p>
                  {page.total > PAGE_SIZES[0] && (
                    <div className="flex items-center gap-2 text-sm">
                      <span id="page-size-label" className="text-ink-muted">
                        {t("listing.pagination.perPage")}
                      </span>
                      <ul aria-labelledby="page-size-label" className="flex rounded-pill bg-surface-muted p-1 ring-1 ring-line">
                        {PAGE_SIZES.map((n) => {
                          const on = n === size;
                          return (
                            <li key={n}>
                              <Link
                                href={`${listingHref(basePath, state, { pageSize: n })}#sonuclar`}
                                aria-current={on ? "true" : undefined}
                                className={`inline-flex h-9 min-w-12 items-center justify-center rounded-pill px-3 font-semibold tabular-nums ${on ? "bg-surface text-green-800 shadow-xs" : "text-ink transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:text-green-800"}`}
                              >
                                {n}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </section>
      </div>
    </div>
  );
}

/** Empty collection / scope block (kategori.md Varyant: "Bu koleksiyon şu an boş"). */
export function EmptyScope({ title, cta, href }: { title: string; cta: string; href: string }) {
  return (
    <div className="flex flex-col items-center rounded-xl bg-surface-muted px-6 py-section-tight text-center">
      <LeafCluster className="w-36" />
      <p className="mt-4 font-display text-2xl">{title}</p>
      <Link href={href} className="mt-6 inline-flex min-h-control items-center rounded-pill bg-green-700 px-6 font-medium text-white shadow-button transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-green-800">
        {cta}
      </Link>
    </div>
  );
}
