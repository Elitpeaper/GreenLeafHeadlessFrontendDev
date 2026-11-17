# Veri Envanteri — FAZ 0 (Keşif)

> Sahip: veri-muhendisi · Tarih: 2026-11-15 · Durum: KEŞİF (nihai veri değil)
> Ayrıntılar: [kaynak-envanteri-yerel.md](kaynak-envanteri-yerel.md) (yerel dosyalar) · [green-leaf-shop-haritasi.md](green-leaf-shop-haritasi.md) (RU mağaza)
> Önbellek anlık görüntüleri: `.cache/yerel/*.json`, `.cache/greenleaf-shop/*.json` (repoya girmez)

## 1. Özet

- **Türkiye'de satışa açık ürün sayısı: 38 ürün + 3 başlangıç seti = 41 kayıt** (`greenleaf-turkiye-urunler.xlsx`). Bunun 37 ürün + 3 seti (40 kayıt) Ağustos kataloğunda Türkçe metin ve 700×700 görselle hazır durumda.
- Yerel iki kaynak birbiriyle **%100 tutarlı**. 40/40 kod eşleşti; fiyat, PV ve barkod çatışması yok. Tek fark **DAC056**: xlsx'te var, katalogda yok.
- RU mağaza (global.green-leaf.shop) 1676 ürün içeriyor. TR kodlarının **34/41'i (%83)** burada model koduyla eşleşti. Site barkod göstermediği için barkodla eşleşme yapılamadı.
- **Koli adedi ("Kutu başına N adet") yerel kaynakların hiçbirinde yok.** Yalnız RU mağaza adlarında `(Кол-во в коробке N шт)` biçiminde geçiyor. Panel API'sinde de `description` alanında olması bekleniyor.
- Panel API çıktısı (G-005) henüz gelmedi. Şema ve hat ona göre tasarlandı (bkz. SEMA-TASLAGI.md).

## 2. Kaynak tablosu

| Kaynak | İçerik | Sayı | Kalite | Hattaki rolü |
|---|---|---|---|---|
| `../greenleaf-turkiye-urunler.xlsx` | 3 sayfa: Ürünler (38), Başlangıç Setleri (3), Bilgi (meta, distribütör hesap kimliği içerir). Sütunlar: ID, Kod, Barkod, TR ad, Kategori, ₺, PV, ₺/PV, Görsel URL | 41 kayıt | Yüksek: kod/barkod/ID tekrarı yok, 38/38 EAN-13 geçerli, ₺/PV sütunu doğru. Zayıf yanlar: 20/38 kategori "Genel Ürünler", adlar düzensiz (büyük/küçük harf, markasız, YIBEIL/YIBEILE, kırpık), 4 adda hacim var, T001 set adı CBB017'nin adının kopyası | **TR kapsamının (hangi ürünler satılıyor) ve fiyat/PV'nin ana kaynağı** (panel gelene kadar) |
| `../greenleaf-katalog.html` | Ağustos kataloğu. Veri JS dizilerinde: TR ad, hacim, açıklama, özellikler, kullanım, kategori, base64 görsel. Satır içi temiz vektör logo ve pinwheel | 37 ürün + 3 set | Yüksek (editoryal TR metin). 14/37'de hacim "—", 22/40'ta kullanım boş | **TR başlık, açıklama ve kategorinin ana kaynağı.** Yedek görsel (700×700 JPEG) |
| `../greenleaf-katalog.pdf` | HTML'den üretilmiş 14 sayfalık PDF (ReportLab, Poppins) | aynı 40 | HTML'e ek veri yok | Yok (yalnız referans) |
| `../2504021013y5XQ9b1Qzy.pdf` | **Brandbook** ("bbook_last_USEFUL", Illustrator, 12 sf. A4 yatay, 42 görsel; fontlar FuturaDemiC/FuturaBookC). Metin Rusça ve CID kodlu, okunamadı | 12 sf. | Güven ~%90. Görsel inceleme yapılamadı (PDF render aracı yok) | Marka referansı → ui-tasarimci |
| `../25012312341bNuhS7mZ8_kopyası.pdf` | Kartvizit baskı şablonu ("визитка greenleaf", 90×50 mm, CMYK, yazılar eğri) | 2 sf. | Güven ~%80 | Yok. Kişisel veri riski, sitede kullanılmaz |
| `../converted-images.zip` | 5 SVG: VTracer ile ekran görüntüsünden otomatik izlenmiş. 2 pinwheel, 1 brandbook renk sayfası, 2 yatay "Greenleaf family / Born for Beauty" logosu | 5 | Düşük (izleme kaynaklı). Renk paleti doğrulaması için değerli: #4EAE36 / #86B726 / #30A8D7 / #333533 | Renk doğrulaması. **Üretim logosu olarak uygun değil** |
| `../8f0a9fdcde96fa17654b16d6e4fe369a.jpg` | 800×579 yaprak dalı. Damalı zemin "sahte şeffaflık" (gerçek alfa kanalı yok) | 1 | Düşük, lisansı belirsiz | Kullanılmamalı |
| `../Kitap1.xlsx` | Boş çalışma kitabı | 0 | — | Yok |
| 3 kartvizit zip'i | 4 kişi × 5 tasarım: 80 PNG + 20 PDF + 20 print.html + yardımcı dosyalar | — | **Kişisel ad ve iletişim verisi içerir** | **Sitede KULLANILMAZ.** En fazla iç marka uygulama referansı |
| `global.green-leaf.shop` (RU, OpenCart 4.x) | 163 kategori düğümü (13/66/84), Rusça ad, RUB fiyat, "Модель" (=kod), tek görsel (≤800 px), Rusça açıklama, bonus puanı (=PV×100) | 1676 ürün | Orta: barkod ve marka alanı yok, 8 ad bozuk (`?????`), 99 ad tekrarı, `/A` varyant kodları. Sitemap ve JSON uç noktası yok | Rusça içerik ve kategori ipucu, yedek görsel, koli adedi yedeği. **Fiyat kaynağı değil** |
| Panel API (`greenleaf-global.com`) | goods.json + categories.json: id, code, title, content (uzun RU), description (kısa RU: hacim + koli), price, points, category, barcode, photo | ? (bekleniyor) | Bilinmiyor. G-005 nedeniyle BLOKE | **Hedef ana kaynak.** Gelince kod/fiyat/PV/barkod/görselde öncelikli olur |
| xlsx görsel URL'leri (`greenleaf-global.com/data/files/goods/...`) | Ürün başına 1 PNG/JPG | 41/41 dolu | 13/13 HEAD 200; 115 KB–5,8 MB. İndirilen 2 örnek 800×800 | **Birincil görsel kaynağı** (panel `photo` ile aynı depo olması muhtemel) |

