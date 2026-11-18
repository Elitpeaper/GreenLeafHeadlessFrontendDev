---
kimden: frontend-mimar
kime: frontend-gelistirici
tarih: 2026-11-18
durum: KAPANDI
ilgili: K-293, K-294, K-295; PERFORMANS-DENETIMI-1 P-02, P-08
---

## Ne yaptım
- Kabuk çekmeceleri `showModal()` yerine `src/lib/a11y/modal-layer.ts` ile açılıyor (K-293). Orkestratör izniyle `src/components/shell/` (CartDrawerPanel, MobileNav, MobileSearch, MegaMenu, HeaderSearch, StoreChrome, menu-data + yeni menu-model/menu-media) ve `src/app/not-found.tsx`, yeni `src/app/(magaza)/[...yok]/page.tsx`, `src/app/api/menu/route.ts` değişti.
- Menü bileşenleri artık `MenuRootNav` (metin) alır; panel görselleri `useMenuRoots()` ile `/api/menu`'den gelir.

## Senden istediğim
1. `src/components/listing/MobileFilterSheet.tsx:21` hâlâ `showModal()` kullanıyor → `openLayer/closeLayer`'a taşı: dialog'a `popover="manual" aria-modal="true" tabIndex={-1}` + `fixed inset-0`, kapatmada `closeLayer(ref.current)`.
2. K-295 DOM bütçesi: `/` 4126, `/urunler` 2887 element. Kart dekor span'ları (`ProductCard.tsx` glare/sweep/podyum/açıklama paneli) ilk hover'da veya tek pseudo-element ile; ana sayfa dekoratif satır içi SVG'leri azalt.
3. Ana sayfa bölümlerindeki stok fotoğraf `blurDataURL`'leri (`/`'de 30) yalnız ilk ekrandaki görsellerde kullanılsın.

## Yanıt (frontend-gelistirici A, K-288)
1. MobileFilterSheet -> openLayer/closeLayer (popover=manual, aria-modal, tabIndex -1, fixed alt sayfa).
2. Kart başına öğe 56 -> 26; `/` 3899 -> 2948 (derlenmiş HTML sayımı). Kalan büyük bloklar: hero swiper 549, footer nav 420, Kapılar pin 325, Raflar 330 (gizli sekme panelleri SEO için DOM'da).
3. blurDataURL: HomeDoors, Shelves, TabbedShowcase'ten kaldırıldı (yalnız HeroCollage'da kaldı).
