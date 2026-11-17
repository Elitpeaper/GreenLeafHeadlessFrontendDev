import Image from "next/image";
import { getStockImage } from "@/lib/images";
import { CategoryIllustration } from "@/components/illustrations/category-icons";
import { TextureGrain } from "@/components/illustrations/textures";
import { ProductCard } from "@/components/product/ProductCard";
import type { ProductSummary } from "@/lib/products";
import { t } from "@/components/sections/copy";
import { ArrowLink, Eyebrow } from "../parts";
import { AccentZone } from "./AccentZone";
import { Tabs } from "./Tabs";

/** K-270: the swapping side panel is the shelf photo (4:5), the small tab icon stays a mark. */
function TabPhoto({ slug }: { slug: string }) {
  const p = getStockImage(`shelf.${slug}`);
  if (!p) return <CategoryIllustration slug={slug} className="size-48 text-ink" />;
  return (
    <span className="relative block aspect-[4/5] w-32 overflow-hidden rounded-tile shadow-card lg:w-36">
      <Image src={p.src} alt="" fill sizes="144px" className="object-cover" placeholder={p.blurDataURL ? "blur" : "empty"} blurDataURL={p.blurDataURL} />
    </span>
  );
}

export interface ShowcaseTab {
  key: string;
  label: string;
  href: string;
  linkLabel: string;
  products: ProductSummary[];
}

/**
 * Vitrin 2 "Keşfet" (brief §7): cream-50 ground + faint grain, big pill tabs with category icons, a giant category
 * icon beside the heading that swaps with the tab (V-1), 4 x 2 grid (phones: 2 columns, first 4 cards + "Tümünü gör").
 * Products already shown above are excluded by the page (K-008). Tabs with < 4 imaged products are dropped. RecolorZone Z3.
 */
export function TabbedShowcase({ tabs }: { tabs: ShowcaseTab[] }) {
  // K-153 / B-5: image-less products never lead (or appear in) a showcase; they stay in listings.
  // V-1: a tab needs >= 4 imaged products and >= 2 sellable ones among its first 4 cards; tabs are ordered by sellable
  // count (most first); the card count is a multiple of 4 (no empty grid cells at lg).
  const usable = tabs
    .map((tab) => {
      const imaged = tab.products.filter((p) => p.image);
      const products = imaged.slice(0, Math.min(8, Math.floor(imaged.length / 4) * 4));
      return { ...tab, products, sellable: imaged.filter((p) => p.sellable).length, lead: products.slice(0, 4).filter((p) => p.sellable).length };
    })
    .filter((tab) => tab.products.length >= 4 && tab.lead >= 2)
    .sort((a, b) => b.sellable - a.sellable);
  if (usable.length === 0) return null;
  return (
    <AccentZone aria-labelledby="discover-title" className="relative isolate overflow-hidden bg-cream-50 py-section">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <TextureGrain strength={0.06} />
      </div>
      <div className="mx-auto max-w-page px-gutter">
        <Tabs
          label={t("home.v2.showcase2.tabsLabel")}
          head={
            <div className="max-w-2xl">
              <Eyebrow>{t("home.v2.showcase2.eyebrow")}</Eyebrow>
              <h2 id="discover-title" className="mt-4 text-display text-ink">
                {t("home.v2.showcase2.title")}
              </h2>
            </div>
          }
          tabs={usable.map((tab) => ({
            key: tab.key,
            label: tab.label,
            icon: <CategoryIllustration slug={tab.key} className="size-6 shrink-0" />,
            bigIcon: <TabPhoto slug={tab.key} />,
            panel: (
              <>
                <ul className="grid grid-cols-2 gap-grid-gap lg:grid-cols-4 max-md:[&>li:nth-child(n+5)]:hidden">
                  {tab.products.slice(0, 8).map((p) => (
                    <li key={p.id} data-motion="M-9">
                      <ProductCard product={p} surface="plate" />
                    </li>
                  ))}
                </ul>
                <div className="mt-8 text-center">
                  <ArrowLink href={tab.href}>{tab.linkLabel}</ArrowLink>
                </div>
              </>
            ),
          }))}
        />
      </div>
    </AccentZone>
  );
}
