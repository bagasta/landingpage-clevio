import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

import { ProgramKey } from '@prisma/client'

import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

const bodySchema = z.object({
  data: z.any(),
})

const allowedPrograms: ProgramKey[] = ['INNOVATOR_CAMP', 'INNOVATOR_PRO', 'AI_ASSISTANTS']

export async function PATCH(
  request: Request,
  { params }: { params: { program: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const programKey = params.program?.toUpperCase()

  if (!allowedPrograms.includes(programKey as ProgramKey)) {
    return NextResponse.json({ message: 'Program tidak ditemukan.' }, { status: 404 })
  }

  const json = await request.json().catch(() => null)
  const parsed = bodySchema.safeParse(json)

  if (!parsed.success) {
    return NextResponse.json(
      { message: 'Data tidak valid.' },
      { status: 400 }
    )
  }

  await db.programPageContent.upsert({
    where: { program: programKey as ProgramKey },
    update: {
      data: parsed.data.data,
      updatedById: session.user.id,
    },
    create: {
      program: programKey as ProgramKey,
      data: parsed.data.data,
      updatedById: session.user.id,
    },
  })

  return NextResponse.json({ message: 'Halaman program diperbarui.' })
}
