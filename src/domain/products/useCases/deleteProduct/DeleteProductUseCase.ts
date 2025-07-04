import { IProductRepository } from '@/domain/products/repositories/IProductRepository';

export class DeleteProductUseCase {
  constructor(private productRepository: IProductRepository) {}

  async execute(id: string): Promise<void> {
    await this.productRepository.delete(id);
  }
}
