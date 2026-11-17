# Mikro Metin Kılavuzu

Sahip: icerik-editoru · Sürüm 0.1 · 2026-11-16
**Tek kaynak: `data/content/ui.tr.json`** (anahtar → metin). Bu dosya kullanım kuralını, anahtar ailelerini ve JSON'a sığmayan taslakları (e-posta, yasal) içerir. Metin değişikliği yalnız JSON'da yapılır; kodda sabit Türkçe metin bırakılmaz.

## 1. Kullanım
- Düz anahtar: `t("cart.totals.total")`. Yer tutucu: `{ad}`, `{count}`, `{price}` — frontend değer basar.
- Çoğul: `…_one` / `…_other` (Türkçede sayıdan sonra isim çoğul almaz; iki biçim aynı olabilir, yapı i18n kütüphanesi için ayrılmıştır).
- Dizi/nesne anahtarları: `pv.faq`, `membership.faq` (`[{q, a, link?}]`), `pv.business.plan` (yapılandırılmış `businessPlan`).
- Boş dize = öğe render edilmez (`product.reviews.hidden`). `pv.business.plan.enabled=false` iken iş fırsatı bölümü gösterilmez (aşağıda §4).
- Biçimler: fiyat `₺1.299,90`, kuruşsuzda `₺1.300`; PV `PV 0,5`, tam sayıda `PV 3`; ondalık virgül.

## 2. Anahtar aileleri
| Önek | Kapsam |
|---|---|
| `brand.*`, `common.*` | Marka, ortak düğmeler, KDV notu, PV etiketi |
| `header.*`, `megaMenu.*`, `footer.*` | Duyuru şeridi, gezinme, arama, hesap paneli, mega menü kartları, footer |
| `product.*` | Kart (Fiyat, Üye fiyatı, PV ipucu, rozetler, Ürünü incele, Sepete ekle), detay bölüm başlıkları, yakında durumu, mevzuat/takviye uyarı notları |
| `listing.*`, `search.*` | Sıralama, filtre, boş/hata durumları, arama sonuçları |
| `cart.*` | Drawer: satır, toplamlar (Toplam / Üye fiyatıyla toplam / Toplam PV), pasif ödeme + "Yakında" + açıklama, boş sepet, bildirimler |
| `finder.*` | Bulucu: tipler, ihtiyaç adları, rutin adımları, "Neden önerdik", e-posta kartı, sonuç yok, `typePage.*` (5 tip açıklaması) |
| `pv.*` | PV sayfası; `pv.business.*` iş fırsatı bölümü (`#is-firsati`) |
| `membership.*` | Üye ol sayfası ve SSS |
| `home.*`, `about.*`, `favorites.*`, `error.*`, `certificates.*`, `legal.*` | Diğer sayfalar, 404/hata |

## 3. Değişmez metinler (kodda aynen kullanılır)
- Fiyat etiketleri: **"Fiyat"** / **"Üye fiyatı"**. Yüzde, tasarruf tutarı, üstü çizgi yok (K-036).
- PV ipucu (K-060): "PV, Greenleaf üyelerinin alışverişlerinde hesaplanan puan değeridir." Yakında ürünlerde ek: "Türkiye'de satışa çıktığında değişebilir."
- Pasif ödeme: düğme **"Ödemeye geç"** + rozet **"Yakında"** + altında her zaman görünür açıklama: "Online ödeme altyapımız hazırlanıyor. Şimdi üye olarak bu ürünleri üye fiyatıyla alabilirsin." Tek etkin düğme **"Üye ol, üye fiyatıyla al"**.
- Yakında rozeti: **"Türkiye'ye yakında"**; kart düğmesi **"Ürünü incele"**; detay CTA **"Benzer ürünleri gör"**.
- Üyelik terimi: **"Üye ol"**.

