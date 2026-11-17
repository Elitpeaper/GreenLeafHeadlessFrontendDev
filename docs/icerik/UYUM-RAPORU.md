# Uyum Raporu — riskli iddialar ve düzeltmeler

Sahip: icerik-editoru · 2026-11-16 · Sürüm 0.1
Bu rapor hukuki tavsiye değildir. Ağır maddeleri (R-01, R-06, R-09, R-10) yayın öncesi uzmana (avukat / kozmetik ve gıda takviyesi mevzuat danışmanı) gösterin.
Dayanaklar: K-024, K-036, K-067, K-085, K-095, K-099. Dil kuralı: tedavi, iyileştirme, hastalık/sağlık sorunu giderme, "onarır" ve "önler" türü iddialar yok.

## 1. Ürün metni iddia denetimi (51 TR ürün — `data/content/products.tr.json`)

| ID | Orijinal ifade (kaynak) | Ürün | Risk | Yapılan düzeltme |
|---|---|---|---|---|
| R-01 | "Çürüğü önler ve diş minesini onarır, diş eti sağlığı için kapsamlı koruma", "ağız sağlığını iyileştirir", "dişleri güçlendirir", "%76 tüketim, daha ekonomik" | CCA016, DAA062 (+ doğrulama raporunda claim-risk işaretli DAA062) | Yüksek (tıbbi/tedavi edici) | Çıkarıldı; yalnız aroma, florürsüz bilgisi, içerik ve doku bırakıldı |
| R-02 | "Güneş yanığı, böcek ısırığı ve küçük kesiklerdeki tahrişi gidermek", "iltihap önleyici, antibakteriyel", "yaraların iyileşmesine katkı", "yenilenme sürecini hızlandırır", "aloe alerjik reaksiyona yol açmaz", "hipoalerjenik, en hassas ciltler için güvenli", "kuruluk sorununu giderir", "genel durumunu iyileştirir", "serbest radikallere karşı korur, erken yaşlanmayı önler", "pullanmayı giderir" | ASB045, DAB087, CBF015, DAA109, CBE034, EBB018, KLA128, CBA052, SBC053 | Yüksek | Çıkarıldı; "nemlendirir, yumuşak hissettirir, ferah his" gibi kozmetik görünüm/his dili |
| R-03 | "Epidermisin yüzey katmanını yeniler" | SBJ064 | Orta | Çıkarıldı |
| R-04 | "Antibakteriyel / bakteriyostatik" kalıp sabun; "sebze ve meyve yıkamak için güvenli, ekolojik" deterjan | ASF066, ASF055 | Orta-yüksek (biyosidal ürün iddiası; gıda ile temas eden yüzey/ürün iddiası) | Başlık ve metinlerden çıkarıldı; ürün "çamaşır sabunu / bulaşık deterjanı" olarak tanımlandı |
| R-05 | "Çevreci ve sürdürülebilir alternatif" | CEA069 | Orta (çevresel iddia; kanıt yok — Tüketici/Ticari Reklam kuralları) | Çıkarıldı. Kanıtlanırsa "ağartılmamış bambu lifi" olgusal ifadesi kalabilir |
| R-06 | Krill yağı: "yüksek biyoyararlanım", "doğal antioksidan", doz ve uyarı cümleleri | NWA052 | Yüksek (gıda takviyesi sağlık beyanı) | Beyanlar çıkarıldı; "gıda takviyesidir" notu + `supplement` uyarı notu (UI `product.notice.supplement`). Ürünün takviye bildirimi/izin durumu, doz ve alerji uyarısı etikete göre doğrulanmalı. K-053 iptal edildiği için (K-067) takviyeler yayınlanır, yalnız bu şartla |
| R-07 | Güneş gözlüğü: "gözlerinizi korur", "ışığı etkili biçimde engeller" | MAH723, MAI223 | Orta (CE / UV koruma bilgisi kaynakta yok) | "Parlak ışıkta yansımayı azaltmaya yardımcı olur" düzeyine indirildi; UV/filtre kategorisi iddiası yok. Ambalaj etiketi (UV400, kategori) gelince eklenebilir |
| R-08 | Yakında ürün adlarında: "акне", "лошадиная мазь", "омолаживающий", "против морщин", "восстанавливающий", "отбеливающий" | `products.tr.yakinda.json` (işaretli kayıtlar) | Orta | Nötr kozmetik dile çevrildi ("Akne Eğilimli Ciltler İçin Serum" tek istisna olarak hedef kitle belirtir, "giderir" iddiası yok); "At Yağlı" (merhem yok); "Aydınlatıcı", "Canlandırıcı", "Lifting Etkili", "Yaşlanma Karşıtı" yalnız görünüm dili |
| R-11 | Retinol serum SBB099 | `yakinda` | Orta | Başlık nötr; kullanım uyarıları (güneş, hamilelik) etiketten alınmadan detay açılmamalı |

