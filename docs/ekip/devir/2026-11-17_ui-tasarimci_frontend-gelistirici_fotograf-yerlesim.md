---
kimden: ui-tasarimci
kime: frontend-gelistirici
tarih: 2026-11-17
durum: AÇIK
ilgili: K-270, K-271, K-267, K-268, K-266, K-269 · docs/tasarim/briefler/fotograf-ve-svg-yerlesim.md · docs/tasarim/bilesenler/header-arama-kategori.md · tasarim-kurallari.md v1.4 §8.2–8.3, §9.5
---

## Ne yaptım
- 50 yeni lisanslı stok fotoğraf (Unsplash License, her biri fotoğraf sayfasında doğrulandı) → `public/images/stock/`, manifest `data/content/stock-images.json` (76 slot), kayıt `docs/tasarim/gorsel-kaynaklari.md` v2.
- Slot → yer haritası ve SVG'nin kalacağı boş alanlar: `briefler/fotograf-ve-svg-yerlesim.md`.
- Header arama + kategori kapsülü ve "Keşfet" tüm sayfalar paneli: `bilesenler/header-arama-kategori.md`.

## Senden istediğim (dosya bazında; slot adları birebir)
**Developer B (ana sayfa)**
1. `src/components/sections/home/Shelves.tsx:92` — karo zemini `getStockImage("shelf.<kök>")` foto (`object-cover`, scrim, ad scrim üstünde); `CategoryIllustration` köşede 40 px cream plakada işaret.
2. `src/components/sections/home/HomeDoors.tsx:91, :98, :214` + PvArt/FinderArt/PremiumArt — panel zemini `door.<key>.tall` (pin) / aynı foto 4:5 kırpım (şerit/bento); `SceneMembership`/`SceneBlog` buradan çıkar. Metin alt scrim (forest-950 ≥ %70). Brief §6 v2.2.
3. `src/components/sections/home/TabbedShowcase.tsx:56` `bigIcon` → `shelf.<sekme>` foto (4:5).
4. `HomeHero.tsx:262` `SceneHeroLeaves` yedeği kaldır; Dev şerit bileşeni kaldır (K-267); "Hikâyemiz →" bağlantısı Kapılar altına.
5. §3 boş alan SVG yerleşimleri (ana sayfa satırları) — `data-svg-interact` hareket-tasarimcisi sözlüğüyle.

**Developer A (kabuk, listeleme)**
6. `src/components/sections/PageHero.tsx:66` `HeroArt` → foto görsel sütunu (yeni prop `image`); sayfalar: `/pv-nedir` `page.pv.hero`, `/uye-ol` `page.uyeOl.hero`, `/hakkimizda` `page.hakkimizda.hero`, `/sertifikalar` `page.sertifikalar.hero`, `/cilt-tipine-gore` (`FinderPage.tsx:44`) `skinFinder.hero`.
7. `src/components/listing/ListingHero.tsx:63` `SceneHeroBotanical` → foto bandı + orman scrim: kategori `category.<kök>`, `/urunler` `listing.all`, `/arama` `listing.search`, koleksiyon `collection.default` (premium-gold: `premium.gold.1`).
8. `src/components/shell/PromoTile.tsx:53` → `promo.mega` foto.
9. Header: `bilesenler/header-arama-kategori.md` (kapsül: Kategoriler kapağı + kapsam seçici + giriş; alt satır güncellemesi; Keşfet paneli; mobil kapsam çipleri ve çekmece Keşfet grubu). `Header.tsx`, `MegaMenu.tsx`, `SearchBox.tsx`, `MobileNav*.tsx`, `MobileSearch.tsx`.
10. `/sss` sayfası (K-269): hero `page.sss.hero`, sağ sütunda boş alan SVG (§3). İçerik icerik-editoru'ndan.
11. `/favoriler`: kısa foto bant `page.favoriler.hero`; boş durum SVG kalır.

**Developer C (blog/haber)**
12. `src/components/blog/BlogHero.tsx:46` `SceneBlog` → `page.blog.hero`; `/haberler` → `page.haberler.hero`.
13. `src/components/blog/PostCover.tsx`: öncelik `post.cover` > `getStockImage("blog.cover.<slug>")` > kâğıt kesimi yedeği (4 slot hazır).
14. Liste sonu ve makale gutter'ında §3 SVG yerleşimi.

## Bilmen gerekenler
- Görsel yalnız `getStockImage()` ile; `placeholder="blur"`, gerçek `sizes`; hero dışı lazy. Dekoratifse `alt=""`.
- Fotoğraf üstü metin: scrim ≥ %70 forest-950 (beyaz metin worst case 5.85:1). Fiyat/üye rozeti/PV fotoğraf üstünde asla.
- Kapsamlı arama için `/api/arama?kok=` ve `/arama?…&kok=` parametresi frontend-mimar'a ayrıca devredildi; o gelene kadar kapsam seçici UI'sı yapılabilir, istek parametresiz gider.
- Keşfet listesi tek kaynak `siteNav` (frontend-mimar `src/config/`'te tanımlayacak); listeyi bileşen içine yazma.
- Bitince ekran görüntüleri 360/768/1024/1440 → K-184 incelemesi için bana.

## Kabul kriteri
`fotograf-ve-svg-yerlesim.md` §4 ve `header-arama-kategori.md` §8 maddeleri sağlanmış; §1 tablolarındaki her alan fotoğraflı; SVG sahneler yalnız §3 yerlerinde.
