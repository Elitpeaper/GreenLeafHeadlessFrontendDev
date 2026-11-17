# Cilt bakımı etiket kuralları (K-056 sözlüğü, K-218)

Sahip: veri-muhendisi · Kod: `scripts/data/skin-tag-rules.mjs` (kurallar), `scripts/data/04e-skin-tags.mjs` (üretim + birleştirme) · Çıktı: `data/content/skin-tags.json` (anahtar = ürün id) → `products.json` (`skinType`, `concerns`, `routineStep`).

## İlkeler
- Yalnız açık kanıt: belirsiz → boş. Tahmin yok; rastgelelik yok (aynı girdi = aynı çıktı).
- Kapsam: Cilt Bakımı kökü (üç alan), cilt/bakım setleri ve vücut bakımı (kremler, el/ayak, duş jeli, sabunlar) için yalnız `skinType` + `concerns`. `routineStep` yalnız Cilt Bakımı kökünde (sözlükte vücut adımı yok). Makyaj, saç, bebek vb. etiketlenmez.
- `skin-tags.json` kaydına `"locked": true` eklenirse (editör düzeltmesi) yeniden üretimde korunur.
- Etiket anahtarları dahili veridir; müşteriye görünen adlar nötr (CILT-TESTI.md §3.2). Kaynak RU metindeki iddia sözcükleri yalnız eşleştirmede kullanılır, hiçbir yerde gösterilmez.

## skinType (metin = RU/TR ad + kısa açıklama + RU uzun metin)
Yalnız "… cilt/кожа" ifadesinin niteleyicisine bakılır: `для <niteleyici> кожи`, `<sıfat> кожа`, `kuru/yağlı/karma/normal/hassas … cilt`.
| Etiket | Kanıt |
|---|---|
| kuru | сухой/сухую/сухих… кожа, kuru cilt |
| yagli | жирной/масляной кожа, yağlı cilt |
| karma | комбинированной кожа, karma cilt |
| normal | нормальной кожа, normal cilt |
| hassas | чувствительной кожа, hassas cilt, гипоаллергенн* |
| tum-ciltler | для всех типов/любого типа кожи, tüm cilt tipleri |
- Yalnız sıfat biçimi sayılır ("сухости" = kuruluk adı, cilt tipi değil). "проблемная кожа" belirsiz → etiket yok.
- "…tüm tiplere uygun, **dahil** hassas" (включая/в том числе) = kapsama; yalnız `tum-ciltler`. "özellikle hassas" ve "hassas cilt için" = `hassas`.
- Olumsuzlama ("не подходит для…", противопоказ*) atlanır. Birden çok tip birlikte yazılabilir; `tum-ciltler` özel tiplerle yan yana durabilir.

## concerns (yalnız ad + kısa açıklama; uzun pazarlama metni gürültülü olduğundan kullanılmaz)
Puan: ad eşleşmesi 3, kısa açıklama 2, `goz-cevresi` kategorisi +3; en yüksek 3 etiket, eşitlikte sözlük sırası.
| Etiket | Anahtar sözcükler (özet) |
|---|---|
| nem | увлажн*, сухост*, шелуш*, гиалурон*, nem/nemlend*, hidrat*, hydra |
| parlama-gozenek | себум, матирующ*, сужен* пор, контроль жирности, parlama, yağ kontrol |
| tikali-gozenek | черные точки, комедон, очищение пор, siyah nokta, tıkalı |
| isilti | сияни*, тускл*, осветл*, glow, aydınlat*, ışıltı, canlılık |
| ton-esitsizligi | отбел*, пигмент*, пятн*, выравнивание тона, leke, beyazlat*, niasinamid |
| ince-cizgi | морщин*, антивозраст*, омолаж*, лифтинг, упруг*, эластичн*, kırışık, sıkılaş*, kolajen, peptit |
| yatistirma | успокаива*, покраснен*, раздражен*, центелла/cica, yatıştır*, kızarıklık |
| goz-cevresi | вокруг глаз, для век, под глаз, göz çevresi, göz kremi |

## routineStep (yalnız ürün adı)
Sıra: (1) makyaj ürünü (для макияжа, праймер…) → boş; (2) göz kategorisi/adı → `goz-bakimi` (makyaj temizleyici ise `makyaj-temizleme`); (3) ad geçersiz kılmaları: снятия макияжа/мицеллярн* → `makyaj-temizleme`, скраб/пилинг → `peeling`, SPF/солнцезащит* → `gunes-koruma`, маска → `maske` (dudak hariç); (4) kategori varsayılanı (CILT-TESTI §3.3); serumlar/tonik kategorisinde adı "krem/süt/emülsiyon" olan → `nemlendirme`; (5) kategorisiz/erkek: ad sözcükleri (serum → tonik → temizleme → nemlendirme), yoksa boş.

## themeHint (K-065)
`gold` yalnız kozmetik köklerde (cilt, makyaj, saç, vücut, ağız-diş, set) ve ad "altın/золот/gold/24K" içerip renk/parfüm adı değilse ("altın bej", золотисто-, "Altın Rüzgar" hariç). `price-implausible` ürün (S-025) `publishReady=false`.

## Kapsam sonuçları (2026-11-16, `--no-fetch` çalıştırması)
Cilt Bakımı 253 ürün (TR 9, yakında 244); etiketli toplam 339 (cilt + set + vücut), TR 19.
| skinType | Cilt Bakımı TR / yakında | Tüm kapsam TR / yakında |
|---|---|---|
| kuru | 0 / 50 | 0 / 73 |
| yagli | 0 / 15 | 0 / 22 |
| karma | 0 / 11 | 0 / 13 |
| normal | 0 / 7 | 0 / 8 |
| hassas | 1 / 76 | 2 / 113 |
| tum-ciltler | 0 / 183 | 1 / 249 |
Bulucuda eşleşme (özel tip + tum-ciltler): her tip için ≥ 190 ürün; **ancak TR ürün sayısı 0–1** (aşağıdaki sınır).
| concern | Cilt Bakımı TR / yakında |
|---|---|
| nem | 6 / 138 · ince-cizgi 3 / 54 · isilti 1 / 35 · goz-cevresi 1 / 26 · yatistirma 0 / 20 · ton-esitsizligi 0 / 31 · parlama-gozenek 0 / 4 · tikali-gozenek 0 / 1 |
routineStep (Cilt Bakımı): nemlendirme 4 TR / 66, temizleme 2 / 29, maske 1 / 26, makyaj-temizleme 1 / 8; serum, tonik, güneş, peeling, göz, dudak yalnız yakında. Boş: 13 (TR 1: makyaj kremi, kasıtlı).

## Bilinen sınır
Cilt Bakımı'ndaki 9 TR ürünün 8'inin metni cilt tipi belirtmiyor (ASB046, CBE034, DAB089, FPA151, LGD012, SAA069, SBC053, SBJ064) → `skinType` boş → ADAY havuzuna giremiyor. Kural gereği tahmin edilmedi; S-058'e öneri eklendi.
