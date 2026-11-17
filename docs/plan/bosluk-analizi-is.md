# Boşluk Analizi — İş / Kapsam

> Hazırlayan: C1-is-kapsam-boslugu (proje-yoneticisi alt ajanı) · Faz 0 (Keşif) · 15 Kasım 2026
> Durum: TASLAK. Bu belge karar değildir. Buradaki "öneri"ler `KARAR-KAYDI.md`'ye ancak `ÖNERİ` olarak girebilir; bağlayıcı olmaları için kullanıcı onayı gerekir.
> Hukuki tavsiye değildir. Mevzuat atıfları genel bilgiye dayanır; "doğrulanmalı" işaretli her madde yayından önce bir uzmana (avukat / mali müşavir) kontrol ettirilmelidir.

## 0. Giriş

**Kapsam.** Projenin bugünkü tanımında iş ve kapsam düzeyindeki boşluklar: kime hizmet edileceği, ne satılacağı, fiyatın nasıl gösterileceği, ödeme yokken sitenin ne yapacağı, hukuki asgari koşullar, yayın takvimi ve ölçüm. Teknik mimari, tasarım dili ve veri kazıma yöntemi bu belgenin konusu değil; yalnızca iş kararlarını etkiledikleri yerde ele alınıyor.

**Yöntem.** Kaynaklar satır satır okundu. Her iddia için şu sorular soruldu: "Bu cevaplanmazsa Faz 1'deki PRD/wireframe, Faz 2'deki tasarım ya da Faz 3'teki kod geri döner mi?" ve "Makul bir varsayılan kayda geçirilebilir mi?" Yalnızca varsayılanı olmayan ve inşa edilecek şeyi gerçekten değiştiren noktalar soru olarak işaretlendi. Geri kalanlar "karar önerisi" olarak yazıldı.

**Okunan kaynaklar.** `CLAUDE.md`, `MEMORY.md`, `docs/ekip/EKIP.md`, `docs/ekip/KARAR-KAYDI.md`, `docs/ekip/ACIK-SORULAR.md`, `docs/ekip/GOREV-PANOSU.md`. Bu belge yazılırken `docs/arastirma/` ve `docs/veri/` altında hazır bir çıktı yoktu; bu yüzden onlara dayanılmadı.

**Daha önce sorulmuş sorular.** S-001 (görsel yön notları), S-002 (sponsor linki), S-003 (yeni ürün verisi) ve S-004 (GitHub/Vercel) tekrar sorulmuyor. Gereken yerde yalnızca bunlara atıf yapılıyor.

**Giriş formatı.** Her boşluk şu alanlarla yazıldı: Boşluk · Neden önemli · Seçenekler · Öneri · Bloke ettiği faz · Soru gerekli mi. "Soru gerekli = hayır" olan girişlerin önerisi, kullanıcı itiraz etmezse varsayılan karar olarak Faz 1'e taşınır.

---

## 1. Hedef kitle ve değer önerisi

### B-İŞ-01 — Üç hedef kitlenin önceliği tanımlı değil
- **Boşluk:** MEMORY §1 iki amaçtan söz ediyor: satış ve üye kazanma, bir de portföy. Pratikte üç ayrı kitle var: (a) alışveriş yapan son müşteri, (b) potansiyel üye, (c) siteyi portföy olarak inceleyen diğer distribütörler. Hangisinin öncelikli olduğu ve çatışma anında hangisinin kazanacağı yazılı değil.
- **Neden önemli:** Ana sayfadaki bölüm sırası, hero mesajı, header'daki ana CTA ve başarı ölçütü bu sıralamaya göre değişir. Faz 2'de "üyelik bölümü daha yukarı mı çıksın" tartışması çıkarsa wireframe geri döner.
- **Seçenekler:** (1) Müşteri > üye > portföy. (2) Üye > müşteri > portföy. Ödeme kapalıyken gerçek dönüşüm üyelik olduğu için bu da savunulabilir. (3) Portföy öncelikli, yani site bir vitrin demo.
- **Öneri:** (1). MEMORY §7 "alışveriş önde, üyelik tek ve şık bir bölümde" diyor ve bu sıralamayla tutarlı. Portföy kitlesi için sitenin içinde ayrı bir şey yapılmaz: sitenin kendisi zaten portföydür (bkz. B-İŞ-04). Ödeme açılana kadar fiilî dönüşüm üyelik tıklaması olacak; bu gerilim B-İŞ-14'te ele alınıyor.
- **Bloke ettiği faz:** Faz 1
- **Soru gerekli mi:** Hayır

### B-İŞ-02 — Değer önerisi tek cümleyle yazılmamış
- **Boşluk:** "En büyük fark UI güzelliği" (MEMORY §1) bir farklılaşma iddiası, ama müşteriye yönelik bir değer önerisi değil. Müşterinin bu siteden neden alacağı, resmî Greenleaf kanalı veya başka bir distribütör yerine neden burayı seçeceği yazılmamış. Ödeme kapalıyken sitenin müşteriye somut faydası daha da belirsizleşiyor.
- **Neden önemli:** Hero metni, "Neden Greenleaf / Neden biz" bölümü, güven şeridi ve SEO başlıkları bu cümleden türer. Bu cümle yokken yazılan metinler Faz 2'de baştan yazılır.
- **Seçenekler:** (1) "Greenleaf ürünlerini Türkçe, net fiyatlarla keşfet; üye olursan yarı fiyatına al." (2) Marka hikâyesi odaklı bir öneri. (3) Danışmanlık odaklı bir öneri ("Cildine uygun Greenleaf ürününü birlikte bulalım").
- **Öneri:** (1). Ödeme olmadan da tutarlıdır. İçerik editörü Faz 1'de 2–3 varyant yazsın, kullanıcı birini seçsin.
- **Bloke ettiği faz:** Faz 1
- **Soru gerekli mi:** Hayır. Faz 1 onayında seçilir.

### B-İŞ-03 — Satıcının (distribütörün) kimliği ve sitedeki görünürlüğü belirsiz
- **Boşluk:** Kaynaklar "distribütör" diyor ama kim olduğunu söylemiyor. Kullanıcının kendisi mi, yoksa kullanıcının site yaptığı bir müşteri mi? MEMORY §1'deki "bu kişiye bu siteyi yaptım" ifadesi ikinci ihtimali düşündürüyor. Sitede hangi ad, unvan, şehir ve iletişim bilgisinin görüneceği tanımsız.
- **Neden önemli:** Künye/iletişim sayfası, footer, "Hakkımızda" metni, sponsor linkinin sahibi, kimin onay vereceği ve hukuki sorumluluk buna bağlı. "Resmî site" izlenimi riskini azaltmak da distribütör kimliğinin görünür olmasına bağlı (B-İŞ-26).
- **Seçenekler:** (1) Gerçek kişi adıyla "Bağımsız Greenleaf Distribütörü". (2) Şirket unvanıyla. (3) Kimliksiz, yalnız marka adıyla. Bu seçenek önerilmez.
- **Öneri:** (1) veya (2), "Bağımsız Greenleaf Distribütörü" ibaresiyle birlikte. Hangisi olacağını yalnızca kullanıcı bilebilir.
- **Bloke ettiği faz:** Faz 1 (künye, footer ve hakkımızda içeriği)
- **Soru gerekli mi:** **Evet** (S-öneri 2)

### B-İŞ-04 — Portföy amacı için sitede ne olacağı tanımsız
- **Boşluk:** Portföy izleyicisi için "tasarlayan" imzası, ayrı bir vaka sayfası ya da "bu siteden bende de olsun" çağrısı olup olmayacağı belirsiz. K-010 white-label/çoklu satıcı olmadığını söylüyor; portföy amacı ise dolaylı yoldan "başka satıcılara satış" anlamına geliyor.
- **Neden önemli:** Sitede ikinci bir ticari çağrı, yani tasarım hizmeti satışı, müşteri kitlesinin dikkatini dağıtır ve "resmî site" algısını karıştırır. Footer tasarımı ve sayfa haritası bu kararı bekler.
- **Seçenekler:** (1) Footer'da küçük bir "Tasarım: …" imzası; vaka sunumu sitenin dışında, kullanıcının kendi portföyünde. (2) Sitenin içinde "Bu site nasıl yapıldı" sayfası. (3) Hiçbir iz bırakılmaz.
- **Öneri:** (1). Site müşteriye hizmet eder, portföy gösterimi canlı linkin kendisiyle yapılır. Distribütör kullanıcının kendisiyse imza zaten gereksiz olabilir.
- **Bloke ettiği faz:** Faz 1 (footer içeriği)
- **Soru gerekli mi:** Hayır. Varsayılan (1); B-İŞ-03'ün cevabıyla birlikte netleşir.

