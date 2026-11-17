# Wireframe — Cilt Tipine Göre Ürün Bulucu (`/cilt-tipine-gore`, `/cilt-tipine-gore/{tip}`)

> Sahip: proje-yoneticisi · 2026-11-16 · Öncelik P0
> Kurallar, sözlük ve eşleştirme: `CILT-TESTI.md` (tek kaynak). Bu dosya ekranı tarif eder.
> Dayanak: K-069 (ONAYLI), K-056 (ONAYLI), K-089, K-090 (ÖNERİ) · S-028 (e-posta adımının konumu — AÇIK).
> `cilt-testi.md`'nin yerini alır.

## Değişiklik günlüğü
| Tarih | Değişiklik | Kaynak |
|---|---|---|
| 2026-11-16 | İlk sürüm: tek sayfa seçici + canlı sonuç + rutin/ızgara görünümü + isteğe bağlı e-posta adımı | K-069, K-089, K-090 |

**Tek görevi:** Kişinin cilt tipini seçip birkaç saniyede kendine uygun ürünleri (ve bir rutin önerisini) görmesi; Türkiye'de satıştakileri tek tıkla sepete eklemesi.
**Birincil CTA:** Seçim öncesi: bir cilt tipi kartına tıklamak. Sonuçta: "Rutindeki ürünleri sepete ekle (N)".
**Düzen:** Normal header/footer. Masaüstünde iki sütun: solda yapışkan **seçim paneli** (~1/3), sağda **sonuç alanı**. Mobilde seçim paneli üstte, sonuç altta; seçimler yapılınca panel tek satırlık özet çipe katlanır ("Karma · Hassas · 2 ihtiyaç — Değiştir").

---

## 1. Başlık
- H1 "Cildine uygun ürünleri bul" (tip sayfasında: "Karma ciltler için ürünler"), alt metin (≤ 20 kelime): "Cilt tipini seç, sana uygun ürünleri ve kısa bir rutin önerisini hemen gör. Kayıt gerekmez."
- Küçük not: "Bu bulucu tıbbi bir değerlendirme değildir."
- **Görsel:** dar bir AI atmosfer şeridi veya doku (ilk ekranı itmesin).
- **Hareket niyeti:** başlık hafif giriş; tip kartları kademeli belirir.

## 2. Seçim paneli
### 2a. Cilt tipi (zorunlu, tek seçim)
- 5 kart (Kuru · Yağlı · Karma · Normal · Hassas) + "Bilmiyorum" bağlantısı. Kartta ad + 1 satır yardım metni (CILT-TESTI §2) + küçük ikon/doku. Seçili hâl renk dışında da belirgin (ikon + çerçeve).
- "Bilmiyorum" → kısa akordeon: 5 tipin yardım metinleri + "Normal varsay" düğmesi.
- Semantik: radyo grubu; ok tuşlarıyla gezinme.
- Mobil: 2 sütun ızgara (son kart tam genişlik), ≥ 56 px yükseklik.

### 2b. "Cildim ayrıca hassas" (isteğe bağlı)
- Aç/kapa anahtarı; yalnız tip ≠ Hassas iken görünür.

### 2c. İhtiyaçlar (isteğe bağlı, 0–3)
- 8 çip (CILT-TESTI §3.2 görünen adları). 3 seçimde diğerleri pasif + "En fazla 3 seçebilirsin" (`aria-live`).

### 2d. Davranış
- Her seçim anında adrese yazılır ve sonucu günceller (≤ 100 ms; tarayıcı geçmişine her seçim ayrı kayıt yazılmaz — yalnız tip değişimi geçmişe girer, diğerleri yerinde değiştirilir).
- "Seçimleri temizle" metin bağlantısı.

## 3. Sonuç alanı
### 3a. Seçim yokken
- 5 tip kartının büyük hâli (2a ile aynı eylem) + "Nasıl çalışır?" 3 madde (Tip seç · İhtiyaç ekle · Rutinini gör). Ürün gösterilmez.

### 3b. Sonuç başlığı
- Profil çipleri ("Karma cilt · Parlama ve gözenek görünümü, Nem"); "Bilmiyorum" seçildiyse "Cilt tipini 'normal' varsaydık — değiştir".
- Görünüm seçici (sekme): **Rutin** (varsayılan) · **Tüm uygun ürünler (N)**.

