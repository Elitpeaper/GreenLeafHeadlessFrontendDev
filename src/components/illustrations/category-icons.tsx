import type { ReactNode } from "react";
import { C, Leaf, Part, Svg, ink, leafD, sparkD, type IllustrationProps } from "./base";

/**
 * 12 root-category icons (K-050 roots), 48 px grid, duotone:
 *   blob   — leaf-shaped tint behind (accent-decor-3 @35 %), the "bloom" target
 *   fill   — translucent colour inside the object (second tone)
 *   line   — 2 px ink line art (currentColor)
 *   accent — small leaf / drop / sparkle that pops on hover
 * Render at 32–48 px (stroke reads ≈ 1.75 px at 40 px, matching the Lucide UI set).
 */
type Parts = { tint?: ReactNode; line: ReactNode; accent?: ReactNode };

function CategoryIcon({ name, tint, line, accent, interact = "bloom", ...props }: IllustrationProps & Parts & { name: string }) {
  return (
    <Svg viewBox="0 0 48 48" name={name} interact={interact} {...props}>
      <Part n="blob" o="20% 90%">
        <path d={leafD(40, 17)} transform="translate(32 45) rotate(-38)" fill={C.lime} fillOpacity={0.3} />
      </Part>
      {tint && (
        <Part n="fill" i={1}>
          {tint}
        </Part>
      )}
      <Part n="line" i={2}>
        <g {...ink} strokeWidth={2}>
          {line}
        </g>
      </Part>
      {accent && (
        <Part n="accent" i={3} o="50% 100%">
          {accent}
        </Part>
      )}
    </Svg>
  );
}

const op = { fillOpacity: 0.32 } as const;

export const IconSkinCare = (p: IllustrationProps) => (
  <CategoryIcon
    name="cat-cilt-bakimi"
    tint={<path d="M14 26h20v8a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4Z" fill={C.green} {...op} />}
    line={
      <>
        <rect x="13" y="14" width="22" height="6" rx="2" />
        <path d="M14 20h20v14a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4Z" />
        <path d="M24 34c-3-3-3-7 0-10 3 3 3 7 0 10Zm0 0v-6" />
      </>
    }
    accent={<path d="M38 5c2 3 3 4.6 3 6a3 3 0 0 1-6 0c0-1.4 1-3 3-6Z" fill={C.blue} fillOpacity={0.6} />}
    {...p}
  />
);

export const IconMakeup = (p: IllustrationProps) => (
  <CategoryIcon
    name="cat-makyaj"
    tint={<path d="M20 8l8 4v8h-8Z" fill={C.green} fillOpacity={0.45} />}
    line={
      <>
        <path d="M20 8l8 4v8h-8Z" />
        <rect x="18" y="20" width="12" height="6" rx="1" />
        <rect x="16" y="26" width="16" height="14" rx="2" />
        <path d="M21 31v4" />
      </>
    }
    accent={<path d={sparkD(5)} transform="translate(37 12)" fill={C.blue} fillOpacity={0.7} />}
    {...p}
  />
);

export const IconHairCare = (p: IllustrationProps) => (
  <CategoryIcon
    name="cat-sac-bakimi"
    tint={<rect x="8" y="28" width="24" height="6" rx="2" fill={C.blue} {...op} />}
    line={
      <>
        <path d="M8 10c6-4 10 4 16 0s10-4 16 0M8 16c6-4 10 4 16 0s10-4 16 0M8 22c6-4 10 4 16 0" />
        <rect x="8" y="28" width="24" height="6" rx="2" />
        <path d="M12 34v5m4-5v5m4-5v5m4-5v5m4-5v5" />
      </>
    }
    accent={<Leaf x={39} y={38} r={20} l={13} w={5} fill={C.green} o={0.75} />}
    {...p}
  />
);

