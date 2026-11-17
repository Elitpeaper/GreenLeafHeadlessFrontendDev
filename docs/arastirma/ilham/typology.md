# Typology (us.typology.com) — Sade/bilimsel yön ilham analizi

> Hazırlayan: A4-ilham-bilimsel-egitici (PAZAR-ARASTIRMACI altında) · Tarih: 15 Kasım 2026 · Faz 0 (Discovery), kod yok.
> Etiketler: **Gözlem** = HTML/CSS/gömülü veriden doğrudan okundu. **Yorum** = bizim değerlendirmemiz. **Yeniden kurgu** = doğrudan görülmeyen kısım, kanıttan çıkarıldı.
> Önbellek: `.cache/arastirma/typology/` (home.html, list.html, pdp.html, quiz.html, quiz.json, library.html, entry.*.css).

---

## 1. Kaynaklar

| URL | Durum | Not |
|---|---|---|
| https://us.typology.com/ | 200 | Ana sayfa (Nuxt/Vue SSR) |
| https://us.typology.com/collections/serums | 200 | Listeleme |
| https://us.typology.com/products/complete-eye-care-routine | 200 | Ürün detay (set/rutin sayfası) |
| https://us.typology.com/diagnostic | 200 | Cilt testi giriş sayfası. **Tüm soru grafiği `__NUXT_DATA__` içinde gömülü geldi (43 soru düğümü)** |
| https://us.typology.com/library | 200 | İçerik kütüphanesi (sözlük karşılığı) |
| https://us.typology.com/_nuxt/entry.BBGjCOaI.css | 200 | Gerçek CSS (font, renk, @media, @keyframes) |
| /pages/skin-diagnosis, /products/hyaluronic-acid-serum | 404 | Tahmin edilen URL'ler yanlıştı; menüden doğru URL bulundu |

**Sınırlamalar:** Test sonuç sayfası (`/diagnostic/result`) oturum/cevap durumuna bağlı; **doğrudan görülmedi**. E-posta kapısı soru listesinde yok (aşağıda). Hiçbir görsel indirilmedi.

---

## 2. Ana sayfa bölüm akışı (Gözlem — sırayla)

1. Duyuru çubuğu: "Complimentary gift with every purchase over $100" + dönen kampanya metni (Advent Calendar 2026, "Take your diagnostic").
2. Header + mega menü: Products (By Edit / Face Care / Tinted Care / Skin Aging / Body & Hair) + **By Concern** (12 cilt ihtiyacı) + sağda **"Diagnostic"** sabit bağlantısı, dil/para birimi (EN/$), sepet.
3. Hero: "Complete Eye Care Routine — Treat, densify, then define." (rutin/set odaklı, ürün değil).
4. Marka cümlesi: "Our formulations are **concise, concentrated, made in France**".
5. **Best sellers** (3 kart, "View more").
6. Advent Calendar bandı (sınırlı sürüm).
7. **Fall Routines** — duo/trio setlerin liste/slider'ı ("View all routines").
8. **"Understand your skin and its complex needs. Begin diagnostic test"** — ana sayfada ortada büyük test CTA'sı.
9. **New Arrivals** (3 kart).
10. **Shop by concern** — ihtiyaç/kategori kutuları.
11. **Gift finder** — "Three questions for a tailored selection" (ikinci, 3 soruluk mini eşleştirme akışı; URL `/gift-finder`).
12. Sosyal kanıt: "555055 five-star reviews · overall rating 4.2/5 from 912801 reviews" + tek yorum alıntısı + "See all reviews".
13. Felsefe: "…you'll be able to understand every ingredient used in them. Simple, minimal…" + 4 başlık (Fewer ingredients higher standards / 100% made in France / Your trust in us / Always improving).
14. Footer (About, **The Library**, Help, Gift Finder, ülke seçici).

**Yorum:** Mağaza ürün listesinden önce *rutin + teşhis* öne çıkıyor; test CTA'sı sayfada **iki kez** (menü + gövde) var. Sayı ("555055") ayraçsız geliyor — muhtemelen sayaç animasyonu (doğrulanmadı).

---

## 3. Ürün kartı anatomisi (Gözlem: list.html / home.html)

