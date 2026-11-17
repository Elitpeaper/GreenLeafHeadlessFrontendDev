/**
 * Site-wide GSAP scenes, Penta style (K-265, K-264, K-271, K-272; hareket.md §27). Client only, started by the runtime in
 * the full tier (html[data-motion="on"]) and reverted when the visitor picks "Hareketi azalt".
 *
 *  1. SplitText headings   main h2 (and [data-split]) below the fold: lines rise from a mask, y 90 -> 0, stagger .12
 *  2. smart header         the sticky header root hides on scroll down, returns on scroll up (not while a menu/drawer/
 *                          focus is open). Structure-independent: target = [data-smart-header] (fallback #header-accent),
 *                          state = html[data-header-hidden] — the header markup can change freely.
 *  3. scroll-top ring      [data-scroll-ring-bar] stroke follows the page progress (DrawSVG, scrub)
 *  4. header band parallax [data-listing-hero] / [data-page-hero] photo scales 1 -> 1.1, scene drifts (scrub)
 *  5. scroll SVG           [data-scroll-svg] draw (DrawSVG scrub) / parallax (y scrub + cursor lean)
 *  6. card tilt + glare    [data-product-card] image tile, VanillaTilt values: max 7.5°, 1000 ms, perspective 1000
 *  7. magnetic CTAs        [data-magnetic] + large pill CTAs follow the cursor (max 10 px), elastic return
 * Everything hidden by a scene is hidden by this file only after GSAP has loaded, and only below the fold (LCP/CLS 0).
 */
import type { gsap } from "gsap";
import { loadGsapFx, type GsapFxKit } from "./gsap";

type Cleanup = () => void;

const SPLIT_SKIP =
  "[data-no-split],[data-motion],[data-pin-stage],[data-stage-list],nav,dialog,[role='dialog'],aside,[hidden],[role='tabpanel'],[data-product-card],form";
const MAGNET =
  "[data-magnetic], a[class*='rounded-pill'][class*='min-h-control-lg'], button[class*='rounded-pill'][class*='min-h-control-lg'], [data-motion~='cta-member']";
const fine = () => matchMedia("(hover: hover) and (pointer: fine)").matches;

export interface FxController {
  /** New DOM (client navigation, conditional UI): wire headings, bands, SVGs inside it. */
  scan(node: ParentNode): void;
  stop(): void;
}