---

## 2. Fiyat gösterimi (en yüksek hukuki ve güven riski)

### B-İŞ-05 — "Liste fiyatı = güncel × 2" gerçek bir satış fiyatı mı?
- **Boşluk:** MEMORY §6 ve K-007'ye göre liste fiyatı, güncel fiyatın iki katı olarak hesaplanıyor. Bu bir hesaplama kuralı; kaynağı belirtilmemiş. Üye olmayan bir müşteri ödeme açıldığında gerçekten bu fiyattan mı alacak? Greenleaf'in Türkiye için resmî bir perakende fiyatı var mı? Yoksa sitede sadece "üye fiyatı" ve onu ikiyle çarparak elde edilen bir sayı mı gösterilecek?
- **Neden önemli:** Hiç uygulanmamış ya da uygulanmayacak bir fiyatı "önceki/liste fiyatı" diye üstü çizili göstermek aldatıcı fiyat ve indirim reklamı riski taşır. Genel bilgi düzeyinde: 6502 sayılı Tüketicinin Korunması Hakkında Kanun ve Ticari Reklam ve Haksız Ticari Uygulamalar Yönetmeliği, indirimli satış duyurularında indirim öncesi fiyatın belirli bir süre içinde (yaygın bilinen kural: son 30 gün) uygulanan en düşük fiyat olmasını öngörüyor. **Doğrulanmalı.** Ödeme kapalıyken hiçbir fiyat "uygulanmış" olmayacağı için üstü çizili gösterim özellikle sorunlu. Ayrıca kart bileşeni, ürün detayı, sepet özeti ve yapılandırılmış veri bu karara göre farklı tasarlanır.
- **Seçenekler:** (1) Greenleaf'in resmî perakende fiyatı varsa ve üye olmayan bu fiyattan alabilecekse iki fiyat yan yana gösterilir: "Fiyat" ve "Üye fiyatı". Liste fiyatının üstü çizilmez, ifade bir "indirim" değil "üyelere özel fiyat" olur. (2) Resmî perakende fiyatı yoksa sadece tek fiyat (üye fiyatı) ve "üyelere özel" açıklaması gösterilir. (3) MEMORY'deki gibi ×2 hesaplanıp üstü çizili gösterilir. Önerilmez.
- **Öneri:** (1), kaynak doğrulanırsa. Doğrulanamazsa (2). Tasarım her iki durumu da taşıyabilecek bir fiyat bileşeniyle başlasın, ama hangisinin canlıya çıkacağı Faz 1'de kilitlensin.
- **Bloke ettiği faz:** Faz 1 (fiyat gösterim kuralı ve kabul kriteri), Faz 2 (ürün kartı)
- **Soru gerekli mi:** **Evet** (S-öneri 3)

### B-İŞ-06 — Kaynak fiyat hangisi: panel `price`, xlsx "fiyat ₺" ya da katalog?
- **Boşluk:** Üç fiyat kaynağı var: panel API'sindeki `price` (`with_price=try`), `greenleaf-turkiye-urunler.xlsx` dosyasındaki "fiyat ₺" ve Ağustos kataloğu. Panel fiyatının üye (distribütör) fiyatı mı yoksa perakende fiyatı mı olduğu yazılmamış. "Güncel fiyat" ifadesi de bunlardan hangisi olduğunu söylemiyor.
- **Neden önemli:** Yanlış alan baz alınırsa bütün fiyatlar ikiyle çarpılmış ya da yarıya bölünmüş olarak yayınlanır. Bu, en kötü türden bir canlı hata.
- **Seçenekler:** (1) Panel `price` = üye fiyatı, tek doğru kaynak. (2) xlsx tek doğru kaynak. (3) Kaynaklar karşılaştırılır, farklar raporlanır.
- **Öneri:** (3). Veri mühendisi Faz 0 envanterinde aynı 37 ürün için üç kaynağın fiyatını yan yana koysun. Panel `price` alanının ne anlama geldiğini kullanıcı panelde tek bakışta teyit edebilir. Bu ayrı bir soru olarak değil, S-öneri 3'ün parçası olarak sorulsun.
- **Bloke ettiği faz:** Faz 1 (veri sözleşmesi), Faz 3
- **Soru gerekli mi:** Hayır (S-öneri 3'e eklendi; ayrıca devir notu veri-muhendisi'ne)

### B-İŞ-07 — KDV, yuvarlama, birim fiyat ve fiyat güncelleme sorumluluğu
- **Boşluk:** Fiyatların KDV dahil olup olmadığı, ×2 sonrası yuvarlama kuralı (ör. ,90 sonları), birim fiyat gösterimi ve fiyatların kim tarafından, ne sıklıkla güncelleneceği tanımsız. Backend yokken her fiyat değişikliği bir veri güncellemesi ve yeniden yayın demek.
- **Neden önemli:** Genel bilgi düzeyinde, Fiyat Etiketi Yönetmeliği tüketiciye gösterilen fiyatın vergiler dahil olmasını ve belirli ürün gruplarında birim fiyat (₺/litre, ₺/kg) gösterilmesini öngörüyor. **Doğrulanmalı.** Birim fiyat gerekiyorsa kart ve detay tasarımına bir satır eklenir ve veri şemasına normalize edilmiş hacim/gramaj alanı gerekir. Fiyatlar güncellenmezse sitede bayat fiyat kalır.
- **Seçenekler:** Fiyat: KDV dahil gösterilir, kaynaktan alındığı gibi, yuvarlama yapılmadan. Birim fiyat: şemada ayrılır, gösterimi hukuki doğrulamaya bağlanır. Güncelleme: veri mühendisinin betiği + yeniden yayın + sitede "Fiyatlar gg.aa.yyyy tarihinde güncellenmiştir" notu.
- **Öneri:** Yukarıdakilerin hepsi varsayılan olarak alınsın. Panel fiyatının KDV dahil olup olmadığı veri envanterinde teyit edilsin.
- **Bloke ettiği faz:** Faz 1 (şema, kabul kriteri), Faz 2 (kartta birim fiyat satırı)
- **Soru gerekli mi:** Hayır

### B-İŞ-08 — PV (puan) gösterilecek mi?
- **Boşluk:** Şemada `pv` alanı var (MEMORY §4) ama müşteriye gösterilip gösterilmeyeceği yazılmamış.
- **Neden önemli:** PV, ağ pazarlaması iç dilidir. Son müşteri için anlamsızdır ve MEMORY §7'nin "toptancı dili yok" ilkesiyle çelişir. Üyeler içinse anlamlı olabilir.
- **Seçenekler:** (1) Gösterilmez, yalnızca veride tutulur. (2) Yalnızca ürün detayında küçük bir bilgi olarak gösterilir. (3) Her yerde gösterilir.
- **Öneri:** (1). Ödeme ve üye girişi geldiğinde yeniden değerlendirilir.
- **Bloke ettiği faz:** Faz 2
- **Soru gerekli mi:** Hayır

---

## 3. Üyelik yönlendirmesi ve sponsor linki

### B-İŞ-09 — Sponsor linki yokken ve link bozulursa ne olur?
- **Boşluk:** S-002 linki soruyor ama linkin yapısı bilinmiyor: URL parametresi mi, ayrı bir alt alan mı, kayıt formuna elle yazılan bir sponsor kodu mu? Link yokken ya da çalışmazken kullanıcının ne göreceği tanımsız.
- **Neden önemli:** Link bir kod gerektiriyorsa "Üye ol" sayfasına "sponsor kodu: XXXX, kopyala" bileşeni eklenir. Bu durum Faz 2 tasarımını değiştirir. Yanlış ya da eksik link, kayıtların başka bir ekibe yazılması demektir; bu projenin ana gelir kaybı riskidir.
- **Seçenekler:** (1) Yalnızca link. (2) Link + görünür, kopyalanabilir sponsor kodu (yedek yol). (3) Yalnızca kod.
- **Öneri:** (2). Link ve kod tek bir yapılandırma değerinden okunur. Yayın kontrol listesine "sponsor linki gerçek tarayıcıda test edildi ve kayıt ekrana doğru sponsorla düştü" maddesi eklenir. Link alınmadan canlı yayın yapılmaz.
- **Bloke ettiği faz:** Faz 2 (Üye ol sayfası bileşenleri), Faz 4 (yayın)
- **Soru gerekli mi:** Hayır. S-002 cevaplanırken linkin kod içerip içermediği de belirtilsin; ek soru açılmasın.

