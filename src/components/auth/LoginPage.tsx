'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2 } from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';
import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { formatPhone, isValidPhone } from '@/lib/utlils/phone';
import { useAuth, User } from '@/Providers/auth-provider';
import { useRedirectIfLoggedIn } from '@/hooks/useRedirectIfLoggedIn';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { signIn } = useAuth();
  const [phoneDigits, setPhoneDigits] = useState('');
  const phone = formatPhone(phoneDigits);
  const isValid = isValidPhone(phoneDigits);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();
  const callback = searchParams.get('callback') || '/inicio';

  useRedirectIfLoggedIn(callback);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValid || isLoading) return;

    setIsLoading(true);
    try {
      const res = await fetch(
        `/api/users?phone=${encodeURIComponent(phoneDigits)}`
      );
      if (res.ok) {
        const user = (await res.json()) as User;
        signIn(user);
        router.push(callback);
      } else if (res.status === 404) {
        router.push(
          `/entrar/concluir?callback=${encodeURIComponent(
            callback
          )}&phone=${encodeURIComponent(phoneDigits)}`
        );
      } else {
        console.error('Erro ao verificar telefone');
      }
    } finally {
      setIsLoading(false);
    }
  }

  function handlePhoneKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key !== 'Backspace') return;

    const start = e.currentTarget.selectionStart ?? 0;
    const end = e.currentTarget.selectionEnd ?? start;
    const formatted = formatPhone(phoneDigits);
    const digitsBeforeStart = formatted
      .slice(0, start)
      .replace(/\D/g, '').length;
    const digitsBeforeEnd = formatted.slice(0, end).replace(/\D/g, '').length;

    if (start === end) {
      if (digitsBeforeStart === 0) return;
      const idx = digitsBeforeStart - 1;
      setPhoneDigits(phoneDigits.slice(0, idx) + phoneDigits.slice(idx + 1));
    } else {
      setPhoneDigits(
        phoneDigits.slice(0, digitsBeforeStart) +
          phoneDigits.slice(digitsBeforeEnd)
      );
    }

    e.preventDefault();
  }

  const forgotPasswordHref = `/esqueci-senha?callback=${encodeURIComponent(
    callback
  )}`;

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
          <Link href='/inicio'>
            <Image
              src='/svg/logoNavBar.svg'
              alt='Logo Casamento, Maria Eduarda e Rafael Omodei'
              height={42}
              width={42}
            />
          </Link>
          <h1 className='text-2xl'>Entrar</h1>

          <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='phone'>Número de telefone</Label>
              <Input
                id='phone'
                type='tel'
                placeholder='Ex: (45) 9 9876 - 5432'
                pattern='\(\d{2}\) \d \d{4} - \d{4}'
                inputMode='numeric'
                value={phone}
                onChange={(e) =>
                  setPhoneDigits(
                    e.currentTarget.value.replace(/\D/g, '').slice(0, 11)
                  )
                }
                onKeyDown={handlePhoneKeyDown}
                required
              />
            </div>

            <Button
              className='w-full'
              type='submit'
              disabled={!isValid || isLoading}
            >
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

          <div className='flex flex-col gap-1 text-sm text-muted-foreground'>
            <span>Esqueceu sua senha?</span>
            <Link
              href={forgotPasswordHref}
              className='text-primary underline-offset-2 hover:underline'
            >
              Recuperar acesso
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}

export default function LoginPage() {
  return <Suspense fallback={null}><LoginForm /></Suspense>;
}
