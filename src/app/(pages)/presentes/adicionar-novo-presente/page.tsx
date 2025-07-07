'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

export default function AdicionarNovoPresentePage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug,
          title,
          price: Number(price),
          images: [imageUrl],
          description,
          views: 0,
        }),
      });
      router.push('/presentes');
    } catch (err) {
      console.error('Erro ao adicionar presente:', err);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className='flex flex-col gap-4 py-8'>
      <Breadcrumbs />
      <h1 className='text-2xl'>Adicionar Novo Presente</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-md'>
        <input
          type='text'
          placeholder='Slug'
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          className='border border-border p-2 rounded'
          required
        />
        <input
          type='text'
          placeholder='Título'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className='border border-border p-2 rounded'
          required
        />
        <input
          type='number'
          placeholder='Preço'
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          className='border border-border p-2 rounded'
          required
        />
        <input
          type='text'
          placeholder='URL da imagem'
          value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)}
          className='border border-border p-2 rounded'
          required
        />
        <textarea
          placeholder='Descrição'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className='border border-border p-2 rounded'
        />
        <button
          type='submit'
          className='bg-primary text-white rounded-sm py-2'
          disabled={loading}
        >
          {loading ? 'Salvando...' : 'Salvar'}
        </button>
      </form>
    </div>
  );
}
