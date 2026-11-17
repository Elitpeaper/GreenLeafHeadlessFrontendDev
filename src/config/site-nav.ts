/**
 * K-266 "all pages" menu — the SINGLE source for the Keşfet panel, the mobile drawer (Keşfet groups) and the footer.
 * Spec: docs/tasarim/bilesenler/header-arama-kategori.md §4. A new page is added here once and shows up everywhere.
 *
 * Rules (K-181/K-182):
 *  - Internal `href` must point to a real route (enforced by src/lib/site-nav.test.ts).
 *  - A page that exists but has no final content yet gets `soon: true` -> "Çok yakında" badge, link still works.
 *  - External links with no real URL yet (`href: null`) render as a passive row + "Çok yakında", never as a link.
 *  - Not listed on purpose: /arama, /urun/*, 404/500, /yakinda, /svg-kutuphanesi, /hareket-lab* (§4 "kapsam dışı").
 *
 * Do not read this array directly in UI — use `getSiteNav()` from src/lib/site-nav.ts (adds listed collections,
 * resolves dynamic `soon` flags and external URLs).
 */
// Relative .ts imports keep this file loadable by node:test (src/lib/site-nav.test.ts).
import { businessPlan } from "./storefront.ts";
import { site } from "./site.ts";

export const SITE_NAV_GROUPS = ["alisveris", "rehber", "greenleaf", "yardim"] as const;
export type SiteNavGroupKey = (typeof SITE_NAV_GROUPS)[number];

/** Client-side counters a row may show (favourites live in localStorage, so the count is rendered on the client). */
export type SiteNavCount = "favorites";

/** Marker entry: expanded by getSiteNav() into the non-empty listed collections not already present. */
export interface SiteNavCollectionsSlot {
  kind: "collections";
  group: SiteNavGroupKey;
}

export interface SiteNavLinkDef {
  kind: "link";
  group: SiteNavGroupKey;
  /** ui-text key (siteNav.*), resolved with t()/useT(). */
  labelKey: `siteNav.${string}`;
  /** Internal path ("/sss", "/hakkimizda#iletisim"). */
  href: string;
  /** true or a predicate evaluated on the server at render time. */
  soon?: boolean | (() => boolean);
  count?: SiteNavCount;
  /** Children rendered as a chip row under the parent (skin types). */
  children?: ReadonlyArray<{ labelKey: `siteNav.${string}`; href: string }>;
}

export interface SiteNavExternalDef {
  kind: "external";
  group: SiteNavGroupKey;
  labelKey: `siteNav.${string}`;
  /** null = not supplied yet -> passive "Çok yakında" row. Opens in a new tab with the ↗ icon. */
  href: string | null;
}

export type SiteNavDef = SiteNavLinkDef | SiteNavExternalDef | SiteNavCollectionsSlot;

const SKIN_CHIPS = (["kuru", "yagli", "karma", "normal", "hassas"] as const).map((s) => ({
  labelKey: `siteNav.skin.${s}` as const,
  href: `/cilt-tipine-gore/${s}`,
}));

export const siteNavDefs: readonly SiteNavDef[] = [
  // Alışveriş
  { kind: "link", group: "alisveris", labelKey: "siteNav.products", href: "/urunler" },
  { kind: "link", group: "alisveris", labelKey: "siteNav.inStock", href: "/koleksiyon/turkiyede-satista" },
  { kind: "link", group: "alisveris", labelKey: "siteNav.premium", href: "/koleksiyon/premium-gold" },
  { kind: "collections", group: "alisveris" },
  { kind: "link", group: "alisveris", labelKey: "siteNav.sets", href: "/kategori/setler" },
  { kind: "link", group: "alisveris", labelKey: "siteNav.favorites", href: "/favoriler", count: "favorites" },
  // Rehber
  { kind: "link", group: "rehber", labelKey: "siteNav.finder", href: "/cilt-tipine-gore", children: SKIN_CHIPS },
  { kind: "link", group: "rehber", labelKey: "siteNav.pv", href: "/pv-nedir" },
  // K-099: the section renders only with official plan data; until then the row is "Çok yakında" (page still exists).
  { kind: "link", group: "rehber", labelKey: "siteNav.business", href: "/pv-nedir#is-firsati", soon: () => businessPlan === null },
  { kind: "link", group: "rehber", labelKey: "siteNav.blog", href: "/blog" },
  { kind: "link", group: "rehber", labelKey: "siteNav.news", href: "/haberler" },
  // Greenleaf
  { kind: "link", group: "greenleaf", labelKey: "siteNav.about", href: "/hakkimizda" },
  // Contact rows are hidden on the page while site.ts holds placeholders (K-208).
  { kind: "link", group: "greenleaf", labelKey: "siteNav.contact", href: "/hakkimizda#iletisim", soon: () => /alanadi\.|example\./i.test(site.email) },
  // PDFs not delivered yet (K-058, K-208). Flip to false when CERTIFICATES in /sertifikalar get their pdf paths.
  { kind: "link", group: "greenleaf", labelKey: "siteNav.certificates", href: "/sertifikalar", soon: true },
  { kind: "link", group: "greenleaf", labelKey: "siteNav.membership", href: "/uye-ol" },
  { kind: "external", group: "greenleaf", labelKey: "siteNav.memberLogin", href: site.memberLoginUrl },
  // Yardım ve yasal — legal texts pending expert review (K-019, K-181).
  { kind: "link", group: "yardim", labelKey: "siteNav.faq", href: "/sss" },
  { kind: "link", group: "yardim", labelKey: "siteNav.kvkk", href: "/yasal/kvkk-aydinlatma-metni", soon: true },
  { kind: "link", group: "yardim", labelKey: "siteNav.cookies", href: "/yasal/cerez-politikasi", soon: true },
  { kind: "link", group: "yardim", labelKey: "siteNav.terms", href: "/yasal/kullanim-kosullari", soon: true },
  { kind: "link", group: "yardim", labelKey: "siteNav.emailConsent", href: "/yasal/e-posta-acik-riza", soon: true },
];
