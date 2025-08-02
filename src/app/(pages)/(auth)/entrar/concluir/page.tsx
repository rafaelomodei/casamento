'use client'

import { Suspense, useState, useEffect } from 'react'
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
  const [avatar, setAvatar] = useState('')

  const avatars = {
    male: ['/png/avatars/male/01.png', '/png/avatars/male/02.png', '/png/avatars/male/03.png'],
    female: ['/png/avatars/female/01.png', '/png/avatars/female/02.png'],
  }

  useEffect(() => {
    const options = avatars[sex]
    setAvatar(options[Math.floor(Math.random() * options.length)])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sex])

  const isNameValid = name.trim().length >= 3
  const isFormValid = isNameValid && avatar

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
        <div className='flex gap-2'>
          {avatars[sex].map((img) => (
            <button
              type='button'
              key={img}
              onClick={() => setAvatar(img)}
              className={cn(
                'rounded-full ring-2 p-0 overflow-hidden',
                avatar === img ? 'ring-primary' : 'ring-transparent',
              )}
            >
              <Image src={img} alt='' width={64} height={64} />
            </button>
          ))}
        </div>
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
