"use client";

import Link from "next/link";
import { useId, useRef, useState, type FormEvent } from "react";
import { AlertIcon } from "./AlertIcon";
import { ComingSoonBadge } from "@/components/coming-soon/ComingSoonBadge";
import { Check, Mail } from "@/components/ui/lucide";
import { t } from "@/components/sections/copy";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

/**
 * "Rutinimi e-postama gönder" (K-100 ONAYLI: optional, result already visible; K-081 layout; K-090 rules).
 * Two separate, UNCHECKED boxes (explicit consent required + optional commercial e-mail). Submit is never
 * disabled; errors under the field, focus moves to the first error.
 * enabled=false (emailCapture config, service not configured): validation runs but NOTHING is sent anywhere —
 * the card switches to the "çok yakında" state and offers the copy-link alternative. No fetch exists in this
 * component yet; the service adapter is frontend-mimar's (CILT-TESTI §9).
 */
export function EmailCard({ enabled }: { enabled: boolean }) {
  const id = useId();
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [marketing, setMarketing] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; consent?: string }>({});
  const [state, setState] = useState<"idle" | "soon">("idle");
  const emailRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    const next: typeof errors = {};
    if (!EMAIL_RE.test(email.trim())) next.email = t("finder.email.error.format");
    if (!consent) next.consent = t("finder.email.error.consent");
    setErrors(next);
    if (next.email) return emailRef.current?.focus();
    if (next.consent) return consentRef.current?.focus();
    if (!enabled) setState("soon"); // no network request while the service is not configured
  };

  if (state === "soon") {
    return (
      <div className="rounded-xl bg-blue-50 p-6 ring-1 ring-blue-100" role="status">
        <p className="flex items-center gap-2 text-lg font-semibold text-blue-800">
          <Mail size={22} /> {t("finder.email.soon.title")}
        </p>
        <p className="mt-2 text-base text-ink">{t("finder.email.soon.body")}</p>
      </div>
    );
  }

  if (!enabled) {
    // K-181/K-182: the e-mail service is not configured -> no form, just the feature with a "Çok yakında" pill.
    return (
      <section className="rounded-xl bg-surface p-6 shadow-card ring-1 ring-line" aria-labelledby={`${id}-t`}>
        <h2 id={`${id}-t`} className="flex flex-wrap items-center gap-2 text-xl text-ink">
          <Mail size={22} className="text-green-700" /> {t("finder.email.title")}
          <ComingSoonBadge />
        </h2>
        <p className="mt-2 text-sm text-ink-muted">{t("finder.email.soon.body")}</p>
      </section>
    );
  }

  const box = "mt-1 size-6 shrink-0 cursor-pointer appearance-none rounded-sm bg-surface ring-1 ring-line-strong checked:bg-green-700 checked:ring-green-700";
  return (
    <form noValidate onSubmit={submit} className="rounded-xl bg-surface p-6 shadow-card ring-1 ring-line" aria-labelledby={`${id}-t`}>
      <h2 id={`${id}-t`} className="flex items-center gap-2 text-xl text-ink">
        <Mail size={22} className="text-green-700" /> {t("finder.email.title")}
      </h2>
      <p className="mt-2 text-sm text-ink-muted">{t("finder.email.body")}</p>

      <label htmlFor={`${id}-e`} className="mt-5 block text-base font-medium text-ink">
        {t("finder.email.field")}
      </label>
      <input
        ref={emailRef}
        id={`${id}-e`}
        type="email"
        inputMode="email"
        autoComplete="email"
        placeholder={t("finder.email.placeholder")}
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        aria-invalid={!!errors.email || undefined}
        aria-describedby={errors.email ? `${id}-ee` : undefined}
        className="mt-1.5 min-h-control w-full rounded-md bg-surface px-4 text-base text-ink ring-1 ring-line-strong placeholder:text-ink-muted aria-invalid:ring-2 aria-invalid:ring-danger"
      />
      {errors.email && (
        <p id={`${id}-ee`} className="mt-1.5 flex items-center gap-1.5 text-sm text-danger">
          <AlertIcon /> {errors.email}
        </p>
      )}

      <div className="mt-5 grid gap-4">
        <div>
          <label className="flex min-h-tap-min cursor-pointer gap-3 text-sm text-ink">
            <span className="relative">
              <input
                ref={consentRef}
                type="checkbox"
                checked={consent}
                onChange={(e) => setConsent(e.target.checked)}
                aria-invalid={!!errors.consent || undefined}
                aria-describedby={errors.consent ? `${id}-ce` : undefined}
                className={`peer ${box}`}
              />
              <Check size={16} className="pointer-events-none absolute left-1 top-2 hidden text-white peer-checked:block" />
            </span>
            <span>
              {t("finder.email.consent.result")}{" "}
              <Link href="/yasal/kvkk-aydinlatma-metni" target="_blank" className="font-medium text-green-700 underline">
                {t("finder.email.consent.resultLink")}
                <span className="sr-only"> ({t("common.opensNewTab")})</span>
              </Link>
            </span>
          </label>
          {errors.consent && (
            <p id={`${id}-ce`} className="ml-9 mt-1 flex items-center gap-1.5 text-sm text-danger">
              <AlertIcon /> {errors.consent}
            </p>
          )}
        </div>
        <label className="flex min-h-tap-min cursor-pointer gap-3 text-sm text-ink">
          <span className="relative">
            <input type="checkbox" checked={marketing} onChange={(e) => setMarketing(e.target.checked)} className={`peer ${box}`} />
            <Check size={16} className="pointer-events-none absolute left-1 top-2 hidden text-white peer-checked:block" />
          </span>
          <span>
            {t("finder.email.consent.marketing")}{" "}
            <Link href="/yasal/e-posta-acik-riza" target="_blank" className="font-medium text-green-700 underline">
              {t("finder.email.consent.marketingLink")}
              <span className="sr-only"> ({t("common.opensNewTab")})</span>
            </Link>
            <span className="mt-0.5 block text-ink-muted">{t("finder.email.consent.marketingOptional")}</span>
          </span>
        </label>
      </div>

      <button type="submit" className="mt-6 inline-flex min-h-control items-center justify-center rounded-pill bg-green-700 px-7 font-medium text-white transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-green-800">
        {t("finder.email.submit")}
      </button>
    </form>
  );
}

/** "Sonucunu sakla" + copy link (no network). */
export function SaveCard() {
  const [copied, setCopied] = useState(false);
  return (
    <div className="rounded-xl bg-surface-muted p-6 ring-1 ring-line">
      <h2 className="text-xl text-ink">{t("finder.save.title")}</h2>
      <p className="mt-2 text-sm text-ink-muted">{t("finder.save.body")}</p>
      <button
        type="button"
        onClick={async () => {
          try {
            await navigator.clipboard.writeText(window.location.href);
            setCopied(true);
          } catch {
            setCopied(false);
          }
        }}
        className="mt-5 inline-flex min-h-control items-center gap-2 rounded-pill bg-surface px-6 font-medium text-green-700 ring-1 ring-green-700 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-green-50"
      >
        {copied && <Check size={18} />} {t("finder.save.copy")}
      </button>
      <p role="status" aria-live="polite" className="mt-2 min-h-5 text-sm text-ink">
        {copied ? t("finder.save.copied") : null}
      </p>
    </div>
  );
}
