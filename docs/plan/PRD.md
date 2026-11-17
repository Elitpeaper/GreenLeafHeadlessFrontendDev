# PRD — Greenleaf Türkiye Headless Frontend (İlk Yayın)

> Sahip: proje-yoneticisi · Faz 1 → Faz 2 · Son güncelleme 2026-11-16 · Durum: **Kapı 1 geçti (değişikliklerle)**
> Dayanak: KARAR-KAYDI K-036…K-049 ve K-062…K-071 (ONAYLI); K-050, K-051, K-055 (kısmen), K-056, K-058, K-059 (PV hariç), K-061 Kapı 1'de ONAYLI kabul edildi; bu güncellemenin önerileri K-098…K-097 (ÖNERİ).
> Bağlı dokümanlar: `SAYFA-HARITASI.md`, `AKISLAR.md`, `BILGI-MIMARISI.md`, `CILT-TESTI.md` (bulucu kuralları), `wireframe/*.md`, `KABUL-KRITERLERI.md`, `FAZ1-OZET.md`.
> Hukuki tavsiye değildir; mevzuata dayanan maddeler yayından önce uzmana kontrol ettirilir.

## Değişiklik günlüğü
| Tarih | Değişiklik | Kaynak |
|---|---|---|
| 2026-11-16 | Ödeme sayfaları kapsamdan çıktı; sepette pasif "Ödemeye geç · Yakında" | K-068, K-088 |
| 2026-11-16 | PV tüm ürünlerde (yakında dahil) + ayrı PV sayfası/bölümü; PV ana mesajlardan biri | K-062, K-098, K-086 |
| 2026-11-16 | Cilt testi → "Cilt tipine göre ürün bulucu", isteğe bağlı e-posta adımı (KVKK + açık rıza) | K-069, K-089, K-090 |
| 2026-11-16 | Görselli mega menü, ürüne/koleksiyona özel tema, hover ile renk geçişi, ana sayfada görsellik/animasyon önceliği | K-064…K-066, K-070, K-091…K-094, K-097 |
| 2026-11-16 | Tıbbi bant/merhem ürünleri yayına girer (iddia denetimiyle) | K-067, K-095 |
| 2026-11-16 | Panel verisi: 62 kayıt (~10 yeni TR ürünü); müşteri fiyatı kaynakta üye × 2; PV = puan/100 | Orkestratör, K-071, K-096 |
| 2026-11-16 | Kullanıcı K-085: kazanç/iş fırsatı içeriği sitede yer alır (K-015 İPTAL) → yalnız PV sayfasında ayrı bölüm | K-085, K-099 |

## 1. Ürün tanımı (tek cümle)

Greenleaf'in tüm ürün yelpazesini Türkçe, hızlı, **görsel olarak dikkat çekici** ve marka kimliğine sadık çok sayfalı bir mağazada gösteren; Türkiye'de satıştaki ürünleri iki etiketli fiyat ve PV ile sepete ekleten; online ödeme açılana kadar sepeti "alışveriş listesi" olarak tutup alışverişi **üyeliğe yönlendiren** bir vitrin + üyelik hunisi.

Bu fazda site **para tahsil etmez ve ödeme sayfası yoktur** (K-068). Sepetteki "Ödemeye geç" düğmesi görünür ama pasiftir, üzerinde "Yakında" rozeti vardır.

## 2. Hedefler

| # | Hedef | Ölçüt (yayından sonraki 30 gün) |
|---|---|---|
| H-1 | Ziyaretçi ürün bulsun | Oturumların ≥ %40'ında en az 1 ürün detay görüntüleme |
| H-2 | Sepet deneyimi çalışsın | Ürün detay görüntülemelerinin ≥ %8'inde "Sepete ekle" |
| H-3 | Üyelik yönlendirmesi | Oturumların ≥ %3'ünde Greenleaf üyelik bağlantısına tıklama (dış bağlantı olayı) |
| H-4 | Bulucu değer üretsin | Bulucuda cilt tipi seçenlerin ≥ %30'u ürün detayına veya sepete gider |
| H-5 | PV anlaşılsın | `/pv-nedir` görüntüleme ve PV ipucu açılma olayları ölçülür (taban çizgisi, hedef yok) |
| H-6 | Portföy kalitesi | Mobil LCP ≤ 2,5 sn, CLS ≤ 0,1, INP ≤ 200 ms (K-034); WCAG 2.2 AA; Lighthouse mobil Performans ≥ 90 — **animasyon ve görsellik önceliğine rağmen** (K-070, K-097) |
| H-7 | Güven | Sertifika PDF açılma olayı ölçülür (taban çizgisi) |
| H-8 | E-posta (servis bağlanınca) | Bulucu sonucunu e-postayla isteme oranı ölçülür (taban çizgisi) |

