# Wireframe — Ürüne/Koleksiyona Özel Tema ve Hover Renk Geçişi

> Sahip: proje-yoneticisi · 2026-11-16 · Öncelik P0 (en az 1 temalı koleksiyon + 1 temalı ürün detayı Kapı 2 önizlemesinde)
> Dayanak: K-065 (ürüne/koleksiyona özel tema — ONAYLI), K-066 (dinamik renk geçişi — ONAYLI), K-092, K-093 (ÖNERİ) · S-029 (hangi ürün/koleksiyon temalı — AÇIK).
> Bu belge **ihtiyaç ve davranış** tarif eder; palet, süsleme ve SVG kararı ui-tasarimci'nin, hareket eğrisi hareket-tasarimcisi'nin, değişken mimarisi frontend-mimar'ındır. Ürün adı yerine koleksiyon anahtarı ve `theme` anahtarı kullanılır.

## Değişiklik günlüğü
| Tarih | Değişiklik | Kaynak |
|---|---|---|
| 2026-11-16 | İlk sürüm | K-065, K-066 |
| 2026-11-16 | ui-tasarimci (K-072, K-073, K-075, K-082) ve veri-muhendisi şema v2 (`palette`, `themeHint`) ile hizalandı: fiyat rozeti temada değişmez; klavye odağı da tetikler; `prefers-contrast: more`'da kapalı; Vitrin 2 bölgeye eklendi | ui-tasarimci, veri-muhendisi |

> Görsel uygulama ayrıntısı: `docs/tasarim/bilesenler/premium-theme.md`, `docs/tasarim/bilesenler/hover-recolor.md`. Bu belge plan düzeyidir; çelişkide KARAR-KAYDI geçerlidir.

---

# A. Tema sistemi (K-065, K-092)

## A1. Kavramlar
- **Ana tema:** brandbook'a sadık site teması (K-049). Altın/metalik yasağı (tasarim-kurallari §9) **yalnız ana tema** için geçerlidir.
- **Ürün/koleksiyon teması:** bir ürünün veya koleksiyonun kendi renk kimliği (ör. altın ambalajlı set → altın tema). Temalı içerik "premium" hissi verir: kendi paleti, yüzey dokusu, süsleme SVG'leri, tipografik vurgu.
- **Palet (hover için):** temanın küçük alt kümesi — hover renk geçişinde site vurgu değişkenlerinin alacağı değerler (B bölümü). Teması olmayan bir ürünün de yalnız paleti olabilir (ör. ambalajı belirgin mavi olan ürün).

## A2. Veri sözleşmesi (alan adları; uygulama frontend-mimar + veri-muhendisi)
| Alan | Nerede | Anlam |
|---|---|---|
| `themeHint` | ürün (veri-muhendisi v2: `"gold" \| "premium" \| null`) | Veri ipucu; temanın **açılması** yapılandırmayla olur (`themes.enabled[]` veya koleksiyon kaydı) — ipucu tek başına sayfayı temalandırmaz |
| `theme` | koleksiyon kaydı (EL, isteğe bağlı) | Tema kayıt defterindeki anahtar, ör. `gold`; temalı koleksiyon sayfasını açar |
| `palette` | ürün (veri-muhendisi v2: `{primary, secondary, tertiary, onPrimary}` veya `null`) | Hover renk geçişinin kaynağı; derlemede `palette.resolved`'a çevrilir, kontrastı tutmayan palet düşer (ui-tasarimci K-073) |
| Tema kayıt defteri | tasarım token'ları (ui-tasarimci) | Her anahtar için: zemin, yüzey, süsleme seti, vurgu, display tipografi seçeneği; kontrast tablosu belgelenir |
| Palet kaynağı | veri-muhendisi (otomatik) + ui-tasarimci (doğrulama) | Ambalaj görselinden türetilir; kontrast doğrulamasından geçmeyen palet kullanılmaz |

