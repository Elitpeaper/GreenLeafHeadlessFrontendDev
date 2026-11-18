"use client";

/**
 * Lazy menu media (K-288 / P-08): one GET /api/menu per page life, started on menu intent (pointer/focus on the
 * trigger) or first open. Failure keeps the text-only menu (K-091 fallback) and retries on the next intent.
 */
import { useEffect, useMemo, useSyncExternalStore } from "react";
import { mergeMenu, type MenuMediaMap, type MenuRoot, type MenuRootNav } from "./menu-model";

export const MENU_MEDIA_URL = "/api/menu";

let media: MenuMediaMap | null = null;
let pending: Promise<void> | null = null;
const subs = new Set<() => void>();

export function loadMenuMedia(): Promise<void> {
  if (media) return Promise.resolve();
  pending ??= fetch(MENU_MEDIA_URL)
    .then((r) => {
      if (!r.ok) throw new Error(`menu media ${r.status}`);
      return r.json() as Promise<MenuMediaMap>;
    })
    .then((m) => {
      media = m;
      subs.forEach((f) => f());
    })
    .catch(() => {})
    .finally(() => {
      pending = null;
    });
  return pending;
}

const subscribe = (f: () => void) => {
  subs.add(f);
  return () => void subs.delete(f);
};

/** Text roots merged with the media (once loaded). `load` = start fetching now (panel mounted / open). */
export function useMenuRoots(nav: MenuRootNav[], load: boolean): MenuRoot[] {
  const m = useSyncExternalStore(subscribe, () => media, () => null);
  useEffect(() => {
    if (load) void loadMenuMedia();
  }, [load]);
  return useMemo(() => mergeMenu(nav, m), [nav, m]);
}
