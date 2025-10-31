import { NextResponse } from 'next/server'

import { ProgramKey } from '@prisma/client'

import { db } from '@/lib/db'
import { campContent } from '@/content/camp'
import { innovatorProContent } from '@/content/innovator-pro'
import { aiAssistantsContent } from '@/content/ai-assistants'

const fallbackContent: Record<ProgramKey, unknown> = {
  INNOVATOR_CAMP: campContent,
  INNOVATOR_PRO: innovatorProContent,
  AI_ASSISTANTS: aiAssistantsContent,
}

export async function GET(
  _request: Request,
  { params }: { params: { program: string } }
) {
  const programKey = params.program?.toUpperCase()

  if (
    programKey !== 'INNOVATOR_CAMP' &&
    programKey !== 'INNOVATOR_PRO' &&
    programKey !== 'AI_ASSISTANTS'
  ) {
    return NextResponse.json({ message: 'Program tidak ditemukan.' }, { status: 404 })
  }

  const record = await db.programPageContent.findUnique({
    where: { program: programKey as ProgramKey },
  })

  const data = record?.data ?? fallbackContent[programKey as ProgramKey]

  return NextResponse.json({ program: programKey, data })
}
