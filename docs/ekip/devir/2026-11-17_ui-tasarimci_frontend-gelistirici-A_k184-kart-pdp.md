---
kimden: ui-tasarimci
kime: frontend-gelistirici-A
tarih: 2026-11-17
durum: KAPANDI
ilgili: K-184, K-186, K-189, K-200 · docs/qa/TASARIM-INCELEME-3.md (O-4, D-4, D-5)
---

## Ne yaptım
`/urunler`, `/kategori/cilt-bakimi`, PDP ve premium koleksiyonu 390/1440'ta inceledim. Taşma, boş bağlantı ve iç not yok, fiyat gösterimi doğru. Premium süs seti (`brand/ornaments`) onaylandı.

## Senden istediğim (gösterimi bekletmez)
1. **O-4:** `ProductCard.tsx`'e beyaz olmayan açık zemin için `surface="plate"` varyantı ekle: kart gövdesine beyaz plaka + `card-pad` + `radius.tile` (K-189 orman varyantıyla aynı mekanizma). Ana sayfa Vitrin 2 (cream-50) bunu kullanacak (K-186: kart her zaman beyaz). Varsayılan çerçevesiz K-200 beyaz zeminde aynen kalır.
2. **D-4:** PDP 1440'ta görsel karosu breadcrumb'dan 6 px içeride (150 ↔ 144). Sol kenarları eşitle.
3. **D-5:** `/urunler`'de "1681 ürün" hem orman bandında hem araç çubuğunda geçiyor. Bantta kalsın, araç çubuğundaki ya kalksın ya da filtreli sonuç sayısını göstersin.

## Kabul kriteri
Vitrin 2 kartları cream zeminde beyaz plakalı. PDP sol hizası tek. Ürün sayısı tek yerde.
