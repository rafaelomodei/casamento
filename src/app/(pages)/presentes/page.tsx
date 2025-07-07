'use client';

import { useEffect, useState } from 'react';
import { ProductCard } from '@/components/ProductCard/ProductCard';
import { ProductDTO } from '@/domain/products/entities/ProductDTO';
import Link from 'next/link';
import Breadcrumbs from '@/components/Breadcrumbs/Breadcrumbs';

export default function PresentesPage() {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getProducts() {
      try {
        const res = await fetch('/api/products');
        const data = await res.json();
        setProducts(data as ProductDTO[]);
      } catch (err) {
        console.error('Erro ao carregar presentes:', err);
      } finally {
        setLoading(false);
      }
    }

    getProducts();
  }, []);

  if (loading) {
    return <p className='py-8'>Carregando...</p>;
  }

  return (
    <div className='flex flex-col gap-4 py-8'>
      <Breadcrumbs />
      <h1 className='text-2xl'>Presentes</h1>
      <Link
        href='/presentes/adicionar-novo-presente'
        className='self-start bg-primary text-white rounded-sm text-lg py-2 px-4'
      >
        Adicionar novo presente
      </Link>
      {products.length === 0 ? (
        <p className='py-4'>Nenhum presente cadastrado.</p>
      ) : (
        <div className='flex flex-wrap gap-4'>
          {products.map((product) => (
            <div
              key={product.id}
              className='flex-1 min-w-[min(100%,20rem)] sm:max-w-[calc(50%-0.5rem)]'
            >
              <ProductCard
                slug={product.slug}
                images={product.images}
                title={product.title}
                price={product.price}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
