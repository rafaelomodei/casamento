import Image from 'next/image'
import BackgroundCarousel from '@/components/BackgroundCarousel'
import { Card, CardContent } from '@/components/ui/card'

export const metadata = {
  title: 'Login',
}

export default function LoginPage() {
  return (
    <div className='relative h-screen w-screen overflow-hidden'>
      {/* Desktop carousel */}
      <div className='hidden sm:block absolute inset-0'>
        <BackgroundCarousel />
      </div>
      {/* Mobile background carousel with gradient */}
      <div className='sm:hidden absolute inset-0'>
        <BackgroundCarousel />
        <div className='absolute inset-0 bg-gradient-to-t from-background to-transparent' />
      </div>
      <div className='relative flex h-full items-end sm:items-center justify-center pb-4 sm:pb-0'>
        <Card className='w-full max-w-sm bg-card/80 backdrop-blur mx-4'>
          <CardContent className='space-y-4 py-6'>
            <div className='flex justify-center'>
              <Image src='/logo.svg' alt='Logo' width={64} height={64} />
            </div>
            <form className='space-y-3'>
              <input
                type='email'
                placeholder='Email'
                className='w-full rounded-md border p-2'
              />
              <input
                type='password'
                placeholder='Senha'
                className='w-full rounded-md border p-2'
              />
              <button
                type='submit'
                className='w-full rounded-md bg-primary p-2 text-primary-foreground'
              >
                Entrar
              </button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
