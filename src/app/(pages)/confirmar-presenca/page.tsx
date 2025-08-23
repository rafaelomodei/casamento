'use client'

import { useState } from 'react'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Button } from '@/components/ui/button'
import { useAuthRequired } from '@/hooks/useAuthRequired'
import { useAuth } from '@/Providers/auth-provider'

export default function ConfirmarPresencaPage() {
  const { requireAuth, dialog } = useAuthRequired()
  const { user } = useAuth()
  const [message, setMessage] = useState('')
  const commonMessage =
    'Sua resposta foi registrada. Agradecemos por nos avisar.'
  const loginMessage =
    'Para confirmar presença, faça login ou cadastre-se.'

  async function sendAttendance(attending: boolean) {
    if (!requireAuth(loginMessage)) return
    if (!user) return
    try {
      await fetch('/api/attendances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          attending,
        }),
      })
      setMessage(commonMessage)
    } catch (err) {
      console.error('Erro ao registrar presença:', err)
    }
  }

  return (
    <main className='flex flex-col gap-4 p-4 min-h-screen max-w-6xl'>
      <PageBreadcrumb />
      <h1 className='text-2xl'>Confirmação de presença</h1>
      <p className='text-sm'>
        Confirme se você estará conosco na cerimônia e festa do casamento.
      </p>
      <div className='flex gap-2'>
        <Button onClick={() => sendAttendance(true)}>
          Confirmo minha presença
        </Button>
        <Button variant='outline' onClick={() => sendAttendance(false)}>
          Não poderei comparecer
        </Button>
      </div>
      {message && <p className='text-sm'>{message}</p>}
      {dialog}
    </main>
  )
}
