---
kimden: hareket-tasarimcisi
kime: ui-tasarimci
tarih: 2026-11-16
durum: KAPANDI
ilgili: K-156, K-157, K-159, docs/tasarim/hareket.md, docs/tasarim/tokens.json › motion
---

## Ne yaptım
`hareket.md` v1'i yazdım. M-1…M-23, H1…H10 ve F1…F6'nın her biri için süre, eğri, tetik ve reduced karşılığı tanımlı. Bileşen hareketleri (kart, mega menü, drawer, bulucu, PV, premium) ve hover-recolor zamanlaması da hazır. Prototip `/hareket-lab`'da.

## Senden istediğim
1. `tokens.json › motion` değerlerini güncelle (kaynak `src/lib/motion/tokens.ts`):
   - `duration`: `xs 120ms` (basma, ikon), `sm 200ms` (hover, odak), `md 320ms` (panel, drawer), `lg 500ms` (giriş), `xl 800ms` (şerit, sayaç). `ambient` 14s kaldırılsın (K-158: ambient ≤ 5 sn: yüzme 2 × 2,2 sn, salınım 4,6 sn).
   - `ease`: `out cubic-bezier(0.22, 1, 0.36, 1)`, `out-expo cubic-bezier(0.16, 1, 0.3, 1)`, `in-out cubic-bezier(0.65, 0, 0.35, 1)`, `in cubic-bezier(0.55, 0, 1, 0.45)`, `standard cubic-bezier(0.2, 0, 0, 1)`, `spring cubic-bezier(0.34, 1.56, 0.64, 1)`.
   - `rules` metnine "Kaynak: docs/tasarim/hareket.md" ekle.
2. `header.md` §8 H6: "logo ölçeği" ifadesini kaldır (K-157: logo hiçbir koşulda hareket almaz; kompakt = gölge).
3. `header.md` H3: "arama alanının genişlemesi" → "odak halkası katmanı" (genişlik canlandırması layout tetikler).

## Bilmen gerekenler
- `motion.css` şu an kendi `--motion-*` değişkenlerini tanımlıyor (`motion-css.test.ts` tokens.ts ile eşitliği test ediyor). tokens.json güncellenip derleyici `--duration-*`/`--ease-*`'i yeni değerlerle üretirse motion.css'i bunlara bağlarım.
- Hover-recolor'da "nefes" noktası (hover-recolor.md §8) uygulandı: `data-motion-part="breathe"` olan LeafCluster her yeni palette 640 ms 1.04 ölçek alır.

## Kabul kriteri
tokens.json motion bloğu hareket.md §2 ile aynı. header.md H3/H6 güncel.

## Kapanış (ui-tasarimci, 2026-11-17)
tokens.json v1.2: `motion.duration` xs/sm/md/lg/xl ve `motion.ease` out/in-out/in **eklendi**; geliştiriciler iş ortasında olduğu için eski anahtarlar (fast/base/slow/slower/ambient) silinmedi, `DEPRECATED` işaretlendi. `rules` metnine kaynak eklendi. header.md H3/H6 güncellendi.
