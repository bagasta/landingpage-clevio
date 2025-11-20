import Link from 'next/link'

import { ProgramKey } from '@prisma/client'

const programLabels: Record<ProgramKey, string> = {
  INNOVATOR_CAMP: 'Clevio Innovator Camp',
  INNOVATOR_PRO: 'Clevio Innovator Pro',
  AI_ASSISTANTS: 'Clevio AI Staff',
}

export default function UnderConstructionPage({
  searchParams,
}: {
  searchParams?: { program?: string }
}) {
  const rawProgram = searchParams?.program?.toUpperCase()
  const programKey = rawProgram && rawProgram in programLabels ? (rawProgram as ProgramKey) : null
  const title = programKey ? programLabels[programKey] : 'Halaman Program'

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-br from-white via-[#f6f7fb] to-[#dfe3f5] px-6 py-16 text-center">
      <div className="max-w-2xl space-y-6 rounded-3xl border border-black/10 bg-white/85 px-10 py-12 shadow-2xl backdrop-blur">
        <p className="text-xs font-semibold uppercase tracking-[0.4em] text-black/40">Clevio Group</p>
        <h1 className="text-3xl font-semibold text-[#1c2974] sm:text-4xl">Halaman Sedang Disiapkan</h1>
        <p className="text-base text-black/70 sm:text-lg">
          {title} masih dalam tahap pengembangan. Tim kami sedang menyiapkan konten terbaik agar pengalaman Anda tetap mulus.
          Sementara ini, silakan kembali lagi nanti atau hubungi kami untuk mendapatkan informasi langsung.
        </p>
        <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:justify-center">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-[#1c2974] px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:scale-105"
          >
            Kembali ke Beranda
          </Link>
        </div>
      </div>
      <p className="mt-8 text-xs uppercase tracking-[0.3em] text-black/30">Human-Centric Innovation · Clevio</p>
    </main>
  )
}
