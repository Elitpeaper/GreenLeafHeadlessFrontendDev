import Link from "next/link";
import type { ReactNode } from "react";
import { ArrowRight } from "@/components/ui/lucide";
import { t } from "@/lib/ui-text";
import { ComingSoonBadge } from "./ComingSoonBadge";
import { ForestPanel, creamCtaClass, creamCtaStyle, ghostOnForestClass } from "./ForestPanel";
import { ComingSoonIllustration, type IllustrationKind } from "./ComingSoonIllustration";

/**
 * K-181 full-page "Çok yakında" state for anything that is not ready (legal texts, unbuilt sections, empty blog…).
 * Server component; renders INSIDE the page's chrome (StoreChrome comes from the route layout).
 *
 *   <ComingSoonPage title="KVKK aydınlatma metni" illustration="document" />
 *   <ComingSoonPage title="Haberler" body={t("…")} illustration="news" cta={{ href: "/blog", label: "Blog" }} />
 *
 * Defaults: body = comingSoon.body, primary CTA = "Alışverişe devam et" → /koleksiyon/turkiyede-satista,
 * secondary = "Ana sayfa" → /. `as="h2"` when the page already has an h1. `children` render under the CTAs.
 * Never put internal notes (draft, expert review, preview…) in title/body — K-181.
 */
export type ComingSoonPageProps = {
  title: string;
  body?: string;
  eyebrow?: string;
  illustration?: IllustrationKind;
  cta?: { href: string; label: string };
  secondary?: { href: string; label: string } | null;
  as?: "h1" | "h2";
  /** "page" = full section with vertical rhythm; "inline" = compact block for use inside another page */
  layout?: "page" | "inline";
  children?: ReactNode;
};

export function ComingSoonPage({
  title,
  body,
  eyebrow,
  illustration = "sprout",
  cta,
  secondary,
  as: H = "h1",
  layout = "page",
  children,
}: ComingSoonPageProps) {
  const primary = cta ?? { href: "/koleksiyon/turkiyede-satista", label: t("comingSoon.cta") };
  const second = secondary === undefined ? { href: "/", label: t("comingSoon.secondary") } : secondary;

  return (
    <ForestPanel labelledBy="coming-soon-title" layout={layout}>
      <div className="order-1 mx-auto w-full max-w-xs text-cream-100 md:order-2 md:max-w-none" data-motion="reveal-scale" data-svg-host>
        <ComingSoonIllustration kind={illustration} className="h-auto w-full" />
      </div>

      <div className="order-2 text-center md:order-1 md:text-left" data-motion="reveal">
        {eyebrow && <p className="mb-3 text-sm font-medium text-cream-100">{eyebrow}</p>}
        <ComingSoonBadge size="md" />
        <H id="coming-soon-title" className={`mt-4 text-balance text-cream-200 ${H === "h1" ? "text-4xl md:text-5xl" : "text-3xl"}`}>
          {title}
        </H>
        <p className="mx-auto mt-4 max-w-prose text-pretty text-lg text-cream-100 md:mx-0">{body ?? t("comingSoon.body")}</p>
        <div className="mt-stack flex flex-col items-center gap-3 sm:flex-row sm:justify-center md:justify-start">
          <Link href={primary.href} className={creamCtaClass} style={creamCtaStyle}>
            {primary.label}
            <ArrowRight size={20} className="transition-transform duration-[250ms] group-hover:translate-x-0.5" />
          </Link>
          {second && (
            <Link href={second.href} className={ghostOnForestClass}>
              {second.label}
            </Link>
          )}
        </div>
        {children && <div className="mt-stack">{children}</div>}
      </div>
    </ForestPanel>
  );
}