### B-İŞ-10 — Yönlendirme öncesi ara sayfa / açıklama
- **Boşluk:** Butonun doğrudan Greenleaf'e mi gideceği, yoksa önce bir açıklama gösterilip gösterilmeyeceği belirsiz. Açıklama şunları söyleyebilir: "Greenleaf'in resmî kayıt sayfasına yönlendiriliyorsunuz, kayıt Greenleaf ile yapılır, verileriniz bu siteye gelmez."
- **Neden önemli:** Kullanıcı, kayıt formunu bu siteye ait sanabilir. Bu güven ve KVKK açısından bir sorumluluk karışıklığı doğurur. Ayrıca yeni sekmede açma ve analitik olayı bu noktaya bağlanır.
- **Seçenekler:** (1) "Üye ol" sayfası açıklayıcı bir sayfa olur, butonun yanında kısa bir yönlendirme notu yer alır, link yeni sekmede açılır. (2) Modal ara ekran. (3) Doğrudan link.
- **Öneri:** (1). Ayrıca bir ekran gerekmez; "Üye ol" sayfasının kendisi ara sayfa işlevini görür.
- **Bloke ettiği faz:** Faz 1 (akış), Faz 2
- **Soru gerekli mi:** Hayır

### B-İŞ-11 — Üyelik koşulları bilgisinin kaynağı yok
- **Boşluk:** "Üye ol" sayfasında "yarı fiyatına alışveriş" vaadi var (MEMORY §7). Ama üyelik ücreti, ilk alım şartı, minimum aylık alım, indirimin gerçek oranı ve iptal koşulları için resmî bir Türkçe kaynak gösterilmemiş.
- **Neden önemli:** Sayfa metni, SSS bölümü ve fiyat rozetindeki "%50" ifadesi bu bilgilere dayanıyor. Yanlış ya da eksik koşul tüketici şikâyetine dönüşür. Bilgi gelmezse "Üye ol" sayfası Faz 2'de içeriksiz bir kabuk olarak kalır.
- **Seçenekler:** (1) Kullanıcı resmî Türkçe kaynak veya doküman verir; sayfa onu özetler ve kaynağa link verir. (2) Koşullar sitede hiç yazılmaz; "Detaylar Greenleaf kayıt sayfasında" denir.
- **Öneri:** (1). Kaynak yoksa (2) ve "yarı fiyatına" yerine "üyelere özel fiyat" ifadesi kullanılır.
- **Bloke ettiği faz:** Faz 1 (üye ol sayfası içeriği), Faz 2 (metin)
- **Soru gerekli mi:** **Evet** (S-öneri 6)

### B-İŞ-12 — Doğrudan satış / ağ pazarlaması dil sınırları
- **Boşluk:** Gelir vaadi, kazanç planı, "ekip kur" ve "pasif gelir" dilinin sitede hiç kullanılmayacağı yazılı bir kural olarak yok. MEMORY §7 yalnızca bunun "ana sayfada baskın olmaması"nı söylüyor.
- **Neden önemli:** Genel bilgi düzeyinde, 6502 sayılı Kanun piramit satış sistemlerini yasaklıyor ve doğrudan satışa dair ikincil düzenlemeler var. Kazanç vaadi içeren reklam dili bu alanda risk taşır. **Doğrulanmalı.** İçerik editörünün mikro metin kuralları bu karara bağlı.
- **Seçenekler:** (1) Sitede yalnızca "indirimli alışveriş" avantajı anlatılır; kazanç ve ekip dili hiç kullanılmaz. (2) Ayrı bir "iş fırsatı" sayfası açılır, ölçülü bir dille yazılır.
- **Öneri:** (1). İş fırsatı anlatımı sitenin kapsamı dışında kalır. Bu kural Faz 1 ses tonu rehberine "yasak ifadeler" listesi olarak girer.
- **Bloke ettiği faz:** Faz 1 (ses tonu), Faz 2 (metin)
- **Soru gerekli mi:** Hayır

### B-İŞ-13 — Site içi "Giriş/Kayıt/Hesabım" ile Greenleaf üyeliği karışıyor
- **Boşluk:** MEMORY §2'de "Üye ol" (Greenleaf'e yönlendirme) öncelikli sayfalar arasında, "Giriş/kayıt, hesabım" ise sonraya bırakılmış. İkisi ayrı kavramlar: Greenleaf distribütör üyeliği ve sitenin kendi müşteri hesabı. Backend yokken site hesabı işlevsizdir.
- **Neden önemli:** Header'daki kullanıcı ikonu nereye gidecek? "Giriş" butonu Greenleaf paneline mi gidecek, sitenin kendi sayfasına mı? Bu karar header ve akışları belirliyor. Ayrıca işlevsiz bir giriş formu kullanıcıyı, işlevsiz bir veri toplama formu da KVKK'yı ilgilendirir.
- **Seçenekler:** (1) Bu fazda site hesabı yok. Header'da "Üye ol" CTA'sı ve (opsiyonel) "Üye girişi" yer alır; ikisi de Greenleaf'e dış link olarak gider. (2) Görsel olarak tasarlanmış ama devre dışı bir giriş/kayıt ekranı. (3) Tam tıklanabilir bir demo hesap.
- **Öneri:** (1). Giriş/hesabım ekranları backend fazına bırakılır. Header'da ikonun yeri ayrılır ama ikon işlevsiz bir sayfaya gitmez.
- **Bloke ettiği faz:** Faz 1 (sayfa haritası, header)
- **Soru gerekli mi:** Hayır

---

## 4. "Ödeme devre dışı" ne demek?

### B-İŞ-14 — Ödeme kapalıyken müşterinin sipariş verme yolu yok
- **Boşluk:** K-005'e göre akış tıklanabilir ama son adım kapalı. Satın almak isteyen bir müşterinin ne yapacağı tanımsız. WhatsApp yasak (K-010). Telefon, e-posta, iletişim formu ya da "Greenleaf üzerinden kendin sipariş ver" yollarından hiçbiri belirlenmemiş.
- **Neden önemli:** Sepeti dolduran müşterinin önüne çıkmaz bir sokak koymak, sitenin "satış sitesi" amacını boşa çıkarır ve güveni zedeler. Bu karar sepet drawer'ı, checkout'un son adımı, ürün detayındaki CTA ve KVKK kapsamını birlikte değiştirir. Faz 2'de değişirse dört ekran birden yeniden tasarlanır.
- **Seçenekler:** (1) **Sepet = alışveriş listesi:** Son adımda "Online ödeme çok yakında. Bu listeyle hemen üye fiyatından almak için üye ol" denir. Liste, ürün kodlarıyla birlikte kopyalanabilir ya da yazdırılabilir; üye olan kişi Greenleaf panelinden sipariş verir. Kişisel veri alınmaz. (2) E-posta ile sipariş talebi: sepet içeriği `mailto` bağlantısıyla gönderilir. Satış distribütör üzerinden yapılır; vergi/fatura soruları doğar. (3) Hiçbir alternatif sunulmaz; yalnızca "yakında" denir.
- **Öneri:** (1). Ödeme yokken tek gerçek dönüşüm olan üyelikle uyumludur, veri toplamaz ve yasal yükü en düşüktür.
- **Bloke ettiği faz:** Faz 1 (kullanıcı akışı), Faz 2
- **Soru gerekli mi:** **Evet** (S-öneri 4). İş modelini (distribütörün kendisinin satıp satmayacağını) belirliyor.

