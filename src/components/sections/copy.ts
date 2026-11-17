/**
 * Developer B copy accessor: ui.tr.json (via @/lib/ui-text) first, then the DRAFT strings below.
 * Every key here is requested from icerik-editoru (devir: 2026-11-16_frontend-gelistirici_icerik-editoru_
 * ana-sayfa-pdp-bulucu-metinleri.md). As soon as a key lands in data/content/ui.tr.json it wins automatically;
 * delete it here afterwards. Drafts reuse wireframe texts where the plan had one. No claims, no earnings language.
 */
import { t as base, tc, type TextVars } from "@/lib/ui-text";

export { tc };

const DRAFT: Record<string, string> = {
  "common.railPrev": "Önceki ürünler",
  "common.railNext": "Sonraki ürünler",
  "home.hero.eyebrow": "Greenleaf artık Türkiye'de",
  "home.categories.eyebrow": "Raflar",
  "home.showcase1.eyebrow": "Hemen sepete",
  "home.pvBand.eyebrow": "Puan değeri",
  "home.premium.cta": "Koleksiyonu keşfet",
  "home.finderBand.cta": "Bulucuyu aç",
  "home.manifesto.heading": "Greenleaf'in yaklaşımı",
  "home.manifesto.quote": "Doğadan ilham alan formüller, her gün için özenli bakım.",
  "home.story.cta": "Hikâyemiz",
  "home.showcase2.eyebrow": "Katalog",
  "home.showcase2.allIn": "Tüm {kategori} ürünleri",
  "home.membership.eyebrow": "Üyelik",
  "home.trust.prices": "Fiyat ve üye fiyatı her üründe açıkça yazılı",
  "product.breadcrumb.aria": "Konum",
  "product.collectionLink": "{koleksiyon} koleksiyonundan",
  "product.onlineSoon": "Online alışveriş çok yakında; sepetini şimdiden hazırlayabilirsin.",
  "product.section.setContents": "Set içeriği",
  "product.section.relatedTr": "Türkiye'de satışta benzerleri",
  "product.detail.barcode": "Barkod",
  "product.related.emptyTr": "Bu kategoride Türkiye'de satışta olan ürün henüz yok.",
  "product.stickyBar.similar": "Benzerlerini gör",
  "finder.panel.aria": "Seçimlerin",
  "finder.view.aria": "Sonuç görünümü",
  "finder.profile.skin": "cilt",
  "finder.profile.sensitive": "Hassasiyet var",
  "finder.email.soon.title": "Sonucunu e-postayla al",
  "finder.email.soon.body": "Sonucunu saklamak için bu sayfanın bağlantısını kopyalayabilirsin.",
  "pv.hero.eyebrow": "Puan değeri",
  "pv.example.formula": "PV × adet = toplam PV",
  "pv.soon.title": "Türkiye'ye yakında ürünlerde de PV var",
  "pv.scene.title": "Sepetindeki PV'ler toplanır",
  "pv.scene.body": "Her ürünün PV'si sepetinde toplanır; toplam PV üyeliğindeki alışveriş hacmini gösterir.",
  "certificates.soonIntro": "Greenleaf'in üretim ve kalite belgeleri. Her rozet, ilgili belgeyi PDF olarak açar.",
  "membership.hero.eyebrow": "Üyelik",
  "legal.pending": "Bu sayfa çok yakında yayında.",
  // moved sections
  "about.manifesto.title": "Yaklaşımımız",
  "about.contact.email": "E-posta",
  "about.contact.phone": "Telefon",
  "about.trust.title": "Neden bize güvenebilirsin",
  // /sss (K-269)
  "sss.title": "Sık sorulan sorular",
  "sss.eyebrow": "Yardım",
  "sss.intro": "Alışveriş, üye fiyatı, PV ve ürünler hakkında en çok sorulanlar burada.",
  "sss.search.label": "Soru ara",
  "sss.search.placeholder": "Sorularda ara",
  "sss.search.empty": "Bu aramaya uygun soru bulunamadı.",
  "sss.search.clear": "Aramayı temizle",
  "sss.search.count": "{count} soru bulundu",
  "sss.tabs.aria": "Soru kategorileri",
  "sss.soon": "Sorular hazırlanıyor. Çok yakında burada.",
  "sss.notFound.title": "Aradığını bulamadın mı?",
  "sss.notFound.body": "Hakkımızda sayfasında bize ulaşabileceğin yollar yer alıyor.",
  "sss.notFound.cta": "Hakkımızda ve iletişim",
  "membership.panel.title": "Üyelikle neler değişir?",
};

export function t(key: string, vars?: TextVars): string {
  const v = base(key, vars);
  if (v !== key) return v;
  const d = DRAFT[key];
  return d ? d.replace(/\{(\w+)\}/g, (m, k: string) => (vars && k in vars ? String(vars[k]) : m)) : key;
}