Kural: kayıt defterinde olmayan anahtar sessizce yok sayılır (ana tema). Ürün başına en çok 1 tema. Hangi ürün/koleksiyonların temalı olacağı S-029 cevabıyla yapılandırılır.

## A3. Temanın uygulandığı yüzeyler
| Yüzey | Ne değişir | Ne değişmez |
|---|---|---|
| **Temalı koleksiyon sayfası** (`/koleksiyon/{anahtar}`) | Başlık bandı tam genişlik temalı sahne (görsel `heroImage` + tema zemini + süsleme), bölüm ayraçları, kart çerçeve/süsleme, "Tümünü sepete" yok — standart kart eylemleri | Header, footer, filtre/araç çubuğu işlevi, fiyat biçimi, rozet etiketleri |
| **Temalı ürün detayı** (`/urun/{slug}`) | Üst blok zemini ve süslemeleri (galeri arkası), başlık tipografik vurgusu, öne çıkan faydalar ikonları, "Set içeriği" bölümü çerçevesi | Satın alma kutusu düzeni ve sırası, iki etiketli fiyat, PV, CTA metni, sertifika kuralları |
| **Ürün kartı (listelerde)** | İnce tema işareti: köşe süslemesi veya kart çerçevesi + görsel arkası tema yüzeyi | Kart düzeni, yükseklik (ızgara hizası bozulmaz), fiyat, PV, düğme |
| **Ana sayfa premium sahne** | Bölümün tamamı temalı (ana-sayfa §6) | — |
| **Mega menü tanıtım alanı** | Temalı koleksiyonu gösteriyorsa kart temalı | — |

## A4. Sabitler (her temada korunur)
1. Logo değişmez, temalı zemine konmaz (header beyaz kalır).
2. "Fiyat" ve "Üye fiyatı" etiketleri, rozet biçimi ve **rengi** temada da **aynıdır** (yeşil üye fiyatı rozeti; fiyat her zaman açık zeminli kart içinde — ui-tasarimci K-072, K-082). Birincil düğme ve odak halkası da değişmez.
3. Metin kontrastı ≥ 4,5:1, büyük metin/arayüz ≥ 3:1 — her tema için tablo halinde belgelenir (kalite-denetcisi doğrular).
4. Tıbbi iddia, indirim, yüzde, geri sayım temalı alanda da yok.
5. Tema hareketleri (ör. altın parıltı süpürmesi) yalnız transform/opacity; ekranda aynı anda en çok 1 sürekli dekoratif hareket; reduced-motion'da durağan.
6. Temalı sayfada da tek birincil CTA kuralı.

## A5. Temalı koleksiyon sayfası — bölüm sırası
1. **Temalı sahne** (tam genişlik): koleksiyon adı (H1), 1–2 cümle hikâye (icerik-editoru), `heroImage` (AI atmosfer veya resmî ürün kompozisyonu, ürün görünümü değiştirilmez), süsleme SVG'leri. Mobilde görsel üstte, metin altta; sahne yüksekliği mobilde ≤ 70 vh.
2. **(Varsa) set içeriği vurgusu:** setin içindeki ürünler küçük görsellerle "Bu sette" şeridi (setItems).
3. **Ürün ızgarası:** standart listeleme (filtreler yalnız ≥ 12 ürünle görünür; daha azsa yalnız sıralama).
4. **Tek CTA bölümü:** "Üye fiyatıyla almak için üye ol" (koleksiyon TR ürünü içeriyorsa) — yoksa "Benzer ürünleri gör".
- **Boş:** koleksiyon boşsa sayfa "Bu koleksiyon şu an boş" (kategori.md §Varyant).
- **SEO:** İndekslenir; başlık "{Koleksiyon} | {SATICI_ADI}".

## A6. Temalı ürün detayı
`urun-detay.md` §2–§6 aynen; yalnız A3 tablosundaki yüzeyler giydirilir. Mobil yapışkan çubuk standart (temasız) kalır — okunabilirlik.

