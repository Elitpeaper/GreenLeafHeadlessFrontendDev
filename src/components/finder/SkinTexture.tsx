import type { SkinTypeSlug } from "@/lib/catalog/skin";

/**
 * Skin-type "texture tiles" (skin-finder.md §1): a leaf surface metaphor per type, no faces/photos.
 * kuru = fine-veined matte leaf · yagli = glossy leaf with drops · karma = half glossy · normal = fresh balanced
 * leaf · hassas = soft, downy leaf. Drawn with accent vars (repaint with themes). Decorative.
 */
const LEAF = "M50 92 C 18 70 14 34 50 8 C 86 34 82 70 50 92 Z";

export function SkinTexture({ type, className = "" }: { type: SkinTypeSlug; className?: string }) {
  const glossy = type === "yagli" || type === "karma";
  return (
    <svg viewBox="0 0 100 100" className={className} aria-hidden="true" focusable="false" data-motion-part="tile">
      <defs>
        <clipPath id={`skin-leaf-${type}`}>
          <path d={LEAF} />
        </clipPath>
        <linearGradient id={`skin-gloss-${type}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="white" stopOpacity="0.85" />
          <stop offset="0.45" stopColor="white" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d={LEAF}
        fill={type === "hassas" ? "var(--accent-decor-3)" : type === "kuru" ? "var(--accent-decor-3)" : "var(--accent-decor)"}
        fillOpacity={type === "kuru" ? 0.55 : type === "hassas" ? 0.5 : 0.78}
      />
      <g clipPath={`url(#skin-leaf-${type})`}>
        {/* veins */}
        <path d="M50 90 V 12" stroke="white" strokeOpacity="0.7" strokeWidth="1.6" fill="none" />
        {[22, 36, 50, 64].map((y) => (
          <g key={y} stroke="white" strokeOpacity={type === "kuru" ? 0.85 : 0.5} strokeWidth={type === "kuru" ? 0.9 : 1.2} fill="none">
            <path d={`M50 ${y + 14} Q 38 ${y + 8} 30 ${y}`} />
            <path d={`M50 ${y + 14} Q 62 ${y + 8} 70 ${y}`} />
          </g>
        ))}
        {type === "kuru" &&
          [30, 42, 56, 68, 78].map((y, i) => (
            <path key={y} d={`M${34 + (i % 2) * 22} ${y} l 6 2 l -3 3`} stroke="white" strokeOpacity="0.9" strokeWidth="0.8" fill="none" />
          ))}
        {glossy && (
          <rect x={type === "karma" ? 50 : 0} y="0" width={type === "karma" ? 50 : 100} height="100" fill={`url(#skin-gloss-${type})`} />
        )}
        {type === "hassas" &&
          Array.from({ length: 28 }, (_, i) => (
            <circle key={i} cx={22 + ((i * 37) % 56)} cy={16 + ((i * 23) % 72)} r="1.4" fill="white" fillOpacity="0.8" />
          ))}
        {type === "normal" && <ellipse cx="40" cy="34" rx="10" ry="16" fill="white" fillOpacity="0.25" />}
      </g>
      {(type === "yagli" || type === "karma") &&
        (type === "yagli"
          ? [
              [38, 38, 5],
              [62, 54, 4],
              [44, 66, 3],
            ]
          : [[62, 44, 4.5]]
        ).map(([x, y, r], i) => (
          <g key={i}>
            <circle cx={x} cy={y} r={r} fill="var(--accent-decor-2)" fillOpacity="0.55" />
            <circle cx={(x ?? 0) - 1.3} cy={(y ?? 0) - 1.5} r={(r ?? 0) * 0.35} fill="white" />
          </g>
        ))}
    </svg>
  );
}
