import type { NextConfig } from "next";

/** K-121 preview flag (same expression as src/config/storefront.ts; next.config cannot import app modules). */
const PREVIEW_ALL = process.env.NEXT_PUBLIC_PREVIEW_ALL === "1";

/** Internal prototype/catalogue routes: never indexed, and /hareket-lab only exists on preview builds. */
const INTERNAL_ROUTES = ["/hareket-lab", "/svg-kutuphanesi"];

const nextConfig: NextConfig = {
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    remotePatterns: [
      // Official Greenleaf images (panel + teaser packshots).
      { protocol: "https", hostname: "greenleaf-global.com", pathname: "/data/files/**", search: "" },
      // "Türkiye'ye yakında" product images (K-107: remote, RU shop).
      { protocol: "https", hostname: "global.green-leaf.shop", pathname: "/image/**", search: "" },
      // K-102 licensed stock photography (commercial-use licenses; source + license logged in docs/tasarim/gorsel-kaynaklari.md).
      { protocol: "https", hostname: "images.unsplash.com", pathname: "/**" },
      { protocol: "https", hostname: "images.pexels.com", pathname: "/**" },
    ],
    formats: ["image/avif", "image/webp"],
    qualities: [75],
  },
  // K-087 / SAYFA-HARITASI redirects. Temporary (307) until seo-uzmani fixes the final status codes.
  async redirects() {
    return [
      { source: "/sepet", destination: "/?sepet=ac", permanent: false },
      { source: "/odeme", destination: "/?sepet=ac", permanent: false },
      { source: "/odeme/:path*", destination: "/?sepet=ac", permanent: false },
      { source: "/cilt-testi", destination: "/cilt-tipine-gore", permanent: false },
      { source: "/cilt-testi/:path*", destination: "/cilt-tipine-gore", permanent: false },
      // Permanent (308): final addresses (TASARIM-INCELEME-1 C-4, K-086).
      { source: "/pv", destination: "/pv-nedir", permanent: true },
      { source: "/kvkk", destination: "/yasal/kvkk-aydinlatma-metni", permanent: true },
      { source: "/cerez-politikasi", destination: "/yasal/cerez-politikasi", permanent: true },
      { source: "/iletisim", destination: "/hakkimizda#iletisim", permanent: false },
      { source: "/kategori", destination: "/", permanent: false },
      { source: "/urun", destination: "/", permanent: false },
      { source: "/koleksiyon", destination: "/", permanent: false },
    ];
  },
  // Production builds: /hareket-lab (hareket-tasarimcisi Faz 2 prototype) answers 404 — the rewrite runs before the
  // filesystem and targets a path that does not exist. Preview builds (NEXT_PUBLIC_PREVIEW_ALL=1) keep it.
  async rewrites() {
    return {
      beforeFiles: PREVIEW_ALL
        ? []
        : [
            { source: "/hareket-lab", destination: "/__internal-disabled" },
            { source: "/hareket-lab/:path*", destination: "/__internal-disabled" },
          ],
      afterFiles: [],
      fallback: [],
    };
  },
  async headers() {
    return INTERNAL_ROUTES.flatMap((route) => [
      { source: route, headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
      { source: `${route}/:path*`, headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }] },
    ]);
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
