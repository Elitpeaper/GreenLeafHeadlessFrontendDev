/**
 * Motion vocabulary. Developers mark elements with data-motion="<id>" (point id from the design docs or a
 * primitive name) and data-motion-part="<part>"; MotionRuntime + motion.css do the rest.
 * Spec per id: docs/tasarim/hareket.md §5–§8. No imports (node:test loads this file directly).
 */

/** Reusable behaviours. Each one is implemented in motion.css (and, where noted, in the runtime). */
export const MOTION_PRIMITIVES = [
  // on view, once (runtime IntersectionObserver)
  "reveal",
  "item",
  "reveal-scale",
  "stagger",
  "fan",
  "words",
  "band",
  "draw",
  "glint",
  "float",
  "sway",
  "flow",
  "collage",
  "ticker",
  // on load / on display (pure CSS)
  "hero",
  // K-233 home hero 100vh: logo rolls in, title fades in
  "hero-intro",
  "band-first",
  "band-show",
  "fade-in",
  "step",
  "flash",
  "megamenu",
  "drawer",
  "drawer-left",
  "sheet",
  "slide-panel",
  "accordion",
  "skeleton",
  // scroll-linked (pure CSS, scroll-driven animations)
  "parallax",
  // K-234 maximalist layers: depth drift while the section crosses the viewport
  "drift",
  // hover / focus / state (pure CSS)
  "lift",
  "underline",
  "ring",
  "morph",
  "focus-ring",
  "leaf-glint",
  "glint-hover",
  "added",
  "progress",
  "card",
  "press",
  "shine",
  "zoom",
  "bar-in",
  "pop-live",
  "flash-on",
  // runtime-driven state feedback
  "bump",
  "tick",
  "pop",
  "tabs",
  "compact",
  "backtop",
  "marquee",
  "magnetic",
  "nudge-note",
] as const;

export type MotionPrimitive = (typeof MOTION_PRIMITIVES)[number];

/**
 * Design point ids -> primitive. "recolor" = handled by data-accent-zone (no data-motion needed),
 * "helper" = developer calls a function from @/lib/motion (railScroll / motionExit).
 */
export const MOTION_POINTS = {
  // Home (briefler/ana-sayfa.md)
  "M-1": "band-first",
  "M-2": "hero",
  "M-3": "float",
  "M-4": "parallax",
  "M-5": "band-show",
  "M-6": "sway",
  "M-7": "item",
  "M-8": "ring",
  "M-9": "item",
  "M-10": "helper",
  "M-11": "recolor",
  "M-12": "added",
  "M-13": "fan",
  "M-14": "item",
  "M-15": "words",
  "M-16": "draw",
  "M-17": "tabs",
  "M-18": "flow",
  "M-19": "ticker",
  "M-20": "reveal-scale",
  "M-21": "lift",
  "M-22": "parallax",
  "M-23": "marquee",
  // K-233 home hero entrance (replaces M-2 on the 100vh hero)
  "M-24": "hero-intro",
  // Header (bilesenler/header.md §8)
  H1: "band-first",
  H2: "morph",
  H3: "focus-ring",
  H4: "bump",
  H5: "bump",
  H6: "compact",
  H7: "underline",
  H8: "leaf-glint",
  H9: "recolor",
  H10: "helper",
  // Footer (bilesenler/footer.md §7)
  F1: "band",
  F2: "sway",
  F3: "underline",
  F4: "lift",
  F5: "accordion",
  F6: "backtop",
} as const satisfies Record<string, MotionPrimitive | "recolor" | "helper">;

export type MotionPointId = keyof typeof MOTION_POINTS;
export type MotionId = MotionPrimitive | MotionPointId | MotionAlias;

/** Named sub-elements a primitive animates (data-motion-part). */
export const MOTION_PARTS = [
  // hero (M-2)
  "media",
  "panel",
  "eyebrow",
  "title",
  "lead",
  "cta",
  "trust",
  "packshot",
  "leaf",
  // hero intro (M-24): wrapper around the unmodified logo
  "logo",
  // hero intro collage layers (H-4)
  "layer",
  // collage (K-234)
  "piece",
  // flow / ticker (M-18, M-19)
  "chip",
  "total",
  // tabs / menus
  "indicator",
  "tile",
  // header / buttons
  "main",
  "sub",
  "morph",
  "grid",
  "close",
  "swap",
  "label",
  "done",
  "icon",
  "chevron",
  // card / tiles
  "ring",
  "band",
  "bar",
  "fill",
  // marquee
  "track",
  "group",
  "marquee-toggle",
  // recolor
  "breathe",
] as const;

export type MotionPart = (typeof MOTION_PARTS)[number];

/** Names already used in page components, resolved to a primitive (kept so nobody has to rename). */
export const MOTION_ALIASES = {
  "fav-pop": "pop",
  "filter-sheet": "sheet",
  "premium-packshot": "float",
  "M-18-chip": "reveal-scale",
  "card-media": "card",
  "card-band": "card",
  popover: "fade-in",
  // v2: hook names left by frontend-gelistirici (devir 2026-11-16 kancalar) — wired so nobody has to rename
  "header-stripe": "band-show",
  "footer-stripe": "band",
  "mega-stripe": "band-show",
  "cta-member": "shine",
  "add-to-cart": "press",
  "count-pop": "pop-live",
  "search-field": "focus-ring",
  "search-panel": "fade-in",
  "search-sheet": "fade-in",
  announcement: "fade-in",
  "mega-panel": "megamenu",
  "mega-scrim": "fade-in",
  "mega-tiles": "fade-in",
  "mega-root-bar": "bar-in",
  "tile-zoom": "zoom",
  "mobile-nav": "drawer-left",
  "mobile-nav-level": "slide-panel",
  "cart-drawer": "drawer",
  "cart-line": "flash",
  "checkout-note": "flash-on",
} as const satisfies Record<string, MotionPrimitive>;

export type MotionAlias = keyof typeof MOTION_ALIASES;

const PRIMITIVE_SET: ReadonlySet<string> = new Set(MOTION_PRIMITIVES);

/** Resolves an id or primitive to its primitive (null for unknown, recolor and helper ids). */
export function primitiveOf(id: string): MotionPrimitive | null {
  if (PRIMITIVE_SET.has(id)) return id as MotionPrimitive;
  const p = (MOTION_POINTS as Record<string, string>)[id] ?? (MOTION_ALIASES as Record<string, string>)[id];
  return p && PRIMITIVE_SET.has(p) ? (p as MotionPrimitive) : null;
}

/** All primitives of a data-motion attribute value ("M-9 lift" -> ["stagger", "lift"]). */
export function primitivesOf(value: string | null | undefined): MotionPrimitive[] {
  if (!value) return [];
  const out: MotionPrimitive[] = [];
  for (const token of value.split(/\s+/)) {
    const p = primitiveOf(token);
    if (p && !out.includes(p)) out.push(p);
  }
  return out;
}

/** Spread helper with typo protection: <section {...motion("M-20")}>. */
export function motion(...ids: MotionId[]): { "data-motion": string } {
  return { "data-motion": ids.join(" ") };
}

/** Spread helper for parts: <img {...motionPart("media")}>. */
export function motionPart(part: MotionPart): { "data-motion-part": MotionPart } {
  return { "data-motion-part": part };
}
