/**
 * Interactive SVG contract (K-179, K-196). DOM helpers used by the MotionRuntime; the look lives in motion.css.
 * Illustrations: src/components/illustrations/** (ui-tasarimci). Catalogue: /svg-kutuphanesi.
 *
 * Markup:
 *   <svg data-svg-interact="bloom" data-svg="cat-makyaj">     one or more behaviours, space separated
 *     <g data-svg-part="blob" style="--i:0; transform-box:fill-box; transform-origin:50% 50%">…</g>
 *   </svg>
 *
 * Behaviour -> parts it moves (hover / keyboard focus of the host)
 *   bloom    blob|tint grow · accent lifts/opens · sprout|leaves|petal|leaf open from their pivot ·
 *            badge|rosette|letter|center|object|diamond|card|token(s) pop · card-back fans out
 *   sway     leaf|leaves|wreath|stem swing once in --i order · wave slides
 *   draw     stroked shapes inside stroke|frame|stem|lines|signature redraw (lines are never hidden first);
 *            stripe grows from its pivot; leaf|corners|pen pop afterwards
 *   spin     object|rotor turns once (1.6 s) · crumbs|sparkles drift out
 *   parallax every part follows the cursor by depth: branch-back|wave-back|backdrop 0.3, wave-mid|drops|orbit|sun 0.6,
 *            leaves-front|wave-front|sparkles|leaf 1, tile 0.35 (patterns stay subtle); sun also turns 25°
 *   scatter  leaf drifts outward from the centre
 * Any behaviour: an optional glow part fades in (also in the reduced tier: opacity only).
 *
 * Host = closest [data-svg-host] | a[href] | button | [data-product-card] | label | summary, else the svg itself.
 * Touch never triggers; reduced motion and no JS leave the drawing static and complete.
 */

export const SVG_BEHAVIOURS = ["bloom", "sway", "draw", "spin", "parallax", "scatter"] as const;
export type SvgBehaviour = (typeof SVG_BEHAVIOURS)[number];

export const SVG_PARTS = [
  "blob", "tint", "accent", "sprout", "leaves", "petal", "leaf", "stem", "badge", "rosette", "letter", "center",
  "object", "diamond", "card", "card-back", "token", "tokens", "wreath", "wave", "stroke", "frame", "lines",
  "signature", "stripe", "corners", "pen", "rotor", "crumbs", "sparkles", "branch-back", "leaves-front", "drops",
  "orbit", "sun", "wave-back", "wave-mid", "wave-front", "tile", "backdrop", "glow",
  // reference language (2026-11-17)
  "slab", "leaves-back", "leaves-mid", "leaf-front", "segment", "disc", "glyph",
] as const;
export type SvgPart = (typeof SVG_PARTS)[number];

export const SVG_HOST_SELECTOR = "[data-svg-host],a[href],button,[data-product-card],label,summary";

/** Parts whose stroked shapes are drawn by the "draw" behaviour. */
const DRAW_PARTS = '[data-svg-part="stroke"],[data-svg-part="frame"],[data-svg-part="stem"],[data-svg-part="lines"],[data-svg-part="signature"]';
/** Parts that open/drift away from the drawing's centre (direction vars). */
const DIRECTIONAL = new Set(["petal", "leaf", "leaves", "sprout", "crumbs", "sparkles"]);
const SHAPES = "path,line,polyline,polygon,circle,rect,ellipse";

/** Spread helper with typo protection: <svg {...svgInteract("bloom", "draw")}>. */
export function svgInteract(...b: SvgBehaviour[]): { "data-svg-interact": string } {
  return { "data-svg-interact": b.join(" ") };
}
/** <g {...svgPart("leaf")}> */
export function svgPart(part: SvgPart): { "data-svg-part": SvgPart } {
  return { "data-svg-part": part };
}

/**
 * One-time preparation (client, AFTER hydration — the runtime defers it): outward direction for opening/drifting
 * parts and pathLength=1 on drawable strokes. Writes only CSS vars / presentation attributes, never geometry.
 */
export function prepareSvg(svg: SVGSVGElement): void {
  const kinds = (svg.getAttribute("data-svg-interact") ?? "").split(/\s+/);
  let box: DOMRect | null = null;
  try {
    box = svg.getBBox() as DOMRect;
  } catch {
    box = null;
  }
  if (box && box.width > 0) {
    const cx = box.x + box.width / 2;
    const cy = box.y + box.height / 2;
    const span = Math.max(box.width, box.height) / 2 || 1;
    svg.querySelectorAll<SVGGraphicsElement>("[data-svg-part]").forEach((part, i) => {
      if (!DIRECTIONAL.has(part.getAttribute("data-svg-part") ?? "")) return;
      try {
        const b = part.getBBox();
        const m = part.getCTM();
        const sm = svg.getCTM();
        // centre of the part in the svg's user space (parts are often inside translated/rotated groups)
        let px = b.x + b.width / 2;
        let py = b.y + b.height / 2;
        if (m && sm) {
          const p = new DOMPoint(px, py).matrixTransform(sm.inverse().multiply(m));
          px = p.x;
          py = p.y;
        }
        const dx = (px - cx) / span;
        const dy = (py - cy) / span;
        const len = Math.hypot(dx, dy) || 1;
        part.style.setProperty("--svg-dx", (dx / len).toFixed(3));
        part.style.setProperty("--svg-dy", (dy / len).toFixed(3));
        part.style.setProperty("--svg-side", dx < -0.05 ? "-1" : dx > 0.05 ? "1" : i % 2 ? "1" : "-1");
      } catch {
        /* not rendered (display:none) — CSS defaults apply */
      }
    });
  }
  if (kinds.includes("draw")) {
    const groups = Array.from(svg.querySelectorAll(DRAW_PARTS));
    let i = 0;
    for (const g of groups) {
      const shapes = g.matches(SHAPES) ? [g] : Array.from(g.querySelectorAll(SHAPES));
      for (const s of shapes) {
        const st = getComputedStyle(s).stroke;
        if (!st || st === "none") continue;
        s.setAttribute("pathLength", "1");
        s.setAttribute("data-svg-drawable", "");
        (s as SVGElement).style.setProperty("--svg-i", String(Math.min(i++, 8)));
      }
    }
  }
}

/** Host element whose hover/focus drives the svg. */
export function svgHostOf(svg: Element): Element {
  const host = svg.parentElement?.closest(SVG_HOST_SELECTOR);
  if (host) return host;
  // decorative svgs are often pointer-events:none: the nearest ancestor that receives the pointer is the host
  let n: Element | null = svg;
  while (n && n.parentElement && getComputedStyle(n).pointerEvents === "none") n = n.parentElement;
  return n ?? svg;
}
