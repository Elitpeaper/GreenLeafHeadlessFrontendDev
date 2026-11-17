/**
 * Storefront configuration (merchandising switches). Everything a non-developer may want to change at launch lives here,
 * so the data layer stays generic. When a backend arrives these values move to its CMS/collections API; only
 * src/lib/catalog/* reads this file.
 *
 * ALL TEXTS ARE PLACEHOLDERS until icerik-editoru delivers final copy.
 */
import type { ThemeKey } from "@/lib/theme/themes";

/**
 * Preview mode (Vercel preview / local, K-121): also lists products that are not publishReady yet. It never makes a
 * product sellable or priced, and price-implausible products stay hidden in every mode (M-1). Inlined at build time.
 * Also re-enables the /hareket-lab prototype route (next.config.ts).
 */
export const PREVIEW_ALL = process.env.NEXT_PUBLIC_PREVIEW_ALL === "1";

/** K-068: online checkout is not open. Flip only when a payment backend exists. */
export const CHECKOUT_ENABLED = false;

/** K-031: max quantity per cart line. */
export const CART_MAX_QTY = 10;

/** Default listing page size (K-029 "Daha fazla yükle" step). */
export const PAGE_SIZE = 24;

export type ThemeHintKey = "gold" | "premium";

export const themes: {
  /** themeHint values that switch a product/collection to a full theme (K-065, K-092). Remove a key to disable. */
  enabledFor: Partial<Record<ThemeHintKey, ThemeKey>>;
} = {
  enabledFor: { gold: "premium-gold", premium: "premium-gold" },
};

export interface CollectionDef {
  key: string;
  title: string;
  description: string | null;
  /** Full theme for the collection page (K-092); null = brand theme. */
  theme: ThemeKey | null;
  /**
   * Membership rule, evaluated by the data layer:
   *  - "availability": by availability value
   *  - "themeHint": products whose themeHint is in the list
   *  - "codes": hand-picked product codes, in order
   */
  rule:
    | { type: "availability"; value: "tr" | "yakinda" }
    | { type: "themeHint"; values: ThemeHintKey[] }
    | { type: "codes"; codes: string[] };
  /** Hidden collections are reachable by URL only if non-empty; listed ones also appear in navigation helpers. */
  listed: boolean;
}

/** BILGI-MIMARISI §4 + K-101 (premium-gold from themeHint gold). Empty collection => page 404 + hidden. */
export const collections: CollectionDef[] = [
  {
    key: "turkiyede-satista",
    title: "Türkiye'de satışta",
    description: "Şimdi sipariş verilebilecek ürünler.",
    theme: null,
    rule: { type: "availability", value: "tr" },
    listed: true,
  },
  {
    key: "turkiyeye-yakinda",
    title: "Türkiye'ye yakında",
    description: "Yakında Türkiye'de satışa çıkacak Greenleaf ürünleri.",
    theme: null,
    rule: { type: "availability", value: "yakinda" },
    listed: true,
  },
  {
    key: "premium-gold",
    title: "Gold koleksiyon",
    description: "Altın dokunuşlu premium seri.",
    theme: "premium-gold",
    rule: { type: "themeHint", values: ["gold"] },
    listed: true,
  },
  {
    key: "one-cikanlar",
    title: "Öne çıkanlar",
    description: null,
    theme: null,
    rule: { type: "codes", codes: [] }, // filled by the user/merchandiser
    listed: false,
  },
];

/** Global announcement strip (optional). null = hidden. */
export const announcement: { text: string; href: string | null } | null = {
  text: "Online alışveriş çok yakında. Üyelere özel fiyatlar için üye ol →",
  href: "/uye-ol",
};

/** Home page (K-094). Variants are switchable on preview with ?home=a|b (frontend-gelistirici wires the param). */
export const home = {
  variant: "a" as "a" | "b",
  /** Hero packshots: product codes (price-less, PV only — the single exception). */
  heroCodes: ["T003", "ASB044", "SBC053"] as string[],
  /** Vitrin 1 */
  primaryCollection: "turkiyede-satista",
  /** Vitrin 2 tabs: category roots; products already shown in Vitrin 1 are skipped (K-008, no repeats). */
  tabs: ["cilt-bakimi", "vucut-bakimi", "ev-ve-temizlik", "agiz-ve-dis-bakimi"] as string[],
  premiumCollection: "premium-gold",
};

/** Mega menu featured cards per root (codes). Empty -> automatic fallback chain in the data layer (K-091). */
export const megaFeatured: Record<string, string[]> = {};

/** Mega menu campaign slot (K-064). null = hidden. */
export const megaCampaign: { title: string; text: string; href: string; image: string | null } | null = null;

/** K-069/K-090: e-mail capture. While disabled the form must not render and no request is made. */
export const emailCapture = { enabled: false, provider: null as null | string, textVersion: "taslak-0" };

/** K-085/K-099: official marketing-plan data for /pv-nedir#is-firsati. null = section not rendered. */
export const businessPlan: null | { source: string; items: Array<{ title: string; text: string }> } = null;

/** Category roots that must never be featured (K-095 regulated sub-categories). */
export const regulatedCategories = ["saglik-ve-takviye/bant-ve-yamalar", "saglik-ve-takviye/diger-saglik-urunleri"];
