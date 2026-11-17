import { ListingSkeleton } from "@/components/listing/ListingSkeleton";
import { BrandLoader } from "./BrandLoader";

/**
 * Route-segment loading states (K-170). Server components; rendered by the loading.tsx files that
 * hareket-tasarimcisi owns. Footprints follow the real pages so the swap to content does not jump.
 */

/** Generic store page: brand loader centred in the content area (header/footer stay). */
export function PageLoading() {
  return (
    <div className="mx-auto grid min-h-[60vh] max-w-wide place-items-center px-gutter py-16" aria-busy="true">
      <BrandLoader />
    </div>
  );
}

/** Category / collection / search: title + chips placeholders and the listing skeleton grid. */
export function ListingLoading() {
  return (
    <div className="mx-auto max-w-wide px-gutter pb-8 pt-4 sm:pt-6" aria-busy="true">
      <div data-motion="skeleton" className="h-4 w-48 rounded-sm bg-surface-muted" />
      <div className="mt-6 flex items-end justify-between gap-6">
        <div className="flex flex-col gap-3">
          <div data-motion="skeleton" className="h-9 w-72 max-w-[70vw] rounded-md bg-surface-muted" />
          <div data-motion="skeleton" className="h-4 w-96 max-w-[80vw] rounded-sm bg-surface-muted" />
        </div>
        <BrandLoader size="sm" className="hidden sm:flex" />
      </div>
      <div className="mt-6 flex gap-2 overflow-hidden">
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} data-motion="skeleton" className="h-11 w-28 shrink-0 rounded-pill bg-surface-muted" />
        ))}
      </div>
      <ListingSkeleton count={8} />
    </div>
  );
}

/** Product detail: gallery square + buy column. */
export function ProductLoading() {
  return (
    <div className="mx-auto max-w-wide px-gutter pb-8 pt-4 sm:pt-6" aria-busy="true">
      <div data-motion="skeleton" className="h-4 w-56 rounded-sm bg-surface-muted" />
      <div className="mt-6 grid gap-8 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] lg:gap-12">
        <div data-motion="skeleton" className="relative grid aspect-square place-items-center rounded-xl bg-surface-muted">
          <BrandLoader />
        </div>
        <div className="flex flex-col gap-4">
          <div data-motion="skeleton" className="h-3 w-24 rounded-sm bg-surface-muted" />
          <div data-motion="skeleton" className="h-10 w-11/12 rounded-md bg-surface-muted" />
          <div data-motion="skeleton" className="h-10 w-2/3 rounded-md bg-surface-muted" />
          <div data-motion="skeleton" className="mt-4 h-20 w-full rounded-lg bg-surface-muted" />
          <div data-motion="skeleton" className="h-14 w-full rounded-pill bg-surface-muted" />
          <div data-motion="skeleton" className="mt-4 h-4 w-full rounded-sm bg-surface-muted" />
          <div data-motion="skeleton" className="h-4 w-5/6 rounded-sm bg-surface-muted" />
          <div data-motion="skeleton" className="h-4 w-4/6 rounded-sm bg-surface-muted" />
        </div>
      </div>
    </div>
  );
}
