'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import PageBreadcrumb from '@/components/PageBreadcrumb'
import { ProductDTO } from '@/domain/products/entities/ProductDTO'

export default function PresenteadoPage() {
  const searchParams = useSearchParams()
  const id = searchParams.get('id')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const receiptUrl = searchParams.get('receipt_url')

  useEffect(() => {
    async function updateStatus() {
      if (!id) {
        setLoading(false)
        return
      }
      try {
        const res = await fetch(`/api/products?id=${id}`)
        if (!res.ok) throw new Error('Produto não encontrado')
        const product: ProductDTO = await res.json()
        await fetch('/api/products', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...product, status: 'gifted' }),
        })
      } catch {
        setError('Não foi possível atualizar o presente.')
      } finally {
        setLoading(false)
      }
    }
    updateStatus()
  }, [id])

  return (
    <div className='flex flex-col gap-4 py-8 px-4 max-w-6xl'>
      <PageBreadcrumb />
      {loading ? (
        <p>Processando...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <>
          <p>Obrigado pelo presente! Seu pagamento foi concluído com sucesso.</p>
          {receiptUrl && (
            <p>
              <a
                className='text-primary underline'
                href={receiptUrl}
                target='_blank'
                rel='noopener noreferrer'
              >
                Ver comprovante
              </a>
            </p>
          )}
        </>
      )}
    </div>
  )
}
