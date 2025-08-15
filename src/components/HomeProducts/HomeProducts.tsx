'use client';

import { useEffect, useState } from 'react';
import { ProductCard } from '@/components/ProductCard/ProductCard';
import ProductCardSkeleton from '@/components/ProductCard/ProductCardSkeleton';
import { ProductDTO } from '@/domain/products/entities/ProductDTO';
import Link from 'next/link';
import { BRIDE_AND_GROOM } from '@/lib/constants';

export default function HomeProducts() {
  const [products, setProducts] = useState<ProductDTO[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const res = await fetch('/api/products/most-viewed?limit=4');
        const data = await res.json();
        setProducts(data as ProductDTO[]);
      } catch (err) {
        console.error('Erro ao carregar presentes:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const renderContent = () => {
    if (loading) {
      return (
        <div className='flex flex-wrap gap-8'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className='flex w-full md:flex-1/2'>
              <ProductCardSkeleton classNameCard='w-full' />
            </div>
          ))}
        </div>
      );
    }

    if (products.length === 0) {
      return <p className='text-lg py-4'>Nenhum presente encontrado.</p>;
    }

    return (
      <div className='flex flex-wrap gap-8'>
        {products.map((product) => (
          <div key={product.id} className='flex-wrap gap-2'>
            <ProductCard
              slug={product.slug}
              images={product.images}
              title={product.title}
              description={product.description}
              price={product.price}
            />
          </div>
        ))}
      </div>
    );
  };

  return (
    <section className='flex flex-col w-full py-8'>
      <p className='text-2xl'>Presentes</p>
      <p>
        Queridos familiares e amigos, para nós, a presença de vocês neste dia
        tão especial é o maior presente que poderíamos receber. Mas, se vocês
        também quiserem nos presentear, ficaremos muito agradecidos. Com amor,
        {` ${BRIDE_AND_GROOM}`}.
      </p>
      {renderContent()}
      <Link
        href='/presentes'
        className='mt-4 bg-primary text-white text-center rounded-sm text-lg py-2 px-4 self-start'
      >
        Ver todos os presentes
      </Link>
    </section>
  );
}
