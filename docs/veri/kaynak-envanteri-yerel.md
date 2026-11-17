# Yerel Kaynak Envanteri (FAZ 0 / B1-yerel-envanter)

Kapsam: `GreenLeaf documents\` klasöründeki 13 yerel ham dosya. Ham klasör salt okunur tutuldu; açılan içerik yalnızca `.cache\yerel\` altındadır. Bu belge envanter + analizdir; nihai `products.json` değildir.
Tarih: 2026-11-15. Hazırlayan: B1-yerel-envanter (Veri Mühendisi alt ajanı).

## 1. Özet tablosu

| Dosya | Ne | Boyut | Ürün / sayfa | Kalite | Güven |
|---|---|---|---|---|---|
| `greenleaf-turkiye-urunler.xlsx` | Panel API dökümü (openpyxl ile üretilmiş). Sayfalar: Ürünler (38), Başlangıç Setleri (3), Bilgi | 16 KB | 38 ürün + 3 set = 41 kayıt | Orta: veri tam ve tutarlı, adlar ham/çeviri kalitesinde, kategori kaba | Yüksek |
| `Kitap1.xlsx` | Boş Excel çalışma kitabı (tek sayfa "Sayfa1", hücre yok) | 8 KB | 0 | Kullanılamaz (boş) | Yüksek |
| `greenleaf-katalog.html` | Ağustos 2026 Türkiye kataloğu, tek dosya; veri JS dizisi `P` (37 ürün) + `SETS` (3 set), base64 görseller, satır içi vektör logo | 2,0 MB | 37 ürün + 3 set = 40 | Yüksek: temizlenmiş TR adlar, açıklama, özellik, kullanım, hacim, 8 kategori | Yüksek |
| `greenleaf-katalog.pdf` | Aynı kataloğun PDF'i (ReportLab, A4, Poppins gömülü) | 2,2 MB | 14 sayfa, 40 görsel | İyi (HTML'den türetilmiş; ek veri yok) | Yüksek |
| `2504021013y5XQ9b1Qzy.pdf` | **Resmi brandbook** ("bbook_last_USEFUL", Adobe Illustrator 25.2, 2023-06-21) | 23 MB | 12 sayfa A4 yatay, 42 görsel | Kaynak kalitesinde; metin Rusça, CID kodlu (okunamaz) | Yüksek (~90%) |
| `25012312341bNuhS7mZ8_kopyası.pdf` | Basıma hazır kartvizit şablonu ("визитка greenleaf", Illustrator 24.1, 2025-01-23) | 9,2 MB | 2 sayfa (ön/arka), 0 raster görsel | Basım dosyası; kişisel veri içerebilir | Orta-yüksek (~80%) |
| `8f0a9fdcde96fa17654b16d6e4fe369a.jpg` | Şeffaf zeminli yaprak dalı görseli (stok fotoğraf; PNG'den JPEG'e çevrilmiş, zemin gri-beyaz damalı görünüyor) | 63 KB | 800x579 | Dekoratif; arka plan kesilmemiş | Yüksek |
| `converted-images.zip` | 5 adet SVG (VTracer ile ekran görüntüsünden otomatik vektörleştirme) | 56 KB | 5 SVG | Düşük-orta: temiz logo değil, izlenmiş raster | Yüksek |
| `Emerald Luxe kartvisit tasarımı.zip` | Kartvizit baskı paketi (HTML+JS+JSON+PNG) | 19 MB | 103 dosya | Siteye kullanılamaz | Yüksek |
| `greenlead kartvisit tasarımları - png.zip` | Kartvizit PNG'leri | 19 MB | 80 PNG | Siteye kullanılamaz | Yüksek |
| `greenleaf kartvisit tasarımları - pdf.zip` | Kartvizit PDF'leri | 7,4 MB | 20 PDF | Siteye kullanılamaz | Yüksek |

## 2. Dosya bazlı bölümler

### 2.1 greenleaf-turkiye-urunler.xlsx
- Yapı: xlsx = zip/XML. Sayfa 1 "Ürünler (38)", sayfa 2 "Başlangıç Setleri (3)", sayfa 3 "Bilgi" (10 satır meta).
- Sütunlar: ID, Ürün Kodu, Barkod, Ürün Adı (TR), Kategori, Fiyat (₺), PV (Puan), ₺/PV (formül `IF(G=0,"-",F/G)`), Görsel URL. Her sayfanın sonunda TOPLAM satırı var (38 ürün toplamı 9.675 ₺ / 35,1 PV; 3 set 46.000 ₺ / 605 PV) – veri satırı değildir, ayıklandı.
- Bilgi sayfası: kaynak `greenleaf-global.com /api/v1/shop/goods`, çekim tarihi 4 Ağustos 2026, filtre "TRY fiyatı tanımlı + Türkçe ürün adı girilmiş", API fiyat ve PV değerleri 100'e bölünmüş, kategoriler Rusçadan Türkçeye çevrilmiş, panelde toplam 5.634 kayıt. Not: sayfada bir **distribütör hesap kimliği** yazıyor; değer bu belgeye alınmadı, bu dosya repoya/siteye taşınmamalı.
- Dosya özellikleri: yazar "openpyxl"; Kitap1'den bağımsız.
- Snapshot: `.cache\yerel\xlsx-products.json` (41 kayıt; `isSet` ile ayrılmış).

### 2.2 Kitap1.xlsx
- Kullanıcı tarafından 2026-10-02'de oluşturulmuş boş çalışma kitabı: `<sheetData/>` boş, `dimension ref="A1"`, paylaşılan string yok. Ana xlsx ile ilişkisi yok; ürün satırı içermiyor, snapshot üretilmedi. Öneri: yok sayılsın.

### 2.3 greenleaf-katalog.html
- `<title>Greenleaf Türkiye — Ürün Kataloğu</title>`, Poppins (Google Fonts), CSS değişkenleri `--green:#4EAE36; --lime:#86B726; --blue:#30A8D7; --ink:#333533` (MEMORY §5 ile birebir).
- Veri: 662. satırda `const P = [...]` (37 ürün), `SETS` (3 set), `CATS` (8 kategori). Alanlar: `id, c(kod), b(barkod), k(kategori), p(fiyat), v(PV), sp(hacim/gramaj), n(ad), d(açıklama), pr(özellik listesi), u(kullanım), img`. Setlerde barkod yok, `sp` = "3 ürün"/"5 ürün".
- Görseller: 40 adet base64 `image/jpeg` (37 ürün + 3 set), **hepsi 700x700**, 14,7–87,4 KB, toplam 1,35 MB. Çözülüp `.cache\yerel\catalog-images\<kod>.jpg` olarak yazıldı (kod bazlı adlandırma).
- Satır içi vektör: sayfada 6 adet `<svg>`; Greenleaf logosu (`viewBox 913.56x184.04`, 81 path, metin yok = yazı eğrilere çevrilmiş) ve altı yapraklı fırıldak "mark" (`184.04x184.04`). Renkler: `#4AA436`, `#84B626`, `#97CBE9`, `#2CA5D5`, `#FFF`. Çıkarılan kopyalar: `.cache\yerel\catalog-inline-logo.svg`, `catalog-inline-mark.svg` (mark ve logo çıktılarında path sayısı aynı çıktı; ayrım elle doğrulanmalı). Bu, önceki yerel SVG zip'inden çok daha temiz bir resmî logo kaynağı olabilir (MEMORY §5 "panelden alınan logo SVG" ile karşılaştırılmalı).
- `WHATSAPP = ""` boş. Açıklamalar **Türkçe** (Rusça `content` değil), yani katalog metinleri editoryal olarak yazılmış.
- Kategoriler (40 kayıt): Cilt Bakımı 10, Saç Bakımı 3, Ağız Bakımı 5, El & Vücut 7, Ev & Temizlik 7, Bebek & Çocuk 2, Kağıt Ürünler 2, Sağlık 1, Setler 3.
- Eksikler: 14/37 üründe hacim "—"; 22/40 üründe kullanım boş; 1 kayıtta özellik listesi yok. "Kutu başına" / "koli" ifadesi hiçbir alanda **yok**.
- Snapshot: `.cache\yerel\catalog-products.json` (40 kayıt).

