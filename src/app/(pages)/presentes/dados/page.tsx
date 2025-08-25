'use client';

import { useEffect, useState } from 'react';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { ProductDTO } from '@/domain/products/entities/ProductDTO';
import { Card, CardContent } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface GiftedProduct extends ProductDTO {
  buyerName: string;
}

function formatCurrency(value: number) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export default function PresentesDadosPage() {
  const [gifts, setGifts] = useState<GiftedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchGifts() {
      try {
        const res = await fetch('/api/products');
        const data: ProductDTO[] = await res.json();
        const gifted = data.filter((p) => p.status === 'gifted');
        const giftsWithUsers = await Promise.all(
          gifted.map(async (p) => {
            let buyerName = 'Anônimo';
            if (p.giftedBy) {
              try {
                const userRes = await fetch(`/api/users?id=${p.giftedBy}`);
                if (userRes.ok) {
                  const user = await userRes.json();
                  buyerName = user.name;
                }
              } catch (e) {
                console.error('Erro ao buscar usuário:', e);
              }
            }
            return { ...p, buyerName } as GiftedProduct;
          })
        );
        setGifts(giftsWithUsers);
      } catch (err) {
        console.error('Erro ao carregar presentes:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchGifts();
  }, []);

  const totalAmount = gifts.reduce((sum, g) => sum + g.price, 0);

  if (loading) {
    return (
      <div className='flex flex-col w-full max-w-7xl mx-auto min-h-screen gap-4 py-8 px-4'>
        <PageBreadcrumb />
        <h1 className='text-2xl'>Presentes Recebidos</h1>
        <Card>
          <CardContent className='flex flex-col sm:flex-row justify-between gap-2 p-4'>
            <Skeleton className='h-6 w-40' />
            <Skeleton className='h-6 w-48' />
          </CardContent>
        </Card>
        <div className='space-y-2'>
          {Array.from({ length: 3 }).map((_, i) => (
            <Skeleton key={i} className='h-8 w-full' />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='flex flex-col w-full max-w-7xl mx-auto min-h-screen gap-4 py-8 px-4'>
      <PageBreadcrumb />
      <h1 className='text-2xl'>Presentes Recebidos</h1>
      <Card>
        <CardContent className='flex flex-col sm:flex-row justify-between gap-2 p-4'>
          <span>Total de presentes: {gifts.length}</span>
          <span>Valor total arrecadado: {formatCurrency(totalAmount)}</span>
        </CardContent>
      </Card>
      {gifts.length === 0 ? (
        <p className='py-4'>Nenhum presente recebido ainda.</p>
      ) : (
        <div className='overflow-x-auto'>
          <table className='w-full text-sm border-collapse'>
            <thead>
              <tr className='border-b'>
                <th className='text-left py-2'>Pessoa</th>
                <th className='text-left py-2'>Presente</th>
                <th className='text-left py-2'>Data</th>
              </tr>
            </thead>
            <tbody>
              {gifts.map((gift) => (
                <tr key={gift.id} className='border-b'>
                  <td className='py-2'>{gift.buyerName}</td>
                  <td className='py-2'>{gift.title}</td>
                  <td className='py-2'>
                    {gift.giftedAt
                      ? new Date(gift.giftedAt).toLocaleString('pt-BR', {
                          dateStyle: 'short',
                          timeStyle: 'short',
                        })
                      : '-'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
