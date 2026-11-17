"use client";

/** Optional announcement strip (header.md layer 0): blue-50, ink text, 40px, close target 44px. Closing is per page view. */
import Link from "next/link";
import { useState } from "react";
import { X } from "@/components/ui/lucide";
import { announcement } from "@/config/storefront";
import { useT } from "@/lib/ui-text/client";

export function AnnouncementBar() {
  const { t } = useT();
  const [closed, setClosed] = useState(false);
  if (!announcement || closed) return null;
  const text = t("header.announcement");
  return (
    <div className="relative bg-blue-50 text-ink" data-motion="announcement">
      <div className="mx-auto flex min-h-10 max-w-wide items-center justify-center px-12 py-1.5 text-center text-sm">
        {announcement.href ? (
          <Link href={announcement.href} className="underline-offset-4 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:underline">
            {text} <span className="font-medium text-accent-text">→</span>
          </Link>
        ) : (
          <span>{text}</span>
        )}
      </div>
      <button
        type="button"
        onClick={() => setClosed(true)}
        aria-label={t("header.announcement.close")}
        className="absolute right-1 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-pill text-ink-muted transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:text-ink"
      >
        <X size={18} />
      </button>
    </div>
  );
}
