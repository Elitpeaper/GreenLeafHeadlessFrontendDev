import { ComingSoonBadge } from "@/components/coming-soon/ComingSoonBadge";
import { isPlaceholderHref } from "@/components/coming-soon/placeholders";
import { ArrowUpRight } from "@/components/ui/lucide";

/**
 * Primary CTA "Greenleaf'te üyeliğini başlat" (K-016): external sponsor link in a new tab.
 * While the real link is missing (placeholder in src/config/site.ts) the CTA is NOT a link (K-182): same visual
 * weight, muted, with the "Çok yakında" pill — nothing to click, no focus stop. Flips automatically when the
 * real link lands in site.ts / NEXT_PUBLIC_MEMBERSHIP_URL.
 * Analytics hook: data-event="membership_click" data-source=… (K-020).
 */
export function MembershipCta({
  href,
  source,
  label,
  newTabLabel,
  variant = "primary",
  tone = "light",
}: {
  href: string;
  source: string;
  label: string;
  newTabLabel: string;
  variant?: "primary" | "link";
  tone?: "light" | "onDark";
}) {
  const soon = isPlaceholderHref(href);
  const primary =
    tone === "onDark"
      ? "bg-cream-100 text-forest-900 shadow-cta-cream hover:bg-cream-50 focus-visible:outline-cream-100"
      : "bg-green-700 text-white hover:bg-green-800";
  const cls =
    variant === "primary"
      ? `inline-flex min-h-control-lg w-full items-center justify-center gap-2 rounded-pill px-8 text-lg font-medium shadow-button transition-[color,background-color,box-shadow] duration-250 sm:w-auto ${primary}`
      : `inline-flex min-h-tap-min items-center gap-1.5 font-medium underline underline-offset-4 ${tone === "onDark" ? "text-white" : "text-green-700 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:text-green-800"}`;

  if (soon) {
    if (variant === "link") return null; // a second, text-only copy of an unavailable action adds nothing
    return (
      <span className="inline-flex flex-wrap items-center gap-3 max-sm:w-full">
        <span
          className={`inline-flex min-h-control-lg w-full items-center justify-center gap-2 rounded-pill px-8 text-lg font-medium sm:w-auto ${
            tone === "onDark" ? "bg-white/15 text-white ring-1 ring-white/30" : "bg-surface-muted text-ink ring-1 ring-line-strong"
          }`}
        >
          {label}
        </span>
        <ComingSoonBadge size="md" tone={tone === "onDark" ? "onDark" : "default"} />
      </span>
    );
  }

  return (
    <a href={href} target="_blank" rel="noopener noreferrer" data-event="membership_click" data-source={source} className={cls}>
      {label}
      <ArrowUpRight size={20} />
      <span className="sr-only"> ({newTabLabel})</span>
    </a>
  );
}
