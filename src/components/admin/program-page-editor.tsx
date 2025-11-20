'use client'

import { ChangeEvent, useMemo, useState, useTransition } from 'react'
import { Control, UseFormRegister, useController, useFieldArray, useForm } from 'react-hook-form'
import { ProgramKey, ProgramPageStatus } from '@prisma/client'

import { campContent } from '@/content/camp'
import { innovatorProContent } from '@/content/innovator-pro'
import { aiAssistantsContent } from '@/content/ai-assistants'
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

const programLabels: Record<ProgramKey, string> = {
  INNOVATOR_CAMP: 'Innovator Camp',
  INNOVATOR_PRO: 'Innovator Pro',
  AI_ASSISTANTS: 'Clevio AI Staff',
}

type AdminProgramPage = {
  program: ProgramKey
  data: unknown
  status: ProgramPageStatus
  updatedAt: string
  updatedBy?: {
    name: string | null
    email: string | null
  } | null
}

type DeepWriteable<T> = T extends ReadonlyArray<infer U>
  ? DeepWriteable<U>[]
  : T extends object
    ? { -readonly [P in keyof T]: DeepWriteable<T[P]> }
    : T

type CampFormValues = DeepWriteable<typeof campContent>
type InnovatorProFormValues = DeepWriteable<typeof innovatorProContent>
type AiAssistantsFormValues = DeepWriteable<typeof aiAssistantsContent>

function cloneWithFallback<T>(fallback: T, incoming: unknown): DeepWriteable<T> {
  const base = JSON.parse(JSON.stringify(fallback)) as DeepWriteable<T>
  if (!incoming || typeof incoming !== 'object') {
    return base
  }

  const merge = (target: any, source: any) => {
    if (source === undefined || source === null) {
      return target
    }
    if (Array.isArray(target) && Array.isArray(source)) {
      return source
    }
    if (typeof target === 'object' && typeof source === 'object') {
      for (const key of Object.keys(source)) {
        const sourceValue = source[key]
        const targetValue = target[key]
        if (
          typeof targetValue === 'object' &&
          targetValue !== null &&
          typeof sourceValue === 'object' &&
          sourceValue !== null &&
          !Array.isArray(sourceValue) &&
          !Array.isArray(targetValue)
        ) {
          target[key] = merge(targetValue, sourceValue)
        } else {
          target[key] = sourceValue
        }
      }
    }
    return target
  }

  return merge(base, incoming)
}

export function ProgramPageEditor({ pages }: { pages: AdminProgramPage[] }) {
  return (
    <div className="space-y-10">
      {pages.map((page) => {
        switch (page.program) {
          case 'INNOVATOR_CAMP':
            return <CampPageEditor key={page.program} page={page} />
          case 'INNOVATOR_PRO':
            return <InnovatorProPageEditor key={page.program} page={page} />
          case 'AI_ASSISTANTS':
            return <AiAssistantsPageEditor key={page.program} page={page} />
          default:
            return null
        }
      })}
    </div>
  )
}

