"use client";

/**
 * Header search (wireframe/arama.md A–B, K-028, K-123, K-268). Works without JS (GET /arama).
 * Instant panel: GET /api/arama?q=&limit=6[&kok=], 150 ms debounce, ≥ 2 chars; previous results stay until new ones arrive.
 * Combobox semantics: input[role=combobox] + listbox, ↑/↓ + Enter, Esc closes, "/" focuses (desktop).
 *   <SearchBox quickLinks scope scopes onScopeChange variant="capsule" inputRef />   // desktop capsule (scope segment + input + Ara)
 *   <SearchBox quickLinks variant="sheet" scopes scope onScopeChange onDone />        // full screen (mobile, scope chip strip)
 * Scope (header-arama-kategori.md §2.1): "" = all products; otherwise a root category slug -> `kok` on the API and on /arama.
 */
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useRef, useState, type RefObject } from "react";
import { ProductCardMini } from "@/components/product/ProductCardParts";
import { ArrowRight, Search, Sprout, X } from "@/components/ui/lucide";
import type { SearchHit } from "@/lib/catalog/types";
import { useT } from "@/lib/ui-text/client";
import { ScopeSelect, type ScopeOption } from "./ScopeSelect";

export interface QuickLink {
  href: string;
  title: string;
}

interface Results {
  term: string;
  scope: string;
  hits: SearchHit[];
  total: number;
}

