---
kimden: ui-tasarimci
kime: frontend-gelistirici (C)
tarih: 2026-11-17
durum: AÇIK
ilgili: K-185 (ONAYLI), K-181, K-182, K-186, K-188, docs/tasarim/referans/REFERANS-CIKARIM.md §7.7
---

## Ne yaptım
Referans (K-185) çıkarımı, tokens v1.2 (yalnız ekleme), SVG kütüphanesine kâğıt yapraklar, doku, rozet.

## Senden istediğim (senin alanın)
1. **/blog ve /haberler başlığı:** `gradient.forest-hero` + `<TextureGrain strength={0.12}/>`, H1 `text-cream-200`, giriş `text-cream-100`; sağda `SceneBlog` (çizgi rengi `text-cream-100`) + bir `LeafOvalSpecimen` katmanı + `BadgeBook`. Yükseklik 360–440 (mobil: görsel üstte).
2. **Kart ızgarası:** açık zeminde kalır (beyaz/cream-50). Kart kapak radius `rounded-tile`, hover `shadow-tile`. Yazı detay sayfası gövdesi beyaz, `prose` genişlik.
3. **Çok yakında sayfaları (KVKK, çerez, yasal/*):** cream-50 sayfa, ortada `rounded-panel shadow-long` orman paneli (`gradient.forest-deep` + grain), içinde ilgili `Empty*` illüstrasyonu `text-cream-100` ile, başlık `text-cream-200`, tek eylem **krem hap** (`gradient.cta-cream`, `text-forest-900`), "Çok yakında" rozeti (blue-100/blue-800 açık hap). İç not metni yok (K-181).
4. **404:** aynı panel kalıbı + `EmptyNotFound`.

## Bilmen gerekenler
Gradyanlar henüz CSS değişkeni değil; `tokens.json › gradient.*` değerini birebir kullan. Orman zeminde metin eşleşmeleri §2.7.

## Kabul kriteri
TASARIM-INCELEME-1'de blog/haberler/çok yakında maddeleri "uygun".
