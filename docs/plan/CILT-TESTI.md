# Cilt Tipine Göre Ürün Bulucu — Kurallar (eski adı: Cilt Testi)

> Sahip: proje-yoneticisi · Son güncelleme 2026-11-16 · Durum: Kapı 1 geçti (değişikliklerle)
> Dayanak: K-069 (ONAYLI: test → cilt tipine göre bulucu/filtre, e-posta alınır), K-056 (etiket sözlüğü — ONAYLI), K-055 (kısmen ONAYLI: kural tabanlı deterministik puanlama, TR önce), K-089, K-090 (ÖNERİ).
> Ekran tarifi: `wireframe/cilt-tipine-gore.md`. Metinler taslaktır; nihai mikro metin ve iddia denetimi icerik-editoru'nündür. Dosya adı geriye dönük bağlantılar için korunmuştur.

## Değişiklik günlüğü
| Tarih | Değişiklik | Kaynak |
|---|---|---|
| 2026-11-16 | 4 soruluk sıralı test → tek sayfalık bulucu: cilt tipi (zorunlu) + hassasiyet + 0–3 ihtiyaç, sonuç anında; rutin seviyesi sonuç ekranında seçici | K-069, K-089 |
| 2026-11-16 | "E-posta yok" ilkesi kaldırıldı: isteğe bağlı "Rutinimi e-postama gönder" adımı (§7) | K-069, K-090 |
| 2026-11-16 | Cevaplar oturum deposunda değil yalnız adreste; "Tüm uygun ürünler" ızgara görünümü eklendi | K-089 |
| 2026-11-16 | §3 sözlük ve §4 puanlama korunur; `hassas` cilt tipi seçimi kuralı eklendi | K-056 |

## 1. İlkeler
1. **Hızlı ve şeffaf:** Tek ekran; cilt tipi seçildiği anda sonuç görünür; diğer seçimler sonucu canlı daraltır. Sıralı soru, "hesaplanıyor" ekranı yok.
2. **Hassas veri yok:** Selfie, yüz analizi, yaş, hamilelik, hastalık sorusu YOK. Ad/telefon yok. E-posta yalnız kullanıcı sonucu e-postayla isterse (§7).
3. **Kural tabanlı ve deterministik:** aynı seçimler her zaman aynı sonucu verir; backend gerekmez.
4. **Tek veri, dört kullanım:** `skinType[]`, `concerns[]`, `routineStep` etiketleri bulucuyu, listeleme filtrelerini, kartta "Kimin için" satırını ve ürün detayındaki bilgiyi besler.
5. **Kozmetik dil:** "görünümü", "hissi", "ihtiyacı"; "tedavi eder, geçirir, iyileştirir" yok.
6. **Türkiye'de satıştaki ürün önce.**

## 2. Girdiler
| Girdi | Değerler | Zorunlu | Adres parametresi |
|---|---|---|---|
| Cilt tipi | `kuru`, `yagli`, `karma`, `normal`, `hassas` + "Bilmiyorum" (→ `normal`, sonuçta "değiştir" notu, `tip=normal&bilinmiyor=1`) | ✔ | `tip` (veya yol: `/cilt-tipine-gore/{tip}`) |
| Hassasiyet | "Cildim ayrıca hassas" aç/kapa (yalnız `tip ≠ hassas` iken görünür; `tip = hassas` ise otomatik 1) | — (varsayılan 0) | `hassas=1` |
| İhtiyaçlar | `concerns` sözlüğünden 0–3 | — | `ihtiyac=a,b,c` |
| Rutin seviyesi | `sade` (varsayılan), `dengeli`, `kapsamli` | — | `rutin` |
| Görünüm | `rutin` (varsayılan), `tumu` | — | `gorunum` |

Cilt tipi kartlarının kısa yardım metinleri (eski S1 seçenek metinlerinden türetilir; icerik-editoru):
| Tip | Yardım metni (taslak) |
|---|---|
| Kuru | "Gün içinde gergin ve kuru hissettirir, bazen pul pul olur." |
| Yağlı | "Her yerde parlama görünür." |
| Karma | "Alın-burun-çene parlak, yanaklar normal ya da kuru." |
| Normal | "Dengeli; ne kuru ne parlak." |
| Hassas | "Yeni ürünlere veya hava değişimine karşı kızarıklık ya da batma hissi olur." |

Geçersiz parametre değerleri sessizce yok sayılır; geçersiz `tip` → seçimsiz başlangıç hâli.

## 3. Etiket sözlüğü (veri sözleşmesi — K-056, ONAYLI)
Etiketler sabit sözlükten; veride yalnız anahtar, görünen Türkçe ad sözlükte.

### 3.1 `skinType[]`
`kuru`, `yagli`, `karma`, `normal`, `hassas`, `tum-ciltler`. `tum-ciltler` her tiple eşleşir. `hassas` = "hassas ciltler için konumlanmış" (ürün metnindeki konumlandırma; iddia değil).

