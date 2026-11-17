/**
 * Seller identity & site-wide settings (K-047).
 * ALL VALUES BELOW ARE PLACEHOLDERS — replace them when the user provides real data.
 * Membership URL can also be injected at deploy time via NEXT_PUBLIC_MEMBERSHIP_URL (Vercel env).
 */
export const site = {
  /** Shown in footer + membership block. */
  sellerName: "Ad Soyad",
  sellerTitle: "Bağımsız Greenleaf Distribütörü",
  email: "iletisim@alanadi.com.tr",
  /** E.164 for the tel: link, display string for the UI. */
  phone: { e164: "+905000000000", display: "+90 500 000 00 00" },
  /** Bare domain, no protocol. Used for metadataBase / canonical / OG. */
  domain: "alanadi.com.tr",
  /** Sponsor registration link (MEMBERSHIP_URL). Opens in a new tab. */
  sponsorLink: process.env.NEXT_PUBLIC_MEMBERSHIP_URL ?? "https://example.com/MEMBERSHIP_URL",
  /**
   * S-053: Greenleaf member login (account panel, K-017). null until the user supplies it -> UI shows the
   * "Çok yakında" state, never a placeholder link (K-182). Deploy-time override: NEXT_PUBLIC_MEMBER_LOGIN_URL.
   */
  memberLoginUrl: (process.env.NEXT_PUBLIC_MEMBER_LOGIN_URL || null) as string | null,
  copyrightYear: 2026,
  /** K-036 — list price = member price × this. Mirrors data/teaser.json. */
  listPriceMultiplier: 2,
} as const;

export const siteUrl = `https://${site.domain}`;
