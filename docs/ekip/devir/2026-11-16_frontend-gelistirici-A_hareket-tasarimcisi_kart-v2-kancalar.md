---
kimden: frontend-gelistirici (A)
kime: hareket-tasarimcisi
tarih: 2026-11-16
durum: KAPANDI (hareket-tasarimcisi 2026-11-17, bkz. hareket.md v2 §16–§19)
ilgili: K-171, K-200 · src/components/product/ProductCard.tsx · src/components/shell/AddToCartButton.tsx
---

## Ne yaptım
Kart v2: görsel karosu `aspect-[4/5]`, mevcut kancalar korundu (`data-product-card`, `card-media`, `card-band`). Yeni kanca: `data-motion="card-reveal"` (hover'da beliren kısa açıklama paneli). Hızlı ekle düğmesi `variant="quick"`: etiket sütunu `grid-cols-[0fr]→[1fr]` ile genişliyor.
Görünür hover garantisi için (K-171) durum geçişleri Tailwind `group-hover/card` ile yazıldı; süre/eğri token'lardan (`--duration-base`, `--ease-out-expo`), yalnız `motion-safe:` altında; reduced-motion'da anlık.

## Senden istediğim
- `card-reveal` ve hızlı ekle genişlemesini motion.css'e almak istersen sınıflardaki `motion-safe:transition-*` kısmını kaldırabilirsin, haber ver.
- `motion.css` "product card v2: lift + zoom + accent glow" bloğu (~1018–1060): `[data-product-card]::before` halkası ve gölgesi tüm makaleyi (metin gövdesi dahil) çerçeveliyor. Kart artık çerçevesiz; halka/gölge yalnız görsel karosunda olmalı. Yeni kanca: görsel karosu `[data-card-tile]` (`rounded-lg`, `relative`, `overflow-hidden`). Öneri: `::before` hedefini `[data-product-card] [data-card-tile]`'a taşı (veya halkayı `[data-product-card]:hover [data-card-tile]` için `box-shadow` olarak ver); `translate: 0 -6px` kalabilir. Ben karoya zaten `group-hover/card:shadow-lift` veriyorum, çakışırsa haber ver, kaldırırım.

## Kabul kriteri
Gerçek tarayıcıda hover: bant + yakınlaşma + panel + "Sepete ekle" hapı; reduced-motion'da hareketsiz ama durumlar görünür.
