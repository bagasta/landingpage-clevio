import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

import { ProgramKey, ProgramPageStatus } from '@prisma/client'

import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'
import { campContent } from '@/content/camp'
import { innovatorProContent } from '@/content/innovator-pro'
import { aiAssistantsContent } from '@/content/ai-assistants'

const bodySchema = z
  .object({
    data: z.any().optional(),
    status: z.nativeEnum(ProgramPageStatus).optional(),
  })
  .refine((value) => value.data !== undefined || value.status !== undefined, {
    message: 'Tidak ada perubahan yang dikirim.',
  })

const allowedPrograms: ProgramKey[] = ['INNOVATOR_CAMP', 'INNOVATOR_PRO', 'AI_ASSISTANTS']

const fallbackContent: Record<ProgramKey, unknown> = {
  INNOVATOR_CAMP: campContent,
  INNOVATOR_PRO: innovatorProContent,
  AI_ASSISTANTS: aiAssistantsContent,
}

export async function PATCH(
  request: Request,
  context: { params: Promise<{ program: string }> }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const { program } = await context.params
  const programKey = program?.toUpperCase()

  if (!allowedPrograms.includes(programKey as ProgramKey)) {
    return NextResponse.json({ message: 'Program tidak ditemukan.' }, { status: 404 })
  }

  const json = await request.json().catch(() => null)
  const parsed = bodySchema.safeParse(json)

  if (!parsed.success) {
    return NextResponse.json(
      { message: parsed.error.errors[0]?.message ?? 'Data tidak valid.' },
      { status: 400 }
    )
  }

  const payload = parsed.data
  const updateData: Record<string, unknown> = { updatedById: session.user.id }
  if (payload.data !== undefined) {
    updateData.data = payload.data
  }
  if (payload.status !== undefined) {
    updateData.status = payload.status
  }

  await db.programPageContent.upsert({
    where: { program: programKey as ProgramKey },
    update: updateData,
    create: {
      program: programKey as ProgramKey,
      data: payload.data ?? fallbackContent[programKey as ProgramKey],
      status: payload.status ?? ProgramPageStatus.PUBLISHED,
      updatedById: session.user.id,
    },
  })

  return NextResponse.json({ message: 'Halaman program diperbarui.' })
}