Ölçüm: çerezsiz analitik (K-020). Olaylar `KABUL-KRITERLERI.md` §0.5'te.

## 3. Hedef kitle (öncelik sırasıyla — K-012)

1. **Alıcı müşteri** — Kozmetik/kişisel bakım/ev ürünü arayan Türk tüketici; ağırlıkla 40+ (brandbook); çoğunlukla mobil. İhtiyacı: güven, net fiyat, kolay bulma, "cildime uygun mu?".
2. **Potansiyel üye** — Ürünleri düzenli kullanacak, üye fiyatıyla almak isteyen kişi. İhtiyacı: üyelik ve **PV**'nin ne olduğu, nasıl üye olunduğu; isteyene Greenleaf iş fırsatının atıflı ve dürüst anlatımı (K-085; yalnız PV sayfasında — K-099).
3. **Portföy izleyicisi** — Diğer Greenleaf satıcıları. İkna aracı sitenin kendisi: görselli mega menü, ana sayfa hareketleri, premium temalı koleksiyon sayfaları, hover renk geçişi, bulucu, hız.

Satıcı kimliği: yapılandırmada yer tutucu (K-047).

## 4. Kapsam — İLK YAYIN

### 4.1 Sayfalar (ayrıntı: `SAYFA-HARITASI.md`)
Ana sayfa · Kategori (2 seviye) ve koleksiyon listeleme (temalı koleksiyon varyantı dahil) · Arama · Ürün detay (TR / yakında / temalı) · Sepet drawer · Üye ol · **PV nedir** · **Cilt tipine göre ürün bulucu** · Sertifikalar · Hakkımızda + iletişim + künye · Favoriler · Yasal sayfalar (KVKK aydınlatma, çerez politikası, kullanım koşulları, e-posta açık rıza / ticari ileti onay metni) · 404 / hata.
**Yok:** ödeme sayfaları (`/odeme/*`), site içi hesap.

### 4.2 Katalog (K-038, K-039, K-067)
- Greenleaf'in **tüm ürünleri** görünür. Kaynak: RU mağaza (~1676) + panel (62 kayıt) + xlsx.
- **Türkiye'de satışta** (bugün ≈ 41 + panelden ~10 yeni; kesin sayı veri hattında): tam içerik, iki etiketli fiyat, PV, sepete eklenebilir.
- **Türkiye'ye yakında**: Türkçe ad + görsel + kısa açıklama + **PV** (RU puanı / 100, K-098); fiyat yok; sepete eklenemez.
- **Tıbbi bant/merhem türü ürünler yayınlanır** (K-067); tedavi edici iddia yok, iddia denetimi zorunlu, ürün sayfasında sabit uyarı notu, vitrin/mega menüde öne çıkarılmaz (K-095).
- Setler normal ürün, "Setler" kategorisinde (K-048).

### 4.3 Fiyat ve PV (K-036, K-062)
- "Fiyat" = kaynaktaki müşteri fiyatı (panelde üye × 2, birebir); yoksa üye fiyatı × `LIST_PRICE_MULTIPLIER` (K-096). "Üye fiyatı" rozette.
- Üstü çizgi, yüzde, "tasarruf ₺X" ifadesi **hiçbir yerde** yok (K-059).
- **PV her üründe görünür** — kart, detay, arama paneli, sepet satırı ve toplamı, bulucu, mega menü ürün kartı. Her PV gösteriminin yanında "PV nedir?" ipucu → `/pv-nedir`. Yakında ürünlerde PV ipucuna "Türkiye'de satışa çıktığında değişebilir" eki (K-098).

