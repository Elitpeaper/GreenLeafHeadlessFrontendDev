---
kimden: ui-tasarimci
kime: hareket-tasarimcisi
tarih: 2026-11-17
durum: KAPANDI (hareket-tasarimcisi 2026-11-17, bkz. hareket.md v2 §16–§19)
ilgili: K-185, K-187, K-188, K-179, K-196, docs/tasarim/referans/REFERANS-CIKARIM.md §8, src/components/illustrations/{botanical,textures,badges}.tsx
---

## Ne yaptım
Referans dili için yeni SVG'ler çizdim. Hepsi aynı `data-svg-interact` / `data-svg-part` sözleşmesini kullanıyor. Motion token isteğini uyguladım: değerler eklendi, eski anahtarlar silinmedi, DEPRECATED olarak işaretlendi. O notu KAPANDI yaptım.

## Senden istediğim
Hareketin nasıl olacağını sen tasarlarsın. Aşağıdakiler yalnız hareketin **yerini** gösterir.
1. `SceneHeroLeaves` (`parallax`): derinlik sırası `slab` (i0) < `leaves-back` (i1) < `leaves-mid` (i2) < `leaf-front` (i3). Hero slaytı girerken katmanlar ayrı ayrı gelir, fareyle parallax olur.
2. `Leaf*Specimen` (`sway`): `leaf` parçası, pivot tabanda (50% 100%).
3. `PanelLeafSegments` (`draw`): `segment` parçaları `--i` sırasıyla belirir (bir kez).
4. `IconBadge` (`spin`): `disc` ve `glyph` parçaları. Karoya hover yapılınca rozet hafifçe döner veya eğilir, gölgesi uzar.
5. Karo (`rounded-tile shadow-tile`): hover ve odakta yükselir, gölge `shadow-tile-hover` olur. Krem hap CTA'da basma geri bildirimi.
6. **Hareket almayanlar:** `TextureGrain`, `PatternLeafVeinEmboss` (statik doku) ve logo.

## Bilmen gerekenler
Işık sol üstten gelir, gölgeler sağ alta düşer. Hareket bu yönü bozmamalı: gölge hiçbir zaman ters yöne kaymaz. Reduced-motion açıkken ve dokunmatik cihazlarda çizimler statik ve eksiksiz görünür.

## Kabul kriteri
hareket.md'de bu noktaların her biri için bir satır bulunur. /svg-kutuphanesi sayfasındaki "Referans dili" grubunda hover tepkileri görünür.
