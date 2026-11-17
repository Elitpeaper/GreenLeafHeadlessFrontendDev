"use client";

/** Favourites grid (K-033). Reads slugs from the device store, fetches ProductSummary[] and renders ProductGrid. */
import Link from "next/link";
import { useEffect, useState } from "react";
import { LeafCluster } from "@/components/brand/LeafCluster";
import { ProductCardSkeleton } from "@/components/product/ProductCardParts";
import { useFavoritesHydration, useFavoritesStore } from "@/components/product/favorites";
import { Heart } from "@/components/ui/lucide";
import type { ProductSummary } from "@/lib/catalog/types";
import { useT } from "@/lib/ui-text/client";
import { ProductGrid } from "./ProductGrid";

export function FavoritesList() {
  const { t, tc } = useT();
  useFavoritesHydration();
  const hydrated = useFavoritesStore((s) => s.hydrated);
  const slugs = useFavoritesStore((s) => s.slugs);
  const [items, setItems] = useState<ProductSummary[] | null>(null);
  const key = slugs.join(",");

  useEffect(() => {
    if (!hydrated) return;
    if (!key) return;
    const ctrl = new AbortController();
    fetch(`/api/urunler?slug=${encodeURIComponent(key)}`, { signal: ctrl.signal })
      .then((r) => (r.ok ? (r.json() as Promise<ProductSummary[]>) : []))
      .then((list) => setItems(list))
      .catch(() => {});
    return () => ctrl.abort();
  }, [hydrated, key]);

  // Keep only still-favourited items (un-hearting removes the card immediately).
  const visible = !key ? [] : (items?.filter((p) => slugs.includes(p.slug)) ?? null);

  if (!hydrated || visible === null) {
    return (
      <div className="mt-8 grid grid-cols-2 gap-grid-gap md:grid-cols-3 lg:grid-cols-4" aria-busy="true">
        <span className="sr-only">{t("favorites.loading")}</span>
        {Array.from({ length: 4 }, (_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (visible.length === 0) {
    return (
      <div className="mt-8 flex flex-col items-center rounded-xl bg-surface-muted px-6 py-section-tight text-center">
        <div className="relative">
          <LeafCluster className="w-40" />
          <Heart size={32} className="absolute inset-x-0 bottom-2 mx-auto text-green-700" />
        </div>
        <h2 className="mt-4 text-2xl">{t("favorites.empty.title")}</h2>
        <p className="mt-2 max-w-sm text-ink-muted">{t("favorites.empty.body")}</p>
        <Link href="/koleksiyon/turkiyede-satista" className="mt-6 inline-flex min-h-control items-center rounded-pill bg-green-700 px-6 font-medium text-white shadow-button transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-green-800">
          {t("favorites.empty.cta")}
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-6">
      <p className="mb-4 text-base font-semibold" aria-live="polite">
        {tc("listing.count", visible.length)}
      </p>
      <ProductGrid items={visible} divider={false} />
    </div>
  );
}