### 4.4 Özellikler
- **Görselli mega menü** (K-064, K-091): kategori görselleri, öne çıkan ürün/set kartları, kampanya (tanıtım) alanı; mobilde görselli çekmece.
- **Ürüne/koleksiyona özel tema** (K-065, K-092): ör. altın temalı set; premium koleksiyon ve ürün sayfaları kendi paleti ve süslemeleriyle.
- **Hover ile renk geçişi** (K-066, K-093): header, mega menü ve ana sayfa vitrinlerinde ürün/set üzerine gelince vurgu renkleri o ürünün paletine yumuşakça döner.
- **Ana sayfada görsellik ve animasyon birinci öncelik**; header/footer'da mikro animasyon (K-070, K-097).
- Filtreler: kategori, marka, fiyat aralığı, bulunabilirlik, cilt tipi, ihtiyaç.
- Anlık arama: Türkçe karakter eşdeğerliği, yazım toleransı, kod/barkod (K-028).
- Sepet: drawer, cihazda saklanır, kod + miktar (K-031); pasif ödeme düğmesi + "Yakında" (K-068, K-088).
- **Cilt tipine göre ürün bulucu** (K-069, K-089): cilt tipi + hassasiyet + ihtiyaç seçimiyle canlı sonuç, rutin görünümü; isteğe bağlı "Rutini e-postama gönder" (K-090; servis bilgisi en son gelecek).
- **PV nedir** sayfası + ana sayfa PV bandı (K-086).
- Sertifika rozetleri (ISO 22716, GMP, Helal) → PDF (K-045, K-058).
- Favoriler cihazda saklanır.
- Hero/atmosfer/kategori görselleri yapay zekâ üretimi olabilir; ürün görselleri resmî (K-044).

## 5. Kapsam dışı (bu yayında YOK)

Ödeme sayfaları ve gerçek ödeme/sipariş (K-068) · site içi giriş/kayıt/hesabım (K-017) · bülten kayıt kutusu ve iletişim formu (yalnız bulucudaki e-posta adımı var — K-090) · yorum ve puan (alan tasarlanır, gizli) · stok adedi (K-025) · blog/rehber ve içerik sözlüğü · karşılaştırma · çoklu dil/para (K-021) · WhatsApp ile satış · çoklu satıcı · HTML/PDF katalog üretimi · ayrı marka sayfaları · selfie/yüz analizi · indirim kampanyası/kupon (mega menüdeki "kampanya alanı" editoryal tanıtımdır, indirim vaadi değildir) · kargo ücreti hesaplama · PV'ye göre sıralama.

## 6. Kısıtlar ve ilkeler

- Tasarım doğrudan kodda; Kapı 2 = kullanıcının Vercel önizlemesinde onayı (K-043). Bu belge renk/font seçmez (K-042).
- Brandbook (K-049): metin `#333533`, mavi = aksan + blok zemini, lime = dekor; yazı/düğme/rozette koyu yeşil türevi (K-041). Logo değişmez, animasyon almaz.
- **Ana tema** brandbook'a sadık; altın/metalik efekt yasağı yalnız ana tema içindir. **Ürüne/koleksiyona özel temalar** kendi paletini (altın dahil) kullanabilir (K-065).
- Hover renk geçişi ve tüm animasyonlar: kontrast korunur, `prefers-reduced-motion`'da devre dışı, dokunmatikte tetiklenmez (K-066).
- Tıbbi/tedavi edici iddia yok (TİTCK). Rusça metin hiçbir yerde görünmez (K-024).
- Alışveriş önde, üyelik tek şık bölüm. Kazanç/iş fırsatı içeriği (K-085 ONAYLI; K-015 İPTAL) sitede yalnız `/pv-nedir#is-firsati` bölümünde, resmî pazarlama planı atfı ve "kazanç kişisel çalışmaya bağlıdır, garanti değildir" uyarısıyla; ana sayfa, ürün, sepet, bulucu ve mega menüde yok (K-099).
- MEMORY §7 "kaçınılacaklar" her sayfada karşılığını bulur: net çift fiyat, tek etkin CTA, tekrarsız vitrin, temiz ad, alışveriş önde, kanıtlı sertifika.

## 7. Bağımlılıklar ve sahipleri

