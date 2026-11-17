# Faz 1 Özeti — Kapı 1 GEÇTİ (değişikliklerle)

> proje-yoneticisi · Son güncelleme 2026-11-16 · Ayrıntı: `PRD.md`, `SAYFA-HARITASI.md`, `BILGI-MIMARISI.md`, `AKISLAR.md`, `CILT-TESTI.md`, `wireframe/` (11 aktif + 2 "taşındı" notu), `KABUL-KRITERLERI.md`

## Değişiklik günlüğü
| Tarih | Değişiklik | Kaynak |
|---|---|---|
| 2026-11-16 | Kapı 1 kullanıcı kararlarıyla geçti; plan K-062…K-071'e göre güncellendi; yeni öneriler K-086…K-099 | Kullanıcı, KARAR-KAYDI |
| 2026-11-16 | Kullanıcı K-085 (kazanç/iş fırsatı içeriği, K-015 İPTAL) işlendi: içerik yalnız `/pv-nedir#is-firsati` (K-099) | Kullanıcı |
| 2026-11-16 | Paralel çalışan ui-tasarimci (K-072…K-084) ve veri-muhendisi (şema v2) çıktılarıyla hizalandı; kalan farklar önizleme varyantı veya devir notu | ui-tasarimci, veri-muhendisi |

## Kapı 1 sonucu
**Durum: GEÇTİ, değişikliklerle (2026-11-16).** ONAYLI kabul edilenler: K-050, K-051, K-055 (kısmen), K-056, K-058, K-059 (PV kısmı K-062 ile değişti), K-061 (K-094 ile güncellenir).
İptal: K-053 (yama/merhem yayın dışı), K-054 (ödeme adımları veri kuralı), K-057 (sade mega menü).

