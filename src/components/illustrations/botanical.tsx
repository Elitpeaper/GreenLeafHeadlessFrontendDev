import { useId } from "react";
import { C, Part, Svg, leafD, type IllustrationProps } from "./base";

/**
 * Paper-cut botanical set (v1.2, K-185 / K-187). Reference language: large layered realistic leaves with
 * depth (drop shadow between layers), visible vein structure, forest + earth + sand tones.
 * Original drawing — the reference image is never traced or reused (K-102, K-185).
 *
 * Unlike the translucent brand leaves (base.tsx `Leaf`, multiply) these are OPAQUE paper layers:
 * each layer casts a soft shadow onto the one below. Use on forest grounds (showcase surface mode).
 */

export type LeafSpecies = "oval" | "lance" | "heart" | "skeleton";
export type LeafTone = "forest" | "deep" | "green" | "sand" | "earth";

const r1 = (n: number) => Math.round(n * 10) / 10;

/** Approximate half-width of leafD at length fraction t (0 = base, 1 = tip). */
const halfW = (w: number, t: number) => w * 0.7 * Math.sin(Math.PI * Math.pow(t, 0.8));

type Vein = { y: number; c: [number, number]; e: [number, number] };

function secondaries(l: number, w: number, n: number, spread: number): Vein[] {
  return Array.from({ length: n }, (_, k) => {
    const t = ((k + 1) / (n + 1)) * 0.88 + 0.04;
    const t2 = Math.min(t + 0.15, 0.96);
    const ex = halfW(w, t2) * spread;
    return { y: -t * l, c: [ex * 0.42, -t * l - l * 0.035], e: [ex, -t2 * l] };
  });
}

/** Midrib + mirrored pinnate secondary veins as one path. */
function pinnateD(l: number, w: number, n: number, spread = 0.86) {
  let d = `M0 0V${r1(-l * 0.96)}`;
  for (const v of secondaries(l, w, n, spread)) {
    for (const s of [1, -1]) d += `M0 ${r1(v.y)}Q${r1(s * v.c[0])} ${r1(v.c[1])} ${r1(s * v.e[0])} ${r1(v.e[1])}`;
  }
  return d;
}

/** Tertiary net for the skeleton leaf: short links between neighbouring secondaries. */
function netD(l: number, w: number, n: number) {
  const vs = secondaries(l, w, n, 0.86);
  const at = (v: Vein, s: number, side: number) => {
    const a = (1 - s) * (1 - s), b = 2 * (1 - s) * s, c = s * s;
    return [side * (b * v.c[0] + c * v.e[0]), a * v.y + b * v.c[1] + c * v.e[1]] as const;
  };
  let d = "";
  for (let k = 0; k < vs.length - 1; k++) {
    for (const side of [1, -1]) {
      for (const s of [0.35, 0.7]) {
        const p = at(vs[k]!, s, side), q = at(vs[k + 1]!, s + 0.08, side);
        d += `M${r1(p[0])} ${r1(p[1])}L${r1(q[0])} ${r1(q[1])}`;
      }
    }
  }
  return d;
}

/** Heart (cordate) outline, petiole at (0,0), tip at (0,-l). */
const heartD = (l: number, w: number) =>
  `M0 0C${r1(w * 0.45)} ${r1(l * 0.08)} ${r1(w)} ${r1(-l * 0.1)} ${r1(w * 0.9)} ${r1(-l * 0.42)}C${r1(w * 0.78)} ${r1(-l * 0.72)} ${r1(w * 0.3)} ${r1(-l * 0.9)} 0 ${-l}C${r1(-w * 0.3)} ${r1(-l * 0.9)} ${r1(-w * 0.78)} ${r1(-l * 0.72)} ${r1(-w * 0.9)} ${r1(-l * 0.42)}C${r1(-w)} ${r1(-l * 0.1)} ${r1(-w * 0.45)} ${r1(l * 0.08)} 0 0Z`;

/** Right half of leafD (shaded side; light comes from top-left). */
const halfD = (l: number, w: number) => `M0 0C${r1(w)} ${r1(-l * 0.3)} ${r1(w * 0.9)} ${r1(-l * 0.75)} 0 ${-l}Z`;

const TONES: Record<LeafTone, { fill: string; vein: string; veinO: number; shade: number }> = {
  forest: { fill: C.forest5, vein: C.cream100, veinO: 0.38, shade: 0.2 },
  deep: { fill: C.forest7, vein: C.cream100, veinO: 0.26, shade: 0.24 },
  green: { fill: C.green, vein: C.cream50, veinO: 0.42, shade: 0.18 },
  sand: { fill: C.sand300, vein: C.earth6, veinO: 0.55, shade: 0.14 },
  earth: { fill: C.earth6, vein: C.sand300, veinO: 0.5, shade: 0.22 },
};

export type PaperLeafProps = {
  species: LeafSpecies;
  tone: LeafTone;
  x: number;
  y: number;
  /** rotation in degrees; 0 = tip points up */
  r?: number;
  l: number;
  w: number;
  /** filter id for the paper-cut shadow (from <PaperShadow />) */
  shadow?: string;
  /** stem length below the base (0 = none) */
  stem?: number;
};

