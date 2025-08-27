"use client";

import { useState, useEffect, Suspense } from "react";
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User } from '@/Providers/auth-provider';
import Link from 'next/link';
import { useSearchParams } from "next/navigation";
import { displayPhone } from '@/lib/utlils/phone';

export default function FamiliasPage() {
  return (
    <Suspense fallback={<div />}>
      <FamiliasPageContent />
    </Suspense>
  );
}

function FamiliasPageContent() {
  const searchParams = useSearchParams();
  const familyId = searchParams.get("id");
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [selected, setSelected] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!familyId) return;
    fetch(`/api/families?id=${familyId}`)
      .then((res) => res.json())
      .then((data) => {
        setName(data.name);
        setSelected(data.members);
      })
      .catch(() => {
        setMessage('Família não encontrada');
      });
  }, [familyId]);

  async function handleSearch() {
    const res = await fetch(`/api/users?search=${encodeURIComponent(search)}`);
    if (res.ok) {
      const data = (await res.json()) as User[];
      setResults(data);
    }
  }

  function addMember(user: User) {
    if (selected.some((s) => s.id === user.id)) return;
    setSelected([...selected, user]);
  }

  function removeMember(id: string) {
    setSelected(selected.filter((s) => s.id !== id));
  }

  async function handleSave() {
    const memberIds = selected.map((s) => s.id);
    if (!name || memberIds.length < 2) {
      setMessage('Selecione pelo menos dois membros');
      return;
    }
    const method = familyId ? 'PUT' : 'POST';
    const body = familyId
      ? { id: familyId, name, memberIds }
      : { name, memberIds };
    const res = await fetch('/api/families', {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    });
    if (res.ok) {
      setMessage(
        familyId ? 'Família atualizada com sucesso' : 'Família criada com sucesso',
      );
      if (!familyId) {
        setName('');
        setSelected([]);
        setResults([]);
      }
    }
  }

  return (
    <main className='mx-auto flex w-full max-w-7xl flex-col gap-4 p-4'>
      <PageBreadcrumb />
      <div className='flex items-center justify-between'>
        <h1 className='text-2xl'>Cadastro de famílias</h1>
        <Button asChild variant='outline'>
          <Link href='/familias/listar'>Listar famílias</Link>
        </Button>
      </div>
      <div className='flex gap-2'>
        <Input
          value={search}
          onChange={(e) => setSearch(e.currentTarget.value)}
          placeholder='Buscar por nome ou telefone'
        />
        <Button onClick={handleSearch}>Buscar</Button>
      </div>
      <div className='flex flex-col gap-4 md:flex-row'>
        <div className='flex flex-1 flex-col gap-2'>
          {results.map((u) => (
            <div key={u.id} className='flex items-center justify-between gap-2'>
              <span>
                {u.name} - {displayPhone(u.phone)}
              </span>
              <Button
                variant='outline'
                size='sm'
                onClick={() => addMember(u)}
                disabled={selected.some((s) => s.id === u.id)}
              >
                Adicionar
              </Button>
            </div>
          ))}
        </div>
        <div className='flex flex-1 flex-col gap-2'>
          <h2 className='text-lg font-semibold'>Membros da família</h2>
          {selected.map((u) => (
            <div key={u.id} className='flex items-center justify-between gap-2'>
              <span>
                {u.name} - {displayPhone(u.phone)}
              </span>
              <Button
                variant='destructive'
                size='sm'
                onClick={() => removeMember(u.id)}
              >
                Remover
              </Button>
            </div>
          ))}
        </div>
      </div>
      <Input
        value={name}
        onChange={(e) => setName(e.currentTarget.value)}
        placeholder='Nome da família'
      />
      <Button onClick={handleSave}>
        {familyId ? 'Salvar alterações' : 'Criar família'}
      </Button>
      {message && <p>{message}</p>}
    </main>
  );
}
