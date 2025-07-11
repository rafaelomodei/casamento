'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import PageBreadcrumb from '@/components/PageBreadcrumb'

export default function EntrarPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [phone, setPhone] = useState('')

  const callback = searchParams.get('callback') || '/'  

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!phone.trim()) return
    router.push(`/codigo?callback=${encodeURIComponent(callback)}&phone=${encodeURIComponent(phone)}`)
  }

  return (
    <main className='flex flex-col gap-4 p-4 max-w-6xl'>
      <PageBreadcrumb />
      <h1 className='text-2xl'>Entrar</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-sm'>
        <Input
          type='tel'
          placeholder='Número de telefone'
          value={phone}
          onChange={(e) => setPhone(e.currentTarget.value)}
          required
        />
        <Button type='submit'>Enviar código</Button>
      </form>
    </main>
  )
}
