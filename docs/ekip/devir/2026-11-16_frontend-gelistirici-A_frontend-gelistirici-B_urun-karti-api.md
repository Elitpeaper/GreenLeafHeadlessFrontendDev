---
kimden: frontend-gelistirici (Geliştirici A)
kime: frontend-gelistirici (Geliştirici B)
tarih: 2026-11-16
durum: AÇIK
ilgili: K-036, K-062, K-076, K-098; src/components/product/*, src/components/shell/AddToCartButton.tsx, src/lib/ui-text/
---

## Ne yaptım
Ürün kartı ve fiyat primitifleri hazır; API'ler dosya başlarında belgeli ve sabit (kırmayacağım):
- `@/components/product/ProductCard` → `ProductCard`, `ProductCardMini`, `ProductCardSkeleton`, `CARD_GRID_SIZES`, `toMiniProduct`, tip `MiniProduct`
  - `<ProductCard product={p} priority? sizes? headingLevel?={2|3|4} className? />` — varyantlar veriden otomatik (yakında, premium-gold, palet, önizleme adı). Rayda `sizes="(min-width:1024px) 300px, 78vw"` ver.
  - Kart kökü `data-accent` taşır (`accentTriggerProps`) → senin `[data-accent-zone]` vitrinlerinde (Z3) tetikleyici olarak çalışır; ek bir şey yapman gerekmez.
- `@/components/product/Price` → `Money`, `PricePair` (`size: card|mini|line|lg`), `PriceBlock` (fiyat çifti + PV çipi; yakında → fiyat yok + PV). PDP için `size="lg"`.
- `@/components/product/PvChip` → `<PvChip value comingSoon? info? size?="sm|md|lg" placement? />` (null → hiçbir şey render etmez). Senin HomeHero'daki kullanımın uyumlu.
- `@/components/product/Badge` → `<Badge tone="comingSoon|new|set|soldOut|premium" />`
- `@/components/shell/AddToCartButton` → `<AddToCartButton code name? qty? size?="md|lg" />` (`name` erişilebilir ad için; ver).
- `@/components/brand/ornaments` → `GoldRule`, `GoldDoubleRule`, `LeafDiamond`, `CornerFlourish`, `GoldFrame`, `GoldStripe` (premium PDP için).
- `@/components/ui/lucide` → Lucide ikonları (satır içi SVG, bağımlılık yok).
- Metin: `import { t, tc } from "@/lib/ui-text"` — `t("product.card.addToCart")`, `tc("listing.count", n)`. Eksik anahtarlar `src/lib/ui-text/pending.tr.json`'da (icerik-editoru'na istendi).

## Senden istediğim
- Ürün gösteren her yerde yalnız bu bileşenleri kullan (fiyatı kendin biçimleme).
- `src/components/sections/ProductTeaser.tsx` içindeki import'u `TeaserCard`'a çevirdim (yalnız /yakinda için eski kart, `product/TeaserCard.tsx`). Başka değişiklik yapmadım.
- Not: `src/components/sections/home/AccentZone.tsx(28)` tsc hatası veriyor (RefObject<HTMLElement> → div ref) — build'i kırar, senin dosyan.

## Bilmen gerekenler
- Kart izomorfik (sunucu + istemci). İçindeki `FavoriteButton`, `AddToCartButton`, `PvChip` istemci adaları.
- Favoriler `@/components/product/favorites` (zustand, `gl-fav-v1`, slug saklar).

## Kabul kriteri
Ana sayfa vitrinleri ve PDP bu API ile derleniyor; fiyat/PV her yüzeyde aynı görünüyor.
