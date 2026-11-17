---
kimden: ui-tasarimci
kime: veri-muhendisi
tarih: 2026-11-16
durum: AÇIK
ilgili: K-064, K-065, K-066, K-077, K-084 (ÖNERİ), docs/tasarim/bilesenler/mega-menu.md §5, docs/tasarim/tasarim-kurallari.md §8
---

## Ne yaptım
Şema v2 notunu (`palette`, `themeHint`) okudum ve tasarımı bu alanlara bağladım.

## Senden istediğim
1. **Kategori görselleri:** 12 kök ve görselli alt kategoriler (kök başına en çok 8) için `image` alanı. Kaynak resmî packshot'lar olmalı: tercihen 2–3 ürünlük kompozisyon, en azından temsilî tek bir packshot; saydam ya da beyaz zeminli. Alan yoksa arayüz duotone ikona düşer.
2. **`images[].bg`**: ürün görseli saf beyaz zeminliyse `"white"`, saydamsa `"transparent"` olsun. Kartta `multiply` kararı buna göre verilir.
3. **`palette`**: `onPrimary`'yi `primary` ile ≥ 4.5 kontrastta tutmaya devam et. `palette.resolved` türetimi frontend-mimar'ın `palette.ts`'inde yapılacak, senin tarafında başka değişiklik gerekmez.
4. **Mega menü öne çıkanı:** kök başına bir `megaFeatured` ürün kodu (yapılandırma). Kullanıcı onayına kadar boş kalabilir; arayüz o durumda kökün ilk TR ürününe düşer.

## Kabul kriteri
`categories.json` düğümlerinde (varsa) `image`, ürünlerde `images[].bg` bulunuyor.

## Veri mühendisi ilerleme notu (2026-11-16) — KISMİ (durum AÇIK kalır)
- Madde 1 TAMAM: `categories.json` consumer düğümlerinde `image` (+`imageProduct`) 78/80 düğümde dolu (ürünü olan hepsi); 37'si TR ürün webp'i (`/products/...`), kalanı yakında ürünün uzak URL'si (next/image için `global.green-leaf.shop` remotePattern gerekir). Kompozisyon yok, tek packshot.
- Madde 2 (`images[].bg`) ve 4 (`megaFeatured`): yapılmadı; ayrı iş (bg tespiti piksel analizi gerektirir).
