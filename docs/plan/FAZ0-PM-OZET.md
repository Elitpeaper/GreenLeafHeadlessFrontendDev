# Faz 0 — Proje Yöneticisi Özeti (Boşluk Analizi)

> Hazırlayan: proje-yoneticisi · 2026-11-15 · Durum: TASLAK (Kapı 0 girdisi)
> Dayanak: `docs/plan/bosluk-analizi-is.md` (37 boşluk, 14 çelişki) ve `docs/plan/bosluk-analizi-ux.md` (84 boşluk).
> Bu belgedeki hiçbir şey bağlayıcı değildir; bağlayıcı olan yalnızca `KARAR-KAYDI.md`'deki `ONAYLI` kararlardır.
> Hukuki tavsiye değildir. Mevzuata dayanan maddeler yayından önce bir uzmana kontrol ettirilmelidir.

## 1. Sonuç

Toplam 121 boşluk incelendi. Bunların **11'i** kullanıcı cevabı gerektiriyor (S-005…S-015); geri kalanı için makul bir varsayılan `KARAR-KAYDI.md`'ye `ÖNERİ` olarak yazıldı (K-012…K-035). Kullanıcı 11 soruyu cevaplar ve önerilere itiraz etmezse Faz 1 geri dönüş riski olmadan başlayabilir.

Planı en çok etkileyen dört bulgu:

1. **Çift fiyatın dayanağı belirsiz.** "Liste = güncel × 2" hesaplanmış bir sayı. Üye olmayan müşterinin gerçekten bu fiyattan alıp almadığı bilinmiyor. Üstü çizili ya da "%50 indirim" gibi gösterilirse aldatıcı indirim riski doğar; bu, rakiplerde eleştirdiğimiz hatanın aynısı olur. Ayrıca üç fiyat kaynağı var (panel, xlsx, Ağustos kataloğu) ve hangisinin doğru olduğu tanımlı değil.
2. **Ödeme kapalıyken müşterinin sipariş yolu yok.** WhatsApp yasak, başka kanal tanımlı değil. Site bu fazda fiilen "keşif + üyelik hunisi". Sepetin, ödeme adımlarının ve kişisel veri toplamanın nasıl olacağı bu tek karara bağlı.
3. **Katalog ölçeği ile gezinme tasarımı çelişiyor.** MEMORY "çok geniş katalog, mega menü şart" diyor. Eldeki muhtemel Türkiye verisi ise yaklaşık 38 ürün + 3 set ve 9 kategori (bazılarında 1–2 ürün; tekstil, ayakkabı, mutfak yok). Menü, filtre, arama, sayfalama ve vitrin sayısı bu ölçeğe göre değişir. Bu sayılar alt ajanın ham dosyalardan çıkarımıdır; `docs/veri/ENVANTER.md` ile doğrulanmalı.
4. **Yayın takvimi tanımsız.** 16 Kasım 2026 Greenleaf'in Türkiye açılışı (yarın); sitenin hedef tarihi yazılı değil. Bir son tarih varsa kapsam ona göre küçültülmeli.

İki ek bulgu tasarımı doğrudan etkiliyor:
- **Brandbook yeşili ve mavisi beyaz yazıyla okunabilirlik standardını geçmiyor** (alt ajanın hesabı: yaklaşık 2,8:1 ve 2,7:1; hedef 4,5:1). "Yeşil rozette üye fiyatı" bu hâliyle standardı karşılamaz. Rakamlar Faz 2'de ui-tasarimci tarafından teyit edilmeli.
- **Ürün şeması ürün detay sayfasını taşımıyor.** Fayda maddeleri, kullanım, içerik listesi, cilt tipi, sertifika, koleksiyon ve ilgili ürün alanları MEMORY §4 şemasında yok.

## 2. Kapı 0'da kullanıcıya sorulacak sorular

Her soru tek satırda cevaplanabilir. S-001…S-004 zaten açık, tekrar edilmedi. Sıra etkiye göredir.

### A. Kapsamı ve takvimi belirleyenler

