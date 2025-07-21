'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { cn } from '@/lib/utils'
import { useAuth } from '@/Providers/auth-provider'
import { useRedirectIfLoggedIn } from '@/hooks/useRedirectIfLoggedIn'
import { auth } from '@/infra/repositories/firebase/config'
import { registerIfNotExists } from '@/lib/auth'
import { formatPhone, isValidPhone } from '@/lib/utlils/phone'

function CadastroForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callback = searchParams.get('callback') || '/'
  const email = (searchParams.get('email') || '').trim().toLowerCase()
  useRedirectIfLoggedIn(callback)
  const { signIn } = useAuth()

  const [name, setName] = useState('')
  const [sex, setSex] = useState<'male' | 'female'>('male')
  const [avatar, setAvatar] = useState('')
  const [phoneDigits, setPhoneDigits] = useState('')
  const phone = formatPhone(phoneDigits)
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

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
  const isPasswordValid = password.length >= 6
  const isPhoneValid = isValidPhone(phoneDigits)
  const isFormValid =
    isNameValid &&
    isPhoneValid &&
    isPasswordValid &&
    confirmPassword === password &&
    avatar

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isFormValid || !auth) return

    try {
      const result = await registerIfNotExists(email, password)
      if (!result.ok || !result.user) return
      signIn({ name, avatar, phone, sex, email })
      const token = await result.user.getIdToken()
      fetch('/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: token ? `Bearer ${token}` : '',
        },
        body: JSON.stringify({
          name,
          avatar,
          sex,
          phone,
          email,
          downloads: 0,
        }),
      }).finally(() => {
        router.push(callback)
      })
    } catch {
      // ignore errors
    }
  }

  function handlePhoneKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Backspace') return
    const start = e.currentTarget.selectionStart ?? 0
    const end = e.currentTarget.selectionEnd ?? start
    const formatted = formatPhone(phoneDigits)
    const digitsBeforeStart = formatted.slice(0, start).replace(/\D/g, '').length
    const digitsBeforeEnd = formatted.slice(0, end).replace(/\D/g, '').length
    if (start === end) {
      if (digitsBeforeStart === 0) return
      const idx = digitsBeforeStart - 1
      setPhoneDigits(phoneDigits.slice(0, idx) + phoneDigits.slice(idx + 1))
    } else {
      setPhoneDigits(
        phoneDigits.slice(0, digitsBeforeStart) + phoneDigits.slice(digitsBeforeEnd)
      )
    }
    e.preventDefault()
  }

  return (
    <main className='flex flex-col gap-4 p-4 max-w-6xl'>
      <PageBreadcrumb />
      <h1 className='text-2xl'>Concluir cadastro</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-sm'>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='name'>Nome completo</Label>
          <Input
            id='name'
            type='text'
            value={name}
            onChange={(e) => setName(e.currentTarget.value)}
            required
          />
        </div>
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
                avatar === img ? 'ring-primary' : 'ring-transparent'
              )}
            >
              <Image src={img} alt='' width={64} height={64} />
            </button>
          ))}
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='phone'>Número de telefone</Label>
          <Input
            id='phone'
            type='tel'
            placeholder='Ex: (45) 9 9876 - 5432'
            pattern='\(\d{2}\) \d \d{4} - \d{4}'
            inputMode='numeric'
            value={phone}
            onChange={(e) =>
              setPhoneDigits(e.currentTarget.value.replace(/\D/g, '').slice(0, 11))
            }
            onKeyDown={handlePhoneKeyDown}
            required
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='password'>Senha (mínimo 6 caracteres)</Label>
          <Input
            id='password'
            type='password'
            value={password}
            onChange={(e) => setPassword(e.currentTarget.value)}
            required
          />
        </div>
        <div className='flex flex-col gap-2'>
          <Label htmlFor='confirm'>Confirmar senha</Label>
          <Input
            id='confirm'
            type='password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.currentTarget.value)}
            required
          />
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
