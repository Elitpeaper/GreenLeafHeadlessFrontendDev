# Kullanıcı Akışları

> Sahip: proje-yoneticisi · Son güncelleme 2026-11-16 · Durum: Kapı 1 geçti (değişikliklerle)
> Dayanak: K-031, K-036, K-038, K-046…K-048, K-062…K-071 (ONAYLI); K-052 (PV kısmı K-062 ile değişti), K-098…K-095 (ÖNERİ).
> Gösterim: `→` kullanıcı eylemi sonrası geçiş · `[ ]` ekran/bileşen · `⟂` boş/hata dalı.

## Değişiklik günlüğü
| Tarih | Değişiklik | Kaynak |
|---|---|---|
| 2026-11-16 | A1 ödeme adımları kaldırıldı; akış sepet drawer'da pasif "Ödemeye geç · Yakında" ile biter, etkin eylem "Üye ol" | K-068, K-088 |
| 2026-11-16 | A3 cilt testi → cilt tipine göre bulucu + isteğe bağlı e-posta (A3b) | K-069, K-089, K-090 |
| 2026-11-16 | A4 yakında ürünlerde PV görünür | K-062, K-098 |
| 2026-11-16 | Yeni: A9 PV, A10 hover renk geçişi, A11 temalı sayfa, A12 mega menü | K-064…K-066, K-086, K-091…K-093 |
| 2026-11-16 | A8 demo yolu yeni kapsama göre yeniden yazıldı | — |

## A1. Ana akış: keşif → ürün → sepet → üyelik

```
[Ana sayfa] ─┬─ Kategori şeridi / Görselli mega menü ──→ [Kategori listeleme]
             ├─ Mega menü öne çıkan ürün/set kartı ─────→ [Ürün detay]
             ├─ Arama (anlık panel) ─────────────────────→ [Ürün detay] veya [Arama sonuçları]
             ├─ Vitrin kartı ────────────────────────────→ [Ürün detay]
             ├─ Premium sahne (temalı koleksiyon) ───────→ [Temalı koleksiyon] (A11)
             ├─ PV bandı ────────────────────────────────→ [PV nedir] (A9)
             └─ "Cildine uygun ürünleri bul" ────────────→ [Cilt tipine göre bulucu] (A3)

[Kategori listeleme] → filtre/sırala → kart → [Ürün detay]
                     → karttaki "Sepete ekle" (yalnız TR) → [Sepet drawer açılır]
[Ürün detay (TR)] → "Sepete ekle" → [Sepet drawer açılır, eklenen satır vurgulu]
[Ürün detay (yakında)] → A4

[Sepet drawer] → "Ödemeye geç · Yakında" (pasif) → hiçbir yere gitmez; yanındaki açıklama okunur:
                 "Online ödeme altyapımız hazırlanıyor."
               → "Üye ol" (drawer'daki tek etkin birincil eylem) → [Üye ol] (A5)
               → "Alışverişe devam et" (metin) → drawer kapanır
```

### A1 kuralları
1. **Sepete ekleme:** Satır yoksa miktar 1; varsa +1 (en çok 10, K-031). 10'da işlem yok + bildirim. Sayaç pop (azaltılmış harekette yok).
2. **Sepet içeriği** cihazda (kod + miktar); ad, görsel, fiyat, PV her açılışta veriden. Yayından kalkan veya yakında durumuna düşen ürün düşer + bildirim.
3. **Ödeme düğmesi pasiftir** (K-068, K-088): görünür, "Yakında" rozetli, `aria-disabled`, klavyeyle odaklanabilir (açıklaması okunabilsin diye), tıklanınca/Enter'da hiçbir şey olmaz ve hata vermez; açıklama metni düğmenin hemen altında **her zaman görünür** (yalnız tooltip değil). Analitik: tıklama denemesi `checkout_disabled_click` (kimliksiz; talep ölçümü).
4. **Fiyat gösterimi** iki etiketlidir: "Toplam" + "Üye fiyatıyla toplam" + "Toplam PV". Tasarruf/yüzde yok (K-059).
5. **Ödeme adresi yok.** `/odeme*` adresleri `/` + drawer açık'a yönlenir (SAYFA-HARITASI).

