'use client';

import { useState } from 'react';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User } from '@/Providers/auth-provider';

export default function FamiliasPage() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [selected, setSelected] = useState<User[]>([]);
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

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

  async function handleCreate() {
    const memberIds = selected.map((s) => s.id);
    if (!name || memberIds.length < 2) {
      setMessage('Selecione pelo menos dois membros');
      return;
    }
    const res = await fetch('/api/families', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, memberIds }),
    });
    if (res.ok) {
      setMessage('Família criada com sucesso');
      setName('');
      setSelected([]);
      setResults([]);
    }
  }

  return (
    <main className='mx-auto flex w-full max-w-7xl flex-col gap-4 p-4'>
      <PageBreadcrumb />
      <h1 className='text-2xl'>Cadastro de famílias</h1>
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
                {u.name} - {u.phone}
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
                {u.name} - {u.phone}
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
      <Button onClick={handleCreate}>Criar família</Button>
      {message && <p>{message}</p>}
    </main>
  );
}
