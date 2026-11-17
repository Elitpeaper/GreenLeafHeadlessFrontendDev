# FAZ 0 Araştırma Özeti — Greenleaf Türkiye

> Hazırlayan: pazar-arastirmaci · 2026-11-15 · Kaynak dosyalar: `greenleaf-tasarim-dili.md`, `greenleaf-varliklar.md`, `rakipler.md`, `ilham/*.md` (11 site). Her bulgunun kaynak URL'si ilgili dosyadadır. Bu belge karar değil, **öneridir**; bağlayıcı olan yalnızca `KARAR-KAYDI.md`'deki ONAYLI maddelerdir.
> Greenleaf, Suzhou merkezli bir **Çin** firmasıdır.

## 0. Önce bilinmesi gereken 3 çelişki (MEMORY ile)
1. **Resmî mağaza brandbook renklerini kullanmıyor.** `#4EAE36 / #86B726 / #30A8D7` 16 CSS dosyasının hiçbirinde yok. Gerçek tema koyu orman yeşili (`#0b5a32`, `#173923`) + **altın** CTA (`#d9a33b`). Font **Roboto**; Poppins hiç yok. Marka renkleri yalnızca logoda (`grinlif.png`, `greenleaf-icon.png`). Pinwheel motifi ve yeşil+mavi bant temada **hiç kullanılmıyor**, bu yüzden bizim için boşta bir farklılaştırıcı. → `greenleaf-tasarim-dili.md` §3–§6
2. **Sertifikalar kanıtsız değil, sadece gömülü.** `?route=account/voucher` sayfasında yaklaşık 362 PDF var: ISO 9001/14001/45001/22716, GMP Cosmetic, Halal. Eksik olan, bunların ürün sayfasında rozet olarak gösterilmemesi. → `greenleaf-varliklar.md`
3. **Logo rozeti 7 yaprak kümesi gösteriyor** (göz sayımı; brandbook "altı yapraklı" diyor). Brandbook PDF'i ve logo SVG'si gelmeden pinwheel çizilmemeli.

Ek: İncelenen ana sayfa bir **partner kopyası** (`store-32`). Kişisel veriler alınmadı.

## 1. Bulgu tablosu

