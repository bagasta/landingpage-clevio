'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const schema = z.object({
  titleId: z.string().min(2),
  titleEn: z.string().min(2),
  descriptionId: z.string().min(10),
  descriptionEn: z.string().min(10),
  ctaLabelId: z.string().min(2),
  ctaLabelEn: z.string().min(2),
  imageAltId: z.string().min(2),
  imageAltEn: z.string().min(2),
})

type FormValues = z.infer<typeof schema>

type AdminProgram = {
  id: string
  program: 'INNOVATOR_CAMP' | 'INNOVATOR_PRO' | 'AI_ASSISTANTS'
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

function getProgramLabel(program: AdminProgram['program']) {
  switch (program) {
    case 'INNOVATOR_CAMP':
      return 'Innovator Camp'
    case 'INNOVATOR_PRO':
      return 'Innovator Pro'
    case 'AI_ASSISTANTS':
      return 'Clevio AI Staff'
    default:
      return program
  }
}

function ProgramForm({ program }: { program: AdminProgram }) {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      titleId: program.titleId,
      titleEn: program.titleEn,
      descriptionId: program.descriptionId,
      descriptionEn: program.descriptionEn,
      ctaLabelId: program.ctaLabelId,
      ctaLabelEn: program.ctaLabelEn,
      imageAltId: program.imageAltId,
      imageAltEn: program.imageAltEn,
    },
  })

  const onSubmit = (values: FormValues) => {
    setStatus('idle')
    setMessage(null)

    startTransition(async () => {
      try {
        const response = await fetch(`/api/admin/programs/${program.program}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(values),
        })

        if (!response.ok) {
          const error = await response.json().catch(() => ({ message: 'Unknown error' }))
          throw new Error(error.message ?? 'Gagal memperbarui konten.')
        }

        setStatus('success')
        setMessage('Konten berhasil diperbarui.')
        form.reset(values)
      } catch (error) {
        setStatus('error')
        setMessage(error instanceof Error ? error.message : 'Terjadi kesalahan.')
      }
    })
  }

  return (
    <section className="rounded-3xl border border-black/10 bg-white/85 p-8 shadow-lg backdrop-blur-md">
      <header className="flex items-center justify-between gap-4 border-b border-black/5 pb-6">
        <div>
          <h2 className="text-lg font-semibold text-[#1c2974]">{getProgramLabel(program.program)}</h2>
          <p className="text-xs uppercase tracking-widest text-black/50">
            Terakhir diperbarui {new Date(program.updatedAt).toLocaleString('id-ID')}
          </p>
        </div>
        {program.updatedBy?.name ? (
          <span className="rounded-full bg-[#1c2974]/10 px-4 py-1 text-xs font-medium text-[#1c2974]">
            oleh {program.updatedBy.name}
          </span>
        ) : null}
      </header>

      <form className="mt-6 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-widest text-black/60">
              Judul (ID)
            </label>
            <input
              className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-black shadow-inner focus:border-[#1c2974] focus:outline-none focus:ring-2 focus:ring-[#1c2974]/20"
              {...form.register('titleId')}
            />
            {form.formState.errors.titleId && (
              <p className="text-xs text-red-500">{form.formState.errors.titleId.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-widest text-black/60">
              Title (EN)
            </label>
            <input
              className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-black shadow-inner focus:border-[#1c2974] focus:outline-none focus:ring-2 focus:ring-[#1c2974]/20"
              {...form.register('titleEn')}
            />
            {form.formState.errors.titleEn && (
              <p className="text-xs text-red-500">{form.formState.errors.titleEn.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-widest text-black/60">
              Deskripsi (ID)
            </label>
            <textarea
              rows={4}
              className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-black shadow-inner focus:border-[#1c2974] focus:outline-none focus:ring-2 focus:ring-[#1c2974]/20"
              {...form.register('descriptionId')}
            />
            {form.formState.errors.descriptionId && (
              <p className="text-xs text-red-500">{form.formState.errors.descriptionId.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-widest text-black/60">
              Description (EN)
            </label>
            <textarea
              rows={4}
              className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-black shadow-inner focus:border-[#1c2974] focus:outline-none focus:ring-2 focus:ring-[#1c2974]/20"
              {...form.register('descriptionEn')}
            />
            {form.formState.errors.descriptionEn && (
              <p className="text-xs text-red-500">{form.formState.errors.descriptionEn.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-widest text-black/60">
              Teks Tombol (ID)
            </label>
            <input
              className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-black shadow-inner focus:border-[#1c2974] focus:outline-none focus:ring-2 focus:ring-[#1c2974]/20"
              {...form.register('ctaLabelId')}
            />
            {form.formState.errors.ctaLabelId && (
              <p className="text-xs text-red-500">{form.formState.errors.ctaLabelId.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-widest text-black/60">
              Button Copy (EN)
            </label>
            <input
              className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-black shadow-inner focus:border-[#1c2974] focus:outline-none focus:ring-2 focus:ring-[#1c2974]/20"
              {...form.register('ctaLabelEn')}
            />
            {form.formState.errors.ctaLabelEn && (
              <p className="text-xs text-red-500">{form.formState.errors.ctaLabelEn.message}</p>
            )}
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-widest text-black/60">
              Alt Logo (ID)
            </label>
            <input
              className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-black shadow-inner focus:border-[#1c2974] focus:outline-none focus:ring-2 focus:ring-[#1c2974]/20"
              {...form.register('imageAltId')}
            />
            {form.formState.errors.imageAltId && (
              <p className="text-xs text-red-500">{form.formState.errors.imageAltId.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <label className="block text-xs font-semibold uppercase tracking-widest text-black/60">
              Logo Alt (EN)
            </label>
            <input
              className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-black shadow-inner focus:border-[#1c2974] focus:outline-none focus:ring-2 focus:ring-[#1c2974]/20"
              {...form.register('imageAltEn')}
            />
            {form.formState.errors.imageAltEn && (
              <p className="text-xs text-red-500">{form.formState.errors.imageAltEn.message}</p>
            )}
          </div>
        </div>

        {status !== 'idle' && message ? (
          <p
            className={`rounded-xl px-4 py-3 text-sm ${
              status === 'success'
                ? 'bg-emerald-50 text-emerald-600'
                : 'bg-red-50 text-red-600'
            }`}
          >
            {message}
          </p>
        ) : null}

        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isPending}
            className="rounded-full bg-[#1c2974] px-6 py-2 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isPending ? 'Menyimpan…' : 'Simpan perubahan'}
          </button>
        </div>
      </form>
    </section>
  )
}

export function LandingProgramEditor({ programs }: { programs: AdminProgram[] }) {
  return (
    <div className="space-y-10">
      {programs.map((program) => (
        <ProgramForm key={program.id} program={program} />
      ))}
    </div>
  )
}