### A1 boş ve hata dalları
| Durum | Ne görünür |
|---|---|
| ⟂ Sepet boş + drawer açıldı | "Sepetin boş" + tek CTA "Türkiye'de satışta olanları gör" + (varsa) son görüntülenen 3 TR ürünü |
| ⟂ Sepet deposu okunamıyor | Oturum boyunca bellekte; "Sepetin bu cihazda kaydedilemiyor" notu |
| ⟂ Ürün verisi yüklenemedi | Hata sayfası; sepet içeriği silinmez |

## A2. Kategori içi keşif (geniş katalog)
1. Mega menü → kök/alt → listeleme. "Önerilen": önce TR, sonra yakında.
2. Hızlı çip "Yalnız Türkiye'de satışta (N)" → `bulunabilirlik=tr`.
3. Filtre adrese yazılır; geri tuşu önceki duruma döner.
4. "Daha fazla yükle" 24'er; geri dönüşte konum korunur.
5. ⟂ 0 sonuç: "Bu seçimlerle ürün bulunamadı" + çipler + "Filtreleri temizle" + öneri.
6. ⟂ Fiyat filtresi etkinken: "Fiyat filtresi yalnız Türkiye'de satıştaki ürünleri kapsar" notu.
7. Kartlarda PV her üründe görünür (yakında dahil, veri varsa).

## A3. Cilt tipine göre ürün bulucu (K-069, K-089)

```
Giriş noktaları: header üst bağlantısı · mega menü tanıtım alanı (Cilt Bakımı, Makyaj) · ana sayfa bulucu bandı ·
                 Cilt Bakımı kategori tanıtım kartı · ürün detayı (cilt bakımı) "Cildine uygun mu? Bul" bağlantısı ·
                 /cilt-tipine-gore/{tip} ön seçimli sayfalar (arama motoru girişi)

[Bulucu] Adım A: Cilt tipi kartları (tek seçim, zorunlu) → seçilince sonuç alanı hemen dolar
         Adım B: "Hassas mı?" (Evet/Bazen/Hayır, isteğe bağlı) → sonuç anında güncellenir
         Adım C: İhtiyaç çipleri (0–3, isteğe bağlı) → sonuç anında güncellenir
         Görünüm: [Rutin] (varsayılan; Sade/Dengeli/Kapsamlı seçici) ↔ [Tüm uygun ürünler] (ızgara)
[Sonuç] → "Rutindeki ürünleri sepete ekle (N)" → yalnız TR ana önerileri → drawer açılır
        → ürün kartı → [Ürün detay]
        → "Alternatifleri gör" → yerinde açılır
        → "Rutinimi e-postama gönder" (koşullu) → A3b
```
- Seçimler adrese yazılır (`?tip=&hassas=&ihtiyac=&rutin=`); paylaşılan adres aynı sonucu verir; geri tuşu önceki seçime döner.
- Cilt tipi seçilmeden sonuç alanı yerine 5 cilt tipi kartının kısa açıklaması görünür ("Cilt tipini bilmiyorum" → kısa yardım akordeonu; seçilirse `normal` varsayılır ve sonuçta "değiştir" notu).
- ⟂ Sonuç yok: "Sana birebir uyan ürünü henüz eşleştiremedik" + `/kategori/cilt-bakimi?cilt-tipi={tip}` tek CTA.
- ⟂ Ana öneriler hep yakında: toplu CTA "Türkiye'de satıştaki cilt bakımı ürünlerini gör"e döner.
- Kurallar: `CILT-TESTI.md` (bulucu kuralları).