export const IconBodyCare = (p: IllustrationProps) => (
  <CategoryIcon
    name="cat-vucut-bakimi"
    tint={<path d="M16 28h18v8a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4Z" fill={C.green} {...op} />}
    line={
      <>
        <path d="M20 6h10m-5 0v6m5-6h4v3" />
        <rect x="21" y="12" width="8" height="5" rx="1" />
        <path d="M16 21a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4v15a4 4 0 0 1-4 4H20a4 4 0 0 1-4-4Z" />
      </>
    }
    accent={<Leaf x={25} y={33} r={-8} l={10} w={4} fill={C.lime} o={0.85} />}
    {...p}
  />
);

export const IconOralCare = (p: IllustrationProps) => {
  const tooth =
    "M18 9c-4 0-7 3-7 7 0 5 2 8 3 13 1 5 2 9 4 9s3-4 4.5-8c.5-1.5 2.5-1.5 3 0 1 4 1.5 8 3.5 8s3-4 4-9c1-5 3-8 3-13 0-4-3-7-7-7-3 0-4 1.5-6 1.5S21 9 18 9Z";
  return (
    <CategoryIcon
      name="cat-agiz-ve-dis-bakimi"
      tint={<path d={tooth} fill={C.blue} fillOpacity={0.25} />}
      line={
        <>
          <path d={tooth} />
          <path d="M16 15c1-2 3-2.5 5-2" />
        </>
      }
      accent={<path d={sparkD(5)} transform="translate(39 9)" fill={C.green} fillOpacity={0.8} />}
      {...p}
    />
  );
};

export const IconSets = (p: IllustrationProps) => (
  <CategoryIcon
    name="cat-setler"
    tint={<path d="M11 24h26v14a2 2 0 0 1-2 2H13a2 2 0 0 1-2-2Z" fill={C.green} {...op} />}
    line={
      <>
        <rect x="8" y="16" width="32" height="8" rx="2" />
        <path d="M11 24v14a2 2 0 0 0 2 2h22a2 2 0 0 0 2-2V24M24 16v24" />
      </>
    }
    accent={
      <>
        <Leaf x={24} y={16} r={-52} l={12} w={5} fill={C.green} o={0.8} />
        <Leaf x={24} y={16} r={52} l={12} w={5} fill={C.blue} o={0.7} />
      </>
    }
    {...p}
  />
);

export const IconHomeCleaning = (p: IllustrationProps) => (
  <CategoryIcon
    name="cat-ev-ve-temizlik"
    tint={<path d="M17 28h14v8a4 4 0 0 1-4 4h-6a4 4 0 0 1-4-4Z" fill={C.blue} {...op} />}
    line={
      <>
        <path d="M18 8h10l4 4v4H18Zm0 4h-4" />
        <rect x="20" y="16" width="8" height="4" rx="1" />
        <path d="M17 24a4 4 0 0 1 4-4h6a4 4 0 0 1 4 4v12a4 4 0 0 1-4 4h-6a4 4 0 0 1-4-4Z" />
      </>
    }
    accent={
      <g fill={C.blue} fillOpacity={0.6}>
        <circle cx="38" cy="10" r="3" />
        <circle cx="42" cy="17" r="2" />
        <circle cx="37" cy="20" r="1.5" />
      </g>
    }
    {...p}
  />
);

export const IconMotherChild = (p: IllustrationProps) => (
  <CategoryIcon
    name="cat-anne-ve-cocuk"
    tint={<path d="M18 26h12v9a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5Z" fill={C.lime} fillOpacity={0.4} />}
    line={
      <>
        <path d="M21 12c0-3 1.5-5 3-5s3 2 3 5" />
        <rect x="18" y="12" width="12" height="5" rx="1.5" />
        <path d="M18 17h12v18a5 5 0 0 1-5 5h-2a5 5 0 0 1-5-5Zm0 7h4m-4 5h4" />
      </>
    }
    accent={<path d="M38 19s-5-3-5-6.2a2.5 2.5 0 0 1 5-1 2.5 2.5 0 0 1 5 1C43 16 38 19 38 19Z" fill={C.green} fillOpacity={0.7} />}
    {...p}
  />
);

