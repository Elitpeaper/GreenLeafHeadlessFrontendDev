/**
 * Server-side assembly of the mega menu / mobile drawer model (mega-menu wireframe A1–A4, K-064, K-077, K-091, K-095).
 * Serializable output -> passed as props to the client MegaMenu / MobileNav. Never import from a client module.
 */
import { megaCampaign, megaFeatured, regulatedCategories } from "@/config/storefront";
import { getCollection, getProducts, getProductsByCodes } from "@/lib/products";
import type { CatalogImage, CategoryNode, ProductSummary } from "@/lib/products";
import { categoryPhoto, stockPhoto, type StockPhoto } from "@/components/listing/stock";

export interface MenuChild {
  path: string;
  title: string;
  href: string;
  count: number;
  trCount: number;
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

export interface MenuRoot {
  root: string;
  title: string;
  href: string;
  count: number;
  trCount: number;
  image: CatalogImage | null;
  /** K-161 category atmosphere photo (mobile level-2 cover). */
  cover: StockPhoto | null;
  children: MenuChild[];
  featured: ProductSummary | null;
  promo: MenuPromo | null;
}

const isRegulated = (p: ProductSummary) => p.regulated;

const toImage = (src: string): CatalogImage => ({ src, width: null, height: null, remote: /^https?:\/\//.test(src), alt: "" });

/**
 * Category image (veri-muhendisi: categories.json `image`, official packshot) or, as fallback, the first product
 * image under the node, TR products first. Official packshots only (K-077, K-102).
 */
async function nodeImage(path: string, image?: string | null): Promise<CatalogImage | null> {
  if (image) return toImage(image);
  const { items } = await getProducts({ category: path, pageSize: 8 });
  return items.find((p) => p.image && !p.regulated)?.image ?? items.find((p) => p.image)?.image ?? null;
}

/** K-091 fallback chain: megaFeatured -> first TR (non-regulated) -> first listed yakında -> none. */
async function featuredFor(root: string): Promise<ProductSummary | null> {
  const codes = megaFeatured[root];
  if (codes?.length) {
    const picked = (await getProductsByCodes(codes)).find((p) => !isRegulated(p));
    if (picked) return picked;
  }
  const tr = await getProducts({ category: root, availability: "tr", pageSize: 12 });
  const withPalette = tr.items.find((p) => !isRegulated(p) && p.image && p.accent);
  const firstTr = withPalette ?? tr.items.find((p) => !isRegulated(p) && p.image);
  if (firstTr) return firstTr;
  const any = await getProducts({ category: root, pageSize: 12 });
  return any.items.find((p) => !isRegulated(p) && p.image && !p.nameIsFallback) ?? any.items.find((p) => !isRegulated(p) && p.image) ?? null;
}

async function promoFor(node: CategoryNode, premiumHref: string | null): Promise<MenuPromo | null> {
  if (megaCampaign) {
    return { kind: "campaign", href: megaCampaign.href, title: megaCampaign.title, text: megaCampaign.text, image: null };
  }
  if (node.root === "cilt-bakimi" || node.root === "makyaj") return { kind: "finder", href: "/cilt-tipine-gore", photo: stockPhoto("promo.mega") };
  if (node.root === "setler" && premiumHref) return { kind: "sets", href: premiumHref, theme: "premium-gold", photo: stockPhoto("premium.gold.2") };
  if (node.trCount > 0) return { kind: "inStock", href: `${node.href}?stok=tr`, photo: stockPhoto("promo.mega") };
  return { kind: "pv", href: "/pv-nedir", photo: stockPhoto("promo.mega") };
}

export async function getMenuModel(tree: CategoryNode[]): Promise<MenuRoot[]> {
  const premium = await getCollection("premium-gold", { limit: 1 });
  return Promise.all(
    tree.map(async (node) => {
      const children = [...node.children]
        .filter((c) => !regulatedCategories.includes(c.path) || c.count > 0)
        .sort((a, b) => a.order - b.order);
      const [image, featured, promo, childImages] = await Promise.all([
        nodeImage(node.path, node.image),
        featuredFor(node.root),
        promoFor(node, premium?.href ?? null),
        Promise.all(children.map((c) => nodeImage(c.path, c.image))),
      ]);
      return {
        root: node.root,
        title: node.title,
        href: node.href,
        count: node.count,
        trCount: node.trCount,
        image,
        cover: categoryPhoto(node.root),
        featured,
        promo,
        children: children.map((c, i) => ({
          path: c.path,
          title: c.title,
          href: c.href,
          count: c.count,
          trCount: c.trCount,
          image: childImages[i] ?? null,
        })),
      };
    }),
  );
}
