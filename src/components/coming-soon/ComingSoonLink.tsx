import Link from "next/link";
import type { ReactNode } from "react";
import { t } from "@/lib/ui-text";
import { ComingSoonBadge, type ComingSoonBadgeProps } from "./ComingSoonBadge";
import { isPlaceholderHref } from "./placeholders";

/**
 * K-182 drop-in for <a>/<Link> whose target may not exist yet (site.ts sponsor link, e-mail, phone, a page that is
 * not built). Real href → normal link. Placeholder/empty/"#"/"javascript:" → NOT a link: the label is rendered as
 * plain text followed by a "Çok yakında" pill (no focus stop, nothing to click).
 *
 *   <ComingSoonLink href={`mailto:${site.email}`} className="…">{site.email}</ComingSoonLink>
 *   <ComingSoonLink href={site.sponsorLink} external>Üye ol</ComingSoonLink>
 *   <ComingSoonLink href="/blog" soon>Blog</ComingSoonLink>      force the soon state (page not built yet)
 *
 * `hideLabelWhenSoon` drops the label (useful when the label IS the placeholder, e.g. "iletisim@alanadi.com.tr").
 */
type Props = {
  href: string | null | undefined;
  children: ReactNode;
  className?: string;
  /** className for the soon state wrapper (defaults to className) */
  soonClassName?: string;
  external?: boolean;
  /** force the soon state even if href looks valid */
  soon?: boolean;
  hideLabelWhenSoon?: boolean;
  badge?: ComingSoonBadgeProps;
};

export function ComingSoonLink({ href, children, className = "", soonClassName, external, soon, hideLabelWhenSoon, badge }: Props) {
  if (soon || isPlaceholderHref(href)) {
    return (
      <span className={`inline-flex flex-wrap items-center gap-2 ${soonClassName ?? className}`}>
        {!hideLabelWhenSoon && <span>{children}</span>}
        <ComingSoonBadge {...badge} />
      </span>
    );
  }
  const url = href as string;
  if (external || /^(https?:|mailto:|tel:)/i.test(url)) {
    return (
      <a href={url} className={className} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
        {children}
        {external && <span className="sr-only"> ({t("common.opensNewTab")})</span>}
      </a>
    );
  }
  return (
    <Link href={url} className={className}>
      {children}
    </Link>
  );
}
