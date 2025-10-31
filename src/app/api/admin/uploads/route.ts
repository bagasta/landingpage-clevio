import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import crypto from 'crypto'

const uploadDir = path.join(process.cwd(), 'public', 'uploads')

async function ensureUploadDirExists() {
  try {
    await fs.stat(uploadDir)
  } catch (error: any) {
    if (error.code === 'ENOENT') {
      await fs.mkdir(uploadDir, { recursive: true })
    } else {
      throw error
    }
  }
}

export async function POST(request: Request) {
  try {
    await ensureUploadDirExists()

    const formData = await request.formData()
    const file = formData.get('file')

    if (!(file instanceof File)) {
      return NextResponse.json({ message: 'File tidak ditemukan' }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const ext = path.extname(file.name) || '.png'
    const baseName = crypto.randomUUID()
    const fileName = `${baseName}${ext}`
    const filePath = path.join(uploadDir, fileName)

    await fs.writeFile(filePath, buffer)

    const urlPath = `/uploads/${fileName}`

    return NextResponse.json({ path: urlPath })
  } catch (error) {
    console.error('Upload failed', error)
    return NextResponse.json({ message: 'Gagal mengunggah file.' }, { status: 500 })
  }
}
