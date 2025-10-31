import { redirect } from 'next/navigation'
import { getServerSession } from 'next-auth'

import { SignOutButton } from '@/components/admin/sign-out-button'
import { AdminDashboardClient } from '@/components/admin/dashboard-client'
import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    redirect('/admin/login')
  }

  const programs = await db.programContent.findMany({
    orderBy: { program: 'asc' },
    include: {
      updatedBy: {
        select: { name: true, email: true },
      },
    },
  })

  const programPages = await db.programPageContent.findMany({
    orderBy: { program: 'asc' },
    include: {
      updatedBy: {
        select: { name: true, email: true },
      },
    },
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-[#f6f7fb] to-[#e9ecf5] px-6 py-12">
      <div className="mx-auto max-w-5xl space-y-12">
        <header className="rounded-3xl border border-black/5 bg-white/80 px-8 py-10 shadow-lg backdrop-blur">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-semibold text-[#1c2974]">Dashboard Admin Clevio</h1>
              <p className="mt-3 text-sm text-black/65">
                Selamat datang, {session.user.name ?? 'Admin'}. Kelola konten setiap program di bawah ini dan simpan untuk memperbarui tampilan landing page.
              </p>
            </div>
            <SignOutButton />
          </div>
        </header>

        <AdminDashboardClient
          landingPrograms={programs.map((program) => ({
            id: program.id,
            program: program.program,
            titleId: program.titleId,
            titleEn: program.titleEn,
            descriptionId: program.descriptionId,
            descriptionEn: program.descriptionEn,
            ctaLabelId: program.ctaLabelId,
            ctaLabelEn: program.ctaLabelEn,
            imageAltId: program.imageAltId,
            imageAltEn: program.imageAltEn,
            updatedAt: program.updatedAt.toISOString(),
            updatedBy: program.updatedBy,
          }))}
          programPages={programPages.map((page) => ({
            program: page.program,
            data: page.data,
            updatedAt: page.updatedAt.toISOString(),
            updatedBy: page.updatedBy,
          }))}
        />
      </div>
    </div>
  )
}
