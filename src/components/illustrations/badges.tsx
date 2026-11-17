import { useId } from "react";
import { C, Part, Svg, type IllustrationProps } from "./base";

/**
 * Circular icon badges (v1.2, K-188) — the reference's round, softly shadowed medallions that crown each tile.
 * 96-unit grid, glyph = thin line icon (stroke 3 ≈ 1.75 px at 56 px). The badge is decorative (aria-hidden);
 * the tile title carries the meaning. Glyph vs badge ground >= 3:1 (non-text, 1.4.11) for every tone.
 *
 * Tones: forest (cream glyph 9.1+), green (white 5.35+), earth (cream 5.13+), ink (cream 12+), sand (earth-900 6.30+),
 * cream (forest-800 9.1+), accent (follows --accent / --on-accent: recolor + premium themes).
 */

export type BadgeGlyph = "leaf" | "sprout" | "drop" | "pv" | "member" | "certificate" | "book" | "set" | "jar";
export type BadgeTone = "forest" | "green" | "earth" | "ink" | "sand" | "cream" | "accent";

const GLYPH: Record<BadgeGlyph, string> = {
  leaf: "M34 62C34 44 46 32 64 32C64 50 52 62 34 62ZM34 62L54 42",
  sprout: "M48 66V47M48 50C48 40 40 34 31 34C31 44 39 50 48 50ZM48 46C48 38 55 32 65 32C65 42 58 46 48 46ZM37 66H59",
  drop: "M48 29C54 39 62 47 62 56A14 14 0 0 1 34 56C34 47 42 39 48 29ZM41 56A7 7 0 0 0 48 63",
  pv: "M34 40a14 5 0 1 0 28 0a14 5 0 1 0-28 0M34 40v8a14 5 0 0 0 28 0v-8M34 48v8a14 5 0 0 0 28 0v-8M34 56v6a14 5 0 0 0 28 0v-6",
  member: "M30 36h36a4 4 0 0 1 4 4v20a4 4 0 0 1-4 4H30a4 4 0 0 1-4-4V40a4 4 0 0 1 4-4ZM33 56h14M33 50h8M62 42c-7 0-10 5-10 12 7 0 10-5 10-12ZM52 54l5-5",
  certificate: "M48 30a12 12 0 1 1 0 24a12 12 0 1 1 0-24ZM42 52l-5 14 6-3 4 5 1-9M54 52l5 14-6-3-4 5-1-9M44 42l3 3 6-6",
  book: "M48 38c-5-4-12-5-18-4v28c6-1 13 0 18 4 5-4 12-5 18-4V34c-6-1-13 0-18 4ZM48 38v28",
  set: "M48 28l17 10v20L48 68 31 58V38ZM40 44h16M40 50h16M40 56h16",
  jar: "M36 44h24v18a4 4 0 0 1-4 4H40a4 4 0 0 1-4-4ZM34 34h28v10H34ZM44 58c0-5 3-8 8-9 0 5-3 9-8 9Z",
};

const TONE: Record<BadgeTone, { from: string; to: string; glyph: string }> = {
  forest: { from: C.forest6, to: C.forest8, glyph: C.cream100 },
  green: { from: C.green7, to: C.green8, glyph: "#FFFFFF" },
  earth: { from: C.earth6, to: C.earth8, glyph: C.cream100 },
  ink: { from: "#3A3D3B", to: "#1A1D1B", glyph: C.cream100 },
  sand: { from: C.sand300, to: C.sand400, glyph: C.earth9 },
  cream: { from: C.cream50, to: C.cream200, glyph: C.forest8 },
  accent: { from: "var(--accent)", to: "var(--accent-hover)", glyph: "var(--on-accent)" },
};

export type IconBadgeProps = IllustrationProps & { glyph?: BadgeGlyph; tone?: BadgeTone };

/** Round medallion with a soft long shadow (bottom-right) and a top-left rim light. */
export function IconBadge({ glyph = "leaf", tone = "forest", interact = "spin", ...p }: IconBadgeProps) {
  const id = useId();
  const t = TONE[tone];
  return (
    <Svg viewBox="0 0 112 112" name={`badge-${glyph}`} interact={interact} {...p}>
      <defs>
        <linearGradient id={`${id}-f`} x1="0.15" y1="0.1" x2="0.85" y2="0.95">
          <stop offset="0" stopColor={t.from} />
          <stop offset="1" stopColor={t.to} />
        </linearGradient>
        <filter id={`${id}-s`} x="-30%" y="-30%" width="170%" height="170%" colorInterpolationFilters="sRGB">
          <feDropShadow dx={7} dy={10} stdDeviation={7} floodColor="#0A2A18" floodOpacity={0.45} />
        </filter>
      </defs>
      <Part n="disc" o="50% 50%">
        <circle cx="48" cy="48" r="40" fill={`url(#${id}-f)`} filter={`url(#${id}-s)`} />
        <path d="M18 40A31 31 0 0 1 40 18" stroke="#FFFFFF" strokeOpacity={0.35} strokeWidth={2} strokeLinecap="round" />
        <circle cx="48" cy="48" r="37" stroke="#FFFFFF" strokeOpacity={0.12} strokeWidth={1.5} />
      </Part>
      <Part n="glyph" i={1} o="50% 50%">
        <path d={GLYPH[glyph]} stroke={t.glyph} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
      </Part>
    </Svg>
  );
}

/** Catalogue/demo presets (one per glyph, mapped to the tile it usually crowns). */
export const BadgeLeaf = (p: IllustrationProps) => <IconBadge glyph="leaf" tone="green" {...p} />;
export const BadgeSprout = (p: IllustrationProps) => <IconBadge glyph="sprout" tone="forest" {...p} />;
export const BadgeDrop = (p: IllustrationProps) => <IconBadge glyph="drop" tone="cream" {...p} />;
export const BadgePv = (p: IllustrationProps) => <IconBadge glyph="pv" tone="ink" {...p} />;
export const BadgeMember = (p: IllustrationProps) => <IconBadge glyph="member" tone="earth" {...p} />;
export const BadgeCertificate = (p: IllustrationProps) => <IconBadge glyph="certificate" tone="sand" {...p} />;
export const BadgeBook = (p: IllustrationProps) => <IconBadge glyph="book" tone="earth" {...p} />;
export const BadgeSet = (p: IllustrationProps) => <IconBadge glyph="set" tone="sand" {...p} />;
export const BadgeJar = (p: IllustrationProps) => <IconBadge glyph="jar" tone="cream" {...p} />;
