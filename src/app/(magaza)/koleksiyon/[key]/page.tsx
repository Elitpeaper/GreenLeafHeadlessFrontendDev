import { stockPhoto } from "@/components/listing/stock";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import { CornerFlourish, GoldFrame, GoldRule, GoldStripe, LeafDiamond } from "@/components/brand/ornaments";
import { Breadcrumb } from "@/components/listing/Breadcrumb";
import { ListingHero } from "@/components/listing/ListingHero";
import { EmptyScope, ListingView } from "@/components/listing/ListingView";
import { ListingSkeleton } from "@/components/listing/ListingSkeleton";
import { ArrowRight } from "@/components/ui/lucide";
import type { RawSearchParams } from "@/lib/catalog/query-params";
import { getCollection, getCollectionKeys, type Collection } from "@/lib/products";
import { ThemeScope } from "@/lib/theme/ThemeScope";
import { t } from "@/lib/ui-text";

/** Non-empty collections only (empty = 404 + hidden, SAYFA-HARITASI #4). */
export async function generateStaticParams() {
  return (await getCollectionKeys()).map((key) => ({ key }));
}

export async function generateMetadata({ params }: PageProps<"/koleksiyon/[key]">): Promise<Metadata> {
  const c = await getCollection((await params).key, { limit: 0 });
  return c ? { title: c.title } : {};
}

/**
 * Collection = listing variant (kategori.md "Varyant: Koleksiyon"). Themed collections (K-065, K-092, K-101,
 * premium-theme.md §5.1) get the deep forest hero with gold foil ornaments; prices stay on light cards.
 */
export default async function CollectionPage({ params, searchParams }: PageProps<"/koleksiyon/[key]">) {
  const collection = await getCollection((await params).key, { limit: 6 });
  if (!collection) notFound();
  const premium = collection.theme === "premium-gold";
  const basePath = collection.href;
  const listing = (
    <Suspense fallback={<ListingSkeleton />}>
      <ListingView
        basePath={basePath}
        baseQuery={{ collection: collection.key }}
        searchParams={searchParams as Promise<RawSearchParams>}
        hideAvailability={collection.key === "turkiyede-satista" || collection.key === "turkiyeye-yakinda"}
        minForFilters={premium ? 12 : 0}
        emptyScope={<EmptyScope title={t("collection.empty.title")} cta={t("collection.empty.cta")} href="/koleksiyon/turkiyede-satista" />}
      />
    </Suspense>
  );

  if (!premium) {
    return (
      <div className="mx-auto max-w-page px-gutter pb-8 pt-4 sm:pt-6">
        <Breadcrumb items={[{ href: basePath, label: collection.title }]} />
        <ListingHero className="mt-3" photo={stockPhoto("collection.default")} title={collection.title} lead={collection.description} />
        {listing}
      </div>
    );
  }

  return (
    <ThemeScope theme="premium-gold">
      <PremiumHero collection={collection} />
      <div className="mx-auto max-w-wide px-gutter pb-8 pt-section-tight">
        <div className="flex items-center justify-center gap-4" aria-hidden="true">
          <GoldRule className="max-w-40" />
          <LeafDiamond />
          <GoldRule className="max-w-40" />
        </div>
        {listing}
        <GoldFrame as="section" className="mx-auto mt-section-tight max-w-3xl">
          <div className="relative px-6 py-10 text-center sm:px-12">
            <p className="text-xs font-semibold uppercase tracking-premium text-accent-text">{collection.title}</p>
            <h2 className="premium-display mt-3 text-3xl text-ink">{t("collection.cta.title")}</h2>
            <p className="mx-auto mt-3 max-w-prose text-base text-ink-muted">{t("collection.cta.body")}</p>
            <Link
              href="/uye-ol"
              className="mt-6 inline-flex min-h-control-lg items-center gap-2 rounded-pill bg-green-700 px-8 text-base font-semibold text-white shadow-button hover:bg-green-800"
            >
              {t("header.cta.membership")}
              <ArrowRight size={18} />
            </Link>
          </div>
        </GoldFrame>
      </div>
    </ThemeScope>
  );
}

