import { useId } from "react";
import { C, Part, Svg, type IllustrationProps } from "./base";

/**
 * Surfaces from the K-185 reference, drawn in-house (v1.2, K-186 / K-188):
 * - TextureGrain: felt / paper grain overlay (static feTurbulence, soft-light).
 * - PanelLeafSegments: deep rounded panel ground split into leaf-shaped segments.
 * Both are background layers: `<div class="pointer-events-none absolute inset-0">`. Text sits on the panel's own
 * ground colour; the overlays are capped so they never move text contrast by more than ~0.2 (rules §9.6).
 */

type GrainProps = IllustrationProps & {
  /** Layer opacity. Forest grounds 0.10–0.16, cream/sand 0.05–0.08. */
  strength?: number;
  /** Noise frequency: higher = finer (paper), lower = coarser (felt). */
  grain?: number;
};

/** Felt/paper grain. One static filter, rendered once by the browser; do not animate. */
export function TextureGrain({ strength = 0.12, grain = 0.85, interact = "parallax", style, ...p }: GrainProps) {
  const id = `${useId()}-g`;
  return (
    <Svg name="texture-grain" interact={interact} width="100%" height="100%" preserveAspectRatio="none" style={{ mixBlendMode: "soft-light", ...style }} {...p}>
      <filter id={id} x="0" y="0" width="100%" height="100%">
        <feTurbulence type="fractalNoise" baseFrequency={grain} numOctaves={2} stitchTiles="stitch" />
        <feColorMatrix type="saturate" values="0" />
        <feComponentTransfer>
          <feFuncA type="linear" slope={1.6} intercept={-0.2} />
        </feComponentTransfer>
      </filter>
      <rect width="100%" height="100%" filter={`url(#${id})`} opacity={strength * 3} />
    </Svg>
  );
}

type PanelProps = IllustrationProps & {
  /** Number of columns/segments (matches the content grid). 2–5. */
  segments?: number;
  /** Ground: forest (default) or earth. */
  tone?: "forest" | "earth";
};

/**
 * Leaf-segment panel ground: each column carries a large pointed-arch leaf, slightly lighter than the ground,
 * with a faint midrib — the reference's "panel split into leaf segments". Stretches to the container
 * (preserveAspectRatio none; strokes stay hairline via vector-effect). Pair with radius.panel + shadow.long.
 * Text on it: cream-100 (forest-700: 7.09) / white; lighter segment fill adds < 0.04 luminance.
 */
export function PanelLeafSegments({ segments = 4, tone = "forest", interact = "draw", ...p }: PanelProps) {
  const id = useId();
  const n = Math.min(5, Math.max(2, segments));
  const W = 1000, H = 400, cw = W / n;
  const [a, b] = tone === "earth" ? [C.earth7, C.earth8] : [C.forest7, C.forest8];
  return (
    <Svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" name="panel-leaf-segments" interact={interact} width="100%" height="100%" {...p}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width={W} height={H} fill={`url(#${id}-bg)`} />
      {Array.from({ length: n }, (_, k) => {
        const cx = cw * k + cw / 2;
        const half = cw * 0.62;
        const d = `M${cx} ${H * 0.04}C${cx + half * 0.55} ${H * 0.3} ${cx + half} ${H * 0.62} ${cx + half * 0.9} ${H + 20}H${cx - half * 0.9}C${cx - half} ${H * 0.62} ${cx - half * 0.55} ${H * 0.3} ${cx} ${H * 0.04}Z`;
        return (
          <Part key={k} n="segment" i={k} o="50% 100%">
            <path d={d} fill="#FFFFFF" fillOpacity={k % 2 ? 0.035 : 0.055} stroke={C.cream100} strokeOpacity={0.16} strokeWidth={1} vectorEffect="non-scaling-stroke" />
            <path d={`M${cx} ${H * 0.1}V${H}`} stroke={C.cream100} strokeOpacity={0.07} strokeWidth={1} vectorEffect="non-scaling-stroke" />
          </Part>
        );
      })}
    </Svg>
  );
}
