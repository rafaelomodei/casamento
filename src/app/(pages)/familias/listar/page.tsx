'use client';

import { useEffect, useState } from 'react';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { User } from '@/Providers/auth-provider';

interface Family {
  id: string;
  name: string;
  members: User[];
}

export default function ListaFamiliasPage() {
  const [families, setFamilies] = useState<Family[]>([]);

  useEffect(() => {
    fetch('/api/families')
      .then((res) => res.json())
      .then(setFamilies)
      .catch(() => setFamilies([]));
  }, []);

  return (
    <main className='mx-auto flex w-full max-w-7xl flex-col gap-4 p-4'>
      <PageBreadcrumb />
      <h1 className='text-2xl'>Famílias</h1>
      {families.map((f) => (
        <div key={f.id} className='rounded border p-4'>
          <h2 className='font-semibold'>{f.name}</h2>
          <ul className='ml-4 list-disc'>
            {f.members.map((m) => (
              <li key={m.id}>
                {m.name} - {m.phone}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}