Sıra: **[üst etiket]** → görsel → **ürün adı + kod** ("Mattifying Serum L35") → **aktif içerik alt satırı** ("2% Zinc PCA + Silica") → **fiyat** ("from $29.90" / "$47.90").
- Etiket çeşitleri: `Bestseller`, `New`, `Out of stock`, işlev etiketi (`Mattifying`, `HYDRATING`, `Barrier effect`, `Anti-redness`, `Plumping`, `Cycle`).
- Her ürünün harf+sayı **kodu** (L35, A31, C30, T10…): kod, ürün ailesini (L=…, A=…) simgeliyor olabilir (anlamı doğrulanmadı).
- Kartta "Sepete ekle" butonu yok (listelemede hızlı ekleme görülmedi), tıklayınca PDP. Out-of-stock kartlar listede kalıyor.
- Liste içine **sabit promosyon kartı** serpiştirilmiş ("The Complete Eye Care Routine — EXPLORE").

**Yorum:** Ad + yüzde + etken madde satırı "bilimsel" algının ana kaynağı. Greenleaf'te karşılığı: *ad + hacim + 1 satır içerik vurgusu*; yüzde verilemeyen ürünlerde "ana içerik" satırı.

---

## 4. Ürün detay sayfası yapısı (Gözlem: complete-eye-care-routine)

1. Breadcrumb → galeri → başlık, "3 products", **2873 reviews** yıldız bağlantısı.
2. Kısa açıklama + **set içindeki her ürün için seçici** (hacim "0.50 floz", ton "Serum Mascara — Black").
3. **Add to cart — $119.90** (toplam fiyat butonun içinde) + "Free shipping starts at $60" + "Complimentary gift with every purchase over $100".
4. Set içi ürün özeti: "L37 – Densifying Lash and Brow Serum · 2% Pea Peptides + Castor Oil · 4.1/5 · 0.50 floz — $40.50".
5. **Blok blok "neden" metinleri:** "A serum specially formulated for…", "A lightweight emulsion with no heavy feel", "A formula enriched with densifying active ingredients" (her aktif için 1 paragraf), "A recyclable glass bottle" (ambalaj/geri dönüşüm talimatı).
6. **Ingredients:** "19 ingredients. 96% naturally derived ingredients." + tam INCI listesi + "içerik listesi düzenli güncellenir, ambalajdaki listeyi okuyun" uyarısı.
7. **Yorumlar:** 4.1/5, "doğrulanmış alıcı" rozeti; **filtreler: Sebum seviyesi, Yaş aralığı, Hassas cilt (Evet/Hayır), Skin Typology (24 kod: AE(•), DP(+), VE(-)…)**; her yorumda "Sensitive skin: No", "Verified buyer", çevrilmiş yorum notu ("Translated from French. See original."), "Show more", sayfalama 01…373.
8. Sertifika rozeti yok; güven, "Made in France / vegan / kısa formül" cümleleriyle kuruluyor.

**Yorum:** Yorumların **kendi cilt tipi kodunuzla filtrelenmesi** testle PDP'yi bağlayan akıllı bir hamle: test sonucu → yorum filtresi. Greenleaf'te yorum henüz yok; ileride "cilt tipim" filtresi için veri şeması hazırlanabilir.

**TİTCK uyarısı (Gözlem → risk):** Kopyada "is reputed to promote the growth of eyelashes", "stimulate collagen synthesis", yorumda "erase wrinkles" geçiyor. Türkiye'de **büyüme/kalıcı etki/dokuyu değiştirme** iddiaları kozmetik için sorunlu; Greenleaf metinlerinde "görünümünü destekler / bakım sağlar" düzeyine inilmeli.

---

## 5. Listeleme / filtre UX

- **Gözlem:** Listeleme sayfasında (serums) **görünür filtre paneli yok**; gezinme, mega menüdeki **concern koleksiyonları** (`/collections/dry-skin`, `/oily-skin`, `/pigmentspots`, …23+ koleksiyon) ile yapılıyor. Sıralama/filtre denetimi HTML'de görülmedi.
- Sayfa başında **eğitici SEO metni** ("Serums are formulated with high concentrations of active ingredients… applied as the first step in your routine after cleansing") + "Show more"; sayfa altında uzun açıklama (serumlar nasıl çalışır, ne zaman uygulanır) — kategori sayfası = mini rehber.
- Kartlarda işlev etiketi, stokta olmayanlar sona atılmış değil.

**Yorum:** Küçük katalogda (bizde ~37 ürün) filtre paneli yerine **ihtiyaç koleksiyonu sayfaları + üstte kısa eğitim metni** daha temiz ve SEO'ya daha uygun.

---

## 6. Cilt testi / ürün eşleştirme akışı — ("Skin Diagnostic")

**Kaynak:** https://us.typology.com/diagnostic (`__NUXT_DATA__` JSON'u çözüldü → `.cache/arastirma/typology/quiz.json`). *Soru metinleri, tipleri, dallanmalar doğrudan gözlem.* Sonuç sayfası yeniden kurgu.

