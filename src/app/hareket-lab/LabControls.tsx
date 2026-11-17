"use client";

/**
 * hareket-tasarimcisi prototype (Faz 2, isolated): tiny state for the motion lab only — cart count (H4),
 * add-to-cart swap (M-12), drawer (dialog), tabs (M-17), favourite pop. NOT production UI; frontend-gelistirici
 * owns the real components. Delete with the lab route before Kapı 3.
 */
import { useEffect, useRef, useState } from "react";

export function LabCart() {
  const [count, setCount] = useState(0);
  const [added, setAdded] = useState(false);
  const [open, setOpen] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open && !d.open) d.showModal();
    if (!open && d.open) d.close();
  }, [open]);

  return (
    <div className="flex flex-wrap items-center gap-4">
      <button
        type="button"
        data-motion="M-12"
        data-state={added ? "added" : undefined}
        onClick={() => {
          setCount((c) => c + 1);
          setAdded(true);
          window.setTimeout(() => setAdded(false), 1600);
        }}
        className="min-h-tap rounded-pill bg-green-700 px-6 font-medium text-white"
      >
        <span data-motion-part="swap">
          <span data-motion-part="label">Sepete ekle</span>
          <span data-motion-part="done" aria-hidden={!added}>
            ✓ Eklendi
          </span>
        </span>
      </button>
      <button type="button" onClick={() => setOpen(true)} className="relative min-h-tap rounded-pill px-4 ring-1 ring-line-strong" id="lab-cart">
        Sepet{" "}
        <span data-motion="H4" className="inline-block min-w-[2ch] rounded-pill bg-green-700 px-2 text-center text-sm tabular-nums text-white">
          {count}
        </span>
      </button>
      <dialog
        ref={dialog}
        data-motion="drawer"
        onClose={() => setOpen(false)}
        aria-label="Sepetim (laboratuvar)"
        className="m-0 ml-auto h-dvh max-h-dvh w-full max-w-drawer bg-white p-0 shadow-overlay backdrop:bg-ink/40"
      >
        <div data-motion="band-show" aria-hidden="true" className="grid grid-rows-[2px_1px_1px]">
          <span className="bg-stripe-1" />
          <span className="bg-stripe-2" />
          <span className="bg-stripe-3" />
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl">Sepetim</h2>
            <button type="button" onClick={() => setOpen(false)} className="min-h-tap-min px-2">
              Kapat
            </button>
          </div>
          <p data-motion="flash" className="mt-6">
            Laboratuvar satırı — yeni eklenen satır kısa bir vurgu alır.
          </p>
          <p className="mt-4 flex justify-between">
            <span>Toplam</span>
            <span data-motion="tick" className="tabular-nums">
              ₺{(count * 129.9).toLocaleString("tr-TR", { minimumFractionDigits: 2 })}
            </span>
          </p>
          <button
            type="button"
            data-motion="nudge-note"
            aria-disabled="true"
            aria-describedby="lab-checkout-note"
            className="mt-6 w-full cursor-not-allowed rounded-pill bg-surface-muted px-5 py-3 text-ink-muted ring-1 ring-line-strong"
          >
            Ödemeye geç <span className="ml-2 rounded-sm bg-blue-100 px-2 text-xs text-blue-800">Yakında</span>
          </button>
          <p id="lab-checkout-note" className="mt-3 text-sm text-ink-muted">
            Online ödeme altyapımız hazırlanıyor.
          </p>
          <button type="button" onClick={() => setCount((c) => c + 1)} className="mt-4 text-sm underline">
            Adet +1 (sayı geçişi)
          </button>
        </div>
      </dialog>
    </div>
  );
}

export function LabTabs({ tabs }: { tabs: { key: string; label: string; content: React.ReactNode }[] }) {
  const [active, setActive] = useState(tabs[0]?.key);
  return (
    <div data-motion="M-17">
      <div role="tablist" aria-label="Keşfet" className="flex flex-wrap gap-2">
        <span data-motion-part="indicator" aria-hidden="true" className="rounded-pill bg-accent" />
        {tabs.map((t) => (
          <button
            key={t.key}
            type="button"
            role="tab"
            id={`tab-${t.key}`}
            aria-selected={active === t.key}
            aria-controls={`panel-${t.key}`}
            onClick={() => setActive(t.key)}
            className={`min-h-tap-min rounded-pill px-4 text-sm font-medium ${active === t.key ? "text-on-accent" : "text-ink ring-1 ring-line"}`}
          >
            {t.label}
          </button>
        ))}
      </div>
      {tabs.map((t) => (
        <div key={t.key} role="tabpanel" id={`panel-${t.key}`} aria-labelledby={`tab-${t.key}`} hidden={active !== t.key} className="mt-6">
          {t.content}
        </div>
      ))}
    </div>
  );
}

export function LabHeart() {
  const [on, setOn] = useState(false);
  return (
    <button
      type="button"
      data-motion="pop"
      aria-pressed={on}
      aria-label="Favorilere ekle"
      onClick={() => setOn((v) => !v)}
      className="grid size-12 place-items-center rounded-pill bg-white ring-1 ring-line"
    >
      <span data-motion-part="icon" aria-hidden="true" className={on ? "text-danger" : "text-ink-muted"}>
        {on ? "♥" : "♡"}
      </span>
    </button>
  );
}
