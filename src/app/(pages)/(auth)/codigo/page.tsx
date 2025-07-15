'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, useEffect, useRef } from 'react'
import {
  PhoneAuthProvider,
  signInWithCredential,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from 'firebase/auth'
import { auth } from '@/infra/repositories/firebase/config'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@/components/ui/input-otp'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Button } from '@/components/ui/button'
import { formatPhone } from '@/lib/utlils/phone'

export default function CodigoPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callback = searchParams.get('callback') || '/'
  const phone = searchParams.get('phone') || ''

  const length = 6
  const [code, setCode] = useState('')
  const [verificationId, setVerificationId] = useState('')
  const [secondsLeft, setSecondsLeft] = useState(60)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)
  const verifierRef = useRef<RecaptchaVerifier | null>(null)

  useEffect(() => {
    const id = sessionStorage.getItem('verificationId') || ''
    if (!id) {
      router.push('/entrar')
      return
    }
    setVerificationId(id)
    if (auth && !verifierRef.current) {
      verifierRef.current = new RecaptchaVerifier(
        auth,
        'recaptcha-container',
        { size: 'invisible' },
      )
      verifierRef.current.render().catch(() => {})
    }
  }, [])

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
    if (isLoading || code.length !== length || !auth) return
    setIsLoading(true)
    setError(false)
    const credential = PhoneAuthProvider.credential(verificationId, code)
    signInWithCredential(auth, credential)
      .then(() => {
        router.push(`/entrar/concluir?callback=${encodeURIComponent(callback)}`)
      })
      .catch(() => {
        setError(true)
      })
      .finally(() => {
        setIsLoading(false)
      })
  }

  function handleResend() {
    if (!auth || !verifierRef.current) return
    signInWithPhoneNumber(auth, `+55${phone}`, verifierRef.current)
      .then((result) => {
        sessionStorage.setItem('verificationId', result.verificationId)
        setVerificationId(result.verificationId)
        setSecondsLeft(60)
      })
      .catch(() => {})
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
      <div id='recaptcha-container' />
    </main>
  )
}
