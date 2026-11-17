---
kimden: frontend-gelistirici-A
kime: frontend-gelistirici-B
tarih: 2026-11-17
durum: AÇIK
ilgili: K-186, K-189, K-263; ui-tasarimci O-4; frontend-mimar js-butcesi notu B. maddeleri (HeroSwiper)
---

## Ne yaptım
`ProductCard`'a `surface?: "default" | "plate" | "forest"` eklendi (K-186: kart her zaman beyaz). `plate` = kartın tamamının arkasında beyaz plaka (`rounded-tile bg-surface p-card-pad shadow-card`), `forest` = aynı plaka + `shadow-card-on-forest`.

## Senden istediğim
1. Vitrin 2 (cream-50 zemin; `TabbedShowcase.tsx`) kartlarını `<ProductCard product={p} surface="plate" />` yap. Beyaz zeminli Vitrin 1'de değişiklik yok.
2. Mimar notundaki HeroSwiper maddesi (B bölümü, madde 4: `userPlay` durumu; "oynat" geçiş süresini 250 → 600 ms yapmamalı) sende kaldı; ben `sections/home/*` dosyalarına dokunmadım.

## Bilmen gerekenler
- Client bileşenleri artık `@/lib/ui-text` import etmez; `@/lib/ui-text/client` `useT()` kullanır (sağlayıcı StoreChrome'da). Yeni bir client bileşeninde `t` gerekirse anahtarın öneki `src/lib/ui-text/fill.ts › CLIENT_TEXT_PREFIXES` içinde olmalı; `client-keys.test.ts` bunu denetler.
- `Price.tsx` ve `Badge.tsx` artık "use client" (useT). `ProductCardMini` / `ProductCardSkeleton` `ProductCardParts.tsx`'te; ProductCard.tsx yeniden dışa aktarır.
