import { NextResponse } from 'next/server'
import { getStorage } from 'firebase-admin/storage'
import { randomUUID } from 'crypto'

export async function POST(req: Request) {
  try {
    const formData = await req.formData()
    const file = formData.get('file') as File | null
    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 })
    }
    const arrayBuffer = await file.arrayBuffer()
    const buffer = Buffer.from(arrayBuffer)
    const ext = file.type.split('/').pop() || 'png'
    const fileName = `avatars/${randomUUID()}.${ext}`
    const bucket = getStorage().bucket()
    const bucketFile = bucket.file(fileName)
    await bucketFile.save(buffer, {
      contentType: file.type,
      public: true,
    })
    const url = `https://storage.googleapis.com/${bucket.name}/${fileName}`
    return NextResponse.json({ url })
  } catch (err) {
    console.error('Erro ao fazer upload:', err)
    return NextResponse.json(
      { error: 'Upload failed' },
      { status: 500 }
    )
  }
}
