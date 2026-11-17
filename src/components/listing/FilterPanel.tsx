/**
 * Filter groups (kategori.md §6, K-029). Server-rendered links (work without JS). Groups: Kategori · Bulunabilirlik ·
 * Marka · Fiyat · Cilt tipi. Each group is a <details> with a visible <summary>. Used both in the desktop sidebar
 * and inside MobileFilterSheet.
 */
import Link from "next/link";
import type { ReactNode } from "react";
import { Check, ChevronDown } from "@/components/ui/lucide";
import { SKIN_TYPES } from "@/lib/catalog/skin";
import type { ProductPage } from "@/lib/catalog/types";
import { t } from "@/lib/ui-text";
import { PriceFilter } from "./PriceFilter";
import { listingHref, toggle, type ListingState } from "./url";

export interface CategoryLink {
  href: string;
  title: string;
  count: number;
  current: boolean;
}

const BRANDS_VISIBLE = 10;

function Group({ title, open = false, children }: { title: string; open?: boolean; children: ReactNode }) {
  return (
    <details open={open} className="group/fg border-b border-line py-1 last:border-b-0">
      <summary className="flex min-h-13 cursor-pointer list-none items-center justify-between text-base font-semibold text-ink [&::-webkit-details-marker]:hidden">
        {title}
        <ChevronDown size={20} className="text-ink-muted group-open/fg:rotate-180" />
      </summary>
      <div className="pb-4">{children}</div>
    </details>
  );
}

function Option({ href, label, count, selected, radio = false }: { href: string; label: string; count?: number; selected: boolean; radio?: boolean }) {
  return (
    <Link href={href} scroll={false} className="group/opt flex min-h-tap-min items-center gap-3 rounded-sm text-base text-ink transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:text-green-800">
      <span
        aria-hidden="true"
        className={`grid size-5 shrink-0 place-items-center border-[1.5px] ${radio ? "rounded-full" : "rounded-[5px]"} ${
          selected ? "border-green-700 bg-green-700 text-white" : "border-line-strong bg-surface transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 group-hover/opt:border-green-700"
        }`}
      >
        {selected && (radio ? <span className="size-2 rounded-full bg-surface" /> : <Check size={14} strokeWidth={3} />)}
      </span>
      <span className="flex-1">
        {label}
        {selected && <span className="sr-only"> ({t("listing.filter.selected")})</span>}
      </span>
      {count != null && <span className="text-sm tabular-nums text-ink-muted">{count}</span>}
    </Link>
  );
}

export function FilterPanel({
  basePath,
  state,
  facets,
  categoryLinks,
  showAvailability = true,
  showSkin = false,
}: {
  basePath: string;
  state: ListingState;
  facets: ProductPage["facets"];
  categoryLinks?: CategoryLink[];
  showAvailability?: boolean;
  showSkin?: boolean;
}) {
  const brands = facets.brands;
  const head = brands.slice(0, BRANDS_VISIBLE);
  const tail = brands.slice(BRANDS_VISIBLE);
  const brandOption = (b: (typeof brands)[number]) => (
    <li key={b.slug}>
      <Option href={listingHref(basePath, state, { brands: toggle(state.brands, b.slug) })} label={b.title} count={b.count} selected={!!state.brands?.includes(b.slug)} />
    </li>
  );

  return (
    <div>
      {categoryLinks && categoryLinks.length > 0 && (
        <Group title={t("listing.filter.category")} open>
          <ul>
            {categoryLinks.map((c) => (
              <li key={c.href}>
                <Link
                  href={c.href}
                  aria-current={c.current ? "page" : undefined}
                  className={`flex min-h-tap-min items-center justify-between gap-3 rounded-sm text-base transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:text-green-800 ${c.current ? "font-semibold text-green-800" : "text-ink"}`}
                >
                  <span>{c.title}</span>
                  <span className="text-sm font-normal tabular-nums text-ink-muted">{c.count}</span>
                </Link>
              </li>
            ))}
          </ul>
        </Group>
      )}

      {showAvailability && (
        <Group title={t("listing.filter.availability")} open>
          <ul>
            <li>
              <Option
                radio
                href={listingHref(basePath, state, { availability: undefined })}
                label={t("listing.filter.allProducts")}
                count={facets.availability.tr + facets.availability.yakinda}
                selected={state.availability !== "tr"}
              />
            </li>
            <li>
              <Option
                radio
                href={listingHref(basePath, state, { availability: "tr" })}
                label={t("listing.filter.inStockOnly")}
                count={facets.availability.tr}
                selected={state.availability === "tr"}
              />
            </li>
          </ul>
        </Group>
      )}

      {brands.length > 1 && (
        <Group title={t("listing.filter.brand")} open={!!state.brands?.length || !categoryLinks?.length}>
          <ul>{head.map(brandOption)}</ul>
          {tail.length > 0 && (
            <details className="mt-1">
              <summary className="inline-flex min-h-tap-min cursor-pointer items-center text-sm font-medium text-green-700 underline underline-offset-4">
                {t("listing.allBrands")}
              </summary>
              <ul>{tail.map(brandOption)}</ul>
            </details>
          )}
        </Group>
      )}

      {facets.price && (
        <Group title={t("listing.filter.price")} open={state.priceMin != null || state.priceMax != null}>
          <PriceFilter
            baseHref={listingHref(basePath, state, { priceMin: undefined, priceMax: undefined })}
            min={state.priceMin}
            max={state.priceMax}
            bounds={facets.price}
          />
        </Group>
      )}

      {showSkin && (
        <Group title={t("listing.filter.skinType")} open={!!state.skinType?.length}>
          <ul>
            {SKIN_TYPES.map((s) => (
              <li key={s.slug}>
                <Option
                  href={listingHref(basePath, state, { skinType: toggle(state.skinType, s.slug) })}
                  label={t(`finder.skinType.${s.slug}.name`)}
                  selected={!!state.skinType?.includes(s.slug)}
                />
              </li>
            ))}
          </ul>
        </Group>
      )}
    </div>
  );
}
