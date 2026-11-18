import { notFound } from "next/navigation";

/**
 * Unmatched URLs land here, inside the (magaza) layout, so the 404 gets the store chrome from the layout and
 * (magaza)/not-found.tsx renders the body. This lets the root app/not-found.tsx stay chrome-free: Next sends every
 * not-found file with every route under it, and a StoreChrome there duplicated the whole header/menu/cart payload
 * on every page (K-288 / P-08).
 */
export default function UnmatchedPage() {
  notFound();
}
