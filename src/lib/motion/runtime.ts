/**
 * MotionRuntime core (client only). One instance per page, mounted by <MotionRoot />.
 * Wires every [data-motion] and [data-accent-zone] element globally with event delegation and shared observers,
 * so page components need no motion code. Animation itself lives in motion.css (CSS) or WAAPI here;
 * only transform/opacity (individual translate/scale/rotate) and registered colour vars are animated.
 *
 * Spec: docs/tasarim/hareket.md. Budget: ~5 kB gz (K-097).
 */
import { applyAccent, clearAccent, recolorSubset } from "@/lib/theme/accent";
import { primitivesOf, type MotionPrimitive } from "./ids";
import { motionScrollTo } from "./helpers";
import type { FxController } from "./fx";
import { startSmoothScroll } from "./lenis";
import { prepareSvg, svgHostOf } from "./svg-interact";
import { decideRecolor, decideRecolorFocus, type RecolorZoneState } from "./recolor-scheduler";
import { DISTANCE, DURATION, EASE, INPUT_WINDOW, LIMITS, RECOLOR, SCROLL, STAGGER, VIEW, type RecolorZoneKind } from "./tokens";

const IO_KINDS: ReadonlySet<MotionPrimitive> = new Set<MotionPrimitive>([
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
  "ticker",
  "collage",
  "megamenu",
  "marquee",
]);

const SELECTED = '[aria-selected="true"],[aria-current="page"],[aria-current="true"],[data-active]';
const SHAPES = "path,line,polyline,polygon,circle,rect,ellipse";

type Cleanup = () => void;

