"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";

import PageBreadcrumb from "@/components/PageBreadcrumb";
import { useAuth, User } from "@/Providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { Phone } from "lucide-react";
import { isPlaceholderPhone } from "@/lib/utlils/phone";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface Member extends User {
  responded?: boolean;
  respondedAt?: string;
  attending?: boolean;
}

interface TableGroup {
  id: string;
  name: string;
  members: Member[];
  priority?: number;
}

function TableSkeleton() {
  return (
    <div className="space-y-3 rounded border p-4">
      <Skeleton className="h-6 w-1/4" />
      <Skeleton className="h-4 w-1/6" />
      <div className="space-y-2">
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="grid grid-cols-4 gap-4">
            {Array.from({ length: 4 }).map((__, innerIndex) => (
              <Skeleton key={innerIndex} className="h-4 w-full" />
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
  const { user } = useAuth();
  const canEdit = user?.phone.replace(/\D/g, "") === "45991156286";

  useEffect(() => {
    setLoading(true);
    fetch("/api/tables")
      .then((response) => response.json())
      .then(setTables)
      .catch(() => setTables([]))
      .finally(() => setLoading(false));
  }, []);

  async function handleDelete(id: string) {
    if (!canEdit) return;
    if (!confirm("Deseja excluir esta mesa?")) return;
    await fetch(`/api/tables?id=${id}`, {
      method: "DELETE",
      headers: { "x-user-phone": user?.phone || "" },
    });
    setTables((prev) => prev.filter((table) => table.id !== id));
  }

  const tablesWithFilteredMembers = useMemo(() => {
    const mapped = tables.map((table) => {
      const isVirtualTable = table.id === '__no_table__';
      const members = isVirtualTable
        ? table.members.filter((member) => member.attending !== false)
        : table.members;
      const normalizedPriority = isVirtualTable
        ? Number.NEGATIVE_INFINITY
        : table.priority ?? 0;

      return { ...table, members, priority: normalizedPriority };
    });

    const virtualTable = mapped.find((table) => table.id === '__no_table__');
    const realTables = mapped
      .filter((table) => table.id !== '__no_table__')
      .sort((a, b) => (b.priority ?? 0) - (a.priority ?? 0));

    if (!virtualTable) {
      return realTables;
    }

    return [virtualTable, ...realTables];
  }, [tables]);

  const { totalTables, totalGuests, maxGuests, minGuests, averageGuests, unassignedGuests } =
    useMemo(() => {
      const realTables = tablesWithFilteredMembers.filter(
        (table) => table.id !== '__no_table__',
      );
      const fallbackUnassigned = tablesWithFilteredMembers.find(
        (table) => table.id === '__no_table__',
      );

      if (realTables.length === 0) {
        return {
          totalTables: 0,
          totalGuests: 0,
          maxGuests: 0,
          minGuests: 0,
          averageGuests: 0,
          unassignedGuests: fallbackUnassigned?.members.length ?? 0,
        };
      }

      const guests = realTables.map((table) => table.members.length);
      const totalGuestsCount = guests.reduce((acc, value) => acc + value, 0);
      const max = Math.max(...guests);
      const min = Math.min(...guests);
      const avg = totalGuestsCount / realTables.length;

      return {
        totalTables: realTables.length,
        totalGuests: totalGuestsCount,
        maxGuests: max,
        minGuests: min,
        averageGuests: avg,
        unassignedGuests: fallbackUnassigned?.members.length ?? 0,
      };
    }, [tablesWithFilteredMembers]);

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-4">
      <PageBreadcrumb />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Organização de mesas</h1>
        {canEdit && (
          <Button asChild variant="outline">
            <Link href="/mesas">Cadastrar nova mesa</Link>
          </Button>
        )}
      </div>

      {!loading && (
        <div className="flex flex-wrap gap-2 md:gap-4">
          <Card className="flex w-40 md:w-48 shadow-none" data-slot="card">
            <CardHeader>
              <CardDescription className="text-lg text-primary">
                Total de mesas
              </CardDescription>
              <CardTitle className="text-2xl text-foreground/70 font-semibold tabular-nums @[250px]/card:text-3xl">
                {totalTables}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="flex w-40 md:w-48 shadow-none" data-slot="card">
            <CardHeader>
              <CardDescription className="text-lg text-primary">
                Convidados alocados
              </CardDescription>
              <CardTitle className="text-2xl text-foreground/70 font-semibold tabular-nums @[250px]/card:text-3xl">
                {totalGuests}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="flex w-40 md:w-48 shadow-none" data-slot="card">
            <CardHeader>
              <CardDescription className="text-lg text-primary">
                Mesa mais cheia
              </CardDescription>
              <CardTitle className="text-2xl text-foreground/70 font-semibold tabular-nums @[250px]/card:text-3xl">
                {maxGuests}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="flex w-40 md:w-48 shadow-none" data-slot="card">
            <CardHeader>
              <CardDescription className="text-lg text-primary">
                Mesa mais vazia
              </CardDescription>
              <CardTitle className="text-2xl text-foreground/70 font-semibold tabular-nums @[250px]/card:text-3xl">
                {minGuests}
              </CardTitle>
            </CardHeader>
          </Card>
          <Card className="flex w-40 md:w-48 shadow-none" data-slot="card">
            <CardHeader>
              <CardDescription className="text-lg text-primary">
                Média por mesa
              </CardDescription>
              <CardTitle className="text-2xl text-foreground/70 font-semibold tabular-nums @[250px]/card:text-3xl">
                {averageGuests.toFixed(1)}
              </CardTitle>
            </CardHeader>
          </Card>
          {unassignedGuests > 0 && (
            <Card className="flex w-40 md:w-48 shadow-none" data-slot="card">
              <CardHeader>
                <CardDescription className="text-lg text-primary">
                  Sem mesa
                </CardDescription>
                <CardTitle className="text-2xl text-foreground/70 font-semibold tabular-nums @[250px]/card:text-3xl">
                  {unassignedGuests}
                </CardTitle>
              </CardHeader>
            </Card>
          )}
        </div>
      )}

      {loading &&
        Array.from({ length: 4 }).map((_, index) => <TableSkeleton key={index} />)}

      {!loading && tables.length === 0 && (
        <p>Nenhuma mesa cadastrada até o momento.</p>
      )}

      {!loading &&
        tablesWithFilteredMembers.map((table) => {
          const isVirtualTable = table.id === '__no_table__';
          if (isVirtualTable && table.members.length === 0) return null;
          return (
            <div key={table.id} className="space-y-2 rounded border p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold">{table.name}</h2>
                  <p className="text-sm text-muted-foreground">
                    {table.members.length} convidado(s)
                  </p>
                </div>
                {canEdit && !isVirtualTable && (
                  <div className="flex gap-2">
                    <Button asChild size="sm" variant="outline">
                      <Link href={`/mesas?id=${table.id}`}>Editar</Link>
                    </Button>
                    <Button
                      size="sm"
                      variant="destructive"
                      onClick={() => handleDelete(table.id)}
                    >
                      Excluir
                    </Button>
                  </div>
                )}
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left">
                      <th className="p-2">Nome</th>
                      <th className="p-2">Telefone</th>
                      <th className="p-2">Presença</th>
                      <th className="p-2">Última resposta</th>
                    </tr>
                  </thead>
                  <tbody>
                    {table.members.map((member) => {
                      const digits = member.phone.replace(/\D/g, '');
                      const placeholder = isPlaceholderPhone(member.phone);
                      const link = placeholder
                        ? ''
                        : `https://wa.me/${
                            digits.length === 11 ? `55${digits}` : digits
                          }`;

                      return (
                        <tr key={member.id} className="border-t">
                          <td className="p-2">{member.name}</td>
                          <td className="p-2 flex items-center gap-2">
                            {placeholder ? (
                              <span>-</span>
                            ) : (
                              <>
                                <a
                                  href={link}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  aria-label={`Conversar com ${member.name} no WhatsApp`}
                                  className="text-green-600 hover:text-green-700"
                                >
                                  <Phone className="h-4 w-4" />
                                </a>
                                {member.phone}
                              </>
                            )}
                          </td>
                          <td className="p-2">
                            {member.attending === undefined
                              ? '-'
                              : member.attending
                              ? 'Sim'
                              : 'Não'}
                          </td>
                          <td className="p-2">
                            {member.respondedAt
                              ? new Date(member.respondedAt).toLocaleDateString('pt-BR')
                              : '-'}
                          </td>
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
