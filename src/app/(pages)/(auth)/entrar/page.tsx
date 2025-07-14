'use client';

import { useRouter, useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { formatPhone, isValidPhone } from '@/lib/utlils/phone';

export default function EntrarPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [phoneDigits, setPhoneDigits] = useState('');
  const phone = formatPhone(phoneDigits);
  const isValid = isValidPhone(phoneDigits);

  const callback = searchParams.get('callback') || '/';

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!isValid) return;
    router.push(
      `/codigo?callback=${encodeURIComponent(
        callback
      )}&phone=${encodeURIComponent(phoneDigits)}`
    );
  }

  return (
    <main className='flex flex-col gap-4 p-4 w-full max-w-6xl '>
      <PageBreadcrumb />
      <h1 className='text-2xl'>Entrar</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-sm'>
        <Input
          type='tel'
          placeholder='Número de telefone'
          pattern='\(\d{2}\) \d \d{4} - \d{4}'
          inputMode='numeric'
          value={phone}
          onChange={(e) =>
            setPhoneDigits(
              e.currentTarget.value.replace(/\D/g, '').slice(0, 11)
            )
          }
          required
        />
        <Button type='submit' disabled={!isValid}>
          Entrar
        </Button>
      </form>
    </main>
  );
}
