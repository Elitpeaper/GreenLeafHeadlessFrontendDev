import { cssVars } from "@/lib/css";

/**
 * Decorative motif — an ABSTRACT derivative of the brand's leaf language
 * (translucent leaves overlapping, darker where they intersect). Deliberately NOT a pinwheel
 * and NOT a redraw of the logo mark: leaves fan upward from one stem point like a sprout.
 */
type Leaf = { rotate: number; scale: number; fill: string; delay: number };

const LEAF_PATH = "M0 0 C 46 -52 50 -150 0 -214 C -50 -150 -46 -52 0 0 Z";

const LEAVES: Leaf[] = [
  { rotate: -58, scale: 0.78, fill: "var(--color-brand-blue)", delay: 0 },
  { rotate: -28, scale: 1, fill: "var(--color-brand-green)", delay: -3 },
  { rotate: 4, scale: 1.12, fill: "var(--color-brand-lime)", delay: -6 },
  { rotate: 34, scale: 0.95, fill: "var(--color-brand-blue)", delay: -9 },
  { rotate: 62, scale: 0.74, fill: "var(--color-brand-green)", delay: -12 },
];

export function LeafCluster({ className = "", tone = "color" }: { className?: string; tone?: "color" | "onDark" }) {
  const onDark = tone === "onDark";
  return (
    <svg viewBox="-260 -270 520 290" className={className} style={{ isolation: "isolate" }} aria-hidden="true" focusable="false">
      {LEAVES.map((leaf, i) => (
        <g key={i} transform={`rotate(${leaf.rotate}) scale(${leaf.scale})`}>
          <path
            d={LEAF_PATH}
            fill={leaf.fill}
            fillOpacity={onDark ? 0.28 : 0.7}
            className="anim-sway"
            style={{ mixBlendMode: onDark ? "screen" : "multiply", ...cssVars({ "--d": `${leaf.delay}s` }) }}
          />
        </g>
      ))}
    </svg>
  );
}