### A3b. E-posta adımı (K-090) — `emailCapture.enabled = true` ise
```
[Sonuç] → "Rutinimi e-postama gönder" kartı
   → e-posta alanı
     + kutu 1 (zorunlu, işaretsiz): sonuç gönderimi için açık rıza + "Aydınlatma metni →"
     + kutu 2 (isteğe bağlı, işaretsiz, ayrı): ticari e-ileti onayı + "Açık rıza / ileti onay metni →"
     + "Gönder"
   → geçerli e-posta + kutu 1 → servis çağrısı → "Rutinin e-postana gönderildi" (aria-live)
   ⟂ geçersiz biçim veya kutu 1 boş → alan altında hata, odak ilk hataya
   ⟂ servis hatası → "Şu an gönderemedik, birazdan tekrar dene" + girilen e-posta korunur
   ⟂ aynı oturumda ikinci gönderim → izin verilir, en çok 3 (kötüye kullanım sınırı)
```
- `emailCapture.enabled = false` (servis bilgisi gelmeden): e-posta formu **hiç render edilmez**; yerinde "Sonucunu sakla · Bağlantıyı kopyala" kartı; hiçbir ağ isteği yok.
- Gönderilen yük: e-posta + sonuç parametreleri + açık rıza + ticari ileti onayı (evet/hayır) + metin sürümleri + zaman. Ad, telefon yok. Analitiğe e-posta gitmez (`email_capture_submit` yalnız başarı/başarısızlık ve ticari ileti onay durumu taşır).
- Kutu 2 işaretlenmeden gönderim yalnız rutin e-postasını tetikler.

## A4. "Türkiye'ye yakında" ürün davranışı (K-052 güncellendi: PV görünür)

| Yer | Davranış |
|---|---|
| Kart | Görsel, marka, ad, "Türkiye'ye yakında" rozeti, **PV** (veri varsa, ipuçlu). Fiyat, üye fiyatı ve "Sepete ekle" yok. Favori var |
| Ürün detay | Rozet; fiyat alanında "Bu ürün Türkiye'de henüz satışta değil." kutusu; **PV satırı** + ipucu ("Türkiye'de satışa çıktığında değişebilir"); tek CTA "Benzer ürünleri gör" → TR benzerleri rayı (yoksa filtreli liste, o da yoksa `turkiyede-satista`) |
| PV verisi yoksa | RU puanı olmayan üründe PV satırı hiç render edilmez (boş "PV —" yok) |
| İçerik | Türkçe ad + görsel + kısa açıklama; Rusça yok |
| Arama | TR'den sonra; panelde rozetle |
| Sepet | Eklenemez |
| Bulucu | Ana öneri olabilir (rozet + PV), toplu eklemeye girmez |
| SEO | İndekslenir; satın alınabilir işaret yok |
| TR'ye geçince | Aynı adres; PV TR verisinden güncellenir |

## A5. Üyelik yönlendirme akışı (K-006, K-016, K-047)
```
Giriş noktaları: header "Üye ol" · mobil çekmece alt düğmesi · hesap paneli · ana sayfa üyelik bölümü · PV bandı ve /pv-nedir ·
                 ürün detay üyelik satırı · sepet drawer "Üye ol" · bulucu sonucu · footer
            → [Üye ol (/uye-ol)]
[Üye ol] → "Greenleaf'te üyeliğini başlat" → dış bağlantı (sponsor, yeni sekme) + `membership_click {source}`
         → (sponsor kodu varsa) "Kodu kopyala"
```
- İç giriş noktaları önce `/uye-ol`'a gider; istisna hesap panelindeki "Greenleaf üye girişi".
- ⟂ Sponsor bağlantısı yok: düğme bildirim gösterir; yayın engeli.
- Dil: giriş noktalarında ve `/uye-ol`'da "indirimli alışveriş / üyelere özel fiyat". Kazanç/iş fırsatı içeriği (K-085) yalnız `/pv-nedir#is-firsati` bölümünde, atıf + "garanti değildir" uyarısıyla (K-099).

## A6. Arama akışı
Odak → (boşken) popüler aramalar + kökler + "Cildine uygun ürünleri bul" → 2+ karakter → anlık sonuçlar (ürün ≤ 6, kategori ≤ 3; TR'de üye fiyatı + PV, yakında'da rozet + PV) → Enter → `/arama?q=`. ⟂ 0 sonuç: yazım önerisi + kategoriler + bulucu bağlantısı.

## A7. Favoriler
Kalp → anında, sayaç güncellenir, ekran okuyucuya duyuru. `/favoriler` ızgarası. Cihazda saklanır.

