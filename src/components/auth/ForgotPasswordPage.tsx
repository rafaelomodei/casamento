'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Loader2, CheckCircle2 } from 'lucide-react';

import { useIsMobile } from '@/hooks/use-mobile';
import { ImageCarousel } from '@/components/ImageCarousel/ImageCarousel';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useRedirectIfLoggedIn } from '@/hooks/useRedirectIfLoggedIn';

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function ForgotPasswordPage() {
  const searchParams = useSearchParams();
  const callback = searchParams.get('callback') || '/inicio';
  const loginHref = `/?callback=${encodeURIComponent(callback)}`;
  const isMobile = useIsMobile();

  useRedirectIfLoggedIn(callback);

  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [resetLink, setResetLink] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!emailRegex.test(email)) {
      setError('Informe um e-mail válido.');
      return;
    }

    setIsLoading(true);
    setError(null);
    setSuccessMessage(null);
    setResetLink(null);

    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });

      const data = (await res.json().catch(() => ({}))) as {
        resetLink?: string;
        message?: string;
        error?: string;
      };

      if (!res.ok) {
        throw new Error(data?.error || 'Não foi possível enviar o link de recuperação.');
      }

      setSuccessMessage(
        data?.message ||
          'Enviamos as instruções para redefinir sua senha para o e-mail informado.'
      );
      if (data?.resetLink) {
        setResetLink(data.resetLink);
      }
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Não foi possível enviar o link de recuperação.'
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className='flex w-full h-screen'>
      {!isMobile && (
        <div className='hidden md:block relative h-full w-[30vw] max-w-[500px]'>
          <ImageCarousel
            images={[
              '/png/preWedding/DSC03241.jpg',
              '/png/preWedding/DSC03244.jpg',
              '/png/preWedding/DSC03246.jpg',
              '/png/preWedding/DSC03264.jpg',
              '/png/preWedding/DSC03270.jpg',
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
        <div className='flex flex-col gap-4 w-full max-w-[320px] items-start'>
          <Link href='/inicio'>
            <Image
              src='/svg/logoNavBar.svg'
              alt='Logo Casamento, Maria Eduarda e Rafael Omodei'
              height={42}
              width={42}
            />
          </Link>

          <div className='flex flex-col gap-2'>
            <h1 className='text-2xl'>Recuperar senha</h1>
            <p className='text-sm text-muted-foreground'>
              Informe o e-mail cadastrado para receber o link de redefinição de
              senha.
            </p>
          </div>

          <form onSubmit={handleSubmit} className='flex flex-col gap-4 w-full'>
            <div className='flex flex-col gap-2'>
              <Label htmlFor='email'>E-mail</Label>
              <Input
                id='email'
                type='email'
                inputMode='email'
                autoComplete='email'
                placeholder='voce@email.com'
                value={email}
                onChange={(e) => setEmail(e.currentTarget.value)}
                required
              />
            </div>

            <Button type='submit' disabled={isLoading} className='w-full'>
              {isLoading ? (
                <div className='flex items-center gap-2'>
                  <Loader2 className='h-4 w-4 animate-spin' />
                  Enviando...
                </div>
              ) : (
                'Enviar link de recuperação'
              )}
            </Button>
          </form>

          {error && (
            <p className='text-sm text-destructive'>{error}</p>
          )}

          {successMessage && (
            <div className='flex flex-col gap-3 rounded-md border border-primary/20 bg-primary/5 p-4 text-sm text-primary'>
              <div className='flex items-center gap-2 font-medium'>
                <CheckCircle2 className='h-4 w-4' />
                <span>Solicitação enviada</span>
              </div>
              <p>{successMessage}</p>
              {resetLink && (
                <Button
                  type='button'
                  variant='outline'
                  onClick={() => window.open(resetLink, '_blank', 'noopener')}
                >
                  Abrir link de redefinição
                </Button>
              )}
            </div>
          )}

          <div className='text-sm text-muted-foreground'>
            <span>Lembrou a senha?</span>{' '}
            <Link href={loginHref} className='text-primary underline-offset-2 hover:underline'>
              Voltar para o login
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
}
