import { TeaserCard as ProductCard } from "@/components/product/TeaserCard";
import { SectionHeading } from "@/components/ui/SectionHeading";
import type { TeaserProduct } from "@/lib/products";

export function ProductTeaser({ products }: { products: TeaserProduct[] }) {
  return (
    <section id="urunler" aria-labelledby="urunler-title" className="py-section">
      <div className="mx-auto max-w-page px-gutter">
        <div className="reveal flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading
            id="urunler-title"
            eyebrow="Ürünler"
            title="Türkiye raflarından ilk seçki"
            intro="Cilt, saç, el ve vücut bakımından ev temizliğine; Türkiye'de satışa sunulacak ürünlerden bazıları."
          />
          <p className="hidden shrink-0 text-sm text-ink-muted md:block md:max-w-xs md:text-right">
            Fiyatlar bilgilendirme amaçlıdır ve değişebilir.
          </p>
        </div>

        {/* Mobile: swipeable rail with a peek of the next card. md+: grid. */}
        <div
          role="region"
          aria-label="Ürün seçkisi"
          tabIndex={0}
          className="-mx-gutter mt-stack flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-px-gutter px-gutter pb-4 [scrollbar-width:thin] md:mx-0 md:grid md:snap-none md:grid-cols-2 md:gap-6 md:overflow-visible md:px-0 md:pb-0 lg:grid-cols-4"
        >
          {products.map((product) => (
            <div key={product.code} className="w-[74%] max-w-[18rem] shrink-0 snap-start sm:w-[46%] md:w-auto md:max-w-none">
              <ProductCard product={product} />
            </div>
          ))}
        </div>

        <div className="reveal mt-8 rounded-lg bg-surface-muted px-5 py-4 text-sm text-ink-muted ring-1 ring-line">
          <dl className="grid gap-x-8 gap-y-2 sm:grid-cols-3">
            <div>
              <dt className="inline font-medium text-ink">Fiyat: </dt>
              <dd className="inline">herkes için geçerli satış fiyatı.</dd>
            </div>
            <div>
              <dt className="inline font-medium text-green-700">Üye fiyatı: </dt>
              <dd className="inline">Greenleaf üyelerine özel fiyat.</dd>
            </div>
            <div>
              <dt className="inline font-medium text-ink">PV: </dt>
              <dd className="inline">ürünün Greenleaf üyelik sistemindeki puan değeri.</dd>
            </div>
          </dl>
          <p className="mt-2 md:hidden">Fiyatlar bilgilendirme amaçlıdır ve değişebilir.</p>
        </div>
      </div>
    </section>
  );
}
