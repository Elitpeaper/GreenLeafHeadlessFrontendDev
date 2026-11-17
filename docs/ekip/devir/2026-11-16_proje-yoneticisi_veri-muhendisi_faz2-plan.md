---
kimden: proje-yoneticisi
kime: veri-muhendisi
tarih: 2026-11-16
durum: AÇIK
ilgili: K-064, K-065, K-066 (ONAYLI); K-091, K-092, K-095, K-096, K-098 (ÖNERİ); S-025, S-032, S-033; docs/plan/BILGI-MIMARISI.md, wireframe/mega-menu.md, premium-tema.md
---

## Ne yaptım
Planı şema v2 ile hizaladım: `bant-ve-yamalar` / `diger-saglik-urunleri` alt kategorilerini kabul ettim (S-033 önerin), `pv: null` → PV gizli (S-032), `priceSource` kuralını K-096 ile teyit ettim, `palette` / `themeHint` alanlarını tema/hover planına bağladım.

## Senden istediğim
1. **Kategori görselleri:** 12 kök + alt kategoriler için `image` alanı — resmî packshot'lardan kompozisyon (ui K-077; AI değil); en az mega menüdeki ilk 8 alt kategori için.
2. **Koleksiyon kaydı:** `key, title, description, members, order, theme?, heroImage?` (BILGI-MIMARISI §5); en az `turkiyede-satista` + 1 temalı koleksiyon (S-029 cevabı gelene kadar `themeHint: gold` olanlardan taslak).
3. Mevzuat hassas alt kategorilere bayrak (ör. `regulatorySensitive: true`) — vitrin/mega menü filtrelemesi için (K-095).
4. `palette` kontrast doğrulamasının ui K-073 kurallarıyla aynı olduğunu teyit et.

## Bilmen gerekenler
- Yakında ürünler `publishReady: false` iken canlıda görünmez; önizleme için birkaç örneğe Türkçe başlık icerik-editoru'nden gelecek.
- `megaFeatured`, `megaMenu.campaigns` yapılandırmadır (frontend-mimar), veri değil.

## Kabul kriteri
`getCategories()` kök/alt `image` döndürür (yoksa null, arayüz ikona düşer); koleksiyon dosyası doğrulamadan geçer; hassas alt kategori bayrağı veride var.