### Kullanıcının değişiklikleri → plandaki karşılığı
| Karar | Ne değişti | Plan dosyası |
|---|---|---|
| K-062 PV her yerde + ayrı bölüm/sayfa | Yakında ürünlerde de PV (puan/100; veri v2'de hazır); `/pv-nedir` (P0); ana sayfada PV bölümü (A: ayrı bant / B: üyelik girişinde sahne — önizlemede seçilir); her PV'de "PV nedir?" ipucu | `wireframe/pv.md`, `ana-sayfa.md` §5 |
| K-063 Çok sayfalı tam mağaza | Plan zaten çok sayfalı; teyit | `SAYFA-HARITASI.md` |
| K-064 Görselli mega menü | 4 bölge: görselli kökler · en çok 8 görselli alt kategori karosu + metin listesi · 1 öne çıkan ürün/set · 1 tanıtım karosu; mobilde görselli satırlar + kapak görseli | `wireframe/mega-menu.md`, `BILGI-MIMARISI.md` §3 |
| K-065 Ürüne/koleksiyona özel tema | `themeHint`/`theme` + tema kayıt defteri; temalı koleksiyon sahnesi ve temalı ürün detayı; fiyat rozeti ve CTA temada değişmez | `wireframe/premium-tema.md` §A |
| K-066 Hover renk geçişi | Mega menü (+header bandı), ana sayfa Vitrin 1–2, (varyant) premium sahne ve hero packshot'ları; fare + klavye odağı; dokunmatik/reduced-motion/yüksek kontrastta yok | `wireframe/premium-tema.md` §B |
| K-067 Bant/merhem yayında | `saglik-ve-takviye/bant-ve-yamalar` + `diger-saglik-urunleri`; sabit uyarı notu; vitrin/mega menüde öne çıkarılmaz | `BILGI-MIMARISI.md` §2.9, `urun-detay.md` §5 |
| K-068 Ödeme sayfası yok | `/odeme/*` silindi; sepette pasif "Ödemeye geç · Yakında" + görünür açıklama + etkin "Üye ol" | `wireframe/sepet-drawer.md` |
| K-069 Cilt tipine göre bulucu + e-posta | Tek sayfa seçici + canlı sonuç + rutin/ızgara; listelemelerde "Cilt tipine göre" çip şeridi; isteğe bağlı e-posta (iki ayrı işaretsiz onay kutusu); servis yokken form yok, "bağlantıyı kopyala" | `wireframe/cilt-tipine-gore.md`, `CILT-TESTI.md` |
| K-070 Ana sayfada görsellik/animasyon | Her bölüme hareket niyeti; sayfa hareket ilkeleri (ekranda ≤ 2 sürekli hareket, 2.2.2 durdurma); header/footer mikro animasyonları; bütçe | `ana-sayfa.md`, `BILGI-MIMARISI.md` §3.1, §3.5 |
| K-071 Ön koşul: greenleaf-global.com verisi | Panel 62 kayıt veri hattında (şema v2: `priceSource: panel-client`, PV her üründe) | Orkestratör teyidi |

## Yeni öneriler (KARAR-KAYDI, ÖNERİ)
K-086 PV sayfası/yerleşimi · K-087 URL ekleri · K-088 pasif ödeme düğmesi davranışı · K-089 bulucu biçimi · K-090 e-posta toplama kuralları · K-091 mega menü davranış/veri · K-092 temalı koleksiyon/ürün yapısı · K-093 hover bölgeleri (plan ekleri) · K-094 ana sayfa sırası + A/B varyantları · K-095 mevzuat hassas alt kategoriler · K-096 fiyat kaynağı teyidi · K-097 hareket/performans bütçesi · K-098 yakında PV notu · K-099 kazanç içeriğinin yeri ve sunumu (K-085 uygulaması).

## Kullanıcıya sorulacaklar (ACIK-SORULAR)
- **S-026** (ui-tasarimci açtı) büyük ölçüde K-085 + `docs/arastirma/pv-resmi-kaynak.md` ile karşılandı; Orkestratör kapatabilir. Kalan: Türkiye'ye özgü koşulların teyidi (S-014).
- **S-028** Bulucuda e-posta, sonucu görmenin ön koşulu mu olsun? Öneri: hayır.
- **S-029** Hangi ürün/koleksiyonlar temalı (premium) olsun? Öneri: ilk yayında 1 koleksiyon (veride `themeHint: gold` olan set(ler)) + üyelerinin ürün sayfaları.
- Ana sayfa A/B varyantları (PV yerleşimi, premium sunumu) soru değil; Kapı 2 önizlemesinde seçilir.

## Paralel çıktılarla çatışmalar ve çözüm
| Konu | ui-tasarimci / veri-muhendisi | Plan | Çözüm |
|---|---|---|---|
| Cilt testi biçimi | `skin-finder.md`: 4 soruluk test `/cilt-testi` | Tek sayfa bulucu `/cilt-tipine-gore` (Orkestratör talimatı, K-069) | ui-tasarimci'ye devir: ekranları bulucuya uyarlasın; görsel dil (doku karoları, bant ilerleme) korunur |
| E-posta servis yokken | Form görünür, gönderimde "yakında" | Form hiç görünmez; "bağlantıyı kopyala" kartı | Plan kuralı (sahte form yok); devir notu |
| PV ana sayfa yerleşimi | Üyelik bölümü girişinde (K-083) | Vitrin 1 sonrası ayrı bant | Önizleme varyantı A/B |
| Premium ana sayfada | Vitrin 2 "Setler" sekmesinde | Ayrı premium sahne | Önizleme varyantı A/B |
| PV sayfası adresi | `/pv` | `/pv-nedir` (+ `/pv` yönlendirme) | seo-uzmani karar verir |
| Hover ve klavye odağı | Odak tetikler | (ilk taslakta tetiklemiyordu) | ui-tasarimci kabul edildi |
| Bant/merhem slug'ı | `bant-ve-yamalar`, `diger-saglik-urunleri` | (ilk taslakta tek alt kategori) | veri-muhendisi slug'ları kabul edildi |

## Faz 2'ye geçiş — devir notları (`docs/ekip/devir/`)
ui-tasarimci · hareket-tasarimcisi · frontend-mimar · icerik-editoru · seo-uzmani · veri-muhendisi. Her notta kabul kriteri var.

## Orkestratör teyit etmeli
1. K-071 ön koşulunun karşılandığı (veri hattı panel verisiyle çalışıyor).
2. `wireframe/sepet-odeme.md` ve `wireframe/cilt-testi.md` "TAŞINDI" notu; silinebilir.
3. `docs/tasarim/tasarim-kurallari.md` §9 "altın/metalik yok" maddesi K-065 ile yalnız ana temaya daralıyor (ui-tasarimci v1'de işlediyse kapanır).
4. ID çakışması: ui-tasarimci ve proje-yoneticisi aynı anda K-072+ kullandı; kullanıcı kararı da K-085'i aldı; PM önerileri K-086…K-099'a taşındı (K-098 = ilk taslaktaki "yakında PV notu"). Paralel ajan çalışmasında ID aralığı önceden dağıtılması önerilir (GOREV-PANOSU).

## Yayından önce sizden gereken (kodlamayı engellemez, yayını engeller)
1. Sponsor bağlantısı (S-002) — ve varsa sponsor kodu.
2. Satıcı bilgileri (K-047).
3. Üyelik ve PV koşulları için resmî Türkçe kaynak (S-014, S-026).
4. E-posta servisi bilgileri (en son; gelene kadar e-posta formu yok).
5. Yasal metinlerin (KVKK, çerez, kullanım, e-posta açık rıza) uzman kontrolü.

## Kalan riskler
| Risk | Etki | Önlem |
|---|---|---|
| Görsellik/animasyon önceliği ↔ LCP/INP | Lighthouse < 90 | K-097 bütçesi; ilk ekranda tek ağır görsel; H1 opacity almaz; mega menü görselleri tembel |
| Hover renk geçişinde kontrast ve titreşim | Erişilebilirlik | Palet kontrast doğrulaması (ui K-073); niyet gecikmesi; reduced-motion/yüksek kontrastta kapalı |
| Yakında PV'si RU'dan türetiliyor | TR'de farklı PV | İpucunda "değişebilir"; TR'ye geçince panel PV'si |
| Yakında ürünlerin tamamı `publishReady: false` | Geniş katalog ilk önizlemede görünmez | icerik-editoru toplu Türkçe başlık; o zamana kadar yalnız geliştirme ortamında |
| E-posta toplama (KVKK, ticari ileti/İYS) | Hukuki | Uzman kontrolü olmadan form kapalı; iki ayrı işaretsiz onay; sitede saklama yok |
| Bant/merhem ürünleri (TİTCK) | Mevzuat | İddia denetimi, sabit not, öne çıkarmama, uzman kontrolü |
| Tema sayısı büyürse tasarım sapması | Tutarsızlık | Tema kayıt defteri tek kaynak; ilk yayında 1 tema |
