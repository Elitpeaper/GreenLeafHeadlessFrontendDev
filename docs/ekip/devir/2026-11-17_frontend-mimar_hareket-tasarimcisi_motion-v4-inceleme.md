---
kimden: frontend-mimar
kime: hareket-tasarimcisi
tarih: 2026-11-17
durum: KAPANDI
ilgili: K-256, K-258…K-262, K-263; src/lib/motion/{lenis,gsap}.ts, src/components/motion/HorizontalPin.tsx
---

## Ne yaptım
motion v4 kod incelemesi. Genel onay: tembel yükleme, tek `loadGsap()`, `gsap.matchMedia` + `mm.revert()` temizliği, Lenis `destroy()` + ticker/observer temizliği, pin wrapper'ı (React unmount'ta pin-spacer'a takılmaz), `overflow: clip` (odak viewport'u kaydırmaz) doğru. Dosyalar senin alanında olduğu için düzeltmedim.

## Senden istediğim (öncelik sırasıyla, hepsi küçük)
1. **`src/lib/motion/lenis.ts:77-80` — yükleme hatası kalıcı kilit.** `import("lenis")` / `loadGsap()` reddedilirse (chunk hatası, çevrimdışı) `creating` sonsuza dek `true` kalır, Lenis bir daha denenmez ve işlenmemiş promise reddi düşer. `try { … } finally { creating = false }` + `catch` ile sessizce yerel kaydırmada kal.
2. **`src/lib/motion/gsap.ts:146` — reddedilen promise önbellekte.** `kit` başarısız olursa kalıcı olarak reddedilmiş döner (pin de Lenis de bir daha kurulamaz). `.catch((e) => { kit = null; throw e; })`.
3. **`src/lib/motion/lenis.ts:92` — global yan etki geri alınmıyor.** `gsap.ticker.lagSmoothing(0)` teardown'da (`:96-102`) varsayılana dönmüyor; katman değişip Lenis kapandıktan sonra diğer GSAP kullanımları lag smoothing'siz kalır. Teardown'a `gsap.ticker.lagSmoothing(500, 33)`.
4. **`src/lib/motion/lenis.ts:56-65` — kilitliyken çapa tıklaması yutuluyor.** Lenis `stop()` durumundayken (drawer/dialog açık) aynı sayfa çapasına tıklanırsa `preventDefault` yapılıyor ama `scrollTo` çalışmıyor (force yok). `if (locked()) return;` ile yerel davranışa bırak.
5. **`src/components/motion/HorizontalPin.tsx:38, :52` — katman kontrolünün tek kaynağı.** CSS (`motion.css:1872`) pin düzenini yalnız `html[data-motion="on"]`'da ayırıyor; JS `!dataset.motion || (reduce && !forced)` ile türetiyor. Bugün eşdeğer, ama `dataset.motion !== "on"` tek koşul olsun (CSS ile aynı kaynak; ileride yeni bir katman eklenirse ayrışmaz).
6. **Bilgi / kabul:** `pinType: "transform"` yalnız Lenis kaydırmayı sürerken titremesizdir (yerel eşzamansız kaydırmada transform bir kare geride kalır). Koşullar (`fine` + tam katman) Lenis ile aynı, o yüzden kabul; Lenis chunk'ı GSAP'ten sonra gelirse ilk saniyelerde kısa titreme olabilir — hareket.md §26.3'e not düş.
7. **Bütçe (K-263):** hareket çalışma zamanı ilk yükte **13,0 KB gz** (chunk `16t3…`, her mağaza sayfasında). İlk boyamaya gerekmeyen kısımları (SVG interact, recolor zamanlayıcısı, mıknatıs/paralaks) `requestIdleCallback` sonrası tembel `import()`'a ayır; hedef ilk yükte ≤ 7 KB.

## Bilmen gerekenler
- K-262 tembel chunk rakamlarını onayladım; K-097 JS satırı için yeni öneri K-263 (≤ 220 KB gz mağaza sayfası, çerçeve 167,6).
- Ölçüm aracı: `npm run build && npm run perf:js` (Next 16 artık First Load JS göstermiyor).

## Kabul kriteri
1–5 düzeltildi; `npx tsc --noEmit`, `npx eslint src --quiet`, `npm test`, `npx next build` geçer; 7 için `npm run perf:js` çıktısı devir notunda.

## Sonuç (hareket-tasarimcisi, 2026-11-17)
1. `lenis.ts`: `import` / `loadGsap()` `try/catch/finally` içinde; `creating` her durumda sıfırlanır, hata sessizce yerel kaydırmada kalır, sonraki `sync()` yeniden dener.
2. `gsap.ts`: `.catch((e) => { kit = null; throw e; })`.
3. Teardown'da `gsap.ticker.lagSmoothing(500, 33)`.
4. `onClick`: `if (locked()) return;` — tarayıcıya bırakılır.
5. `HorizontalPin`: tek koşul `html.dataset.motion === "on"`; `reduce` koşulu kaldırıldı, katman değişimi `data-motion` MutationObserver'ıyla izlenir (gsap.matchMedia yalnız genişlik/işaretçi). GSAP yükleme hatası yakalanır, sonraki tetikte yeniden denenir.
6. hareket.md §26.3'e "Bilinen sınır" notu düşüldü.
7. `MotionRuntime` artık yalnız yükleyici; `runtime.ts` `load` + `requestIdleCallback` sonrası `import()` (tembel chunk 9,2 KB gz). Hero girişi iptali için tam yükleme adresi ilk chunk'ta yakalanıp runtime'a geçirilir. Mağaza kabuğunda ilk yükte kalan hareket kodu < 1 KB.

`npm run perf:js` (değişiklikten sonra):
```
index.html       total 224.5 KB gz in 13 scripts (budget 220)   (önce 230,5)
hakkimizda.html  total 219.1 KB gz in 12 scripts (budget 220)   (önce 227,1)
```
`/` hâlâ 4,5 KB üstte; kalan kısım frontend-gelistirici `js-butcesi` notu (ui.tr.json, tembel paneller). `tsc`, `eslint src --quiet`, `npm test` 52/52, `next build` geçti.
