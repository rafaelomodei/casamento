'use client';

import { useState } from 'react';
import { slugExists } from '@/lib/checkSlug';

export default function NewPresent() {
  const [name, setName] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState('');
  const [slugError, setSlugError] = useState('');
  const [checking, setChecking] = useState(false);

  const handleSlugBlur = async () => {
    if (!slug) return;
    setChecking(true);
    try {
      const exists = await slugExists(slug);
      if (exists) {
        setSlugError('Este Slugger já existe');
      } else {
        setSlugError('');
      }
    } catch (err) {
      setSlugError('Erro ao verificar Slugger');
    } finally {
      setChecking(false);
    }
  };

  const isValid =
    name.trim() !== '' &&
    slug.trim() !== '' &&
    price.trim() !== '' &&
    !slugError &&
    !checking;

  return (
    <div className='max-w-xl mx-auto p-4 space-y-4'>
      <h1 className='text-xl font-bold'>Adicionar Presente</h1>
      <form className='space-y-4'>
        <div>
          <label className='block mb-1'>Nome</label>
          <input
            className='w-full border rounded px-3 py-2'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className='block mb-1'>Slugger</label>
          <input
            className={`w-full border rounded px-3 py-2 ${slugError ? 'border-red-600' : ''}`}
            value={slug}
            onChange={(e) => setSlug(e.target.value)}
            onBlur={handleSlugBlur}
          />
          {slugError && (
            <p className='text-red-600 text-sm mt-1'>{slugError}</p>
          )}
        </div>
        <div>
          <label className='block mb-1'>Preço</label>
          <input
            className='w-full border rounded px-3 py-2'
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <button
          type='submit'
          disabled={!isValid}
          className={`px-4 py-2 rounded text-white ${
            isValid ? 'bg-primary' : 'bg-gray-400 cursor-not-allowed'
          }`}
        >
          Salvar
        </button>
      </form>
    </div>
  );
}
