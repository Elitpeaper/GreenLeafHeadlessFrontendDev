/**
 * Product grid (kategori.md §7). 2 cols mobile · 3 tablet · 4 desktop (3 with the filter sidebar).
 * With mixed availability and "Önerilen" sort, a full-width divider separates TR from "Türkiye'ye yakında".
 */
import { Fragment } from "react";
import { ProductCard } from "@/components/product/ProductCard";
import { Sprout } from "@/components/ui/lucide";
import type { ProductSummary } from "@/lib/catalog/types";
import { t } from "@/lib/ui-text";

const SIZES_SIDEBAR = "(min-width: 1280px) 260px, (min-width: 768px) 31vw, 46vw";
const SIZES_FULL = "(min-width: 1280px) 290px, (min-width: 1024px) 24vw, (min-width: 768px) 31vw, 46vw";

export function ProductGrid({
  items,
  withSidebar = false,
  divider = true,
  priorityCount = 2,
}: {
  items: ProductSummary[];
  withSidebar?: boolean;
  divider?: boolean;
  priorityCount?: number;
}) {
  const splitAt = divider ? items.findIndex((p, i) => i > 0 && p.availability === "yakinda" && items[i - 1]?.availability === "tr") : -1;
  const cols = withSidebar ? "grid-cols-2 md:grid-cols-3 xl:grid-cols-4" : "grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
  return (
    <ul className={`grid gap-x-grid-gap gap-y-8 sm:gap-y-10 ${cols}`}>
      {items.map((p, i) => (
        <Fragment key={p.id}>
          {i === splitAt && (
            <li role="separator" aria-label={t("listing.divider.comingSoon")} className="col-span-full my-3 flex items-center gap-4">
              <span className="h-px flex-1 bg-line" />
              <span className="flex items-center gap-3 text-sm text-ink-muted">
                <span className="inline-flex items-center gap-1.5 rounded-sm bg-blue-100 px-2.5 py-1 text-xs font-semibold text-blue-800">
                  <Sprout size={16} />
                  {t("listing.divider.comingSoon")}
                </span>
                <span className="hidden md:inline">{t("listing.divider.comingSoonBody")}</span>
              </span>
              <span className="h-px flex-1 bg-line" />
            </li>
          )}
          <li className="min-w-0">
            <ProductCard product={p} sizes={withSidebar ? SIZES_SIDEBAR : SIZES_FULL} priority={i < priorityCount} />
          </li>
        </Fragment>
      ))}
    </ul>
  );
}
