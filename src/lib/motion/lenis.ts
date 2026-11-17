/**
 * Smooth scroll (K-183, K-256): Lenis driven by gsap.ticker and synced with ScrollTrigger. Client only, started by the
 * MotionRuntime. Lenis + GSAP are lazy chunks (never on the critical path).
 *
 * Active when html[data-motion="on"] (the default since K-264, whatever the OS setting) AND a fine hover pointer
 * (mouse/trackpad), at every viewport width. Touch, the visitor's "Hareketi azalt" choice and ?motion=off keep native scrolling. Re-evaluated live when either condition changes.
 * Lenis is stopped while the page is locked: html/body overflow hidden (cart drawer, mobile nav), an open modal
 * <dialog>, or the open mega menu. Inner scroll boxes stay native (allowNestedScroll + [data-scroll-native]).
 * Same-page anchor links glide, then move focus like native navigation. Spec: docs/tasarim/hareket.md §26.
 */
import type Lenis from "lenis";
import { loadGsap } from "./gsap";

const NATIVE = "[data-scroll-native],dialog,[role='dialog'],[role='listbox'],select,textarea";

/** Seconds per wheel glide (K-265: Nakkaş 1.7; 1.5 keeps the weight but answers a little faster). */
export const LENIS_DURATION = 1.5;

let lenis: Lenis | null = null;
/** The page's Lenis instance (null on touch / reduced / off, or before the lazy chunk arrived). */
export function getLenis(): Lenis | null {
  return lenis;
}

/** scroll-margin-top of the target, else the sticky header height + 16 px. */
export function anchorOffset(el: Element): number {
  const sm = parseFloat(getComputedStyle(el).scrollMarginTop) || 0;
  if (sm > 0) return sm;
  const sticky = document.querySelector<HTMLElement>("#header-accent");
  const h = sticky && getComputedStyle(sticky).position === "sticky" ? sticky.getBoundingClientRect().height : 0;
  return h + 16;
}

function locked(): boolean {
  const d = document;
  const over = (el: Element) => /hidden|clip/.test(getComputedStyle(el).overflowY);
  if (over(d.documentElement) || over(d.body)) return true;
  if (d.querySelector('#header-accent [data-state="open"]')) return true; // mega menu
  try {
    return !!d.querySelector("dialog:modal");
  } catch {
    return !!d.querySelector("dialog[open]");
  }
}

export function startSmoothScroll(): () => void {
  const root = document.documentElement;
  const fine = matchMedia("(hover: hover) and (pointer: fine)");
  let alive = true;
  let creating = false;
  let teardown: (() => void) | null = null;

  const lockSync = () => {
    if (!lenis) return;
    if (locked()) lenis.stop();
    else lenis.start();
  };

  const onClick = (e: MouseEvent) => {
    if (!lenis || e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    if (locked()) return; // Lenis is stopped (drawer/dialog/mega menu): leave the anchor to the browser
    const a = (e.target as Element | null)?.closest?.<HTMLAnchorElement>("a[href*='#']");
    if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || url.search !== location.search || url.hash.length < 2) return;
    const el = document.getElementById(decodeURIComponent(url.hash.slice(1)));
    if (!el) return;
    e.preventDefault();
    if (location.hash !== url.hash) history.pushState(history.state, "", url.hash);
    lenis.scrollTo(el.getBoundingClientRect().top + scrollY - anchorOffset(el), {
      onComplete: () => {
        if (!el.matches("a[href],button,input,select,textarea,[tabindex]")) {
          el.setAttribute("tabindex", "-1");
          el.addEventListener("blur", () => el.removeAttribute("tabindex"), { once: true });
        }
        el.focus({ preventScroll: true });
      },
    });
  };

  const create = async () => {
    creating = true;
    let mods: [typeof import("lenis"), Awaited<ReturnType<typeof loadGsap>>];
    try {
      mods = await Promise.all([import("lenis"), loadGsap()]);
    } catch {
      return; // chunk failed (offline, deploy swap): stay on native scrolling; the next sync() retries
    } finally {
      creating = false;
    }
    const [{ default: LenisCtor }, { gsap, ScrollTrigger }] = mods;
    if (!alive || lenis || !wanted()) return;
    // Penta / Nakkaş feel (K-265): duration-based glide (Nakkaş uses duration 1.7) with Lenis' default expo-out easing.
    const l = new LenisCtor({
      duration: LENIS_DURATION,
      allowNestedScroll: true,
      respectReducedMotion: false, // K-264: the site tier (html[data-motion]) decides, not the OS setting
      stopInertiaOnNavigate: true,
      prevent: (node) => node.matches(NATIVE),
    });
    const tick = (t: number) => l.raf(t * 1000);
    l.on("scroll", ScrollTrigger.update);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);
    document.addEventListener("click", onClick);
    lenis = l;
    lockSync();
    teardown = () => {
      gsap.ticker.remove(tick);
      gsap.ticker.lagSmoothing(500, 33); // GSAP default again: other tweens keep lag smoothing once Lenis is gone
      document.removeEventListener("click", onClick);
      l.destroy();
      if (lenis === l) lenis = null;
      teardown = null;
    };
  };

  const wanted = () => alive && root.dataset.motion === "on" && fine.matches;
  const sync = () => {
    if (wanted()) {
      if (!lenis && !creating) void create();
      else lockSync();
    } else teardown?.();
  };

  // html/body style (drawer, mobile nav), data-motion tier; dialogs and the mega menu (open / data-state)
  const moRoot = new MutationObserver(sync);
  moRoot.observe(root, { attributes: true, attributeFilter: ["style", "data-motion"] }); // not "class": Lenis toggles its own classes there
  moRoot.observe(document.body, { attributes: true, attributeFilter: ["style", "class"] });
  const moUi = new MutationObserver(lockSync);
  moUi.observe(document.body, { attributes: true, subtree: true, attributeFilter: ["open", "data-state"] });
  fine.addEventListener("change", sync);
  sync();

  return () => {
    alive = false;
    moRoot.disconnect();
    moUi.disconnect();
    fine.removeEventListener("change", sync);
    teardown?.();
  };
}
