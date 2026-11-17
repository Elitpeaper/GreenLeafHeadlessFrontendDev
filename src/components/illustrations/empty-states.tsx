import type { ReactNode } from "react";
import { C, Leaf, Part, Svg, ink, sparkD, type IllustrationProps, type SvgInteract } from "./base";

/**
 * 10 "Çok yakında" / empty-state illustrations (K-181, K-182). Shared 240×200 stage:
 *   backdrop (soft blob + ground line) · object (the subject, ink line art + tint) · leaves (two sprigs) · sparkles.
 * Pair every illustration with a heading + one clear action in text — the drawing never carries the message alone.
 * Render 160–240 px wide.
 */
function EmptyStage({ name, interact, object, extra, ...p }: IllustrationProps & { name: string; interact: SvgInteract; object: ReactNode; extra?: ReactNode }) {
  return (
    <Svg viewBox="0 0 240 200" name={name} interact={interact} {...p}>
      <Part n="backdrop">
        <path d="M44 120c-10-52 30-92 84-94 52-2 84 34 74 84-8 42-40 62-82 62-40 0-70-16-76-52Z" fill={C.soft} />
        <path d="M36 176h168" stroke={C.line} strokeWidth={3} strokeLinecap="round" />
      </Part>
      <Part n="leaves" i={1} o="50% 100%">
        <Leaf x={52} y={176} r={-34} l={44} w={14} fill={C.green} o={0.65} />
        <Leaf x={52} y={176} r={-4} l={34} w={11} fill={C.lime} o={0.7} />
        <Leaf x={190} y={176} r={28} l={38} w={12} fill={C.blue} o={0.5} />
      </Part>
      <Part n="object" i={2} o="50% 100%">
        {object}
      </Part>
      {extra}
      <Part n="sparkles" i={4}>
        <g fill={C.lime}>
          <path d={sparkD(7)} transform="translate(196 44)" />
          <path d={sparkD(5)} transform="translate(42 60)" />
        </g>
      </Part>
    </Svg>
  );
}

const W = "#FFFFFF";

/** KVKK / privacy: shield with a padlock. */
export const EmptyShield = ({ interact = "bloom", ...p }: IllustrationProps) => (
  <EmptyStage
    name="empty-kvkk-shield"
    interact={interact}
    object={
      <>
        <path d="M120 34l48 17v35c0 34-21 55-48 66-27-11-48-32-48-66V51Z" fill={W} />
        <path d="M120 48l34 12v26c0 24-15 40-34 48Z" fill={C.soft} />
        <rect x="103" y="92" width="34" height="27" rx="6" fill={C.solid} />
        <circle cx="120" cy="104" r="4" fill={W} />
        <g {...ink} strokeWidth={3}>
          <path d="M120 34l48 17v35c0 34-21 55-48 66-27-11-48-32-48-66V51Z" />
          <path d="M109 92v-8a11 11 0 0 1 22 0v8" />
        </g>
      </>
    }
    {...p}
  />
);

/** Cookie policy: a cookie with a bite, leaf-shaped chips. interact=spin. */
export const EmptyCookie = ({ interact = "spin", ...p }: IllustrationProps) => (
  <EmptyStage
    name="empty-cookie"
    interact={interact}
    object={
      <>
        <path d="M170 92a52 52 0 1 1-30-46 12 12 0 0 0 12 16 11 11 0 0 0 18 30Z" fill={C.lime} fillOpacity={0.3} />
        <path d="M170 92a52 52 0 1 1-30-46 12 12 0 0 0 12 16 11 11 0 0 0 18 30Z" {...ink} strokeWidth={3} />
        <Leaf x={100} y={84} r={-30} l={16} w={6} fill={C.green} o={0.9} />
        <Leaf x={132} y={124} r={40} l={14} w={5} fill={C.green} o={0.9} />
        <Leaf x={96} y={128} r={100} l={12} w={5} fill={C.blue} o={0.8} />
        <circle cx="124" cy="92" r="4" fill="currentColor" fillOpacity={0.55} />
        <circle cx="146" cy="106" r="3" fill="currentColor" fillOpacity={0.55} />
        <circle cx="114" cy="62" r="3" fill="currentColor" fillOpacity={0.55} />
      </>
    }
    extra={
      <Part n="crumbs" i={3}>
        <g fill={C.lime} fillOpacity={0.7}>
          <circle cx="180" cy="72" r="4" />
          <circle cx="190" cy="88" r="2.5" />
        </g>
      </Part>
    }
    {...p}
  />
);

