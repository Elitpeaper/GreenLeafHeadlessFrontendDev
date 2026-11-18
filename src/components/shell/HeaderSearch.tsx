"use client";

/**
 * Desktop search capsule (K-268, K-290): [scope | input | Ara]. There is no "Kategoriler" cap any more:
 * focusing / clicking the input opens the mega menu directly (roots + sub-categories + featured, as a category shortcut).
 * Typing 2+ characters swaps it for the instant results panel; Esc / outside click / leaving by Tab closes it.
 * Owns the shared scope state: default = "Tüm ürünler", on /kategori/{kok}[/…] it is that root (resets when leaving).
 */
import { usePathname } from "next/navigation";
import { useCallback, useRef, useState } from "react";
import { MegaMenu } from "./MegaMenu";
import { loadMenuMedia } from "./menu-media";
import type { MenuRootNav } from "./menu-model";
import { SearchBox, type QuickLink } from "./SearchBox";

/** Scope implied by the current page: the root of /kategori/{kok}/…, else all products. */
export function scopeFromPath(pathname: string, roots: MenuRootNav[]): string {
  const m = /^\/kategori\/([^/]+)/.exec(pathname);
  return m && roots.some((r) => r.root === m[1]) ? m[1]! : "";
}

/** Scope state that follows the page (reset on navigation, derived during render — no effect). */
export function useSearchScope(roots: MenuRootNav[]) {
  const pathname = usePathname();
  const [prev, setPrev] = useState(pathname);
  const [scope, setScope] = useState(() => scopeFromPath(pathname, roots));
  if (prev !== pathname) {
    setPrev(pathname);
    setScope(scopeFromPath(pathname, roots));
  }
  return [scope, setScope] as const;
}

export function HeaderSearch({ roots, quickLinks }: { roots: MenuRootNav[]; quickLinks: QuickLink[] }) {
  const pathname = usePathname();
  const [scope, setScope] = useSearchScope(roots);
  const [open, setOpen] = useState(false);
  const [typing, setTyping] = useState(false); // 2+ characters: instant results own the space
  const [prevPath, setPrevPath] = useState(pathname);
  const input = useRef<HTMLInputElement>(null);
  const box = useRef<HTMLDivElement>(null);
  const skipOpen = useRef(false); // focus returned by Esc must not reopen the menu
  const scopes = roots.map((r) => ({ root: r.root, title: r.title, count: r.count }));

  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setOpen(false);
  }

  const close = useCallback((returnFocus = false) => {
    setOpen(false);
    if (returnFocus && input.current && document.activeElement !== input.current) {
      skipOpen.current = true;
      input.current.focus();
    }
  }, []);

  const activate = useCallback(() => {
    if (skipOpen.current) {
      skipOpen.current = false;
      return;
    }
    setOpen(true);
  }, []);

  return (
    <div ref={box} onPointerEnter={() => void loadMenuMedia()} className="hidden min-w-[26rem] max-w-[40rem] flex-1 items-stretch lg:flex">
      <div className="min-w-0 flex-1">
        <SearchBox
          quickLinks={quickLinks}
          variant="capsule"
          scope={scope}
          scopes={scopes}
          onScopeChange={setScope}
          inputRef={input}
          onActivate={activate}
          onQueryChange={(q) => setTyping(q.trim().length >= 2)}
          onDone={() => setOpen(false)}
        />
      </div>
      <MegaMenu roots={roots} open={open && !typing} onClose={close} containerRef={box} />
    </div>
  );
}
