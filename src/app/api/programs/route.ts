import { NextResponse } from 'next/server'

import { db } from '@/lib/db'

export async function GET() {
  const programs = await db.programContent.findMany({
    orderBy: { program: 'asc' },
  })

  return NextResponse.json(programs)
}
