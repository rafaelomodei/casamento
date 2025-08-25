import { NextResponse } from 'next/server';
import { CheckSlugExistsUseCase } from '@/domain/products/useCases/checkSlugExists/CheckSlugExistsUseCase';
import { productRepository } from '@/infra/repositories/firebase/ProductServerFirebaseRepositories';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug obrigatório' }, { status: 400 });
  }

  const checkSlugExists = new CheckSlugExistsUseCase(productRepository);
  const exists = await checkSlugExists.execute(slug);

  return NextResponse.json({ exists }, { status: 200 });
}