| ID | Soru | Önerimiz | Cevap neyi değiştirir |
|---|---|---|---|
| S-005 | Sitenin canlıya çıkması için hedef tarihiniz var mı; açılış dönemi için önce tek sayfalık "yakında + üye ol" sayfası ister misiniz? | Tam site için gerçekçi bir hedef tarih verin; ara sayfa istemiyorsanız fazlar sırayla ilerler. | Faz 1 kapsamı (MVP boyutu). Ara sayfa istenirse "Kapı 2'den önce kod yok" kuralına istisna kaydı gerekir. |
| S-006 | Panelde gördüğünüz fiyat üye fiyatı mı; üye olmayan biri gerçekten bunun iki katını mı ödüyor; fiyat tek adet için mi? | Evetse iki fiyat "Fiyat" ve "Üye fiyatı" etiketleriyle yan yana, üstü çizgi ve "%50" etiketi olmadan. Hayırsa yalnız üye fiyatı gösterilir. | Kart, detay, sepet ve özetteki tüm fiyat bileşenleri. |
| S-007 | Ödeme kapalıyken almak isteyen müşteri ne yapsın: sepeti alışveriş listesi olarak alıp üye olarak Greenleaf'ten mi sipariş versin, sizinle e-postayla mı iletişime geçsin? | Alışveriş listesi + üyeliğe yönlendirme; canlıda kişisel veri alınmaz. Ödeme adımları tasarlanır ve kodlanır, ödeme açılana kadar yalnız önizlemede görünür. | Sepet, ödeme adımları, ürün detay çağrısı, KVKK kapsamı. |
| S-008 | Sitede satıcı olarak hangi ad/unvan ve iletişim bilgisi görünecek, alan adı belli mi, Greenleaf logosunu kullanma izniniz var mı? (Distribütör siz misiniz, yoksa müşteriniz mi?) | "[Ad/Unvan] — Bağımsız Greenleaf Distribütörü" ibaresi + e-posta ve telefon; alan adı distribütörü öne çıkarsın. | Header, footer, hakkımızda, yasal sayfalar, SEO başlıkları, onay yetkisi. |
| S-009 | İlk yayına hangi ürünler girsin: yalnız Türkiye'de satışta olanlar mı (yaklaşık 40 + yeni gelenler), daha geniş katalog mu; gıda takviyeleri ertelensin mi? | Yalnız Türkiye'de satışta olan, Türkçe metni ve görseli hazır ürünler. Gıda takviyesi/sağlık ürünleri uzman kontrolünden sonra. Mega menü ürün sayısı ~100'ü geçince. | Menü, filtre, arama, sayfalama, vitrin sayısı, içerik iş yükü. |

### B. Tasarımı belirleyenler

| ID | Soru | Önerimiz | Cevap neyi değiştirir |
|---|---|---|---|
| S-010 | Okunabilirlik için yeşilin koyu bir tonunu yalnız yazı, düğme ve fiyat rozetinde kullanabilir miyiz? (Brandbook tonları zeminde ve motiflerde aynen kalır.) | Evet. | Renk token'ları, düğme ve rozet tasarımı; CLAUDE.md marka kuralının yorumu. |
| S-011 | Claude Design ekranları kodda piksel piksel mi esas alınsın, yoksa düzen tasarımdan, ölçüler ortak token dosyasından mı; mobil ekranlar ayrıca tasarlansın mı? | Düzen tasarımdan, ölçüler token'dan; 5 öncelikli sayfa masaüstü ve mobil ayrı tasarlansın. | Devir sözleşmesi, kalite denetiminin ölçütü, Faz 2 iş yükü. |
| S-012 | Ürün fotoğrafları dışında stok ya da yapay zekâ üretimi yaşam tarzı görseli kullanabilir miyiz, yoksa yalnız resmî Greenleaf görselleri mi? | Resmî görseller + tek tip zemine getirilmiş ürün fotoğrafları; hero için gerekirse yapay zekâ görseli (ürünün görünümü değiştirilmeden). | Hero ve hikâye bölümlerinin tasarımı. |

### C. İçeriği belirleyenler

| ID | Soru | Önerimiz | Cevap neyi değiştirir |
|---|---|---|---|
| S-013 | ISO/GMP/Helal gibi sertifikaların gösterilebilir kopyaları elinizde mi? | Yoksa sertifika rozeti yayında görünmez; yeri tasarımda ayrılır. | Ürün detay ve güven şeridi. |
| S-014 | Üyelik ücreti, ilk alım şartı ve indirim oranı için paylaşabileceğiniz resmî Türkçe kaynak var mı? | Yoksa koşullar yazılmaz; "yarı fiyatına" yerine "üyelere özel fiyat" denir ve resmî sayfaya yönlendirilir. | Üye ol sayfasının içeriği ve SSS. |
| S-015 | Üç başlangıç seti müşteriye normal ürün olarak mı satılacak, yalnız üyelik paketi olarak mı anlatılacak? | Normal ürün olarak "Setler" kategorisinde. | Kategori listesi, üye ol sayfası. |

