---
kimden: kalite-denetcisi
kime: frontend-mimar
tarih: 2026-11-18
durum: KAPANDI
ilgili: K-288, K-263, KK-0-16; docs/qa/PERFORMANS-DENETIMI-1.md
---

## Ne yaptım
Üretim derlemesinde INP ve TBT ölçtüm. Ayrıntılar `docs/qa/PERFORMANS-DENETIMI-1.md` §2, P-02 ve P-08 altında.

## Senden istediğim
1. **P-02 (Engelleyici, karar):** mobilde menü ve sepet açıp kapama INP'si 170–570 ms. İzole ölçüm (4× CPU): `dialog.showModal()` ana sayfada 192 ms, `/urunler`'de 222 ms, `/sss`'te 40 ms. Chrome'da modal açılması tüm belgede inert stil hesaplaması tetikliyor ve maliyet DOM boyutuyla orantılı (4126 / 2887 / 1107 element). Karar ver:
   - (a) sayfa başına DOM bütçesi (öneri: ≤ 1500 element);
   - (b) ekran dışı bölümler ve footer için `content-visibility: auto` + `contain-intrinsic-size` (inert hesaplamasını gerçekten azalttığı ölçülerek);
   - (c) drawer ve menü için modal yerine popover + odak tuzağı gibi bir yaklaşım (erişilebilirlik korunarak).
2. **P-08:** kabuk RSC yükü sayfa başına ~378 KB ham. İçinde menüler için 116 ürünün fiyat, üye fiyatı ve PV'si, 272 görsel alanı ve 51 `blurDataURL` var. Mobil `/` TBT 309–456 ms, DCL 2,9 sn. Menü panel verisini panel açılınca veya hover niyetiyle ayrı istekle getirmeyi değerlendir (K-263'teki tembel menü kararının veri tarafı).

## Bilmen gerekenler
- İlk yük JS bütçesi geçti (202–209 KB gz ≤ 220).
- INP'nin bir kısmı P-01'den (hareket-tasarimcisi, ScrollTrigger refresh döngüsü) geliyor. O düzeltilince yeniden ölçülecek; ama `showModal` maliyeti P-01'den bağımsız (`?motion=off` ile aynı çıkıyor).

## Kabul kriteri
- Mobil 4×'te `/` ve `/urunler`'de menü ve sepet açıp kapama, karttan sepete ekleme ≤ 200 ms.
- Mobil `/` TBT ≤ 200 ms.

## Yanıt (frontend-mimar, 2026-11-18) — KAPANDI
**P-02 → K-293.** `showModal()` kaldırıldı; `src/lib/a11y/modal-layer.ts` (`openLayer`/`closeLayer`): `<dialog popover="manual" aria-modal="true" tabIndex={-1}>` + `show()` + `showPopover()`. Top layer, `[open]`, `::backdrop`, motion.css geçişleri ve Lenis kilidi (html overflow + `open` özniteliği) aynen. Odak tuzağı (Tab/Shift+Tab + focusin geri çekme), Esc (iç bileşen `preventDefault` etmediyse), açıcıya odak dönüşü, arka plan `inert` açılış boyamasından bir kare sonra (rAF → setTimeout). Popover API yoksa `showModal` yedeği.
Uygulanan: `CartDrawerPanel.tsx`, `MobileNav.tsx`, `MobileSearch.tsx`.
İzole ölçüm (Pixel 7, 4×, `?motion=off`): `showModal` `/` 108–226 ms, `/urunler` 93–183 ms → `show+showPopover` 3–8 ms. Elle `inert` 79–161 ms (bu yüzden ertelendi; INP penceresi dışında, ama boyamadan sonra hâlâ bir uzun görev). `content-visibility:auto` (main > * + footer) **yardımcı olmadı**: `/`'de showModal 827 ms'ye çıktı → önerilmez.
Uçtan uca INP yeniden ölçümü kullanıcı kuralı gereği bu turda yapılmadı — senin yeniden denetim turunda (P-01 sonrası) ölçülmeli. Ertelenmiş `inert` görevi orada uzun görev olarak görünürse sıradaki adım DOM bütçesi (K-295).

**P-08 → K-294.** (1) Kök `app/not-found.tsx` StoreChrome içeriyordu; Next her not-found'u her sayfayla gönderdiği için **tüm kabuk iki kez** serileşiyordu. Kök not-found artık kabuksuz; eşleşmeyen adresler `(magaza)/[...yok]` → mağaza düzeninde 404. (2) Menü bölündü: sayfaya yalnız metin (`MenuRootNav`), görsel/kapak/öne çıkan ürün/tanıtım/blurDataURL statik `GET /api/menu`'den (44 KB, ön-render) menü niyetinde veya ilk açılışta.
Sonuç (ham HTML / satır içi RSC): `/sss` 493 → 305 KB / 371 → 185 KB; `/hakkimizda` 450 → 263 / 361 → 174; `/` 1364 → 1178 / 750 → 562. blurDataURL `/sss` 51 → 2, `/` 79 → 30 (kalanlar sayfa bölümlerinin stok fotoğrafları — frontend-gelistirici). gz: `/` 152 → 131 KB, `/sss` 69 → 47 KB.
`perf:js` 203–210 KB gz (≤ 220). DOM bütçesi önerisi: K-295.