export function startMotionRuntime(opts: { bootHref?: string } = {}): Cleanup {
  const doc = document;
  const root = doc.documentElement;
  const cleanups: Cleanup[] = [];
  const seen = new WeakSet<Element>();
  const scrollers = new Set<HTMLElement>(); // compact + backtop
  const magnets = new Set<HTMLElement>();
  let lastInput = -Infinity;

  const motionOn = () => root.dataset.motion === "on";
  /** "on" (full) or "reduced" (gentle tier: opacity/colour feedback only) */
  const motionAny = () => root.dataset.motion === "on" || root.dataset.motion === "reduced";

  // ------------------------------------------------------------ shared frame loop (cursor parallax, scroll state)
  const steps = new Set<(now: number) => boolean>();
  let raf = 0;
  const frame = (now: number) => {
    raf = 0;
    for (const s of Array.from(steps)) if (!s(now)) steps.delete(s);
    if (steps.size) raf = requestAnimationFrame(frame);
  };
  const loop = {
    add(step: (now: number) => boolean) {
      steps.add(step);
      if (!raf) raf = requestAnimationFrame(frame);
    },
  };
  cleanups.push(() => {
    cancelAnimationFrame(raf);
    steps.clear();
  });
  cleanups.push(startSmoothScroll()); // K-256: Lenis (lazy chunk), desktop fine pointer + full tier only
  // counters/pops of elements mounted after this moment may animate (hydration never pops)
  const liveTimer = window.setTimeout(() => root.setAttribute("data-motion-live", ""), 1200);
  cleanups.push(() => window.clearTimeout(liveTimer));
  const recentInput = () => performance.now() - lastInput < INPUT_WINDOW;
  const listen = <K extends keyof DocumentEventMap>(
    target: Document | Window,
    type: K,
    fn: (e: DocumentEventMap[K]) => void,
    opts?: AddEventListenerOptions,
  ) => {
    target.addEventListener(type, fn as EventListener, opts);
    cleanups.push(() => target.removeEventListener(type, fn as EventListener, opts));
  };

  // ------------------------------------------------------------ GSAP scenes (fx.ts): full tier only, follow the tier live
  let fx: FxController | null = null;
  let fxLoading = false;
  let fxWanted = false;
  const syncFx = () => {
    fxWanted = motionOn();
    if (!fxWanted) {
      fx?.stop();
      fx = null;
      return;
    }
    if (fx || fxLoading) return;
    fxLoading = true;
    import("./fx")
      .then(({ startFx }) => {
        if (fxWanted && !fx) fx = startFx();
      })
      .catch(() => {})
      .finally(() => (fxLoading = false));
  };
  const tierMo = new MutationObserver(() => started && syncFx());
  tierMo.observe(root, { attributes: true, attributeFilter: ["data-motion"] });
  cleanups.push(() => {
    tierMo.disconnect();
    fx?.stop();
    fx = null;
  });

  // K-264: the OS reduced-motion setting no longer changes the tier (html[data-motion] is the single source,
  // switched live by the footer "Hareketi azalt" control through preference.ts).

  listen(doc, "pointerdown", () => (lastInput = performance.now()), { capture: true, passive: true });
  listen(doc, "keydown", () => (lastInput = performance.now()), { capture: true });

  // ------------------------------------------------------------ on-view (once)
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        const el = entry.target as HTMLElement;
        const kinds = primitivesOf(el.dataset.motion);
        if (kinds.includes("marquee")) {
          if (entry.isIntersecting) el.removeAttribute("data-offscreen");
          else el.setAttribute("data-offscreen", "");
          continue;
        }
        if (!entry.isIntersecting || el.hasAttribute("data-motion-in")) continue;
        io.unobserve(el);
        el.setAttribute("data-motion-in", "");
        if (kinds.includes("item") || kinds.includes("flow")) {
          // reveal the whole sibling group together (a rail never lags behind its first card)
          const token = el.dataset.motion!.split(/\s+/)[0]!;
          for (const sib of Array.from(el.parentElement?.children ?? [])) {
            if (sib !== el && (sib as HTMLElement).dataset?.motion?.split(/\s+/).includes(token)) {
              io.unobserve(sib);
              sib.setAttribute("data-motion-in", "");
            }
          }
        }
        if (kinds.includes("megamenu")) window.setTimeout(() => el.setAttribute("data-motion-seen", ""), DURATION.xl);
        if (kinds.includes("ticker") && !flowScopeOf(el)) runTicker(el, 0);
        if (kinds.includes("flow")) runFlow(el);
      }
    },
    { rootMargin: VIEW.rootMargin, threshold: VIEW.threshold },
  );
  cleanups.push(() => io.disconnect());

  // ------------------------------------------------------------ counters / ticks / pops (state feedback)
  const textObservers: MutationObserver[] = [];
  cleanups.push(() => textObservers.forEach((m) => m.disconnect()));
  const numberOf = (el: Element) => {
    const n = parseInt((el.textContent ?? "").replace(/\D+/g, ""), 10);
    return Number.isFinite(n) ? n : 0;
  };
  const watchText = (el: HTMLElement, onChange: (prev: string, next: string) => void) => {
    let prev = el.textContent ?? "";
    const mo = new MutationObserver(() => {
      const next = el.textContent ?? "";
      if (next !== prev) {
        const p = prev;
        prev = next;
        onChange(p, next);
      }
    });
    mo.observe(el, { characterData: true, childList: true, subtree: true });
    textObservers.push(mo);
  };
  const play = (el: Element, frames: Keyframe[], duration: number, easing: string = EASE.out) => {
    if (!motionOn() || typeof (el as HTMLElement).animate !== "function") return;
    (el as HTMLElement).animate(frames, { duration, easing });
  };
  const bump = (el: Element) =>
    play(el, [{ scale: 1 }, { scale: 1.32, offset: 0.35 }, { scale: 1 }], 420, EASE.out);

  // ------------------------------------------------------------ ticker (M-19) and flow (M-18)
  const fmt = new Map<string, Intl.NumberFormat>();
  const format = (n: number, decimals: number) => {
    const key = String(decimals);
    if (!fmt.has(key)) fmt.set(key, new Intl.NumberFormat("tr-TR", { minimumFractionDigits: decimals, maximumFractionDigits: decimals }));
    return fmt.get(key)!.format(n);
  };
  const TICKER_SEL = '[data-motion~="ticker"],[data-motion~="M-19"]';
  const FLOW_SEL = '[data-motion~="flow"],[data-motion~="M-18"]';
  /** Scope of a PV flow: the closest section that contains flow items (M-18). */
  function flowScopeOf(el: Element): HTMLElement | null {
    const scope = el.closest<HTMLElement>("section") ?? el.parentElement?.parentElement ?? null;
    return scope?.querySelector(FLOW_SEL) ? scope : null;
  }
  /** Value of a ticker: data-value | data-count-to | the Turkish-formatted text ("1.234,5"). */
  function tickerTarget(el: HTMLElement): { to: number; decimals: number } | null {
    const raw = el.dataset.value ?? el.dataset.countTo;
    const text = (el.textContent ?? "").trim();
    const comma = text.lastIndexOf(",");
    const decimalsFromText = comma >= 0 ? text.length - comma - 1 : 0;
    const to = raw != null ? Number(raw) : Number(text.replace(/[^\d,-]/g, "").replace(",", "."));
    if (!Number.isFinite(to) || text === "") return null;
    return { to, decimals: el.dataset.decimals != null ? Number(el.dataset.decimals) || 0 : decimalsFromText };
  }
  const ticked = new WeakSet<Element>();
  function runTicker(el: HTMLElement, delay: number) {
    const target = tickerTarget(el);
    if (!motionOn() || !target || ticked.has(el)) return;
    ticked.add(el);
    const { to, decimals } = target;
    const from = Number(el.dataset.from ?? 0) || 0;
    const duration = Math.min(Number(el.dataset.duration ?? LIMITS.ticker) || LIMITS.ticker, LIMITS.ticker);
    const final = el.textContent;
    el.textContent = format(from, decimals);
    const start = performance.now() + delay;
    const step = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / duration));
      const eased = 1 - (1 - t) ** 3;
      el.textContent = t >= 1 ? final : format(from + (to - from) * eased, decimals);
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  const flowed = new WeakSet<Element>();
  function runFlow(item: HTMLElement) {
    const scope = flowScopeOf(item);
    if (!scope || flowed.has(scope)) return;
    flowed.add(scope);
    const tickers = Array.from(scope.querySelectorAll<HTMLElement>(TICKER_SEL));
    const total = scope.querySelector<HTMLElement>('[data-motion-part="total"]') ?? tickers[tickers.length - 1] ?? null;
    const chips = Array.from(scope.querySelectorAll<HTMLElement>(FLOW_SEL)).map(
      (it) => it.querySelector<HTMLElement>('[data-motion-part="chip"],[data-motion~="pv-chip"]') ?? it,
    );
    if (!motionOn() || !total || chips.length === 0) return;
    const flight = 700;
    const gap = 140;
    const lead = 450; // items rise first, then the chips leave
    const t = total.getBoundingClientRect();
    chips.forEach((chip, i) => {
      const r = chip.getBoundingClientRect();
      const ghost = chip.cloneNode(true) as HTMLElement;
      ghost.setAttribute("aria-hidden", "true");
      ghost.removeAttribute("id");
      ghost.querySelectorAll("[id]").forEach((n) => n.removeAttribute("id"));
      Object.assign(ghost.style, {
        position: "absolute",
        left: `${r.left + scrollX}px`,
        top: `${r.top + scrollY}px`,
        width: `${r.width}px`,
        height: `${r.height}px`,
        margin: "0",
        pointerEvents: "none",
        zIndex: "30",
      });
      doc.body.appendChild(ghost);
      const dx = t.left + t.width / 2 - (r.left + r.width / 2);
      const dy = t.top + t.height / 2 - (r.top + r.height / 2);
      const anim = ghost.animate(
        [
          { translate: "0 0", scale: 1, opacity: 0 },
          { translate: "0 0", scale: 1, opacity: 1, offset: 0.08 },
          { translate: `${dx * 0.55}px ${dy * 0.55 - 36}px`, scale: 0.85, opacity: 1, offset: 0.55 },
          { translate: `${dx}px ${dy}px`, scale: 0.5, opacity: 0 },
        ],
        { duration: flight, delay: lead + i * gap, easing: EASE.inOut, fill: "both" },
      );
      anim.finished.then(
        () => {
          ghost.remove();
          play(total, [{ scale: 1 }, { scale: 1.06, offset: 0.4 }, { scale: 1 }], DURATION.md);
        },
        () => ghost.remove(),
      );
    });
    tickers.forEach((tk) => runTicker(tk, lead + flight * 0.6));
  }

  // ------------------------------------------------------------ tabs / indicator (M-17, mega menu root bar)
  const placeIndicator = (host: HTMLElement, animate: boolean) => {
    const ind = host.querySelector<HTMLElement>('[data-motion-part="indicator"]');
    const sel = host.querySelector<HTMLElement>(SELECTED);
    const parent = ind?.offsetParent as HTMLElement | null;
    if (!ind || !parent) return;
    if (!sel) {
      ind.style.opacity = "0";
      return;
    }
    const p = parent.getBoundingClientRect();
    const s = sel.getBoundingClientRect();
    const prev = ind.getBoundingClientRect();
    const x = s.left - p.left + parent.scrollLeft;
    const y = s.top - p.top + parent.scrollTop;
    const hadSize = ind.style.width !== "" && ind.style.opacity !== "0";
    ind.style.width = `${s.width}px`;
    ind.style.height = `${s.height}px`;
    ind.style.translate = `${x}px ${y}px`;
    ind.style.opacity = "1";
    host.setAttribute("data-motion-ready", "");
    if (animate && hadSize && motionOn() && s.width > 0 && s.height > 0) {
      ind.animate(
        [
          {
            transformOrigin: "0 0",
            transform: `translate(${prev.left - s.left}px, ${prev.top - s.top}px) scale(${prev.width / s.width}, ${prev.height / s.height})`,
          },
          { transformOrigin: "0 0", transform: "none" },
        ],
        { duration: DURATION.md, easing: EASE.out },
      );
    }
  };
  const tabObservers: MutationObserver[] = [];
  const ro = new ResizeObserver((entries) => entries.forEach((e) => placeIndicator(e.target as HTMLElement, false)));
  cleanups.push(() => {
    tabObservers.forEach((m) => m.disconnect());
    ro.disconnect();
  });

  // ------------------------------------------------------------ registration
  function init(el: HTMLElement) {
    if (seen.has(el)) return;
    seen.add(el);
    const kinds = primitivesOf(el.dataset.motion);
    if (kinds.length === 0) return;
    if (kinds.includes("draw")) {
      el.querySelectorAll<SVGGeometryElement>(SHAPES).forEach((shape) => {
        const stroke = getComputedStyle(shape).stroke;
        if (stroke && stroke !== "none") shape.setAttribute("pathLength", "1");
      });
      el.setAttribute("data-motion-drawable", "");
    }
    if (kinds.some((k) => IO_KINDS.has(k))) io.observe(el);
    if (kinds.includes("bump")) {
      let prev = numberOf(el);
      watchText(el, () => {
        const next = numberOf(el);
        if (next > prev && recentInput()) bump(el);
        prev = next;
      });
    }
    if (kinds.includes("tick")) {
      watchText(el, () => {
        if (recentInput()) play(el, [{ opacity: 0.35, translate: "0 0.3em" }, { opacity: 1, translate: "0 0" }], DURATION.sm);
      });
    }
    if (kinds.includes("pop")) {
      const target = () => el.querySelector('[data-motion-part="icon"]') ?? el.querySelector("svg") ?? el;
      const mo = new MutationObserver(() => {
        const on = el.getAttribute("aria-pressed") === "true" || el.getAttribute("aria-checked") === "true";
        if (on && recentInput()) bump(target());
      });
      mo.observe(el, { attributes: true, attributeFilter: ["aria-pressed", "aria-checked"] });
      textObservers.push(mo);
    }
    if (kinds.includes("tabs")) {
      placeIndicator(el, false);
      const mo = new MutationObserver(() => placeIndicator(el, true));
      mo.observe(el, { attributes: true, subtree: true, attributeFilter: ["aria-selected", "aria-current", "data-active"] });
      tabObservers.push(mo);
      ro.observe(el);
    }
    if (kinds.includes("compact") || kinds.includes("backtop")) {
      scrollers.add(el);
      onScroll();
    }
    if (kinds.includes("magnetic")) magnets.add(el);
  }
  // Hydration guard: an element is touched only once React owns it (fiber key present). Server-rendered nodes
  // of a boundary that has not hydrated yet are queued and retried; after 10 s everything is processed anyway.
  const t0 = performance.now();
  const pending = new Set<Element>();
  let retry = 0;
  const hydrated = (el: Element) => performance.now() - t0 > 10000 || Object.keys(el).some((k) => k.startsWith("__reactFiber$"));
  const later = (el: Element) => {
    pending.add(el);
    if (!retry) retry = window.setTimeout(flushPending, 250);
  };
  function flushPending() {
    retry = 0;
    for (const el of Array.from(pending)) {
      if (!el.isConnected) pending.delete(el);
      else if (hydrated(el)) {
        pending.delete(el);
        visit(el);
      }
    }
    if (pending.size) retry = window.setTimeout(flushPending, 250);
  }
  cleanups.push(() => window.clearTimeout(retry));
  const visit = (el: Element) => {
    if (!hydrated(el)) return later(el);
    if ((el as HTMLElement).dataset?.motion) init(el as HTMLElement);
    if (el.matches("svg[data-svg-interact]")) initSvg(el as SVGSVGElement);
  };
  function scan(node: ParentNode) {
    if ((node instanceof HTMLElement || node instanceof SVGElement) && node.matches("[data-motion],svg[data-svg-interact]")) visit(node);
    node.querySelectorAll("[data-motion],svg[data-svg-interact]").forEach(visit);
  }

  // ------------------------------------------------------------ auto reveal (v2): pages without markup still enter softly
  // Product cards and section headings in <main> that sit BELOW the fold at mount get the "reveal" primitive.
  // Above-the-fold content is never hidden (LCP/CLS); anything already inside a [data-motion] host is left alone.
  const AUTO_SKIP = "[data-motion],[data-no-reveal],header,nav,dialog,[role='dialog'],aside,[hidden]";
  function autoReveal(node: ParentNode) {
    if (!motionOn()) return;
    const main = doc.getElementById("icerik") ?? doc.querySelector("main");
    if (!main) return;
    const fold = innerHeight;
    const mark = (el: HTMLElement, delay = 0) => {
      if (el.dataset.motion || !hydrated(el) || el.getBoundingClientRect().top < fold) return;
      if (delay) el.style.setProperty("--reveal-delay", `${delay}ms`);
      el.dataset.motion = "reveal";
      init(el);
    };
    node.querySelectorAll<HTMLElement>("[data-product-card]").forEach((card) => {
      if (!main.contains(card) || card.parentElement?.closest(AUTO_SKIP)) return;
      const p = card.parentElement;
      const host = p && p !== main && p.childElementCount === 1 ? p : card;
      const r = host.getBoundingClientRect();
      const col = r.width > 0 && host.parentElement ? Math.round((r.left - host.parentElement.getBoundingClientRect().left) / r.width) : 0;
      mark(host, Math.min(Math.max(col, 0), 5) * STAGGER.step);
    });
    // section headings (h2) are revealed by the GSAP SplitText scene (fx.ts, K-265), not here
  }

  // ------------------------------------------------------------ interactive SVG (K-179)
  const svgHosts = new Map<Element, Set<SVGSVGElement>>();
  const hostOfSvg = new WeakMap<SVGSVGElement, Element>(); // P-09: resolved once in initSvg, never per frame
  const hot = new Set<SVGSVGElement>();
  const svgIo = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (!e.isIntersecting) continue;
        svgIo.unobserve(e.target);
        e.target.setAttribute("data-svg-in", "");
      }
    },
    { rootMargin: VIEW.rootMargin, threshold: VIEW.threshold },
  );
  cleanups.push(() => svgIo.disconnect());
  function initSvg(svg: SVGSVGElement) {
    if (seen.has(svg)) return;
    seen.add(svg);
    prepareSvg(svg);
    const host = svgHostOf(svg);
    hostOfSvg.set(svg, host);
    if (!svgHosts.has(host)) svgHosts.set(host, new Set());
    svgHosts.get(host)!.add(svg);
    if (svg.getAttribute("data-svg-reveal") !== "off") svgIo.observe(svg);
  }
  const setHot = (next: Set<SVGSVGElement>) => {
    for (const s of hot)
      if (!next.has(s)) {
        s.removeAttribute("data-svg-hot");
        s.style.removeProperty("--svg-px");
        s.style.removeProperty("--svg-py");
        hot.delete(s);
      }
    for (const s of next)
      if (!hot.has(s) && s.isConnected) {
        s.setAttribute("data-svg-hot", "");
        hot.add(s);
      }
  };
  const svgsAround = (start: Element | null) => {
    const out = new Set<SVGSVGElement>();
    for (let n = start; n; n = n.parentElement) svgHosts.get(n)?.forEach((s) => out.add(s));
    return out;
  };
  listen(doc, "pointerover", (e) => {
    if (e.pointerType === "touch" || !motionAny() || svgHosts.size === 0) return;
    setHot(svgsAround(e.target as Element));
  }, { passive: true });
  listen(doc, "pointerout", (e) => {
    if (e.pointerType === "touch" || hot.size === 0) return;
    if (!e.relatedTarget) setHot(new Set());
  }, { passive: true });
  listen(doc, "focusin", (e) => {
    if (svgHosts.size === 0 || !motionAny()) return;
    const el = e.target as Element;
    setHot(el.matches?.(":focus-visible") ? svgsAround(el) : new Set());
  });
  // cursor parallax: pointer position relative to the host, written once per frame
  let rectGen = 0;
  const hostRects = new WeakMap<Element, { gen: number; r: DOMRect }>();
  const hostRect = (el: Element) => {
    const c = hostRects.get(el);
    if (c && c.gen === rectGen) return c.r;
    const r = el.getBoundingClientRect();
    hostRects.set(el, { gen: rectGen, r });
    return r;
  };
  listen(window, "scroll" as keyof DocumentEventMap, () => void rectGen++, { passive: true });
  listen(window, "resize" as keyof DocumentEventMap, () => void rectGen++, { passive: true });
  let px = 0;
  let py = 0;
  let pxQueued = false;
  listen(doc, "pointermove", (e) => {
    if (e.pointerType === "touch" || !motionOn() || hot.size === 0) return;
    px = e.clientX;
    py = e.clientY;
    if (pxQueued) return;
    pxQueued = true;
    loop.add(() => {
      pxQueued = false;
      // P-09: cached host, rect read once per scroll/resize generation, all reads before all writes
      const out: [SVGSVGElement, string, string][] = [];
      for (const s of hot) {
        if (!(s.getAttribute("data-svg-interact") ?? "").includes("parallax")) continue;
        const r = hostRect(hostOfSvg.get(s) ?? svgHostOf(s));
        const nx = Math.max(-1, Math.min(1, (px - (r.left + r.width / 2)) / (r.width / 2 || 1)));
        const ny = Math.max(-1, Math.min(1, (py - (r.top + r.height / 2)) / (r.height / 2 || 1)));
        out.push([s, nx.toFixed(3), ny.toFixed(3)]);
      }
      for (const [s, x, y] of out) {
        s.style.setProperty("--svg-px", x);
        s.style.setProperty("--svg-py", y);
      }
      return false;
    });
  }, { passive: true });

  // ------------------------------------------------------------ scroll-linked state (H6 compact, F6 back-to-top)
  let ticking = false;
  let scrollPos = 0;
  function onScroll() {
    // read in the scroll event (style is clean there and ScrollTrigger reads it too); the rAF step must not read
    // scrollY after GSAP has written styles in the same frame (forced style recalc, PERFORMANS-DENETIMI-1 round 2)
    scrollPos = scrollY;
    if (ticking) return;
    ticking = true;
    loop.add(() => {
      ticking = false;
      const y = scrollPos;
      for (const el of scrollers) {
        if (!el.isConnected) {
          scrollers.delete(el);
          continue;
        }
        const kinds = primitivesOf(el.dataset.motion);
        if (kinds.includes("compact")) {
          const c = el.hasAttribute("data-compact");
          if (!c && y > SCROLL.compactOn) el.setAttribute("data-compact", "");
          else if (c && y < SCROLL.compactOff) el.removeAttribute("data-compact");
        }
        if (kinds.includes("backtop")) {
          const v = y > innerHeight * SCROLL.backTopViewports;
          el.toggleAttribute("data-visible", v);
        }
      }
      return false;
    });
  }
  listen(window, "scroll" as keyof DocumentEventMap, onScroll, { passive: true });

  // ------------------------------------------------------------ clicks: back-to-top, marquee toggle, disabled-note nudge
  listen(doc, "click", (e) => {
    const t = e.target as Element | null;
    if (!t?.closest) return;
    const back = t.closest<HTMLElement>('[data-motion~="backtop"],[data-motion~="F6"]');
    if (back) {
      e.preventDefault();
      const target = doc.getElementById(back.dataset.target ?? "icerik");
      motionScrollTo(0, () => target?.focus({ preventScroll: true }));
      return;
    }
    const toggle = t.closest<HTMLElement>('[data-motion-part="marquee-toggle"]');
    if (toggle) {
      const host = toggle.closest<HTMLElement>('[data-motion~="marquee"],[data-motion~="M-23"]');
      if (!host) return;
      const paused = !host.hasAttribute("data-paused");
      host.toggleAttribute("data-paused", paused);
      toggle.setAttribute("aria-pressed", String(paused));
      const label = paused ? toggle.dataset.labelPlay : toggle.dataset.labelPause;
      const text = toggle.querySelector("[data-label]") ?? toggle;
      if (label) text.textContent = label;
      return;
    }
    const nudge = t.closest<HTMLElement>('[data-motion~="nudge-note"]');
    if (nudge) {
      for (const id of (nudge.getAttribute("aria-describedby") ?? "").split(/\s+/)) {
        const note = id && doc.getElementById(id);
        if (!note) continue;
        note.removeAttribute("data-motion-flash");
        void note.offsetWidth; // restart the CSS animation on repeated presses
        note.setAttribute("data-motion-flash", "");
        window.setTimeout(() => note.removeAttribute("data-motion-flash"), 1400);
      }
    }
  });

  // ------------------------------------------------------------ navigation loader (K-170)
  // A same-origin link click that has not changed the URL after 150 ms shows the branded overlay (html attribute
  // only, CSS in motion.css). Cleared when the URL changes, on popstate, or after 10 s. Fast (prefetched) moves never show it.
  let navTimer = 0;
  let navWatch = 0;
  const navDone = () => {
    window.clearTimeout(navTimer);
    window.clearTimeout(navWatch);
    root.removeAttribute("data-nav-pending");
  };
  listen(doc, "click", (e) => {
    if (e.defaultPrevented && !(e.target as Element)?.closest?.("a[href]")) return;
    if (e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    const a = (e.target as Element | null)?.closest?.<HTMLAnchorElement>("a[href]");
    if (!a || (a.target && a.target !== "_self") || a.hasAttribute("download")) return;
    const url = new URL(a.href, location.href);
    if (url.origin !== location.origin || (url.pathname === location.pathname && url.search === location.search)) return;
    const from = location.href;
    navDone();
    navTimer = window.setTimeout(() => {
      if (location.href !== from) return;
      root.setAttribute("data-nav-pending", "");
      const started = performance.now();
      const watch = () => {
        if (location.href !== from || performance.now() - started > 10000) navDone();
        else navWatch = window.setTimeout(watch, 80);
      };
      watch();
    }, 150);
  });
  listen(window, "popstate" as keyof DocumentEventMap, navDone);
  cleanups.push(navDone);

  // ------------------------------------------------------------ K-233 / S-067 b: hero intro only on a full page load
  // The boot script sets html[data-intro]; any client-side URL change (link, back/forward, router.push) removes it,
  // so the home hero does not replay its entrance when the visitor comes back to / in the same session.
  const bootHref = opts.bootHref ?? location.href.split("#")[0];
  const introCheck = () => {
    if (root.hasAttribute("data-intro") && location.href.split("#")[0] !== bootHref) root.removeAttribute("data-intro");
  };
  listen(window, "popstate" as keyof DocumentEventMap, introCheck);
  // P-11: no idle polling. Client navigations are seen through the History API (Next's router calls pushState /
  // replaceState), wrapped only while html[data-intro] is still present, then restored.
  if (root.hasAttribute("data-intro")) {
    const h = history;
    const push = h.pushState;
    const replace = h.replaceState;
    let wrapped = true;
    const unwrap = () => {
      if (!wrapped) return;
      wrapped = false;
      if (h.pushState === wrappedPush) h.pushState = push;
      if (h.replaceState === wrappedReplace) h.replaceState = replace;
    };
    const after = () => {
      introCheck();
      if (!root.hasAttribute("data-intro")) unwrap();
    };
    function wrappedPush(this: History, ...a: Parameters<History["pushState"]>) {
      push.apply(this, a);
      after();
    }
    function wrappedReplace(this: History, ...a: Parameters<History["replaceState"]>) {
      replace.apply(this, a);
      after();
    }
    h.pushState = wrappedPush;
    h.replaceState = wrappedReplace;
    cleanups.push(unwrap);
  }

  // ------------------------------------------------------------ magnetic (fine pointer only, max 6 px)
  listen(doc, "pointermove", (e) => {
    if (e.pointerType !== "mouse" || !motionOn() || magnets.size === 0) return;
    const el = (e.target as Element).closest?.<HTMLElement>('[data-motion~="magnetic"]');
    if (!el) return;
    const r = el.getBoundingClientRect();
    const dx = ((e.clientX - (r.left + r.width / 2)) / (r.width / 2)) * DISTANCE.magnetic;
    const dy = ((e.clientY - (r.top + r.height / 2)) / (r.height / 2)) * DISTANCE.magnetic;
    el.style.translate = `${dx.toFixed(1)}px ${dy.toFixed(1)}px`;
  }, { passive: true });
  listen(doc, "pointerout", (e) => {
    const el = (e.target as Element).closest?.<HTMLElement>('[data-motion~="magnetic"]');
    if (el && !el.contains(e.relatedTarget as Node | null)) el.style.translate = "";
  });

  // ------------------------------------------------------------ hover recolor (K-066 / K-075 / K-093)
  type ZoneRuntime = RecolorZoneState & { timer?: number };
  const zones = new WeakMap<HTMLElement, ZoneRuntime>();
  const live = new Set<HTMLElement>();
  const stateOf = (z: HTMLElement) => {
    let s = zones.get(z);
    if (!s) zones.set(z, (s = { active: null, pending: undefined }));
    return s;
  };
  const recolorAllowed = () => {
    const mq = (q: string) => matchMedia(q).matches;
    if (mq("(prefers-contrast: more)") || mq("(forced-colors: active)")) return false;
    // v2 (K-190) + K-231: full and gentle tier both recolour, always with a smooth transition (never instant)
    return motionAny() || root.dataset.recolorReduced === "instant";
  };
  const zoneOf = (el: Element | null): HTMLElement | null => {
    const z = el?.closest?.<HTMLElement>("[data-accent-zone]") ?? null;
    return z && z.dataset.accentZone !== "manual" ? z : null;
  };
  const kindOf = (z: HTMLElement): RecolorZoneKind => {
    const k = z.dataset.accentZone ?? "";
    return (k in RECOLOR.zones ? k : "") as RecolorZoneKind;
  };
  const linked = (z: HTMLElement): HTMLElement[] => {
    const ids = (z.dataset.accentLink ?? "").split(/\s+/).filter(Boolean);
    if (root.hasAttribute("data-recolor-header") && kindOf(z) === "showcase") ids.push("header-accent");
    return ids.map((id) => doc.getElementById(id)).filter((x): x is HTMLElement => !!x && x !== z);
  };
  const commit = (z: HTMLElement, key: string | null) => {
    const s = stateOf(z);
    s.pending = undefined;
    s.timer = undefined;
    const timing = RECOLOR.zones[kindOf(z)];
    const vars = key ? recolorSubset(safeParse(key)) : null;
    for (const el of [z, ...linked(z)]) {
      el.style.setProperty("--recolor-duration", `${vars ? timing.in : timing.out}ms`);
      el.style.setProperty("--recolor-ease", vars ? RECOLOR.easeIn : RECOLOR.easeOut);
      if (vars) applyAccent(el, vars);
      else clearAccent(el);
    }
    s.active = vars ? key : null;
    if (vars) {
      live.add(z);
      z.querySelectorAll('[data-motion-part="breathe"]').forEach((b) =>
        play(b, [{ scale: 1 }, { scale: 1.04, offset: 0.45 }, { scale: 1 }], 640, EASE.inOut),
      );
    } else live.delete(z);
  };
  const target = (z: HTMLElement, key: string | null, focus: boolean) => {
    const s = stateOf(z);
    const t = { intent: RECOLOR.intent, switch: RECOLOR.switch, release: RECOLOR.release };
    const d = focus ? decideRecolorFocus(s, key, t) : decideRecolor(s, key, t);
    if (d.type === "keep") return;
    window.clearTimeout(s.timer);
    s.timer = undefined;
    s.pending = undefined;
    if (d.type === "cancel") return;
    s.pending = d.target;
    if (d.delay <= 0) commit(z, d.target);
    else s.timer = window.setTimeout(() => commit(z, d.target), d.delay);
  };
  const triggerKey = (el: Element, z: HTMLElement): string | null | undefined => {
    const trig = el.closest?.<HTMLElement>("[data-accent],[data-accent-trigger]");
    if (!trig || !z.contains(trig)) return undefined; // gaps between cards: keep the current colour (no flicker)
    return trig.getAttribute("data-accent");
  };
  listen(doc, "pointerover", (e) => {
    if (e.pointerType === "touch" || !recolorAllowed()) return;
    const z = zoneOf(e.target as Element);
    if (!z) return;
    const key = triggerKey(e.target as Element, z);
    if (key !== undefined) target(z, key, false);
  }, { passive: true });
  listen(doc, "pointerout", (e) => {
    if (e.pointerType === "touch") return;
    const z = zoneOf(e.target as Element);
    if (z && !z.contains(e.relatedTarget as Node | null)) target(z, null, false);
  }, { passive: true });
  listen(doc, "focusin", (e) => {
    const el = e.target as Element;
    if (!el.matches?.(":focus-visible") || !recolorAllowed()) return;
    const z = zoneOf(el);
    if (!z) return;
    const key = triggerKey(el, z);
    if (key !== undefined) target(z, key, true);
  });
  listen(doc, "focusout", (e) => {
    const z = zoneOf(e.target as Element);
    if (z && !z.contains(e.relatedTarget as Node | null)) target(z, null, false);
  });

  // ------------------------------------------------------------ DOM changes (client navigation, conditional UI)
  // P-01: nodes GSAP adds by itself are ignored: ScrollTrigger's pin-spacer (and the pinned element it re-wraps), its
  // 100vh measuring div on <body>, and SplitText line wrappers inside a wired heading. Re-scanning them restarted
  // ScrollTrigger.refresh() forever.
  const body = doc.body;
  const foreign = (el: Element) => {
    if (el.classList.contains("pin-spacer") || el.parentElement?.classList.contains("pin-spacer")) return true;
    if (el.parentNode === body && el.tagName === "DIV" && !el.firstElementChild && !el.id && el.classList.length === 0) return true;
    return !!el.parentElement?.closest("[data-split-wired]");
  };
  const mo = new MutationObserver((records) => {
    for (const r of records) {
      r.addedNodes.forEach((n) => {
        if (n.nodeType === 1 && !foreign(n as Element)) {
          scan(n as Element);
          autoReveal(n as Element);
          fx?.scan(n as Element);
        }
      });
    }
    // a zone removed while coloured (navigation from the mega menu): return linked surfaces to the brand theme
    for (const [host, set] of svgHosts) {
      for (const s of set) if (!s.isConnected) set.delete(s);
      if (!host.isConnected || set.size === 0) svgHosts.delete(host);
    }
    for (const z of live) {
      if (!z.isConnected) {
        live.delete(z);
        for (const el of linked(z)) clearAccent(el);
      }
    }
  });
  cleanups.push(() => mo.disconnect());

  // Element-level writes (attributes, inline vars, pathLength) wait until React has hydrated the page:
  // window "load" (the streamed document is complete) + an idle slot. Writing earlier makes React report
  // hydration mismatches. Html-level attributes are safe (<html suppressHydrationWarning>) and are set at once.
  root.setAttribute("data-motion-runtime", "");
  let started = false;
  const begin = () => {
    if (started) return;
    started = true;
    mo.observe(doc.body, { childList: true, subtree: true });
    scan(doc);
    autoReveal(doc);
    syncFx();
    root.setAttribute("data-motion-ready", "");
  };
  const idle = () =>
    typeof window.requestIdleCallback === "function" ? window.requestIdleCallback(begin, { timeout: 700 }) : setTimeout(begin, 200);
  if (doc.readyState === "complete") idle();
  else window.addEventListener("load", idle, { once: true });
  const hard = window.setTimeout(begin, 5000);
  cleanups.push(() => {
    window.clearTimeout(hard);
    window.removeEventListener("load", idle);
  });
  return () => {
    root.removeAttribute("data-motion-runtime");
    root.removeAttribute("data-motion-ready");
    cleanups.forEach((c) => c());
  };
}

function safeParse(raw: string): Record<string, string> | null {
  try {
    return JSON.parse(raw) as Record<string, string>;
  } catch {
    return null;
  }
}
