"use client";

/**
 * K-287 loading lab (hareket-tasarimcisi prototype, preview only). Replays one loader option over a mock page:
 * splash (first load) or page transition, with a simulated "page ready" time, full-screen toggle and a
 * reduced-motion simulation. NOT production UI; nothing here is mounted by the site.
 */
import { useEffect, useRef, useState } from "react";
import { LoaderBloom, LoaderCanopy, LoaderMark, LoaderStripes, type LoaderMode } from "@/components/motion/loaders/Loaders";
import { loadGsap } from "@/lib/motion/gsap";
import { motionTier } from "@/lib/motion/preference";
import { OPTIONS, type OptionId } from "./options";

type Phase = "idle" | "in" | "out" | "done";

const READY = [
  { ms: 200, label: "Hızlı (200 ms)" },
  { ms: 700, label: "Normal (700 ms)" },
  { ms: 2000, label: "Yavaş ağ (2 sn)" },
];

const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));

function Seg<T extends string | number>({
  label,
  value,
  items,
  onPick,
}: {
  label: string;
  value: T;
  items: { v: T; label: string }[];
  onPick: (v: T) => void;
}) {
  return (
    <fieldset className="flex flex-wrap items-center gap-2">
      <legend className="sr-only">{label}</legend>
      <span className="mr-1 text-sm text-ink-muted">{label}</span>
      {items.map((it) => (
        <button
          key={String(it.v)}
          type="button"
          aria-pressed={value === it.v}
          onClick={() => onPick(it.v)}
          className="min-h-10 rounded-pill px-4 text-sm font-medium ring-1 ring-line-strong aria-pressed:bg-forest-900 aria-pressed:text-cream-100 aria-pressed:ring-forest-900"
        >
          {it.label}
        </button>
      ))}
    </fieldset>
  );
}

function MockPage({ page }: { page: 0 | 1 }) {
  if (page === 0)
    return (
      <div className="grid h-full grid-cols-2 bg-gradient-forest-hero">
        <div className="flex flex-col justify-center gap-3 p-[6%]">
          <span className="h-2 w-24 rounded-pill bg-lime-200/80" />
          <span className="h-6 w-[85%] rounded-md bg-cream-200" />
          <span className="h-6 w-[60%] rounded-md bg-cream-200" />
          <span className="mt-2 h-3 w-[70%] rounded-pill bg-cream-100/50" />
          <span className="mt-3 h-9 w-32 rounded-pill bg-cream-50" />
        </div>
        <div className="m-[8%] rounded-tile bg-cream-50/10 ring-1 ring-cream-100/20" />
      </div>
    );
  return (
    <div className="h-full bg-white p-[4%]">
      <span className="block h-5 w-40 rounded-md bg-forest-900/80" />
      <div className="mt-4 grid grid-cols-4 gap-3">
        {Array.from({ length: 8 }, (_, n) => (
          <span key={n} className="aspect-[4/5] rounded-md bg-cream-100" />
        ))}
      </div>
    </div>
  );
}

