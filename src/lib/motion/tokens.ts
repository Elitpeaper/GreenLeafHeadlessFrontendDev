/**
 * Motion tokens (hareket-tasarimcisi, docs/tasarim/hareket.md §2). Single source for JS timing.
 * CSS mirror: src/components/motion/motion.css `:root { --motion-* }` — kept in sync by motion-css.test.ts.
 * No imports: this file is loaded by node:test directly.
 */

/** Duration scale in ms. One step per intent; never invent in-between values. */
export const DURATION = {
  /** press feedback, tiny fades, icon swaps */
  xs: 120,
  /** hover, focus, small state changes */
  sm: 200,
  /** panels, drawer, menus, indicators */
  md: 320,
  /** section reveals, card entrances */
  lg: 500,
  /** stripe draw, PV ticker, hero pieces */
  xl: 800,
} as const;

/** Hard ceilings from the plan (K-097, KK-2-03, KK-0-15a). */
export const LIMITS = {
  /** hero entrance must be complete by this time (KK-2-03) */
  heroTotal: 1200,
  /** any ambient (non-user-initiated) loop stops by itself within this time (WCAG 2.2.2) */
  ambientMax: 5000,
  /** PV ticker (pv-explainer, faz2-plan §5) */
  ticker: 800,
  /** result cross-fade in the skin finder */
  crossFade: 200,
  /** max simultaneous continuous decorative motions on screen (K-097) */
  continuousOnScreen: 2,
} as const;

/** Easing curves. CSS names: --motion-ease-<key>. */
export const EASE = {
  /** default for entrances and reveals */
  out: "cubic-bezier(0.22, 1, 0.36, 1)",
  /** long draws (stripes, strokes), hero image settle */
  outExpo: "cubic-bezier(0.16, 1, 0.3, 1)",
  /** ambient, flows, recolor return */
  inOut: "cubic-bezier(0.65, 0, 0.35, 1)",
  /** exits (drawer close, row removal) */
  in: "cubic-bezier(0.55, 0, 1, 0.45)",
  /** state changes, recolor enter */
  standard: "cubic-bezier(0.2, 0, 0, 1)",
  /** single small overshoot: counters, hearts, check marks */
  spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
} as const;

/**
 * K-231 baseline transition: every element that changes on hover/focus/state gets it (motion.css @layer base),
 * entering AND leaving, in every tier. Paint properties (colour, background, border, shadow, opacity, filter)
 * run linear (the user's own example; colour/opacity cross-fades read evenly and enter = leave mirror each other).
 * Movement (translate/scale/rotate/transform) uses EASE.out: a linear move starts and stops abruptly, which is
 * exactly the "snap" K-231 forbids. Movement is dropped entirely in the gentle (reduced) tier.
 */
export const TRANSITION = { duration: 250, paintEase: "linear", moveEase: EASE.out } as const;

/**
 * K-233 home hero entrance (hareket.md §23). Pure CSS, plays on mount of a FULL page load (html[data-intro]);
 * values mirrored in motion.css. Budget (ui-tasarimci K-242): logo ≤ 900 ms, title 600 ms, total ≤ 1.6 s.
 * Logo rolls in from the left (1.5 turns, rolling without slipping), title fades 0 -> 1 as it lands, lead/cta follow.
 */
export const HERO_INTRO = {
  logo: { duration: 900, delay: 0, turns: 1.5 },
  media: { duration: 1100, delay: 0 },
  title: { duration: 600, delay: 400 },
  lead: { duration: 500, delay: 560 },
  cta: { duration: 500, delay: 680 },
  /** H-4 collage layers: 300 ms + min(i, 4) x 90 ms, 800 ms -> last ends at 1460 ms */
  layer: { duration: 800, delay: 300, step: 90, maxIndex: 4 },
  /** latest end of any part (layers); swiper autoplay may start after this (K-238) */
  total: 1460,
  /** gentle (reduced) tier: opacity only */
  reduced: { duration: 320, titleDelay: 120 },
} as const;

/** Stagger: per-item step and the index after which items share the last delay. */
export const STAGGER = { step: 60, maxIndex: 8, word: 35, tile: 40 } as const;

/** Distances (px) — small on purpose; premium = short travel, soft landing. */
export const DISTANCE = { rise: 24, riseSmall: 8, lift: 4, float: 8, parallax: 24, magnetic: 6 } as const;

/**
 * Hover recolor (K-066, K-075, premium-tema §B4). Delays are JS (scheduler), durations go to
 * --recolor-duration / --recolor-ease on the zone at the moment of change.
 */
export const RECOLOR = {
  /** pointer must rest this long on the first card before the zone changes (no flicker on fly-over) */
  intent: 120,
  /** zone already coloured: shorter wait when moving card -> card (direct switch, no reset) */
  switch: 60,
  /** grace period after leaving the zone / landing on a paletteless card */
  release: 200,
  /** timing per zone kind (data-accent-zone value). "" = generic. */
  zones: {
    "": { in: 420, out: 560 },
    /** Z1 mega menu + linked Z2 header: quick UI surface */
    menu: { in: 320, out: 420 },
    header: { in: 320, out: 420 },
    /** Z3 home showcases: large tint, slower = calmer */
    showcase: { in: 480, out: 640 },
    /** K-093 preview variants */
    hero: { in: 480, out: 640 },
    scene: { in: 480, out: 640 },
  },
  easeIn: EASE.standard,
  easeOut: EASE.inOut,
} as const;

export type RecolorZoneKind = keyof typeof RECOLOR.zones;

/** IntersectionObserver settings for "on view" motion: fires when the top edge passes 88 % of the viewport. */
export const VIEW = { rootMargin: "0px 0px -12% 0px", threshold: 0 } as const;

/** Header compact switch with hysteresis (H6) and back-to-top threshold (F6). */
export const SCROLL = { compactOn: 96, compactOff: 32, backTopViewports: 1 } as const;

/** Window after a real user input in which counters/hearts may "pop" (hydration and cross-tab sync never pop). */
export const INPUT_WINDOW = 2000;

/** Performance budget the motion layer must stay within (K-034, K-097). */
export const BUDGET = {
  /** gz bytes of motion JS shipped on first load (runtime + components) */
  runtimeJsGz: 10 * 1024,
  /** gz bytes of motion CSS */
  cssGz: 9.5 * 1024, // v5 (K-264/K-265/K-272: pill, tilt glare, pin stage, link draw; hpin + S-1 removed): measured 8.88 KB gz minified (v4: 8.12)
  /** frame budget during recolor/ticker on a mid-range laptop (ms, p95) */
  frameP95: 16.7,
} as const;