Hatırlatma: DOGRULAMA-RAPORU "4 RU kısa açıklaması tıbbi iddia sözcüğü içeriyor" diyor. Bunlar yakında ürünlerde hâlâ gösterilmiyor (yalnız ben yazdığım `shortDescription_tr` gösterilir), ancak kaynak Rusça metin sitede hiçbir yerde görünmemelidir (K-024). Bu 4 kayıt toplu yerelleştirme sırasında yeniden ele alınır.

## 2. Site geneli ve mikro metin riskleri

| ID | Konu | Risk | Öneri |
|---|---|---|---|
| R-09 | `/pv-nedir#is-firsati` (K-085, K-099): kazanç, ödül, kâr marjı ("200–300 %" ifadesi kaynak sayfada geçiyor), kâr paylaşımı, liderlik seviyeleri | **Yüksek.** Doğrudan satış / "çok seviyeli pazarlama" konusu; kazanç vaadi; Reklam Kurulu ve Tüketici mevzuatı; 6502 sayılı Kanun ve Doğrudan Satış Yönetmeliği; kaynak olarak partner mağaza şablonu (resmî TR kaynağı değil) | Kullanıcı onayı (K-085) var, ancak: (1) rakamlar yalnız resmî planla birebir; ben rakam yazmadım, bölüm `plan.enabled=false` (S-046); (2) başta ve sonda "garanti değildir" uyarısı mikro metinde hazır; (3) Türkiye'de Greenleaf'in Ticaret Bakanlığı doğrudan satış izni/belgesi olup olmadığı kullanıcıdan teyit edilmeli (Orkestratör'e iletilen rapor notu; ayrı soru numarası Orkestratör'de); (4) yayın öncesi uzman kontrolü |
| R-10 | E-posta toplama ve açık rıza metinleri (K-069, K-090, K-100) | **Yüksek (KVKK, 6563 İYS).** Açık rıza + ticari ileti onayının ayrılması, İYS kaydı, aydınlatma, veri sorumlusu kimliği (K-047 bekliyor) | Metinler `MIKRO-METIN.md` §5'te taslak; uzman kontrolü olmadan `emailCapture.enabled` açılmamalı. Sonuç gönderimi için açık rıza gerekip gerekmediği uzmana soruldu |
| R-12 | "Üye fiyatı normal fiyatın yarısıdır" (`pv.gives.1`, SSS) | Düşük-orta (K-036: fiyat gösteriminde yüzde yok; "yarısı" yalnız PV sayfası ve SSS'te kaynak atfıyla) | Kart/rozet/sepette yüzde ve tasarruf yok. SSS cevabında kaynak atfı korunmalı; veri çarpanı değişirse (S-025: 9 üründe client ≠ 2×üye) metin güncellenir |
| R-13 | Sepet açıklaması "Şimdi üye olarak bu ürünleri üye fiyatıyla alabilirsin" (`cart.checkout.explain`) | Orta (yanıltıcı olabilir: üyelik sonrası sipariş Greenleaf sitesinde yapılıyorsa net değil) | Kullanıcıdan teyit: üye olunca ürünler üye fiyatıyla şu an Greenleaf'te sipariş edilebiliyor mu? Değilse cümle "Online ödeme altyapımız hazırlanıyor." ile bitirilir |
| R-14 | Yakında ürünlerin PV'si | Düşük | Ürün sayfasında "Türkiye'de satışa çıktığında değişebilir" ipucu zorunlu (K-098) |
| R-15 | Sertifikalar: ISO 22716, GMP, Helal (K-045) | Orta (kanıtsız sertifika iddiası) | PDF'siz rozet gösterilmez; belge ürün bazında değil üretici düzeyinde ("Üretici sertifikaları"); `certificates.note` bunu belirtir. Helal rozeti yalnız veride helal işaretli üründe |
| R-16 | Bulucu sonuç dili | Düşük | "Tedavi eder/geçirir" yok; "Bu bulucu tıbbi bir değerlendirme değildir" her sonuçta; ihtiyaç adları görünüm/his dili |
| R-17 | Mevzuat hassas kategoriler (K-095: bant-ve-yamalar, diger-saglik-urunleri) | Yüksek (tıbbi cihaz/ilaç sınırı; TİTCK) | Bu ürünlerin metinleri henüz yazılmadı (yakında grubunda; sıra bekliyor). Yazılırken ad/etikette "tedavi, ağrı kesici, iyileştirici" yok; sayfada `product.notice.regulated` sabit notu; vitrin ve mega menüde öne çıkarılmaz |
| R-18 | Ürün adı/marka doğruluğu | Orta | S-047: CCC001 marka çatışması, ASF054 biçim çatışması vb. Yanlış marka/ad = yanıltıcı bilgi |

## 3. Yayın öncesi kontrol listesi (kullanıcıya)
1. R-09 ve R-10 uzmana gitsin; S-046 (pazarlama planı) cevaplanmadan iş fırsatı bölümü kapalı kalsın.
2. R-06: NWA052 için takviye bildirim/izin belgesi ve etiket metni.
3. R-13: cümleyi gerçeğe göre onayla.
4. S-047 çatışmalarını ambalajdan doğrula.
5. Hitap kararı (S-045).
