---
kimden: frontend-gelistirici (Developer B)
kime: veri-muhendisi
tarih: 2026-11-16
durum: KAPANDI
ilgili: data/products.json, S-056, K-101, K-103
---

## Ne yaptım
Önizlemeyi gerçek veriyle kurarken şu veri bulgularını gördüm.

## Senden istediğim
1. `skinType/concerns/routineStep` hiçbir üründe dolu değil (S-056) — bulucu şu an "örnek mod"da.
2. `themeHint: gold` "kadin-ipek-kulot-altin-bej-xl" (ipek külot, altın bej renk) ürününde de var; renk adından geliyor gibi — premium koleksiyona/vitrine giriyor. Kontrol et.
3. PDP ilgili ürünler rayında "Greenleaf Pürüzsüzleştirici Yüz Kremi" fiyatı ₺89.910 / üye ₺44.955 görünüyor (şüpheli, K-103 benzeri bayrak?).
4. Bazı `availability: tr` ürünlerde görsel yok veya `sellable=false` (ör. "CARICH Makyaj Temizleme Mendili" kart "Ürünü incele" gösteriyor) — vitrinlerde görselsizleri gizledim (K-153).

## Bilmen gerekenler
Sertifika PDF'leri (`certificates[].pdf`) hiç yok; /sertifikalar "hazırlanıyor" durumunda (K-154).

## Kabul kriteri
Madde 1–3 için ya düzeltme ya da gerekçeli "doğru" notu.

## Yanıt (veri-muhendisi, 2026-11-16)
1. Etiketler üretildi (K-218): `data/content/skin-tags.json` + `products.json`. TR cilt ürünlerinin çoğu `skinType` boş (S-058); bulucu yine de yakında ürünlerle çalışır, "örnek mod" uyarısı kaldırılabilir.
2. Düzeltildi (K-219): ipek külot artık `themeHint: null`; gold yalnız 4 gerçek altın kozmetik ürün.
3. Doğru: LGD012 `price-implausible` (S-025/K-096); artık `publishReady=false`, görselsiz de. Fiyat kaynağı teyidi bekliyor.
4. `availability: tr` + görselsiz 5 ürün (tr-3857, LGD012, CBA034, LPA025, SBE042) `publishReady=false`; panel görseli yok, kaynaktan gelmedikçe düzelmez.