### B-İŞ-15 — Checkout adımlarında kişisel veri alınacak mı?
- **Boşluk:** "Akışın tamamı tıklanabilir" (MEMORY §2) ifadesi, adres, ad ve telefon formlarının gerçekten doldurulup doldurulmayacağını söylemiyor.
- **Neden önemli:** Veri girilip hiçbir yere gitmeyecekse kullanıcı emeği boşa gider ve sonunda "ödeme yok" ekranıyla karşılaşır; bu bir karanlık örüntü algısı yaratır. Veri bir yere gönderilecekse KVKK aydınlatma metni ve açık rıza ihtiyacı doğar. Yalnızca localStorage'da tutulsa bile aydınlatma metninin gerekip gerekmediği **doğrulanmalı**.
- **Seçenekler:** (1) Checkout adımları tasarlanır (portföy ve ileride kullanım için) ama ödeme kapalıyken canlıda form doldurulmaz. Sepetten doğrudan B-İŞ-14 (1) ekranına geçilir. (2) Formlar doldurulur, veri gönderilmez. (3) Formlar doldurulur, veri bir servise gönderilir.
- **Öneri:** (1). Checkout ekranları Faz 2'de tasarlanır, Faz 3'te bir özellik bayrağının arkasında kodlanır ve ödeme açılana kadar canlıda görünmez. Böylece "tıklanabilir akış" portföy ve önizleme için korunur, gerçek müşteri de kandırılmaz.
- **Bloke ettiği faz:** Faz 1
- **Soru gerekli mi:** Hayır. S-öneri 4'ün cevabından türer.

### B-İŞ-16 — "Haber ver / stoğa gelince bildir / bülten" e-posta toplama var mı?
- **Boşluk:** Ödeme açılınca haber vermek için e-posta toplanıp toplanmayacağı tanımsız.
- **Neden önemli:** E-posta toplamak bir form servisi gerektirir (backend yok), ayrıca KVKK aydınlatma metni ve ticari ileti onayı gerekir. 6563 sayılı Kanun kapsamında İYS kaydı gibi yükümlülükler **doğrulanmalı**. Bu da yasal sayfa kapsamını büyütür.
- **Seçenekler:** (1) Bu fazda yok. (2) Üçüncü taraf bir form servisiyle var.
- **Öneri:** (1). Dönüşüm hedefi üyelik linki olduğu için e-posta toplamak bu fazda gereksiz bir yük.
- **Bloke ettiği faz:** Faz 1
- **Soru gerekli mi:** Hayır

### B-İŞ-17 — "Online ödeme çok yakında" ifadesinin süresi ve dürüstlüğü
- **Boşluk:** Backend için bir takvim yok (MEMORY §2: "sonra planlanacak"). "Çok yakında" ifadesinin aylarca sitede kalması mümkün.
- **Neden önemli:** Uzun süre kalan bir "yakında" ifadesi güven kaybettirir. Metnin tarihsiz ve dürüst olması gerekir.
- **Seçenekler:** (1) "Online ödeme hazırlanıyor. Şimdilik üye olarak Greenleaf üzerinden sipariş verebilirsiniz." (2) Tarihli bir vaat.
- **Öneri:** (1). Tarih verilmez. Metin içerik editörüne bırakılır.
- **Bloke ettiği faz:** Faz 2 (metin)
- **Soru gerekli mi:** Hayır

### B-İŞ-18 — SEO, indexleme ve yapılandırılmış veri
- **Boşluk:** Sitenin ödeme kapalıyken Google'da indexlenip indexlenmeyeceği yazılmamış. Fiyatı gösterilen ama satın alınamayan ürünlerin Product/Offer şemasında nasıl işaretleneceği de belirsiz. Google Merchant / Alışveriş kapsamda mı, o da bilinmiyor.
- **Neden önemli:** Satın alınamayan bir ürünü `InStock` fiyatlı bir Offer olarak işaretlemek, arama motoru politikalarına göre yanıltıcı sayılabilir. **Doğrulanmalı.** Merchant Center ise çalışan bir checkout ister. Yanlış karar, ilk indexlenen içeriğin hatalı yerleşmesi demek. Portföy amaçlı bir sitenin indexlenmemesi ise SEO yatırımını boşa çıkarır.
- **Seçenekler:** (1) Indexlenir; Product şeması Offer olmadan ya da satın alınamaz durumda verilir; Merchant yok. (2) Ödeme açılana kadar `noindex`. (3) Indexlenir ve tam Offer verilir. Önerilmez.
- **Öneri:** (1). Yalnızca TR (`hreflang` gerekmez). Kesin şema stratejisi Faz 1'de seo-uzmani'na.
- **Bloke ettiği faz:** Faz 1 (SEO kararı), Faz 3
- **Soru gerekli mi:** Hayır

---

## 5. Ürün ve kategori kapsamı

### B-İŞ-19 — İlk yayına hangi ürünler girecek?
- **Boşluk:** Başlangıç noktası 37 ürünlük Ağustos kataloğu (MEMORY §6). Yeni ürünler geliyor (S-003). Panel kataloğu ise çok daha geniş (8+ kategori). İlk yayının ürün listesinin hangi kurala göre belirleneceği yazılmamış: yalnız 37 ürün mü, panelde TR-aktif görünen her ürün mü, yoksa sadece Türkçe metni hazır olanlar mı?
- **Neden önemli:** Ürün sayısı mega menüyü (B-İŞ-23), filtre ihtiyacını, kategori sayfalarının boş kalıp kalmayacağını ve içerik iş yükünü (her ürün için Türkçe metin + TİTCK taraması) doğrudan belirler. 37 ürün için mega menü gereksizdir, 300 ürün için şarttır. Bu fark Faz 2 header tasarımını değiştirir.
- **Seçenekler:** (1) Yalnız 37 ürün. (2) 37 ürün + S-003'teki yeni ürünler. (3) Panelde TR-aktif tüm ürünler.
- **Öneri:** (2), "Türkiye'de satışta, Türkçe metni hazırlanmış ve görseli olan ürün yayına girer" kuralıyla. Bilgi mimarisi (3)'e ölçeklenebilecek şekilde tasarlanır.
- **Bloke ettiği faz:** Faz 1 (bilgi mimarisi), Faz 2 (header/menü)
- **Soru gerekli mi:** **Evet** (S-öneri 5)

### B-İŞ-20 — Gıda takviyesi ve sağlık ürünleri özel riski
- **Boşluk:** MEMORY "sağlık" kategorisinden ve TİTCK'ten söz ediyor. Ancak gıda takviyelerinin (varsa) farklı bir rejime tabi olduğu, genel bilgi düzeyinde Tarım ve Orman Bakanlığı'na, sağlık beyanı kısıtlarına ve onay numarası gösterimine bağlı olduğu not edilmemiş. **Doğrulanmalı.** Medikal ürün sayılabilecek kalemler de ayrıca incelenmemiş.
- **Neden önemli:** Bu ürünlerde hatalı metin, kozmetiğe göre daha ağır yaptırım riski taşır. Gerekirse ürün detay şablonuna "onay/izin no" alanı ve sabit uyarı metni eklenir; bu bir şema ve tasarım farkı yaratır.
- **Seçenekler:** (1) İlk yayında gıda takviyesi / sağlık kategorisi yer almaz, metinleri uzman kontrolünden sonra eklenir. (2) Ürünler eklenir, sağlık iddiası içermeyen sade metinlerle.
- **Öneri:** (1). Şemada `regulatoryCategory` (kozmetik / gıda takviyesi / genel) ve onay numarası alanı şimdiden ayrılır.
- **Bloke ettiği faz:** Faz 1 (şema, içerik kuralı)
- **Soru gerekli mi:** Hayır. S-öneri 5 içinde onaylanır.

### B-İŞ-21 — Ürün metinlerinin Türkçeleştirilmesinin sahipliği ve onayı
- **Boşluk:** Panel metinleri Rusça (`description`, `content`). Bu metinlerin çevrilecek mi yoksa yeniden mi yazılacağı, metni kimin onaylayacağı ve TİTCK taramasını kimin yapacağı yazılı değil. EKIP'te icerik-editoru var ama onay mekanizması tanımlı değil.
- **Neden önemli:** Ürün sayısı × metin = en büyük içerik iş kalemi. Onay mekanizması yoksa Faz 3'te sayfalar boş metinle bekler.
- **Seçenekler:** (1) İçerik editörü, Rusça kaynaktan iddiaları ayıklayarak Türkçe metni yeniden yazar. Kullanıcı ilk 3–5 ürünü örnek olarak onaylar, sonra kalıp uygulanır. (2) Birebir çeviri. (3) Kullanıcı yazar.
- **Öneri:** (1). Metin şablonu (kısa açıklama, kullanım, içerik, hacim, kutu adedi) Faz 1'de belirlenir.
- **Bloke ettiği faz:** Faz 1 (şablon), Faz 3 (içerik)
- **Soru gerekli mi:** Hayır

