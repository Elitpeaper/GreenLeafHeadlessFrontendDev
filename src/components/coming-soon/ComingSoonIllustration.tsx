/**
 * Custom inline illustrations for "Çok yakında" / empty states (K-175, K-181). Drawn by frontend-gelistirici (C) as a
 * stop-gap now delegates to ui-tasarimci's src/components/illustrations library; only "sprout" is still drawn here.
 *
 * Rules honoured (tasarim-kurallari §2, §9.2): token colours only (Tailwind fill-/stroke- classes, no hex), brand
 * tones only as decoration, leaf language = translucent leaves with multiply (NOT a pinwheel, NOT the logo mark).
 * Motion (hareket-tasarimcisi primitives, no ad-hoc animation): stems/lines are `pathLength="1"` and draw once in
 * view (`draw`), leaves react to hover/focus of the host (`leaf-glint`, part "leaf") and sway once (`sway`).
 */
import type { ReactNode } from "react";

import {
  EmptyCertificate,
  EmptyCookie,
  EmptyDocument,
  EmptyMail,
  EmptyNews,
  EmptyNotFound,
  EmptySearch,
  EmptyShield,
} from "@/components/illustrations";

type OwnKind = "sprout";

const LEAF_STYLE = { mixBlendMode: "multiply" as const, transformBox: "fill-box" as const, transformOrigin: "50% 100%" };

/** Three-leaf sprout rooted at (x, y). */
function Sprout({ x, y, s = 1 }: { x: number; y: number; s?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 0 C 2 -30 -4 -60 2 -96" pathLength={1} className="stroke-green-700" strokeWidth={4} strokeLinecap="round" fill="none" />
      <g data-motion="sway" style={{ transformBox: "fill-box", transformOrigin: "50% 100%" }}>
        <path data-motion-part="leaf" d="M0 -46 C -16 -74 -48 -82 -70 -70 C -56 -48 -26 -38 0 -46 Z" className="fill-brand-green" fillOpacity={0.78} style={LEAF_STYLE} />
        <path data-motion-part="leaf" d="M1 -64 C 16 -94 46 -104 70 -94 C 58 -70 28 -58 1 -64 Z" className="fill-brand-lime" fillOpacity={0.82} style={LEAF_STYLE} />
        <path data-motion-part="leaf" d="M2 -94 C -6 -116 2 -134 18 -142 C 26 -124 20 -104 2 -94 Z" className="fill-brand-blue" fillOpacity={0.62} style={LEAF_STYLE} />
      </g>
    </g>
  );
}

function Sparkle({ x, y, r = 7, className }: { x: number; y: number; r?: number; className: string }) {
  return (
    <path
      d={`M${x} ${y - r} Q ${x} ${y} ${x + r} ${y} Q ${x} ${y} ${x} ${y + r} Q ${x} ${y} ${x - r} ${y} Q ${x} ${y} ${x} ${y - r} Z`}
      className={className}
    />
  );
}

function Backdrop() {
  return (
    <>
      <path
        d="M58 236 C 34 132 118 38 244 34 C 330 32 376 104 366 178 C 356 258 276 290 184 290 C 120 290 70 276 58 236 Z"
        className="fill-green-50"
      />
      <circle cx="322" cy="72" r="30" className="fill-lime-100" />
      <path d="M40 120 C 80 40 200 6 300 30" className="stroke-blue-100" strokeWidth={3} strokeLinecap="round" strokeDasharray="2 10" fill="none" />
      <Sparkle x={80} y={86} className="fill-brand-lime" />
      <Sparkle x={356} y={140} r={5} className="fill-brand-blue" />
      <Sparkle x={278} y={22} r={5} className="fill-brand-green" />
      <ellipse cx="204" cy="284" rx="150" ry="9" className="fill-green-100" />
    </>
  );
}

const SCENES: Record<OwnKind, ReactNode> = {
  sprout: (
    <>
      <path d="M150 284 C 156 252 252 252 258 284 Z" className="fill-green-200" />
      <circle cx="204" cy="150" r="96" className="stroke-blue-100" strokeWidth={2} strokeDasharray="4 10" fill="none" />
      <Sprout x={204} y={272} s={1.5} />
    </>
  ),
};

/** Own fallback scenes (kept for kinds the library does not cover, e.g. the generic sprout). */
function OwnScene({ kind, className }: { kind: OwnKind; className: string }) {
  return (
    <svg
      viewBox="20 0 370 300"
      className={className}
      aria-hidden="true"
      focusable="false"
      data-motion="draw leaf-glint"
      style={{ isolation: "isolate" }}
    >
      <Backdrop />
      {SCENES[kind]}
    </svg>
  );
}

/** Library-backed kinds (ui-tasarimci, src/components/illustrations — K-195/K-196 interaction contract). */
const LIBRARY = {
  document: EmptyDocument,
  shield: EmptyShield,
  cookie: EmptyCookie,
  mail: EmptyMail,
  certificate: EmptyCertificate,
  news: EmptyNews,
  signpost: EmptyNotFound,
  search: EmptySearch,
} as const;

export type IllustrationKind = keyof typeof LIBRARY | "sprout";

export function ComingSoonIllustration({ kind = "sprout", className = "" }: { kind?: IllustrationKind; className?: string }) {
  if (kind === "sprout") return <OwnScene kind="sprout" className={className} />;
  const Lib = LIBRARY[kind];
  return <Lib className={className} />;
}