## 3. Kaynaklar arası eşleştirme

**Anahtar: ürün kodu** (ör. `CBB017`). Barkod yalnız yerel ve panel kaynaklarında var, ikinci anahtar olarak kullanılacak. Ad eşleştirmesi yalnız ipucu olarak kullanılabilir, çünkü TR ve RU adları aynı kodda bile çelişebiliyor (ör. CCC001: "CARICH" ↔ "OKFAD").

| Karşılaştırma | Sonuç |
|---|---|
| xlsx ↔ katalog HTML | 40/41 eşleşti (kodla). Yalnız xlsx'te: **DAC056** (iLiFE Mutfak Yağ Temizleyici). Yalnız katalogda: 0. Fiyat/PV/barkod çatışması: 0 |
| xlsx ↔ RU mağaza | 34/41 (%83). Setler hariç 34/38 (%89) |
| RU'da olmayanlar | KLA128, DAC056, DAB089, NWA052 (model sitede yok) + T001, T003, T006 (setler). Olası karşılıklar: DAB089 → DAB086 (id 864), NWA052 → NWA030 (id 5851, PV uyuşmuyor). Kod farklı olduğu için **eşleştirilmedi** |
| Fiyat oranı RU ↔ TR | Eşleşen 33 üründe RUB/TRY = 2,97–3,01 (≈×2,99). Aykırı: CEA069 (×3,99, PV yok). RU bonus puanı = TR PV × 100 (birebir) |
| Panel ↔ hepsi | Bekleniyor. Kod + barkod ile eşleştirilecek |

## 4. Görsel kapsamı

| Kaynak | Kapsam | Çözünürlük / biçim | Not |
|---|---|---|---|
| xlsx URL (greenleaf-global.com) | 41/41 | 800×800 (2 örnek), PNG/JPG, 5,8 MB'a kadar | Birincil kaynak. Kalan 39 görselin ölçüsü hat çalışınca doğrulanacak |
| Katalog base64 | 40/41 (DAC056 yok) | 700×700 JPEG | Çıkarıldı: `.cache/yerel/catalog-images/<kod>.jpg` |
| RU mağaza | 34/41 | ≤800 px. Orijinal adresi `image/catalog/product/...`; PNG'lerin 800 sürümü büyütülmüş | Yedek. Daha büyük orijinal yok |
| Galeri (çoklu görsel) | 0 | — | Tüm kaynaklarda ürün başına **1 görsel**. Ürün detay galerisi tasarımı buna göre yapılmalı |

## 5. Boşluklar

