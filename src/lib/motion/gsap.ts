/**
 * GSAP loaders (K-256). Client only, lazy chunks: never needed for first paint.
 *   const { gsap, ScrollTrigger } = await loadGsap();                 // Lenis ticker, pinned scenes
 *   const { gsap, ScrollTrigger, SplitText, DrawSVGPlugin } = await loadGsapFx(); // site-wide scenes (fx.ts)
 * Plugins are registered exactly once here. SplitText and DrawSVG ship free in gsap >= 3.13 (K-265 Penta stack).
 */
import type { gsap as GsapCore } from "gsap";
import type { ScrollTrigger as ScrollTriggerType } from "gsap/ScrollTrigger";
import type { SplitText as SplitTextType } from "gsap/SplitText";
import type { DrawSVGPlugin as DrawSVGType } from "gsap/DrawSVGPlugin";

export interface GsapKit {
  gsap: typeof GsapCore;
  ScrollTrigger: typeof ScrollTriggerType;
}
export interface GsapFxKit extends GsapKit {
  SplitText: typeof SplitTextType;
  DrawSVGPlugin: typeof DrawSVGType;
}

let kit: Promise<GsapKit> | null = null;
let fx: Promise<GsapFxKit> | null = null;

export function loadGsap(): Promise<GsapKit> {
  kit ??= Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([g, s]) => {
    g.gsap.registerPlugin(s.ScrollTrigger);
    return { gsap: g.gsap, ScrollTrigger: s.ScrollTrigger };
  }).catch((e: unknown) => {
    kit = null; // a failed chunk load is not cached: the next caller retries
    throw e;
  });
  return kit;
}

export function loadGsapFx(): Promise<GsapFxKit> {
  fx ??= Promise.all([loadGsap(), import("gsap/SplitText"), import("gsap/DrawSVGPlugin")]).then(([k, st, dr]) => {
    k.gsap.registerPlugin(st.SplitText, dr.DrawSVGPlugin);
    return { ...k, SplitText: st.SplitText, DrawSVGPlugin: dr.DrawSVGPlugin };
  }).catch((e: unknown) => {
    fx = null;
    throw e;
  });
  return fx;
}