**Daha önce sorulmuş sorulara ek not (yeni soru değil):**
- S-002 cevaplanırken sponsor bağlantısının ayrıca elle girilen bir kod içerip içermediği de belirtilsin; içeriyorsa üye ol sayfasına "kodu kopyala" bileşeni eklenir.
- S-001 gelmeden kesinleştirilemeyecek 13 tasarım kararı `bosluk-analizi-ux.md` §J-1'de listeli (üç yönün karışım oranı, fotoğraf stili, hero yaklaşımı, Poppins/Futura hiyerarşisi, pinwheel yoğunluğu, bant kullanımı, renk oranları, köşe/yoğunluk/gölge, ikon stili, koyu mod, kart estetiği, hareket karakteri, editoryal bileşenler).

## 3. Varsayılan olarak önerilen kararlar (kullanıcı itiraz etmezse)

Hepsi `KARAR-KAYDI.md`'de `ÖNERİ` durumunda. Ayrıntı ve gerekçe ilgili boşluk girişinde.

| ID | Konu | Önerilen varsayılan | Not |
|---|---|---|---|
| K-012 | Kitle önceliği | Müşteri > potansiyel üye > portföy izleyicisi; portföy için sitede ayrı bölüm ve "tasarlayan" imzası yok | S-008'e göre gözden geçirilir |
| K-013 | Fiyat gösterimi | İki ayrı etiketli fiyat; üstü çizgi ve yüzde etiketi yok; KDV dahil, yuvarlama yok; yayın öncesi zorunlu fiyat yenileme | S-006'ya bağlı; K-007'yi daraltır |
| K-014 | PV | Kartta yok; ürün detayında küçük bilgi satırı | Alt ajanlar ayrıştı, aşağıya bakın |
| K-015 | Üyelik dili | Yalnız "indirimli alışveriş" avantajı; kazanç/ekip/gelir vaadi yok | |
| K-016 | Üye ol sayfası | Açıklayıcı sayfa + yeni sekmede dış bağlantı; bağlantı test edilmeden yayın yok | S-002 |
| K-017 | Site hesabı | Bu fazda giriş/kayıt/hesabım yok; hesap ikonu "Üye ol / Greenleaf üye girişi" paneli açar | |
| K-018 | Veri toplama | E-posta, bülten, iletişim formu yok; uydurma yorum/puan yok; değerlendirme alanı gizli | |
| K-019 | Yasal asgari | İlk yayında künye/iletişim + KVKK aydınlatma + çerez politikası; satış öncesi paket ayrı | MEMORY §10'u düzeltir |
| K-020 | Analitik | Çerezsiz analitik + üyelik tıklaması olayları; onay banner'ı yok | |
| K-021 | Dil | Yalnız Türkçe, TRY; dil seçici yok | |
| K-022 | SEO | Site indekslenir; ürünler satın alınabilir gibi işaretlenmez; Merchant yok | seo-uzmani kesinleştirir |
| K-023 | Ürün şeması | İsteğe bağlı alanlarla genişler; boş alan bölümünü gizler; varyant için yer ayrılır | veri-muhendisi, frontend-mimar |
| K-024 | Yayına alma kuralı | Türkçe ad + fiyat + en az 1 görsel + iddia denetiminden geçmiş metin; Rusça metin hiçbir yerde görünmez | |
| K-025 | Stok | Stok adedi gösterilmez; elle tutulan yayın bayrağı | |
| K-026 | Bilgi mimarisi | Tek seviye Türkçe tüketici kategorileri; marka = filtre; koleksiyon = listeleme varyantı; boş kategori ve ürünsüz marka gizli | |
| K-027 | Gezinme | Masaüstünde açılır kategori paneli + ikonlu şerit; mobilde soldan menü; alt gezinme çubuğu yok | S-009'a bağlı |
| K-028 | Arama | Anlık arama + sonuç sayfası; Türkçe karakter eşdeğerliği, hafif yazım toleransı, kod/barkod araması | |
| K-029 | Filtre ve sıralama | Kategori, marka, fiyat; adres çubuğuna yansır; "Daha fazla yükle"; PV'ye göre sıralama yok | |
| K-030 | Ürün kartı ve detay | Kart detaya gider + tek "Sepete ekle"; tek görsel öncelikli detay; ilgili ürünler en fazla 4 | |
| K-031 | Sepet | Yalnız drawer; satır başına 1–10; kod + miktar saklanır, fiyat veriden okunur | |
| K-032 | Ana sayfa | Alışveriş önde sıra; açılışta en fazla 2 ürün vitrini; içerik bölümü veri yoksa gizli | MEMORY §7 sırasını değiştirir |
| K-033 | Bu fazdaki ek sayfalar | 404/hata, hakkımızda+iletişim, yasal şablon, favoriler; blog ve cilt testi sonraya; karşılaştırma yok | |
| K-034 | Kalite hedefleri | WCAG 2.2 AA; mobilde LCP ≤ 2,5 sn, CLS ≤ 0,1, INP ≤ 200 ms; en dar 360 px; azaltılmış hareket desteği | |
| K-035 | Tasarım devri | Tam tasarlanacak sayfa seti, zorunlu durum ekranları, gerçek veriyle tasarım, sürümlü klasör, onay kaydı | S-011'e bağlı |

