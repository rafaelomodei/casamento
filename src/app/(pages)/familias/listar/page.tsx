'use client';

import { useEffect, useState } from 'react';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { User } from '@/Providers/auth-provider';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';

interface Member extends User {
  confirmed?: boolean;
  confirmedAt?: string;
  attending?: boolean;
}

interface Family {
  id: string;
  name: string;
  members: Member[];
}

function FamilySkeleton() {
  return (
    <div className='space-y-4 rounded border p-4'>
      <Skeleton className='h-6 w-1/4' />
      <div className='space-y-2'>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className='grid grid-cols-5 gap-4'>
            {Array.from({ length: 5 }).map((__, j) => (
              <Skeleton key={j} className='h-4 w-full' />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ListaFamiliasPage() {
  const [families, setFamilies] = useState<Family[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch('/api/families')
      .then((res) => res.json())
      .then(setFamilies)
      .catch(() => setFamilies([]))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className='mx-auto flex w-full max-w-7xl flex-col gap-4 p-4'>
      <PageBreadcrumb />
      <h1 className='text-2xl'>Famílias</h1>
      {loading &&
        Array.from({ length: 6 }).map((_, i) => <FamilySkeleton key={i} />)}
      {!loading &&
        families.map((f) => (
          <div key={f.id} className='space-y-2 rounded border p-4'>
            <div className='flex items-center justify-between'>
              <h2 className='font-semibold'>{f.name}</h2>
              <Button asChild size='sm' variant='outline'>
                <Link href={`/familias?id=${f.id}`}>Editar</Link>
              </Button>
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full text-sm'>
                <thead>
                  <tr className='text-left'>
                    <th className='p-2'>Nome</th>
                    <th className='p-2'>Telefone</th>
                    <th className='p-2'>Confirmado</th>
                    <th className='p-2'>Data</th>
                    <th className='p-2'>Presença</th>
                  </tr>
                </thead>
                <tbody>
                  {f.members.map((m) => (
                    <tr key={m.id} className='border-t'>
                      <td className='p-2'>{m.name}</td>
                      <td className='p-2'>{m.phone}</td>
                      <td className='p-2'>
                        {m.confirmed ? 'Sim' : 'Não'}
                      </td>
                      <td className='p-2'>
                        {m.confirmedAt
                          ? new Date(m.confirmedAt).toLocaleDateString('pt-BR')
                          : '-'}
                      </td>
                      <td className='p-2'>
                        {m.attending === undefined
                          ? '-'
                          : m.attending
                            ? 'Presente'
                            : 'Ausente'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ))}
    </main>
  );
}