### 3c. Rutin görünümü
- Rutin seviyesi seçici (segmentli): Sade (3 adım) · Dengeli (5) · Kapsamlı (8).
- (Varsa) hazır set kartı: "Bu rutin için hazır set".
- Adım blokları: "1 · Temizleme — Sabah ve akşam" + **yatay ana ürün kartı** (görsel, marka, ad, "Neden önerdik" satırı — eşleşen etiketlerden, TR'de iki etiketli fiyat + PV, yakında'da rozet + PV, fiyatsız; kartta ayrı "Sepete ekle" yok) + "Alternatifleri gör (2)" (yerinde akordeon). Adım boşsa "Bu adım için uygun ürün yakında".
- **Toplu CTA bloğu** (masaüstünde sonuç alanının sağ üstünde yapışkan; mobilde alt yapışkan çubuk): "Rutindeki ürünleri sepete ekle (N)" + "Toplam ₺X · Üye fiyatıyla ₺Y · Toplam PV Z" + (varsa) "2 ürün Türkiye'ye yakında, sepete eklenmedi". N = 0 → "Türkiye'de satıştaki cilt bakımı ürünlerini gör".
- Tıklanınca: ürünler eklenir (var olan +1, en çok 10), drawer açılır, kartlarda kısa ✓.

### 3d. Tüm uygun ürünler görünümü
- Standart listeleme kartları (PV dahil), "Önerilen" = bulucu puanı; `routineStep` çipleri ile daraltma; TR → yakında ayracı; 24'lük "Daha fazla yükle". Toplu CTA yok.

### 3e. E-posta kartı (koşullu — `CILT-TESTI.md` §7)
- Yeri: rutin listesinin **altında**, üyelik satırından önce (S-028 cevabına göre değişebilir).
- İçerik: başlık "Rutinimi e-postama gönder" · e-posta alanı (`type=email`, `autocomplete=email`, `inputmode=email`) · **kutu 1 (zorunlu, işaretsiz):** sonuç gönderimi için açık rıza + "Aydınlatma metni" bağlantısı · **kutu 2 (isteğe bağlı, işaretsiz, ayrı):** "Greenleaf ürünleri hakkında ticari e-ileti almak istiyorum" + "Açık rıza / ileti onay metni" bağlantısı · "Gönder" düğmesi (pasifleştirilmez). Görsel düzen `docs/tasarim/bilesenler/skin-finder.md` §3.
- Durumlar: gönderiliyor (düğmede gösterge, çift gönderim engeli) · başarı ("Rutinin e-postana gönderildi", e-posta maskeli, `aria-live`) · biçim hatası / kutu 1 işaretsiz (alan altında hata, odak ilk hataya) · servis hatası ("Şu an gönderemedik, birazdan tekrar dene", e-posta korunur) · oturumda 3 gönderim sonrası form gizlenir.
- `emailCapture.enabled = false` → e-posta formu **yok**; yerinde "Sonucunu sakla" kartı + "Bağlantıyı kopyala" (CILT-TESTI §7).

### 3f. Üyelik satırı ve uyarı
- "Rutinini üye fiyatıyla almak için üye ol →" (`/uye-ol`).
- Uyarı notu: "Bu bulucu tıbbi bir değerlendirme değildir. Yeni bir ürünü önce küçük bir alanda dene."

## 4. Sonuç yok
- Sonuç alanında: "Sana birebir uyan ürünü henüz eşleştiremedik" + tek CTA "Cilt bakımı ürünlerini cilt tipine göre gör" → `/kategori/cilt-bakimi?cilt-tipi={tip}`. E-posta kartı gösterilmez.

## 5. Mobil
- Seçim paneli üstte; tip seçilince sonuç alanına yumuşak kaydırma (reduced-motion'da anlık); panel özet çipe katlanır.
- Toplu CTA alt yapışkan çubuk (güvenli alan); e-posta alanında klavye açıkken yapışkan çubuk gizlenir.

## 6. Hareket niyeti
- Sonuç güncellemesinde kartlar yerinde çapraz solma (≤ 200 ms; titreme yok — eski sonuç yenisi gelene kadar kalır).
- Rutin adımları ilk görünüşte kademeli belirir (toplam ≤ 500 ms), sonraki güncellemelerde tekrar etmez.
- Rutin seviyesi değişiminde eklenen/çıkan adımlar yükseklik animasyonuyla (≤ 250 ms).
- Reduced-motion'da hepsi anlık. Bu sayfa hover renk geçişi bölgesi değildir.

## 7. SEO
- `/cilt-tipine-gore` ve `/cilt-tipine-gore/{tip}` indekslenir (tip sayfasında 80–150 kelime tip açıklaması — icerik-editoru); `ihtiyac/hassas/rutin/gorunum` parametreli hâller noindex, kanonik = parametresiz/tip sayfası. Kesin kural seo-uzmani.

## 8. Analitik
`CILT-TESTI.md` §8.

## Kabul kriterleri
`KABUL-KRITERLERI.md` §7.
