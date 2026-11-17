/**
 * Palette -> accent token resolution (tokens.json › paletteDerivation, K-066, hover-recolor.md §4).
 *
 * Pure, dependency-free, server-side only by convention: the data layer resolves every product palette at
 * build/render time and ships the finished CSS var values to the client. The browser never runs this.
 * Unit tests: palette.test.ts (`npm test`).
 *
 * Guarantee: every TEXT pair in the result is >= TARGET_RATIO (4.6, i.e. 4.5 + rounding margin).
 * If the guarantee cannot be met the function returns null and the caller falls back to the brand theme.
 */

export const TARGET_RATIO = 4.6;
/** Ratio that must hold at every intermediate point of a hover transition (WCAG AA). */
export const TRANSITION_MIN_RATIO = 4.5;

const WHITE = "#FFFFFF";
const INK = "#333533";
const INK_DEEP = "#1A1D1B";

export interface PaletteInput {
  primary: string;
  secondary?: string | null;
  tertiary?: string | null;
  onPrimary?: string | null;
}

/** Accent CSS vars produced for a palette. Keys are CSS custom property names. */
export interface AccentVars {
  "--accent-decor": string;
  "--accent-decor-2": string;
  "--accent-decor-3": string;
  "--accent": string;
  "--accent-hover": string;
  "--on-accent": string;
  "--accent-text": string;
  "--accent-soft": string;
  "--accent-line": string;
  "--accent-deep": string;
  "--on-accent-deep": string;
  "--accent-on-deep": string;
  "--stripe-1": string;
  "--stripe-2": string;
  "--stripe-3": string;
}

export type AccentVarName = keyof AccentVars;

export interface ResolvedPalette {
  vars: AccentVars;
  /** Contrast ratios of all text pairs, rounded to 2 decimals. */
  checks: {
    "on-accent/accent": number;
    "on-accent/accent-hover": number;
    "accent-text/surface": number;
    "accent-text/accent-soft": number;
    "ink/accent-soft": number;
    "on-accent-deep/accent-deep": number;
    "accent-on-deep/accent-deep": number;
  };
}

/** Brand defaults of the recolorable vars (tokens.json › themes.default). Used as transition start point in tests/guards. */
export const DEFAULT_ACCENT: Pick<AccentVars, "--accent-text" | "--accent-soft"> = {
  "--accent-text": "#2F7A22",
  "--accent-soft": "#F1F8EE",
};

// ---------------------------------------------------------------- color math

type RGB = [number, number, number];

