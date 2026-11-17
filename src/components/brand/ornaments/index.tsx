/**
 * Premium-gold ornament library (premium-theme.md §4, K-082). FIRST DRAFT for ui-tasarimci review.
 * Rules: stroke ≤ 1.5px · max 4 ornaments per screen · never behind text · never around the logo/pinwheel ·
 * always aria-hidden. Colours come from gold tokens via CSS vars (no raw hex).
 * Motion hooks (hareket-tasarimcisi): data-ornament="<name>" + pathLength=1 on strokes for dash-offset drawing.
 */
import { useId, type ReactNode } from "react";

function FoilGradient({ id, vertical = false }: { id: string; vertical?: boolean }) {
  return (
    <linearGradient id={id} x1="0" y1="0" x2={vertical ? "0" : "1"} y2={vertical ? "1" : "0"}>
      <stop offset="0" style={{ stopColor: "var(--color-gold-700)" }} />
      <stop offset="0.28" style={{ stopColor: "var(--color-gold-500)" }} />
      <stop offset="0.5" style={{ stopColor: "var(--color-gold-200)" }} />
      <stop offset="0.68" style={{ stopColor: "var(--color-gold-400)" }} />
      <stop offset="1" style={{ stopColor: "var(--color-gold-700)" }} />
    </linearGradient>
  );
}

/** 1px foil rule whose ends taper to transparent. Fills its container width. */
export function GoldRule({ className = "" }: { className?: string }) {
  const id = useId();
  const mask = `${id}-m`;
  return (
    <svg viewBox="0 0 400 2" preserveAspectRatio="none" className={`block h-px w-full ${className}`} aria-hidden="true" data-ornament="gold-rule">
      <defs>
        <FoilGradient id={id} />
        <linearGradient id={`${mask}-g`} x1="0" x2="1">
          <stop offset="0" stopColor="white" stopOpacity="0" />
          <stop offset="0.18" stopColor="white" stopOpacity="1" />
          <stop offset="0.82" stopColor="white" stopOpacity="1" />
          <stop offset="1" stopColor="white" stopOpacity="0" />
        </linearGradient>
        <mask id={mask}>
          <rect width="400" height="2" fill={`url(#${mask}-g)`} />
        </mask>
      </defs>
      <rect width="400" height="2" fill={`url(#${id})`} mask={`url(#${mask})`} />
    </svg>
  );
}

/** 1px + 3px gap + 1px. */
export function GoldDoubleRule({ className = "" }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 400 5" preserveAspectRatio="none" className={`block h-[5px] w-full ${className}`} aria-hidden="true" data-ornament="gold-double-rule">
      <defs>
        <FoilGradient id={id} />
      </defs>
      <rect y="0" width="400" height="1" fill={`url(#${id})`} />
      <rect y="4" width="400" height="1" fill={`url(#${id})`} opacity="0.7" />
    </svg>
  );
}

/** Two leaves meeting tip-to-tip forming a diamond, 2px dot in the middle. 24×12. */
export function LeafDiamond({ className = "" }: { className?: string }) {
  const id = useId();
  return (
    <svg viewBox="0 0 24 12" width="24" height="12" className={className} aria-hidden="true" data-ornament="leaf-diamond">
      <defs>
        <FoilGradient id={id} />
      </defs>
      <g fill="none" stroke={`url(#${id})`} strokeWidth="1" strokeLinecap="round">
        <path d="M1 6 C 4 1.6, 8 1.6, 11 6 C 8 10.4, 4 10.4, 1 6 Z" pathLength={1} />
        <path d="M23 6 C 20 1.6, 16 1.6, 13 6 C 16 10.4, 20 10.4, 23 6 Z" pathLength={1} />
        <path d="M2.5 6 H 9.5 M 14.5 6 H 21.5" strokeOpacity="0.55" />
      </g>
      <circle cx="12" cy="6" r="1" fill={`url(#${id})`} />
    </svg>
  );
}

/** A leaf curl + thin spiral, 48×48, for one corner. `corner` mirrors it (max 2 opposite corners per surface). */
export function CornerFlourish({ corner = "tl", className = "" }: { corner?: "tl" | "tr" | "bl" | "br"; className?: string }) {
  const id = useId();
  const flip = { tl: "", tr: "scale(-1,1)", bl: "scale(1,-1)", br: "scale(-1,-1)" }[corner];
  return (
    <svg viewBox="0 0 48 48" width="48" height="48" className={className} aria-hidden="true" data-ornament="corner-flourish">
      <defs>
        <FoilGradient id={id} vertical />
      </defs>
      <g transform={flip ? `translate(24 24) ${flip} translate(-24 -24)` : undefined} fill="none" stroke={`url(#${id})`} strokeWidth="1.25" strokeLinecap="round">
        <path d="M2 46 V 14 C 2 7.4, 7.4 2, 14 2 H 46" pathLength={1} />
        <path d="M8 40 V 18 C 8 12.5, 12.5 8, 18 8 H 40" strokeOpacity="0.45" pathLength={1} />
        <path d="M14 22 C 14 16, 18 13, 24 14 C 22 19, 19 22, 14 22 Z" pathLength={1} />
        <path d="M14 22 C 18 20, 21 17.5, 24 14" strokeOpacity="0.6" />
        <path d="M24 14 C 27 11.5, 31 11.5, 32 14.5 C 32.8 17, 30 18.4, 28.6 16.6" strokeOpacity="0.8" pathLength={1} />
      </g>
    </svg>
  );
}

/**
 * radius-lg frame: 1px foil border + an inner hairline 6px inside at 40% (premium card, set content card).
 * Wraps children; uses padding-box/border-box backgrounds so the foil never sits behind text.
 */
export function GoldFrame({ children, className = "", as: Tag = "div" }: { children: ReactNode; className?: string; as?: "div" | "article" | "section" }) {
  return (
    <Tag
      data-ornament="gold-frame"
      className={`relative rounded-lg border border-transparent shadow-gold [background:linear-gradient(var(--color-surface),var(--color-surface))_padding-box,var(--gradient-gold-foil)_border-box] ${className}`}
    >
      <span aria-hidden="true" className="pointer-events-none absolute inset-1.5 rounded-[calc(var(--radius-lg)-6px)] border border-gold-400/40" />
      {children}
    </Tag>
  );
}

/** Gold version of the signature stripe (premium hero bottom edge) — reads --stripe-* of the premium theme. */
export function GoldStripe({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`grid gap-1 ${className}`} data-ornament="gold-stripe">
      <span className="block h-1.5 bg-(image:--gradient-gold-foil)" />
      <span className="block h-1 bg-stripe-2" />
      <span className="block h-1 bg-stripe-1/70" />
    </div>
  );
}
