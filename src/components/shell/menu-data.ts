/**
 * Server-side assembly of the mega menu / mobile drawer model (mega-menu wireframe A1–A4, K-064, K-077, K-091, K-095).
 * K-288/P-08: two halves. getMenuNav() = text only, passed as props with every page (StoreChrome);
 * getMenuMedia() = images / featured / promo, served by the static route /api/menu and fetched on menu intent.
 * Never import from a client module.
 */
import { megaCampaign, megaFeatured, regulatedCategories } from "@/config/storefront";
import { getCollection, getProducts, getProductsByCodes } from "@/lib/products";
import type { CatalogImage, CategoryNode, ProductSummary } from "@/lib/products";
import type { MenuMediaMap, MenuPromo, MenuRootNav } from "./menu-model";
import { categoryPhoto, stockPhoto } from "@/components/listing/stock";

export type { MenuChild, MenuChildNav, MenuMedia, MenuMediaMap, MenuPromo, MenuPromoKind, MenuRoot, MenuRootNav } from "./menu-model";

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

const visibleChildren = (node: CategoryNode) =>
  [...node.children].filter((c) => !regulatedCategories.includes(c.path) || c.count > 0).sort((a, b) => a.order - b.order);

/** Text-only menu model (every page). No product queries. */
export function getMenuNav(tree: CategoryNode[]): MenuRootNav[] {
  return tree.map((node) => ({
    root: node.root,
    title: node.title,
    href: node.href,
    count: node.count,
    trCount: node.trCount,
    children: visibleChildren(node).map((c) => ({ path: c.path, title: c.title, href: c.href, count: c.count, trCount: c.trCount })),
  }));
}

/** Menu media keyed by root (GET /api/menu). */
export async function getMenuMedia(tree: CategoryNode[]): Promise<MenuMediaMap> {
  const premium = await getCollection("premium-gold", { limit: 1 });
  const entries = await Promise.all(
    tree.map(async (node) => {
      const children = visibleChildren(node);
      const [image, featured, promo, childImages] = await Promise.all([
        nodeImage(node.path, node.image),
        featuredFor(node.root),
        promoFor(node, premium?.href ?? null),
        Promise.all(children.map((c) => nodeImage(c.path, c.image))),
      ]);
      return [
        node.root,
        {
          image,
          cover: categoryPhoto(node.root),
          featured,
          promo,
          childImages: Object.fromEntries(children.map((c, i) => [c.path, childImages[i] ?? null])),
        },
      ] as const;
    }),
  );
  return Object.fromEntries(entries);
}
