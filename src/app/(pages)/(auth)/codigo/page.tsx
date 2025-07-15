'use client'

import { Suspense, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Button } from '@/components/ui/button'
import { formatPhone } from '@/lib/utlils/phone'

function CodigoForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callback = searchParams.get('callback') || '/'
  const phone = searchParams.get('phone') || ''

  const length = 6
  const [code, setCode] = useState('')
  const [secondsLeft, setSecondsLeft] = useState(60)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  useEffect(() => {
    if (secondsLeft <= 0) return
    const id = setInterval(() => setSecondsLeft((s) => s - 1), 1000)
    return () => clearInterval(id)
  }, [secondsLeft])

  useEffect(() => {
    if (code.length === length) {
      verify()
    } else {
      setError(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [code])

  function verify() {
    if (isLoading || code.length !== length) return
    setIsLoading(true)
    setError(false)
    setTimeout(() => {
      if (code === '123456') {
        router.push(
          `/entrar/concluir?callback=${encodeURIComponent(callback)}&phone=${encodeURIComponent(phone)}`,
        )
      } else {
        setError(true)
      }
      setIsLoading(false)
    }, 1000)
  }

  function handleResend() {
    setSecondsLeft(60)
    // Código de reenvio real seria aqui
  }

  return (
    <main className='flex flex-col gap-4 p-4 max-w-6xl items-center text-center'>
      <PageBreadcrumb />
      <h1 className='text-2xl'>Código de verificação</h1>
      <p>
        Enviamos um código para o número {formatPhone(phone)}.<br />Informe-o para
        continuar.
      </p>
      <InputOTP
        value={code}
        onChange={setCode}
        maxLength={length}
        aria-invalid={error}
      >
        <InputOTPGroup>
          {Array.from({ length }).map((_, index) => (
            <InputOTPSlot key={index} index={index} />
          ))}
        </InputOTPGroup>
      </InputOTP>
      {error && (
        <p className='text-destructive text-sm'>
          Código inválido. Verifique se está correto.
        </p>
      )}
      <div className='flex gap-2 justify-center'>
        <Button
          type='button'
          variant='outline'
          onClick={handleResend}
          disabled={secondsLeft > 0}
        >
          {secondsLeft > 0 ? `Reenviar código (${secondsLeft}s)` : 'Reenviar código'}
        </Button>
        <Button
          type='button'
          onClick={verify}
          disabled={code.length !== length || error}
        >
          {isLoading ? 'Validando...' : 'Confirmar código'}
        </Button>
      </div>
    </main>
  )
}

export default function CodigoPage() {
  return (
    <Suspense fallback={null}>
      <CodigoForm />
    </Suspense>
  )
}
