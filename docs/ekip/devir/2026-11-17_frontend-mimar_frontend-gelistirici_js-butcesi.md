---
kimden: frontend-mimar
kime: frontend-gelistirici
tarih: 2026-11-17
durum: KAPANDI
ilgili: K-097, K-145, K-263; src/components/shell/*, src/components/sections/home/HeroSwiper.tsx
---

## Ne yaptım
`next build` sonrası ilk yük JS'ini ölçtüm (`npm run perf:js`). `/` 230,5 KB gz; bunun 167,6'sı çerçeve (React 19.3 + Next 16, azaltılamaz). Açık ana sayfadan gelmiyor (ana sayfaya özgü yalnız 3,4 KB): `/hakkimizda` 227,1, `/urunler` 229,0. Asıl yük **mağaza kabuğunun istemci bileşenleri**. HeroSwiper ve HomeDoors incelemesi de aşağıda.

## Senden istediğim
### A. Bütçe (K-263 hedefi: mağaza sayfası ≤ 220 KB gz, uygulama payı ≤ 52)
1. **`ui.tr.json` istemciye gitmesin (~10 KB gz, chunk `3hx2…`).** 15 `"use client"` dosya `@/lib/ui-text`'ten `t()` çağırıyor, bu da sözlüğün tamamını (+ `pending.tr.json`) paylaşılan chunk'a koyuyor. Çözüm: metinleri sunucu ebeveynden prop (`labels`) olarak geçir — HeroSwiper'daki `labels` deseni gibi. Öncelik: `CartDrawer`, `HeaderActions`, `MegaMenu`, `MobileNav`, `MobileSearch`, `SearchBox`, `AnnouncementBar`, `AddToCartButton`, `PvChip`, `FavoriteButton` (kabukta olanlar). Dinamik anahtarlı `FinderApp` (`:31-32, :138, :242, :328, :350-351`) sonra; ona ihtiyaç duyduğu namespace'i sunucudan nesne olarak ver. Bittiğinde hiçbir istemci dosyası `@/lib/ui-text` import etmez; ben de `ui-text`'e `import "server-only"` ekleyerek kilitlerim.
2. **İlk açılışa kadar gerekmeyen paneller tembel olsun (tahmini 8–12 KB gz, `3hx2…` + `0pkve…`).** `CartDrawer` içeriği, `MobileNav` çekmecesi, `MobileSearch` ve mega menü panel içeriği `React.lazy` / `next/dynamic` ile ilk etkileşimde (veya `pointerenter`/odak niyetinde) yüklensin; tetik düğmeleri ve sayaç ilk yükte kalsın. `?sepet=ac` yönlendirmesinde drawer anında açılmalı (lazy bileşeni o durumda hemen yükle).
3. Kart parçaları (`1qedsz…`, 3,9) ve `next/image` (`19mck…`, 9,1) kabukta yalnız drawer/mega menü yüzünden ilk yüke giriyor; 2. madde bunları da ilk yükten çıkarır — ayrıca bir şey yapma.

### B. HeroSwiper incelemesi (`src/components/sections/home/HeroSwiper.tsx`) — genel onay, küçük maddeler
4. **`:167-172` + `:107`** — İşletim sistemi azaltılmış hareket isterken kullanıcı "oynat"a basınca `setReduced(false)` çağrılıyor; bu yalnız otomatik geçişi açmalı ama geçiş süresini de 250 → 600 ms'e çıkarıyor (`:107`). Ayrı bir `userPlay` durumu tut; `reduced` OS tercihini yansıtmaya devam etsin.
5. **`:60`** — `reduced` yalnız takma anında ve medya sorgusu değişince okunuyor; `html[data-motion]` sonradan değişirse (çalışma zamanı `onRm`) aynı olayla gelir, sorun yok — bilgi.
6. Temizlik doğru (`destroy(true, false)`, `live` bayrağı); hidrasyon güvenli (Swiper yalnız `useEffect`'te, sunucu işaretlemesi ilk slaytı gösteriyor, `inert` sunucuda 0'a göre). `swiper/react` kullanma (cacheComponents ön-render'ı kırılıyor).

### C. HomeDoors (`src/components/sections/home/HomeDoors.tsx`)
7. Sunucu bileşeni, fiyat yok (yalnız PV), tek bağlantı/pano, `soon` → bağlantısız + rozet (K-182): onay. Bulgu yok.

## Kabul kriteri
`npm run build && npm run perf:js` → `/` ve `/hakkimizda` ≤ 220 KB gz (çıkış kodu 0); `npx tsc --noEmit`, `npx eslint src --quiet`, `npm test` geçer; drawer, mobil menü, mega menü ve arama klavye + fareyle gerçek tarayıcıda çalışır.
