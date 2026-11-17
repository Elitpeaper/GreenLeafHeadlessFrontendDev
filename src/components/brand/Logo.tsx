import Image from "next/image";

/**
 * Official Greenleaf horizontal lockup (mark + wordmark + "family" + "Born for Beauty").
 * Source: inline vector from the August TR catalogue (../greenleaf-katalog.html), copied unmodified
 * to /public/brand/greenleaf-logo.svg. NEVER recolor, crop, redraw or animate it.
 */
const RATIO = 913.56 / 184.04;

export function Logo({ height = 40, priority = false, className }: { height?: number; priority?: boolean; className?: string }) {
  return (
    <Image
      src="/brand/greenleaf-logo.svg"
      alt="Greenleaf family — Born for Beauty"
      width={Math.round(height * RATIO)}
      height={height}
      priority={priority}
      unoptimized
      className={className}
    />
  );
}
