/**
 * UI-facing catalog contract. Components import THESE types (via "@/lib/products"), never data/schema.ts.
 * Russian source text never crosses this boundary (K-024). Backend migration keeps these types stable.
 */
import type { AccentVars } from "@/lib/theme/palette";
import type { ThemeKey } from "@/lib/theme/themes";

export type Availability = "tr" | "yakinda";

export interface CatalogImage {
  src: string;
  /** Known for local TR webp files; null for remote images (use `fill` + aspect box). */
  width: number | null;
  height: number | null;
  remote: boolean;
  alt: string;
}

export interface BrandRef {
  slug: string;
  title: string;
}

export interface CategoryRef {
  root: string;
  rootTitle: string;
  child: string | null;
  childTitle: string | null;
  /** "/kategori/<root>[/<child>]" */
  href: string;
}

export interface ProductSummary {
  id: string;
  slug: string;
  /** "/urun/<slug>" */
  href: string;
  code: string;
  /** Display name. Turkish title, or a preview fallback (see nameIsFallback). */
  name: string;
  /** true = no Turkish title yet; name is "<Brand> <code>" and is only shown on preview builds. UI must mark it. */
  nameIsFallback: boolean;
  brand: BrandRef;
  category: CategoryRef;
  availability: Availability;
  /**
   * Can be added to cart: TR, publishReady, priced, has code, not price-flagged (K-031, K-052, K-109, S-025, M-1).
   * Never true for a publishReady=false or price-implausible product, preview builds included.
   */
  sellable: boolean;
  /** "Fiyat" (TRY, KDV dahil). null for "yakında" AND for every non-sellable product (no price without a cart). */
  price: number | null;
  /** "Üye fiyatı" (TRY). null whenever `price` is null. */
  memberPrice: number | null;
  /** null -> do not render the PV element (K-098). */
  pv: number | null;
  image: CatalogImage | null;
  /**
   * Second image for the card hover cross-fade (S-063); null unless the product has 2+ images.
   * Always set by the data layer. Optional in the type only so hand-built summaries keep compiling —
   * build summaries with toProductSummary() instead.
   */
  hoverImage?: CatalogImage | null;
  volume: string | null;
  isSet: boolean;
  /** Full theme for this product's surfaces (K-065/K-092), null = brand theme. */
  theme: ThemeKey | null;
  /** Contrast-checked accent vars from the product palette (K-066), null = no recolor. */
  accent: AccentVars | null;
  /** K-095 regulated sub-category: never feature in showcases/mega menu, show the fixed note on PDP. */
  regulated: boolean;
  shortDescription: string | null;
}

export interface Certificate {
  type: string;
  pdf: string | null;
}

export interface ProductDetail extends ProductSummary {
  images: CatalogImage[];
  barcode: string | null;
  description: string | null;
  features: string[];
  usage: string | null;
  setContents: string[];
  certificates: Certificate[];
  skinType: string[];
  concerns: string[];
  routineStep: string | null;
}

export interface CategoryNode {
  /** "cilt-bakimi" or "cilt-bakimi/serumlar" */
  path: string;
  root: string;
  child: string | null;
  title: string;
  href: string;
  order: number;
  /** Listed products under this node (respecting preview mode). */
  count: number;
  /** Of which sellable in Turkey. */
  trCount: number;
  icon: string | null;
  image: string | null;
  description: string | null;
  regulated: boolean;
  children: CategoryNode[];
}

export interface BrandFacet extends BrandRef {
  count: number;
}

export type SortKey = "onerilen" | "fiyat-artan" | "fiyat-azalan" | "yeni";

export interface ProductQuery {
  /** "cilt-bakimi" or "cilt-bakimi/serumlar" */
  category?: string;
  brands?: string[];
  /** default "all"; "tr" = the "Yalnız Türkiye'de satışta" chip */
  availability?: Availability | "all";
  q?: string;
  /**
   * K-268 search scope: a ROOT category slug from ?kok= (header search capsule). Unknown roots are ignored; ignored
   * too when `category` is set (category pages already scope themselves).
   */
  scope?: string;
  priceMin?: number;
  priceMax?: number;
  skinType?: string[];
  concerns?: string[];
  collection?: string;
  excludeIds?: string[];
  sort?: SortKey;
  /** 1-based */
  page?: number;
  pageSize?: number;
}

export interface ProductPage {
  items: ProductSummary[];
  total: number;
  page: number;
  pageSize: number;
  pageCount: number;
  hasMore: boolean;
  facets: {
    brands: BrandFacet[];
    price: { min: number; max: number } | null;
    availability: { tr: number; yakinda: number };
  };
}

export interface Collection {
  key: string;
  title: string;
  description: string | null;
  theme: ThemeKey | null;
  href: string;
  total: number;
  products: ProductSummary[];
}

/** Slim, client-safe record for the cart (K-031: names/prices are re-read from data on every open). */
export interface CartProduct {
  code: string;
  slug: string;
  href: string;
  name: string;
  brandTitle: string;
  image: CatalogImage | null;
  price: number;
  memberPrice: number;
  pv: number | null;
}

export type CartCatalog = Record<string, CartProduct>;

/** Instant-search hit (client-safe). */
export interface SearchHit {
  slug: string;
  href: string;
  name: string;
  nameIsFallback: boolean;
  brandTitle: string;
  code: string;
  image: CatalogImage | null;
  availability: Availability;
  price: number | null;
  memberPrice: number | null;
  pv: number | null;
}
