"use client";

import { useEffect, useState } from "react";
import { Check } from "@/components/ui/lucide";
import { useT } from "@/lib/ui-text/client";

/**
 * Share row (K-180). URL comes from window.location at runtime — site.ts domain is still a placeholder, so no
 * absolute URL is baked in at build time. Before hydration only the copy button renders (a <button>, never "#").
 * Native share sheet where supported; X and Facebook intent links appear once the URL is known. No WhatsApp (K-010).
 */
export function ShareButtons({ title }: { title: string }) {
  const { t } = useT();
  const [url, setUrl] = useState<string | null>(null);
  const [canNative, setCanNative] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- browser-only values, read once after mount
    setUrl(window.location.href.split("#")[0] ?? null);
    setCanNative(typeof navigator.share === "function");
  }, []);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(url ?? window.location.href);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2400);
    } catch {
      /* clipboard blocked: nothing to do, the address bar still works */
    }
  };

  const btn =
    "inline-flex min-h-tap items-center justify-center gap-2 rounded-pill px-4 text-sm font-medium text-ink ring-1 ring-inset ring-line transition-colors duration-[250ms] hover:bg-green-50";

  return (
    <div role="group" aria-label={t("blog.share.title")} className="flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-semibold text-ink">{t("blog.share.title")}</span>
      {canNative && (
        <button type="button" className={btn} onClick={() => navigator.share({ title, url: url ?? undefined }).catch(() => undefined)}>
          <ShareIcon />
          {t("blog.share.native")}
        </button>
      )}
      <button type="button" className={btn} onClick={copy}>
        {copied ? <Check size={18} className="text-green-700" /> : <LinkIcon />}
        {copied ? t("blog.share.copied") : t("blog.share.copy")}
      </button>
      {url && (
        <>
          <a
            className={btn}
            href={`https://x.com/intent/post?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <XIcon />
            <span>{t("blog.share.x")}</span>
            <span className="sr-only"> ({t("common.opensNewTab")})</span>
          </a>
          <a
            className={btn}
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FacebookIcon />
            <span>{t("blog.share.facebook")}</span>
            <span className="sr-only"> ({t("common.opensNewTab")})</span>
          </a>
        </>
      )}
      <span className="sr-only" aria-live="polite">
        {copied ? t("blog.share.copied") : ""}
      </span>
    </div>
  );
}

const svgProps = {
  viewBox: "0 0 24 24",
  width: 18,
  height: 18,
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

/** Lucide "share-2" / "link" geometry (ISC). */
function ShareIcon() {
  return (
    <svg {...svgProps}>
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <path d="m8.59 13.51 6.83 3.98M15.41 6.51l-6.82 3.98" />
    </svg>
  );
}
function LinkIcon() {
  return (
    <svg {...svgProps}>
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg {...svgProps}>
      <path d="M4 4l16 16M20 4 4 20" />
    </svg>
  );
}
function FacebookIcon() {
  return (
    <svg {...svgProps}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}
