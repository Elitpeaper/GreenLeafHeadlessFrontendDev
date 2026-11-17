---
kimden: ui-tasarimci
kime: frontend-gelistirici
tarih: 2026-11-16
durum: AÇIK
ilgili: K-043, K-072…K-084 (ÖNERİ), docs/tasarim/tasarim-kurallari.md, docs/tasarim/tokens.json, docs/tasarim/bilesenler/, docs/tasarim/briefler/ana-sayfa.md
---

## Ne yaptım
Tasarım kuralları v1, tokens v1, 9 bileşen spesifikasyonu ve ana sayfa brief'i hazır. Tasarım kodda yapılıyor (K-043). Kapı 2'de kullanıcı Vercel önizlemesinde onay verecek.

## Senden istediğim
Önizleme için şu sırayla kodla (frontend-mimar token ve tema altyapısını kurduktan sonra; ayrı devir notu var):
1. `ProductCard` (tüm varyant ve durumlar: satışta, yakında, temalı, premium, mini, iskelet, görsel hatası) → `bilesenler/product-card.md`
2. `SiteHeader` + `MegaMenu` + `MobileNavDrawer` → `header.md`, `mega-menu.md`
3. `CartDrawer` (pasif ödeme düğmesi, K-068) → `cart-drawer.md`
4. Ana sayfa bölümleri → `briefler/ana-sayfa.md`. Sondaki "önizlemede seçilecek varyantlar" için sorgu parametresi ekle (örnek `?hero=slider`, `?v1bg=white`, `?recolorReduced=instant`, `?darkCta=lime`).
5. `SiteFooter` → `footer.md`
6. `/pv` → `pv-explainer.md`; `/cilt-testi` → `skin-finder.md`; premium koleksiyon ve ürün → `premium-theme.md`. `GoldRule`, `GoldDoubleRule`, `LeafDiamond`, `CornerFlourish` ve `GoldFrame` SVG'lerini çiz ve ilk sürümü inceleme için bana göster.

## Bilmen gerekenler
- Ham HEX yok. Tailwind token sınıfları veya `var(--accent-…)` kullan. Tema alan parçalar yalnız aksan değişkenlerini okur. Üye fiyatı rozeti, birincil düğme, odak halkası ve fiyat metni **değişmez** (tasarim-kurallari §2.4).
- Fiyat tek bileşen olmalı (`PriceBlock`): Fiyat + Üye fiyatı rozeti + PV çipi. Kart, mini kart, drawer satırı, mega menü kartı ve PDP aynı bileşeni farklı boyutla kullanır. Tek başına üye fiyatı asla gösterilmez. Yakında üründe yalnız PV görünür.
- Kart fiyat yerleşimi container query ile yapılır (≥ 220 px yan yana, altında alt alta).
- Pasif ödeme düğmesi `disabled` değil, `aria-disabled="true"` + `aria-describedby`.
- Cilt bulucu e-posta formu `emailService.enabled=false` iken hiçbir ağ isteği yapmaz.
- Hareket kodu hareket-tasarimcisi'nin alanıdır (`src/components/motion/`, `src/lib/motion/`). Sen bileşenlerde kanca bırak (data öznitelikleri, sınıflar).
- Logo ve işaret yalnız `public/brand/*.svg`'den, değiştirilmeden kullanılır.
- Geliştirme sonrası çıktını tasarıma karşı inceleyeceğim. Sapmaları dosya/satır ile devir notuna yazacağım.

## Kabul kriteri
Her bileşen spesifikasyondaki tüm durumları önizlemede gösteriyor. 360 px'te taşma yok. Klavyeyle tüm akış kullanılabiliyor. Renk eşleşmeleri yalnız tasarim-kurallari §2.2 tablosundakiler. Ana sayfa brief'indeki "Kabul (görsel)" maddeleri sağlanıyor.

## Developer B durumu (2026-11-16)
Ana sayfa, PDP, PV, bulucu, üye ol, sertifikalar, hakkımızda, yasal şablon tamam (rapor: Orkestratör). Not ortak olduğu için (Developer A kabuk/kart/listeleme) KAPANDI işaretini A kendi kısmını bitirince yapar.
