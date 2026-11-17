/**
 * Small client helpers for motion that must be triggered from component code (H10, M-10, row removal).
 * Safe to import from client components; every function is a no-op on the server.
 */
import { anchorOffset, getLenis } from "./lenis";
import { DURATION, EASE, HERO_INTRO, TRANSITION } from "./tokens";

/** true when decorative motion may run (boot script set html[data-motion="on"]). */
export function motionAllowed(): boolean {
  return typeof document !== "undefined" && document.documentElement.dataset.motion === "on";
}

/** "smooth" when motion is allowed, otherwise "auto" — use for scrollBy/scrollIntoView/scrollTo. */
export function scrollBehavior(): ScrollBehavior {
  return motionAllowed() ? "smooth" : "auto";
}

/**
 * M-10 rail arrows: scrolls a scroll-snap rail by ~one visible page.
 *   <button onClick={() => railScroll(railRef.current, 1)}>
 */
export function railScroll(rail: HTMLElement | null, dir: 1 | -1): void {
  if (!rail) return;
  rail.scrollBy({ left: dir * Math.max(rail.clientWidth * 0.9, 1), behavior: scrollBehavior() });
}

export type ExitKind = "collapse" | "fade" | "slide-right";

const EXIT_FRAMES: Record<ExitKind, Keyframe[]> = {
  collapse: [{ opacity: 1, translate: "0 0" }, { opacity: 0, translate: "0 -8px" }],
  fade: [{ opacity: 1 }, { opacity: 0 }],
  "slide-right": [{ opacity: 1, translate: "0 0" }, { opacity: 0, translate: "24px 0" }],
};

/**
 * Plays a short exit (transform/opacity only) and resolves when done. Gentle (reduced) tier: opacity-only fade
 * (K-231: nothing disappears instantly); motion off / no animate(): resolves immediately.
 * Remove the element from state AFTER the promise — the height change then happens in one step right after
 * user input, which is excluded from CLS.
 *   await motionExit(barRef.current, "collapse"); setDismissed(true);   // H10
 */
export function motionExit(el: Element | null, kind: ExitKind = "collapse"): Promise<void> {
  if (!el || typeof (el as HTMLElement).animate !== "function") return Promise.resolve();
  const gentle = typeof document !== "undefined" && document.documentElement.dataset.motion === "reduced";
  if (!motionAllowed() && !gentle) return Promise.resolve();
  const anim = (el as HTMLElement).animate(gentle ? EXIT_FRAMES.fade : EXIT_FRAMES[kind], {
    duration: gentle ? TRANSITION.duration : DURATION.sm,
    easing: gentle ? TRANSITION.paintEase : EASE.in,
    fill: "forwards",
  });
  return anim.finished.then(
    () => undefined,
    () => undefined,
  );
}

/**
 * Smooth scroll to a y position or an element (K-183): Lenis glide on desktop, native smooth on touch, instant when
 * motion is off. Element targets respect scroll-margin-top / the sticky header.
 *   motionScrollTo(document.getElementById("sss"));   motionScrollTo(0);
 */
export function motionScrollTo(target: number | Element | null, onDone?: () => void): void {
  if (target == null || typeof window === "undefined") return;
  const y = typeof target === "number" ? target : target.getBoundingClientRect().top + window.scrollY - anchorOffset(target);
  const lenis = getLenis();
  if (lenis && !lenis.isStopped) lenis.scrollTo(y, { onComplete: () => onDone?.() });
  else {
    window.scrollTo({ top: y, behavior: scrollBehavior() });
    onDone?.();
  }
}

/**
 * K-238: resolves when the K-233 hero entrance has finished (all CSS animations inside the hero-intro host), or at
 * once when it does not play (client-side return to /, motion off, no animations). Safety cap: HERO_INTRO.total + 300 ms.
 * Hero swiper: start the autoplay clock only after this, then keep slide 1 for its full interval (≥ 7 s).
 *   useEffect(() => { let live = true; whenHeroIntroDone(rootRef.current).then(() => live && startAutoplay()); return () => { live = false; }; }, []);
 */
export function whenHeroIntroDone(scope?: Element | null): Promise<void> {
  if (typeof document === "undefined") return Promise.resolve();
  const host = (scope?.closest?.('[data-motion~="hero-intro"],[data-motion~="M-24"]') ??
    scope?.querySelector?.('[data-motion~="hero-intro"],[data-motion~="M-24"]') ??
    document.querySelector('[data-motion~="hero-intro"],[data-motion~="M-24"]')) as HTMLElement | null;
  if (!host || !document.documentElement.hasAttribute("data-intro")) return Promise.resolve();
  const anims = host.getAnimations?.({ subtree: true }) ?? [];
  if (anims.length === 0) return Promise.resolve();
  const cap = new Promise<void>((r) => window.setTimeout(r, HERO_INTRO.total + 300));
  const all = Promise.all(anims.map((a) => a.finished.catch(() => undefined))).then(() => undefined);
  return Promise.race([all, cap]);
}
