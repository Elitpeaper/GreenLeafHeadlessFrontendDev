/** Selected filter chips + "Filtreleri temizle" (kategori.md §5e). Each chip is a link that removes that filter. */
import Link from "next/link";
import { X } from "@/components/ui/lucide";
import { formatPrice } from "@/lib/format";
import type { ProductPage } from "@/lib/catalog/types";
import { t } from "@/lib/ui-text";
import { listingHref, type ListingState } from "./url";

export function ActiveChips({
  basePath,
  state,
  brands,
  clearHref,
}: {
  basePath: string;
  state: ListingState;
  brands: ProductPage["facets"]["brands"];
  clearHref: string;
}) {
  const chips: { label: string; href: string }[] = [];
  if (state.availability === "tr") chips.push({ label: t("listing.filter.inStockOnly"), href: listingHref(basePath, state, { availability: undefined }) });
  for (const b of state.brands ?? []) {
    const title = brands.find((x) => x.slug === b)?.title ?? b;
    chips.push({ label: title, href: listingHref(basePath, state, { brands: state.brands?.filter((x) => x !== b) }) });
  }
  if (state.priceMin != null || state.priceMax != null) {
    const lo = state.priceMin != null ? formatPrice(state.priceMin) : "";
    const hi = state.priceMax != null ? formatPrice(state.priceMax) : "";
    chips.push({ label: `${lo} – ${hi}`.trim(), href: listingHref(basePath, state, { priceMin: undefined, priceMax: undefined }) });
  }
  for (const s of state.skinType ?? []) {
    chips.push({ label: t(`finder.skinType.${s}.name`), href: listingHref(basePath, state, { skinType: state.skinType?.filter((x) => x !== s) }) });
  }
  if (!chips.length) return null;
  return (
    <div className="flex flex-wrap items-center gap-2">
      <span className="sr-only">{t("listing.filter.active")}</span>
      {chips.map((c) => (
        <Link
          key={c.href + c.label}
          href={c.href}
          scroll={false}
          aria-label={t("listing.filter.remove", { ad: c.label })}
          className="inline-flex min-h-tap-min items-center gap-1.5 rounded-pill bg-accent-soft py-1 pl-4 pr-2.5 text-sm font-medium text-ink ring-1 ring-accent-line transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:ring-green-700"
        >
          {c.label}
          <X size={16} />
        </Link>
      ))}
      <Link href={clearHref} scroll={false} className="inline-flex min-h-tap-min items-center px-2 text-sm font-medium text-green-700 underline underline-offset-4">
        {t("listing.filter.clearAll")}
      </Link>
    </div>
  );
}
