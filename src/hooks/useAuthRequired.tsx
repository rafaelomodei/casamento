import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/Providers/auth-provider'
import AuthPrompt from '@/components/AuthPrompt/AuthPrompt'

export function useAuthRequired() {
  const { user } = useAuth()
  const router = useRouter()
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
    const url = callback || window.location.href
    router.push(`/entrar?callback=${encodeURIComponent(url)}`)
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
