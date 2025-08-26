import { useRouter } from 'next/navigation'

export function useLoginRedirect() {
  const router = useRouter()

  return (callback?: string) => {
    const url = callback || window.location.href
    router.push(`/entrar?callback=${encodeURIComponent(url)}`)
  }
}
