/**
 * Motion tier = the ONE gate for every animation decision (K-264). Client only.
 * The tier lives on html[data-motion] (boot.ts): "on" (default), "reduced" (visitor chose "Hareketi azalt"), or absent
 * (?motion=off). Never read matchMedia("(prefers-reduced-motion)") in components: read the tier here.
 */
export type MotionTier = "on" | "reduced" | "off";

const KEY = "gl-motion";

export function motionTier(): MotionTier {
  if (typeof document === "undefined") return "on";
  const v = document.documentElement.dataset.motion;
  return v === "on" ? "on" : v === "reduced" ? "reduced" : "off";
}

export const motionFull = (): boolean => motionTier() === "on";

/** Calls `cb(tier)` whenever html[data-motion] changes. Returns the unsubscribe function. */
export function onMotionTier(cb: (tier: MotionTier) => void): () => void {
  const mo = new MutationObserver(() => cb(motionTier()));
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-motion"] });
  return () => mo.disconnect();
}

/** The visitor's saved choice ("Hareketi azalt" switch). A ?motion= preview override wins for the session. */
export function savedMotionChoice(): "on" | "reduced" {
  try {
    return localStorage.getItem(KEY) === "reduced" ? "reduced" : "on";
  } catch {
    return "on";
  }
}

/** Saves the visitor's choice and switches the tier live (CSS + runtime + Lenis + GSAP follow html[data-motion]). */
export function setMotionChoice(choice: "on" | "reduced"): void {
  try {
    localStorage.setItem(KEY, choice);
    sessionStorage.removeItem("gl-motion-preview"); // an explicit choice ends any preview override
  } catch {
    /* storage blocked: the switch still works for this page */
  }
  document.documentElement.setAttribute("data-motion", choice);
}
