---
kimden: hareket-tasarimcisi
kime: frontend-gelistirici
tarih: 2026-11-17
durum: KAPANDI
ilgili: K-156, K-184 (O-6, DEPRECATED takma adlar), K-260 · src/components/motion/motion.css "K-257"
---

## Ne yaptım
- Kapılar pin kapalıyken (azaltılmış hareket / `?motion=off`) artık boşluksuz bento (≥ 1024) ve 2 sütun ızgara (768–1023). Yalnız `motion.css` değişti; `HomeDoors.tsx` markup'ına dokunmadım. Hücreler kapı **sırasıyla** seçiliyor (pv, finder, premium, membership, news) — sırayı değiştirirsen bana haber ver.
- `globals.css`: `.anim-float` ve `.anim-ping` silindi (kullanıcı yoktu), `.anim-sway` tek salınım (≤ 5 sn). `LeafCluster` kullanımında değişiklik gerekmez.
- `globals.css` artık DEPRECATED süre takma adlarını kullanmıyor.

## Senden istediğim
1. **Geliştirici A** — DEPRECATED `--duration-*` takma adlarını K-156 ölçeğine taşı:
   - `src/app/(magaza)/urunler/page.tsx:39,44` ve `src/app/(magaza)/kategori/[kok]/[[...alt]]/page.tsx:53,64`: `duration-(--duration-base)` → `duration-250` (K-231 ≈ 0,25 sn; ya da sınıfı tamamen sil, motion.css taban katmanı 250 ms veriyor).
   - `src/components/product/ProductCard.tsx:53`: `motion-safe:duration-(--duration-base)` → `motion-safe:duration-250`.
   - `src/components/product/ProductCardParts.tsx:108`: `duration-(--duration-slow)` → `duration-(--duration-lg)` (500 ms) ya da `duration-[450ms]`.
2. **Geliştirici B** — `HomeDoors.tsx` başlık yorumunda ">= 1024 px gentle tier / off: wrapped 3-column grid" → "≥ 768 px gentle tier / off: gap-free bento grid (motion.css K-257)". İsteğe bağlı: `li`'lere `data-door={key}` ekle (CSS şu an gerektirmiyor).

## Bilmen gerekenler
- Takma adlar silinince (ui-tasarimci `tokens.json`/`tokens.css`) bu satırlar sessizce süresiz kalır; o yüzden silmeden önce taşınmalı.
- Pin kapalı ızgarada `li` genişlik/yükseklik sınıfların (`w-[…]`, `h-[28rem]`) motion.css tarafından eziliyor (katmansız CSS > `@layer utilities`); kaldırma.

## Kabul kriteri
`grep -rn "duration-\(fast\|base\|slow\|slower\|ambient\)" src --include=*.tsx` boş döner.

## Geliştirici A yanıtı (2026-11-18)
urunler/page.tsx ve kategori/page.tsx taşındı (duration-250). ProductCard.tsx:52 ve ProductCardParts.tsx:108 hareket-tasarimcisi çalışırken dokunulmaması istendiği için DOKUNULMADI; hareket-tasarimcisi kendi dosyalarında kapatmalı.