### 2.3b greenleaf-katalog.pdf
- Başlık "Greenleaf Türkiye — Ürün Kataloğu", konu "37 ürün, 3 başlangıç seti · Ağustos 2026", üretici ReportLab, oluşturma 2026-08-05 18:45. 14 sayfa A4 (595x842 pt). Fontlar: Poppins Bold/Light/Medium (gömülü). 40 görsel, 700x700 ASCII85. Metin içerik akışları çıkarılamadı (altküme font, hex kodlu); veri HTML'de zaten tam, PDF ek bilgi taşımıyor. Renk kodları metin olarak aranmadı (vektör).

### 2.4 2504021013y5XQ9b1Qzy.pdf (brandbook, güven ~90%)
- Metadata: `Title: bbook_last_USEFUL`, Illustrator 25.2 (Windows), Adobe PDF library 15.00, 2023-06-21. 12 sayfa, 841,89x595,28 pt (A4 yatay), TrimBox=BleedBox.
- Gömülü fontlar: **FuturaDemiC, FuturaBookC, FuturaBookC-Italic, FuturaDemiC-Italic** (ana marka fontu), ayrıca Comfortaa-Medium/Bold, Raleway-Bold, Inter-Regular, Roboto-Medium (bir kısmı büyük olasılıkla örnek/yardımcı sayfa fontları). **Poppins yok**; sitedeki Poppins, Futura'nın web ikamesi (Futura lisanslı, Poppins Futura-benzeri geometrik).
- Renk kodları: ham akışlarda `4EAE36`, `86B726`, `333533` bulundu; `30A8D7` ve Pantone/CMYK karşılıkları aşağıdaki SVG (233652 numaralı ekran görüntüsü) üzerinden doğrulandı, o görüntü brandbook'un renk sayfasının kopyası (bkz. 2.7). Pantone adı yok.
- Metin: Rusça, CID/hex kodlu (`<009F009D...>`); ToUnicode eşlemesi çözülmeden okunamıyor. 74 düz Tj + 98 hex Tj akışı var. Görseller: 42 JPEG/Flate, en büyüğü 5472x3556, çoğu ~1350x955 ve 1865x2384 (stok/ortam fotoğrafları ve logo kullanım sayfaları).
- Öneri: Sayfa sayfa görsel inceleme gerekiyor (PDF render aracı yok, Chrome headless PDF'i ekran görüntüsüne çeviremedi). Logo kullanım kuralları/boşluk/yasaklar bu yolla okunmalı.

### 2.5 25012312341bNuhS7mZ8_kopyası.pdf (kartvizit şablonu, güven ~80%)
- Başlık "визитка greenleaf" (Rusça: kartvizit greenleaf), Illustrator 24.1, 2025-01-23. 2 sayfa, 272,13x158,74 pt (yaklaşık 96x56 mm bleed dahil; TrimBox 8,5 pt içeride = 90x50 mm), DeviceCMYK, 1 katman (OCG). Font ve raster görsel yok: tüm yazı eğri. Yazılar eğri olduğundan içerikte kişisel veri olup olmadığı doğrulanamadı; **kişisel iletişim verisi içerebilir kabul et**. Sitede kullanılmamalı.

### 2.6 8f0a9fdcde96fa17654b16d6e4fe369a.jpg
- JPEG, 800x579, SOF2 (progressive). İçerik: beyaz arka planlı yeşil yaprak dalı. Görselin "damalı şeffaflık" deseni piksellere işlenmiş (PNG'den kötü dönüşüm), yani gerçek şeffaflık yok. Dekoratif hero/arka plan için ham haliyle uygun değil; lisans/kaynağı bilinmiyor (stok görseli görünümünde). Öneri: kullanma, ya da lisanslı bir kaynaktan temiz kesim iste.

### 2.7 converted-images.zip (5 SVG)
Hepsi `visioncortex VTracer 0.6.4` ile "Ekran görüntüsü 2026-09-15 …" dosya adlı ekran görüntülerinden otomatik izlenmiş vektörler; metin eleman yok (`<text>` 0), font yok, gömülü raster yok; yani yazılar da eğri/lekeler halinde, kenarlar bozuk. **Üretim logosu olarak uygun değil**; yalnızca referans.

| Dosya (saat) | Boyut / viewBox | Path | İçerik | Ana renkler |
|---|---|---|---|---|
| 233632 | 171x173 (width/height, viewBox yok) | 13 | Daire içinde fırıldak (pinwheel) mark, açık mavi zemin | #7BB42D (yeşil), #98CBE9 / #2FA6D5 (mavi), #EBF5F8 |
| 233641 | 159x157 | 14 | Aynı mark, açık yeşil zemin | #7BB42D, #98CBE9, #2EA5D5, #D4EADC |
| 233652 | 1063x628 | 537 | **Brandbook renk sayfası ekran görüntüsü**: logo + "Greenleaf family / Born for Beauty" + renk tablosu (Rusça etiketler: Белый, Зелёный, Салатовый, Голубой, Чёрный) | Çok sayıda ara ton (anti-alias); belirgin: #4EAE36 (yeşil), #86B726 (salata), #30A8D7 (mavi), #333533 (siyah), beyaz |
| 233658 | 491x145 | 53 | Yatay logo: mark + "Greenleaf family / Born for Beauty", **yeşil zeminde beyaz** (#4AA437 zemin) | #4AA437, #7DB42F, #99CCE9, #32A7D6 |
| 233702 | 486x123 | 49 | Aynı yatay logo, **beyaz zeminde renkli** | #51A73E, #7BB42E, #97CBE9, #2EA5D5, #FDFEFD |

Brandbook renk sayfasından okunan palet (SVG 233652'nin render'ından): Beyaz #FFFFFF (ana zemin); Yeşil #4EAE36, CMYK C73 M7 Y99 K0 (ana kurumsal renk); Salata/lime #86B726, CMYK C55 M4 Y100 K0 (tasarım unsuru); Mavi #30A8D7, CMYK 71/15/7/0 (vurgu ve blok zemini); Siyah #333533, CMYK 69/58/58/65 (metin). Bu, MEMORY §5'teki palet ile birebir uyuşuyor.
Not: yatay logodaki "family" etiketi var; sitenin logosu "Greenleaf" mı "Greenleaf family" mi, kullanıcıya sorulmalı.

### 2.8 Kartvizit zip'leri (yalnızca liste; kişisel veri uyarısı)
> **UYARI: Bu üç zip kişisel iletişim verisi (ad-soyad, büyük olasılıkla telefon/e-posta) içeriyor. Sitede, repoda veya herhangi bir üretim çıktısında KULLANILMAMALI. En fazla marka uygulama referansı olarak (renk/yerleşim) bakılabilir. İçerikten kişisel veri bu belgeye aktarılmadı.**

- `Emerald Luxe kartvisit tasarımı.zip` (103 dosya): `baski/` altında 20 adet `*.print.html` (4 kişi x 5 tasarım), 80 PNG (`png/…-on|arka-bleed|kesim.png`), `_faces.json`, `_rasterizer.html`, `doc-page.js`. Dosya adları kişi adı içerir.
- `greenlead kartvisit tasarımları - png.zip`: 80 PNG (4 kişi x 5 tasarım x ön/arka x bleed/kesim). Dosya adı kişi adı içerir.
- `greenleaf kartvisit tasarımları - pdf.zip`: 20 PDF (4 kişi x 5 tasarım).
- Tasarım adları (kişiden bağımsız): EmeraldLuxe, GreenleafFamily, NoirGold, SplitGold, VerdantWhite. Siyah/altın ve zümrüt tasarımlar marka paletinin dışında; yalnızca "GreenleafFamily" ve "VerdantWhite" marka renkleriyle uyumlu olabilir (kontrol edilmedi).
- Bunlar `.cache` altına açılmadı (liste okuma yeterli).

## 3. Ürün verisi analizi

### 3.1 xlsx ürünleri (41 kayıt = 38 ürün + 3 set)
- Alan doluluğu: kod, ad, kategori, fiyat, PV, görsel URL %100 dolu. **Boş: barkod 3** (üç başlangıç seti T001/T003/T006; ürünlerde barkod hep dolu).
- Benzersizlik: kod, barkod, ID tekrarı **yok**. Ad tekrarı **1**: `CARICH el yapımı kömürlü esansiyel yağ sabunu` hem CBB017 (ürün) hem T001 (set) için yazılmış; katalogda T001 = "CARICH Başlangıç Seti" → xlsx'te set adı yanlış/kopya.
- Barkod: hepsi 13 hane, EAN-13 kontrol hanesi **38/38 geçerli**; hepsi `6955470` ön ekli (tek üretici/GS1 öneki).
- "(Kutu başına N adet)": xlsx adlarında **0 eşleşme** (ne xlsx ne katalogda). Koli adedi bu iki kaynakta yok; MEMORY §6'ya göre panel API `description` (Rusça) alanında. `boxQty` için yalnızca API'den gelecek.
- Ad içi hacim/gramaj kalıpları (4): `YIBEIL çocuk diş macunu (80g)`, `iLiFE Çamaşır Deterjanı (2KG)`, `iLiFE çamaşır deterjanı (1KG)`, `Greenleaf 1,25kg Zencefilli Deterjan`. Bunlar adda kalmamalı, `volume` alanına gitmeli (katalogda ayrı alan olarak var).
- Ad kalitesi: büyük/küçük harf tutarsızlığı (`çiçek kokulu şampuan`, `Cilt bakım gliserini`, `iLiFE deterjan`, `CARICH vitamin E Emülsiyonu`), markasız adlar (`çiçek kokulu şampuan`, `Cilt bakım gliserini`), yazım hatası (`YIBEIL` vs `YIBEILE`; `soğuk alg` kırpılmış), ham çeviri. Marka dağılımı (ilk kelime): iLiFE 15, CARICH 13, SEALUXE 5, YIBEILE 3 (biri YIBEIL), Nilrich 1, pinkpoint 1, Greenleaf 1, markasız 2.
- Kategori dağılımı: Genel Ürünler 20, Ev Ürünleri 4, Saç Bakımı 3, Ağız Bakımı 2, Bebek/Çocuk Ürünleri 2, Mendil & Kağıt 2, Cilt Bakım Kozmetiği 2, Kuponlu Ürünler 1, Sağlık Ürünleri 1, Diğer 1, Başlangıç Setleri 3. "Genel Ürünler" (%53), "Kuponlu Ürünler" (kampanya etiketi) ve "Diğer" gezinme için işe yaramaz; katalogdaki 8 kategori çok daha kullanılabilir.
- Fiyat/PV: ₺/PV yeniden hesaplandı, sütundaki formül sonuçlarıyla **0 uyumsuzluk**; PV=0 yok. ₺/PV aralığı 73,6 – 1925 (medyan 370). PV adımları 0,2 / 0,5 / 0,7 / 1 / 2 / 3 / 10 / 55 / 275. Aykırı: KLA128 Bambu Yüz Mendili 385 ₺ / 0,2 PV = 1925 (en yüksek), DAC056 yağ temizleyici 1020. Hata değil, PV basamakları fiyatla orantılı değil; "PV" sitede sembolik gösterilecekse hesap yürütülmemeli. Setler ₺/PV 74–100 ile ayrı bir sınıf. Fiyat toplamı sayfa toplamlarıyla uyumlu (9.675 ve 46.000).
- Fiyat birimi: ₺, tam sayı (API kuruşun /100'ü). Bu fiyatın liste mi üye fiyatı mı olduğu belirsiz (aşağıda açık soru).
- Görsel URL: 41/41 dolu, **tek domain `greenleaf-global.com`** (`/data/files/goods/<hesap-no>/<tarih+rastgele>.<uzantı>`): png 24, jpg 16, jpeg 1. URL tekrarı yok.

### 3.2 xlsx ↔ katalog eşleşmesi
Eşleştirme: önce ürün kodu (40/40 eşleşti), barkod ve ad ek kontrol.

| Sonuç | Sayı |
|---|---|
| Kod ile eşleşen | 40 (37 ürün + 3 set) |
| Yalnızca xlsx'te | 1: `DAC056` iLiFE Mutfak Yağ Temizleyici (Genel Ürünler, 204 ₺, 0,2 PV) |
| Yalnızca katalogda | 0 |
| Fiyat çatışması | 0 |
| PV çatışması | 0 |
| Barkod çatışması | 0 (setlerde ikisinde de boş) |
| Kategori farkı | 40/40 farklı sınıflandırma (xlsx 11 değer, katalog 9; haritalama gerekli) |
| Ad farkı | 38'de farklı yazım; ~10'unda **anlam çatışması** |

DAC056 neden katalogda yok: büyük olasılıkla katalog hazırlanırken 37'ye indirilirken elendi (ürün hâlâ panelde TR'de fiyatlı). Karar gerekir.

Anlam çatışmaları (xlsx adı → katalog adı); katalog metni editoryal olduğu için muhtemelen doğru, ama kullanıcı teyit etmeli:
- ASB046: "SOD ipek **losyonu**" → "SOD İpek **Yüz Kremi**"
- NWA052: "20 çeşit vitamin ve mineralli yumuşak çiğnenebilir **şekerler**" → "Nilrich Yumuşak **Kapsül**" (54 g, 0,75 g x 72 kapsül); ürün formu çelişiyor (sağlık beyanı açısından kritik)
- CCA016: "soğuk alg(ı) **alüminyum içermeyen** diş macunu" → "**Florürsüz Deniz Yosunu** Diş Macunu"
- CBB017 ve T001: "kömürlü esansiyel yağ sabunu" → "Bambu Kömürü Sabunu" / "Başlangıç Seti"
- SAA069: "Yeşil Çay Nemlendirici **Peeling**" → "…Nemlendirici **Temizleme Macunu**"
- DAB089: "Cilt bakım gliserini" → "iLiFE Gliserinli Cilt Bakım Nemlendiricisi"
- EBB018: "vücut **sütü**" → "Vücut **Kremi**"; ASA017: "Çamaşır **Deterjanı**" → "Çiçek Kokulu Çamaşır **Jeli**"; ASA086 "Bulaşık **Sıvısı**" → "Bulaşık **Deterjanı**"; LGI019 "Zencefilli Deterjan" → "Zencefilli **Bulaşık** Deterjanı"; EAA022 "çocuk diş macunu (80g)" → "Çocuk Diş Macunu — **Portakal**" (aroma bilgisi katalogda var).
- CCC029: "Diş Fırçası" → "Diş Fırçası — Limited Seri (10'lu)" (10 adet).

### 3.3 Görsel kapsamı
- xlsx: 41/41 URL dolu, hepsi `greenleaf-global.com`. 13 URL'ye (set dahil) 1 sn arayla `curl -I` yapıldı: **13/13 HTTP 200**, content-type image/png veya image/jpeg; content-length 115 KB – 5,8 MB (örn. EAA022 5,82 MB, CBB017 1,0 MB, ASB046 0,99 MB; jpg'ler 115–216 KB). Sonuç: `.cache\yerel\head-results.json`.
- 2 görsel indirilip ölçüldü (CEA069 jpg, DAB089 png): ikisi **800x800**. Yani panel görselleri 800x800 kare; katalogdaki gömülü görseller 700x700 JPEG (muhtemelen bu görsellerden küçültülmüş).
- Katalog: 40/40 ürün/sete gömülü görsel var (700x700 JPEG). Yani her TR ürünün iki kaynaktan görseli var (DAC056 hariç: yalnızca URL, gömülü yok).
- Öneri: site için panel URL'lerinden (800x800, PNG'ler ağır) indirip webp/avif'e dönüştürmek; panel domaini çalışıyor ama hotlink edilmemeli (yerel kopya).

### 3.4 Kitap1.xlsx ile ilişki
Hiçbir (boş çalışma kitabı).

## 4. Üretilen dosyalar
- `.cache\yerel\xlsx-products.json` (41 kayıt): anahtarlar `id, code, barcode, name_raw, name_clean, boxQty, volume, category, price, pv, ratioSheet, ratioCalc, imageUrl, isSet, _source`.
- `.cache\yerel\catalog-products.json` (40 kayıt): anahtarlar `id, code, barcode, name_raw, name_clean, boxQty, volume, category, price, pv, description, properties, usage, imageFile, imageMime, imageBytes, imageDims, isSet, _source`.
- `.cache\yerel\catalog-images\` 40 JPEG (`<kod>.jpg`, 700x700).
- `.cache\yerel\catalog-inline-logo.svg`, `catalog-inline-mark.svg`: HTML içindeki satır içi vektör logo/mark.
- `.cache\yerel\head-results.json`, `dl\` (2 test indirmesi), `render\` (SVG'lerin Chrome ile PNG render'ı), `pdf\` (kısmi metin çıkarımı), `unzip\` (xlsx ve SVG açılımları).
- Not: `name_clean` bu aşamada yalnızca "Kutu başına" kalıbını çıkarır; ad normalizasyonu ve hacim ayrıştırması sonraki aşamada yapılacak.

## 5. Kullanılan scriptler (`.cache\scripts\`)
`yerel-xlsx.mjs` (xlsx okuyucu), `yerel-catalog.mjs` (katalog HTML ayrıştırma, görsel çözme/ölçme), `yerel-analiz.mjs` (kalite + eşleştirme), `yerel-head.mjs` (HEAD örneklemesi), `yerel-dim.mjs` (JPEG/PNG boyutu), `yerel-svg.mjs` (SVG analizi), `yerel-pdf.mjs` ve `yerel-pdfmeta.mjs` (PDF metadata/metin/görsel), `yerel-logo.mjs` (HTML içi SVG çıkarma). Hepsi yalnızca Node yerleşik modülleri kullanır. Ek: yalnızca SVG render'ı için Chrome headless kullanıldı.

## 6. Açık sorular ve önerilerim
1. **Fiyat anlamı:** xlsx/katalogdaki fiyat (örn. 97 ₺) güncel/üye fiyatı mı? MEMORY: liste = güncel x 2. Katalog tek fiyat gösteriyor. Öneri: bu değer `memberPrice`, liste = x2 sabitle (tek yerde sabit) uygula; kullanıcı teyit etsin.
2. **Ad kaynağı:** Anlam çatışmalı ~10 üründe (özellikle NWA052 şeker/kapsül, CCA016 diş macunu içeriği, ASB046 losyon/krem) hangisi doğru? Öneri: katalog adlarını esas al, çatışmalı 10 ürünü ürün sahibine/paket fotoğrafına karşı doğrulat; sağlık/diş ürünlerinde iddia içeren metni yayınlama.
3. **DAC056 (yağ temizleyici):** Katalogdan çıkarılmış mı yoksa unutulmuş mu? Öneri: dahil et ama "katalogsuz" işaretle, açıklama/özellik panelden gelsin; kullanıcı onayı.
4. **Kategori şeması:** Katalogdaki 8 kategori + Setler'i kullan; xlsx kategorilerinden ("Genel Ürünler" vb.) kullanma. Haritalama tablosu `kategori-haritasi` olarak veri mühendisinde.
5. **Koli adedi (`boxQty`):** İki yerel kaynakta da yok; yalnızca panel API'sindeki Rusça `description`'da. Öneri: panel verisinden çıkar (B-panel işi), yerel veride boş bırak.
6. **Setler:** Barkod yok (kabul), T001 xlsx adı hatalı. Set içeriği (3/5 ürün) listelenmemiş; panelden çek.
7. **Görseller:** Panel 800x800, katalog 700x700. Öneri: panelden indirilen 800x800'ü ana kaynak yap (PNG'ler 1-5 MB, webp'e çevir), katalog JPEG'leri yedek.
8. **Marka:** Brandbook sayfa sayfa görsel incelenmeli (Futura/Poppins, logo boşluk kuralları, "Greenleaf" vs "Greenleaf family" kullanımı). Öneri: yatay logo için HTML'deki satır içi SVG'yi ve panel logosunu karşılaştır; VTracer SVG'leri üretimde kullanma.
9. **Kişisel veri:** Kartvizit zip'leri + kartvizit PDF'i + xlsx "Bilgi" sayfasındaki hesap kimliği siteye/repoya taşınmamalı. Öneri: `.gitignore`'a `.cache/` ekle, bu dosyaları ham klasörde bırak.
10. **Yaprak JPEG:** Lisans/kaynak belirsiz, zemin damalı. Öneri: kullanma.

## 7. Sorunlar / sınırlar
- PDF render aracı yok: brandbook ve kartvizit PDF'i görsel olarak sayfa sayfa incelenemedi, brandbook metni (Rusça, CID kodlu) okunamadı; renk paleti SVG (ekran görüntüsü) üzerinden doğrulandı.
- Bash aracında çift ters-bölü karakterleri bozulabiliyor; regex içeren scriptler bu yüzden Write ile yeniden yazıldı (`yerel-pdf.mjs`, `yerel-pdfmeta.mjs`). Dikkat: `yerel-xlsx.mjs`, `yerel-catalog.mjs`, `yerel-analiz.mjs`, `yerel-svg.mjs` heredoc ile yazıldı ve doğru çalıştı.
