'use client'

import { useState, useTransition } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

const schema = z.object({
  email: z.string().email({ message: 'Email tidak valid' }),
  password: z.string().min(6, { message: 'Kata sandi minimal 6 karakter' }),
})

type FormValues = z.infer<typeof schema>

export function AdminLoginForm() {
  const router = useRouter()
  const [error, setError] = useState<string | null>(null)
  const [isPending, startTransition] = useTransition()

  const form = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = (values: FormValues) => {
    setError(null)
    startTransition(async () => {
      const response = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
      })

      if (response?.error) {
        setError('Email atau kata sandi tidak sesuai.')
        return
      }

      router.replace('/admin')
      router.refresh()
    })
  }

  return (
    <div className="w-full max-w-sm rounded-3xl border border-black/5 bg-white/90 p-8 shadow-lg backdrop-blur">
      <h1 className="text-2xl font-semibold text-[#1c2974]">Admin Portal</h1>
      <p className="mt-2 text-sm text-black/60">
        Masuk untuk mengelola konten program Clevio.
      </p>

      <form className="mt-8 space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-2">
          <label className="block text-xs font-medium uppercase tracking-widest text-black/70">
            Email
          </label>
          <input
            type="email"
            className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-black shadow-inner focus:border-[#1c2974] focus:outline-none focus:ring-2 focus:ring-[#1c2974]/20"
            placeholder="you@clevio.com"
            {...form.register('email')}
          />
          {form.formState.errors.email && (
            <p className="text-xs text-red-500">
              {form.formState.errors.email.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <label className="block text-xs font-medium uppercase tracking-widest text-black/70">
            Kata Sandi
          </label>
          <input
            type="password"
            className="w-full rounded-xl border border-black/10 bg-white/70 px-4 py-3 text-sm text-black shadow-inner focus:border-[#1c2974] focus:outline-none focus:ring-2 focus:ring-[#1c2974]/20"
            placeholder="••••••••"
            {...form.register('password')}
          />
          {form.formState.errors.password && (
            <p className="text-xs text-red-500">
              {form.formState.errors.password.message}
            </p>
          )}
        </div>

        {error ? (
          <p className="rounded-lg bg-red-50 px-4 py-3 text-xs text-red-600">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={isPending}
          className="w-full rounded-full bg-[#1c2974] px-4 py-3 text-sm font-semibold text-white transition hover:bg-black disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isPending ? 'Memproses…' : 'Masuk'}
        </button>
      </form>

      <p className="mt-6 text-center text-xs text-black/50">
        Gunakan akun resmi admin Clevio untuk mengelola konten.
      </p>
    </div>
  )
}