## 4. PV sayfası ve iş fırsatı (K-085, K-099)
- Üst yarı (hero, 3 adım, örnek, "ne sağlar", SSS) alışveriş odaklı; kazanç dili yok. "Ne sağlar" 4 maddesi `pv-resmi-kaynak.md`'den; "kalifikasyon onayı gerekmez" maddesi Türkiye'de teyit edilmediği için **alınmadı**.
- `#is-firsati` bölümü: başta ve sonda aynı uyarı ("Kazanç kişisel çalışmaya bağlıdır ve garanti değildir."), kaynak satırı, "Türkiye'ye özgü koşullar farklıysa güncellenir" notu.
- **Rakam yok:** Resmî pazarlama planı yalnız videoda (`marketing_greenleaf.mp4`). 12 ödülün adları, kâr marjı yüzdesi (kaynak sayfada "200–300 %" geçiyor), kâr paylaşımı ve seviye eşikleri yazıya dökülüp doğrulanmadı. Bu nedenle `pv.business.plan.enabled=false`; özet cümleler genel ve rakamsızdır. Plan doğrulanınca `rewards[]`, `marginNote`, `profitShareNote`, `levels[]` doldurulur, `enabled=true` yapılır. Kaynakta olmayan rakam yazılmaz. Bkz. UYUM-RAPORU R-01, S-046.

## 5. E-posta ve yasal taslaklar (UZMAN KONTROLÜNE GİDECEK — hukuki tavsiye değildir)

### 5.1 Bulucu sonuç e-postası (içerik şablonu)
Konu: `Cilt rutinin hazır — {seller}`
```
Merhaba,

Seçimlerine göre hazırladığımız rutin aşağıda.

Profilin: {tip} cilt · {ihtiyaçlar}

1. Temizleme — {urun_adi}
   Fiyat {fiyat} · Üye fiyatı {uye_fiyati} · PV {pv}
   {urun_baglantisi}
(adımlar sırayla)

Bu bulucu tıbbi bir değerlendirme değildir. Yeni bir ürünü önce küçük bir alanda dene.
Fiyatlara KDV dahildir.

{seller}
Bu e-postayı, bulucu sonucunu e-postayla istediğin için aldın.
{abonelikten_cikis_baglantisi — yalnız ticari ileti onayı verildiyse}
```
Yakında ürünlerde: fiyat satırı yok, "Türkiye'ye yakında · PV {pv}".

### 5.2 KVKK aydınlatma — e-posta bölümü (`legal.kvkk.emailSection`)
> **Bulucu sonucunun e-postayla gönderilmesi.** Cilt tipine göre ürün bulucuda, sonucunun e-posta adresine gönderilmesini istersen e-posta adresini ve bulucu seçimlerini (cilt tipi, ihtiyaçlar, rutin seviyesi) işleriz. Amaç, istediğin sonucu sana iletmektir. Verilerin yalnız bu gönderim için e-posta hizmeti sağlayıcımıza aktarılır; sitemizde saklanmaz. Ticari ileti onayı verdiysen e-posta adresin ürün ve duyuru iletileri için de kullanılır; onayını dilediğin an her iletideki bağlantıdan geri alabilirsin. KVKK'nın 11. maddesi kapsamındaki haklarını {iletisim_e_posta} adresine yazarak kullanabilirsin. [Veri sorumlusu unvanı, saklama süresi, aktarım yapılan sağlayıcı ve yurt dışı aktarım bilgisi uzman tarafından tamamlanacak.]

### 5.3 `/yasal/e-posta-acik-riza`
> **1. Sonuç gönderimi için açık rıza (zorunlu).** Cilt tipine göre ürün bulucunun sonucunu e-posta adresime göndermek amacıyla e-posta adresimin ve bulucu seçimlerimin işlenmesine ve e-posta hizmeti sağlayıcısına aktarılmasına açık rıza veriyorum. Bu rızayı dilediğim zaman geri alabileceğimi biliyorum.
>
> **2. Ticari elektronik ileti onayı (isteğe bağlı).** Greenleaf ürünleri, duyurular ve kampanyalar hakkında e-posta adresime ticari elektronik ileti gönderilmesine onay veriyorum. Bu onayı vermesem de sonucum gönderilir. Onayımı her iletideki bağlantıyla ya da {iletisim_e_posta} adresine yazarak geri alabilirim.
>
> Metin sürümü: v0.1 · {tarih}

Uzmana soru: Yalnızca sonucu göndermek için ayrı "açık rıza" gerekli mi, yoksa aydınlatma yeterli mi (K-090 iki kutuyu şart koşuyor; metin buna göre yazıldı)? Ticari ileti onayı İYS kaydı gerektirir mi? Veri sorumlusu kim (satıcı kimliği K-047 bekliyor)?

## 6. Yer tutucular
`{seller}` = `site.sellerName`; `{iletisim_e_posta}` = `site.email`. Kişisel ad/unvan K-047 gelene kadar yapılandırmadaki yer tutucudur; metne gömülmez.
