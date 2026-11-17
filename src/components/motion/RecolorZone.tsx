import type { CSSProperties, ElementType, HTMLAttributes, ReactNode } from "react";
import type { RecolorZoneKind } from "@/lib/motion/tokens";

/**
 * Hover recolor zone (K-066 / K-075; hover-recolor.md). Server component — the global MotionRuntime handles
 * the events, so no client JS and no hook are needed.
 *
 *   <RecolorZone kind="showcase" as="section">         Z3 home showcases
 *     <a {...accentTriggerProps(p.accent)}>…</a>         trigger with palette (data-accent)
 *     <a data-accent-trigger="">…</a>                    paletteless card: returns the zone to the brand theme
 *   </RecolorZone>
 *   <RecolorZone kind="menu" link={["header-accent"]}>  Z1 mega menu panel, mirrored on the header (Z2)
 *
 * Only the 9 registered vars change (RECOLOR_VARS). Timing: lib/motion/tokens.ts › RECOLOR.
 * Off on touch, prefers-contrast: more, forced colours; off under reduced motion unless ?recolorReduced=instant.
 * Already using useAccentZone? Set data-accent-zone="manual" there so the runtime leaves it alone.
 */
export function RecolorZone({
  kind = "showcase",
  link,
  as: Tag = "div",
  className,
  style,
  children,
  ...rest
}: HTMLAttributes<HTMLElement> & {
  kind?: RecolorZoneKind;
  /** ids of elements that mirror the zone (Z1 -> "header-accent") */
  link?: string[];
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  children: ReactNode;
}) {
  return (
    <Tag {...rest} data-accent-zone={kind} data-accent-link={link?.join(" ") || undefined} className={className} style={style}>
      {children}
    </Tag>
  );
}
