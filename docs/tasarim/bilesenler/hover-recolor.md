# Bileşen / Davranış — Hover ile dinamik renk geçişi (`RecolorZone`)

> ui-tasarimci · v1 · 2026-11-16 · Dayanak: **K-066** (belirli alanlarda ürün/set hover'ında vurgu renkleri yumuşak geçişle o ürünün paletine döner; kontrast korunur; reduced-motion'da anlık/devre dışı; dokunmatikte tetiklenmez), K-065, K-070 · ÖNERİ K-075
> Bu belge **ne** değiştiğini ve kuralları tanımlar. **Zamanlama, eğri ve koreografi hareket-tasarimcisi'ndedir** (devir notu).

## 1. Kavram
Bir `RecolorZone` kapsayıcısı, içindeki **tetikleyici** (palet verisi olan ürün/set kartı) hover veya klavye odağı aldığında, kendi kapsamındaki **aksan değişkenlerini** o ürünün `palette.resolved` değerlerine geçirir. Tetik bitince varsayılana döner. Bölge dışındaki sayfa etkilenmez.

## 2. Bölgeler (ilk sürüm: 3)
| # | Bölge | Tetikleyiciler | Görünür etki |
|---|---|---|---|
| Z1 | **Mega menü paneli** | Sağ sütundaki öne çıkan ürün/set kartı | Sağ sütun zemini (`--accent-soft`), panel alt thin bandı (`--stripe-*`), seçili kök çubuğu (`--accent-decor`) |
| Z2 | **Header** (Z1 ile bağlı) | Z1'in tetikleyicisi (mega menü açıkken) | Header üst thin bandı (`--stripe-*`), açık "Kategoriler" düğmesinin zemini (`--accent-soft`) |
| Z3 | **Ana sayfa vitrin bölümleri** (Vitrin 1, Vitrin 2) | Rayda/ızgarada paleti olan her ürün kartı | Bölüm zemini (`--accent-soft`; beyaz başlıyorsa beyazdan tint'e), bölüm eyebrow'u (`--accent-text`), eyebrow altındaki inline bant, bölüm köşesindeki LeafCluster (`--accent-decor`, `-3`) |
Diğer bölgeler (kategori sayfası ızgarası vb.) bu sürümde **yoktur**. Gerekçe: listede çok sayıda kart hızlı geçilir ve sürekli renk değişimi göz yorar. Ana sayfada etki vitrin anı olarak kalır.

## 3. Değişen ve değişmeyen token'lar
**Değişir (yalnız bunlar):** `--accent-soft`, `--accent-line`, `--accent-decor`, `--accent-decor-2`, `--accent-decor-3`, `--accent-text`, `--stripe-1/2/3`.
**Asla değişmez:** `--accent` / `--on-accent` (dolu düğmeler), birincil düğme, üye fiyatı rozeti, fiyat ve gövde metni (`ink`), PV çipi, odak halkası, header ikonları, logo.
Gerekçe: K-066 "vurgu renkleri" der; CTA ve fiyatın renk değiştirmesi 40+ kitlede güveni ve tanınırlığı bozar.

## 4. Kontrast koruması
- Değişen tek metin token'ı `--accent-text`'tir ve `palette.resolved` içinde **hem beyaz hem `--accent-soft`** karşısında ≥ 4.6:1 olarak önceden doğrulanmıştır (`tokens.json › paletteDerivation`).
- Bölge zemini değişse de üzerindeki metin `ink` kalır. `ink`, türetilmiş her soft karşısında ≥ 10.4'tür.
- Geçiş sırasında ara renkler de güvenlidir: soft değerleri beyaza %90 yakındır, ara değerler de ink için ≥ 10'dur. `--accent-text` ara değerleri iki güvenli renk arasında kalır. Geçiş süresince her iki uç ≥ 4.6 olduğundan pratikte ≥ 4.5 korunur. Bu, birim testte örnek paletlerle ara noktalarda (t=0.25/0.5/0.75) doğrulanır.
- Paleti olmayan ürün hiçbir şeyi tetiklemez (bölge marka renginde kalır).
- WCAG 2.3.1: geçişler yanıp sönme üretmez. İki tetikleyici arasında hızlı geçişte doğrudan yeni palete gidilir, önce varsayılana dönülmez.

## 5. Girdi yöntemlerine göre davranış
| Girdi | Davranış |
|---|---|
| Fare / ince işaretçi (`(hover:hover) and (pointer:fine)`) | Tetikleyici üzerinde niyet gecikmesinden sonra başlar. Bölgeden çıkınca bırakma gecikmesinden sonra döner (süreler → hareket-tasarimcisi) |
| Klavye | Tetikleyici `:focus-visible` aldığında aynı etki uygulanır (eşit deneyim). Odak bölgeden çıkınca döner |
| Dokunmatik (`hover:none` veya `pointer:coarse`) | **Hiç tetiklenmez.** Dokunma doğrudan bağlantıya gider. Kaydırma sırasında renk değişmez |
| Kalem/hibrit | Gerçek hover olayı varsa fare gibi, yoksa dokunmatik gibi davranır |
| `prefers-reduced-motion: reduce` | **Devre dışı** (renk değişmez). K-066 "anlık/devre dışı" seçeneklerinden devre dışı önerilir; büyük zemin alanlarının ani değişimi de rahatsız edici olabilir. Kullanıcı önizlemede "anlık" seçeneğini de görebilir |
| `prefers-contrast: more` / zorlanmış renkler | Devre dışı |

## 6. Teknik çerçeve (frontend-mimar / hareket-tasarimcisi)
- Değişen değişkenler `@property --accent-soft { syntax: '<color>'; inherits: true; initial-value: … }` ile kaydedilir. Böylece CSS `transition` ile renk değişkenleri yumuşak geçer. Kaydı desteklemeyen tarayıcıda anlık değişim olur (kabul edilebilir yedek).
- Palet değerleri tetikleyicide `data-palette` / `style` olarak bulunur. Bölge, etkin tetikleyicinin değerlerini kendi `style`'ına yazar (küçük bir istemci bileşeni). JS yalnız hover/focus olayı dinler; animasyon CSS'tedir.
- Performans: yalnız `background-color`, `border-color` ve SVG `fill` boyanır, layout değişmez. Bölge zemini büyük alansa boyama maliyeti hareket-tasarimcisi tarafından ölçülür (INP ≤ 200 ms).

## 7. Kabul kriteri
- Paleti olan bir kartta hover/odak → bölgede yalnız §3'teki token'lar değişir. Düğme, rozet ve fiyat değişmez.
- Dokunmatik emülasyonda hiçbir renk değişmez.
- Reduced-motion açıkken hiçbir renk değişmez.
- Örnek 4 palet için geçişin 5 noktasında `--accent-text` ≥ 4.5 (otomatik test).
- Paletsiz kart bölgeyi değiştirmez.

## 8. Hareket noktaları (→ hareket-tasarimcisi)
Niyet ve bırakma gecikmesi · renk geçiş süresi ve eğrisi · ardışık tetikleyiciler arası doğrudan geçiş · Z1 ile Z2'nin eşzamanlılığı · LeafCluster'ın renk değişirken hafif "nefes" alması (isteğe bağlı) · ölçüm (boyama maliyeti).
