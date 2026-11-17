/**
 * Data access facade (K-004). UI components get catalog data ONLY from here.
 * All functions are async so a network backend can replace src/lib/catalog/json-source.ts without touching callers.
 * Server-only: do not import from "use client" modules (pass plain props / use getCartCatalog()).
 */
import teaser from "@data/teaser.json";
import { collections as collectionDefs, PAGE_SIZE, themes, type CollectionDef } from "@/config/storefront";
import { scoreDoc, tokenize, foldTurkish, type SearchDoc } from "@/lib/search";
import { loadCatalog } from "@/lib/catalog/json-source";
import type {
  BrandFacet,
  BrandRef,
  CartCatalog,
  CategoryNode,
  Collection,
  ProductDetail,
  ProductPage,
  ProductQuery,
  ProductSummary,
  SearchHit,
  SortKey,
} from "@/lib/catalog/types";

export type * from "@/lib/catalog/types";
export { PREVIEW_ALL } from "@/config/storefront";

// ------------------------------------------------------------------ helpers

/** Strips detail-only fields so list payloads (RSC props) stay small. Use this instead of hand-picking fields. */
export function toProductSummary(p: ProductDetail): ProductSummary {
  return {
    id: p.id,
    slug: p.slug,
    href: p.href,
    code: p.code,
    name: p.name,
    nameIsFallback: p.nameIsFallback,
    brand: p.brand,
    category: p.category,
    availability: p.availability,
    sellable: p.sellable,
    price: p.price,
    memberPrice: p.memberPrice,
    pv: p.pv,
    image: p.image,
    hoverImage: p.hoverImage,
    volume: p.volume,
    isSet: p.isSet,
    theme: p.theme,
    accent: p.accent,
    regulated: p.regulated,
    shortDescription: p.shortDescription,
  };
}

/**
 * Image-less products sort last (M-1, TASARIM-INCELEME-1 A-2). Applied AFTER trFirst in "onerilen"/"yeni" and related
 * products, so they go to the end of the TR group (K-052 TR-first wins); in price sorts it is the first key.
 */
const imageLast = (a: ProductDetail, b: ProductDetail) => Number(a.image === null) - Number(b.image === null);
const numericId = (id: string) => Number(id.replace(/\D+/g, "")) || 0;
const trFirst = (a: ProductDetail, b: ProductDetail) => (a.availability === b.availability ? 0 : a.availability === "tr" ? -1 : 1);

let searchDocs: Map<string, SearchDoc> | null = null;
function searchDoc(p: ProductDetail): SearchDoc {
  if (!searchDocs) {
    searchDocs = new Map();
    for (const x of loadCatalog().products) {
      searchDocs.set(x.id, {
        tokens: tokenize(
          [x.nameIsFallback ? "" : x.name, x.brand.title, x.category.rootTitle, x.category.childTitle ?? ""].join(" "),
        ),
        keys: [x.code, x.barcode ?? ""].map((k) => foldTurkish(k).replace(/ /g, "")).filter(Boolean),
      });
    }
  }
  return searchDocs.get(p.id) ?? { tokens: [], keys: [] };
}

function matchesCollection(p: ProductDetail, def: CollectionDef): boolean {
  switch (def.rule.type) {
    case "availability":
      return p.availability === def.rule.value;
    case "themeHint":
      // The domain keeps the resolved theme, not the raw hint: match via the hint -> theme map in config.
      return p.theme !== null && def.rule.values.some((v) => themes.enabledFor[v] === p.theme);
    case "codes":
      return def.rule.codes.includes(p.code);
  }
}

function sortProducts(list: ProductDetail[], sort: SortKey, scores?: Map<string, number>): ProductDetail[] {
  const indexed = list.map((p, i) => ({ p, i }));
  const price = (p: ProductDetail) => p.price ?? Number.POSITIVE_INFINITY;
  indexed.sort((a, b) => {
    switch (sort) {
      case "fiyat-artan":
        return imageLast(a.p, b.p) || price(a.p) - price(b.p) || a.i - b.i;
      case "fiyat-azalan":
        return imageLast(a.p, b.p) || (b.p.price ?? -1) - (a.p.price ?? -1) || a.i - b.i;
      case "yeni":
        // No release date in the data yet: higher source id = newer (proxy). TR first (K-052).
        return trFirst(a.p, b.p) || imageLast(a.p, b.p) || numericId(b.p.id) - numericId(a.p.id);
      case "onerilen":
      default:
        return trFirst(a.p, b.p) || imageLast(a.p, b.p) || (scores ? (scores.get(b.p.id) ?? 0) - (scores.get(a.p.id) ?? 0) : 0) || a.i - b.i;
    }
  });
  return indexed.map((x) => x.p);
}

