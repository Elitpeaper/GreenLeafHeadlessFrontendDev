/**
 * Hover-recolor primitives (K-066, hover-recolor.md). Client-safe, framework-free.
 * The palette is resolved on the server (product.accent); the browser only copies values onto a zone element.
 * Timing/easing/intent delays are owned by hareket-tasarimcisi (CSS vars --recolor-duration / --recolor-ease
 * on [data-accent-zone], see tokens.css).
 */
import type { AccentVars, AccentVarName } from "./palette";

/** The ONLY vars a hover may change (hover-recolor.md §3). Keep in sync with scripts/tokens/build-tokens.mjs. */
export const RECOLOR_VARS = [
  "--accent-soft",
  "--accent-line",
  "--accent-decor",
  "--accent-decor-2",
  "--accent-decor-3",
  "--accent-text",
  "--stripe-1",
  "--stripe-2",
  "--stripe-3",
] as const satisfies readonly AccentVarName[];

export type RecolorVars = Pick<AccentVars, (typeof RECOLOR_VARS)[number]>;

/** Picks the recolorable subset (drops --accent, --on-accent… which must never change on hover). */
export function recolorSubset(vars: Partial<AccentVars> | null | undefined): Partial<RecolorVars> | null {
  if (!vars) return null;
  const out: Partial<RecolorVars> = {};
  for (const k of RECOLOR_VARS) if (vars[k]) out[k] = vars[k];
  return Object.keys(out).length ? out : null;
}

/** Attribute payload for a trigger element: <a {...accentTriggerProps(product.accent)}>. Paletteless -> {}. */
export function accentTriggerProps(vars: Partial<AccentVars> | null | undefined): { "data-accent"?: string } {
  const subset = recolorSubset(vars);
  return subset ? { "data-accent": JSON.stringify(subset) } : {};
}

export function readTriggerAccent(el: Element | null): Partial<RecolorVars> | null {
  const raw = el?.closest("[data-accent]")?.getAttribute("data-accent");
  if (!raw) return null;
  try {
    return recolorSubset(JSON.parse(raw) as Partial<AccentVars>);
  } catch {
    return null;
  }
}

/** Writes the vars on the zone element (inline style). Values outside RECOLOR_VARS are ignored. */
export function applyAccent(zone: HTMLElement, vars: Partial<RecolorVars>): void {
  for (const k of RECOLOR_VARS) {
    const v = vars[k];
    if (v) zone.style.setProperty(k, v);
    else zone.style.removeProperty(k);
  }
  zone.dataset.accentActive = "";
}

/** Returns the zone to its inherited (theme) values — the registered @property transition animates back. */
export function clearAccent(zone: HTMLElement): void {
  for (const k of RECOLOR_VARS) zone.style.removeProperty(k);
  delete zone.dataset.accentActive;
}

/**
 * Whether recolor may run (hover-recolor.md §5). "pointer": fine pointer with real hover only.
 * "focus": keyboard focus triggers on any device. Both: off under increased contrast and forced colors.
 * Reduced motion does NOT disable it (K-190 soft layer, K-231): a colour change is not movement; tokens.css
 * keeps the zone transition smooth via --recolor-duration-reduced (default 250ms).
 */
export function canRecolor(input: "pointer" | "focus" = "pointer", win: Window = window): boolean {
  const mq = (q: string) => win.matchMedia(q).matches;
  if (mq("(prefers-contrast: more)") || mq("(forced-colors: active)")) return false;
  return input === "focus" || mq("(hover: hover) and (pointer: fine)");
}