export function parseHex(hex: string): RGB | null {
  const m = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i.exec(hex.trim());
  if (!m || !m[1]) return null;
  let h = m[1];
  if (h.length === 3) h = h.replace(/./g, (c) => c + c);
  const n = parseInt(h, 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

export function toHex([r, g, b]: RGB): string {
  const c = (v: number) => Math.round(Math.min(255, Math.max(0, v))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`.toUpperCase();
}

const srgbToLinear = (c: number) => {
  const s = c / 255;
  return s <= 0.04045 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
};
const linearToSrgb = (c: number) => {
  const s = c <= 0.0031308 ? c * 12.92 : 1.055 * c ** (1 / 2.4) - 0.055;
  return s * 255;
};

export function luminance(hex: string): number {
  const rgb = parseHex(hex);
  if (!rgb) throw new Error(`palette: invalid color ${hex}`);
  const [r, g, b] = rgb.map(srgbToLinear) as RGB;
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

/** WCAG 2.x contrast ratio. */
export function contrast(a: string, b: string): number {
  const la = luminance(a);
  const lb = luminance(b);
  const [hi, lo] = la > lb ? [la, lb] : [lb, la];
  return (hi + 0.05) / (lo + 0.05);
}

/** sRGB mix: t = 0 -> a, t = 1 -> b. */
export function mix(a: string, b: string, t: number): string {
  const A = parseHex(a);
  const B = parseHex(b);
  if (!A || !B) throw new Error(`palette: invalid color ${a} / ${b}`);
  return toHex([A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t]);
}

// Oklab — CSS Color 4 interpolates registered <color> transitions in Oklab, so guards test both spaces.
function toOklab(hex: string): RGB {
  const rgb = parseHex(hex);
  if (!rgb) throw new Error(`palette: invalid color ${hex}`);
  const [r, g, b] = rgb.map(srgbToLinear) as RGB;
  const l = Math.cbrt(0.4122214708 * r + 0.5363325363 * g + 0.0514459929 * b);
  const m = Math.cbrt(0.2119034982 * r + 0.6806995451 * g + 0.1073969566 * b);
  const s = Math.cbrt(0.0883024619 * r + 0.2817188376 * g + 0.6299787005 * b);
  return [
    0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s,
    1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s,
    0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s,
  ];
}
function fromOklab([L, A, B]: RGB): string {
  const l = (L + 0.3963377774 * A + 0.2158037573 * B) ** 3;
  const m = (L - 0.1055613458 * A - 0.0638541728 * B) ** 3;
  const s = (L - 0.0894841775 * A - 1.291485548 * B) ** 3;
  return toHex([
    linearToSrgb(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
    linearToSrgb(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
    linearToSrgb(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
  ]);
}
export function mixOklab(a: string, b: string, t: number): string {
  const A = toOklab(a);
  const B = toOklab(b);
  return fromOklab([A[0] + (B[0] - A[0]) * t, A[1] + (B[1] - A[1]) * t, A[2] + (B[2] - A[2]) * t]);
}

/** Moves `color` toward `target` in 2% steps until `ok` holds. Returns null if it never does. */
function stepToward(color: string, target: string, ok: (c: string) => boolean): string | null {
  for (let i = 0; i <= 50; i++) {
    const c = mix(color, target, i * 0.02);
    if (ok(c)) return c;
  }
  return null;
}

const round2 = (n: number) => Math.round(n * 100) / 100;

// ---------------------------------------------------------------- derivation

/**
 * Derives the accent vars for a product/collection palette.
 * @returns null when the palette is invalid or a text pair cannot reach `target` — caller uses the brand theme.
 */
export function resolvePalette(input: PaletteInput | null | undefined, target = TARGET_RATIO): ResolvedPalette | null {
  if (!input || !parseHex(input.primary)) return null;
  const primary = toHex(parseHex(input.primary)!);
  const valid = (c: string | null | undefined) => (c && parseHex(c) ? toHex(parseHex(c)!) : null);

  const decor = primary;
  const decor2 = valid(input.secondary) ?? mix(primary, WHITE, 0.35);
  const decor3 = valid(input.tertiary) ?? mix(primary, WHITE, 0.55);
  const soft = mix(WHITE, primary, 0.1);
  const line = mix(WHITE, primary, 0.3);

  // --accent / --on-accent
  let accent = primary;
  let onAccent: string;
  const preferred = valid(input.onPrimary);
  if (preferred && contrast(primary, preferred) >= target) onAccent = preferred;
  else if (contrast(primary, WHITE) >= target) onAccent = WHITE;
  else if (luminance(primary) > 0.3 && contrast(primary, INK) >= target) onAccent = INK;
  else {
    const darker = stepToward(primary, INK_DEEP, (c) => contrast(c, WHITE) >= target);
    if (!darker) return null;
    accent = darker;
    onAccent = WHITE;
  }

  // --accent-hover: darker for light text, lighter for dark text; must keep on-accent >= target.
  const onIsLight = luminance(onAccent) > 0.5;
  const hoverTarget = onIsLight ? INK_DEEP : WHITE;
  const hoverStart = mix(accent, hoverTarget, onIsLight ? 0.12 : 0.1);
  const accentHover = contrast(hoverStart, onAccent) >= target
    ? hoverStart
    : stepToward(hoverStart, onIsLight ? INK_DEEP : WHITE, (c) => contrast(c, onAccent) >= target);
  if (!accentHover) return null;

  const accentText = stepToward(primary, INK_DEEP, (c) => contrast(c, WHITE) >= target && contrast(c, soft) >= target);
  if (!accentText) return null;

  const deep = stepToward(primary, INK_DEEP, (c) => contrast(c, WHITE) >= 10);
  if (!deep) return null;
  const onDeepCandidate = mix(primary, WHITE, 0.6);
  const accentOnDeep = contrast(onDeepCandidate, deep) >= target ? onDeepCandidate : WHITE;

  const vars: AccentVars = {
    "--accent-decor": decor,
    "--accent-decor-2": decor2,
    "--accent-decor-3": decor3,
    "--accent": accent,
    "--accent-hover": accentHover,
    "--on-accent": onAccent,
    "--accent-text": accentText,
    "--accent-soft": soft,
    "--accent-line": line,
    "--accent-deep": deep,
    "--on-accent-deep": WHITE,
    "--accent-on-deep": accentOnDeep,
    "--stripe-1": primary,
    "--stripe-2": decor3,
    "--stripe-3": decor2,
  };

  const checks: ResolvedPalette["checks"] = {
    "on-accent/accent": round2(contrast(onAccent, accent)),
    "on-accent/accent-hover": round2(contrast(onAccent, accentHover)),
    "accent-text/surface": round2(contrast(accentText, WHITE)),
    "accent-text/accent-soft": round2(contrast(accentText, soft)),
    "ink/accent-soft": round2(contrast(INK, soft)),
    "on-accent-deep/accent-deep": round2(contrast(WHITE, deep)),
    "accent-on-deep/accent-deep": round2(contrast(accentOnDeep, deep)),
  };
  // Final guard (rounding can only lower values marginally; compare unrounded).
  const pairs: Array<[string, string]> = [
    [onAccent, accent],
    [onAccent, accentHover],
    [accentText, WHITE],
    [accentText, soft],
    [INK, soft],
    [accentOnDeep, deep],
  ];
  if (pairs.some(([a, b]) => contrast(a, b) < target)) return null;
  return { vars, checks };
}

/**
 * Minimum text contrast seen during a hover transition from `from` to `to` (accent-text on accent-soft and on white),
 * sampled at t = 0, .25, .5, .75, 1 in both sRGB and Oklab interpolation.
 */
export function transitionMinContrast(
  from: Pick<AccentVars, "--accent-text" | "--accent-soft">,
  to: Pick<AccentVars, "--accent-text" | "--accent-soft">,
): number {
  let min = Infinity;
  for (const mixer of [mix, mixOklab]) {
    for (const t of [0, 0.25, 0.5, 0.75, 1]) {
      const text = mixer(from["--accent-text"], to["--accent-text"], t);
      const soft = mixer(from["--accent-soft"], to["--accent-soft"], t);
      min = Math.min(min, contrast(text, soft), contrast(text, WHITE));
    }
  }
  return min;
}

/** Serialises vars into a React `style` object (only the recolorable subset if `only` is given). */
export function accentStyle(vars: Partial<AccentVars>, only?: readonly AccentVarName[]): Record<string, string> {
  const out: Record<string, string> = {};
  for (const [k, v] of Object.entries(vars)) {
    if (v && (!only || (only as readonly string[]).includes(k))) out[k] = v;
  }
  return out;
}
