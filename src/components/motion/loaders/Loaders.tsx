import type { CSSProperties } from "react";
import { forwardRef } from "react";
import "./loaders.css";

/**
 * K-287 loading OPTIONS A–D (hareket-tasarimcisi prototype). NOT wired to the site: the user picks one first.
 * Presentational, no hooks (server-compatible). Who decides phase/mode: the caller (lab: /hareket-lab/loading).
 * Plan: docs/tasarim/loading-secenekleri.md · CSS contract: ./loaders.css.
 *
 * The overlay is decorative (aria-hidden) and never traps focus; the page underneath stays in the a11y tree.
 * A screen-reader status is only rendered in transition mode ("Sayfa yükleniyor").
 */
export type LoaderId = "a" | "b" | "c" | "d";
export type LoaderMode = "splash" | "transition";
export type LoaderPhase = "in" | "out";

export interface LoaderProps {
  mode?: LoaderMode;
  phase?: LoaderPhase;
  /** "stage" = absolute inside a positioned box (lab), "fixed" = full viewport (production). */
  scope?: "stage" | "fixed";
  label?: string;
}

const i = (n: number, extra?: Record<string, string | number>) => ({ "--i": n, ...extra }) as CSSProperties;

function rootProps(id: LoaderId, { mode = "splash", phase = "in", scope = "fixed" }: LoaderProps) {
  return { className: "gl-ld", "data-ld": id, "data-mode": mode, "data-phase": phase, "data-scope": scope };
}

function Status({ mode, label }: LoaderProps) {
  return mode === "transition" ? (
    <span role="status" className="sr-only">
      {label ?? "Sayfa yükleniyor"}
    </span>
  ) : null;
}

/* ------------------------------------------------------------------ A · official mark, mask draw */
function MarkArt() {
  return (
    <span className="gl-ld-a__spin block">
      <span className="gl-ld-a__mark block">
        <svg className="gl-ld-a__ring" viewBox="0 0 100 100" aria-hidden="true" focusable="false">
          <circle cx="50" cy="50" r="49" pathLength={100} />
        </svg>
        {/* Untouched official artwork; only the wrapper turns and a conic mask reveals it. */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/brand/greenleaf-mark.svg" alt="" width={144} height={144} decoding="async" />
      </span>
    </span>
  );
}

export function LoaderMark(props: LoaderProps) {
  return (
    <div {...rootProps("a", props)} aria-hidden={props.mode === "transition" ? undefined : true}>
      {props.mode === "transition" ? (
        <span className="gl-ld-pill">
          <MarkArt />
          <span aria-hidden="true">Yükleniyor</span>
        </span>
      ) : (
        <MarkArt />
      )}
      <Status {...props} />
    </div>
  );
}

/* ------------------------------------------------------------------ B · seven leaves open (pinwheel-inspired) */
// A generic, slightly twisted leaf (NOT a logo cluster): seven of them echo the 7-cluster rhythm only.
const LEAF = "M0 -6 C 20 -18 22 -52 6 -76 C -10 -56 -16 -24 0 -6 Z";
const LEAF_FILL = [
  "var(--color-brand-green)",
  "var(--color-brand-lime)",
  "var(--color-brand-blue)",
  "var(--color-brand-green)",
  "var(--color-brand-lime)",
  "var(--color-brand-blue)",
  "var(--color-green-700)",
];

function BloomArt() {
  return (
    <svg className="gl-ld-b__svg" viewBox="-90 -90 180 180" aria-hidden="true" focusable="false">
      <g className="gl-ld-b__turn">
        {LEAF_FILL.map((fill, n) => (
          <g key={n} transform={`rotate(${(n * 360) / 7})`}>
            <path className="gl-ld-b__leaf" d={LEAF} fill={fill} fillOpacity={0.92} style={i(n)} />
          </g>
        ))}
      </g>
      <circle className="gl-ld-b__core" r="9" fill="#fff" />
      <circle className="gl-ld-b__core" r="4.5" fill="var(--color-green-700)" />
    </svg>
  );
}

export function LoaderBloom(props: LoaderProps) {
  return (
    <div {...rootProps("b", props)} aria-hidden={props.mode === "transition" ? undefined : true}>
      {props.mode === "transition" ? (
        <span className="gl-ld-pill">
          <BloomArt />
          <span aria-hidden="true">Yükleniyor</span>
        </span>
      ) : (
        <BloomArt />
      )}
      <Status {...props} />
    </div>
  );
}

/* ------------------------------------------------------------------ C · signature stripes fill */
export function LoaderStripes(props: LoaderProps) {
  return (
    <div {...rootProps("c", props)} aria-hidden={props.mode === "transition" ? undefined : true}>
      <span className="gl-ld-c__band" style={i(0)} />
      <span className="gl-ld-c__band" style={i(1)} />
      <span className="gl-ld-c__band" style={i(2)} />
      <span className="gl-ld-c__bar" aria-hidden="true">
        <span style={i(0)} />
        <span style={i(1)} />
        <span style={i(2)} />
      </span>
      <Status {...props} />
    </div>
  );
}

/* ------------------------------------------------------------------ D · forest curtain + paper leaves */
const PAPER = "M0 0 C 40 -30 46 -110 0 -160 C -46 -110 -40 -30 0 0 Z";
const PAPERS = [
  { w: "clamp(70px, 13vmin, 150px)", x: "18%", y: "22%", r: "-28deg", fx: "-30vw", fy: "-10vh", fill: "var(--color-cream-200)" },
  { w: "clamp(90px, 18vmin, 200px)", x: "58%", y: "14%", r: "34deg", fx: "30vw", fy: "-20vh", fill: "var(--color-lime-200)" },
  { w: "clamp(60px, 11vmin, 120px)", x: "70%", y: "56%", r: "142deg", fx: "25vw", fy: "30vh", fill: "var(--color-cream-100)" },
  { w: "clamp(50px, 9vmin, 100px)", x: "26%", y: "62%", r: "-150deg", fx: "-25vw", fy: "25vh", fill: "var(--color-brand-lime)" },
];

export const LoaderCanopy = forwardRef<HTMLDivElement, LoaderProps>(function LoaderCanopy(props, ref) {
  return (
    <div ref={ref} {...rootProps("d", props)} aria-hidden={props.mode === "transition" ? undefined : true}>
      {PAPERS.map((p, n) => (
        <svg
          key={n}
          className="gl-ld-d__paper"
          data-ld-part="paper"
          viewBox="-50 -170 100 180"
          aria-hidden="true"
          focusable="false"
          style={i(n, { "--w": p.w, "--x": p.x, "--y": p.y, "--r": p.r, "--fx": p.fx, "--fy": p.fy })}
        >
          <path d={PAPER} fill={p.fill} />
          <path d="M0 -8 C 2 -60 2 -110 0 -150" fill="none" stroke="var(--color-forest-900)" strokeOpacity={0.18} strokeWidth={2.5} strokeLinecap="round" />
        </svg>
      ))}
      <span className="gl-ld-d__stripes" data-ld-part="stripes" aria-hidden="true">
        <span style={i(0)} />
        <span style={i(1)} />
        <span style={i(2)} />
      </span>
      <Status {...props} />
    </div>
  );
});

export const LOADERS = { a: LoaderMark, b: LoaderBloom, c: LoaderStripes } as const;
