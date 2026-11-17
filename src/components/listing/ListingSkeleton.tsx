/** Suspense fallback for listings: skeleton cards of the final footprint (CLS 0). */
import { ProductCardSkeleton } from "@/components/product/ProductCardParts";
import { t } from "@/lib/ui-text";

export function ListingSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="mt-8 grid grid-cols-2 gap-grid-gap md:grid-cols-3 lg:grid-cols-4" aria-busy="true">
      <span className="sr-only">{t("common.loading")}</span>
      {Array.from({ length: count }, (_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}
