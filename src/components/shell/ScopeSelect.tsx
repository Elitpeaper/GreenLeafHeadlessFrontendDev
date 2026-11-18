"use client";

/**
 * Search scope selector (K-268, header-arama-kategori.md §2 part 2): button + listbox popover.
 * "Tüm ürünler" (value "") + product-bearing root categories. Keys: ↑/↓/Home/End/Enter/Esc + type-ahead by first letter.
 * Selecting closes the list and calls onChange; the caller moves focus to the search input.
 */
import { useEffect, useId, useRef, useState } from "react";
import { CategoryIllustration } from "@/components/illustrations/category-icons";
import { ChevronDown } from "@/components/ui/lucide";
import { useT } from "@/lib/ui-text/client";

export interface ScopeOption {
  root: string;
  title: string;
  count: number;
}

export function ScopeSelect({
  scopes,
  value,
  onChange,
  className = "",
}: {
  scopes: ScopeOption[];
  value: string;
  onChange: (root: string) => void;
  className?: string;
}) {
  const { t } = useT();
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const wrap = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);
  const list = useRef<HTMLUListElement>(null);
  const id = useId();
  const options = [{ root: "", title: t("search.scope.all"), count: -1 }, ...scopes];
  const current = options.find((o) => o.root === value) ?? options[0]!;
  const optId = (i: number) => `${id}-o${i}`;

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("pointerdown", onDown);
    list.current?.focus();
    return () => document.removeEventListener("pointerdown", onDown);
  }, [open]);

  const openList = () => {
    setActive(Math.max(0, options.findIndex((o) => o.root === value)));
    setOpen(true);
  };
  const choose = (i: number) => {
    const o = options[i];
    if (!o) return;
    setOpen(false);
    onChange(o.root);
  };
  const onKey = (e: React.KeyboardEvent) => {
    const n = options.length;
    if (e.key === "Escape") {
      e.preventDefault();
      e.stopPropagation();
      setOpen(false);
      btn.current?.focus();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setActive((i) => (i + 1) % n);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((i) => (i - 1 + n) % n);
    } else if (e.key === "Home") {
      e.preventDefault();
      setActive(0);
    } else if (e.key === "End") {
      e.preventDefault();
      setActive(n - 1);
    } else if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      choose(active);
    } else if (e.key === "Tab") {
      setOpen(false);
    } else if (e.key.length === 1) {
      const ch = e.key.toLocaleLowerCase("tr");
      const start = active + 1;
      const idx = [...options.slice(start), ...options.slice(0, start)].findIndex((o) => o.title.toLocaleLowerCase("tr").startsWith(ch));
      if (idx >= 0) setActive((start + idx) % n);
    }
  };

  return (
    <div ref={wrap} className={`relative ${className}`}>
      <button
        ref={btn}
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={id}
        aria-label={`${t("header.scope.label")}: ${current.title}`}
        onClick={() => (open ? setOpen(false) : openList())}
        data-scope-trigger=""
        className="flex h-12 max-w-36 items-center gap-1.5 border-r border-line-strong bg-surface px-3 text-sm font-medium text-ink transition-colors duration-250 hover:bg-surface-muted xl:max-w-44"
      >
        <span className="truncate">{current.title}</span>
        <ChevronDown size={16} className={`shrink-0 text-ink-muted transition-transform duration-250 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <ul
          ref={list}
          id={id}
          role="listbox"
          tabIndex={-1}
          aria-label={t("header.scope.label")}
          aria-activedescendant={optId(active)}
          onKeyDown={onKey}
          data-motion="popover"
          data-scroll-native=""
          className="absolute left-0 top-full z-(--z-overlay) mt-2 max-h-[min(24rem,70dvh)] w-72 overflow-y-auto rounded-lg bg-surface p-1.5 shadow-overlay ring-1 ring-line outline-none"
        >
          {options.map((o, i) => (
            <li
              key={o.root || "all"}
              id={optId(i)}
              role="option"
              aria-selected={o.root === value}
              onPointerMove={() => setActive(i)}
              onClick={() => choose(i)}
              className={`flex min-h-11 cursor-pointer items-center gap-3 rounded-md px-2.5 text-sm ${i === active ? "bg-accent-soft" : ""} ${o.root === value ? "font-semibold text-green-800" : "text-ink"}`}
            >
              <span aria-hidden="true" className="grid size-6 shrink-0 place-items-center">
                {o.root ? <CategoryIllustration slug={o.root} className="size-6" /> : null}
              </span>
              <span className="flex-1 truncate">{o.title}</span>
              {o.count >= 0 && <span className="text-xs tabular-nums text-ink-muted">{o.count}</span>}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
