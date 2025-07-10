'use client';
import { useState } from 'react';
import { Trash } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { ProductCard } from '@/components/ProductCard/ProductCard';
import PageBreadcrumb from '@/components/PageBreadcrumb';
import { formatCurrency, formatCurrencyInput } from '@/lib/utlils/currency';

export default function AdicionarNovoPresentePage() {
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [price, setPrice] = useState(0);
  const [priceInput, setPriceInput] = useState('');
  const [imageUrls, setImageUrls] = useState<string[]>(['']);
  const [description, setDescription] = useState('');
  const [slugError, setSlugError] = useState('');
  const [checkingSlug, setCheckingSlug] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const isFormValid =
    slug.trim() &&
    title.trim() &&
    priceInput.trim() &&
    imageUrls.some((url) => url.trim()) &&
    !slugError;

  async function handleSlugBlur() {
    if (!slug) return;
    setCheckingSlug(true);
    try {
      const res = await fetch(`/api/products/check-slug?slug=${slug}`);
      const data = await res.json();
      if (data.exists) {
        setSlugError('Já existe um produto com esse slug');
      } else {
        setSlugError('');
      }
    } catch (err) {
      console.error('Erro ao verificar slug:', err);
    } finally {
      setCheckingSlug(false);
    }
  }

  function handleAddImage() {
    setImageUrls((prev) => [...prev, '']);
  }

  function handleRemoveImage(index: number) {
    if (imageUrls.length === 1) return;
    setImageUrls((prev) => prev.filter((_, i) => i !== index));
  }

  function handleImageChange(index: number, value: string) {
    setImageUrls((prev) => prev.map((img, i) => (i === index ? value : img)));
  }

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
          price: price,
          images: imageUrls.filter((url) => url.trim()),
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
    <div className='flex w-full max-w-6xl m-auto py-8'>
      <div className='flex flex-col w-full gap-4'>
        <PageBreadcrumb />
        <h1 className='text-2xl'>Adicionar Novo Presente</h1>
        <form onSubmit={handleSubmit} className='flex flex-col gap-4 max-w-md'>
          <div>
            <Input
              type='text'
              placeholder='Slug'
              value={slug}
              onBlur={handleSlugBlur}
              onChange={(e) => setSlug(e.target.value)}
              aria-invalid={slugError ? true : undefined}
              required
            />
            {slugError && (
              <p className='text-destructive text-sm pl-2'>{slugError}</p>
            )}
          </div>
          <Input
            type='text'
            placeholder='Título'
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
          <Input
            type='text'
            placeholder='Preço'
            value={priceInput}
            onChange={(e) => {
              const { formatted, numeric } = formatCurrencyInput(e.target.value);
              setPriceInput(formatted);
              setPrice(numeric);
            }}
            required
          />
          {imageUrls.map((url, idx) => (
            <div key={idx} className='flex items-center gap-2'>
              <Button
                type='button'
                size='icon'
                variant='ghost'
                onClick={() => handleRemoveImage(idx)}
                disabled={imageUrls.length === 1}
              >
                <Trash className='w-4 h-4' />
              </Button>
              <Input
                type='text'
                placeholder='URL da imagem'
                value={url}
                onChange={(e) => handleImageChange(idx, e.target.value)}
                required={idx === 0}
              />
            </div>
          ))}
          <Button
            type='button'
            variant='secondary'
            onClick={handleAddImage}
          >
            Adicionar mais imagem
          </Button>
          <Textarea
            placeholder='Descrição'
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
          <Button
            type='submit'
            disabled={loading || checkingSlug || !isFormValid}
          >
            {loading ? 'Salvando...' : 'Salvar'}
          </Button>
        </form>
      </div>
      <div>
        <ProductCard
          slug={'aaa'}
          images={
            imageUrls.filter((url) => url.trim()).length > 0
              ? imageUrls.filter((url) => url.trim())
              : ['/png/defaultImage.png']
          }
          title={title.length > 0 ? title : 'Sem título'}
          description={description.length > 0 ? description : 'Sem descrição'}
          price={price}
          classNameCard='max-w-sm'
        />
      </div>
    </div>
  );
}
