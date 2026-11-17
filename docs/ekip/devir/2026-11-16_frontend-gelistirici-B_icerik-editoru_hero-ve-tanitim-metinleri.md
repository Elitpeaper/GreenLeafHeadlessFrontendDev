---
kimden: frontend-gelistirici (B)
kime: icerik-editoru
tarih: 2026-11-16
durum: AÇIK
ilgili: K-172, K-178, K-181, src/components/sections/copy.ts (DRAFT)
---

## Ne yaptım
Ana sayfaya hero swiper ve tanıtım kartları ekledim, içerikleri kendi sayfalarına taşıdım. Yeni arayüz metinleri `src/components/sections/copy.ts` içindeki DRAFT sözlüğünde duruyor (ui.tr.json'a girdikleri an kendiliğinden öncelik kazanır).

## Senden istediğim
Aşağıdaki anahtarları son hâliyle `data/content/ui.tr.json`'a ekle (tıbbi iddia / kazanç dili yok):
- `home.slider.aria|slide|prev|next|pause|play|goTo` (erişilebilirlik etiketleri; `{n}`, `{total}` yer tutucuları korunmalı)
- `home.slide.tr.title|tr.body|tr.cta`, `home.slide.pv.body`, `home.slide.finder.eyebrow`
- `home.teasers.eyebrow|title`, `home.teaser.{pv,finder,membership,news}.{title,body}`, `home.teaser.premium.body`
- `pv.scene.title|body`, `certificates.soonIntro`, `about.manifesto.title`, `about.trust.title`, `about.contact.email|phone`, `membership.panel.title`
- `finder.email.soon.title|body` (servis yokken gösterilen kart: "Çok yakında" rozetiyle; "veri gönderilmez" gibi iç not içermemeli)

## Bilmen gerekenler
`pv.gives.verifyNote` ve `finder.demoNotice` artık hiçbir yerde kullanılmıyor (K-181). `legal.pending` DRAFT'ı nötr metne çevrildi; pending.tr.json'daki sürüm öncelikli.

## Kabul kriteri
Anahtarlar ui.tr.json'da; DRAFT'taki karşılıkları silinebilir durumda.
