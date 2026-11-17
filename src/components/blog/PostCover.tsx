import Image from "next/image";
import { useId } from "react";
import { IconBadge, PaperLeaf, PaperShadow, PatternLeafLines, PatternSeedDots, type BadgeGlyph } from "@/components/illustrations";
import { getStockImage } from "@/lib/images";
import type { Post } from "./source";

/**
 * Post cover. Real cover -> next/image (local /public/blog/... or remote). Missing cover -> original paper-cut
 * artwork from the SVG library (K-175, K-185 reference language): 8 compositions that differ in leaf species,
 * layout, ground tone and pattern, plus a topic medallion. No radial fan (evokes the logo mark, tasarim-kurallari §9.2)
 * and no signature stripe (max one per screen, §9.1 — TASARIM-INCELEME-1 C-1/C-2).
 * Opaque paper layers + `PaperShadow`; token classes only (ground = Tailwind colour utilities).
 */
type LeafSpec = { species: "oval" | "lance" | "heart" | "skeleton"; tone: "forest" | "deep" | "green" | "sand" | "earth"; x: number; y: number; r: number; l: number; w: number; stem?: number };
type Badge = { x: "left" | "right"; y: "top" | "bottom" };
type Variant = {
  ground: string;
  /** text colour feeds currentColor (pattern lines) */
  ink: string;
  pattern?: "dots" | "lines";
  leaves: LeafSpec[];
  badge: Badge;
  badgeTone: "forest" | "green" | "earth" | "sand" | "cream";
};

const VARIANTS: Variant[] = [
  // 0 - forest ground, big skeleton leaf low-left, upright oval right
  {
    ground: "bg-forest-700", ink: "text-cream-100", pattern: "lines",
    leaves: [
      { species: "skeleton", tone: "sand", x: 190, y: 470, r: 34, l: 330, w: 96 },
      { species: "oval", tone: "forest", x: 470, y: 430, r: -8, l: 280, w: 82 },
      { species: "heart", tone: "green", x: 560, y: 440, r: 28, l: 150, w: 62, stem: 20 },
    ],
    badge: { x: "left", y: "top" }, badgeTone: "cream",
  },
  // 1 - cream ground, three parallel lances at staggered heights
  {
    ground: "bg-cream-100", ink: "text-earth-600", pattern: "dots",
    leaves: [
      { species: "lance", tone: "sand", x: 210, y: 450, r: -6, l: 320, w: 50, stem: 20 },
      { species: "lance", tone: "earth", x: 330, y: 470, r: 4, l: 380, w: 56, stem: 20 },
      { species: "lance", tone: "forest", x: 450, y: 440, r: 12, l: 290, w: 48, stem: 20 },
    ],
    badge: { x: "right", y: "top" }, badgeTone: "forest",
  },
  // 2 - sand ground, two large hearts overlapping
  {
    ground: "bg-sand-300", ink: "text-earth-700",
    leaves: [
      { species: "heart", tone: "earth", x: 250, y: 440, r: -14, l: 300, w: 120, stem: 40 },
      { species: "heart", tone: "forest", x: 400, y: 450, r: 18, l: 250, w: 100, stem: 40 },
    ],
    badge: { x: "right", y: "bottom" }, badgeTone: "cream",
  },
  // 3 - earth ground, sand skeleton + lance crossing
  {
    ground: "bg-earth-700", ink: "text-sand-300", pattern: "lines",
    leaves: [
      { species: "skeleton", tone: "sand", x: 440, y: 470, r: -28, l: 350, w: 100 },
      { species: "lance", tone: "sand", x: 150, y: 430, r: 22, l: 300, w: 46, stem: 20 },
      { species: "oval", tone: "deep", x: 300, y: 450, r: 4, l: 200, w: 64 },
    ],
    badge: { x: "left", y: "bottom" }, badgeTone: "sand",
  },
  // 4 - green ground, pair of upright ovals + low skeleton
  {
    ground: "bg-green-800", ink: "text-cream-50", pattern: "dots",
    leaves: [
      { species: "oval", tone: "forest", x: 230, y: 470, r: -10, l: 340, w: 90 },
      { species: "oval", tone: "deep", x: 380, y: 480, r: 10, l: 300, w: 84 },
      { species: "lance", tone: "sand", x: 540, y: 450, r: 30, l: 240, w: 44, stem: 16 },
    ],
    badge: { x: "left", y: "top" }, badgeTone: "cream",
  },
  // 5 - pale ground, one very large heart off-centre
  {
    ground: "bg-cream-50", ink: "text-forest-700", pattern: "lines",
    leaves: [
      { species: "heart", tone: "forest", x: 430, y: 470, r: 10, l: 360, w: 150, stem: 40 },
      { species: "oval", tone: "sand", x: 170, y: 450, r: -22, l: 200, w: 62 },
    ],
    badge: { x: "left", y: "top" }, badgeTone: "forest",
  },
  // 6 - deep forest, diagonal row of lances
  {
    ground: "bg-forest-900", ink: "text-cream-100",
    leaves: [
      { species: "lance", tone: "green", x: 120, y: 470, r: 40, l: 280, w: 44, stem: 16 },
      { species: "lance", tone: "sand", x: 250, y: 480, r: 28, l: 330, w: 50, stem: 16 },
      { species: "lance", tone: "forest", x: 400, y: 480, r: 16, l: 340, w: 52, stem: 16 },
      { species: "lance", tone: "earth", x: 540, y: 470, r: 4, l: 270, w: 44, stem: 16 },
    ],
    badge: { x: "right", y: "top" }, badgeTone: "green",
  },
  // 7 - sand ground, big skeleton on the right + small hearts
  {
    ground: "bg-sand-300", ink: "text-earth-600", pattern: "dots",
    leaves: [
      { species: "skeleton", tone: "earth", x: 420, y: 480, r: -16, l: 380, w: 120 },
      { species: "heart", tone: "green", x: 160, y: 440, r: -20, l: 170, w: 70, stem: 20 },
      { species: "heart", tone: "forest", x: 250, y: 460, r: 14, l: 130, w: 56, stem: 16 },
    ],
    badge: { x: "left", y: "top" }, badgeTone: "earth",
  },
];