// ------------------------------------------------------------------ products

/** Filtered, sorted, paginated listing. Facets are computed before brand/price filters. */
export async function getProducts(query: ProductQuery = {}): Promise<ProductPage> {
  const { products } = loadCatalog();
  const pageSize = Math.max(1, query.pageSize ?? PAGE_SIZE);
  const page = Math.max(1, Math.floor(query.page ?? 1));
  const def = query.collection ? collectionDefs.find((c) => c.key === query.collection) : undefined;

  let scores: Map<string, number> | undefined;
  const qTokens = query.q ? tokenize(query.q) : [];

  // K-268: ?kok= root scope; unknown roots and category pages ignore it.
  const scope = !query.category && query.scope && loadCatalog().categories.some((c) => c.child === null && c.root === query.scope) ? query.scope : undefined;

  let base = products.filter((p) => {
    if (scope && p.category.root !== scope) return false;
    if (query.category) {
      const path = p.category.child ? `${p.category.root}/${p.category.child}` : p.category.root;
      if (p.category.root !== query.category && path !== query.category) return false;
    }
    if (query.collection && (!def || !matchesCollection(p, def))) return false;
    if (query.excludeIds?.includes(p.id)) return false;
    if (query.skinType?.length && !query.skinType.some((t) => p.skinType.includes(t))) return false;
    if (query.concerns?.length && !query.concerns.some((t) => p.concerns.includes(t))) return false;
    return true;
  });

  if (qTokens.length) {
    scores = new Map();
    base = base.filter((p) => {
      const s = scoreDoc(qTokens, searchDoc(p));
      if (s > 0) scores!.set(p.id, s);
      return s > 0;
    });
  }

  const availabilityCounts = {
    tr: base.filter((p) => p.availability === "tr").length,
    yakinda: base.filter((p) => p.availability === "yakinda").length,
  };
  if (query.availability && query.availability !== "all") base = base.filter((p) => p.availability === query.availability);

  const brandCounts = new Map<string, BrandFacet>();
  const prices: number[] = [];
  for (const p of base) {
    const f = brandCounts.get(p.brand.slug) ?? { ...p.brand, count: 0 };
    f.count++;
    brandCounts.set(p.brand.slug, f);
    if (p.price != null) prices.push(p.price);
  }

  let filtered = base;
  if (query.brands?.length) filtered = filtered.filter((p) => query.brands!.includes(p.brand.slug));
  if (query.priceMin != null || query.priceMax != null) {
    const min = query.priceMin ?? 0;
    const max = query.priceMax ?? Number.POSITIVE_INFINITY;
    filtered = filtered.filter((p) => p.price != null && p.price >= min && p.price <= max);
  }

  const sorted = sortProducts(filtered, query.sort ?? "onerilen", scores);
  const total = sorted.length;
  const pageCount = Math.max(1, Math.ceil(total / pageSize));
  return {
    items: sorted.slice((page - 1) * pageSize, page * pageSize).map(toProductSummary),
    total,
    page,
    pageSize,
    pageCount,
    hasMore: page < pageCount,
    facets: {
      brands: [...brandCounts.values()].sort((a, b) => b.count - a.count || a.title.localeCompare(b.title, "tr")),
      price: prices.length ? { min: Math.min(...prices), max: Math.max(...prices) } : null,
      availability: availabilityCounts,
    },
  };
}

export async function getProduct(slug: string): Promise<ProductDetail | null> {
  return loadCatalog().bySlug.get(slug) ?? null;
}

/** Hand-picked products in the given code order (hero, featured slots). Unknown codes are skipped. */
export async function getProductsByCodes(codes: readonly string[]): Promise<ProductSummary[]> {
  const byCode = new Map(loadCatalog().products.map((p) => [p.code, p]));
  return codes.flatMap((c) => {
    const p = byCode.get(c);
    return p ? [toProductSummary(p)] : [];
  });
}