### B-İŞ-22 — Stok bilgisinin kaynağı yok
- **Boşluk:** Şemada `stock` alanı var (MEMORY §4). Panel `fields` listesinde stok alanı yok. Stoğun nereden geleceği ve sitede gösterilip gösterilmeyeceği belirsiz.
- **Neden önemli:** Kaynağı olmayan bir stok göstergesi ya yanlış bilgi verir ya da hiç işlemez. Ayrıca "tükendi" rozeti ve filtresi tasarlanmalı mı, buna da bağlı.
- **Seçenekler:** (1) Stok gösterilmez; alan veri katmanında ileride kullanılmak üzere tutulur. (2) Elle güncellenen bir "satışta/satış dışı" bayrağı.
- **Öneri:** (1) + (2): Elle tutulan bir yayın bayrağı (`isActive`) olur, stok adedi gösterilmez.
- **Bloke ettiği faz:** Faz 1 (şema), Faz 2 (rozet seti)
- **Soru gerekli mi:** Hayır

### B-İŞ-23 — Kategori ağacının sahibi ve kapsamı
- **Boşluk:** Kategori ağacı panelden mi alınacak, yoksa Türkiye için yeniden mi kurgulanacak, belirsiz. Panel ağacı Rusça ve geniş bir ağaç. MEMORY'deki "kozmetik, hijyen, ev, bebek, sağlık, tekstil, ayakkabı, mutfak" kategorilerinin hepsinin sitede yer alıp almayacağı da yazılmamış.
- **Neden önemli:** URL yapısı (SEO), mega menü, ikonlu kategori şeridi ve filtre setleri bu ağaca bağlı. Ağaç sonradan değişirse URL'ler ve yönlendirmeler bozulur.
- **Seçenekler:** (1) Kendi Türkçe ağacımız olur; panel kategorileri buna eşlenir. Yalnızca en az bir yayında ürünü olan kategori görünür. (2) Panel ağacı birebir kullanılır.
- **Öneri:** (1). Ağaç Faz 1'de seo-uzmani ve veri-muhendisi'nin envanterine göre önerilir; boş kategori gösterilmez.
- **Bloke ettiği faz:** Faz 1
- **Soru gerekli mi:** Hayır

### B-İŞ-24 — Alt markaların rolü
- **Boşluk:** Carich, Easylove, iLife, Kardli, Nilrich, Sealuxe, Yibelle ve diğer alt markaların navigasyon ekseni mi, filtre mi, yoksa sadece ana sayfadaki "markalar" şeridi mi olacağı belirsiz. Her alt marka için logo ve kısa hikâye var mı, o da bilinmiyor.
- **Neden önemli:** Marka sayfaları ayrı bir sayfa şablonu ve URL demek. Logo yoksa "markalar" şeridi tasarlanamaz.
- **Seçenekler:** (1) Filtre ve ürün kartında etiket; ana sayfada logo şeridi (logo varsa). (2) Ayrı marka sayfaları. (3) Hiç vurgulanmaz.
- **Öneri:** (1). Marka sayfaları sonraki aşamaya kalır. Logolar veri envanterinden kontrol edilir; yoksa şerit yazıyla tasarlanır.
- **Bloke ettiği faz:** Faz 1 (sayfa haritası), Faz 2
- **Soru gerekli mi:** Hayır

