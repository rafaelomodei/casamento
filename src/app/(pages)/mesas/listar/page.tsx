'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import PageBreadcrumb from '@/components/PageBreadcrumb';
import { useAuth, User } from '@/Providers/auth-provider';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { truncateWithEllipsis } from '@/lib/utlils/text';
import { formatBuffetLabel, getBuffetType } from '@/lib/utlils/buffet';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  prepareTablesForDisplay,
  type TableWithMembers,
} from '@/lib/utlils/tables';
import { toast } from 'sonner';

interface Member extends User {
  responded?: boolean;
  respondedAt?: string;
  attending?: boolean;
  age?: number;
  needsChildChair?: boolean;
}

type TableGroup = TableWithMembers<Member>;

function TableSkeleton() {
  return (
    <div className='space-y-3 rounded border p-4'>
      <Skeleton className='h-6 w-1/4' />
      <Skeleton className='h-4 w-1/6' />
      <div className='space-y-2'>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className='grid grid-cols-5 gap-4'>
            {Array.from({ length: 5 }).map((__, innerIndex) => (
              <Skeleton key={innerIndex} className='h-4 w-full' />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ListarMesasPage() {
  const [tables, setTables] = useState<TableGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingFormat, setDownloadingFormat] = useState<
    'pdf' | 'csv' | null
  >(null);
  const { user } = useAuth();
  const canEdit = user?.phone.replace(/\D/g, '') === '45991156286';

  useEffect(() => {
    setLoading(true);
    fetch('/api/tables')
      .then((response) => response.json())
      .then(setTables)
      .catch(() => setTables([]))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    if (!canEdit) return;
    if (!confirm('Deseja excluir esta mesa?')) return;
    await fetch(`/api/tables?id=${id}`, {
      method: 'DELETE',
      headers: { 'x-user-phone': user?.phone || '' },
    });
    setTables((prev) => prev.filter((table) => table.id !== id));
  }

  async function handleDownload(format: 'pdf' | 'csv') {
    try {
      if (downloadingFormat) return;
      setDownloadingFormat(format);

      const response = await fetch(`/api/tables/${format}`);

      if (!response.ok) {
        let errorMessage =
          'Não foi possível gerar o arquivo da organização de mesas.';
        try {
          const data = await response.json();
          if (data && typeof data.error === 'string') {
            errorMessage = data.error;
          }
        } catch (jsonError) {
          console.error('Erro ao interpretar resposta do download:', jsonError);
        }
        throw new Error(errorMessage);
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const extension = format === 'pdf' ? 'pdf' : 'csv';
      link.download = `organizacao-mesas.${extension}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : 'Não foi possível realizar o download. Tente novamente.';
      toast.error(message);
      console.error('Erro ao baixar arquivo das mesas:', error);
    } finally {
      setDownloadingFormat(null);
    }
  }

  const { tables: tablesWithFilteredMembers, overview } = useMemo(() => {
    const prepared = prepareTablesForDisplay<Member>(tables);
    return {
      tables: prepared.tables,
      overview: prepared.overview,
    };
  }, [tables]);

  const {
    totalTables,
    totalGuests,
    unassignedGuests,
    payingGuests,
    nonPayingGuests,
    halfPayingGuests,
  } = overview;
  const isDownloading = downloadingFormat !== null;
  const downloadingLabel =
    downloadingFormat === 'pdf'
      ? 'Baixando PDF...'
      : downloadingFormat === 'csv'
      ? 'Baixando CSV...'
      : 'Baixar organização de mesas';

  return (
    <main className='mx-auto flex w-full max-w-7xl flex-col gap-4 p-4'>
      <PageBreadcrumb />
      <div className='flex flex-wrap items-center justify-between gap-2'>
        <h1 className='text-2xl'>Organização de mesas</h1>
        <div className='flex items-center gap-2'>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size='sm' disabled={isDownloading}>
                {downloadingLabel}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align='end'>
              <DropdownMenuItem
                disabled={isDownloading}
                onSelect={() => handleDownload('pdf')}
              >
                Baixar em PDF
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={isDownloading}
                onSelect={() => handleDownload('csv')}
              >
                Baixar em CSV
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button asChild size='sm' variant='outline'>
            <Link href='/familias/listar'>Ver lista de famílias</Link>
          </Button>
        </div>
      </div>

      {!loading && (
        <div className='flex flex-wrap gap-2 md:gap-4'>
          <Card className='flex w-40 md:w-48 shadow-none' data-slot='card'>
            <CardHeader>
              <CardDescription className='text-lg text-primary'>
                Total de mesas
              </CardDescription>
              <CardTitle className='text-2xl text-foreground/70 font-semibold tabular-nums @[250px]/card:text-3xl'>
                {totalTables}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className='flex w-40 md:w-48 shadow-none' data-slot='card'>
            <CardHeader>
              <CardDescription className='text-lg text-primary'>
                Convidados alocados
              </CardDescription>
              <CardTitle className='text-2xl text-foreground/70 font-semibold tabular-nums @[250px]/card:text-3xl'>
                {totalGuests}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className='flex w-40 md:w-48 shadow-none' data-slot='card'>
            <CardHeader>
              <CardDescription className='text-lg text-primary'>
                Convidados pagantes
              </CardDescription>
              <CardTitle className='text-2xl text-foreground/70 font-semibold tabular-nums @[250px]/card:text-3xl'>
                {payingGuests}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className='flex w-40 md:w-48 shadow-none' data-slot='card'>
            <CardHeader>
              <CardDescription className='text-lg text-primary'>
                Convidados não pagantes
              </CardDescription>
              <CardTitle className='text-2xl text-foreground/70 font-semibold tabular-nums @[250px]/card:text-3xl'>
                {nonPayingGuests}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className='flex w-40 md:w-48 shadow-none' data-slot='card'>
            <CardHeader>
              <CardDescription className='text-lg text-primary'>
                Convidados que pagam meia
              </CardDescription>
              <CardTitle className='text-2xl text-foreground/70 font-semibold tabular-nums @[250px]/card:text-3xl'>
                {halfPayingGuests}
              </CardTitle>
            </CardHeader>
          </Card>
          {unassignedGuests > 0 && (
            <Card className='flex w-40 md:w-48 shadow-none' data-slot='card'>
              <CardHeader>
                <CardDescription className='text-lg text-primary'>
                  Sem mesa
                </CardDescription>
                <CardTitle className='text-2xl text-foreground/70 font-semibold tabular-nums @[250px]/card:text-3xl'>
                  {unassignedGuests}
                </CardTitle>
              </CardHeader>
            </Card>
          )}
        </div>
      )}

      {loading &&
        Array.from({ length: 4 }).map((_, index) => (
          <TableSkeleton key={index} />
        ))}

      {!loading && tables.length === 0 && (
        <p>Nenhuma mesa cadastrada até o momento.</p>
      )}

      {!loading &&
        tablesWithFilteredMembers.map((table) => {
          const isVirtualTable = table.id === '__no_table__';
          if (isVirtualTable && table.members.length === 0) return null;
          return (
            <div key={table.id} className='space-y-2 rounded border p-4'>
              <div className='flex items-center justify-between'>
                <div>
                  <h2 className='text-lg font-semibold'>{table.name}</h2>
                  <p className='text-sm text-muted-foreground'>
                    {table.members.length} convidado(s)
                  </p>
                </div>
                {canEdit && !isVirtualTable && (
                  <div className='flex gap-2'>
                    <Button asChild size='sm' variant='outline'>
                      <Link href={`/mesas?id=${table.id}`}>Editar</Link>
                    </Button>
                    <Button
                      size='sm'
                      variant='destructive'
                      onClick={() => handleDelete(table.id)}
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
                      <th className='w-28 p-2'>Buffet</th>
                      <th className='w-24 p-2'>Presença</th>
                      <th className='w-32 p-2'>Última resposta</th>
                      <th className='w-36 p-2'>Cadeira infantil</th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.members.map((member) => {
                      const displayName = truncateWithEllipsis(member.name, 30);
                      const buffetLabel = formatBuffetLabel(
                        getBuffetType(member.age)
                      );
                      const needsChildChairLabel = member.needsChildChair
                        ? 'Sim'
                        : '-';

                      return (
                        <tr key={member.id} className='border-t'>
                          <td className='w-52 p-2'>
                            <span
                              title={member.name}
                              className='inline-block max-w-full truncate'
                            >
                              {displayName}
                            </span>
                          </td>
                          <td className='w-28 p-2'>{buffetLabel}</td>
                          <td className='w-24 p-2'>
                            {member.attending === undefined
                              ? '-'
                              : member.attending
                              ? 'Sim'
                              : 'Não'}
                          </td>
                          <td className='w-32 p-2'>
                            {member.respondedAt
                              ? new Date(member.respondedAt).toLocaleDateString(
                                  'pt-BR'
                                )
                              : '-'}
                          </td>
                          <td className='w-36 p-2'>{needsChildChairLabel}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
    </main>
  );
}
