# Ekip, Roller ve İş Akışı

## 1. Kadro

| # | Ajan (`.claude/agents/`) | Rol | Model | Sahip olduğu çıktılar |
|---|---|---|---|---|
| 0 | *Ana oturum* | **Orkestratör** — kullanıcıyla tek temas, görev dağıtımı, kapı yönetimi | session | `GOREV-PANOSU.md`, `KARAR-KAYDI.md` |
| 1 | `proje-yoneticisi` | **Proje yöneticisi** & planlama lideri — gereksinim, sayfa haritası, akışlar, kabul kriterleri, faz takibi. **Asla kod yazmaz.** | opus | `docs/plan/` |
| 2 | `pazar-arastirmaci` | UX & pazar araştırması — referans/rakip siteler, Greenleaf tasarım dili | sonnet | `docs/arastirma/` |
| 3 | `veri-muhendisi` | Ürün verisi — kazıma, API, temizleme, şema, görseller | sonnet | `data/`, `scripts/data/`, `public/products/` |
| 4 | `icerik-editoru` | Türkçe içerik & yerelleştirme — ürün metinleri, mikro metin, mevzuat uyumu | sonnet | `data/content/`, `docs/icerik/` |
| 5 | `ui-tasarimci` | UI/görsel tasarım — token'lar, tasarım kuralları, bileşen spesifikasyonları | opus | `docs/tasarim/`, `design/` |
| 6 | `hareket-tasarimcisi` | Animasyon/etkileşim geliştiricisi — motion sistemi, mikro etkileşimler | opus | `docs/tasarim/hareket.md`, `src/lib/motion/`, `src/components/motion/` |
| 7 | `frontend-mimar` | Teknik lider — mimari, veri katmanı, kod standartları, kod incelemesi | opus | proje iskeleti, `src/lib/` (motion/seo hariç), konfigürasyon |
| 8 | `frontend-gelistirici` | Sayfa & bileşen geliştirici | sonnet | `src/app/`, `src/components/` (motion hariç) |
| 9 | `seo-uzmani` | Teknik SEO & web performansı | sonnet | `docs/seo/`, `src/lib/seo/`, sitemap/robots/metadata |
| 10 | `kalite-denetcisi` | QA — kabul kriterleri, erişilebilirlik, mobil, performans, tasarım sapması | opus | `docs/qa/` |

> Bir ajanın sahip olmadığı dosyada değişiklik gerekiyorsa: dosyaya dokunmaz, sahibine devir notu bırakır.

## 2. Fazlar ve kapılar

```
FAZ 0  Keşif & veri         pazar-arastirmaci ║ veri-muhendisi ║ proje-yoneticisi (soru listesi)
          │
          ▼  KAPI 0 — Kullanıcı: araştırma raporu + veri envanteri görüldü, açık sorular cevaplandı
FAZ 1  Planlama             proje-yoneticisi (+ seo-uzmani: URL/bilgi mimarisi, icerik-editoru: ses tonu)
          │                 Çıktı: PRD, sayfa haritası, kullanıcı akışları, bölüm bölüm wireframe tarifi, kabul kriterleri
          ▼  KAPI 1 — Kullanıcı: "Ne yapacağımız" onaylandı → KARAR-KAYDI güncellenir
FAZ 2  Tasarım              ui-tasarimci ║ hareket-tasarimcisi ║ frontend-mimar (teknik tasarım) ║ icerik-editoru (metinler)
          │                 Çıktı: token'lar, tasarim-kurallari.md, bileşen spesifikasyonları, motion spesifikasyonu,
          │                 Claude Design ekranları → HTML export → design/
          ▼  KAPI 2 — Kullanıcı: tasarım onaylandı. (Bu kapıdan sonra plan değişikliği = değişiklik talebi)
FAZ 3  Geliştirme           frontend-mimar (iskelet, önce) → frontend-gelistirici ║ hareket-tasarimcisi ║ seo-uzmani
          │                 Her sayfa: geliştir → mimar incelemesi → kalite denetimi
          ▼  KAPI 3 — Kullanıcı: Vercel önizlemesi incelendi
FAZ 4  Denetim & yayın      kalite-denetcisi + seo-uzmani son denetim → Vercel prod
```

