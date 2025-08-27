'use client'

import { Suspense, useState, useEffect, useRef } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { cn } from '@/lib/utils'
import { useAuth, User } from '@/Providers/auth-provider'
import { useRedirectIfLoggedIn } from '@/hooks/useRedirectIfLoggedIn'

function CadastroForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callback = searchParams.get('callback') || '/'
  const phone = searchParams.get('phone') || ''
  useRedirectIfLoggedIn(callback);
  const { signIn } = useAuth()

  const [name, setName] = useState('')
  const [sex, setSex] = useState<'male' | 'female'>('male')
  const [selectedAvatar, setSelectedAvatar] = useState('')
  const [avatar, setAvatar] = useState('')
  const [customAvatarUrl, setCustomAvatarUrl] = useState('')
  const [showUrlInput, setShowUrlInput] = useState(false)
  const [avatarLoaded, setAvatarLoaded] = useState(true)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const avatars = {
    male: ['/png/avatars/male/01.png', '/png/avatars/male/02.png', '/png/avatars/male/03.png'],
    female: ['/png/avatars/female/01.png', '/png/avatars/female/02.png'],
  }

  useEffect(() => {
    const options = avatars[sex]
    setSelectedAvatar(options[Math.floor(Math.random() * options.length)])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sex])

  useEffect(() => {
    if (customAvatarUrl) {
      setAvatar(customAvatarUrl)
    } else {
      setAvatar(selectedAvatar)
    }
    setAvatarLoaded(true)
  }, [customAvatarUrl, selectedAvatar])

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === '.') setShowUrlInput(true)
    }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [])

  const isNameValid = name.trim().length >= 3
  const isFormValid = isNameValid && avatar

  const initials = (() => {
    const [first = '', second = ''] = name.trim().split(' ')
    return `${first.charAt(0)}${second.charAt(0)}`.toUpperCase()
  })()

  async function uploadFile(file: File) {
    const formData = new FormData()
    formData.append('file', file)
    const res = await fetch('/api/upload-avatar', {
      method: 'POST',
      body: formData,
    })
    if (res.ok) {
      const data = await res.json()
      setCustomAvatarUrl(data.url)
    }
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) uploadFile(file)
  }

  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault()
    const file = e.dataTransfer.files[0]
    if (file) uploadFile(file)
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isFormValid) return
    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name,
          avatar,
          sex,
          phone,
          downloads: 0,
        }),
      })
      const user = (await res.json()) as User
      signIn(user)
      router.push(callback)
    } catch (err) {
      console.error('Erro ao criar usuário:', err)
    }
  }

  return (
    <main className='flex flex-col gap-4 p-4 max-w-6xl'>
      <PageBreadcrumb />
      <h1 className='text-2xl'>Concluir cadastro</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-sm'>
        <Input
          type='text'
          placeholder='Nome'
          value={name}
          onChange={(e) => setName(e.currentTarget.value)}
          required
        />
        <div className='flex items-center gap-4'>
          <span>Sexo:</span>
          <label className='flex items-center gap-1 text-sm'>
            <input
              type='radio'
              name='sex'
              value='male'
              checked={sex === 'male'}
              onChange={() => setSex('male')}
              className='size-4 border-input accent-primary'
            />
            Masculino
          </label>
          <label className='flex items-center gap-1 text-sm'>
            <input
              type='radio'
              name='sex'
              value='female'
              checked={sex === 'female'}
              onChange={() => setSex('female')}
              className='size-4 border-input accent-primary'
            />
            Feminino
          </label>
        </div>
        <h2 className='text-xl'>Selecione sua foto de perfil</h2>
        <div className='flex items-center gap-4'>
          <div className='relative size-24 rounded-full bg-muted flex items-center justify-center text-2xl font-bold overflow-hidden'>
            {avatar && avatarLoaded ? (
              <Image
                src={avatar}
                alt=''
                fill
                className='object-cover'
                onError={() => setAvatarLoaded(false)}
              />
            ) : (
              initials
            )}
          </div>
          <div className='flex gap-2'>
            {avatars[sex].map((img) => (
              <button
                type='button'
                key={img}
                onClick={() => setSelectedAvatar(img)}
                className={cn(
                  'rounded-full ring-2 p-0 overflow-hidden',
                  selectedAvatar === img && !customAvatarUrl
                    ? 'ring-primary'
                    : 'ring-transparent',
                )}
              >
                <Image src={img} alt='' width={64} height={64} />
              </button>
            ))}
          </div>
        </div>
        {!customAvatarUrl && (
          <div
            className='border-2 border-dashed rounded p-4 text-center cursor-pointer'
            onDragOver={(e) => e.preventDefault()}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            Arraste e solte uma imagem ou clique para enviar
            <input
              ref={fileInputRef}
              type='file'
              accept='image/*'
              className='hidden'
              onChange={handleFileChange}
            />
          </div>
        )}
        {showUrlInput && (
          <Input
            type='text'
            placeholder='URL da foto'
            value={customAvatarUrl}
            onChange={(e) => setCustomAvatarUrl(e.currentTarget.value)}
          />
        )}
        <input type='hidden' name='avatar' value={avatar} />
        <Button type='submit' disabled={!isFormValid}>
          Concluir cadastro
        </Button>
      </form>
    </main>
  )
}

export default function CadastroPage() {
  return (
    <Suspense fallback={null}>
      <CadastroForm />
    </Suspense>
  )
}
