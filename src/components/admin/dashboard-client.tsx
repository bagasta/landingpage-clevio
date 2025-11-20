'use client'

import { useMemo, useState } from 'react'
import { ProgramKey, ProgramPageStatus } from '@prisma/client'

import { LandingProgramEditor } from '@/components/admin/landing-program-editor'
import { ProgramPageEditor } from '@/components/admin/program-page-editor'

const labels: Record<ProgramKey, { title: string; description: string }> = {
  INNOVATOR_CAMP: {
    title: 'Clevio Innovator Camp',
    description: 'Kelola konten kelas inovator untuk anak dan remaja.',
  },
  INNOVATOR_PRO: {
    title: 'Clevio Innovator Pro',
    description: 'Perbarui materi pendampingan profesional dan bisnis.',
  },
  AI_ASSISTANTS: {
    title: 'Clevio AI Employee',
    description: 'Atur copy halaman untuk solusi AI assistants.',
  },
}

type LandingProgram = {
  id: string
  program: ProgramKey
  titleId: string
  titleEn: string
  descriptionId: string
  descriptionEn: string
  ctaLabelId: string
  ctaLabelEn: string
  imageAltId: string
  imageAltEn: string
  updatedAt: string
  updatedBy?: {
    name: string | null
    email: string | null
  } | null
}

type ProgramPage = {
  program: ProgramKey
  data: unknown
  status: ProgramPageStatus
  updatedAt: string
  updatedBy?: {
    name: string | null
    email: string | null
  } | null
}

export function AdminDashboardClient({
  landingPrograms,
  programPages,
}: {
  landingPrograms: LandingProgram[]
  programPages: ProgramPage[]
}) {
  const availablePrograms = useMemo(
    () =>
      landingPrograms
        .map((program) => program.program)
        .filter((program) => programPages.some((page) => page.program === program)),
    [landingPrograms, programPages]
  )

  const [selectedProgram, setSelectedProgram] = useState<ProgramKey>(
    availablePrograms[0] ?? 'INNOVATOR_CAMP'
  )

  const landingProgram = landingPrograms.find((item) => item.program === selectedProgram)
  const programPage = programPages.find((item) => item.program === selectedProgram)

  if (!landingProgram || !programPage) {
    return (
      <div className="rounded-3xl border border-amber-200 bg-amber-50 px-6 py-8 text-sm text-amber-700">
        Data program belum tersedia. Silakan jalankan migrasi dan seed database terlebih dahulu.
      </div>
    )
  }

  return (
    <div className="space-y-10">
      <section className="rounded-3xl border border-black/5 bg-white/80 px-8 py-6 shadow backdrop-blur">
        <h2 className="text-xl font-semibold text-[#1c2974]">Pilih Halaman Program</h2>
        <p className="mt-1 text-sm text-black/60">
          Pilih program yang ingin Anda ubah kontennya.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {availablePrograms.map((program) => {
            const isActive = program === selectedProgram
            return (
              <button
                key={program}
                type="button"
                onClick={() => setSelectedProgram(program)}
                className={`rounded-2xl border px-5 py-4 text-left transition ${
                  isActive
                    ? 'border-[#1c2974] bg-[#1c2974]/10 shadow-md'
                    : 'border-black/10 bg-white/70 hover:border-[#1c2974]/40 hover:bg-[#1c2974]/5'
                }`}
              >
                <span className="block text-sm font-semibold text-[#1c2974]">
                  {labels[program].title}
                </span>
                <span className="mt-1 block text-xs text-black/60">
                  {labels[program].description}
                </span>
              </button>
            )
          })}
        </div>
      </section>

      <section className="space-y-8">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#1c2974]">Konten Landing Utama</h3>
          <p className="text-sm text-black/60">
            Ubah ringkasan program yang tampil di landing page utama.
          </p>
          <LandingProgramEditor programs={[landingProgram]} />
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-[#1c2974]">Konten Halaman Program</h3>
          <p className="text-sm text-black/60">
            Gunakan formulir di bawah untuk mengubah konten halaman program yang dipilih.
          </p>
          <ProgramPageEditor pages={[programPage]} />
        </div>
      </section>
    </div>
  )
}
