'use client';

import { useEffect, useState } from 'react';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { User, useAuth } from '@/Providers/auth-provider';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Phone } from 'lucide-react';
import { isPlaceholderPhone } from '@/lib/utlils/phone';
import { truncateWithEllipsis } from '@/lib/utlils/text';
import { formatBuffetLabel, getBuffetType } from '@/lib/utlils/buffet';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

interface Member extends User {
  responded?: boolean;
  respondedAt?: string;
  attending?: boolean;
  age?: number;
}

interface Family {
  id: string;
  name: string;
  members: Member[];
}

interface TableSummary {
  id: string;
  name: string;
}

function FamilySkeleton() {
  return (
    <div className='space-y-4 rounded border p-4'>
      <Skeleton className='h-6 w-1/4' />
      <div className='space-y-2'>
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className='grid grid-cols-7 gap-4'>
            {Array.from({ length: 7 }).map((__, j) => (
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
  const [tablesMap, setTablesMap] = useState<Record<string, string>>({});
  const { user } = useAuth();
  const canEdit = user?.phone.replace(/\D/g, '') === '45991156286';

  useEffect(() => {
    setLoading(true);
    fetch('/api/families')
      .then((res) => res.json())
      .then(setFamilies)
      .catch(() => setFamilies([]))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    if (!canEdit) return;
    if (!confirm('Deseja excluir esta família?')) return;
    await fetch(`/api/families?id=${id}`, {
      method: 'DELETE',
      headers: { 'x-user-phone': user?.phone || '' },
    });
    setFamilies((prev) => prev.filter((f) => f.id !== id));
  }

  useEffect(() => {
    fetch('/api/tables')
      .then((res) => res.json())
      .then((data: TableSummary[]) => {
        const map = data.reduce<Record<string, string>>((acc, table) => {
          if (table.id && table.id !== '__no_table__') {
            acc[table.id] = table.name;
          }
          return acc;
        }, {});
        setTablesMap(map);
      })
      .catch(() => setTablesMap({}));
  }, []);

  const totalPeople = families.reduce((acc, f) => acc + f.members.length, 0);
  const confirmedPeople = families.reduce(
    (acc, f) => acc + f.members.filter((m) => m.attending).length,
    0
  );
  const declinedPeople = families.reduce(
    (acc, f) => acc + f.members.filter((m) => m.attending === false).length,
    0
  );
  const pendingPeople = totalPeople - confirmedPeople - declinedPeople;
  const payingPeople = families.reduce(
    (acc, f) =>
      acc + f.members.filter((m) => getBuffetType(m.age) !== 'free').length,
    0
  );
  const halfPayingPeople = families.reduce(
    (acc, f) =>
      acc + f.members.filter((m) => getBuffetType(m.age) === 'half').length,
    0
  );
  const confirmedPayingPeople = families.reduce(
    (acc, f) =>
      acc +
      f.members.filter((m) => m.attending && getBuffetType(m.age) !== 'free')
        .length,
    0
  );

  return (
    <main className='mx-auto flex w-full max-w-7xl flex-col gap-4 p-4'>
      <PageBreadcrumb />
      <div className='flex flex-wrap items-center gap-2'>
        <Button asChild size='sm' variant='outline'>
          <Link href='/mesas/listar'>Listar mesas</Link>
        </Button>
      </div>
      <h1 className='text-2xl'>Status geral Famílias</h1>

      {!loading && (
        <>
          <div className='flex flex-wrap md:flex-row gap-2  md:gap-4'>
            <Card className='flex w-40 md:w-48 shadow-none' data-slot='card'>
              <CardHeader>
                <CardDescription className='text-lg text-primary'>
                  Total de convidados
                </CardDescription>
                <CardTitle className='text-2xl text-foreground/70 font-semibold tabular-nums @[250px]/card:text-3xl'>
                  {totalPeople}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className='flex w-40 shadow-none' data-slot='card'>
              <CardHeader>
                <CardDescription className='text-lg text-primary'>
                  Pagantes
                </CardDescription>
                <CardTitle className='text-2xl text-foreground/70 font-semibold tabular-nums @[250px]/card:text-3xl'>
                  {payingPeople}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className='flex w-40 shadow-none' data-slot='card'>
              <CardHeader>
                <CardDescription className='text-lg text-primary'>
                  Pagam meia
                </CardDescription>
                <CardTitle className='text-2xl text-foreground/70 font-semibold tabular-nums @[250px]/card:text-3xl'>
                  {halfPayingPeople}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className='flex w-40 shadow-none' data-slot='card'>
              <CardHeader>
                <CardDescription className='text-lg text-primary'>
                  Confirmados pagantes
                </CardDescription>
                <CardTitle className='text-2xl text-foreground/70 font-semibold tabular-nums @[250px]/card:text-3xl'>
                  {confirmedPayingPeople}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className='flex w-40 shadow-none' data-slot='card'>
              <CardHeader>
                <CardDescription className='text-lg text-primary'>
                  Não irão
                </CardDescription>
                <CardTitle className='text-2xl text-foreground/70 font-semibold tabular-nums @[250px]/card:text-3xl'>
                  {declinedPeople}
                </CardTitle>
              </CardHeader>
            </Card>
            <Card className='flex w-40 shadow-none' data-slot='card'>
              <CardHeader>
                <CardDescription className='text-lg text-primary'>
                  Pendentes
                </CardDescription>
                <CardTitle className='text-2xl text-foreground/70 font-semibold tabular-nums @[250px]/card:text-3xl'>
                  {pendingPeople}
                </CardTitle>
              </CardHeader>
            </Card>
          </div>
        </>
      )}

      <h1 className='text-2xl'>Famílias</h1>

      {loading &&
        Array.from({ length: 6 }).map((_, i) => <FamilySkeleton key={i} />)}
      {!loading &&
        families.map((f) => (
          <div key={f.id} className='space-y-2 rounded border p-4'>
            <div className='flex items-center justify-between'>
              <h2 className='font-semibold'>{f.name}</h2>
              {canEdit && f.id !== '__no_family__' && (
                <div className='flex gap-2'>
                  <Button asChild size='sm' variant='outline'>
                    <Link href={`/familias?id=${f.id}`}>Editar</Link>
                  </Button>
                  <Button
                    size='sm'
                    variant='destructive'
                    onClick={() => handleDelete(f.id)}
                  >
                    Excluir
                  </Button>
                </div>
              )}
            </div>
            <div className='overflow-x-auto'>
              <table className='w-full table-fixed text-sm'>
                <thead>
                  <tr className='text-left'>
                    <th className='w-52 p-2'>Nome</th>
                    <th className='w-40 p-2'>Telefone</th>
                    <th className='w-36 p-2'>Mesa</th>
                    <th className='w-28 p-2'>Respondido</th>
                    <th className='w-32 p-2'>Data</th>
                    <th className='w-24 p-2'>Presença</th>
                    <th className='w-28 p-2'>Buffet</th>
                  </tr>
                </thead>
                <tbody>
                  {f.members.map((m) => {
                    const digits = m.phone.replace(/\D/g, '');
                    const placeholder = isPlaceholderPhone(m.phone);
                    const link = placeholder
                      ? ''
                      : `https://wa.me/${
                          digits.length === 11 ? `55${digits}` : digits
                        }`;
                    const displayName = truncateWithEllipsis(m.name, 30);
                    const buffetLabel = formatBuffetLabel(getBuffetType(m.age));
                    const tableName = m.tableId
                      ? tablesMap[m.tableId] ?? m.tableId
                      : '-';
                    return (
                      <tr key={m.id} className='border-t'>
                        <td className='w-52 p-2'>
                          <span title={m.name} className='inline-block max-w-full truncate'>
                            {displayName}
                          </span>
                        </td>
                        <td className='w-40 p-2'>
                          <div className='flex items-center gap-2'>
                            {placeholder ? (
                              <span>-</span>
                            ) : (
                              <>
                                <a
                                  href={link}
                                  target='_blank'
                                  rel='noopener noreferrer'
                                  aria-label={`Conversar com ${m.name} no WhatsApp`}
                                  className='text-green-600 hover:text-green-700'
                                >
                                  <Phone className='h-4 w-4' />
                                </a>
                                {m.phone}
                              </>
                            )}
                          </div>
                        </td>
                        <td className='w-36 p-2'>
                          <span title={tableName} className='inline-block max-w-full truncate'>
                            {tableName}
                          </span>
                        </td>
                        <td className='w-28 p-2'>{m.responded ? 'Sim' : 'Não'}</td>
                        <td className='w-32 p-2'>
                          {m.respondedAt
                            ? new Date(m.respondedAt).toLocaleDateString(
                                'pt-BR'
                              )
                            : '-'}
                        </td>
                        <td className='w-24 p-2'>
                          {m.attending === undefined
                            ? '-'
                            : m.attending
                            ? 'Sim'
                            : 'Não'}
                        </td>
                        <td className='w-28 p-2'>{buffetLabel}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        ))}
    </main>
  );
}
