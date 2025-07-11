'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Label } from '@/components/ui/label'
import { formatPhone, isValidPhone } from '@/lib/utlils/phone'

export default function CadastroPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callback = searchParams.get('callback') || '/'

  const [name, setName] = useState('')
  const [sex, setSex] = useState<'male' | 'female'>('male')
  const [phoneDigits, setPhoneDigits] = useState('')
  const phone = formatPhone(phoneDigits)
  const isValid = isValidPhone(phoneDigits)
  const [avatar, setAvatar] = useState('')

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isValid) return
    router.push(`/codigo?callback=${encodeURIComponent(callback)}&phone=${encodeURIComponent(phoneDigits)}`)
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
        <div className='flex items-center gap-2'>
          <Label htmlFor='sexo'>Sexo:</Label>
          <select
            id='sexo'
            value={sex}
            onChange={(e) => setSex(e.currentTarget.value as 'male' | 'female')}
            className='border-input rounded-md px-3 py-1 bg-transparent text-base'
          >
            <option value='male'>Masculino</option>
            <option value='female'>Feminino</option>
          </select>
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
        <Input
          type='text'
          placeholder='Avatar URL'
          value={avatar}
          onChange={(e) => setAvatar(e.currentTarget.value)}
        />
        <Button type='submit' disabled={!isValid}>
          Entrar
        </Button>
      </form>
    </main>
  )
}
