import { NextResponse } from 'next/server'
import '@/infra/repositories/firebase/admin'
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
    const bucketName = process.env.FIREBASE_STORAGE_BUCKET
    if (!bucketName) {
      throw new Error('FIREBASE_STORAGE_BUCKET is not set')
    }
    const bucket = getStorage().bucket(bucketName)
    const bucketFile = bucket.file(fileName)
    await bucketFile.save(buffer, {
      metadata: { contentType: file.type },
    })
    await bucketFile.makePublic()
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
