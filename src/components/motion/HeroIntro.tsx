import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";
import { motion } from "@/lib/motion/ids";

/**
 * K-233 home hero entrance (M-24, hareket.md §23). Server components, pure CSS (motion.css "K-233"), no client JS.
 *
 *   <HeroIntro as="section" className="h-svh ...">
 *     <IntroLogo><Image src="/brand/greenleaf-mark.svg" ... /></IntroLogo>   // rolls in from the left (1.5 turns)
 *     <h1 data-motion-part="title">…</h1>                                  // opacity 0 -> 1 after the logo
 *     <p data-motion-part="lead">…</p>  <div data-motion-part="cta">…</div>
 *     <div data-motion-part="media">…hero image (never hidden)…</div>
 *   </HeroIntro>
 *
 * The logo artwork is passed in untouched; only the wrapper moves (translate + rotate + entry opacity).
 */
export function HeroIntro({
  as: Tag = "section",
  children,
  ...rest
}: HTMLAttributes<HTMLElement> & { as?: ElementType; children?: ReactNode }) {
  return (
    <Tag {...rest} {...motion("hero-intro")}>
      {children}
    </Tag>
  );
}

/**
 * Wrapper for the unmodified Greenleaf logo inside <HeroIntro>.
 * variant "mark" (default): the round mark ROLLS in (1.5 turns over 1.5 x pi x its diameter: no slipping).
 * variant "lockup": the horizontal lockup slides in with a small tilt instead of spinning (no propeller effect).
 * turns: rolling turns (default 1.5; distance follows automatically). from: lockup start offset (default -46vw).
 */
export function IntroLogo({
  variant = "mark",
  from,
  turns,
  className,
  style,
  children,
}: {
  variant?: "mark" | "lockup";
  from?: string;
  turns?: number;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  const vars = {
    ...(variant === "lockup" ? { "--intro-turn": "-14deg", "--intro-from": "-46vw" } : null),
    ...(turns != null ? { "--intro-roll": turns } : null),
    ...(from ? { "--intro-from": from } : null),
    ...style,
  } as CSSProperties;
  return (
    <span data-motion-part="logo" className={className} style={vars}>
      {children}
    </span>
  );
}
