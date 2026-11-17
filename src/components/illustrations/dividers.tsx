import { C, Drop, Leaf, Part, Svg, leafD, type IllustrationProps } from "./base";

/**
 * Section dividers. Wave dividers are SURFACE transitions (fill = currentColor = next section background),
 * not the signature stripe (tasarim-kurallari §9.1/§9.5). Use full width: `className="block w-full h-12 text-surface-muted"`.
 * `flip` mirrors vertically (use at the top edge of a section).
 */
type DividerProps = IllustrationProps & { flip?: boolean };

const flipT = (flip: boolean | undefined, h: number) => (flip ? `matrix(1 0 0 -1 0 ${h})` : undefined);

/** Single soft wave. */
export function DividerWave({ flip, interact = "sway", ...p }: DividerProps) {
  return (
    <Svg viewBox="0 0 1440 80" preserveAspectRatio="none" name="divider-wave" interact={interact} {...p}>
      <Part n="wave" o="50% 100%" transform={flipT(flip, 80)}>
        <path d="M0 40C240 0 480 0 720 30S1200 80 1440 30V80H0Z" fill="currentColor" />
      </Part>
    </Svg>
  );
}

/** Three translucent tinted waves (green / blue / lime, multiply) settling into the solid next surface. */
export function DividerWaveLayers({ flip, interact = "parallax", ...p }: DividerProps) {
  return (
    <Svg viewBox="0 0 1440 120" preserveAspectRatio="none" name="divider-wave-layers" interact={interact} {...p}>
      <g transform={flipT(flip, 120)}>
        <Part n="wave-back" o="50% 100%">
          <path d="M0 50C200 10 420 20 640 56S1100 110 1440 40V120H0Z" fill={C.blue} fillOpacity={0.18} style={{ mixBlendMode: "multiply" }} />
        </Part>
        <Part n="wave-mid" i={1} o="50% 100%">
          <path d="M0 70C260 30 520 30 780 66S1220 96 1440 60V120H0Z" fill={C.green} fillOpacity={0.2} style={{ mixBlendMode: "multiply" }} />
        </Part>
        <Part n="wave-front" i={2} o="50% 100%">
          <path d="M0 80C300 56 560 100 860 86S1260 64 1440 78V120H0Z" fill={C.lime} fillOpacity={0.22} style={{ mixBlendMode: "multiply" }} />
        </Part>
        <path d="M0 100C320 84 620 112 940 100S1300 88 1440 98V120H0Z" fill="currentColor" />
      </g>
    </Svg>
  );
}

const VINE = Array.from({ length: 11 }, (_, k) => k);

/** Hairline vine with alternating small leaves (draw on hover/scroll). */
export function DividerLeafVine({ interact = "draw", ...p }: IllustrationProps) {
  const cols = [C.green, C.lime, C.blue];
  return (
    <Svg viewBox="0 0 1200 60" name="divider-leaf-vine" interact={interact} {...p}>
      <Part n="stem">
        <path d="M20 30C120 14 220 46 320 30S520 14 620 30 820 46 920 30 1120 14 1180 30" stroke={C.green} strokeOpacity={0.7} strokeWidth={2} strokeLinecap="round" />
      </Part>
      {VINE.map((k) => (
        <Part key={k} n="leaf" i={k} o="50% 100%">
          <Leaf x={100 + k * 100} y={30} r={k % 2 ? 140 : -40} l={22} w={8} fill={cols[k % 3]!} o={0.75} />
        </Part>
      ))}
    </Svg>
  );
}

/** Centre leaf-diamond (two leaves tip-to-tip) with hairlines. tone="gold" only inside premium-gold surfaces. */
export function DividerLeafDiamond({ tone = "brand", interact = "bloom", ...p }: IllustrationProps & { tone?: "brand" | "gold" }) {
  const gold = tone === "gold";
  const a = gold ? C.gold400 : C.green;
  const b = gold ? C.gold300 : C.blue;
  return (
    <Svg viewBox="0 0 600 40" name="divider-leaf-diamond" interact={interact} {...p}>
      <Part n="lines">
        <path d="M40 20H262M338 20H560" stroke={gold ? C.gold400 : C.line} strokeWidth={2} strokeLinecap="round" />
      </Part>
      <Part n="diamond" i={1}>
        <path d={leafD(30, 10)} transform="translate(300 20) rotate(-90)" fill={a} fillOpacity={0.8} style={{ mixBlendMode: "multiply" }} />
        <path d={leafD(30, 10)} transform="translate(300 20) rotate(90)" fill={b} fillOpacity={0.7} style={{ mixBlendMode: "multiply" }} />
        <circle cx="300" cy="20" r="3.5" fill={gold ? C.gold500 : C.solid} />
        <circle cx="250" cy="20" r="2.5" fill={a} />
        <circle cx="350" cy="20" r="2.5" fill={a} />
      </Part>
    </Svg>
  );
}

/** Straight three-colour stripe (brand order, separate bars — never a gradient) ending in a growing leaf. */
export function DividerStripeLeaf({ interact = "draw", ...p }: IllustrationProps) {
  return (
    <Svg viewBox="0 0 1200 48" name="divider-stripe-leaf" interact={interact} {...p}>
      <Part n="stripe" o="0% 50%">
        <rect x="0" y="12" width="1120" height="8" rx="4" fill="var(--stripe-1)" />
        <rect x="0" y="24" width="1120" height="5" rx="2.5" fill="var(--stripe-2)" />
        <rect x="0" y="33" width="1120" height="6" rx="3" fill="var(--stripe-3)" />
      </Part>
      <Part n="leaf" i={1} o="0% 50%">
        <Leaf x={1128} y={26} r={70} l={58} w={18} fill={C.green} o={0.8} vein />
        <Leaf x={1128} y={26} r={110} l={44} w={14} fill={C.blue} o={0.6} />
      </Part>
    </Svg>
  );
}

const DROPS = [
  { x: 420, r: 4, c: C.green },
  { x: 480, r: 6, c: C.blue },
  { x: 545, r: 8, c: C.lime },
  { x: 600, r: 11, c: C.blue },
  { x: 655, r: 8, c: C.green },
  { x: 720, r: 6, c: C.blue },
  { x: 780, r: 4, c: C.lime },
];

/** Row of water drops swelling to the centre, with fading dots. */
export function DividerDrops({ interact = "parallax", ...p }: IllustrationProps) {
  return (
    <Svg viewBox="0 0 1200 60" name="divider-drops" interact={interact} {...p}>
      <Part n="dots">
        <g fill={C.green} fillOpacity={0.35}>
          {[200, 250, 300, 350, 850, 900, 950, 1000].map((x) => (
            <circle key={x} cx={x} cy="38" r={x < 600 ? (x - 150) / 70 : (1050 - x) / 70} />
          ))}
        </g>
      </Part>
      {DROPS.map((d, k) => (
        <Part key={d.x} n="drop" i={k} o="50% 100%">
          <Drop x={d.x} y={38} r={d.r} fill={d.c} o={0.65} />
        </Part>
      ))}
    </Svg>
  );
}
