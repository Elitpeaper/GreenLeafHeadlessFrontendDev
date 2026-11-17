/**
 * Atmosphere image slots (K-102: no AI images). Source of truth = ui-tasarimci's manifest
 * data/content/stock-images.json, read ONLY through the typed accessor `@/lib/images` (frontend-mimar review 1 #1).
 * A missing slot returns null and the section falls back to the brand composition.
 */
import { getStockImage, type StockImage } from "@/lib/images";

export type { StockImage };

export const ATMOSPHERE = {
  homeHero: getStockImage("home.hero.1"),
  homeHeroMobile: getStockImage("home.hero.1", { mobile: true }),
  homeHero2: getStockImage("home.hero.2"),
  homeHero3: getStockImage("home.hero.3"),
  homeStory: getStockImage("brand.story.1"),
  homeStory2: getStockImage("brand.story.2"),
  finderHero: getStockImage("skinFinder.hero"),
  finderDewy: getStockImage("skinFinder.texture.dewy"),
  membershipHero: getStockImage("membership.scene"),
  pvHero: getStockImage("pv.scene"),
  premium: getStockImage("premium.gold.1"),
} satisfies Record<string, StockImage | null>;