### 3.2 `concerns[]`
`nem`, `parlama-gozenek`, `tikali-gozenek`, `isilti`, `ton-esitsizligi`, `ince-cizgi`, `yatistirma`, `goz-cevresi`. Ürün başına en çok 3. Görünen adlar: Nem ve gerginlik hissi · Parlama ve gözenek görünümü · Siyah nokta ve tıkalı görünen gözenekler · Mat ve yorgun görünüm · Ton eşitsizliği ve leke görünümü · İnce çizgi ve sıkılık kaybı görünümü · Kızarıklık ve hassasiyet hissi · Göz çevresinde yorgun görünüm.

### 3.3 `routineStep` (tek değer)
`temizleme`, `tonik`, `serum`, `nemlendirme`, `gunes-koruma`, `maske`, `peeling`, `goz-bakimi`, `dudak-bakimi`, `makyaj-temizleme`. Kategori varsayılan eşlemesi: Yüz Temizleyiciler → `temizleme` (makyaj temizleyici `makyaj-temizleme`, scrub `peeling`), Tonik → `tonik`, Serumlar → `serum`, Nemlendiriciler → `nemlendirme`, Maskeler → `maske`, Göz Çevresi → `goz-bakimi`, Güneş → `gunes-koruma`, Dudak → `dudak-bakimi`. `makyaj-temizleme`, `temizleme` adımının alternatifi sayılır.

### 3.4 Zorunluluk kapsamı
| Ürün grubu | Etiket durumu |
|---|---|
| Cilt Bakımı kökü + cilt setleri, `availability = tr` | **Zorunlu** (üç alan); eksikse doğrulama hatası |
| Aynı gruplar, `yakinda` | `routineStep` kategoriden otomatik; `skinType`/`concerns` editör yetiştirdikçe; `skinType` boş ürün bulucudan **hariç** |
| Diğer kökler | Etiket yok |
| Setler | İsteğe bağlı `quizRoutine` (`sade`/`dengeli`/`kapsamli`) |

İsteğe bağlı: `quizPriority` (eşitlik bozucu), `hassas-uygun-degil` bayrağı.

### 3.5 Rutin seviyesine göre adımlar
| Seviye | Adımlar |
|---|---|
| `sade` | temizleme → nemlendirme → güneş koruma (gündüz) |
| `dengeli` | temizleme → tonik → serum → nemlendirme → güneş koruma |
| `kapsamli` | dengeli + maske + peeling + göz bakımı |

## 4. Eşleştirme kuralları
**Adım 1 — Aday havuzu.** Cilt Bakımı kökündeki yayında, `routineStep` dolu, `skinType` en az 1 değerli ürünler. (`concerns` boş olabilir; yalnız ihtiyaç puanı alamaz.)

**Adım 2 — Uygunluk süzgeci (elenir):**
- `skinType` ne `tip`'i ne `tum-ciltler`'i içeriyorsa. `tip = hassas` iken: `skinType` `hassas` veya `tum-ciltler` içermeli.
- `hassas = 1` ve ürün `hassas-uygun-degil` taşıyorsa.

**Adım 3 — Puan:**
| Kural | Puan |
|---|---|
| `skinType` kullanıcı tipini birebir içeriyor | +3 |
| Yalnız `tum-ciltler` üzerinden eşleşme | +1 |
| Her ortak `concerns` (en çok 3) | +2 |
| `hassas = 1` ve `skinType` içinde `hassas` (tip hassas değilse) | +2 |
| `availability = tr` | +10 |

**Adım 4a — Rutin görünümü.** Seçili seviyenin her adımı için o `routineStep`'teki adaylar puana göre; eşitlikte `quizPriority` ↓, Fiyat ↑ (fiyatsızlar sonda), `code` alfabetik. Ana öneri = ilk; alternatifler = sonraki en çok 2. Aynı ürün iki adımda çıkmaz. Aday yoksa adım "Bu adım için uygun ürün yakında" notuyla ürünsüz.

**Adım 4b — "Tüm uygun ürünler" görünümü.** Süzgeçten geçen tüm adaylar puana göre ızgarada (listeleme kartı); TR önce, yakında için ayraç; 24'lük "Daha fazla yükle". Ek filtre: `routineStep` çipleri (Temizleme, Serum…).

**Adım 5 — Set önerisi.** `quizRoutine` = seçili seviye olan, süzgeci geçen TR set varsa rutinin üstünde tek kart.

**Adım 6 — Sonuç yok.** Havuz boş veya tüm adımlar boş: "Sana birebir uyan ürünü henüz eşleştiremedik" + `/kategori/cilt-bakimi?cilt-tipi={tip}`.

**Örnek (test vakası):** `tip=karma, hassas=0, ihtiyac=[parlama-gozenek, nem], rutin=sade` → temizleme adımında `karma`/`tum-ciltler` + `parlama-gozenek` etiketli TR temizleyici (aday SBJ064, etiketlenmesi şartıyla); nemlendirmede TR yoksa yakında ürün rozet + PV ile; güneş koruma büyük olasılıkla yakında.