1. **boxQty**: Yerel kaynaklarda yok. Panel `description` alanından ya da RU adlarındaki `(Кол-во в коробке N шт)` ifadesinden alınacak. 34 eşleşen ürün için RU yedeği var.
2. **Panel verisi** (uzun içerik `content_ru`, panel kategorisi, güncel fiyat) G-005'e bağlı.
3. **Stok**: Hiçbir kaynakta güvenilir stok yok (RU mağazanın "В наличии" bilgisi TR'yi yansıtmaz).
4. **Marka alanı**: Hiçbir kaynakta ayrı bir alan yok. Addaki ön ekten (CARICH, iLiFE, YIBEILE…) türetilecek, sonra elle doğrulanacak.
5. **Hacim**: Katalogda 14/37 üründe boş. Panel `description` alanından tamamlanacak.
6. **Kullanım metni**: 22/40 kayıtta boş. icerik-editoru'nün işi.
7. **DAC056**: Katalog metni ve 700'lük görseli yok, RU karşılığı da yok. Tek kaynak xlsx (ve ileride panel).
8. **Brandbook metni** okunamadı. Sayfa sayfa görsel inceleme gerekiyor.

## 6. Çatışmalar

| # | Çatışma | Kaynaklar | Önerilen kural |
|---|---|---|---|
| Ç-1 | ~10 üründe xlsx adı ile katalog adı anlamca farklı. NWA052 "çiğnenebilir şeker" ↔ "yumuşak kapsül"; CCA016 "alüminyumsuz" ↔ "florürsüz"; ASB046 losyon ↔ yüz kremi; SAA069 peeling ↔ temizleme macunu. Ayrıca EBB018, ASA017, ASA086, LGI019, DAB089, CBB017 | xlsx ↔ katalog | Katalog adını esas al. 10 ürün paket fotoğrafı veya panel ile doğrulanana kadar `needsReview` işaretli kalsın |
| Ç-2 | Kategori şemaları üç ayrı biçimde: xlsx (11 değer, %53'ü "Genel Ürünler"), katalog (8 + Setler), RU (163 düğüm) | hepsi | Katalogdaki 8 + Setler TR kategorisi esas olsun. RU/panel kategorisi `sourceCategory` olarak saklansın |
| Ç-3 | Aynı kodda TR adı ile RU adı farklı (CCC001) | xlsx ↔ RU | Kod ana anahtardır, TR adı korunur |
| Ç-4 | Liste fiyatı kuralı: TASLAK "güncel × 2". RU fiyatı ≈ TRY × 3 (bu kuralı ne doğrular ne çürütür, farklı pazar) | MEMORY ↔ RU | RU fiyatı hiçbir hesapta kullanılmasın. ×2 tek sabitte kalsın, kullanıcı onaylasın |
| Ç-5 | Logo: "Greenleaf family / Born for Beauty" (SVG zip) ↔ katalog HTML'deki satır içi logo ↔ panelden alınan logo SVG (MEMORY §5) | marka | Panel logosu gelene kadar katalog HTML'deki temiz vektör aday olsun. Karar ui-tasarimci ve kullanıcının |
| Ç-6 | Font: brandbook'ta Futura, MEMORY'de Poppins | marka | Poppins web ikamesi olarak kalsın (TASLAK). Brandbook görsel incelemesinde teyit edilsin |

## 7. Riskler

| Risk | Etki | Önlem |
|---|---|---|
| G-005 (panel) gecikirse | boxQty, content_ru ve güncel fiyat eksik kalır | Hat panelsiz de çalışmalı. Yerel + RU yedeği ile ilk `products.json` üretilir, panel gelince birleştirme önceliği değişir |
| Ad çatışmaları ve sağlık/diş ürünleri (NWA052, CCA016) | TİTCK'ye aykırı veya yanlış ürün tanımı | `needsReview` bayrağı. Doğrulanmamış iddia metni yayınlanmaz |
| Kişisel veri sızıntısı (kartvizitler, kartvizit PDF'i, xlsx "Bilgi" sayfasındaki hesap kimliği) | KVKK, itibar | Bu dosyalar `.cache/` dışına çıkarılmaz, `.cache/` git'e girmez. Hat "Bilgi" sayfasını okumaz |
| RU mağaza taraması `?limit=100` robots.txt'e aykırı | Erişim engeli, etik | Üretim taramasında 16'lı sayfalama ya da yalnız kodla arama (~41 istek) yapılmalı. RU mağazaya yalnız ihtiyaç kadar gidilmeli |
| Görsel boyutu ≤800 px | Retina ürün detayında yumuşak görüntü | Tasarım görseli 800 px'i aşacak boyutta göstermemeli. Daha büyük kaynak için kullanıcıya sorulacak |
| Tek görsel/ürün | Zayıf ürün detay galerisi | Tasarım tek görsel + yaşam tarzı görseli varsayımıyla yapılmalı |
| RU adlarında bozuk karakter ve varyant kodları (`/A`) | Yanlış eşleşme | Eşleştirme yalnız tam kodla yapılır, varyant kodu ayrı kayıt sayılır |
