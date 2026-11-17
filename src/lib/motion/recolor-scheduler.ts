/**
 * Pure decision logic of the hover recolor (K-066, hover-recolor.md §5, premium-tema §B4).
 * Keys are the raw data-accent JSON strings (null = brand theme). No DOM, no imports — unit tested.
 *
 * Rules
 *  - first card after neutral: wait `intent` (fly-over across the rail never colours the zone)
 *  - card -> card while coloured: wait `switch`, then go straight to the new palette (no reset in between)
 *  - leave zone / paletteless card: wait `release`, then return to the brand theme
 *  - the same target as the one already pending keeps its timer (pointerover fires for every child element)
 *  - returning to the active palette cancels a pending change
 *  - last entered card wins (only one pending change per zone)
 */
export interface RecolorTimingDelays {
  intent: number;
  switch: number;
  release: number;
}

export interface RecolorZoneState {
  /** palette key currently applied (null = brand theme) */
  active: string | null;
  /** palette key waiting on a timer; undefined = nothing pending */
  pending: string | null | undefined;
}

export type RecolorDecision =
  | { type: "keep" }
  | { type: "cancel" }
  | { type: "schedule"; target: string | null; delay: number };

export function decideRecolor(state: RecolorZoneState, target: string | null, t: RecolorTimingDelays): RecolorDecision {
  if (state.pending !== undefined && state.pending === target) return { type: "keep" };
  if (target === state.active) return state.pending === undefined ? { type: "keep" } : { type: "cancel" };
  if (target === null) return { type: "schedule", target, delay: t.release };
  return { type: "schedule", target, delay: state.active === null ? t.intent : t.switch };
}

/** Focus is deliberate: no intent delay, but leaving still uses the release grace period. */
export function decideRecolorFocus(state: RecolorZoneState, target: string | null, t: RecolorTimingDelays): RecolorDecision {
  const d = decideRecolor(state, target, t);
  return d.type === "schedule" && target !== null ? { ...d, delay: 0 } : d;
}
