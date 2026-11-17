/**
 * JSON source adapter — the ONLY module that reads data/*.json.
 * Backend migration (Medusa / Shopify Storefront): replace this file with an adapter that returns the same
 * `CatalogSnapshot` (fetching + `"use cache"`); src/lib/products.ts and every UI component stay unchanged.
 *
 * Server-only by convention (3.6 MB JSON): never import from a "use client" module.
 */
import productsJson from "@data/products.json";
import categoriesJson from "@data/categories.json";
import brandsJson from "@data/brands.json";
import type { Brand, CategoriesFile, Product } from "@data/schema";
import { PREVIEW_ALL, regulatedCategories, themes } from "@/config/storefront";
import { resolvePalette } from "@/lib/theme/palette";
import { isListed, isSellable } from "./gate";
import type { BrandRef, CatalogImage, CategoryNode, ProductDetail } from "./types";

export interface CatalogSnapshot {
  /** Listed products in source order (publishReady, or everything on preview builds). */
  products: ProductDetail[];
  bySlug: Map<string, ProductDetail>;
  /** Flat consumer category nodes (children empty), source order. */
  categories: Omit<CategoryNode, "count" | "trCount" | "children">[];
  brands: BrandRef[];
}

const rawProducts = productsJson as unknown as Product[];
const rawCategories = categoriesJson as unknown as CategoriesFile;
const rawBrands = brandsJson as unknown as Brand[];

/** Rules live in ./gate.ts (unit-tested): implausible prices never listed; preview never makes a product sellable. */

function mapImages(p: Product, alt: string): CatalogImage[] {
  return p.images.map((img) => ({
    src: img.src,
    width: img.width ?? null,
    height: img.height ?? null,
    remote: /^https?:\/\//.test(img.src),
    alt,
  }));
}

/** Contrast-guarded palette -> accent vars; a failing palette falls back to the brand theme with a build warning. */
function resolveAccent(p: Product) {
  if (!p.palette) return null;
  const resolved = resolvePalette(p.palette);
  if (!resolved) console.warn(`[catalog] palette for ${p.code || p.id} fails the 4.6:1 guard -> brand theme`);
  return resolved?.vars ?? null;
}

const textOrNull = (s: string | null | undefined) => (s && s.trim() ? s.trim() : null);

function build(): CatalogSnapshot {
  const brandMap = new Map<string, BrandRef>(rawBrands.map((b) => [b.slug, { slug: b.slug, title: b.title }]));
  const catTitle = new Map(rawCategories.consumer.map((c) => [c.slug, c.title_tr]));

  const products: ProductDetail[] = [];
  for (const p of rawProducts) {
    if (!isListed(p, PREVIEW_ALL)) continue;
    const brand = brandMap.get(p.brand) ?? { slug: p.brand, title: p.brand };
    const titleTr = textOrNull(p.title_tr);
    // K-024: Russian never shown. Preview fallback = brand + code, flagged so the UI can mark it.
    const name = titleTr ?? (p.code ? `${brand.title} ${p.code}` : `${brand.title} ürünü`);
    const root = p.consumerCategory.parent;
    const child = p.consumerCategory.child;
    const path = child ? `${root}/${child}` : root;
    const images = mapImages(p, name);
    // M-1: the cart gate does not depend on preview mode; prices are only exposed for sellable products.
    const sellable = isSellable(p);
    const themeKey = p.themeHint ? (themes.enabledFor[p.themeHint] ?? null) : null;

    products.push({
      id: p.id,
      slug: p.slug,
      href: `/urun/${p.slug}`,
      code: p.code,
      name,
      nameIsFallback: titleTr === null,
      brand,
      category: {
        root,
        rootTitle: catTitle.get(root) ?? root,
        child,
        childTitle: child ? (catTitle.get(path) ?? child) : null,
        href: `/kategori/${path}`,
      },
      availability: p.availability,
      sellable,
      price: sellable ? p.price : null,
      memberPrice: sellable ? p.memberPrice : null,
      pv: p.pv,
      image: images[0] ?? null,
      hoverImage: images[1] ?? null,
      volume: textOrNull(p.volume),
      isSet: p.isSet,
      theme: themeKey,
      accent: resolveAccent(p),
      regulated: regulatedCategories.includes(path),
      shortDescription: textOrNull(p.shortDescription_tr),
      images,
      barcode: p.barcode,
      description: textOrNull(p.description_tr),
      features: p.features_tr,
      usage: textOrNull(p.usage_tr),
      setContents: p.setContents_tr,
      certificates: p.certificates,
      skinType: p.skinType,
      concerns: p.concerns,
      routineStep: p.routineStep,
    });
  }

  const categories = rawCategories.consumer.map((c) => {
    const [root, child = null] = c.slug.split("/") as [string, string?];
    return {
      path: c.slug,
      root,
      child,
      title: c.title_tr,
      href: `/kategori/${c.slug}`,
      order: c.order,
      icon: c.icon,
      image: c.image,
      description: c.description_tr,
      regulated: regulatedCategories.includes(c.slug),
    };
  });

  return {
    products,
    bySlug: new Map(products.map((p) => [p.slug, p])),
    categories,
    brands: [...brandMap.values()],
  };
}

let snapshot: CatalogSnapshot | null = null;

/** Builds once per server process (build workers / lambdas). */
export function loadCatalog(): CatalogSnapshot {
  snapshot ??= build();
  return snapshot;
}