const hash = (s: string) => [...s].reduce((h, ch) => (h * 31 + ch.charCodeAt(0)) >>> 0, 7);

/** Topic -> (composition, glyph). Keyword-led so related posts read as a family but never identical; hash is the fallback. */
const TOPICS: { re: RegExp; variant: number; glyph: BadgeGlyph }[] = [
  { re: /(^|-)pil(-|$)/, variant: 7, glyph: "set" },
  { re: /atik|geri-donusum/, variant: 3, glyph: "sprout" },
  { re: /etiket|ecolabel|sertifika/, variant: 5, glyph: "certificate" },
  { re: /temiz|ev-/, variant: 1, glyph: "jar" },
  { re: /plastik|ambalaj/, variant: 6, glyph: "leaf" },
  { re: /cilt|su-|nem/, variant: 4, glyph: "drop" },
  { re: /yil|konferans|haber/, variant: 0, glyph: "book" },
];

/** Known cover-less posts get one distinct composition each (no two cards alike); new posts fall back to the hash. */
const FIXED: Record<string, number> = {
  "cevre-etiketi-yaniltmasi-nasil-anlasilir": 5,
  "klorsuz-ve-nazik-ev-temizligi": 1,
  "sicak-ev-kuru-hava-cilt-bakimi": 4,
  "atik-ayirma-ve-geri-donusum-rehberi": 3,
  "pil-ayirma-ve-geri-donusum": 7,
  "cevre-dostu-ev-icin-basit-adimlar": 2,
  "daha-az-plastik-ambalaj-ipuclari": 6,
  "eu-ecolabel-ile-bilincli-alisveris": 0,
};

function pick(post: Post): { v: Variant; glyph: BadgeGlyph } {
  const h = hash(post.slug);
  const topic = TOPICS.find((t) => t.re.test(post.slug));
  const idx = FIXED[post.slug] ?? (topic ? topic.variant : h % VARIANTS.length);
  const glyph = topic?.glyph ?? (["leaf", "sprout", "drop", "book", "jar", "set"] as const)[h % 6]!;
  return { v: VARIANTS[idx]!, glyph };
}

function CoverArt({ post, className = "" }: { post: Post; className?: string }) {
  const sh = `${useId()}-sh`;
  const { v, glyph } = pick(post);
  const pos = `${v.badge.y === "top" ? "top-4" : "bottom-4"} ${v.badge.x === "left" ? "left-4" : "right-4"}`;
  return (
    <div className={`relative overflow-hidden ${v.ground} ${v.ink} ${className}`} aria-hidden="true">
      {v.pattern && (
        <div className="pointer-events-none absolute inset-0">
          {v.pattern === "dots" ? <PatternSeedDots strength={0.4} /> : <PatternLeafLines strength={0.14} />}
        </div>
      )}
      <svg viewBox="0 0 640 400" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 size-full" fill="none" focusable="false">
        <defs>
          <PaperShadow id={sh} d={0.8} />
        </defs>
        {v.leaves.map((leaf, i) => (
          <PaperLeaf key={i} {...leaf} shadow={sh} />
        ))}
      </svg>
      <IconBadge glyph={glyph} tone={v.badgeTone} interact="spin" className={`absolute size-14 sm:size-16 ${pos}`} />
    </div>
  );
}

export function PostCover({
  post,
  sizes,
  priority = false,
  className = "",
}: {
  post: Post;
  sizes: string;
  priority?: boolean;
  /** sizing/aspect classes for the frame, e.g. "aspect-[16/10]" */
  className?: string;
}) {
  // K-270: real cover > licensed stock cover (blog.cover.<slug>) > paper-cut artwork
  const stock = post.cover ? null : getStockImage(`blog.cover.${post.slug}`);
  if (stock) {
    return (
      <div className={`relative overflow-hidden bg-surface-muted ${className}`}>
        <Image
          src={stock.src}
          alt=""
          fill
          sizes={sizes}
          priority={priority}
          className="object-cover"
          placeholder={stock.blurDataURL ? "blur" : "empty"}
          blurDataURL={stock.blurDataURL}
        />
      </div>
    );
  }
  if (!post.cover) return <CoverArt post={post} className={className} />;
  const remote = /^https?:\/\//.test(post.cover.src);
  return (
    <div className={`relative overflow-hidden bg-surface-muted ${className}`}>
      <Image
        src={post.cover.src}
        alt={post.cover.alt || ""}
        fill
        sizes={sizes}
        priority={priority}
        unoptimized={remote}
        // Source covers carry ~4% white letterbox bands top/bottom; a 10% zoom crops them (data fix requested).
        className="scale-110 object-cover"
      />
    </div>
  );
}
