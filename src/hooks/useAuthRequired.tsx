import { useState } from 'react'
import { useAuth } from '@/Providers/auth-provider'
import AuthPrompt from '@/components/AuthPrompt/AuthPrompt'
import { useLoginRedirect } from '@/hooks/useLoginRedirect'

export function useAuthRequired() {
  const { user } = useAuth()
  const redirectToLogin = useLoginRedirect()
  const [open, setOpen] = useState(false)
  const [callback, setCallback] = useState('')
  const [description, setDescription] = useState(
    'Para continuar, faça login na plataforma.'
  )

  function requireAuth(desc?: string): boolean {
    if (user) return true
    setCallback(window.location.href)
    if (desc) setDescription(desc)
    setOpen(true)
    return false
  }

  function handleConfirm() {
    redirectToLogin(callback)
  }

  const dialog = (
    <AuthPrompt
      open={open}
      onOpenChange={setOpen}
      onConfirm={handleConfirm}
      description={description}
    />
  )

  return { requireAuth, dialog }
}
