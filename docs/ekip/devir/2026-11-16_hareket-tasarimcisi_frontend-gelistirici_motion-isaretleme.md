---
kimden: hareket-tasarimcisi
kime: frontend-gelistirici
tarih: 2026-11-16
durum: AÇIK
ilgili: K-155…K-159, docs/tasarim/hareket.md §5–§8 ve §13, src/components/motion/, /hareket-lab
---

## Ne yaptım
Hareket çalışma zamanı mevcut işaretlerinizi okuyor. Sözleşmeyi sizin kullanımınıza uydurdum: `M-7`, `M-9`, `M-14`, `M-18` **her öğede** + `--i` sırası; takma adlar `fav-pop`, `card-media`, `card-band`, `filter-sheet`, `popover`, `premium-packshot`, `M-18-chip` tanınıyor. `stagger`, `reveal`, `accordion`, `tick`, `slide-panel` (+`data-state`), `fade-in`, `pop`, `added`, `skeleton`, `M-2`, `M-3`, `M-4`, `M-13`, `M-16`, `M-19`, `M-20`, `M-22` olduğu gibi çalışıyor. `M-12` ve `added` için koşullu içerik (`data-state="done"`) otomatik canlanıyor. Tüm noktaların örnek işaretlemesi: `src/app/hareket-lab/page.tsx`.

## Senden istediğim
Dosyalarınızda şu değişiklikler (ben dokunmadım):
1. **`sections/home/AccentZone.tsx`:** `useAccentZone` + `data-accent-zone=""` global çalışma zamanıyla çift işleniyor (iki sistem aynı değişkenleri yazıyor). Ayrıca lint hatası veriyor (`react-hooks/refs`). Önerim: içeriği `<RecolorZone kind="showcase" as={Tag} …>` (sunucu bileşeni, `@/components/motion`) ile değiştirin. `linkHeader` için `link={["header-accent"]}` kullanın. Hook kalacaksa `data-accent-zone="manual"` yazın.
2. **v0 sınıfları:** `HomeHero` (`anim-pop`, `anim-float`, `anim-rise`), `Atmosphere`/hero görseli (`anim-pop`) ve `brand/LeafCluster.tsx` (her yaprakta `anim-sway`, **sonsuz döngü**, WCAG 2.2.2) sınıflarını kaldırın. LeafCluster'ı gereken yerde `<LeafSway points={["M-6"]}>` ile sarın (footer: `F2`; vitrin köşesi: sarmalayıcıya `data-motion-part="breathe"`). `BrandStripe animate=…` yerine `<StripeGrow trigger="view|load|first">`.
3. **Hero (M-2):** parçaları işaretleyin: `media` (görsel çerçevesi), `panel`, `eyebrow`, `title` (H1; yalnız transform alır), `lead`, `cta`, `trust`, `packshot` (`style --motion-i`), `leaf`. M-3 yüzmesi packshot'ın **iç** sarmalayıcısında kalsın (dış öğe konumlandırıyor).
4. **Manifesto (M-15):** `<WordReveal as="p" text={…} className=…>` kullanın. Düz metinde paragraf tek parça girer.
5. **FinderBand (M-13):** yelpaze açısı `transform: … rotate()` içinde olduğu için yalnız yükselme oluyor. Yelpaze açılışı için açıyı `rotate` özelliğiyle verin (`style={{ rotate: "9deg" }}`), konum `translate` ile kalabilir.
6. **Header:** thin bant kapsayıcısı `H1`; Kategoriler düğmesi `H2` + ikonlar `morph > grid/close` (`aria-expanded`); arama sarmalayıcısı `H3`; sepet rozeti `H4`, favori rozeti `H5` (yalnız sayı metni); yapışkan blok `H6` (K-147 düzeninde yalnız gölge belirir); alt gezinme `H7`; "Üye ol" `H8` + yaprak glifi `leaf`; header kökü `data-accent-zone="header"` (`id="header-accent"` kalsın).
7. **Mega menü:** panel `data-motion="megamenu"` (`hidden` ile aç/kapa), içerik `<RecolorZone kind="menu" link={["header-accent"]}>`, karolar `data-motion-part="tile"` + görsel `media`, kök göstergesi `data-motion-part="indicator"` + kapsayıcıda `tabs`, alt bant `<StripeGrow trigger="load" variant="thin">`; mobil çekmece `<dialog data-motion="drawer-left">`, seviye 2 `slide-panel` (geri: `data-motion-dir="back"`).
8. **Sepet drawer:** `<dialog data-motion="drawer">`; üst bant `band-show`; yeni eklenen satır `data-motion="flash"`; toplamlar `tick`; pasif ödeme düğmesi `data-motion="nudge-note"` (`aria-describedby` notu vurgular, sallama yok); satır kaldırma `await motionExit(li, "collapse")` sonra state.
9. **Footer:** alt bant `F1`, filigran `F2`, bağlantılar `F3`, rozetler `F4`, mobil akordeon `details` `F5` + ok `chevron`, başa dön düğmesi `F6`.
10. **Markalar (M-23):** `<Marquee rows={[satır1, satır2]} />` (durdur düğmesi, hover/odakta durma ve reduced-motion ızgarası dahil).
11. **Paletsiz kartlar:** vitrinde paleti olmayan karta `data-accent-trigger=""` ekleyin. Üzerine gelince bölge marka temasına döner (premium-tema §B5).
12. **Cilt bulucu "Tümünü sepete ekle":** eklendiğinde `data-state="added"` verin, ikon/etiket geçişi otomatik çalışır.
13. Ray okları: `railScroll(railRef.current, ±1)`. Duyuru şeridi kapatma (H10): `await motionExit(el, "collapse")`.

## Bilmen gerekenler
- Kendi `translate/scale/rotate`'ünü konum için kullanan öğeye `data-motion` vermeyin, sarmalayıcıya verin (hareket bireysel dönüşüm özellikleriyle yapılıyor).
- Tanınmayan `data-motion` değeri sessizce yok sayılır (`pv-chip`, `load-more`, `M-13-tile` şu an etkisiz, sorun değil).
- Reduced-motion ve `?motion=off` ile her şey son hâlinde görünür. Kart kademesinde ek kod gerekmez.

## Kabul kriteri
`npm run lint` hatasız (AccentZone). Ana sayfada `?motion=off` ile `?motion=on` arasında içerik farkı yok. 1440 ve 390 px'te hareket noktaları `/hareket-lab` ile aynı davranır. `prefers-reduced-motion`'da sonsuz döngü kalmaz.