---

# B. Hover ile renk geçişi (K-066, K-093)

## B1. Ne olur
Belirli bölgelerde bir ürün/set kartının üzerine gelinince **site vurgu değişkenleri** o ürünün paletine yumuşak geçişle döner; bölgeden çıkınca ana temaya döner.

## B2. Bölgeler (yalnız bunlar)
| Bölge | Tetikleyen öğe | Değişen öğeler |
|---|---|---|
| Header (Z2) | (tetiklemez; yalnız değişir) | Üst marka bandı, açık "Kategoriler" düğmesinin zemini. "Üye ol" düğmesinin dolgusu **değişmez** |
| Mega menü (Z1) | Öne çıkan ürün/set kartı, tanıtım karosu | Sağ sütun zemini, panel alt çizgi bandı, seçili kök çubuğu + Z2 |
| Ana sayfa hero (önizleme varyantı) | Hero'daki yüzen packshot'lar | Hero dekoratif motif (yaprak demeti) rengi |
| Ana sayfa Vitrin 1 ve Vitrin 2 | Ürün kartları | Bölüm zemin tint'i + eyebrow + inline bant + bölüm köşesindeki yaprak motifi (ui-tasarimci Z3) |
| Ana sayfa premium sahne (varyant A seçilirse) | Ürün kartları | Sahne süsleme rengi |

Header bandı ana sayfa vitrinlerinde de değişsin mi (Z2 yalnız mega menüyle bağlı mı)? ui-tasarimci Z2'yi yalnız mega menüye bağlıyor; plan önerisi: vitrin hover'ında da header üst bandı değişsin — önizlemede iki hâl gösterilir, kullanıcı seçer.
Diğer sayfalarda (listeleme, detay, sepet) hover renk geçişi **yok** (dikkat dağıtmamak, performans).

## B3. Değişmeyenler
Logo · metin rengi · fiyat ve üye fiyatı rozeti · PV etiketi · "Sepete ekle" ve diğer birincil düğmelerin dolgu rengi · odak halkası · hata/başarı/uyarı renkleri · "Türkiye'ye yakında" rozeti.

## B4. Zamanlama (hareket-tasarimcisi kesinleştirir)
- Giriş niyet gecikmesi ~120 ms (fare kartların üstünden geçerken titreşmesin).
- Geçiş süresi ~400 ms, yumuşak eğri; yalnız renk değişkenleri (zemin tint'i büyük alan ise opacity katmanıyla — boyama maliyeti hareket-tasarimcisi/frontend-mimar ölçer).
- Karttan karta: doğrudan yeni palete.
- Bölgeden çıkış: ~200 ms bekleme, sonra ana temaya ~400 ms.
- Aynı anda tek palet aktif; en son girilen kart kazanır.

## B5. Koşullar
- Yalnız `(hover: hover) and (pointer: fine)` cihazlar.
- `prefers-reduced-motion: reduce` → **devre dışı** (anlık değişim de yok; renk sabit kalır).
- Klavye odağı (`:focus-visible`) da tetikler — eşit deneyim (ui-tasarimci K-075).
- `prefers-contrast: more` / zorlanmış renkler → devre dışı.
- Paleti (`palette` veya `theme`) olmayan ürün → değişiklik yok (ana temada kalır; önceki palet aktifse ana temaya döner).
- Her palet değeri, değiştiği her öğe için kontrast tablosuyla onaylanmadan kayıt defterine girmez.

## B6. Performans
- Etkileşim gecikmesi (INP) ≤ 200 ms korunur; renk değişimi yerleşim (layout) tetiklemez.
- Hover geçişi için ek kütüphane yok tercihtir (frontend-mimar/hareket-tasarimcisi kararı; K-097 bütçesi).

## Analitik
`theme_collection_view` (anahtar), `palette_hover` **gönderilmez** (gürültü). 

## Kabul kriterleri
`KABUL-KRITERLERI.md` §11.
