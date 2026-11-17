import type { CSSProperties } from "react";
import { motion, type MotionId } from "@/lib/motion/ids";

type Trigger = "view" | "load" | "first" | "none";
const KIND: Record<Trigger, MotionId | null> = { view: "band", load: "band-show", first: "band-first", none: null };

/**
 * Brand signature stripe that draws from the left (brandbook bands: green / lime / blue).
 *  - trigger "view"  : once when scrolled into view (F1, M-20)
 *  - trigger "load"  : every time it is displayed (hero bottom: point="M-5"; drawer / menu edges)
 *  - trigger "first" : first page view of the session only (H1 / M-1 header thin band)
 * Sizes follow tokens.json › stripe.variants. Colours are the recolorable --stripe-* vars.
 */
export function StripeGrow({
  trigger = "view",
  variant = "signature",
  point,
  className = "",
  style,
}: {
  trigger?: Trigger;
  variant?: "signature" | "thin" | "inline";
  point?: MotionId;
  className?: string;
  style?: CSSProperties;
}) {
  const sizes = variant === "thin" ? ["2px", "1px", "1px"] : variant === "inline" ? ["4px", "3px", "3px"] : ["10px", "6px", "8px"];
  const gap = variant === "thin" ? "0" : variant === "inline" ? "3px" : "4px";
  const ids = [KIND[trigger], point].filter(Boolean) as MotionId[];
  return (
    <div
      aria-hidden="true"
      {...(ids.length ? motion(...ids) : {})}
      className={className}
      style={{ display: "grid", gap, width: variant === "inline" ? "56px" : undefined, ...style }}
    >
      <span style={{ display: "block", height: sizes[0], background: "var(--stripe-1)" }} />
      <span style={{ display: "block", height: sizes[1], background: "var(--stripe-2)" }} />
      <span style={{ display: "block", height: sizes[2], background: "var(--stripe-3)" }} />
    </div>
  );
}
