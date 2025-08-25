'use client';

import { useState } from 'react';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Button } from '@/components/ui/button';
import { useAuthRequired } from '@/hooks/useAuthRequired';
import { useAuth } from '@/Providers/auth-provider';
import { CalendarCheck2, Check, Heart, X } from 'lucide-react';
import { formatUserName } from '@/lib/utlils/text';

export default function ConfirmarPresencaPage() {
  const { requireAuth, dialog } = useAuthRequired();
  const { user } = useAuth();
  const [message, setMessage] = useState('');
  const commonMessage =
    'Sua resposta foi registrada. Agradecemos por nos avisar.';
  const loginMessage = 'Para confirmar presença, faça login ou cadastre-se.';

  const displayName = formatUserName(user?.name ?? '');

  async function sendAttendance(attending: boolean) {
    if (!requireAuth(loginMessage)) return;
    if (!user) return;
    try {
      await fetch('/api/attendances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: user.id,
          attending,
        }),
      });
      setMessage(commonMessage);
    } catch (err) {
      console.error('Erro ao registrar presença:', err);
    }
  }

  return (
    <main className='flex flex-col w-full gap-4 p-4 min-h-screen  max-w-6xl '>
      <PageBreadcrumb />
      <div className='flex flex-col gap-6 items-center text-center'>
        <div className='w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4'>
          <CalendarCheck2 className='h-8 w-8 text-se' />
        </div>
        <h1 className='text-3xl'>Confirmação de presença</h1>
        <div>
          {displayName ? (
            <p className='text-lg'>
              Olá,
              <strong>{` ${displayName}`}</strong>!
            </p>
          ) : (
            ''
          )}
          <p className='text-lg'>
            Você confirma sua presença na celebração do casamento de Maria e
            Rafael?
          </p>
        </div>
        <div className='flex gap-2 text-lg'>
          <Button
            onClick={() => sendAttendance(true)}
            className='text-lg bg-secondary hover:bg-secondary/90'
          >
            <Check className='h-8 w-8 mr-2' />
            Sim, Confirmo minha presença
          </Button>
          <Button
            variant='outline'
            className='text-lg'
            onClick={() => sendAttendance(false)}
          >
            <X className='h-4 w-4 mr-2' />
            Não poderei comparecer
          </Button>
        </div>
        {message && <p className='text-md'>{message}</p>}
        {dialog}
      </div>
    </main>
  );
}
