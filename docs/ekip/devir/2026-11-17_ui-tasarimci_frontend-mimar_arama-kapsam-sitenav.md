---
kimden: ui-tasarimci
kime: frontend-mimar
tarih: 2026-11-17
durum: KAPANDI
ilgili: K-268, K-266, K-269, K-270 · docs/tasarim/bilesenler/header-arama-kategori.md §2.1, §4 · data/content/stock-images.json
---

## Ne yaptım
Header arama kapsülü (kategori kapsamlı arama) ve "Keşfet" tüm sayfalar paneli spesifikasyonu; 50 yeni stok fotoğraf slotu (manifest 26 → 76 slot).

## Senden istediğim
1. **Kapsamlı arama:** `GET /api/arama?q=…&kok={kök}` (kök filtresi; geçersiz kök → yok sayılır) ve `/arama?q=…&kok={kök}` (listeleme parametresi; sonuçta kaldırılabilir çip). Kanonik/robots kararı seo-uzmani ile (arama zaten noindex).
2. **`siteNav` tek kaynağı** `src/config/` altında: grup (alisveris | rehber | greenleaf | yardim), `labelKey`, `href`, `soon?`, `external?`, `count?` (favoriler). Keşfet paneli, mobil çekmece ve footer bunu okur. İçerik: spec §4 tablosu; koleksiyonlar `storefront.ts` tanımlarından boş olmayanlar.
3. `src/lib/images.ts`: değişiklik gerekmiyor; yalnız manifest büyüdü (~+50 blurDataURL). Server component'ten okunduğu sürece istemci paketine girmez — client bileşenlerde import edilmediğini incelemede kontrol et (K-263 JS bütçesi).

## Bilmen gerekenler
- Yeni slot aileleri: `shelf.*`(12), `page.*`(8), `door.*` + `door.*.tall`(8), `about.*`(3), `listing.*`(2), `collection.default`, `promo.mega`, `blog.cover.<slug>`(4), `nature.*`(4), `lifestyle.*`(3), `texture.*`(3), `finder.serum`.
- `/sss` yeni rota (K-269); seo-uzmani'ye rota notu senden.

## Kabul kriteri
Kapsamlı arama uç noktası + sayfa parametresi çalışıyor; `siteNav` tek dosyada ve üç tüketici onu kullanıyor.

## Kapanış (frontend-mimar, 2026-11-17)
- (1) `?kok=` kapsamı: `GET /api/arama?q=&kok=` + `/arama?q=&kok=` (kaldırılabilir çip, kapsamda 0 sonuçta "Tüm ürünlerde ara"). Geçersiz/boş kök yok sayılır. Kullanım: `2026-11-17_frontend-mimar_frontend-gelistirici_sitenav-arama-api.md`.
- (2) `siteNav`: `src/config/site-nav.ts` (tanım) + `src/lib/site-nav.ts` `getSiteNav()` (çözümleyici); rota/çapa/etiket testi `src/lib/site-nav.test.ts`. Üç tüketiciye bağlama frontend-gelistirici (A)'da.
- (3) `images.ts` client import kontrolü: bu turda yapılmadı, header incelemesinde bakılacak.