/** Products by slug, in request order; unknown slugs skipped (favourites, K-033). */
export async function getProductsBySlugs(slugs: readonly string[]): Promise<ProductSummary[]> {
  const { bySlug } = loadCatalog();
  return slugs.flatMap((s) => {
    const p = bySlug.get(s);
    return p ? [toProductSummary(p)] : [];
  });
}

/** Slugs to prerender at build time: all sellable products + up to `samples` of the rest. */
export async function getStaticProductSlugs(samples = 12): Promise<string[]> {
  const { products } = loadCatalog();
  const sellable = products.filter((p) => p.availability === "tr").map((p) => p.slug);
  const themed = products.filter((p) => p.theme && p.availability !== "tr").map((p) => p.slug);
  const rest = products.filter((p) => p.availability !== "tr" && !p.theme).slice(0, samples).map((p) => p.slug);
  return [...new Set([...sellable, ...themed, ...rest])];
}

/** K-030: manual mapping (future) -> same child category -> same root -> same brand; TR first; max `limit`. */
export async function getRelatedProducts(slug: string, limit = 4): Promise<ProductSummary[]> {
  const { products, bySlug } = loadCatalog();
  const self = bySlug.get(slug);
  if (!self) return [];
  const tiers: Array<(p: ProductDetail) => boolean> = [
    (p) => p.category.child !== null && p.category.child === self.category.child && p.category.root === self.category.root,
    (p) => p.category.root === self.category.root,
    (p) => p.brand.slug === self.brand.slug,
  ];
  const out: ProductDetail[] = [];
  for (const tier of tiers) {
    const pool = products.filter((p) => p.id !== self.id && !out.includes(p) && tier(p)).sort((a, b) => trFirst(a, b) || imageLast(a, b));
    for (const p of pool) {
      if (out.length >= limit) break;
      out.push(p);
    }
  }
  return out.slice(0, limit).map(toProductSummary);
}

// ------------------------------------------------------------------ search

/** Instant-search hits (K-028): Turkish folding, prefix, light typos, code/barcode. TR first. */
export async function searchProducts(q: string, limit = 8, scope?: string): Promise<SearchHit[]> {
  return (await searchProductsScoped(q, limit, scope)).hits;
}

/**
 * K-268 scoped instant search: hits + total + the resolved scope (null when `scope` is absent or not a visible root,
 * i.e. the search ran over all products).
 */
export async function searchProductsScoped(
  q: string,
  limit = 8,
  scope?: string | null,
): Promise<{ hits: SearchHit[]; total: number; scope: { root: string; title: string } | null }> {
  const resolved = scope ? await getSearchScope(scope) : null;
  const { items, total } = await getProducts({ q, pageSize: limit, scope: resolved?.root });
  const hits = items.map((p) => ({
    slug: p.slug,
    href: p.href,
    name: p.name,
    nameIsFallback: p.nameIsFallback,
    brandTitle: p.brand.title,
    code: p.code,
    image: p.image,
    availability: p.availability,
    price: p.price,
    memberPrice: p.memberPrice,
    pv: p.pv,
  }));
  return { hits, total, scope: resolved };
}

/** K-268: a search scope (?kok=) -> visible root category, or null (unknown/empty root = search everything). */
export async function getSearchScope(root: string): Promise<{ root: string; title: string } | null> {
  const node = (await getCategoryTree()).find((n) => n.root === root);
  return node ? { root: node.root, title: node.title } : null;
}

// ------------------------------------------------------------------ categories & brands

function countedNodes(): CategoryNode[] {
  const { products, categories } = loadCatalog();
  const count = new Map<string, { all: number; tr: number }>();
  const bump = (key: string, tr: boolean) => {
    const c = count.get(key) ?? { all: 0, tr: 0 };
    c.all++;
    if (tr) c.tr++;
    count.set(key, c);
  };
  for (const p of products) {
    bump(p.category.root, p.availability === "tr");
    if (p.category.child) bump(`${p.category.root}/${p.category.child}`, p.availability === "tr");
  }
  return categories.map((c) => ({
    ...c,
    count: count.get(c.path)?.all ?? 0,
    trCount: count.get(c.path)?.tr ?? 0,
    children: [],
  }));
}

/** Flat list of visible category nodes (empty nodes hidden — BILGI-MIMARISI §1.3). */
export async function getCategories(): Promise<CategoryNode[]> {
  return countedNodes().filter((c) => c.count > 0);
}

