'use client';

import { useEffect, useState } from 'react';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Button } from '@/components/ui/button';
import { useAuthRequired } from '@/hooks/useAuthRequired';
import { useAuth, User } from '@/Providers/auth-provider';
import { CalendarCheck2, Check, X } from 'lucide-react';

export default function ConfirmarPresencaPage() {
  const { requireAuth, dialog } = useAuthRequired();
  const { user } = useAuth();
  const [members, setMembers] = useState<User[]>([]);
  const [message, setMessage] = useState('');
  const commonMessage =
    'Sua resposta foi registrada. Agradecemos por nos avisar.';
  const loginMessage = 'Para confirmar presença, faça login ou cadastre-se.';

  useEffect(() => {
    async function loadFamily() {
      if (user?.familyId) {
        const res = await fetch(`/api/users?familyId=${user.familyId}`);
        if (res.ok) {
          const data = (await res.json()) as User[];
          setMembers(data);
        }
      } else if (user) {
        setMembers([user]);
      }
    }
    loadFamily();
  }, [user]);

  async function sendAttendance(userId: string, attending: boolean) {
    if (!requireAuth(loginMessage)) return;
    try {
      await fetch('/api/attendances', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId,
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
        <div className='flex flex-col gap-4 w-full'>
          {members.map((m) => (
            <div key={m.id} className='flex flex-col items-center gap-2'>
              <p className='text-lg'>Você confirma a presença de {m.name}?</p>
              <div className='flex gap-2 text-lg'>
                <Button
                  onClick={() => sendAttendance(m.id, true)}
                  className='text-lg bg-secondary hover:bg-secondary/90'
                >
                  <Check className='h-8 w-8 mr-2' />
                  Sim
                </Button>
                <Button
                  variant='outline'
                  className='text-lg'
                  onClick={() => sendAttendance(m.id, false)}
                >
                  <X className='h-4 w-4 mr-2' />
                  Não
                </Button>
              </div>
            </div>
          ))}
        </div>
        {message && <p className='text-md'>{message}</p>}
        {dialog}
      </div>
    </main>
  );
}
