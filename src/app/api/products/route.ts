import { NextResponse } from 'next/server';
import { ProductDTO } from '@/domain/products/entities/ProductDTO';
import { GetAllProductsUseCase } from '@/domain/products/useCases/getAllProducts/GetAllProductsUseCase';
import { CreateProductUseCase } from '@/domain/products/useCases/createProduct/CreateProductUseCase';
import { GetProductByIdUseCase } from '@/domain/products/useCases/getProductById/GetProductByIdUseCase';
import { GetProductBySlugUseCase } from '@/domain/products/useCases/getProductBySlug/GetProductBySlugUseCase';
import { UpdateProductUseCase } from '@/domain/products/useCases/updateProduct/UpdateProductUseCase';
import { DeleteProductUseCase } from '@/domain/products/useCases/deleteProduct/DeleteProductUseCase';
import { productRepository } from '@/infra/repositories/firebase/ProductServerFirebaseRepositories';
import { PRODUCTS_PAGE_SIZE } from '@/lib/constants';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const id = searchParams.get('id');
  const slug = searchParams.get('slug');
  const page = Number(searchParams.get('page') || '1');
  const limit = Number(searchParams.get('limit') || PRODUCTS_PAGE_SIZE);

  if (id) {
    const getProduct = new GetProductByIdUseCase(productRepository);
    const product = await getProduct.execute(id);

    if (!product) {
      return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  }

  if (slug) {
    const getProductBySlug = new GetProductBySlugUseCase(productRepository);
    const product = await getProductBySlug.execute(slug);

    if (!product) {
      return NextResponse.json({ error: 'Produto não encontrado' }, { status: 404 });
    }

    return NextResponse.json(product, { status: 200 });
  }

  const getAllProducts = new GetAllProductsUseCase(productRepository);
  const products = await getAllProducts.execute();
  const start = (page - 1) * limit;
  const end = start + limit;
  const paginated = products.slice(start, end);
  const hasMore = end < products.length;

  return NextResponse.json({ products: paginated, hasMore }, { status: 200 });
}

export async function POST(req: Request) {
  try {
    const data = (await req.json()) as ProductDTO;
    const createProduct = new CreateProductUseCase(productRepository);
    await createProduct.execute(data);
    return NextResponse.json({ ok: true }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro inesperado' },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const data = (await req.json()) as ProductDTO;

    if (!data.id) {
      return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 });
    }

    const updateProduct = new UpdateProductUseCase(productRepository);
    await updateProduct.execute(data.id, data);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro inesperado' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'ID obrigatório' }, { status: 400 });
    }

    const deleteProduct = new DeleteProductUseCase(productRepository);
    await deleteProduct.execute(id);

    return NextResponse.json({ ok: true }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Erro inesperado' },
      { status: 500 }
    );
  }
}
