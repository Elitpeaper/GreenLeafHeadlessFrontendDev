/**
 * Mega menu / mobile drawer model — client-safe types + merge (K-288 / P-08).
 *
 * The shell used to embed the full menu model (12 roots × featured product, promo photo, category cover, every
 * sub-category packshot, blurDataURLs) in EVERY page's RSC payload (~45 KB raw per copy). Now it is split:
 * - `MenuRootNav` (text only: roots + sub-categories, counts, hrefs) is server-rendered as props — what the search
 *   scope, footer, quick links and the text part of both menus need;
 * - `MenuMediaMap` (images, cover, featured product, promo) is a static JSON route (`/api/menu`, prerendered at build)
 *   fetched on menu intent / first open by `menu-media.ts`. Until it arrives (or if it fails, K-091) the panels render
 *   their text with placeholder thumbs.
 */
import type { CatalogImage, ProductSummary } from "@/lib/catalog/types";
import type { StockPhoto } from "@/components/listing/stock";

export interface MenuChildNav {
  path: string;
  title: string;
  href: string;
  count: number;
  trCount: number;
}

export interface MenuChild extends MenuChildNav {
  image: CatalogImage | null;
}

export type MenuPromoKind = "finder" | "inStock" | "pv" | "sets" | "campaign";

export interface MenuPromo {
  kind: MenuPromoKind;
  href: string;
  /** Only for kind "campaign" (config text) — other kinds read ui.tr.json keys in the component. */
  title?: string;
  text?: string;
  image?: CatalogImage | null;
  /** Licensed atmosphere photo (K-160/K-161), decorative. */
  photo?: StockPhoto | null;
  theme?: "premium-gold" | null;
}

/** Text-only root: shipped with every page. */
export interface MenuRootNav {
  root: string;
  title: string;
  href: string;
  count: number;
  trCount: number;
  children: MenuChildNav[];
}

/** Media of one root: fetched lazily from /api/menu. */
export interface MenuMedia {
  image: CatalogImage | null;
  /** K-161 category atmosphere photo (mobile level-2 cover). */
  cover: StockPhoto | null;
  featured: ProductSummary | null;
  promo: MenuPromo | null;
  /** Sub-category image by child path. */
  childImages: Record<string, CatalogImage | null>;
}

export type MenuMediaMap = Record<string, MenuMedia>;

/** Full root as the panels render it (media fields null until loaded). */
export interface MenuRoot extends Omit<MenuRootNav, "children"> {
  image: CatalogImage | null;
  cover: StockPhoto | null;
  children: MenuChild[];
  featured: ProductSummary | null;
  promo: MenuPromo | null;
}

export function mergeMenu(nav: MenuRootNav[], media: MenuMediaMap | null): MenuRoot[] {
  return nav.map((r) => {
    const m = media?.[r.root];
    return {
      ...r,
      image: m?.image ?? null,
      cover: m?.cover ?? null,
      featured: m?.featured ?? null,
      promo: m?.promo ?? null,
      children: r.children.map((c) => ({ ...c, image: m?.childImages[c.path] ?? null })),
    };
  });
}
