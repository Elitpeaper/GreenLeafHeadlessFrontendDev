import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";
import { motion } from "@/lib/motion/ids";

type HostProps = HTMLAttributes<HTMLElement> & { as?: ElementType; children?: ReactNode; style?: CSSProperties };

/**
 * K-234 collage (hareket.md §22): pieces arrive from scattered offsets with a turn, once, when the host enters the
 * viewport. Pieces = children marked data-motion-part="piece" (or the direct children when none is marked).
 * Per piece (inline style): --from-x, --from-y, --from-r (start offset / turn), --i (order, 80 ms step, max 10).
 * The piece's own `rotate` class is its final tilt. Gentle tier / no JS: pieces are simply there.
 */
export function Collage({ as: Tag = "div", children, ...rest }: HostProps) {
  return (
    <Tag {...rest} {...motion("collage")}>
      {children}
    </Tag>
  );
}

/**
 * K-234 drift: scroll-linked depth layer, travels ±drift × depth while its section crosses the viewport
 * (CSS scroll-driven animation; static where unsupported and in the gentle tier). Owns `translate`: use it as a
 * wrapper. depth 0.3 = far, 1 = near; max 2 layers per screen with depth ≥ 1 (hareket.md §22).
 */
export function Drift({
  as: Tag = "div",
  depth = 1,
  drift,
  style,
  children,
  ...rest
}: HostProps & { depth?: number; drift?: string }) {
  const vars = { "--depth": depth, ...(drift ? { "--drift": drift } : null), ...style } as CSSProperties;
  return (
    <Tag {...rest} {...motion("drift")} style={vars}>
      {children}
    </Tag>
  );
}