function PremiumHero({ collection }: { collection: Collection }) {
  const hero = collection.products.find((p) => p.image) ?? null;
  const goldPhoto = stockPhoto("premium.gold.1");
  const thumbs = collection.products.filter((p) => p.image && p !== hero).slice(0, 3);
  return (
    <section aria-labelledby="collection-title" className="relative isolate overflow-hidden bg-(image:--gradient-forest-depth) text-on-accent-deep">
      {goldPhoto && (
        <>
          <Image src={goldPhoto.src} alt="" fill sizes="100vw" priority className="-z-10 object-cover" placeholder={goldPhoto.blurDataURL ? "blur" : "empty"} blurDataURL={goldPhoto.blurDataURL} />
          <div aria-hidden="true" className="absolute inset-0 -z-10 bg-forest-950/80 md:bg-linear-to-r md:from-forest-950/90 md:via-forest-950/75 md:to-forest-950/45" />
        </>
      )}
      <CornerFlourish corner="tl" className="absolute left-4 top-4 size-12 sm:left-8 sm:top-8 sm:size-16" />
      <CornerFlourish corner="br" className="absolute bottom-8 right-4 size-12 sm:right-8 sm:size-16" />
      <div className="mx-auto grid max-w-wide items-center gap-8 px-gutter pb-24 pt-10 md:grid-cols-[1.1fr_1fr] md:pt-16">
        <div className="max-w-xl">
          <nav aria-label="Breadcrumb" className="mb-6 text-sm text-gold-200">
            <Link href="/" className="inline-flex min-h-tap-min items-center underline-offset-4 hover:underline">
              {t("product.breadcrumb.home")}
            </Link>
            <span aria-hidden="true" className="mx-2">
              /
            </span>
            <span aria-current="page">{collection.title}</span>
          </nav>
          <p className="text-xs font-semibold uppercase tracking-premium text-gold-300">{t("collection.premium.eyebrow")}</p>
          <h1 id="collection-title" className="premium-display mt-4 text-display text-gold-300">
            {collection.title}
          </h1>
          <GoldRule className="mt-6 max-w-72" />
          {collection.description && <p className="mt-6 max-w-prose text-lg text-gold-200">{collection.description}</p>}
          <p className="mt-3 text-sm text-gold-200">{t("collection.premium.count", { count: collection.total })}</p>
        </div>
        <div className="relative mx-auto aspect-square w-full max-w-md">
          <span aria-hidden="true" className="absolute inset-0 rounded-full bg-(image:--gradient-gold-glow)" />
          <span aria-hidden="true" className="absolute inset-[10%] rounded-full bg-gold-50 shadow-gold ring-1 ring-gold-300/60" />
          <span aria-hidden="true" className="absolute inset-[6%] rounded-full border border-gold-300/30" />
          {hero?.image && (
            <div className="absolute inset-[20%]" data-motion="premium-packshot">
              <Image src={hero.image.src} alt={hero.image.alt || hero.name} fill priority sizes="(min-width: 768px) 360px, 70vw" className="object-contain mix-blend-multiply" />
            </div>
          )}
          {thumbs.length > 0 && (
            <ul className="absolute -bottom-10 left-1/2 flex -translate-x-1/2 gap-3">
              {thumbs.map((p) => (
                <li key={p.id}>
                  <Link href={p.href} aria-label={p.name} className="relative block size-16 overflow-hidden rounded-full bg-gold-50 ring-1 ring-gold-300 sm:size-20">
                    {p.image && <Image src={p.image.src} alt="" fill sizes="80px" className="object-contain p-2 mix-blend-multiply" />}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <GoldStripe className="absolute inset-x-0 bottom-0" />
    </section>
  );
}
