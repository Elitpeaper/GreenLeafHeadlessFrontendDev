/**
 * Site-wide GSAP scenes, Penta style (K-265, K-264, K-271, K-272; hareket.md §27). Client only, started by the runtime in
 * the full tier (html[data-motion="on"]) and reverted when the visitor picks "Hareketi azalt".
 *
 *  1. SplitText headings   main h2 (and [data-split]) below the fold: lines rise from a mask, y 90 -> 0, stagger .12
 *  2. smart header         retired by K-292 (the header row never hides); only a stale html[data-header-hidden] is
 *                          cleared on stop. No scroll handler / style observer remains (P-05, P-06).
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
    const modes = (host.dataset.scrollSvg ?? "draw").split(/\s+/);
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

  // P-01 (PERFORMANS-DENETIMI-1): refresh ONLY when this scan wired a new trigger. An unconditional refresh fed an
  // endless loop (refresh -> ScrollTrigger's own DOM writes -> runtime MutationObserver -> scan -> refresh).
  function scanFx(node: ParentNode) {
    if (!kit || !ctx || stopped) return;
    let added = false;
    ctx.add(() => {
      added = scanInto(node);
    });
    if (added) refresh();
  }
  function scanInto(node: ParentNode): boolean {
    let added = false;
    node.querySelectorAll<HTMLElement>("[data-split-wait]").forEach((h) => {
      if (!h.hasAttribute("data-split-wired")) {
        h.setAttribute("data-split-wired", "");
        wireHeading(h);
        added = true;
      }
    });
    node.querySelectorAll<HTMLElement>("[data-listing-hero], [data-page-hero]").forEach((b) => {
      if (wired.has(b)) return;
      wired.add(b);
      wireBand(b);
      added = true;
    });
    node.querySelectorAll<HTMLElement>("[data-scroll-svg]").forEach((s) => {
      if (wired.has(s)) return;
      wired.add(s);
      wireSvg(s);
      added = true;
    });
    return added;
  }

  // ------------------------------------------------------------ 2. smart header: retired (K-292)
  // The main header row is never hidden, so the hide/show scroll handler, its layout reads (P-06) and the body-wide
  // `style` MutationObserver with getComputedStyle (P-05) are gone. Only a stale state is cleared on stop.
  const header = () => doc.querySelector<HTMLElement>("[data-smart-header]") ?? doc.getElementById("header-accent");

  // ------------------------------------------------------------ geometry cache (P-09): no layout reads per pointermove
  // Rects are read at most once per scroll/resize "generation"; pointermove only does arithmetic on cached values.
  let geoGen = 0;
  const bumpGeo = () => void geoGen++;
  type Cached = { gen: number; r: DOMRect; pull?: [number, number] };
  const rects = new WeakMap<Element, Cached>();
  const rectOf = (el: Element): DOMRect => {
    const c = rects.get(el);
    if (c && c.gen === geoGen) return c.r;
    const r = el.getBoundingClientRect();
    // GSAP's own cached x/y (no DOM read): lets magnets measure from their resting position
    const pull: [number, number] | undefined =
      kit && el.hasAttribute("data-fx-magnet") ? [Number(kit.gsap.getProperty(el, "x")) || 0, Number(kit.gsap.getProperty(el, "y")) || 0] : undefined;
    rects.set(el, { gen: geoGen, r, pull });
    return r;
  };

  // ------------------------------------------------------------ 6/7. pointer: tilt, glare, magnets, SVG lean
  type Tilt = { rx: (v: number) => void; ry: (v: number) => void; glare?: HTMLElement | null };
  const tilts = new WeakMap<HTMLElement, Tilt>();
  const magnets = new WeakMap<HTMLElement, Tilt>();
  let tiltCard: HTMLElement | null = null;
  let magnet: HTMLElement | null = null;
  const MAX = 7.5; // VanillaTilt "max" (Penta collection cards)

  // Tilt: quickTo eases a plain object (no DOM); ONE ticker callback writes ONE transform per tile per frame, only when
  // the value changed, and lets go of the tile (inline transform cleared) once it has settled after release.
  type TiltState = { tile: HTMLElement; p: { x: number; y: number }; last: string };
  const tilting = new Set<TiltState>();
  const writeTilts = () => {
    for (const st of tilting) {
      const { x, y } = st.p;
      const held = tiltCard?.contains(st.tile) ?? false;
      if (!held && Math.abs(x) < 0.02 && Math.abs(y) < 0.02) {
        st.tile.style.removeProperty("transform");
        st.last = "";
        tilting.delete(st);
        continue;
      }
      const v = `perspective(1000px) rotateX(${x.toFixed(2)}deg) rotateY(${y.toFixed(2)}deg)`;
      if (v !== st.last) st.tile.style.transform = st.last = v;
    }
  };
  const tiltOf = (tile: HTMLElement): Tilt => {
    let t = tilts.get(tile);
    if (!t) {
      const { gsap } = kit!;
      const st: TiltState = { tile, p: { x: 0, y: 0 }, last: "" };
      // VanillaTilt speed 1000 + cubic-bezier(.10,.98,.52,.99) ≈ expo.out over 1 s
      const qx = gsap.quickTo(st.p, "x", { duration: 1, ease: "expo.out" });
      const qy = gsap.quickTo(st.p, "y", { duration: 1, ease: "expo.out" });
      t = {
        rx: (v) => (tilting.add(st), qx(v)),
        ry: (v) => (tilting.add(st), qy(v)),
        glare: tile.querySelector<HTMLElement>("[data-card-glare]"),
      };
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
  // P-09: per near-host cache of its svgs and its current "near" state (no querySelectorAll / attribute writes per move)
  type NearSvgs = { all: SVGSVGElement[]; para: SVGSVGElement[]; near: boolean };
  const nearSvgs = new WeakMap<HTMLElement, NearSvgs>();
  const svgsOfNear = (host: HTMLElement): NearSvgs => {
    let s = nearSvgs.get(host);
    if (!s) {
      const all = Array.from(host.querySelectorAll<SVGSVGElement>("svg[data-svg-interact]"));
      s = { all, para: all.filter((sv) => /(^|\s)parallax(\s|$)/.test(sv.getAttribute("data-svg-interact") ?? "")), near: false };
      nearSvgs.set(host, s);
    }
    return s;
  };

  // pointermove is coalesced to one frame (rAF): reads (cached rects) first, then writes
  let moveEv: PointerEvent | null = null;
  let moveRaf = 0;
  const onMove = (e: PointerEvent) => {
    if (!kit || e.pointerType !== "mouse") return;
    moveEv = e;
    if (!moveRaf) moveRaf = requestAnimationFrame(applyMove);
  };
  const applyMove = () => {
    moveRaf = 0;
    const e = moveEv;
    if (!kit || !e) return;
    const target = e.target as Element;
    // card tilt + glare
    const card = target.closest?.<HTMLElement>("[data-product-card]") ?? null;
    if (card !== tiltCard) releaseTilt();
    const tile = card?.querySelector<HTMLElement>("[data-card-tile]");
    if (card && tile) {
      tiltCard = card;
      const r = rectOf(tile); // read once per enter/scroll (VanillaTilt caches the rect on enter as well)
      const x = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
      const y = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      const t = tiltOf(tile);
      t.ry(MAX - x * MAX * 2); // VanillaTilt: rotateY = max - 2·max·x
      t.rx(y * MAX * 2 - MAX); //              rotateX = 2·max·y - max
      // glare: the 2x pre-painted layer slides (translate % of its own size) so its centre sits under the cursor;
      // one compositor write on one element, no gradient repaint and no inherited var on the tile subtree
      if (t.glare) t.glare.style.translate = `${((x - 0.5) * 50).toFixed(2)}% ${((y - 0.5) * 50).toFixed(2)}%`;
    }
    // magnetic CTA
    const mEl = target.closest?.<HTMLElement>(MAGNET) ?? null;
    if (mEl !== magnet) releaseMagnet();
    const usable = mEl && !mEl.matches(":disabled,[aria-disabled='true']") && !mEl.closest("[data-product-card],dialog");
    if (usable && mEl) {
      magnet = mEl;
      const r = rectOf(mEl);
      const m = magnetOf(mEl);
      // measure from the resting centre: the rect may have been read while the magnet was pulled
      const [ox, oy] = rects.get(mEl)?.pull ?? [0, 0];
      const dx = e.clientX - (r.left - ox + r.width / 2);
      const dy = e.clientY - (r.top - oy + r.height / 2);
      m.rx(Math.max(-10, Math.min(10, dx * 0.3)));
      m.ry(Math.max(-8, Math.min(8, dy * 0.4)));
    }
    // scroll SVG lean toward the cursor (viewport-relative, -1..1)
    for (const host of nears) {
      if (!host.isConnected) continue;
      const r = rectOf(host);
      const dx = Math.max(r.left - e.clientX, 0, e.clientX - r.right);
      const dy = Math.max(r.top - e.clientY, 0, e.clientY - r.bottom);
      const near = Math.hypot(dx, dy) <= NEAR;
      const svgs = svgsOfNear(host);
      if (near !== svgs.near) {
        svgs.near = near;
        svgs.all.forEach((sv) => sv.toggleAttribute("data-svg-hot", near));
      }
      if (near && svgs.para.length) {
        // parallax illustrations lean toward the cursor (same vars the runtime writes on hover)
        const nx = Math.max(-1, Math.min(1, (e.clientX - (r.left + r.width / 2)) / (r.width / 2 || 1))).toFixed(3);
        const ny = Math.max(-1, Math.min(1, (e.clientY - (r.top + r.height / 2)) / (r.height / 2 || 1))).toFixed(3);
        for (const sv of svgs.para) {
          sv.style.setProperty("--svg-px", nx);
          sv.style.setProperty("--svg-py", ny);
        }
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
      window.addEventListener("scroll", bumpGeo, { passive: true });
      window.addEventListener("resize", bumpGeo, { passive: true });
      if (fine()) {
        gsap.ticker.add(writeTilts); // after the tweens of the frame (reads eased values, writes once)
        doc.addEventListener("pointermove", onMove, { passive: true });
        doc.addEventListener("pointerout", onLeaveDoc, { passive: true });
      }
      cleanups.push(() => {
        window.removeEventListener("scroll", bumpGeo);
        window.removeEventListener("resize", bumpGeo);
        cancelAnimationFrame(moveRaf);
        doc.removeEventListener("pointermove", onMove);
        doc.removeEventListener("pointerout", onLeaveDoc);
        const h = header();
        if (h && root.hasAttribute("data-header-hidden")) gsap.set(h, { clearProps: "transform" });
        root.removeAttribute("data-header-hidden");
        window.clearTimeout(refreshTimer);
        ctx?.revert(); // only this module's tweens + triggers (PinStage / Lenis own theirs)
        ctx = null;
        doc.querySelectorAll<HTMLElement>("[data-product-card] [data-card-tile], [data-fx-magnet], [data-scroll-svg] > *").forEach((el) => {
          gsap.killTweensOf(el);
          gsap.set(el, { clearProps: "transform" });
          el.removeAttribute("data-fx-magnet");
        });
        doc.querySelectorAll("[data-split-wired]").forEach((el) => el.removeAttribute("data-split-wired"));
        kit?.gsap.ticker.remove(writeTilts);
        tilting.forEach((st) => st.tile.style.removeProperty("transform"));
        tilting.clear();
        doc.querySelectorAll<HTMLElement>("[data-card-glare]").forEach((g) => g.style.removeProperty("translate"));
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
