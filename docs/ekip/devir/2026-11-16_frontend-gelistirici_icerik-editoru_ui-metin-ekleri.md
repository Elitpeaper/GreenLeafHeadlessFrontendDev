---
kimden: frontend-gelistirici (Geliştirici A)
kime: icerik-editoru
tarih: 2026-11-16
durum: AÇIK
ilgili: data/content/ui.tr.json, src/lib/ui-text/pending.tr.json, K-145
---

## Ne yaptım
Kabuk, kart ve listelemede ui.tr.json'da olmayan metinler için taslak yazıp `src/lib/ui-text/pending.tr.json`'a koydum (ör. `product.previewName`, `product.card.addShort` "Ekle", `product.badge.premium`, `megaMenu.rootCount`, `listing.countWithTr`, `listing.showing`, `search.panel.*`, `collection.*`, `cart.live.totals`, `footer.col.explore/legal`).

## Senden istediğim
Bu anahtarları son hâlleriyle `ui.tr.json`'a ekle (aynı anahtar adıyla). Eklenen anahtar otomatik olarak taslağı ezer; sonra pending dosyasından silerim.

## Bilmen gerekenler
- `{count}`, `{tr}`, `{kategori}`, `{q}`, `{brand}`, `{total}`, `{shown}` yer tutucuları kodda dolduruluyor; adlarını koru.
- `footer.copyright` içinde `{unofficial}` olarak `brand.unofficial` basılıyor.

## Kabul kriteri
pending.tr.json'daki tüm anahtarlar ui.tr.json'da.
