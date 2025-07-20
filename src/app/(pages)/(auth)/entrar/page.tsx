'use client';

import Script from 'next/script';
import { useRouter, useSearchParams } from 'next/navigation';
import { useState, useEffect, useRef, Suspense } from 'react';
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth as importedAuth } from '@/infra/repositories/firebase/config';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Loader2 } from 'lucide-react';
import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel';
import { useIsMobile } from '@/hooks/use-mobile';
import Image from 'next/image';
import Link from 'next/link';
import { formatPhone, isValidPhone } from '@/lib/utlils/phone';

export default function EntrarPage() {
  return (
    <>
      <Script
        src='https://www.google.com/recaptcha/api.js?render=explicit'
        strategy='afterInteractive'
      />
      <Suspense fallback={null}>
        <EntrarForm />
      </Suspense>
    </>
  );
}

function EntrarForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [phoneDigits, setPhoneDigits] = useState('');
  const phone = formatPhone(phoneDigits);
  const isValid = isValidPhone(phoneDigits);
  const [isLoading, setIsLoading] = useState(false);
  const isMobile = useIsMobile();
  const callback = searchParams.get('callback') || '/';
  const verifierRef = useRef<RecaptchaVerifier | null>(null);

  const auth = importedAuth;

  useEffect(() => {
    if (!auth || verifierRef.current) return;

    verifierRef.current = new RecaptchaVerifier(auth, 'sign-in-button', {
      size: 'invisible',
      callback: (token: string) => {
        console.log('✅ reCAPTCHA resolvido, token:', token);
      },
      'expired-callback': () => {
        console.warn('⚠️ reCAPTCHA expirou');
      },
    });

    verifierRef.current
      .render()
      .then((widgetId) => {
        (window as any).recaptchaWidgetId = widgetId;
        console.log('🔧 reCAPTCHA renderizado, widgetId=', widgetId);
      })
      .catch((err) => {
        console.error('❌ Erro ao renderizar reCAPTCHA:', err);
      });
  }, [auth]);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValid || !auth || !verifierRef.current || isLoading) return;

    setIsLoading(true);
    signInWithPhoneNumber(auth, `+55${phoneDigits}`, verifierRef.current)
      .then((result) => {
        sessionStorage.setItem('verificationId', result.verificationId);
        router.push(
          `/codigo?callback=${encodeURIComponent(
            callback
          )}&phone=${encodeURIComponent(phoneDigits)}`
        );
      })
      .catch((error) => {
        console.error('❌ Erro signInWithPhoneNumber:', error);
        const grecaptcha = (window as any).grecaptcha;
        const widgetId = (window as any).recaptchaWidgetId;
        if (grecaptcha && widgetId != null) {
          grecaptcha.reset(widgetId);
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
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
              id='sign-in-button'
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

            <div id='recaptcha-container' />
          </form>
        </div>
      </div>
    </main>
  );
}