/** 12-root, 2-level tree (K-050), menu order, empty nodes hidden. */
export async function getCategoryTree(): Promise<CategoryNode[]> {
  const nodes = countedNodes().filter((c) => c.count > 0);
  const roots = nodes.filter((n) => n.child === null).sort((a, b) => a.order - b.order);
  for (const r of roots) r.children = nodes.filter((n) => n.root === r.root && n.child !== null).sort((a, b) => a.order - b.order);
  return roots;
}

/** One node (root, or root + child) with children; null if unknown or empty. */
export async function getCategory(root: string, child?: string | null): Promise<CategoryNode | null> {
  const tree = await getCategoryTree();
  const r = tree.find((n) => n.root === root);
  if (!r) return null;
  if (!child) return r;
  return r.children.find((n) => n.child === child) ?? null;
}

export async function getBrands(): Promise<BrandFacet[]> {
  const counts = new Map<string, number>();
  for (const p of loadCatalog().products) counts.set(p.brand.slug, (counts.get(p.brand.slug) ?? 0) + 1);
  return loadCatalog()
    .brands.filter((b: BrandRef) => (counts.get(b.slug) ?? 0) > 0)
    .map((b) => ({ ...b, count: counts.get(b.slug) ?? 0 }))
    .sort((a, b) => b.count - a.count);
}

// ------------------------------------------------------------------ collections

/** Collection with its products (first `limit`). null when the key is unknown OR the collection is empty. */
export async function getCollection(key: string, opts: { limit?: number; sort?: SortKey } = {}): Promise<Collection | null> {
  const def = collectionDefs.find((c) => c.key === key);
  if (!def) return null;
  let list = loadCatalog().products.filter((p) => matchesCollection(p, def));
  if (def.rule.type === "codes") {
    const order = def.rule.codes;
    list = [...list].sort((a, b) => order.indexOf(a.code) - order.indexOf(b.code));
  } else {
    list = sortProducts(list, opts.sort ?? "onerilen");
  }
  if (list.length === 0) return null;
  return {
    key: def.key,
    title: def.title,
    description: def.description,
    theme: def.theme,
    href: `/koleksiyon/${def.key}`,
    total: list.length,
    products: (opts.limit != null ? list.slice(0, opts.limit) : list).map(toProductSummary),
  };
}

/** Non-empty listed collections (metadata only). */
export async function getCollections(): Promise<Omit<Collection, "products">[]> {
  const out: Omit<Collection, "products">[] = [];
  for (const def of collectionDefs.filter((c) => c.listed)) {
    const c = await getCollection(def.key, { limit: 0 });
    if (c) out.push({ key: c.key, title: c.title, description: c.description, theme: c.theme, href: c.href, total: c.total });
  }
  return out;
}

/** All collection keys with at least one product (for generateStaticParams). */
export async function getCollectionKeys(): Promise<string[]> {
  const keys: string[] = [];
  for (const def of collectionDefs) if (await getCollection(def.key, { limit: 1 })) keys.push(def.key);
  return keys;
}

// ------------------------------------------------------------------ cart

/** Sellable products keyed by code — passed from the server layout to the client cart (K-031). */
export async function getCartCatalog(): Promise<CartCatalog> {
  const out: CartCatalog = {};
  for (const p of loadCatalog().products) {
    if (!p.sellable || p.price == null || p.memberPrice == null) continue;
    out[p.code] = {
      code: p.code,
      slug: p.slug,
      href: p.href,
      name: p.name,
      brandTitle: p.brand.title,
      image: p.image,
      price: p.price,
      memberPrice: p.memberPrice,
      pv: p.pv,
    };
  }
  return out;
}

// ------------------------------------------------------------------ legacy (/yakinda landing, K-046)

export type TeaserProduct = {
  code: string;
  brand: string | null;
  name: string;
  volume: string | null;
  category: string;
  /** Member price (panel price), TRY. */
  memberPrice: number;
  /** List price = memberPrice × LIST_PRICE_MULTIPLIER (K-036), TRY. */
  listPrice: number;
  pv: number;
  image: string;
};

/** Used only by the K-046 "yakında" landing (/yakinda). */
export function getTeaserProducts(): TeaserProduct[] {
  return teaser.items satisfies TeaserProduct[];
}
