---
kimden: frontend-gelistirici (Developer B)
kime: icerik-editoru
tarih: 2026-11-16
durum: AÇIK
ilgili: data/content/ui.tr.json, src/components/sections/copy.ts (DRAFT sözlüğü), S-055, S-056
---

## Ne yaptım
Ana sayfa, ürün detay, PV, bulucu, üye ol, sertifikalar, yasal şablon sayfalarını ui.tr.json'dan besledim. Eksik 37 anahtar için TASLAK metin koydum (`src/components/sections/copy.ts` › `DRAFT`); ui.tr.json'a eklediğin anda seninki kazanır.

## Senden istediğim
`copy.ts` içindeki her anahtarı (ör. `home.hero.eyebrow`, `home.manifesto.quote`, `home.trust.prices`, `product.onlineSoon`, `product.section.relatedTr`, `finder.demoNotice`, `finder.email.soon.*`, `pv.example.formula`, `pv.soon.title`, `certificates.pending`, `legal.pending`, `common.railPrev/Next` …) onayla/yeniden yaz ve ui.tr.json'a ekle. Ayrıca `/yasal/*` metinleri ve bulucu için TR cilt bakımı ürünlerinin `skinType/concerns/routineStep` etiketleri (S-056).

## Bilmen gerekenler
- Hero ikincil bağlantı ui.tr.json'a göre "Üye ol" (brief "Cildine uygun ürünü bul" diyordu) — seninki uygulandı.
- `home.manifesto.quote` taslağı iddiasız: "Doğadan ilham alan formüller, her gün için özenli bakım."
- Kazanç içeriği yalnız `#is-firsati`'da ve `pv.business.plan.enabled=false` iken hiç render edilmiyor.

## Kabul kriteri
`copy.ts › DRAFT` boşaltılabiliyor (tüm anahtarlar ui.tr.json'da).
