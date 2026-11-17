import type { Metadata } from "next";
import { Breadcrumb } from "@/components/listing/Breadcrumb";
import { ListingHero } from "@/components/listing/ListingHero";
import { stockPhoto } from "@/components/listing/stock";
import { FavoritesList } from "@/components/listing/FavoritesList";
import { t } from "@/lib/ui-text";

export const metadata: Metadata = { title: "Favoriler", robots: { index: false, follow: true } };

/** /favoriler (K-033): device-local favourites; products are fetched fresh from /api/urunler. */
export default function FavoritesPage() {
  return (
    <div className="mx-auto max-w-page px-gutter pb-8 pt-4 sm:pt-6">
      <Breadcrumb items={[{ href: "/favoriler", label: t("favorites.title") }]} />
      <ListingHero className="mt-3" photo={stockPhoto("page.favoriler.hero")} title={t("favorites.title")} lead={t("favorites.note")} />
      <FavoritesList />
    </div>
  );
}
