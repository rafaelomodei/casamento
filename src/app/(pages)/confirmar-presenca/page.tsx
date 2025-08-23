'use client'

import { useState } from 'react'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { Button } from '@/components/ui/button'
import { useAuthRequired } from '@/hooks/useAuthRequired'

export default function ConfirmarPresencaPage() {
  const { requireAuth, dialog } = useAuthRequired()
  const [message, setMessage] = useState('')
  const commonMessage =
    'Sua resposta foi registrada. Agradecemos por nos avisar.'

  function handleConfirm() {
    if (!requireAuth('Para confirmar presença, faça login ou cadastre-se.')) return
    setMessage(commonMessage)
  }

  function handleDecline() {
    setMessage(commonMessage)
  }

  return (
    <main className='flex flex-col gap-4 p-4 min-h-screen max-w-6xl'>
      <PageBreadcrumb />
      <h1 className='text-2xl'>Confirmação de presença</h1>
      <p className='text-sm'>
        Confirme se você estará conosco na cerimônia e festa do casamento.
      </p>
      <div className='flex gap-2'>
        <Button onClick={handleConfirm}>Confirmo minha presença</Button>
        <Button variant='outline' onClick={handleDecline}>
          Não poderei comparecer
        </Button>
      </div>
      {message && <p className='text-sm'>{message}</p>}
      {dialog}
    </main>
  )
}

