import { stockPhoto } from "@/components/listing/stock";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { CategoryIllustration } from "@/components/illustrations/category-icons";
import { Breadcrumb } from "@/components/listing/Breadcrumb";
import { ListingHero } from "@/components/listing/ListingHero";
import { ListingSkeleton } from "@/components/listing/ListingSkeleton";
import { ListingView } from "@/components/listing/ListingView";
import type { RawSearchParams } from "@/lib/catalog/query-params";
import { getCategoryTree } from "@/lib/products";
import { t } from "@/lib/ui-text";

export const metadata: Metadata = { title: "Tüm ürünler" };

/**
 * /urunler — every listed product in one listing (K-173): filters (kategori bağlantıları, bulunabilirlik, marka,
 * fiyat) + numbered pagination (?sayfa=N, ?adet=24|48). Static header; results are request-time (Suspense).
 */
export default async function AllProductsPage({ searchParams }: { searchParams: Promise<RawSearchParams> }) {
  const roots = await getCategoryTree();
  const total = roots.reduce((n, r) => n + r.count, 0);
  const categoryLinks = roots.map((r) => ({ href: r.href, title: r.title, count: r.count, current: false }));

  return (
    <div className="mx-auto max-w-page px-gutter pb-8 pt-4 sm:pt-6">
      <Breadcrumb items={[{ href: "/urunler", label: t("listing.title.all") }]} />

      <ListingHero className="mt-3" photo={stockPhoto("listing.all")} title={t("listing.title.all")} lead={t("listing.all.lead")}>
        <p className="mt-1 text-sm font-medium text-cream-200">{t("megaMenu.rootCount", { count: total })}</p>
      </ListingHero>

      {/* Category shortcuts with the K-175 category illustrations */}
      <nav aria-label={t("listing.filter.category")} className="-mx-gutter mt-6 overflow-x-auto px-gutter [scrollbar-width:none] max-md:[mask-image:linear-gradient(to_right,black_calc(100%-3rem),transparent)] md:mx-0 md:overflow-visible md:px-0">
        <ul className="flex gap-3 pb-1 md:flex-wrap">
          {roots.map((r) => (
            <li key={r.root} className="shrink-0">
              <Link
                href={r.href}
                className="group/sub flex min-h-14 items-center gap-2.5 rounded-pill bg-surface py-1.5 pl-1.5 pr-5 ring-1 ring-line transition-[box-shadow,background-color] duration-250 hover:shadow-tile hover:ring-green-700"
              >
                <span className="grid size-11 place-items-center rounded-full bg-accent-soft text-ink">
                  <CategoryIllustration slug={r.root} className="size-8" />
                </span>
                <span className="text-sm font-medium text-ink transition-colors duration-250 group-hover/sub:text-green-800">{r.title}</span>
                <span className="text-xs tabular-nums text-ink-muted">{r.count}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <Suspense fallback={<ListingSkeleton />}>
        <ListingView basePath="/urunler" baseQuery={{}} searchParams={searchParams} categoryLinks={categoryLinks} />
      </Suspense>
    </div>
  );
}