export function startFx(): FxController {
  const doc = document;
  const root = doc.documentElement;
  const cleanups: Cleanup[] = [];
  let kit: GsapFxKit | null = null;
  let ctx: gsap.Context | null = null; // every tween / trigger made here, reverted at once on stop
  let refreshTimer = 0;
  const refresh = () => {
    window.clearTimeout(refreshTimer);
    refreshTimer = window.setTimeout(() => kit?.ScrollTrigger.refresh(), 120);
  };
  let stopped = false;
  const waiting = new Set<HTMLElement>();
  const wired = new WeakSet<Element>();

  // ------------------------------------------------------------ 1. headings: pre-mark (sync) so nothing flashes
  const main = () => doc.getElementById("icerik") ?? doc.querySelector("main");
  const markHeadings = (node: ParentNode) => {
    const m = main();
    if (!m) return;
    node.querySelectorAll<HTMLElement>("h2, [data-split]").forEach((h) => {
      if (wired.has(h) || !m.contains(h) || !h.textContent?.trim()) return;
      const skip = h.closest(SPLIT_SKIP);
      if (skip && m.contains(skip)) return; // html[data-motion] itself is not a reason to skip
      if (h.getBoundingClientRect().top < innerHeight) return; // above the fold: never hidden (LCP)
      wired.add(h);
      h.setAttribute("data-split-wait", "");
      waiting.add(h);
    });
  };
  const releaseAll = () => {
    waiting.forEach((h) => h.removeAttribute("data-split-wait"));
    waiting.clear();
  };

  function wireHeading(h: HTMLElement) {
    const { gsap, ScrollTrigger, SplitText } = kit!;
    ScrollTrigger.create({
      trigger: h,
      start: "top 88%",
      once: true,
      onEnter: () => {
        waiting.delete(h);
        if (!h.isConnected) return;
        const split = SplitText.create(h, { type: "lines", mask: "lines", linesClass: "split-line", aria: "auto" });
        h.removeAttribute("data-split-wait");
        gsap.from(split.lines, {
          y: 90,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          stagger: 0.12,
          onComplete: () => split.revert(), // React owns the text again
        });
      },
    });
  }

  // ------------------------------------------------------------ 4/5. bands and scroll SVGs
  function wireBand(band: HTMLElement) {
    const { gsap } = kit!;
    const st = { trigger: band, start: "top top", end: "bottom top", scrub: true };
    const img = band.querySelector("img");
    if (img) gsap.fromTo(img, { scale: 1 }, { scale: 1.1, ease: "none", scrollTrigger: st });
    const scene = band.querySelector("svg[data-svg-interact]");
    if (scene && !img) gsap.fromTo(scene, { y: 0 }, { y: 60, ease: "none", scrollTrigger: st });
  }
  function wireSvg(host: HTMLElement) {
    const { gsap } = kit!;
    const modes = (host.dataset.scrollSvg ?? "draw").split(/s+/);
    const has = (m: string) => modes.includes(m) || (modes.includes("both") && (m === "draw" || m === "parallax"));
    if (has("view")) {
      // scroll trigger -> the illustration's own behaviour (bloom/sway/…) plays once when it comes into view
      kit!.ScrollTrigger.create({ trigger: host, start: "top 80%", once: true, onEnter: () => host.querySelectorAll("svg[data-svg-interact]").forEach((sv) => sv.setAttribute("data-svg-hot", "")) });
    }
    if (has("near")) nears.push(host);
    if (has("draw")) {
      const shapes = Array.from(host.querySelectorAll<SVGGeometryElement>("path,line,polyline,polygon,circle,ellipse,rect")).filter((s) => {
        const cs = getComputedStyle(s);
        return cs.stroke !== "none" && parseFloat(cs.strokeWidth) > 0;
      });
      if (shapes.length) {
        gsap.fromTo(
          shapes,
          { drawSVG: "0%" },
          { drawSVG: "100%", ease: "none", stagger: 0.04, scrollTrigger: { trigger: host, start: "top 92%", end: "center 40%", scrub: 1 } },
        );
      }
    }
    if (has("parallax")) {
      gsap.fromTo(host, { y: 60 }, { y: -60, ease: "none", scrollTrigger: { trigger: host, start: "top bottom", end: "bottom top", scrub: 1.2 } });
      const inner = host.firstElementChild as HTMLElement | null;
      if (inner) {
        const lx = gsap.quickTo(inner, "x", { duration: 1.2, ease: "power3.out" });
        const ly = gsap.quickTo(inner, "y", { duration: 1.2, ease: "power3.out" });
        leaners.push({ host, lx, ly });
      }
    }
  }
  const leaners: { host: HTMLElement; lx: (v: number) => void; ly: (v: number) => void }[] = [];
  const nears: HTMLElement[] = []; // cursor proximity (≤ 240 px) wakes the illustration's own behaviour
  const NEAR = 240;

  function scanFx(node: ParentNode) {
    if (!kit || !ctx || stopped) return;
    ctx.add(() => scanInto(node));
    refresh();
  }
  function scanInto(node: ParentNode) {
    node.querySelectorAll<HTMLElement>("[data-split-wait]").forEach((h) => {
      if (!h.hasAttribute("data-split-wired")) {
        h.setAttribute("data-split-wired", "");
        wireHeading(h);
      }
    });
    node.querySelectorAll<HTMLElement>("[data-listing-hero], [data-page-hero]").forEach((b) => {
      if (wired.has(b)) return;
      wired.add(b);
      wireBand(b);
    });
    node.querySelectorAll<HTMLElement>("[data-scroll-svg]").forEach((s) => {
      if (wired.has(s)) return;
      wired.add(s);
      wireSvg(s);
    });
  }

  // ------------------------------------------------------------ 2. smart header (Penta "akıllı menü")
  const header = () => doc.querySelector<HTMLElement>("[data-smart-header]") ?? doc.getElementById("header-accent");
  let hidden = false;
  let lastY = scrollY;
  const headerLocked = (h: HTMLElement) => {
    if (h.matches(":focus-within") || h.querySelector('[data-state="open"],[aria-expanded="true"]')) return true;
    const over = (el: Element) => /hidden|clip/.test(getComputedStyle(el).overflowY);
    if (over(root) || over(doc.body)) return true; // drawer / mobile nav lock
    try {
      return !!doc.querySelector("dialog:modal");
    } catch {
      return !!doc.querySelector("dialog[open]");
    }
  };
  const setHeader = (hide: boolean) => {
    const h = header();
    if (!h || !kit || hide === hidden) return;
    hidden = hide;
    root.toggleAttribute("data-header-hidden", hide);
    kit.gsap.to(h, { yPercent: hide ? -100 : 0, duration: hide ? 0.45 : 0.5, ease: hide ? "power2.in" : "power3.out", overwrite: true });
  };
  const onScroll = () => {
    const h = header();
    const y = scrollY;
    const dy = y - lastY;
    lastY = y;
    if (!h) return;
    if (root.hasAttribute("data-pin-hold")) return setHeader(true);
    if (headerLocked(h) || y < h.offsetHeight + 50) return setHeader(false);
    if (dy > 4) setHeader(true);
    else if (dy < -4) setHeader(false);
  };
  // a menu / drawer opening while hidden brings the header back
  const headerMo = new MutationObserver(() => {
    const h = header();
    if (hidden && h && headerLocked(h)) setHeader(false);
  });

  // ------------------------------------------------------------ 6/7. pointer: tilt, glare, magnets, SVG lean
  type Tilt = { rx: (v: number) => void; ry: (v: number) => void };
  const tilts = new WeakMap<HTMLElement, Tilt>();
  const magnets = new WeakMap<HTMLElement, Tilt>();
  let tiltCard: HTMLElement | null = null;
  let magnet: HTMLElement | null = null;
  const MAX = 7.5; // VanillaTilt "max" (Penta collection cards)

  const tiltOf = (tile: HTMLElement): Tilt => {
    let t = tilts.get(tile);
    if (!t) {
      const { gsap } = kit!;
      gsap.set(tile, { transformPerspective: 1000 });
      // VanillaTilt speed 1000 + cubic-bezier(.10,.98,.52,.99) ≈ expo.out over 1 s
      t = { rx: gsap.quickTo(tile, "rotationX", { duration: 1, ease: "expo.out" }), ry: gsap.quickTo(tile, "rotationY", { duration: 1, ease: "expo.out" }) };
      tilts.set(tile, t);
    }
    return t;
  };
  const magnetOf = (el: HTMLElement): Tilt => {
    let m = magnets.get(el);
    if (!m) {
      const { gsap } = kit!;
      el.setAttribute("data-fx-magnet", "");
      m = { rx: gsap.quickTo(el, "x", { duration: 0.6, ease: "power3.out" }), ry: gsap.quickTo(el, "y", { duration: 0.6, ease: "power3.out" }) };
      magnets.set(el, m);
    }
    return m;
  };
  const releaseTilt = () => {
    if (!tiltCard) return;
    const tile = tiltCard.querySelector<HTMLElement>("[data-card-tile]");
    if (tile) {
      const t = tiltOf(tile);
      t.rx(0);
      t.ry(0);
    }
    tiltCard = null;
  };
  const releaseMagnet = () => {
    if (!magnet || !kit) return;
    kit.gsap.to(magnet, { x: 0, y: 0, duration: 0.9, ease: "elastic.out(1, 0.4)", overwrite: true });
    magnets.delete(magnet); // quickTo tweens were overwritten: rebuild on next enter
    magnet = null;
  };
  const onMove = (e: PointerEvent) => {
    if (!kit || e.pointerType !== "mouse") return;
    const target = e.target as Element;
    // card tilt + glare
    const card = target.closest?.<HTMLElement>("[data-product-card]") ?? null;
    if (card !== tiltCard) releaseTilt();
    const tile = card?.querySelector<HTMLElement>("[data-card-tile]");
    if (card && tile) {
      tiltCard = card;
      const r = tile.getBoundingClientRect();
      const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      const t = tiltOf(tile);
      t.ry(MAX - x * MAX * 2); // VanillaTilt: rotateY = max - 2·max·x
      t.rx(y * MAX * 2 - MAX); //              rotateX = 2·max·y - max
      tile.style.setProperty("--glare-x", `${(x * 100).toFixed(1)}%`);
      tile.style.setProperty("--glare-y", `${(y * 100).toFixed(1)}%`);
    }
    // magnetic CTA
    const mEl = target.closest?.<HTMLElement>(MAGNET) ?? null;
    const usable = mEl && !mEl.matches(":disabled,[aria-disabled='true']") && !mEl.closest("[data-product-card],dialog");
    if (mEl !== magnet) releaseMagnet();
    if (usable && mEl) {
      magnet = mEl;
      const r = mEl.getBoundingClientRect();
      const m = magnetOf(mEl);
      const dx = e.clientX - (r.left + r.width / 2);
      const dy = e.clientY - (r.top + r.height / 2);
      m.rx(Math.max(-10, Math.min(10, dx * 0.3)));
      m.ry(Math.max(-8, Math.min(8, dy * 0.4)));
    }
    // scroll SVG lean toward the cursor (viewport-relative, -1..1)
    for (const host of nears) {
      if (!host.isConnected) continue;
      const r = host.getBoundingClientRect();
      const dx = Math.max(r.left - e.clientX, 0, e.clientX - r.right);
      const dy = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom);
      const near = Math.hypot(dx, dy) <= NEAR;
      host.querySelectorAll("svg[data-svg-interact]").forEach((sv) => sv.toggleAttribute("data-svg-hot", near));
      if (near) {
        // parallax illustrations lean toward the cursor (same vars the runtime writes on hover)
        const nx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2 || 1)));
        const ny = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2 || 1)));
        host.querySelectorAll<SVGSVGElement>("svg[data-svg-interact~='parallax']").forEach((sv) => {
          sv.style.setProperty("--svg-px", nx.toFixed(3));
          sv.style.setProperty("--svg-py", ny.toFixed(3));
        });
      }
    }
    if (leaners.length) {
      const nx = (e.clientX / innerWidth) * 2 - 1;
      const ny = (e.clientY / innerHeight) * 2 - 1;
      for (const l of leaners) {
        if (!l.host.isConnected) continue;
        l.lx(nx * 18);
        l.ly(ny * 12);
      }
    }
  };
  const onLeaveDoc = (e: PointerEvent) => {
    if (!e.relatedTarget) {
      releaseTilt();
      releaseMagnet();
    }
  };

  // ------------------------------------------------------------ start
  markHeadings(doc);
  const failSafe = window.setTimeout(() => !kit && releaseAll(), 4000); // chunk slow/failed: never leave headings hidden
  loadGsapFx()
    .then((k) => {
      if (stopped) return;
      kit = k;
      const { gsap } = k;
      ctx = gsap.context(() => {
        // 3. scroll-top ring: whole-page progress (scrub)
        const ring = doc.querySelector<SVGCircleElement>("[data-scroll-ring-bar]");
        if (ring) {
          gsap.fromTo(ring, { drawSVG: "0%" }, { drawSVG: "100%", ease: "none", scrollTrigger: { trigger: doc.body, start: 0, end: "max", scrub: 0.4 } });
        }
      });
      scanFx(doc);
      window.addEventListener("scroll", onScroll, { passive: true });
      headerMo.observe(doc.body, { attributes: true, subtree: true, attributeFilter: ["open", "data-state", "aria-expanded", "style"] });
      if (fine()) {
        doc.addEventListener("pointermove", onMove, { passive: true });
        doc.addEventListener("pointerout", onLeaveDoc, { passive: true });
      }
      cleanups.push(() => {
        window.removeEventListener("scroll", onScroll);
        headerMo.disconnect();
        doc.removeEventListener("pointermove", onMove);
        doc.removeEventListener("pointerout", onLeaveDoc);
        const h = header();
        if (h) {
          gsap.set(h, { clearProps: "transform" });
          root.removeAttribute("data-header-hidden");
        }
        window.clearTimeout(refreshTimer);
        ctx?.revert(); // only this module's tweens + triggers (PinStage / Lenis own theirs)
        ctx = null;
        doc.querySelectorAll<HTMLElement>("[data-product-card] [data-card-tile], [data-fx-magnet], [data-scroll-svg] > *").forEach((el) => {
          gsap.killTweensOf(el);
          gsap.set(el, { clearProps: "transform" });
          el.removeAttribute("data-fx-magnet");
        });
        doc.querySelectorAll("[data-split-wired]").forEach((el) => el.removeAttribute("data-split-wired"));
      });
    })
    .catch(releaseAll);

  return {
    scan(node) {
      if (stopped) return;
      markHeadings(node);
      scanFx(node);
    },
    stop() {
      stopped = true;
      window.clearTimeout(failSafe);
      releaseAll();
      cleanups.forEach((c) => c());
    },
  };
}
