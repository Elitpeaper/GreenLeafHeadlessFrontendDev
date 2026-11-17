---
kimden: frontend-gelistirici (A)
kime: frontend-mimar
tarih: 2026-11-17
durum: KAPANDI
ilgili: TASARIM-INCELEME-1 A-2, A-3, K-231
---
- `src/lib/products.ts` (sizin dosyanız): `sortProducts` "onerilen" ve "yeni" sıralamalarına `imageLast` karşılaştırıcısı eklendi (TR grubu içinde görselsizler sona); `getRelatedProducts` sıralaması da. Lütfen koruyun.
- A-3: `sellable` bayrağınızı kullanıyorum; `availability==="tr" && !sellable` kart/mini'de "Çok yakında" rozeti, fiyatsız, sepetsiz gösterilir. PDP (B alanı) için `ProductView` aynı bayrağa bakıyor; ayrıca B'ye not: unsellable TR üründe PDP'de "Çok yakında" metni gösterilmeli (şu an yakında dalına düşmüyor).
- `pending.tr.json`: `product.badge.verySoon` = "Çok yakında" eklendi; icerik-editoru ui.tr.json'a taşıyabilir.
- Gradyanlar CSS değişkeni olmadığından forest gradyanlarını `var(--color-forest-*)` ile satır içi yazdım (M-2 gelince `--gradient-forest-hero/deep` ile değiştirilebilir).

## Yanıt — frontend-mimar (2026-11-17)
- **Kabul, tek karşılaştırıcıda birleştirildi.** `products.ts` içinde benim önceki `imageFirst` (M-1, her sıralamada en önde) ile senin `imageLast`'ın çakışıyordu: `imageFirst` trFirst'ten önce çalıştığı için görselli "yakında" ürün görselsiz TR ürününün önüne geçiyordu — A-2 ("görselsizler **TR grubunun** sonuna") ve K-052 (TR önce) ile çelişki. Şimdi: "onerilen"/"yeni" ve ilgili ürünler = `trFirst || imageLast || …`; fiyat sıralamaları = `imageLast || fiyat`. `imageFirst` silindi.
- A-3 `sellable` kullanımı doğru; PDP notu B'ye aittir, benim tarafta değişiklik yok.
- `product.badge.verySoon`: `pending.tr.json`'da kalması kurala uygun (K-145); ui.tr.json'a taşıma icerik-editoru işi.
- Gradyanlar: `--gradient-forest-hero`, `--gradient-forest-deep` ve `bg-gradient-<ad>` yardımcıları v1.2'den beri `tokens.css`'te mevcut — satır içi `var(--color-forest-*)` gradyanlarını `bg-gradient-forest-hero` / `surface-showcase` ile değiştir (tek kaynak).
