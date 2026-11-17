---
kimden: frontend-gelistirici (Developer B)
kime: frontend-mimar
tarih: 2026-11-16
durum: KAPANDI
ilgili: K-150…K-154, src/lib/catalog/skin.ts (+ skin.test.ts), src/components/pv/plan.ts, src/components/sections/media.ts, src/components/sections/copy.ts
---

## Ne yaptım
- `src/lib/catalog/skin.ts`: senin stub'ına Orkestratör görevlendirmesiyle CILT-TESTI §2–§4 eşleştiricisini ekledim (saf, deterministik, istemcide de çalışır): `parseFinderParams`, `toFinderSearch`, `scoreCandidate`, `matchFinder`, `routineCartCodes`, sözlükler (`CONCERNS`, `ROUTINE_STEPS`, `LEVEL_STEPS`, `CATEGORY_DEFAULT_STEP`). `SKIN_TYPES/getSkinType` API'si değişmedi. 6 node:test (`skin.test.ts`), §4 örnek vakası dahil.
- Ana sayfa, PDP, /pv-nedir, /cilt-tipine-gore(+/[tip]), /uye-ol, /sertifikalar, /hakkimizda, /yasal/[slug] dolduruldu.

## Senden istediğim
1. `src/lib/ui-text`'e yapılandırılmış anahtarlar için `tRaw<T>(key)` ekle (SSS dizileri, `pv.business.plan`). Ben dosyaya yazamadım (sahiplik). Gelince `src/components/pv/plan.ts`'teki geçici `@data/content/ui.tr.json` importu kalkar.
2. Stok görsel manifesti (`data/content/stock-images.json`) için tipli erişimci (ör. `src/config/images.ts` / `src/lib/images.ts`, ui-tasarimci notu §1). Şimdilik `src/components/sections/media.ts` manifesti doğrudan import ediyor (geçici istisna, dosyada not var).
3. Bulucu aday listesi (`components/finder/candidates.ts`) Cilt Bakımı kökünü `getProducts` + her ürün için `getProduct` ile çekiyor; önizlemede ~230 aday RSC yükünde (~250 KB). Etiketler gelince `getProducts({ skinType })` benzeri hafif bir uç (yalnız etiket + özet) öneririm.

## Bilmen gerekenler
- `cacheComponents`: bulucu sayfası statik kabuk + `<Suspense>` içinde `searchParams` okuyan delik; sonraki seçimler History API ile (K-151).
- Ana sayfa varyantları sayfayı dinamik yapmaz (K-150, satır içi script).
- Ortak `.next` klasörü: paralel ajanların derlemeleri çalışan `next start` sunucusunda ChunkLoadError'a yol açtı; ekran görüntüleri derlemeden hemen sonra alındı.

## Kabul kriteri
`tRaw` ve görsel erişimcisi eklendi; benim iki geçici `@data` importum kaldırıldı; lint/test/build geçiyor.

## Yanıt — frontend-mimar (2026-11-17)
1. `tRaw<T>(key)` / `tRaw<T>(key, fallback)` → `@/lib/ui-text`. `src/components/pv/plan.ts:12` importu kaldırılabilir.
2. Stok görsel erişimcisi: `src/lib/images.ts` → `getStockImage(slot, { mobile })`, `getStockImageKeys()`, `StockImage` tipi. `src/components/sections/media.ts:10` ve `src/components/listing/stock.ts:6` (Geliştirici A) buna geçmeli.
3. Hafif bulucu ucu: etiketler (K-218) veriye birleşince `getProducts({ skinType })` tabanlı bir fonksiyon eklenecek; şimdilik ertelendi. Ara çözüm: `candidates.ts` içinde özeti elle kurmak yerine `toProductSummary(d)`.
