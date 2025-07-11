'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { cn } from '@/lib/utils'
import { formatPhone, isValidPhone } from '@/lib/utlils/phone'

export default function CadastroPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callback = searchParams.get('callback') || '/'

  const [name, setName] = useState('')
  const [sex, setSex] = useState<'male' | 'female'>('male')
  const [phoneDigits, setPhoneDigits] = useState('')
  const phone = formatPhone(phoneDigits)
  const isPhoneValid = isValidPhone(phoneDigits)
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
  const isFormValid = isPhoneValid && isNameValid && avatar

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isFormValid) return
    router.push(
      `/codigo?callback=${encodeURIComponent(callback)}&phone=${encodeURIComponent(
        phoneDigits,
      )}`,
    )
  }

  return (
    <main className='flex flex-col gap-4 p-4 max-w-6xl'>
      <PageBreadcrumb />
      <h1 className='text-2xl'>Cadastro</h1>
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
        <Input
          type='tel'
          placeholder='Número de telefone'
          pattern='\(\d{2}\) \d \d{4} - \d{4}'
          inputMode='numeric'
          value={phone}
          onChange={(e) =>
            setPhoneDigits(e.currentTarget.value.replace(/\D/g, '').slice(0, 11))
          }
          required
        />
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
          Realizar cadastro
        </Button>
      </form>
    </main>
  )
}