## A8. Demo yolu (Kapı 2/3 onayı ve portföy — K-034)
1. Ana sayfa: hero giriş animasyonu → kategori şeridi → Vitrin 1'de bir ürün kartının üzerine gelme → header vurgusu ve vitrin zemini ürün paletine döner, çıkınca geri döner (masaüstü).
2. Header "Kategoriler" → görselli mega menü → "Cilt Bakımı" → alt kategori görselleri → öne çıkan set kartı üzerinde hover renk geçişi → "Serumlar".
3. Listede "Yalnız Türkiye'de satışta" çipi → TR kart (iki etiketli fiyat + PV) → bir yakında kart (rozet + PV, fiyatsız).
4. Ürün detay (TR) → "Sepete ekle" → drawer → pasif "Ödemeye geç · Yakında" + açıklama → "Üye ol" → `/uye-ol`.
5. Ana sayfa PV bandı → `/pv-nedir`.
6. Header → "Cildine uygun ürünleri bul" → cilt tipi "Karma" → ihtiyaç 2 çip → rutin görünümü → "Rutindeki ürünleri sepete ekle" → (servis açıksa) e-posta adımı.
7. Ana sayfa premium sahne → temalı koleksiyon → temalı ürün detayı (palet, süsleme).
8. Arama: "sampuan" → "Şampuanlar"; bir yakında ürün → "Benzer ürünleri gör".
9. Footer → Sertifikalar → bir PDF.
Her adım 390 px mobilde (hover adımları hariç; mobilde renk geçişi tetiklenmez) ve 1440 px masaüstünde kesintisiz; `prefers-reduced-motion` açıkken de işlev kaybı olmadan.

## A9. PV (K-062, K-086)
```
PV gösterimi (kart, detay, sepet, arama paneli, bulucu, mega menü kartı) → ⓘ ipucu (tıkla/odakla) →
   kısa tanım + "PV nedir? →" → [/pv-nedir]
Ana sayfa PV bandı → "PV nedir?" → [/pv-nedir]
[/pv-nedir] → tek CTA "Üye ol" → [/uye-ol]; ikincil "Türkiye'de satıştaki ürünleri gör"
```
- İpucu dokunmatikte dokununca açılır, dışarı dokununca kapanır; klavyede odakla açılır, Esc kapatır.
- ⟂ PV verisi olmayan ürün: PV öğesi yok, ipucu yok.

## A10. Hover ile renk geçişi (K-066, K-093)
```
[Bölge: mega menü öne çıkan + tanıtım (→ header bandı bağlı) · ana sayfa Vitrin 1 ve Vitrin 2 · (varyant) Premium sahne]
Hover cihazı (veya klavye odağı) + reduced-motion kapalı + prefers-contrast normal:
   ürün/set kartına girme → niyet gecikmesi → bölgenin vurgu değişkenleri ürün paletine (yumuşak geçiş)
   karttan karta geçiş → doğrudan yeni palete (ana temaya dönmeden)
   bölgeden çıkış → bırakma gecikmesi sonra ana temaya
Dokunmatik / reduced-motion / prefers-contrast: more / paleti olmayan ürün → hiçbir şey değişmez
```
- Değişmeyenler: logo, metin rengi, fiyat ve üye fiyatı rozeti, PV, birincil düğmeler, odak halkası, durum renkleri.
- Süreler hareket-tasarimcisi'nde; bölge ve token listesi `docs/tasarim/bilesenler/hover-recolor.md`.

## A11. Temalı koleksiyon / ürün (K-065, K-092)
```
Ana sayfa premium sahne / mega menü kampanya alanı / kart → [Temalı koleksiyon] → kart → [Temalı ürün detay]
```
- Tema yalnız içerik alanını giydirir; header/footer ana temada kalır (yalnız A10 kuralıyla, o sayfada üzerine gelinen ürüne göre değişebilir).
- Temalı sayfadan normal sayfaya geçişte ana tema anında geri gelir (sayfa geçişinde tema "sızmaz").
- ⟂ `theme` anahtarı tema kayıt defterinde yoksa sayfa ana temayla render edilir (hata yok).

## A12. Mega menü (K-064, K-091) — özet; ayrıntı `wireframe/mega-menu.md`
Masaüstü: "Kategoriler" tıklama/klavye/niyetli hover → panel → kök (sol) → alt kategoriler görselleriyle (orta) → öne çıkan ürün/set kartları + tanıtım alanı (sağ). Mobil: hamburger → görselli kök karoları → alt kategori paneli → altta tek tanıtım kartı.
