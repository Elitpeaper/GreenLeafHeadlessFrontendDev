import { useId, type ReactNode } from "react";
import { C, Svg, dropD, leafD, type IllustrationProps } from "./base";

/**
 * Tileable background patterns. They fill their box: put them in an absolutely positioned layer
 * (`<div class="pointer-events-none absolute inset-0 -z-10">`). `strength` = layer opacity (rules: 0.04–0.10 visible weight).
 * Shapes stay inside the tile so edges never cut a motif.
 */
type PatternProps = IllustrationProps & { strength?: number };

function Pattern({ name, w, h, strength = 0.1, interact = "parallax", children, ...p }: PatternProps & { name: string; w: number; h: number; children: ReactNode }) {
  const id = `${useId()}-p`;
  return (
    <Svg name={name} interact={interact} width="100%" height="100%" {...p}>
      <defs>
        <pattern id={id} width={w} height={h} patternUnits="userSpaceOnUse">
          {children}
        </pattern>
      </defs>
      <g data-svg-part="tile" style={{ ["--i" as string]: 0 }}>
        <rect width="100%" height="100%" fill={`url(#${id})`} opacity={strength} />
      </g>
    </Svg>
  );
}

const L = (x: number, y: number, r: number, f: string, l = 22, w = 8) => (
  <path d={leafD(l, w)} transform={`translate(${x} ${y}) rotate(${r})`} fill={f} />
);

/** Scattered small leaves in brand colours (120 px tile). */
export const PatternLeafScatter = (p: PatternProps) => (
  <Pattern name="pattern-leaf-scatter" w={120} h={120} {...p}>
    {L(24, 40, -30, C.green)}
    {L(84, 34, 40, C.lime, 18, 7)}
    {L(56, 98, 110, C.blue, 20, 7)}
    {L(104, 96, -70, C.green, 14, 5)}
  </Pattern>
);

/** Half-drop seed dots (32 px tile) — quietest texture, safe behind text panels. */
export const PatternSeedDots = (p: PatternProps) => (
  <Pattern name="pattern-seed-dots" w={32} h={32} strength={0.18} {...p}>
    <circle cx="8" cy="8" r="2" fill={C.green} />
    <circle cx="24" cy="24" r="1.6" fill={C.lime} />
  </Pattern>
);

/** Line-art leaf outlines, half-drop (80 px tile). Uses currentColor. */
export const PatternLeafLines = (p: PatternProps) => (
  <Pattern name="pattern-leaf-lines" w={80} h={80} {...p}>
    <g stroke="currentColor" strokeWidth={1.5} fill="none" strokeLinecap="round">
      <path d={leafD(26, 9)} transform="translate(18 34) rotate(-35)" />
      <path d="M0 0V-22" transform="translate(18 34) rotate(-35)" />
      <path d={leafD(26, 9)} transform="translate(58 74) rotate(35)" />
      <path d="M0 0V-22" transform="translate(58 74) rotate(35)" />
    </g>
  </Pattern>
);

/** Small water drops (96 px tile). */
export const PatternDrops = (p: PatternProps) => (
  <Pattern name="pattern-drops" w={96} h={96} {...p}>
    <path d={dropD(6)} transform="translate(20 30)" fill={C.blue} />
    <path d={dropD(4)} transform="translate(66 22)" fill={C.green} />
    <path d={dropD(5)} transform="translate(50 78)" fill={C.blue} />
    <circle cx="84" cy="62" r="2" fill={C.lime} />
  </Pattern>
);

/** Pinnate vein skeleton of one leaf (midrib + 6 pairs), base at (0,0), tip up. */
const VEINS = (() => {
  let d = "M0 0V-92";
  for (let k = 1; k <= 6; k++) {
    const y = -k * 13;
    const ex = 30 * Math.sin((Math.PI * k) / 7.5);
    d += `M0 ${y}Q${(ex * 0.45).toFixed(1)} ${y - 4} ${ex.toFixed(1)} ${y - 15}M0 ${y}Q${(-ex * 0.45).toFixed(1)} ${y - 4} ${(-ex).toFixed(1)} ${y - 15}`;
  }
  return d;
})();

/**
 * Embossed leaf veins (v1.2, K-186) — the reference's felt ground with pressed vein lines.
 * Each vein is drawn twice: a dark groove (forest-950, offset down-right) and a light ridge (cream, offset up-left).
 * Only for forest/earth grounds. 180 px half-drop tile; `strength` 0.5–0.9 (strokes are already low-contrast).
 */
export const PatternLeafVeinEmboss = ({ strength = 0.7, ...p }: PatternProps) => (
  <Pattern name="pattern-leaf-vein-emboss" w={180} h={180} strength={strength} {...p}>
    {[
      [46, 120, -28],
      [136, 190, 32],
      [136, 10, 32],
    ].map(([x, y, r], k) => (
      <g key={k} transform={`translate(${x} ${y}) rotate(${r})`} fill="none" strokeLinecap="round">
        <path d={leafD(100, 38)} transform="translate(1.2 1.6)" stroke="#0A2A18" strokeOpacity={0.45} strokeWidth={2} />
        <path d={VEINS} transform="translate(1.2 1.6)" stroke="#0A2A18" strokeOpacity={0.4} strokeWidth={1.6} />
        <path d={leafD(100, 38)} stroke={C.cream100} strokeOpacity={0.16} strokeWidth={1.4} />
        <path d={VEINS} stroke={C.cream100} strokeOpacity={0.14} strokeWidth={1.1} />
      </g>
    ))}
  </Pattern>
);