### B-İŞ-25 — "(Kutu başına N adet)" ve toptan/perakende birimi
- **Boşluk:** Addan çıkarılan `boxQty` bilgisinin müşteriye ne anlama geldiği belirsiz: Fiyat tek adet için mi, kutu için mi? Müşteri tek adet alabilecek mi?
- **Neden önemli:** Fiyat bir koli/kutu içinse müşteriye yanlış birim fiyat gösterilir. Sepette adet seçicinin davranışı da (1'er mi, kutu katları mı) buna bağlı.
- **Seçenekler:** (1) Fiyat tek ürün içindir; `boxQty` yalnızca bilgi alanıdır, gerekirse gösterilmez. (2) Satış kutu bazındadır.
- **Öneri:** Veri envanterinde fiyatın birimi teyit edilsin (veri-muhendisi'ne devir). Varsayılan (1).
- **Bloke ettiği faz:** Faz 1 (veri sözleşmesi)
- **Soru gerekli mi:** Hayır. S-öneri 3 içinde kullanıcıya bir alt madde olarak eklenebilir.

---

## 6. Marka, alan adı ve "resmî site" izlenimi

### B-İŞ-26 — Greenleaf ad ve logosunun bağımsız distribütör sitesinde kullanımı
- **Boşluk:** K-009 "logo değişmez" diyor ama logonun bu sitede kullanılmasına izin olup olmadığını söylemiyor. EKIP §4'teki izin yalnızca global.green-leaf.shop'un veri, görsel ve tasarım dili kaynağı olarak kullanımını kapsıyor. Alan adında "greenleaf" geçip geçmeyeceği ve sitenin "resmî Greenleaf Türkiye" izlenimi verip vermeyeceği ele alınmamış.
- **Neden önemli:** Resmî site izlenimi vermek marka hakkı ve haksız rekabet riski yaratır, Greenleaf ile ilişkiyi tehlikeye atar. Alan adı değişirse SEO, e-posta ve yönlendirmeler yeniden kurulur. Header'daki logo bileşeni de site adına göre tasarlanır: yalnız Greenleaf logosu mu, yoksa distribütör kelime markası + "Greenleaf ürünleri" mi?
- **Seçenekler:** (1) Greenleaf logosu kullanılır + header ve footer'da görünür bir "Bağımsız Greenleaf Distribütörü" ibaresi; alan adı distribütörü öne çıkarır. (2) Site distribütörün kendi kelime markasıyla açılır, Greenleaf ürün markası olarak geçer. (3) Alan adı "greenleaf…" olur, site resmî gibi görünür. Önerilmez.
- **Öneri:** (1). Greenleaf'in distribütör siteleri için yazılı bir marka kullanım kuralı varsa ona uyulur. Alan adı ve izin durumu kullanıcıdan bir kez sorulur.
- **Bloke ettiği faz:** Faz 1 (site adı), Faz 2 (header/logo)
- **Soru gerekli mi:** **Evet** (S-öneri 2 ile birleşik)

### B-İŞ-27 — "Resmî" görünen içerik: sertifika rozetleri
- **Boşluk:** MEMORY §7 "görsel sertifika rozetleri + tıklanabilir belgeler" istiyor, ancak ISO/GMP/Helal belgelerinin elimizde olup olmadığı belirsiz. Bekleyen girdiler listesinde (§11) de yok.
- **Neden önemli:** Belge olmadan rozet koymak, MEMORY'nin rakiplerde eleştirdiği "kanıtsız iddia"nın aynısıdır ve aldatıcı reklam riski taşır. Belge yoksa ürün detayındaki ve güven şeridindeki bileşenler başka bir şekilde tasarlanmalı.
- **Seçenekler:** (1) Belgeler gelirse rozet + belge görüntüleyici. (2) Gelmezse rozet yok; güven şeridi doğrulanabilir bilgilerle kurulur ("Türkiye'de ithal / TİTCK bildirimli" gibi; bunlar da **doğrulanmalı**).
- **Öneri:** Belge kopyası (PDF/görsel) varsa iletilsin; yoksa (2). Tasarımda rozet alanı opsiyonel bir bileşen olur.
- **Bloke ettiği faz:** Faz 2
- **Soru gerekli mi:** **Evet** (S-öneri 7)

---

## 7. İçerik, test ve değerlendirmeler

### B-İŞ-28 — Ürün değerlendirmeleri (yorum) backend yokken
- **Boşluk:** MEMORY §7 "ürün sayfasında değerlendirme alanı" istiyor. Backend yokken yorum toplanamaz, gösterilecek gerçek yorum da yok.
- **Neden önemli:** Uydurma yorum ya da puan göstermek açıkça yanıltıcıdır; genel bilgi düzeyinde haksız ticari uygulama sayılır (**doğrulanmalı**). Boş bir yorum alanı ise "kimse almamış" algısı yaratır.
- **Seçenekler:** (1) Bu fazda yorum alanı canlıda görünmez; bileşen tasarlanır, bayrakla kapalı tutulur. (2) "İlk yorumu siz yazın" ile boş alan. (3) Örnek yorumlar. Kesinlikle önerilmez.
- **Öneri:** (1). Yapılandırılmış veride `aggregateRating` kullanılmaz.
- **Bloke ettiği faz:** Faz 1 (kapsam), Faz 2
- **Soru gerekli mi:** Hayır

### B-İŞ-29 — Blog / cilt bakımı rehberi içeriğini kim üretecek?
- **Boşluk:** Blog "sonra" listesinde. Ancak referans akışında (MEMORY §7) ana sayfada "haberler/içerik" bölümü var. Yazar, yayın sıklığı ve yayın açılışında kaç yazı olacağı tanımsız.
- **Neden önemli:** İçeriği olmayan bir ana sayfa bölümü boş kalır ya da sonradan kaldırılır, wireframe değişir. Blog yazıları da TİTCK iddia kurallarına tabi.
- **Seçenekler:** (1) Açılışta blog yok; ana sayfadaki içerik bölümü bayrakla gizlenir. (2) Açılışta içerik editörünün yazdığı 3 rehber yazısı. (3) Düzenli üretim.
- **Öneri:** (1). Bölüm tasarlanır ama veri yoksa render edilmez (esnek vitrin ilkesi, K-008).
- **Bloke ettiği faz:** Faz 1
- **Soru gerekli mi:** Hayır

### B-İŞ-30 — "Cildine uygun ürünü bul" testinin kapsamı ve veri ihtiyacı
- **Boşluk:** Test "sonra" listesinde ama rakiplerden ayrışan iki fikirden biri (MEMORY §9). Hangi ürün gruplarını kapsayacağı (sadece cilt bakımı mı, saç/vücut da mı?), ürün ile cilt tipi eşleşmesinin kaynağı ve bu eşleşmeyi kimin yapacağı tanımsız.
- **Neden önemli:** Test, ürün şemasında `skinType[]`, `concern[]` gibi alanlar gerektirir. Bu alanlar şimdi ayrılmazsa test fazında bütün ürün verisi yeniden işlenir. Eşleşme mantığı da tıbbi iddia sınırına yakındır.
- **Seçenekler:** (1) Test sonraki aşamada yapılır, yalnızca yüz/cilt bakımı ürünlerini kapsar; şemada alanlar şimdiden opsiyonel olarak ayrılır. (2) Test ilk yayında yer alır.
- **Öneri:** (1). Eşleştirme etiketlerini ürün metni yazılırken içerik editörü doldurur.
- **Bloke ettiği faz:** Faz 1 (şema)
- **Soru gerekli mi:** Hayır

### B-İŞ-31 — Favori ve karşılaştırma özellikleri
- **Boşluk:** MEMORY §7, referans siteden "favori/karşılaştırma/sepet sayaçları"nın alınmasını söylüyor ama bu özellikler sayfa listesinde yok. Backend yokken favoriler yalnızca o cihazda tutulabilir.
- **Neden önemli:** Header'daki ikon sayısı, ürün kartındaki aksiyonlar ve ek sayfalar (favoriler, karşılaştırma) buna bağlı.
- **Seçenekler:** (1) Favori var (localStorage, ayrı liste sayfası/drawer); karşılaştırma yok. (2) İkisi de var. (3) İkisi de yok.
- **Öneri:** (1). Karşılaştırma kozmetik perakendede düşük değerli ve "toptancı" hissi veriyor.
- **Bloke ettiği faz:** Faz 1 (sayfa haritası), Faz 2 (header, kart)
- **Soru gerekli mi:** Hayır

---

## 8. Yasal asgari koşullar (frontend aşamasında bile)

### B-İŞ-32 — MEMORY §10'daki "frontend aşamasında gerekmez" varsayımı kısmen hatalı
- **Boşluk:** MEMORY §10 bütün yasal maddeleri tam e-ticarete ertelemiş. Oysa ödeme kapalıyken bile sitede şunlar olacak: fiyat gösterimi, sepet, (varsa) analitik ve (varsa) form. Satış yapılmasa bile en az şu sayfa ve bileşenlerin gerekip gerekmediği değerlendirilmeli:
  - **Künye / iletişim (satıcı kimliği):** Genel bilgi düzeyinde, 6563 sayılı Elektronik Ticaretin Düzenlenmesi Hakkında Kanun ve ilgili yönetmelik, hizmet sağlayıcının kimlik ve iletişim bilgilerini sitede erişilebilir kılmasını öngörüyor. Ödemesiz bir sitenin bu kapsama girip girmediği **doğrulanmalı**. Girmese bile, B-İŞ-26'daki "resmî site değil" algısı için gerekli.
  - **KVKK aydınlatma metni:** Sunucu logları, Vercel ve analitik nedeniyle bir minimum metin muhtemelen gerekli. **Doğrulanmalı.**
  - **Çerez bildirimi / onayı:** Yalnızca çerezsiz analitik + zorunlu localStorage (sepet) kullanılırsa basit bir bilgilendirme yeterli olabilir; çerezli analitik (GA4) kullanılırsa onay banner'ı gerekebilir. **Doğrulanmalı.**
  - **Mesafeli satış sözleşmesi, ön bilgilendirme, cayma, iade:** Ödeme açılana kadar gerekmez. Ancak checkout tasarımında bu metinlerin bağlanacağı yerler (onay kutuları, linkler) Faz 2'de ayrılmalı.
- **Neden önemli:** Bu sayfalar sayfa haritasını ve footer'ı değiştirir. Analitik seçimi çerez banner'ının var olup olmayacağını belirler; banner tasarımı da Faz 2 işidir.
- **Seçenekler:** (1) İlk yayında künye/iletişim + KVKK aydınlatma + çerez politikası (çerezsiz analitikle, banner'sız) yer alır. (2) Yasal sayfa olmadan yayın.
- **Öneri:** (1). Metinlerin bir uzmana kontrol ettirilmesi yayın kontrol listesine eklenir. MEMORY §10'daki ifade "satış öncesi yasal paket" ve "frontend yayın asgarisi" olarak ikiye ayrılsın (KARAR-KAYDI'na ÖNERİ).
- **Bloke ettiği faz:** Faz 1 (sayfa haritası), Faz 4 (yayın)
- **Soru gerekli mi:** Hayır. İçerik B-İŞ-03'ün cevabından gelir.

---

## 9. Yayın takvimi

### B-İŞ-33 — 16 Kasım 2026 açılışı ile sitenin yayın takvimi arasında ilişki tanımsız
- **Boşluk:** Türkiye açılışı yarın (16 Kasım 2026, MEMORY §1). Proje ise Faz 0'da ve önünde dört kullanıcı kapısı var. Açılış tarihinin sitenin hedef tarihi olup olmadığı, sitenin bir son tarihi olup olmadığı ve açılış döneminin (ilk haftalar, ilk kampanyalar) kaçırılmasının iş açısından ne kadar maliyetli olduğu yazılmamış.
- **Neden önemli:** Tam site 16 Kasım'a fiziksel olarak yetişmez. Bir son tarih varsa kapsam (MVP) ona göre küçültülmeli; bu Faz 1 PRD'sinin ana girdisi. Açılış tanıtımı tam bu günlerde yapılıyorsa, aşamalı bir yayın (önce tek sayfa) üyelik kazanımını erkene çekebilir. Ama tek sayfalık bir yayın bile kod ister ve Kapı 2 kuralıyla çelişir.
- **Seçenekler:** (1) Son tarih yok; site fazlar tamamlanınca yayınlanır. (2) Hedef tarih (ör. Aralık sonu) ve buna göre küçültülmüş MVP kapsamı. (3) Aşamalı yayın: önce marka uyumlu tek sayfa ("yakında" + üye ol + iletişim), sonra tam site. Bu, Kapı 2 kuralının bilinçli bir istisnası olarak kayda geçer.
- **Öneri:** (2). Gerçekçi bir hedef tarih kullanıcıdan alınsın. Açılış dönemi kritikse (3) değerlendirilsin; o durumda tek sayfa yalnızca sponsor linki geldikten sonra açılır.
- **Bloke ettiği faz:** Faz 1 (kapsam ve takvim)
- **Soru gerekli mi:** **Evet** (S-öneri 1)

### B-İŞ-34 — Açılış dönemine özel fiyat ve kampanya içeriği
- **Boşluk:** Açılışta Greenleaf'in kampanya veya fiyat değişikliği yapıp yapmayacağı bilinmiyor; sitedeki fiyatlar Ağustos verisine dayanıyor.
- **Neden önemli:** Bayat fiyat yayınlamak güven ve hukuk riski taşır (B-İŞ-07). Kampanya olacaksa "kampanya" vitrin bloğu ve rozeti gerekir.
- **Seçenekler:** Yayından hemen önce zorunlu bir fiyat yenileme adımı + kampanyalar ancak kaynakla birlikte girer.
- **Öneri:** Yukarıdaki. "Kampanya" rozeti ve bloğu esnek vitrinin bir parçası olarak tasarlanır, veri yoksa görünmez.
- **Bloke ettiği faz:** Faz 4
- **Soru gerekli mi:** Hayır

---

## 10. Analitik ve başarı ölçütleri

### B-İŞ-35 — Başarı ölçütleri ve analitik aracı tanımsız
- **Boşluk:** Sitenin başarılı olup olmadığına nasıl karar verileceği, hangi analitik aracın kullanılacağı ve hangi olayların ölçüleceği yazılmamış.
- **Neden önemli:** Ödeme kapalıyken ana dönüşüm "üye ol linkine tıklama". Ama asıl kayıt Greenleaf tarafında gerçekleştiği için site bunu ölçemez; ancak distribütör panelindeki yeni kayıt sayısıyla karşılaştırılabilir. Araç seçimi çerez banner'ını belirler (B-İŞ-32). GA4 seçilirse banner ve onay yönetimi Faz 2 işi olur.
- **Seçenekler:** (1) Çerezsiz bir araç (ör. Vercel Web Analytics) + özel olaylar: `uyelik_cta_tik`, `uyelik_dis_link_tik`, `sepete_ekle`, `odeme_yakinda_goruntulendi`, `liste_kopyala`. (2) GA4 + onay banner'ı. (3) Analitik yok.
- **Öneri:** (1). Başarı ölçütleri: aylık üyelik linki tıklaması, sepete ekleme oranı ve paneldeki yeni kayıtlar (elle karşılaştırma). Hedef rakamlar ilk ayın verisinden sonra belirlenir.
- **Bloke ettiği faz:** Faz 1 (kabul kriterleri), Faz 2 (banner varlığı)
- **Soru gerekli mi:** Hayır

---

## 11. Dil, para birimi ve katalog

### B-İŞ-36 — Çok dillilik
- **Boşluk:** Yalnız Türkçe mi olacak, belirsiz. Türkiye'de Rusça konuşan alıcı kitlesi ve Greenleaf'in BDT kökenli üye ağı düşünüldüğünde RU/EN ihtiyacı akla gelebilir.
- **Neden önemli:** Çok dillilik URL yapısını (`/ru/`), veri şemasını (alan başına dil) ve tüm içerik iş yükünü değiştirir. Sonradan eklemek pahalı.
- **Seçenekler:** (1) Yalnız TR, TRY; dil öneki yok. Metinler yine de tek bir içerik katmanında toplanır. (2) TR + RU.
- **Öneri:** (1). Rusça kaynak metinler veri katmanında ham olarak saklanır; ileride RU eklemek kolaylaşır.
- **Bloke ettiği faz:** Faz 1
- **Soru gerekli mi:** Hayır

### B-İŞ-37 — Site ve katalogun ortak veri kaynağı (MEMORY §2) bu fazda ne gerektiriyor?
- **Boşluk:** "Site ve katalog aynı ürün verisinden beslenmeli" ilkesi var. Ama katalogun bu fazda üretilip üretilmeyeceği ve veri şemasının baskıya özgü ihtiyaçları (yüksek çözünürlüklü görsel, katalog sırası/sayfa grubu, kısa baskı metni) belirsiz.
- **Neden önemli:** Bu alanlar şemaya şimdi konmazsa katalog güncellemesi yapılırken veri yeniden yapılandırılır. Öte yandan katalog üretimi Faz 1–4 kapsamına girerse iş yükü büyür.
- **Seçenekler:** (1) Bu fazda katalog üretilmez; şema yalnızca baskıyı engellemeyecek alanlarla (görsel kaynağı/çözünürlüğü, sıralama, kısa metin) genişletilir. (2) Katalog üretimi bu fazın kapsamına alınır.
- **Öneri:** (1). Katalog ayrı bir iş olarak kayda geçer.
- **Bloke ettiği faz:** Faz 1 (şema)
- **Soru gerekli mi:** Hayır

---

## 12. Kullanıcıya sorulması önerilenler (etki sırasına göre)

> Her biri tek satırda cevaplanabilir. Parantez içinde önerimiz var. S-001..S-004 tekrar edilmedi.

1. **(B-İŞ-33) Sitenin canlıya çıkması için bir hedef tarih var mı, 16 Kasım açılış dönemi için önce tek sayfalık bir "yakında + üye ol" sayfası ister misiniz?** (Öneri: tam site için gerçekçi bir hedef tarih verin; açılış dönemi kritikse sponsor linki gelince tek sayfa açılsın.)
2. **(B-İŞ-03, B-İŞ-26) Sitede satıcı olarak hangi ad/unvan ve iletişim bilgisi görünecek, alan adı belli mi ve Greenleaf logosunu bu sitede kullanma izniniz (tercihen yazılı) var mı?** (Öneri: "[Ad Soyad / Unvan] — Bağımsız Greenleaf Distribütörü" + iletişim e-postası; alan adı sizi öne çıkarsın; logo izinle kullanılsın.)
3. **(B-İŞ-05, B-İŞ-06, B-İŞ-25) Panelde gördüğünüz fiyat üye fiyatı mı, üye olmayan bir müşteri Greenleaf'ten gerçekten bu fiyatın iki katına mı alıyor ve fiyat tek adet için mi?** (Öneri: evetse "Fiyat / Üye fiyatı" üstü çizilmeden yan yana; değilse yalnız üye fiyatı gösterilsin.)
4. **(B-İŞ-14) Ödeme kapalıyken almak isteyen müşteri ne yapsın: sepeti bir alışveriş listesi olarak alıp üye olarak Greenleaf'ten mi sipariş versin, yoksa sizinle e-postayla mı iletişime geçsin?** (Öneri: alışveriş listesi + üyeliğe yönlendirme; kişisel veri toplanmaz.)
5. **(B-İŞ-19, B-İŞ-20) İlk yayına hangi ürünler girsin?** (Öneri: 37 ürün + yeni gelenler; yalnızca Türkiye'de satışta olan, Türkçe metni ve görseli hazırlanmış ürünler. Gıda takviyesi/sağlık ürünleri uzman kontrolünden sonra eklensin.)
6. **(B-İŞ-11) Üyelik ücreti, ilk alım şartı ve indirim oranı için paylaşabileceğiniz resmî bir Türkçe kaynak var mı?** (Öneri: varsa sayfa onu özetlesin; yoksa koşullar yazılmasın, "üyelere özel fiyat" denip resmî sayfaya yönlendirilsin.)
7. **(B-İŞ-27) ISO/GMP/Helal vb. sertifika belgelerinin kopyalarına erişiminiz var mı?** (Öneri: yoksa sitede sertifika rozeti kullanılmasın.)

## 13. Soru sormadan varsayılan olarak önerilen kararlar

> Kullanıcı Kapı 0/1'de itiraz etmezse `KARAR-KAYDI.md`'ye `ÖNERİ` olarak girer.

- **Kitle önceliği:** Müşteri > potansiyel üye > portföy izleyicisi; portföy için sitede ayrı bir bölüm yok, yalnızca footer'da opsiyonel imza (B-İŞ-01, 04).
- **Değer önerisi:** "Türkçe, net fiyatlı keşif + üyelikle indirimli alışveriş"; Faz 1'de 2–3 varyant (B-İŞ-02).
- **Fiyat:** KDV dahil, kaynaktaki fiyatla, yuvarlama yok; "fiyatlar … tarihinde güncellendi" notu; birim fiyat alanı şemada (B-İŞ-07).
- **PV:** Müşteriye gösterilmez (B-İŞ-08).
- **Sponsor:** Link + kopyalanabilir kod; tek yapılandırma değeri; link test edilmeden yayın yok (B-İŞ-09).
- **Üye ol sayfası:** Açıklayıcı ara sayfa işlevi görür, yeni sekmede dış link (B-İŞ-10).
- **Dil kuralı:** Kazanç, ekip ve gelir vaadi yok; yalnızca indirimli alışveriş avantajı anlatılır (B-İŞ-12).
- **Hesap:** Bu fazda site hesabı/giriş yok; "Üye ol / Üye girişi" Greenleaf'e dış link (B-İŞ-13).
- **Checkout:** Ekranlar tasarlanır ve bayrak arkasında kodlanır; ödeme açılana kadar canlıda kişisel veri alınmaz (B-İŞ-15).
- **E-posta toplama:** Bu fazda yok (B-İŞ-16).
- **"Yakında" metni:** Tarihsiz ve dürüst (B-İŞ-17).
- **SEO:** Indexlenir; Offer/fiyat işaretlemesi ödeme açılana kadar satın alınabilir gibi verilmez; Merchant yok (B-İŞ-18).
- **Ürün metni:** İçerik editörü Rusçadan yeniden yazar; kullanıcı 3–5 örneği onaylar (B-İŞ-21).
- **Stok:** Gösterilmez; elle tutulan bir `isActive` bayrağı (B-İŞ-22).
- **Kategori ağacı:** Bizim Türkçe ağacımız, panel kategorileri buna eşlenir, boş kategori gizlenir (B-İŞ-23).
- **Alt markalar:** Filtre + etiket + (logo varsa) şerit; ayrı marka sayfası yok (B-İŞ-24).
- **Yorumlar:** Bu fazda canlıda yok; uydurma yorum/puan kesinlikle yok (B-İŞ-28).
- **Blog:** Açılışta yok; ana sayfadaki içerik bölümü veri yoksa gizli (B-İŞ-29).
- **Cilt testi:** Sonraki aşama; şemada `skinType`/`concern` alanları şimdiden opsiyonel (B-İŞ-30).
- **Favori:** Var (localStorage); karşılaştırma yok (B-İŞ-31).
- **Yasal asgari koşullar:** İlk yayında künye/iletişim + KVKK aydınlatma + çerez politikası; satış öncesi yasal paket ayrı (B-İŞ-32).
- **Kampanya:** Yayın öncesi zorunlu fiyat yenileme; kampanya bloğu yalnızca veri varsa görünür (B-İŞ-34).
- **Analitik:** Çerezsiz analitik + üyelik tıklaması olayları; GA4 yok, dolayısıyla onay banner'ı yok (B-İŞ-35).
- **Dil/para birimi:** Yalnız TR, TRY; dil öneki yok (B-İŞ-36).
- **Katalog:** Bu fazda üretilmez; şema baskıya engel olmayacak alanlarla genişletilir (B-İŞ-37).

## 14. Tespit edilen çelişkiler

| # | Çelişki | Kaynaklar | Önerilen çözüm |
|---|---|---|---|
| Ç-01 | Site "satış sitesi" olarak tanımlanıyor ama bu fazda ödeme yok, alternatif sipariş kanalı da yasak/tanımsız. Pratikte site bir "katalog + üyelik hunisi". | MEMORY §1 ↔ §2, K-005, K-010 | B-İŞ-14 (S-öneri 4) ile çözülür; Faz 1 PRD'sinde sitenin bu fazdaki işlevi dürüstçe "keşif + üyelik" olarak yazılır. |
| Ç-02 | "×2 liste fiyatı + üstü çizili/indirim algısı" ile MEMORY'nin rakiplerde eleştirdiği "reklam edilen ama yansımayan indirim" ve "kanıtsız iddia" ilkesi çelişiyor. Hesaplanmış bir fiyat, kanıtsız bir indirim olabilir. | MEMORY §6, K-007 ↔ §7 | B-İŞ-05 (S-öneri 3). |
| Ç-03 | "Yarı fiyatına almak için üye ol" vaadi var ama üyelik koşulları (ücret, alım şartı) bilinmiyor. | MEMORY §7 ↔ §11 | B-İŞ-11 (S-öneri 6). |
| Ç-04 | Ürün sayfasında "değerlendirme alanı" isteniyor ama backend yok. | MEMORY §7 ↔ §2 | B-İŞ-28: bu fazda canlıda yok. |
| Ç-05 | "Tıklanabilir belgelerle sertifika rozetleri" isteniyor ama belgeler bekleyen girdiler arasında yok. | MEMORY §7 ↔ §11 | B-İŞ-27 (S-öneri 7). |
| Ç-06 | "Favori/karşılaştırma sayaçları" alınacaklar arasında, sayfa listesinde ise karşılık yok. | MEMORY §7 ↔ §2 | B-İŞ-31. |
| Ç-07 | "Yasal sayfalar frontend aşamasında gerekmez" deniyor, ama çerez onayı (analitik) ve satıcı kimliği yayın anında gerekebilir; checkout'ta veri alınması da KVKK'yı tetikler. | MEMORY §10 ↔ §2 (checkout akışı), §11 | B-İŞ-32: §10 "frontend yayın asgarisi" ve "satış öncesi paket" olarak ikiye bölünsün. |
| Ç-08 | §5 brandbook ve logo SVG'yi "alınmış" olarak anıyor, §11 ise bunları "bekleyen girdi" listesinde tutuyor. EKIP §4 de PDF'leri "brandbook adayı, doğrulanacak" diye niteliyor. | MEMORY §5 ↔ §11, EKIP §4 | Veri envanteri (G-003) doğrulasın; MEMORY §11 buna göre güncellensin (Orkestratör). |
| Ç-09 | Üç fiyat kaynağı var (panel API, xlsx, Ağustos kataloğu) ve hangisinin doğru olduğu tanımlı değil. MEMORY yalnız katalog ve paneli anıyor, EKIP xlsx'i fiyat ₺ + PV ile listeliyor. | MEMORY §6 ↔ EKIP §4 | B-İŞ-06: envanterde karşılaştırma tablosu. |
| Ç-10 | Şemada `stock` alanı var ama panel `fields` listesinde stok yok. | MEMORY §4 ↔ §6 | B-İŞ-22. |
| Ç-11 | CLAUDE.md'ye göre kodlama Kapı 2'den önce başlamaz; 16 Kasım açılışı ise acil bir yayın beklentisi doğurabilir. Aşamalı yayın seçilirse bu kurala bilinçli bir istisna gerekir. | CLAUDE.md kural 1 ↔ MEMORY §1 | B-İŞ-33 (S-öneri 1); istisna seçilirse KARAR-KAYDI'na ayrıca yazılsın. |
| Ç-12 | "Bu kişiye bu siteyi yaptım" ifadesi sitenin bir müşteri için yapıldığını düşündürüyor; diğer ifadeler distribütörün kullanıcının kendisi olduğunu düşündürüyor. Onay yetkisi ve künye buna bağlı. | MEMORY §1 | B-İŞ-03 (S-öneri 2). |
| Ç-13 | "Üye ol" (Greenleaf üyeliği) ile "Giriş/kayıt, hesabım" (site hesabı) aynı kavram gibi listelenmiş; header'daki kullanıcı ikonu belirsiz kalıyor. | MEMORY §2 | B-İŞ-13. |
| Ç-14 | "Sağlık" kategorisi ürün kapsamında, ama mevzuat notu yalnız kozmetik ve TİTCK'yi anıyor; gıda takviyelerinin farklı rejimi göz ardı edilmiş. | MEMORY §6 ↔ §10, CLAUDE.md kural 6 | B-İŞ-20. |

---

*Bu belge sabit değildir. Kullanıcı cevapları geldikçe ilgili girişler "ÇÖZÜLDÜ → K-xxx" olarak işaretlenir.*