function useProgramPublishState(page: AdminProgramPage) {
  const [publishState, setPublishState] = useState<ProgramPageStatus>(page.status)
  const [statusDialogOpen, setStatusDialogOpen] = useState(false)
  const [statusError, setStatusError] = useState<string | null>(null)
  const [isStatusUpdating, setStatusUpdating] = useState(false)

  const handleDialogChange = (open: boolean) => {
    if (!open) {
      setStatusError(null)
    }
    setStatusDialogOpen(open)
  }

  const updateStatus = async (nextState: ProgramPageStatus) => {
    if (isStatusUpdating) return
    if (nextState === publishState) {
      handleDialogChange(false)
      return
    }
    setStatusError(null)
    setStatusUpdating(true)
    try {
      const response = await fetch(`/api/admin/program-pages/${page.program}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: nextState }),
      })
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Gagal mengubah status.' }))
        throw new Error(error.message ?? 'Gagal memperbarui status halaman.')
      }
      setPublishState(nextState)
      handleDialogChange(false)
    } catch (error) {
      setStatusError(error instanceof Error ? error.message : 'Terjadi kesalahan tak terduga.')
    } finally {
      setStatusUpdating(false)
    }
  }

  return {
    publishState,
    statusDialogOpen,
    onDialogChange: handleDialogChange,
    openDialog: () => handleDialogChange(true),
    isStatusUpdating,
    statusError,
    updateStatus,
  }
}

function Section({ title, description, children }: { title: string; description?: string; children: React.ReactNode }) {
  return (
    <div className="space-y-4 rounded-2xl border border-black/5 bg-white/70 p-6 shadow">
      <div>
        <h3 className="text-lg font-semibold text-[#1c2974]">{title}</h3>
        {description ? <p className="text-sm text-black/60">{description}</p> : null}
      </div>
      {children}
    </div>
  )
}

function TextField({
  label,
  placeholder,
  register,
  name,
  type = 'text',
}: {
  label: string
  placeholder?: string
  register: UseFormRegister<any>
  name: string
  type?: string
}) {
  return (
    <label className="flex flex-col gap-1 text-sm text-black/70">
      <span className="text-xs font-semibold uppercase tracking-widest text-black/50">{label}</span>
      <input
        type={type}
        {...register(name)}
        placeholder={placeholder}
        className="w-full rounded-xl border border-black/10 bg-white/80 px-4 py-2 text-sm text-black shadow-inner focus:border-[#1c2974] focus:outline-none focus:ring-2 focus:ring-[#1c2974]/20"
      />
    </label>
  )
}

function TextAreaField({
  label,
  register,
  name,
  rows = 3,
}: {
  label: string
  register: UseFormRegister<any>
  name: string
  rows?: number
}) {
  return (
    <label className="flex flex-col gap-1 text-sm text-black/70">
      <span className="text-xs font-semibold uppercase tracking-widest text-black/50">{label}</span>
      <textarea
        {...register(name)}
        rows={rows}
        className="w-full rounded-xl border border-black/10 bg-white/80 px-4 py-2 text-sm text-black shadow-inner focus:border-[#1c2974] focus:outline-none focus:ring-2 focus:ring-[#1c2974]/20"
      />
    </label>
  )
}

function LocalizedField({
  label,
  idName,
  enName,
  register,
}: {
  label: string
  idName: string
  enName: string
  register: UseFormRegister<any>
}) {
  return (
    <div className="grid gap-3 md:grid-cols-2">
      <TextField label={`${label} (ID)`} name={idName} register={register} />
      <TextField label={`${label} (EN)`} name={enName} register={register} />
    </div>
  )
}

function ImageUploadField({
  control,
  name,
  label,
  helper,
  resize,
}: {
  control: Control<any>
  name: string
  label: string
  helper?: string
  resize?: { width?: number; height?: number; fit?: 'cover' | 'contain'; format?: 'webp' | 'jpeg' | 'png' }
}) {
  const { field } = useController({ control, name })
  const [isUploading, setUploading] = useState(false)
  const currentValue = field.value as string | undefined

  const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setUploading(true)
    try {
      const formData = new FormData()
      formData.append('file', file)
      if (resize?.width) formData.append('width', String(resize.width))
      if (resize?.height) formData.append('height', String(resize.height))
      if (resize?.fit) formData.append('fit', resize.fit)
      if (resize?.format) formData.append('format', resize.format)
      const response = await fetch('/api/admin/uploads', {
        method: 'POST',
        body: formData,
      })
      if (!response.ok) {
        const error = await response.json().catch(() => ({ message: 'Upload gagal.' }))
        throw new Error(error.message ?? 'Upload gagal.')
      }
      const data = await response.json()
      field.onChange(data.path)
    } catch (error) {
      console.error('Upload image failed', error)
      alert('Gagal mengunggah gambar. Silakan coba lagi.')
    } finally {
      setUploading(false)
      event.target.value = ''
    }
  }

  return (
    <div className="space-y-2">
      <span className="text-xs font-semibold uppercase tracking-widest text-black/50">{label}</span>
      {helper ? <p className="text-xs text-black/50">{helper}</p> : null}
      {currentValue ? (
        <div className="flex flex-col items-start gap-3 rounded-2xl border border-black/10 bg-white/60 p-3">
          <img
            src={currentValue}
            alt="Preview"
            className="max-h-40 max-w-full rounded-xl object-cover"
          />
          <input
            value={currentValue}
            onChange={(event) => field.onChange(event.target.value)}
            className="w-full rounded-lg border border-black/10 bg-white px-3 py-2 text-xs text-black"
            placeholder="/uploads/namafile.jpg"
          />
          <button
            type="button"
            onClick={() => field.onChange('')}
            className="rounded-full border border-red-400/40 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-red-500 transition hover:bg-red-500 hover:text-white"
          >
            Hapus Gambar
          </button>
        </div>
      ) : null}
      <label className="inline-flex cursor-pointer items-center justify-center rounded-full border border-[#1c2974]/30 px-5 py-2 text-xs font-semibold uppercase tracking-widest text-[#1c2974] transition hover:bg-[#1c2974] hover:text-white">
        <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
        {isUploading ? 'Mengunggah…' : 'Unggah Gambar'}
      </label>
    </div>
  )
}

function ArrayActions({ onAdd, onRemove }: { onAdd: () => void; onRemove?: () => void }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {onRemove ? (
        <button
          type="button"
          onClick={onRemove}
          className="rounded-full border border-red-400/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-500 transition hover:bg-red-500 hover:text-white"
        >
          Hapus
        </button>
      ) : null}
      <button
        type="button"
        onClick={onAdd}
        className="rounded-full border border-[#1c2974]/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1c2974] transition hover:bg-[#1c2974] hover:text-white"
      >
        Tambah
      </button>
    </div>
  )
}

function FormFooter({
  status,
  message,
  isPending,
  onReset,
}: {
  status: 'idle' | 'success' | 'error'
  message: string | null
  isPending: boolean
  onReset: () => void
}) {
  return (
    <div className="space-y-4">
      {status !== 'idle' && message ? (
        <p
          className={`rounded-xl px-4 py-3 text-sm ${
            status === 'success' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
          }`}
        >
          {message}
        </p>
      ) : null}
      <div className="flex flex-wrap justify-end gap-3">
        <button
          type="button"
          onClick={onReset}
          className="rounded-full border border-[#1c2974]/20 px-5 py-2 text-sm font-semibold text-[#1c2974] transition hover:bg-[#1c2974] hover:text-white"
        >
          Reset
        </button>
        <button
          type="submit"
          disabled={isPending}
          className="rounded-full bg-[#1c2974] px-6 py-2 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? 'Menyimpan…' : 'Simpan Perubahan'}
        </button>
      </div>
    </div>
  )
}

function CampPageEditor({ page }: { page: AdminProgramPage }) {
  const defaults = useMemo(() => cloneWithFallback(campContent, page.data), [page.data])
  const form = useForm<CampFormValues>({ defaultValues: defaults })
  const { register, control, handleSubmit, reset } = form
  const highlights = useFieldArray({ control, name: 'highlights' })
  const howItWorks = useFieldArray({ control, name: 'howItWorks' })
  const outcomes = useFieldArray({ control, name: 'outcomes' })
  const gallery = useFieldArray({ control, name: 'gallery' })
  const testimonials = useFieldArray({ control, name: 'testimonials' })
  const faq = useFieldArray({ control, name: 'faq' })
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const {
    publishState,
    statusDialogOpen,
    onDialogChange,
    openDialog,
    isStatusUpdating,
    statusError,
    updateStatus,
  } = useProgramPublishState(page)

  const onSubmit = (values: CampFormValues) => {
    setStatus('idle')
    setMessage(null)
    startTransition(async () => {
      try {
        const payload = JSON.parse(JSON.stringify(values))
        const response = await fetch(`/api/admin/program-pages/INNOVATOR_CAMP`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: payload }),
        })
        if (!response.ok) {
          const error = await response.json().catch(() => ({ message: 'Unknown error' }))
          throw new Error(error.message ?? 'Gagal memperbarui halaman program.')
        }
        setStatus('success')
        setMessage('Konten Innovator Camp berhasil diperbarui.')
        reset(values)
        openDialog()
      } catch (error) {
        setStatus('error')
        setMessage(error instanceof Error ? error.message : 'Terjadi kesalahan tak terduga.')
      }
    })
  }

  return (
    <section className="rounded-3xl border border-black/5 bg-white/85 p-8 shadow-lg backdrop-blur">
      <HeaderSummary page={page} status={publishState} onOpenStatusDialog={openDialog} />
      <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Section title="Hero">
          <LocalizedField label="Judul" register={register} idName="hero.title.id" enName="hero.title.en" />
          <LocalizedField label="Subjudul" register={register} idName="hero.subtitle.id" enName="hero.subtitle.en" />
          <div className="grid gap-3 md:grid-cols-2">
            <LocalizedField
              label="Tombol Utama"
              register={register}
              idName="hero.primaryCta.label.id"
              enName="hero.primaryCta.label.en"
            />
            <TextField label="Link Tombol Utama" name="hero.primaryCta.href" register={register} />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <LocalizedField
              label="Tombol Sekunder"
              register={register}
              idName="hero.secondaryCta.label.id"
              enName="hero.secondaryCta.label.en"
            />
            <TextField label="Link Tombol Sekunder" name="hero.secondaryCta.href" register={register} />
          </div>
          <TextField label="Background Tone" name="hero.backgroundTone" register={register} />
          <ImageUploadField
            control={control}
            name="hero.image.src"
            label="Hero - Gambar"
            helper="Unggah gambar hero (rekomendasi 1280×720)."
            resize={{ width: 1280, height: 720, fit: 'cover' }}
          />
          <LocalizedField label="Alt Gambar" register={register} idName="hero.image.alt.id" enName="hero.image.alt.en" />
        </Section>

        <Section title="Sorotan Program">
          <div className="space-y-4">
            {highlights.fields.map((field, index) => (
              <div key={field.id} className="rounded-2xl border border-black/10 p-4">
                <div className="grid gap-3 md:grid-cols-3">
                  <TextField label="Nama (ID)" name={`highlights.${index}.id`} register={register} />
                  <TextField label="Nama (EN)" name={`highlights.${index}.en`} register={register} />
                  <TextField label="Ikon" name={`highlights.${index}.icon`} register={register} />
                </div>
                <div className="mt-3 flex justify-end">
                  <button
                    type="button"
                    onClick={() => highlights.remove(index)}
                    className="rounded-full border border-red-400/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-500 transition hover:bg-red-500 hover:text-white"
                  >
                    Hapus Sorotan
                  </button>
                </div>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                highlights.append({ id: '', en: '', icon: '' })
              }
              className="rounded-full border border-[#1c2974]/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1c2974] transition hover:bg-[#1c2974] hover:text-white"
            >
              Tambah Sorotan
            </button>
          </div>
        </Section>

        <Section title="Cara Bergabung">
          <ArraySectionWithImage
            fields={howItWorks.fields}
            remove={howItWorks.remove}
            append={() =>
              howItWorks.append({
                title: { id: '', en: '' },
                caption: { id: '', en: '' },
                image: { src: '', alt: { id: '', en: '' } },
              })
            }
            register={register}
            basePath="howItWorks"
            control={control}
            imageSize={{ width: 512, height: 512, fit: 'cover' }}
          />
        </Section>

        <Section title="Hasil Program">
          {outcomes.fields.map((field, index) => (
            <div key={field.id} className="space-y-4 rounded-2xl border border-black/10 p-4">
              <LocalizedField label="Judul" register={register} idName={`outcomes.${index}.title.id`} enName={`outcomes.${index}.title.en`} />
              <LocalizedField label="Manfaat" register={register} idName={`outcomes.${index}.benefit.id`} enName={`outcomes.${index}.benefit.en`} />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3 rounded-xl bg-white/80 p-3">
                  <ImageUploadField
                    control={control}
                    name={`outcomes.${index}.beforeImage.src`}
                    label="Before - Gambar"
                    resize={{ width: 512, height: 512, fit: 'cover' }}
                  />
                  <LocalizedField label="Before - Alt" register={register} idName={`outcomes.${index}.beforeImage.alt.id`} enName={`outcomes.${index}.beforeImage.alt.en`} />
                </div>
                <div className="space-y-3 rounded-xl bg-white/80 p-3">
                  <ImageUploadField
                    control={control}
                    name={`outcomes.${index}.afterImage.src`}
                    label="After - Gambar"
                    resize={{ width: 512, height: 512, fit: 'cover' }}
                  />
                  <LocalizedField label="After - Alt" register={register} idName={`outcomes.${index}.afterImage.alt.id`} enName={`outcomes.${index}.afterImage.alt.en`} />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => outcomes.remove(index)}
                  className="rounded-full border border-red-400/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-500 transition hover:bg-red-500 hover:text-white"
                >
                  Hapus Hasil
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              outcomes.append({
                title: { id: '', en: '' },
                benefit: { id: '', en: '' },
                beforeImage: { src: '', alt: { id: '', en: '' } },
                afterImage: { src: '', alt: { id: '', en: '' } },
              })
            }
            className="rounded-full border border-[#1c2974]/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1c2974] transition hover:bg-[#1c2974] hover:text-white"
          >
            Tambah Hasil
          </button>
        </Section>

        <Section title="Galeri">
          {gallery.fields.map((field, index) => (
            <div key={field.id} className="space-y-3 rounded-2xl border border-black/10 p-4">
              <ImageUploadField
                control={control}
                name={`gallery.${index}.src`}
                label="Gambar"
                resize={{ width: 1024, height: 576, fit: 'cover' }}
              />
              <LocalizedField label="Alt" register={register} idName={`gallery.${index}.alt.id`} enName={`gallery.${index}.alt.en`} />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => gallery.remove(index)}
                  className="rounded-full border border-red-400/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-500 transition hover:bg-red-500 hover:text-white"
                >
                  Hapus Gambar
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => gallery.append({ src: '', alt: { id: '', en: '' } })}
            className="rounded-full border border-[#1c2974]/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1c2974] transition hover:bg-[#1c2974] hover:text-white"
          >
            Tambah Gambar
          </button>
        </Section>

        <Section title="Testimoni">
          {testimonials.fields.map((field, index) => (
            <div key={field.id} className="space-y-4 rounded-2xl border border-black/10 p-4">
              <LocalizedField label="Kutipan" register={register} idName={`testimonials.${index}.quote.id`} enName={`testimonials.${index}.quote.en`} />
              <div className="grid gap-3 md:grid-cols-3">
                <TextField label="Nama" name={`testimonials.${index}.name`} register={register} />
                <LocalizedField label="Peran" register={register} idName={`testimonials.${index}.role.id`} enName={`testimonials.${index}.role.en`} />
                <TextField label="Avatar URL" name={`testimonials.${index}.avatar`} register={register} />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => testimonials.remove(index)}
                  className="rounded-full border border-red-400/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-500 transition hover:bg-red-500 hover:text-white"
                >
                  Hapus Testimoni
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              testimonials.append({
                quote: { id: '', en: '' },
                name: '',
                role: { id: '', en: '' },
                avatar: '',
              })
            }
            className="rounded-full border border-[#1c2974]/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1c2974] transition hover:bg-[#1c2974] hover:text-white"
          >
            Tambah Testimoni
          </button>
        </Section>

        <Section title="FAQ">
          {faq.fields.map((field, index) => (
            <div key={field.id} className="space-y-3 rounded-2xl border border-black/10 p-4">
              <LocalizedField label="Pertanyaan" register={register} idName={`faq.${index}.question.id`} enName={`faq.${index}.question.en`} />
              <LocalizedField label="Jawaban" register={register} idName={`faq.${index}.answer.id`} enName={`faq.${index}.answer.en`} />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => faq.remove(index)}
                  className="rounded-full border border-red-400/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-500 transition hover:bg-red-500 hover:text-white"
                >
                  Hapus FAQ
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => faq.append({ question: { id: '', en: '' }, answer: { id: '', en: '' } })}
            className="rounded-full border border-[#1c2974]/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1c2974] transition hover:bg-[#1c2974] hover:text-white"
          >
            Tambah FAQ
          </button>
        </Section>

        <Section title="Kontak">
          <LocalizedField label="Judul" register={register} idName="contact.title.id" enName="contact.title.en" />
          <LocalizedField label="Deskripsi" register={register} idName="contact.body.id" enName="contact.body.en" />
          <div className="grid gap-3 md:grid-cols-2">
            <LocalizedField label="Teks Tombol" register={register} idName="contact.cta.label.id" enName="contact.cta.label.en" />
            <TextField label="Link Tombol" name="contact.cta.href" register={register} />
          </div>
        </Section>

        <FormFooter
          status={status}
          message={message}
          isPending={isPending}
          onReset={() => {
            reset(defaults)
            setStatus('idle')
            setMessage(null)
          }}
        />
      </form>
      <PublishStatusDialog
        open={statusDialogOpen}
        onOpenChange={onDialogChange}
        current={publishState}
        loading={isStatusUpdating}
        error={statusError}
        onSelect={updateStatus}
      />
    </section>
  )
}

function InnovatorProPageEditor({ page }: { page: AdminProgramPage }) {
  const defaults = useMemo(() => cloneWithFallback(innovatorProContent, page.data), [page.data])
  const form = useForm<InnovatorProFormValues>({ defaultValues: defaults })
  const { register, control, handleSubmit, reset } = form
  const highlights = useFieldArray({ control, name: 'highlights' })
  const tracks = useFieldArray({ control, name: 'tracks' })
  const outcomes = useFieldArray({ control, name: 'outcomes' })
  const howItWorks = useFieldArray({ control, name: 'howItWorks' })
  const gallery = useFieldArray({ control, name: 'gallery' })
  const testimonials = useFieldArray({ control, name: 'testimonials' })
  const faq = useFieldArray({ control, name: 'faq' })
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const {
    publishState,
    statusDialogOpen,
    onDialogChange,
    openDialog,
    isStatusUpdating,
    statusError,
    updateStatus,
  } = useProgramPublishState(page)

  const onSubmit = (values: InnovatorProFormValues) => {
    setStatus('idle')
    setMessage(null)
    startTransition(async () => {
      try {
        const payload = JSON.parse(JSON.stringify(values))
        const response = await fetch(`/api/admin/program-pages/INNOVATOR_PRO`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: payload }),
        })
        if (!response.ok) {
          const error = await response.json().catch(() => ({ message: 'Unknown error' }))
          throw new Error(error.message ?? 'Gagal memperbarui halaman program.')
        }
        setStatus('success')
        setMessage('Konten Innovator Pro berhasil diperbarui.')
        reset(values)
        openDialog()
      } catch (error) {
        setStatus('error')
        setMessage(error instanceof Error ? error.message : 'Terjadi kesalahan tak terduga.')
      }
    })
  }

  return (
    <section className="rounded-3xl border border-black/5 bg-white/85 p-8 shadow-lg backdrop-blur">
      <HeaderSummary page={page} status={publishState} onOpenStatusDialog={openDialog} />
      <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Section title="Hero">
          <LocalizedField label="Judul" register={register} idName="hero.title.id" enName="hero.title.en" />
          <LocalizedField label="Subjudul" register={register} idName="hero.subtitle.id" enName="hero.subtitle.en" />
          <div className="grid gap-3 md:grid-cols-2">
            <LocalizedField label="Tombol Utama" register={register} idName="hero.primaryCta.label.id" enName="hero.primaryCta.label.en" />
            <TextField label="Link Tombol Utama" name="hero.primaryCta.href" register={register} />
          </div>
          <div className="grid gap-3 md:grid-cols-2">
            <LocalizedField label="Tombol Sekunder" register={register} idName="hero.secondaryCta.label.id" enName="hero.secondaryCta.label.en" />
            <TextField label="Link Tombol Sekunder" name="hero.secondaryCta.href" register={register} />
          </div>
          <TextField label="Background Tone" name="hero.backgroundTone" register={register} />
          <ImageUploadField
            control={control}
            name="hero.image.src"
            label="Hero - Gambar"
            helper="Unggah gambar hero (rekomendasi 1280×720)."
            resize={{ width: 1280, height: 720, fit: 'cover' }}
          />
          <LocalizedField label="Alt Gambar" register={register} idName="hero.image.alt.id" enName="hero.image.alt.en" />
        </Section>

        <Section title="Sorotan Layanan">
          {highlights.fields.map((field, index) => (
            <div key={field.id} className="space-y-3 rounded-2xl border border-black/10 p-4">
              <div className="grid gap-3 md:grid-cols-3">
                <TextField label="Nama (ID)" name={`highlights.${index}.id`} register={register} />
                <TextField label="Nama (EN)" name={`highlights.${index}.en`} register={register} />
                <TextField label="Ikon" name={`highlights.${index}.icon`} register={register} />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => highlights.remove(index)}
                  className="rounded-full border border-red-400/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-500 transition hover:bg-red-500 hover:text-white"
                >
                  Hapus Sorotan
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => highlights.append({ id: '', en: '', icon: '' })}
            className="rounded-full border border-[#1c2974]/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1c2974] transition hover:bg-[#1c2974] hover:text-white"
          >
            Tambah Sorotan
          </button>
        </Section>

        <Section title="Track & Modul">
          {tracks.fields.map((field, index) => (
            <div key={field.id} className="space-y-3 rounded-2xl border border-black/10 p-4">
              <LocalizedField label="Judul" register={register} idName={`tracks.${index}.title.id`} enName={`tracks.${index}.title.en`} />
              <ImageUploadField
                control={control}
                name={`tracks.${index}.image.src`}
                label="Gambar"
                resize={{ width: 640, height: 400, fit: 'cover' }}
              />
              <LocalizedField label="Alt Gambar" register={register} idName={`tracks.${index}.image.alt.id`} enName={`tracks.${index}.image.alt.en`} />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => tracks.remove(index)}
                  className="rounded-full border border-red-400/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-500 transition hover:bg-red-500 hover:text-white"
                >
                  Hapus Modul
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => tracks.append({ title: { id: '', en: '' }, image: { src: '', alt: { id: '', en: '' } } })}
            className="rounded-full border border-[#1c2974]/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1c2974] transition hover:bg-[#1c2974] hover:text-white"
          >
            Tambah Modul
          </button>
        </Section>

        <Section title="Pendekatan Implementasi">
          <ArraySectionWithImage
            fields={howItWorks.fields}
            remove={howItWorks.remove}
            append={() =>
              howItWorks.append({
                title: { id: '', en: '' },
                caption: { id: '', en: '' },
                image: { src: '', alt: { id: '', en: '' } },
              })
            }
            register={register}
            basePath="howItWorks"
            control={control}
            imageSize={{ width: 512, height: 512, fit: 'cover' }}
          />
        </Section>

        <Section title="Dampak yang Dicapai">
          {outcomes.fields.map((field, index) => (
            <div key={field.id} className="space-y-4 rounded-2xl border border-black/10 p-4">
              <LocalizedField label="Judul" register={register} idName={`outcomes.${index}.title.id`} enName={`outcomes.${index}.title.en`} />
              <LocalizedField label="Manfaat" register={register} idName={`outcomes.${index}.benefit.id`} enName={`outcomes.${index}.benefit.en`} />
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-3 rounded-xl bg-white/80 p-3">
                  <ImageUploadField
                    control={control}
                    name={`outcomes.${index}.beforeImage.src`}
                    label="Before - Gambar"
                    resize={{ width: 512, height: 512, fit: 'cover' }}
                  />
                  <LocalizedField label="Before - Alt" register={register} idName={`outcomes.${index}.beforeImage.alt.id`} enName={`outcomes.${index}.beforeImage.alt.en`} />
                </div>
                <div className="space-y-3 rounded-xl bg-white/80 p-3">
                  <ImageUploadField
                    control={control}
                    name={`outcomes.${index}.afterImage.src`}
                    label="After - Gambar"
                    resize={{ width: 512, height: 512, fit: 'cover' }}
                  />
                  <LocalizedField label="After - Alt" register={register} idName={`outcomes.${index}.afterImage.alt.id`} enName={`outcomes.${index}.afterImage.alt.en`} />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => outcomes.remove(index)}
                  className="rounded-full border border-red-400/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-500 transition hover:bg-red-500 hover:text-white"
                >
                  Hapus Dampak
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              outcomes.append({
                title: { id: '', en: '' },
                benefit: { id: '', en: '' },
                beforeImage: { src: '', alt: { id: '', en: '' } },
                afterImage: { src: '', alt: { id: '', en: '' } },
              })
            }
            className="rounded-full border border-[#1c2974]/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1c2974] transition hover:bg-[#1c2974] hover:text-white"
          >
            Tambah Dampak
          </button>
        </Section>

        <Section title="Galeri Program">
          {gallery.fields.map((field, index) => (
            <div key={field.id} className="space-y-3 rounded-2xl border border-black/10 p-4">
              <ImageUploadField
                control={control}
                name={`gallery.${index}.src`}
                label="Gambar"
                resize={{ width: 1024, height: 576, fit: 'cover' }}
              />
              <LocalizedField label="Alt" register={register} idName={`gallery.${index}.alt.id`} enName={`gallery.${index}.alt.en`} />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => gallery.remove(index)}
                  className="rounded-full border border-red-400/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-500 transition hover:bg-red-500 hover:text-white"
                >
                  Hapus Gambar
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => gallery.append({ src: '', alt: { id: '', en: '' } })}
            className="rounded-full border border-[#1c2974]/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1c2974] transition hover:bg-[#1c2974] hover:text-white"
          >
            Tambah Gambar
          </button>
        </Section>

        <Section title="Testimoni">
          {testimonials.fields.map((field, index) => (
            <div key={field.id} className="space-y-4 rounded-2xl border border-black/10 p-4">
              <LocalizedField label="Kutipan" register={register} idName={`testimonials.${index}.quote.id`} enName={`testimonials.${index}.quote.en`} />
              <div className="grid gap-3 md:grid-cols-3">
                <TextField label="Nama" name={`testimonials.${index}.name`} register={register} />
                <LocalizedField label="Peran" register={register} idName={`testimonials.${index}.role.id`} enName={`testimonials.${index}.role.en`} />
                <TextField label="Avatar URL" name={`testimonials.${index}.avatar`} register={register} />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => testimonials.remove(index)}
                  className="rounded-full border border-red-400/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-500 transition hover:bg-red-500 hover:text-white"
                >
                  Hapus Testimoni
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              testimonials.append({
                quote: { id: '', en: '' },
                name: '',
                role: { id: '', en: '' },
                avatar: '',
              })
            }
            className="rounded-full border border-[#1c2974]/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1c2974] transition hover:bg-[#1c2974] hover:text-white"
          >
            Tambah Testimoni
          </button>
        </Section>

        <Section title="FAQ">
          {faq.fields.map((field, index) => (
            <div key={field.id} className="space-y-3 rounded-2xl border border-black/10 p-4">
              <LocalizedField label="Pertanyaan" register={register} idName={`faq.${index}.question.id`} enName={`faq.${index}.question.en`} />
              <LocalizedField label="Jawaban" register={register} idName={`faq.${index}.answer.id`} enName={`faq.${index}.answer.en`} />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => faq.remove(index)}
                  className="rounded-full border border-red-400/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-500 transition hover:bg-red-500 hover:text-white"
                >
                  Hapus FAQ
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => faq.append({ question: { id: '', en: '' }, answer: { id: '', en: '' } })}
            className="rounded-full border border-[#1c2974]/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1c2974] transition hover:bg-[#1c2974] hover:text-white"
          >
            Tambah FAQ
          </button>
        </Section>

        <Section title="Kontak">
          <LocalizedField label="Judul" register={register} idName="contact.title.id" enName="contact.title.en" />
          <LocalizedField label="Deskripsi" register={register} idName="contact.body.id" enName="contact.body.en" />
          <div className="grid gap-3 md:grid-cols-2">
            <LocalizedField label="Teks Tombol" register={register} idName="contact.cta.label.id" enName="contact.cta.label.en" />
            <TextField label="Link Tombol" name="contact.cta.href" register={register} />
          </div>
        </Section>

        <FormFooter
          status={status}
          message={message}
          isPending={isPending}
          onReset={() => {
            reset(defaults)
            setStatus('idle')
            setMessage(null)
          }}
        />
      </form>
      <PublishStatusDialog
        open={statusDialogOpen}
        onOpenChange={onDialogChange}
        current={publishState}
        loading={isStatusUpdating}
        error={statusError}
        onSelect={updateStatus}
      />
    </section>
  )
}

function AiAssistantsPageEditor({ page }: { page: AdminProgramPage }) {
  const defaults = useMemo(() => cloneWithFallback(aiAssistantsContent, page.data), [page.data])
  const form = useForm<AiAssistantsFormValues>({ defaultValues: defaults })
  const { register, control, handleSubmit, reset } = form
  const highlights = useFieldArray({ control, name: 'highlights' })
  const useCases = useFieldArray({ control, name: 'useCases' })
  const howItWorks = useFieldArray({ control, name: 'howItWorks' })
  const whatYouGet = useFieldArray({ control, name: 'whatYouGet' })
  const gallery = useFieldArray({ control, name: 'gallery' })
  const testimonials = useFieldArray({ control, name: 'testimonials' })
  const faq = useFieldArray({ control, name: 'faq' })
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()
  const {
    publishState,
    statusDialogOpen,
    onDialogChange,
    openDialog,
    isStatusUpdating,
    statusError,
    updateStatus,
  } = useProgramPublishState(page)

  const onSubmit = (values: AiAssistantsFormValues) => {
    setStatus('idle')
    setMessage(null)
    startTransition(async () => {
      try {
        const payload = JSON.parse(JSON.stringify(values))
        const response = await fetch(`/api/admin/program-pages/AI_ASSISTANTS`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: payload }),
        })
        if (!response.ok) {
          const error = await response.json().catch(() => ({ message: 'Unknown error' }))
          throw new Error(error.message ?? 'Gagal memperbarui halaman program.')
        }
        setStatus('success')
        setMessage('Konten AI Staff berhasil diperbarui.')
        reset(values)
        openDialog()
      } catch (error) {
        setStatus('error')
        setMessage(error instanceof Error ? error.message : 'Terjadi kesalahan tak terduga.')
      }
    })
  }

  return (
    <section className="rounded-3xl border border-black/5 bg-white/85 p-8 shadow-lg backdrop-blur">
      <HeaderSummary page={page} status={publishState} onOpenStatusDialog={openDialog} />
      <form className="mt-6 space-y-6" onSubmit={handleSubmit(onSubmit)}>
        <Section title="Hero">
          <LocalizedField label="Judul" register={register} idName="hero.title.id" enName="hero.title.en" />
          <LocalizedField label="Subjudul" register={register} idName="hero.subtitle.id" enName="hero.subtitle.en" />
          <LocalizedField label="Label Harga" register={register} idName="hero.priceBadge.id" enName="hero.priceBadge.en" />
          <div className="grid gap-3 md:grid-cols-2">
            <LocalizedField label="Tombol Utama" register={register} idName="hero.primaryCta.label.id" enName="hero.primaryCta.label.en" />
            <TextField label="Link Tombol" name="hero.primaryCta.href" register={register} />
          </div>
          <TextField label="Background Tone" name="hero.backgroundTone" register={register} />
          <ImageUploadField
            control={control}
            name="hero.image.src"
            label="Hero - Gambar"
            helper="Unggah gambar hero (rekomendasi 1280×720)."
            resize={{ width: 1280, height: 720, fit: 'cover' }}
          />
          <LocalizedField label="Alt Gambar" register={register} idName="hero.image.alt.id" enName="hero.image.alt.en" />
        </Section>

        <Section title="Sorotan Utama">
          {highlights.fields.map((field, index) => (
            <div key={field.id} className="space-y-3 rounded-2xl border border-black/10 p-4">
              <div className="grid gap-3 md:grid-cols-3">
                <TextField label="Nama (ID)" name={`highlights.${index}.id`} register={register} />
                <TextField label="Nama (EN)" name={`highlights.${index}.en`} register={register} />
                <TextField label="Ikon" name={`highlights.${index}.icon`} register={register} />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => highlights.remove(index)}
                  className="rounded-full border border-red-400/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-500 transition hover:bg-red-500 hover:text-white"
                >
                  Hapus Sorotan
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => highlights.append({ id: '', en: '', icon: '' })}
            className="rounded-full border border-[#1c2974]/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1c2974] transition hover:bg-[#1c2974] hover:text-white"
          >
            Tambah Sorotan
          </button>
        </Section>

        <Section title="Contoh Kegunaan">
          {useCases.fields.map((field, index) => (
            <div key={field.id} className="space-y-3 rounded-2xl border border-black/10 p-4">
              <LocalizedField label="Judul" register={register} idName={`useCases.${index}.title.id`} enName={`useCases.${index}.title.en`} />
              <ImageUploadField
                control={control}
                name={`useCases.${index}.image.src`}
                label="Gambar"
                resize={{ width: 640, height: 400, fit: 'cover' }}
              />
              <LocalizedField label="Alt Gambar" register={register} idName={`useCases.${index}.image.alt.id`} enName={`useCases.${index}.image.alt.en`} />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => useCases.remove(index)}
                  className="rounded-full border border-red-400/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-500 transition hover:bg-red-500 hover:text-white"
                >
                  Hapus Kegunaan
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => useCases.append({ title: { id: '', en: '' }, image: { src: '', alt: { id: '', en: '' } } })}
            className="rounded-full border border-[#1c2974]/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1c2974] transition hover:bg-[#1c2974] hover:text-white"
          >
            Tambah Use Case
          </button>
        </Section>

        <Section title="Cara Kerja">
          <ArraySectionWithImage
            fields={howItWorks.fields}
            remove={howItWorks.remove}
            append={() =>
              howItWorks.append({
                title: { id: '', en: '' },
                caption: { id: '', en: '' },
                image: { src: '', alt: { id: '', en: '' } },
              })
            }
            register={register}
            basePath="howItWorks"
            control={control}
            imageSize={{ width: 512, height: 512, fit: 'cover' }}
          />
        </Section>

        <Section title="Yang Didapat">
          {whatYouGet.fields.map((field, index) => (
            <div key={field.id} className="grid gap-3 rounded-2xl border border-black/10 p-4 md:grid-cols-3">
              <LocalizedField label="Judul" register={register} idName={`whatYouGet.${index}.title.id`} enName={`whatYouGet.${index}.title.en`} />
              <TextField label="Ikon" name={`whatYouGet.${index}.icon`} register={register} />
              <div className="flex items-end justify-end">
                <button
                  type="button"
                  onClick={() => whatYouGet.remove(index)}
                  className="rounded-full border border-red-400/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-500 transition hover:bg-red-500 hover:text-white"
                >
                  Hapus Item
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => whatYouGet.append({ title: { id: '', en: '' }, icon: '' })}
            className="rounded-full border border-[#1c2974]/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1c2974] transition hover:bg-[#1c2974] hover:text-white"
          >
            Tambah Item
          </button>
        </Section>

        <Section title="Galeri Produk">
          {gallery.fields.map((field, index) => (
            <div key={field.id} className="space-y-3 rounded-2xl border border-black/10 p-4">
              <ImageUploadField
                control={control}
                name={`gallery.${index}.src`}
                label="Gambar"
                resize={{ width: 1024, height: 576, fit: 'cover' }}
              />
              <LocalizedField label="Alt" register={register} idName={`gallery.${index}.alt.id`} enName={`gallery.${index}.alt.en`} />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => gallery.remove(index)}
                  className="rounded-full border border-red-400/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-500 transition hover:bg-red-500 hover:text-white"
                >
                  Hapus Gambar
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => gallery.append({ src: '', alt: { id: '', en: '' } })}
            className="rounded-full border border-[#1c2974]/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1c2974] transition hover:bg-[#1c2974] hover:text-white"
          >
            Tambah Gambar
          </button>
        </Section>

        <Section title="Testimoni">
          {testimonials.fields.map((field, index) => (
            <div key={field.id} className="space-y-4 rounded-2xl border border-black/10 p-4">
              <LocalizedField label="Kutipan" register={register} idName={`testimonials.${index}.quote.id`} enName={`testimonials.${index}.quote.en`} />
              <div className="grid gap-3 md:grid-cols-3">
                <TextField label="Nama" name={`testimonials.${index}.name`} register={register} />
                <LocalizedField label="Peran" register={register} idName={`testimonials.${index}.role.id`} enName={`testimonials.${index}.role.en`} />
                <TextField label="Avatar URL" name={`testimonials.${index}.avatar`} register={register} />
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => testimonials.remove(index)}
                  className="rounded-full border border-red-400/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-500 transition hover:bg-red-500 hover:text-white"
                >
                  Hapus Testimoni
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() =>
              testimonials.append({
                quote: { id: '', en: '' },
                name: '',
                role: { id: '', en: '' },
                avatar: '',
              })
            }
            className="rounded-full border border-[#1c2974]/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1c2974] transition hover:bg-[#1c2974] hover:text-white"
          >
            Tambah Testimoni
          </button>
        </Section>

        <Section title="FAQ">
          {faq.fields.map((field, index) => (
            <div key={field.id} className="space-y-3 rounded-2xl border border-black/10 p-4">
              <LocalizedField label="Pertanyaan" register={register} idName={`faq.${index}.question.id`} enName={`faq.${index}.question.en`} />
              <LocalizedField label="Jawaban" register={register} idName={`faq.${index}.answer.id`} enName={`faq.${index}.answer.en`} />
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => faq.remove(index)}
                  className="rounded-full border border-red-400/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-500 transition hover:bg-red-500 hover:text-white"
                >
                  Hapus FAQ
                </button>
              </div>
            </div>
          ))}
          <button
            type="button"
            onClick={() => faq.append({ question: { id: '', en: '' }, answer: { id: '', en: '' } })}
            className="rounded-full border border-[#1c2974]/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1c2974] transition hover:bg-[#1c2974] hover:text-white"
          >
            Tambah FAQ
          </button>
        </Section>

        <Section title="Kontak">
          <LocalizedField label="Judul" register={register} idName="contact.title.id" enName="contact.title.en" />
          <LocalizedField label="Deskripsi" register={register} idName="contact.body.id" enName="contact.body.en" />
          <div className="grid gap-3 md:grid-cols-2">
            <LocalizedField label="Teks Tombol" register={register} idName="contact.cta.label.id" enName="contact.cta.label.en" />
            <TextField label="Link Tombol" name="contact.cta.href" register={register} />
          </div>
        </Section>

        <FormFooter
          status={status}
          message={message}
          isPending={isPending}
          onReset={() => {
            reset(defaults)
            setStatus('idle')
            setMessage(null)
          }}
        />
      </form>
      <PublishStatusDialog
        open={statusDialogOpen}
        onOpenChange={onDialogChange}
        current={publishState}
        loading={isStatusUpdating}
        error={statusError}
        onSelect={updateStatus}
      />
    </section>
  )
}

function ArraySectionWithImage({
  fields,
  remove,
  append,
  register,
  basePath,
  control,
  imageSize,
}: {
  fields: { id: string }[]
  remove: (index: number) => void
  append: () => void
  register: UseFormRegister<any>
  basePath: string
  control: Control<any>
  imageSize?: { width?: number; height?: number; fit?: 'cover' | 'contain'; format?: 'webp' | 'jpeg' | 'png' }
}) {
  return (
    <div className="space-y-4">
      {fields.map((field, index) => (
        <div key={field.id} className="space-y-3 rounded-2xl border border-black/10 p-4">
          <LocalizedField label="Judul" register={register} idName={`${basePath}.${index}.title.id`} enName={`${basePath}.${index}.title.en`} />
          <LocalizedField label="Subjudul" register={register} idName={`${basePath}.${index}.caption.id`} enName={`${basePath}.${index}.caption.en`} />
          <ImageUploadField
            control={control}
            name={`${basePath}.${index}.image.src`}
            label="Gambar"
            resize={imageSize}
          />
          <LocalizedField label="Alt Gambar" register={register} idName={`${basePath}.${index}.image.alt.id`} enName={`${basePath}.${index}.image.alt.en`} />
          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => remove(index)}
              className="rounded-full border border-red-400/40 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-red-500 transition hover:bg-red-500 hover:text-white"
            >
              Hapus Item
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={append}
        className="rounded-full border border-[#1c2974]/30 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1c2974] transition hover:bg-[#1c2974] hover:text-white"
      >
        Tambah Item
      </button>
    </div>
  )
}

function PublishStatusDialog({
  open,
  onOpenChange,
  current,
  loading,
  error,
  onSelect,
}: {
  open: boolean
  onOpenChange: (open: boolean) => void
  current: ProgramPageStatus
  loading: boolean
  error: string | null
  onSelect: (state: ProgramPageStatus) => void
}) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Atur Status Publikasi Halaman</AlertDialogTitle>
          <AlertDialogDescription>
            Tentukan apakah halaman ini siap dipublikasikan atau masih dialihkan ke halaman under construction.
          </AlertDialogDescription>
        </AlertDialogHeader>
        {error ? (
          <p className="rounded-2xl bg-red-50 px-4 py-2 text-xs font-semibold text-red-600">{error}</p>
        ) : null}
        <div className="grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            disabled={loading}
            onClick={() => onSelect('DEVELOPMENT')}
            className={`rounded-2xl border px-4 py-3 text-left transition ${
              current === 'DEVELOPMENT'
                ? 'border-amber-400 bg-amber-50 text-amber-800 shadow-sm'
                : 'border-black/10 bg-white hover:border-amber-300 hover:bg-amber-50/60'
            }`}
          >
            <span className="block text-sm font-semibold uppercase tracking-widest">Development</span>
            <span className="mt-1 block text-xs text-black/60">
              Semua tombol landing dialihkan ke halaman Under Construction.
            </span>
          </button>
          <button
            type="button"
            disabled={loading}
            onClick={() => onSelect('PUBLISHED')}
            className={`rounded-2xl border px-4 py-3 text-left transition ${
              current === 'PUBLISHED'
                ? 'border-emerald-400 bg-emerald-50 text-emerald-800 shadow-sm'
                : 'border-black/10 bg-white hover:border-emerald-300 hover:bg-emerald-50/70'
            }`}
          >
            <span className="block text-sm font-semibold uppercase tracking-widest">Publish</span>
            <span className="mt-1 block text-xs text-black/60">
              Pengunjung diarahkan langsung ke halaman program yang baru Anda simpan.
            </span>
          </button>
        </div>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Tutup</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

function HeaderSummary({
  page,
  status,
  onOpenStatusDialog,
}: {
  page: AdminProgramPage
  status: ProgramPageStatus
  onOpenStatusDialog: () => void
}) {
  return (
    <header className="flex flex-col gap-4 border-b border-black/5 pb-6 md:flex-row md:items-center md:justify-between">
      <div>
        <h2 className="text-lg font-semibold text-[#1c2974]">{programLabels[page.program]}</h2>
        <p className="text-xs uppercase tracking-widest text-black/50">
          Terakhir diperbarui {new Date(page.updatedAt).toLocaleString('id-ID')}
        </p>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <span
          className={`rounded-full px-4 py-1 text-xs font-semibold uppercase tracking-widest ${
            status === 'PUBLISHED'
              ? 'bg-emerald-100 text-emerald-700'
              : 'bg-amber-100 text-amber-800'
          }`}
        >
          {status === 'PUBLISHED' ? 'Publish' : 'Development'}
        </span>
        <button
          type="button"
          onClick={onOpenStatusDialog}
          className="rounded-full border border-black/10 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#1c2974] transition hover:border-[#1c2974]/40 hover:bg-[#1c2974]/10"
        >
          Atur Status
        </button>
        {page.updatedBy?.name ? (
          <span className="rounded-full bg-[#1c2974]/10 px-4 py-1 text-xs font-medium text-[#1c2974]">
            oleh {page.updatedBy.name}
          </span>
        ) : null}
      </div>
    </header>
  )
}