/** Contract / legal document with signature line and pen. interact=draw. */
export const EmptyDocument = ({ interact = "draw", ...p }: IllustrationProps) => (
  <EmptyStage
    name="empty-document"
    interact={interact}
    object={
      <>
        <path d="M84 30h54l22 22v104a6 6 0 0 1-6 6H84a6 6 0 0 1-6-6V36a6 6 0 0 1 6-6Z" fill={W} />
        <path d="M138 30v16a6 6 0 0 0 6 6h16" fill={C.line} />
        <g {...ink} strokeWidth={3}>
          <path d="M84 30h54l22 22v104a6 6 0 0 1-6 6H84a6 6 0 0 1-6-6V36a6 6 0 0 1 6-6Zm54 0v16a6 6 0 0 0 6 6h16" />
        </g>
        <g stroke="currentColor" strokeOpacity={0.4} strokeWidth={4} strokeLinecap="round" data-svg-part="lines">
          <path d="M92 70h52M92 86h52M92 102h36M92 118h48" />
        </g>
        <path d="M94 144c6-10 10 4 14-2s8 6 14 0 6-4 10-2" stroke={C.solid} strokeWidth={3} strokeLinecap="round" fill="none" data-svg-part="signature" />
      </>
    }
    extra={
      <Part n="pen" i={3} o="0% 100%">
        <g transform="rotate(35 176 120)">
          <rect x="168" y="70" width="14" height="62" rx="4" fill={C.green} fillOpacity={0.5} stroke="currentColor" strokeWidth={2.5} />
          <path d="M168 132l7 16 7-16" fill={W} stroke="currentColor" strokeWidth={2.5} strokeLinejoin="round" />
        </g>
      </Part>
    }
    {...p}
  />
);

/** Certificate with a leaf rosette. */
export const EmptyCertificate = ({ interact = "bloom", ...p }: IllustrationProps) => (
  <EmptyStage
    name="empty-certificate"
    interact={interact}
    object={
      <>
        <rect x="56" y="44" width="128" height="92" rx="8" fill={W} />
        <rect x="64" y="52" width="112" height="76" rx="4" stroke={C.line} strokeWidth={2} />
        <rect x="56" y="44" width="128" height="92" rx="8" {...ink} strokeWidth={3} />
        <g stroke="currentColor" strokeOpacity={0.4} strokeWidth={4} strokeLinecap="round">
          <path d="M84 72h72M92 88h56M98 104h30" />
        </g>
      </>
    }
    extra={
      <Part n="rosette" i={3} o="50% 50%">
        <path d="M144 136l-8 26 12-6 8 10 4-28M164 136l6 24" fill={C.blue} fillOpacity={0.5} stroke="currentColor" strokeWidth={2.5} strokeLinejoin="round" />
        <circle cx="154" cy="126" r="20" fill={C.lime} stroke="currentColor" strokeWidth={2.5} />
        <Leaf x={154} y={136} r={-20} l={18} w={7} fill={C.solid} o={0.9} />
        <Leaf x={154} y={136} r={30} l={14} w={6} fill={W} o={0.9} />
      </Part>
    }
    {...p}
  />
);

/** Mail: envelope with a leaf letter rising out. */
export const EmptyMail = ({ interact = "bloom", ...p }: IllustrationProps) => (
  <EmptyStage
    name="empty-mail"
    interact={interact}
    object={
      <>
        <rect x="64" y="78" width="112" height="76" rx="8" fill={W} />
        <path d="M64 86l56 40 56-40" fill={C.soft} />
        <g {...ink} strokeWidth={3}>
          <rect x="64" y="78" width="112" height="76" rx="8" />
          <path d="M66 84l54 40 54-40" />
        </g>
      </>
    }
    extra={
      <Part n="letter" i={3} o="50% 100%">
        <rect x="88" y="34" width="64" height="50" rx="5" fill={W} stroke="currentColor" strokeWidth={2.5} />
        <Leaf x={120} y={74} r={-18} l={28} w={10} fill={C.green} o={0.8} />
        <Leaf x={120} y={74} r={26} l={22} w={8} fill={C.blue} o={0.6} />
      </Part>
    }
    {...p}
  />
);

/** Blog / news: a folded newspaper with a leaf photo block. */
export const EmptyNews = ({ interact = "draw", ...p }: IllustrationProps) => (
  <EmptyStage
    name="empty-news"
    interact={interact}
    object={
      <>
        <path d="M70 46h92v104a8 8 0 0 0 8 8H78a8 8 0 0 1-8-8Z" fill={W} />
        <path d="M162 70h16v80a8 8 0 0 1-16 0Z" fill={C.soft} />
        <rect x="82" y="58" width="68" height="12" rx="3" fill={C.line} />
        <rect x="82" y="80" width="34" height="34" rx="4" fill={C.soft} />
        <Leaf x={99} y={110} r={-10} l={22} w={8} fill={C.green} o={0.85} />
        <g {...ink} strokeWidth={3}>
          <path d="M70 46h92v104a8 8 0 0 0 8 8H78a8 8 0 0 1-8-8Zm92 24h16v80a8 8 0 0 1-8 8" />
        </g>
        <g stroke="currentColor" strokeOpacity={0.4} strokeWidth={4} strokeLinecap="round" data-svg-part="lines">
          <path d="M124 84h26M124 98h26M124 112h18M82 128h68M82 142h48" />
        </g>
      </>
    }
    {...p}
  />
);

