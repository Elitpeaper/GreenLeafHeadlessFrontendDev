import { useId } from "react";
import { C, Drop, Leaf, Part, Svg, ink, leafD, sparkD, type IllustrationProps } from "./base";

/**
 * Large decorative scenes. Place behind/next to text, never under body copy without a panel.
 * Each is lean (< 6 kB rendered) and token-coloured, so hover-recolor and premium themes repaint them.
 */

/** 12 sun rays as one path (keeps the hero under 6 kB). */
const RAYS_D = Array.from({ length: 12 }, (_, k) => {
  const a = (k * Math.PI) / 6;
  const p = (r: number) => `${Math.round(610 + r * Math.sin(a))} ${Math.round(150 - r * Math.cos(a))}`;
  return `M${p(96)}L${p(122)}`;
}).join("");

/** Hero layers: sun rays, back branch, front leaves, water drops. interact=parallax (parts move at different depths). */
export function SceneHeroBotanical({ interact = "parallax", ...p }: IllustrationProps) {
  return (
    <Svg viewBox="0 0 800 600" name="scene-hero-botanical" interact={interact} {...p}>
      <Part n="sun" o="50% 50%">
        <circle cx="610" cy="150" r="74" fill={C.lime} fillOpacity={0.2} />
        <circle cx="610" cy="150" r="44" fill={C.lime} fillOpacity={0.28} />
        <path d={RAYS_D} stroke={C.lime} strokeOpacity={0.55} strokeWidth={6} strokeLinecap="round" />
      </Part>
      <Part n="branch-back" i={1} o="0% 100%">
        <path d="M90 600C150 470 250 330 420 250" stroke={C.green} strokeOpacity={0.7} strokeWidth={6} strokeLinecap="round" />
        <Leaf x={150} y={480} r={-20} l={120} w={40} fill={C.green} o={0.55} vein />
        <Leaf x={190} y={420} r={58} l={110} w={36} fill={C.lime} o={0.6} vein />
        <Leaf x={250} y={350} r={-8} l={130} w={42} fill={C.blue} o={0.45} vein />
        <Leaf x={320} y={295} r={70} l={100} w={34} fill={C.green} o={0.6} />
        <Leaf x={380} y={265} r={20} l={90} w={30} fill={C.lime} o={0.6} />
      </Part>
      <Part n="leaves-front" i={2} o="100% 100%">
        <Leaf x={760} y={640} r={-72} l={330} w={96} fill={C.blue} o={0.42} vein />
        <Leaf x={760} y={640} r={-42} l={360} w={104} fill={C.green} o={0.62} vein />
        <Leaf x={760} y={640} r={-14} l={300} w={90} fill={C.lime} o={0.62} vein />
      </Part>
      <Part n="drops" i={3}>
        <Drop x={470} y={360} r={16} />
        <Drop x={540} y={430} r={10} fill={C.green} />
        <Drop x={420} y={460} r={8} />
        <Drop x={300} y={170} r={11} />
        <Drop x={700} y={330} r={7} fill={C.green} />
      </Part>
      <Part n="sparkles" i={4}>
        <g fill={C.lime} fillOpacity={0.8}>
          <path d={sparkD(12)} transform="translate(500 210)" />
          <path d={sparkD(8)} transform="translate(230 250)" />
          <circle cx="360" cy="420" r="5" />
          <circle cx="660" cy="270" r="4" />
        </g>
      </Part>
    </Svg>
  );
}

/** PV explainer: shopping bag that sprouts leaves + a rising stack of point tokens (no currency, K-015). */
export function ScenePv({ interact = "bloom", ...p }: IllustrationProps) {
  return (
    <Svg viewBox="0 0 480 360" name="scene-pv" interact={interact} {...p}>
      <Part n="backdrop">
        <ellipse cx="240" cy="200" rx="210" ry="140" fill={C.soft} />
      </Part>
      <Part n="sprout" i={1} o="50% 100%">
        <Leaf x={240} y={150} r={-38} l={112} w={34} fill={C.green} o={0.7} vein />
        <Leaf x={240} y={150} r={0} l={138} w={40} fill={C.lime} o={0.7} vein />
        <Leaf x={240} y={150} r={36} l={110} w={34} fill={C.blue} o={0.55} vein />
      </Part>
      <Part n="bag" i={2} o="50% 100%">
        <path d="M150 150h180l-14 170H164Z" fill="#FFFFFF" />
        <path d="M157 250h166l-6 70H164Z" fill={C.soft} />
        <g {...ink} strokeWidth={3}>
          <path d="M150 150h180l-14 170H164Z" />
          <path d="M200 150v-18a40 40 0 0 1 80 0v18" />
        </g>
        <g strokeWidth={6} strokeLinecap="round">
          <path d="M210 230h18" stroke={C.green} />
          <path d="M234 230h12" stroke={C.lime} />
          <path d="M252 230h16" stroke={C.blue} />
        </g>
      </Part>
      <Part n="tokens" i={3} o="50% 100%">
        {[0, 1, 2, 3].map((k) => (
          <g key={k} data-svg-part="token" style={{ ["--i" as string]: k }}>
            <ellipse cx="398" cy={304 - k * 24} rx="44" ry="14" fill={k % 2 ? C.lime : C.green} fillOpacity={0.55} stroke="currentColor" strokeWidth={2.5} />
          </g>
        ))}
        <Leaf x={398} y={240} r={-30} l={18} w={7} fill={C.green} o={0.9} />
        <Leaf x={398} y={240} r={30} l={15} w={6} fill={C.blue} o={0.8} />
        {[0, 1].map((k) => (
          <ellipse key={k} cx="84" cy={312 - k * 22} rx="38" ry="12" fill={C.blue} fillOpacity={0.4} stroke="currentColor" strokeWidth={2.5} />
        ))}
      </Part>
      <Part n="sparkles" i={4}>
        <g fill={C.lime}>
          <path d={sparkD(10)} transform="translate(360 120)" />
          <path d={sparkD(7)} transform="translate(110 150)" />
          <path d={sparkD(6)} transform="translate(440 190)" />
        </g>
      </Part>
    </Svg>
  );
}