**Alt ajanların ayrıştığı ve PM olarak tek öneriye indirdiğim noktalar:**
- **Ödeme adımları canlıda görünsün mü?** İş analizi "bayrak arkasında, canlıda form yok", UX analizi "form doldurulur, veri saklanmaz, not düşülür" dedi. Karar S-007'ye bırakıldı; önerim iş analizinin yolu (müşteri boşuna form doldurmaz), ödeme adımları portföy gösterimi için önizlemede tıklanabilir kalır. Bu, K-005'in ("akış tıklanabilir") yorumunu değiştirdiği için kullanıcı onayı şart.
- **PV:** İş analizi "hiç gösterme", UX analizi "detayda küçük satır". Önerim detayda küçük satır (K-014); portföy izleyicisi distribütörler için anlamlı, müşteri için göze batmıyor.
- **Tasarımcı imzası:** İş analizi "küçük footer imzası", UX analizi "yok". Önerim yok (K-012); S-008'in cevabı farklıysa değişir.
- **Sağlık kategorisi:** UX analizi 9 kategoride saydı, iş analizi ertelemeyi önerdi. S-009 içinde soruluyor.

## 4. Faz 1 için hazırlık listesi

**Kullanıcıdan (Kapı 0):**
1. S-005…S-015 cevapları ve K-012…K-035'e itirazlar.
2. Hâlâ açık olanlar: S-001 (görsel notlar), S-002 (sponsor bağlantısı), S-003 (yeni ürün verisi), S-004 (repo/Vercel).

**Paralel Faz 0 çıktılarıyla doğrulanacaklar (cevap gelince bu özet güncellenir):**
3. `docs/veri/ENVANTER.md`: ürün ve kategori sayıları; üç fiyat kaynağının yan yana karşılaştırması; fiyatın birimi (adet mi kutu mu) ve KDV durumu; görsel sayısı ve zemin tutarlılığı; marka adlarının yazımı (veride YIBEIL/YIBEILE, MEMORY'de "Yibelle"); brandbook ve logo dosyalarının gerçekten elde olup olmadığı (MEMORY §5 ile §11 çelişiyor).
4. `docs/arastirma/`: Greenleaf kayıt adımları, marka hikâyesi ve fabrika içeriği, referans sitelerdeki gezinme örnekleri.

**Faz 1'de proje-yoneticisi üretecek (`docs/plan/`):**
5. `PRD.md` — sitenin bu fazdaki işlevi dürüstçe "keşif + üyelik" olarak; kapsam/kapsam dışı; başarı ölçütleri; takvim.
6. `SAYFA-HARITASI.md` — seo-uzmani ile URL ve kategori ağacı.
7. `AKISLAR.md` — demo yolu dahil; boş ve hata durumları; devre dışı ödeme davranışı.
8. `wireframe/<sayfa>.md` — her bölüm için veri alanı, "veri yoksa ne olur", mobil davranış, tek çağrı.
9. `KABUL-KRITERLERI.md` — fiyat gösterimi, arama örnek sorguları, erişilebilirlik ve performans hedefleri, demo yolu.

**Faz 1 başında açılacak devir notları (bu dalgada yazılmadı; Orkestratör onayıyla):**
10. veri-muhendisi: fiyat kaynağı karşılaştırması, fiyat birimi, şema genişletmesi, marka adı listesi, görsel normalizasyonu.
11. icerik-editoru: Ağustos kataloğu metinlerinin iddia denetimi (örnek: "güneş yanığı, böcek ısırığı… tahrişi gidermek"), yasak ifadeler listesi, değer önerisi varyantları, cilt tipi etiketleri.
12. seo-uzmani: indeksleme ve yapılandırılmış veri stratejisi, filtre adreslerinin indekslenme kuralı.
13. frontend-mimar: sepet anahtarı ve varyant yeri, özellik bayrakları (ödeme adımları, yorumlar, içerik bölümü).
14. ui-tasarimci: brandbook renklerinin kontrast tablosu, Claude Design'daki boş tuvalin ana dosya olarak düzenlenmesi.

**Faz 1'i bloke eden asgari set:** S-005, S-006, S-007, S-008, S-009. Diğer sorular Faz 2 başlamadan cevaplanabilir.
