import type { Metadata } from "next";
import Link from "next/link";
import { OPTION_IDS, OPTIONS } from "./options";

/** K-287 loading options index (hareket-tasarimcisi prototype). Preview only: not linked, noindex. */
export const metadata: Metadata = {
  title: "Yükleme seçenekleri",
  robots: { index: false, follow: false },
};

export default function LoadingOptionsPage() {
  return (
    <main id="icerik" className="mx-auto flex max-w-wide flex-col gap-6 px-gutter py-10">
      <header className="flex flex-col gap-2">
        <h1 className="text-3xl font-semibold">Yükleme ekranı seçenekleri</h1>
        <p className="max-w-[72ch] text-ink-muted">
          Dört seçenek. Her sayfada &quot;Tekrar oynat&quot; ile animasyonu yeniden izleyebilir, ilk açılış ile sayfa geçişi arasında geçiş
          yapabilir ve yavaş bağlantıyı deneyebilirsiniz.
        </p>
      </header>
      <ul className="grid gap-4 sm:grid-cols-2">
        {OPTION_IDS.map((o) => (
          <li key={o}>
            <Link
              href={`/hareket-lab/loading/${o}`}
              className="flex h-full flex-col gap-2 rounded-tile bg-cream-50 p-6 ring-1 ring-line hover:ring-green-700"
            >
              <span className="text-xl font-semibold">{OPTIONS[o].title}</span>
              <span className="text-ink-muted">{OPTIONS[o].summary}</span>
              <span className="mt-auto pt-2 text-sm font-medium text-green-700">{OPTIONS[o].when} →</span>
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
