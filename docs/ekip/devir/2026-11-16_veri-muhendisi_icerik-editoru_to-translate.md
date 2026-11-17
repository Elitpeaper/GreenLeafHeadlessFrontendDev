---
kimden: veri-muhendisi
kime: icerik-editoru
tarih: 2026-11-16
durum: AÇIK
ilgili: data/content/to-translate.json, data/content/content-ru.json, K-024, K-039, K-053 iptal → K-067, KARAR-KAYDI
---

## Ne yaptım
Toplu yerelleştirme girdisini hazırladım: `data/content/to-translate.json` (öncelik 1 = Türkiye'de satışta, öncelik 2 = Türkiye'ye yakında). Rusça metinler **çevrilmedi**, ham saklandı.

## Senden istediğim
1. **Öncelik 1 (10 TR ürün, Türkçe başlığı yok):** XNA038, SCA016, CBA034, LPA025/CDA025, MAI223, MAH723, SBE042, LGZ042, LGD012 ve kodsuz CARICH makyaj temizleme mendili için `title_tr` (+ `description_tr`, `features_tr`, `usage_tr`). Uzun Rusça kaynak: `data/content/content-ru.json[id]` (HTML). Diğer 41 TR üründe Ağustos kataloğu Türkçe metni var; yalnız iddia denetimi (aşağıda).
2. **Öncelik 2 (yakında ürünler):** `title_tr` + `shortDescription_tr` (K-039 hafif içerik). `shortDescription_ru` ilk paragraftır (≤ 320 karakter).
3. **İddia denetimi:** K-067 gereği tıbbi yama/merhem ve takviye ürünleri de yayınlanır → tedavi edici/tıbbi iddia içermeyen metin zorunlu. Doğrulama raporunda iddia sözcüğü içeren kayıtlar listelidir (`DOGRULAMA-RAPORU.md` §3).
4. Teslim biçimi: `data/content/translations.json` → `{ "<id>": { "title_tr": "", "shortDescription_tr": "", "description_tr": "", "features_tr": [], "usage_tr": "" } }`. Veri hattına EL katmanı olarak ben bağlarım (SEMA-TASLAGI §8).

## Bilmen gerekenler
- Ürün adlarında koli ifadesi yok (`boxQty` ayrı); marka adı (CARICH, iLiFE, SEALUXE…) başlıkta kalır.
- `title_ru` bozuk olan 8 kayıt var (`needsReview: name-corrupt`, "???"): bunlarda başlık güvenilmez; liste raporda.
- Ad çatışması (`name-conflict`, 10 TR kodu): katalog adı kullanıldı; panel `title.tr` farklı (ör. ASB046 "ipek losyonu" ↔ katalog "Yüz Kremi", CCA016 panel "soğuk alg…" ↔ katalog "Florürsüz…", DAB089). Doğrusunu Rusça ada bakarak sen/kullanıcı kesinleştir (S-021, S-031). Panel adı `_source.titlePanelTr`'de.
- Fiyat/PV metne yazılmaz; PV açıklaması için K-060 metni.

## Kabul kriteri
Öncelik 1'deki tüm kayıtlar için Türkçe başlık+metin teslim edildi, iddia denetiminden geçti; öncelik 2 toplu teslim planı belli.
