import type { ComponentType } from "react";
import type { IllustrationProps, SvgInteract } from "./base";
import {
  IconApparel,
  IconBodyCare,
  IconHairCare,
  IconHealth,
  IconHomeCleaning,
  IconKitchenFood,
  IconMakeup,
  IconMotherChild,
  IconOralCare,
  IconSets,
  IconSkinCare,
  IconHygienePaper,
} from "./category-icons";
import { DividerDrops, DividerLeafDiamond, DividerLeafVine, DividerStripeLeaf, DividerWave, DividerWaveLayers } from "./dividers";
import {
  EmptyCart,
  EmptyCertificate,
  EmptyCookie,
  EmptyDocument,
  EmptyFavorites,
  EmptyMail,
  EmptyNews,
  EmptyNotFound,
  EmptySearch,
  EmptyShield,
} from "./empty-states";
import { PatternDrops, PatternLeafLines, PatternLeafScatter, PatternLeafVeinEmboss, PatternSeedDots } from "./patterns";
import { LeafHeartSpecimen, LeafLanceSpecimen, LeafOvalSpecimen, LeafSkeletonSpecimen, SceneHeroLeaves } from "./botanical";
import { PanelLeafSegments, TextureGrain } from "./textures";
import { BadgeBook, BadgeCertificate, BadgeDrop, BadgeJar, BadgeLeaf, BadgeMember, BadgePv, BadgeSet, BadgeSprout } from "./badges";
import { SceneBlog, SceneFinderLeaves, SceneHeroBotanical, SceneMembership, ScenePremiumFrame, ScenePv } from "./scenes";

/** Registry used by /svg-kutuphanesi and the hand-off note. `label` is Turkish (UI), `use` = suggested placement. */
export type IllustrationEntry = {
  name: string;
  label: string;
  Component: ComponentType<IllustrationProps>;
  interact: SvgInteract;
  use: string;
};

export type IllustrationGroup = { key: string; title: string; note: string; items: IllustrationEntry[] };

