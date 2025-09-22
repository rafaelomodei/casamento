"use client";

import { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

import PageBreadcrumb from "@/components/PageBreadcrumb";
import { useAuth, User } from "@/Providers/auth-provider";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { displayPhone } from "@/lib/utlils/phone";

export default function MesasPage() {
  return (
    <Suspense fallback={<div />}>
      <MesasPageContent />
    </Suspense>
  );
}

function MesasPageContent() {
  const searchParams = useSearchParams();
  const tableId = searchParams.get("id");
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [selected, setSelected] = useState<User[]>([]);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const { user } = useAuth();
  const canEdit = user?.phone.replace(/\D/g, "") === "45991156286";

  useEffect(() => {
    if (!tableId) return;
    fetch(`/api/tables?id=${tableId}`)
      .then((res) => res.json())
      .then((data: { name: string; members: User[] }) => {
        setName(data.name);
        setSelected(data.members);
      })
      .catch(() => {
        setMessage("Mesa não encontrada");
      });
  }, [tableId]);

  async function handleSearch() {
    const res = await fetch(`/api/users?search=${encodeURIComponent(search)}`);
    if (res.ok) {
      const data = (await res.json()) as User[];
      setResults(data);
    }
  }

  function addMember(newUser: User) {
    if (selected.some((s) => s.id === newUser.id)) return;
    setSelected((prev) => [...prev, newUser]);
  }

  function removeMember(id: string) {
    setSelected((prev) => prev.filter((member) => member.id !== id));
  }

  async function handleSave() {
    if (!canEdit) return;
    const memberIds = selected.map((member) => member.id);
    if (!name || memberIds.length === 0) {
      setMessage("Selecione pelo menos um convidado");
      return;
    }

    const method = tableId ? "PUT" : "POST";
    const body = tableId
      ? { id: tableId, name, memberIds }
      : { name, memberIds };

    const res = await fetch("/api/tables", {
      method,
      headers: {
        "Content-Type": "application/json",
        "x-user-phone": user?.phone || "",
      },
      body: JSON.stringify(body),
    });

    if (res.ok) {
      setMessage(
        tableId ? "Mesa atualizada com sucesso" : "Mesa criada com sucesso"
      );
      if (!tableId) {
        setName("");
        setSelected([]);
        setResults([]);
      }
    }
  }

  if (!canEdit) {
    return (
      <main className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-4">
        <PageBreadcrumb />
        <p>Acesso restrito</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-4 p-4">
      <PageBreadcrumb />
      <div className="flex items-center justify-between">
        <h1 className="text-2xl">Cadastro de mesas</h1>
        <Button asChild variant="outline">
          <Link href="/mesas/listar">Listar mesas</Link>
        </Button>
      </div>
      <div className="flex gap-2">
        <Input
          value={search}
          onChange={(event) => setSearch(event.currentTarget.value)}
          placeholder="Buscar por nome ou telefone"
        />
        <Button onClick={handleSearch}>Buscar</Button>
      </div>
      <div className="flex flex-col gap-4 md:flex-row">
        <div className="flex flex-1 flex-col gap-2">
          {results.map((member) => (
            <div key={member.id} className="flex items-center justify-between gap-2">
              <span>
                {member.name} - {displayPhone(member.phone)}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => addMember(member)}
                disabled={selected.some((s) => s.id === member.id)}
              >
                Adicionar
              </Button>
            </div>
          ))}
        </div>
        <div className="flex flex-1 flex-col gap-2">
          <h2 className="text-lg font-semibold">Membros da mesa</h2>
          {selected.map((member) => (
            <div key={member.id} className="flex items-center justify-between gap-2">
              <span>
                {member.name} - {displayPhone(member.phone)}
              </span>
              <Button
                variant="destructive"
                size="sm"
                onClick={() => removeMember(member.id)}
              >
                Remover
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Input
        value={name}
        onChange={(event) => setName(event.currentTarget.value)}
        placeholder="Nome da mesa"
      />
      <Button onClick={handleSave}>
        {tableId ? "Salvar alterações" : "Criar mesa"}
      </Button>
      {message && <p>{message}</p>}
    </main>
  );
}
