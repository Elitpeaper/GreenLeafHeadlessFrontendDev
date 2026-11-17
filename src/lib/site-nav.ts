/**
 * K-266 resolver for src/config/site-nav.ts. Server-only (reads the catalog for collections and ui-text for labels).
 * The result is plain JSON — pass it as a prop to client components (mobile drawer, Keşfet panel); never import
 * this file from a "use client" module.
 *
 *   const nav = await getSiteNav();            // SiteNavGroup[] in panel order
 *   nav[0].items[0] -> { label, href, soon, external, count?, children? }
 */
import { SITE_NAV_GROUPS, siteNavDefs, type SiteNavCount, type SiteNavGroupKey } from "@/config/site-nav";
import { getCollections } from "@/lib/products";
import { t } from "@/lib/ui-text";

export type { SiteNavGroupKey, SiteNavCount };

export interface SiteNavItem {
  /** Stable React key. */
  id: string;
  label: string;
  /** null only for an external link that is not supplied yet (render passive + "Çok yakında"). */
  href: string | null;
  /** Show the "Çok yakında" badge (K-181). Internal links still navigate (the page shows its coming-soon state). */
  soon: boolean;
  /** Open in a new tab with rel="noopener" and the ↗ icon. */
  external: boolean;
  count?: SiteNavCount;
  children?: Array<{ id: string; label: string; href: string }>;
}

export interface SiteNavGroup {
  key: SiteNavGroupKey;
  label: string;
  items: SiteNavItem[];
}

export async function getSiteNav(): Promise<SiteNavGroup[]> {
  const usedHrefs = new Set(siteNavDefs.flatMap((d) => (d.kind === "link" ? [d.href] : [])));
  const collections = (await getCollections()).filter((c) => !usedHrefs.has(c.href));
  const groups = new Map<SiteNavGroupKey, SiteNavItem[]>(SITE_NAV_GROUPS.map((g) => [g, []]));

  for (const d of siteNavDefs) {
    const items = groups.get(d.group)!;
    if (d.kind === "collections") {
      for (const c of collections) items.push({ id: c.href, label: c.title, href: c.href, soon: false, external: false });
    } else if (d.kind === "external") {
      items.push({ id: d.labelKey, label: t(d.labelKey), href: d.href, soon: d.href === null, external: true });
    } else {
      const soon = typeof d.soon === "function" ? d.soon() : (d.soon ?? false);
      items.push({
        id: d.href,
        label: t(d.labelKey),
        href: d.href,
        soon,
        external: false,
        ...(d.count ? { count: d.count } : {}),
        ...(d.children ? { children: d.children.map((c) => ({ id: c.href, label: t(c.labelKey), href: c.href })) } : {}),
      });
    }
  }
  return SITE_NAV_GROUPS.map((key) => ({ key, label: t(`siteNav.group.${key}`), items: groups.get(key)! }));
}
