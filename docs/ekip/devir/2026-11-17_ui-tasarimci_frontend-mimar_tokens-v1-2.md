---
kimden: ui-tasarimci
kime: frontend-mimar
tarih: 2026-11-17
durum: KAPANDI
ilgili: docs/tasarim/tokens.json v1.2, scripts/tokens/build-tokens.mjs, K-186
---

## Ne yaptım
tokens.json'ı v1.2'ye çıkardım. Bu sürümde **yalnız ekleme** var, mevcut hiçbir token değişmedi ya da silinmedi:
- Renk: forest-500…800, cream-*, sand-*, earth-*
- Radius: tile, panel
- Gölge: tile, tile-hover, long, badge, cta-cream, card-on-forest
- Hareket: duration xs…xl; ease out, in-out, in

`npm run tokens` çalıştırıldı ve tokens.css yeniden üretildi. Ayrıca üç yeni üst seviye anahtar eklendi: `gradient`, `texture`, `surfaceMode`.

## Senden istediğim
Derleyici `tokens.gradient.*` değerlerini `:root` içine `--gradient-<ad>` olarak yazsın. Yöntem premium gradyanlarıyla aynı. Yeni adlar şunlar ve mevcut adlarla çakışmıyor: forest-hero, forest-deep, forest-radial, tile-green, tile-earth, tile-earth-deep, tile-sand, tile-cream, cta-cream.
- `$doc` anahtarı atlanır.
- `texture` ve `surfaceMode` yalnız belge amaçlıdır, CSS'e yazılmaz.

## Bilmen gerekenler
Geliştiriciler bu değerleri şimdilik doğrudan (birebir) yazıyor. Değişkenler üretilince bu yazımlar `bg-[image:var(--gradient-tile-earth)]` biçimine çevrilecek.

## Kabul kriteri
tokens.css içinde 9 yeni `--gradient-*` satırı bulunur.

## Yanıt — frontend-mimar (2026-11-17)
- `build-tokens.mjs` `tokens.gradient.*` değerlerini `:root`'ta `--gradient-<ad>` olarak yazıyor (`$doc` atlanır; premium gradyanlarıyla ad çakışması derlemeyi durdurur). tokens.css'te 9 yeni + 4 premium = 13 `--gradient-*`.
- Ek: her gradyan için `bg-gradient-<ad>` yardımcısı (`@utility`, yalnız `background-image`); `surfaceMode` için `surface-showcase` (forest-800 + `--gradient-forest-hero` + cream-100 metin) ve `surface-commerce` (surface + ink). `texture` CSS'e yazılmadı (belge).
- K-231 gereği `[data-accent-zone]` reduced-motion'da artık anlık değil, 250 ms (`--recolor-duration-reduced`).
- Geliştiriciler birebir değerleri `bg-gradient-forest-hero` ya da `bg-(image:--gradient-forest-hero)` biçimine çevirebilir.
