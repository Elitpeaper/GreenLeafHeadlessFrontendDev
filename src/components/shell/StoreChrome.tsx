import type { ReactNode } from "react";
import { getCartCatalog, getCategoryTree } from "@/lib/products";
import { CartProvider } from "@/lib/cart";
import { pickClientText } from "@/lib/ui-text";
import { UiTextProvider } from "@/lib/ui-text/client";
import { AnnouncementBar } from "./AnnouncementBar";
import { CartDrawer } from "./CartDrawer";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { getMenuModel } from "./menu-data";

/**
 * Store chrome: providers + global slots (Announcement, Header[MegaMenu, MobileNav, Search], main, Footer, CartDrawer).
 * Used by app/(magaza)/layout.tsx and app/not-found.tsx. Data is fetched here (server) and passed down as plain props;
 * client slots never import @/lib/products.
 */
export async function StoreChrome({ children }: { children: ReactNode }) {
  const [tree, cartCatalog] = await Promise.all([
    getCategoryTree(),
    getCartCatalog(),
  ]);
  const roots = await getMenuModel(tree);
  return (
    <UiTextProvider dict={pickClientText()}>
      <CartProvider catalog={cartCatalog}>
        <AnnouncementBar />
        <Header roots={roots} />
        <main
          id="icerik"
          tabIndex={-1}
          className="pb-9 outline-none [&:has(>:last-child[class*='bg-'])]:pb-0"
        >
          {children}
        </main>
        <Footer roots={roots} />
        <CartDrawer />
      </CartProvider>
    </UiTextProvider>
  );
}
