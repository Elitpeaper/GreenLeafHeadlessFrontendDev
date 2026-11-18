import Image from "next/image";
import { Leaf } from "@/components/ui/lucide";
import type { MenuRoot } from "./menu-model";

/** Category / sub-category thumbnail shared by the mega menu panel and the mobile nav (kept out of the MegaMenu shell so next/image stays off the first-load path). */
export function Thumb({
  image,
  className,
  sizes,
  zoom = false,
}: {
  image: MenuRoot["image"];
  className: string;
  sizes: string;
  zoom?: boolean;
}) {
  return (
    <span className={`relative block shrink-0 overflow-hidden bg-accent-soft ${className}`}>
      {image ? (
        <span className={`absolute inset-[10%] ${zoom ? "group-hover/tile:scale-[1.04]" : ""}`} data-motion={zoom ? "tile-zoom" : undefined}>
          <Image src={image.src} alt="" fill sizes={sizes} loading="lazy" className="object-contain mix-blend-multiply" />
        </span>
      ) : (
        <Leaf size={20} className="absolute inset-0 m-auto text-accent-decor" />
      )}
    </span>
  );
}

