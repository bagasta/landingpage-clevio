import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { z } from 'zod'

import { ProgramKey } from '@prisma/client'

import { authOptions } from '@/lib/auth'
import { db } from '@/lib/db'

const bodySchema = z.object({
  titleId: z.string().min(2),
  titleEn: z.string().min(2),
  descriptionId: z.string().min(10),
  descriptionEn: z.string().min(10),
  ctaLabelId: z.string().min(2),
  ctaLabelEn: z.string().min(2),
  imageAltId: z.string().min(2),
  imageAltEn: z.string().min(2),
})

export async function PATCH(
  request: Request,
  { params }: { params: { program: string } }
) {
  const session = await getServerSession(authOptions)

  if (!session?.user) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 })
  }

  const programKey = params.program?.toUpperCase()

  if (
    programKey !== 'INNOVATOR_CAMP' &&
    programKey !== 'INNOVATOR_PRO' &&
    programKey !== 'AI_ASSISTANTS'
  ) {
    return NextResponse.json({ message: 'Program tidak ditemukan.' }, { status: 404 })
  }

  const json = await request.json().catch(() => null)
  const parsed = bodySchema.safeParse(json)

  if (!parsed.success) {
    return NextResponse.json(
      { message: 'Data tidak valid.', issues: parsed.error.flatten() },
      { status: 400 }
    )
  }

  const data = parsed.data

  await db.programContent.update({
    where: { program: programKey as ProgramKey },
    data: {
      titleId: data.titleId,
      titleEn: data.titleEn,
      descriptionId: data.descriptionId,
      descriptionEn: data.descriptionEn,
      ctaLabelId: data.ctaLabelId,
      ctaLabelEn: data.ctaLabelEn,
      imageAltId: data.imageAltId,
      imageAltEn: data.imageAltEn,
      updatedById: session.user.id,
    },
  })

  return NextResponse.json({ message: 'Program updated' })
}
