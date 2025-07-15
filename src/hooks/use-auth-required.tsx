import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/Providers/auth-provider'
import AuthPrompt from '@/components/AuthPrompt/AuthPrompt'

export function useAuthRequired() {
  const { user } = useAuth()
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [callback, setCallback] = useState('')

  function requireAuth(): boolean {
    if (user) return true
    setCallback(window.location.href)
    setOpen(true)
    return false
  }

  function handleConfirm() {
    const url = callback || window.location.href
    router.push(`/entrar?callback=${encodeURIComponent(url)}`)
  }

  const dialog = (
    <AuthPrompt open={open} onOpenChange={setOpen} onConfirm={handleConfirm} />
  )

  return { requireAuth, dialog }
}
