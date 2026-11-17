"use client";

import Image from "next/image";
import { useState } from "react";
import type { CatalogImage } from "@/lib/catalog/types";

/**
 * PDP gallery (wireframe §2a): single-image-first; thumbnails only with ≥ 2 images. Never upscaled beyond 800 px.
 * Surface reads --accent-soft (product palette) — premium pages override via the theme. LCP = first image (priority).
 */
export function Gallery({
  images,
  name,
  labels,
  premium = false,
}: {
  images: CatalogImage[];
  name: string;
  labels: { item: string };
  premium?: boolean;
}) {
  const [index, setIndex] = useState(0);
  const current = images[index] ?? images[0];
  return (
    <div className="grid gap-3">
      <div
        className={`relative mx-auto aspect-square lg:mx-0 w-full max-w-[40rem] overflow-hidden rounded-xl ${
          premium ? "bg-gold-50" : "bg-accent-soft"
        }`}
      >
        {premium && <span aria-hidden="true" className="absolute inset-[8%] rounded-full [background:var(--gradient-gold-glow)]" />}
        {current ? (
          <Image
            key={current.src}
            src={current.src}
            alt={current.alt || name}
            fill
            priority
            sizes="(min-width: 1024px) 560px, 100vw"
            className="object-contain p-[10%] mix-blend-multiply"
            data-motion="fade-in"
          />
        ) : null}
      </div>
      {images.length > 1 && (
        <ul className="flex justify-center gap-2 lg:justify-start">
          {images.map((img, i) => (
            <li key={img.src}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-pressed={i === index}
                aria-label={labels.item.replace("{index}", String(i + 1)).replace("{total}", String(images.length))}
                className={`relative size-16 overflow-hidden rounded-md bg-accent-soft ring-2 ${i === index ? "ring-green-700" : "ring-transparent"}`}
              >
                <Image src={img.src} alt="" fill sizes="64px" className="object-contain p-1 mix-blend-multiply" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