### Giriş noktaları (Gözlem)
- Header'da kalıcı "Diagnostic" bağlantısı (`?source=diagnostic_menu` izleme parametresi).
- Ana sayfada gövde CTA'sı "Begin diagnostic test"; footer'da yok, ama menüde var.
- Giriş ekranı: arka planda **döngülü sessiz video** (masaüstü + ayrı mobil video), başlık "Your personalized skin diagnostic in 4 minutes.", alt: "Find your skin type among **24 dermatologist-tested profiles** and get a routine built for your skin.", buton "BEGIN DIAGNOSTIC TEST". Güven rakamları: **8M diagnostics completed · 4 min average · 23 skin concerns · 24 skin types**.

### Yapı (Gözlem)
- Toplam **43 soru düğümü** (hepsi grafikte), ama kullanıcı **koşullu dallanma** ile yaklaşık **18–22 ekran** görür (3 şikayet seçimi × 1 alt soru + ortak ~12 soru). Ortalama süre ~4 dk (kendi iddiaları).
- İlerleme: HTML'de `progression` anahtarı var (çubuk/yüzde türü doğrulanmadı).
- **Her sorunun "Why this question?" açıklaması** var (`helper` alanı) ve alt açıklama (`desc`: "Choose as many as you like.").
- Soru sayfalarında görsel ortam (`media: image`) — her soru yanında illüstrasyon/foto.
- Önceki/Sonraki ("Previous / Next") butonları; tek seçimde seçince animasyonla otomatik ilerleme olması muhtemel (`select-white` keyframe'i, aşağıda).

### Soru listesi ve tipleri (Gözlem)
| # | Soru | Tip | Seçenek | Not |
|---|---|---|---|---|
| 1 | What's your top skin concern? | tek seçim | 11 (Pimples, Blackheads, Visible pores, Shiny areas, Hyperpigmentation, Wrinkles, Redness, Dryness/dehydration, Eye bags/dark circles, Dullness, "I don't have any particular concerns") | "You'll be able to choose two more after this." |
| 2–10 | **Şikayete özel alt soru** (1'e bağlı) | tek/çoklu | 2–6 | Örn. kırışıklık → "static wrinkles even at rest"; pigment → "sun / pregnancy / after hormonal contraceptives / after acne / after trauma"; kızarıklık → "irritated, tight, itchy / worsens with heat, alcohol, stress / red inflamed spots"; kuruluk → "when does your skin feel uncomfortable" |
| 11–20 | "Do you have a second concern?" + aynı alt sorular | tek | 11 | 2. şikayet |
| 21–30 | "Do you have another concern?" + alt sorular | tek | 11 | 3. şikayet |
| 31 | **Has a dermatologist diagnosed any of: Eczema/atopic dermatitis, Psoriasis, Rosacea, Seborrheic dermatitis, No?** | tek | 5 | Helper: zararlı içerikleri dışlamak için |
| 32 | How do you describe yourself? (A woman / A man / Non-binary / I don't wish to define myself) | tek | 4 | |
| 33 | How does your skin feel throughout the day with no products? | tek | 3 | parlama / nem ihtiyacı / sorun yok |
| 34 | What do you see when you look in the mirror? (wrinkle stage) | tek | 4 | koşullu |
| 35 | How does your skin react to cosmetic products? | tek | 3 | hiç / geçici kızarma / çok reaktif |
| 36 | **Sosyal kanıt ara ekranı** "55,000 five-star reviews out of 85,000 verified reviews" | seçeneksiz | 0 | Testin ortasına güven ekranı |
| 37 | Are you pregnant or breastfeeding? | tek | 2 | koşullu (cinsiyet cevabına bağlı) |
| 38 | Do you wear makeup? | tek | 4 | |
| 39 | Tell us about where you live (pollution level) | tek | 3 | |
| 40 | Do you smoke? | tek | 6 | |
| 41 | Select the skin tone that best represents you | tek | 6 | Fitzpatrick tipi tarifleri |
| 42 | How often do you get strong sun exposure? | tek | 5 | |
| 43 | Sun protection habit | tek | 4 | koşullu |

**Soru tipleri:** tek seçim (çoğunluk), çoklu seçim (alt sorular), ara ekran (sosyal kanıt). **Slider, görsel seçenek kartı yok** (seçeneklerde `preview` boş). Her seçenekte `jump` alanı = dallanma.

### E-posta kapısı (Gözlem / belirsiz)
Soru grafiğinde e-posta/lead soru düğümü **yok**. Sonuç öncesi kapı olup olmadığı doğrulanmadı (sonuç sayfası görülmedi). **Yorum:** Sonuç sayfasına girişte hesap/e-posta istenmesi muhtemel ama kanıtlanmadı.

### Sonuç sayfası (Yeniden kurgu, `/diagnostic/result`)
Giriş metni ("24 profil içinde cilt tipin", "rutinin") ve PDP'deki "Skin Typology (24 kod)" filtresinden: sonuç = **cilt tipi kodu + tipine uygun rutin (ürün kartları) + açıklama**. Ayrıntı doğrulanmadı.

### Greenleaf için kritik tespitler
- **Çok uzun:** 8M teşhis/ortalama 4 dk iddiası, Greenleaf'in ~37 ürünlük kataloğu için aşırı. Dallanma fikri ve **"Why this question?"** açıklamaları alınmaya değer; soru sayısı **5–7**'ye indirilmeli.
- **Tıbbi veri soruları (TİTCK/KVKK riski):** Q31 (dermatolog teşhisli egzama, sedef, rozasea, seboreik dermatit) ve Q37 (hamilelik/emzirme) sağlık verisidir → Türkiye'de kozmetik testinde **sorulmamalı / "tanı" dili kullanılmamalı**; KVKK'da özel nitelikli veri. (Hukuki tavsiye değildir.) Alternatif: "Cildim kolay tahriş olur" (Evet/Hayır) + sonuçta "Hassasiyetiniz varsa/hamilelikte kullanmadan önce uzmana danışın" notu.
- "Pimples / Blackheads / Redness / Eczema-prone" ifadelerini Türkçeye **"Sivilce eğilimi"** değil **"Pürüzlü/yağlı görünüm, gözenek görünümü"** gibi görünüm diliyle çevir; "akne" tıbbi terimdir.

---

## 7. İçerik sözlüğü / eğitici içerik — "The Library"

**Kaynak:** https://us.typology.com/library (Gözlem)
- Açıklama: "Explore our archive of expertise on skincare, concerns, ingredients, and formulations."
- Kategori ağacı: **Fact Sheet** (Skincare Actives, Botanical Ingredients, Skin Concerns, **Ban List**) · Active ingredients / Vegetable butters-oils / Essential oils / Hydrosols / UV Filter · **Sciences & Expertise** (Skin/Hair types, Skin aging, Biology, Dermatological conditions, Systemic diseases, Cosmetology…) · Expert interviews · Tips & Trends (Common misconceptions…) · **Care routine** (Facial care, Sun care, Eye & Lip, Hair, Body…).
- Makale kartı: kategori etiketi + **"10 min of reading"** + başlık + 2 cümle özet. Ana liste son makaleleri öne alıyor.
- **"Ban List"** (yasaklı/kullanılmayan içerikler) ayrı bir fact sheet — "içeriklerinde şunlar yok" mesajı için ilginç.
- PDP'den kütüphaneye link: PDP'de aktif madde açıklamaları **sayfa içinde** (paragraf); kütüphane makalesine doğrudan link HTML'de doğrulanmadı.

**TİTCK/Etik uyarısı:** Kütüphane vitrin makalesi **kemoterapi etkileri / hastalık** konularını işliyor (tıbbi içerik). Greenleaf'te bu tür içerik **ALMA**; "Biyoloji/Dermatolojik durumlar" kategorileri kozmetik sitesi için tıbbi iddia alanına girer.

---

## 8. Mikro etkileşimler & animasyonlar (Gözlem: entry.css)

| Etkileşim | Tetikleyici | His / süre | Amaç | Etiket |
|---|---|---|---|---|
| Test cevabı seçimi `select-white` | seçeneğe tıklama | **0.5 sn** ileri doğru (1. kare beyaz zemin/siyah yazı → ~%33'te #141414 zemin/beyaz yazı) | Seçimi onaylayan "mürekkep dolması" geri bildirimi | → hareket-tasarimcisi |
| Dönen metin `slideUp` | otomatik | 12 / 16 / 20 sn sonsuz döngü, 3–5 satır | Hero/duyuruda mesaj döndürme (kaydırma yukarı) | → hareket-tasarimcisi |
| `skeleton` | sayfa/kart yükleme | 2 sn döngü | Yüklenirken iskelet | → hareket-tasarimcisi |
| `pulse` | beklemede | 2 sn cubic-bezier(.4,0,.6,1) döngü | Yükleme/nabız | → hareket-tasarimcisi |
| `bounce` | uyarı/ipucu | 0.6 sn döngü | Dikkat çekme (muhtemelen ok/scroll ipucu) | → hareket-tasarimcisi |
| Opaklık geçişi | hover/durum | 0.5 sn | Yumuşak görünür/gizli | → hareket-tasarimcisi |
| Test giriş videosu | sayfa açılışı | otomatik, sessiz, döngü | Duygu + "4 dk" vaadi | → hareket-tasarimcisi |

**Yorum:** Animasyon dili **çok sakin**: renk çevirme ve opaklık; "oyunlaştırma" yok. Greenleaf için pinwheel dönüşü bu sakin dilin üstüne "tek marka dokunuşu" olabilir.

---

## 9. Mobil davranış (Gözlem: CSS)

- Tailwind breakpoint'leri: **600 px, 900 px, 1240 px** (`min-width`); en yoğun kırılma 900 (21 kural).
- Test girişinde **ayrı mobil video** (`diag_mobile.mp4`), `media.urls.mobile`.
- Header: mobilde "cart" metni + hamburger menü; "Diagnostic" menüde.
- Ürün sayfasında mobil sticky ekle-butonu **doğrulanmadı** (HTML'de `dock`/sticky işareti görülmedi).

---

## 10. Tipografi / renk karakteri (Gözlem: entry.BBGjCOaI.css)

- **Fontlar:** `Post Grotesk` (Light/Book/Medium; ana metin ve başlık), `Lettera` (Regular/Bold; mono/daktilo tarzı küçük etiket ve kodlar için, fallback Menlo/Courier New). Fallback `system-ui, sans-serif`.
- **Renkler (en sık):** `#141414` (metin/koyu), `#f3efe9` (krem/bej zemin), `#f4f4f2`, `#e9e9e9`, `#cecdc6` (taupe ayırıcı), `#909090` (gri), Tailwind grileri (`#111827`, `#374151`, `#e5e7eb`).
- Karakter: **sıcak kâğıt bej + siyah, çok az renk**; teknik "L35/A31" kodlama + mono etiket = laboratuvar hissi.

**Yorum:** Bu estetik "muted"a yakın bir nötr palet; Greenleaf'te **reddedilen "muted botanical" ile karıştırılmamalı** — biz yapısını (kod + yüzde + beyaz alan) alırız, rengini değil.

---

## 11. Greenleaf için çıkarım

| Etiket | Madde | Gerekçe |
|---|---|---|
| **ALIN** | Test sorularında **"Why this question?" açıklaması** | Güven + gizlilik + neden-soruldu şeffaflığı; veri hassasiyeti (KVKK) sorusunu da azaltır. → ui-tasarimci, icerik |
| **ALIN** | **Dallanmalı soru yapısı** (ilk cevap sonraki soruyu belirler) | Kısa ama kişisel hissettirir; 5–7 soruda kalmak mümkün |
| **UYARLA** | Ana sayfada **iki yerde** test CTA'sı (menüde kalıcı + gövdede bölüm) | Kullanıcıyı teste çeker; Greenleaf'te "Cildine uygun ürünü bul" menü + hero altı bölüm |
| **UYARLA** | Ürün kartında **ad + içerik vurgusu + fiyat** (bilimsel satır) | Greenleaf'te "ana içerik" satırı + hacim; **liste + üye fiyatı** eklenecek |
| **UYARLA** | Testin ortasında **sosyal kanıt/güven ekranı** | Greenleaf'te yalnızca doğrulanabilir bir güven bilgisi (ör. sertifika, resmî marka bilgisi) kullanılmalı; kanıtsız rakam uydurulmamalı |
| **UYARLA** | İhtiyaç koleksiyonu sayfası + **üstte kısa eğitim metni** | SEO + eğitici; filtre yerine sade gezinme |
| **UYARLA** | Yorumları kullanıcının **cilt profiline göre filtreleme** | Yorum yok henüz; veri şemasına `skinType` alanı eklenebilir (veri-muhendisi) |
| **UYARLA** | Kütüphane = içerik arşivi (okuma süresi + kategori + 2 satır özet) | Greenleaf "haber/içerik" bölümü ile aynı kalıp; **tıbbi konular hariç** |
| **ALMA** | Dermatolog teşhisli hastalık sorusu (egzama/sedef/rozasea) | TİTCK + KVKK risk; tıbbi dil |
| **ALMA** | Hamilelik / sigara / cinsiyet soruları | Özel nitelikli veri; ürün seçimine katkısı Greenleaf kataloğunda sınırlı |
| **ALMA** | 40+ soruluk uzunluk / 24 profil | 37 ürünlük katalog için orantısız |
| **ALMA** | Bej/taupe "muted" renk kodu, mono kod fontu | Marka kimliği (Poppins + #4EAE36/#86B726/#30A8D7) ve reddedilen yön |
| **ALMA** | Tıbbi makaleler (kemoterapi, dermatolojik hastalıklar) | TİTCK |
