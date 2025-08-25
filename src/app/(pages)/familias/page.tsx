'use client';

import { useState } from 'react';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { User } from '@/Providers/auth-provider';

export default function FamiliasPage() {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<User[]>([]);
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [name, setName] = useState('');
  const [message, setMessage] = useState('');

  async function handleSearch() {
    const res = await fetch(`/api/users?search=${encodeURIComponent(search)}`);
    if (res.ok) {
      const data = (await res.json()) as User[];
      setResults(data);
    }
  }

  function toggle(id: string) {
    const next = new Set(selected);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelected(next);
  }

  async function handleCreate() {
    const memberIds = Array.from(selected);
    if (!name || memberIds.length === 0) return;
    const res = await fetch('/api/families', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name, memberIds }),
    });
    if (res.ok) {
      setMessage('Família criada com sucesso');
      setName('');
      setSelected(new Set());
      setResults([]);
    }
  }

  return (
    <main className='flex flex-col gap-4 p-4 max-w-6xl'>
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
      <div className='flex flex-col gap-2'>
        {results.map((u) => (
          <label key={u.id} className='flex items-center gap-2'>
            <input
              type='checkbox'
              checked={selected.has(u.id)}
              onChange={() => toggle(u.id)}
            />
            {u.name} - {u.phone}
          </label>
        ))}
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