## 5. Sonuç bileşenleri (özet; ekran ayrıntısı wireframe'de)
1. Profil çipleri ("Karma cilt · Parlama ve gözenek görünümü, Nem") — çipler tıklanınca ilgili seçim alanına odak.
2. (Varsa) hazır set kartı.
3. Rutin listesi veya ızgara.
4. **Tek birincil CTA:** "Rutindeki ürünleri sepete ekle (N)" — yalnız TR ana öneriler; altında "Toplam ₺X · Üye fiyatıyla ₺Y · Toplam PV Z"; yakında olanlar için "2 ürün Türkiye'ye yakında, sepete eklenmedi". N = 0 → "Türkiye'de satıştaki cilt bakımı ürünlerini gör". (Izgara görünümünde toplu CTA yok; kart eylemleri geçerli.)
5. "Rutinimi e-postama gönder" (koşullu, §7).
6. Üyelik satırı (ikincil).
7. Uyarı notu: "Bu bulucu tıbbi bir değerlendirme değildir. Yeni bir ürünü önce küçük bir alanda dene."

## 6. Durum ve davranış
| Durum | Davranış |
|---|---|
| Sayfa yenilenir | Seçimler adresten aynen gelir |
| Adres paylaşılır | Aynı sonuç |
| Ürün verisi değişti | Sonuç her açılışta yeniden hesaplanır |
| Sepete ekleme | Var olan satır +1 (en çok 10); drawer açılır |
| `/cilt-tipine-gore/{tip}` | `tip` ön seçili; diğer parametreler sorgudan |

## 7. E-posta adımı (K-069, K-090)
- **Görünürlük:** e-posta formu yalnız `emailCapture.enabled = true` (servis yapılandırıldı + metinler uzman kontrolünden geçti) iken ve sonuçta en az 1 ürün varken. `false` iken e-posta alanı **hiç render edilmez** (sahte/işlevsiz form yok); yerinde "Sonucunu sakla" kartı: "Bu sayfanın bağlantısını kopyalayarak sonucuna sonra dönebilirsin." + "Bağlantıyı kopyala" (ağ isteği yok). Not: ui-tasarimci `skin-finder.md` §3 servis yokken formu gösterip gönderimde "yakında" diyor; plan kuralı formun hiç gösterilmemesidir (veri girdirip göndermemek dürüst değil).
- **Alanlar** (ui-tasarimci K-081 ile aynı): e-posta (zorunlu, biçim doğrulaması) · **kutu 1 (zorunlu, işaretsiz):** "Sonuçlarımın bu e-posta adresine gönderilmesi için kişisel verilerimin işlenmesine açık rıza veriyorum." + yanında KVKK aydınlatma metni bağlantısı · **kutu 2 (isteğe bağlı, işaretsiz, ayrı):** ticari elektronik ileti onayı + açık rıza / ileti onay metni bağlantısı (`/yasal/e-posta-acik-riza`). Gönder düğmesi pasifleştirilmez; eksikte alan altında hata. Nihai metinler icerik-editoru + uzman (açık rızanın sonuç gönderimi için gerekli olup olmadığı dahil).
- **Gönderilen yük:** e-posta, sonuç parametreleri (tip, hassas, ihtiyac, rutin), açık rıza (evet — zorunlu), ticari ileti onayı (evet/hayır), onay metinlerinin sürümü, zaman damgası. Başka veri yok.
- **Saklama:** sitede (tarayıcı deposu dahil) saklanmaz; yalnız seçilen servise gider. Analitikte e-posta yok.
- **Sınır:** oturum başına en çok 3 gönderim; servis hatasında e-posta alanda korunur.
- **E-posta içeriği** (icerik-editoru): profil özeti, rutin adımları ve ürün bağlantıları, fiyatlar (iki etiketli) + PV, uyarı notu, abonelikten çıkış bağlantısı (onay verildiyse).
- **Yayın engeli:** aydınlatma metninin e-posta bölümü ve `/yasal/e-posta-acik-riza` uzman kontrolünden geçmeden `emailCapture.enabled` açılmaz.

## 8. Analitik (çerezsiz, kişisel veri yok)
`finder_view` (giriş: doğrudan / tip sayfası / bant / mega menü), `finder_select` (alan adı, değer), `finder_view_toggle`, `finder_routine_level`, `finder_add_all` (eklenen ürün sayısı), `finder_no_result`, `finder_alt_open`, `email_capture_submit` (sonuç: başarı/hata, ticari ileti onayı: evet/hayır — e-posta yok).

## 9. Devir notları
- icerik-editoru: sözlük görünen adları, tip yardım metinleri, TR cilt ürünleri etiketlemesi (zorunlu), e-posta içeriği ve form metinleri.
- veri-muhendisi: etiket alanları, `routineStep` ön doldurma, §3.4 doğrulama.
- frontend-mimar: eşleştirme saf fonksiyon + birim testleri (§4 örnek, §6), e-posta servis adaptörü (servis bağımsız arayüz; servis gelene kadar bağlanmaz).
