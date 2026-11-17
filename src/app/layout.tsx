import type { Metadata, Viewport } from "next";
import { FontSwitcher } from "@/components/dev/FontSwitcher";
import { MotionRoot } from "@/components/motion/MotionRoot";
import { site, siteUrl } from "@/config/site";
import { fontBootScript, fontVariables } from "@/lib/fonts";
import "./globals.css";

// Site-wide defaults; pages override. Final copy + canonical strategy: seo-uzmani (src/lib/seo/).
const title = "Greenleaf Türkiye";
const description =
  "Greenleaf cilt bakımı, kişisel bakım ve ev ürünleri. Fiyatı ve üye fiyatını birlikte gör, üye ol, üye fiyatıyla al.";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: { default: title, template: "%s · Greenleaf Türkiye" },
  description,
  applicationName: "Greenleaf Türkiye",
  authors: [{ name: site.sellerName }],
  openGraph: {
    type: "website",
    locale: "tr_TR",
    siteName: "Greenleaf Türkiye",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  formatDetection: { telephone: false },
};

export const viewport: Viewport = {
  themeColor: "#4EAE36",
  colorScheme: "light",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="tr" className={`${fontVariables} antialiased`} suppressHydrationWarning>
      <head>
        {/* Applies ?font= before first paint (K-042 preview comparison). */}
        <script dangerouslySetInnerHTML={{ __html: fontBootScript }} />
      </head>
      <body className="min-h-dvh bg-surface font-sans text-ink">
        <MotionRoot />
        <a
          href="#icerik"
          className="sr-only z-50 rounded-pill bg-green-700 px-4 py-2 text-white focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
        >
          İçeriğe geç
        </a>
        {children}
        <FontSwitcher />
      </body>
    </html>
  );
}
