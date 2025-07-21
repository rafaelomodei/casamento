'use client'

import { useRouter, useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'
import {
  signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '@/infra/repositories/firebase/config'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Loader2 } from 'lucide-react'
import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel'
import { useIsMobile } from '@/hooks/use-mobile'
import Image from 'next/image'
import Link from 'next/link'
import { useAuth } from '@/Providers/auth-provider'

export default function EntrarPage() {
  return (
    <Suspense fallback={null}>
      <EntrarForm />
    </Suspense>
  )
}

function EntrarForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const isMobile = useIsMobile()
  const callback = searchParams.get('callback') || '/'
  const { signIn } = useAuth()

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (!auth || isLoading) return

    setIsLoading(true)
    setError('')
    try {
      const cred = await signInWithEmailAndPassword(auth, email, password)
      const token = await cred.user.getIdToken()
      const res = await fetch(`/api/users?id=${cred.user.uid}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      if (res.ok) {
        const data = await res.json()
        signIn({
          name: data.name as string,
          avatar: data.avatar as string,
          phone: data.phone as string,
          sex: data.sex as 'male' | 'female',
          email: data.email as string,
        })
        router.push(callback)
      } else {
        router.push(
          `/entrar/concluir?callback=${encodeURIComponent(callback)}&email=${encodeURIComponent(email)}`
        )
      }
    } catch (err: any) {
      if (err.code === 'auth/user-not-found') {
        router.push(
          `/entrar/concluir?callback=${encodeURIComponent(callback)}&email=${encodeURIComponent(email)}`
        )
      } else if (err.code === 'auth/wrong-password') {
        setError('Senha incorreta.')
      } else {
        setError('Não foi possível entrar.')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className='flex w-full h-screen'>
      {!isMobile && (
        <div className='hidden md:block relative h-full w-[30vw] max-w-[500px]'>
          <ImageCarousel
            images={[
              '/png/preWedding/DSC03183.jpg',
              '/png/preWedding/DSC03184.jpg',
              '/png/preWedding/DSC03190.jpg',
              '/png/preWedding/DSC03198.jpg',
              '/png/preWedding/DSC03208.jpg',
            ]}
            alt='Fotos do casal'
            className='h-full w-full'
            showControls={false}
            hoverControls={false}
            autoPlayInterval={4000}
            showIndicators
          />
        </div>
      )}

      <div className='flex flex-col flex-1 items-center justify-center p-4'>
        <div className='flex flex-col gap-4 w-full max-w-[256px] items-start'>
          <Link href='/'>
            <Image
              src='/svg/logoNavBar.svg'
              alt='Logo Casamento, Maria Eduarda e Rafael Omodei'
              height={42}
              width={42}
            />
          </Link>
          <h1 className='text-2xl'>Entrar</h1>
          <p className='text-sm text-muted-foreground'>
            Informe seu e-mail e senha. Se ainda não tiver conta, você será encaminhado ao cadastro automaticamente.
          </p>
          <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='email'>E-mail</Label>
              <Input
                id='email'
                type='email'
                placeholder='seu@email.com'
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                required
              />
            </div>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='password'>Senha</Label>
              <Input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.currentTarget.value)}
                required
              />
            </div>
            {error && <p className='text-destructive text-sm'>{error}</p>}
            <Button className='w-full' type='submit' disabled={isLoading}>
              {isLoading ? (
                <div className='flex items-center gap-2'>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  Entrando...
                </div>
              ) : (
                'Entrar'
              )}
            </Button>
          </form>
        </div>
      </div>
    </main>
  )
}