| # | Bulgu | Etiket | Gerekçe | İlgili ajan |
|---|---|---|---|---|
| 1 | Marka paleti logodaki yeşil/lime/mavi üçlüsünden tek token dosyasına; resmî mağazanın 770 renkli CSS'i kopyalanmaz | ALIN | Mağaza teması marka dışı; brandbook + logo tutarlı | ui-tasarimci |
| 2 | Resmî mağazanın altın metalik CTA'ları ve Roboto fontu | ALMA | Brandbook'ta yok; yeşil CTA + Poppins öneriliyor (kullanıcı onayı gerekli) | ui-tasarimci |
| 3 | Tata Harper yaklaşımı: canlı yeşil + çok koyu yeşil metin + açık yeşil yüzey (`#42b029`≈`#4EAE36`, `#033702`) | UYARLA | Muted değil, marka paletine en yakın premium örnek | ui-tasarimci |
| 4 | Krem/kahve/taupe/zeytin paletleri (True Botanicals, ILIA, Farmacy, Typology, Biossance) | ALMA | Reddedilen "muted botanical" yönü | ui-tasarimci |
| 5 | Mega menü: sol kök kategori + 3 sütun alt grup + ikonlu satırlar; mobilde kayan çekmece | ALIN | Geniş katalog için kanıtlanmış yapı (resmî mağaza) | ui-tasarimci, hareket-tasarimcisi |
| 6 | Kategori ağacı (13 kök / yaklaşık 110 alt), tekrarsız ve 2 seviyeye sadeleştirilmiş | UYARLA | Kaynakta slug tutarsızlığı ve tekrar var; TR'de yalnız 37 ürün aktif | proje-yoneticisi, seo-uzmani |
| 7 | Kartta **Liste fiyatı + Üye fiyatı (yeşil rozet) + "%X tasarruf"** (Farmacy "$35 ($54 Value) · You Save 35%") | ALIN | Hiçbir rakip ve TR MLM sitesi bunu net göstermiyor; marketplace.ru ×2 kuralını doğruluyor | ui-tasarimci, icerik-editoru |
| 8 | PDP'de "Bu alışverişte N PV · Üye olursan ₺Y" satırı (Farmacy "Earn Reward Points", ILIA "Join VIP") | UYARLA | Üyeliği alışveriş avantajı olarak sunar | ui-tasarimci, icerik-editoru |
| 9 | Fiyat gizleme ("Узнать цену"), PV'yi girişe kilitleme (Atomy) | ALMA | Alışveriş engeli; şeffaflık bizim farkımız | proje-yoneticisi |
| 10 | Sertifika rozet satırı ("COSMOS NATURAL certified by Ecocert" kalıbı) + **tıklanabilir PDF** + ayrı Sertifikalar sayfası | ALIN | Hiçbir incelenen site rozeti belgeye bağlamıyor; PDF'ler mevcut | ui-tasarimci, icerik-editoru |
| 11 | EAEU belgeleri (СГР/ДС) ve "Eczema Approved / Derm Approved / Clinically Effective" etiketleri | ALMA | TR'de geçersiz veya TİTCK açısından tıbbi iddia | icerik-editoru |
| 12 | Cilt testi: Tatcha Ritual Finder iskeleti, Greenleaf için **3–5 adım** (cilt tipi → hedefler (en fazla 3) → mevcut rutin), ilerleme çubuğu, "Neden soruyoruz?" notu, sonuçtan doğrudan sepete | ALIN | Rakiplerde yok; 37 ürünle kural tabanlı JSON yeterli, backend gerekmez | proje-yoneticisi, ui-tasarimci, hareket-tasarimcisi |
| 13 | E-posta kapısı sonuçtan **sonra** ve atlanabilir, onay kutusu boş | UYARLA | Önce değer; KVKK/ETK | proje-yoneticisi, icerik-editoru |
| 14 | Selfie/AI yüz analizi (Tata, Peach & Lily, Paula's Choice) ve hamilelik/hastalık soruları | ALMA | KVKK biyometrik/özel nitelikli veri, TİTCK | proje-yoneticisi |
| 15 | İçerik sözlüğü: PDP içerik çipi ↔ sözlük girdisi ↔ "bu içeriği taşıyan ürünler"; şablon *Nedir / Faydası / Kimler için / Ürünler*; 30–40 girdi | ALIN | Uzun kuyruk SEO + eğitici güven; rakiplerde yok | seo-uzmani, icerik-editoru, ui-tasarimci |
| 16 | İçerik puanlama (Paula's Choice Best…Worst) | ALMA | Olumsuz hüküm, hukuki ve marka riski | icerik-editoru |
| 17 | PDP sırası: galeri → fiyat çifti + üyelik satırı → tek CTA → rozet satırı → 3 öne çıkan içerik → kullanım/SSS akordeonu → "birlikte kullan" → yorum (Biossance/Tatcha) | ALIN | Resmî mağazada tek görsel var ve ilgili ürün yok | ui-tasarimci |
| 18 | Mobilde sticky "Sepete ekle" barı (Tatcha, ILIA, Biossance) | ALIN | Tek net CTA ilkesiyle uyumlu | ui-tasarimci, hareket-tasarimcisi |
| 19 | Filtre eksenleri sabit sözlükten: Cilt tipi / İhtiyaç / Ana içerik / Alt marka / Form / Rutin adımı (Tatcha + Glow Recipe) | ALIN | Resmî mağazada filtre yok (405 ürün); Tata'daki eş anlamlı seçenek karmaşası önlenir | proje-yoneticisi, ui-tasarimci |
| 20 | Kartta "Kimin için / İhtiyaç" satırı, test sonucuyla aynı veriden | UYARLA | Test, kart ve filtre tek veri etiketinden beslenir | ui-tasarimci |
| 21 | Hover'ı yalnız `pointer:fine` cihazlarda açmak; hover-reveal'in dokunmatik karşılığı | ALIN | Mobil tutarlılık | hareket-tasarimcisi |
| 22 | Easing seti: `cubic-bezier(.16,1,.3,1)` ana; sepete eklemede hafif yay `(.34,1.56,.64,1)`; 200–400 ms | UYARLA | Tatcha/ILIA'dan ölçülmüş değerler | hareket-tasarimcisi |
| 23 | Hero/raylar: CSS scroll-snap, 5–6 sn autoplay, hover/etkileşimde durma, `prefers-reduced-motion`; mobilde 1.15 kart ipucu | UYARLA | Resmî mağaza + ILIA; kütüphanesiz | hareket-tasarimcisi |
| 24 | Header docking (kaydırınca kompakt), sepet sayacı "pop", ücretsiz kargo ilerleme çubuğu | UYARLA | Resmî mağaza, Isla, Tata, Farmacy | hareket-tasarimcisi |
| 25 | Sahte geri sayım, kampanya banner yığını, kanıtsız sayılar ("300 000+ partner", az yorumla 5.0★) | ALMA | Güven kaybı; yanıltıcı | icerik-editoru, proje-yoneticisi |
| 26 | Üyelik tek şık bölümde, 3 kart (ILIA "In Safe Hands": üyelik + test + avantaj); header'da tek "Üye ol" | UYARLA | Rakipler kazanç vaadiyle ana sayfayı dolduruyor | ui-tasarimci, icerik-editoru |
| 27 | Ürün adında koli bilgisi, marka yazım tutarsızlığı (iLiFE/ILIFE), ürün olmayan kalemler | ALMA | Toptancı dili; tek ad sözlüğü | icerik-editoru (+ veri-muhendisi) |
| 28 | Blog/rehber (ihtiyaca göre), okuma süresi + 2 satır özet; resmî mağazadaki "Eko gazetesi" karşılığı | ALIN | SEO; tıbbi konular hariç | seo-uzmani, icerik-editoru |
| 29 | Schema.org Product/Offer JSON-LD (greenleafazamat.kz tek SEO bilinçli rakip) | ALIN | Rakipte var, standarda çekeriz | seo-uzmani |
| 30 | Performans bütçesi: rakipte 33 MB HTML / 16.700 img (greenleafstore.uz), ağır Elementor DOM | ALMA (bu model) | Hız da UI güzelliğinin parçası | seo-uzmani |
| 31 | Serif display başlık (5 premium sitenin hepsinde var) | UYARLA (seçenek) | Brandbook Poppins; yalnız alternatif varyant olarak tasarıma sunulsun | ui-tasarimci |
| 32 | Kare ve büyük harf butonlar (Tata 74 px, True Botanicals 2 px kenar) | ALMA | Greenleaf'in yuvarlak dili (radius 12–20 px) | ui-tasarimci |

## 2. Greenleaf TR için en iyi 10 farklılaşma fikri
1. **Gerçek marka kimliği:** Brandbook yeşil/lime/mavi + Poppins + pinwheel motifi. Resmî mağazanın bile kullanmadığı kimliği ilk kez dijitalde tam kullanan site.
2. **Şeffaf çift fiyat:** Her kartta Liste ₺X · Üye ₺Y · %50 tasarruf. Rakiplerin ve TR MLM sitelerinin hiçbiri bunu misafire net göstermiyor.
3. **"Cildine uygun ürünü bul" testi:** 3–5 adım, selfie yok, "neden soruyoruz?" notu, sonuçtan tek tıkla sepete.
4. **Tıklanabilir sertifika rozetleri:** ISO 22716 / GMP / Halal rozeti PDF'e açılır. İncelenen 17 sitenin hiçbirinde yok.
5. **İçerik sözlüğü köprüsü:** INCI çipi → sözlük → bu içeriği taşıyan ürünler.
6. **Tek veri etiketiyle dört gezinme yolu:** ihtiyaç / içerik / alt marka / rutin adımı. Test, filtre ve kart aynı veriden beslenir.
7. **Alışveriş önce, üyelik zarif:** "Üye ol, yarı fiyatına al" tek bölüm + PDP satırı. Kazanç/araba vaadi yok.
8. **Premium PDP:** çoklu galeri, rozet satırı, 3 öne çıkan içerik, akordeon SSS, "birlikte kullan", mobil sticky CTA.
9. **Ölçülü, markalı hareket:** pinwheel yükleme ve ilerleme göstergesi (öneri), easeOutExpo geçişleri, scroll-snap raylar, reduced-motion desteği.
10. **Hız ve SEO standardı:** Next.js, optimize görseller, JSON-LD, Türkçe rehber içerikleri. Rakiplerin MB'larca sayfalarına karşı belirgin fark.

## 3. Açık kalanlar (Orkestratöre iletildi, ACIK-SORULAR'a yazılmadı)
Font (Poppins/Roboto), CTA rengi (yeşil/altın), pinwheel yaprak sayısı, Isla = isla-beauty.com mu, misafire PV gösterimi, cilt testinin Faz 1 kapsamı, sertifika PDF'lerinin TR'de kullanımı (hukuk kontrolü).
