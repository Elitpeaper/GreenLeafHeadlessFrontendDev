import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LoadingLab } from "../LoadingLab";
import { OPTION_IDS, OPTIONS, type OptionId } from "../options";

/**
 * K-287 loading option demo (hareket-tasarimcisi prototype). Preview only: not linked, noindex.
 * /hareket-lab/loading/{a,b,c,d}. Plan: docs/tasarim/loading-secenekleri.md.
 */
type Props = { params: Promise<{ secenek: string }> };

export function generateStaticParams() {
  return OPTION_IDS.map((secenek) => ({ secenek }));
}

const isOption = (s: string): s is OptionId => (OPTION_IDS as readonly string[]).includes(s);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { secenek } = await params;
  return {
    title: isOption(secenek) ? `Yükleme seçeneği ${secenek.toUpperCase()}` : "Yükleme seçenekleri",
    robots: { index: false, follow: false },
  };
}

export default async function LoadingOptionPage({ params }: Props) {
  const { secenek } = await params;
  if (!isOption(secenek)) notFound();
  const opt = OPTIONS[secenek];

  return (
    <main id="icerik" className="mx-auto flex max-w-wide flex-col gap-6 px-gutter py-10">
      <nav aria-label="Seçenekler" className="flex flex-wrap items-center gap-2">
        <Link href="/hareket-lab/loading" className="mr-2 text-sm font-medium text-green-700 underline-offset-4 hover:underline">
          ← Tüm seçenekler
        </Link>
        {OPTION_IDS.map((o) => (
          <Link
            key={o}
            href={`/hareket-lab/loading/${o}`}
            aria-current={o === secenek ? "page" : undefined}
            className="grid size-11 place-items-center rounded-pill font-semibold ring-1 ring-line-strong aria-[current=page]:bg-forest-900 aria-[current=page]:text-cream-100"
          >
            {o.toUpperCase()}
          </Link>
        ))}
      </nav>
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">{opt.title}</h1>
        <p className="max-w-[72ch] text-ink-muted">{opt.summary}</p>
        <dl className="mt-1 grid gap-x-6 gap-y-1 text-sm sm:grid-cols-[auto_1fr]">
          <dt className="font-medium">Ne zaman</dt>
          <dd className="text-ink-muted">{opt.when}</dd>
          <dt className="font-medium">Süre</dt>
          <dd className="text-ink-muted">
            Açılış en az {opt.minMs} ms, en çok {opt.capMs} ms + {opt.exitMs} ms çıkış
          </dd>
          <dt className="font-medium">GSAP</dt>
          <dd className="text-ink-muted">{opt.gsap}</dd>
        </dl>
      </header>
      <LoadingLab id={secenek} />
    </main>
  );
}
