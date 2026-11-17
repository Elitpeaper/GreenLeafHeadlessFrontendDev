"use client";

/**
 * Header search (wireframe/arama.md A–B, K-028, K-123). Works without JS (GET /arama).
 * Instant panel: GET /api/arama?q=&limit=6, 150 ms debounce, ≥ 2 chars; previous results stay until new ones arrive.
 * Combobox semantics: input[role=combobox] + listbox, ↑/↓ + Enter, Esc closes, "/" focuses (desktop).
 *   <SearchBox quickLinks={[{href,title}]} />                 // inline (desktop header)
 *   <SearchBox quickLinks variant="sheet" onDone={close} />     // full screen (mobile)
 */
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { ProductCardMini } from "@/components/product/ProductCardParts";
import { ArrowRight, Search, Sprout, X } from "@/components/ui/lucide";
import type { SearchHit } from "@/lib/catalog/types";
import { useT } from "@/lib/ui-text/client";

export interface QuickLink {
  href: string;
  title: string;
}

export function SearchBox({
  quickLinks,
  variant = "inline",
  onDone,
  autoFocus = false,
}: {
  quickLinks: QuickLink[];
  variant?: "inline" | "sheet";
  onDone?: () => void;
  autoFocus?: boolean;
}) {
  const { t } = useT();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [hits, setHits] = useState<SearchHit[]>([]);
  const [searched, setSearched] = useState("");
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const wrap = useRef<HTMLFormElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const listId = useId();
  const inputId = useId();
  const sheet = variant === "sheet";

  // Debounced fetch
  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) return;
    const ctrl = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const res = await fetch(`/api/arama?q=${encodeURIComponent(term)}&limit=6`, { signal: ctrl.signal });
        if (!res.ok) return;
        setHits((await res.json()) as SearchHit[]);
        setSearched(term);
        setActiveIdx(-1);
      } catch {
        /* aborted or offline: keep previous results */
      }
    }, 150);
    return () => {
      window.clearTimeout(timer);
      ctrl.abort();
    };
  }, [q]);

  // "/" shortcut (inline only), outside click
  useEffect(() => {
    if (sheet) return;
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (e.key === "/" && !/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) && !el.isContentEditable) {
        e.preventDefault();
        input.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [sheet]);

  useEffect(() => {
    if (autoFocus) input.current?.focus();
  }, [autoFocus]);

  const term = q.trim();
  const showResults = term.length >= 2 && searched !== "";
  const visibleHits = showResults ? hits : [];
  const optionId = (i: number) => `${listId}-o${i}`;
  const expanded = open || sheet;
  const done = () => {
    setOpen(false);
    onDone?.();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      if (q) setQ("");
      else done();
      return;
    }
    if (!visibleHits.length) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActiveIdx((i) => (i + 1) % visibleHits.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIdx((i) => (i <= 0 ? visibleHits.length - 1 : i - 1));
    } else if (e.key === "Enter" && activeIdx >= 0) {
      const hit = visibleHits[activeIdx];
      if (hit) {
        e.preventDefault();
        router.push(hit.href);
        done();
      }
    }
  };

  return (
    <form
      ref={wrap}
      action="/arama"
      role="search"
      onSubmit={(e) => {
        if (!term) {
          e.preventDefault();
          return;
        }
        e.preventDefault();
        router.push(`/arama?q=${encodeURIComponent(term)}`);
        done();
      }}
      className={sheet ? "flex h-full flex-col" : "relative w-full"}
    >
      <label htmlFor={inputId} className="sr-only">
        {t("header.search.label")}
      </label>
      <div className="relative" data-motion="search-field">
        <Search size={22} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
        <input
          ref={input}
          id={inputId}
          name="q"
          type="search"
          role="combobox"
          aria-expanded={expanded}
          aria-controls={listId}
          aria-autocomplete="list"
          aria-activedescendant={activeIdx >= 0 ? optionId(activeIdx) : undefined}
          autoComplete="off"
          enterKeyHint="search"
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          placeholder={t("header.search.placeholder")}
          className="h-control w-full rounded-pill border border-line-strong bg-surface pl-12 pr-12 text-base text-ink placeholder:text-ink-muted focus:border-green-700 focus:shadow-card focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        />
        {q && (
          <button
            type="button"
            onClick={() => {
              setQ("");
              setHits([]);
              setSearched("");
              input.current?.focus();
            }}
            aria-label={t("search.clear")}
            className="absolute right-1 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-pill text-ink-muted transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:text-ink"
          >
            <X size={20} />
          </button>
        )}
      </div>

      <div
        hidden={!expanded}
        data-motion="search-panel"
        className={
          sheet
            ? "mt-4 flex-1 overflow-y-auto"
            : "absolute inset-x-0 top-full z-(--z-overlay) mt-2 max-h-[70dvh] overflow-y-auto rounded-lg bg-surface p-3 shadow-overlay ring-1 ring-line"
        }
      >
        {term.length < 2 ? (
          <div className="p-2">
            <p className="text-xs font-semibold uppercase tracking-eyebrow text-ink-muted">{t("search.panel.categories")}</p>
            <ul className="mt-2 flex flex-wrap gap-2">
              {quickLinks.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} onClick={done} className="inline-flex min-h-tap-min items-center rounded-pill bg-surface-muted px-4 text-sm text-ink ring-1 ring-line transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:bg-accent-soft">
                    {l.title}
                  </Link>
                </li>
              ))}
            </ul>
            <Link href="/cilt-tipine-gore" onClick={done} className="mt-3 flex min-h-tap items-center gap-3 rounded-md bg-blue-50 px-3 text-sm font-medium text-ink">
              <Sprout size={20} className="text-blue-700" />
              {t("megaMenu.finder.title")}
              <ArrowRight size={16} className="ml-auto" />
            </Link>
          </div>
        ) : !showResults ? (
          <p className="px-2 py-4 text-sm text-ink-muted" aria-busy="true">
            {t("common.loading")}…
          </p>
        ) : (
          <>
            <p className="px-2 pt-1 text-xs font-semibold uppercase tracking-eyebrow text-ink-muted">{t("search.panel.products")}</p>
            <p className="sr-only" aria-live="polite">
              {showResults ? t("search.count_other", { count: visibleHits.length }) : ""}
            </p>
            {visibleHits.length > 0 ? (
              <ul id={listId} role="listbox" aria-label={t("search.panel.products")} className="mt-1">
                {visibleHits.map((h, i) => (
                  <li key={h.slug} id={optionId(i)} role="option" aria-selected={i === activeIdx} className={i === activeIdx ? "rounded-md bg-surface-muted" : ""}>
                    <ProductCardMini product={h} size="sm" onNavigate={done} />
                  </li>
                ))}
              </ul>
            ) : (
              <p id={listId} className="px-2 py-4 text-sm text-ink-muted">
                {t("search.panel.noResults", { q: term })}
              </p>
            )}
            <button type="submit" className="mt-2 flex min-h-tap w-full items-center justify-between rounded-md border-t border-line px-3 pt-1 text-sm font-medium text-green-700 transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:underline">
              {t("search.title", { q: term })}
              <ArrowRight size={16} />
            </button>
          </>
        )}
      </div>
    </form>
  );
}
