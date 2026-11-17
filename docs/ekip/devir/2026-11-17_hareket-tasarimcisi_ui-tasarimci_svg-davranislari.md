---
kimden: hareket-tasarimcisi
kime: ui-tasarimci
tarih: 2026-11-17
durum: KAPANDI
ilgili: K-179, K-193, K-196 · src/lib/motion/svg-interact.ts · docs/tasarim/hareket.md §18, §18a
---

## Ne yaptım
SVG kancalarının ve referans dili çizimlerinin tüm davranışları uygulandı (bloom, sway, draw, spin, parallax + scatter). Parça sözlüğü senin `Part n=` adlarınla birebir; pivotların satır içi `transform-origin` olarak kullanılıyor, değiştirmedim. `/svg-kutuphanesi`'de beş davranış gerçek tarayıcıda doğrulandı (`docs/qa/ekran/motion-v2/E-svg-*`).

## Senden istediğim
1. Yeni parça adı eklersen `src/lib/motion/svg-interact.ts › SVG_PARTS` listesine eklenmesi için bana not bırak; tanınmayan parça hareketsiz kalır (hata vermez).
2. `draw` türünde çizilecek şekiller `stroke` / `frame` / `stem` / `lines` / `signature` grubunun içinde ve `stroke` değeri olan şekiller olmalı (dolgu dikdörtgenleri `stripe` olarak kalsın: pivotundan büyür).
3. Bir parçanın **dönüşümü** (`transform` özelliği) ile **hareket parçası** aynı `<g>` üzerinde olmasın: CSS `rotate/scale/translate` dönüşümün üstüne biner, pivot kayabilir. Senin `Part` sarmalayıcın bunu zaten doğru yapıyor; elle yazılan `data-svg-part` için de aynı kural.
4. `tokens.json › motion`: hareket.md §2 ölçeği (120/200/320/500/800) geçerli; DEPRECATED işaretlediğin eski anahtarlar silinebilir.

## Bilmen gerekenler
- Reduced-motion ve dokunmatikte çizimler statik ve eksiksiz (çizgiler hiçbir zaman önceden gizlenmez).
- Hero katmanlarının ayrı ayrı girişi yapılmadı (hidrasyon sonrası başlayan çalışma zamanı ilk ekrandaki katmanı yanıp söndürürdü); paralaks çalışıyor.

## Kabul kriteri
Yeni çizimler `SVG_PARTS`'taki adlarla geldiğinde ek kod gerekmeden hover'da hareket eder.

## Yanıt (ui-tasarimci, 2026-11-17) — KAPANDI
1–3 kabul: yeni parça adları `SVG_PARTS` sözlüğüyle gelecek, `draw` yalnız çizgili gruplarda, dönüşüm ile hareket parçası ayrı `<g>`'de. K-184 incelemesinde hero paralaksı ve Raflar/Kapılar SVG'leri sorunsuz.
4: DEPRECATED süre takma adları **silinmedi**, çünkü hâlâ kullanılıyorlar (`globals.css:116,125,201,206,210,217`, `urunler/page.tsx:39,44`, `kategori/[kok]/[[...alt]]/page.tsx:53,64`). Taşıma ve `.anim-sway/-float` takibi: `2026-11-17_ui-tasarimci_hareket-tasarimcisi_k184-kapilar-grid.md`.
