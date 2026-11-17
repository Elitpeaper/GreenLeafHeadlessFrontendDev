import { useId, type CSSProperties, type ReactNode, type SVGProps } from "react";

/**
 * Greenleaf SVG illustration library — shared primitives (owner: ui-tasarimci, K-175 / K-179).
 *
 * Contract for every illustration:
 * - Root <svg> carries `data-svg-interact` (bloom | sway | draw | spin | parallax). hareket-tasarimcisi binds the
 *   hover behaviour to it; without JS/CSS the drawing is static and complete.
 * - Moving groups carry `data-svg-part="<name>"`, a stagger index `--i`, and a pivot (transform-box: fill-box).
 * - Colours come from runtime accent tokens, so hover-recolor zones (K-066) and the premium theme repaint them.
 *   Line work uses `currentColor` (defaults to ink via the parent's text colour).
 * - Decorative by default (`aria-hidden`). Pass `title` when the drawing carries meaning -> role="img".
 * - The Greenleaf mark / pinwheel is never drawn. Leaves only *echo* its translucent, overlapping language.
 */

export type SvgInteract = "bloom" | "sway" | "draw" | "spin" | "parallax";

export type IllustrationProps = Omit<SVGProps<SVGSVGElement>, "children" | "viewBox"> & {
  /** Accessible name. When omitted the illustration is aria-hidden. */
  title?: string;
  /** Override the default hover behaviour hook. */
  interact?: SvgInteract;
};

/** Runtime token colours. Accent vars are always declared in :root (tokens.css); gold keeps fallbacks because Tailwind may tree-shake unused theme vars. */
export const C = {
  green: "var(--accent-decor)",
  blue: "var(--accent-decor-2)",
  lime: "var(--accent-decor-3)",
  soft: "var(--accent-soft)",
  line: "var(--accent-line)",
  solid: "var(--accent)",
  deep: "var(--accent-deep)",
  white: "#FFFFFF",
  gold300: "var(--color-gold-300, #E9CF8A)",
  gold400: "var(--color-gold-400, #D9B45A)",
  gold500: "var(--color-gold-500, #C9A24B)",
  gold700: "var(--color-gold-700, #8A6A1F)",
  forest: "var(--color-forest-900, #0F3B22)",
  // v1.2 reference palette (K-186). Fallbacks because unused theme vars may be tree-shaken.
  forest5: "var(--color-forest-500, #2E8A55)",
  forest6: "var(--color-forest-600, #226E45)",
  forest7: "var(--color-forest-700, #1A5A3A)",
  forest8: "var(--color-forest-800, #14482F)",
  forest95: "var(--color-forest-950, #0A2A18)",
  cream50: "var(--color-cream-50, #FBF7EF)",
  cream100: "var(--color-cream-100, #F6EEDF)",
  cream200: "var(--color-cream-200, #EFDFC3)",
  sand300: "var(--color-sand-300, #E2C49E)",
  sand400: "var(--color-sand-400, #CFA77A)",
  earth5: "var(--color-earth-500, #9C6B45)",
  earth6: "var(--color-earth-600, #875A39)",
  earth7: "var(--color-earth-700, #6F462B)",
  earth8: "var(--color-earth-800, #573521)",
  earth9: "var(--color-earth-900, #3F2618)",
  green7: "var(--color-green-700, #2F7A22)",
  green8: "var(--color-green-800, #245F1A)",
} as const;

/** Leaf outline with its base at (0,0) pointing up (-y). */
export const leafD = (l: number, w: number) =>
  `M0 0C${w} ${-l * 0.3} ${w * 0.9} ${-l * 0.75} 0 ${-l}C${-w * 0.9} ${-l * 0.75} ${-w} ${-l * 0.3} 0 0Z`;

