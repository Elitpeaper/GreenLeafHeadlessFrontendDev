# Wireframe — Üye Ol (`/uye-ol`)

> Sahip: proje-yoneticisi · Faz 1 · 2026-11-16 · Öncelik P0
> Dayanak: K-006, K-015, K-016, K-017, K-036, K-047 · S-002 (sponsor bağlantısı — AÇIK), S-014 (üyelik koşulları kaynağı — AÇIK).
> Not: Paralel kodlanan tek sayfalık "yakında + üye ol" sayfası (K-046) ayrı bir üründür; bu sayfa onun yerini almaz, aynı yapılandırma değerini (üyelik bağlantısı, satıcı adı) kullanır ve metinlerini ondan devralabilir.

## Değişiklik günlüğü
| Tarih | Değişiklik | Kaynak |
|---|---|---|
| 2026-11-16 | Fiyat örneği kartlarında PV; SSS "PV nedir?" cevabı `/pv-nedir`'e bağlanır | K-062, K-086 |
| 2026-11-16 | SSS "Üye olmadan alışveriş" cevabı ödeme sayfası olmadığına göre güncellendi; giriş noktalarından "ödeme 4" çıktı, "sepet drawer" ve "PV sayfası" eklendi | K-068 |
| 2026-11-16 | Dil kuralı K-085'e göre güncellendi; SSS'ye "Greenleaf iş fırsatı nedir?" sorusu (yalnız bağlantı) | K-085, K-099 |

**Sayfanın tek görevi:** Üyeliğin "üyelere özel fiyatla alışveriş" olduğunu sade anlatıp kişiyi sponsor bağlantısıyla Greenleaf kayıt sayfasına göndermek.
**Birincil CTA:** "Greenleaf'te üyeliğini başlat" (dış bağlantı, yeni sekme). Sayfada bu düğme 2 kez geçer (hero + son çağrı) — aynı eylem, aynı metin.
**Dil kuralı (K-085 ile güncellendi; K-015 İPTAL):** Sayfanın ana anlatımı "üyelere özel fiyatla alışveriş"tir. Kazanç/iş fırsatı içeriği bu sayfada **anlatılmaz**, yalnız SSS'de tek soru + `/pv-nedir#is-firsati` bağlantısıyla anılır (K-099). Üye fiyatının müşteri fiyatının yarısı olduğu veriyle tutarlıdır ve resmî kaynakta geçer; "%50" ifadesi yalnız "Üye fiyatı nedir?" SSS cevabında, kaynak atfıyla kullanılabilir — fiyat gösteriminde (kart, rozet) yüzde yine yok (K-036).

**Bölüm sırası:** 1 Hero → 2 Fiyat örneği → 3 Nasıl üye olunur (adımlar) → 4 Sponsor kodu (koşullu) → 5 SSS → 6 Son çağrı → Footer.

---

## 1. Hero
- **İçerik:** H1 "Üye ol, üyelere özel fiyatla alışveriş yap" · alt metin (≤ 25 kelime): "Greenleaf üyeliğiyle sevdiğin ürünleri üye fiyatından alırsın. Kayıt Greenleaf'in resmî sitesinde yapılır." · birincil düğme · altında küçük not "Greenleaf'in resmî kayıt sayfası yeni sekmede açılır."
- **Görsel:** AI atmosfer veya ürün kompozisyonu (K-044).
- **Veri:** `membership.url` (sponsor bağlantısı, yapılandırma), `seller.name`.
- **Durum:** `membership.url` boş → düğme tıklanınca "Üyelik bağlantısı yakında eklenecek" bildirimi; yayın engeli (KABUL §0).
- **Mobil:** Metin + tam genişlik düğme; görsel altta veya küçük.
- **Hareket:** Hafif giriş.
- **CTA:** "Greenleaf'te üyeliğini başlat" → `membership.url` (`target=_blank`, `rel=noopener`), olay `membership_click {source: 'uye-ol-hero'}`.

