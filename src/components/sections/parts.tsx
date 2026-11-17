import Link from "next/link";
import type { ReactNode } from "react";
import { cssVars } from "@/lib/css";

/**
 * Shared section primitives (Developer B). Every themable piece reads ONLY accent/stripe vars (K-072) so a
 * RecolorZone or a data-theme scope can repaint it; text stays ink.
 */

/** tasarim-kurallari §9.1 "inline" stripe: 56 px, 4/3/3, green → lime → blue (accent stripe vars). */
export function InlineStripe({ className = "", center = false }: { className?: string; center?: boolean }) {
  return (
    <span aria-hidden="true" data-motion="M-5" className={`flex w-14 flex-col gap-[3px] ${center ? "mx-auto" : ""} ${className}`}>
      <span className="h-1 rounded-pill bg-stripe-1" />
      <span className="h-[3px] w-4/5 rounded-pill bg-stripe-2" />
      <span className="h-[3px] w-3/5 rounded-pill bg-stripe-3" />
    </span>
  );
}

/** §9.1 "signature" stripe (10/6/8, 4 px gap), full width. Max one per viewport. */
export function SignatureStripe({ className = "", motion = "M-5" }: { className?: string; motion?: string }) {
  return (
    <div aria-hidden="true" data-motion={motion} className={`grid gap-1 ${className}`}>
      <span className="stripe-seg block h-2.5 origin-left bg-stripe-1" />
      <span className="stripe-seg block h-1.5 origin-left bg-stripe-2" />
      <span className="stripe-seg block h-2 origin-left bg-stripe-3" />
    </div>
  );
}

/** Thin stripe (2/1/1). */
export function ThinStripe({ className = "" }: { className?: string }) {
  return (
    <div aria-hidden="true" className={`grid ${className}`}>
      <span className="block h-0.5 bg-stripe-1" />
      <span className="block h-px bg-stripe-2" />
      <span className="block h-px bg-stripe-3" />
    </div>
  );
}

/** Eyebrow (Comfortaa 700 ≥ 15 px, --accent-text) + inline stripe below. */
export function Eyebrow({ children, center = false, tone = "light" }: { children: ReactNode; center?: boolean; tone?: "light" | "dark" }) {
  return (
    <div className={center ? "text-center" : undefined}>
      <p
        className={`font-[family-name:var(--font-role-accent)] text-sm font-bold ${tone === "dark" ? "text-accent-on-deep" : "text-accent-text"}`}
      >
        {children}
      </p>
      <InlineStripe className="mt-2" center={center} />
    </div>
  );
}

export function SectionHead({
  id,
  eyebrow,
  title,
  lead,
  action,
  center = false,
}: {
  id: string;
  eyebrow?: ReactNode;
  title: ReactNode;
  lead?: ReactNode;
  action?: ReactNode;
  center?: boolean;
}) {
  return (
    <div className={`flex flex-wrap items-end justify-between gap-x-8 gap-y-4 ${center ? "flex-col items-center text-center" : ""}`}>
      <div className={center ? "max-w-2xl" : "max-w-2xl"}>
        {eyebrow && <Eyebrow center={center}>{eyebrow}</Eyebrow>}
        <h2 id={id} className={`text-3xl text-ink ${eyebrow ? "mt-4" : ""}`}>
          {title}
        </h2>
        {lead && <p className="mt-3 text-lg text-ink-muted">{lead}</p>}
      </div>
      {action}
    </div>
  );
}

/**
 * Abstract leaf fan in ACCENT colors (repaints with hover-recolor / themes). Same leaf language as
 * components/brand/LeafCluster (two translucent leaves, darker overlap) — not a pinwheel, not the logo mark.
 */
const LEAF = "M0 0 C 46 -52 50 -150 0 -214 C -50 -150 -46 -52 0 0 Z";
const FAN = [
  { r: -56, s: 0.74, v: "--accent-decor-2" },
  { r: -26, s: 1, v: "--accent-decor" },
  { r: 4, s: 1.12, v: "--accent-decor-3" },
  { r: 34, s: 0.92, v: "--accent-decor-2" },
  { r: 62, s: 0.72, v: "--accent-decor" },
] as const;

export function AccentLeaves({
  className = "",
  opacity = 0.62,
  motion = "M-6",
}: {
  className?: string;
  opacity?: number;
  motion?: string;
}) {
  return (
    <svg viewBox="-260 -270 520 290" className={className} style={{ isolation: "isolate" }} aria-hidden="true" focusable="false" data-motion={motion}>
      {FAN.map((l, i) => (
        <g key={i} transform={`rotate(${l.r}) scale(${l.s})`}>
          <path
            d={LEAF}
            fill={`var(${l.v})`}
            fillOpacity={opacity}
            style={{ mixBlendMode: "multiply", ...cssVars({ "--d": `${-i * 3}s` }) }}
          />
          <path d="M0 -6 C 2 -70 2 -140 0 -200" stroke="var(--color-surface)" strokeOpacity={0.45} strokeWidth={3} fill="none" />
        </g>
      ))}
    </svg>
  );
}

/** Text link with arrow (secondary action). */
export function ArrowLink({ href, children, className = "" }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={`group/al inline-flex min-h-tap-min items-center gap-1.5 font-medium text-green-700 underline-offset-4 underline decoration-transparent underline-offset-4 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:decoration-current ${className}`}
    >
      {children}
      <span aria-hidden="true" className="transition-transform duration-250 motion-safe:group-hover/al:translate-x-1">
        →
      </span>
    </Link>
  );
}
