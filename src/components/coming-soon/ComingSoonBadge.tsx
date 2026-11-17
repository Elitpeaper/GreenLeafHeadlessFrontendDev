import { t } from "@/lib/ui-text";

/**
 * K-181/K-182 "Çok yakında" pill. Server/client safe (no hooks). Put it next to (or instead of) anything that is not
 * ready yet: a disabled feature, a missing contact value, an unfinished page link.
 *
 *   <ComingSoonBadge />                    default, sm
 *   <ComingSoonBadge size="md" />          beside headings / in cards
 *   <ComingSoonBadge tone="onDark" />      on green-900 / forest panels
 *   <ComingSoonBadge label="Yakında" />    shorter label where space is tight
 *
 * Colours: blue-50 / blue-800 (7.6:1) — the "not yet" family of tasarim-kurallari §2.2; onDark: white/15 + white.
 * Pill shape (rounded-pill) on purpose so it is never confused with the square product badge "Türkiye'ye yakında".
 */
export type ComingSoonBadgeProps = {
  size?: "sm" | "md";
  tone?: "default" | "onDark";
  label?: string;
  className?: string;
};

const SIZES = {
  sm: "min-h-6 gap-1 px-2.5 text-xs",
  md: "min-h-8 gap-1.5 px-3.5 text-sm",
} as const;

const TONES = {
  default: "bg-blue-50 text-blue-800 ring-1 ring-inset ring-blue-100",
  onDark: "bg-white/15 text-white ring-1 ring-inset ring-white/30",
} as const;

export function ComingSoonBadge({ size = "sm", tone = "default", label, className = "" }: ComingSoonBadgeProps) {
  return (
    <span
      className={`inline-flex shrink-0 items-center whitespace-nowrap rounded-pill font-semibold leading-none ${SIZES[size]} ${TONES[tone]} ${className}`}
    >
      <svg viewBox="0 0 12 12" aria-hidden="true" focusable="false" className={size === "sm" ? "size-2.5" : "size-3"}>
        {/* two-leaf sprout — same leaf language as LeafCluster, not a clock */}
        <path d="M6 11V6.2" className="stroke-current" strokeWidth={1.4} strokeLinecap="round" fill="none" />
        <path d="M6 6.4C6 3.8 7.8 2 10.6 1.6 10.4 4.4 8.6 6.2 6 6.4Z" className="fill-current" />
        <path d="M6 7.4C5.8 5.4 4.4 4 1.6 3.8 1.8 6 3.4 7.4 6 7.4Z" className="fill-current" fillOpacity={0.55} />
      </svg>
      {label ?? t("comingSoon.badge")}
    </span>
  );
}