export const IconHygienePaper = (p: IllustrationProps) => (
  <CategoryIcon
    name="cat-hijyen-ve-kagit"
    tint={<path d="M8 22h32v14a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3Z" fill={C.blue} fillOpacity={0.28} />}
    line={
      <>
        <path d="M8 22h32v14a3 3 0 0 1-3 3H11a3 3 0 0 1-3-3Z" />
        <path d="M17 22c-1-6 2-11 7-14 1 4 5 7 7 14" fill="#FFFFFF" />
      </>
    }
    accent={<Leaf x={33} y={36} r={-30} l={10} w={4} fill={C.green} o={0.8} />}
    {...p}
  />
);

export const IconHealth = (p: IllustrationProps) => (
  <CategoryIcon
    name="cat-saglik-ve-takviye"
    tint={<path d="M10 26a6 6 0 0 1 6-6h8v12h-8a6 6 0 0 1-6-6Z" transform="rotate(-40 24 26)" fill={C.green} fillOpacity={0.45} />}
    line={
      <>
        <g transform="rotate(-40 24 26)">
          <rect x="10" y="20" width="28" height="12" rx="6" />
          <path d="M24 20v12" />
        </g>
        <circle cx="37" cy="37" r="4.5" />
        <path d="M34 40l6-6" />
      </>
    }
    accent={<Leaf x={11} y={42} r={-25} l={12} w={4.5} fill={C.lime} o={0.85} />}
    {...p}
  />
);

export const IconKitchenFood = (p: IllustrationProps) => (
  <CategoryIcon
    name="cat-mutfak-ve-gida"
    tint={<path d="M11 24h22v2a9 9 0 0 1-9 9h-4a9 9 0 0 1-9-9Z" fill={C.green} {...op} />}
    line={
      <>
        <path d="M10 20h24v6a10 10 0 0 1-10 10h-4a10 10 0 0 1-10-10Z" />
        <path d="M34 22h2a4 4 0 0 1 0 8h-3M8 41h28" />
      </>
    }
    accent={
      <>
        <Leaf x={22} y={17} r={-14} l={12} w={4.5} fill={C.green} o={0.85} />
        <Leaf x={22} y={17} r={30} l={9} w={3.5} fill={C.lime} o={0.85} />
      </>
    }
    {...p}
  />
);

export const IconApparel = (p: IllustrationProps) => {
  const shirt = "M17 8 8 13l3 7 4-2v20h18V18l4 2 3-7-9-5c-1 3-3 4.5-7 4.5S18 11 17 8Z";
  return (
    <CategoryIcon
      name="cat-giyim-ve-aksesuar"
      tint={<path d={shirt} fill={C.blue} fillOpacity={0.25} />}
      line={<path d={shirt} />}
      accent={
        <>
          <Leaf x={24} y={30} r={-28} l={10} w={4} fill={C.green} o={0.85} />
          <Leaf x={24} y={30} r={24} l={8} w={3.5} fill={C.lime} o={0.85} />
        </>
      }
      {...p}
    />
  );
};

/** Root-category slug -> icon (K-050 order). */
export const CATEGORY_ICONS = {
  "cilt-bakimi": IconSkinCare,
  makyaj: IconMakeup,
  "sac-bakimi": IconHairCare,
  "vucut-bakimi": IconBodyCare,
  "agiz-ve-dis-bakimi": IconOralCare,
  setler: IconSets,
  "ev-ve-temizlik": IconHomeCleaning,
  "anne-ve-cocuk": IconMotherChild,
  "hijyen-ve-kagit": IconHygienePaper,
  "saglik-ve-takviye": IconHealth,
  "mutfak-ve-gida": IconKitchenFood,
  "giyim-ve-aksesuar": IconApparel,
} as const;

export type CategoryIconSlug = keyof typeof CATEGORY_ICONS;

/** Convenience: `<CategoryIcon slug="makyaj" />` with a safe fallback for unknown slugs. */
export function CategoryIllustration({ slug, ...p }: IllustrationProps & { slug: string }) {
  const Icon = CATEGORY_ICONS[slug as CategoryIconSlug] ?? IconSets;
  return <Icon {...p} />;
}