## 2. Fiyat örneği
- **Amaç:** Avantajı somut ama dürüst göstermek.
- **İçerik:** 2–3 TR ürünü küçük kartla: "Fiyat ₺X" ve "Üye fiyatı ₺Y" yan yana + PV (ipuçlu); başlık "Üyeler bu ürünleri üye fiyatından alır". Üstü çizgi, yüzde, tasarruf yok.
- **Veri:** `collections: uyelik-ornek` (yoksa `turkiyede-satista` ilk 3).
- **Durum:** TR ürünü yoksa bölüm gizli.
- **Mobil:** Yatay kaydırma.
- **CTA:** Kart → ürün detay (ikincil).

## 3. Nasıl üye olunur
- **İçerik:** 3–4 numaralı adım (taslak; icerik-editoru resmî akışa göre netleştirir): (1) "Üyeliğini başlat" düğmesiyle Greenleaf kayıt sayfasını aç. (2) Bilgilerini gir; sponsor bilgisi bağlantıyla otomatik gelir (kod varsa §4). (3) Kaydını tamamla ve Greenleaf hesabına giriş yap. (4) Ürünleri üye fiyatıyla sipariş et.
- **Veri:** Statik metin; S-014 cevabı gelirse ücret/şart satırı eklenir, yoksa yazılmaz.
- **Mobil:** Dikey adım listesi.
- **Hareket:** Adım numaraları kaydırmada sırayla belirir.
- **CTA:** Yok (bölüm bilgi).

## 4. Sponsor kodu (koşullu)
- **Kural:** `membership.sponsorCode` doluysa: "Kayıt sırasında sponsor kodu istenirse: **XXXX**" + "Kodu kopyala" düğmesi → panoya kopyalanır, "Kopyalandı" bildirimi (`aria-live`). Boşsa bölüm yok.

## 5. SSS
- **İçerik:** 5–7 soru, akordeon. Taslak sorular: "Üyelik ücretli mi?" (S-014'e kadar: "Güncel koşullar Greenleaf'in resmî kayıt sayfasında yer alır.") · "Üye olmadan alışveriş yapabilir miyim?" ("Online alışveriş altyapımız hazırlanıyor; açıldığında evet. O zamana kadar sepetini hazırlayabilir, üye olarak üye fiyatıyla alabilirsin.") · "Kayıt nerede yapılıyor, bilgilerim kime gidiyor?" (Greenleaf resmî sitesi; bu site üyelik bilgisi toplamaz) · "Üye fiyatı nedir?" · "PV nedir?" (tek cümle, kazanç dili olmadan + "Ayrıntılı bilgi →" `/pv-nedir`) · "Greenleaf iş fırsatı nedir?" (tek cümle + "Ayrıntılar ve resmî pazarlama planı →" `/pv-nedir#is-firsati`; kazanç rakamı bu sayfada yazılmaz) · "Sorum olursa kime ulaşırım?" (satıcı iletişim, yapılandırmadan).
- **Veri:** icerik-editoru metinleri.
- **Mobil:** Akordeon tam genişlik.
- **CTA:** Yok.

## 6. Son çağrı
- Kısa başlık "Hazırsan başlayalım" + aynı birincil düğme + "Açılmadıysa bu bağlantıyı kullan" metin bağlantısı (aynı adres, düz görünür URL değil).
- Olay `membership_click {source: 'uye-ol-footer'}`.

---

## Sayfa düzeyi
- **Giriş noktaları:** `AKISLAR.md` A5 listesi; tüm iç bağlantılar `?kaynak=` parametresi taşımaz (analitik olayı kaynak sayfayı zaten alır).
- **Hesap paneli (K-017):** Header hesap ikonu → küçük panel: "Üye ol" (→ bu sayfa) + "Greenleaf üye girişi" (dış, yeni sekme, `membership.loginUrl`).
- **SEO:** İndekslenir; başlık "Üye ol | {SATICI_ADI}".
- **Analitik:** `membership_click` (source), `sponsor_code_copy`.
