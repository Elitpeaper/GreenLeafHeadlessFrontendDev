import { getStockImage } from "@/lib/images";

export interface StockPhoto {
  src: string;
  alt: string;
  width: number;
  height: number;
  blurDataURL?: string;
}

export function stockPhoto(key: string): StockPhoto | null {
  return getStockImage(key);
}

/** K-161: category.<root> — category header band, mobile mega-menu root cover, campaign tile. Never on tiles/strips. */
export const categoryPhoto = (root: string) => stockPhoto(`category.${root}`);
