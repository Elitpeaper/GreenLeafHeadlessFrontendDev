---
kimden: ui-tasarimci
kime: frontend-gelistirici (B)
tarih: 2026-11-17
durum: AÇIK
ilgili: K-185 (ONAYLI), K-186…K-188 (ÖNERİ), K-205, K-206, K-209, docs/tasarim/referans/REFERANS-CIKARIM.md §6–7, tasarim-kurallari.md v1.2
---

## Ne yaptım
Referans (K-185) çıkarımı + tokens v1.2 (yalnız ekleme) + SVG kütüphanesine kâğıt kesimi yapraklar, doku, yaprak dilimli panel ve yuvarlak rozetler. Hepsi `@/components/illustrations`'tan: `SceneHeroLeaves`, `PaperLeaf`, `PaperShadow`, `Leaf{Oval,Lance,Heart,Skeleton}Specimen` (`tone` prop), `TextureGrain`, `PatternLeafVeinEmboss`, `PanelLeafSegments` (`segments`, `tone`), `IconBadge` (`glyph`, `tone`) + `BadgePv/BadgeDrop/BadgeMember/BadgeSet/BadgeBook/...`.

## Senden istediğim (senin alanın)
1. **Hero swiper slaytları (K-187):** zemin `gradient.forest-hero` + `<TextureGrain strength={0.12}/>`; sol metin: eyebrow `text-lime-200` + inline bant, H1 `display` `text-cream-200` Jost 600–700, gövde `text-cream-100`, **krem hap CTA** (`gradient.cta-cream`, `text-forest-900`, `shadow-cta-cream`, h 52); sağ görsel yarısı slayt başına REFERANS-CIKARIM §6 tablosu: 1 → `SceneHeroLeaves`; 2 ve 5 → stok foto `rounded-panel` (tek köşe `2xl`) + `shadow-long` + önden taşan 1 specimen yaprak + packshot podyumu; 3 → premium-gold (değişmez, `gold-button`); 4 → kâğıt yapraklar + büyük `BadgePv`. Beyaz panel yaklaşımı kalkar; metin yine **asla** görsel üstünde değil. Mobil: görsel üstte 4:3, metin altta düz zeminde. Altta imza bandı. Slayt başlığı sorunuz: `display` uygun (en çok 3 satır); taşarsa `4xl`.
2. **Tanıtım karoları (K-188):** 5 karo + 6. fotoğraf karosu (/hakkimizda) → 3×2 ızgara (tablet 2, mobil 1 sütun). Bant zemini `gradient.forest-radial` + `<PatternLeafVeinEmboss strength={0.7}/>`. Karo: `rounded-tile shadow-tile`, hover `shadow-tile-hover`, zemin: PV `tile-earth` + `BadgePv` (ink) · Cilt tipi `tile-green` + `BadgeDrop` · Premium `tile-sand` + `BadgeSet` · Üye ol `tile-earth-deep` + `BadgeMember` · Haberler `tile-cream` + `BadgeBook`. Rozet 72 px (mobil 56) ortalı, başlık `2xl`, özet ≤ 2 satır, karonun tamamı tek `<a>`. Fotoğraf karosunda metin cream-50 plakada.
3. **Kategori şeridi:** her ikon 88/72 px `bg-cream-50 rounded-full shadow-badge` disk içinde, şerit zemini cream-50 (hero'dan sonra açık nefes).
4. **Vitrin 1/2:** açık zeminde kalır (beyaz / cream-50 sırayla); ardışık iki orman bölümü yok.
5. **Tanıtım sayfası hero'ları** (/pv-nedir, /uye-ol, /cilt-tipine-gore, /hakkimizda): §6 kısa sürümü (360–440 px), görsel yarısında mevcut sahne + 1 kâğıt yaprak + büyük rozet. **Yaprak dilimli panel:** /uye-ol "3 adımda üyelik", /pv-nedir "PV nasıl işler", /hakkimizda "Neden Greenleaf" (`rounded-panel shadow-long`, içerik ortalı, Lucide ikon `text-cream-100`).
6. PDP ticaret yüzeyi: değişiklik yok; yalnız "İlgili ürünler" bandı cream-50.

## Bilmen gerekenler
- Gradyanlar henüz `--gradient-*` değil (frontend-mimar'a not bıraktım); şimdilik `tokens.json › gradient.<ad>.value` birebir.
- Metin/zemin eşleşmeleri §2.7: cream-200 başlık forest-600 köşesinde yalnız ≥ 24 px; gövde cream-100.
- Fiyat, üye rozeti ve PV çipi orman/toprak zeminde durmaz (hero packshot PV çipi beyaz plakada kalsın).
- Hareket kancaları `data-svg-interact`/`data-svg-part` bileşenlerde hazır; hareket hareket-tasarimcisi'nde.

## Kabul kriteri
Ana sayfa 1440/390'da REFERANS-CIKARIM §7.5 ritmine uyar; TASARIM-INCELEME-1 maddeleri kapanır.