> **Güncelleme (K-043, 2026-11-16):** Claude Design → HTML export adımı iptal. Faz 2 tasarımı doğrudan kodda (Next.js önizleme) yapılır; Kapı 2 onayı önizleme üzerinden verilir. K-046: "yakında" sayfası Faz 1 ile paralel kodlanır.

**Kural:** Faz 3'te ortaya çıkan plan eksikliği → ilgili iş durmaz, `ACIK-SORULAR.md`'ye "DEĞİŞİKLİK TALEBİ" olarak düşülür; Orkestratör kullanıcıya etkisiyle (süre/maliyet) birlikte sunar.

## 3. İletişim protokolü

Ajanlar birbirlerinin bağlamını görmez; ortak hafıza **dosyalardır**.

| Dosya | Amaç | Kim yazar |
|---|---|---|
| `docs/ekip/KARAR-KAYDI.md` | Tüm kararlar: `TASLAK` → `ÖNERİ` → `ONAYLI` | Ajan ÖNERİ ekler, Orkestratör kullanıcı onayıyla ONAYLI yapar |
| `docs/ekip/ACIK-SORULAR.md` | Kullanıcıya sorulacaklar (her soruda ajanın **önerisi** olmalı) | Herkes |
| `docs/ekip/GOREV-PANOSU.md` | Kim ne yapıyor, ne bekliyor | Orkestratör |
| `docs/ekip/devir/` | Ajandan ajana devir notları (`_SABLON.md`) | Herkes |

**Her ajan görev başında:** CLAUDE.md → EKIP.md → KARAR-KAYDI.md → kendisine adresli açık devir notları (`devir/` içinde `kime: <ajan-adi>`, `durum: AÇIK`).
**Görev sonunda:** çıktılarını yazar, gerekiyorsa devir notu bırakır, kendine gelen notları `KAPANDI` yapar ve Orkestratöre standart rapor döner:

```
## Rapor: <ajan>
Üretilen/değişen dosyalar: ...
Kayda geçen öneriler (KARAR-KAYDI): ...
Açık sorular (ACIK-SORULAR): ...
Devir notları: ...
Durum: TAMAM / KISMİ / BLOKE (neden)
```

## 4. Veri kaynakları
Yerel (üst klasör `../`, salt okunur):
- `greenleaf-katalog.html` / `greenleaf-katalog.pdf` — Ağustos kataloğu (37 TR-aktif ürün, görseller base64 gömülü)
- `greenleaf-turkiye-urunler.xlsx` — ID, ürün kodu, barkod, TR ad, kategori, fiyat ₺, PV, görsel URL
- `Kitap1.xlsx`, `2504021013y5XQ9b1Qzy.pdf` (12 sf.), `25012312341bNuhS7mZ8_kopyası.pdf` (2 sf.) — içerik doğrulanacak (brandbook adayı)
- `converted-images.zip` — SVG'ler (logo/ikon adayı); kartvizit zip'leri — marka uygulama örnekleri (kişisel bilgi içerir, sitede kullanılmaz)

Web:
- `https://global.green-leaf.shop` — resmî Rusça mağaza (OpenCart): veri, görsel, SVG, tasarım dili. Kullanım izni var.
- `https://greenleaf-global.com` — ana sistem; giriş gerektirir. Kullanıcının kendi tarayıcısı üzerinden ve **kullanıcı izniyle** gezilir; şifre/oturum bilgisi hiçbir dosyaya yazılmaz.

Kazıma kibar yapılır: istekler arası bekleme, önbellek (`.cache/`), aynı kaynağı iki kez indirmeme.
