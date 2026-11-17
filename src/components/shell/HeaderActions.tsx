"use client";

/**
 * Header icon group (header.md §2.4): account panel (K-017), favourites (count), cart (count, opens drawer).
 * 48px targets; text labels under icons ≥ 1280px; counts are part of the accessible name and announced politely.
 */
import Link from "next/link";
import { useEffect, useId, useRef, useState } from "react";
import { useFavoritesCount, useFavoritesHydration } from "@/components/product/favorites";
import { Heart, ShoppingBag, User, UserPlus } from "@/components/ui/lucide";
import { useCartActions, useCartCount } from "@/lib/cart";
import { useT } from "@/lib/ui-text/client";

const iconBtn =
  "relative inline-flex min-h-12 min-w-12 flex-col items-center justify-center rounded-md px-1.5 text-ink transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-surface-muted";

function CountBadge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span
      aria-hidden="true"
      data-motion="count-pop"
      key={count}
      className="absolute right-0 top-0.5 grid h-[22px] min-w-[22px] place-items-center rounded-pill bg-green-700 px-1 text-xs font-semibold leading-none text-white ring-2 ring-surface"
    >
      {count > 99 ? "99+" : count}
    </span>
  );
}

export function CartButton() {
  const { t, tc } = useT();
  const count = useCartCount();
  const { open } = useCartActions();
  return (
    <button type="button" onClick={open} aria-haspopup="dialog" aria-label={tc("header.cart.aria", count)} className={iconBtn}>
      <ShoppingBag size={24} />
      <span aria-hidden="true" className="hidden text-xs xl:block">
        {t("header.cart.label")}
      </span>
      <CountBadge count={count} />
    </button>
  );
}

export function FavoritesLink() {
  const { t } = useT();
  useFavoritesHydration();
  const count = useFavoritesCount();
  return (
    <Link href="/favoriler" aria-label={t("header.favorites.aria", { count })} className={`${iconBtn} max-lg:hidden`}>
      <Heart size={24} />
      <span aria-hidden="true" className="hidden text-xs xl:block">
        {t("header.favorites.label")}
      </span>
      <CountBadge count={count} />
    </Link>
  );
}

export function AccountMenu() {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const id = useId();
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        ref.current?.querySelector("button")?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative max-lg:hidden">
      <button type="button" aria-expanded={open} aria-controls={id} onClick={() => setOpen((o) => !o)} className={iconBtn}>
        <User size={24} />
        <span className="hidden text-xs xl:block">{t("header.account")}</span>
        <span className="sr-only xl:hidden">{t("header.account")}</span>
      </button>
      {open && (
        <div id={id} data-motion="popover" className="absolute right-0 top-full z-(--z-overlay) mt-2 w-72 rounded-lg bg-surface p-4 shadow-overlay ring-1 ring-line">
          <p className="text-sm text-ink-muted">{t("header.account.note")}</p>
          <Link
            href="/uye-ol"
            onClick={() => setOpen(false)}
            className="mt-3 flex min-h-control items-center justify-center gap-2 rounded-pill bg-green-700 font-medium text-white transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-green-800"
          >
            <UserPlus size={20} />
            {t("header.account.membership")}
          </Link>
        </div>
      )}
    </div>
  );
}