/** Empty cart: trolley with a single leaf drifting in. interact=sway. */
export const EmptyCart = ({ interact = "sway", ...p }: IllustrationProps) => (
  <EmptyStage
    name="empty-cart"
    interact={interact}
    object={
      <>
        <path d="M92 76h88l-12 46h-64Z" fill={C.soft} />
        <g {...ink} strokeWidth={3.5}>
          <path d="M60 60h18l16 66h70l14-50H86" />
          <circle cx="104" cy="146" r="8" />
          <circle cx="158" cy="146" r="8" />
        </g>
      </>
    }
    extra={
      <Part n="leaf" i={3} o="50% 100%">
        <Leaf x={136} y={60} r={24} l={34} w={12} fill={C.green} o={0.8} vein />
        <Leaf x={136} y={60} r={-30} l={24} w={9} fill={C.lime} o={0.8} />
      </Part>
    }
    {...p}
  />
);

/** No search results: magnifier with a leaf inside the lens. interact=parallax. */
export const EmptySearch = ({ interact = "parallax", ...p }: IllustrationProps) => (
  <EmptyStage
    name="empty-search"
    interact={interact}
    object={
      <>
        <circle cx="112" cy="90" r="38" fill={W} />
        <Leaf x={112} y={108} r={-24} l={34} w={12} fill={C.green} o={0.7} />
        <Leaf x={112} y={108} r={22} l={28} w={10} fill={C.blue} o={0.5} />
        <g {...ink}>
          <circle cx="112" cy="90" r="38" strokeWidth={6} />
          <path d="M140 118l30 30" strokeWidth={10} />
        </g>
      </>
    }
    extra={
      <Part n="orbit" i={3}>
        <circle cx="112" cy="90" r="54" stroke={C.line} strokeWidth={2} strokeDasharray="2 8" strokeLinecap="round" />
      </Part>
    }
    {...p}
  />
);

/** No favourites yet: heart with a sprout. */
export const EmptyFavorites = ({ interact = "bloom", ...p }: IllustrationProps) => {
  const heart = "M120 154s-52-28-52-64a27 27 0 0 1 52-11 27 27 0 0 1 52 11c0 36-52 64-52 64Z";
  return (
    <EmptyStage
      name="empty-favorites"
      interact={interact}
      object={
        <>
          <path d={heart} fill={W} />
          <path d="M120 140s-38-22-38-50a17 17 0 0 1 30-10" fill="none" stroke={C.line} strokeWidth={8} strokeLinecap="round" />
          <path d={heart} {...ink} strokeWidth={3} />
        </>
      }
      extra={
        <Part n="sprout" i={3} o="50% 100%">
          <path d="M120 79V58" stroke={C.green} strokeWidth={3} strokeLinecap="round" />
          <Leaf x={120} y={62} r={-50} l={24} w={9} fill={C.green} o={0.8} />
          <Leaf x={120} y={66} r={48} l={20} w={8} fill={C.lime} o={0.85} />
        </Part>
      }
      {...p}
    />
  );
};

/** Open laurel (two arcs, gap at top) — deliberately not a radial pinwheel. */
const LAUREL = [100, 135, 170, 190, 225, 260].map((t) => {
  const rad = (t * Math.PI) / 180;
  const right = t < 180;
  return { x: +(120 + 26 * Math.sin(rad)).toFixed(1), y: +(94 - 26 * Math.cos(rad)).toFixed(1), r: right ? t - 75 : t + 75 };
});

/** 404: two drawn "4"s with an open leaf laurel as the zero. Digits are decorative (aria-hidden); state the error in text. */
export const EmptyNotFound = ({ interact = "sway", ...p }: IllustrationProps) => {
  const four = "M30 0 0 44h42M30 0v64";
  return (
    <EmptyStage
      name="empty-404"
      interact={interact}
      object={
        <g {...ink} strokeWidth={11}>
          <path d={four} transform="translate(34 62)" />
          <path d={four} transform="translate(164 62)" />
        </g>
      }
      extra={
        <Part n="wreath" i={3} o="50% 50%">
          <circle cx="120" cy="94" r="26" stroke={C.green} strokeOpacity={0.5} strokeWidth={4} />
          {LAUREL.map((l, k) => (
            <Leaf key={k} x={l.x} y={l.y} r={l.r} l={18} w={6.5} fill={[C.green, C.lime, C.blue][k % 3]!} o={0.75} />
          ))}
        </Part>
      }
      {...p}
    />
  );
};
