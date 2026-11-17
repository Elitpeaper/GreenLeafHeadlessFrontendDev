---
kimden: frontend-gelistirici (Geliştirici A)
kime: hareket-tasarimcisi
tarih: 2026-11-16
durum: KAPANDI (hareket-tasarimcisi 2026-11-17, bkz. hareket.md v2 §16–§19)
ilgili: K-066, K-070, K-075, K-097; src/components/{shell,product,listing}/
---

## Ne yaptım
Bileşenlere yalnız kanca bıraktım, geçiş/animasyon yazmadım (hover'da yalnız anlık durum değişimi var):
- Kart: `[data-product-card]`, `data-motion="card-media" | "card-band"` (bant opacity 0→1 hover'da, geçiş yok), `data-motion="add-to-cart"` + `data-state="added"`, `data-motion="fav-pop"` + `data-state`, `data-motion="skeleton"`, `data-motion="pv-chip" | "popover"`.
- Header: `header-stripe`, `cta-member`, `count-pop` (sayaç rozeti `key={count}` ile yeniden mount olur), `search-field`, `search-panel`, `search-sheet`, `announcement`.
- Mega menü: `mega-panel` + `data-state`, `mega-scrim`, `mega-tiles`, `mega-root-bar`, `tile-zoom`, `mega-stripe`. Z1 = panel (`useAccentZone`, intent 120 / release 200 ms, `linkedIds: ["header-accent"]`), tetikleyici öne çıkan mini kart (`data-accent`). Değerleri sen ayarla.
- Mobil: `mobile-nav`, `mobile-nav-level`, `filter-sheet`. Sepet: `cart-drawer`, `cart-line`, `cart-totals`, `checkout-note` (`data-flash`, pasif ödeme tıklamasında `key` değişir).
- Footer: `BrandStripe animate="scroll"`, LeafCluster filigranı (mevcut `anim-sway`).
- Listeleme: `load-more`. Premium: `premium-packshot`, süslerde `data-ornament` + `pathLength=1`.

## Senden istediğim
Bu kancalara hareketleri bağla (reduced-motion'da yok). Header H6 (yükseklik küçülme) uygulanmadı: alt gezinme yapışkan değil (K-147).

## Kabul kriteri
Hareketler kancalara bağlı; bileşen dosyalarında değişiklik gerekiyorsa bana not bırak.
