import { cloneElement, isValidElement, type ReactElement, type ReactNode, type SVGProps } from "react";
import type { SvgBehaviour } from "@/lib/motion/svg-interact";

/**
 * Makes an existing inline <svg> interactive (K-179) without touching its source. Server component.
 * The runtime does the rest (hover/focus of the host, cursor parallax, draw-in on view).
 *
 *   <SvgInteract mode={["bloom", "draw"]}><FlowerIllustration /></SvgInteract>
 *   <SvgInteract mode="parallax" host>…</SvgInteract>     wraps in <span data-svg-host> so the whole box is the hover area
 *
 * The child must render an <svg> root that accepts props (illustration components should spread ...props on <svg>).
 * Parts inside must carry data-svg-part (see src/lib/motion/svg-interact.ts for the contract).
 */
export function SvgInteract({
  mode,
  host = false,
  reveal = true,
  className,
  children,
}: {
  mode: SvgBehaviour | SvgBehaviour[];
  /** wrap in a hover host (otherwise the closest link/button/card or the svg itself) */
  host?: boolean;
  /** draw-in once on view for "draw" (default true) */
  reveal?: boolean;
  className?: string;
  children: ReactNode;
}) {
  const value = Array.isArray(mode) ? mode.join(" ") : mode;
  const extra = { "data-svg-interact": value, ...(reveal ? {} : { "data-svg-reveal": "off" }) };
  const svg = isValidElement(children)
    ? cloneElement(children as ReactElement<SVGProps<SVGSVGElement>>, extra as SVGProps<SVGSVGElement>)
    : children;
  if (!host) return <>{svg}</>;
  return (
    <span data-svg-host="" className={className ?? "inline-block"}>
      {svg}
    </span>
  );
}
