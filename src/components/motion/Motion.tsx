import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";
import { motion, type MotionId } from "@/lib/motion/ids";

export type MotionProps = HTMLAttributes<HTMLElement> & {
  /** for as="a" */
  href?: string;
  /** element to render (default div) */
  as?: ElementType;
  /** extra point ids on the same element, e.g. ["M-9"] next to the primitive */
  points?: MotionId[];
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

function make(primitive: MotionId, displayName: string) {
  function Component({ as: Tag = "div", points = [], children, ...rest }: MotionProps) {
    return (
      <Tag {...rest} {...motion(primitive, ...points)}>
        {children}
      </Tag>
    );
  }
  Component.displayName = displayName;
  return Component;
}

/** Generic wrapper: <Motion kind="M-20" as="section">. Server component, no client JS. */
export function Motion({ kind, as: Tag = "div", points = [], children, ...rest }: MotionProps & { kind: MotionId }) {
  return (
    <Tag {...rest} {...motion(kind, ...points)}>
      {children}
    </Tag>
  );
}

/** Fades + rises once when it enters the viewport. */
export const Reveal = make("reveal", "Reveal");
/** Soft scale-in once (M-20 membership panel, result cards). */
export const RevealScale = make("reveal-scale", "RevealScale");
/** Direct children enter one after another (60 ms step, capped at 8). */
export const Stagger = make("stagger", "Stagger");
/** Hover/focus lift with shadow layer (M-21, F4). */
export const HoverLift = make("lift", "HoverLift");
/** Follows the mouse by at most 6 px (fine pointers only). Do not combine with own translate. */
export const MagneticHover = make("magnetic", "MagneticHover");
/** Scroll-linked ±24 px drift (CSS scroll-driven animation; static where unsupported). Put inside an overflow-hidden frame. */
export const Parallax = make("parallax", "Parallax");
/** Gentle float, 2 × 2.2 s then rest (WCAG 2.2.2). */
export const Float = make("float", "Float");
/** Leaf sway: one 4.6 s swing then rest (M-6, F2). Wrap LeafCluster with it. */
export const LeafSway = make("sway", "LeafSway");