/** Water drop centred on its round bottom at (0,0), tip pointing up. */
export const dropD = (r: number) =>
  `M0 ${-r * 1.9}C${r * 0.55} ${-r * 1.05} ${r} ${-r * 0.55} ${r} 0A${r} ${r} 0 0 1 ${-r} 0C${-r} ${-r * 0.55} ${-r * 0.55} ${-r * 1.05} 0 ${-r * 1.9}Z`;

/** Four-point sparkle centred at (0,0). */
export const sparkD = (r: number) => `M0 ${-r}Q${r * 0.18} ${-r * 0.18} ${r} 0Q${r * 0.18} ${r * 0.18} 0 ${r}Q${-r * 0.18} ${r * 0.18} ${-r} 0Q${-r * 0.18} ${-r * 0.18} 0 ${-r}Z`;

const MULTIPLY: CSSProperties = { mixBlendMode: "multiply" };

type LeafProps = {
  x: number;
  y: number;
  r?: number;
  l: number;
  w: number;
  fill: string;
  o?: number;
  vein?: boolean;
  stroke?: string;
};

/** A translucent brand leaf. Overlaps darken via multiply (brandbook leaf language). */
export function Leaf({ x, y, r = 0, l, w, fill, o = 0.7, vein, stroke }: LeafProps) {
  return (
    <g transform={`translate(${x} ${y}) rotate(${r})`}>
      <path d={leafD(l, w)} fill={fill} fillOpacity={o} style={MULTIPLY} stroke={stroke} strokeWidth={stroke ? 2 : undefined} />
      {vein && <path d={`M0 0V${-l * 0.86}`} stroke="#FFFFFF" strokeOpacity={0.45} strokeWidth={Math.max(1.5, w / 14)} strokeLinecap="round" />}
    </g>
  );
}

/** Drop with a highlight. */
export function Drop({ x, y, r, fill = C.blue, o = 0.55 }: { x: number; y: number; r: number; fill?: string; o?: number }) {
  return (
    <g transform={`translate(${x} ${y})`}>
      <path d={dropD(r)} fill={fill} fillOpacity={o} style={MULTIPLY} />
      <path d={`M${-r * 0.45} ${-r * 0.1}a${r * 0.5} ${r * 0.5} 0 0 1 ${r * 0.3} ${-r * 0.5}`} stroke="#FFFFFF" strokeWidth={Math.max(1.2, r / 5)} strokeLinecap="round" fill="none" />
    </g>
  );
}

type PartProps = {
  /** data-svg-part name — motion hooks target this. */
  n: string;
  /** Stagger index (exposed as --i). */
  i?: number;
  /** Pivot inside the group's own box, e.g. "50% 100%" for a leaf base. */
  o?: string;
  children: ReactNode;
} & Omit<SVGProps<SVGGElement>, "children" | "style">;

/** Animated group. transform-box: fill-box makes `o` relative to the group itself. */
export function Part({ n, i = 0, o = "50% 50%", children, ...rest }: PartProps) {
  const style = { "--i": i, transformBox: "fill-box", transformOrigin: o } as CSSProperties;
  return (
    <g data-svg-part={n} style={style} {...rest}>
      {children}
    </g>
  );
}

type SvgProps = IllustrationProps & { viewBox?: string; interact: SvgInteract; name: string; children: ReactNode };

/** Root element shared by every illustration. */
export function Svg({ title, interact, viewBox, name, children, style, ...rest }: SvgProps) {
  const id = useId();
  const titleId = `${id}-t`;
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      fill="none"
      data-svg={name}
      data-svg-interact={interact}
      role={title ? "img" : undefined}
      aria-hidden={title ? undefined : true}
      aria-labelledby={title ? titleId : undefined}
      focusable="false"
      style={{ isolation: "isolate", overflow: "visible", ...style }}
      {...rest}
    >
      {title && <title id={titleId}>{title}</title>}
      {children}
    </svg>
  );
}

/** Line-art defaults: currentColor, round caps. */
export const ink = {
  stroke: "currentColor",
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;