export function SearchBox({
  quickLinks,
  variant = "inline",
  onDone,
  autoFocus = false,
  scope = "",
  scopes,
  onScopeChange,
  inputRef,
  onActivate,
  onQueryChange,
}: {
  quickLinks: QuickLink[];
  variant?: "inline" | "capsule" | "sheet";
  onDone?: () => void;
  autoFocus?: boolean;
  scope?: string;
  scopes?: ScopeOption[];
  onScopeChange?: (root: string) => void;
  inputRef?: RefObject<HTMLInputElement | null>;
  /** Input focused / clicked (desktop capsule: opens the mega menu, K-290). */
  onActivate?: () => void;
  onQueryChange?: (q: string) => void;
}) {
  const { t } = useT();
  const router = useRouter();
  const [q, setQ] = useState("");
  const [results, setResults] = useState<Results | null>(null);
  const [failed, setFailed] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const wrap = useRef<HTMLFormElement>(null);
  const ownInput = useRef<HTMLInputElement>(null);
  const input = inputRef ?? ownInput;
  const listId = useId();
  const inputId = useId();
  const sheet = variant === "sheet";
  const capsule = variant === "capsule";
  const scopeTitle = scopes?.find((s) => s.root === scope)?.title ?? "";
  const scoped = scope !== "" && scopeTitle !== "";

  // Debounced fetch (re-runs when the scope changes)
  useEffect(() => {
    const term = q.trim();
    if (term.length < 2) return;
    const ctrl = new AbortController();
    const timer = window.setTimeout(async () => {
      try {
        const kok = scoped ? `&kok=${encodeURIComponent(scope)}` : "";
        const res = await fetch(`/api/arama?q=${encodeURIComponent(term)}&limit=6${kok}`, { signal: ctrl.signal });
        if (!res.ok) throw new Error(String(res.status));
        const hits = (await res.json()) as SearchHit[];
        const total = Number(res.headers.get("X-Search-Total"));
        setResults({ term, scope: res.headers.get("X-Search-Scope") ?? "", hits, total: Number.isFinite(total) && total >= hits.length ? total : hits.length });
        setFailed(false);
        setActiveIdx(-1);
      } catch (err) {
        if ((err as Error).name !== "AbortError") setFailed(true);
      }
    }, 150);
    return () => {
      window.clearTimeout(timer);
      ctrl.abort();
    };
  }, [q, scope, scoped]);

  // "/" shortcut (not in the sheet), outside click
  useEffect(() => {
    if (sheet) return;
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (e.key === "/" && !/^(INPUT|TEXTAREA|SELECT)$/.test(el.tagName) && !el.isContentEditable && input.current?.offsetParent) {
        e.preventDefault();
        input.current.focus();
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
  }, [sheet, input]);

  useEffect(() => {
    if (autoFocus) input.current?.focus();
  }, [autoFocus, input]);

  const term = q.trim();
  const showResults = term.length >= 2 && results !== null;
  const visibleHits = showResults ? results.hits : [];
  const optionId = (i: number) => `${listId}-o${i}`;
  const expanded = open || sheet;
  const done = () => {
    setOpen(false);
    onDone?.();
  };
  const searchHref = (all = false) => `/arama?q=${encodeURIComponent(term)}${scoped && !all ? `&kok=${encodeURIComponent(scope)}` : ""}`;
  const resultsScopeTitle = results?.scope ? (scopes?.find((s) => s.root === results.scope)?.title ?? "") : "";

  const changeScope = (root: string) => {
    onScopeChange?.(root);
    input.current?.focus();
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      if (q) {
        setQ("");
        onQueryChange?.("");
      } else done();
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

  const placeholder = scoped ? t("header.search.placeholderScoped", { kategori: scopeTitle }) : t("header.search.placeholder");

  const field = (
    <div className={`relative ${capsule ? "min-w-0 flex-1" : ""}`} data-motion="search-field">
      {!capsule && <Search size={22} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />}
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
          onQueryChange?.(e.target.value);
        }}
        onFocus={() => {
          setOpen(true);
          onActivate?.();
        }}
        onClick={() => onActivate?.()}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        className={
          capsule
            ? "h-12 w-full min-w-0 bg-transparent pl-4 pr-10 text-base text-ink placeholder:text-ink-muted focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            : "h-control w-full rounded-pill border border-line-strong bg-surface pl-12 pr-12 text-base text-ink placeholder:text-ink-muted focus:border-green-700 focus:shadow-card focus:outline-none [&::-webkit-search-cancel-button]:hidden"
        }
      />
      {q && (
        <button
          type="button"
          onClick={() => {
            setQ("");
            setResults(null);
            onQueryChange?.("");
            input.current?.focus();
          }}
          aria-label={t("search.clear")}
          className="absolute right-1 top-1/2 grid size-11 -translate-y-1/2 place-items-center rounded-pill text-ink-muted transition-[color,background-color,border-color,box-shadow,text-decoration-color] duration-250 hover:text-ink"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );

  const panel = (
    <div
      hidden={!expanded || (capsule && term.length < 2)}
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
      ) : failed && !showResults ? (
        <p className="px-2 py-4 text-sm text-ink-muted" role="status">
          {t("search.panel.error")}
        </p>
      ) : !showResults ? (
        <p className="px-2 py-4 text-sm text-ink-muted" aria-busy="true">
          {t("common.loading")}…
        </p>
      ) : (
        <>
          {resultsScopeTitle && visibleHits.length === 0 && (
            <Link href={searchHref(true)} onClick={done} className="mb-1 flex min-h-tap items-center justify-between rounded-md bg-accent-soft px-3 text-sm font-medium text-green-800">
              {t("search.scope.searchAll")}
              <ArrowRight size={16} />
            </Link>
          )}
          <p className="px-2 pt-1 text-xs font-semibold uppercase tracking-eyebrow text-ink-muted">
            {resultsScopeTitle ? t("search.panel.scopedCount", { kategori: resultsScopeTitle, count: results.total }) : t("search.panel.products")}
          </p>
          <p className="sr-only" aria-live="polite">
            {t("search.count_other", { count: results.total })}
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
          {resultsScopeTitle && visibleHits.length > 0 && (
            <Link href={searchHref(true)} onClick={done} className="flex min-h-tap items-center justify-between rounded-md px-3 text-sm font-medium text-ink hover:underline">
              {t("search.scope.searchAll")}
              <ArrowRight size={16} />
            </Link>
          )}
        </>
      )}
    </div>
  );

  return (
    <form
      ref={wrap}
      action="/arama"
      role="search"
      onSubmit={(e) => {
        e.preventDefault();
        if (!term) return;
        router.push(searchHref());
        done();
      }}
      className={sheet ? "flex h-full flex-col" : "relative w-full"}
    >
      <label htmlFor={inputId} className="sr-only">
        {t("header.search.label")}
      </label>
      {scoped && <input type="hidden" name="kok" value={scope} />}
      {sheet && scopes && scopes.length > 0 && (
        <div role="group" aria-label={t("header.scope.chips")} data-scroll-native="" className="-mx-4 mb-3 flex gap-2 overflow-x-auto px-4 pb-1">
          {[{ root: "", title: t("search.scope.all"), count: 0 }, ...scopes].map((s) => {
            const on = s.root === scope;
            return (
              <button
                key={s.root || "all"}
                type="button"
                aria-pressed={on}
                onClick={() => changeScope(s.root)}
                className={`inline-flex min-h-11 shrink-0 items-center rounded-pill px-4 text-sm font-medium ring-1 transition-colors duration-250 ${on ? "bg-green-700 text-white ring-green-700" : "bg-surface text-ink ring-line-strong hover:bg-surface-muted"}`}
              >
                {s.title}
              </button>
            );
          })}
        </div>
      )}
      {capsule ? (
        <div className="flex items-stretch rounded-pill border border-line-strong bg-surface transition-[border-color,box-shadow] duration-250 focus-within:border-green-700 focus-within:shadow-card">
          {scopes && <ScopeSelect scopes={scopes} value={scope} onChange={changeScope} className="[&_button]:rounded-l-pill" />}
          {field}
          <button
            type="submit"
            aria-label={t("header.search.submit")}
            className="grid size-12 shrink-0 place-items-center rounded-r-pill text-ink transition-colors duration-250 hover:bg-green-50"
          >
            <Search size={22} />
          </button>
        </div>
      ) : (
        field
      )}
      {panel}
    </form>
  );
}