/** One opaque paper leaf with shading and vein detail. Building block for compositions. */
export function PaperLeaf({ species, tone, x, y, r = 0, l, w, shadow, stem = 0 }: PaperLeafProps) {
  const t = TONES[tone];
  const outline = species === "heart" ? heartD(l, w) : leafD(l, w);
  const n = species === "lance" ? 9 : species === "skeleton" ? 9 : species === "heart" ? 5 : 7;
  const spread = species === "heart" ? 0.95 : 0.86;
  const veinW = Math.max(1, w / 40);
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`} filter={shadow ? `url(#${shadow})` : undefined}>
      {stem > 0 && <path d={`M0 ${stem}V0`} stroke={t.vein} strokeOpacity={0.7} strokeWidth={veinW * 2} strokeLinecap="round" />}
      <path d={outline} fill={t.fill} />
      <path d={halfD(l, w)} fill="#0A2A18" fillOpacity={t.shade} />
      <g stroke={t.vein} strokeOpacity={t.veinO} strokeLinecap="round" fill="none">
        <path d={pinnateD(l, w, n, spread)} strokeWidth={veinW} />
        {species === "skeleton" && <path d={netD(l, w, n)} strokeWidth={veinW * 0.6} />}
      </g>
      {species === "skeleton" && <path d={outline} fill="none" stroke={C.earth5} strokeOpacity={0.5} strokeWidth={veinW * 0.8} />}
    </g>
  );
}

/** Paper-cut shadow filter (light from top-left). Render once inside <defs>. */
export function PaperShadow({ id, d = 1 }: { id: string; d?: number }) {
  return (
    <filter id={id} x="-25%" y="-25%" width="160%" height="160%" colorInterpolationFilters="sRGB">
      <feDropShadow dx={6 * d} dy={10 * d} stdDeviation={8 * d} floodColor="#0A2A18" floodOpacity={0.35} />
    </filter>
  );
}

/**
 * Hero depth composition for the right side of a forest-ground hero slide.
 * Layers (data-svg-part, back -> front): slab, leaves-back, leaves-mid, leaf-front. interact=parallax.
 * Place absolutely on the right half; keep text on the left (never over this drawing).
 */
export function SceneHeroLeaves({ interact = "parallax", ...p }: IllustrationProps) {
  const sh = `${useId()}-ps`;
  return (
    <Svg viewBox="0 0 720 640" name="scene-hero-leaves" interact={interact} {...p}>
      <defs>
        <PaperShadow id={sh} />
      </defs>
      <Part n="slab" o="100% 0%">
        <path d="M290 0H720V640H560C500 430 400 200 290 0Z" fill={C.earth6} filter={`url(#${sh})`} />
        <path d="M520 0H720V300C640 210 570 110 520 0Z" fill={C.earth8} />
      </Part>
      <Part n="leaves-back" i={1} o="100% 0%">
        <PaperLeaf species="oval" tone="deep" x={690} y={-20} r={208} l={330} w={100} shadow={sh} stem={30} />
        <PaperLeaf species="oval" tone="forest" x={520} y={-30} r={190} l={290} w={88} shadow={sh} />
        <PaperLeaf species="lance" tone="forest" x={740} y={170} r={250} l={300} w={60} shadow={sh} />
      </Part>
      <Part n="leaves-mid" i={2} o="50% 100%">
        <PaperLeaf species="oval" tone="forest" x={735} y={420} r={-80} l={310} w={96} shadow={sh} />
        <PaperLeaf species="heart" tone="green" x={470} y={330} r={-35} l={190} w={84} shadow={sh} stem={24} />
        <PaperLeaf species="lance" tone="sand" x={250} y={600} r={-18} l={330} w={72} shadow={sh} stem={40} />
      </Part>
      <Part n="leaf-front" i={3} o="100% 100%">
        <PaperLeaf species="skeleton" tone="sand" x={700} y={680} r={-48} l={520} w={150} shadow={sh} />
      </Part>
    </Svg>
  );
}

type SpecimenProps = IllustrationProps & { tone?: LeafTone };

function Specimen({ species, tone, name, interact = "sway", l = 300, w = 90, ...p }: SpecimenProps & { species: LeafSpecies; name: string; l?: number; w?: number }) {
  const sh = `${useId()}-ps`;
  return (
    <Svg viewBox="0 0 240 400" name={name} interact={interact} {...p}>
      <defs>
        <PaperShadow id={sh} d={0.7} />
      </defs>
      <Part n="leaf" o="50% 100%">
        <PaperLeaf species={species} tone={tone ?? "forest"} x={120} y={360} l={l} w={w} shadow={sh} stem={28} />
      </Part>
    </Svg>
  );
}

/** Single leaves for custom layering (slide variants, tiles, page heroes). `tone` picks the paper colour. */
export const LeafOvalSpecimen = (p: SpecimenProps) => <Specimen species="oval" name="leaf-oval" {...p} />;
export const LeafLanceSpecimen = (p: SpecimenProps) => <Specimen species="lance" name="leaf-lance" l={320} w={58} {...p} tone={p.tone ?? "sand"} />;
export const LeafHeartSpecimen = (p: SpecimenProps) => <Specimen species="heart" name="leaf-heart" l={270} w={110} {...p} tone={p.tone ?? "green"} />;
export const LeafSkeletonSpecimen = (p: SpecimenProps) => <Specimen species="skeleton" name="leaf-skeleton" l={320} w={104} {...p} tone={p.tone ?? "sand"} />;
