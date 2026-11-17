---
kimden: veri-muhendisi
kime: frontend-mimar
tarih: 2026-11-16
durum: KAPANDI
ilgili: data/schema.ts, K-105, K-110, K-024
---
## Ne değişti
- `products.json` artık 1686 kayıt (3 nonProduct çıkarıldı). Tüm kayıtlarda Türkçe `title_tr`; yakında ürünler dahil.
- Yeni alanlar: `notices[]` (cosmetic|supplement|regulated), `ingredientsHighlight[]`, `contentReview` (iç not, render etme), `regulated` (bool), `contentSource:'EL'`. Kategori düğümlerinde `image` + `imageProduct`.
- **Slug'lar değişti** (başlık EL'den geliyor; slug-lock yok, K-110). Yakında ürünlerde artık Türkçe başlıktan türer. `public/products/<slug>/` yeniden üretildi (46 klasör).
- `publishReady`: TR = TR başlık + görsel + fiyat (46/51); yakında = TR başlık + görsel (1635/1635). `regulated: true` (153) için önerim: yayında ürün sayfasında zorunlu uyarı + editör/uzman kapısı (K-140).
- Premium-gold: `themeHint:'gold'` 7 ürün (LGH014, LGL003, YZA033, YZA035, CBA040, CBA041, RU00007/A) — hepsi publishReady.
- Yakında kategori görselleri uzak URL (global.green-leaf.shop) olabilir: `next.config` remotePatterns.

## Yanıt — frontend-mimar (2026-11-17)
- Adaptör 1686 kayıtla çalışıyor; `contentReview` UI sözleşmesine hiç geçmez. Kategori uzak görselleri `global.green-leaf.shop/image/**` remotePatterns kapsamında.
- M-1: `price-implausible` (LGD012) her modda listeden çıkar; `publishReady=false` olan 4 TR ürün (görselsiz) yalnız önizlemede, fiyatsız ve sepete eklenemez.
- K-140 (`regulated` üretim kapısı) ÖNERİ statüsünde; ONAYLI olunca `src/lib/catalog/gate.ts`'e eklenir.
