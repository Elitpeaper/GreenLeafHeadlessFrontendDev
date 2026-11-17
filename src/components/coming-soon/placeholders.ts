/**
 * K-182 — "no empty or placeholder link" guard. Pure helpers, isomorphic (safe in client components).
 *
 * src/config/site.ts (frontend-mimar) still carries placeholder seller data (K-047). Instead of rendering those as
 * links, callers ask here and render <ComingSoonBadge /> (or use <ComingSoonLink />, which does it for them).
 * When the real values land in site.ts these return "ready" automatically — no call site changes.
 */
import { site } from "@/config/site";

/** Values that are known placeholders in site.ts (and generic patterns). Matching is case-insensitive. */
const PLACEHOLDER_PATTERNS: RegExp[] = [
  /example\.(com|org|net)/i,
  /MEMBERSHIP_URL/i,
  /alanadi\./i,
  /^\+?90?5?0{6,}$/, // +905000000000
  /^(tel:)?\+?90\s?500\s?000/i,
  /^Ad Soyad$/i,
  /^(lorem|xxx|tbd|todo)\b/i,
];

const isPlaceholderValue = (v: string | null | undefined): boolean => {
  const s = (v ?? "").trim();
  return s === "" || PLACEHOLDER_PATTERNS.some((re) => re.test(s));
};

/**
 * True when an href must NOT be rendered as a link: empty, "#", "javascript:", a bare "mailto:"/"tel:",
 * or any known placeholder value. In-page anchors such as "#iletisim" are valid and return false.
 */
export function isPlaceholderHref(href: string | null | undefined): boolean {
  const s = (href ?? "").trim();
  if (s === "" || s === "#" || /^javascript:/i.test(s)) return true;
  if (/^(mailto|tel):$/i.test(s)) return true;
  const value = s.replace(/^(mailto|tel):/i, "");
  return isPlaceholderValue(value);
}

/** Readiness of the seller identity fields in site.ts. */
export const siteReady = {
  sellerName: !isPlaceholderValue(site.sellerName),
  email: !isPlaceholderValue(site.email),
  phone: !isPlaceholderValue(site.phone.e164),
  sponsorLink: !isPlaceholderHref(site.sponsorLink),
  domain: !isPlaceholderValue(site.domain),
} as const;
