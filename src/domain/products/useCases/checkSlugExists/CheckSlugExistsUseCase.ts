import { IProductRepository } from '@/domain/products/repositories/IProductRepository';

export class CheckSlugExistsUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(slug: string): Promise<boolean> {
    const product = await this.productRepository.findBySlug(slug);
    return !!product;
  }
}

