import { t } from "@/lib/ui-text";

/**
 * Branded loading indicator (K-170). Server component, pure CSS (motion.css › "brand loader"), no JS.
 * Three brand-coloured leaves (green / lime / blue) on one stem point open in turn while the trio turns in
 * 120° steps — inspired by the pinwheel rhythm, deliberately NOT the 7-cluster logo mark (K-157).
 * Below: the brandbook signature stripes fill in a loop. Reduced motion / no motion: static leaves, opacity pulse only.
 *
 *   <BrandLoader />                          inline block (route segments)
 *   <BrandLoader size="lg" label="…" />      full page (app/loading.tsx)
 */
const LEAF = "M0 0 C 15 -16 16 -46 0 -66 C -16 -46 -15 -16 0 0 Z";
const LEAVES = [
  { rotate: 0, fill: "var(--color-brand-green, #4EAE36)" },
  { rotate: 120, fill: "var(--color-brand-lime, #86B726)" },
  { rotate: 240, fill: "var(--color-brand-blue, #30A8D7)" },
];

export function BrandLoader({ size = "md", label, className = "" }: { size?: "sm" | "md" | "lg"; label?: string; className?: string }) {
  const px = size === "lg" ? 96 : size === "sm" ? 52 : 64;
  return (
    <div role="status" aria-live="polite" data-brand-loader="" className={`flex flex-col items-center gap-4 ${className}`}>
      <svg viewBox="-80 -80 160 160" width={px} height={px} aria-hidden="true" focusable="false" data-loader-part="trio">
        <g data-loader-part="turn">
          {LEAVES.map((l, i) => (
            <g key={i} transform={`rotate(${l.rotate})`}>
              <path d={LEAF} fill={l.fill} fillOpacity={0.85} data-loader-part="leaf" style={{ ["--loader-i" as string]: i }} />
            </g>
          ))}
          <circle r="7" fill="var(--color-surface, #fff)" />
          <circle r="4" fill="var(--color-green-700, #2F7A22)" />
        </g>
      </svg>
      <span aria-hidden="true" data-loader-part="stripes" className="grid w-24 grid-rows-[3px_2px_2px] gap-[2px] overflow-hidden rounded-pill">
        <span className="bg-brand-green" />
        <span className="bg-brand-lime" />
        <span className="bg-brand-blue" />
      </span>
      <span className={size === "lg" ? "text-sm font-medium text-ink-muted" : "sr-only"}>{label ?? t("common.loading")}</span>
    </div>
  );
}