| Bağımlılık | Sahip | Etkisi | Durum |
|---|---|---|---|
| Geniş katalog + `availability` + yakında PV (puan/100) | veri-muhendisi | Tüm listeleme, PV | Şema v2'de **yapıldı** (`pv`, `pvSource`; bazı ürünlerde `pv: null` → PV gizli) |
| Panel verisi (62 kayıt, K-071 ön koşulu) | veri-muhendisi | TR fiyat/PV, yeni ürünler | Veri hattına alındı (`priceSource: panel-client`); kalan `needsReview` bayrakları var |
| Yakında ürünlerin `publishReady` durumu | icerik-editoru (Türkçe başlık) | Yakında ürünler görünürlüğü | Şu an hepsi `false` → yerelleştirme gelene kadar yakında ürünler canlıda görünmez |
| Kategori görselleri (packshot kompozisyonu), `megaFeatured`, `megaMenu.campaigns` | veri-muhendisi (görsel) + ui-tasarimci + icerik-editoru (seçim) | Mega menü | Devir notu |
| `palette`, `themeHint` | veri-muhendisi (v2'de var) + ui-tasarimci (doğrulama, tema kayıt defteri) | Tema, hover | Alanlar hazır; hangi ürünlerin temalı olacağı S-029 |
| Yakında ürünlerin hafif Türkçe içeriği + iddia denetimi (bant/merhem dahil) | icerik-editoru | Yayın kapsamı | Toplu |
| Bulucu etiketleri (skinType/concerns/routineStep) | icerik-editoru + veri-muhendisi | Bulucu, filtreler | `CILT-TESTI.md` §3 |
| PV açıklama metni ve resmî kaynak | Kullanıcı (S-026) + icerik-editoru | `/pv-nedir` | AÇIK |
| E-posta servisi bilgileri | Kullanıcı (en son) | Bulucu e-posta adımı | Servis gelene kadar adım gizli |
| E-posta aydınlatma + açık rıza / ticari ileti metni | icerik-editoru + uzman | Yayın engeli (e-posta adımı açılmadan) | Yeni |
| Sertifika PDF'leri | veri-muhendisi | Sertifikalar | — |
| Sponsor bağlantısı (S-002), satıcı bilgileri (K-047) | Kullanıcı | Üye ol, footer | Yayın engeli |
| URL ve indeksleme | seo-uzmani | Sayfa haritası | K-051 + K-087 |

## 8. Takvim ilkesi

- K-046 ara sayfa yayında/paralel; tam site gelince `/` devredilir.
- Faz 2 (kodda tasarım, önizleme) → Kapı 2 → Faz 3 → Kapı 3 → yayın. K-071: uygulama greenleaf-global.com verisine erişimle başlar (panel kaydı alındı; Orkestratör teyit eder).
- Kapsam baskısı olursa sırayla kesilecekler: favoriler → sertifikalar ayrı sayfası (rozet kalır) → bulucunun e-posta adımı (servis yoksa zaten gizli) → `/cilt-tipine-gore/{tip}` ön seçimli sayfalar → mobil mega menüdeki görseller (yalnız ikon kalır). **Kesilmez:** iki etiketli fiyat + PV, sepet + pasif ödeme düğmesi, üye ol, PV sayfası, bulucu, görselli mega menü (masaüstü), ana sayfa görselliği, en az bir temalı koleksiyon/ürün.

## 9. Riskler (özet; tam liste `FAZ1-OZET.md`)

1. Görsellik/animasyon önceliği ile performans hedefi çatışabilir → K-097 bütçesi, ilk ekranda tek ağır görsel, animasyon yalnız transform/opacity.
2. Hover renk geçişi erişilebilirliği → her palet için kontrast doğrulaması, reduced-motion'da kapalı (K-093).
3. Yakında ürün PV'si RU puanından türetiliyor → TR'de farklı çıkabilir; ipucu notu (K-098).
4. E-posta toplama KVKK + ticari ileti yükümlülüğü → uzman kontrolü olmadan adım açılmaz (K-090).
5. Tıbbi bant/merhem ürünleri → iddia denetimi, sabit not, öne çıkarmama (K-095).
6. ~1600 yakında ürünün yerelleştirme yükü → yetişmeyen ürün yayına girmez (K-024).