/** Membership: tilted member card with straight brand stripe, check badge, leaves behind. */
export function SceneMembership({ interact = "bloom", ...p }: IllustrationProps) {
  return (
    <Svg viewBox="0 0 480 360" name="scene-membership" interact={interact} {...p}>
      <Part n="leaves" o="50% 100%">
        <Leaf x={120} y={330} r={-40} l={210} w={64} fill={C.green} o={0.55} vein />
        <Leaf x={120} y={330} r={-8} l={180} w={56} fill={C.lime} o={0.55} vein />
        <Leaf x={380} y={340} r={30} l={190} w={60} fill={C.blue} o={0.45} vein />
      </Part>
      <Part n="card-back" i={1}>
        <rect x="126" y="96" width="260" height="160" rx="22" fill={C.line} transform="rotate(6 256 176)" />
      </Part>
      <Part n="card" i={2}>
        <g transform="rotate(-5 240 190)">
          <rect x="110" y="110" width="260" height="160" rx="22" fill="#FFFFFF" stroke="currentColor" strokeWidth={3} />
          <path d="M132 136h40" stroke={C.green} strokeWidth={8} strokeLinecap="round" />
          <path d="M180 136h24" stroke={C.lime} strokeWidth={8} strokeLinecap="round" />
          <path d="M212 136h32" stroke={C.blue} strokeWidth={8} strokeLinecap="round" />
          <circle cx="160" cy="200" r="26" fill={C.soft} stroke="currentColor" strokeWidth={2.5} />
          <Leaf x={160} y={214} r={-10} l={26} w={10} fill={C.green} o={0.85} />
          <g stroke="currentColor" strokeOpacity={0.35} strokeWidth={6} strokeLinecap="round">
            <path d="M202 190h110M202 212h74M132 246h90" />
          </g>
        </g>
      </Part>
      <Part n="badge" i={3} o="50% 50%">
        <circle cx="356" cy="250" r="30" fill={C.solid} />
        <path d="m342 251 9 9 18-19" stroke="#FFFFFF" strokeWidth={5} strokeLinecap="round" strokeLinejoin="round" />
      </Part>
      <Part n="sparkles" i={4}>
        <g fill={C.lime}>
          <path d={sparkD(10)} transform="translate(400 90)" />
          <path d={sparkD(7)} transform="translate(90 120)" />
        </g>
      </Part>
    </Svg>
  );
}

/** Premium gold ornament frame (premium-gold theme only, K-065). Double hairline, leaf-curl corners, leaf-diamond crests. */
export function ScenePremiumFrame({ interact = "draw", ...p }: IllustrationProps) {
  const gid = `${useId()}-g`;
  const g = `url(#${gid})`;
  const corner = (
    <g stroke={g} strokeWidth={2} strokeLinecap="round" fill="none">
      <path d="M22 96C22 50 50 22 96 22" />
      <path d="M34 70c6-20 18-32 36-36" />
      <path d={leafD(30, 10)} transform="translate(40 40) rotate(-45)" fill={C.gold300} fillOpacity={0.35} />
      <circle cx="22" cy="22" r="4" fill={C.gold400} stroke="none" />
    </g>
  );
  const crest = (
    <g>
      <path d="M-70 0H-26M26 0H70" stroke={g} strokeWidth={1.5} />
      <path d={leafD(24, 9)} transform="rotate(-90)" fill={C.gold400} fillOpacity={0.8} />
      <path d={leafD(24, 9)} transform="rotate(90)" fill={C.gold300} fillOpacity={0.8} />
      <circle r="3.5" fill={C.gold500} />
    </g>
  );
  return (
    <Svg viewBox="0 0 400 500" name="scene-premium-frame" interact={interact} {...p}>
      <defs>
        <linearGradient id={gid} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#8A6A1F" />
          <stop offset=".3" stopColor="#C9A24B" />
          <stop offset=".5" stopColor="#F3E7C4" />
          <stop offset=".7" stopColor="#D9B45A" />
          <stop offset="1" stopColor="#8A6A1F" />
        </linearGradient>
      </defs>
      <Part n="frame">
        <rect x="12" y="12" width="376" height="476" rx="6" stroke={g} strokeWidth={1.5} />
        <rect x="20" y="20" width="360" height="460" rx="3" stroke={g} strokeWidth={1} />
      </Part>
      <Part n="corners" i={1}>
        {corner}
        <g transform="matrix(-1 0 0 1 400 0)">{corner}</g>
        <g transform="matrix(1 0 0 -1 0 500)">{corner}</g>
        <g transform="matrix(-1 0 0 -1 400 500)">{corner}</g>
      </Part>
      <Part n="crest-top" i={2}>
        <g transform="translate(200 20)">{crest}</g>
      </Part>
      <Part n="crest-bottom" i={3}>
        <g transform="translate(200 480)">{crest}</g>
      </Part>
    </Svg>
  );
}

