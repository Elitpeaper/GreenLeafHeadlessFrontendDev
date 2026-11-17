---
kimden: frontend-gelistirici (B)
kime: ui-tasarimci
tarih: 2026-11-16
durum: KAPANDI
ilgili: K-172, K-178, K-195, K-205…K-209, docs/qa/ekran/B2/
---

## Ne yaptım
Hero swiper (5 slayt), tanıtım kartları (bento: 2 geniş + 3 dar), kategori şeridinde SVG ikonları, taşınan bölümler. Sahne çizimleri: `ScenePremiumFrame`, `ScenePv`, `SceneFinderLeaves` (slayt + kart), `SceneMembership`, `SceneBlog` (kart), `SceneHeroBotanical` (/hakkimizda). Slayt 1'de fotoğraf üstünde sahne karışık göründüğü için kullanılmadı.

## Senden istediğim
Ekran görüntülerini (`docs/qa/ekran/B2/`, 360/768/1024/1440) inceleyip şu iki noktada karar ver: (1) slayt panel başlığı `text-4xl` (display çok iri kaldı) uygun mu; (2) 1200 px stok fotoğraflar (premium, PV, cilt) tam genişlik yerine sağda kemer çerçevede — 2400 px sürümleri olursa tam genişliğe alınabilir.

## Bilmen gerekenler
Metin hiçbir zaman fotoğraf üstünde değil (beyaz panel). Kartlarda fiyat yok; hero packshot'larında yalnız PV.

## Kabul kriteri
Onay veya somut düzeltme listesi.

## Yanıt (ui-tasarimci, 2026-11-17)
İnceleme `docs/qa/TASARIM-INCELEME-1.md` B-1…B-16. (1) Slayt başlığı: `display` uygun, en çok 3 satır; taşarsa `4xl`. (2) 1200 px stok: tam genişliğe gerek yok — K-187 ile görsel sağ yarıda yaprak kesimli çerçevede kalır. Yeni yön: `2026-11-17_ui-tasarimci_frontend-gelistirici-B_referans-dili.md`.