export const ILLUSTRATION_GROUPS: IllustrationGroup[] = [
  {
    key: "kategori",
    title: "Kategori ikonları",
    note: "12 ana kategori · 48 px ızgara · çift ton",
    items: [
      { name: "IconSkinCare", label: "Cilt Bakımı", Component: IconSkinCare, interact: "bloom", use: "Kategori şeridi, mega menü" },
      { name: "IconMakeup", label: "Makyaj", Component: IconMakeup, interact: "bloom", use: "Kategori şeridi, mega menü" },
      { name: "IconHairCare", label: "Saç Bakımı", Component: IconHairCare, interact: "bloom", use: "Kategori şeridi, mega menü" },
      { name: "IconBodyCare", label: "Vücut Bakımı", Component: IconBodyCare, interact: "bloom", use: "Kategori şeridi, mega menü" },
      { name: "IconOralCare", label: "Ağız ve Diş Bakımı", Component: IconOralCare, interact: "bloom", use: "Kategori şeridi, mega menü" },
      { name: "IconSets", label: "Setler", Component: IconSets, interact: "bloom", use: "Kategori şeridi, mega menü" },
      { name: "IconHomeCleaning", label: "Ev ve Temizlik", Component: IconHomeCleaning, interact: "bloom", use: "Kategori şeridi, mega menü" },
      { name: "IconMotherChild", label: "Anne ve Çocuk", Component: IconMotherChild, interact: "bloom", use: "Kategori şeridi, mega menü" },
      { name: "IconHygienePaper", label: "Hijyen ve Kâğıt", Component: IconHygienePaper, interact: "bloom", use: "Kategori şeridi, mega menü" },
      { name: "IconHealth", label: "Sağlık ve Takviye", Component: IconHealth, interact: "bloom", use: "Kategori şeridi, mega menü" },
      { name: "IconKitchenFood", label: "Mutfak ve Gıda", Component: IconKitchenFood, interact: "bloom", use: "Kategori şeridi, mega menü" },
      { name: "IconApparel", label: "Giyim ve Aksesuar", Component: IconApparel, interact: "bloom", use: "Kategori şeridi, mega menü" },
    ],
  },
  {
    key: "sahne",
    title: "Büyük sahneler",
    note: "Hero katmanları ve sayfa başlıkları",
    items: [
      { name: "SceneHeroBotanical", label: "Botanik hero", Component: SceneHeroBotanical, interact: "parallax", use: "Ana sayfa hero slaytları, kategori başlık bandı" },
      { name: "ScenePv", label: "PV sahnesi", Component: ScenePv, interact: "bloom", use: "/pv-nedir hero, ana sayfa PV kartı" },
      { name: "SceneMembership", label: "Üyelik", Component: SceneMembership, interact: "bloom", use: "/uye-ol hero, üyelik CTA bölümü" },
      { name: "ScenePremiumFrame", label: "Premium altın çerçeve", Component: ScenePremiumFrame, interact: "draw", use: "Premium koleksiyon başlığı, gold set kartı (yalnız premium-gold)" },
      { name: "SceneFinderLeaves", label: "Cilt tipi bulucu", Component: SceneFinderLeaves, interact: "sway", use: "/cilt-tipine-gore hero, bulucu tanıtım kartı" },
      { name: "SceneBlog", label: "Blog ve haberler", Component: SceneBlog, interact: "bloom", use: "/blog ve /haberler başlığı, içerik kartı yedeği" },
    ],
  },
  {
    key: "ayirici",
    title: "Bölüm ayırıcılar",
    note: "Dalga = yüzey geçişi; imza çizgi bandı düz kalır",
    items: [
      { name: "DividerWave", label: "Yumuşak dalga", Component: DividerWave, interact: "sway", use: "Beyaz → surface-muted geçişi" },
      { name: "DividerWaveLayers", label: "Katmanlı dalga", Component: DividerWaveLayers, interact: "parallax", use: "Hero altı, footer üstü" },
      { name: "DividerLeafVine", label: "Yaprak sarmaşığı", Component: DividerLeafVine, interact: "draw", use: "Aynı zeminli iki bölüm arası, blog yazısı" },
      { name: "DividerLeafDiamond", label: "Yaprak elmas", Component: DividerLeafDiamond, interact: "bloom", use: "Başlık altı süsü; gold tonu premium sayfada" },
      { name: "DividerStripeLeaf", label: "Çizgi bandı + yaprak", Component: DividerStripeLeaf, interact: "draw", use: "Bölüm sonu imzası (ekran başına 1)" },
      { name: "DividerDrops", label: "Damla dizisi", Component: DividerDrops, interact: "parallax", use: "Cilt bakımı içerikleri, SSS öncesi" },
    ],
  },
  {
    key: "desen",
    title: "Arka plan desenleri",
    note: "Döşenebilir · %4–10 görünürlük",
    items: [
      { name: "PatternLeafScatter", label: "Dağınık yapraklar", Component: PatternLeafScatter, interact: "parallax", use: "Üyelik paneli, kampanya karosu" },
      { name: "PatternSeedDots", label: "Tohum noktaları", Component: PatternSeedDots, interact: "parallax", use: "Metin panelleri arkası, footer" },
      { name: "PatternLeafLines", label: "Çizgi yapraklar", Component: PatternLeafLines, interact: "parallax", use: "Blog, hakkımızda başlıkları" },
      { name: "PatternDrops", label: "Damlalar", Component: PatternDrops, interact: "parallax", use: "Cilt tipi bulucu bandı" },
    ],
  },
  {
    key: "bos",
    title: "Çok yakında ve boş durumlar",
    note: "Her zaman başlık + tek eylem metniyle birlikte",
    items: [
      { name: "EmptyShield", label: "KVKK kalkanı", Component: EmptyShield, interact: "bloom", use: "/kvkk çok yakında" },
      { name: "EmptyCookie", label: "Çerez", Component: EmptyCookie, interact: "spin", use: "/cerez-politikasi çok yakında" },
      { name: "EmptyDocument", label: "Belge / sözleşme", Component: EmptyDocument, interact: "draw", use: "/yasal/* çok yakında" },
      { name: "EmptyCertificate", label: "Sertifika", Component: EmptyCertificate, interact: "bloom", use: "/sertifikalar belge bekleniyor" },
      { name: "EmptyMail", label: "E-posta", Component: EmptyMail, interact: "bloom", use: "Bulucu e-posta kartı, iletişim" },
      { name: "EmptyNews", label: "Blog / haber", Component: EmptyNews, interact: "draw", use: "/blog, /haberler boş" },
      { name: "EmptyCart", label: "Sepet boş", Component: EmptyCart, interact: "sway", use: "Sepet drawer boş durumu" },
      { name: "EmptySearch", label: "Arama sonucu yok", Component: EmptySearch, interact: "parallax", use: "/arama, filtre sonucu yok" },
      { name: "EmptyFavorites", label: "Favoriler boş", Component: EmptyFavorites, interact: "bloom", use: "/favoriler boş" },
      { name: "EmptyNotFound", label: "404", Component: EmptyNotFound, interact: "sway", use: "not-found.tsx" },
    ],
  },
  {
    key: "referans",
    title: "Referans dili: kâğıt kesimi yapraklar, doku, rozetler",
    note: "v1.2 · orman zemini üzerinde · K-186…K-188",
    items: [
      { name: "SceneHeroLeaves", label: "Katmanlı hero yaprakları", Component: SceneHeroLeaves, interact: "parallax", use: "Hero slaytı sağ yarısı (metin solda), sayfa hero'ları" },
      { name: "LeafOvalSpecimen", label: "Oval yaprak", Component: LeafOvalSpecimen, interact: "sway", use: "Hero katmanı, karo köşesi · tone: forest|deep|green|sand|earth" },
      { name: "LeafLanceSpecimen", label: "Mızrak yaprak", Component: LeafLanceSpecimen, interact: "sway", use: "Hero katmanı, dar sütun süsü" },
      { name: "LeafHeartSpecimen", label: "Kalp yaprak", Component: LeafHeartSpecimen, interact: "sway", use: "Üyelik / PV karosu köşesi" },
      { name: "LeafSkeletonSpecimen", label: "İskelet yaprak (damar ağı)", Component: LeafSkeletonSpecimen, interact: "sway", use: "Hero ön katmanı, hikâye bölümü" },
      { name: "PanelLeafSegments", label: "Yaprak dilimli panel", Component: PanelLeafSegments, interact: "draw", use: "Ana sayfa değer paneli (3–4 sütun), PV adımları" },
      { name: "PatternLeafVeinEmboss", label: "Kabartma yaprak damarı", Component: PatternLeafVeinEmboss, interact: "parallax", use: "Orman zeminli bölüm arkası" },
      { name: "TextureGrain", label: "Keçe / kâğıt dokusu", Component: TextureGrain, interact: "parallax", use: "Orman zemini, karolar, footer (statik)" },
      { name: "BadgeLeaf", label: "Rozet · yaprak", Component: BadgeLeaf, interact: "spin", use: "Kategori / doğal içerik karosu" },
      { name: "BadgeSprout", label: "Rozet · filiz", Component: BadgeSprout, interact: "spin", use: "Hikâye, yeni ürünler" },
      { name: "BadgeDrop", label: "Rozet · damla", Component: BadgeDrop, interact: "spin", use: "Cilt tipi bulucu karosu" },
      { name: "BadgePv", label: "Rozet · PV", Component: BadgePv, interact: "spin", use: "PV nedir karosu" },
      { name: "BadgeMember", label: "Rozet · üyelik", Component: BadgeMember, interact: "spin", use: "Üye ol karosu" },
      { name: "BadgeCertificate", label: "Rozet · sertifika", Component: BadgeCertificate, interact: "spin", use: "Sertifikalar karosu" },
      { name: "BadgeBook", label: "Rozet · blog", Component: BadgeBook, interact: "spin", use: "Blog / haberler karosu" },
      { name: "BadgeSet", label: "Rozet · set", Component: BadgeSet, interact: "spin", use: "Setler / premium karosu" },
      { name: "BadgeJar", label: "Rozet · kavanoz", Component: BadgeJar, interact: "spin", use: "Cilt bakımı karosu" },
    ],
  },
];