/** Skin-type finder: a fan of different leaf shapes (skin types) under a lens, with drops. */
export function SceneFinderLeaves({ interact = "sway", ...p }: IllustrationProps) {
  const fan = [
    { r: -60, l: 150, w: 70, f: C.blue },
    { r: -32, l: 190, w: 40, f: C.green },
    { r: -4, l: 210, w: 62, f: C.lime },
    { r: 26, l: 180, w: 30, f: C.green },
    { r: 54, l: 140, w: 56, f: C.blue },
  ];
  return (
    <Svg viewBox="0 0 480 360" name="scene-finder-leaves" interact={interact} {...p}>
      <Part n="backdrop">
        <circle cx="210" cy="200" r="150" fill={C.soft} />
      </Part>
      {fan.map((f, k) => (
        <Part key={k} n="leaf" i={k} o="50% 100%">
          <Leaf x={200} y={340} r={f.r} l={f.l} w={f.w} fill={f.f} o={0.6} vein />
        </Part>
      ))}
      <Part n="lens" i={5}>
        <circle cx="330" cy="150" r="66" fill="#FFFFFF" fillOpacity={0.5} stroke="currentColor" strokeWidth={6} />
        <path d="M300 160c14-30 40-44 64-46M318 176c10-14 24-22 40-24" stroke={C.green} strokeWidth={3} strokeLinecap="round" />
        <path d="M378 198l52 52" stroke="currentColor" strokeWidth={12} strokeLinecap="round" />
      </Part>
      <Part n="drops" i={6}>
        <Drop x={110} y={110} r={12} />
        <Drop x={420} y={320} r={9} fill={C.green} />
        <Drop x={70} y={250} r={7} />
      </Part>
    </Svg>
  );
}

/** Blog / news: open journal, page lines, leaves growing from the spine, a pen. */
export function SceneBlog({ interact = "bloom", ...p }: IllustrationProps) {
  return (
    <Svg viewBox="0 0 480 360" name="scene-blog" interact={interact} {...p}>
      <Part n="backdrop">
        <ellipse cx="240" cy="220" rx="220" ry="120" fill={C.soft} />
      </Part>
      <Part n="leaves" i={1} o="50% 100%">
        <Leaf x={240} y={130} r={-42} l={110} w={34} fill={C.green} o={0.65} vein />
        <Leaf x={240} y={130} r={-6} l={130} w={38} fill={C.lime} o={0.65} vein />
        <Leaf x={240} y={130} r={34} l={100} w={32} fill={C.blue} o={0.5} vein />
      </Part>
      <Part n="book" i={2}>
        <path d="M240 140c-40-16-90-18-140-8v170c50-10 100-8 140 8 40-16 90-18 140-8V132c-50-10-100-8-140 8Z" fill="#FFFFFF" />
        <rect x="262" y="160" width="96" height="58" rx="8" fill={C.line} />
        <Leaf x={310} y={210} r={-20} l={40} w={14} fill={C.green} o={0.8} />
        <g {...ink} strokeWidth={3}>
          <path d="M240 140c-40-16-90-18-140-8v170c50-10 100-8 140 8 40-16 90-18 140-8V132c-50-10-100-8-140 8Zm0 0v170" />
        </g>
      </Part>
      <Part n="lines" i={3}>
        <g stroke="currentColor" strokeOpacity={0.4} strokeWidth={5} strokeLinecap="round">
          <path d="M122 168h94M122 192h94M122 216h70M122 240h94M122 264h56M266 244h88M266 268h64" />
        </g>
      </Part>
      <Part n="pen" i={4} o="0% 100%">
        <g transform="rotate(-35 420 270)">
          <rect x="404" y="170" width="18" height="100" rx="5" fill={C.green} fillOpacity={0.5} stroke="currentColor" strokeWidth={3} />
          <path d="M404 270l9 22 9-22" fill="#FFFFFF" stroke="currentColor" strokeWidth={3} strokeLinejoin="round" />
        </g>
      </Part>
    </Svg>
  );
}
