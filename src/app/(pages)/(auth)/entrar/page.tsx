'use client';


import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef, Suspense } from 'react'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth'
import { auth } from '@/infra/repositories/firebase/config'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { formatPhone, isValidPhone } from '@/lib/utlils/phone'

function EntrarForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [phoneDigits, setPhoneDigits] = useState('');
  const phone = formatPhone(phoneDigits);
  const isValid = isValidPhone(phoneDigits);

  const callback = searchParams.get('callback') || '/'

  const verifierRef = useRef<RecaptchaVerifier | null>(null)

  useEffect(() => {
    if (!auth || verifierRef.current) return
    verifierRef.current = new RecaptchaVerifier(
      auth,
      'recaptcha-container',
      {
        size: 'invisible',
      },
    )
    verifierRef.current.render().catch(() => {})
  }, [])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!isValid || !auth || !verifierRef.current) return
    signInWithPhoneNumber(auth, `+55${phoneDigits}`, verifierRef.current)
      .then((result) => {
        sessionStorage.setItem('verificationId', result.verificationId)
        router.push(
          `/codigo?callback=${encodeURIComponent(callback)}&phone=${encodeURIComponent(phoneDigits)}`,
        )
      })
      .catch(() => {
        // handle error silently
      })
  }

  return (
    <main className='flex flex-col gap-4 p-4 w-full max-w-6xl '>
      <PageBreadcrumb />
      <h1 className='text-2xl'>Entrar</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-sm'>
        <Input
          type='tel'
          placeholder='Número de telefone'
          pattern='\(\d{2}\) \d \d{4} - \d{4}'
          inputMode='numeric'
          value={phone}
          onChange={(e) =>
            setPhoneDigits(
              e.currentTarget.value.replace(/\D/g, '').slice(0, 11)
            )
          }
          required
        />
        <Button type='submit' disabled={!isValid}>
          Entrar
        </Button>
        <div id='recaptcha-container' />
      </form>
    </main>
  );
}

export default function EntrarPage() {
  return (
    <Suspense fallback={null}>
      <EntrarForm />
    </Suspense>
  );
}
