/**
 * Licensed atmosphere photography (K-102, K-160): typed accessor for ui-tasarimci's manifest
 * data/content/stock-images.json — the ONLY module that reads it. Every file is logged with source + license in
 * docs/tasarim/gorsel-kaynaklari.md; an unregistered image never enters the site.
 *
 * Synchronous on purpose (static content, not catalog data). Prefer calling it from server components: blur
 * placeholders are inlined base64, so importing this into a client bundle ships the whole manifest.
 */
import manifest from "@data/content/stock-images.json";

export interface StockImage {
  src: string;
  /** Meaningful alt text; pass alt="" yourself where the image is decorative (e.g. mega menu). */
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

interface ManifestVariant {
  file: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

interface ManifestSlot extends ManifestVariant {
  alt: string;
  sourceId?: string;
  /** 4:5 mobile crop (hero slots only). */
  mobile?: ManifestVariant;
}

const slots = (manifest as unknown as { slots: Record<string, ManifestSlot> }).slots;

/**
 * Image for a slot key (e.g. "home.hero.1", "category.cilt-bakimi"). `mobile: true` returns the mobile crop or
 * null when the slot has none. Unknown slot -> null: callers fall back to the brand composition.
 */
export function getStockImage(key: string, opts: { mobile?: boolean } = {}): StockImage | null {
  const s = slots[key];
  if (!s) return null;
  const v: ManifestVariant | undefined = opts.mobile ? s.mobile : s;
  if (!v) return null;
  return { src: v.file, alt: s.alt, width: v.width, height: v.height, blurDataURL: v.blurDataURL };
}

/** All registered slot keys (catalogue pages, QA). */
export function getStockImageKeys(): string[] {
  return Object.keys(slots);
}
