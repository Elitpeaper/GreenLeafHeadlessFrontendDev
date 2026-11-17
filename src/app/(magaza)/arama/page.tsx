import { stockPhoto } from "@/components/listing/stock";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { ListingHero } from "@/components/listing/ListingHero";
import { ListingSkeleton } from "@/components/listing/ListingSkeleton";
import { ListingView } from "@/components/listing/ListingView";
import { ArrowRight, Search, Sprout, X } from "@/components/ui/lucide";
import { parseListingParams, toListingSearch, type RawSearchParams } from "@/lib/catalog/query-params";
import { getBrands, getCategoryTree, getSearchScope } from "@/lib/products";
import { t, tc } from "@/lib/ui-text";

export const metadata: Metadata = { title: "Arama", robots: { index: false, follow: true } };

/** /arama?q= (wireframe/arama.md D, K-028). Static shell + request-time results. */
export default function SearchPage({ searchParams }: { searchParams: Promise<RawSearchParams> }) {
  return (
    <div className="mx-auto max-w-page px-gutter pb-8 pt-6">
      <Suspense fallback={<ListingSkeleton />}>
        <Results searchParams={searchParams} />
      </Suspense>
    </div>
  );
}

async function Results({ searchParams }: { searchParams: Promise<RawSearchParams> }) {
  const query = parseListingParams(await searchParams);
  const brandOnly = !query.q && query.brands?.length === 1 ? (await getBrands()).find((b) => b.slug === query.brands?.[0]) : undefined;

  if (!query.q && !brandOnly) {
    return (
      <div className="mx-auto max-w-2xl py-section-tight text-center">
        <Search size={40} className="mx-auto text-green-700" />
        <h1 className="mt-4 text-4xl">{t("header.search.label")}</h1>
        <p className="mt-3 text-lg text-ink-muted">{t("search.emptyQuery")}</p>
        <form action="/arama" role="search" className="mx-auto mt-6 flex max-w-lg gap-2">
          <label htmlFor="search-page-q" className="sr-only">
            {t("header.search.label")}
          </label>
          <input
            id="search-page-q"
            name="q"
            type="search"
            placeholder={t("header.search.placeholder")}
            className="h-control-lg flex-1 rounded-pill border border-line-strong px-5 text-base focus:border-green-700"
          />
          <button type="submit" className="min-h-control-lg rounded-pill bg-green-700 px-6 font-medium text-white hover:bg-green-800">
            {t("header.search.submit")}
          </button>
        </form>
      </div>
    );
  }

  const title = query.q ? query.q : (brandOnly?.title ?? "");
  const roots = await getCategoryTree();
  // K-268: ?kok= root scope. Unknown/empty roots are ignored by the data layer; only a resolved scope shows the chip.
  const scope = query.scope ? await getSearchScope(query.scope) : null;
  const allHref = `/arama${toListingSearch({ ...query, scope: undefined, page: undefined })}`;
  const scopeLabel = scope ? t("search.scope.chip", { kategori: scope.title }) : "";
  const scopeChip = scope ? (
    <Link
      href={allHref}
      aria-label={t("listing.filter.remove", { ad: scopeLabel })}
      className="inline-flex min-h-tap-min items-center gap-1.5 rounded-pill bg-accent-soft py-1 pl-4 pr-2.5 text-sm font-medium text-ink ring-1 ring-accent-line transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:ring-green-700"
    >
      {scopeLabel}
      <X size={16} />
    </Link>
  ) : null;

  return (
    <ListingView
      basePath="/arama"
      baseQuery={{}}
      searchParams={searchParams}
      heading={(total) => (
        <>
          <ListingHero
            photo={stockPhoto("listing.search")}
            title={query.q ? t("search.title", { q: title }) : t("search.brandTitle", { brand: title })}
            lead={tc("search.count", total)}
          />
          {scopeChip && <div className="mt-4 flex flex-wrap items-center gap-3">{scopeChip}</div>}
        </>
      )}
      emptyScope={
        <div>
          <ListingHero photo={stockPhoto("listing.search")} title={t("search.empty.title", { q: title })} lead={t("search.empty.body")} />
          {scope && (
            <div className="mt-6 flex flex-wrap items-center gap-3">
              {scopeChip}
              <Link href={allHref} className="inline-flex min-h-control items-center gap-2 rounded-pill bg-green-700 px-6 font-medium text-white shadow-button hover:bg-green-800">
                {t("search.scope.searchAll")}
                <ArrowRight size={18} />
              </Link>
            </div>
          )}
          <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
            <section aria-labelledby="search-roots">
              <h2 id="search-roots" className="text-2xl">
                {t("search.panel.categories")}
              </h2>
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {roots.map((r) => (
                  <li key={r.root}>
                    <Link href={r.href} className="flex min-h-14 items-center justify-between rounded-md bg-surface-muted px-4 text-base font-medium ring-1 ring-line hover:ring-green-700">
                      {r.title}
                      <ArrowRight size={18} className="text-green-700" />
                    </Link>
                  </li>
                ))}
              </ul>
            </section>
            <aside className="rounded-xl bg-blue-50 p-6">
              <Sprout size={32} className="text-blue-700" />
              <p className="mt-3 text-xl font-semibold">{t("megaMenu.finder.title")}</p>
              <p className="mt-2 text-ink-muted">{t("megaMenu.finder.body")}</p>
              <Link href="/cilt-tipine-gore" className="mt-4 inline-flex min-h-tap items-center gap-2 font-medium text-blue-800 underline underline-offset-4">
                {t("megaMenu.finder.cta")}
                <ArrowRight size={18} />
              </Link>
            </aside>
          </div>
          <div className="mt-8 text-center">
            <Link href="/koleksiyon/turkiyede-satista" className="inline-flex min-h-control items-center rounded-pill bg-green-700 px-6 font-medium text-white shadow-button hover:bg-green-800">
              {t("cart.empty.cta")}
            </Link>
          </div>
        </div>
      }
    />
  );
}
