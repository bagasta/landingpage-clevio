import { NextResponse } from 'next/server'
import { promises as fs } from 'fs'
import path from 'path'
import crypto from 'crypto'
import sharp from 'sharp'

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

    if (!file || typeof (file as Blob).arrayBuffer !== 'function') {
      return NextResponse.json({ message: 'File tidak ditemukan' }, { status: 400 })
    }

    const blob = file as Blob

    const bytes = await blob.arrayBuffer()
    const buffer = Buffer.from(bytes)

    const widthParam = formData.get('width')
    const heightParam = formData.get('height')
    const fitParam = (formData.get('fit') as string) ?? 'cover'
    const formatParam = (formData.get('format') as string) ?? 'webp'

    const parsedWidth = widthParam ? Number(widthParam) : undefined
    const parsedHeight = heightParam ? Number(heightParam) : undefined

    if (
      (parsedWidth !== undefined && (!Number.isFinite(parsedWidth) || parsedWidth <= 0)) ||
      (parsedHeight !== undefined && (!Number.isFinite(parsedHeight) || parsedHeight <= 0))
    ) {
      return NextResponse.json({ message: 'Dimensi gambar tidak valid.' }, { status: 400 })
    }

    const baseName = crypto.randomUUID()
    const targetExt = formatParam === 'jpeg' || formatParam === 'jpg'
      ? '.jpg'
      : formatParam === 'png'
        ? '.png'
        : '.webp'
    const fileName = `${baseName}${targetExt}`
    const filePath = path.join(uploadDir, fileName)

    const transformer = sharp(buffer, { failOnError: false }).rotate()

    if (parsedWidth || parsedHeight) {
      transformer.resize({
        width: parsedWidth,
        height: parsedHeight,
        fit: fitParam === 'contain' ? 'inside' : 'cover',
        position: 'centre',
        withoutEnlargement: true,
      })
    }

    let outputBuffer: Buffer
    switch (targetExt) {
      case '.jpg':
        outputBuffer = await transformer.jpeg({ quality: 82 }).toBuffer()
        break
      case '.png':
        outputBuffer = await transformer.png({ compressionLevel: 9 }).toBuffer()
        break
      default:
        outputBuffer = await transformer.webp({ quality: 82 }).toBuffer()
        break
    }

    await fs.writeFile(filePath, outputBuffer)

    const urlPath = `/uploads/${fileName}`

    return NextResponse.json({ path: urlPath })
  } catch (error) {
    console.error('Upload failed', error)
    return NextResponse.json({ message: 'Gagal mengunggah file.' }, { status: 500 })
  }
}
