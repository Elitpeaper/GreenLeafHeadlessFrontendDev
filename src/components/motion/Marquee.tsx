import type { CSSProperties, ReactNode } from "react";
import { cssVars } from "@/lib/css";
import { motion } from "@/lib/motion/ids";

/**
 * M-23 brand marquee: rows scroll slowly, alternating direction. WCAG 2.2.2: visible pause button,
 * pause on hover/focus, paused while off-screen; reduced motion = static wrapped grid.
 * Server component; the runtime wires the button (no client JS here).
 */
export function Marquee({
  rows,
  label = "Markalar",
  duration = 48,
  gap = "3rem",
  pauseLabel = "Hareketi durdur",
  playLabel = "Hareketi başlat",
  className = "",
  style,
}: {
  rows: ReactNode[][];
  label?: string;
  /** seconds per loop (slow = premium) */
  duration?: number;
  gap?: string;
  pauseLabel?: string;
  playLabel?: string;
  className?: string;
  style?: CSSProperties;
}) {
  const list: CSSProperties = { listStyle: "none", margin: 0, padding: 0 };
  return (
    <div
      role="region"
      aria-label={label}
      {...motion("M-23")}
      className={className}
      style={{ ...cssVars({ "--marquee-duration": `${duration}s`, "--marquee-gap": gap }), ...style }}
    >
      {rows.map((items, r) => (
        <div key={r} data-motion-part="track" data-reverse={r % 2 === 1 ? "" : undefined}>
          <ul data-motion-part="group" style={list}>
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
          <ul data-motion-part="group" data-motion-clone="" aria-hidden="true" inert style={list}>
            {items.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </div>
      ))}
      <button
        type="button"
        data-motion-part="marquee-toggle"
        aria-pressed="false"
        data-label-pause={pauseLabel}
        data-label-play={playLabel}
        className="mt-4 min-h-tap-min rounded-pill px-4 text-sm text-ink-muted underline-offset-4 hover:underline"
      >
        <span data-label="">{pauseLabel}</span>
      </button>
    </div>
  );
}