export function LoadingLab({ id }: { id: OptionId }) {
  const opt = OPTIONS[id];
  const [mode, setMode] = useState<LoaderMode>("splash");
  const [readyMs, setReadyMs] = useState(700);
  const [full, setFull] = useState(false);
  const [simReduced, setSimReduced] = useState(false);
  const [run, setRun] = useState(0);
  const [phase, setPhase] = useState<Phase>("in");
  const [page, setPage] = useState<0 | 1>(0);
  const canopy = useRef<HTMLDivElement>(null);

  const replay = (next?: { mode?: LoaderMode; readyMs?: number; full?: boolean; simReduced?: boolean }) => {
    const m = next?.mode ?? mode;
    if (next?.mode) setMode(next.mode);
    if (next?.readyMs) setReadyMs(next.readyMs);
    if (next?.full !== undefined) setFull(next.full);
    if (next?.simReduced !== undefined) setSimReduced(next.simReduced);
    setPage(0);
    setPhase(m === "transition" && id !== "d" ? "idle" : "in");
    setRun((r) => r + 1);
  };

  useEffect(() => {
    const timers: number[] = [];
    const at = (ms: number, fn: () => void) => timers.push(window.setTimeout(fn, ms));
    let cancelled = false;
    let kill: (() => void) | undefined;

    if (mode === "splash") {
      const outAt = clamp(readyMs, opt.minMs, opt.capMs);
      at(outAt, () => setPhase("out"));
      at(outAt + opt.exitMs + 250, () => setPhase("done"));
    } else if (id !== "d") {
      if (readyMs > opt.transitionDelayMs) at(opt.transitionDelayMs, () => setPhase("in"));
      at(readyMs, () => {
        setPage(1);
        setPhase((p) => (p === "in" ? "out" : "done"));
      });
      at(readyMs + 320, () => setPhase("done"));
    } else {
      // D page transition: GSAP timeline (curtain up from below, papers settle, hold until ready, lift).
      const reduced = simReduced || motionTier() !== "on";
      loadGsap().then(({ gsap }) => {
        const root = canopy.current;
        if (cancelled || !root) return;
        const papers = root.querySelectorAll<SVGElement>('[data-ld-part="paper"]');
        const stripes = root.querySelectorAll<HTMLElement>('[data-ld-part="stripes"] > span');
        const tl = gsap.timeline();
        kill = () => tl.kill();
        if (reduced) {
          tl.fromTo(root, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.25, ease: "none" });
        } else {
          tl.set(root, { autoAlpha: 1, yPercent: 100 })
            .to(root, { yPercent: 0, duration: 0.55, ease: "power3.inOut" })
            .from(papers, { y: 120, rotation: "-=30", opacity: 0, duration: 0.6, stagger: 0.06, ease: "power3.out" }, "-=0.3")
            .from(stripes, { scaleX: 0, transformOrigin: "left center", duration: 0.5, stagger: 0.07, ease: "expo.out" }, "<");
        }
        const covered = reduced ? 250 : 550;
        at(Math.max(readyMs, covered), () => {
          setPage(1);
          const out = gsap.timeline({ onComplete: () => setPhase("done") });
          kill = () => {
            tl.kill();
            out.kill();
          };
          if (reduced) out.to(root, { autoAlpha: 0, duration: 0.3, ease: "none" });
          else
            out
              .to(papers, { y: "-40vh", rotation: "+=25", duration: 0.55, stagger: 0.04, ease: "power2.in" })
              .to(root, { yPercent: -100, y: "-15vmin", duration: 0.7, ease: "power3.inOut" }, "<0.08");
        });
      });
    }

    return () => {
      cancelled = true;
      timers.forEach((t) => window.clearTimeout(t));
      kill?.();
    };
  }, [run, mode, readyMs, simReduced, id, opt]);

  const showOverlay = phase === "in" || phase === "out";
  const scope = full ? "fixed" : "stage";
  const loaderPhase = phase === "out" ? "out" : "in";
  const overlay = !showOverlay ? null : id === "a" ? (
    <LoaderMark key={run} mode={mode} phase={loaderPhase} scope={scope} />
  ) : id === "b" ? (
    <LoaderBloom key={run} mode={mode} phase={loaderPhase} scope={scope} />
  ) : id === "c" ? (
    <LoaderStripes key={run} mode={mode} phase={loaderPhase} scope={scope} />
  ) : (
    <LoaderCanopy key={run} ref={canopy} mode={mode} phase={mode === "splash" ? loaderPhase : "in"} scope={scope} />
  );

  const outAt = clamp(readyMs, opt.minMs, opt.capMs);
  const timeline =
    mode === "splash"
      ? `Sayfa hazır ${readyMs} ms → perde ${outAt} ms'de çıkmaya başlar (en az ${opt.minMs}, en çok ${opt.capMs} ms) → ${outAt + opt.exitMs} ms'de ekran tamamen açık.`
      : id === "d"
        ? `Perde tıklamadan hemen sonra gelir (550 ms), yeni sayfa ${readyMs} ms'de hazır, sonra 700 ms'de kalkar.`
        : readyMs > opt.transitionDelayMs
          ? `Gösterge ${opt.transitionDelayMs} ms'den sonra görünür, sayfa ${readyMs} ms'de hazır olunca kaybolur.`
          : `Sayfa ${readyMs} ms'de hazır: ${opt.transitionDelayMs} ms eşiğinin altında, gösterge hiç görünmez.`;

  return (
    <div data-sim-reduced={simReduced ? "" : undefined} className="flex flex-col gap-6">
      <div className="flex flex-col gap-4 rounded-tile bg-cream-50 p-5 ring-1 ring-line">
        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => replay()}
            className="min-h-12 rounded-pill bg-green-700 px-7 font-semibold text-white"
          >
            ↻ Tekrar oynat
          </button>
          <button
            type="button"
            aria-pressed={full}
            onClick={() => replay({ full: !full })}
            className="min-h-12 rounded-pill px-6 font-medium ring-1 ring-line-strong aria-pressed:bg-forest-900 aria-pressed:text-cream-100"
          >
            Tam ekran
          </button>
          <button
            type="button"
            aria-pressed={simReduced}
            onClick={() => replay({ simReduced: !simReduced })}
            className="min-h-12 rounded-pill px-6 font-medium ring-1 ring-line-strong aria-pressed:bg-forest-900 aria-pressed:text-cream-100"
          >
            Hareketi azalt (simülasyon)
          </button>
        </div>
        <Seg
          label="Durum"
          value={mode}
          items={[
            { v: "splash" as LoaderMode, label: "İlk açılış" },
            { v: "transition" as LoaderMode, label: "Sayfa geçişi" },
          ]}
          onPick={(v) => replay({ mode: v })}
        />
        <Seg label="Sayfa hazır" value={readyMs} items={READY.map((r) => ({ v: r.ms, label: r.label }))} onPick={(v) => replay({ readyMs: v })} />
        <p className="text-sm text-ink-muted">{timeline}</p>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden rounded-tile bg-white shadow-card ring-1 ring-line">
        <MockPage page={page} />
        {overlay}
      </div>
    </div>
  );
}
