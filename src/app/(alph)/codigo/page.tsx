'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import PageBreadcrumb from '@/components/PageBreadcrumb'

export default function CodigoPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callback = searchParams.get('callback') || '/'
  const [code, setCode] = useState('')
  const length = 6

  useEffect(() => {
    if (code.length === length) {
      router.push(callback)
    }
  }, [code, callback, router])

  return (
    <main className='flex flex-col gap-4 p-4 max-w-6xl'>
      <PageBreadcrumb />
      <h1 className='text-2xl'>Informe o código</h1>
      <InputOTP value={code} onChange={setCode} maxLength={length}>
        <InputOTPGroup>
          {Array.from({ length }).map((_, index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>
    </main>
  )
}
